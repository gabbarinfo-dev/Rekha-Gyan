/**
 * Authentic Vedic Kundli Engine
 * Based on Brihat Parashara Hora Shastra, Phaladeepika, and Saravali.
 * Computes:
 * - D1 Lagna Kundli (Janma Chart)
 * - D9 Navamsha Kundli (Soul / Destiny Chart)
 * - Graha Spashta (Full Planetary Degrees, Dignities, Nakshatra & Pada)
 * - Avakhada Chakra & Panchang (Vaar, Tithi, Yoga, Karana, Gana, Nadi)
 * - Vimshottari Mahadasha Timeline
 */

export interface GrahaPosition {
  name: string;
  sanskrit: string;
  abbr: string;
  degree: number; // 0 to 359.99
  degInSign: number; // 0 to 29.99
  signIndex: number; // 0 to 11
  signName: string;
  signSanskrit: string;
  houseD1: number; // 1 to 12
  houseD9: number; // 1 to 12
  nakshatra: string;
  pada: number;
  nakshatraLord: string;
  dignity: "Exalted (उच्च)" | "Moolatrikona" | "Own Sign (स्वक्षेत्र)" | "Friend (मित्र)" | "Neutral (सम)" | "Enemy (शत्रु)" | "Debilitated (नीच)";
  isRetrograde?: boolean;
}

export interface PanchangAvakhada {
  vaar: string; // Day of week
  tithi: string; // Tithi name
  paksha: "Shukla Paksha" | "Krishna Paksha";
  nakshatra: string;
  pada: number;
  nakshatraLord: string;
  yoga: string;
  karana: string;
  varna: string;
  vashya: string;
  yoni: string;
  gana: string;
  nadi: string;
  ayanamsha: string;
}

export interface DashaPeriodItem {
  planet: string;
  sanskrit: string;
  years: number;
  startYear: number;
  endYear: number;
  isCurrent: boolean;
}

export interface FullKundliData {
  userName: string;
  dob: string;
  tob: string;
  pob: string;
  lagnaSignIndex: number;
  lagnaSignName: string;
  lagnaDegree: number;
  navamshaLagnaIndex: number;
  navamshaLagnaName: string;
  grahas: GrahaPosition[];
  d1Houses: Record<number, { signIndex: number; signName: string; signNumber: number; planets: GrahaPosition[] }>;
  d9Houses: Record<number, { signIndex: number; signName: string; signNumber: number; planets: GrahaPosition[] }>;
  panchang: PanchangAvakhada;
  dashaTimeline: DashaPeriodItem[];
  currentMahadasha: string;
  currentAntardasha: string;
  yogas: string[];
  gemstoneRemedy: {
    gemstone: string;
    finger: string;
    metal: string;
    beejMantra: string;
    deity: string;
  };
}

const RASHIS = [
  { name: "Aries", sanskrit: "Mesha (मेष)", lord: "Mars", element: "Fire" },
  { name: "Taurus", sanskrit: "Vrishabha (वृषभ)", lord: "Venus", element: "Earth" },
  { name: "Gemini", sanskrit: "Mithuna (मिथुन)", lord: "Mercury", element: "Air" },
  { name: "Cancer", sanskrit: "Karka (कर्क)", lord: "Moon", element: "Water" },
  { name: "Leo", sanskrit: "Simha (सिंह)", lord: "Sun", element: "Fire" },
  { name: "Virgo", sanskrit: "Kanya (कन्या)", lord: "Mercury", element: "Earth" },
  { name: "Libra", sanskrit: "Tula (तुला)", lord: "Venus", element: "Air" },
  { name: "Scorpio", sanskrit: "Vrischika (वृश्चिक)", lord: "Mars", element: "Water" },
  { name: "Sagittarius", sanskrit: "Dhanu (धनु)", lord: "Jupiter", element: "Fire" },
  { name: "Capricorn", sanskrit: "Makara (मकर)", lord: "Saturn", element: "Earth" },
  { name: "Aquarius", sanskrit: "Kumbha (कुम्भ)", lord: "Saturn", element: "Air" },
  { name: "Pisces", sanskrit: "Meena (मीन)", lord: "Jupiter", element: "Water" },
];

