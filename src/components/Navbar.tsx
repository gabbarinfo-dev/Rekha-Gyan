"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Compass, BookOpen, Menu, X, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold-500/15 bg-cosmic-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-gold-400 via-mystic-violet to-cosmic-800 p-0.5 shadow-lg shadow-gold-500/20 group-hover:shadow-gold-500/40 transition-all">
            <div className="w-full h-full bg-cosmic-950 rounded-[14px] flex items-center justify-center">
              <span className="text-xl font-bold bg-gradient-to-br from-gold-300 via-gold-400 to-amber-200 bg-clip-text text-transparent">
                र
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-wider text-white font-serif">
                REKHA
              </span>
              <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
            </div>
            <p className="text-[10px] tracking-widest uppercase font-medium text-gold-300/80">
              AI Palmist & Astrologer
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          <Link
            href="/#why-rekha"
            className="text-sm font-medium text-slate-300 hover:text-gold-300 transition-colors"
          >
            Why Rekha?
          </Link>
          <Link
            href="/#classical-sources"
            className="text-sm font-medium text-slate-300 hover:text-gold-300 transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-gold-400" />
            50+ Classical Texts
          </Link>
          <Link
            href="/#interactive-reading"
            className="text-sm font-medium text-slate-300 hover:text-gold-300 transition-colors flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-gold-400" />
            Vedic Kundali
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-slate-300 hover:text-gold-300 transition-colors"
          >
            Astro Blog
          </Link>
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 border border-gold-500/20 px-3 py-1.5 rounded-full bg-gold-500/5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Privacy Protected</span>
          </div>
          <Link
            href="/#reading-form"
            className="relative inline-flex items-center justify-center px-5 py-2.5 text-xs uppercase tracking-wider font-bold text-cosmic-950 bg-gradient-to-r from-gold-300 via-gold-400 to-amber-300 rounded-full shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all"
          >
            Get Free Reading
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-xl bg-white/5 text-slate-300 hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 bg-cosmic-900 border-b border-gold-500/20 space-y-3 animate-fadeIn">
          <Link
            href="/#why-rekha"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-200 hover:text-gold-300"
          >
            Why Rekha?
          </Link>
          <Link
            href="/#classical-sources"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-200 hover:text-gold-300"
          >
            50+ Classical Texts
          </Link>
          <Link
            href="/#interactive-reading"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-200 hover:text-gold-300"
          >
            Kundali & Palm Analysis
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-200 hover:text-gold-300"
          >
            Astro Blog
          </Link>
          <div className="pt-2">
            <Link
              href="/#reading-form"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center py-3 text-sm font-bold uppercase tracking-wider text-cosmic-950 bg-gradient-to-r from-gold-300 to-amber-400 rounded-xl"
            >
              Get Free Reading
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
