import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { freeTeaser, rawMarkdown, targetLanguage } = body;

    if (!targetLanguage) {
      return NextResponse.json(
        { error: "Target language is required ('english', 'hindi', or 'hinglish')." },
        { status: 400 }
      );
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;
    const openaiApiKey = process.env.OPENAI_API_KEY;

    const langInstruction =
      targetLanguage === "hindi"
        ? `Translate ALL text strictly into PURE HINDI using Devanagari script (देवनागरी लिपि). E.g., 'प्रचंड संकल्प और शांत आत्मा', 'आर्यन, आपके पास...'. Do not write English letters.`
        : targetLanguage === "english"
        ? `Translate ALL text into articulate, poetic ENGLISH. E.g., 'Fiery Determination with a Soothing Spirit'.`
        : `Translate ALL text into natural, conversational HINGLISH (Hindi written strictly using English/Latin alphabet letters). E.g., 'Bahar Se Shaant, Andar Se Bhavuk Samundar', 'Aapka aatma-samman sabse upar hai...'. Do NOT use Devanagari script.`;

    const prompt = `
You are an expert Vedic astrologer and master multilingual translator for REKHA (rekhagyan.online).
Your task is to translate an astrological palmistry reading into the requested target language format.

TARGET LANGUAGE SPECIFICATION:
${langInstruction}

INPUT JSON TEASER:
${JSON.stringify(freeTeaser || {}, null, 2)}

INPUT FULL MARKDOWN READING:
${rawMarkdown ? rawMarkdown.slice(0, 10000) : ""}

INSTRUCTIONS:
1. First, output the translated JSON teaser in a fenced block delimited by \`\`\`json-teaser and \`\`\`.
Keep the exact same keys:
- swabhavHeadline
- introvertExtrovertTrait
- pastGhatnaAndDhokha
- heartMindConflict
- nightOverthinkingTrait
- secretIntuition
- palmSignsWitness
- summaryNarrative

2. Immediately after the \`\`\`json-teaser block, output the translated FULL MARKDOWN READING keeping all markdown headers, bold text, and bullet structures intact.
`;

    let responseText: string | null = null;

    if (geminiApiKey) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 3800,
              },
            }),
          }
        );

        if (res.ok) {
          const data = await res.json();
          responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || null;
        }
      } catch (err) {
        console.warn("Gemini translate error, trying OpenAI:", err);
      }
    }

    if (!responseText && openaiApiKey) {
      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.3,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          responseText = data.choices?.[0]?.message?.content || null;
        }
      } catch (err) {
        console.warn("OpenAI translate error:", err);
      }
    }

    if (!responseText) {
      return NextResponse.json({
        success: false,
        error: "Translation service temporarily unavailable.",
      });
    }

    // Parse translated teaser and markdown
    let translatedTeaser = freeTeaser;
    let translatedMarkdown = rawMarkdown;

    const teaserMatch = responseText.match(/```json-teaser\s*([\s\S]*?)\s*```/);
    if (teaserMatch && teaserMatch[1]) {
      try {
        translatedTeaser = JSON.parse(teaserMatch[1].trim());
      } catch (e) {
        console.warn("Could not parse translated JSON teaser:", e);
      }
    }

    const markdownParts = responseText.split(/```json-teaser[\s\S]*?```/);
    if (markdownParts.length > 1 && markdownParts[1].trim().length > 50) {
      translatedMarkdown = markdownParts[1].trim();
    } else if (responseText.includes("# ")) {
      translatedMarkdown = responseText.slice(responseText.indexOf("# "));
    }

    return NextResponse.json({
      success: true,
      freeTeaser: translatedTeaser,
      rawMarkdown: translatedMarkdown,
      language: targetLanguage,
    });
  } catch (error: any) {
    console.error("Error in /api/translate-reading:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to translate reading." },
      { status: 500 }
    );
  }
}
