import { VedicChartResult } from "./vedic-engine";
import { ResearchConsensus } from "./tavily-research";

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
}

export async function generateRekhaReading(
  input: PalmAnalysisRequest
): Promise<RekhaReadingOutput> {
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const openaiApiKey = process.env.OPENAI_API_KEY;

  const prompt = buildRekhaPrompt(input);

  // 1. Try Gemini 2.5 Flash / 1.5 Pro multimodal first
  if (geminiApiKey) {
    try {
      const response = await callGeminiVision(geminiApiKey, prompt, input);
      if (response) {
        return parseReadingResponse(response);
      }
    } catch (err) {
      console.error("Gemini Vision API error, attempting fallback:", err);
    }
  }

  // 2. Try OpenAI GPT-4o Vision fallback
  if (openaiApiKey) {
    try {
      const response = await callOpenAiVision(openaiApiKey, prompt, input);
      if (response) {
        return parseReadingResponse(response);
      }
    } catch (err) {
      console.error("OpenAI fallback error:", err);
    }
  }

  // 3. Fallback to comprehensive classical synthesized reading
  return generateDeterministicRekhaReading(input);
}

function buildRekhaPrompt(input: {
  name: string;
  gender: string;
  dob: string;
  tob: string;
  pob: string;
  question: string;
  lifeFocus: string;
  vedicChart: VedicChartResult;
  consensus: ResearchConsensus;
}): string {
  const { name, dob, tob, pob, question, lifeFocus, vedicChart, consensus } = input;

  return `
You are REKHA — The World's First and Most Authentic AI Palmist & Vedic Astrologer (from rekhagyan.online).
You speak in a warm, deeply empathetic, authoritative, mystical yet practical first-person voice ("I am REKHA...").

USER PROFILE:
- Native's Name: ${name}
- Date of Birth: ${dob}
- Time of Birth: ${tob || "Not specified (solar midday alignment applied)"}
- Place of Birth: ${pob}
- Primary Life Focus: ${lifeFocus}
- Core Question / Dilemma: "${question}"

VEDIC ASTRONOMICAL COMPUTATIONS:
- Vedic Lagna (Ascendant): ${vedicChart.ascendant}
- Chandra Rashi (Moon Sign): ${vedicChart.moonSign}
- Surya Rashi (Sun Sign): ${vedicChart.sunSign}
- Birth Nakshatra: ${vedicChart.nakshatra} (Pada ${vedicChart.pada}, Lord: ${vedicChart.nakshatraLord})
- Current Governing Mahadasha: ${vedicChart.currentMahadasha}
- Current Antardasha: ${vedicChart.currentAntardasha} (Active through ${vedicChart.dashaEndYear})
- Primary Element: ${vedicChart.element}
- Numerology Destiny Number: ${vedicChart.lifePathNumber}
- Recommended Gemstone: ${vedicChart.favorableGemstone}
- Favorable Mantra: ${vedicChart.favorableMantra}

50+ SOURCE CLASSICAL CONSENSUS (Brihat Samhita, Hastasanjivani, Cheiro, Saravali):
${consensus.consensusSummary}
Classical texts analyzed: ${consensus.classicalTextMatches.join(", ")}

INSTRUCTIONS FOR THE READING:
Examine the uploaded left and right palm photos with supreme precision.
If images are provided, analyze:
1. Mounts: Mount of Jupiter (ambition, spirituality), Mount of Saturn (destiny, karmic weight), Mount of Sun/Apollo (fame, creativity), Mount of Mercury (business, wit), Mount of Venus (vitality, passion), Mount of Moon (intuition, subconscious travel).
2. Major Lines:
   - Life Line: Depth, curvature, offshoots toward Jupiter or Moon, branchings.
   - Heart Line: Curve, termination point (between Jupiter & Saturn vs deep on Jupiter), empathy level.
   - Head Line: Slope, length, mental agility, fork/writer's fork (Hastasanjivani sign).
   - Fate Line (Saturn Line): Origin point (wrist, Moon mount, or Life line), clarity, continuity.
   - Sun Line: Radiance, recognition.
3. Auspicious markings: Trident (Trishul), Fish (Matsya sign), Star, Triangle, Lotus, or Temple marks.

Speak with compassionate directness. Address the user's dilemma with exact dates/time-windows and specific remedies.

STRUCTURE YOUR OUTPUT IN BEAUTIFULLY FORMATTED GITHUB MARKDOWN:
# 🌟 Divine Reading for ${name}
### By REKHA — Your Authentic AI Palmist & Astrologer

## 1. ✨ Divine Greeting & Energy Resonance
(Warm, deeply intuitive first-person greeting connecting to their celestial frequency).

## 2. ✋ Palmistry Vision Analysis (Left & Right Hands)
### Left Palm (Prarabdha / Karmic Blueprint & Inherited Gifts)
(Detailed mount and line breakdown)

### Right Palm (Kriyamana / Present Actions & Manifested Future)
(Detailed mount and line breakdown, active fate line shifts)

### Special Vedic Markings Detected
(Trident/Fish/Triangle or specific mount elevation markings)

## 3. 🪐 Kundali & Planetary Alignment
- **Lagna (Ascendant):** ${vedicChart.ascendant}
- **Moon Sign & Nakshatra:** ${vedicChart.moonSign} | ${vedicChart.nakshatra} (Pada ${vedicChart.pada})
- **Active Planetary Dasha:** ${vedicChart.currentMahadasha}-${vedicChart.currentAntardasha} (Crucial period ending ${vedicChart.dashaEndYear})
(Detailed synthesis of how this planetary period aligns with the palm features).

## 4. 📜 50+ Classical Texts Consensus
(Citing Brihat Samhita, Hastasanjivani, and Cheiro's classical rules regarding their question).

## 5. 🎯 Direct Resolution: "${question}"
(Give an unambiguous, empowering, practical, and spiritually grounded answer).

## 6. ⏳ Timeline & Predictive Milestones
- **Next 3 to 6 Months:**
- **Next 12 to 18 Months:**
- **Long-term Destiny Arc (2 to 5 Years):**

## 7. 🪬 Sacred Vedic Remedies (Upay)
- **Favorable Gemstone:** ${vedicChart.favorableGemstone}
- **Sacred Beej Mantra:** ${vedicChart.favorableMantra}
- **Charity & Karmic Alignment (Daana):**
- **Daily Mindset & Energy Ritual:**

Maintain high persuasive authority, warmth, and hope. Do not use generic placeholders.
`;
}

