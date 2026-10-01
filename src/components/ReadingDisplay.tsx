"use client";

import React, { useState } from "react";
import Markdown from "markdown-to-jsx";
import {
  Sparkles,
  Volume2,
  VolumeX,
  Printer,
  Share2,
  RotateCcw,
  ShieldCheck,
  Compass,
  Star,
  BookOpen,
  Lock,
  Flame,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  Heart,
  MessageSquare,
  Eye,
  ShieldAlert,
  HeartHandshake,
  Globe,
  Loader2,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useAuth } from "@/lib/auth-context";
import { useLanguage, LanguageType } from "@/lib/language-context";
import PaywallModal, { SubscriptionTierType } from "./PaywallModal";
import LanguageSelectionModal from "./LanguageSelectionModal";
import RekhaFollowupChat from "./RekhaFollowupChat";
import FullVedicKundliSection from "./FullVedicKundliSection";

interface PujaVidhiData {
  primaryDeity: string;
  auspiciousDay: string;
  samagri: string[];
  sankalp: string;
  steps: string[];
  daana: string;
}

export interface FreeTeaserData {
  swabhavHeadline?: string;
  introvertExtrovertTrait?: string;
  pastGhatnaAndDhokha?: string;
  heartMindConflict?: string;
  nightOverthinkingTrait?: string;
  secretIntuition?: string;
  palmSignsWitness?: string;
  summaryNarrative?: string;
}

function formatReadingMarkdown(raw: string): string {
  if (!raw) return "";

  let text = raw
    .replace(/^```(?:json-teaser|json)?[\s\S]*?```/i, "")
    .replace(/^\s*\{[\s\S]*?"swabhavHeadline"[\s\S]*?\}\s*/i, "")
    .trim();

  // Normalize standalone numbered headers: "1. 💫 ...", "2. ✋ ..."
  text = text.replace(/^(\d+\.\s*[^\n]+)$/gm, "\n\n## $1\n\n");

  // Normalize subheaders like Left Palm, Right Palm, Physical Markings
  text = text.replace(/^(Left Palm[^\n]*)$/gim, "\n\n### ✋ $1\n\n");
  text = text.replace(/^(Right Palm[^\n]*)$/gim, "\n\n### ✋ $1\n\n");
  text = text.replace(/^(Physical Markings Verified[^\n]*)$/gim, "\n\n### 🔍 $1\n\n");

  // Format distinct markings / traits if on their own line with a colon into bullet items
  text = text.replace(
    /^((?:Trishul|Mystic Cross|Dhana Triangle|Solomon Ring|Matsya|Star on Jupiter|Fish sign|Temple sign|Lotus sign|Astrological Verdict|Critical Breakthrough Window|Karmic Guidance|Year \d+)[^:\n]*:)([\s\S]*?)$/gim,
    "\n- **$1** $2"
  );

  // Eliminate triple+ blank lines
  text = text.replace(/\n{3,}/g, "\n\n");

  return text.trim();
}

const markdownCustomOverrides = {
  overrides: {
    h1: {
      component: ({ children, ...props }: any) => (
        <h1
          className="text-2xl sm:text-3xl font-extrabold font-serif text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-amber-200 to-gold-400 border-b-2 border-gold-500/30 pb-3 mb-6 mt-4"
          {...props}
        >
          {children}
        </h1>
      ),
    },
    h2: {
      component: ({ children, ...props }: any) => (
        <h2
          className="text-lg sm:text-xl font-bold font-serif text-amber-200 bg-gradient-to-r from-gold-500/20 via-gold-500/5 to-transparent border-l-4 border-gold-400 pl-4 pr-3 py-3 rounded-r-2xl mt-8 mb-5 tracking-wide shadow-sm flex items-center gap-2"
          {...props}
        >
          <span>👑</span>
          <span>{children}</span>
        </h2>
      ),
    },
    h3: {
      component: ({ children, ...props }: any) => (
        <h3
          className="text-base sm:text-lg font-bold font-serif text-gold-300 mt-6 mb-3 flex items-center gap-2 border-b border-white/5 pb-2"
          {...props}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-gold-400 shrink-0"></span>
          <span>{children}</span>
        </h3>
      ),
    },
    p: {
      component: ({ children, ...props }: any) => (
        <p
          className="text-slate-200 text-sm sm:text-base leading-relaxed sm:leading-loose mb-5 font-normal tracking-wide"
          {...props}
        >
          {children}
        </p>
      ),
    },
    strong: {
      component: ({ children, ...props }: any) => (
        <strong
          className="font-extrabold text-amber-300 bg-amber-400/10 px-1.5 py-0.5 rounded-md border border-amber-400/30 tracking-wide inline-block my-0.5"
          {...props}
        >
          {children}
        </strong>
      ),
    },
    ul: {
      component: ({ children, ...props }: any) => (
        <ul className="space-y-3.5 my-5 pl-1 list-none" {...props}>
          {children}
        </ul>
      ),
    },
    li: {
      component: ({ children, ...props }: any) => (
        <li
          className="text-slate-200 text-sm sm:text-base leading-relaxed flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-gold-500/25 transition-all"
          {...props}
        >
          <span className="text-gold-400 text-base mt-0.5 shrink-0">✦</span>
          <div className="flex-1">{children}</div>
        </li>
      ),
    },
    ol: {
      component: ({ children, ...props }: any) => (
        <ol className="space-y-4 my-6 pl-2" {...props}>
          {children}
        </ol>
      ),
    },
    hr: {
      component: (props: any) => (
        <hr className="my-8 border-gold-500/20 border-t-2" {...props} />
      ),
    },
  },
};

