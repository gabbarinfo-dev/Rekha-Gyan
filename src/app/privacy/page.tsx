import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, Cookie, Server, UserCheck, Trash2, Mail, Phone, MapPin, EyeOff } from "lucide-react";

export const metadata = {
  title: "Privacy Policy & Cookies — REKHA GYAN",
  description: "DPDP Act 2023 & GDPR compliant privacy policy, cookie details, and data deletion process for REKHA GYAN, a unit of GABBARINFO DIGITAL SOLUTIONS.",
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
          Privacy &amp; Cookie Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Compliance with India&apos;s Digital Personal Data Protection (DPDP) Act 2023, Information Technology Act 2000, and Global GDPR Standards.
        </p>
        <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] text-gold-300 font-mono">
          Last Updated &amp; Effective: September 2026 | Location: Ahmedabad, Gujarat, India
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
        
        {/* Section 1: Intro */}
        <section className="space-y-3 border-b border-white/5 pb-6">
          <h2 className="text-lg font-bold text-gold-300 font-serif">1. Introduction &amp; Scope</h2>
          <p>
            Welcome to <strong className="text-white">REKHA GYAN</strong> (accessible via our primary website <a href="https://rekhagyan.online" className="text-gold-400 hover:underline">rekhagyan.online</a> and web application <a href="https://ai.rekhagyan.online" className="text-gold-400 hover:underline">ai.rekhagyan.online</a>, hereinafter referred to as &ldquo;Platform&rdquo;, &ldquo;We&rdquo;, &ldquo;Our&rdquo;, or &ldquo;Us&rdquo;), owned and operated by <strong className="text-white">GABBARINFO DIGITAL SOLUTIONS</strong>, headquartered at <strong className="text-white">503, K Block, Savvy Swaraj, Jagatpur, Ahmedabad, Gujarat - 382470, India</strong>.
          </p>
          <p>
            This Privacy Policy governs the collection, processing, storage, and protection of your personal and sensitive data when you utilize our AI-powered Vedic astrology and Samudrika palmistry analytical services.
          </p>
        </section>

        {/* Section 2: Types of Data Collected */}
        <section className="space-y-4 border-b border-white/5 pb-6">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-gold-400" />
            <h2 className="text-lg font-bold text-gold-300 font-serif">2. Types of User Data We Collect</h2>
          </div>
          <p>
            To perform synthesis of traditional Vedic Horary (Kundli) and Samudrika Palmistry, we collect specific data categories:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-cosmic-900/60 border border-gold-500/20 space-y-2">
              <h3 className="font-bold text-gold-400 text-xs uppercase tracking-wider">A. Identity &amp; Contact Data</h3>
              <p className="text-xs text-slate-400">
                Full Name, Email Address, and Phone Number (used for user authentication, WhatsApp verification, transaction confirmations, and customer support).
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-cosmic-900/60 border border-gold-500/20 space-y-2">
              <h3 className="font-bold text-gold-400 text-xs uppercase tracking-wider">B. Astrological Coordinates</h3>
              <p className="text-xs text-slate-400">
                Date of Birth, Time of Birth, Place of Birth (Latitude &amp; Longitude), and Gender. Utilized exclusively to construct planetary ephemeris charts (Kundli, D1, D9 Navamsha, D10 Dashamsha).
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-cosmic-900/60 border border-gold-500/20 space-y-2">
              <h3 className="font-bold text-gold-400 text-xs uppercase tracking-wider">C. Biometric Imagery (Palm Photos)</h3>
              <p className="text-xs text-slate-400">
                User-uploaded photographs of palms. Processed via computer vision pipelines to measure palm contours, mounts (Parvatas), and line vectors (Rekhas).
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-cosmic-900/60 border border-gold-500/20 space-y-2">
              <h3 className="font-bold text-gold-400 text-xs uppercase tracking-wider">D. Technical &amp; Usage Logs</h3>
              <p className="text-xs text-slate-400">
                IP address, browser type, device identifiers, and system logs recorded for security, spam prevention, and payment fraud verification.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Data Protection, Storage & Third-Party Sharing */}
        <section className="space-y-4 border-b border-white/5 pb-6">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-gold-400" />
            <h2 className="text-lg font-bold text-gold-300 font-serif">3. Data Protection, Storage &amp; Third-Party Sharing</h2>
          </div>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li>
              <strong className="text-white">Ephemeral Processing:</strong> Palm photographs and raw biometric imagery are processed ephemerally in volatile memory to calculate line vectors and are not stored in persistent third-party databases.
            </li>
            <li>
              <strong className="text-white">Encryption in Transit &amp; at Rest:</strong> All web traffic is strictly encrypted using industry-standard 256-bit TLS 1.3 cryptographic protocols. Stored account data is protected with AES-256 encryption.
            </li>
            <li>
              <strong className="text-white">Zero Third-Party Advertising Sharing:</strong> We do <span className="underline font-bold">NOT</span> sell, rent, trade, or monetize your personal data, palm photographs, or astrological charts with third-party advertising networks, data brokers, or marketing firms.
            </li>
            <li>
              <strong className="text-white">Authorized Infrastructure Providers:</strong> Data is processed exclusively through trusted, SOC-2/ISO compliant cloud infrastructure (hosting, authentication) and RBI-licensed payment gateways strictly to deliver the service.
            </li>
            <li>
              <strong className="text-white">Payment Card Data:</strong> We do not store or process payment card numbers, CVVs, or UPI PINs on our servers. All transactions are securely handled by licensed payment aggregator partners.
            </li>
          </ul>
        </section>

        {/* Section 4: Cookie Policy */}
        <section className="space-y-4 border-b border-white/5 pb-6">
          <div className="flex items-center gap-2">
            <Cookie className="w-5 h-5 text-gold-400" />
            <h2 className="text-lg font-bold text-gold-300 font-serif">4. Use of Cookies &amp; Tracking Technologies</h2>
          </div>
          <p>
            Cookies are small text files placed on your device to ensure platform functionality, remember your session preferences, and protect your account. We utilize the following categories of cookies:
          </p>
          <div className="space-y-3 pt-1">
            <div className="p-3.5 rounded-xl bg-cosmic-900/60 border border-white/10 space-y-1">
              <strong className="text-gold-300 text-xs uppercase tracking-wider">A. Essential &amp; Authentication Cookies (Strictly Necessary)</strong>
              <p className="text-xs text-slate-400">
                Required for core operations, such as logging into your account, maintaining active session state, security verification, and accessing purchased consultation credits. Disabling these cookies will prevent the application from functioning.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-cosmic-900/60 border border-white/10 space-y-1">
              <strong className="text-gold-300 text-xs uppercase tracking-wider">B. Preference &amp; Functionality Cookies</strong>
              <p className="text-xs text-slate-400">
                Remember your UI settings (such as language selection: English, Hindi, Hinglish; sound preferences; theme preferences) across browsing sessions.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-cosmic-900/60 border border-white/10 space-y-1">
              <strong className="text-gold-300 text-xs uppercase tracking-wider">C. Analytical &amp; Performance Cookies</strong>
              <p className="text-xs text-slate-400">
                Collect aggregated, anonymized metrics on page load times, error occurrences, and navigation patterns to help us optimize server performance and fix AI timeout issues.
              </p>
            </div>
          </div>
          <p className="text-slate-400 text-xs pt-1">
            <strong className="text-white">Managing Cookies:</strong> You can configure your web browser settings to block or delete cookies at any time. However, please note that blocking essential cookies will break account authentication and live AI consultation features.
          </p>
        </section>

        {/* Section 5: Data & Account Deletion Protocol */}
        <section className="space-y-4 border-b border-white/5 pb-6">
          <div className="flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-rose-400" />
            <h2 className="text-lg font-bold text-rose-300 font-serif">5. User Data &amp; Account Deletion Process</h2>
          </div>
          <p>
            Under the Digital Personal Data Protection (DPDP) Act 2023 and GDPR (&ldquo;Right to be Forgotten&rdquo;), every user retains the absolute right to have their account, uploaded images, birth details, and reading history permanently purged.
          </p>
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 space-y-3 text-xs">
            <div className="font-bold text-rose-300 text-sm">How to Request Account &amp; Data Deletion:</div>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-200">
              <li>
                Send an email from your registered email address to <a href="mailto:contactus@rekhagyan.online" className="text-gold-300 font-semibold underline">contactus@rekhagyan.online</a>.
              </li>
              <li>
                Subject line: <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-white font-semibold">&ldquo;Data Deletion Request&rdquo;</span> or <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-white font-semibold">&ldquo;Account Deletion Request&rdquo;</span>.
              </li>
              <li>
                Include your registered phone number / email address and any active account handle in the body.
              </li>
            </ol>
            <div className="pt-1 text-slate-300 border-t border-rose-500/20 space-y-1">
              <p>
                <strong className="text-white">Timeline:</strong> Your deletion request will be formally acknowledged within <strong className="text-white">24–48 hours</strong>. Complete deletion of all personal identifiers, palm scan records, and consultation history will be permanently completed within <strong className="text-white">7 to 14 business days</strong>.
              </p>
              <p className="text-[11px] text-slate-400 italic">
                *Note: Basic billing invoice records required strictly under statutory taxation and financial audit laws (e.g. GST/Income Tax) will be archived securely for the legally mandated period.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Grievance Officer & Contact Information */}
        <section className="space-y-3 bg-cosmic-900/80 p-6 rounded-2xl border border-gold-500/20">
          <h2 className="text-base font-bold text-gold-300 font-serif">6. Grievance Officer &amp; Legal Entity Information</h2>
          <p className="text-xs text-slate-300">
            In compliance with the Information Technology Act 2000, Rules made thereunder, and the DPDP Act 2023, the details of our legal entity and designated Grievance Officer are as follows:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300 pt-1">
            <div className="space-y-1.5">
              <p><strong className="text-white">Legal Entity Name:</strong> GABBARINFO DIGITAL SOLUTIONS</p>
              <p><strong className="text-white">Brand Name:</strong> REKHA GYAN</p>
              <p><strong className="text-white">Udyam Registration:</strong> UDYAM-GJ-01-0683309</p>
              <p><strong className="text-white">Registered Office:</strong> 503, K Block, Savvy Swaraj, Jagatpur, Ahmedabad, Gujarat - 382470, India</p>
            </div>
            <div className="space-y-1.5">
              <p><strong className="text-white">Official Support Email:</strong> <a href="mailto:contactus@rekhagyan.online" className="text-gold-400 hover:underline">contactus@rekhagyan.online</a></p>
              <p><strong className="text-white">Grievance Email:</strong> <a href="mailto:grievance@rekhagyan.online" className="text-gold-400 hover:underline">grievance@rekhagyan.online</a></p>
              <p><strong className="text-white">Helpline Numbers:</strong> <a href="tel:8511739865" className="text-gold-400 hover:underline">+91 8511739865</a> / <a href="tel:9274090534" className="text-gold-400 hover:underline">+91 9274090534</a></p>
              <p><strong className="text-white">Response Time:</strong> 24–48 Hours</p>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 pt-2 border-t border-white/5">
            *Formal acknowledgment timeline: Within 24 to 48 hours. Redressal timeline: Within 15 calendar days from receipt of grievance.
          </p>
        </section>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
        <Link href="/" className="text-gold-400 hover:underline">Return to Home</Link>
        <span>&bull;</span>
        <Link href="/terms-and-conditions" className="text-gold-400 hover:underline">Terms &amp; Conditions</Link>
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
