import React from "react";
import Link from "next/link";
import { BookCheck } from "lucide-react";

export const metadata = {
  title: "Terms of Consultation — REKHA GYAN",
  description: "Terms and conditions governing the use of REKHA GYAN (rekhagyan.online).",
};

export default function TermsPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <BookCheck className="w-10 h-10 text-gold-400 mx-auto" />
        <h1 className="text-3xl font-extrabold text-white font-serif">Terms of Consultation</h1>
        <p className="text-xs text-slate-400">Domain: rekhagyan.online</p>
      </div>

      <div className="cosmic-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-gold-300 font-serif">1. Purpose &amp; Nature of Consultation</h2>
          <p>
            REKHA GYAN provides astrological and palmistry interpretations based upon authentic historical Samudrika Shastra and Vedic texts. All insights, predictive timelines, and remedies are offered for personal guidance, self-reflection, and spiritual education.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-gold-300 font-serif">2. No Substitute for Professional Advice</h2>
          <p>
            Astrological forecasts must not replace certified medical, legal, psychological, or licensed financial counsel. Always consult accredited professionals for health diagnoses, legal disputes, or regulated financial decisions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-gold-300 font-serif">3. Free Will &amp; Sovereign Destiny</h2>
          <p>
            Classical Vedic philosophy affirms that while Prarabdha (karmic blueprint) provides the baseline current, Kriyamana karma (conscious action and ethical discernment) governs your final outcomes. You remain the master of your decisions.
          </p>
        </section>
      </div>

      <div className="text-center">
        <Link href="/" className="text-xs text-gold-400 hover:underline">
          Return to Home Page
        </Link>
      </div>
    </div>
  );
}
