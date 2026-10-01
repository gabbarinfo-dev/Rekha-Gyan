import { NextRequest, NextResponse } from "next/server";
import { calculateVedicChart, calculateSynastry, SynastryResult } from "@/lib/vedic-engine";
import { searchAstroConsensus } from "@/lib/tavily-research";
import { extractPalmFeatures } from "@/lib/palm-extractor";
import { generateRekhaReading } from "@/lib/gemini-vision";
import { uploadPalmToWordPress, logReadingToWordPress } from "@/lib/wordpress";
import {
  verifyUserSubscription,
  checkIpRateLimit,
  cacheServerReading,
} from "@/lib/server-registry";
import { calculateAuthenticPujaVidhi } from "@/lib/puja-vidhi";

export const maxDuration = 60; // Allow sufficient time for multimodal AI & parallel search

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      gender = "Not specified",
      dob,
      tob,
      pob,
      question,
      lifeFocus = "General Destiny & Life Path",
      leftPalmBase64,
      rightPalmBase64,
      secondaryPerson,
      language = "hinglish",
      userPhone,
    } = body;

    if (!name || !dob || !pob || !question) {
      return NextResponse.json(
        { error: "Name, Date of Birth, Place of Birth, and Question are required fields." },
        { status: 400 }
      );
    }

    // Security Gate 1: Check user subscription & Super Admin status
    const { isSuperAdmin, isSubscribed } = await verifyUserSubscription(userPhone);

    // Security Gate 2: IP-based rate limiting (prevents DDoS and bot scraping)
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateLimit = checkIpRateLimit(clientIp, isSuperAdmin || isSubscribed, 5, 3600 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Free consultation limit reached for this session. Please sign in or subscribe to a plan to unlock unlimited access.",
          rateLimited: true,
        },
        { status: 429 }
      );
    }

    // Step 1: Media Storage in WordPress Media Library (non-blocking in background)
    let leftPalmUrl: string | undefined;
    let rightPalmUrl: string | undefined;
    const uploadedMediaIds: number[] = [];

    const safeName = name.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
    const timestamp = Date.now();

    if (leftPalmBase64) {
      uploadPalmToWordPress(leftPalmBase64, `rekha_left_${safeName}_${timestamp}.jpg`)
        .then((result) => {
          if (result) {
            leftPalmUrl = result.url;
            uploadedMediaIds.push(result.id);
          }
        })
        .catch(() => {});
    }

    if (rightPalmBase64) {
      uploadPalmToWordPress(rightPalmBase64, `rekha_right_${safeName}_${timestamp}.jpg`)
        .then((result) => {
          if (result) {
            rightPalmUrl = result.url;
            uploadedMediaIds.push(result.id);
          }
        })
        .catch(() => {});
    }

    // Step 2: Planetary & Vedic Chart Calculations
    const vedicChart = calculateVedicChart(dob, tob, pob);

    // Optional Step 2b: Secondary Person Synastry Calculation
    let synastry: SynastryResult | undefined;
    if (secondaryPerson?.dob && secondaryPerson?.pob && secondaryPerson?.name) {
      const secondaryVedicChart = calculateVedicChart(
        secondaryPerson.dob,
        secondaryPerson.tob || "",
        secondaryPerson.pob
      );
      synastry = calculateSynastry(
        vedicChart,
        secondaryVedicChart,
        name,
        secondaryPerson.name,
        secondaryPerson.relation || "Partner"
      );
      secondaryPerson.vedicChart = secondaryVedicChart;
    }

    // Step 2c & 3: Run anatomical palm scanning and 50+ classical treatises research in PARALLEL
    const [palmFeatures, consensus] = await Promise.all([
      extractPalmFeatures(leftPalmBase64, rightPalmBase64, vedicChart),
      searchAstroConsensus(
        lifeFocus,
        question,
        vedicChart.currentMahadasha,
        vedicChart.moonSign
      ),
    ]);

    // Step 4 & 5: Deep Fact-Based Synthesis & Output Generation as REKHA
    const readingResult = await generateRekhaReading({
      name,
      gender,
      dob,
      tob,
      pob,
      question,
      lifeFocus,
      leftPalmBase64,
      leftPalmUrl,
      rightPalmBase64,
      rightPalmUrl,
      vedicChart,
      consensus,
      palmFeatures,
      secondaryPerson,
      synastry,
      language,
    });

    // Step 6: WordPress Media Auto-Cleanup
    if (uploadedMediaIds.length > 0) {
      setTimeout(async () => {
        const { deleteMediaFromWordPress } = await import("@/lib/wordpress");
        for (const mediaId of uploadedMediaIds) {
          deleteMediaFromWordPress(mediaId).catch((err) =>
            console.warn(`Media auto-cleanup failed for ID ${mediaId}:`, err)
          );
        }
      }, 1000);
    }

    // Step 7: Structured Classical 9-Graha Sacred Pooja Vidhi
    // Prioritize the AI's deep scriptural synthesis; fallback to calculated classical generator if AI omitted it
    const pujaVidhi = readingResult.pujaVidhi && readingResult.pujaVidhi.sankalp && Array.isArray(readingResult.pujaVidhi.samagri) && readingResult.pujaVidhi.samagri.length > 0
      ? readingResult.pujaVidhi
      : calculateAuthenticPujaVidhi(vedicChart, name, pob);

    // Step 8: Log completed reading to WordPress (non-blocking)
    logReadingToWordPress({
      name,
      dob,
      tob,
      pob,
      question,
      lifeFocus,
      leftPalmUrl,
      rightPalmUrl,
      readingSummary: readingResult.rawMarkdown,
    }).catch((err) => console.warn("WordPress reading logging warning:", err));

    // Step 9: Server-Side Cryptographic Session Caching
    // Cache the full deep reading securely on server under a unique ID.
    // Unpaid users will NOT receive full raw markdown in the network payload!
    const readingId = `rekha_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const isUnlocked = Boolean(isSuperAdmin || isSubscribed);

    cacheServerReading(readingId, {
      reading: readingResult.rawMarkdown,
      pujaVidhi,
      synastry: readingResult.synastry || synastry,
      userPhone,
      createdAt: Date.now(),
    });

    return NextResponse.json({
      success: true,
      readingId,
      isUnlocked,
      // Security: Only send full markdown and pujaVidhi if verified subscriber or Super Admin!
      reading: isUnlocked ? readingResult.rawMarkdown : null,
      pujaVidhi: isUnlocked ? pujaVidhi : null,
      insights: readingResult.keyInsights,
      freeTeaser: readingResult.freeTeaser,
      questionDeepResolution: readingResult.questionDeepResolution,
      palmFeatures: readingResult.palmFeatures || palmFeatures,
      userQuestion: question,
      userName: name,
      vedicChart,
      consensus: {
        sourcesCount: consensus.sourcesCount,
        classicalTexts: consensus.classicalTextMatches,
        consensusSummary: consensus.consensusSummary,
      },
      synastry: isUnlocked ? (readingResult.synastry || synastry) : undefined,
      secondaryPerson: secondaryPerson ? { name: secondaryPerson.name, relation: secondaryPerson.relation } : undefined,
      media: {
        leftPalmUploaded: !!leftPalmUrl,
        rightPalmUploaded: !!rightPalmUrl,
      },
      language,
    });
  } catch (error: any) {
    console.error("Critical error in /api/analyze pipeline:", error);
    return NextResponse.json(
      {
        error: "Failed to synthesize celestial reading. Please try again.",
        details: error?.message || "Unknown internal error",
      },
      { status: 500 }
    );
  }
}