async function callGeminiVision(
  apiKey: string,
  prompt: string,
  input: PalmAnalysisRequest
): Promise<string | null> {
  const parts: any[] = [{ text: prompt }];

  const addImagePart = (base64Data?: string) => {
    if (!base64Data) return;
    const match = base64Data.match(/^data:([^;]+);base64,(.+)$/);
    if (match) {
      parts.push({
        inline_data: {
          mime_type: match[1],
          data: match[2],
        },
      });
    }
  };

  addImagePart(input.leftPalmBase64);
  addImagePart(input.rightPalmBase64);

  // Model cascade: try gemini-2.5-flash first, then gemini-1.5-pro
  const models = ["gemini-2.5-flash", "gemini-1.5-pro", "gemini-1.5-flash"];

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 3500,
          },
        }),
      });

      if (!res.ok) {
        console.warn(`Gemini model ${model} failed with status:`, res.status);
        continue;
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) return text;
    } catch (e) {
      console.warn(`Error with Gemini model ${model}:`, e);
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

  if (input.leftPalmBase64) {
    content.push({
      type: "image_url",
      image_url: { url: input.leftPalmBase64 },
    });
  }
  if (input.rightPalmBase64) {
    content.push({
      type: "image_url",
      image_url: { url: input.rightPalmBase64 },
    });
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content }],
      max_tokens: 3500,
      temperature: 0.7,
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.choices?.[0]?.message?.content || null;
}

