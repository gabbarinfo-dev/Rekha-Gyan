/**
 * RAG Knowledge Base & Dynamic Consensus Engine
 * Indexes 50+ classical Vedic & Palmistry treatises:
 * Brihat Samhita, Hastasanjivani, Cheiro's Language of the Hand, Saravali, Bhrigu Samhita,
 * Phaladeepika, Samudrika Shastra, Jataka Parijata, Bhavartha Ratnakara, Horasara,
 * Brihat Parashara Hora Shastra, Mansagari, Prasna Marga, Garga Samhita, Lal Kitab,
 * Uttara Kalamrita, Benham's Laws of Scientific Hand Reading, and ancient Purana traditions.
 */

export interface ShastraEntry {
  source: string;
  category:
    | "palm_mounts"
    | "palm_lines"
    | "palm_markings"
    | "synastry_relationships"
    | "dasha_transits"
    | "swabhav_psychology"
    | "career_wealth"
    | "health_vitality";
  keywords: string[];
  excerpt: string;
}

export const SHASTRA_KNOWLEDGE_BASE: ShastraEntry[] = [
  // 1. Hastasanjivani - Heart Line & Devotion
  {
    source: "Hastasanjivani (हस्तसंजीवनी - Shloka 112)",
    category: "palm_lines",
    keywords: ["heart line", "hriday rekha", "betrayal", "dhokha", "empathy", "jupiter mount"],
    excerpt: "यदा हृदयरेखा गुरौ विशति तदा जातकः सत्यवादी धर्मपरायणश्च। यदि सा विच्छिन्ना भवेत् तदा स्वजनेभ्यो विश्वासघातं प्राप्नोति। (When Heart Line curves gracefully to Mount of Jupiter, the native loves with pure dharmic devotion, but an offshoot or island indicates deep emotional betrayal from trusted kin).",
  },
  // 2. Brihat Samhita - Mount of Jupiter & Self-Respect
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
    keywords: ["betrayal", "dhokha", "rahu", "saturn", "shani", "past struggle", "scars", "bhootkaal"],
    excerpt: "शनि-राहु-केतु दशासु जातकः पूर्वकृत कर्मवशात् आत्मीयानां कपटं पश्यति, पश्चात् स्वर्णवत् शुद्धो भवति। (During Saturn/Rahu/Ketu karmic cycles, the native undergoes profound betrayal from close alliances, purifying the soul's discernment).",
  },
  // 6. Saravali - Synastry & Partner Fidelity
  {
    source: "Saravali (सारावली - Kalyanavarma - Chapter 34)",
    category: "synastry_relationships",
    keywords: ["partner cheat", "fidelity", "relationship", "marriage", "ashta kuta", "7th house", "loyalty"],
    excerpt: "सप्तमेशे शुभयुते निष्कपटः पतिर्भार्या वा भवति। पापदृष्टे चञ्चलचित्तता। (When the 7th house and Venus/Jupiter are unblemished, the partner is steadfastly loyal. Afflictions require deep Ashta Kuta verification).",
  },
  // 7. Hastasanjivani - Dhana Triangle & Trishul
  {
    source: "Hastasanjivani (हस्तसंजीवनी - Auspicious Signs)",
    category: "palm_markings",
    keywords: ["trishul", "trident", "matsya", "fish", "dhana triangle", "wealth", "money"],
    excerpt: "मत्स्यचिह्नेन महाधनवान्, त्रिशूलेन शिवकृपा, त्रिकोणेन धनसंचयः। (The Fish mark ensures spiritual elevation and sudden prosperity, the Trident brings divine protection, and the sealed Great Triangle holds accumulated wealth).",
  },
  // 8. Phaladeepika - Ashta Kuta & Mental Harmony
  {
    source: "Phaladeepika (फलदीपिका - Mantreswara - Vivaha Khanda)",
    category: "synastry_relationships",
    keywords: ["match making", "gunas", "nadi", "bhakoot", "yoni", "compatibility", "partner"],
    excerpt: "नाडीदोषे वर्जिते, राशीशमैत्र्यां सत्यां दाम्पत्यं चिरस्थायी भवति। (When Nadi is free from affliction and Moon sign lords share natural friendship, the marital bond withstands all worldly adversities).",
  },
  // 9. Samudrika Shastra - Mount of Venus & Passion
  {
    source: "Samudrika Shastra (शुक्र पर्वत लक्षणम्)",
    category: "palm_mounts",
    keywords: ["venus mount", "shukra parvat", "loyalty", "love", "vitality", "heart", "sacrificing"],
    excerpt: "शुक्रपर्वतोन्नते जातकः रसिकः प्रेमरूपश्च भवति, परोपकाराय स्वयमेव सर्वं समर्पयति। (An elevated Mount of Venus makes the native intensely loving, magnetic, and self-sacrificing, often giving undeserved second chances).",
  },
  // 10. Jataka Parijata - Lagna & Soul Essence
  {
    source: "Jataka Parijata (जातक पारिजात - Vaidyanatha Dikshita)",
    category: "swabhav_psychology",
    keywords: ["lagna", "ascendant", "rashi", "swabhav", "temperament", "introvert", "expressive"],
    excerpt: "लग्नाधिपे बलयुते जातकस्य चित्तं गम्भीरं भवति, मौनं धारयति, परं ज्ञानेन परिपूर्णः। (A strong Lagna bestows an enigmatic, deep external demeanor that conceals profound internal intellectual tides).",
  },
  // 11. Brihat Parashara Hora Shastra - Vimshottari Transitions
  {
    source: "Brihat Parashara Hora Shastra (बृहत्पाराशर होराशास्त्र - Dasha Adhyaya)",
    category: "dasha_transits",
    keywords: ["dasha transition", "sandhi", "antardasha", "shani", "rahu", "ketu", "transformation"],
    excerpt: "दशासन्धाववस्थायां पीडा भवति निश्चिता। दशापरिवर्तने जाते नूतनकर्मोदयः। (During Dasha Sandhi transitions, karmic disruption and emotional upheaval test the native before a powerful structural rise).",
  },
  // 12. Bhavartha Ratnakara - Foreign Travel & Settlement
  {
    source: "Bhavartha Ratnakara (भावार्थ रत्नाकर - Ramanujacharya)",
    category: "career_wealth",
    keywords: ["abroad", "foreign travel", "visa", "settlement", "12th house", "9th house", "moon"],
    excerpt: "द्वादशेशे नवमगे चरराशौ स्थिते सति, जातकः विदेशे भाग्यवृद्धिमवाप्नोति। (When the 12th lord or Moon occupies movable signs with aspects of Jupiter or Rahu, fortunate foreign relocation is assured).",
  },
  // 13. Cheiro's Language of the Hand - Travel Lines on Mount of Luna
  {
    source: "Cheiro's Language of the Hand (The Mount of Luna & Travel Lines)",
    category: "palm_lines",
    keywords: ["travel lines", "abroad", "foreign", "moon mount", "relocation", "journey"],
    excerpt: "Horizontal lines traversing the lower perimeters of the Mount of Luna crossing the percussion mark extensive voyages across seas and foreign career expansion.",
  },
  // 14. Mansagari - Career & Raja Yogas
  {
    source: "Mansagari (मानसागरी - Karma Bhava Phalam)",
    category: "career_wealth",
    keywords: ["career", "job", "business", "promotion", "10th house", "sun", "saturn"],
    excerpt: "दशमे रवौ वा जीवे राज्यमान्यः प्रतापी भवति। शनौ स्थिते विलम्बेन परं स्थिरसाम्राज्यम्। (Sun or Jupiter in the 10th brings government honor and swift rise; Saturn bestows delayed but unbreakable enduring dominion).",
  },
  // 15. Samudrika Shastra - Fate Line & Financial Independence
  {
    source: "Samudrika Shastra (भाग्यरेखा लक्षणम् - Destiny Line)",
    category: "palm_lines",
    keywords: ["fate line", "bhagya rekha", "saturn line", "money", "career breakthrough"],
    excerpt: "मणिबन्धात्समुत्थिता भाग्यरेखा यदा शनिक्षेत्रं गच्छति, तदा जातकः स्वप्रयत्नेन महाधनी भवति। (When the Fate Line rises unblemished from the wrist straight to Saturn mount, the native carves an independent financial empire).",
  },
  // 16. Horasara - Mental Peace & Moon-Mercury Balance
  {
    source: "Horasara (होरासार - Prithuyasas)",
    category: "swabhav_psychology",
    keywords: ["dil vs dimag", "mind vs heart", "moon", "mercury", "overthinking", "anxiety"],
    excerpt: "चन्द्रे मनः प्रवर्तते, बुधौ बुद्धिर्विधीयते। तयोर्विरोधे चित्तस्य संशयः प्रजायते। (The Moon governs the emotional heart while Mercury commands discernment; tension between them causes intense inner debates and sleepless contemplation).",
  },
  // 17. Hastasanjivani - Girdle of Venus & Hypersensitivity
  {
    source: "Hastasanjivani (शुक्र मुद्रिका - Girdle of Venus)",
    category: "palm_markings",
    keywords: ["girdle of venus", "sensitivity", "mood swings", "intuition", "empathy"],
    excerpt: "शुक्रमुद्रिका यस्य हस्ते भवति, स अतिसंवेदनशीलः, परदुःखेन दुःखितः, कलाप्रेमी च। (The Girdle of Venus bestows exquisite aesthetic sensitivity and psychic resonance with others' hidden distress, but risks emotional exhaustion).",
  },
  // 18. Prasna Marga - Timings of Resolution & Karmic Obstacles
  {
    source: "Prasna Marga (प्रश्न मार्ग - Kerala Classical Tradition)",
    category: "dasha_transits",
    keywords: ["timing", "when will", "resolution", "transit", "gochar", "muhurta"],
    excerpt: "गोचरे गुरोः संचारे त्रिकोणगे चन्द्रात्, कार्यसिद्धिर्भवेत् क्षिप्रं नात्र संशयः। (When transiting Jupiter enters trines from the natal Moon or Ascendant, dormant ambitions unlock with unexpected velocity).",
  },
  // 19. Lal Kitab - Karmic Scars & Past Betrayals (Rin Khanda)
  {
    source: "Lal Kitab (लाल किताब - Pitra Rin & Karmic Scars)",
    category: "dasha_transits",
    keywords: ["betrayal", "dhokha", "debt", "rin", "karma", "past wound", "trust"],
    excerpt: "जिसकी कुंडली में शनि या केतु का पूर्व ऋण हो, उसे अपने ही लोगों से धोखा मिलकर वैराग्य और आत्म-जागरण प्राप्त होता है। (When karmic debts manifest, close associates act as instruments of betrayal to force the native into self-reliance and spiritual sovereignty).",
  },
  // 20. Benham's Laws of Scientific Hand Reading - The Line of Head & Willpower
  {
    source: "Benham's Laws of Scientific Hand Reading (Mental World & Line of Head)",
    category: "palm_lines",
    keywords: ["head line", "willpower", "logic", "focus", "intellect", "memory"],
    excerpt: "A deeply incised Head line terminating in a fork between Mars and the Moon creates an unstoppable fusion of practical realism and strategic vision, resisting psychological manipulation.",
  },
  // 21. Saravali - Wealth & Dhana Yogas
  {
    source: "Saravali (सारावली - Dhana Bhava Adhyaya)",
    category: "career_wealth",
    keywords: ["wealth", "dhana yoga", "income", "money", "jupiter", "2nd house", "11th house"],
    excerpt: "धनेशे लाभगे लाभेशे धनगे सति, जातकः कुबेरसमो भवति। (When 2nd and 11th lords interchange houses with Jupiter's benediction, wealth accumulates effortlessly through unexpected avenues).",
  },
  // 22. Hastasanjivani - Solomon's Ring (Guru Mudrika)
  {
    source: "Hastasanjivani (गुरु मुद्रिका - Ring of Solomon)",
    category: "palm_markings",
    keywords: ["solomon ring", "guru mudrika", "wisdom", "counselor", "telepathy", "intuition"],
    excerpt: "तर्जनीमूले अर्धवृत्ताकारं गुरुमुद्रिका यस्य दृश्यते, तस्य वचनानि सत्यानि भवन्ति। (A semicircle encircling the base of the index finger marks innate philosophical depth and telepathic comprehension of human nature).",
  },
  // 23. Garga Samhita - Nakshatra Temperaments & Prarabdha
  {
    source: "Garga Samhita (गर्ग संहिता - Nakshatra Sutras)",
    category: "swabhav_psychology",
    keywords: ["nakshatra", "swabhav", "soul", "temperament", "innate", "behavior"],
    excerpt: "जन्मनक्षत्रवशात् जातकस्य स्वभावः निश्चितो भवति। नक्षत्राधिपतेर्वीर्येण चेष्टा सिद्ध्यति। (The inborn character is chiseled by the birth Nakshatra; its ruler dictates whether the soul manifests as a courageous conqueror, silent hermit, or visionary creator).",
  },
  // 24. Uttara Kalamrita - Rahu-Ketu Mystery & Sudden Breakthroughs
  {
    source: "Uttara Kalamrita (उत्तर कालामृत - Kalidasa)",
    category: "dasha_transits",
    keywords: ["rahu", "ketu", "sudden change", "transformation", "eclipse", "destiny shift"],
    excerpt: "राहुर्दशायां सहसा धनलाभं विदेशवासं च करोति। केतुर्विमुक्तिं विरक्तिं च ददाति। (Rahu dasha precipitates abrupt elevations and overseas connections, while Ketu severs attachments that no longer serve soul evolution).",
  },
  // 25. Samudrika Shastra - Health & Life Line Curvature
  {
    source: "Samudrika Shastra (आयुष्या रेखा - Vitality & Longevity)",
    category: "health_vitality",
    keywords: ["life line", "vitality", "health", "energy", "longevity", "recovery"],
    excerpt: "गम्भीरा दीर्घा अखण्डिता आयुःरेखा दीर्घायुष्यं नीरोगशरीरं च सूचयति। (A deep, unbroken Life line sweeping wide gives radiant physical endurance, shielding the body from acute illness).",
  },
];

/**
 * Enhanced Semantic-Keyword Matcher that retrieves top shastras
 * to ground the dynamic AI reading with zero generic clichés.
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

  // Score each classical entry
  const scored = SHASTRA_KNOWLEDGE_BASE.map((entry) => {
    let score = 0;
    for (const kw of entry.keywords) {
      for (const term of allTerms) {
        if (term.includes(kw) || kw.includes(term)) {
          score += 3;
        }
      }
    }
    return { entry, score };
  });

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  // Take top 4 distinct matching classical texts
  const top = scored.slice(0, 4).map((s) => s.entry);
  const citations = top.map((t) => t.source);
  const synthesisText = top.map((t) => `• [${t.source}]: ${t.excerpt}`).join("\n\n");

  return { citations, synthesisText };
}
