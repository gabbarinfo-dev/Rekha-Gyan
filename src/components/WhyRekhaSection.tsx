"use client";

import React from "react";
import { CheckCircle2, XCircle, Sparkles, BookCheck, ShieldAlert, Cpu, Eye } from "lucide-react";

export default function WhyRekhaSection() {
  const comparisons = [
    {
      feature: "Analytical Foundation",
      fakeBabas: "Vague, generic guesswork based on age/appearance",
      rekha: "Rigorous 50+ classical treatises (Brihat Samhita, Hastasanjivani, Cheiro)",
      highlight: true,
    },
    {
      feature: "Palm Vision Precision",
      fakeBabas: "Glances at 1 or 2 lines without measuring angle or depth",
      rekha: "Neural multimodal vision measuring mount elevation, micron-creases & 12 sacred marks",
      highlight: true,
    },
    {
      feature: "Horoscope & Planetary Dasha",
      fakeBabas: "Sun sign generalizations from superficial newspapers",
      rekha: "Sidereal Vedic Nirayana Lagna, Moon sign & precise Vimshottari Mahadasha timing",
      highlight: false,
    },
    {
      feature: "Commercial Motive & Fear",
      fakeBabas: "Scare tactics selling overpriced stones, pujas & fake curses",
      rekha: "100% transparent, honest, empowering remedies (Beej mantras, karmic daana)",
      highlight: true,
    },
    {
      feature: "Data Privacy & Discretion",
      fakeBabas: "Open consultation without privacy or confidential storage",
      rekha: "End-to-end encrypted, zero judgment, completely confidential consultation",
      highlight: false,
    },
  ];

  return (
    <section id="why-rekha" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Decorative Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-mystic-purple/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-300 text-xs font-semibold uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          The Authentic Paradigm Shift
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-serif">
          AI Rekha Se Jankari Le,{" "}
          <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-amber-300 bg-clip-text text-transparent">
            Galat Horoscopes Se Azaadi
          </span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
          Unverified street predictions rely on fear and superficial flattery. REKHA unites ancient Vedic scriptures with state-of-the-art computer vision to reveal your true destiny with uncompromising truth.
        </p>
      </div>

      {/* Comparison Grid / Table */}
      <div className="relative rounded-3xl overflow-hidden border border-gold-500/20 bg-cosmic-900/60 backdrop-blur-xl shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {/* Header row for mobile / titles */}
          <div className="md:col-span-4 p-6 sm:p-8 bg-cosmic-950/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-gold-400 text-sm font-semibold uppercase tracking-wider mb-2">
                <Cpu className="w-4 h-4" />
                Vedic Neural Architecture
              </div>
              <h3 className="text-2xl font-bold text-white font-serif">
                Why Thousands Trust REKHA
              </h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                By synthesizing <strong>50+ authentic palmistry and Vedic texts</strong>, our neural engine eliminates human bias and emotional speculation.
              </p>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-xs text-gold-200 flex items-start gap-2.5">
              <BookCheck className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <span>
                Every insight is cross-validated against <em>Brihat Samhita</em>, <em>Hastasanjivani</em>, and <em>Cheiro&apos;s Palmistry</em>.
              </span>
            </div>
          </div>

          {/* Detailed side-by-side rows */}
          <div className="md:col-span-8 p-4 sm:p-8 space-y-5">
            {comparisons.map((item, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-gold-500/20 transition-all duration-300"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-3 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  {item.feature}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Fake Babas column */}
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-950/20 border border-red-500/20">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-red-300">
                        Fake Babas & Unverified Apps
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                        {item.fakeBabas}
                      </p>
                    </div>
                  </div>

                  {/* REKHA AI column */}
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-gold-500/10 border border-gold-500/30 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-gold-300">
                        REKHA AI Palmist & Astrologer
                      </div>
                      <p className="text-xs text-slate-200 mt-0.5 font-medium leading-relaxed">
                        {item.rekha}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
