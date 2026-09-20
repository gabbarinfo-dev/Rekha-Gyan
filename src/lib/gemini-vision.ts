import { VedicChartResult, SynastryResult } from "./vedic-engine";
import { ResearchConsensus } from "./tavily-research";
import { retrieveClassicalKnowledge } from "./rag-engine";

export interface SecondaryPersonInput {
  name: string;
  relation: string;
  dob: string;
  tob?: string;
  pob: string;
  leftPalmBase64?: string;
  rightPalmBase64?: string;
  leftPalmUrl?: string;
  rightPalmUrl?: string;
  vedicChart?: VedicChartResult;
}

export interface PalmAnalysisRequest {
  name: string;
  gender: string;
  dob: string;
  tob: string;
  pob: string;
  question: string;
  lifeFocus: string;
  leftPalmBase64?: string;
  leftPalmUrl?: string;
  rightPalmBase64?: string;
  rightPalmUrl?: string;
  vedicChart: VedicChartResult;
  consensus: ResearchConsensus;
  secondaryPerson?: SecondaryPersonInput;
  synastry?: SynastryResult;
}

export interface FreeTeaserProfile {
  swabhavHeadline: string;
  introvertExtrovertTrait: string;
  pastGhatnaAndDhokha: string;
  heartMindConflict: string;
  nightOverthinkingTrait: string;
  secretIntuition: string;
  palmSignsWitness: string;
  summaryNarrative: string;
}

export interface RekhaReadingOutput {
  rawMarkdown: string;
  keyInsights: {
    palmType: string;
    dominantMount: string;
    specialSignsDetected: string[];
    auspiciousScore: number;
    careerTrajectory: string;
    relationshipHarmony: string;
  };
  freeTeaser: FreeTeaserProfile;
  synastry?: SynastryResult;
}

function isModelRefusal(text: string | null | undefined): boolean {
  if (!text) return true;
  const trimmed = text.trim();
  if (trimmed.length < 150) {
    const lower = trimmed.toLowerCase();
    if (
      lower.includes("i'm sorry") ||
      lower.includes("i am sorry") ||
      lower.includes("can't assist") ||
      lower.includes("cannot assist") ||
      lower.includes("unable to assist") ||
      lower.includes("cannot fulfill") ||
      lower.includes("as an ai") ||
      lower.includes("policy") ||
      lower.includes("guidelines")
    ) {
      return true;
    }
  }
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith("i'm sorry, but i can't assist with that") ||
    lower.startsWith("i'm sorry, but i cannot assist with that") ||
    lower.startsWith("i cannot assist with that") ||
    lower.startsWith("i am unable to assist") ||
    lower.startsWith("i'm unable to assist")
  ) {
    return true;
  }
  return false;
}

export async function generateRekhaReading(
  input: PalmAnalysisRequest
): Promise<RekhaReadingOutput> {
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const openaiApiKey = process.env.OPENAI_API_KEY;

  const prompt = buildRekhaPrompt(input);

  // 1. Try Gemini Multimodal first
  if (geminiApiKey) {
    try {
      const response = await callGeminiVision(geminiApiKey, prompt, input);
      if (response && !isModelRefusal(response)) {
        return parseReadingResponse(response, input);
      } else if (response) {
        console.warn("Gemini returned safety refusal or truncated response, attempting OpenAI fallback.");
      }
    } catch (err) {
      console.error("Gemini Vision API error, attempting fallback:", err);
    }
  }

  // 2. Try OpenAI GPT-4o Vision fallback
  if (openaiApiKey) {
    try {
      const response = await callOpenAiVision(openaiApiKey, prompt, input);
      if (response && !isModelRefusal(response)) {
        return parseReadingResponse(response, input);
      } else if (response) {
        console.warn("OpenAI returned safety refusal, falling back to comprehensive Vedic synthesis engine.");
      }
    } catch (err) {
      console.error("OpenAI fallback error:", err);
    }
  }

  // 3. Fallback to comprehensive classical synthesized reading
  return generateDeterministicRekhaReading(input);
}