interface ReadingDisplayProps {
  reading: string;
  insights: {
    palmType: string;
    dominantMount: string;
    specialSignsDetected: string[];
    auspiciousScore: number;
    careerTrajectory: string;
    relationshipHarmony: string;
  };
  freeTeaser?: FreeTeaserData;
  userQuestion?: string;
  userName?: string;
  userDob?: string;
  userTob?: string;
  userPob?: string;
  vedicChart: {
    sunSign: string;
    moonSign: string;
    ascendant: string;
    nakshatra: string;
    nakshatraLord: string;
    pada: number;
    currentMahadasha: string;
    currentAntardasha: string;
    dashaEndYear: number;
    favorableGemstone: string;
    favorableMantra: string;
    favorableColor: string;
    rashiSummary: string;
  };
  consensus: {
    sourcesCount: number;
    classicalTexts: string[];
    consensusSummary: string;
  };
  pujaVidhi?: PujaVidhiData;
  synastry?: any;
  palmFeatures?: any;
  secondaryPerson?: { name: string; relation: string };
  readingId?: string;
  isUnlocked?: boolean;
  onReset: () => void;
}

export default function ReadingDisplay({
  reading,
  insights,
  freeTeaser,
  palmFeatures,
  userQuestion,
  userName,
  userDob,
  userTob,
  userPob,
  vedicChart,
  consensus,
  pujaVidhi,
  synastry,
  secondaryPerson,
  readingId,
  isUnlocked: isUnlockedProp,
  onReset,
}: ReadingDisplayProps) {
  const { user } = useAuth();
  const { language, setLanguage, t, hasChosenLanguage } = useLanguage();
  const [currentReading, setCurrentReading] = useState(reading);
  const [currentPujaVidhi, setCurrentPujaVidhi] = useState<PujaVidhiData | undefined>(pujaVidhi);
  const [currentTeaser, setCurrentTeaser] = useState(freeTeaser);
  const [activeLang, setActiveLang] = useState<LanguageType>(language);
  const [isTranslating, setIsTranslating] = useState(false);
  const [targetTranslatingLang, setTargetTranslatingLang] = useState<LanguageType | null>(null);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  // Translation cache to ensure instant zero-latency toggling once loaded
  const [langCache, setLangCache] = useState<Record<string, { teaser: any; markdown: string }>>(() => ({
    [language]: { teaser: freeTeaser, markdown: reading },
  }));

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [paywallPlan, setPaywallPlan] = useState<SubscriptionTierType>("trial_99");
  const [unlockedLocally, setUnlockedLocally] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [unlockError, setUnlockError] = useState<string | null>(null);

  const isUnlocked = Boolean(isUnlockedProp || user?.isSubscribed || unlockedLocally);

  const openPaywall = (plan?: SubscriptionTierType) => {
    let target = plan || "trial_99";
    const qLower = (userQuestion || "").toLowerCase();
    if (qLower.includes("khoya pyar") || qLower.includes("ex") || qLower.includes("prem")) {
      target = "love_ex_249";
    } else if (qLower.includes("kalesh") || qLower.includes("saas")) {
      target = "kalesh_saas_299";
    } else if (qLower.includes("intercaste") || qLower.includes("manane")) {
      target = "intercaste_349";
    }
    setPaywallPlan(target);
    setShowPaywall(true);
  };

  const handleUnlockFullReport = async () => {
    if (!readingId) return;
    setIsUnlocking(true);
    setUnlockError(null);
    try {
      const res = await fetch("/api/analyze/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          readingId,
          userPhone: user?.phone || undefined,
        }),
      });
      const data = await res.json();
      if (data.success && data.reading) {
        setCurrentReading(data.reading);
        if (data.pujaVidhi) {
          setCurrentPujaVidhi(data.pujaVidhi);
        }
        setUnlockedLocally(true);
      } else {
        setUnlockError(data.error || "Could not unlock report. Please verify subscription.");
      }
    } catch (err: any) {
      console.error("Unlock error:", err);
      setUnlockError(err.message || "Failed to contact unlock server");
    } finally {
      setIsUnlocking(false);
    }
  };

  // If user has subscription/admin authority but reading was deferred, fetch full reading
  React.useEffect(() => {
    if (isUnlocked && !currentReading && readingId && !isUnlocking) {
      handleUnlockFullReport();
    }
  }, [isUnlocked, currentReading, readingId]);


  // Synchronize on language change
  const handleLanguageSwitch = async (newLang: LanguageType) => {
    setLanguage(newLang);
    if (newLang === activeLang) return;

    // Instant switch if already cached
    if (langCache[newLang]) {
      setCurrentTeaser(langCache[newLang].teaser);
      setCurrentReading(langCache[newLang].markdown);
      setActiveLang(newLang);
      return;
    }

    setIsTranslating(true);
    setTargetTranslatingLang(newLang);
    try {
      const res = await fetch("/api/translate-reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          freeTeaser: currentTeaser,
          rawMarkdown: currentReading,
          targetLanguage: newLang,
        }),
      });
      const data = await res.json();
      if (data.success) {
        const nextTeaser = data.freeTeaser || currentTeaser;
        const nextMarkdown = data.rawMarkdown || currentReading;
        setCurrentTeaser(nextTeaser);
        setCurrentReading(nextMarkdown);
        setLangCache((prev) => ({
          ...prev,
          [newLang]: { teaser: nextTeaser, markdown: nextMarkdown },
        }));
        setActiveLang(newLang);
      }
    } catch (err) {
      console.error("Language translation failed:", err);
    } finally {
      setIsTranslating(false);
      setTargetTranslatingLang(null);
    }
  };

  React.useEffect(() => {
    if (language !== activeLang && !isTranslating) {
      handleLanguageSwitch(language);
    }
  }, [language]);

  // Trigger celebratory confetti once mounted
  React.useEffect(() => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#d4af37", "#f59e0b", "#c084fc"],
      });
    } catch {
      // ignore
    }
  }, []);

  const toggleSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Speech synthesis is not supported on this device/browser.");
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const cleanText = currentReading
      .replace(/[#*`_~[\]()]/g, "")
      .replace(/\n+/g, ". ")
      .slice(0, 3000);

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) => v.lang.includes("hi-IN") || v.lang.includes("en-IN") || v.lang.includes("en-GB")
    );
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  const handleShare = async () => {
    const shareData = {
      title: "My Vedic Reading from REKHA",
      text: `Just received my authentic AI Palmistry & Vedic consultation from REKHA (50+ Classical Texts). Lagna: ${vedicChart.ascendant}, Mahadasha: ${vedicChart.currentMahadasha}. Check yours at https://ai.rekhagyan.online`,
      url: "https://ai.rekhagyan.online",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(shareData.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };


  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn px-1 sm:px-0">
      {/* Top Banner */}
      <div className="cosmic-card rounded-3xl p-4 sm:p-8 border border-gold-500/30 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 sm:pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              Verified Multimodal Revelation
            </div>
            <h2 className="text-xl sm:text-3xl font-bold font-serif text-white">
              Your Destiny Synthesis by REKHA
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Synthesizing 50+ classical treatises • Cross-validated via Brihat Samhita &amp; Hastasanjivani
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0">
            <button
              onClick={toggleSpeech}
              title={isPlayingAudio ? "Stop Voice" : "Listen to Reading"}
              className={`p-2.5 sm:p-3 rounded-2xl border transition-all ${
                isPlayingAudio
                  ? "bg-gold-500 text-cosmic-950 border-gold-400 animate-pulse"
                  : "bg-white/5 border-white/10 text-slate-300 hover:text-white hover:border-gold-500/30"
              }`}
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => window.print()}
              title="Print / Save as PDF"
              className="p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-gold-500/30 transition-all"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              title="Share Reading"
              className="p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-gold-500/30 transition-all relative"
            >
              <Share2 className="w-4 h-4" />
              {copied && (
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] bg-gold-400 text-cosmic-950 font-bold px-2 py-0.5 rounded shadow whitespace-nowrap">
                  Copied!
                </span>
              )}
            </button>
            <button
              onClick={onReset}
              title="Ask Another Question"
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-bold uppercase tracking-wider hover:bg-gold-500/20 transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 shrink-0" />
              <span>Consult Again</span>
            </button>
          </div>
        </div>

        {/* Astronomical & Palm Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-5 sm:pt-6">
          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
              <Compass className="w-3 h-3 text-gold-400 shrink-0" /> Vedic Lagna
            </div>
            <div className="text-sm sm:text-base font-bold text-white mt-1 truncate">{vedicChart.ascendant}</div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 truncate">{vedicChart.moonSign} Rashi</div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
              <Star className="w-3 h-3 text-gold-400 shrink-0" /> Nakshatra
            </div>
            <div className="text-sm sm:text-base font-bold text-white mt-1 truncate">{vedicChart.nakshatra}</div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 truncate">Pada {vedicChart.pada} • {vedicChart.nakshatraLord}</div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
              <Calendar className="w-3 h-3 text-gold-400 shrink-0" /> Active Dasha
            </div>
            <div className="text-sm sm:text-base font-bold text-amber-300 mt-1 truncate">
              {vedicChart.currentMahadasha}-{vedicChart.currentAntardasha}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 truncate">Ends {vedicChart.dashaEndYear}</div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-gold-400 shrink-0" /> Mount
            </div>
            <div className="text-sm sm:text-base font-bold text-emerald-300 mt-1 truncate">{insights.dominantMount}</div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 truncate">{insights.palmType}</div>
          </div>
        </div>
      </div>

      {/* FREE MIND-BLOWING TEASER SECTION (Trust Builder & Psychological Mirror) */}
      <div className="cosmic-card rounded-3xl p-4 sm:p-8 border border-gold-500/30 bg-cosmic-950/85 backdrop-blur-xl relative space-y-5 sm:space-y-6 shadow-2xl">
        {/* Translation Loading Overlay */}
        {isTranslating && (
          <div className="absolute inset-0 z-30 rounded-3xl bg-cosmic-950/85 backdrop-blur-md flex flex-col items-center justify-center gap-3 p-6 text-center animate-fadeIn">
            <Loader2 className="w-9 h-9 text-gold-400 animate-spin" />
            <div className="text-base font-bold text-white font-serif">
              REKHA is adapting your reading into{" "}
              {(targetTranslatingLang || activeLang) === "hindi"
                ? "हिन्दी (Hindi)"
                : (targetTranslatingLang || activeLang) === "hinglish"
                ? "Hinglish"
                : "English"}
              ...
            </div>
            <div className="text-xs text-slate-300 max-w-sm">
              Translating your unique palm lines and planetary alignments in real-time.
            </div>
          </div>
        )}

        {/* Section B: Part 1 Main Title & Summary Quote */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{t.part1Header}</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-serif font-bold text-white mt-1 leading-snug">
              {currentTeaser?.swabhavHeadline || t.swabhavFallbackHeadline}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            {/* Quick In-card Language Switcher */}
            <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/5 border border-gold-500/20 text-xs">
              <button
                type="button"
                onClick={() => setShowLanguageModal(true)}
                className="px-2 py-0.5 rounded-full text-slate-400 hover:text-gold-300 transition-colors flex items-center gap-1 text-[11px]"
                title="Open detailed language selector"
              >
                <Globe className="w-3 h-3 text-gold-400" />
                <span className="hidden xs:inline">Lang:</span>
              </button>
              <button
                type="button"
                onClick={() => handleLanguageSwitch("hinglish")}
                className={`px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold transition-all ${
                  activeLang === "hinglish"
                    ? "bg-gold-500/25 text-gold-300 border border-gold-400/40 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                💬 Hinglish
              </button>
              <button
                type="button"
                onClick={() => handleLanguageSwitch("hindi")}
                className={`px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold transition-all ${
                  activeLang === "hindi"
                    ? "bg-gold-500/25 text-gold-300 border border-gold-400/40 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                🇮🇳 हिन्दी
              </button>
              <button
                type="button"
                onClick={() => handleLanguageSwitch("english")}
                className={`px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold transition-all ${
                  activeLang === "english"
                    ? "bg-gold-500/25 text-gold-300 border border-gold-400/40 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                🇬🇧 English
              </button>
            </div>

            <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wide uppercase bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5 shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> {t.freeAnalysisBadge}
            </span>
          </div>
        </div>

        {/* Personalized Emotional Summary Quote */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-cosmic-900/90 border border-gold-500/25 text-xs sm:text-sm text-amber-100/90 leading-relaxed italic shadow-inner">
          &ldquo;{currentTeaser?.summaryNarrative || (userName ? `${userName}, ${t.swabhavFallbackQuote}` : t.swabhavFallbackQuote)}&rdquo;
        </div>

        {/* Section C: 4 Core Character Cards */}
        {(() => {
          const isHindi = activeLang === "hindi";
          const isEng = activeLang === "english";
          const lord = vedicChart?.nakshatraLord;
          const dasha = vedicChart?.currentMahadasha;
          const dominant = insights?.dominantMount;

          let b1 = t.card1Badge;
          if (lord === "Sun" || lord === "Mars") {
            b1 = isHindi ? "तेजस्वी नेतृत्व" : isEng ? "Dynamic Leader" : "Tejasvi Leader";
          } else if (lord === "Saturn" || lord === "Ketu") {
            b1 = isHindi ? "शांत विश्लेषक" : isEng ? "Deep Observer" : "Grave Observer";
          } else if (lord === "Mercury" || lord === "Venus") {
            b1 = isHindi ? "चयनात्मक स्पष्टवादी" : isEng ? "Selective Expressive" : "Selective Expressive";
          } else if (lord === "Moon" || lord === "Jupiter") {
            b1 = isHindi ? "सहज अंतर्ज्ञानी" : isEng ? "Intuitive Empath" : "Intuitive Empath";
          }

          let b2 = t.card2Badge;
          if (dasha === "Rahu") {
            b2 = isHindi ? "अकस्मात कर्म संधि" : isEng ? "Karmic Pivot Scar" : "Past Karmic Crucible";
          } else if (dasha === "Budha" || dasha === "Mercury") {
            b2 = isHindi ? "कैरियर एवं विद्या संधि" : isEng ? "Career & Mind Crucible" : "Intellectual Crossroads";
          } else if (dasha === "Shani" || dasha === "Saturn") {
            b2 = isHindi ? "तपस्या एवं धैर्य काल" : isEng ? "Trial of Endurance" : "Saturnian Trial";
          } else if (dasha === "Guru" || dasha === "Jupiter") {
            b2 = isHindi ? "नैतिक चेतना संधि" : isEng ? "Values & Dharma Pivot" : "Ideals & Awakening";
          } else if (dasha === "Shukra" || dasha === "Venus") {
            b2 = isHindi ? "भावनात्मक परीक्षा" : isEng ? "Emotional Fidelity Test" : "Emotional Crucible";
          } else if (dasha === "Mangal" || dasha === "Mars") {
            b2 = isHindi ? "साहस एवं संघर्ष" : isEng ? "Courage in Conflict" : "Fiery Crucible";
          } else if (dasha === "Surya" || dasha === "Sun") {
            b2 = isHindi ? "स्वाभिमान का संघर्ष" : isEng ? "Sovereignty Trial" : "Ego & Self-Worth Trial";
          } else if (dasha === "Chandra" || dasha === "Moon") {
            b2 = isHindi ? "मानसिक संवेदनशीलता" : isEng ? "Psychic Awakening" : "Inner Vulnerability Scar";
          } else if (dasha === "Ketu") {
            b2 = isHindi ? "वैराग्य एवं चेतना" : isEng ? "Spiritual Detachment" : "Spiritual Awakening";
          }

          let b4 = t.card4Badge;
          if (dominant?.includes("Jupiter")) {
            b4 = isHindi ? "दैवीय विवेक" : isEng ? "Guru Wisdom Seal" : "Divine Discernment";
          } else if (dominant?.includes("Sun")) {
            b4 = isHindi ? "शाही सूर्य तेज" : isEng ? "Royal Solar Mark" : "Solar Radiance";
          } else if (dominant?.includes("Mercury")) {
            b4 = isHindi ? "कुशाग्र बुद्धि" : isEng ? "Commercial Acumen" : "Mercury Acumen";
          } else if (dominant?.includes("Venus")) {
            b4 = isHindi ? "आकर्षक आभा" : isEng ? "Magnetic Aura" : "Magnetic Charm";
          } else if (dominant?.includes("Saturn")) {
            b4 = isHindi ? "गहन कर्म दृष्टि" : isEng ? "Karmic Vision" : "Deep Perception";
          } else {
            b4 = isHindi ? "प्रचंड अंतर्ज्ञान" : isEng ? "High Intuition" : "High Intuition";
          }

          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              {/* Card 1: Social Paradox - Baatuni vs Introvert */}
              <div className="p-3.5 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 space-y-2">
                <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{t.card1Title}</span>
                  </span>
                  <span className="self-start xs:self-auto text-[9px] sm:text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    {b1}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {currentTeaser?.introvertExtrovertTrait || t.card1Fallback}
                </p>
              </div>

              {/* Card 2: Past Scars & Transition */}
              <div className="p-3.5 sm:p-5 rounded-2xl bg-gradient-to-br from-rose-500/10 to-transparent border border-rose-500/20 space-y-2">
                <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{t.card2Title}</span>
                  </span>
                  <span className="self-start xs:self-auto text-[9px] sm:text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-300 border border-rose-500/30">
                    {b2}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {currentTeaser?.pastGhatnaAndDhokha || t.card2Fallback}
                </p>
              </div>

              {/* Card 3: Heart vs Mind & Night Overthinking */}
              <div className="p-3.5 sm:p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 space-y-2">
                <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>{t.card3Title}</span>
                  </span>
                  <span className="self-start xs:self-auto text-[9px] sm:text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-300 border border-purple-500/30">
                    {t.card3Badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {currentTeaser?.heartMindConflict || t.card3Fallback}{" "}
                  {currentTeaser?.nightOverthinkingTrait || ""}
                </p>
              </div>

              {/* Card 4: Palmistry Marks & 6th Sense */}
              <div className="p-3.5 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 space-y-2 relative overflow-hidden">
                <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.card4Title}</span>
                  </span>
                  <span className="self-start xs:self-auto text-[9px] sm:text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    {b4}
                  </span>
                </div>

                {isUnlocked ? (
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed animate-fadeIn">
                    {currentTeaser?.palmSignsWitness || t.card4Fallback}{" "}
                    {currentTeaser?.secretIntuition || ""}
                  </p>
                ) : (
                  <div className="relative rounded-xl overflow-hidden p-3 bg-black/40 border border-emerald-500/20 select-none min-h-[110px] flex items-center justify-center">
                    {/* Scrambled redacted DOM filler - inspection reveals ZERO confidential reading data */}
                    <p className="filter blur-[6px] select-none text-slate-400 text-xs sm:text-sm leading-relaxed pointer-events-none opacity-40">
                      Aapke haath mein maujood vishesh Guru Parvat Trishul aur Hastasanjivani ke niyam anusar karmic sandhi ka gopan rahasya... Dhana Yava evam Ring of Solomon ke prabhav se aapki chhatthi indri...
                    </p>
                    <div className="absolute inset-0 bg-cosmic-950/85 backdrop-blur-[3px] flex flex-col items-center justify-center p-2 text-center space-y-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-400/40 text-gold-300 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        <Lock className="w-3 h-3 text-gold-400" />
                        <span>Palm Signs &amp; 6th Sense Locked</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => openPaywall("trial_99")}
                        className="text-[11px] font-extrabold text-cosmic-950 bg-gradient-to-r from-gold-300 via-gold-400 to-amber-300 px-4 py-1.5 rounded-full shadow-lg shadow-gold-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                      >
                        <span>Unlock Revelation</span>
                        <Sparkles className="w-3 h-3 text-cosmic-950" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* Section D: Important Note Banner */}
        <div className="p-3.5 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-gold-500/10 to-amber-500/15 border border-amber-500/35 text-xs sm:text-sm text-amber-200 leading-relaxed space-y-2.5">
          <div className="flex items-center gap-2 font-bold text-amber-300 text-xs sm:text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{t.importantNoteTitle}</span>
          </div>
          <p>
            {t.importantNotePrefix}{" "}
            <strong className="text-white underline font-serif text-xs sm:text-sm">&ldquo;{userQuestion || "Aapka Mukhya Sawaal"}&rdquo;</strong>{" "}
            {t.importantNoteSuffix}
          </p>
        </div>

        {/* Section E: Secondary Person / Synastry Teaser Preview Banner */}
        {secondaryPerson && (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-950/40 via-purple-950/30 to-cosmic-950 border border-rose-500/35 space-y-2.5 shadow-lg">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-rose-400 shrink-0" />
                <h4 className="text-sm sm:text-base font-bold text-white font-serif">
                  Kundli Milan &amp; Synastry: {userName} &amp; {secondaryPerson.name} ({secondaryPerson.relation})
                </h4>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-wider shrink-0">
                Calculated
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Dono kundaliyon ka 36 Guna Ashta Kuta milan, Manglik dosha saamyata aur sambandh bhavishya calculate ho chuka hai. Poori synastry report aur samadhan niche full reading me uplabdh hai.
            </p>
          </div>
        )}
      </div>

      {/* LOCKED DEEP IN-DEPTH SECTION (Behind Paywall) */}
      {!isUnlocked ? (
        <div className="relative rounded-3xl overflow-hidden border border-gold-500/30 bg-cosmic-950/90 shadow-2xl p-4 sm:p-10 text-center min-h-[460px] flex items-center justify-center">
          {/* Frosted / Blurred preview content in background */}
          <div className="filter blur-md opacity-20 select-none pointer-events-none space-y-4 max-h-72 overflow-hidden text-left w-full">
            <h3 className="text-lg sm:text-xl font-bold font-serif text-white">5. 🎯 Direct Resolution to Your Dilemma: &ldquo;{userQuestion || "Your Dilemma"}&rdquo;</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Regarding your query, {userName || "Native"}: The celestial indicators point towards a breakthrough resolution within the upcoming planetary transit window. The hesitation or blockade you have felt is not a dead end — it is a structural redirection. The alignment of your active fate line shows...
            </p>
            <h3 className="text-lg sm:text-xl font-bold font-serif text-white">6. ⏳ Timeline &amp; Predictive Milestones (Next 3 to 6 Months, Next 12 to 18 Months, 2 to 5 Years)</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Between the upcoming 3 to 6 months, an unexpected transit over your key governing house will unlock a dormant contract or relocation opportunity. The critical shift arrives during the Antardasha crossover where an older associate...
            </p>
            <h3 className="text-lg sm:text-xl font-bold font-serif text-white">7. 🪬 Sacred Vedic Remedies &amp; Gemstone</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Your Life Line indicates a split energy vortex requiring specific consecration. Favorable gemstone: {vedicChart.favorableGemstone}, along with sacred Beej Mantra japa: {vedicChart.favorableMantra}...
            </p>
            <h3 className="text-lg sm:text-xl font-bold font-serif text-white">8. 🪔 Sampoorna Sacred Pooja Vidhi</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Ritual sequence, Samagri list, and exact muhurat timings for complete dosha shanti and immediate obstacle removal...
            </p>
          </div>

          {/* Paywall Overlay Card */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-t from-cosmic-950 via-cosmic-950/95 to-cosmic-950/80">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-gold-400 to-amber-500 text-cosmic-950 flex items-center justify-center shadow-lg shadow-gold-500/30 mb-2.5 sm:mb-3">
              <Lock className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold font-serif text-white max-w-lg leading-snug px-2">
              {secondaryPerson ? (
                <>
                  Unlock Resolution &amp; Synastry with <span className="text-gold-300">{secondaryPerson.name}</span>
                </>
              ) : (
                <>
                  Unlock Exact Resolution to Your Dilemma: <span className="block mt-0.5 text-gold-300">&ldquo;{userQuestion || "Your Sacred Question"}&rdquo;</span>
                </>
              )}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md px-2">
              {secondaryPerson
                ? `REKHA has computed your 36 Guna Shastriya Milan, Manglik Dosha parity, 3-year timeline, and sacred remedies for you and ${secondaryPerson.name}.`
                : "REKHA has computed your complete personalized 3-year timeline, exact month-by-month breakthroughs, karmic warning signs, and sacred Pooja Vidhi."}
            </p>

            {/* Price Cards Banner */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-5 w-full max-w-md">
              <button
                onClick={() => openPaywall("trial_99")}
                className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-gold-300 via-gold-400 to-amber-300 text-cosmic-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-gold-500/25 hover:shadow-gold-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
              >
                <span>UNLOCK FOR ₹99</span>
                <Sparkles className="w-4 h-4 shrink-0" />
              </button>

              <button
                onClick={() => openPaywall(secondaryPerson ? "duo_599" : "unlimited_1009")}
                className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-gold-500/30 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
              >
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                <span>{secondaryPerson ? "DUO + SYNASTRY" : "PASS + POOJA VIDHI"}</span>
              </button>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] text-slate-400 mt-3.5">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3 h-3 shrink-0" /> One-time payment
              </span>
              <span>•</span>
              <span>100% Satisfaction Guarantee</span>
            </div>
          </div>
        </div>
      ) : (
        /* FULL UNLOCKED READING */
        <div className="space-y-8 animate-fadeIn">
          {/* RELATIONSHIP SYNASTRY CARD IF PRESENT */}
          {(synastry || secondaryPerson) && (() => {
            const hasMatchmakingAccess =
              Boolean(user?.isAdmin) ||
              user?.subscriptionPlan === "duo_599" ||
              user?.subscriptionPlan === "unlimited_1009" ||
              user?.subscriptionPlan === "love_ex_249" ||
              user?.subscriptionPlan === "intercaste_349" ||
              (user?.matchmakingRemaining ?? 0) > 0;

            if (synastry && hasMatchmakingAccess) {
              return (
                <div className="cosmic-card rounded-3xl p-5 sm:p-8 border border-rose-500/40 bg-gradient-to-b from-cosmic-900/90 to-rose-950/30 backdrop-blur-2xl shadow-2xl space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500/20 to-gold-500/20 border border-rose-500/30 flex items-center justify-center text-rose-300">
                        <HeartHandshake className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                          Dual Synastry &amp; Ashta Kuta Compatibility
                        </h3>
                        <p className="text-xs text-slate-300">
                          {userName} &amp; {secondaryPerson?.name || synastry.person2Name} ({secondaryPerson?.relation || synastry.relation})
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl sm:text-2xl font-black text-rose-300 font-serif">
                        {synastry.gunaScore}/36
                      </span>
                      <span className="text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-200 border border-rose-500/30">
                        {synastry.compatibilityTier}
                      </span>
                    </div>
                  </div>

                  {/* Manglik & Outlook */}
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5 text-xs">
                    <div className="text-amber-300 font-bold">Manglik Analysis &amp; Karmic Dynamic:</div>
                    <p className="text-slate-300 leading-relaxed">{synastry.manglikStatus?.verdict}</p>
                    <div className="text-slate-400 italic pt-1">{synastry.relationshipOutlook}</div>
                  </div>

                  {/* 8 Kutas Grid */}
                  {synastry.kutas && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      {Object.entries(synastry.kutas).map(([key, kuta]: any) => (
                        <div key={key} className="p-2.5 rounded-xl bg-cosmic-950/60 border border-white/5 space-y-0.5">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 capitalize">{key}</div>
                          <div className="font-bold text-rose-300">{kuta.points}/{kuta.max} pts</div>
                          <div className="text-[10px] text-slate-500 truncate">{kuta.desc}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            // Gated/Blurred Synastry for users on single-user plan (e.g. trial_99) without matchmaking quota
            return (
              <div className="cosmic-card rounded-3xl p-5 sm:p-8 border border-rose-500/40 bg-gradient-to-b from-cosmic-900/90 to-rose-950/30 backdrop-blur-2xl shadow-2xl space-y-5 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500/20 to-gold-500/20 border border-rose-500/30 flex items-center justify-center text-rose-300">
                      <HeartHandshake className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                        Dual Synastry &amp; Ashta Kuta Compatibility
                      </h3>
                      <p className="text-xs text-slate-300">
                        {userName} &amp; {secondaryPerson?.name || synastry?.person2Name || "Partner"} ({secondaryPerson?.relation || synastry?.relation || "Partner"})
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Matchmaking Upgrade Required</span>
                    </span>
                  </div>
                </div>

                {/* Blurred preview of Kutas */}
                <div className="filter blur-[5px] select-none pointer-events-none opacity-40 space-y-3">
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5 text-xs">
                    <div className="text-amber-300 font-bold">Manglik Analysis &amp; Karmic Dynamic:</div>
                    <p className="text-slate-300">Manglik dosha parity and graha maitri indicate critical karmic alignment...</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {["Varna", "Vashya", "Tara", "Yoni", "Maitri", "Gana", "Bhakoot", "Nadi"].map((k) => (
                      <div key={k} className="p-2.5 rounded-xl bg-cosmic-950/60 border border-white/5 space-y-0.5">
                        <div className="text-[10px] font-bold text-slate-400">{k}</div>
                        <div className="font-bold text-rose-300">-- / -- pts</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Overlay Action Prompt */}
                <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-center space-y-3">
                  <p className="text-xs sm:text-sm text-rose-200 leading-relaxed max-w-lg mx-auto">
                    ✨ Aapka aur <strong>{secondaryPerson?.name || "Partner"}</strong> ka <strong>36 Guna Shastriya Milan &amp; Synastry</strong> calculate ho chuka hai! Poora 36 gun score, Manglik dosha nivaran aur ex/sambandh samadhan dekhne ke liye <strong>Duo Plan (₹499)</strong> ya <strong>Matchmaking Pass</strong> unlock karein.
                  </p>
                  <button
                    type="button"
                    onClick={() => openPaywall("duo_599")}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider text-cosmic-950 bg-gradient-to-r from-rose-300 via-amber-300 to-gold-400 hover:shadow-lg hover:shadow-rose-500/30 transition-all active:scale-95"
                  >
                    <HeartHandshake className="w-4 h-4 shrink-0" />
                    <span>Unlock 36 Guna Milan &amp; Synastry Report</span>
                  </button>
                </div>
              </div>
            );
          })()}

          {/* HIGH-PRIORITY DIRECT QUESTION HIGHLIGHT BANNER */}
          {userQuestion && (
            <div className="cosmic-card rounded-3xl p-5 sm:p-7 border-2 border-gold-400/90 bg-gradient-to-r from-amber-500/20 via-gold-500/15 to-purple-950/40 backdrop-blur-2xl shadow-2xl shadow-gold-500/20 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gold-500/30 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-gold-300 via-gold-400 to-amber-500 text-cosmic-950 flex items-center justify-center font-black text-2xl shadow-lg shadow-gold-500/30 shrink-0">
                    🎯
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gold-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                      Direct Sacred Resolution
                    </span>
                    <h3 className="text-base sm:text-xl font-extrabold font-serif text-white">
                      &ldquo;{userQuestion}&rdquo;
                    </h3>
                  </div>
                </div>
                <div className="self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Verdict &amp; Timing in Section 1</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Neeche diye gaye vishleshan mein aapke is mukhya sawaal ka satya samadhan, planetary breakthrough timeline, aur exact upaay sabse pehle <strong>Section 1</strong> mein vistaar se di gayi hai.
              </p>
            </div>
          )}

          {/* Main Markdown Content */}
          <div className="cosmic-card rounded-3xl p-6 sm:p-10 border border-gold-500/30 bg-cosmic-950/80 backdrop-blur-xl shadow-2xl">
            <div className="max-w-none text-slate-200">
              <Markdown options={markdownCustomOverrides}>
                {formatReadingMarkdown(currentReading)}
              </Markdown>
            </div>
          </div>

          {/* SAMPOORNA SACRED POOJA VIDHI SECTION */}
          {(currentPujaVidhi || pujaVidhi) && (() => {
            const activePuja = currentPujaVidhi || pujaVidhi!;
            return (
            <div className="cosmic-card rounded-3xl p-6 sm:p-8 border border-gold-500/40 bg-gradient-to-b from-cosmic-900/90 to-purple-950/30 backdrop-blur-2xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gold-400 to-amber-500 text-cosmic-950 flex items-center justify-center shadow-lg shadow-gold-500/25">
                    <Flame className="w-5 h-5 fill-cosmic-950" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                      Sampoorna Sacred Pooja Vidhi
                    </h3>
                    <p className="text-xs text-slate-400">
                      Tailored specifically for {vedicChart.currentMahadasha} Mahadasha Shanti &amp; Alignment
                    </p>
                  </div>
                </div>
                <div className="hidden sm:inline-flex px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-bold uppercase">
                  Vedic Anushthan
                </div>
              </div>

              {/* Deity & Muhurat Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Primary Presiding Deity</div>
                  <div className="text-base font-bold text-gold-300">{activePuja.primaryDeity}</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Auspicious Day &amp; Muhurat</div>
                  <div className="text-base font-bold text-amber-200">{activePuja.auspiciousDay}</div>
                </div>
              </div>

              {/* Samagri List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" /> Essential Pooja Samagri (सामग्री)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activePuja.samagri.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 p-2.5 rounded-xl bg-cosmic-950/60 border border-white/5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sacred Sankalp Mantra */}
              <div className="p-4 rounded-2xl bg-gold-500/10 border border-gold-500/30 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-gold-300">
                  Sacred Sankalp (संकल्प मंत्र)
                </div>
                <p className="text-sm font-serif italic text-amber-100 leading-relaxed">
                  &ldquo;{activePuja.sankalp}&rdquo;
                </p>
              </div>

              {/* Step-by-Step Procedure */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-gold-400" /> Step-by-Step Pooja Vidhi (पूजा विधि क्रम)
                </h4>
                <div className="space-y-2.5">
                  {activePuja.steps.map((step, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-200 leading-relaxed">
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              {/* Daana & Charity */}
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Recommended Karmic Daana (दान)
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activePuja.daana}
                </p>
              </div>
            </div>
            );
          })()}
        </div>
      )}

      {/* Authentic Full-Fledged Vedic Kundli & Navamsha (D1 & D9) Section */}
      <FullVedicKundliSection
        userName={userName || user?.name}
        userDob={userDob || user?.dob}
        userTob={userTob || user?.tob}
        userPob={userPob || user?.pob}
        onUnlockPlan={() => {
          setPaywallPlan("trial_99");
          setShowPaywall(true);
        }}
      />

      {/* Live Conversational Chat Sanctuary with REKHA */}
      <RekhaFollowupChat
        userName={userName}
        userDob={userDob}
        userQuestion={userQuestion}
        vedicChart={vedicChart}
        palmFeatures={palmFeatures}
        pujaVidhi={currentPujaVidhi}
        synastry={synastry}
        secondaryPerson={secondaryPerson}
        isUnlocked={isUnlocked}
        onUnlockRequest={() => {
          setPaywallPlan("trial_99");
          setShowPaywall(true);
        }}
      />

      {/* Paywall Modal Dialog */}
      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        defaultPlan={paywallPlan}
        userName={userName}
        userDob={userDob}
        onSuccess={() => {
          setUnlockedLocally(true);
        }}
      />

      {/* Language Selection Modal (Auto-triggers on Screen 1 or via Lang button) */}
      <LanguageSelectionModal
        isOpen={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        onLanguageSelected={handleLanguageSwitch}
      />
    </div>
  );
}
