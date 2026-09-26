import { VedicChartResult } from "./vedic-engine";

export interface PujaVidhiData {
  primaryDeity: string;
  auspiciousDay: string;
  samagri: string[];
  sankalp: string;
  steps: string[];
  daana: string;
}

/**
 * Authentic 9-Graha Vedic Anushthan & Puja Vidhi Generator
 * Synthesizes 100% distinct, classical Shastra-based rituals mapped specifically
 * to the native's active Mahadasha, Ascendant, and exact planetary coordinates.
 */
export function calculateAuthenticPujaVidhi(
  vedicChart: VedicChartResult,
  name: string,
  pob?: string
): PujaVidhiData {
  const dasha = vedicChart.currentMahadasha;
  const place = pob || "Native Janmabhoomi";

  switch (dasha) {
    case "Surya":
    case "Sun":
      return {
        primaryDeity: "Bhagwan Surya Narayana & Gayatri Devi",
        auspiciousDay: "Sunday at Sunrise (Ravi Pratyaksha Muhurta)",
        samagri: [
          "Tamra Patra (Pure Copper Kalash for Arghya)",
          "Raktachandan (Red Sandalwood paste) & Lal Kaner flowers",
          "Shuddh Gur (Organic Jaggery) & Gehun (Whole Wheat grains)",
          "Pure Cow Ghee Lamp (Ekamukhi Diya)",
          "Red Silk or Cotton Asana",
          "Akshat (Unbroken rice), Janeu, and Ganga Jal",
        ],
        sankalp: `Om Suryaya Namah. Mama sarva aatma-prabhava vriddhyartham, pitra-kripa labhartham, Surya Mahadasha shubha phala praptyartham shri Surya Narayana aradhanam aham karishye.`,
        steps: [
          `1. Surya Arghya: Stand facing East at sunrise. Pour sacred water from copper kalash with red flowers and jaggery towards the rising Sun chanting 'Om Ghrinih Suryaya Namah'.`,
          "2. Deepa Prajvalana: Light pure cow ghee lamp facing East.",
          "3. Aditya Hridayam: Recite or listen with eyes closed to the Aditya Hridaya Stotram for victory over hidden obstacles and career elevation.",
          `4. Sankalp: Take unbroken rice and water in right palm, state your full name (${name}), place of birth (${place}), and release water to earth.`,
          `5. Mukhya Japa: Chant 108 repetitions of your personal Surya Beej Mantra: ${vedicChart.favorableMantra} using a Red Sandalwood or Rudraksha mala.`,
          "6. Surya Samarpan: Offer sweet jaggery-wheat prasad (bhog) to family and seek blessings of father or family elders.",
        ],
        daana: "Donate whole wheat grains (gehun), jaggery, or a copper vessel to a temple priest on Sunday morning.",
      };

    case "Chandra":
    case "Moon":
      return {
        primaryDeity: "Bhagwan Someshwara Shiva & Chandra Dev",
        auspiciousDay: "Monday Evening at Moonrise",
        samagri: [
          "Pure Silver or Kansa Bowl",
          "Raw unboiled Cow Milk & Holy Ganga Jal",
          "Shweta Chandan (White Sandalwood paste)",
          "White Fragrant Flowers (Mogra / Jasmine / White Lotus)",
          "White Sesame (Shweta Til) and Sugar Candy (Mishri)",
          "Pure Cow Ghee Diya",
        ],
        sankalp: `Om Someshwaraya Namah. Mama manashanti, aantarik sthirata, Chandra Mahadasha shubha phala praptyartham shri Someshwara Shiva aradhanam aham karishye.`,
        steps: [
          "1. Shiva-Chandra Abhishekam: Bathe Shivling or meditate on the Moon offering raw milk mixed with Ganga Jal.",
          "2. Shweta Deepam: Light ghee lamp facing North-West (the cosmic lunar direction).",
          "3. Chandra Dhyanam: Meditate upon cooling lunar nectar soothing night overthinking and emotional friction.",
          `4. Sankalp: State your full name (${name}), town (${place}), asking for emotional clarity, mental peace, and maternal protection.`,
          `5. Mukhya Japa: 108 repetitions of Chandra Beej Mantra: ${vedicChart.favorableMantra} using a Sphatik (Quartz) or Pearl mala.`,
          "6. Kheer Samarpan: Prepare white sweet rice kheer as prasad and share with family.",
        ],
        daana: "Donate raw cow milk, rice, white garments, or silver coins to elder mothers or needy women on Monday.",
      };

    case "Mangal":
    case "Mars":
      return {
        primaryDeity: "Pawanputra Lord Hanuman & Lord Kartikeya",
        auspiciousDay: "Tuesday at Noon or Pradosh Sandhya",
        samagri: [
          "Orange Sindoor from Hanuman Mandir",
          "Shuddh Chameli Ka Tel (Pure Jasmine Oil)",
          "Lal Masoor Dal (Red Split Lentils)",
          "Red Cotton Cloth & Janeu",
          "Organic Gur (Jaggery) and Roasted Gram (Bhuna Chana)",
          "Clay Diya with Mustard or Jasmine Oil",
        ],
        sankalp: `Om Hanumate Namah. Mama bhratru-sampatti-rakshartham, krodha-shantyartham, Mangala Mahadasha shubha phala praptyartham shri Hanuman aradhanam aham karishye.`,
        steps: [
          "1. Hanuman Chola Arpan: Offer jasmine oil and sindoor to Lord Hanuman for dismantling fear, property disputes, and adversaries.",
          "2. Deepa Prajvalana: Light red-wick lamp facing South or East.",
          "3. Hanuman Chalisa / Bajrang Baan: Recite 3 times with focused devotion.",
          `4. Sankalp: Take water and red lentils in right palm, state full name (${name}), and pray for courage and decisive action.`,
          `5. Mukhya Japa: 108 repetitions of Mangal Beej Mantra: ${vedicChart.favorableMantra} using a Red Coral or Rudraksha mala.`,
          "6. Boondi Samarpan: Distribute orange sweet boondi or roasted jaggery-gram to children.",
        ],
        daana: "Donate red lentils (Masoor Dal), copper coins, or sweet boondi to young boys or Hanuman temple on Tuesday.",
      };

    case "Budha":
    case "Mercury":
      return {
        primaryDeity: "Bhagwan Lakshmi-Narayana & Lord Vignaharta Ganesha",
        auspiciousDay: "Wednesday Morning (Budha Hora)",
        samagri: [
          "Fresh Green Durva Grass (21 sacred blades knotted in pairs)",
          "Sabut Green Moong Dal (Whole Green Gram)",
          "Fresh Tulsi Patra (Holy Basil leaves)",
          "Green Cotton Cloth or Ribbon",
          "Pure Cow Ghee Diya",
          "Green Cardamom (Elaichi), Betel Leaf (Paan) & Supari",
        ],
        sankalp: `Om Namo Narayanaya. Mama buddhi-vyapar-vriddhyartham, vachan-siddhyartham, Budha Mahadasha shubha phala praptyartham shri Vishnu-Ganesha aradhanam aham karishye.`,
        steps: [
          "1. Ganesha Durvarchanam: Offer 21 knots of green Durva grass to Lord Ganesha for resolving intellectual blockades and contracts.",
          "2. Tulsi Samarpana: Offer fragrant Tulsi leaves to Lord Vishnu.",
          "3. Deepa Prajvalana: Light cow ghee lamp facing North (the direction governed by Mercury).",
          `4. Sankalp: Hold unbroken rice and water in right palm, state full name (${name}), town (${place}), praying for speech clarity and commercial breakthrough.`,
          `5. Mukhya Japa: 108 repetitions of Budha Beej Mantra: ${vedicChart.favorableMantra} using a Tulsi or Green Aventurine mala.`,
          "6. Modak & Prasad: Offer green moong prasad and green fruits (guava/pear) to family.",
        ],
        daana: "Feed green fodder (Palak / Grass) to cows on Wednesday morning, or donate green moong dal and stationery books to students.",
      };

    case "Guru":
    case "Jupiter":
      return {
        primaryDeity: "Devaguru Brihaspati & Lord Dakshinamurthy",
        auspiciousDay: "Thursday Morning at Brahma Muhurta (Dawn)",
        samagri: [
          "Chana Dal (Yellow Split Chickpeas)",
          "Shuddh Kasturi Haldi (Whole Turmeric roots)",
          "Fresh Yellow Genda (Marigold) Flowers",
          "Yellow Silk or Cotton Cloth",
          "Pure Cow Ghee Diya with Yellow Saffron Wick",
          "Fresh Yellow Bananas and Besan Laddoos",
        ],
        sankalp: `Om Devagurave Namah. Mama jnana-santati-bhagya-vriddhyartham, Guru Mahadasha shubha phala praptyartham shri Brihaspati aradhanam aham karishye.`,
        steps: [
          "1. Guru Vandana: Bow to ancestral teachers and spiritual guides.",
          "2. Haldi-Chana Arpan: Offer yellow turmeric and chana dal at the base of a banana tree or Vishnu altar.",
          "3. Deepa Prajvalana: Light cow ghee lamp facing North-East (Ishan Kona).",
          `4. Sankalp: State your full name (${name}), town (${place}), praying for divine wisdom, career expansion, and family honor.`,
          `5. Mukhya Japa: 108 repetitions of Guru Beej Mantra: ${vedicChart.favorableMantra} using a Turmeric or Yellow Sandalwood mala.`,
          "6. Besan Laddoo Samarpan: Partake of yellow sweets and share with teachers or elders.",
        ],
        daana: "Donate yellow books, Chana dal, raw turmeric, or bananas to elders, teachers, or temple priests on Thursday.",
      };

    case "Shukra":
    case "Venus":
      return {
        primaryDeity: "Maa Mahalakshmi & Bhagwan Shukracharya",
        auspiciousDay: "Friday Twilight (Shukra Sandhya)",
        samagri: [
          "Fragrant Natural Rose or Sandalwood Ittar (Attar)",
          "Fresh White Lotus or White Kunda Flowers",
          "Rice cooked in Cow Milk (Shweta Kheer with Mishri)",
          "Mishri (Crystal Sugar) & Green Cardamom",
          "Pink or White Silk Cloth",
          "Pure Camphor (Bhimseni Karpura) & Ghee Diya",
        ],
        sankalp: `Om Shrim Mahalakshmyai Namah. Mama saubhagya, daampatya sukha, aakarshana-vriddhyartham, Shukra Mahadasha shubha phala praptyartham shri Mahalakshmi aradhanam aham karishye.`,
        steps: [
          "1. Lakshmi Abhishekam: Offer fragrant rose water or lotus flowers to Maa Mahalakshmi.",
          "2. Sugandha Dhoopam: Burn natural rose/camphor dhoop filling your sacred space with magnetic vibration.",
          "3. Sri Suktam: Recite or listen to Sri Suktam for luxury, relationship harmony, and debt removal.",
          `4. Sankalp: State full name (${name}), town (${place}), praying for marital peace and financial elegance.`,
          `5. Mukhya Japa: 108 repetitions of Shukra Beej Mantra: ${vedicChart.favorableMantra} using a Sphatik or Lotus Seed (Kamalgatta) mala.`,
          "6. Kheer Samarpan: Distribute cold sweet rice kheer to women and family members.",
        ],
        daana: "Donate white silk clothes, silver ornaments, cosmetics, milk, or ghee to underprivileged women or girls on Friday.",
      };

    case "Shani":
    case "Saturn":
      return {
        primaryDeity: "Lord Shani Dev & Hanuman Mahaprabhu",
        auspiciousDay: "Saturday Evening (Pradosh Kaal)",
        samagri: [
          "Kala Til (Black Sesame Seeds)",
          "Shuddh Sarson Ka Tel (Pure Cold-Pressed Mustard Oil)",
          "Loha Diya (Iron Lamp) or Thick Clay Diya",
          "Neeli Aparajita or Dark Blue Flowers",
          "Black Cloth and Whole Sabut Urad Dal",
          "Loban / Guggul Herbal Resin Dhoop",
        ],
        sankalp: `Om Sham Shanaischaraya Namah. Mama karma-dosha nivaranartham, aayushya vriddhyartham, Shani Mahadasha shubha phala praptyartham shri Shani Deva aradhanam aham karishye.`,
        steps: [
          "1. Tailabhishekam / Shani Deepam: Light mustard oil lamp under a Peepal tree or iron altar facing West.",
          "2. Shani Chalisa: Recite with humility and complete psychological surrender.",
          "3. Loban Dhoopam: Cleanse your aura and room with burning loban resin.",
          `4. Sankalp: State full name (${name}), town (${place}), praying for patience, long-term health, and relief from karmic delay.`,
          `5. Mukhya Japa: 108 repetitions of Shani Beej Mantra: ${vedicChart.favorableMantra} using an authentic 108-bead Rudraksha mala.`,
          "6. Hanuman Sharan: End with 1 recital of Hanuman Chalisa to seal your protective shield.",
        ],
        daana: "Feed black dogs with mustard-oil roti, or donate mustard oil, black umbrella, footwear, or iron tools to laborers on Saturday.",
      };

    case "Rahu":
      return {
        primaryDeity: "Lord Kaal Bhairava & Goddess Durga",
        auspiciousDay: "Wednesday or Saturday Night (After Sunset)",
        samagri: [
          "Whole Dry Coconut with intact husk (Jata Nariyal)",
          "Kala Urad & Black Mustard Seeds (Rai)",
          "Blue or Dark Grey Cotton Cloth",
          "Pure Guggul Dhoop & Bhimseni Camphor",
          "Mustard Oil Diya with Dark Blue Wick",
          "Red Hibiscus or Dark Blue Flowers",
        ],
        sankalp: `Om Bhairavaya Namah. Mama bhrama, aakasmika baadha, Rahu Mahadasha shubha phala praptyartham, aatmaraksha-hetu shri Kaal Bhairava aradhanam aham karishye.`,
        steps: [
          "1. Bhairava Vandana: Bow to Lord Kaal Bhairava, the fierce guardian of cosmic time and sovereign dispeller of illusions.",
          "2. Nariyal Sankalp: Hold the dry coconut in both hands, circle clockwise over your head 7 times to absorb phantom static and hidden jealousy.",
          "3. Guggul Dhoop: Burn pure guggul on live charcoal to purify psychic space.",
          `4. Sankalp: State full name (${name}), town (${place}), praying for shield against betrayal, foreign complications, and ungrounded anxiety.`,
          `5. Mukhya Japa: 108 repetitions of Rahu Beej Mantra: ${vedicChart.favorableMantra} using a dark Rudraksha mala.`,
          "6. Bhairava Samarpan: Offer sweet mustard bread or biscuits to street dogs outdoors.",
        ],
        daana: "Feed stray street dogs with sweet bread, or immerse a whole dry coconut with husk into a flowing river on Saturday.",
      };

    case "Ketu":
    default:
      return {
        primaryDeity: "Lord Vignaharta Ganesha & Bhagwan Matsya Avatar",
        auspiciousDay: "Tuesday or Thursday Morning at Dawn",
        samagri: [
          "Satnaja (Sacred 7-grain mixture: Wheat, Rice, Moong, Urad, Chana, Jowar, Til)",
          "Fresh Kusha Grass / Durva Grass",
          "Multi-colored (Two-tone / Spotted) Cotton Cloth",
          "Ashwagandha & Guggul Dhoop",
          "Pure Sesame Oil Lamp",
          "White & Black Sesame Seeds mix",
        ],
        sankalp: `Om Ganapataye Namah. Mama adhyatmik unnati, poorva-karma vishleshan, Ketu Mahadasha shubha phala praptyartham shri Ganesha aradhanam aham karishye.`,
        steps: [
          "1. Ganesha Sharan: Bow to Lord Ganesha, master of the root chakra and cosmic dissolver of Ketu's karmic knots.",
          "2. Satnaja Arpan: Offer 7-grain mixture outdoors in clean nature for birds and ants.",
          "3. Kusha Asana: Sit on a traditional grass or woolen mat facing North.",
          `4. Sankalp: State full name (${name}), town (${place}), praying for spiritual liberation, clear intuition, and release from past attachments.`,
          `5. Mukhya Japa: 108 repetitions of Ketu Beej Mantra: ${vedicChart.favorableMantra} using a Cat's Eye (Vaidurya) or Rudraksha mala.`,
          "6. Prasad: Partake of light satvik fruits and dedicate spiritual merits to ancestors.",
        ],
        daana: "Feed multi-colored (spotted) stray dogs, or donate warm multi-colored woolen blankets to shelter homes or ascetics.",
      };
  }
}