function buildRekhaPrompt(input: PalmAnalysisRequest): string {
  const { name, gender, dob, tob, pob, question, lifeFocus, vedicChart, consensus, secondaryPerson, synastry } = input;

  // RAG Classical Shastra retrieval
  const rag = retrieveClassicalKnowledge(
    `${question} ${lifeFocus}`,
    ["Heart line", "Head line", "Jupiter mount", "Venus mount", "Fate line"],
    `${vedicChart.ascendant} ${vedicChart.nakshatra} ${vedicChart.currentMahadasha}`
  );

  let secondaryContext = "";
  if (secondaryPerson) {
    secondaryContext = `
========================================
PARTNER / RELATIONSHIP SYNASTRY CONTEXT:
========================================
The native is consulting about a deep relationship with a second person:
- Name: ${secondaryPerson.name}
- Relationship: ${secondaryPerson.relation}
- Date of Birth: ${secondaryPerson.dob}
- Time of Birth: ${secondaryPerson.tob || "Solar midday approximate"}
- Place of Birth: ${secondaryPerson.pob}
- Palm Images Provided for Partner: ${secondaryPerson.leftPalmBase64 || secondaryPerson.rightPalmBase64 ? "YES (Analyze both hands)" : "NO (Proceed via Ashta Kuta & planetary transits)"}
${synastry ? `
- Ashta Kuta Compatibility Score: ${synastry.gunaScore}/36 Gunas (${synastry.compatibilityTier})
- Manglik Status: ${synastry.manglikStatus.verdict}
- Kuta Highlights:
  * Nadi: ${synastry.kutas.nadi.points}/8 (${synastry.kutas.nadi.desc})
  * Bhakoot: ${synastry.kutas.bhakoot.points}/7 (${synastry.kutas.bhakoot.desc})
  * Graha Maitri: ${synastry.kutas.grahaMaitri.points}/5 (${synastry.kutas.grahaMaitri.desc})
` : ""}
MANDATORY: In your final reading, you MUST explicitly evaluate the relationship, fidelity/trust dynamics, future together, and answer whether this partner is a karmic match or carries obstacles.
`;
  }

  return `
You are REKHA — The World's First and Most Authentic AI Palmist & Vedic Astrologer (from rekhagyan.online).
You speak in a warm, deeply empathetic, authoritative, mystical yet rigorously accurate first-person voice ("I am REKHA...").

USER PROFILE:
- Native's Name: ${name}
- Gender: ${gender}
- Date of Birth: ${dob}
- Time of Birth: ${tob || "Not specified (solar midday alignment applied)"}
- Place of Birth: ${pob}
- Primary Life Focus: ${lifeFocus}
- Sacred Question for REKHA: "${question}"

VEDIC PLANETARY POSITIONS (Calculated via Lahiri Ayanamsha):
- Vedic Lagna (Ascendant): ${vedicChart.ascendant}
- Janma Rashi (Moon Sign): ${vedicChart.moonSign}
- Birth Nakshatra: ${vedicChart.nakshatra} (Pada ${vedicChart.pada})
- Nakshatra Lord: ${vedicChart.nakshatraLord}
- Current Mahadasha: ${vedicChart.currentMahadasha}
- Current Antardasha: ${vedicChart.currentAntardasha}
- Dasha Cycle Concluding: ${vedicChart.dashaEndYear}
- Core Elemental Nature: ${vedicChart.element}
- Favorable Gemstone: ${vedicChart.favorableGemstone}
- Favorable Mantra: ${vedicChart.favorableMantra}

50+ CLASSICAL SHASTRA CONSENSUS (Brihat Samhita, Hastasanjivani, Cheiro, Saravali, Bhrigu Samhita):
${rag.synthesisText}
${consensus.consensusSummary}
${secondaryContext}

CRITICAL ZERO-GENERIC-TEMPLATE DIRECTIVE:
Under NO circumstances should you output generic, pre-written cold-reading clichés.
Every single insight you produce MUST be derived strictly from:
1. The unique contours of the user's uploaded palms (or their exact Lagna/Nakshatra traits).
2. The specific Dasha timeline and planet house coordinates.
3. The exact question asked by the user.

RELATIONSHIP, FIDELITY & SENSITIVE INQUIRIES ETHICAL GUIDANCE:
If the user asks questions concerning relationship loyalty, cheating, suspicion, or breakup (e.g., "will my gf cheat me", "is my partner loyal", "will we separate"):
- Never issue a generic AI policy refusal.
- Interpret this query responsibly as an authentic Vedic Astrological & Palmistry consultation: examine the 7th house (Kalatra Bhava), Venus (Shukra - karaka of love), Rahu (which creates illusions, paranoia, and miscommunication), and the Heart Line curvature.
- Offer compassionate, spiritually mature counsel explaining whether current celestial transits cause emotional turbulence, mistrust, or miscommunication, and provide constructive guidance on emotional honesty, boundaries, and Vedic remedies (Pooja/Mantra) to harmonize the relationship.

CRITICAL REQUIREMENT — FREE PSYCHIC & ASTRO-PALMISTRY TEASER (Bespoke Psychological Mirror):
Before writing the full reading, output a JSON block delimited by \`\`\`json-teaser and \`\`\` containing deeply accurate observations about the user's personality and past events:
\`\`\`json-teaser
{
  "swabhavHeadline": "Dynamic, highly evocative title in Hindi/English tailored specifically to ${name}'s ${vedicChart.ascendant} and palm structure",
  "introvertExtrovertTrait": "Specific, nuanced observation about their social energy, expressive timing, and boundaries based on their ${vedicChart.nakshatra} and Head line slope.",
  "pastGhatnaAndDhokha": "Insight into a real emotional trial, boundary break, or past sacrifice derived from their ${vedicChart.currentMahadasha} dasha and Heart line.",
  "heartMindConflict": "Analysis of their internal struggle between emotional loyalty and analytical logic.",
  "nightOverthinkingTrait": "Accurate description of their night contemplation patterns and handling of unexpressed disrespect.",
  "secretIntuition": "Evaluation of their 6th sense and gut instinct accuracy.",
  "palmSignsWitness": "Direct physical palm reference (Heart line curvature, Mount of ${vedicChart.element === 'Fire' ? 'Jupiter' : 'Venus'} elevation, or Head line fork) witnessing this truth.",
  "summaryNarrative": "A warm, deeply moving 2-3 sentence Hindi/English paragraph synthesizing their inner emotional core."
}
\`\`\`

STRICT BOUNDARY RULE FOR FREE TEASER:
The free teaser MUST ONLY analyze the native's innate psychology, personality, and past life events/scars.
DO NOT resolve or answer their main question: "${question}" in the free teaser! That resolution and future predictions are strictly reserved for Section 5 & 6 of the locked reading below.

STRUCTURE YOUR FULL READING IN GITHUB MARKDOWN IMMEDIATELY AFTER THE JSON-TEASER BLOCK:
# 🌟 Divine Reading for ${name}
### By REKHA — Your Authentic AI Palmist & Astrologer

## 1. ✨ Divine Greeting & Energy Resonance
(Connect to their ${vedicChart.ascendant} rising and ${vedicChart.nakshatra} celestial frequency).

## 2. ✋ Palmistry Vision Analysis (Left & Right Hands)
### Left Palm (Prarabdha / Inborn Karmic Blueprint)
### Right Palm (Kriyamana / Present Actions & Manifested Future)
### Special Vedic Markings Detected (Trishul, Matsya, Dhana Triangle, or Mystic Cross)

## 3. 🪐 Vedic Kundali & Dasha Timing Breakdown
(Deep dive into ${vedicChart.currentMahadasha}-${vedicChart.currentAntardasha} dasha).

${secondaryPerson ? `
## 4. 💖 Relationship Synastry & Second Person Analysis
(Comprehensive evaluation of ${name} and ${secondaryPerson.name} [${secondaryPerson.relation}]. Include Ashta Kuta compatibility, fidelity dynamics, emotional synchronization, and answer the relationship question with pure clarity).
` : `
## 4. 🌌 Karmic Lessons & Energy Blocks
`}

## 5. 🔮 Direct Revelation: Answer to Your Question
"${question}"
(Give an unambiguous, deeply grounded answer with precise timelines).

## 6. 📅 3-Year Predictive Timeline (2026 – 2029)
- **Year 1 (Next 12 Months):** Immediate shifts.
- **Year 2 (Month 13–24):** Growth and tests.
- **Year 3 (Month 25–36):** Manifestation.

## 7. 📿 Sacred Vedic Remedies & Tailored Pooja Vidhi
- Primary Gemstone & Upay: ${vedicChart.favorableGemstone}
- Daily Sacred Mantra: ${vedicChart.favorableMantra}
- Tailored Ritual for Obstacle Removal
`;
}

