import React from "react";
import Link from "next/link";
import { RotateCcw, AlertOctagon, CheckCircle2, HelpCircle, Clock, ShieldCheck, Mail, Phone, MapPin, Camera, RefreshCw } from "lucide-react";

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
          Clear Terms on Digital Intangible Goods, Credit Restorations, Screenshot Requirements &amp; Cancellation Procedures
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

        {/* Section 1: Core Policy & AI Generation Failures */}
        <section className="space-y-4 border-b border-white/5 pb-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-gold-400" />
            <h2 className="text-lg font-bold text-gold-300 font-serif">
              1. Direct Clarifications &amp; AI Error Resolution
            </h2>
          </div>

          {/* Question 1: AI generation fails or hangs */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-3">
            <div className="text-sm font-bold text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
              <span>Are refunds provided if the AI generation fails, hangs, or gives an unusual error?</span>
            </div>
            <p className="text-slate-200 font-medium text-xs sm:text-sm">
              <strong className="text-emerald-300 uppercase font-bold">Yes.</strong> For already paid services, if an unexpected error occurs from our end (e.g., AI model hang, server timeout, or unhandled system crash), compensation is strictly provided in the form of <strong className="text-white underline">service credits / consultation re-issuance</strong> to your account.
            </p>
            
            {/* Mandatory SS requirement */}
            <div className="p-3.5 rounded-xl bg-cosmic-950/70 border border-emerald-500/20 text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-gold-300 font-bold">
                <Camera className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>Mandatory Verification Requirement (Real-Time Screenshot):</span>
              </div>
              <p className="text-slate-300">
                To claim credit restoration, you must provide a <strong className="text-white">real-time screenshot (SS) clearly displaying the error state and error code</strong> generated on the AI interface, alongside your registered email/phone and payment transaction ID sent to <a href="mailto:contactus@rekhagyan.online" className="text-gold-300 hover:underline">contactus@rekhagyan.online</a>.
              </p>
            </div>
          </div>

          {/* Question 2: Exact processing timeframe */}
          <div className="p-4 sm:p-5 rounded-2xl bg-cosmic-900/80 border border-gold-500/25 space-y-2">
            <div className="text-sm font-bold text-gold-300 flex items-center gap-2">
              <Clock className="w-4 h-4 flex-shrink-0 text-gold-400" />
              <span>What is the exact refund &amp; credit processing timeframe?</span>
            </div>
            <ul className="list-disc list-inside space-y-1.5 text-slate-200 pl-1 text-xs sm:text-sm">
              <li>
                <strong className="text-white">Service Credit Restoration:</strong> Processed and re-credited to your profile within <strong className="text-emerald-300 font-bold">24–48 hours</strong> of verification of the error screenshot.
              </li>
              <li>
                <strong className="text-white">Payment Gateway / Duplicate Charges:</strong> Where an actual bank debit occurred multiple times due to a gateway timeout, <strong className="text-white">eligible refunds will be credited back to the original payment source within 5–7 business days</strong>. Standard refund initiation takes 5–7 working days.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2: Non-Refundable / Non-Cancellable Digital Services */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <div className="flex items-center gap-2 text-rose-300 font-serif font-bold text-base">
            <AlertOctagon className="w-5 h-5 text-rose-400" />
            <span>2. Non-Refundable &amp; Non-Cancellable Digital Deliverables</span>
          </div>
          <p>
            Unlike physical manufactured products, REKHA GYAN provides instant, intangible, irrevocable digital analysis and server GPU computations:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300 pl-1">
            <li>
              <strong className="text-white">Instant GPU Computation:</strong> Upon submitting your palm photos or birth details, cloud servers instantly execute complex planetary matrices and computer vision palmistry models.
            </li>
            <li>
              <strong className="text-white">Delivered Reports are Non-Refundable:</strong> Once your personalized astrological consultation or palm analysis report has been generated and rendered on your screen, the service is fully consumed. <strong className="text-rose-300 uppercase">Successfully delivered reports are non-refundable and non-returnable</strong> under any circumstances.
            </li>
          </ul>
        </section>

        {/* Section 3: Return & Replace Request Process */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <div className="flex items-center gap-2 text-gold-300 font-serif font-bold text-base">
            <RefreshCw className="w-5 h-5 text-gold-400" />
            <span>3. Return / Replace Request Process for Digital Services</span>
          </div>
          <p>
            Because digital reports cannot be physically returned, our &ldquo;replace&rdquo; procedure operates through credit restoration:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-slate-300 pl-1">
            <li>
              <strong className="text-white">Step 1 — Capture Error:</strong> If the AI interface hangs or throws an unhandled error code, immediately take a full-screen screenshot showing the URL, timestamp, and visible error message/code.
            </li>
            <li>
              <strong className="text-white">Step 2 — Submit Request:</strong> Email <a href="mailto:contactus@rekhagyan.online" className="text-gold-300 hover:underline">contactus@rekhagyan.online</a> within 24 hours with subject <span className="font-mono bg-white/10 px-1.5 py-0.5 rounded text-white">&ldquo;Technical Error Credit Claim - [Transaction ID]&rdquo;</span> and attach the real-time screenshot.
            </li>
            <li>
              <strong className="text-white">Step 3 — Verification &amp; Credit Re-Issue:</strong> Our technical team verifies server logs against your screenshot within 24–48 hours and re-issues full consultation credits so you can re-run your reading without charge.
            </li>
          </ol>
        </section>

        {/* Section 4: Cancellation Procedures, Fees & Requirements */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <h2 className="text-lg font-bold text-gold-300 font-serif">
            4. Cancellation Procedures, Fees &amp; Requirements
          </h2>
          <div className="space-y-2 text-slate-300">
            <p>
              <strong className="text-white">Cancellation Fees:</strong> <span className="text-emerald-400 font-bold">₹0 (Zero Fees)</span>. We do not charge any cancellation penalties or processing fees for terminating future subscriptions.
            </p>
            <p>
              <strong className="text-white">Cancellation Requirement:</strong> Subscription cancellation requests must be submitted at least <strong className="text-white">24 hours prior</strong> to the next recurring billing renewal date.
            </p>
            <p>
              <strong className="text-white">Procedure:</strong> You can cancel recurring subscriptions directly from your user dashboard settings or by sending an email with your registered details to <a href="mailto:contactus@rekhagyan.online" className="text-gold-400 hover:underline">contactus@rekhagyan.online</a>. Upon cancellation, your access remains valid through the remainder of your paid billing term with zero further debits.
            </p>
          </div>
        </section>

        {/* Section 5: Pricing Breakdown */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <h2 className="text-lg font-bold text-gold-300 font-serif">
            5. Pricing &amp; Service Tiers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-cosmic-900/60 border border-white/10 space-y-1">
              <div className="font-bold text-white text-xs">₹0 Free Reading</div>
              <p className="text-[11px] text-slate-400">
                Introductory palm preview and basic summary. 100% free of charge.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-cosmic-900/60 border border-gold-500/20 space-y-1">
              <div className="font-bold text-gold-300 text-xs">₹51 / ₹99 Single Consultations</div>
              <p className="text-[11px] text-slate-400">
                Single-session palmistry synthesis or focused planetary query with remedies.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-cosmic-900/60 border border-gold-500/30 space-y-1">
              <div className="font-bold text-amber-300 text-xs">₹599 / ₹1099 Multi-Query Packs</div>
              <p className="text-[11px] text-slate-400">
                Pro Vedic &amp; Ultimate Samudrika access, partner synastry, and priority processing.
              </p>
            </div>
          </div>
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
              <p><strong className="text-white">Phone Numbers:</strong> <a href="tel:8511739865" className="text-gold-400 hover:underline">+91 8511739865 (Udyam)</a> / <a href="tel:9274090534" className="text-gold-400 hover:underline">+91 9274090534</a></p>
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
