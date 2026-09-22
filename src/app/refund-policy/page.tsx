import React from "react";
import Link from "next/link";
import { RotateCcw, AlertOctagon, CheckCircle, HelpCircle } from "lucide-react";

export const metadata = {
  title: "Refund & Cancellation Policy — REKHA GYAN",
  description: "Strict non-refundable digital service and cancellation policy for REKHA GYAN (rekhagyan.online & ai.rekhagyan.online).",
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
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Clear Terms on Digital Intangible Goods, Instant AI Computation &amp; Subscription Cancellation
        </p>
        <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] text-gold-300 font-mono">
          Last Updated: September 2026 | Location: Ahmedabad, Gujarat, India
        </div>
      </div>

      {/* Non-Refundable Alert Box */}
      <div className="p-6 rounded-3xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs sm:text-sm leading-relaxed space-y-2">
        <div className="flex items-center gap-2 font-bold text-rose-300 uppercase tracking-wider text-xs font-serif">
          <AlertOctagon className="w-5 h-5 flex-shrink-0 text-rose-400" />
          <span>Strict Non-Refundable Policy for Digital Deliverables</span>
        </div>
        <p className="font-medium text-slate-200">
          All purchases made on <strong className="text-white">REKHA GYAN</strong> (<a href="https://rekhagyan.online" className="text-gold-300 hover:underline">rekhagyan.online</a> and <a href="https://ai.rekhagyan.online" className="text-gold-300 hover:underline">ai.rekhagyan.online</a>), including single scan tokens, bundled packs, and subscriptions (₹99, ₹599, ₹1099), constitute customized digital content and instant AI computational analysis. Due to immediate automated digital delivery, <strong className="text-rose-300 uppercase">no refund is applicable after delivery/generation</strong> under any circumstances.
        </p>
      </div>

      {/* Main Content */}
      <div className="cosmic-card rounded-3xl p-6 sm:p-10 border border-white/10 space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
        
        {/* Why Non-Refundable */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <h2 className="text-lg font-bold text-gold-300 font-serif">1. Nature of Digital &amp; Computational Products</h2>
          <p>
            Unlike physical goods, REKHA GYAN provides instant, irrevocable digital products:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300 pl-1">
            <li>
              <strong className="text-white">Instant Server &amp; GPU Resource Consumption:</strong> As soon as you complete your purchase and submit palm images or birth credentials, specialized high-performance AI vision models and Vedic algorithms immediately execute complex planetary and palmistry matrix computations on our cloud infrastructure.
            </li>
            <li>
              <strong className="text-white">Instant Digital Delivery &amp; Non-Refundability:</strong> Insights, divisional charts, and comprehensive palm analysis reports are delivered in real time to your screen and saved to your account. Because personalized digital content and computational AI analysis are irrevocably consumed upon delivery, <strong>refunds and cancellations are strictly non-applicable once the report or reading has been delivered</strong>.
            </li>
          </ul>
        </section>

        {/* Plan Breakdown */}
        <section className="space-y-4 border-b border-white/5 pb-6">
          <h2 className="text-lg font-bold text-gold-300 font-serif">2. Breakdown Across Available Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div className="p-4 rounded-2xl bg-cosmic-900/60 border border-white/10 space-y-2">
              <div className="text-gold-400 font-bold text-sm">₹99 Single Scan Pack</div>
              <p className="text-xs text-slate-400">
                Single-use trial credit. Non-refundable once generated or credited to the account.
              </p>
              <div className="text-[11px] font-semibold text-rose-300">Status: Non-Refundable</div>
            </div>
            <div className="p-4 rounded-2xl bg-cosmic-900/60 border border-gold-500/20 space-y-2">
              <div className="text-gold-400 font-bold text-sm">₹599 Pro Vedic Pack</div>
              <p className="text-xs text-slate-400">
                Multi-query astrological access and deep palmistry synthesis. Non-refundable upon purchase.
              </p>
              <div className="text-[11px] font-semibold text-rose-300">Status: Non-Refundable</div>
            </div>
            <div className="p-4 rounded-2xl bg-cosmic-900/60 border border-gold-500/30 space-y-2">
              <div className="text-gold-400 font-bold text-sm">₹1099 Ultimate Life Pack</div>
              <p className="text-xs text-slate-400">
                Full-tier comprehensive reading, remedies, and lifetime chart storage. Non-refundable.
              </p>
              <div className="text-[11px] font-semibold text-rose-300">Status: Non-Refundable</div>
            </div>
          </div>
        </section>

        {/* Cancellation of Recurring Subscriptions */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <h2 className="text-lg font-bold text-gold-300 font-serif">3. Subscription Cancellation Policy</h2>
          <p>
            If you have subscribed to an auto-renewing or recurring plan:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300 pl-1">
            <li>
              You may cancel your ongoing subscription at any time prior to your next billing renewal date via your user settings or by contacting <a href="mailto:contactus@rekhagyan.online" className="text-gold-400 hover:underline">contactus@rekhagyan.online</a>.
            </li>
            <li>
              Upon successful cancellation, you will continue to enjoy your active benefits until the end of your current paid billing period, after which no further recurring deductions will occur.
            </li>
            <li>
              Past billing charges or unused fractions of an ongoing billing cycle are non-refundable.
            </li>
          </ul>
        </section>

        {/* Technical Exceptions (Duplicate Billing) */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <h2 className="text-lg font-bold text-gold-300 font-serif">4. Exceptions: Technical &amp; Duplicate Billing</h2>
          <p>
            We pride ourselves on transparent, honest merchant conduct. A refund will only be evaluated and processed under the following strict verifiable technical anomaly:
          </p>
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-xs space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-emerald-300">
              <CheckCircle className="w-4 h-4" />
              <span>Verifiable Duplicate Charge</span>
            </div>
            <p className="text-slate-300">
              If your bank or UPI account was debited multiple times for a single purchase attempt due to a payment gateway timeout or network error, the duplicate excess amount will be refunded back to the original payment source within 5 to 7 business days following investigation.
            </p>
          </div>
        </section>

        {/* Dispute & Contact */}
        <section className="space-y-3 bg-cosmic-900/80 p-5 rounded-2xl border border-gold-500/20">
          <h2 className="text-base font-bold text-gold-300 font-serif">5. Contact for Billing &amp; Refund Inquiries</h2>
          <p className="text-xs text-slate-300">
            For any billing discrepancies or payment status inquiries, please contact our support desk with your Transaction ID:
          </p>
          <div className="text-xs space-y-1.5 text-slate-300 font-sans pt-1">
            <p><strong className="text-white">Merchant / Brand:</strong> REKHA GYAN</p>
            <p><strong className="text-white">Official Support Email:</strong> <a href="mailto:contactus@rekhagyan.online" className="text-gold-400 hover:underline">contactus@rekhagyan.online</a></p>
            <p><strong className="text-white">Grievance Email:</strong> <a href="mailto:grievance@rekhagyan.online" className="text-gold-400 hover:underline">grievance@rekhagyan.online</a></p>
            <p><strong className="text-white">Support Phone:</strong> <a href="tel:9274090534" className="text-gold-400 hover:underline">+91 9274090534</a></p>
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
        <Link href="/terms" className="text-gold-400 hover:underline">Terms &amp; Conditions</Link>
        <span>&bull;</span>
        <Link href="/disclaimer" className="text-gold-400 hover:underline">Disclaimer</Link>
        <span>&bull;</span>
        <Link href="/contact" className="text-gold-400 hover:underline">Contact Us</Link>
      </div>
    </div>
  );
}