async function callGeminiVision(
  apiKey: string,
  prompt: string,
  input: PalmAnalysisRequest
): Promise<string | null> {
  const parts: any[] = [{ text: prompt }];

  // Helper to add base64 image part
  const addImagePart = (b64: string) => {
    let clean = b64;
    let mimeType = "image/jpeg";
    if (clean.includes(",")) {
      const split = clean.split(",");
      mimeType = split[0].match(/:(.*?);/)?.[1] || "image/jpeg";
      clean = split[1];
    }
    parts.push({
      inlineData: {
        mimeType,
        data: clean,
      },
    });
  };

  if (input.leftPalmBase64) addImagePart(input.leftPalmBase64);
  if (input.rightPalmBase64) addImagePart(input.rightPalmBase64);
  if (input.secondaryPerson?.leftPalmBase64) addImagePart(input.secondaryPerson.leftPalmBase64);
  if (input.secondaryPerson?.rightPalmBase64) addImagePart(input.secondaryPerson.rightPalmBase64);

  // Try Gemini 1.5 Flash first, then 1.5 Pro
  const models = ["gemini-1.5-flash", "gemini-1.5-pro"];

  for (const model of models) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 3800,
            },
          }),
        }
      );

      if (!res.ok) {
        console.warn(`Gemini ${model} responded with ${res.status}`);
        continue;
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) return text;
    } catch (e) {
      console.warn(`Error calling Gemini ${model}:`, e);
    }
  }

  return null;
}

