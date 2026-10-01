"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles, Check, Flame, ShieldCheck, MessageCircle, Clock, Users, HeartHandshake, User, PlusCircle, Loader2, Phone, Heart } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import AuthModal from "./AuthModal";

export type StandardTierType = "trial_99" | "duo_599" | "unlimited_1009";
export type SpecialPassType = "love_ex_249" | "kalesh_saas_299" | "intercaste_349";
export type SubscriptionTierType = StandardTierType | SpecialPassType;
export type PurchaseOptionType = SubscriptionTierType | "topup_60" | "topup_99";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (plan: PurchaseOptionType) => void;
  defaultPlan?: PurchaseOptionType;
  defaultTab?: "plans" | "special" | "topup";
  defaultOption?: PurchaseOptionType;
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
  defaultOption,
  userName,
  userDob,
  exhaustedReason,
}: PaywallModalProps) {
  const { user, isAdmin, login, signup, unlockSubscription, addMatchmakingCredits } = useAuth();
  const [activeTab, setActiveTab] = useState<"plans" | "special" | "topup">(defaultTab);
  const [selectedOption, setSelectedOption] = useState<PurchaseOptionType>(
    defaultOption || (defaultTab === "topup" ? "topup_60" : defaultTab === "special" ? "love_ex_249" : defaultPlan)
  );
  const [isInitiatingPayment, setIsInitiatingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Unauthenticated user identification fields
  const [guestName, setGuestName] = useState(userName || "");
  const [guestPhone, setGuestPhone] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Sync state whenever modal is opened or props change
  useEffect(() => {
    if (isOpen) {
      if (
        defaultPlan === "love_ex_249" ||
        defaultPlan === "kalesh_saas_299" ||
        defaultPlan === "intercaste_349"
      ) {
        setActiveTab("special");
        setSelectedOption(defaultPlan);
      } else {
        setActiveTab(defaultTab);
        setSelectedOption(
          defaultOption ||
            (defaultTab === "topup"
              ? "topup_60"
              : defaultTab === "special"
              ? "love_ex_249"
              : defaultPlan)
        );
      }
      setIsInitiatingPayment(false);
      setPaymentError(null);
      if (user?.name) setGuestName(user.name);
      else if (userName) setGuestName(userName);
      if (user?.phone) setGuestPhone(user.phone);
    }
  }, [isOpen, defaultTab, defaultPlan, defaultOption, user, userName]);

  if (!isOpen) return null;

  const effectiveDob = userDob || user?.dob || "Not specified";

  const handlePay = async () => {
    try {
      setPaymentError(null);

      const targetPhone = (user?.phone || guestPhone || "").replace(/\D/g, "");
      const targetName = (user?.name || guestName || userName || "Seeker").trim();

      if (!targetPhone || targetPhone.length < 10) {
        setPaymentError("Please enter your 10-digit mobile number so your subscription records and quotas are safely attached to your account.");
        return;
      }

      if (!targetName) {
        setPaymentError("Please enter your name.");
        return;
      }

      // If user isn't logged in, register/log in locally so their account exists
      if (!user) {
        const signRes = signup(targetPhone, "1234", targetName);
        if (!signRes.success && signRes.error?.includes("already exists")) {
          login(targetPhone, "1234");
        }
      }

      setIsInitiatingPayment(true);

      const res = await fetch("/api/payment/phonepe/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: selectedOption,
          userPhone: targetPhone,
          userName: targetName,
          userDob: effectiveDob,
        }),
      });

      const data = await res.json();
      if (data.success && data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        setPaymentError(data.error || "Unable to reach PhonePe gateway. Please try again.");
        setIsInitiatingPayment(false);
      }
    } catch (err: any) {
      console.error("Payment initiation error:", err);
      setPaymentError(err.message || "Network error. Please try again.");
      setIsInitiatingPayment(false);
    }
  };

  const catalog: Record<PurchaseOptionType, { price: string; label: string; badge?: string }> = {
    trial_99: { price: "99", label: "₹99 Starter Pack (1 Profile / 2 Deep Questions / 1 Matchmaking Analysis)" },
    duo_599: { price: "499", label: "₹499 Duo Pass (2 Profiles / 6 Deep Questions / 3 Total Matchmakings)" },
    unlimited_1009: { price: "999", label: "₹999 Pro & Family Pass (Multi-Profile / 18 Deep Questions / 5 Total Matchmakings)" },
    topup_60: { price: "60", label: "₹60 Matchmaking Top-Up (2 Additional Matchmaking Analyses)", badge: "Quick Pack" },
    topup_99: { price: "99", label: "₹99 Matchmaking Top-Up (5 Additional Matchmaking Analyses)", badge: "Best Value" },
    love_ex_249: { price: "249", label: "₹249 Khoya Pyar & Get Your Ex Back Pass", badge: "Romantic Synastry" },
    kalesh_saas_299: { price: "299", label: "₹299 Ghar Kalesh & Sasural Shanti Pass", badge: "Family Harmony" },
    intercaste_349: { price: "349", label: "₹349 Intercaste Vivah & Parivaar Manana Pass", badge: "Vivah Badha Nivaran" },
  };

  const itemInfo = catalog[selectedOption] || catalog.trial_99;

  const currentName = user?.name || guestName || userName || "Seeker";
  const currentPhone = user?.phone || guestPhone || "Not provided";

  const waMessage = selectedOption.startsWith("topup")
    ? `Hi Rekha, I am ${currentName} (Phone: ${currentPhone}). I have a query about the ${itemInfo.label}.`
    : `Hi Rekha, I am ${currentName}, DOB: ${effectiveDob}, Phone: ${currentPhone}. I have a query regarding the ₹${itemInfo.price} plan (${itemInfo.label}).`;

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

        {/* Super Admin Notice Banner */}
        {isAdmin && (
          <div className="mb-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-200">
            <div className="flex items-center gap-2">
              <span className="text-base">👑</span>
              <div>
                <strong className="text-amber-300">Super Admin Preview Mode:</strong>
                <span className="text-slate-300 ml-1">You have full authority. You can test plans, top-ups, and preview what seekers experience.</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-[10px] font-bold text-amber-300 uppercase shrink-0">
              Live Preview
            </span>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                Vedic Consultation &amp; Synastry Access
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
                {activeTab === "topup"
                  ? "Need Extra Matchmaking Scans?"
                  : activeTab === "special"
                  ? "Vedic Samadhan Passes"
                  : "Choose Your Destiny Access Tier"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-lg mx-auto">
                {exhaustedReason ||
                  (activeTab === "topup"
                    ? "Top up matchmaking credits anytime for quick relationship compatibility checks."
                    : activeTab === "special"
                    ? "Targeted shastriya remedies for love, ex, in-law harmony, and intercaste vivah badha."
                    : "Select the plan that fits your personal or relationship consultation needs.")}
              </p>

              {/* Mode Toggle Tabs (3 Distinct Options) */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("plans");
                    if (selectedOption.startsWith("topup") || selectedOption.startsWith("love") || selectedOption.startsWith("kalesh") || selectedOption.startsWith("intercaste")) {
                      setSelectedOption("trial_99");
                    }
                  }}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === "plans"
                      ? "bg-gold-500 text-cosmic-950 shadow-md shadow-gold-500/20"
                      : "bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  General Plans (₹99 / ₹499 / ₹999)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("special");
                    setSelectedOption("love_ex_249");
                  }}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    activeTab === "special"
                      ? "bg-gradient-to-r from-rose-500 via-amber-500 to-purple-600 text-white shadow-md shadow-rose-500/25"
                      : "bg-white/5 text-amber-300 hover:bg-white/10 border border-amber-500/20"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Vedic Samadhan Passes (₹249 / ₹299 / ₹349)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("topup");
                    setSelectedOption("topup_60");
                  }}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    activeTab === "topup"
                      ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                      : "bg-white/5 text-rose-300 hover:bg-white/10 border border-rose-500/20"
                  }`}
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Match Top-Ups (₹60 / ₹99)</span>
                </button>
              </div>
            </div>

            {/* TAB 1: General Subscription Plans */}
            {activeTab === "plans" && (
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
            )}

            {/* TAB 2: Vedic Samadhan Passes (Distinct Visuals & Targeted Solutions) */}
            {activeTab === "special" && (
              <div className="space-y-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* PASS 1: Khoya Pyar Wapas Paayen & Get Your Ex Back (₹249) */}
                  <div
                    onClick={() => setSelectedOption("love_ex_249")}
                    className={`cursor-pointer rounded-3xl p-5 border transition-all relative flex flex-col justify-between overflow-hidden ${
                      selectedOption === "love_ex_249"
                        ? "bg-gradient-to-b from-rose-950/80 via-cosmic-900 to-pink-950/40 border-rose-400 shadow-2xl shadow-rose-500/25 scale-[1.02]"
                        : "bg-cosmic-950/70 border-rose-500/20 hover:border-rose-400/40 opacity-90"
                    }`}
                  >
                    {/* Glowing Top Pill */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-black uppercase tracking-wider border border-rose-500/40 flex items-center gap-1.5">
                        <Heart className="w-3 h-3 text-rose-400 fill-rose-400/40" />
                        Prem Punarmilan &amp; Ex Wapsi
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 bg-black/40 px-2 py-0.5 rounded-full">
                        2 Palms Sync
                      </span>
                    </div>

                    <div>
                      {/* Price Section with Traditional Comparison */}
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-3xl sm:text-4xl font-black text-rose-200 font-serif">₹249</span>
                        <span className="text-[11px] text-slate-400 line-through">₹2,100 Pandit Dakshina</span>
                      </div>
                      <h4 className="text-sm font-extrabold text-white leading-snug">
                        Khoya Pyar Wapas Paayen &amp; Get Your Ex Back
                      </h4>
                      <p className="text-[11px] text-rose-200/80 mt-1">
                        Shukra-Chandra synastry aur algaav dosh shanti dwara dil ki dooriyan khatam karne ka shastriya path.
                      </p>

                      {/* Distinct Structure: Dual-Palm Synastry Conduit */}
                      <div className="my-3.5 p-2.5 rounded-2xl bg-black/40 border border-rose-500/25">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-rose-200">
                          <div className="flex items-center gap-1">
                            <span className="text-sm">🫱</span>
                            <span>Aapka Palm</span>
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-rose-300 font-bold px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/30">
                            <Heart className="w-2.5 h-2.5 text-rose-400 fill-rose-400" />
                            <span>Prem Yog Synastry</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>Ex / Partner</span>
                            <span className="text-sm">🫲</span>
                          </div>
                        </div>
                      </div>

                      {/* Distinct Structure: 3-Phase Milestone Journey */}
                      <div className="space-y-2 mt-2">
                        <div className="p-2 rounded-xl bg-rose-500/5 border border-rose-500/15 flex items-start gap-2 text-xs">
                          <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                            01
                          </span>
                          <div>
                            <strong className="text-white text-[11px] block">Algaav Dosh Diagnosis</strong>
                            <span className="text-[11px] text-slate-300">7th House, Ketu Peeda &amp; Rahu Chaya scan</span>
                          </div>
                        </div>

                        <div className="p-2 rounded-xl bg-rose-500/5 border border-rose-500/15 flex items-start gap-2 text-xs">
                          <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                            02
                          </span>
                          <div>
                            <strong className="text-white text-[11px] block">Wapsi Ka Shubh Samay</strong>
                            <span className="text-[11px] text-slate-300">Exact astrological window for communication reopening</span>
                          </div>
                        </div>

                        <div className="p-2 rounded-xl bg-rose-500/5 border border-rose-500/15 flex items-start gap-2 text-xs">
                          <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                            03
                          </span>
                          <div>
                            <strong className="text-white text-[11px] block">Kamadeva-Rati Vedic Vidhi</strong>
                            <span className="text-[11px] text-slate-300">100% Sattvik &amp; Sacred Pooja for softening heart</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-2">
                      <div className="text-[10px] text-center text-rose-300/80 mb-2 font-medium">
                        ✓ 2 Dedicated Questions • 2 Palms Analyzed
                      </div>
                      <div
                        className={`w-full py-2.5 rounded-xl text-center text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                          selectedOption === "love_ex_249"
                            ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30 font-black"
                            : "bg-white/10 text-slate-300 hover:bg-white/15"
                        }`}
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                        Select ₹249 Prem Pass
                      </div>
                    </div>
                  </div>

                  {/* PASS 2: Ghar Main Kalesh Se Mukti & Saas Se Banti Nahi Hai? (₹299) */}
                  <div
                    onClick={() => setSelectedOption("kalesh_saas_299")}
                    className={`cursor-pointer rounded-3xl p-5 border transition-all relative flex flex-col justify-between overflow-hidden ${
                      selectedOption === "kalesh_saas_299"
                        ? "bg-gradient-to-b from-emerald-950/80 via-cosmic-900 to-teal-950/40 border-emerald-400 shadow-2xl shadow-emerald-500/25 scale-[1.02]"
                        : "bg-cosmic-950/70 border-emerald-500/20 hover:border-emerald-400/40 opacity-90"
                    }`}
                  >
                    {/* Glowing Top Pill */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider border border-emerald-500/40 flex items-center gap-1.5">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        Griha Shanti &amp; Parivarik Izzat
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 bg-black/40 px-2 py-0.5 rounded-full">
                        3 Profiles Sync
                      </span>
                    </div>

                    <div>
                      {/* Price Section with Traditional Comparison */}
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-3xl sm:text-4xl font-black text-emerald-200 font-serif">₹299</span>
                        <span className="text-[11px] text-slate-400 line-through">₹3,500 Havan Kharch</span>
                      </div>
                      <h4 className="text-sm font-extrabold text-white leading-snug">
                        Ghar Main Kalesh Se Mukti &amp; Saas Se Banti Nahi?
                      </h4>
                      <p className="text-[11px] text-emerald-200/80 mt-1">
                        Griha Bhava aur Matru-Pitri graha krodh ko shaant karke ghar me aadar aur aman ka vaas.
                      </p>

                      {/* Distinct Structure: 3-Pillar Parivarik Suraksha Chakra */}
                      <div className="my-3.5 p-2 rounded-2xl bg-black/40 border border-emerald-500/25">
                        <div className="text-[9px] uppercase font-bold text-emerald-300/80 mb-1 text-center tracking-wider">
                          3-Way Domestic Peace Alignment
                        </div>
                        <div className="grid grid-cols-3 gap-1 text-[10px] font-bold text-center">
                          <div className="py-1 px-1 rounded-lg bg-emerald-500/15 text-emerald-200 border border-emerald-500/20">
                            Bahu / Aap
                          </div>
                          <div className="py-1 px-1 rounded-lg bg-amber-500/20 text-amber-200 border border-amber-500/30">
                            🤝 Saas / In-Laws
                          </div>
                          <div className="py-1 px-1 rounded-lg bg-emerald-500/15 text-emerald-200 border border-emerald-500/20">
                            Pati &amp; Ghar
                          </div>
                        </div>
                      </div>

                      {/* Distinct Structure: 2x2 Feature Quadrant Grid */}
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="p-2 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                          <span className="text-[11px] font-bold text-emerald-300 block mb-0.5">🏛️ Saas-Bahu Maitri</span>
                          <span className="text-[10px] text-slate-300 block leading-tight">4th &amp; 10th House peace pacification</span>
                        </div>
                        <div className="p-2 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                          <span className="text-[11px] font-bold text-emerald-300 block mb-0.5">🛡️ Krodh Nivaran</span>
                          <span className="text-[10px] text-slate-300 block leading-tight">Remedies to stop harsh words &amp; taunts</span>
                        </div>
                        <div className="p-2 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                          <span className="text-[11px] font-bold text-emerald-300 block mb-0.5">🪔 Vastu Kalesh Dosh</span>
                          <span className="text-[10px] text-slate-300 block leading-tight">Lal Kitab domestic energy cleansing</span>
                        </div>
                        <div className="p-2 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                          <span className="text-[11px] font-bold text-emerald-300 block mb-0.5">🌸 Shanti &amp; Izzat Path</span>
                          <span className="text-[10px] text-slate-300 block leading-tight">Daily Sattvik Vidhi for long-term respect</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-2">
                      <div className="text-[10px] text-center text-emerald-300/80 mb-2 font-medium">
                        ✓ 3 Profiles Supported • Full Vastu Guide
                      </div>
                      <div
                        className={`w-full py-2.5 rounded-xl text-center text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                          selectedOption === "kalesh_saas_299"
                            ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-cosmic-950 shadow-lg shadow-emerald-500/30 font-black"
                            : "bg-white/10 text-slate-300 hover:bg-white/15"
                        }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Select ₹299 Shanti Pass
                      </div>
                    </div>
                  </div>

                  {/* PASS 3: Intercaste Vivah & Parivaar Manana (₹349) */}
                  <div
                    onClick={() => setSelectedOption("intercaste_349")}
                    className={`cursor-pointer rounded-3xl p-5 border transition-all relative flex flex-col justify-between overflow-hidden ${
                      selectedOption === "intercaste_349"
                        ? "bg-gradient-to-b from-purple-950/80 via-cosmic-900 to-indigo-950/40 border-purple-400 shadow-2xl shadow-purple-500/25 scale-[1.02]"
                        : "bg-cosmic-950/70 border-purple-500/20 hover:border-purple-400/40 opacity-90"
                    }`}
                  >
                    {/* Glowing Top Pill */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-black uppercase tracking-wider border border-purple-500/40 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-purple-400" />
                        Vivah Svikriti &amp; Parivaar Sahmati
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 bg-black/40 px-2 py-0.5 rounded-full">
                        4 Profiles Sync
                      </span>
                    </div>

                    <div>
                      {/* Price Section with Traditional Comparison */}
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-3xl sm:text-4xl font-black text-purple-200 font-serif">₹349</span>
                        <span className="text-[11px] text-slate-400 line-through">₹5,100 Astrologer Fee</span>
                      </div>
                      <h4 className="text-sm font-extrabold text-white leading-snug">
                        Intercaste Marriage &amp; Parivaar Manana
                      </h4>
                      <p className="text-[11px] text-purple-200/80 mt-1">
                        Guru-Chandal &amp; 9th House Pitra dosh nivaran aur parents consent praapti anushthan.
                      </p>

                      {/* Distinct Structure: 3-Stage Destiny Bridge Roadmap */}
                      <div className="my-3.5 p-2 rounded-2xl bg-black/40 border border-purple-500/25">
                        <div className="text-[9px] uppercase font-bold text-purple-300/80 mb-1 text-center tracking-wider">
                          Vivah Badha Nivaran Roadmap
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-bold text-purple-200 px-1">
                          <span className="px-1.5 py-0.5 rounded bg-purple-500/20">1. Palm Match</span>
                          <span className="text-purple-400 text-xs">➔</span>
                          <span className="px-1.5 py-0.5 rounded bg-purple-500/20">2. Elder Neeti</span>
                          <span className="text-purple-400 text-xs">➔</span>
                          <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-200">3. Vivah Yog</span>
                        </div>
                      </div>

                      {/* Distinct Structure: Strategy Blueprint Stack */}
                      <div className="space-y-1.5 mt-2">
                        <div className="p-2 rounded-xl bg-purple-500/5 border border-purple-500/15 text-left">
                          <span className="text-[11px] font-bold text-purple-300 block">👑 Parivaar Manane Ki Shastriya Neeti</span>
                          <span className="text-[10px] text-slate-300 block leading-tight mt-0.5">Which elder to approach first based on Moon &amp; Jupiter</span>
                        </div>
                        <div className="p-2 rounded-xl bg-purple-500/5 border border-purple-500/15 text-left">
                          <span className="text-[11px] font-bold text-purple-300 block">🕊️ Brihaspati &amp; Shukra Bal Vidhi</span>
                          <span className="text-[10px] text-slate-300 block leading-tight mt-0.5">Strengthening marriage approval &amp; societal respect</span>
                        </div>
                        <div className="p-2 rounded-xl bg-purple-500/5 border border-purple-500/15 text-left">
                          <span className="text-[11px] font-bold text-purple-300 block">🔮 Nadi &amp; Gotra Samvaad Logic</span>
                          <span className="text-[10px] text-slate-300 block leading-tight mt-0.5">Sacred arguments to resolve orthodox family hesitation</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-2">
                      <div className="text-[10px] text-center text-purple-300/80 mb-2 font-medium">
                        ✓ 4 Multi-Family Profiles • 4 Detailed Queries
                      </div>
                      <div
                        className={`w-full py-2.5 rounded-xl text-center text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                          selectedOption === "intercaste_349"
                            ? "bg-gradient-to-r from-purple-400 to-indigo-400 text-white shadow-lg shadow-purple-500/30 font-black"
                            : "bg-white/10 text-slate-300 hover:bg-white/15"
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Select ₹349 Vivah Pass
                      </div>
                    </div>
                  </div>
                </div>

                {/* VIP Special WhatsApp Review Box */}
                <div className="p-4 sm:p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 text-left">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 text-xl">
                      💬
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-extrabold text-white">
                        Koi Special / Complex Issue? Rekha Ko WhatsApp Karein
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
                        Rekha poore 50+ classical scriptures aur kundali ko khangal kar aapko iska custom shastriya samadhan degi.
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/919274090534?text=Hi%20Rekha%2C%20I%20have%20a%20special%20issue%20and%20want%20a%20full%20scripture%20and%20kundali%20review."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs shrink-0 shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <span>WhatsApp: +91 92740 90534</span>
                  </a>
                </div>
              </div>
            )}

            {/* TAB 3: Matchmaking Top-Ups */}
            {activeTab === "topup" && (
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

            {/* Account Identification Section */}
            {user?.phone ? (
              <div className="mb-3 p-3.5 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-between text-xs text-gold-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Activating Plan For Account:</div>
                    <div className="text-white font-bold flex items-center gap-1.5">
                      <span>{user.name || "Seeker"}</span>
                      <span className="text-gold-300 font-mono text-xs">(+91 {user.phone})</span>
                    </div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                  Verified Seeker
                </span>
              </div>
            ) : (
              <div className="mb-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-left space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Mobile Number Required to Link Plan</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAuthModal(true)}
                    className="text-[11px] text-gold-300 hover:text-white underline underline-offset-2 font-medium transition-colors"
                  >
                    Already have an account? Log In
                  </button>
                </div>
                <p className="text-xs text-slate-300">
                  Enter your 10-digit mobile number so your payment is safely attached to your account and accessible across devices.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-cosmic-950 border border-white/20 text-white text-xs focus:border-gold-400 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">10-Digit Mobile Number *</label>
                    <div className="flex items-center rounded-xl bg-cosmic-950 border border-white/20 focus-within:border-gold-400 overflow-hidden px-3 py-2 transition-colors">
                      <span className="text-xs text-slate-400 font-semibold mr-1.5">+91</span>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="9876543210"
                        value={guestPhone}
                        onChange={(e) => {
                          setGuestPhone(e.target.value.replace(/\D/g, ""));
                          setPaymentError(null);
                        }}
                        className="w-full bg-transparent text-white text-xs font-mono outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PhonePe CTA & Security Section */}
            <div className="space-y-3.5 pt-2">
              {paymentError && (
                <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center animate-shake">
                  {paymentError}
                </div>
              )}

              <button
                type="button"
                disabled={isInitiatingPayment}
                onClick={handlePay}
                className={`w-full py-4 px-6 rounded-2xl text-xs sm:text-sm font-extrabold uppercase tracking-wider text-cosmic-950 bg-gradient-to-r from-gold-300 via-gold-400 to-amber-300 shadow-xl shadow-gold-500/30 hover:shadow-gold-500/50 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 ${
                  isInitiatingPayment ? "opacity-75 cursor-wait" : ""
                }`}
              >
                {isInitiatingPayment ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-cosmic-950" />
                    <span>Connecting to PhonePe Secure Gateway...</span>
                  </>
                ) : (
                  <>
                    <span>
                      Pay ₹{itemInfo.price} via PhonePe / UPI
                    </span>
                    <Sparkles className="w-4 h-4 text-cosmic-950" />
                  </>
                )}
              </button>

              {isAdmin && (
                <button
                  type="button"
                  onClick={() => {
                    if (selectedOption === "topup_60") {
                      addMatchmakingCredits(2);
                      alert("👑 Admin Action: +2 Matchmaking Credits added to your account.");
                    } else if (selectedOption === "topup_99") {
                      addMatchmakingCredits(5);
                      alert("👑 Admin Action: +5 Matchmaking Credits added to your account.");
                    } else {
                      unlockSubscription(selectedOption as SubscriptionTierType);
                      if (onSuccess) onSuccess(selectedOption as SubscriptionTierType);
                      alert(`👑 Admin Action: Plan activated successfully!`);
                    }
                    onClose();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <span>👑 Super Admin Instant Test Bypass (Free)</span>
                </button>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1 text-[11px] text-slate-400 px-1">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Secured by PhonePe • UPI, Cards & NetBanking
                </span>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-gold-300 underline underline-offset-2 flex items-center gap-1 transition-colors"
                >
                  <MessageCircle className="w-3 h-3 text-gold-400" />
                  <span>Questions? Chat with Rekha</span>
                </a>
              </div>
            </div>
      </div>

      {/* Quick Auth Modal for Existing User Login */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => setShowAuthModal(false)}
        title="Log In to Continue"
        subtitle="Enter your registered mobile number and PIN to link this subscription."
      />
    </div>
  );
}
