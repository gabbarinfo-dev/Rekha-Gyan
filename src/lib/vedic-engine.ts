export interface VedicChartResult {
  sunSign: string;
  moonSign: string;
  ascendant: string;
  nakshatra: string;
  nakshatraLord: string;
  pada: number;
  currentMahadasha: string;
  currentAntardasha: string;
  dashaEndYear: number;
  lifePathNumber: number;
  element: "Fire" | "Earth" | "Air" | "Water";
  favorableGemstone: string;
  favorableMantra: string;
  favorableColor: string;
  rashiSummary: string;
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
  let dashaEndYear = birthYear + Math.round(accumulatedYears);

  if (currentAge > remainingYearsOfFirstDasha) {
    lordIdx = (lordIdx + 1) % DASHA_SEQUENCE.length;
    while (true) {
      const nextLord = DASHA_SEQUENCE[lordIdx];
      const period = DASHA_PERIODS[nextLord];
      if (accumulatedYears + period >= currentAge) {
        currentMahadasha = nextLord;
        dashaEndYear = birthYear + Math.round(accumulatedYears + period);
        break;
      }
      accumulatedYears += period;
      lordIdx = (lordIdx + 1) % DASHA_SEQUENCE.length;
    }
  }

  // Antardasha: rough sub-period of the mahadasha
  const antardashaList = DASHA_SEQUENCE;
  const antardashaIndex = (lordIdx + Math.floor((currentAge % 10) / 2)) % antardashaList.length;
  const currentAntardasha = antardashaList[antardashaIndex];

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
    nakshatra: nakshatraObj.name,
    nakshatraLord: nakshatraObj.lord,
    pada,
    currentMahadasha,
    currentAntardasha,
    dashaEndYear,
    lifePathNumber: sum,
    element,
    favorableGemstone: dashaInfo.gem,
    favorableMantra: dashaInfo.mantra,
    favorableColor: dashaInfo.color,
    rashiSummary: dashaInfo.summary,
    planetaryInfluences,
  };
}