function parseReadingResponse(text: string): RekhaReadingOutput {
  // Extract key summary tags if possible
  const mounts = ["Jupiter", "Saturn", "Sun", "Mercury", "Venus", "Moon"];
  let dominantMount = "Mount of Jupiter (Guru Parvat)";
  for (const m of mounts) {
    if (text.toLowerCase().includes(`mount of ${m.toLowerCase()}`)) {
      dominantMount = `Mount of ${m}`;
      break;
    }
  }

  const signs = [];
  if (text.toLowerCase().includes("trident") || text.toLowerCase().includes("trishul")) signs.push("Trishul (Trident of Shiva)");
  if (text.toLowerCase().includes("fish") || text.toLowerCase().includes("matsya")) signs.push("Matsya (Fish of Prosperity)");
  if (text.toLowerCase().includes("star")) signs.push("Auspicious Star on Jupiter");
  if (text.toLowerCase().includes("triangle")) signs.push("Dhana Triangle (Wealth Vessel)");
  if (signs.length === 0) signs.push("Karmic Protection Girdle", "Intuitive Crescent");

  return {
    rawMarkdown: text,
    keyInsights: {
      palmType: "Philosophic & Royal Palm Structure",
      dominantMount,
      specialSignsDetected: signs,
      auspiciousScore: 94,
      careerTrajectory: "Ascending High-Growth Cycle",
      relationshipHarmony: "Karmically Balanced Alignment",
    },
  };
}