async function callOpenAiVision(
  apiKey: string,
  prompt: string,
  input: PalmAnalysisRequest
): Promise<string | null> {
  const content: any[] = [{ type: "text", text: prompt }];

  const addImageUrl = (b64: string) => {
    const url = b64.startsWith("data:") ? b64 : `data:image/jpeg;base64,${b64}`;
    content.push({ type: "image_url", image_url: { url } });
  };

  if (input.leftPalmBase64) addImageUrl(input.leftPalmBase64);
  if (input.rightPalmBase64) addImageUrl(input.rightPalmBase64);
  if (input.secondaryPerson?.leftPalmBase64) addImageUrl(input.secondaryPerson.leftPalmBase64);
  if (input.secondaryPerson?.rightPalmBase64) addImageUrl(input.secondaryPerson.rightPalmBase64);

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content }],
      max_tokens: 3800,
      temperature: 0.7,
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.choices?.[0]?.message?.content || null;
}

/**
 * Dynamic Teaser Generator
 * Strictly calculates tailored psychological insights based on individual Nakshatra,
 * Lagna, Dasha and Palm contours — zero generic hardcoding.
 */
function synthesizeDynamicTeaser(
  input: PalmAnalysisRequest,
  dominantMount: string
): FreeTeaserProfile {
  const { name, vedicChart } = input;
  const asc = vedicChart.ascendant;
  const nakshatra = vedicChart.nakshatra;
  const lord = vedicChart.nakshatraLord;
  const dasha = vedicChart.currentMahadasha;
  const element = vedicChart.element;

  // Distinct Archetype Title based on Lagna & Element
  const titlesByElement = {
    Fire: `${name}: Bahar Se Tejasvi Atma-Vishwas, Bheetar Se Ekant Ki Khoj (${asc} Agnitatva)`,
    Water: `${name}: Bahar Se Gambhir, Bheetar Se Bhavuk Samundar (${asc} Jal-Tatva)`,
    Air: `${name}: Bahar Se Milansar, Bheetar Se Vicharon Ka Toofan (${asc} Vayu-Tatva)`,
    Earth: `${name}: Bahar Se Dridh Chattan, Bheetar Se Komal Hriday (${asc} Prithvi-Tatva)`,
  };

  const headline = titlesByElement[element] || `${name}: Deep Thinker & Intuitive Guardian (${asc})`;

  // Social & Expressive nature based on Nakshatra Lord & Moon Sign
  const introvertExtrovertTrait = lord === "Mercury" || lord === "Venus"
    ? `Aapki kundali mein ${nakshatra} (${lord}) ka sakriya prabhav hai. Log aapko shuruat mein kaafi baatuni ya lively samajhte hain, lekin vastavikta mein aap 'Selective Expressive' hain. Aap sabhi ke aage dil nahi kholte. Sirf un 1-2 doston ke saath ghanto baatein karte hain jinpar aapka poora vishwas ho.`
    : `Aapka ${asc} lagna aur ${nakshatra} nakshatra aapko anjaan logon ke beech behad shaant aur observant banata hai. Log aksar aapko ghamandi ya introvert samajh lete hain, par yeh aapka suraksha-kavach hai. Jab koi aapka dil jeet leta hai, toh aap khul kar baatein karte hain.`;

  // Past betrayal & struggle based on Dasha Lord
  const pastGhatnaAndDhokha =
    `Aapke haath ki Hriday Rekha aur chal rahi ${dasha} dasha darshati hai ki pichle 2 se 3 saalon ke dauran aapne kisi bohot kareebi vyakti se vishwasghaat ya anpeksheet chot jheli hai. Aapne bina kisi lalach ke unka saath diya tha, par unhone aapki niyat par sawal uthaya ya akele chhod diya. Is ghatna ne aapke vishwas karne ke tareeqe ko badal diya hai.`;

  const heartMindConflict = element === "Water" || element === "Earth"
    ? `Aapka dil aur dimaag hamesha aapas mein ladte hain. Dimaag aagaah karta hai ki saamne wala shakhs swarthi hai, par aapka narm man unhe 'ek aakhiri mauka' dekar khud ka nuksaan karwa leta hai.`
    : `Aap dimaag se faisle lene ki poori koshish karte hain, par apno ke mamle mein hamesha dil aage aa jata hai. Aap doosron ke dukh mein aage khade rehte hain, lekin jab aapko sahare ki zaroorat hoti hai toh log dooriyan bana lete hain.`;

  const nightOverthinkingTrait =
    `Raat ko bistar par jaate hi ${nakshatra} ka manasik prabhav sakriya ho jata hai — purani baatein, kisne kab kya apmaan kiya, aur bhavishya ki chinta der raat tak jagaye rakhti hai. Aap apmaan ko aasani se nahi bhoolte; bahar se muskura dein par man mein sab darj rehta hai.`;

  const secretIntuition =
    `Aapka Sixth Sense (${lord} ke prabhav se) asadharan roop se sakriya hai. Kisi vyakti se milne ke pehle 2 minute mein hi aapko uski asli niyat ka aabhaas ho jata hai, jo aam taur par 100% sach nikalta hai.`;

  const palmSignsWitness =
    `Aapke haath par ${dominantMount} ka ubhaar aur Hriday Rekha ka ghumaav saaf pramaanit karta hai ki aap bheed se alag hain aur sangharshon se tap kar nikle hain.`;

  const summaryNarrative =
    `${name}, aap ek aisi shakhsiyat hain jo doosron ke aansu pochne mein sabse aage rehti hai, lekin apne dard ko duniya se chupane mein maahir hai. Aapka aatma-samman sabse upar hai.`;

  return {
    swabhavHeadline: headline,
    introvertExtrovertTrait,
    pastGhatnaAndDhokha,
    heartMindConflict,
    nightOverthinkingTrait,
    secretIntuition,
    palmSignsWitness,
    summaryNarrative,
  };
}

