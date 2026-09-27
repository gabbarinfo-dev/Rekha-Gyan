import { NextRequest, NextResponse } from "next/server";
import { VedicChartResult, SynastryResult } from "@/lib/vedic-engine";
import { PalmFeatures } from "@/lib/palm-extractor";
import { PujaVidhiData } from "@/lib/puja-vidhi";

export const maxDuration = 60;

interface ChatRequestBody {
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  userName: string;
  userDob?: string;
  userQuestion?: string;
  vedicChart?: any;
  palmFeatures?: any;
  pujaVidhi?: any;
  synastry?: any;
  secondaryPerson?: {
    name: string;
    relation: string;
    dob?: string;
    tob?: string;
    pob?: string;
  };
  language?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequestBody = await req.json();
    const {
      messages,
      userName,
      userDob,
      userQuestion,
      vedicChart,
      palmFeatures,
      pujaVidhi,
      synastry,
      secondaryPerson,
      language = "hinglish",
    } = body;

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "Messages array cannot be empty." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key not configured on server." }, { status: 500 });
    }

    // Build context summary for system prompt
    const kundliSummary = vedicChart
      ? `Lagna: ${vedicChart.ascendant} | Moon Sign: ${vedicChart.moonSign} | Nakshatra: ${vedicChart.nakshatra} (${vedicChart.nakshatraLord}) | Current Mahadasha: ${vedicChart.currentMahadasha || "Jupiter"} (Antardasha: ${vedicChart.currentAntardasha || "Saturn"}) | Calculated Yogas: ${vedicChart.calculatedYogas?.join(", ") || "Auspicious alignments"} | Gemstone: ${vedicChart.favorableGemstone}`
      : "Solar noon approximate alignment";

    const palmSummary = palmFeatures
      ? `Hand Type: ${palmFeatures.handType} | Dominant Mount: ${palmFeatures.mounts?.dominant || "Jupiter"} | Heart Line: ${palmFeatures.heartLine?.curvature || "Curved"} (${palmFeatures.heartLine?.origin || "Under index"}) | Head Line: ${palmFeatures.headLine?.clarity || "Clear"} | Life Line: ${palmFeatures.lifeLine?.vitality || "Vibrant"} | Fate Line: ${palmFeatures.fateLine?.present ? `Present (${palmFeatures.fateLine.strength})` : "Absent/Subtle"} | Special Marks: ${palmFeatures.specialMarks?.join(", ") || "Auspicious triangle"}`
      : "Standard samudrika shastra alignment";

    const synastrySummary = secondaryPerson
      ? `Second Person: ${secondaryPerson.name} (${secondaryPerson.relation || "Partner/Friend"}) | DOB: ${secondaryPerson.dob} | Ashtakoota Guna Score: ${synastry ? `${synastry.gunaScore}/${synastry.gunaMax || 36} Gunas (${synastry.compatibilityTier}) - Outlook: ${synastry.relationshipOutlook}` : "Calculated through planetary aspect"}`
      : "None added yet";

    const requestedLang = language.toLowerCase();
    const langInstruction =
      requestedLang === "hindi"
        ? "Respond strictly in pure, respectful, and clear Hindi (Devanagari script), using authentic Vedic terms."
        : requestedLang === "english"
        ? "Respond in fluent, elegant, and empathetic English, retaining authentic Sanskrit shastric terms in parentheses."
        : "Respond in natural, engaging, and empathetic Hinglish (Hindi written in Roman English script, e.g., 'Aapki kundli me Jupiter ka prabhav...', 'Ketu ki sthiti...') with shastric authority.";

    const systemPrompt = `You are REKHA, the World's First Autonomous AI Palmist & Vedic Astrologer, trained on 50+ classical treatises (Brihat Samhita, Hastasanjivani, Cheiro's Language of the Hand, Saravali, Bhrigu Sutras).

You are in a LIVE follow-up conversation with ${userName || "the seeker"}.
They have already received their foundational palm and Vedic consultation from you. Now they are asking follow-up questions.

SEEKER'S FOUNDATIONAL DOSSIER:
- Name: ${userName || "Seeker"}
- DOB: ${userDob || "Not provided"}
- Original Question: "${userQuestion || "General destiny"}"
- Vedic Kundli: ${kundliSummary}
- Palm Line Features: ${palmSummary}
- Synastry / Second Person Context: ${synastrySummary}
${pujaVidhi ? `- Prescribed Remedy: ${pujaVidhi.primaryDeity} Sankalp (${pujaVidhi.sankalp})` : ""}

RULES FOR YOUR RESPONSE:
1. Tone: Deeply authoritative, compassionate, spiritually grounded, and direct like an authentic revered Pandit/Palmist.
2. Directly answer the seeker's question without beating around the bush.
3. Anchor your reasoning explicitly in their personal data (e.g. mention their ${vedicChart?.moonSign || "Moon sign"}, their current ${vedicChart?.currentMahadasha || "Dasha"} Mahadasha, or their palm markings like Heart Line / Jupiter mount).
4. If they ask about another person (${secondaryPerson ? secondaryPerson.name : "anyone"}), evaluate the connection honestly—highlighting harmony, karmic challenges, and remedies.
5. Always deliver a complete, self-contained, and comprehensive answer without abruptly ending. Finish every sentence, list item, and remedy with complete clarity.
6. Language: ${langInstruction}`;

    // Format chat history into Gemini contents
    const contents = [
      {
        role: "user",
        parts: [{ text: systemPrompt + "\n\nSeeker says: Hello Rekha, I have some follow-up questions based on my reading." }],
      },
      {
        role: "model",
        parts: [{ text: `Namaste ${userName || "Seeker"}. I have your planetary chart and sacred palm lines before me. Ask whatever remains in your heart, and I will illuminate your path through the Shastras.` }],
      },
    ];

    // Append conversation history
    for (const msg of messages) {
      contents.push({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      });
    }

    const models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-pro"];
    let replyText = "";

    for (const model of models) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents,
              generationConfig: {
                temperature: 0.65,
                maxOutputTokens: 8192,
                thinkingConfig: {
                  thinkingBudget: 0,
                },
              },
            }),
          }
        );

        if (!geminiRes.ok) {
          console.warn(`Gemini chat ${model} failed with ${geminiRes.status}`);
          continue;
        }

        const data = await geminiRes.json();
        const candidate = data.candidates?.[0];
        const parts = candidate?.content?.parts || [];
        replyText = parts.map((p: any) => p.text || "").join("").trim();
        if (replyText) break;
      } catch (err) {
        console.warn(`Error invoking ${model} for chat:`, err);
      }
    }

    if (!replyText) {
      // Fallback to OpenAI if Gemini fails
      const openAiKey = process.env.OPENAI_API_KEY;
      if (openAiKey) {
        const openAiRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openAiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              { role: "system", content: systemPrompt },
              ...messages.map((m) => ({ role: m.role, content: m.content })),
            ],
            temperature: 0.65,
            max_tokens: 4000,
          }),
        });

        if (openAiRes.ok) {
          const oData = await openAiRes.json();
          replyText = oData.choices?.[0]?.message?.content || "";
        }
      }
    }

    if (!replyText) {
      return NextResponse.json(
        { error: "Unable to reach cosmic insight engine. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      reply: replyText,
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: error.message || "Cosmic chat processing error" },
      { status: 500 }
    );
  }
}
