import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, User, Clock, ShieldCheck, MessageSquare, Building2 } from "lucide-react";

export const metadata = {
  title: "Contact Us & Grievance Desk — REKHA GYAN",
  description: "Official contact details, legal entity information, and grievance redressal officer for REKHA GYAN, a unit of GABBARINFO DIGITAL SOLUTIONS.",
};

export default function ContactPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20 text-gold-400 mb-2">
          <Mail className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-wide">
          Contact Us &amp; Grievance Desk
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Official Merchant Information, Consumer Support &amp; Statutory Redressal Details
        </p>
        <div className="inline-block px-4 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] text-gold-300 font-mono">
          Headquartered in Ahmedabad, Gujarat, India
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

      {/* Core Entity Card */}
      <div className="cosmic-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
        <div className="flex items-center gap-2.5 text-gold-300 font-serif font-bold text-lg border-b border-white/5 pb-4">
          <Building2 className="w-5 h-5 text-gold-400" />
          <span>Official Business &amp; Merchant Particulars</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300">
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-cosmic-900/70 border border-white/5 space-y-1">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Legal Entity Name</div>
              <div className="text-sm sm:text-base font-bold text-white font-serif">GABBARINFO DIGITAL SOLUTIONS</div>
            </div>

            <div className="p-4 rounded-2xl bg-cosmic-900/70 border border-white/5 space-y-1">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Brand / Platform Name</div>
              <div className="text-sm sm:text-base font-bold text-gold-300 font-serif">
                Rekha Gyan <span className="text-xs font-normal text-slate-400">(A unit of GABBARINFO DIGITAL SOLUTIONS)</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cosmic-900/70 border border-white/5 space-y-1">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Udyam Registration Number</div>
              <div className="text-sm font-mono text-gold-400 font-bold">UDYAM-GJ-01-0683309</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-cosmic-900/70 border border-white/5 space-y-1">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold-400" />
                <span>Registered Office Address (Physical Address)</span>
              </div>
              <div className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                503, K Block, Savvy Swaraj, Jagatpur, Ahmedabad, Gujarat - 382470, India
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cosmic-900/70 border border-white/5 space-y-1">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gold-400" />
                <span>Official Response Time</span>
              </div>
              <div className="text-xs sm:text-sm text-emerald-400 font-bold">
                24–48 Hours
              </div>
              <div className="text-[11px] text-slate-400">
                All inquiries received through email or helpline are formally responded to within 24 to 48 hours.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Direct Channels & Grievance Cell */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Support Channels Card */}
        <div className="cosmic-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
          <div className="flex items-center gap-2 text-gold-300 font-serif font-bold text-base">
            <MessageSquare className="w-5 h-5 text-gold-400" />
            <span>Customer Support Desk</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Reach out to our customer care team for inquiries regarding consultations, report generation, technical issues, subscription billing, or refund claims.
          </p>

          <div className="space-y-4 pt-2">
            <a
              href="mailto:contactus@rekhagyan.online"
              className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-cosmic-900/70 border border-white/10 hover:border-gold-500/40 transition-colors group"
            >
              <div className="w-9 h-9 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 group-hover:scale-105 transition-transform flex-shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Official Business Email</div>
                <div className="text-xs sm:text-sm font-mono text-white font-medium group-hover:text-gold-300 transition-colors">
                  contactus@rekhagyan.online
                </div>
              </div>
            </a>

            <div className="p-3.5 rounded-2xl bg-cosmic-900/70 border border-white/10 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Official Support Phone Numbers</div>
                  <div className="text-[11px] text-slate-500">Call / WhatsApp Support</div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <a
                  href="tel:8511739865"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/5 hover:bg-gold-500/10 border border-white/5 hover:border-gold-500/30 text-white hover:text-gold-300 font-mono text-xs transition-colors"
                >
                  <span>+91 8511739865</span>
                  <span className="text-[9px] text-gold-400 uppercase font-sans">(Udyam)</span>
                </a>
                <a
                  href="tel:9274090534"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/5 hover:bg-gold-500/10 border border-white/5 hover:border-gold-500/30 text-white hover:text-gold-300 font-mono text-xs transition-colors"
                >
                  <span>+91 9274090534</span>
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-cosmic-900/70 border border-white/10">
              <div className="w-9 h-9 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 flex-shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Operational Hours</div>
                <div className="text-xs text-white font-medium">
                  Monday to Saturday: 10:00 AM – 7:00 PM IST
                </div>
                <div className="text-[10px] text-slate-500">Tickets received on Sundays are processed on the next business day.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Grievance Redressal Card */}
        <div className="cosmic-card rounded-3xl p-6 sm:p-8 border border-gold-500/20 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gold-300 font-serif font-bold text-base">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Statutory Grievance Redressal Officer</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              In accordance with the <strong className="text-white">Information Technology Act 2000</strong> and the <strong className="text-white">Digital Personal Data Protection Act 2023</strong>, the dedicated officer for all complaints, privacy escalations, and payment disputes is:
            </p>

            <div className="p-4 rounded-2xl bg-cosmic-900/90 border border-gold-500/30 space-y-2.5 text-xs">
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-gold-400" />
                <span className="text-white font-bold text-sm">Grievance Redressal Desk</span>
              </div>
              <div className="space-y-1 text-slate-300">
                <div><strong className="text-slate-400">Designation:</strong> Statutory Grievance &amp; Compliance Cell</div>
                <div><strong className="text-slate-400">Entity:</strong> GABBARINFO DIGITAL SOLUTIONS</div>
                <div>
                  <strong className="text-slate-400">Grievance Email:</strong>{" "}
                  <a href="mailto:grievance@rekhagyan.online" className="text-gold-400 hover:underline font-mono">
                    grievance@rekhagyan.online
                  </a>
                </div>
                <div>
                  <strong className="text-slate-400">Helpline:</strong>{" "}
                  <a href="tel:8511739865" className="text-gold-400 hover:underline font-mono">
                    +91 8511739865
                  </a>{" "}
                  /{" "}
                  <a href="tel:9274090534" className="text-gold-400 hover:underline font-mono">
                    +91 9274090534
                  </a>
                </div>
                <div><strong className="text-slate-400">Physical Address:</strong> 503, K Block, Savvy Swaraj, Jagatpur, Ahmedabad, Gujarat - 382470, India</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-[11px] space-y-1">
              <div className="font-semibold text-gold-300">Statutory Redressal Timelines:</div>
              <ul className="list-disc list-inside space-y-0.5 text-slate-400">
                <li>Formal acknowledgment of grievance: Within 24 – 48 hours.</li>
                <li>Complete dispute resolution: Within 15 business days.</li>
              </ul>
            </div>
          </div>

          <div className="pt-4 text-center">
            <a
              href="mailto:contactus@rekhagyan.online?subject=Support%20or%20Grievance%20Inquiry%20-%20REKHA%20GYAN"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-gold-500 to-amber-600 text-cosmic-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity"
            >
              <Mail className="w-4 h-4" />
              <span>Email Support Team Directly</span>
            </a>
          </div>
        </div>

      </div>

      {/* Navigation Footer */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 pt-4">
        <Link href="/" className="text-gold-400 hover:underline">Return to Home</Link>
        <span>&bull;</span>
        <Link href="/privacy-policy" className="text-gold-400 hover:underline">Privacy Policy</Link>
        <span>&bull;</span>
        <Link href="/terms-and-conditions" className="text-gold-400 hover:underline">Terms &amp; Conditions</Link>
        <span>&bull;</span>
        <Link href="/refund-policy" className="text-gold-400 hover:underline">Refund Policy</Link>
        <span>&bull;</span>
        <Link href="/disclaimer" className="text-gold-400 hover:underline">Disclaimer</Link>
      </div>
    </div>
  );
}
