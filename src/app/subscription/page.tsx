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
  Heart,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import AuthModal from "@/components/AuthModal";
import PaywallModal from "@/components/PaywallModal";
import type { SubscriptionTierType, PurchaseOptionType, SpecialPassType } from "@/components/PaywallModal";

export default function SubscriptionPage() {
  const { user, isLoggedIn, isAdmin } = useAuth();
  const isSubscribed = Boolean(user?.isSubscribed);

  const [pendingPlan, setPendingPlan] = useState<SubscriptionTierType | null>(null);
  const [paywallTab, setPaywallTab] = useState<"plans" | "special" | "topup">("plans");
  const [pendingOption, setPendingOption] = useState<PurchaseOptionType | undefined>(undefined);
  const [authOpen, setAuthOpen] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [topupNotice, setTopupNotice] = useState<"login_required" | "subscription_required" | null>(null);

  const handlePay = (plan: SubscriptionTierType) => {
    setPendingPlan(plan);
    setPaywallTab("plans");
    setPendingOption(plan);
    if (!isLoggedIn && !isAdmin) {
      setAuthOpen(true);
      return;
    }
    setPaywallOpen(true);
  };

  const handleSpecialPassClick = (pass: SpecialPassType) => {
    setPendingOption(pass);
    setPaywallTab("special");
    setPendingPlan("duo_599");
    if (!isLoggedIn && !isAdmin) {
      setAuthOpen(true);
      return;
    }
    setPaywallOpen(true);
  };

  const handleTopupClick = () => {
    if (!isLoggedIn && !isAdmin) {
      setTopupNotice("login_required");
      setAuthOpen(true);
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
      } else if (tabParam === "special") {
        const specialOption = planParam === "299" || planParam === "kalesh_saas_299"
          ? "kalesh_saas_299"
          : planParam === "349" || planParam === "intercaste_349"
          ? "intercaste_349"
          : "love_ex_249";
        handleSpecialPassClick(specialOption);
      } else if (planParam) {
        const cleanPlan = planParam.toLowerCase().trim();
        if (cleanPlan === "249" || cleanPlan === "love_ex_249" || cleanPlan === "love") {
          handleSpecialPassClick("love_ex_249");
          return;
        }
        if (cleanPlan === "299" || cleanPlan === "kalesh_saas_299" || cleanPlan === "kalesh") {
          handleSpecialPassClick("kalesh_saas_299");
          return;
        }
        if (cleanPlan === "349" || cleanPlan === "intercaste_349" || cleanPlan === "intercaste") {
          handleSpecialPassClick("intercaste_349");
          return;
        }

        let targetPlan: SubscriptionTierType = "trial_99";
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
        if (!isLoggedIn && !isAdmin) {
          setAuthOpen(true);
        } else {
          setPaywallOpen(true);
        }
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

        {/* VEDIC SAMADHAN PASSES (Distinct Visuals & Targeted Solutions) */}
        <div className="mb-14 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-rose-500/15 via-amber-500/15 to-purple-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Targeted Shastriya Solutions
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
              Vedic Samadhan Passes
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Prem algaav, parivarik kalesh, aur intercaste vivah badha ke liye 50+ classical scriptures se tailored shastriya upaay.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* PASS 1: Khoya Pyar Wapas Paayen & Get Your Ex Back (₹249) */}
            <div className="relative rounded-3xl p-6 border border-rose-500/40 bg-gradient-to-b from-rose-950/80 via-cosmic-950/95 to-pink-950/40 shadow-xl shadow-rose-950/50 hover:border-rose-400/70 transition-all flex flex-col justify-between overflow-hidden">
              {/* Glowing Top Pill */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-black uppercase tracking-wider border border-rose-500/40 flex items-center gap-1.5">
                  <Heart className="w-3 h-3 text-rose-400 fill-rose-400/40" />
                  Prem Punarmilan &amp; Ex Wapsi
                </span>
                <span className="text-[10px] font-bold text-slate-400 bg-black/40 px-2.5 py-0.5 rounded-full">
                  2 Palms Sync
                </span>
              </div>

              <div>
                {/* Price Section with Traditional Comparison */}
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl sm:text-4xl font-black text-rose-200 font-serif">₹249</span>
                  <span className="text-xs text-slate-400 line-through">₹2,100 Pandit Dakshina</span>
                </div>
                <h3 className="text-base font-extrabold text-white mb-1">
                  Khoya Pyar Wapas Paayen &amp; Get Your Ex Back
                </h3>
                <p className="text-xs text-rose-200/80 mb-3 leading-relaxed">
                  Shukra-Chandra synastry aur algaav dosh shanti dwara dil ki dooriyan khatam karne ka shastriya path.
                </p>

                {/* Distinct Structure: Dual-Palm Synastry Conduit */}
                <div className="my-3.5 p-3 rounded-2xl bg-black/40 border border-rose-500/25">
                  <div className="flex items-center justify-between text-xs font-semibold text-rose-200">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">🫱</span>
                      <span>Aapka Palm</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-rose-300 font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/30">
                      <Heart className="w-2.5 h-2.5 text-rose-400 fill-rose-400" />
                      <span>Prem Yog Synastry</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span>Ex / Partner</span>
                      <span className="text-base">🫲</span>
                    </div>
                  </div>
                </div>

                {/* Distinct Structure: 3-Phase Milestone Journey */}
                <div className="space-y-2 mt-3">
                  <div className="p-2.5 rounded-xl bg-rose-500/5 border border-rose-500/15 flex items-start gap-2.5 text-xs">
                    <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      01
                    </span>
                    <div>
                      <strong className="text-white text-xs block">Algaav Dosh Diagnosis</strong>
                      <span className="text-[11px] text-slate-300">7th House, Ketu Peeda &amp; Rahu Chaya deep scan</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-rose-500/5 border border-rose-500/15 flex items-start gap-2.5 text-xs">
                    <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      02
                    </span>
                    <div>
                      <strong className="text-white text-xs block">Wapsi Ka Shubh Samay</strong>
                      <span className="text-[11px] text-slate-300">Exact astrological window for communication reopening</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-rose-500/5 border border-rose-500/15 flex items-start gap-2.5 text-xs">
                    <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      03
                    </span>
                    <div>
                      <strong className="text-white text-xs block">Kamadeva-Rati Vedic Vidhi</strong>
                      <span className="text-[11px] text-slate-300">100% Sattvik &amp; Sacred Pooja for softening heart</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <div className="text-[11px] text-center text-rose-300/80 mb-2.5 font-medium">
                  ✓ 2 Dedicated Questions • 2 Palms Analyzed
                </div>
                <button
                  type="button"
                  onClick={() => handleSpecialPassClick("love_ex_249")}
                  className="w-full py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all hover:scale-[1.03] active:scale-[0.97] flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30"
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  Select ₹249 Prem Pass
                </button>
              </div>
            </div>

            {/* PASS 2: Ghar Kalesh & Saas Se Banti Nahi Hai? (₹299) */}
            <div className="relative rounded-3xl p-6 border border-emerald-500/40 bg-gradient-to-b from-emerald-950/80 via-cosmic-950/95 to-teal-950/40 shadow-xl shadow-emerald-950/50 hover:border-emerald-400/70 transition-all flex flex-col justify-between overflow-hidden">
              {/* Glowing Top Pill */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider border border-emerald-500/40 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Griha Shanti &amp; Parivarik Izzat
                </span>
                <span className="text-[10px] font-bold text-slate-400 bg-black/40 px-2.5 py-0.5 rounded-full">
                  3 Profiles Sync
                </span>
              </div>

              <div>
                {/* Price Section with Traditional Comparison */}
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl sm:text-4xl font-black text-emerald-200 font-serif">₹299</span>
                  <span className="text-xs text-slate-400 line-through">₹3,500 Havan Kharch</span>
                </div>
                <h3 className="text-base font-extrabold text-white mb-1">
                  Ghar Main Kalesh Se Mukti &amp; Saas Se Banti Nahi?
                </h3>
                <p className="text-xs text-emerald-200/80 mb-3 leading-relaxed">
                  Griha Bhava aur Matru-Pitri graha krodh ko shaant karke ghar me aadar aur aman ka vaas.
                </p>

                {/* Distinct Structure: 3-Pillar Parivarik Suraksha Chakra */}
                <div className="my-3.5 p-2.5 rounded-2xl bg-black/40 border border-emerald-500/25">
                  <div className="text-[10px] uppercase font-bold text-emerald-300/80 mb-1.5 text-center tracking-wider">
                    3-Way Domestic Peace Alignment
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 text-xs font-bold text-center">
                    <div className="py-1.5 px-1 rounded-lg bg-emerald-500/15 text-emerald-200 border border-emerald-500/20">
                      Bahu / Aap
                    </div>
                    <div className="py-1.5 px-1 rounded-lg bg-amber-500/20 text-amber-200 border border-amber-500/30">
                      🤝 Saas / In-Laws
                    </div>
                    <div className="py-1.5 px-1 rounded-lg bg-emerald-500/15 text-emerald-200 border border-emerald-500/20">
                      Pati &amp; Ghar
                    </div>
                  </div>
                </div>

                {/* Distinct Structure: 2x2 Feature Quadrant Grid */}
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                    <span className="text-xs font-bold text-emerald-300 block mb-0.5">🏛️ Saas-Bahu Maitri</span>
                    <span className="text-[11px] text-slate-300 block leading-tight">4th &amp; 10th House peace pacification</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                    <span className="text-xs font-bold text-emerald-300 block mb-0.5">🛡️ Krodh Nivaran</span>
                    <span className="text-[11px] text-slate-300 block leading-tight">Remedies to stop harsh words &amp; taunts</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                    <span className="text-xs font-bold text-emerald-300 block mb-0.5">🪔 Vastu Kalesh Dosh</span>
                    <span className="text-[11px] text-slate-300 block leading-tight">Lal Kitab domestic energy cleansing</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                    <span className="text-xs font-bold text-emerald-300 block mb-0.5">🌸 Shanti &amp; Izzat Path</span>
                    <span className="text-[11px] text-slate-300 block leading-tight">Daily Sattvik Vidhi for long-term respect</span>
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <div className="text-[11px] text-center text-emerald-300/80 mb-2.5 font-medium">
                  ✓ 3 Profiles Supported • Full Vastu Guide
                </div>
                <button
                  type="button"
                  onClick={() => handleSpecialPassClick("kalesh_saas_299")}
                  className="w-full py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all hover:scale-[1.03] active:scale-[0.97] flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-400 to-teal-400 text-cosmic-950 font-black shadow-lg shadow-emerald-500/30"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Select ₹299 Shanti Pass
                </button>
              </div>
            </div>

            {/* PASS 3: Intercaste Vivah & Parivaar Manana (₹349) */}
            <div className="relative rounded-3xl p-6 border border-purple-500/40 bg-gradient-to-b from-purple-950/80 via-cosmic-950/95 to-indigo-950/40 shadow-xl shadow-purple-950/50 hover:border-purple-400/70 transition-all flex flex-col justify-between overflow-hidden">
              {/* Glowing Top Pill */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-black uppercase tracking-wider border border-purple-500/40 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  Vivah Svikriti &amp; Parivaar Sahmati
                </span>
                <span className="text-[10px] font-bold text-slate-400 bg-black/40 px-2.5 py-0.5 rounded-full">
                  4 Profiles Sync
                </span>
              </div>

              <div>
                {/* Price Section with Traditional Comparison */}
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl sm:text-4xl font-black text-purple-200 font-serif">₹349</span>
                  <span className="text-xs text-slate-400 line-through">₹5,100 Astrologer Fee</span>
                </div>
                <h3 className="text-base font-extrabold text-white mb-1">
                  Intercaste Marriage &amp; Parivaar Manana
                </h3>
                <p className="text-xs text-purple-200/80 mb-3 leading-relaxed">
                  Guru-Chandal &amp; 9th House Pitra dosh nivaran aur parents consent praapti anushthan.
                </p>

                {/* Distinct Structure: 3-Stage Destiny Bridge Roadmap */}
                <div className="my-3.5 p-2.5 rounded-2xl bg-black/40 border border-purple-500/25">
                  <div className="text-[10px] uppercase font-bold text-purple-300/80 mb-1.5 text-center tracking-wider">
                    Vivah Badha Nivaran Roadmap
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-purple-200 px-1">
                    <span className="px-2 py-0.5 rounded bg-purple-500/20">1. Palm Match</span>
                    <span className="text-purple-400 text-xs">➔</span>
                    <span className="px-2 py-0.5 rounded bg-purple-500/20">2. Elder Neeti</span>
                    <span className="text-purple-400 text-xs">➔</span>
                    <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-200">3. Vivah Yog</span>
                  </div>
                </div>

                {/* Distinct Structure: Strategy Blueprint Stack */}
                <div className="space-y-2 mt-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/5 border border-purple-500/15 text-left">
                    <span className="text-xs font-bold text-purple-300 block">👑 Parivaar Manane Ki Shastriya Neeti</span>
                    <span className="text-[11px] text-slate-300 block leading-tight mt-0.5">Which elder to approach first based on Moon &amp; Jupiter</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-purple-500/5 border border-purple-500/15 text-left">
                    <span className="text-xs font-bold text-purple-300 block">🕊️ Brihaspati &amp; Shukra Bal Vidhi</span>
                    <span className="text-[11px] text-slate-300 block leading-tight mt-0.5">Strengthening marriage approval &amp; societal respect</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-purple-500/5 border border-purple-500/15 text-left">
                    <span className="text-xs font-bold text-purple-300 block">🔮 Nadi &amp; Gotra Samvaad Logic</span>
                    <span className="text-[11px] text-slate-300 block leading-tight mt-0.5">Sacred arguments to resolve orthodox family hesitation</span>
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <div className="text-[11px] text-center text-purple-300/80 mb-2.5 font-medium">
                  ✓ 4 Multi-Family Profiles • 4 Detailed Queries
                </div>
                <button
                  type="button"
                  onClick={() => handleSpecialPassClick("intercaste_349")}
                  className="w-full py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all hover:scale-[1.03] active:scale-[0.97] flex items-center justify-center gap-2 bg-gradient-to-r from-purple-400 to-indigo-400 text-white font-black shadow-lg shadow-purple-500/30"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Select ₹349 Vivah Pass
                </button>
              </div>
            </div>
          </div>

          {/* VIP WhatsApp Desk Banner */}
          <div className="p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-left">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 text-2xl">
                💬
              </div>
              <div>
                <div className="text-sm font-extrabold text-white">
                  Koi special issue to Rekha ko WhatsApp karen!
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Rekha poore scriptures (50+ texts) ko khangal kar aapko iska custom shastriya jawab degi.
                </p>
              </div>
            </div>
            <a
              href="https://wa.me/919274090534?text=Hi%20Rekha%2C%20I%20have%20a%20special%20issue%20and%20want%20a%20full%20scripture%20and%20kundali%20review."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs shrink-0 shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <span>WhatsApp: +91 92740 90534</span>
            </a>
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
        title="Mobile Number Required to Subscribe"
        subtitle="Enter your 10-digit mobile number so your subscription plan and consultation privileges are safely attached to your account."
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