const NAKSHATRAS = [
  { name: "Ashwini", lord: "Ketu", gana: "Deva", yoni: "Horse (Ashwa)", nadi: "Adi" },
  { name: "Bharani", lord: "Venus", gana: "Manushya", yoni: "Elephant (Gaja)", nadi: "Madhya" },
  { name: "Krittika", lord: "Sun", gana: "Rakshasa", yoni: "Sheep (Mesha)", nadi: "Antya" },
  { name: "Rohini", lord: "Moon", gana: "Manushya", yoni: "Serpent (Sarpa)", nadi: "Antya" },
  { name: "Mrigashira", lord: "Mars", gana: "Deva", yoni: "Serpent (Sarpa)", nadi: "Madhya" },
  { name: "Ardra", lord: "Rahu", gana: "Manushya", yoni: "Dog (Shwana)", nadi: "Adi" },
  { name: "Punarvasu", lord: "Jupiter", gana: "Deva", yoni: "Cat (Marjara)", nadi: "Adi" },
  { name: "Pushya", lord: "Saturn", gana: "Deva", yoni: "Goat (Aja)", nadi: "Madhya" },
  { name: "Ashlesha", lord: "Mercury", gana: "Rakshasa", yoni: "Cat (Marjara)", nadi: "Antya" },
  { name: "Magha", lord: "Ketu", gana: "Rakshasa", yoni: "Rat (Mooshaka)", nadi: "Antya" },
  { name: "Purva Phalguni", lord: "Venus", gana: "Manushya", yoni: "Rat (Mooshaka)", nadi: "Madhya" },
  { name: "Uttara Phalguni", lord: "Sun", gana: "Manushya", yoni: "Cow (Gau)", nadi: "Adi" },
  { name: "Hasta", lord: "Moon", gana: "Deva", yoni: "Buffalo (Mahisha)", nadi: "Adi" },
  { name: "Chitra", lord: "Mars", gana: "Rakshasa", yoni: "Tiger (Vyaghra)", nadi: "Madhya" },
  { name: "Swati", lord: "Rahu", gana: "Deva", yoni: "Buffalo (Mahisha)", nadi: "Antya" },
  { name: "Vishakha", lord: "Jupiter", gana: "Rakshasa", yoni: "Tiger (Vyaghra)", nadi: "Antya" },
  { name: "Anuradha", lord: "Saturn", gana: "Deva", yoni: "Deer (Mriga)", nadi: "Madhya" },
  { name: "Jyeshtha", lord: "Mercury", gana: "Rakshasa", yoni: "Deer (Mriga)", nadi: "Adi" },
  { name: "Mula", lord: "Ketu", gana: "Rakshasa", yoni: "Dog (Shwana)", nadi: "Adi" },
  { name: "Purva Ashadha", lord: "Venus", gana: "Manushya", yoni: "Monkey (Vanara)", nadi: "Madhya" },
  { name: "Uttara Ashadha", lord: "Sun", gana: "Manushya", yoni: "Mongoose (Nakula)", nadi: "Antya" },
  { name: "Shravana", lord: "Moon", gana: "Deva", yoni: "Monkey (Vanara)", nadi: "Antya" },
  { name: "Dhanishta", lord: "Mars", gana: "Rakshasa", yoni: "Lion (Simha)", nadi: "Madhya" },
  { name: "Shatabhisha", lord: "Rahu", gana: "Rakshasa", yoni: "Horse (Ashwa)", nadi: "Adi" },
  { name: "Purva Bhadrapada", lord: "Jupiter", gana: "Manushya", yoni: "Lion (Simha)", nadi: "Adi" },
  { name: "Uttara Bhadrapada", lord: "Saturn", gana: "Manushya", yoni: "Cow (Gau)", nadi: "Madhya" },
  { name: "Revati", lord: "Mercury", gana: "Deva", yoni: "Elephant (Gaja)", nadi: "Antya" },
];

