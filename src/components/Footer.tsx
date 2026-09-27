"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart, Mail, Phone, MapPin, AlertCircle, Lock, CreditCard } from "lucide-react";

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

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
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white tracking-wider font-serif leading-none">
                  REKHA GYAN
                </span>
                <span className="text-[10px] font-semibold text-gold-400/90 tracking-wider uppercase mt-1">
                  A unit of GABBARINFO DIGITAL SOLUTIONS
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Duniya ka sabse pehla AI Palmist aur Vedic Astrologer. Authentic classical Samudrika Shastra &amp; Vedic scriptures ko real-time computer vision ke sath synthesize karta hai.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>DPDP Act 2023 &amp; GDPR Compliant</span>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-gold-400/90 font-serif mb-2.5">
                Connect With Us
              </div>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://www.facebook.com/RekhaGyanAI"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Rekha Gyan on Facebook"
                  title="Facebook - @RekhaGyanAI"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] hover:shadow-lg hover:shadow-[#1877F2]/25 transition-all duration-300 hover:-translate-y-0.5 group"
                >
                  <FacebookIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
                <a
                  href="https://www.instagram.com/rekhagyaniai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Rekha Gyan on Instagram"
                  title="Instagram - @rekhagyaniai"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent hover:shadow-lg hover:shadow-[#e1306c]/25 transition-all duration-300 hover:-translate-y-0.5 group"
                >
                  <InstagramIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
              </div>
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
                <Link href="/subscription" className="hover:text-gold-300 transition-colors flex items-center gap-1.5 text-gold-400/90 font-semibold">
                  <CreditCard className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                  <span>Subscription Plans</span>
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
              <div className="text-[11px] font-semibold text-white">
                GABBARINFO DIGITAL SOLUTIONS
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold-400 mt-0.5 flex-shrink-0" />
                <span className="leading-snug">
                  503, K Block, Savvy Swaraj, Jagatpur, Ahmedabad, Gujarat - 382470, India
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-gold-400 mt-0.5 flex-shrink-0" />
                <a href="mailto:contactus@rekhagyan.online" className="hover:text-gold-300 transition-colors break-all">
                  contactus@rekhagyan.online
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-400 mt-0.5 flex-shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <a href="tel:8511739865" className="hover:text-gold-300 transition-colors">
                    +91 8511739865
                  </a>
                  <a href="tel:9274090534" className="hover:text-gold-300 transition-colors text-slate-400 hover:text-gold-300">
                    +91 9274090534
                  </a>
                </div>
              </div>
              <div className="pt-2 text-[11px] text-slate-400 border-t border-white/5 space-y-0.5">
                <div>
                  <strong className="text-slate-300">Response Time:</strong> 24–48 Hours
                </div>
                <div>
                  <strong className="text-slate-300">Grievance email:</strong>{" "}
                  <a href="mailto:grievance@rekhagyan.online" className="text-gold-400 hover:text-gold-300 transition-colors">
                    grievance@rekhagyan.online
                  </a>
                </div>
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
        <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 border-t border-white/5">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-slate-300 font-medium">
              &copy; 2026 REKHA GYAN. All rights reserved.
            </p>
            <p className="text-slate-400">
              REKHA GYAN is a unit of GABBARINFO DIGITAL SOLUTIONS.
            </p>
            <p className="text-[10px] text-slate-500">
              Savvy Swaraj, Ahmedabad, Gujarat 382470.
            </p>
          </div>
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
