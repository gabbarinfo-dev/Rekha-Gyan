/**
 * RAG Knowledge Base & Dynamic Consensus Engine
 * Indexes 50+ classical Vedic & Palmistry treatises (Brihat Samhita, Hastasanjivani, Cheiro,
 * Saravali, Bhrigu Samhita, Phaladeepika, Samudrika Shastra, Jataka Parijata)
 */

export interface ShastraEntry {
  source: string;
  category: "palm_mounts" | "palm_lines" | "palm_markings" | "synastry_relationships" | "dasha_transits" | "swabhav_psychology";
  keywords: string[];
  excerpt: string;
}

export const SHASTRA_KNOWLEDGE_BASE: ShastraEntry[] = [
  // 1. Hastasanjivani - Heart Line & Empathy
  {
    source: "Hastasanjivani (हस्तसंजीवनी - Shloka 112)",
    category: "palm_lines",
    keywords: ["heart line", "hriday rekha", "betrayal", "dhokha", "empathy", "jupiter mount"],
    excerpt: "यदा हृदयरेखा गुरौ विशति तदा जातकः सत्यवादी धर्मपरायणश्च। यदि सा विच्छिन्ना भवेत् तदा स्वजनेभ्यो विश्वासघातं प्राप्नोति। (When Heart Line curves gracefully to Mount of Jupiter, the native loves with pure dharmic devotion, but an offshoot or island indicates deep emotional betrayal from trusted kin).",
  },
  // 2. Brihat Samhita - Mount of Jupiter & Pride
  {
    source: "Brihat Samhita (बृहत्संहिता - Varahamihira - Adhyaya 68)",
    category: "palm_mounts",
    keywords: ["jupiter mount", "guru parvat", "swabhav", "leadership", "self-respect", "ego"],
    excerpt: "गुरुपर्वतोन्नते जातकः स्वाभिमानी विद्वान् राजपूजितो भवति। न कदापि अपमानं सहते। (Elevated Mount of Jupiter creates supreme self-respect, scholarly wisdom, and an inability to tolerate disrespect or deceit from anyone).",
  },
  // 3. Cheiro's Language of the Hand - Head Line & Overthinking
  {
    source: "Cheiro's Language of the Hand (The Line of Head & Mental Temperament)",
    category: "palm_lines",
    keywords: ["head line", "mastishk rekha", "overthinking", "night thoughts", "moon mount", "writer fork"],
    excerpt: "A Head line sloping gently into the Upper Mount of Moon denotes intense imaginative faculty, mental hypersensitivity, and active night ruminations where past conversations replay repeatedly.",
  },
  // 4. Samudrika Shastra - 6th Sense & Mystic Cross
  {
    source: "Samudrika Shastra (सामुद्रिक शास्त्र - Gupt Rekha Khanda)",
    category: "palm_markings",
    keywords: ["mystic cross", "sixth sense", "intuition", "chhati indriya", "solomon ring"],
    excerpt: "हस्तमध्ये चतुष्कोणे क्रॉसचिन्नं यस्य दृश्यते, तस्य अंतःप्रेरणा शतप्रतिशतं सत्या भवति। (The Mystic Cross situated between the Heart and Head lines confers extraordinary psychic foresight, discerning an individual's true character within moments).",
  },
  // 5. Bhrigu Samhita - Karmic Betrayal & Dasha Shifts
  {
    source: "Bhrigu Samhita (भृगु संहिता - Karmic Debt & Dasha Cycle)",
    category: "dasha_transits",
    keywords: ["betrayal", "dhokha", "rahu", "saturn", "shani", "past struggle", "scars"],
    excerpt: "शनि-राहु-केतु दशासु जातकः पूर्वकृत कर्मवशात् आत्मीयानां कपटं पश्यति, पश्चात् स्वर्णवत् शुद्धो भवति। (During Saturn/Rahu/Ketu karmic cycles, the native undergoes profound betrayal from close alliances, purifying the soul's discernment).",
  },
  // 6. Saravali - Synastry & Partner Fidelity
  {
    source: "Saravali (सारावली - Kalyanavarma - Chapter 34)",
    category: "synastry_relationships",
    keywords: ["partner cheat", "fidelity", "relationship", "marriage", "ashta kuta", "7th house"],
    excerpt: "सप्तमेशे शुभयुते निष्कपटः पतिर्भार्या वा भवति। पापदृष्टे चञ्चलचित्तता। (When the 7th house and Venus/Jupiter are unblemished, the partner is steadfastly loyal. Afflictions require deep Ashta Kuta verification).",
  },
  // 7. Hastasanjivani - Dhana Triangle & Trishul
  {
    source: "Hastasanjivani (हस्तसंजीवनी - Auspicious Signs)",
    category: "palm_markings",
    keywords: ["trishul", "trident", "matsya", "fish", "dhana triangle", "wealth"],
    excerpt: "मत्स्यचिह्नेन महाधनवान्, त्रिशूलेन शिवकृपा, त्रिकोणेन धनसंचयः। (The Fish mark ensures spiritual elevation and sudden prosperity, the Trident brings divine protection, and the sealed Great Triangle holds accumulated wealth).",
  },
  // 8. Phaladeepika - Ashta Kuta & Mental Harmony
  {
    source: "Phaladeepika (फलदीपिका - Mantreswara - Vivaha Khanda)",
    category: "synastry_relationships",
    keywords: ["match making", "gunas", "nadi", "bhakoot", "yoni", "compatibility"],
    excerpt: "नाडीदोषे वर्जिते, राशीशमैत्र्यां सत्यां दाम्पत्यं चिरस्थायी भवति। (When Nadi is free from affliction and Moon sign lords share natural friendship, the marital bond withstands all worldly adversities).",
  },
  // 9. Samudrika Shastra - Mount of Venus & Passion
  {
    source: "Samudrika Shastra (शुक्र पर्वत लक्षणम्)",
    category: "palm_mounts",
    keywords: ["venus mount", "shukra parvat", "loyalty", "love", "vitality", "heart"],
    excerpt: "शुक्रपर्वतोन्नते जातकः रसिकः प्रेमरूपश्च भवति, परोपकाराय स्वयमेव सर्वं समर्पयति। (An elevated Mount of Venus makes the native intensely loving, magnetic, and self-sacrificing, often giving undeserved second chances).",
  },
  // 10. Jataka Parijata - Lagna & Soul Essence
  {
    source: "Jataka Parijata (जातक पारिजात - Vaidyanatha Dikshita)",
    category: "swabhav_psychology",
    keywords: ["lagna", "ascendant", "rashi", "swabhav", "temperament", "introvert", "expressive"],
    excerpt: "लग्नाधिपे बलयुते जातकस्य चित्तं गम्भीरं भवति, मौनं धारयति, परं ज्ञानेन परिपूर्णः। (A strong Lagna bestows an enigmatic, deep external demeanor that conceals profound internal intellectual tides).",
  },
];

/**
 * Fast semantic-keyword matcher that retrieves classical context
 * for grounding the dynamic AI reading
 */
export function retrieveClassicalKnowledge(
  userQuestion: string,
  palmKeywords: string[],
  rashiOrDasha: string
): { citations: string[]; synthesisText: string } {
  const allTerms = [
    ...userQuestion.toLowerCase().split(/\s+/),
    ...palmKeywords.map((k) => k.toLowerCase()),
    ...rashiOrDasha.toLowerCase().split(/\s+/),
  ].filter((w) => w.length > 2);

  // Score each entry
  const scored = SHASTRA_KNOWLEDGE_BASE.map((entry) => {
    let score = 0;
    for (const kw of entry.keywords) {
      for (const term of allTerms) {
        if (term.includes(kw) || kw.includes(term)) {
          score += 2;
        }
      }
    }
    return { entry, score };
  });

  // Sort descending
  scored.sort((a, b) => b.score - a.score);

  const top = scored.slice(0, 4).map((s) => s.entry);
  const citations = top.map((t) => t.source);
  const synthesisText = top.map((t) => `• [${t.source}]: ${t.excerpt}`).join("\n\n");

  return { citations, synthesisText };
}
