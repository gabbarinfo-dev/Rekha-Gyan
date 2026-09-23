import { NextRequest, NextResponse } from "next/server";
import { calculateVedicChart, calculateSynastry, SynastryResult } from "@/lib/vedic-engine";
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
      secondaryPerson,
      language = "hinglish",
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
    const uploadedMediaIds: number[] = [];

    const safeName = name.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
    const timestamp = Date.now();

    const uploadPromises: Promise<any>[] = [];
    if (leftPalmBase64) {
      uploadPromises.push(
        uploadPalmToWordPress(leftPalmBase64, `rekha_left_${safeName}_${timestamp}.jpg`).then(
          (result) => {
            if (result) {
              leftPalmUrl = result.url;
              uploadedMediaIds.push(result.id);
            }
          }
        )
      );
    }

    if (rightPalmBase64) {
      uploadPromises.push(
        uploadPalmToWordPress(rightPalmBase64, `rekha_right_${safeName}_${timestamp}.jpg`).then(
          (result) => {
            if (result) {
              rightPalmUrl = result.url;
              uploadedMediaIds.push(result.id);
            }
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
      secondaryPerson,
      synastry,
      language,
    });

    // Step 6: WordPress Media Auto-Cleanup
    // Delete temporary uploaded palm images from WordPress hosting immediately after reading generation
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

    // Step 7: Structured Sacred Pooja Vidhi
    const pujaVidhi = {
      primaryDeity: vedicChart.currentMahadasha === "Shani" 
        ? "Lord Hanuman & Lord Shani Dev" 
        : vedicChart.currentMahadasha === "Guru"
        ? "Lord Brihaspati & Lord Vishnu"
        : vedicChart.currentMahadasha === "Shukra"
        ? "Maa Mahalakshmi"
        : vedicChart.currentMahadasha === "Rahu" || vedicChart.currentMahadasha === "Ketu"
        ? "Lord Shiva & Bhairava"
        : "Lord Surya & Shri Ganesh",
      auspiciousDay: vedicChart.currentMahadasha === "Shani"
        ? "Saturday evening during Pradosh kaal"
        : vedicChart.currentMahadasha === "Guru"
        ? "Thursday morning during Brahma Muhurta"
        : "Tuesday or Friday at Sunrise",
      samagri: [
        "Pure Brass or Clay Diya (Mustard or Sesame oil / Cow Ghee)",
        "Akshat (Unbroken rice grains mixed with turmeric)",
        "Ganga Jal / Clean sacred spring water",
        "Panchamrit (Milk, Curd, Ghee, Honey, Sugar)",
        "Yellow or Red cotton asana and fragrant Dhoop",
        "Cloves, Cardamom, Betel Leaf (Paan) and Supari",
      ],
      sankalp: `Om Vishnave Namah. Mama sarva karmika dosha shantyartham, ${vedicChart.currentMahadasha} mahadasha shubha phala praptyartham, mam manoratha siddhyartham shri devata aradhanam aham karishye.`,
      steps: [
        "1. Shuddhi & Aachaman: Take holy water in your right hand, sip three times chanting 'Om Keshavaya Namah, Om Narayanaya Namah, Om Madhavaya Namah'.",
        "2. Deepa Prajvalana: Light the ghee/mustard oil lamp facing East or North. Chant the Deepa Gayatri.",
        "3. Ganesh Prathana: Offer Akshat and red flowers to Lord Vignaharta Ganesha for obstacle removal.",
        "4. Sankalp: Take water, rice, and flower in right palm, state your full name (" + name + "), place of birth, and release water to the ground.",
        "5. Mukhya Japa: Chant 108 repetitions of your personal Beej Mantra: " + vedicChart.favorableMantra + " using a Rudraksha or Tulsi mala.",
        "6. Aarti & Samarpan: Perform camphor aarti and offer fruits/sweets (Bhog). Distribute prasad with family.",
      ],
      daana: vedicChart.currentMahadasha === "Shani"
        ? "Feed black dogs or donate black sesame (til) & mustard oil on Saturday."
        : vedicChart.currentMahadasha === "Guru"
        ? "Donate yellow lentils (Chana Dal), bananas or turmeric to elders or temple on Thursday."
        : "Feed birds in the morning and offer sweet water at the roots of a Peepal or Banyan tree.",
    };

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

    return NextResponse.json({
      success: true,
      reading: readingResult.rawMarkdown,
      insights: readingResult.keyInsights,
      freeTeaser: readingResult.freeTeaser,
      userQuestion: question,
      userName: name,
      pujaVidhi,
      vedicChart,
      consensus: {
        sourcesCount: consensus.sourcesCount,
        classicalTexts: consensus.classicalTextMatches,
        consensusSummary: consensus.consensusSummary,
      },
      synastry: readingResult.synastry || synastry,
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
