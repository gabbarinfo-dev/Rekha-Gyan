import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, User, Clock, ShieldCheck, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Contact Us & Grievance Redressal — REKHA GYAN",
  description: "Official contact details, customer support, and grievance redressal officer for REKHA GYAN (rekhagyan.online & ai.rekhagyan.online).",
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
          Contact Us &amp; Grievance Redressal
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          We are committed to prompt assistance, consumer transparency, and statutory grievance resolution.
        </p>
        <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] text-gold-300 font-mono">
          Headquartered in Ahmedabad, Gujarat, India
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
            Reach out to our customer care team for inquiries regarding consultations, report access, subscription billing, or platform assistance.
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

            <a
              href="tel:9274090534"
              className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-cosmic-900/70 border border-white/10 hover:border-gold-500/40 transition-colors group"
            >
              <div className="w-9 h-9 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 group-hover:scale-105 transition-transform flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Official Support Phone</div>
                <div className="text-xs sm:text-sm font-mono text-white font-medium group-hover:text-gold-300 transition-colors">
                  +91 9274090534
                </div>
              </div>
            </a>

            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-cosmic-900/70 border border-white/10">
              <div className="w-9 h-9 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Operational Headquarters</div>
                <div className="text-xs text-white font-medium">
                  Ahmedabad, Gujarat, India
                </div>
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

            <div className="p-4 rounded-2xl bg-cosmic-900/90 border border-gold-500/30 space-y-3 text-xs">
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-gold-400" />
                <span className="text-white font-bold text-sm">Nishant Dantare</span>
              </div>
              <div className="space-y-1 text-slate-300">
                <div className="text-slate-400 text-[11px]">Designation: Grievance Officer &amp; Compliance Lead</div>
                <div>
                  Email:{" "}
                  <a href="mailto:contactus@rekhagyan.online" className="text-gold-400 hover:underline font-mono">
                    contactus@rekhagyan.online
                  </a>
                </div>
                <div>
                  Phone:{" "}
                  <a href="tel:9274090534" className="text-gold-400 hover:underline font-mono">
                    +91 9274090534
                  </a>
                </div>
                <div>Jurisdiction: Ahmedabad, Gujarat, India</div>
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
        <Link href="/privacy" className="text-gold-400 hover:underline">Privacy Policy</Link>
        <span>&bull;</span>
        <Link href="/terms" className="text-gold-400 hover:underline">Terms &amp; Conditions</Link>
        <span>&bull;</span>
        <Link href="/refund-policy" className="text-gold-400 hover:underline">Refund Policy</Link>
        <span>&bull;</span>
        <Link href="/disclaimer" className="text-gold-400 hover:underline">Disclaimer</Link>
      </div>
    </div>
  );
}
