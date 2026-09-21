import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, EyeOff, Server, UserCheck, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — REKHA GYAN",
  description: "DPDP Act 2023 & GDPR compliant privacy policy for REKHA GYAN (rekhagyan.online & ai.rekhagyan.online). Strict protection for birth data and palm imagery.",
};

export default function PrivacyPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20 text-gold-400 mb-2">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-wide">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Compliance with India&apos;s Digital Personal Data Protection (DPDP) Act 2023, Information Technology Act 2000, and Global GDPR Standards.
        </p>
        <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] text-gold-300 font-mono">
          Last Updated &amp; Effective: September 2026 | Location: Ahmedabad, Gujarat, India
        </div>
      </div>

      {/* Main Content */}
      <div className="cosmic-card rounded-3xl p-6 sm:p-10 border border-white/10 space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
        
        {/* Intro */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <h2 className="text-lg font-bold text-gold-300 font-serif">1. Introduction &amp; Scope</h2>
          <p>
            Welcome to <strong className="text-white">REKHA GYAN</strong> (accessible via our primary website <a href="https://rekhagyan.online" className="text-gold-400 hover:underline">rekhagyan.online</a> and web application <a href="https://ai.rekhagyan.online" className="text-gold-400 hover:underline">ai.rekhagyan.online</a>, hereinafter referred to as &ldquo;Platform&rdquo;, &ldquo;We&rdquo;, &ldquo;Our&rdquo;, or &ldquo;Us&rdquo;). We are operated from <strong className="text-white">Ahmedabad, Gujarat, India</strong>.
          </p>
          <p>
            This Privacy Policy governs the collection, processing, storage, and protection of your personal and sensitive data when you utilize our AI-powered Vedic astrology and Samudrika palmistry analytical services. We respect individual autonomy and hold the safeguarding of your biological imagery and astrological coordinates to the highest privacy standards.
          </p>
        </section>

        {/* Sensitive Data Protection */}
        <section className="space-y-4 border-b border-white/5 pb-6">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-gold-400" />
            <h2 className="text-lg font-bold text-gold-300 font-serif">2. Strict Protection of Sensitive Personal Data</h2>
          </div>
          <p>
            To perform synthesis of traditional Vedic Horary (Kundli) and Samudrika Palmistry, we collect specific data categories that are treated with rigorous security protocols:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-cosmic-900/60 border border-gold-500/20 space-y-2">
              <h3 className="font-bold text-gold-400 text-xs uppercase tracking-wider">A. Birth &amp; Planetary Coordinates</h3>
              <p className="text-xs text-slate-400">
                Full Name, Gender, Exact Date of Birth, Time of Birth, and Place of Birth (Latitude &amp; Longitude). This information is exclusively utilized to construct planetary ephemeris charts (Kundli/D1-D9 divisional charts).
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-cosmic-900/60 border border-gold-500/20 space-y-2">
              <h3 className="font-bold text-gold-400 text-xs uppercase tracking-wider">B. Palm Images &amp; Biometric Imagery</h3>
              <p className="text-xs text-slate-400">
                Photographs of hands uploaded for palm reading. These images are processed exclusively via computer vision pipelines to measure palm contours, mounts (Parvatas), and line vectors (Rekhas).
              </p>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
            <strong>Zero Reselling &amp; Non-Sharing Pledge:</strong> We do <span className="underline">NOT</span> sell, rent, license, or monetize your palm photographs, personal identities, or birth charts to third-party advertisers, data aggregators, or unauthorized external entities.
          </div>
        </section>

        {/* Security & Encryption */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-gold-400" />
            <h2 className="text-lg font-bold text-gold-300 font-serif">3. Encryption &amp; Data Storage Architecture</h2>
          </div>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li>
              <strong className="text-white">Encryption in Transit:</strong> All data transmitted between your browser and our servers is secured via 256-bit TLS 1.3 cryptographic protocols.
            </li>
            <li>
              <strong className="text-white">Storage Security:</strong> Stored user records and image representations are held behind secure firewall architectures with role-based authenticated access.
            </li>
            <li>
              <strong className="text-white">Payment Data Non-Collection:</strong> We do not store or process sensitive credit/debit card numbers, CVVs, or UPI PINs. All payment transactions are executed securely through RBI-licensed payment gateway partners.
            </li>
          </ul>
        </section>

        {/* DPDP Act 2023 & GDPR Compliance */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-gold-400" />
            <h2 className="text-lg font-bold text-gold-300 font-serif">4. User Rights under DPDP Act 2023 &amp; GDPR</h2>
          </div>
          <p>
            As a data principal under the Digital Personal Data Protection Act 2023 (India) and GDPR, you retain the following fundamental rights:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300 pl-1">
            <li><strong className="text-white">Right to Access &amp; Summary:</strong> You may request a summary of the personal data you have shared with our platform.</li>
            <li><strong className="text-white">Right to Correction &amp; Erasure:</strong> You retain the absolute right to have your birth records, palm images, and generated reports permanently deleted from our servers (&ldquo;Right to be Forgotten&rdquo;).</li>
            <li><strong className="text-white">Right to Grievance Redressal:</strong> You have the right to readily accessible grievance redressal mechanisms regarding any data privacy concern.</li>
          </ul>
        </section>

        {/* Data Retention & Deletion */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <h2 className="text-lg font-bold text-gold-300 font-serif">5. Data Retention &amp; Erasure Protocol</h2>
          <p>
            We retain personal data only for the duration necessary to deliver the purchased consultation reports and fulfill legitimate service delivery or statutory legal obligations. If an account is inactive or upon receiving a formal deletion request, your palm photos and personal birth records will be permanently purged within thirty (30) business days.
          </p>
        </section>

        {/* Grievance Officer */}
        <section className="space-y-3 bg-cosmic-900/80 p-5 rounded-2xl border border-gold-500/20">
          <h2 className="text-base font-bold text-gold-300 font-serif">6. Grievance Officer &amp; Redressal Mechanism</h2>
          <p className="text-xs text-slate-300">
            In compliance with the Information Technology Act 2000, Rules made thereunder, and the DPDP Act 2023, the details of our designated Grievance Officer are as follows:
          </p>
          <div className="text-xs space-y-1.5 text-slate-300 font-sans pt-1">
            <p><strong className="text-white">Grievance Officer:</strong> Nishant Dantare</p>
            <p><strong className="text-white">Designation:</strong> Compliance &amp; Data Protection Officer</p>
            <p><strong className="text-white">Official Support Email:</strong> <a href="mailto:contactus@rekhagyan.online" className="text-gold-400 hover:underline">contactus@rekhagyan.online</a></p>
            <p><strong className="text-white">Support &amp; Grievance Contact Number:</strong> <a href="tel:9274090534" className="text-gold-400 hover:underline">9274090534</a></p>
            <p><strong className="text-white">Operational Jurisdiction / City:</strong> Ahmedabad, Gujarat, India</p>
            <p className="text-[11px] text-slate-400 pt-1">
              *Acknowledgment timeline: Within 24 to 48 hours. Redressal timeline: Within 15 calendar days from receipt of grievance.
            </p>
          </div>
        </section>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
        <Link href="/" className="text-gold-400 hover:underline">Return to Home</Link>
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
