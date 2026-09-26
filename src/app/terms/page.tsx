import React from "react";
import Link from "next/link";
import { BookCheck, AlertCircle, FileText, CheckCircle2, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions — REKHA GYAN",
  description: "Terms and conditions, pricing, acceptable use, and service policies for REKHA GYAN (ai.rekhagyan.online & rekhagyan.online), a unit of GABBARINFO DIGITAL SOLUTIONS.",
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
          Terms of Service, Service Pricing, Acceptable Usage &amp; Operational Policies
        </p>
        <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] text-gold-300 font-mono">
          Last Updated: September 2026 | Location: Ahmedabad, Gujarat, India
        </div>
      </div>

      {/* Legal Entity Ownership Statement Banner */}
      <div className="p-5 rounded-3xl bg-gold-500/10 border border-gold-500/25 text-gold-200 text-xs sm:text-sm leading-relaxed space-y-2">
        <div className="flex items-center gap-2 font-bold text-gold-300 uppercase tracking-wider text-xs font-serif">
          <ShieldCheck className="w-5 h-5 flex-shrink-0 text-gold-400" />
          <span>Legal Entity &amp; Ownership Statement</span>
        </div>
        <p className="text-slate-200">
          This website (<strong className="text-white">ai.rekhagyan.online</strong> / <strong className="text-white">rekhagyan.online</strong>) and brand (&lsquo;<strong className="text-white">REKHA GYAN</strong>&rsquo;) are owned and operated by <strong className="text-white">GABBARINFO DIGITAL SOLUTIONS</strong>, a registered enterprise under Udyam Registration No. <span className="font-mono text-gold-300 font-semibold">UDYAM-GJ-01-0683309</span>. REKHA GYAN is a unit of GABBARINFO DIGITAL SOLUTIONS.
        </p>
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
        
        {/* Clause 1: Acceptance */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <h2 className="text-lg font-bold text-gold-300 font-serif">1. Acceptance of Terms</h2>
          <p>
            By creating an account, accessing, or purchasing consultation credits on <strong className="text-white">REKHA GYAN</strong> (<a href="https://rekhagyan.online" className="text-gold-400 hover:underline">rekhagyan.online</a> or <a href="https://ai.rekhagyan.online" className="text-gold-400 hover:underline">ai.rekhagyan.online</a>), operated by <strong className="text-white">GABBARINFO DIGITAL SOLUTIONS</strong>, you signify that you have read, understood, and unconditionally agreed to be bound by these Terms and Conditions and our associated Privacy and Refund Policies.
          </p>
        </section>

        {/* Clause 2: Platform Description & AI Role */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <h2 className="text-lg font-bold text-gold-300 font-serif">2. Platform Role &amp; Methodology</h2>
          <p>
            REKHA GYAN is an AI-augmented Vedic synthesis software application that provides automated, AI-driven insights for informational and guidance purposes only. It interprets user-submitted birth data and palm imagery using classical Samudrika Shastra texts and computational algorithms.
          </p>
          <p>
            These interpretations represent probabilistic astrological assessments and symbolic alignments, not deterministic certainties. Artificial intelligence can make mistakes; therefore, readings must never replace certified professional advice (medical, legal, or financial). You remain exclusively responsible for all personal, professional, and lifestyle choices made following any reading.
          </p>
        </section>

        {/* Clause 3: Subscriptions, Credit Usage & Pricing Plans */}
        <section className="space-y-4 border-b border-white/5 pb-6">
          <h2 className="text-lg font-bold text-gold-300 font-serif">3. Product &amp; Service Pricing Structure</h2>
          <p>
            All products and services offered on the Platform are digital consultation and report services. Transparent pricing is defined as follows:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-4 rounded-xl bg-cosmic-900/60 border border-emerald-500/30 space-y-1">
              <div className="flex items-center justify-between">
                <div className="font-bold text-emerald-300 text-sm">₹0 Free Reading</div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-semibold">Free Tier</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Complimentary introductory palm scan analysis and basic Vedic summary. Free of charge for all new seekers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cosmic-900/60 border border-gold-500/30 space-y-1">
              <div className="flex items-center justify-between">
                <div className="font-bold text-gold-300 text-sm">₹51 Paid Reading</div>
                <span className="text-[10px] bg-gold-500/20 text-gold-300 px-2 py-0.5 rounded-full font-semibold">Single Consultation</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Direct single-session palmistry synthesis or focused planetary query with actionable Vedic remedies.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cosmic-900/60 border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <div className="font-bold text-white text-sm">₹99 Starter Pack</div>
                <span className="text-[10px] bg-white/10 text-slate-300 px-2 py-0.5 rounded-full font-semibold">Single Profile Pack</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Deep palm analysis, mount elevation scoring, and 1 comprehensive life question answer.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cosmic-900/60 border border-gold-500/20 space-y-1">
              <div className="flex items-center justify-between">
                <div className="font-bold text-amber-300 text-sm">₹599 / ₹1099 Pro &amp; Ultimate Packs</div>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-semibold">Comprehensive</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Multi-profile support, divisional chart analysis (D9 Navamsha, D10 Dashamsha), partner matchmaking synastry, and priority AI processing.
              </p>
            </div>
          </div>

          <ul className="list-disc list-inside space-y-2 text-slate-300 pl-1 pt-2">
            <li>
              <strong className="text-white">Applicable Taxes:</strong> Prices are clearly displayed before payment confirmation and include applicable taxes unless specified otherwise.
            </li>
            <li>
              <strong className="text-white">Immediate Credit Consumption:</strong> Digital credits are consumed instantly when an AI query or palm scan analysis is computed by our computing infrastructure.
            </li>
            <li>
              <strong className="text-white">Subscription Cancellation:</strong> If you are enrolled in any recurring subscription, you may cancel future renewal cycles at any moment through your account dashboard or by emailing <a href="mailto:contactus@rekhagyan.online" className="text-gold-400 hover:underline">contactus@rekhagyan.online</a> prior to the next billing date. Cancellation prevents future billing; already processed charges remain non-refundable.
            </li>
            <li>
              <strong className="text-white">Technical Failure Protection:</strong> If an AI computation hangs or crashes due to system error, users are entitled to an immediate credit reset or 100% refund initiated within 5–7 working days as defined in our Refund Policy.
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
            Under no circumstances shall REKHA GYAN, its operating entity <strong className="text-white">GABBARINFO DIGITAL SOLUTIONS</strong>, its founders, engineers, or operators be liable for any indirect, punitive, incidental, or consequential damages resulting from your use of the Platform or decisions made based on AI or Vedic insights. To the fullest extent permissible by applicable law, our aggregate liability for any claim shall not exceed the actual amount paid by you for the specific service session.
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
        <section className="space-y-3 bg-cosmic-900/80 p-6 rounded-2xl border border-gold-500/20">
          <h2 className="text-base font-bold text-gold-300 font-serif">7. Official Legal &amp; Grievance Redressal Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300 pt-1">
            <div className="space-y-1.5">
              <p><strong className="text-white">Legal Entity:</strong> GABBARINFO DIGITAL SOLUTIONS</p>
              <p><strong className="text-white">Brand Name:</strong> REKHA GYAN</p>
              <p><strong className="text-white">Udyam Registration:</strong> UDYAM-GJ-01-0683309</p>
              <p><strong className="text-white">Physical Address:</strong> 503, K Block, Savvy Swaraj, Jagatpur, Ahmedabad, Gujarat - 382470, India</p>
            </div>
            <div className="space-y-1.5">
              <p><strong className="text-white">Official Support Email:</strong> <a href="mailto:contactus@rekhagyan.online" className="text-gold-400 hover:underline">contactus@rekhagyan.online</a></p>
              <p><strong className="text-white">Grievance Email:</strong> <a href="mailto:grievance@rekhagyan.online" className="text-gold-400 hover:underline">grievance@rekhagyan.online</a></p>
              <p><strong className="text-white">Phone Numbers:</strong> <a href="tel:8511739865" className="text-gold-400 hover:underline">+91 8511739865</a> / <a href="tel:9274090534" className="text-gold-400 hover:underline">+91 9274090534</a></p>
              <p><strong className="text-white">Response Time:</strong> 24–48 Hours</p>
            </div>
          </div>
        </section>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
        <Link href="/" className="text-gold-400 hover:underline">Return to Home</Link>
        <span>&bull;</span>
        <Link href="/privacy-policy" className="text-gold-400 hover:underline">Privacy Policy</Link>
        <span>&bull;</span>
        <Link href="/refund-policy" className="text-gold-400 hover:underline">Refund Policy</Link>
        <span>&bull;</span>
        <Link href="/disclaimer" className="text-gold-400 hover:underline">Disclaimer</Link>
        <span>&bull;</span>
        <Link href="/contact-us" className="text-gold-400 hover:underline">Contact Us</Link>
      </div>
    </div>
  );
}
