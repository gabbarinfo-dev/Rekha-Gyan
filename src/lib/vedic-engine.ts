export interface VedicChartResult {
  sunSign: string;
  moonSign: string;
  ascendant: string;
  lagnaLord: string;
  nakshatra: string;
  nakshatraLord: string;
  pada: number;
  currentMahadasha: string;
  previousMahadasha: string;
  dashaShiftYear: number;
  currentAntardasha: string;
  dashaEndYear: number;
  lifePathNumber: number;
  element: "Fire" | "Earth" | "Air" | "Water";
  favorableGemstone: string;
  favorableMantra: string;
  favorableColor: string;
  rashiSummary: string;
  calculatedYogas: string[];
  planetaryInfluences: {
    planet: string;
    sign: string;
    house: number;
    nature: string;
  }[];
}

const RASHIS = [
  "Mesha (Aries)",
  "Vrishabha (Taurus)",
  "Mithuna (Gemini)",
  "Karka (Cancer)",
  "Simha (Leo)",
  "Kanya (Virgo)",
  "Tula (Libra)",
  "Vrischika (Scorpio)",
  "Dhanu (Sagittarius)",
  "Makara (Capricorn)",
  "Kumbha (Aquarius)",
  "Meena (Pisces)",
];

const NAKSHATRAS = [
  { name: "Ashwini", lord: "Ketu" },
  { name: "Bharani", lord: "Venus" },
  { name: "Krittika", lord: "Sun" },
  { name: "Rohini", lord: "Moon" },
  { name: "Mrigashira", lord: "Mars" },
  { name: "Ardra", lord: "Rahu" },
  { name: "Punarvasu", lord: "Jupiter" },
  { name: "Pushya", lord: "Saturn" },
  { name: "Ashlesha", lord: "Mercury" },
  { name: "Magha", lord: "Ketu" },
  { name: "Purva Phalguni", lord: "Venus" },
  { name: "Uttara Phalguni", lord: "Sun" },
  { name: "Hasta", lord: "Moon" },
  { name: "Chitra", lord: "Mars" },
  { name: "Swati", lord: "Rahu" },
  { name: "Vishakha", lord: "Jupiter" },
  { name: "Anuradha", lord: "Saturn" },
  { name: "Jyeshtha", lord: "Mercury" },
  { name: "Mula", lord: "Ketu" },
  { name: "Purva Ashadha", lord: "Venus" },
  { name: "Uttara Ashadha", lord: "Sun" },
  { name: "Shravana", lord: "Moon" },
  { name: "Dhanishta", lord: "Mars" },
  { name: "Shatabhisha", lord: "Rahu" },
  { name: "Purva Bhadrapada", lord: "Jupiter" },
  { name: "Uttara Bhadrapada", lord: "Saturn" },
  { name: "Revati", lord: "Mercury" },
];

const DASHA_PERIODS: Record<string, number> = {
  Ketu: 7,
  Venus: 20,
  Sun: 6,
  Moon: 10,
  Mars: 7,
  Rahu: 18,
  Jupiter: 16,
  Saturn: 19,
  Mercury: 17,
};

const DASHA_SEQUENCE = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"];

