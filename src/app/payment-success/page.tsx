"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Sparkles, CheckCircle2, XCircle, Clock, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";
import { useAuth, SubscriptionTierType } from "@/lib/auth-context";
import Link from "next/link";

const PLAN_META: Record<
  string,
  { name: string; tag: string; features: string[] }
> = {
  trial_99: {
    name: "₹99 Starter Pack",
    tag: "30-Day Astrological Access",
    features: [
      "1 Primary Palm Profile Locked & Analyzed",
      "2 Deep Astrological AI Questions",
      "1 Full Matchmaking / Kundali Milan Analysis",
      "Complete Planetary & Mount Visuals",
    ],
  },
  duo_599: {
    name: "₹499 Duo Pass",
    tag: "60-Day Sacred Access",
    features: [
      "2 Profiles (Self + Spouse / Partner)",
      "6 Deep Palmistry & Horoscope Questions",
      "3 Full Kundali Matchmaking Reports",
      "Dual Synastry & Karma Compatibility",
    ],
  },
  unlimited_1009: {
    name: "₹999 Pro & Family Pass",
    tag: "Annual Complete Destiny Vision",
    features: [
      "Unlimited Family Profiles Support",
      "18 Deep Kundali & Palmistry Questions",
      "5 Complete Kundali Milan Analyses",
      "Priority AI Astrology Engine & Remedial Vidhi",
    ],
  },
  topup_60: {
    name: "₹60 Matchmaking Top-Up",
    tag: "Instant Credit Pack",
    features: [
      "+2 Additional Kundali Milan Analyses",
      "Instant Activation in Active Session",
      "Complete Guna Milan & Dosha Breakdown",
    ],
  },
  topup_99: {
    name: "₹99 Matchmaking Top-Up",
    tag: "Best Value Credit Pack",
    features: [
      "+5 Additional Kundali Milan Analyses",
      "Instant Activation in Active Session",
      "Complete Guna Milan & Dosha Breakdown",
    ],
  },
};

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, unlockSubscription, addMatchmakingCredits } = useAuth();

  const status = searchParams.get("status") || "success";
  const orderId = searchParams.get("orderId") || "RG_LIVE";
  const plan = searchParams.get("plan") || "trial_99";
  const phone = searchParams.get("phone") || "";

  const [hasActivated, setHasActivated] = useState(false);

  useEffect(() => {
    if (status === "success") {
      // Fire festive cosmic confetti
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#fbbf24", "#f59e0b", "#c084fc", "#60a5fa"],
        });
      } catch (e) {}

      // Activate client auth context
      if (!hasActivated) {
        if (plan === "topup_60") {
          addMatchmakingCredits(2);
        } else if (plan === "topup_99") {
          addMatchmakingCredits(5);
        } else {
          unlockSubscription(plan as SubscriptionTierType);
        }
        setHasActivated(true);
      }
    }
  }, [status, plan, hasActivated, unlockSubscription, addMatchmakingCredits]);

  const planInfo = PLAN_META[plan] || PLAN_META.trial_99;

  return (
    <div className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden">
      {/* Background celestial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-gold-500/20 via-purple-600/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-xl mx-auto p-6 sm:p-10 rounded-3xl bg-cosmic-900/90 border border-gold-500/40 shadow-2xl shadow-purple-950/90 backdrop-blur-xl text-center space-y-6">
        {status === "success" && (
          <>
            {/* Success Icon */}
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20 animate-scaleUp">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                Payment Confirmed by PhonePe
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold font-serif text-white">
                Access Unlocked Successfully!
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                Your payment has been received and verified. Your divine astrological privileges are now active.
              </p>
            </div>

            {/* Plan Info Card */}
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 text-left space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <div className="text-base font-bold text-white">{planInfo.name}</div>
                  <div className="text-xs text-gold-400 font-medium">{planInfo.tag}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Order ID</div>
                  <div className="text-xs font-mono font-bold text-slate-200">{orderId}</div>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="text-xs font-semibold text-slate-300">Activated Features:</div>
                <div className="space-y-1">
                  {planInfo.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                      <Sparkles className="w-3 h-3 text-gold-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-gold-400 via-amber-400 to-gold-500 hover:from-gold-300 hover:to-amber-400 text-cosmic-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-gold-500/25 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
              >
                <span>Continue Reading</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/subscription"
                className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-bold text-xs uppercase tracking-wider transition-all"
              >
                View Plans
              </Link>
            </div>
          </>
        )}

        {status === "pending" && (
          <>
            <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/15 border-2 border-amber-500/40 flex items-center justify-center text-amber-400 animate-pulse">
              <Clock className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
                Payment Under Verification
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                PhonePe is finalizing your payment status. This usually completes in a few moments.
              </p>
              <div className="text-xs font-mono text-slate-400">Order ID: {orderId}</div>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                onClick={() => window.location.reload()}
                className="py-3 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-cosmic-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh Status</span>
              </button>
            </div>
          </>
        )}

        {status === "failed" && (
          <>
            <div className="w-20 h-20 mx-auto rounded-full bg-rose-500/15 border-2 border-rose-500/40 flex items-center justify-center text-rose-400">
              <XCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
                Payment Incomplete
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                The transaction was cancelled or could not be completed by PhonePe. No amount was deducted.
              </p>
              <div className="text-xs font-mono text-slate-400">Order ID: {orderId}</div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/subscription"
                className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-gold-500 hover:bg-gold-400 text-cosmic-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-gold-500/20 transition-all"
              >
                Retry Payment
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-bold text-xs uppercase tracking-wider transition-all"
              >
                Back to Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen pt-28 pb-20 flex items-center justify-center text-slate-400 text-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold-400 animate-spin" />
            <span>Loading payment confirmation...</span>
          </div>
        </div>
      }
    >
      <PaymentSuccessContent />
    </React.Suspense>
  );
}