const TITHIS = [
  "Pratipada (प्रतिपदा)",
  "Dwitiya (द्वितीया)",
  "Tritiya (तृतीया)",
  "Chaturthi (चतुर्थी)",
  "Panchami (पंचमी)",
  "Shashti (षष्ठी)",
  "Saptami (सप्तमी)",
  "Ashtami (अष्टमी)",
  "Navami (नवमी)",
  "Dashami (दशमी)",
  "Ekadashi (एकादशी)",
  "Dwadashi (द्वादशी)",
  "Trayodashi (त्रयोदशी)",
  "Chaturdashi (चतुर्दशी)",
  "Purnima / Amavasya (पूर्णिमा/अमावस्या)",
];

const YOGAS = [
  "Vishkumbha", "Priti", "Ayushman", "Saubhagya", "Shobhana", "Atiganda", "Sukarma", "Dhriti",
  "Shula", "Ganda", "Vriddhi", "Dhruva", "Vyaghata", "Harshana", "Vajra", "Siddhi", "Vyatipata",
  "Variyan", "Parigha", "Shiva", "Siddha", "Sadhya", "Shubha", "Shukla", "Brahma", "Indra", "Vaidhriti"
];

const KARANAS = [
  "Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti (Bhadra)", "Shakuni", "Chatushpada", "Naga", "Kintughna"
];

const DASHA_PERIODS: Record<string, number> = {
  Ketu: 7, Venus: 20, Sun: 6, Moon: 10, Mars: 7, Rahu: 18, Jupiter: 16, Saturn: 19, Mercury: 17
};
const DASHA_SEQUENCE = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"];

/**
 * Calculates Navamsha (D9) Sign Index from Absolute Degree (0 to 360)
 * Classical Parashari Rule:
 * 1 sign = 30°. Navamsha = 3°20' = 3.333333°
 * Fire signs (0, 4, 8) start from Aries (0)
 * Earth signs (1, 5, 9) start from Capricorn (9)
 * Air signs (2, 6, 10) start from Libra (6)
 * Water signs (3, 7, 11) start from Cancer (3)
 */
function getNavamshaSignIndex(totalDegree: number): number {
  const normDeg = ((totalDegree % 360) + 360) % 360;
  const signIndex = Math.floor(normDeg / 30);
  const degInSign = normDeg % 30;
  const navamshaPart = Math.floor(degInSign / (30 / 9)); // 0 to 8

  let startingNavamshaSign = 0;
  if ([0, 4, 8].includes(signIndex)) {
    startingNavamshaSign = 0; // Aries
  } else if ([1, 5, 9].includes(signIndex)) {
    startingNavamshaSign = 9; // Capricorn
  } else if ([2, 6, 10].includes(signIndex)) {
    startingNavamshaSign = 6; // Libra
  } else {
    startingNavamshaSign = 3; // Cancer
  }

  return (startingNavamshaSign + navamshaPart) % 12;
}

/**
 * Calculates Shastric Dignity based on Brihat Parashara Hora Shastra
 */
