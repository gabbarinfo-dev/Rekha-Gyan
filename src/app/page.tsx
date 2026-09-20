"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  BookOpen,
} from "lucide-react";
import PalmScannerInteractive from "@/components/PalmScannerInteractive";
import ReadingForm from "@/components/ReadingForm";
import WhyRekhaSection from "@/components/WhyRekhaSection";
import VedicSourcesSection from "@/components/VedicSourcesSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How can an AI accurately read hand lines from a photograph?",
      a: "REKHA utilizes advanced multimodal computer vision specifically trained on classical Samudrika Shastra morphology. It calculates the depth, continuity, curvature, and branching angles of the Life, Head, Heart, and Fate lines, cross-referencing mount elevations against your planetary Kundali degrees.",
    },
    {
      q: "Which hand should I upload — Left or Right?",
      a: "In authentic Vedic palmistry, both hands are vital. Your Left hand represents Prarabdha (inherited karmic blueprint and inborn potential), while your Right hand represents Kriyamana (manifested destiny carved through conscious actions). Uploading both provides the highest depth.",
    },
    {
      q: "Is my personal data and photo private?",
      a: "Absolutely. All palm images and birth coordinates are processed through private encrypted channels. Your readings are strictly confidential and will never be shared with third parties or used for external advertising.",
    },
    {
      q: "How does REKHA differ from local babas or horoscope apps?",
      a: "Generic apps rely on broad sun-sign clichés, while street babas often employ emotional manipulation to sell expensive pujas. REKHA synthesizes 50+ authentic classical texts (Brihat Samhita, Hastasanjivani, Cheiro) in real-time, providing pure, unbiased, empowering truth.",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hook Copy & Call-To-Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Persuasive Hook Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-300 text-xs sm:text-sm font-semibold shadow-inner">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>Duniya Ka Pehla 50+ Source AI Palmist &amp; Astrologer</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-serif leading-[1.15]">
              Jhoote Babao Aur Galat Horoscopes Se Pareshan Hain?{" "}
              <span className="block mt-2 bg-gradient-to-r from-gold-300 via-gold-400 to-amber-200 bg-clip-text text-transparent">
                Meet REKHA.
              </span>
            </h1>

            {/* Subtitle / Value Proposition */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Poore bramhand aur duniya ke <strong>50+ authentic classical Palmistry &amp; Vedic texts</strong> ko minute-by-minute analyze karke aapka accurate horoscope aur palm reading batane wali pehli authentic AI.
            </p>

            {/* Quick Proof Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-lg mx-auto lg:mx-0">
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-left">
                <div className="text-gold-400 font-bold text-sm">50+ Texts</div>
                <div className="text-[11px] text-slate-400">Brihat Samhita &amp; More</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-left">
                <div className="text-emerald-400 font-bold text-sm">Vision AI</div>
                <div className="text-[11px] text-slate-400">Mounts &amp; Rare Signs</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-left col-span-2 sm:col-span-1">
                <div className="text-amber-300 font-bold text-sm">100% Honest</div>
                <div className="text-[11px] text-slate-400">Zero Fear Marketing</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#reading-form"
                className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm uppercase tracking-wider font-extrabold text-cosmic-950 bg-gradient-to-r from-gold-300 via-gold-400 to-amber-300 rounded-full shadow-xl shadow-gold-500/30 hover:shadow-gold-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Get Your Free Reading</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#why-rekha"
                className="w-full sm:w-auto px-6 py-4 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all text-center flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-gold-400" />
                <span>See Why Rekha Is Different</span>
              </a>
            </div>

            {/* Trust Indicator */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-3 text-xs text-slate-400">
              <div className="flex -space-x-1.5">
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="User"
                    className="w-7 h-7 rounded-full border-2 border-cosmic-950 object-cover"
                  />
                ))}
              </div>
              <span>
                Joined by <strong className="text-white">12,400+</strong> seekers this month
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Glowing Palm Vector Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <PalmScannerInteractive />
          </div>
        </div>
      </section>

      {/* WHY REKHA SECTION */}
      <WhyRekhaSection />

      {/* INTERACTIVE READING FORM SECTION */}
      <section id="interactive-reading" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ReadingForm />
      </section>

      {/* 50+ CLASSICAL SOURCES SECTION */}
      <VedicSourcesSection />

      {/* TESTIMONIALS SECTION */}
      <TestimonialsSection />

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-gold-400" />
            Clarity &amp; Questions
          </div>
          <h2 className="text-3xl font-extrabold text-white font-serif">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="cosmic-card rounded-2xl border border-white/10 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02]"
                >
                  <span className="font-semibold text-sm sm:text-base text-slate-100 font-serif">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gold-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
