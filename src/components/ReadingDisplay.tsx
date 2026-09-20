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
} from "lucide-react";
import confetti from "canvas-confetti";

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
  onReset: () => void;
}

export default function ReadingDisplay({
  reading,
  insights,
  vedicChart,
  consensus,
  onReset,
}: ReadingDisplayProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);

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

    // Pick an expressive or hindi/english voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) => v.lang.includes("hi-IN") || v.lang.includes("en-IN") || v.lang.includes("en-GB")
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleShare = () => {
    const text = encodeURIComponent(
      `Check out my authentic AI Palmist & Astrologer reading with REKHA at rekhagyan.online!\nMy Auspicious Score is ${insights.auspiciousScore}%, governed by ${vedicChart.currentMahadasha} Mahadasha.`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Banner Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl bg-cosmic-900/90 border border-gold-500/30 backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-gold-400 to-amber-500 flex items-center justify-center text-cosmic-950 font-bold shadow-md">
            र
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-gold-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              REKHA Synthesized Revelation
            </div>
            <p className="text-[11px] text-slate-400">
              Corroborated by {consensus.sourcesCount}+ Classical Canons
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSpeech}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              isPlayingAudio
                ? "bg-amber-400 text-cosmic-950 border-amber-300 shadow-md shadow-gold-500/30 animate-pulse"
                : "bg-white/5 text-slate-200 border-white/10 hover:border-gold-500/40 hover:text-gold-300"
            }`}
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-4 h-4" /> Pause Recitation
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-gold-400" /> Listen to REKHA
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10"
            title="Print or Save PDF"
          >
            <Printer className="w-4 h-4" />
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30"
            title="Share via WhatsApp"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={onReset}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-gold-300 border border-white/10"
            title="New Reading"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Snapshot Cards Grid: Kundali + Palm metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Lagna & Rashi */}
        <div className="cosmic-card rounded-2xl p-4 border border-gold-500/20">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1 mb-1">
            <Compass className="w-3.5 h-3.5 text-gold-400" />
            Lagna &amp; Rashi
          </div>
          <div className="text-base font-bold text-white truncate">
            {vedicChart.ascendant}
          </div>
          <div className="text-xs text-gold-300/90 mt-0.5">
            Chandra: {vedicChart.moonSign}
          </div>
        </div>

        {/* Nakshatra & Pada */}
        <div className="cosmic-card rounded-2xl p-4 border border-gold-500/20">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1 mb-1">
            <Star className="w-3.5 h-3.5 text-amber-400" />
            Birth Nakshatra
          </div>
          <div className="text-base font-bold text-white">
            {vedicChart.nakshatra}
          </div>
          <div className="text-xs text-amber-300/90 mt-0.5">
            Pada {vedicChart.pada} &bull; Lord: {vedicChart.nakshatraLord}
          </div>
        </div>

        {/* Active Dasha */}
        <div className="cosmic-card rounded-2xl p-4 border border-gold-500/20">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1 mb-1">
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            Active Mahadasha
          </div>
          <div className="text-base font-bold text-white">
            {vedicChart.currentMahadasha} &bull; {vedicChart.currentAntardasha}
          </div>
          <div className="text-xs text-purple-300/90 mt-0.5">
            Cycle ends ~{vedicChart.dashaEndYear}
          </div>
        </div>

        {/* Auspicious Resonance */}
        <div className="cosmic-card rounded-2xl p-4 border border-gold-500/20 bg-gradient-to-br from-gold-500/10 to-cosmic-900">
          <div className="text-[11px] uppercase tracking-wider text-gold-300 font-semibold flex items-center gap-1 mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
            Auspicious Score
          </div>
          <div className="text-2xl font-black text-gold-300 font-serif">
            {insights.auspiciousScore}%
          </div>
          <div className="text-[11px] text-slate-300 truncate">
            {insights.dominantMount}
          </div>
        </div>
      </div>

      {/* Detected Sacred Markings Pills */}
      {insights.specialSignsDetected && insights.specialSignsDetected.length > 0 && (
        <div className="p-4 rounded-2xl bg-cosmic-900/60 border border-gold-500/20 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-gold-400 uppercase tracking-wider mr-2">
            ✋ Auspicious Signs Verified:
          </span>
          {insights.specialSignsDetected.map((sign, idx) => (
            <span
              key={idx}
              className="text-xs font-medium px-3 py-1 rounded-full bg-gold-500/15 text-gold-200 border border-gold-500/30 flex items-center gap-1"
            >
              ✨ {sign}
            </span>
          ))}
        </div>
      )}

      {/* Main REKHA First-Person Reading Document */}
      <div className="cosmic-card rounded-3xl p-6 sm:p-10 border border-gold-500/30 shadow-2xl relative overflow-hidden">
        {/* Subtle watermark in background */}
        <div className="absolute right-6 top-6 text-9xl font-serif text-white/[0.02] pointer-events-none select-none">
          र
        </div>

        <div className="prose prose-invert prose-gold max-w-none text-slate-200 prose-headings:font-serif prose-headings:text-gold-300 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h2:border-b prose-h2:border-gold-500/20 prose-h2:pb-2 prose-h2:mt-8 prose-p:leading-relaxed prose-li:my-1">
          <Markdown>{reading}</Markdown>
        </div>
      </div>

      {/* Bottom Prescribed Remedies Quick Summary */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cosmic-900 via-mystic-purple/20 to-cosmic-900 border border-gold-500/30 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-gold-400" />
          <h3 className="text-lg font-bold text-white font-serif">
            Your Instant Astrological Prescription (Upay)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
            <span className="text-slate-400 uppercase font-semibold">Recommended Gemstone:</span>
            <div className="text-sm font-bold text-gold-300 mt-1">
              {vedicChart.favorableGemstone}
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
            <span className="text-slate-400 uppercase font-semibold">Sacred Beej Mantra:</span>
            <div className="text-sm font-bold text-amber-200 mt-1">
              {vedicChart.favorableMantra}
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
            <span className="text-slate-400 uppercase font-semibold">Harmonious Color:</span>
            <div className="text-sm font-bold text-emerald-300 mt-1">
              {vedicChart.favorableColor}
            </div>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            For ongoing guidance or annual transitions, consult REKHA periodically.
          </p>
          <button
            onClick={onReset}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-cosmic-950 bg-gradient-to-r from-gold-300 to-amber-400 shadow-md hover:shadow-gold-500/30 hover:scale-[1.02] transition-all"
          >
            Ask Another Question
          </button>
        </div>
      </div>
    </div>
  );
}