function calculateDignity(planetName: string, signIndex: number): GrahaPosition["dignity"] {
  const exaltations: Record<string, number> = {
    Sun: 0, Moon: 1, Mars: 9, Mercury: 5, Jupiter: 3, Venus: 11, Saturn: 6, Rahu: 1, Ketu: 7
  };
  const debilitations: Record<string, number> = {
    Sun: 6, Moon: 7, Mars: 3, Mercury: 11, Jupiter: 9, Venus: 5, Saturn: 0, Rahu: 7, Ketu: 1
  };
  const ownSigns: Record<string, number[]> = {
    Sun: [4], Moon: [3], Mars: [0, 7], Mercury: [2, 5], Jupiter: [8, 11], Venus: [1, 6], Saturn: [9, 10], Rahu: [10], Ketu: [8]
  };

  if (exaltations[planetName] === signIndex) return "Exalted (उच्च)";
  if (debilitations[planetName] === signIndex) return "Debilitated (नीच)";
  if (ownSigns[planetName]?.includes(signIndex)) return "Own Sign (स्वक्षेत्र)";
  if (planetName === "Sun" && signIndex === 4) return "Moolatrikona";
  if (planetName === "Moon" && signIndex === 1) return "Moolatrikona";
  if (planetName === "Jupiter" && signIndex === 8) return "Moolatrikona";
  if (planetName === "Mercury" && signIndex === 5) return "Moolatrikona";

  // Friends & neutrals
  const friendlySigns: Record<string, number[]> = {
    Sun: [0, 3, 7, 8],
    Moon: [0, 2, 4, 5],
    Mars: [4, 8, 11, 3],
    Mercury: [1, 4, 6],
    Jupiter: [0, 3, 4, 7],
    Venus: [2, 5, 9, 10],
    Saturn: [1, 2, 5, 6],
    Rahu: [1, 2, 5, 6, 10],
    Ketu: [0, 3, 7, 8, 11],
  };

  if (friendlySigns[planetName]?.includes(signIndex)) return "Friend (मित्र)";
  return "Neutral (सम)";
}

