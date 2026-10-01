"use client";

import React, { useState, useEffect } from "react";
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
  X,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import AuthModal from "@/components/AuthModal";
import PaywallModal from "@/components/PaywallModal";
import type { SubscriptionTierType, PurchaseOptionType } from "@/components/PaywallModal";

export default function SubscriptionPage() {
  const { user, isLoggedIn, isAdmin } = useAuth();
  const isSubscribed = Boolean(user?.isSubscribed);

  const [pendingPlan, setPendingPlan] = useState<SubscriptionTierType | null>(null);
  const [paywallTab, setPaywallTab] = useState<"plans" | "topup">("plans");
  const [pendingOption, setPendingOption] = useState<PurchaseOptionType | undefined>(undefined);
  const [authOpen, setAuthOpen] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [topupNotice, setTopupNotice] = useState<"login_required" | "subscription_required" | null>(null);

  const handlePay = (plan: SubscriptionTierType) => {
    setPendingPlan(plan);
    setPaywallTab("plans");
    setPendingOption(plan);
    setPaywallOpen(true);
  };

  const handleTopupClick = () => {
    if (!isLoggedIn && !isAdmin) {
      setTopupNotice("login_required");
      return;
    }
    if (!isSubscribed && !isAdmin) {
      setTopupNotice("subscription_required");
      return;
    }
    // Active subscriber or Admin: directly launch top-up checkout
    setPendingPlan("trial_99");
    setPaywallTab("topup");
    setPendingOption("topup_60");
    setPaywallOpen(true);
  };

  // Check URL query params for ?plan=... and ?tab=topup
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const planParam = params.get("plan");
      const tabParam = params.get("tab");

      if (tabParam === "topup") {
        handleTopupClick();
      } else if (planParam) {
        let targetPlan: SubscriptionTierType = "trial_99";
        const cleanPlan = planParam.toLowerCase().trim();
        if (cleanPlan === "499" || cleanPlan === "duo" || cleanPlan === "duo_599") {
          targetPlan = "duo_599";
        } else if (cleanPlan === "999" || cleanPlan === "ultimate" || cleanPlan === "unlimited_1009" || cleanPlan === "pro" || cleanPlan === "family") {
          targetPlan = "unlimited_1009";
        } else {
          targetPlan = "trial_99";
        }
        setPendingPlan(targetPlan);
        setPaywallTab("plans");
        setPendingOption(targetPlan);
        setPaywallOpen(true);
      }
    }
  }, [isLoggedIn, isSubscribed, isAdmin]);

  const handleAuthSuccess = () => {
    setAuthOpen(false);
    if (topupNotice === "login_required") {
      setTopupNotice(null);
      setTimeout(() => {
        const activePhone = localStorage.getItem("rekha_active_session");
        const usersMap = JSON.parse(localStorage.getItem("rekha_users_db") || "{}");
        const profile = activePhone ? usersMap[activePhone] : null;
        if (profile?.isSubscribed || profile?.isAdmin || activePhone === "8511739865") {
          setPendingPlan("trial_99");
          setPaywallTab("topup");
          setPendingOption("topup_60");
          setPaywallOpen(true);
        } else {
          setTopupNotice("subscription_required");
        }
      }, 250);
    } else {
      setTimeout(() => setPaywallOpen(true), 200);
    }
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
            automated PhonePe &amp; UPI activation.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> PhonePe Secured
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" /> 256-Bit SSL
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gold-400" /> Instant Activation
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
              <p className="text-xs text-slate-300 mb-5 leading-relaxed">Personal self-discovery &amp; full partner compatibility.</p>
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
                  <span>2 Deep Questions + 3-Yr Timeline</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-400" />
                  <span>1 Full Matchmaking (Twin Palm &amp; Kundli Milan)</span>
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
                <span className="text-3xl sm:text-4xl font-black text-white font-serif">₹499</span>
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
                  <span>3 Total Matchmaking Analyses (Any profile combination)</span>
                </li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => handlePay("duo_599")}
              className="mt-7 w-full py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all hover:scale-[1.03] active:scale-[0.97] flex items-center justify-center gap-2 bg-gradient-to-r from-gold-300 via-gold-400 to-amber-300 text-cosmic-950 shadow-lg shadow-gold-500/30"
            >
              <Flame className="w-3.5 h-3.5" />
              Pay ₹499
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
                <span className="text-3xl sm:text-4xl font-black text-white font-serif">₹999</span>
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
                  <span>5 Total Matchmaking Analyses (Any profile combination)</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-purple-400" />
                  <span>18 Deep Questions + Scriptural Analysis</span>
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
              Pay ₹999
            </button>
          </div>

        </div>

        {/* Matchmaking Top-up Banner */}
        <div className="mb-10 p-5 rounded-3xl bg-rose-500/10 border border-rose-500/25 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-300 shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Exhausted your matchmaking quota?
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Top-up anytime: <strong>₹60 for 2 extra matches</strong> or <strong>₹99 for 5 extra matches</strong>.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleTopupClick}
            className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shrink-0 shadow-lg shadow-rose-500/20 transition-all flex items-center gap-1.5"
          >
            <span>Get Matchmaking Top-Up</span>
          </button>
        </div>

        {/* Bottom note */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Instant automated unlock via PhonePe Payment Gateway. UPI, GPay, Paytm, Cards &amp; NetBanking supported.
          </div>
          {!isLoggedIn && (
            <p className="text-xs text-amber-300/80">
              ⚠️ You&apos;ll be asked to sign in or create an account before proceeding to payment.
            </p>
          )}
        </div>
      </div>

      {/* Top-Up Requirement Guidance Modal */}
      {topupNotice && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md p-6 sm:p-7 rounded-3xl bg-cosmic-900 border border-gold-500/40 shadow-2xl shadow-purple-950/80 text-center space-y-5 animate-scaleUp">
            <button
              onClick={() => setTopupNotice(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {topupNotice === "login_required" ? (
              <>
                <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Lock className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    Seeker Authentication Required
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                    Please Log In First
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mx-auto">
                    Matchmaking Top-Up packs (₹60 for 2 scans / ₹99 for 5 scans) are allocated to a registered profile. Please log in or create your account to proceed.
                  </p>
                </div>
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTopupNotice(null);
                      setAuthOpen(true);
                    }}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-gold-300 via-gold-400 to-amber-300 text-cosmic-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-gold-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Log In / Register Now &rarr;
                  </button>
                  <button
                    type="button"
                    onClick={() => setTopupNotice(null)}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                  <HeartHandshake className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                    Active Subscription Required
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                    Subscribe To Unlock Matchmaking
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mx-auto">
                    Matchmaking Top-Ups are exclusive add-on packs for active subscribers who need extra scans beyond their plan limit.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-left text-xs text-slate-300 space-y-1.5">
                  <div className="font-semibold text-white text-xs mb-1">
                    Available Access Plans with Matchmaking:
                  </div>
                  <div className="flex items-center gap-2 text-gold-300">
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span><strong>₹99 Starter</strong> — 1 Matchmaking Analysis included</span>
                  </div>
                  <div className="flex items-center gap-2 text-gold-300">
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span><strong>₹499 Duo Pass</strong> — 3 Matchmaking Analyses included</span>
                  </div>
                  <div className="flex items-center gap-2 text-gold-300">
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span><strong>₹999 Ultimate</strong> — 5 Matchmaking Analyses included</span>
                  </div>
                </div>
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTopupNotice(null);
                      handlePay("trial_99");
                    }}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-gold-300 via-gold-400 to-amber-300 text-cosmic-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-gold-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Choose a Subscription Plan &rarr;
                  </button>
                  <button
                    type="button"
                    onClick={() => setTopupNotice(null)}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 text-xs"
                  >
                    Dismiss
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

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
            setPendingOption(undefined);
          }}
          defaultPlan={pendingPlan}
          defaultTab={paywallTab}
          defaultOption={pendingOption}
        />
      )}
    </div>
  );
}