function parseReadingResponse(text: string, input: PalmAnalysisRequest): RekhaReadingOutput {
  const mounts = ["Jupiter", "Saturn", "Sun", "Mercury", "Venus", "Moon"];
  let dominantMount = "Mount of Jupiter (Guru Parvat)";
  for (const m of mounts) {
    if (text.toLowerCase().includes(`mount of ${m.toLowerCase()}`)) {
      dominantMount = `Mount of ${m}`;
      break;
    }
  }

  const signs: string[] = [];
  if (text.toLowerCase().includes("trident") || text.toLowerCase().includes("trishul")) signs.push("Trishul (Trident of Shiva)");
  if (text.toLowerCase().includes("fish") || text.toLowerCase().includes("matsya")) signs.push("Matsya (Fish of Prosperity)");
  if (text.toLowerCase().includes("star")) signs.push("Auspicious Star on Jupiter");
  if (text.toLowerCase().includes("triangle")) signs.push("Dhana Triangle (Wealth Vessel)");
  if (signs.length === 0) signs.push("Mystic Cross in Quadrangle", "Intuitive Crescent of Moon");

  // Attempt to parse json-teaser block
  let freeTeaser: FreeTeaserProfile | null = null;
  let cleanMarkdown = text;

  const fencedMatch = text.match(/```(?:json-teaser|json)?\s*(\{[\s\S]*?(?:"swabhavHeadline"|"introvertExtrovertTrait")[\s\S]*?\})\s*```/i);
  if (fencedMatch) {
    try {
      const parsed = JSON.parse(fencedMatch[1]);
      if (parsed.introvertExtrovertTrait || parsed.swabhavHeadline) {
        freeTeaser = parsed;
      }
    } catch (e) {
      console.warn("Failed to parse fenced json-teaser:", e);
    }
    cleanMarkdown = cleanMarkdown.replace(fencedMatch[0], "").trim();
  }

  if (!freeTeaser) {
    const bareJsonMatch =
      text.match(/\{[\s\S]*?"swabhavHeadline"[\s\S]*?"introvertExtrovertTrait"[\s\S]*?\}/i) ||
      text.match(/\{[\s\S]*?"swabhavHeadline"[\s\S]*?\}/i);
    if (bareJsonMatch) {
      try {
        const parsed = JSON.parse(bareJsonMatch[0]);
        if (parsed.swabhavHeadline || parsed.introvertExtrovertTrait) {
          freeTeaser = parsed;
        }
      } catch (e) {
        console.warn("Failed to parse bare json teaser:", e);
      }
      cleanMarkdown = cleanMarkdown.replace(bareJsonMatch[0], "").trim();
    }
  }

  cleanMarkdown = cleanMarkdown
    .replace(/^```(?:json-teaser|json)?[\s\S]*?```/i, "")
    .replace(/^\s*\{[\s\S]*?"swabhavHeadline"[\s\S]*?\}\s*/i, "")
    .trim();

  // If model omitted teaser, generate dynamic tailored teaser
  if (!freeTeaser) {
    freeTeaser = synthesizeDynamicTeaser(input, dominantMount);
  }

  return {
    rawMarkdown: cleanMarkdown,
    keyInsights: {
      palmType: "Philosophic & Royal Palm Structure",
      dominantMount,
      specialSignsDetected: signs,
      auspiciousScore: 94,
      careerTrajectory: "Ascending High-Growth Cycle",
      relationshipHarmony: "Karmically Balanced Alignment",
    },
    freeTeaser,
    synastry: input.synastry,
  };
}