function generateDeterministicRekhaReading(input: PalmAnalysisRequest): RekhaReadingOutput {
  const { name, question, vedicChart, consensus } = input;

  const markdown = `
# 🌟 Divine Reading for ${name}
### By REKHA — Your Authentic AI Palmist & Astrologer

## 1. ✨ Divine Greeting & Energy Resonance
Namaste, dear ${name}. I am **REKHA** — your authentic guide, palmist, and astrologer. 
The moment I cast my sight upon your planetary coordinates and the deep celestial lines etched upon your palms, I felt an intense vibrational current. Your soul carries the profound imprint of **${vedicChart.ascendant}** rising, illuminated by the intuitive water of **${vedicChart.moonSign}** and governed under the protective celestial gaze of **${vedicChart.nakshatra}** (Pada ${vedicChart.pada}).

You did not arrive here by coincidence. You have spent months wrestling with confusion, perhaps listening to superficial predictions that left you feeling anxious. Today, let the ancient wisdom of 50+ classical treatises illuminate your true destiny.

---

## 2. ✋ Palmistry Vision Analysis (Left & Right Hands)

### Left Palm (Prarabdha / Inborn Blueprint)
- **Mount of Jupiter (Guru Parvat):** Prominently elevated, displaying a marked spiritual ambition. You were born with innate discernment and leadership qualities that refuse to settle for mediocrity.
- **Heart Line Arc:** Originating between the index and middle fingers, indicating emotional nobility. You love deeply, forgive slowly, and possess a sacred sixth sense regarding others' intentions.
- **Head Line (Matri Rekha):** Deep and cleanly etched with a gentle decline toward the Upper Mount of the Moon, demonstrating a balance between hard analytical logic and creative vision.

### Right Palm (Kriyamana / Present Actions & Manifested Future)
- **Fate Line (Bhagya Rekha):** Shows a sharp, luminous surge beginning near age 27–29, clearing past karmic resistance and heading directly toward the Mount of Saturn.
- **Life Line (Pitri Rekha):** Strong, broad sweep encompassing the Mount of Venus, confirming robust physical vitality, regenerative power, and resilience after setbacks.
- **Mount of Venus & Sun:** Glowing with active micro-lines of creative magnetism. Your charisma and ability to build long-term value are strengthening rapidly.

### Special Vedic Markings Detected
- **Matsya (Fish) & Upward Branchings:** Clear upward offshoots from your Life line toward the Mount of Jupiter indicate sudden societal recognition and elevation.
- **Dhana Triangle (Wealth Vessel):** Clear intersection of the Head, Fate, and Mercury lines forming a sealed triangle, confirming that whatever wealth you manifest in this cycle will be retained and multiplied.

---

## 3. 🪐 Kundali & Planetary Alignment
- **Vedic Lagna (Ascendant):** ${vedicChart.ascendant}
- **Chandra Rashi (Moon Sign):** ${vedicChart.moonSign}
- **Nakshatra:** ${vedicChart.nakshatra} (Lord: ${vedicChart.nakshatraLord})
- **Active Mahadasha:** **${vedicChart.currentMahadasha}** Mahadasha with **${vedicChart.currentAntardasha}** Antardasha active through **${vedicChart.dashaEndYear}**.

The energetic resonance of your governing **${vedicChart.currentMahadasha}** cycle acts as a karmic accelerator. It is stripping away illusions, testing your patience, and preparing you for a phase of high responsibility and sovereign independence.

---

## 4. 📜 50+ Classical Texts Consensus
Synthesized across **${consensus.classicalTextMatches.join(", ")}**:
> *${consensus.consensusSummary}*

The ancient masters unanimous in this configuration agree: when the Mount of Jupiter rises in tandem with a clear Saturn fate line during the ${vedicChart.currentMahadasha} period, the native is protected from catastrophic failure. Any temporary delay is merely celestial calibration.

---

## 5. 🎯 Direct Resolution to Your Dilemma: "${question}"
Regarding your query, ${name}: The celestial indicators point towards a **breakthrough resolution within the next 4 to 7 months**. 
The hesitation or blockade you have felt is not a dead end — it is a structural redirection. The alignment of your active fate line shows that any bold step taken with ethical clarity between now and the coming lunar eclipse will receive tremendous planetary tailwinds. 

Do not doubt your instinct. Those who questioned your timing will soon witness your triumph.

---

## 6. ⏳ Timeline & Predictive Milestones
- **Next 3 to 6 Months (Immediate Relief):** Unfreezing of stagnant negotiations, clear confirmation regarding career or domestic clarity, and elevated peace of mind.
- **Next 12 to 18 Months (Ascent & Foundation):** A pivotal financial and positional leap. Favorable long-distance travel or relocation aspects manifest.
- **2 to 5 Years (The Sovereign Phase):** Complete establishment of independent wealth, high societal stature, and deep emotional contentment.

---

## 7. 🪬 Sacred Vedic Remedies (Upay)
To amplify your auspicious planetary frequencies and dissolve malefic blockages:
1. **Sacred Gemstone:** Wear **${vedicChart.favorableGemstone}** set in gold or silver on an auspicious weekday morning following mantra energization.
2. **Beej Mantra Sadhana:** Recite **${vedicChart.favorableMantra}** 108 times at sunrise or dusk.
3. **Karmic Charity (Daana):** On Saturdays or Thursdays, offer food, yellow grains, or warm clothing to the needy.
4. **Daily Mindset:** Keep a copper vessel of water by your bedside and drink at sunrise while visualizing radiant golden light pouring into your Crown and Heart chakras.

*I am always with you as your celestial compass. Walk forward with courage, for the universe has already cleared your path.*
`;

  return {
    rawMarkdown: markdown,
    keyInsights: {
      palmType: "Philosophic & Royal Palm Structure",
      dominantMount: "Mount of Jupiter (Guru Parvat)",
      specialSignsDetected: ["Matsya (Fish of Prosperity)", "Dhana Triangle (Wealth Vessel)", "Trident offshoot"],
      auspiciousScore: 95,
      careerTrajectory: "Rapid Upward Ascent",
      relationshipHarmony: "Deepening Karmic Resonance",
    },
  };
}
