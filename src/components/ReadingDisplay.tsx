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
} from "lucide-react";
import confetti from "canvas-confetti";
import { useAuth } from "@/lib/auth-context";
import PaywallModal, { SubscriptionTierType } from "./PaywallModal";

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
  secondaryPerson?: { name: string; relation: string };
  onReset: () => void;
}

export default function ReadingDisplay({
  reading,
  insights,
  freeTeaser,
  userQuestion,
  userName,
  userDob,
  vedicChart,
  consensus,
  pujaVidhi,
  synastry,
  secondaryPerson,
  onReset,
}: ReadingDisplayProps) {
  const { user } = useAuth();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [paywallPlan, setPaywallPlan] = useState<SubscriptionTierType>("trial_99");
  const [unlockedLocally, setUnlockedLocally] = useState(false);

  const isUnlocked = user?.isSubscribed || unlockedLocally;

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

    const cleanText = reading
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

  const openPaywall = (plan: SubscriptionTierType = "trial_99") => {
    setPaywallPlan(plan);
    setShowPaywall(true);
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
        {/* Section B: Part 1 Main Title & Summary Quote */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Part 1: Aapka Mukhya Swabhav, Bhootkaal Ki Ghatna &amp; Palm Kundali Rahasya</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-serif font-bold text-white mt-1 leading-snug">
              {freeTeaser?.swabhavHeadline || "Bahar Se Shaant, Andar Se Bhavuk Samundar (The Deep Empath & Intuitive Guardian)"}
            </h3>
          </div>
          <span className="self-start sm:self-auto px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wide uppercase bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5 shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> 100% Free Instant Analysis
          </span>
        </div>

        {/* Personalized Emotional Summary Quote */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-cosmic-900/90 border border-gold-500/25 text-xs sm:text-sm text-amber-100/90 leading-relaxed italic shadow-inner">
          &ldquo;{freeTeaser?.summaryNarrative || `${userName || "Aap"}, aap ek aisa vyaktitva hain jo doosron ke aansu pochne mein sabse aage rehta hai, lekin apne dard aur bhootkaal ke sangharsh ko duniya se chupane mein maahir hai. Aapka aatma-samman sabse upar hai.`}&rdquo;
        </div>

        {/* Section C: 4 Core Character Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          {/* Card 1: Social Paradox - Baatuni vs Introvert */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 space-y-2">
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Asli Swabhav: Baatuni Ya Introvert?</span>
              </span>
              <span className="self-start xs:self-auto text-[9px] sm:text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30">
                Selective Expressive
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {freeTeaser?.introvertExtrovertTrait ||
                "Log aapko dekhkar aksar galat andaza laga lete hain. Vastavikta yeh hai ki aap 'Selective Talkative' hain — har kisi ke aage aap bilkul chup ya introvert rehte hain, par jin 1-2 doston par aapko bharosa hai unke aage bina ruke dil ki har baat keh dete hain."}
            </p>
          </div>

          {/* Card 2: Past Scars & Betrayal */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-gradient-to-br from-rose-500/10 to-transparent border border-rose-500/20 space-y-2">
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Bhootkaal Ki Ghatna &amp; Vishwasghaat</span>
              </span>
              <span className="self-start xs:self-auto text-[9px] sm:text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-300 border border-rose-500/30">
                Past Betrayal Scar
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {freeTeaser?.pastGhatnaAndDhokha ||
                `Aapke haath ki Hriday Rekha aur ${vedicChart.currentMahadasha} dasha darshati hai ki pichle 2 se 4 saalon ke dauran aapne kisi bohot kareebi vyakti se bada vishwasghaat (emotional betrayal / dhokha) jhela hai, jinhone aapke bina shart samarpan ke baad bhi mushkil waqt par akele chhod diya.`}
            </p>
          </div>

          {/* Card 3: Heart vs Mind & Night Overthinking */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 space-y-2">
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Dil Vs Dimaag Ki Jung &amp; Raat Ka Chintan</span>
              </span>
              <span className="self-start xs:self-auto text-[9px] sm:text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-300 border border-purple-500/30">
                Emotional Loyalty
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {freeTeaser?.heartMindConflict ||
                "Aap hamesha dimaag ke bajaye dil se faisle lete hain aur doosron ko doosra mauka dekar khud chot khaate hain."}{" "}
              {freeTeaser?.nightOverthinkingTrait ||
                "Raat ko bistar par jaate hi dimaag mein baatein ghoomti hain aur purani baatein bhulana aapke liye mushkil hota hai."}
            </p>
          </div>

          {/* Card 4: Palmistry Marks & 6th Sense */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 space-y-2">
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Haath Ki Rekhaon Ka Sakshya &amp; 6th Sense</span>
              </span>
              <span className="self-start xs:self-auto text-[9px] sm:text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                High Intuition
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {freeTeaser?.palmSignsWitness ||
                `Aapke palm par ${insights.dominantMount} ka ubhaar aur Matri Rekha ka gumaav saaf batata hai ki aap aam bheed se alag hain.`}{" "}
              {freeTeaser?.secretIntuition ||
                "Aapka sixth sense bohot tez hai — kisi vyakti se milne ke 2 minute mein hi aapko uski sachai ka aabhaas ho jata hai."}
            </p>
          </div>
        </div>

        {/* Section D: Important Note Banner */}
        <div className="p-3.5 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-gold-500/10 to-amber-500/15 border border-amber-500/35 text-xs sm:text-sm text-amber-200 leading-relaxed space-y-2.5">
          <div className="flex items-center gap-2 font-bold text-amber-300 text-xs sm:text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Kripya Dhyan Dein / Important Note:</span>
          </div>
          <p>
            Upar diya gaya vishleshan sirf aapki aatma ke gupt swabhav aur haath ke mukhya parvat-rekhaon ka satya darpan tha. 
            Aapne jo mukhya sawaal pucha hai: <strong className="text-white underline font-serif text-xs sm:text-sm">&ldquo;{userQuestion || "Aapka Mukhya Sawaal"}&rdquo;</strong> — uska satya samadhan, 3-saal predictive timeline, aur Pooja Vidhi neeche locked hain.
          </p>
        </div>
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
              Unlock Exact Resolution to Your Dilemma: <span className="block mt-0.5 text-gold-300">&ldquo;{userQuestion || "Your Sacred Question"}&rdquo;</span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md px-2">
              REKHA has computed your complete personalized 3-year timeline, exact month-by-month breakthroughs, karmic warning signs, and sacred Pooja Vidhi.
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
                onClick={() => openPaywall("unlimited_1009")}
                className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-gold-500/30 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
              >
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                <span>PASS + POOJA VIDHI</span>
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
          {synastry && (
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
          )}

          {/* Main Markdown Content */}
          <div className="cosmic-card rounded-3xl p-6 sm:p-10 border border-gold-500/30 bg-cosmic-950/70 backdrop-blur-xl shadow-2xl">
            <div className="prose prose-invert max-w-none prose-headings:font-serif prose-headings:text-gold-300 prose-headings:border-b prose-headings:border-white/10 prose-headings:pb-2 prose-h2:text-2xl prose-h3:text-xl prose-p:text-slate-200 prose-p:leading-relaxed prose-strong:text-amber-200 prose-li:text-slate-200">
              <Markdown>
                {reading
                  .replace(/^```(?:json-teaser|json)?[\s\S]*?```/i, "")
                  .replace(/^\s*\{[\s\S]*?"swabhavHeadline"[\s\S]*?\}\s*/i, "")
                  .trim()}
              </Markdown>
            </div>
          </div>

          {/* SAMPOORNA SACRED POOJA VIDHI SECTION */}
          {pujaVidhi && (
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
                  <div className="text-base font-bold text-gold-300">{pujaVidhi.primaryDeity}</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Auspicious Day &amp; Muhurat</div>
                  <div className="text-base font-bold text-amber-200">{pujaVidhi.auspiciousDay}</div>
                </div>
              </div>

              {/* Samagri List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" /> Essential Pooja Samagri (सामग्री)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {pujaVidhi.samagri.map((item, idx) => (
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
                  &ldquo;{pujaVidhi.sankalp}&rdquo;
                </p>
              </div>

              {/* Step-by-Step Procedure */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-gold-400" /> Step-by-Step Pooja Vidhi (पूजा विधि क्रम)
                </h4>
                <div className="space-y-2.5">
                  {pujaVidhi.steps.map((step, idx) => (
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
                  {pujaVidhi.daana}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

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
    </div>
  );
}
