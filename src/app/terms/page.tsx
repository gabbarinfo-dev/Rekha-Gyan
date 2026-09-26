import React from "react";
import Link from "next/link";
import { BookCheck, AlertCircle, FileText, CheckCircle2, ShieldCheck, Mail, Phone, MapPin, Scale, Copyright, CreditCard, UserX } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions — REKHA GYAN",
  description: "Terms and conditions, payment terms, intellectual property, acceptable use, and service policies for REKHA GYAN, a unit of GABBARINFO DIGITAL SOLUTIONS.",
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
          User Agreement, Payment Terms, Intellectual Property &amp; Dispute Resolution
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
            By accessing, creating an account on, or purchasing digital consultations from <strong className="text-white">REKHA GYAN</strong> (<a href="https://rekhagyan.online" className="text-gold-400 hover:underline">rekhagyan.online</a> or <a href="https://ai.rekhagyan.online" className="text-gold-400 hover:underline">ai.rekhagyan.online</a>), operated by <strong className="text-white">GABBARINFO DIGITAL SOLUTIONS</strong>, you enter into a legally binding contract governed by these Terms and Conditions and our Privacy and Refund Policies.
          </p>
        </section>

        {/* Clause 2: Service Description & User Responsibilities */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <h2 className="text-lg font-bold text-gold-300 font-serif">2. Service Scope &amp; User Responsibilities</h2>
          <p>
            REKHA GYAN offers an automated software platform synthesizing Sanskrit texts with multimodal computer vision to analyze palm lines and Vedic planetary charts.
          </p>
          <div className="p-4 rounded-2xl bg-cosmic-900/60 border border-white/10 space-y-2">
            <div className="font-bold text-white text-xs uppercase tracking-wider text-gold-400">User Responsibilities:</div>
            <ul className="list-disc list-inside space-y-1.5 text-slate-300">
              <li><strong className="text-white">Age Requirement:</strong> You must be at least 18 years old, or possess verified parental/legal guardian consent to access paid services.</li>
              <li><strong className="text-white">Accurate Information:</strong> You are responsible for providing authentic birth coordinates (date, accurate time, and place of birth) and clear, unmanipulated palm photos.</li>
              <li><strong className="text-white">Personal Responsibility:</strong> All astrological inferences are subjective guidance and must never replace licensed medical diagnosis, legal counsel, or financial planning. You remain solely responsible for decisions and actions taken in your life.</li>
            </ul>
          </div>
        </section>

        {/* Clause 3: Payment Terms & Pricing Structure */}
        <section className="space-y-4 border-b border-white/5 pb-6">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-gold-400" />
            <h2 className="text-lg font-bold text-gold-300 font-serif">3. Payment Terms &amp; Pricing Structure</h2>
          </div>
          <p>
            All digital consultations and report packs are priced transparently in Indian Rupees (INR):
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-cosmic-900/60 border border-emerald-500/30 space-y-1">
              <div className="font-bold text-emerald-300 text-sm">₹0 Free Reading Tier</div>
              <p className="text-[11px] text-slate-400">
                Complimentary introductory palm scan analysis and basic Vedic summary. 100% free of charge.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-cosmic-900/60 border border-gold-500/30 space-y-1">
              <div className="font-bold text-gold-300 text-sm">₹51 Paid Single Reading</div>
              <p className="text-[11px] text-slate-400">
                Single-session focused AI Astro consultation or palmistry reading with Vedic remedies.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-cosmic-900/60 border border-white/10 space-y-1">
              <div className="font-bold text-white text-sm">₹99 Starter Pack</div>
              <p className="text-[11px] text-slate-400">
                Deep palm analysis, mount elevation scoring, and 1 specific life question answer.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-cosmic-900/60 border border-gold-500/20 space-y-1">
              <div className="font-bold text-amber-300 text-sm">₹599 / ₹1099 Pro &amp; Ultimate Packs</div>
              <p className="text-[11px] text-slate-400">
                Multi-profile support, divisional chart analysis (D9 Navamsha, D10 Dashamsha), and partner matchmaking.
              </p>
            </div>
          </div>
          <ul className="list-disc list-inside space-y-1.5 text-slate-300 pt-2 pl-1">
            <li><strong className="text-white">Payment Methods:</strong> Payments are processed via UPI, Debit/Credit Cards, Net Banking, and digital wallets through licensed RBI-compliant payment gateway partners.</li>
            <li><strong className="text-white">Instant Fulfillment:</strong> Services are digital and fulfilled immediately upon completed payment.</li>
            <li><strong className="text-white">Taxes:</strong> All applicable Goods and Services Tax (GST) or charges are clearly displayed at checkout.</li>
          </ul>
        </section>

        {/* Clause 4: Intellectual Property Rights */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <div className="flex items-center gap-2">
            <Copyright className="w-5 h-5 text-gold-400" />
            <h2 className="text-lg font-bold text-gold-300 font-serif">4. Intellectual Property Ownership</h2>
          </div>
          <p>
            All content, computational prompt engineering architectures, custom Samudrika classification algorithms, visual designs, software source code, graphics, branding, and trademarks (&lsquo;REKHA GYAN&rsquo;) are the exclusive intellectual property of <strong className="text-white">GABBARINFO DIGITAL SOLUTIONS</strong>.
          </p>
          <p>
            Users receive a limited, revocable, non-exclusive, non-transferable personal license to view and download their individual personal reading reports. You may not republish, distribute, sublicense, resell, or commercially exploit any generated content or underlying AI software.
          </p>
        </section>

        {/* Clause 5: Usage Restrictions */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <div className="flex items-center gap-2">
            <UserX className="w-5 h-5 text-gold-400" />
            <h2 className="text-lg font-bold text-gold-300 font-serif">5. Platform Usage Restrictions</h2>
          </div>
          <p>
            You agree not to engage in any of the following prohibited activities:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-300 pl-1">
            <li>Scraping, crawling, or extracting platform data using automated bots, scripts, or spiders.</li>
            <li>Reverse engineering, decompiling, or attempting to discover the source code or proprietary prompt matrices.</li>
            <li>Sharing or selling access to an account across multiple external unverified users.</li>
            <li>Submitting malicious files, manipulated offensive imagery, or exploiting server endpoints.</li>
          </ul>
        </section>

        {/* Clause 6: Limitation of Liability */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <h2 className="text-lg font-bold text-gold-300 font-serif">6. Limitation of Legal Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, <strong className="text-white">GABBARINFO DIGITAL SOLUTIONS</strong>, its owners, directors, developers, and partners shall not be held liable for any direct, indirect, incidental, special, or consequential damages resulting from reliance on astrological predictions, software downtime, or AI interpretation inaccuracies. In any event, our total cumulative liability shall be capped at the exact amount paid by you for the specific consultation session.
          </p>
        </section>

        {/* Clause 7: Dispute Resolution & Governing Law */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-gold-400" />
            <h2 className="text-lg font-bold text-gold-300 font-serif">7. Dispute Resolution &amp; Governing Law</h2>
          </div>
          <p>
            These Terms are governed by and construed in accordance with the laws of India.
          </p>
          <div className="p-4 rounded-xl bg-cosmic-900/60 border border-white/10 space-y-1.5 text-xs">
            <p><strong className="text-white">Amicable Settlement:</strong> Parties agree to first attempt resolving any dispute, claim, or controversy through good-faith mutual discussion via our Grievance Desk (<a href="mailto:grievance@rekhagyan.online" className="text-gold-400 hover:underline">grievance@rekhagyan.online</a>) within 30 days of notice.</p>
            <p><strong className="text-white">Arbitration &amp; Jurisdiction:</strong> If unresolved, disputes shall be referred to sole arbitration under the Indian Arbitration and Conciliation Act, 1996. The seat and venue of arbitration shall be <strong className="text-white">Ahmedabad, Gujarat, India</strong>. The courts in Ahmedabad, Gujarat retain exclusive legal jurisdiction.</p>
          </div>
        </section>

        {/* Clause 8: Official Contact Information */}
        <section className="space-y-3 bg-cosmic-900/80 p-6 rounded-2xl border border-gold-500/20">
          <h2 className="text-base font-bold text-gold-300 font-serif">8. Official Legal &amp; Grievance Redressal Information</h2>
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
              <p><strong className="text-white">Phone Numbers:</strong> <a href="tel:8511739865" className="text-gold-400 hover:underline">+91 8511739865 (Udyam)</a> / <a href="tel:9274090534" className="text-gold-400 hover:underline">+91 9274090534</a></p>
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