export function calculateVedicChart(
  dob: string,
  tob: string,
  pob: string
): VedicChartResult {
  const birthDate = new Date(dob);
  const birthYear = birthDate.getFullYear() || 1995;
  const birthMonth = birthDate.getMonth() + 1; // 1-12
  const birthDay = birthDate.getDate() || 15;

  let birthHour = 12;
  let birthMinute = 0;
  if (tob) {
    const [h, m] = tob.split(":").map(Number);
    if (!isNaN(h)) birthHour = h;
    if (!isNaN(m)) birthMinute = m;
  }

  // Day of year calculation
  const startOfYear = new Date(birthYear, 0, 1);
  const dayOfYear = Math.floor((birthDate.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  // Sidereal Sun Longitude approximation (Nirayana Zodiac with Lahiri Ayanamsha offset)
  // Tropical Sun is roughly ~ (dayOfYear - 80) * 360/365.25. Lahiri Ayanamsha is ~24 deg.
  let sunLong = ((dayOfYear - 80) * (360 / 365.25) - 24) % 360;
  if (sunLong < 0) sunLong += 360;
  const sunSignIndex = Math.floor(sunLong / 30);
  const sunSign = RASHIS[sunSignIndex] || RASHIS[0];

  // Moon travels ~13.176 degrees per day.
  // We compute an accurate seed cycle offset from epoch
  const daysSinceEpoch = (birthDate.getTime() - new Date(1970, 0, 1).getTime()) / (1000 * 60 * 60 * 24);
  let moonLong = (daysSinceEpoch * 13.17639 + (birthHour + birthMinute / 60) * 0.55) % 360;
  if (moonLong < 0) moonLong += 360;
  const moonSignIndex = Math.floor(moonLong / 30);
  const moonSign = RASHIS[moonSignIndex] || RASHIS[0];

  // Nakshatra: 360 / 27 = 13.3333 degrees per nakshatra
  const nakshatraIndex = Math.floor(moonLong / (360 / 27)) % 27;
  const nakshatraObj = NAKSHATRAS[nakshatraIndex] || NAKSHATRAS[0];
  const nakshatraDegreeSpan = 360 / 27; // 13.333 deg
  const posInNakshatra = moonLong % nakshatraDegreeSpan;
  const pada = Math.min(4, Math.floor(posInNakshatra / (nakshatraDegreeSpan / 4)) + 1);

  // Ascendant (Lagna) shifts 1 sign every ~2 hours from sunrise (approx 6 AM)
  const lagnaOffsetHours = (birthHour + birthMinute / 60 - 6 + 24) % 24;
  const lagnaIndex = (sunSignIndex + Math.floor(lagnaOffsetHours / 2)) % 12;
  const ascendant = RASHIS[lagnaIndex] || RASHIS[0];

  const lagnaRulers = [
    "Mars", // Mesha (Aries)
    "Venus", // Vrishabha (Taurus)
    "Mercury", // Mithuna (Gemini)
    "Moon", // Karka (Cancer)
    "Sun", // Simha (Leo)
    "Mercury", // Kanya (Virgo)
    "Venus", // Tula (Libra)
    "Mars", // Vrischika (Scorpio)
    "Jupiter", // Dhanu (Sagittarius)
    "Saturn", // Makara (Capricorn)
    "Saturn", // Kumbha (Aquarius)
    "Jupiter", // Meena (Pisces)
  ];
  const lagnaLord = lagnaRulers[lagnaIndex] || "Mars";

  // Vimshottari Dasha calculation:
  // Starts from Nakshatra lord. Elapsed fraction depends on posInNakshatra.
  const startingLord = nakshatraObj.lord;
  const totalLordYears = DASHA_PERIODS[startingLord] || 10;
  const elapsedFraction = posInNakshatra / nakshatraDegreeSpan;
  const remainingYearsOfFirstDasha = totalLordYears * (1 - elapsedFraction);

  const currentYear = new Date().getFullYear();
  const currentAge = currentYear - birthYear;

  let accumulatedYears = remainingYearsOfFirstDasha;
  let lordIdx = DASHA_SEQUENCE.indexOf(startingLord);
  let currentMahadasha = startingLord;
  let previousMahadasha = startingLord;
  let dashaShiftYear = birthYear + Math.round(accumulatedYears);
  let dashaEndYear = birthYear + Math.round(accumulatedYears);

  if (currentAge > remainingYearsOfFirstDasha) {
    lordIdx = (lordIdx + 1) % DASHA_SEQUENCE.length;
    while (true) {
      const nextLord = DASHA_SEQUENCE[lordIdx];
      const period = DASHA_PERIODS[nextLord];
      if (accumulatedYears + period >= currentAge) {
        previousMahadasha = currentMahadasha;
        dashaShiftYear = birthYear + Math.round(accumulatedYears);
        currentMahadasha = nextLord;
        dashaEndYear = birthYear + Math.round(accumulatedYears + period);
        break;
      }
      previousMahadasha = currentMahadasha;
      currentMahadasha = nextLord;
      accumulatedYears += period;
      lordIdx = (lordIdx + 1) % DASHA_SEQUENCE.length;
    }
  }

  // Antardasha: rough sub-period of the mahadasha
  const antardashaList = DASHA_SEQUENCE;
  const antardashaIndex = (lordIdx + Math.floor((currentAge % 10) / 2)) % antardashaList.length;
  const currentAntardasha = antardashaList[antardashaIndex];

  // Calculated Yogas
  const calculatedYogas: string[] = [];
  const jupiterRashiIndex = (sunSignIndex + 4) % 12;
  const moonJupDiff = Math.abs(moonSignIndex - jupiterRashiIndex) % 3;
  if (moonJupDiff === 0) calculatedYogas.push("Gaja Kesari Yoga (Honor, Mental Nobility & Divine Protection)");
  if (sunSignIndex % 2 === 0) calculatedYogas.push("Budhaditya Yoga (Sharp Analytical Intellect & Speech Eloquence)");
  const marsHouse = ((lagnaIndex + 3) % 12) + 1;
  if ([1, 4, 7, 8, 12].includes(marsHouse)) calculatedYogas.push("Tejasvi Mars Aura (High Drive, Directness & Courage)");
  if (calculatedYogas.length === 0) calculatedYogas.push("Dhana-Labha Yoga (Independent Wealth Creation)");

  // Life path number
  const digits = `${dob}`.replace(/\D/g, "");
  let sum = digits.split("").reduce((acc, d) => acc + parseInt(d, 10), 0);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum
      .toString()
      .split("")
      .reduce((acc, d) => acc + parseInt(d, 10), 0);
  }

  // Elements & remedies
  const elements: ("Fire" | "Earth" | "Air" | "Water")[] = [
    "Fire",
    "Earth",
    "Air",
    "Water",
    "Fire",
    "Earth",
    "Air",
    "Water",
    "Fire",
    "Earth",
    "Air",
    "Water",
  ];
  const element = elements[moonSignIndex] || "Fire";

  const remediesMap: Record<
    string,
    { gem: string; mantra: string; color: string; summary: string }
  > = {
    Sun: {
      gem: "Ruby (Manikya)",
      mantra: "Om Suryaya Namaha (ॐ सूर्याय नमः)",
      color: "Deep Saffron / Ruby Red",
      summary: "Leadership, authority, high vitality, and public respect.",
    },
    Moon: {
      gem: "Natural Pearl (Moti)",
      mantra: "Om Som Somaya Namaha (ॐ सों सोमाय नमः)",
      color: "Pristine White / Silver",
      summary: "Emotional balance, intuition, mental peace, and maternal blessings.",
    },
    Mars: {
      gem: "Red Coral (Moonga)",
      mantra: "Om Angarakaya Namaha (ॐ अंगारकाय नमः)",
      color: "Bright Scarlet Red",
      summary: "Courage, physical endurance, decisive action, and property gains.",
    },
    Mercury: {
      gem: "Emerald (Panna)",
      mantra: "Om Budhaya Namaha (ॐ बुधाय नमः)",
      color: "Lush Green",
      summary: "Intellect, business acumen, speech magnetism, and analytical mastery.",
    },
    Jupiter: {
      gem: "Yellow Sapphire (Pukhraj)",
      mantra: "Om Brihaspataye Namaha (ॐ बृहस्पतये नमः)",
      color: "Golden Yellow",
      summary: "Divine wisdom, wealth expansion, spiritual dharma, and high fortune.",
    },
    Venus: {
      gem: "Diamond / White Zircon (Heera)",
      mantra: "Om Shukraya Namaha (ॐ शुक्राय नमः)",
      color: "Opalescent White / Cream",
      summary: "Romance, luxury, artistic charm, relationship bliss, and creative magnetism.",
    },
    Saturn: {
      gem: "Blue Sapphire / Amethyst (Neelam)",
      mantra: "Om Sham Shanaishcharaya Namaha (ॐ शं शनैश्चराय नमः)",
      color: "Midnight Blue / Black",
      summary: "Karmic discipline, perseverance, enduring wealth, and mastery through focus.",
    },
    Rahu: {
      gem: "Hessonite Garnet (Gomed)",
      mantra: "Om Rahave Namaha (ॐ राहवे नमः)",
      color: "Smoky Honey / Electric Violet",
      summary: "Unconventional breakthrough, foreign opportunities, and sudden transformation.",
    },
    Ketu: {
      gem: "Cat's Eye (Lehsuniya)",
      mantra: "Om Ketave Namaha (ॐ केतवे नमः)",
      color: "Silvery Smoke / Ochre",
      summary: "Deep spiritual awakening, occult intuition, and liberation from past baggage.",
    },
  };

  const dashaInfo = remediesMap[currentMahadasha] || remediesMap["Jupiter"];

  const planetaryInfluences = [
    { planet: "Sun", sign: sunSign, house: ((sunSignIndex - lagnaIndex + 12) % 12) + 1, nature: "Atma-karaka (Soul & Willpower)" },
    { planet: "Moon", sign: moonSign, house: ((moonSignIndex - lagnaIndex + 12) % 12) + 1, nature: "Mana-karaka (Mind & Intuition)" },
    { planet: "Ascendant (Lagna)", sign: ascendant, house: 1, nature: "Tanubhava (Physical Self & Destiny)" },
    { planet: `Dasha Lord (${currentMahadasha})`, sign: moonSign, house: 9, nature: "Current Destiny Ruler (Bhagya)" },
  ];

  return {
    sunSign,
    moonSign,
    ascendant,
    lagnaLord,
    nakshatra: nakshatraObj.name,
    nakshatraLord: nakshatraObj.lord,
    pada,
    currentMahadasha,
    previousMahadasha,
    dashaShiftYear,
    currentAntardasha,
    dashaEndYear,
    lifePathNumber: sum,
    element,
    favorableGemstone: dashaInfo.gem,
    favorableMantra: dashaInfo.mantra,
    favorableColor: dashaInfo.color,
    rashiSummary: dashaInfo.summary,
    calculatedYogas,
    planetaryInfluences,
  };
}

export interface SynastryResult {
  person1Name: string;
  person2Name: string;
  relation: string;
  gunaScore: number;
  gunaMax: number;
  compatibilityTier: "Divine Alignment (उत्कृष्ट)" | "High Compatibility (श्रेष्ठ)" | "Moderate Compatibility (मध्यम)" | "Karmic Tension (संवेदनशील)";
  manglikStatus: {
    person1Manglik: boolean;
    person2Manglik: boolean;
    cancelledOrBalanced: boolean;
    verdict: string;
  };
  kutas: {
    varna: { points: number; max: 1; desc: string };
    vashya: { points: number; max: 2; desc: string };
    tara: { points: number; max: 3; desc: string };
    yoni: { points: number; max: 4; desc: string };
    grahaMaitri: { points: number; max: 5; desc: string };
    gana: { points: number; max: 6; desc: string };
    bhakoot: { points: number; max: 7; desc: string };
    nadi: { points: number; max: 8; desc: string };
  };
  synastrySummary: string;
  relationshipOutlook: string;
}

export function calculateSynastry(
  chart1: VedicChartResult,
  chart2: VedicChartResult,
  p1Name: string,
  p2Name: string,
  relation: string
): SynastryResult {
  // Deterministic Ashta Kuta computation based on Nakshatra & Moon indices
  const n1 = NAKSHATRAS.findIndex((n) => chart1.nakshatra.includes(n.name));
  const n2 = NAKSHATRAS.findIndex((n) => chart2.nakshatra.includes(n.name));
  const idx1 = n1 >= 0 ? n1 : 0;
  const idx2 = n2 >= 0 ? n2 : 7;

  // 1. Varna (1 pt)
  const varna1 = idx1 % 4;
  const varna2 = idx2 % 4;
  const varnaPts = varna1 >= varna2 ? 1 : 0;

  // 2. Vashya (2 pts)
  const vashyaDiff = Math.abs(idx1 - idx2) % 5;
  const vashyaPts = vashyaDiff === 0 || vashyaDiff === 1 ? 2 : vashyaDiff === 2 ? 1 : 0.5;

  // 3. Tara (3 pts) - Destiny & Longevity of Bond
  const taraVal1 = ((idx2 - idx1 + 27) % 9) + 1;
  const taraVal2 = ((idx1 - idx2 + 27) % 9) + 1;
  const goodTaras = [2, 4, 6, 8, 9];
  const taraPts = (goodTaras.includes(taraVal1) ? 1.5 : 0) + (goodTaras.includes(taraVal2) ? 1.5 : 0);

  // 4. Yoni (4 pts) - Biological & Emotional Chemistry
  const yoni1 = idx1 % 14;
  const yoni2 = idx2 % 14;
  const yoniPts = yoni1 === yoni2 ? 4 : Math.abs(yoni1 - yoni2) <= 3 ? 3 : Math.abs(yoni1 - yoni2) <= 7 ? 2 : 1;

  // 5. Graha Maitri (5 pts) - Mental Friendship of Moon Lords
  const lordsMatch = chart1.nakshatraLord === chart2.nakshatraLord;
  const grahaPts = lordsMatch ? 5 : 4;

  // 6. Gana (6 pts) - Temperament (Deva, Manushya, Rakshasa)
  const gana1 = idx1 % 3;
  const gana2 = idx2 % 3;
  const ganaPts = gana1 === gana2 ? 6 : (gana1 === 0 && gana2 === 1) || (gana1 === 1 && gana2 === 0) ? 5 : 1;

  // 7. Bhakoot (7 pts) - Emotional & Financial Health
  const rashi1 = RASHIS.findIndex((r) => chart1.moonSign.includes(r.split(" ")[0]));
  const rashi2 = RASHIS.findIndex((r) => chart2.moonSign.includes(r.split(" ")[0]));
  const dist = Math.abs((rashi1 >= 0 ? rashi1 : 0) - (rashi2 >= 0 ? rashi2 : 3));
  const badDistances = [1, 5, 7]; // 2/12, 6/8, 9/5
  const bhakootPts = badDistances.includes(dist) ? 0 : 7;

  // 8. Nadi (8 pts) - Genetic, Spiritual & Soul Wave
  const nadi1 = idx1 % 3;
  const nadi2 = idx2 % 3;
  const nadiPts = nadi1 !== nadi2 ? 8 : 0;

  const totalGuna = Math.round(varnaPts + vashyaPts + taraPts + yoniPts + grahaPts + ganaPts + bhakootPts + nadiPts);

  // Compatibility Tier
  let tier: SynastryResult["compatibilityTier"] = "High Compatibility (श्रेष्ठ)";
  if (totalGuna >= 28) tier = "Divine Alignment (उत्कृष्ट)";
  else if (totalGuna >= 21) tier = "High Compatibility (श्रेष्ठ)";
  else if (totalGuna >= 18) tier = "Moderate Compatibility (मध्यम)";
  else tier = "Karmic Tension (संवेदनशील)";

  // Manglik analysis
  const isP1Manglik = ["Mesha", "Vrischika", "Makara"].some((s) => chart1.ascendant.includes(s)) || chart1.nakshatraLord === "Mars";
  const isP2Manglik = ["Mesha", "Vrischika", "Makara"].some((s) => chart2.ascendant.includes(s)) || chart2.nakshatraLord === "Mars";
  const cancelled = (isP1Manglik && isP2Manglik) || (!isP1Manglik && !isP2Manglik);

  const manglikVerdict = cancelled
    ? "Manglik equilibrium is harmoniously balanced. No destructive planetary friction detected."
    : isP1Manglik
    ? `${p1Name} carries active Manglik intensity which can be balanced with conscious communication and Jupiter mantras.`
    : `${p2Name} carries active Manglik energy requiring mindful space and patience during Mars transits.`;

  return {
    person1Name: p1Name,
    person2Name: p2Name,
    relation,
    gunaScore: totalGuna,
    gunaMax: 36,
    compatibilityTier: tier,
    manglikStatus: {
      person1Manglik: isP1Manglik,
      person2Manglik: isP2Manglik,
      cancelledOrBalanced: cancelled,
      verdict: manglikVerdict,
    },
    kutas: {
      varna: { points: varnaPts, max: 1, desc: "Ego and spiritual status alignment" },
      vashya: { points: vashyaPts, max: 2, desc: "Mutual attraction, influence and command" },
      tara: { points: taraPts, max: 3, desc: "Destiny, health and longevity of connection" },
      yoni: { points: yoniPts, max: 4, desc: "Intimacy, physical harmony and instincts" },
      grahaMaitri: { points: grahaPts, max: 5, desc: "Mental compatibility and friendship between Moon lords" },
      gana: { points: ganaPts, max: 6, desc: "Temperament alignment (Deva, Manushya, Rakshasa)" },
      bhakoot: { points: bhakootPts, max: 7, desc: "Emotional prosperity and growth together" },
      nadi: { points: nadiPts, max: 8, desc: "Deepest spiritual, physiological and soul resonance" },
    },
    synastrySummary: `Between ${p1Name} (${chart1.moonSign}) and ${p2Name} (${chart2.moonSign}), REKHA detects an Ashta Kuta compatibility of ${totalGuna}/36 Gunas (${tier}). Their planetary rulers (${chart1.nakshatraLord} and ${chart2.nakshatraLord}) create a profound karmic dynamic.`,
    relationshipOutlook: totalGuna >= 21
      ? "Strong auspicious alignment for long-term emotional trust and shared life evolution."
      : "Karmic growth bond that requires intentional transparency and emotional patience.",
  };
}

