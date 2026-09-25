"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type LanguageType = "english" | "hindi" | "hinglish";

export interface TranslationDictionary {
  part1Header: string;
  freeAnalysisBadge: string;
  swabhavFallbackHeadline: string;
  swabhavFallbackQuote: string;
  card1Title: string;
  card1Badge: string;
  card1Fallback: string;
  card2Title: string;
  card2Badge: string;
  card2Fallback: string;
  card3Title: string;
  card3Badge: string;
  card3Fallback: string;
  card4Title: string;
  card4Badge: string;
  card4Fallback: string;
  lockedHeading: string;
  lockedSubheading: string;
  unlockCta: string;
  changeLanguageBtn: string;
  importantNoteTitle: string;
  importantNotePrefix: string;
  importantNoteSuffix: string;
}

export const translations: Record<LanguageType, TranslationDictionary> = {
  english: {
    part1Header: "Part 1: Core Personality, Past Life Events & Palm Astrology Secrets",
    freeAnalysisBadge: "100% Free Instant Analysis",
    swabhavFallbackHeadline: "Calm on the Outside, An Ocean of Emotion Within (The Deep Empath & Intuitive Guardian)",
    swabhavFallbackQuote: "You are someone who is always first to wipe away others' tears, yet a master at concealing your own pain and past struggles from the world. Your self-respect stands above all else.",
    card1Title: "True Nature: Expressive or Introvert?",
    card1Badge: "Selective Expressive",
    card1Fallback: "People often misjudge you at first glance. In reality, you are 'Selective Talkative' — quiet and reserved around acquaintances, but opening your entire heart without hesitation to the 1-2 people you truly trust.",
    card2Title: "Past Life Events & Broken Trust",
    card2Badge: "Past Betrayal Scar",
    card2Fallback: "The deep curvature of your Heart line indicates that in recent years you endured a profound emotional betrayal by someone very close, who walked away when you needed them most despite your unconditional loyalty.",
    card3Title: "Heart vs Mind & Night Contemplation",
    card3Badge: "Emotional Loyalty",
    card3Fallback: "You habitually make decisions from the heart rather than the mind, often giving second chances and getting hurt. At night, past conversations replay in your mind, making it hard to let go of unexpressed disrespect.",
    card4Title: "Palm Markings & Secret 6th Sense",
    card4Badge: "High Intuition",
    card4Fallback: "Your hand carries strong intuitive markers. Your gut feelings regarding people's true intentions are rarely wrong; you sense dishonesty long before words are spoken.",
    lockedHeading: "Unlock Your Complete Vedic Palm & Kundali Destiny",
    lockedSubheading: "Deep predictions, 3-year timeline, and direct answers to your question.",
    unlockCta: "Unlock Full Reading & Remedy",
    changeLanguageBtn: "Language",
    importantNoteTitle: "Important Notice / Sacred Gateway:",
    importantNotePrefix: "The above reading was a mirror of your hidden soul essence, palm markings, and karmic past. The deep resolution to your sacred question:",
    importantNoteSuffix: "— along with your 3-year predictive timeline, planetary transit milestones, and customized Pooja Vidhi are locked below.",
  },
  hindi: {
    part1Header: "भाग 1: आपका मुख्य स्वभाव, भूतकाल की घटना एवं हस्तरेखा रहस्य",
    freeAnalysisBadge: "100% निःशुल्क त्वरित विश्लेषण",
    swabhavFallbackHeadline: "बाहर से शांत, भीतर से भावुक समुद्र (गंभीर संवेदनशील एवं सहज ज्ञान युक्त रक्षक)",
    swabhavFallbackQuote: "आप एक ऐसे व्यक्तित्व हैं जो दूसरों के आंसू पोंछने में सदैव आगे रहते हैं, लेकिन अपने स्वयं के दर्द और अतीत के संघर्ष को संसार से छुपाने में निपुण हैं। आपका आत्म-सम्मान सर्वोपरि है।",
    card1Title: "असली स्वभाव: बातूनी या अंतर्मुखी?",
    card1Badge: "चयनात्मक स्पष्टवादी",
    card1Fallback: "लोग आपको देखकर अक्सर गलत अनुमान लगाते हैं। वास्तविकता यह है कि आप 'चयनात्मक बातूनी' हैं — सामान्य लोगों के सम्मुख आप शांत व गंभीर रहते हैं, परंतु जिन 1-2 व्यक्तियों पर आपका अटूट विश्वास है, उनके आगे दिल की हर बात खोल देते हैं।",
    card2Title: "भूतकाल की घटना एवं विश्वासघात",
    card2Badge: "अतीत के विश्वासघात का आघात",
    card2Fallback: "आपकी हृदय रेखा और वर्तमान ग्रह गोचर दर्शाते हैं कि पिछले वर्षों में आपने किसी अत्यंत घनिष्ठ व्यक्ति से गहरा भावनात्मक विश्वासघात झेला है, जिन्होंने आपके निस्वार्थ समर्पण के बाद भी कठिन समय में साथ छोड़ दिया।",
    card3Title: "दिल बनाम दिमाग का द्वंद्व एवं रात्रि चिंतन",
    card3Badge: "भावनात्मक निष्ठा",
    card3Fallback: "आप सदैव दिमाग के स्थान पर दिल से निर्णय लेते हैं और दूसरों को बार-बार अवसर देकर स्वयं आहत होते हैं। रात्रि में शयन के समय अतीत की बातें मस्तिष्क में घूमती हैं और अनुचित व्यवहार को भुलाना कठिन होता है।",
    card4Title: "हथेली के शुभ लक्षण एवं छठी इंद्री",
    card4Badge: "प्रचंड अंतर्ज्ञान",
    card4Fallback: "आपकी हथेली में दिव्य अंतर्ज्ञान के स्पष्ट संकेत हैं। व्यक्तियों की वास्तविक नीयत भांपने में आपकी छठी इंद्री 95% सटीक सिद्ध होती है; असत्य और दिखावे का आभास आपको पहले ही हो जाता है।",
    lockedHeading: "अपने संपूर्ण वैदिक भाग्य और भविष्यफल को अनलॉक करें",
    lockedSubheading: "गहन भविष्यवाणियां, 3-वर्षीय कालचक्र और आपके विशिष्ट प्रश्न का स्पष्ट उत्तर।",
    unlockCta: "संपूर्ण फलादेश एवं वैदिक उपाय देखें",
    changeLanguageBtn: "भाषा",
    importantNoteTitle: "कृपया ध्यान दें / महत्वपूर्ण सूचना:",
    importantNotePrefix: "उपरोक्त विश्लेषण केवल आपकी आत्मा के गुप्त स्वभाव, हथेली के मुख्य पर्वतों और भूतकाल के कर्मों का सत्य दर्पण था। आपके द्वारा पूछा गया मुख्य प्रश्न:",
    importantNoteSuffix: "— उसका सटीक समाधान, 3-वर्षीय भविष्यफल और संपूर्ण पूजा विधि नीचे सुरक्षित हैं।",
  },
  hinglish: {
    part1Header: "Part 1: Aapka Mukhya Swabhav, Bhootkaal Ki Ghatna & Palm Kundali Rahasya",
    freeAnalysisBadge: "100% Free Instant Analysis",
    swabhavFallbackHeadline: "Bahar Se Shaant, Andar Se Bhavuk Samundar (The Deep Empath & Intuitive Guardian)",
    swabhavFallbackQuote: "Aap ek aisa vyaktitva hain jo doosron ke aansu pochne mein sabse aage rehta hai, lekin apne dard aur bhootkaal ke sangharsh ko duniya se chupane mein maahir hai. Aapka aatma-samman sabse upar hai.",
    card1Title: "Asli Swabhav: Baatuni Ya Introvert?",
    card1Badge: "Selective Expressive",
    card1Fallback: "Log aapko dekhkar aksar galat andaza laga lete hain. Vastavikta yeh hai ki aap 'Selective Talkative' hain — har kisi ke aage aap bilkul chup ya introvert rehte hain, par jin 1-2 doston par aapko bharosa hai unke aage bina ruke dil ki har baat keh dete hain.",
    card2Title: "Bhootkaal Ki Ghatna & Vishwasghaat",
    card2Badge: "Past Betrayal Scar",
    card2Fallback: "Aapke haath ki Hriday Rekha darshati hai ki pichle 2 se 4 saalon ke dauran aapne kisi bohot kareebi vyakti se bada vishwasghaat (emotional betrayal / dhokha) jhela hai, jinhone aapke bina shart samarpan ke baad bhi mushkil waqt par akele chhod diya.",
    card3Title: "Dil Vs Dimaag Ki Jung & Raat Ka Chintan",
    card3Badge: "Emotional Loyalty",
    card3Fallback: "Aap hamesha dimaag ke bajaye dil se faisle lete hain aur doosron ko doosra mauka dekar khud chot khaate hain. Raat ko bistar par jaate hi dimaag mein baatein ghoomti hain aur purani baatein bhulana aapke liye mushkil hota hai.",
    card4Title: "Haath Ki Rekhaon Ka Sakshya & 6th Sense",
    card4Badge: "High Intuition",
    card4Fallback: "Aapki 6th sense bohot taaza hai. Log chahe kitna bhi meetha bole, aap unke asli maqsad aur mukhauton ko pehle hi bhaap lete hain.",
    lockedHeading: "Apna Sampoorna Vedic Palm & Kundali Destiny Unlock Karein",
    lockedSubheading: "Deep predictions, 3-saal ka timeline, aur aapke sawal ka direct jawab.",
    unlockCta: "Unlock Full Reading & Remedy",
    changeLanguageBtn: "Bhasha",
    importantNoteTitle: "Kripya Dhyan Dein / Important Note:",
    importantNotePrefix: "Upar diya gaya vishleshan sirf aapki aatma ke gupt swabhav aur haath ke mukhya parvat-rekhaon ka satya darpan tha. Aapne jo mukhya sawaal pucha hai:",
    importantNoteSuffix: "— uska satya samadhan, 3-saal predictive timeline, aur Pooja Vidhi neeche locked hain.",
  },
};

