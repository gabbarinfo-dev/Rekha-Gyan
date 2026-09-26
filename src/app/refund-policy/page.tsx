import React from "react";
import Link from "next/link";
import { RotateCcw, AlertOctagon, CheckCircle2, HelpCircle, Clock, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";

export const metadata = {
  title: "Refund & Cancellation Policy — REKHA GYAN",
  description: "Official Refund & Cancellation Policy for REKHA GYAN (ai.rekhagyan.online & rekhagyan.online), a unit of GABBARINFO DIGITAL SOLUTIONS.",
};

export default function RefundPolicyPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20 text-gold-400 mb-2">
          <RotateCcw className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-wide">
          Refund &amp; Cancellation Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Clear Terms on Digital Intangible Goods, Technical Generation Failures, Processing Timelines &amp; Subscription Cancellation
        </p>
        <div className="inline-block px-4 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] text-gold-300 font-mono">
          Last Updated: September 2026 | Registered in Ahmedabad, Gujarat, India
        </div>
      </div>

      {/* Legal Entity Ownership Clause Banner */}
      <div className="p-5 rounded-3xl bg-gold-500/10 border border-gold-500/25 text-gold-200 text-xs sm:text-sm leading-relaxed space-y-2">
        <div className="flex items-center gap-2 font-bold text-gold-300 uppercase tracking-wider text-xs font-serif">
          <ShieldCheck className="w-5 h-5 flex-shrink-0 text-gold-400" />
          <span>Legal Entity &amp; Ownership Statement</span>
        </div>
        <p className="text-slate-200">
          This website (<strong className="text-white">ai.rekhagyan.online</strong> / <strong className="text-white">rekhagyan.online</strong>) and brand (&lsquo;<strong className="text-white">REKHA GYAN</strong>&rsquo;) are owned and operated by <strong className="text-white">GABBARINFO DIGITAL SOLUTIONS</strong>, a registered enterprise under Udyam Registration No. <span className="font-mono text-gold-300 font-semibold">UDYAM-GJ-01-0683309</span>. REKHA GYAN is a unit of GABBARINFO DIGITAL SOLUTIONS.
        </p>
      </div>

      {/* Main Content */}
      <div className="cosmic-card rounded-3xl p-6 sm:p-10 border border-white/10 space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">

        {/* Section 1: Crucial Technical FAQs */}
        <section className="space-y-4 border-b border-white/5 pb-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-gold-400" />
            <h2 className="text-lg font-bold text-gold-300 font-serif">
              1. Direct Clarifications &amp; Key Questions
            </h2>
          </div>

          {/* Question 1: AI generation fails */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-2">
            <div className="text-sm font-bold text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
              <span>Are refunds provided if the AI generation fails or hangs or gives unusual error?</span>
            </div>
            <p className="text-slate-200 font-medium text-xs sm:text-sm">
              <strong className="text-emerald-300 uppercase font-bold">Yes.</strong> If an unexpected server timeout, AI model hang, network interruption, or unusual computational error occurs and prevents your paid reading/report from generating successfully, we guarantee full protection. You are entitled to an immediate re-generation credit or a 100% full refund upon contacting our support desk.
            </p>
          </div>

          {/* Question 2: Exact processing timeframe */}
          <div className="p-4 sm:p-5 rounded-2xl bg-cosmic-900/80 border border-gold-500/25 space-y-2">
            <div className="text-sm font-bold text-gold-300 flex items-center gap-2">
              <Clock className="w-4 h-4 flex-shrink-0 text-gold-400" />
              <span>What is the exact refund processing timeframe?</span>
            </div>
            <p className="text-slate-200 font-medium text-xs sm:text-sm">
              <strong className="text-white">Eligible refunds will be credited back to the original payment source within 5–7 business days.</strong> For digital services and consultation reports, refund initiation occurs within standard 5–7 working days from the moment your request is reviewed and validated by our billing desk.
            </p>
          </div>
        </section>

        {/* Section 2: Nature of Digital & Computational Products */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <h2 className="text-lg font-bold text-gold-300 font-serif">
            2. Nature of Digital &amp; Computational Products
          </h2>
          <p>
            Unlike physical goods, REKHA GYAN provides instant, intangible digital deliverables and computational synthesis:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300 pl-1">
            <li>
              <strong className="text-white">Instant Server &amp; GPU Resource Consumption:</strong> As soon as you confirm a consultation request and submit palm imagery or birth coordinates, high-performance computer vision pipelines and planetary ephemeris calculation matrices execute immediately on our cloud infrastructure.
            </li>
            <li>
              <strong className="text-white">Completed Digital Delivery:</strong> Once the astrological analysis, palmistry interpretation, and comprehensive guidance report have been successfully computed and presented on your screen or saved to your profile, the digital service is considered fully consumed. Because personalized digital content cannot be returned once successfully rendered, <strong>refunds are not applicable once the reading has been successfully delivered without error</strong>.
            </li>
          </ul>
        </section>

        {/* Section 3: Pricing & Product Transparency */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <h2 className="text-lg font-bold text-gold-300 font-serif">
            3. Pricing &amp; Service Tiers
          </h2>
          <p>
            We offer transparent, upfront pricing with zero hidden surcharges:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-cosmic-900/60 border border-white/10 space-y-1">
              <div className="font-bold text-white text-xs">₹0 Free Reading</div>
              <p className="text-[11px] text-slate-400">
                Introductory complimentary palm scan preview and basic Kundli analysis. No payment required.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-cosmic-900/60 border border-gold-500/20 space-y-1">
              <div className="font-bold text-gold-300 text-xs">₹51 / ₹99 Single Readings</div>
              <p className="text-[11px] text-slate-400">
                Single-session deep palm scan, specific life question analysis, or trial report generation.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-cosmic-900/60 border border-gold-500/30 space-y-1">
              <div className="font-bold text-amber-300 text-xs">₹599 / ₹1099 Multi-Query Packs</div>
              <p className="text-[11px] text-slate-400">
                Pro Vedic &amp; Ultimate Samudrika access, synastry / matchmaking, remedies, and lifetime chart storage.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Refund Eligibility Scenarios */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <h2 className="text-lg font-bold text-gold-300 font-serif">
            4. Refund Eligibility &amp; Initiation Process
          </h2>
          <p>
            Refunds will be approved and initiated within our standard 5–7 working days window under the following scenarios:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300 pl-1">
            <li>
              <strong className="text-white">Technical Failure / Server Hang:</strong> If your payment was successful, but the AI system crashed, hung indefinitely, or returned an unrecoverable system error without providing your completed report.
            </li>
            <li>
              <strong className="text-white">Duplicate Deduction:</strong> If your bank account, credit/debit card, or UPI was debited more than once for a single transaction attempt due to a payment gateway latency.
            </li>
            <li>
              <strong className="text-white">Service Non-Delivery:</strong> If the paid report is not generated and delivered to your account within 30 minutes of payment confirmation due to technical bottlenecks.
            </li>
          </ul>
          <p className="pt-1 text-slate-400 text-xs">
            <em>How to claim:</em> Email our support desk at <a href="mailto:contactus@rekhagyan.online" className="text-gold-400 hover:underline">contactus@rekhagyan.online</a> or WhatsApp <a href="tel:8511739865" className="text-gold-400 hover:underline">+91 8511739865</a> with your registered phone number/email and Transaction ID. Eligible refunds will be credited back to the original payment source within 5–7 business days.
          </p>
        </section>

        {/* Section 5: Subscription Cancellation */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <h2 className="text-lg font-bold text-gold-300 font-serif">
            5. Subscription Cancellation Policy
          </h2>
          <p>
            If you enroll in any recurring subscription:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-300 pl-1">
            <li>You may cancel recurring renewals anytime before the next billing cycle via your user profile or by writing to <a href="mailto:contactus@rekhagyan.online" className="text-gold-400 hover:underline">contactus@rekhagyan.online</a>.</li>
            <li>Once cancelled, access remains valid through the paid period and will not renew.</li>
            <li>Past or current billing cycles already initiated or consumed cannot be refunded retroactively.</li>
          </ul>
        </section>

        {/* Section 6: Official Business & Support Information */}
        <section className="space-y-3 bg-cosmic-900/80 p-6 rounded-2xl border border-gold-500/20">
          <h2 className="text-base font-bold text-gold-300 font-serif">
            6. Official Merchant &amp; Support Contact
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300 pt-1">
            <div className="space-y-1.5">
              <p><strong className="text-white">Legal Entity Name:</strong> GABBARINFO DIGITAL SOLUTIONS</p>
              <p><strong className="text-white">Brand Name:</strong> REKHA GYAN</p>
              <p><strong className="text-white">Udyam Registration:</strong> UDYAM-GJ-01-0683309</p>
              <p><strong className="text-white">Registered Address:</strong> 503, K Block, Savvy Swaraj, Jagatpur, Ahmedabad, Gujarat - 382470, India</p>
            </div>
            <div className="space-y-1.5">
              <p><strong className="text-white">Official Email:</strong> <a href="mailto:contactus@rekhagyan.online" className="text-gold-400 hover:underline">contactus@rekhagyan.online</a></p>
              <p><strong className="text-white">Grievance Email:</strong> <a href="mailto:grievance@rekhagyan.online" className="text-gold-400 hover:underline">grievance@rekhagyan.online</a></p>
              <p><strong className="text-white">Phone Numbers:</strong> <a href="tel:8511739865" className="text-gold-400 hover:underline">+91 8511739865</a> / <a href="tel:9274090534" className="text-gold-400 hover:underline">+91 9274090534</a></p>
              <p><strong className="text-white">Customer Support Response Time:</strong> 24–48 Hours</p>
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
        <Link href="/terms-and-conditions" className="text-gold-400 hover:underline">Terms &amp; Conditions</Link>
        <span>&bull;</span>
        <Link href="/disclaimer" className="text-gold-400 hover:underline">Disclaimer</Link>
        <span>&bull;</span>
        <Link href="/contact-us" className="text-gold-400 hover:underline">Contact Us</Link>
      </div>
    </div>
  );
}