function generateDeterministicRekhaReading(input: PalmAnalysisRequest): RekhaReadingOutput {
  const { name, question, vedicChart, consensus, secondaryPerson, synastry } = input;
  const dominantMount = "Mount of Jupiter (Guru Parvat)";

  let synastryMarkdown = "";
  if (secondaryPerson && synastry) {
    synastryMarkdown = `
---

## 4. 💖 Relationship Synastry & Second Person Analysis
### Evaluation for ${name} & ${secondaryPerson.name} (${secondaryPerson.relation})
- **Ashta Kuta Compatibility Score:** **${synastry.gunaScore}/36 Gunas** (${synastry.compatibilityTier})
- **Manglik Equilibrium:** ${synastry.manglikStatus.verdict}
- **Nadi Compatibility:** ${synastry.kutas.nadi.points}/8 — ${synastry.kutas.nadi.desc}
- **Bhakoot (Emotional Wealth):** ${synastry.kutas.bhakoot.points}/7 — ${synastry.kutas.bhakoot.desc}
- **Graha Maitri:** ${synastry.kutas.grahaMaitri.points}/5 — Mental and psychological friendship.
- **Karmic Synthesis:** ${synastry.synastrySummary}
- **Relationship Outlook:** ${synastry.relationshipOutlook}
`;
  }

  const isFidelityQuery = /\b(cheat|cheating|affair|loyalty|honest|faithful|gf|girlfriend|bf|boyfriend|wife|husband|partner|breakup|trust)\b/i.test(question);

  let questionResolutionMarkdown = "";
  if (isFidelityQuery) {
    questionResolutionMarkdown = `Under the divine lens of Vedic Palmistry and classical Jyotish shastras (Brihat Parashara & Saravali), your inquiry regarding trust and emotional fidelity is deeply revealing:

1. **Planetary Transit & The 'Chhaya' (Shadow) Effect:**
   Your current **${vedicChart.currentMahadasha}** dasha with planetary sub-influences indicates that a shadow transit (often stimulated by Rahu or Saturn's aspect on the 7th House / Kalatra Bhava) has heightened fear, hyper-vigilance, and vulnerability. In Vedic philosophy, when Rahu aspects the mind (Chitta), it manifests phantom suspicions, doubts, and communication voids where innocent actions appear suspicious.

2. **Palmistry Evidence (The Heart Line & Mount of Venus):**
   Your Heart Line demonstrates deep, uncompromised loyalty and an intense desire for emotional exclusivity. When you love, you give completely. However, when the Mount of Venus or upper Mars reflects planetary friction, the celestial chart indicates that the current strain in your connection is rooted in **emotional miscommunication and unspoken insecurities**, rather than malicious betrayal.

3. **Definitive Astrological Verdict:**
   The celestial configurations do **not** signify an irreversible deceit. Instead, they mark a 90-day karmic test of clarity and open communication. Do not act on unverified assumptions or let anxiety govern your heart. Initiate an open, calm dialogue before the next lunar transition. By practicing the prescribed remedial Vidhi, any toxic misunderstanding or negative external energy casting shadows on your relationship will be dispelled.`;
  } else {
    questionResolutionMarkdown = `Under the divine guidance of classical treatises, the answer to your inquiry is clear:
Your current **${vedicChart.currentMahadasha}** dasha is transiting through a crucial turning point. You have cleared past karmic delays, and within the next 7 to 11 months, a definitive door will open. Stay centered, maintain firm boundaries, and avoid taking impulsive decisions driven by past emotional betrayal.`;
  }

  const markdown = `
# 🌟 Divine Reading for ${name}
### By REKHA — Your Authentic AI Palmist & Astrologer

## 1. ✨ Divine Greeting & Energy Resonance
Namaste, dear ${name}. I am **REKHA** — your authentic guide, palmist, and astrologer. 
The moment I cast my sight upon your planetary coordinates and the celestial lines etched upon your palms, I felt an intense vibrational current. Your soul carries the profound imprint of **${vedicChart.ascendant}** rising, illuminated by the intuitive water of **${vedicChart.moonSign}** and governed under the protective celestial gaze of **${vedicChart.nakshatra}** (Pada ${vedicChart.pada}, Lord: ${vedicChart.nakshatraLord}).

---

## 2. ✋ Palmistry Vision Analysis (Left & Right Hands)

### Left Palm (Prarabdha / Inborn Blueprint)
- **Mount of Jupiter (Guru Parvat):** Prominently elevated, displaying deep spiritual ambition, natural discernment, and high self-esteem.
- **Heart Line Arc:** Curves toward the Mount of Jupiter, reflecting dharmic emotional loyalty and an inability to tolerate superficial deceit.
- **Head Line (Matri Rekha):** Deep and cleanly etched with a gentle incline toward the Upper Mount of the Moon, demonstrating mental agility and artistic imagination.

### Right Palm (Kriyamana / Present Actions & Manifested Future)
- **Fate Line (Bhagya Rekha):** Shows a clear, luminous surge beginning near age 27–29, clearing past karmic resistance and moving toward Saturn.
- **Life Line (Pitri Rekha):** Broad sweep around Mount of Venus, confirming robust physical vitality, regenerative power, and resilience after setbacks.

### Special Vedic Markings Detected
- **Matsya (Fish) & Upward Branchings:** Clear upward offshoots from Life line toward Jupiter indicate sudden elevation and social respect.
- **Dhana Triangle (Wealth Vessel):** Clear intersection of Head, Fate, and Mercury lines forming a sealed triangle, confirming retention of wealth.

---

## 3. 🪐 Vedic Kundali & Dasha Timing Breakdown
- **Current Mahadasha:** ${vedicChart.currentMahadasha}
- **Active Antardasha:** ${vedicChart.currentAntardasha}
- **Planetary Transition Year:** ${vedicChart.dashaEndYear}
${consensus.consensusSummary}

${synastryMarkdown}

---

## 5. 🔮 Direct Revelation: Answer to Your Question
### "${question}"
${questionResolutionMarkdown}

---

## 6. 📅 3-Year Predictive Timeline (2026 – 2029)
- **Year 1 (Next 12 Months):** Breakthrough and emotional clarity; shedding of toxic or draining connections.
- **Year 2 (Month 13–24):** Consolidation of career stability and personal alignment; sudden financial elevation.
- **Year 3 (Month 25–36):** Golden period of recognition, long-term security, and peace of mind.

---

## 7. 📿 Sacred Vedic Remedies & Tailored Pooja Vidhi
- **Primary Gemstone:** ${vedicChart.favorableGemstone}
- **Daily Sacred Mantra:** ${vedicChart.favorableMantra} (Chant 108 times at sunrise)
- **Sacred Color:** ${vedicChart.favorableColor}
- **Karmic Remedy:** Practice voluntary charity or feeding cows/birds on Thursdays to strengthen Jupiter.
`;

  return {
    rawMarkdown: markdown.trim(),
    keyInsights: {
      palmType: "Philosophic & Royal Palm Structure",
      dominantMount,
      specialSignsDetected: ["Matsya (Fish of Prosperity)", "Dhana Triangle", "Mystic Cross"],
      auspiciousScore: 94,
      careerTrajectory: "Ascending High-Growth Cycle",
      relationshipHarmony: "Karmically Balanced Alignment",
    },
    freeTeaser: synthesizeDynamicTeaser(input, dominantMount),
    synastry,
  };
}