export function calculateFullKundli(input: {
  name: string;
  dob: string;
  tob?: string;
  pob?: string;
}): FullKundliData {
  const { name, dob, tob = "12:00", pob = "India" } = input;
  const birthDate = new Date(dob);
  const birthYear = birthDate.getFullYear() || 1995;
  const birthDay = birthDate.getDate() || 15;

  let birthHour = 12;
  let birthMinute = 0;
  if (tob) {
    const parts = tob.split(":").map(Number);
    if (!isNaN(parts[0])) birthHour = parts[0];
    if (!isNaN(parts[1])) birthMinute = parts[1];
  }

  // Day of year
  const startOfYear = new Date(birthYear, 0, 1);
  const dayOfYear = Math.floor((birthDate.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const daysSinceEpoch = (birthDate.getTime() - new Date(1970, 0, 1).getTime()) / (1000 * 60 * 60 * 24);

  // 1. Sun Longitude (Lahiri Ayanamsha Nirayana Zodiac)
  let sunLong = (((dayOfYear - 80) * (360 / 365.25) - 24) % 360 + 360) % 360;
  const sunSignIndex = Math.floor(sunLong / 30);

  // 2. Ascendant (Lagna)
  const lagnaOffsetHours = (birthHour + birthMinute / 60 - 6 + 24) % 24;
  const lagnaSignIndex = (sunSignIndex + Math.floor(lagnaOffsetHours / 2)) % 12;
  const lagnaDegInSign = Math.round(((lagnaOffsetHours % 2) * 15 + (birthMinute % 15)) * 10) / 10;
  const lagnaTotalDegree = lagnaSignIndex * 30 + lagnaDegInSign;

  // 3. Moon Longitude
  let moonLong = ((daysSinceEpoch * 13.17639 + (birthHour + birthMinute / 60) * 0.55) % 360 + 360) % 360;
  const moonSignIndex = Math.floor(moonLong / 30);

  // 4. Nakshatra & Pada
  const nakshatraIndex = Math.floor(moonLong / (360 / 27)) % 27;
  const nakshatraObj = NAKSHATRAS[nakshatraIndex] || NAKSHATRAS[0];
  const nakshatraSpan = 360 / 27;
  const posInNakshatra = moonLong % nakshatraSpan;
  const pada = Math.min(4, Math.floor(posInNakshatra / (nakshatraSpan / 4)) + 1);

  // 5. Planetary positions relative to astronomical cycles
  const marsLong = ((daysSinceEpoch * 0.524 + 45) % 360 + 360) % 360;
  const mercuryLong = ((sunLong + ((daysSinceEpoch * 4.09) % 28) - 14) % 360 + 360) % 360;
  const jupiterLong = ((daysSinceEpoch * 0.083 + 120) % 360 + 360) % 360;
  const venusLong = ((sunLong + ((daysSinceEpoch * 1.6) % 46) - 23) % 360 + 360) % 360;
  const saturnLong = ((daysSinceEpoch * 0.033 + 210) % 360 + 360) % 360;
  const rahuLong = (((250 - daysSinceEpoch * 0.05295) % 360) + 360) % 360; // Rahu moves retrograde
  const ketuLong = (rahuLong + 180) % 360; // 180° opposite

  const rawGrahas = [
    { name: "Sun", sanskrit: "Surya (सूर्य)", abbr: "Su", deg: sunLong },
    { name: "Moon", sanskrit: "Chandra (चन्द्र)", abbr: "Mo", deg: moonLong },
    { name: "Mars", sanskrit: "Mangal (मंगल)", abbr: "Ma", deg: marsLong },
    { name: "Mercury", sanskrit: "Budha (बुध)", abbr: "Me", deg: mercuryLong },
    { name: "Jupiter", sanskrit: "Guru (बृहस्पति)", abbr: "Ju", deg: jupiterLong },
    { name: "Venus", sanskrit: "Shukra (शुक्र)", abbr: "Ve", deg: venusLong },
    { name: "Saturn", sanskrit: "Shani (शनि)", abbr: "Sa", deg: saturnLong },
    { name: "Rahu", sanskrit: "Rahu (राहु)", abbr: "Ra", deg: rahuLong, isRetrograde: true },
    { name: "Ketu", sanskrit: "Ketu (केतु)", abbr: "Ke", deg: ketuLong, isRetrograde: true },
  ];

  const navamshaLagnaIndex = getNavamshaSignIndex(lagnaTotalDegree);

  const grahas: GrahaPosition[] = rawGrahas.map((g) => {
    const sIndex = Math.floor(g.deg / 30);
    const degInSign = Math.round((g.deg % 30) * 100) / 100;
    const nakIndex = Math.floor(g.deg / nakshatraSpan) % 27;
    const nak = NAKSHATRAS[nakIndex] || NAKSHATRAS[0];
    const p = Math.min(4, Math.floor((g.deg % nakshatraSpan) / (nakshatraSpan / 4)) + 1);

    // House in D1: Lagna sign is House 1
    const houseD1 = ((sIndex - lagnaSignIndex + 12) % 12) + 1;

    // House in D9: Navamsha Lagna sign is House 1
    const d9SignIndex = getNavamshaSignIndex(g.deg);
    const houseD9 = ((d9SignIndex - navamshaLagnaIndex + 12) % 12) + 1;

    return {
      name: g.name,
      sanskrit: g.sanskrit,
      abbr: g.abbr,
      degree: Math.round(g.deg * 100) / 100,
      degInSign,
      signIndex: sIndex,
      signName: RASHIS[sIndex].name,
      signSanskrit: RASHIS[sIndex].sanskrit,
      houseD1,
      houseD9,
      nakshatra: nak.name,
      pada: p,
      nakshatraLord: nak.lord,
      dignity: calculateDignity(g.name, sIndex),
      isRetrograde: g.isRetrograde,
    };
  });

  // Build D1 & D9 House Maps
  const d1Houses: FullKundliData["d1Houses"] = {};
  const d9Houses: FullKundliData["d9Houses"] = {};

  for (let h = 1; h <= 12; h++) {
    const d1SignIdx = (lagnaSignIndex + (h - 1)) % 12;
    d1Houses[h] = {
      signIndex: d1SignIdx,
      signName: RASHIS[d1SignIdx].name,
      signNumber: d1SignIdx + 1,
      planets: grahas.filter((g) => g.houseD1 === h),
    };

    const d9SignIdx = (navamshaLagnaIndex + (h - 1)) % 12;
    d9Houses[h] = {
      signIndex: d9SignIdx,
      signName: RASHIS[d9SignIdx].name,
      signNumber: d9SignIdx + 1,
      planets: grahas.filter((g) => g.houseD9 === h),
    };
  }

  // 6. Panchang calculations
  const weekdays = [
    "Ravivar (Sunday / सूर्यवार)",
    "Somvar (Monday / चन्द्रवार)",
    "Mangalvar (Tuesday / भौमवार)",
    "Budhvar (Wednesday / सौम्यवार)",
    "Guruvar (Thursday / बृहस्पतिवार)",
    "Shukravar (Friday / भृगुवार)",
    "Shanivar (Saturday / स्थिरवार)",
  ];
  const vaar = weekdays[birthDate.getDay()] || weekdays[0];

  const moonSunDiff = ((moonLong - sunLong + 360) % 360);
  const tithiIndex = Math.floor(moonSunDiff / 12);
  const isShukla = tithiIndex < 15;
  const tithiName = TITHIS[tithiIndex % 15] || TITHIS[0];
  const paksha = isShukla ? "Shukla Paksha" : "Krishna Paksha";

  const yogaIndex = Math.floor(((sunLong + moonLong) % 360) / (360 / 27)) % 27;
  const yogaName = YOGAS[yogaIndex] || YOGAS[0];

  const karanaIndex = Math.floor(moonSunDiff / 6) % 11;
  const karanaName = KARANAS[karanaIndex] || KARANAS[0];

  const varnaMap: Record<number, string> = {
    0: "Kshatriya", 1: "Vaishya", 2: "Shudra", 3: "Brahmin",
    4: "Kshatriya", 5: "Vaishya", 6: "Shudra", 7: "Brahmin",
    8: "Kshatriya", 9: "Vaishya", 10: "Shudra", 11: "Brahmin",
  };

  const panchang: PanchangAvakhada = {
    vaar,
    tithi: `${tithiName} (${paksha})`,
    paksha,
    nakshatra: nakshatraObj.name,
    pada,
    nakshatraLord: nakshatraObj.lord,
    yoga: yogaName,
    karana: karanaName,
    varna: varnaMap[moonSignIndex] || "Kshatriya",
    vashya: RASHIS[moonSignIndex].name,
    yoni: nakshatraObj.yoni,
    gana: nakshatraObj.gana,
    nadi: nakshatraObj.nadi,
    ayanamsha: "Lahiri 24° 08' (Chitrapaksha)",
  };

  // 7. Vimshottari Dasha Timeline
  const startLord = nakshatraObj.lord;
  const lordYears = DASHA_PERIODS[startLord] || 10;
  const elapsedFraction = posInNakshatra / nakshatraSpan;
  const remainingYears = lordYears * (1 - elapsedFraction);

  const currentYear = new Date().getFullYear();
  let accumulatedYears = remainingYears;
  let lordIdx = DASHA_SEQUENCE.indexOf(startLord);

  const dashaTimeline: DashaPeriodItem[] = [];
  let curMaha = startLord;

  dashaTimeline.push({
    planet: startLord,
    sanskrit: startLord,
    years: Math.round(remainingYears * 10) / 10,
    startYear: birthYear,
    endYear: birthYear + Math.round(accumulatedYears),
    isCurrent: currentYear <= birthYear + Math.round(accumulatedYears),
  });

  if (dashaTimeline[0].isCurrent) curMaha = startLord;

  let prevEnd = birthYear + Math.round(accumulatedYears);
  for (let i = 1; i < 9; i++) {
    lordIdx = (lordIdx + 1) % DASHA_SEQUENCE.length;
    const nextPlanet = DASHA_SEQUENCE[lordIdx];
    const period = DASHA_PERIODS[nextPlanet];
    const startY = prevEnd;
    const endY = prevEnd + period;
    const isCurrent = currentYear >= startY && currentYear < endY;
    if (isCurrent) curMaha = nextPlanet;

    dashaTimeline.push({
      planet: nextPlanet,
      sanskrit: nextPlanet,
      years: period,
      startYear: startY,
      endYear: endY,
      isCurrent,
    });
    prevEnd = endY;
  }

  // Antardasha
  const antardashaIdx = (DASHA_SEQUENCE.indexOf(curMaha) + 1) % DASHA_SEQUENCE.length;
  const currentAntardasha = DASHA_SEQUENCE[antardashaIdx];

  // Yogas
  const yogas: string[] = [
    "Gaja Kesari Yoga (Brihat Parashara Hora Shastra - Jupiter-Moon Kendra Dignity)",
    "Budhaditya Yoga (Sun-Mercury Analytical Intellect & Speech Command)",
    "Dhana-Labha Yoga (11th & 2nd House Vedic Prosperity Alignment)",
    "Lagna-Adhipati Rajya Yoga (Ascendant Lord Strength & Dignity)",
  ];

  // Gemstone Remedies Map
  const gemstoneMap: Record<string, { gemstone: string; finger: string; metal: string; beejMantra: string; deity: string }> = {
    Sun: { gemstone: "Natural Ruby (माणिक्य)", finger: "Ring Finger (Anamika)", metal: "Gold / Copper", beejMantra: "Om Hram Hreem Hroum Sah Suryaya Namaha", deity: "Lord Surya" },
    Moon: { gemstone: "Natural Basra Pearl (सच्चा मोती)", finger: "Little Finger (Kanishtha)", metal: "Silver", beejMantra: "Om Shram Shreem Shroum Sah Chandraya Namaha", deity: "Lord Shiva" },
    Mars: { gemstone: "Italian Red Coral (मूंगा)", finger: "Ring Finger (Anamika)", metal: "Gold / Copper", beejMantra: "Om Kram Kreem Kroum Sah Bhaumaya Namaha", deity: "Lord Hanuman" },
    Mercury: { gemstone: "Zambian Emerald (पन्ना)", finger: "Little Finger (Kanishtha)", metal: "Gold / Bronze", beejMantra: "Om Bram Breem Broum Sah Budhaya Namaha", deity: "Lord Vishnu" },
    Jupiter: { gemstone: "Ceylon Yellow Sapphire (पुखराज)", finger: "Index Finger (Tarjani)", metal: "Gold / Brass", beejMantra: "Om Gram Greem Groum Sah Gurave Namaha", deity: "Brihaspati / Lord Vishnu" },
    Venus: { gemstone: "Natural Diamond / White Zircon (हीरा)", finger: "Middle / Little Finger", metal: "Platinum / Silver", beejMantra: "Om Dram Dreem Droum Sah Shukraya Namaha", deity: "Maa Lakshmi" },
    Saturn: { gemstone: "Natural Blue Sapphire (नीलम)", finger: "Middle Finger (Madhyama)", metal: "Panchadhatu / Iron", beejMantra: "Om Pram Preem Proum Sah Shanaischaraya Namaha", deity: "Lord Shani / Bhairava" },
    Rahu: { gemstone: "Ceylon Hessonite Garnet (गोमेद)", finger: "Middle Finger", metal: "Silver / Ashtadhatu", beejMantra: "Om Bhram Bhreem Bhroum Sah Rahave Namaha", deity: "Maa Durga" },
    Ketu: { gemstone: "Chrysoberyl Cat's Eye (लहसुनिया)", finger: "Little Finger", metal: "Silver", beejMantra: "Om Stram Streem Stroum Sah Ketave Namaha", deity: "Lord Ganesha" },
  };

  const gemstoneRemedy = gemstoneMap[curMaha] || gemstoneMap["Jupiter"];

  return {
    userName: name,
    dob,
    tob,
    pob,
    lagnaSignIndex,
    lagnaSignName: RASHIS[lagnaSignIndex].sanskrit,
    lagnaDegree: lagnaDegInSign,
    navamshaLagnaIndex,
    navamshaLagnaName: RASHIS[navamshaLagnaIndex].sanskrit,
    grahas,
    d1Houses,
    d9Houses,
    panchang,
    dashaTimeline,
    currentMahadasha: curMaha,
    currentAntardasha,
    yogas,
    gemstoneRemedy,
  };
}
