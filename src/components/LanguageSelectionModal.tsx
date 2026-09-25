"use client";

import React, { useState } from "react";
import { Sparkles, Globe, Check, X, Info } from "lucide-react";
import { LanguageType, useLanguage } from "@/lib/language-context";

interface LanguageSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLanguageSelected?: (lang: LanguageType) => void;
}

export default function LanguageSelectionModal({
  isOpen,
  onClose,
  onLanguageSelected,
}: LanguageSelectionModalProps) {
  const { language, setLanguage } = useLanguage();
  const [selected, setSelected] = useState<LanguageType>(language);

  if (!isOpen) return null;

  const handleApply = () => {
    setLanguage(selected);
    if (onLanguageSelected) {
      onLanguageSelected(selected);
    }
    onClose();
  };

  const options: {
    id: LanguageType;
    label: string;
    flag: string;
    example: string;
    description: string;
  }[] = [
    {
      id: "hindi",
      label: "Hindi (हिन्दी)",
      flag: "🇮🇳",
      example: "क्या आप भाषा बदलना चाहते हैं?",
      description: "शुद्ध हिंदी - देवनागरी लिपि (Authentic Vedic text in Hindi)",
    },
    {
      id: "english",
      label: "English",
      flag: "🇬🇧",
      example: "Do you want a language change?",
      description: "Clear, poetic English for global precision",
    },
    {
      id: "hinglish",
      label: "Hinglish",
      flag: "💬",
      example: "kya aap bhasha badalna chahte hain?",
      description: "Hindi written in English alphabet (Conversational & easy to read)",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl bg-cosmic-950/95 border border-gold-500/40 shadow-2xl shadow-gold-500/10 text-white overflow-hidden flex flex-col max-h-[90dvh] sm:max-h-[90vh]">
        {/* Glow ambient background */}
        <div className="absolute -top-24 -right-24 w-52 h-52 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-52 h-52 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Scrollable content area */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-7">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close language modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs font-semibold uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5" />
            Language Preference / भाषा चुनें
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
            Choose Your Reading Language
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto">
            Select how you would like REKHA to present your astrological predictions and insights:
          </p>
        </div>

        {/* Options List */}
        <div className="space-y-3 mb-5">
          {options.map((opt) => {
            const isSelected = selected === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => setSelected(opt.id)}
                className={`cursor-pointer rounded-2xl p-3.5 sm:p-4 border transition-all duration-200 flex items-start justify-between gap-3 ${
                  isSelected
                    ? "bg-gradient-to-r from-gold-500/20 via-cosmic-900 to-amber-500/10 border-gold-400 shadow-md shadow-gold-500/20 scale-[1.01]"
                    : "bg-white/[0.03] border-white/10 hover:border-gold-500/30 hover:bg-white/[0.05]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl select-none mt-0.5">{opt.flag}</span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm sm:text-base font-bold text-white">
                        {opt.label}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400/40">
                          Selected
                        </span>
                      )}
                    </div>
                    {/* Live Example Quote */}
                    <div className="text-xs font-mono font-medium text-amber-200/95 bg-black/40 px-2 py-1 rounded-lg border border-gold-500/20 inline-block">
                      &ldquo;{opt.example}&rdquo;
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {opt.description}
                    </div>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-colors ${
                    isSelected
                      ? "border-gold-400 bg-gold-400 text-cosmic-950"
                      : "border-slate-500 bg-transparent"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Browser Translation Tip for other regional/international languages */}
        <div className="mb-6 p-3 rounded-xl bg-purple-950/40 border border-purple-500/20 text-[11px] sm:text-xs text-purple-200/90 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-purple-300 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-semibold text-purple-200">
              Need another language?
            </span>{" "}
            For Marathi, Gujarati, Tamil, Telugu, Bengali, Spanish, or any other language, you can conveniently translate this entire page anytime using your browser&apos;s built-in Google Translate options.
          </p>
        </div>
        {/* end scrollable content */}
        </div>

        {/* Sticky bottom: Action Buttons — always visible */}
        <div className="shrink-0 px-5 sm:px-7 pb-5 sm:pb-7 pt-3 border-t border-white/10 bg-cosmic-950/95">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl border border-white/15 text-slate-300 text-xs sm:text-sm font-semibold hover:bg-white/5 transition-all text-center"
            >
              Keep Default
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-gold-400 to-amber-500 text-cosmic-950 text-xs sm:text-sm font-black shadow-lg shadow-gold-500/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              Apply Language
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
