import React from "react";
import Link from "next/link";
import { BookCheck, AlertCircle, FileText, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions — REKHA GYAN",
  description: "Terms and conditions, acceptable use, subscription policies, and credit usage for REKHA GYAN (rekhagyan.online & ai.rekhagyan.online).",
};

export default function TermsPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20 text-gold-400 mb-2">
          <BookCheck className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-wide">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Terms of Service, Acceptable Usage, and Computational Subscription Policies
        </p>
        <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] text-gold-300 font-mono">
          Last Updated: September 2026 | Location: Ahmedabad, Gujarat, India
        </div>
      </div>

      {/* Mandatory Statutory Notice Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm leading-relaxed space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-300 uppercase tracking-wider text-xs font-serif">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-400" />
          <span>Statutory Disclaimer &amp; Nature of Service</span>
        </div>
        <p className="italic font-medium">
          &ldquo;Astrology &amp; Palmistry readings are based on traditional scriptures and AI synthesis. Readings are provided for guidance and informational/entertainment purposes only. We do not guarantee 100% precision or life outcomes. AI can make mistakes.&rdquo;
        </p>
      </div>

      {/* Main Content */}
      <div className="cosmic-card rounded-3xl p-6 sm:p-10 border border-white/10 space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
        
        {/* Clause 1 */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <h2 className="text-lg font-bold text-gold-300 font-serif">1. Acceptance of Terms</h2>
          <p>
            By creating an account, accessing, or purchasing consultation credits on <strong className="text-white">REKHA GYAN</strong> (<a href="https://rekhagyan.online" className="text-gold-400 hover:underline">rekhagyan.online</a> or <a href="https://ai.rekhagyan.online" className="text-gold-400 hover:underline">ai.rekhagyan.online</a>), you signify that you have read, understood, and unconditionally agreed to be bound by these Terms and Conditions and our associated Privacy and Refund Policies.
          </p>
        </section>

        {/* Clause 2: Platform Description & AI Role */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <h2 className="text-lg font-bold text-gold-300 font-serif">2. Platform Role &amp; Methodology</h2>
          <p>
            REKHA GYAN is an AI-augmented Vedic synthesis software application that provides automated, AI-driven insights for informational and guidance purposes only. It interprets user-submitted birth data and palm imagery using classical Samudrika Shastra texts and computational algorithms.
          </p>
          <p>
            These interpretations represent probabilistic astrological assessments and symbolic alignments, not deterministic certainties. Artificial intelligence can make mistakes; therefore, readings must never replace certified professional advice. You remain exclusively responsible for all personal, professional, and lifestyle choices made following any reading.
          </p>
        </section>

        {/* Clause 3: Subscriptions, Credit Usage & Tier Rules */}
        <section className="space-y-4 border-b border-white/5 pb-6">
          <h2 className="text-lg font-bold text-gold-300 font-serif">3. Subscriptions, Pricing Plans &amp; Credit Usage</h2>
          <p>
            The Platform provides tiered access to AI consultation credits and deep report generation:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="p-4 rounded-xl bg-cosmic-900/60 border border-white/10 space-y-1">
              <div className="font-bold text-white text-xs">₹99 Single Scan / Trial</div>
              <p className="text-[11px] text-slate-400">
                Grants instant single-session AI palm analysis and primary astrological forecast. Consumed immediately upon report computation.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-cosmic-900/60 border border-gold-500/20 space-y-1">
              <div className="font-bold text-gold-300 text-xs">₹599 Pro Vedic Pack</div>
              <p className="text-[11px] text-slate-400">
                Grants bundled question credits, divisional chart (D9/D10) insights, and follow-up guidance across valid active billing duration.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-cosmic-900/60 border border-gold-500/30 space-y-1">
              <div className="font-bold text-amber-300 text-xs">₹1099 Ultimate Samudrika Pack</div>
              <p className="text-[11px] text-slate-400">
                Full comprehensive palmistry scan, lifetime preservation of generated charts, multi-facet timing remedies, and VIP computational speed.
              </p>
            </div>
          </div>
          <ul className="list-disc list-inside space-y-2 text-slate-300 pl-1 pt-2">
            <li>
              <strong className="text-white">Immediate Credit Consumption:</strong> Digital credits are consumed instantly when an AI query or palm scan analysis is generated by our computing infrastructure.
            </li>
            <li>
              <strong className="text-white">Subscription Cancellation:</strong> If you are enrolled in any recurring subscription, you may cancel future renewal cycles at any moment through your account dashboard or by emailing <a href="mailto:contactus@rekhagyan.online" className="text-gold-400 hover:underline">contactus@rekhagyan.online</a> prior to the next billing date. Cancellation prevents future billing; already processed charges remain non-refundable.
            </li>
          </ul>
        </section>

        {/* Clause 4: Multi-User & Account Security */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <h2 className="text-lg font-bold text-gold-300 font-serif">4. User Account &amp; Multi-User Restrictions</h2>
          <p>
            Each registered account is licensed for personal, non-commercial use by the authorized account holder:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-300 pl-1">
            <li>Account credentials must not be sold, shared, or distributed across multiple concurrent users.</li>
            <li>Any unauthorized automated scraping, bot queries, reverse engineering of the AI engine, or commercial resale of generated readings will lead to immediate account termination without refund.</li>
          </ul>
        </section>

        {/* Clause 5: Limitation of Liability */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <h2 className="text-lg font-bold text-gold-300 font-serif">5. Limitation of Legal Liability</h2>
          <p>
            Under no circumstances shall REKHA GYAN, its founders, engineers, or operators be liable for any indirect, punitive, incidental, or consequential damages resulting from your use of the Platform or decisions made based on AI or Vedic insights. To the fullest extent permissible by applicable law, our aggregate liability for any claim shall not exceed the actual amount paid by you for the specific service session.
          </p>
        </section>

        {/* Clause 6: Governing Law */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <h2 className="text-lg font-bold text-gold-300 font-serif">6. Governing Law &amp; Jurisdiction</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India. Any legal dispute, claim, or controversy arising under or related to these Terms shall be subject to the exclusive jurisdiction of the competent courts located in <strong className="text-white">Ahmedabad, Gujarat, India</strong>.
          </p>
        </section>

        {/* Clause 7: Grievance Contact */}
        <section className="space-y-3 bg-cosmic-900/80 p-5 rounded-2xl border border-gold-500/20">
          <h2 className="text-base font-bold text-gold-300 font-serif">7. Contact &amp; Grievance Redressal</h2>
          <div className="text-xs space-y-1.5 text-slate-300 font-sans">
            <p><strong className="text-white">Grievance Desk:</strong> Grievance Redressal Cell</p>
            <p><strong className="text-white">Official Support Email:</strong> <a href="mailto:contactus@rekhagyan.online" className="text-gold-400 hover:underline">contactus@rekhagyan.online</a></p>
            <p><strong className="text-white">Grievance Email:</strong> <a href="mailto:grievance@rekhagyan.online" className="text-gold-400 hover:underline">grievance@rekhagyan.online</a></p>
            <p><strong className="text-white">Contact Phone:</strong> <a href="tel:9274090534" className="text-gold-400 hover:underline">+91 9274090534</a></p>
            <p><strong className="text-white">Business Address:</strong> Ahmedabad, Gujarat, India</p>
          </div>
        </section>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
        <Link href="/" className="text-gold-400 hover:underline">Return to Home</Link>
        <span>&bull;</span>
        <Link href="/privacy" className="text-gold-400 hover:underline">Privacy Policy</Link>
        <span>&bull;</span>
        <Link href="/refund-policy" className="text-gold-400 hover:underline">Refund Policy</Link>
        <span>&bull;</span>
        <Link href="/disclaimer" className="text-gold-400 hover:underline">Disclaimer</Link>
        <span>&bull;</span>
        <Link href="/contact" className="text-gold-400 hover:underline">Contact Us</Link>
      </div>
    </div>
  );
}
