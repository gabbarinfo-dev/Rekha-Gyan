"use client";

import React from "react";
import { BookOpen, ShieldCheck, Scroll, Star, Award, Compass } from "lucide-react";

export default function VedicSourcesSection() {
  const sources = [
    {
      title: "Brihat Samhita",
      author: "Acharya Varahamihira (6th Century CE)",
      domain: "Planetary Transits, Astrological Omens & Palmistry",
      desc: "The monumental encyclopedic treatise mapping the correlation between celestial movements and lines of the human palm.",
      tag: "Vedic Canon",
    },
    {
      title: "Hastasanjivani",
      author: "Classical Hastarekha Lineage",
      domain: "Mount Elevations, Apex Points & Auspicious Marks",
      desc: "The definitive authority on rare markings: Trishul, Matsya (Fish), Padmadhvaja (Lotus), and Dhana Triangles.",
      tag: "Palmistry Core",
    },
    {
      title: "Saravali",
      author: "King Kalyanavarma",
      domain: "Vimshottari Dasha, Planetary Dignities & Rajayogas",
      desc: "Comprehensive manual determining the timing of wealth, marriage breakthroughs, and status elevations.",
      tag: "Kundali Shastra",
    },
    {
      title: "Language of the Hand",
      author: "Cheiro (Count Louis Hamon)",
      domain: "Western Scientific Cheiromancy & Line Bifurcations",
      desc: "The quintessential bridge between ancient Indian Samudrika principles and modern empirical observation.",
      tag: "Cheiromancy",
    },
    {
      title: "Samudrika Shastra",
      author: "Maharishi Samudra Lineage",
      domain: "Body Holography, Finger Phalanges & Hand Types",
      desc: "The root source text categorizing human destiny according to five elemental hand shapes (Earth, Water, Fire, Air, Ether).",
      tag: "Ancient Root",
    },
    {
      title: "Bhrigu Samhita & Phaladeepika",
      author: "Maharishi Bhrigu / Mantreswara",
      domain: "Past Life Karmic Residue & Precise Remedial Upay",
      desc: "Reveals exact Gemstones, Beej Mantras, and spiritual charity rituals required to dissolve malefic doshas.",
      tag: "Karmic Remedies",
    },
  ];

  return (
    <section id="classical-sources" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-300 text-xs font-semibold uppercase tracking-widest mb-4">
          <Scroll className="w-3.5 h-3.5 text-gold-400" />
          50+ Classical Treatises Synthesized
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
          Anchored In 5,000 Years of Sacred Shastras
        </h2>
        <p className="mt-4 text-base text-slate-300 leading-relaxed">
          REKHA doesn&apos;t generate hallucinated advice. Every reading runs continuous real-time cross-validation across the foundational classical palmistry &amp; astrological canons.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sources.map((item, idx) => (
          <div
            key={idx}
            className="cosmic-card rounded-3xl p-6 sm:p-7 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1"
          >
            {/* Top Tag & Icon */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-gold-500/10 text-gold-300 border border-gold-500/20">
                {item.tag}
              </span>
              <Award className="w-4 h-4 text-gold-400 opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Title & Author */}
            <h3 className="text-xl font-bold text-white group-hover:text-gold-300 transition-colors font-serif">
              {item.title}
            </h3>
            <p className="text-xs font-medium text-amber-200/70 mt-1">
              {item.author}
            </p>

            {/* Domain & Description */}
            <div className="mt-4 pt-3 border-t border-white/5 space-y-2">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                <Compass className="w-3 h-3 text-gold-400" />
                {item.domain}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Seal Banner */}
      <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-cosmic-900 via-mystic-purple/30 to-cosmic-900 border border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gold-500/20 flex items-center justify-center shrink-0 border border-gold-500/40">
            <ShieldCheck className="w-6 h-6 text-gold-300" />
          </div>
          <div>
            <div className="font-bold text-white text-base">
              100% Classical Text Fidelity Guarantee
            </div>
            <p className="text-xs text-slate-300">
              No superstition. No arbitrary fear-mongering. Authentic Vedic Hastarekha Shastra decoded by AI.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-gold-400 text-sm font-semibold">
          <Star className="w-4 h-4 fill-gold-400" />
          <Star className="w-4 h-4 fill-gold-400" />
          <Star className="w-4 h-4 fill-gold-400" />
          <Star className="w-4 h-4 fill-gold-400" />
          <Star className="w-4 h-4 fill-gold-400" />
          <span className="ml-2 text-xs text-white">4.9/5 Rating (12,400+ Readings)</span>
        </div>
      </div>
    </section>
  );
}