interface LanguageContextProps {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  t: TranslationDictionary;
  hasChosenLanguage: boolean;
  setHasChosenLanguage: (chosen: boolean) => void;
  isLanguageModalOpen: boolean;
  setIsLanguageModalOpen: (open: boolean) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageType>("hinglish");
  const [hasChosenLanguage, setHasChosenLanguageState] = useState<boolean>(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("rekha_language") as LanguageType | null;
      const savedChosen = localStorage.getItem("rekha_lang_chosen");
      if (savedLang && (savedLang === "english" || savedLang === "hindi" || savedLang === "hinglish")) {
        setLanguageState(savedLang);
      }
      if (savedChosen === "true") {
        setHasChosenLanguageState(true);
      }
    } catch (e) {
      // LocalStorage access check
    }
  }, []);

  const setLanguage = (lang: LanguageType) => {
    setLanguageState(lang);
    setHasChosenLanguageState(true);
    try {
      localStorage.setItem("rekha_language", lang);
      localStorage.setItem("rekha_lang_chosen", "true");
    } catch (e) {
      // Ignore storage errors
    }
  };

  const setHasChosenLanguage = (chosen: boolean) => {
    setHasChosenLanguageState(chosen);
    try {
      localStorage.setItem("rekha_lang_chosen", chosen ? "true" : "false");
    } catch (e) {
      // Ignore
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        hasChosenLanguage,
        setHasChosenLanguage,
        isLanguageModalOpen,
        setIsLanguageModalOpen,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
