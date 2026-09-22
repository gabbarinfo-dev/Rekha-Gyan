import React from "react";
import Link from "next/link";
import { AlertTriangle, Compass, HeartPulse, Scale, DollarSign, Brain } from "lucide-react";

export const metadata = {
  title: "Disclaimer — REKHA GYAN",
  description: "Mandatory statutory astrological, palmistry, and artificial intelligence consultation disclaimer for REKHA GYAN.",
};

export default function DisclaimerPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20 text-gold-400 mb-2">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-wide">
          Disclaimer &amp; Advisory
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Clarification of the Nature of Vedic Synthesis, AI Interpretations, and Guidance
        </p>
        <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] text-gold-300 font-mono">
          Last Updated: September 2026 | Location: Ahmedabad, Gujarat, India
        </div>
      </div>

      {/* Mandatory Statutory Notice */}
      <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm leading-relaxed space-y-3">
        <div className="flex items-center gap-2 font-bold text-amber-300 uppercase tracking-wider text-xs font-serif">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-400" />
          <span>Statutory Disclosure on Readings</span>
        </div>
        <p className="font-serif text-sm sm:text-base italic text-amber-100 font-medium">
          &ldquo;Astrology &amp; Palmistry readings are based on traditional scriptures and AI synthesis. Readings are provided for guidance and informational/entertainment purposes only. We do not guarantee 100% precision or life outcomes. AI can make mistakes.&rdquo;
        </p>
      </div>

      {/* Main Content */}
      <div className="cosmic-card rounded-3xl p-6 sm:p-10 border border-white/10 space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
        
        {/* Core Methodology */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-gold-400" />
            <h2 className="text-lg font-bold text-gold-300 font-serif">1. Traditional Scripture Synthesis &amp; AI Nature</h2>
          </div>
          <p>
            REKHA GYAN (<a href="https://rekhagyan.online" className="text-gold-400 hover:underline">rekhagyan.online</a> and <a href="https://ai.rekhagyan.online" className="text-gold-400 hover:underline">ai.rekhagyan.online</a>) provides automated, AI-driven computational insights by synthesizing traditional Sanskrit texts (including Brihat Samhita, Hastasamudrika Shastra, and Vedic Jyotish fundamentals) with computer vision and deep learning models.
          </p>
          <p>
            All generated outputs are automated AI-driven insights designed solely for informational, guidance, and educational purposes. Artificial intelligence can make mistakes, and its algorithmic inferences must never be construed as definitive predictions, empirical guarantees, or fatalistic facts.
          </p>
        </section>

        {/* Professional Non-Substitute Pillars */}
        <section className="space-y-4 border-b border-white/5 pb-6">
          <h2 className="text-lg font-bold text-gold-300 font-serif">2. Non-Substitute for Regulated Professional Counsel</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div className="p-4 rounded-2xl bg-cosmic-900/60 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
                <HeartPulse className="w-4 h-4" />
                <span>Medical / Health</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Insights regarding health mounts or planetary periods are spiritual symbols only. They are not medical diagnoses. Always consult licensed healthcare practitioners.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-cosmic-900/60 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <DollarSign className="w-4 h-4" />
                <span>Financial / Investment</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Wealth lines or fortune periods do not constitute financial, taxation, or investment advice. Always consult certified financial planners (SEBI registered advisors).
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-cosmic-900/60 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
                <Scale className="w-4 h-4" />
                <span>Legal &amp; Judicial</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Consultations must never be used in disputes, litigation, or contractual commitments. Seek licensed legal attorneys for legal matters.
              </p>
            </div>
          </div>
        </section>

        {/* Free Will and Karma */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-gold-400" />
            <h2 className="text-lg font-bold text-gold-300 font-serif">3. Primacy of Human Free Will (Purushartha)</h2>
          </div>
          <p>
            Classical Vedic philosophy strictly honors Purushartha (human willpower, conscious choice, and ethical effort) over passive fatalism. The lines on your hands alter organically over years based on your conscious actions, thought patterns, and disciplines. You are the sovereign creator of your destiny; REKHA GYAN offers symbolic guideposts, not binding scripts.
          </p>
        </section>

        {/* Grievance & Office Details */}
        <section className="space-y-3 bg-cosmic-900/80 p-5 rounded-2xl border border-gold-500/20">
          <h2 className="text-base font-bold text-gold-300 font-serif">4. Office &amp; Contact Point</h2>
          <div className="text-xs space-y-1.5 text-slate-300 font-sans">
            <p><strong className="text-white">Website:</strong> rekhagyan.online &amp; ai.rekhagyan.online</p>
            <p><strong className="text-white">Official Support Email:</strong> <a href="mailto:contactus@rekhagyan.online" className="text-gold-400 hover:underline">contactus@rekhagyan.online</a></p>
            <p><strong className="text-white">Grievance Email:</strong> <a href="mailto:grievance@rekhagyan.online" className="text-gold-400 hover:underline">grievance@rekhagyan.online</a></p>
            <p><strong className="text-white">Support Phone:</strong> <a href="tel:9274090534" className="text-gold-400 hover:underline">+91 9274090534</a></p>
            <p><strong className="text-white">Business Address &amp; Jurisdiction:</strong> Ahmedabad, Gujarat, India</p>
          </div>
        </section>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
        <Link href="/" className="text-gold-400 hover:underline">Return to Home</Link>
        <span>&bull;</span>
        <Link href="/privacy" className="text-gold-400 hover:underline">Privacy Policy</Link>
        <span>&bull;</span>
        <Link href="/terms" className="text-gold-400 hover:underline">Terms &amp; Conditions</Link>
        <span>&bull;</span>
        <Link href="/refund-policy" className="text-gold-400 hover:underline">Refund Policy</Link>
        <span>&bull;</span>
        <Link href="/contact" className="text-gold-400 hover:underline">Contact Us</Link>
      </div>
    </div>
  );
}
