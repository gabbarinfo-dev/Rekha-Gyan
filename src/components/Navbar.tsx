"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Compass, BookOpen, Menu, X, ShieldCheck, User, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import AuthModal from "./AuthModal";
import AdminPanelModal from "./AdminPanelModal";

export default function Navbar() {
  const { user, isLoggedIn, isAdmin, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-gold-500/15 bg-cosmic-950/95 backdrop-blur-xl">
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
                AI Palmist &amp; Astrologer
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

          {/* Action Button & Auth Badge */}
          <div className="hidden md:flex items-center gap-3">
            {/* Super Admin Panel Trigger */}
            {isAdmin && (
              <button
                type="button"
                onClick={() => setAdminModalOpen(true)}
                className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-gold-400 to-amber-500 text-cosmic-950 text-xs font-black flex items-center gap-1.5 shadow-lg shadow-gold-500/25 hover:scale-105 active:scale-95 transition-all"
                title="Super Admin Dashboard & Users"
              >
                <span>👑</span>
                <span>Admin Panel</span>
              </button>
            )}

            {isLoggedIn ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-gold-500/25 text-xs text-slate-200">
                <User className="w-3.5 h-3.5 text-gold-400" />
                <span className="font-semibold text-white max-w-[120px] truncate">
                  {user?.name || user?.phone}
                </span>
                <button
                  onClick={logout}
                  title="Log Out"
                  className="p-1 hover:text-red-400 text-slate-400 transition-colors ml-1"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setAuthModalOpen(true)}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-gold-400" />
                <span>Login</span>
              </button>
            )}

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
            {isAdmin && (
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setAdminModalOpen(true);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-gold-400 to-amber-500 text-cosmic-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-gold-500/25"
              >
                <span>👑</span>
                <span>Open Super Admin Command Center</span>
              </button>
            )}

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
              Vedic Kundali
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-200 hover:text-gold-300"
            >
              Astro Blog
            </Link>

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              {isLoggedIn ? (
                <div className="flex items-center justify-between px-3 py-2 text-sm text-slate-300">
                  <span>Logged in as <strong>{user?.name || user?.phone}</strong></span>
                  <button onClick={logout} className="text-xs text-red-400 font-semibold">
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setAuthModalOpen(true);
                  }}
                  className="w-full py-2.5 rounded-xl bg-white/5 text-slate-200 text-sm font-semibold text-center border border-white/10"
                >
                  Sign In with Phone
                </button>
              )}

              <Link
                href="/#reading-form"
                onClick={() => setMobileOpen(false)}
                className="block w-full py-3 rounded-xl bg-gradient-to-r from-gold-300 to-amber-400 text-cosmic-950 text-center font-bold text-sm uppercase tracking-wider"
              >
                Get Free Reading
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

      {/* Super Admin Panel Modal */}
      <AdminPanelModal isOpen={adminModalOpen} onClose={() => setAdminModalOpen(false)} />
    </>
  );
}
