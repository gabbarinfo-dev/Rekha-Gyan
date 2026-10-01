"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  HelpCircle,
  Upload,
  Camera,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Zap,
  Eye,
  Trash2,
  User,
  Info,
  Layers,
  Lock,
  HeartHandshake,
  Globe,
  Heart,
  Phone,
  KeyRound,
  Users,
} from "lucide-react";
import ReadingDisplay from "./ReadingDisplay";
import AuthModal from "./AuthModal";
import SecondaryPersonModal, { SecondaryPersonData } from "./SecondaryPersonModal";
import ProfileLockWarningModal from "./ProfileLockWarningModal";
import PaywallModal, { SubscriptionTierType } from "./PaywallModal";
import { useAuth } from "@/lib/auth-context";
import { useLanguage, LanguageType } from "@/lib/language-context";

interface ReadingFormProps {
  initialFocus?: string;
  onResultStateChange?: (hasResult: boolean) => void;
}

export default function ReadingForm({ initialFocus, onResultStateChange }: ReadingFormProps) {
  const {
    user,
    isLoggedIn,
    updateProfile,
    lockPrimaryProfile,
    consumeQuota,
    canAskPartnerQuestion,
    canDoMatchmaking,
    hasServiceAccess,
    registerOrLoginInline,
  } = useAuth();
  const { language, setLanguage, setIsLanguageModalOpen } = useLanguage();

  // Wizard Steps: 1: Basic Details, 2: Dedicated Palm Upload, 3: Review Screen
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form Fields
  const [name, setName] = useState(user?.name || "");
  const [gender, setGender] = useState(user?.gender || "Male");
  const [dob, setDob] = useState(user?.dob || "");
  const [tob, setTob] = useState(user?.tob || "12:00");
  const [pob, setPob] = useState(user?.pob || "");
  const [maritalStatus, setMaritalStatus] = useState<string>(
    user?.maritalStatus || "Single / Unmarried"
  );
  const [phone, setPhone] = useState(user?.phone || "");
  const [pin, setPin] = useState("");
  const [selectedService, setSelectedService] = useState<string>("trial_99");

  // Specialized Service Questions & Tailored States
  const [lovePartnerName, setLovePartnerName] = useState("");
  const [loveSeparationTime, setLoveSeparationTime] = useState("1 se 3 Mahine");
  const [loveRelationStage, setLoveRelationStage] = useState("Breakup ho gaya hai aur baat band hai");

  const [kaleshTarget, setKaleshTarget] = useState("Saas (Mother-in-law) ke sath taane aur aadar ki kami");
  const [marriageYears, setMarriageYears] = useState("1-3 Saal");

  const [intercastePartnerName, setIntercastePartnerName] = useState("");
  const [intercastePartnerCommunity, setIntercastePartnerCommunity] = useState("");
  const [opposingSide, setOpposingSide] = useState("Ladke ke mata-pita nahi maan rahe");
  const [primaryHesitation, setPrimaryHesitation] = useState("Jaati / Gotra aur samajik darr");

  const [lifeFocus, setLifeFocus] = useState(initialFocus || "Career & Wealth Breakthrough");
  const [question, setQuestion] = useState("");

  // Secondary Person / Partner State
  const [secondaryPerson, setSecondaryPerson] = useState<SecondaryPersonData | null>(null);
  const [suggestedRelation, setSuggestedRelation] = useState("Partner / Spouse");
  const [showSecondaryModal, setShowSecondaryModal] = useState(false);
  const [showLockWarningModal, setShowLockWarningModal] = useState(false);
  const [lockModalMode, setLockModalMode] = useState<"warning_first_lock" | "limit_reached">("limit_reached");
  const [showPaywallModal, setShowPaywallModal] = useState(false);
  const [paywallTargetPlan, setPaywallTargetPlan] = useState<SubscriptionTierType>("trial_99");
  const [paywallTab, setPaywallTab] = useState<"plans" | "topup">("plans");
  const [paywallReason, setPaywallReason] = useState<string | undefined>();

  // Palm Photos
  const [leftPalmBase64, setLeftPalmBase64] = useState<string>(user?.savedLeftPalm || "");
  const [rightPalmBase64, setRightPalmBase64] = useState<string>(user?.savedRightPalm || "");
  const [leftPreview, setLeftPreview] = useState<string>(user?.savedLeftPalm || "");
  const [rightPreview, setRightPreview] = useState<string>(user?.savedRightPalm || "");

  // Loading & Results
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [step1Error, setStep1Error] = useState<string | null>(null);
  const [resultData, setResultData] = useState<any | null>(null);

  // Notify parent page if reading results are active and scroll to top
  useEffect(() => {
    if (onResultStateChange) {
      onResultStateChange(Boolean(resultData));
    }
    if (resultData) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [resultData, onResultStateChange]);

  // Ref for inline step-1 error (scrolls into view on mobile)
  const step1ErrorRef = useRef<HTMLDivElement>(null);

  // Auth Modal State
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Auto-prefill if user logs in
  useEffect(() => {
    if (user) {
      if (user.primaryProfileName) setName(user.primaryProfileName);
      else if (user.name) setName(user.name);
      if (user.gender) setGender(user.gender);
      if (user.dob) setDob(user.dob);
      if (user.tob) setTob(user.tob);
      if (user.pob && !pob) setPob(user.pob);
      if (user.maritalStatus) setMaritalStatus(user.maritalStatus);
      if (user.phone) setPhone(user.phone);
      if (user.savedLeftPalm && !leftPalmBase64) {
        setLeftPalmBase64(user.savedLeftPalm);
        setLeftPreview(user.savedLeftPalm);
      }
      if (user.savedRightPalm && !rightPalmBase64) {
        setRightPalmBase64(user.savedRightPalm);
        setRightPreview(user.savedRightPalm);
      }
    }
  }, [user]);

  // Listen for custom service selection event from 6 cards
  useEffect(() => {
    const handler = (e: any) => {
      if (e.detail) {
        setSelectedService(e.detail);
        if (e.detail === "love_ex_249") {
          setLifeFocus("Love, Marriage & Relationship Destiny");
        } else if (e.detail === "kalesh_saas_299") {
          setLifeFocus("Love, Marriage & Relationship Destiny");
          setMaritalStatus("Married");
        } else if (e.detail === "intercaste_349") {
          setLifeFocus("Love, Marriage & Relationship Destiny");
        }
      }
    };
    window.addEventListener("rekha_select_service", handler);
    return () => window.removeEventListener("rekha_select_service", handler);
  }, []);

  // Read ?service= from URL query params (e.g. from WordPress deep link)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const s = params.get("service");
      if (s) {
        if (s === "starter_99") setSelectedService("trial_99");
        else if (s === "duo_499") setSelectedService("duo_599");
        else if (s === "unlimited_999") setSelectedService("unlimited_1009");
        else if (["love_ex_249", "kalesh_saas_299", "intercaste_349", "trial_99", "duo_599", "unlimited_1009"].includes(s)) {
          setSelectedService(s);
        }
      }
    }
  }, []);

  const focusOptions = [
    "Career & Wealth Breakthrough",
    "Love, Marriage & Relationship Destiny",
    "Business, Investments & Foreign Settlement",
    "Health, Vitality & Mental Peace",
    "Spiritual Awakening & Karmic Lessons",
  ];

  const quickQuestions = [
    "When will my career take a major leap, and will I relocate?",
    "Is starting my own venture favored under my current dasha?",
    "When will I meet my genuine life partner, and how will our bond be?",
    "What specific gemstone and remedies will remove my present financial blockage?",
  ];

  const detectSecondPersonContext = (text: string): {
    isDetected: boolean;
    suggestedRelation: string;
  } => {
    const q = text.toLowerCase();

    // 1. Friendship & Social Connections (Arunima's case)
    if (/\b(friend|friendship|bestie|best friend|dost|dosti|saheli|yaar|mitra|close friend)\b/i.test(q)) {
      return { isDetected: true, suggestedRelation: "Friend" };
    }

    // 2. Spouse & Marital
    if (/\b(husband|pati|hubby)\b/i.test(q)) {
      return { isDetected: true, suggestedRelation: "Husband" };
    }
    if (/\b(wife|patni|biwi)\b/i.test(q)) {
      return { isDetected: true, suggestedRelation: "Wife" };
    }

    // 3. Romantic / Dating / Partner (Ankita & Nilima's cases)
    if (/\b(boyfriend|bf|fianc[eé]|lover|guy)\b/i.test(q) || (/\b(him)\b/i.test(q) && /\b(love|marry|marriage|future|shaadi|relationship|affair|dating|together)\b/i.test(q))) {
      return { isDetected: true, suggestedRelation: "Boyfriend" };
    }
    if (/\b(girlfriend|gf)\b/i.test(q) || (/\b(her)\b/i.test(q) && /\b(love|marry|marriage|future|shaadi|relationship|affair|dating|together)\b/i.test(q))) {
      return { isDetected: true, suggestedRelation: "Girlfriend" };
    }
    if (/\b(crush|soulmate|partner|lover)\b/i.test(q)) {
      return { isDetected: true, suggestedRelation: "Partner / Spouse" };
    }

    // 4. Business & Professional
    if (/\b(business partner|co-founder|cofounder|colleague|coworker|boss|partnership)\b/i.test(q)) {
      return { isDetected: true, suggestedRelation: "Business Partner" };
    }

    // 5. Family & In-Laws
    if (/\b(mother-in-law|father-in-law|saas|sasur|bhabhi|devar|jeth|nanad|in-laws|sasural)\b/i.test(q)) {
      return { isDetected: true, suggestedRelation: "Family / In-Laws" };
    }

    // 6. Broad Relational Dynamics & Named Person Inquiries
    const broadRelational = [
      /\b(marry|marriage|shaadi|vivaah|rishta|prem|affair|extra marital)\b/i,
      /\b(cheat|cheating|loyalty|honest|faithful|divorce|breakup|break up|patchup|patch up)\b/i,
      /\b(together forever|future together|future with|live with him|live with her)\b/i,
      /\b(compatibility|compatible|guna milan|synastry|kundli match)\b/i,
      /\b(we both|both of us|two of us)\b/i,
      /\b(fights? with|misunderstanding with|avoids? talking to me|avoiding me)\b/i,
      /\b(i love [a-z]+|future with [a-z]+|marrying [a-z]+|relationship with)\b/i,
    ];

    if (broadRelational.some((pattern) => pattern.test(q))) {
      return { isDetected: true, suggestedRelation: "Partner / Spouse" };
    }

    return { isDetected: false, suggestedRelation: "Partner / Spouse" };
  };

  // Image optimization helper (client-side resize for fast uploads & crisp AI vision)
  const processImageFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const MAX_DIM = 1200;
          let width = img.width;
          let height = img.height;

          if (width > MAX_DIM || height > MAX_DIM) {
            if (width > height) {
              height = Math.round((height * MAX_DIM) / width);
              width = MAX_DIM;
            } else {
              width = Math.round((width * MAX_DIM) / height);
              height = MAX_DIM;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(event.target?.result as string);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const compressedB64 = canvas.toDataURL("image/jpeg", 0.80);
          resolve(compressedB64);
        };
        img.onerror = () => {
          resolve(event.target?.result as string);
        };
        img.src = event.target?.result as string;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  // File & Camera Upload Handler
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    side: "left" | "right"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const b64 = await processImageFile(file);
      if (side === "left") {
        setLeftPalmBase64(b64);
        setLeftPreview(b64);
      } else {
        setRightPalmBase64(b64);
        setRightPreview(b64);
      }
    } catch (err) {
      console.error("Image processing error:", err);
    } finally {
      e.target.value = "";
    }
  };

  // Final submission on Step 3 (Review Screen)
  const handleFinalSubmit = async () => {
    setError(null);
    setLoading(true);
    setLoadingStage(1);

    // If user is logged in, save their details & palm photos for future 1-click use
    if (isLoggedIn) {
      updateProfile({
        name,
        gender,
        dob,
        tob,
        pob,
        savedLeftPalm: leftPalmBase64,
        savedRightPalm: rightPalmBase64,
      });

      // Synchronize full consultation coordinates to Super Admin registry
      fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: user?.phone,
          name,
          gender,
          dob,
          tob,
          pob,
          issue: question,
          lifeFocus,
          isSubscribed: Boolean(user?.isSubscribed),
          subscriptionPlan: user?.subscriptionPlan || null,
        }),
      }).catch((err) => console.warn("Admin consultation sync non-blocking warning:", err));
    }

    const timer1 = setTimeout(() => setLoadingStage(2), 2200);
    const timer2 = setTimeout(() => setLoadingStage(3), 4800);
    const timer3 = setTimeout(() => setLoadingStage(4), 8500);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          gender,
          dob,
          tob,
          pob,
          lifeFocus,
          question,
          language,
          maritalStatus,
          selectedService,
          specializedData: {
            partnerName: lovePartnerName || intercastePartnerName || undefined,
            relationStage: loveRelationStage,
            separationTime: loveSeparationTime,
            kaleshTarget,
            marriageYears,
            opposingSide,
            primaryHesitation,
          },
          leftPalmBase64: leftPalmBase64 || undefined,
          rightPalmBase64: rightPalmBase64 || undefined,
          secondaryPerson: secondaryPerson || undefined,
          userPhone: user?.phone || phone || undefined,
        }),
      });

      if (isLoggedIn) {
        consumeQuota(secondaryPerson ? "matchmaking" : "deepQuestion");
        if (!user?.primaryProfileLocked) {
          lockPrimaryProfile();
        }
      }

      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);

      let data: any;
      try {
        data = await res.json();
      } catch (jsonErr) {
        if (res.status === 504 || res.status === 408) {
          throw new Error("AI Vision computation took longer than expected due to heavy network traffic. Please click 'Start My Reading' again — it will complete faster on retry.");
        }
        if (res.status === 413) {
          throw new Error("Palm photos are too large. Please take closer, compressed photos and try again.");
        }
        throw new Error(`Server returned status ${res.status}. Please try again.`);
      }

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to generate reading. Please verify details and try again.");
      }

      setResultData(data);
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(err.message || "Something went wrong while consulting the stars. Please try again.");
    } finally {
      setLoading(false);
      setLoadingStage(0);
    }
  };

  const handleReset = () => {
    setResultData(null);
    setStep(1);
    setQuestion("");
    if (onResultStateChange) {
      onResultStateChange(false);
    }
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  if (resultData) {
    return (
      <ReadingDisplay
        reading={resultData.reading}
        insights={resultData.insights}
        freeTeaser={resultData.freeTeaser}
        palmFeatures={resultData.palmFeatures}
        userQuestion={resultData.userQuestion || question}
        userName={resultData.userName || name}
        userDob={resultData.userDob || dob}
        userTob={resultData.userTob || tob}
        userPob={resultData.userPob || pob}
        vedicChart={resultData.vedicChart}
        consensus={resultData.consensus}
        pujaVidhi={resultData.pujaVidhi}
        synastry={resultData.synastry}
        secondaryPerson={resultData.secondaryPerson}
        readingId={resultData.readingId}
        isUnlocked={resultData.isUnlocked}
        onReset={handleReset}
      />
    );
  }

  return (
    <div id="reading-form" className="w-full max-w-3xl mx-auto px-1 sm:px-0">
      <div className="cosmic-card rounded-3xl p-4 sm:p-8 md:p-10 border border-gold-500/30 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        {/* Step Indicator Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 sm:pb-5 mb-6 sm:mb-8">
          <div>
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-gold-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Live Consultation Workflow
            </span>
            <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white font-serif mt-1">
              {step === 1 && "Step 1: Your Birth & Focus Details"}
              {step === 2 && "Step 2: Upload Both Palms (Left & Right)"}
              {step === 3 && "Step 3: Review & Initiate Reading"}
            </h3>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                onClick={() => {
                  if (num < step) setStep(num as any);
                }}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                  step === num
                    ? "bg-gradient-to-br from-gold-300 to-amber-400 text-cosmic-950 shadow-md shadow-gold-500/40 scale-110"
                    : num < step
                    ? "bg-gold-500/20 text-gold-300 border border-gold-500/30"
                    : "bg-white/5 text-slate-500 border border-white/5"
                }`}
              >
                {num < step ? "✓" : num}
              </div>
            ))}
          </div>
        </div>

        {/* Guest Tip or Logged-in badge */}
        {!isLoggedIn ? (
          <div className="mb-6 p-3 sm:p-3.5 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Info className="w-4 h-4 text-gold-400 shrink-0" />
              <span>
                <strong>Tip:</strong> Log in with phone to auto-save your palm photos &amp; birth details.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowAuthModal(true)}
              className="w-full sm:w-auto text-center px-3.5 py-1.5 rounded-xl bg-gold-400 hover:bg-gold-300 text-cosmic-950 font-bold uppercase tracking-wider text-[11px] shadow transition-all"
            >
              Login / Sign Up
            </button>
          </div>
        ) : (
          <div className="mb-6 p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-300">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Logged in as <strong className="text-white">{user?.name || user?.phone}</strong></span>
            </span>
            {user?.savedLeftPalm && (
              <span className="text-[11px] text-gold-300 bg-gold-500/10 px-2 py-0.5 rounded-full">
                Saved Palms Ready
              </span>
            )}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex items-center gap-2.5 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 z-40 bg-cosmic-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full border-4 border-gold-500/20 border-t-gold-400 animate-spin"></div>
              <Sparkles className="w-8 h-8 text-gold-400 absolute inset-0 m-auto animate-pulse" />
            </div>

            <h4 className="text-2xl font-bold font-serif text-white mb-2">
              REKHA Vision &amp; Vedic Synthesis
            </h4>
            <p className="text-xs sm:text-sm text-gold-300/80 mb-6 max-w-md">
              Please wait while REKHA executes real multimodal vision analysis and searches 50+ classical treatises...
            </p>

            {/* Stages */}
            <div className="w-full max-w-sm space-y-2.5 text-left">
              {[
                "1. Scanning left & right palm mount elevation and skin creases",
                "2. Computing Vedic Lagna, Moon sign & Vimshottari Mahadasha",
                "3. Cross-validating markings across Brihat Samhita & Hastasanjivani",
                "4. Formulating precise answers, timelines & sacred remedies",
              ].map((text, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2.5 text-xs p-2.5 rounded-xl transition-all ${
                    loadingStage > idx
                      ? "bg-gold-500/15 text-gold-300 border border-gold-500/30"
                      : loadingStage === idx + 1
                      ? "bg-white/10 text-white font-medium animate-pulse"
                      : "text-slate-500 opacity-50"
                  }`}
                >
                  {loadingStage > idx ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-current shrink-0"></div>
                  )}
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 1: Basic Details & Life Focus */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            {/* 6 Services Selection Strip & Gating Engine */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-gold-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  Select Your Consultation Service (6 Dedicated Pathways)
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {user?.isSubscribed ? "Active Passes Highlighted" : "Free Initial Preview Available"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {[
                  {
                    id: "trial_99",
                    name: "Niji Jeevan Starter",
                    price: "₹99",
                    sub: "1 Palm, Mukhya Sawaal & 30-Day Access",
                    accent: "border-amber-500/40 text-amber-300 bg-amber-500/10",
                  },
                  {
                    id: "duo_599",
                    name: "Jeevan Darshan Duo",
                    price: "₹499",
                    sub: "2 Palms Synastry & 6 Deep Inquiries",
                    accent: "border-blue-500/40 text-blue-300 bg-blue-500/10",
                  },
                  {
                    id: "unlimited_1009",
                    name: "Pro Kundali & Family",
                    price: "₹999",
                    sub: "Unlimited Profiles & Full Synastry",
                    accent: "border-gold-500/40 text-gold-300 bg-gold-500/10",
                  },
                  {
                    id: "love_ex_249",
                    name: "Prem Punarmilan & Ex Back",
                    price: "₹249",
                    sub: "Shukra Synastry & 2 Palms Match",
                    accent: "border-rose-500/40 text-rose-300 bg-rose-500/10",
                  },
                  {
                    id: "kalesh_saas_299",
                    name: "Ghar Kalesh & Saas Vivad",
                    price: "₹299",
                    sub: "Griha Shanti & 3 Profiles Peace",
                    accent: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10",
                  },
                  {
                    id: "intercaste_349",
                    name: "Intercaste Vivah & Parivaar",
                    price: "₹349",
                    sub: "Parents Consent & 4 Profiles Sync",
                    accent: "border-purple-500/40 text-purple-300 bg-purple-500/10",
                  },
                ].map((srv) => {
                  const isUserSubscribed = Boolean(user?.isSubscribed);
                  const isUnlocked = hasServiceAccess(srv.id);
                  const isSelected = selectedService === srv.id;

                  // GATING LOGIC:
                  // If user has subscription, only unlocked services are active; non-subscribed services are greyed out!
                  // If user is not subscribed (free preview mode), all are accessible for initial trust reading.
                  const isGreyedOut = isUserSubscribed && !isUnlocked;

                  return (
                    <div
                      key={srv.id}
                      onClick={() => {
                        if (isGreyedOut) {
                          setPaywallTargetPlan(srv.id as any);
                          setPaywallTab("plans");
                          setPaywallReason(`Aapka subscription active hai, parantu ${srv.name} (${srv.price}) service ke liye ye pass required hai.`);
                          setShowPaywallModal(true);
                          return;
                        }
                        setSelectedService(srv.id);
                        if (srv.id === "love_ex_249") {
                          setLifeFocus("Love, Marriage & Relationship Destiny");
                          if (!question || question.includes("Ghar main kalesh") || question.includes("Intercaste")) {
                            setQuestion("Mera khoya pyar / ex partner kab wapas aayega aur hamare beech algaav ka shastriya nivaran kya hai?");
                          }
                        } else if (srv.id === "kalesh_saas_299") {
                          setLifeFocus("Love, Marriage & Relationship Destiny");
                          setMaritalStatus("Married");
                          if (!question || question.includes("khoya pyar") || question.includes("Intercaste")) {
                            setQuestion("Ghar main kalesh aur saas se vivad se mukti kaise milegi? Parivaar me izzat aur shanti ka shastriya upaay batayein.");
                          }
                        } else if (srv.id === "intercaste_349") {
                          setLifeFocus("Love, Marriage & Relationship Destiny");
                          if (!question || question.includes("khoya pyar") || question.includes("saas")) {
                            setQuestion("Intercaste vivah ke liye dono parivaaron ko manane ka shastriya muhurat aur graha samadhan kya hai?");
                          }
                        }
                      }}
                      className={`p-3 rounded-2xl border transition-all text-left relative overflow-hidden cursor-pointer ${
                        isSelected
                          ? `${srv.accent} shadow-md scale-[1.01]`
                          : isGreyedOut
                          ? "opacity-50 grayscale bg-black/40 border-white/5 cursor-not-allowed"
                          : "bg-white/[0.02] border-white/10 hover:border-white/20 text-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-bold truncate">
                          {srv.name}
                        </span>
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-white/10 shrink-0">
                          {srv.price}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-tight">
                        {srv.sub}
                      </p>

                      {/* Gating Status Badges */}
                      {isGreyedOut ? (
                        <div className="mt-2 flex items-center justify-between text-[10px] text-amber-300/80 bg-black/40 px-2 py-0.5 rounded">
                          <span className="flex items-center gap-1">
                            <Lock className="w-3 h-3 text-amber-400" />
                            Locked
                          </span>
                          <span className="font-bold underline text-amber-300">
                            Unlock {srv.price} Pass
                          </span>
                        </div>
                      ) : isUserSubscribed && isUnlocked ? (
                        <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Active Unlocked</span>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* User Account & Basic Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-gold-400" />
                  Your Full Name <span className="text-gold-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aryan Sharma"
                  className="w-full px-4 py-3 rounded-2xl bg-cosmic-950/70 border border-white/10 text-white placeholder-slate-500 focus:border-gold-400 focus:outline-none text-sm transition-all"
                />
              </div>

              {/* Relationship / Marital Status */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  Marital / Relationship Status <span className="text-gold-400">*</span>
                </label>
                <select
                  value={maritalStatus}
                  onChange={(e) => setMaritalStatus(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-cosmic-950/70 border border-white/10 text-white focus:border-gold-400 focus:outline-none text-sm transition-all"
                >
                  <option value="Single / Unmarried">Single / Unmarried</option>
                  <option value="In a Relationship">In a Relationship (Prem Sambandh)</option>
                  <option value="Married">Married (Vivahit)</option>
                  <option value="Separated / Dooriyan">Separated (Algaav / Doori)</option>
                  <option value="Divorced">Divorced (Talakshuda)</option>
                </select>
              </div>

              {/* Mandatory Mobile Number & PIN Gate - Only visible when NOT logged in */}
              {!isLoggedIn && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-gold-400" />
                      Mobile Number (WhatsApp/SMS) <span className="text-gold-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-xs font-bold text-gold-400">
                        +91
                      </div>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        placeholder="9876543210"
                        className="w-full pl-12 pr-4 py-3 rounded-2xl bg-cosmic-950/70 border border-white/10 text-white placeholder-slate-500 focus:border-gold-400 focus:outline-none text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-gold-400" />
                      4-Digit Security PIN / Password <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      maxLength={6}
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      placeholder="e.g. 1234"
                      className="w-full px-4 py-3 rounded-2xl bg-cosmic-950/70 border border-white/10 text-white placeholder-slate-500 focus:border-gold-400 focus:outline-none text-sm tracking-widest transition-all"
                    />
                  </div>
                </>
              )}

              {/* Gender */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-cosmic-950/70 border border-white/10 text-white focus:border-gold-400 focus:outline-none text-sm transition-all"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary / Other">Non-binary / Other</option>
                </select>
              </div>

              {/* Date of Birth */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gold-400" />
                  Date of Birth <span className="text-gold-400">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-cosmic-950/70 border border-white/10 text-white focus:border-gold-400 focus:outline-none text-sm transition-all"
                />
              </div>

              {/* Time of Birth */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gold-400" />
                  Time of Birth (Optional)
                </label>
                <input
                  type="time"
                  value={tob}
                  onChange={(e) => setTob(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-cosmic-950/70 border border-white/10 text-white focus:border-gold-400 focus:outline-none text-sm transition-all"
                />
              </div>

              {/* Place of Birth */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gold-400" />
                  Place of Birth (City, Country) <span className="text-gold-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={pob}
                  onChange={(e) => setPob(e.target.value)}
                  placeholder="e.g. Mumbai, India or London, UK"
                  className="w-full px-4 py-3 rounded-2xl bg-cosmic-950/70 border border-white/10 text-white placeholder-slate-500 focus:border-gold-400 focus:outline-none text-sm transition-all"
                />
              </div>
            </div>

            {/* TAILORED SPECIALIZED QUESTIONS OR STANDARD QUESTION */}
            {selectedService === "love_ex_249" && (
              <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-rose-950/40 to-cosmic-950 border border-rose-500/35 space-y-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-400" />
                  <h4 className="text-base font-bold text-white font-serif">
                    Prem Punarmilan &amp; Ex Wapsi Focus
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Shukra aur Chandra rekhaon dwara algaav dosh aur hriday ki dooriyan scan karne ke liye apne sambandh ki vartaman sthiti batayein:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-rose-200">
                      Partner / Ex Ka Naam (Optional / Initials)
                    </label>
                    <input
                      type="text"
                      value={lovePartnerName}
                      onChange={(e) => setLovePartnerName(e.target.value)}
                      placeholder="e.g. Riya / Sameer"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-rose-500/30 text-white text-xs placeholder-slate-500 focus:border-rose-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-rose-200">
                      Sambandh Ki Vartaman Sthiti
                    </label>
                    <select
                      value={loveRelationStage}
                      onChange={(e) => setLoveRelationStage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-rose-500/30 text-white text-xs focus:border-rose-400 focus:outline-none"
                    >
                      <option value="Breakup ho gaya hai aur baat band hai">Breakup ho gaya hai aur baat band hai</option>
                      <option value="Rishte me thandak / dooriyan aa gayi hain">Rishte me thandak / achanak dooriyan aa gayi hain</option>
                      <option value="Shaadi-shuda hain lekin aapsi algaav chal raha hai">Shaadi-shuda hain lekin aapsi algaav chal raha hai</option>
                      <option value="Divorce / Legal algaav ki sthiti hai">Divorce / Legal algaav ki sthiti hai</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-rose-200">
                      Kab Se Doori Ya Baatcheet Band Hai?
                    </label>
                    <select
                      value={loveSeparationTime}
                      onChange={(e) => setLoveSeparationTime(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-rose-500/30 text-white text-xs focus:border-rose-400 focus:outline-none"
                    >
                      <option value="1 se 3 Mahine">1 se 3 Mahine</option>
                      <option value="3 se 6 Mahine">3 se 6 Mahine</option>
                      <option value="6 Mahine se 1 Saal">6 Mahine se 1 Saal</option>
                      <option value="1 Saal se adhik samay se">1 Saal se adhik samay se</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {selectedService === "kalesh_saas_299" && (
              <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-emerald-950/40 to-cosmic-950 border border-emerald-500/35 space-y-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-base font-bold text-white font-serif">
                    Griha Shanti &amp; Saas Vivad Mukti Focus
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  4th House Griha Bhava aur Matru-Pitri graha shaanti ke liye parivarik vivad ka mukhya bindu darj karein:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-emerald-200">
                      Kiske Sath Vivad Ya Klesh Mukhya Hai?
                    </label>
                    <select
                      value={kaleshTarget}
                      onChange={(e) => setKaleshTarget(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-emerald-500/30 text-white text-xs focus:border-emerald-400 focus:outline-none"
                    >
                      <option value="Saas (Mother-in-law) ke sath taane aur aadar ki kami">Saas (Mother-in-law) ke sath taane aur aadar ki kami</option>
                      <option value="Pati aur Saas dono ke sath aapsi vivad">Pati aur Saas dono ke sath aapsi vivad</option>
                      <option value="Nanad / Sasural ke anya sadasyon dwara anban">Nanad / Sasural ke anya sadasyon dwara anban</option>
                      <option value="Ghar me achanak hone wale krodh aur Vastu klesh">Ghar me achanak hone wale krodh aur Vastu klesh</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-emerald-200">
                      Vivah Ko Kitna Samay Hua Hai?
                    </label>
                    <select
                      value={marriageYears}
                      onChange={(e) => setMarriageYears(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-emerald-500/30 text-white text-xs focus:border-emerald-400 focus:outline-none"
                    >
                      <option value="1 Saal se kam">1 Saal se kam</option>
                      <option value="1 se 3 Saal">1 se 3 Saal</option>
                      <option value="3 se 7 Saal">3 se 7 Saal</option>
                      <option value="7 Saal se adhik">7 Saal se adhik</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {selectedService === "intercaste_349" && (
              <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-purple-950/40 to-cosmic-950 border border-purple-500/35 space-y-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <h4 className="text-base font-bold text-white font-serif">
                    Intercaste Vivah &amp; Parivaar Sahmati Focus
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  9th House Pitra aur Guru-Brihaspati kripa praapti ke liye dono parivaaron ki sthiti darj karein:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-purple-200">
                      Partner Ka Naam Ya Community
                    </label>
                    <input
                      type="text"
                      value={intercastePartnerName}
                      onChange={(e) => setIntercastePartnerName(e.target.value)}
                      placeholder="e.g. Partner Name / Community"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white text-xs placeholder-slate-500 focus:border-purple-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-purple-200">
                      Kis Parivaar Ki Asahmati Mukhya Hai?
                    </label>
                    <select
                      value={opposingSide}
                      onChange={(e) => setOpposingSide(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white text-xs focus:border-purple-400 focus:outline-none"
                    >
                      <option value="Ladke ke mata-pita nahi maan rahe">Ladke ke mata-pita nahi maan rahe</option>
                      <option value="Ladki ke mata-pita nahi maan rahe">Ladki ke mata-pita nahi maan rahe</option>
                      <option value="Dono pakshon ke parivaar asahmat hain">Dono pakshon ke parivaar asahmat hain</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-purple-200">
                      Mukhya Vivad / Darr Ka Mudda Kya Hai?
                    </label>
                    <select
                      value={primaryHesitation}
                      onChange={(e) => setPrimaryHesitation(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white text-xs focus:border-purple-400 focus:outline-none"
                    >
                      <option value="Jaati / Gotra aur samajik darr">Jaati / Gotra aur samajik darr</option>
                      <option value="Kundali dosh / Manglik / Nadi dosh">Kundali dosh / Manglik / Nadi dosh</option>
                      <option value="Aarthik ya sanskritik rehen-sehan ka antar">Aarthik ya sanskritik rehen-sehan ka antar</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Standard Life Focus & Specific Question */}
            {!["love_ex_249", "kalesh_saas_299", "intercaste_349"].includes(selectedService) && (
              <>
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Primary Life Focus Area
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {focusOptions.map((f, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => setLifeFocus(f)}
                        className={`p-3 rounded-2xl text-left text-xs font-medium border transition-all ${
                          lifeFocus === f
                            ? "bg-gold-500/15 text-gold-200 border-gold-500/40 shadow-sm shadow-gold-500/20"
                            : "bg-white/[0.02] text-slate-300 border-white/5 hover:border-gold-500/20"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Specific Question Box */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-gold-400" />
                Your Deepest Question for REKHA <span className="text-gold-400">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask clearly about timing, relationship synastry, career pivot, or karmic lessons..."
                className="w-full px-4 py-3 rounded-2xl bg-cosmic-950/70 border border-white/10 text-white placeholder-slate-500 focus:border-gold-400 focus:outline-none text-sm transition-all resize-none"
              />

              {!["love_ex_249", "kalesh_saas_299", "intercaste_349"].includes(selectedService) && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {quickQuestions.map((q, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setQuestion(q)}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.03] hover:bg-gold-500/10 text-slate-400 hover:text-gold-300 border border-white/5 hover:border-gold-500/20 transition-all text-left"
                    >
                      + {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Partner Synastry Add / Edit Button */}
              <div className="pt-2">
                {secondaryPerson ? (
                  <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <HeartHandshake className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>
                        Partner Added for Synastry: <strong className="text-white">{secondaryPerson.name}</strong> ({secondaryPerson.relation})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowSecondaryModal(true)}
                        className="text-[11px] text-rose-300 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setSecondaryPerson(null)}
                        className="text-[11px] text-red-400 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (!user?.isSubscribed) {
                        setPaywallTab("plans");
                        setPaywallReason(undefined);
                        setPaywallTargetPlan("trial_99");
                        setShowPaywallModal(true);
                        return;
                      }
                      if (!canDoMatchmaking()) {
                        setPaywallTab("topup");
                        setPaywallReason("You have exhausted all matchmaking analyses included in your active plan. Top-up for 2 or 5 more matches below, or switch to a higher plan.");
                        setPaywallTargetPlan(user?.subscriptionPlan === "trial_99" ? "duo_599" : "unlimited_1009");
                        setShowPaywallModal(true);
                      } else {
                        setShowSecondaryModal(true);
                      }
                    }}
                    className="text-xs px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/25 transition-all flex items-center gap-1.5"
                  >
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span>+ Add Partner / Second Person for Compatibility &amp; Synastry</span>
                  </button>
                )}
              </div>
            </div>

            {/* SUBMIT BUTTON WITH MANDATORY ACCOUNT CREATION */}
            <div className="pt-4 flex flex-col items-end gap-3 w-full">
              <button
                type="button"
                onClick={() => {
                  const missing: string[] = [];
                  if (!name.trim()) missing.push("Name");
                  if (!dob) missing.push("Date of Birth");
                  if (!pob.trim()) missing.push("Place of Birth");

                  // Account Gate validation
                  if (!isLoggedIn) {
                    const clean = phone.replace(/\D/g, "");
                    if (clean.length < 10) missing.push("10-Digit Mobile Number");
                    if (!pin || pin.length < 4) missing.push("4-Digit Security PIN");
                  }

                  // Auto craft question for specialized services if empty
                  let finalQuestion = question.trim();
                  if (!finalQuestion) {
                    if (selectedService === "love_ex_249") {
                      finalQuestion = `Mera khoya pyar ${lovePartnerName ? `(${lovePartnerName})` : ""} kab wapas aayega aur hamare beech algaav (${loveRelationStage}, ${loveSeparationTime}) ka shastriya nivaran kya hai?`;
                      setQuestion(finalQuestion);
                    } else if (selectedService === "kalesh_saas_299") {
                      finalQuestion = `Ghar main kalesh aur ${kaleshTarget} se vivad (${marriageYears}) se mukti kaise milegi? Parivaar me izzat aur shanti ka shastriya upaay batayein.`;
                      setQuestion(finalQuestion);
                    } else if (selectedService === "intercaste_349") {
                      finalQuestion = `Intercaste vivah (${intercastePartnerName ? `with ${intercastePartnerName}` : ""}) ke liye ${opposingSide} ko manane (${primaryHesitation}) ka shastriya samadhan aur shubh muhurat kya hai?`;
                      setQuestion(finalQuestion);
                    } else {
                      missing.push("Your Question");
                    }
                  }

                  if (missing.length > 0) {
                    setStep1Error(`⚠️ Please fill in: ${missing.join(", ")}`);
                    setTimeout(() => step1ErrorRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 50);
                    return;
                  }

                  // If user is not logged in, execute inline registration/login gate
                  if (!isLoggedIn) {
                    const regResult = registerOrLoginInline({
                      phone,
                      pin,
                      name,
                      gender,
                      dob,
                      tob,
                      pob,
                      maritalStatus,
                    });

                    if (!regResult.success) {
                      setStep1Error(`⚠️ ${regResult.error}`);
                      setTimeout(() => step1ErrorRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 50);
                      return;
                    }
                  } else {
                    // Update profile with marital status if changed
                    updateProfile({ maritalStatus });
                  }

                  // Check second person context if applicable
                  const secondPersonCheck = detectSecondPersonContext(finalQuestion);
                  if (
                    secondPersonCheck.isDetected &&
                    !secondaryPerson &&
                    selectedService !== "love_ex_249" &&
                    selectedService !== "kalesh_saas_299" &&
                    selectedService !== "intercaste_349"
                  ) {
                    setSuggestedRelation(secondPersonCheck.suggestedRelation);
                    setShowSecondaryModal(true);
                    return;
                  }

                  // Check subscription profile limits & lock policy (Single user vs Duo vs Family)
                  if (isLoggedIn && user?.isSubscribed) {
                    const primaryLockedName = (user.primaryProfileName || user.name || "").trim().toLowerCase();
                    const enteredName = name.trim().toLowerCase();
                    const isSingleUserPlan =
                      !user.subscriptionPlan ||
                      user.subscriptionPlan === "trial_99" ||
                      user.subscriptionPlan === "love_ex_249" ||
                      user.subscriptionPlan === "kalesh_saas_299" ||
                      user.subscriptionPlan === "intercaste_349";

                    // Single user plan check: once a reading is seen or profile is locked, switching user triggers popup
                    if (isSingleUserPlan) {
                      if (
                        (user.primaryProfileLocked || user.primaryProfileName) &&
                        primaryLockedName &&
                        enteredName &&
                        primaryLockedName !== enteredName
                      ) {
                        setLockModalMode("limit_reached");
                        setShowLockWarningModal(true);
                        return;
                      }

                      // If first time on ₹99 plan before initial lock
                      if (user.subscriptionPlan === "trial_99" && !user.primaryProfileLocked) {
                        setLockModalMode("warning_first_lock");
                        setShowLockWarningModal(true);
                        return;
                      }
                    }

                    // Duo Plan check (max 2 users)
                    if (user.subscriptionPlan === "duo_599") {
                      const registeredProfiles = [
                        primaryLockedName,
                        ...(user.profiles?.map((p) => p.name.trim().toLowerCase()) || []),
                      ].filter(Boolean);

                      if (
                        registeredProfiles.length >= 2 &&
                        enteredName &&
                        !registeredProfiles.includes(enteredName)
                      ) {
                        setLockModalMode("limit_reached");
                        setShowLockWarningModal(true);
                        return;
                      }
                    }
                  }

                  setStep1Error(null);
                  setError(null);
                  setStep(2);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-black uppercase tracking-wider text-cosmic-950 bg-gradient-to-r from-gold-300 via-gold-400 to-amber-300 hover:shadow-xl hover:shadow-gold-500/40 transition-all active:scale-95"
              >
                <span>
                  {isLoggedIn
                    ? "Continue to Palm Upload"
                    : "Sign Up and Continue to Palm Upload"}
                </span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <div className="text-[10px] text-slate-400 flex items-center gap-1.5 self-center sm:self-end">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {isLoggedIn
                    ? "Your session is securely authenticated"
                    : "Instant account creation • Palm photos & readings auto-saved"}
                </span>
              </div>

              {/* Inline validation error — shown BELOW the button so user sees it immediately */}
              {step1Error && (
                <div
                  ref={step1ErrorRef}
                  className="w-full p-3.5 rounded-2xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5 animate-fadeIn"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                  <span>{step1Error}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: Dedicated Palm Photo Upload Screen */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            {/* Guidelines Banner */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-gold-500/10 border border-gold-500/25 text-xs text-gold-200 flex items-start gap-2.5 sm:gap-3">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">Palm Photo Guidelines for Accurate AI Vision:</strong>
                <span>Hold your palm flat with fingers slightly open. Take photo in clean daylight or soft light. Avoid heavy shadows, camera flash glare, or hand motion blur.</span>
              </div>
            </div>

            {/* Re-use saved photos button if logged in */}
            {isLoggedIn && user?.savedLeftPalm && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 rounded-xl bg-cosmic-950 border border-emerald-500/30 text-xs text-slate-300">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Your previously saved palm photos are ready.</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (user.savedLeftPalm) {
                      setLeftPalmBase64(user.savedLeftPalm);
                      setLeftPreview(user.savedLeftPalm);
                    }
                    if (user.savedRightPalm) {
                      setRightPalmBase64(user.savedRightPalm);
                      setRightPreview(user.savedRightPalm);
                    }
                  }}
                  className="w-full sm:w-auto text-center px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold hover:bg-emerald-500/30 transition-all text-[11px]"
                >
                  Reload Saved Photos
                </button>
              </div>
            )}

            {/* Two Column Upload Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {/* LEFT PALM CARD */}
              <div className="p-4 sm:p-5 rounded-3xl bg-cosmic-950/70 border border-white/10 hover:border-gold-500/30 transition-all space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white font-serif">Left Palm</h4>
                    <span className="text-[11px] text-slate-400">Prarabdha Karma (Inborn Potential)</span>
                  </div>
                  {leftPreview ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Uploaded ✓
                    </span>
                  ) : (
                    <span className="text-[10px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full">
                      Required
                    </span>
                  )}
                </div>

                {leftPreview ? (
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-gold-500/30 group">
                    <img src={leftPreview} alt="Left Palm" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        setLeftPreview("");
                        setLeftPalmBase64("");
                      }}
                      className="absolute top-2 right-2 p-2 rounded-xl bg-red-950/80 text-red-300 hover:bg-red-900 border border-red-500/30 transition-all opacity-90 group-hover:opacity-100"
                      title="Remove image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="rounded-2xl border-2 border-dashed border-white/15 p-5 sm:p-6 text-center space-y-3 hover:border-gold-500/40 transition-all">
                    <div className="w-11 h-11 mx-auto rounded-2xl bg-gold-500/10 text-gold-400 flex items-center justify-center">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-300 font-medium">Upload Left Palm Photo</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">JPG, PNG, WebP up to 10MB</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 pt-1 w-full">
                      <label className="cursor-pointer flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 text-center">
                        <Upload className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                        <span>Browse File</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, "left")}
                        />
                      </label>
                      <label className="cursor-pointer flex-1 py-2 px-3 rounded-xl bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 border border-gold-500/30 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 text-center">
                        <Camera className="w-3.5 h-3.5 shrink-0" />
                        <span>Camera</span>
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, "left")}
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT PALM CARD */}
              <div className="p-4 sm:p-5 rounded-3xl bg-cosmic-950/70 border border-white/10 hover:border-gold-500/30 transition-all space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white font-serif">Right Palm</h4>
                    <span className="text-[11px] text-slate-400">Kriyamana Karma (Active Destiny)</span>
                  </div>
                  {rightPreview ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Uploaded ✓
                    </span>
                  ) : (
                    <span className="text-[10px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full">
                      Required
                    </span>
                  )}
                </div>

                {rightPreview ? (
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-gold-500/30 group">
                    <img src={rightPreview} alt="Right Palm" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        setRightPreview("");
                        setRightPalmBase64("");
                      }}
                      className="absolute top-2 right-2 p-2 rounded-xl bg-red-950/80 text-red-300 hover:bg-red-900 border border-red-500/30 transition-all opacity-90 group-hover:opacity-100"
                      title="Remove image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="rounded-2xl border-2 border-dashed border-white/15 p-5 sm:p-6 text-center space-y-3 hover:border-gold-500/40 transition-all">
                    <div className="w-11 h-11 mx-auto rounded-2xl bg-gold-500/10 text-gold-400 flex items-center justify-center">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-300 font-medium">Upload Right Palm Photo</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">JPG, PNG, WebP up to 10MB</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 pt-1 w-full">
                      <label className="cursor-pointer flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 text-center">
                        <Upload className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                        <span>Browse File</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, "right")}
                        />
                      </label>
                      <label className="cursor-pointer flex-1 py-2 px-3 rounded-xl bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 border border-gold-500/30 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 text-center">
                        <Camera className="w-3.5 h-3.5 shrink-0" />
                        <span>Camera</span>
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, "right")}
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 w-full">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-center"
              >
                <ArrowLeft className="w-4 h-4 shrink-0" />
                <span>Back to Details</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!leftPalmBase64 && !rightPalmBase64) {
                    if (
                      !confirm(
                        "You haven't uploaded palm photos. REKHA works best when analyzing your real hand photos with AI Vision. Proceed anyway with Vedic Kundali only?"
                      )
                    ) {
                      return;
                    }
                  }
                  setError(null);
                  setStep(3);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-cosmic-950 bg-gradient-to-r from-gold-300 to-amber-400 hover:shadow-lg hover:shadow-gold-500/30 transition-all text-center"
              >
                <span>Continue to Review</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Review Screen */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center max-w-lg mx-auto mb-2">
              <h4 className="text-lg sm:text-xl font-bold font-serif text-white">Review Your Consultation Dossier</h4>
              <p className="text-xs text-slate-400 mt-1">
                Please verify your details and uploaded palm photos before REKHA initiates the deep multimodal vision pipeline.
              </p>
            </div>

            {/* Native Profile Summary Card */}
            <div className="p-4 sm:p-5 rounded-3xl bg-cosmic-950/70 border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400">
                  <User className="w-4 h-4" /> Native Identity
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-[11px] text-slate-400 hover:text-gold-300 underline"
                >
                  Edit Details
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <div className="text-[11px] text-slate-400">Name</div>
                  <div className="text-white font-bold mt-0.5 truncate">{name}</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Gender</div>
                  <div className="text-white font-bold mt-0.5">{gender}</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Date of Birth</div>
                  <div className="text-white font-bold mt-0.5 truncate">{dob} {tob ? `(${tob})` : ""}</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Place of Birth</div>
                  <div className="text-white font-bold mt-0.5 truncate">{pob}</div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5">
                <div className="text-[11px] text-slate-400">Core Life Focus &amp; Question:</div>
                <div className="text-xs text-gold-300 font-semibold mt-0.5">{lifeFocus}</div>
                <div className="text-xs text-slate-200 italic mt-1 bg-white/[0.02] p-2.5 rounded-xl border border-white/5 break-words">
                  &ldquo;{question}&rdquo;
                </div>
              </div>
            </div>

            {/* Palm Photos Review Strip */}
            <div className="p-4 sm:p-5 rounded-3xl bg-cosmic-950/70 border border-white/10 space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400">
                  <Eye className="w-4 h-4" /> Uploaded Palm Scans
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-[11px] text-slate-400 hover:text-gold-300 underline"
                >
                  Change Photos
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {/* Left Thumbnail */}
                <div className="space-y-1.5 text-center">
                  <div className="text-[11px] font-bold text-slate-300">Left Palm (Prarabdha)</div>
                  {leftPreview ? (
                    <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-gold-500/30 max-h-48 mx-auto">
                      <img src={leftPreview} alt="Left Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="aspect-[4/5] rounded-2xl border border-dashed border-white/10 flex items-center justify-center text-xs text-slate-500 max-h-48 mx-auto">
                      No Photo
                    </div>
                  )}
                </div>

                {/* Right Thumbnail */}
                <div className="space-y-1.5 text-center">
                  <div className="text-[11px] font-bold text-slate-300">Right Palm (Kriyamana)</div>
                  {rightPreview ? (
                    <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-gold-500/30 max-h-48 mx-auto">
                      <img src={rightPreview} alt="Right Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="aspect-[4/5] rounded-2xl border border-dashed border-white/10 flex items-center justify-center text-xs text-slate-500 max-h-48 mx-auto">
                      No Photo
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Secondary Person Review Strip if present */}
            {secondaryPerson && (
              <div className="p-4 sm:p-5 rounded-3xl bg-cosmic-950/70 border border-rose-500/30 space-y-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-300">
                    <HeartHandshake className="w-4 h-4 text-rose-400" />
                    <span>Partner Synastry Profile</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowSecondaryModal(true)}
                    className="text-[11px] text-rose-300 hover:underline"
                  >
                    Edit Partner
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <div className="text-[11px] text-slate-400">Name</div>
                    <div className="text-white font-bold mt-0.5 truncate">{secondaryPerson.name}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Relation</div>
                    <div className="text-white font-bold mt-0.5">{secondaryPerson.relation}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Date of Birth</div>
                    <div className="text-white font-bold mt-0.5 truncate">{secondaryPerson.dob} {secondaryPerson.tob ? `(${secondaryPerson.tob})` : ""}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Place of Birth</div>
                    <div className="text-white font-bold mt-0.5 truncate">{secondaryPerson.pob}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferred Reading Language Strip */}
            <div className="p-4 sm:p-5 rounded-3xl bg-cosmic-950/70 border border-gold-500/25 space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400">
                  <Globe className="w-4 h-4" /> Reading Language / भाषा
                </div>
                <button
                  type="button"
                  onClick={() => setIsLanguageModalOpen(true)}
                  className="text-[11px] text-amber-300 hover:underline flex items-center gap-1"
                >
                  Change / Examples
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLanguage("hinglish")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    language === "hinglish"
                      ? "bg-gold-500/25 text-gold-300 border border-gold-400/50 shadow-sm"
                      : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <span>💬 Hinglish (Default)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("hindi")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    language === "hindi"
                      ? "bg-gold-500/25 text-gold-300 border border-gold-400/50 shadow-sm"
                      : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <span>🇮🇳 हिन्दी (Hindi)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("english")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    language === "english"
                      ? "bg-gold-500/25 text-gold-300 border border-gold-400/50 shadow-sm"
                      : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <span>🇬🇧 English</span>
                </button>
              </div>
            </div>

            {/* Privacy & Auto-cleanup note */}
            <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-slate-400 text-center px-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Photos are analyzed in real-time and auto-deleted from hosting server after processing.</span>
            </div>

            {/* Prominent Step 3 Error Banner */}
            {error && (
              <div className="p-4 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5 animate-fadeIn">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 w-full">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-center"
              >
                <ArrowLeft className="w-4 h-4 shrink-0" />
                <span>Back to Photos</span>
              </button>

              <button
                type="button"
                onClick={handleFinalSubmit}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider text-cosmic-950 bg-gradient-to-r from-gold-300 via-gold-400 to-amber-300 hover:shadow-xl hover:shadow-gold-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all text-center"
              >
                <span>Start My Reading</span>
                <Sparkles className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Secondary Person Details Modal */}
      <SecondaryPersonModal
        isOpen={showSecondaryModal}
        initialRelation={suggestedRelation}
        onClose={() => setShowSecondaryModal(false)}
        onSkip={() => {
          setShowSecondaryModal(false);
          setStep1Error(null);
          setError(null);
          setStep(2);
        }}
        onConfirm={(data) => {
          setSecondaryPerson(data);
          setError(null);
          setStep1Error(null);
          setShowSecondaryModal(false);
          setStep(2);
        }}
      />

      {/* Profile Lock & User Limit Warning Modal */}
      <ProfileLockWarningModal
        isOpen={showLockWarningModal}
        mode={lockModalMode}
        onClose={() => setShowLockWarningModal(false)}
        profileName={name}
        lockedName={user?.primaryProfileName || user?.name || "Primary User"}
        allowedCount={user?.subscriptionPlan === "duo_599" ? 2 : 1}
        planName={
          user?.subscriptionPlan === "duo_599"
            ? "Duo Pass (₹499)"
            : user?.subscriptionPlan === "unlimited_1009"
            ? "Family Pro (₹999)"
            : "Single User Plan (₹99)"
        }
        onRestore={() => {
          if (user) {
            setName(user.primaryProfileName || user.name || "");
            if (user.dob) setDob(user.dob);
            if (user.gender) setGender(user.gender);
            if (user.tob) setTob(user.tob);
            if (user.pob) setPob(user.pob);
            if (user.maritalStatus) setMaritalStatus(user.maritalStatus);
          }
          setShowLockWarningModal(false);
        }}
        onConfirmLock={() => {
          lockPrimaryProfile();
          setShowLockWarningModal(false);
          setStep(2);
        }}
        onUpgrade={() => {
          setShowLockWarningModal(false);
          setPaywallTargetPlan(user?.subscriptionPlan === "duo_599" ? "unlimited_1009" : "duo_599");
          setShowPaywallModal(true);
        }}
      />

      {/* Paywall Modal for 3 Tiers & Top-Ups */}
      <PaywallModal
        isOpen={showPaywallModal}
        onClose={() => setShowPaywallModal(false)}
        defaultPlan={paywallTargetPlan}
        defaultTab={paywallTab}
        exhaustedReason={paywallReason}
        userName={name}
        userDob={dob}
        onSuccess={() => {
          setShowPaywallModal(false);
        }}
      />

      {/* Auth Modal for 1-Click Login */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}
