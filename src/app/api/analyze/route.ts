import { NextRequest, NextResponse } from "next/server";
import { calculateVedicChart } from "@/lib/vedic-engine";
import { searchAstroConsensus } from "@/lib/tavily-research";
import { generateRekhaReading } from "@/lib/gemini-vision";
import { uploadPalmToWordPress, logReadingToWordPress } from "@/lib/wordpress";

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
    } = body;

    if (!name || !dob || !pob || !question) {
      return NextResponse.json(
        { error: "Name, Date of Birth, Place of Birth, and Question are required fields." },
        { status: 400 }
      );
    }

    // Step 1: Media Storage in WordPress Media Library (if images provided)
    let leftPalmUrl: string | undefined;
    let rightPalmUrl: string | undefined;

    const safeName = name.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
    const timestamp = Date.now();

    const uploadPromises: Promise<any>[] = [];
    if (leftPalmBase64) {
      uploadPromises.push(
        uploadPalmToWordPress(leftPalmBase64, `rekha_left_${safeName}_${timestamp}.jpg`).then(
          (url) => {
            if (url) leftPalmUrl = url;
          }
        )
      );
    }

    if (rightPalmBase64) {
      uploadPromises.push(
        uploadPalmToWordPress(rightPalmBase64, `rekha_right_${safeName}_${timestamp}.jpg`).then(
          (url) => {
            if (url) rightPalmUrl = url;
          }
        )
      );
    }

    // Await uploads with a quick 5-second timeout so the reading pipeline is never blocked
    await Promise.race([
      Promise.all(uploadPromises),
      new Promise((resolve) => setTimeout(resolve, 5000)),
    ]);

    // Step 2: Planetary & Vedic Chart Calculations
    const vedicChart = calculateVedicChart(dob, tob, pob);

    // Step 3: 50+ Source Web Scraping & Classical Consensus via Tavily
    const consensus = await searchAstroConsensus(
      lifeFocus,
      question,
      vedicChart.currentMahadasha,
      vedicChart.moonSign
    );

    // Step 4 & 5: Multimodal Vision Synthesis & Output Generation as REKHA
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
    });

    // Step 6: Log completed reading to WordPress
    // Non-blocking background log
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

    return NextResponse.json({
      success: true,
      reading: readingResult.rawMarkdown,
      insights: readingResult.keyInsights,
      vedicChart,
      consensus: {
        sourcesCount: consensus.sourcesCount,
        classicalTexts: consensus.classicalTextMatches,
        consensusSummary: consensus.consensusSummary,
      },
      media: {
        leftPalmUploaded: !!leftPalmUrl,
        rightPalmUploaded: !!rightPalmUrl,
      },
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
