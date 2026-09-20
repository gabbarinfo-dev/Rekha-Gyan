"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gold-500/15 bg-cosmic-950/90 relative z-10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          {/* Col 1: Brand & Persona */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-gold-400 to-amber-500 flex items-center justify-center text-cosmic-950 font-bold text-xl">
                र
              </div>
              <span className="text-2xl font-black text-white tracking-wider font-serif">
                REKHA
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Duniya ka sabse pehla AI Palmist aur Astrologer jo poore bramhand aur 50+ authentic classical Palmistry &amp; Vedic texts ko minute-by-minute analyze karke aapka accurate horoscope aur palm reading batati hai.
            </p>
            <div className="flex items-center gap-2 text-xs text-gold-300/80">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Certified Classical Vedic &amp; Samudrika Methodology</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
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
                  Why REKHA vs Street Babas
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
            </ul>
          </div>

          {/* Col 3: Legal & Trust */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-gold-400 font-serif">
              Trust &amp; Compliance
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/privacy" className="hover:text-gold-300 transition-colors">
                  Privacy Policy (100% Encrypted)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gold-300 transition-colors">
                  Terms of Consultation
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold-300 transition-colors">
                  About the REKHA Engine
                </Link>
              </li>
              <li className="text-[11px] text-slate-500 pt-2">
                Primary Domain: <span className="text-gold-400 font-mono">rekhagyan.online</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} REKHA GYAN (<a href="https://rekhagyan.online" className="text-gold-400/80 hover:underline">rekhagyan.online</a>). All rights reserved. Classical Vedic wisdom translated for modern seekers.
          </p>
          <div className="flex items-center gap-1">
            <span>Crafted with reverence for Cosmic Dharma</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500 inline ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}
