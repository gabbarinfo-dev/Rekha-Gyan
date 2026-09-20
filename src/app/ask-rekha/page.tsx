import React from "react";
import { Metadata } from "next";
import ReadingForm from "@/components/ReadingForm";
import PalmScannerInteractive from "@/components/PalmScannerInteractive";
import { Sparkles, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Ask REKHA — Dedicated AI Palmist & Astrologer Consultation",
  description:
    "Submit your birth coordinates and palm photos for an instant, confidential reading with REKHA synthesized across 50+ classical treatises.",
};

export default function AskRekhaPage() {
  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-300 text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          Private Sacred Consultation Sanctuary
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-serif tracking-tight">
          Enter Your Celestial Coordinates
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          REKHA will cross-match your exact Sidereal planetary alignments with your palm lines to provide direct answers, timelines, and sacred remedies.
        </p>
      </div>

      {/* Grid: Form on left, Interactive Palm guide on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8">
          <ReadingForm />
        </div>

        <div className="lg:col-span-4 space-y-6">
          <PalmScannerInteractive />

          <div className="cosmic-card rounded-3xl p-6 border border-gold-500/20 text-xs space-y-3">
            <div className="font-bold text-white uppercase tracking-wider text-gold-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Photographing Tips for Highest Accuracy:
            </div>
            <ul className="space-y-2 text-slate-300 list-disc list-inside">
              <li>Use natural daylight or a bright lamp above your hand.</li>
              <li>Keep fingers naturally open without straining backward.</li>
              <li>Capture from wrist crease up to fingertips.</li>
              <li>Avoid heavy filters or blurry camera angles.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
