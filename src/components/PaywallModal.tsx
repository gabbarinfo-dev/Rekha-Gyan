"use client";

import React, { useState } from "react";
import { X, Sparkles, Check, Flame, ShieldCheck, MessageCircle, Clock, Users, HeartHandshake, User, PlusCircle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export type SubscriptionTierType = "trial_99" | "duo_599" | "unlimited_1009";
export type PurchaseOptionType = SubscriptionTierType | "topup_60" | "topup_99";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (plan: SubscriptionTierType) => void;
  defaultPlan?: SubscriptionTierType;
  defaultTab?: "plans" | "topup";
  userName?: string;
  userDob?: string;
  exhaustedReason?: string;
}

export default function PaywallModal({
  isOpen,
  onClose,
  onSuccess,
  defaultPlan = "trial_99",
  defaultTab = "plans",
  userName,
  userDob,
  exhaustedReason,
}: PaywallModalProps) {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<"plans" | "topup">(defaultTab);
  const [selectedOption, setSelectedOption] = useState<PurchaseOptionType>(
    defaultTab === "topup" ? "topup_60" : defaultPlan
  );
  const [showAdminNotice, setShowAdminNotice] = useState(false);

  if (!isOpen) return null;

  // Super Admin Nishant Dantare bypasses paywall completely
  if (isAdmin) {
    if (onSuccess && (selectedOption === "trial_99" || selectedOption === "duo_599" || selectedOption === "unlimited_1009")) {
      onSuccess(selectedOption);
    }
    onClose();
    return null;
  }

  const handlePay = () => {
    setShowAdminNotice(true);
  };

  const effectiveName = userName || user?.name || "Seeker";
  const effectiveDob = userDob || user?.dob || "Not specified";
  const effectivePhone = user?.phone || "";

  const catalog: Record<PurchaseOptionType, { price: string; label: string; badge?: string }> = {
    trial_99: { price: "99", label: "₹99 Starter Pack (1 Profile / 2 Deep Questions / 1 Matchmaking Analysis)" },
    duo_599: { price: "499", label: "₹499 Duo Pass (2 Profiles / 6 Deep Questions / 3 Total Matchmakings)" },
    unlimited_1009: { price: "999", label: "₹999 Pro & Family Pass (Multi-Profile / 18 Deep Questions / 5 Total Matchmakings)" },
    topup_60: { price: "60", label: "₹60 Matchmaking Top-Up (2 Additional Matchmaking Analyses)", badge: "Quick Pack" },
    topup_99: { price: "99", label: "₹99 Matchmaking Top-Up (5 Additional Matchmaking Analyses)", badge: "Best Value" },
  };

  const itemInfo = catalog[selectedOption] || catalog.trial_99;

  const waMessage = selectedOption.startsWith("topup")
    ? `Hi Rekha, I am ${effectiveName} (Phone: ${effectivePhone}). I have exhausted my matchmaking quota and want to buy the ${itemInfo.label}. Please send me the QR or payment link for instant top-up credit.`
    : `Hi Rekha, I am ${effectiveName}, DOB: ${effectiveDob}, Phone: ${effectivePhone}. I want to subscribe to the ₹${itemInfo.price} plan (${itemInfo.label}). Please send me the QR or payment link for instant activation.`;

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
                Direct automated payment gateway is being finalized. Activations and top-up credits are updated within 2 minutes via WhatsApp verification.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 max-w-lg mx-auto text-left space-y-2 text-xs text-slate-300">
              <div className="font-bold text-white text-sm">
                Selected: {itemInfo.label}
              </div>
              <div className="flex items-center gap-1.5 text-gold-300 font-medium text-xs">
                <MessageCircle className="w-3.5 h-3.5 text-gold-400" />
                <span>To complete and receive instant credits, message Rekha directly:</span>
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
                Back
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                Vedic Consultation &amp; Synastry Access
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
                {activeTab === "topup" ? "Need Extra Matchmaking Scans?" : "Choose Your Destiny Access Tier"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-lg mx-auto">
                {exhaustedReason || (activeTab === "topup" 
                  ? "Top up matchmaking credits anytime for quick relationship compatibility checks." 
                  : "Select the plan that fits your personal or relationship consultation needs.")}
              </p>

              {/* Mode Toggle Tabs */}
              <div className="flex items-center justify-center gap-2 mt-5">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("plans");
                    if (selectedOption.startsWith("topup")) setSelectedOption("trial_99");
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === "plans"
                      ? "bg-gold-500 text-cosmic-950 shadow-md shadow-gold-500/20"
                      : "bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  Subscription Plans (₹99 / ₹499 / ₹999)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("topup");
                    setSelectedOption("topup_60");
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    activeTab === "topup"
                      ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                      : "bg-white/5 text-rose-300 hover:bg-white/10 border border-rose-500/20"
                  }`}
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Matchmaking Top-Ups (₹60 / ₹99)</span>
                </button>
              </div>
            </div>

            {/* TAB 1: Subscription Plans */}
            {activeTab === "plans" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* TIER 1: ₹99 Starter */}
                <div
                  onClick={() => setSelectedOption("trial_99")}
                  className={`cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all relative flex flex-col justify-between ${
                    selectedOption === "trial_99"
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
                      Personal destiny &amp; full partner compatibility.
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
                        <span><strong>2 Deep Questions</strong> + 3-Yr Timeline</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>1 Full Matchmaking</strong> (Twin Palm &amp; Kundli Milan)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4">
                    <div
                      className={`w-full py-2 rounded-xl text-center text-xs font-bold uppercase tracking-wider ${
                        selectedOption === "trial_99"
                          ? "bg-gold-500 text-cosmic-950 shadow-md shadow-gold-500/20"
                          : "bg-white/10 text-slate-300"
                      }`}
                    >
                      Select ₹99 Starter
                    </div>
                  </div>
                </div>

                {/* TIER 2: ₹499 Duo Plan (POPULAR) */}
                <div
                  onClick={() => setSelectedOption("duo_599")}
                  className={`cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all relative flex flex-col justify-between ${
                    selectedOption === "duo_599"
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
                      <span className="text-2xl sm:text-3xl font-black text-white font-serif">₹499</span>
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
                        <span><strong>6 Deep Questions</strong> (3 per profile)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                        <span><strong>2 Partner Queries</strong> (Will they cheat / marriage)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                        <span><strong>3 Total Matchmaking Analyses</strong> (Across any profile combination)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4">
                    <div
                      className={`w-full py-2 rounded-xl text-center text-xs font-bold uppercase tracking-wider ${
                        selectedOption === "duo_599"
                          ? "bg-gradient-to-r from-gold-300 via-gold-400 to-amber-300 text-cosmic-950 font-black shadow-md shadow-gold-500/30"
                          : "bg-white/10 text-slate-300"
                      }`}
                    >
                      Select ₹499 Duo Pass
                    </div>
                  </div>
                </div>

                {/* TIER 3: ₹999 Pro / Family */}
                <div
                  onClick={() => setSelectedOption("unlimited_1009")}
                  className={`cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all relative flex flex-col justify-between ${
                    selectedOption === "unlimited_1009"
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
                      <span className="text-2xl sm:text-3xl font-black text-white font-serif">₹999</span>
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
                        <span><strong>5 Total Matchmaking Analyses</strong> (Across any profile combination)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span><strong>18 Deep Questions</strong> + Scriptural Analysis</span>
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
                        selectedOption === "unlimited_1009"
                          ? "bg-purple-400 text-cosmic-950 font-black shadow-md shadow-purple-500/20"
                          : "bg-white/10 text-slate-300"
                      }`}
                    >
                      Select ₹999 Pro Pass
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* TAB 2: Matchmaking Top-Ups */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 max-w-2xl mx-auto">
                {/* Top-up 1: ₹60 for 2 */}
                <div
                  onClick={() => setSelectedOption("topup_60")}
                  className={`cursor-pointer rounded-3xl p-6 border transition-all relative flex flex-col justify-between ${
                    selectedOption === "topup_60"
                      ? "bg-cosmic-800/90 border-rose-400 shadow-xl shadow-rose-500/10 scale-[1.02]"
                      : "bg-cosmic-950/60 border-white/10 hover:border-white/20 opacity-85"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                        <HeartHandshake className="w-4 h-4 text-rose-400" />
                        Quick Match Pack
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-semibold border border-rose-500/30">
                        ₹30 / Match
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1 my-2">
                      <span className="text-3xl font-black text-white font-serif">₹60</span>
                      <span className="text-xs text-slate-400">/ 2 extra matchmakings</span>
                    </div>
                    <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                      Instant credits added to your account. Usable across any saved profile or new partner.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-300">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span><strong>2 Full Sacred Matchmakings</strong></span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Twin Palm Geometry + 36 Gunas Milan</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Instant 2-Minute WhatsApp Credit Delivery</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-6">
                    <div
                      className={`w-full py-2.5 rounded-xl text-center text-xs font-bold uppercase tracking-wider ${
                        selectedOption === "topup_60"
                          ? "bg-rose-500 text-white shadow-md shadow-rose-500/30"
                          : "bg-white/10 text-slate-300"
                      }`}
                    >
                      Select ₹60 Top-up (2 Matches)
                    </div>
                  </div>
                </div>

                {/* Top-up 2: ₹99 for 5 */}
                <div
                  onClick={() => setSelectedOption("topup_99")}
                  className={`cursor-pointer rounded-3xl p-6 border transition-all relative flex flex-col justify-between ${
                    selectedOption === "topup_99"
                      ? "bg-gradient-to-b from-cosmic-800 to-rose-950/40 border-gold-400 shadow-2xl shadow-gold-500/20 scale-[1.02]"
                      : "bg-cosmic-950/60 border-white/10 hover:border-white/20 opacity-85"
                  }`}
                >
                  <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-gradient-to-r from-gold-400 to-amber-500 text-cosmic-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                    Best Value Top-Up
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-gold-300 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-gold-400" />
                        Mega Match Pack
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                        Only ₹19.80 / Match
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1 my-2">
                      <span className="text-3xl font-black text-white font-serif">₹99</span>
                      <span className="text-xs text-slate-400">/ 5 extra matchmakings</span>
                    </div>
                    <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                      Save 34% per analysis. Perfect for testing multiple partner matches or family compatibility.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-300">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-gold-400" />
                        <span><strong>5 Full Sacred Matchmakings</strong></span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-gold-400" />
                        <span>Works across any combination of profiles</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-gold-400" />
                        <span>Full Synastry &amp; Karmic Bond Reports</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-6">
                    <div
                      className={`w-full py-2.5 rounded-xl text-center text-xs font-bold uppercase tracking-wider ${
                        selectedOption === "topup_99"
                          ? "bg-gradient-to-r from-gold-300 via-gold-400 to-amber-300 text-cosmic-950 font-black shadow-md shadow-gold-500/30"
                          : "bg-white/10 text-slate-300"
                      }`}
                    >
                      Select ₹99 Top-up (5 Matches)
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CTA Button */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handlePay}
                className="w-full py-4 rounded-2xl text-xs sm:text-sm font-extrabold uppercase tracking-wider text-cosmic-950 bg-gradient-to-r from-gold-300 via-gold-400 to-amber-300 shadow-xl shadow-gold-500/30 hover:shadow-gold-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>
                  Proceed for ₹{itemInfo.price} {selectedOption.startsWith("topup") ? "Top-up" : "Activation"}
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
