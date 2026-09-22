"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart, Mail, Phone, MapPin, AlertCircle, Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gold-500/15 bg-cosmic-950/95 relative z-10 pt-16 pb-12 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-white/5">
          
          {/* Col 1: Brand, Persona & Grievance Summary */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-gold-400 to-amber-500 flex items-center justify-center text-cosmic-950 font-bold text-xl shadow-lg shadow-gold-500/20">
                र
              </div>
              <span className="text-2xl font-black text-white tracking-wider font-serif">
                REKHA GYAN
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Duniya ka sabse pehla AI Palmist aur Vedic Astrologer. Authentic classical Samudrika Shastra &amp; Vedic scriptures ko real-time computer vision ke sath synthesize karta hai.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>DPDP Act 2023 &amp; GDPR Compliant</span>
            </div>
          </div>

          {/* Col 2: Navigation & Portals */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-gold-400 font-serif">
              Sacred Portals
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/#reading-form" className="hover:text-gold-300 transition-colors">
                  Ask REKHA (Live Reading)
                </Link>
              </li>
              <li>
                <Link href="/#why-rekha" className="hover:text-gold-300 transition-colors">
                  Why REKHA vs Traditional Babas
                </Link>
              </li>
              <li>
                <Link href="/#classical-sources" className="hover:text-gold-300 transition-colors">
                  50+ Classical Shastras
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gold-300 transition-colors">
                  Vedic Astro &amp; Palmistry Blog
                </Link>
              </li>
              <li>
                <a href="https://rekhagyan.online" target="_blank" rel="noopener noreferrer" className="hover:text-gold-300 transition-colors flex items-center gap-1 text-gold-400/90">
                  <span>Website: Rekhagyan.online</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Payment Compliance Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-gold-400 font-serif">
              Compliance &amp; Policies
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/privacy-policy" className="hover:text-gold-300 transition-colors">
                  Privacy Policy (DPDP &amp; GDPR)
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-gold-300 transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-gold-300 transition-colors">
                  Refund &amp; Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-gold-300 transition-colors">
                  Disclaimer &amp; Advisory
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-gold-300 transition-colors">
                  Contact Us &amp; Grievance Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Contact & Support Info */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-gold-400 font-serif">
              Official Contact &amp; Support
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-gold-400 mt-0.5 flex-shrink-0" />
                <a href="mailto:contactus@rekhagyan.online" className="hover:text-gold-300 transition-colors break-all">
                  contactus@rekhagyan.online
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-400 mt-0.5 flex-shrink-0" />
                <a href="tel:9274090534" className="hover:text-gold-300 transition-colors">
                  +91 9274090534
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold-400 mt-0.5 flex-shrink-0" />
                <span>Ahmedabad, Gujarat, India</span>
              </div>
              <div className="pt-2 text-[11px] text-slate-400 border-t border-white/5 space-y-0.5">
                <div>
                  <strong className="text-slate-300">Grievance email:</strong>{" "}
                  <a href="mailto:grievance@rekhagyan.online" className="text-gold-400 hover:text-gold-300 transition-colors">
                    grievance@rekhagyan.online
                  </a>
                </div>
                <div><strong className="text-slate-300">Response:</strong> 24-48 Hours</div>
              </div>
            </div>
          </div>

        </div>

        {/* Mandatory Statutory Notice */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-[11px] text-slate-400 leading-relaxed space-y-1 text-center sm:text-left">
          <div className="flex items-center gap-1.5 font-semibold text-gold-400/90 justify-center sm:justify-start">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Statutory Disclaimer:</span>
          </div>
          <p className="italic">
            &ldquo;Astrology &amp; Palmistry readings are based on traditional scriptures and AI synthesis. Readings are provided for guidance and informational/entertainment purposes only. We do not guarantee 100% precision or life outcomes. AI can make mistakes.&rdquo;
          </p>
        </div>

        {/* Bottom Bar: Copyright & Security */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} REKHA GYAN. All rights reserved. Registered in Ahmedabad, Gujarat, India.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400/80">
              <Lock className="w-3 h-3" />
              <span>256-Bit SSL Encrypted Checkout</span>
            </span>
            <span>&bull;</span>
            <div className="flex items-center gap-1">
              <span>Crafted for Seekers</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500 inline ml-0.5" />
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
