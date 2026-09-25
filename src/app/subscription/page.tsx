"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Check,
  Users,
  HeartHandshake,
  User,
  ShieldCheck,
  MessageCircle,
  Clock,
  Flame,
  Lock,
  Star,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import AuthModal from "@/components/AuthModal";
import PaywallModal from "@/components/PaywallModal";
import type { SubscriptionTierType } from "@/components/PaywallModal";

export default function SubscriptionPage() {
  const { isLoggedIn, isAdmin } = useAuth();

  const [pendingPlan, setPendingPlan] = useState<SubscriptionTierType | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);

  const handlePay = (plan: SubscriptionTierType) => {
    setPendingPlan(plan);
    if (isLoggedIn || isAdmin) {
      setPaywallOpen(true);
    } else {
      setAuthOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setAuthOpen(false);
    setTimeout(() => setPaywallOpen(true), 200);
  };

  return (
    <div className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-gold-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-purple-600/15 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
            Divine Access Plans
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white leading-tight">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-amber-200 bg-clip-text text-transparent">
              Destiny Access
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Unlock REKHA&apos;s complete AI Palmist &amp; Vedic Astrologer capabilities. One-time payment, instant
            WhatsApp activation within 2 minutes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp Verified
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" /> 256-Bit SSL
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gold-400" /> 2-Min Activation
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> 12,400+ Seekers
            </span>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

          {/* Tier 1: Starter */}
          <div className="relative rounded-3xl p-6 border border-white/10 hover:border-gold-400/50 transition-all duration-300 flex flex-col justify-between bg-cosmic-950/60">
            <div>
              <div className="flex items-center gap-1.5 mb-3 text-xs font-bold uppercase tracking-wider text-slate-300">
                <User className="w-4 h-4 text-slate-400" />
                Starter
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl sm:text-4xl font-black text-white font-serif">₹99</span>
                <span className="text-xs text-slate-400">/ single profile</span>
              </div>
              <p className="text-xs text-slate-300 mb-5 leading-relaxed">Personal self-discovery &amp; deep question answer.</p>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-400" />
                  <span>1 Primary Profile (Permanently locked)</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-400" />
                  <span>4 Dynamic Trust Insights (Palm + Kundali)</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-400" />
                  <span>1 Deep Question Solution + 3-Yr Timeline</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-slate-500">
                  <span className="text-red-400 font-bold shrink-0 mt-0.5">✕</span>
                  <span>No Partner Synastry / No Matchmaking</span>
                </li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => handlePay("trial_99")}
              className="mt-7 w-full py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all hover:scale-[1.03] active:scale-[0.97] flex items-center justify-center gap-2 bg-gradient-to-r from-slate-400 to-slate-300 hover:from-gold-300 hover:to-amber-300 text-cosmic-950"
            >
              <Flame className="w-3.5 h-3.5" />
              Pay ₹99
            </button>
          </div>

          {/* Tier 2: Duo Pass – Featured */}
          <div className="relative rounded-3xl p-6 border border-gold-400 bg-gradient-to-b from-cosmic-800 to-purple-950/40 shadow-2xl shadow-gold-500/20 scale-[1.02] transition-all duration-300 flex flex-col justify-between">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md bg-gradient-to-r from-gold-400 to-amber-500 text-cosmic-950">
              Most Popular
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-3 text-xs font-bold uppercase tracking-wider text-gold-300">
                <HeartHandshake className="w-4 h-4 text-gold-400" />
                Duo Pass
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl sm:text-4xl font-black text-white font-serif">₹599</span>
                <span className="text-xs text-slate-400">/ 2 profiles</span>
              </div>
              <p className="text-xs text-slate-300 mb-5 leading-relaxed">Couples, partners, and high-clarity synastry.</p>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-gold-400" />
                  <span>2 Saved Profiles (Switch between 2 people)</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-gold-400" />
                  <span>3 Deep Questions per person (6 total)</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-gold-400" />
                  <span>2 Partner Queries (Will they cheat / marriage)</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-gold-400" />
                  <span>1 Full Match-Making per person (2 total)</span>
                </li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => handlePay("duo_599")}
              className="mt-7 w-full py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all hover:scale-[1.03] active:scale-[0.97] flex items-center justify-center gap-2 bg-gradient-to-r from-gold-300 via-gold-400 to-amber-300 text-cosmic-950 shadow-lg shadow-gold-500/30"
            >
              <Flame className="w-3.5 h-3.5" />
              Pay ₹599
            </button>
          </div>

          {/* Tier 3: Family / Pro */}
          <div className="relative rounded-3xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-300 flex flex-col justify-between bg-cosmic-950/60">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
              Best Value
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-3 text-xs font-bold uppercase tracking-wider text-purple-300">
                <Users className="w-4 h-4 text-purple-400" />
                Family / Pro
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl sm:text-4xl font-black text-white font-serif">₹1,099</span>
                <span className="text-xs text-slate-400">/ multi-user access</span>
              </div>
              <p className="text-xs text-slate-300 mb-5 leading-relaxed">Complete family destiny &amp; multi-partner matchmaking.</p>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-purple-400" />
                  <span>Multi-Profile Access for full family</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-purple-400" />
                  <span>4 Full Match-Making Analyses across any pairing</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-purple-400" />
                  <span>Unlimited Partner &amp; Deep Questions</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-purple-400" />
                  <span>Complete Sacred Pooja Vidhi &amp; Mantras</span>
                </li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => handlePay("unlimited_1009")}
              className="mt-7 w-full py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all hover:scale-[1.03] active:scale-[0.97] flex items-center justify-center gap-2 bg-gradient-to-r from-purple-400 to-indigo-400 text-white shadow-lg shadow-purple-500/20"
            >
              <Flame className="w-3.5 h-3.5" />
              Pay ₹1,099
            </button>
          </div>

        </div>

        {/* Bottom note */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-slate-300">
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            After payment, you&apos;ll be connected to the Rekha team on WhatsApp for instant activation.
          </div>
          {!isLoggedIn && (
            <p className="text-xs text-amber-300/80">
              ⚠️ You&apos;ll be asked to sign in or create an account before proceeding to payment.
            </p>
          )}
        </div>
      </div>

      {/* Auth Gate Modal — opens when unauthenticated user clicks Pay */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={handleAuthSuccess}
        initialMode="signup"
      />

      {/* Paywall Modal — opens after auth (or directly if already logged in) */}
      {pendingPlan && (
        <PaywallModal
          isOpen={paywallOpen}
          onClose={() => {
            setPaywallOpen(false);
            setPendingPlan(null);
          }}
          defaultPlan={pendingPlan}
        />
      )}
    </div>
  );
}
