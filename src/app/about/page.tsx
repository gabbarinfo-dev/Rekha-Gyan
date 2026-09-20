import React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, Cpu, BookOpen, Compass } from "lucide-react";

export const metadata = {
  title: "About REKHA — The Authentic AI Palmist & Astrologer",
  description: "Learn about the mission, Vedic heritage, and technology behind REKHA GYAN (rekhagyan.online).",
};

export default function AboutPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-300 text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          The Genesis of REKHA
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-serif">
          Ancient Shastras Meet Next-Gen Neural Intelligence
        </h1>
      </div>

      <div className="cosmic-card rounded-3xl p-6 sm:p-10 border border-gold-500/20 space-y-6 text-sm text-slate-200 leading-relaxed">
        <p>
          For centuries, true Vedic palmistry (<em>Samudrika Shastra</em> and <em>Hastasanjivani</em>) was guarded by genuine Himalayan lineages. Unfortunately, over the last century, commercialized street practices and sensationalized horoscopes diluted this sacred science, replacing rigorous planetary calculations with generic fear and costly rituals.
        </p>

        <h2 className="text-xl font-bold text-gold-300 font-serif pt-2">
          Our Guiding Philosophy
        </h2>
        <p>
          <strong>REKHA</strong> was built to restore honor, precision, and accessibility to authentic palmistry and Vedic astrology. By digitizing and cross-indexing over <strong>50+ authentic classical scriptures</strong>, our system analyzes:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <div className="font-bold text-white text-xs uppercase tracking-wider text-gold-400 flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              Sidereal Nirayana Astrology
            </div>
            <p className="text-xs text-slate-400">
              Precise Lahiri Ayanamsha computing Lagna, Moon Nakshatra, and Vimshottari Mahadashas.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <div className="font-bold text-white text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              Multimodal Neural Vision
            </div>
            <p className="text-xs text-slate-400">
              Deep millimeter detection of Mount heights (Jupiter, Saturn, Venus) and rare signs like Trishul and Matsya.
            </p>
          </div>
        </div>

        <p className="pt-2">
          We operate under a strict code of ethics: <strong>no fear mongering, no fake curses, and zero superstition.</strong> We provide actionable, uplifting, and practical clarity rooted in cosmic dharma.
        </p>
      </div>

      <div className="text-center pt-4">
        <Link
          href="/#reading-form"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-cosmic-950 bg-gradient-to-r from-gold-300 to-amber-400 shadow-xl shadow-gold-500/30 hover:scale-[1.03] transition-all"
        >
          <Sparkles className="w-4 h-4" />
          Experience REKHA Today
        </Link>
      </div>
    </div>
  );
}
