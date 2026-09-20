"use client";

import React, { useState } from "react";
import { X, Sparkles, Check, Flame, ShieldCheck, MessageCircle, Clock, Users, HeartHandshake, User } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export type SubscriptionTierType = "trial_99" | "duo_599" | "unlimited_1009";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (plan: SubscriptionTierType) => void;
  defaultPlan?: SubscriptionTierType;
  userName?: string;
  userDob?: string;
}

export default function PaywallModal({
  isOpen,
  onClose,
  onSuccess,
  defaultPlan = "trial_99",
  userName,
  userDob,
}: PaywallModalProps) {
  const { user, isAdmin } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionTierType>(defaultPlan);
  const [showAdminNotice, setShowAdminNotice] = useState(false);

  if (!isOpen) return null;

  // Super Admin Nishant Dantare bypasses paywall completely
  if (isAdmin) {
    if (onSuccess) onSuccess(selectedPlan);
    onClose();
    return null;
  }

  const handlePay = () => {
    setShowAdminNotice(true);
  };

  const effectiveName = userName || user?.name || "Seeker";
  const effectiveDob = userDob || user?.dob || "Not specified";

  const planInfo = {
    trial_99: { price: "99", label: "₹99 Starter Pack (1 Person / 1 Deep Question / No Matchmaking)" },
    duo_599: { price: "599", label: "₹599 Duo Pack (2 Profiles / 3 Deep Questions / 2 Partner Queries / 1 Match-Making Each)" },
    unlimited_1009: { price: "1099", label: "₹1099 Pro / Family Pass (Multi-Profile / 4 Match-Making Overall / Full Synastry)" },
  }[selectedPlan];

  const waMessage = `Hi Rekha, I am ${effectiveName}, DOB: ${effectiveDob}, I want to subscribe to the ₹${planInfo.price} plan (${planInfo.label}). Please send me the QR or payment link for instant activation.`;
  const waLink = `https://wa.me/918511739865?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-3 sm:p-6 pt-24 sm:pt-16 pb-16 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl my-auto p-6 sm:p-8 rounded-3xl bg-cosmic-900 border border-gold-500/40 shadow-2xl shadow-purple-950/80 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-b from-gold-500/15 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {showAdminNotice ? (
          <div className="text-center py-8 space-y-5 animate-scaleUp">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Clock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                Instant WhatsApp Activation
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Direct automated payment gateway is being finalized. Subscriptions are activated within 2 minutes by WhatsApp verification.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 max-w-lg mx-auto text-left space-y-2 text-xs text-slate-300">
              <div className="font-bold text-white text-sm">
                Selected: {planInfo.label}
              </div>
              <div className="flex items-center gap-1.5 text-gold-300 font-medium text-xs">
                <MessageCircle className="w-3.5 h-3.5 text-gold-400" />
                <span>To activate your access, message Rekha directly:</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3.5 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Rekha For Activation</span>
              </a>

              <button
                type="button"
                onClick={() => setShowAdminNotice(false)}
                className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-semibold"
              >
                Back to Plans
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                Unlock Complete Divine Revelation
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
                Choose Your Destiny Access Tier
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-lg mx-auto">
                Select the plan that fits your personal or relationship consultation needs.
              </p>
            </div>

            {/* 3 Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {/* TIER 1: ₹99 Starter */}
              <div
                onClick={() => setSelectedPlan("trial_99")}
                className={`cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all relative flex flex-col justify-between ${
                  selectedPlan === "trial_99"
                    ? "bg-cosmic-800/90 border-gold-400 shadow-xl shadow-gold-500/10 scale-[1.02]"
                    : "bg-cosmic-950/60 border-white/10 hover:border-white/20 opacity-80"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" /> Starter
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-semibold text-slate-300">
                      1 User Lock
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-black text-white font-serif">₹99</span>
                    <span className="text-xs text-slate-400">/ single profile</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Personal self-discovery &amp; deep question answer.
                  </p>

                  <ul className="mt-4 space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>1 Primary Profile</strong> (Permanently locked)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>4 Dynamic Trust Insights</strong> (Palm + Kundali)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>1 Deep Question</strong> Solution + 3-Yr Timeline</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-500">
                      <span className="text-red-400 font-bold">✕</span>
                      <span>No Partner Synastry / No Matchmaking</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4">
                  <div
                    className={`w-full py-2 rounded-xl text-center text-xs font-bold uppercase tracking-wider ${
                      selectedPlan === "trial_99"
                        ? "bg-gold-500 text-cosmic-950 shadow-md shadow-gold-500/20"
                        : "bg-white/10 text-slate-300"
                    }`}
                  >
                    Select ₹99 Starter
                  </div>
                </div>
              </div>

              {/* TIER 2: ₹599 Duo Plan (POPULAR) */}
              <div
                onClick={() => setSelectedPlan("duo_599")}
                className={`cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all relative flex flex-col justify-between ${
                  selectedPlan === "duo_599"
                    ? "bg-gradient-to-b from-cosmic-800 to-purple-950/40 border-gold-400 shadow-2xl shadow-gold-500/20 scale-[1.03]"
                    : "bg-cosmic-950/60 border-white/10 hover:border-white/20 opacity-80"
                }`}
              >
                <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-gradient-to-r from-gold-400 to-amber-500 text-cosmic-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                  Most Popular
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gold-400 flex items-center gap-1">
                      <HeartHandshake className="w-3.5 h-3.5 text-gold-400" /> Duo Pass
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-gold-500/20 text-[10px] font-semibold text-gold-300 border border-gold-500/30">
                      2 People Included
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-black text-white font-serif">₹599</span>
                    <span className="text-xs text-slate-400">/ 2 profiles</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Couples, partners, and high-clarity synastry.
                  </p>

                  <ul className="mt-4 space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                      <span><strong>2 Saved Profiles</strong> (Switch between 2 people)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                      <span><strong>3 Deep Questions</strong> per person (6 total)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                      <span><strong>2 Partner Queries</strong> (Will they cheat / marriage)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                      <span><strong>1 Full Match-Making</strong> per person (2 total)</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4">
                  <div
                    className={`w-full py-2 rounded-xl text-center text-xs font-bold uppercase tracking-wider ${
                      selectedPlan === "duo_599"
                        ? "bg-gradient-to-r from-gold-300 via-gold-400 to-amber-300 text-cosmic-950 font-black shadow-md shadow-gold-500/30"
                        : "bg-white/10 text-slate-300"
                    }`}
                  >
                    Select ₹599 Duo Pass
                  </div>
                </div>
              </div>

              {/* TIER 3: ₹1099 Pro / Family */}
              <div
                onClick={() => setSelectedPlan("unlimited_1009")}
                className={`cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all relative flex flex-col justify-between ${
                  selectedPlan === "unlimited_1009"
                    ? "bg-cosmic-800/90 border-gold-400 shadow-xl shadow-gold-500/10 scale-[1.02]"
                    : "bg-cosmic-950/60 border-white/10 hover:border-white/20 opacity-80"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-purple-400" /> Family / Pro
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-[10px] font-semibold text-purple-300 border border-purple-500/30">
                      Multi-User Unlocked
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-black text-white font-serif">₹1,099</span>
                    <span className="text-xs text-slate-400">/ multi-user access</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Complete family destiny &amp; multi-partner matchmaking.
                  </p>

                  <ul className="mt-4 space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      <span><strong>Multi-Profile Access</strong> for full family</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      <span><strong>4 Full Match-Making Analyses</strong> across any pairing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      <span><strong>Unlimited Partner &amp; Deep Questions</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      <span><strong>Complete Sacred Pooja Vidhi</strong> &amp; Mantras</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4">
                  <div
                    className={`w-full py-2 rounded-xl text-center text-xs font-bold uppercase tracking-wider ${
                      selectedPlan === "unlimited_1009"
                        ? "bg-purple-400 text-cosmic-950 font-black shadow-md shadow-purple-500/20"
                        : "bg-white/10 text-slate-300"
                    }`}
                  >
                    Select ₹1,099 Pro Pass
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handlePay}
                className="w-full py-4 rounded-2xl text-xs sm:text-sm font-extrabold uppercase tracking-wider text-cosmic-950 bg-gradient-to-r from-gold-300 via-gold-400 to-amber-300 shadow-xl shadow-gold-500/30 hover:shadow-gold-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>
                  Proceed for ₹{planInfo.price} Activation
                </span>
                <Sparkles className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp Verification with Rekha Team
                </span>
                <span>•</span>
                <span>Instant 2-Minute Activation</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
