"use client";

import React from "react";
import { X, Lock, AlertTriangle, ShieldCheck, ArrowRight, Sparkles, RotateCcw } from "lucide-react";

interface ProfileLockWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmLock?: () => void;
  onRestore?: () => void;
  onUpgrade: () => void;
  profileName: string;
  lockedName?: string;
  allowedCount?: number;
  planName?: string;
  mode?: "warning_first_lock" | "limit_reached";
}

export default function ProfileLockWarningModal({
  isOpen,
  onClose,
  onConfirmLock,
  onRestore,
  onUpgrade,
  profileName,
  lockedName,
  allowedCount = 1,
  planName = "Starter (₹99)",
  mode = "limit_reached",
}: ProfileLockWarningModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md p-6 sm:p-7 rounded-3xl bg-cosmic-900 border border-amber-500/40 shadow-2xl shadow-purple-950/80 overflow-hidden text-slate-100 text-center space-y-4">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-gradient-to-b from-amber-500/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400">
          <Lock className="w-7 h-7" />
        </div>

        {mode === "limit_reached" ? (
          <>
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 inline-block">
                User Limit: {allowedCount} Profile Only
              </span>
              <h3 className="text-xl font-bold font-serif text-white">
                Plan Limit Exceeded: One User Only
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                Aapka active plan sirf <strong className="text-gold-300">{allowedCount} User Profile</strong> allow karta hai. 
                Aapka account already <strong className="text-white">&ldquo;{lockedName || "Primary User"}&rdquo;</strong> ke liye register aur lock hai.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-left text-xs text-slate-300 space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Aap naye vyakti <strong className="text-white">&ldquo;{profileName}&rdquo;</strong> ki reading tabhi le sakte hain jab aap apna subscription plan increase karenge.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Duo Pass (₹499) me 2 profiles aur Family Pro (₹999) me unlimited family profiles supported hain.
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={onUpgrade}
                className="w-full py-3 px-5 rounded-full text-xs font-bold uppercase tracking-wider text-cosmic-950 bg-gradient-to-r from-gold-300 to-amber-400 hover:shadow-lg hover:shadow-gold-500/30 transition-all text-center flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-cosmic-950" />
                <span>Upgrade Subscription Plan →</span>
              </button>

              {onRestore && (
                <button
                  type="button"
                  onClick={onRestore}
                  className="w-full py-2.5 px-4 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                  <span>Restore My Profile ({lockedName})</span>
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 inline-block">
                Permanent Profile Lock Notice
              </span>
              <h3 className="text-xl font-bold font-serif text-white">
                Lock As Primary Profile
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                Only <strong className="text-gold-300">1 Primary User profile</strong> can be registered under this plan. 
                Once confirmed, this profile will be permanently locked for <span className="text-white font-semibold">{profileName || "this account"}</span>.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-left text-xs text-slate-300 space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>You cannot switch names or ask questions for other people without upgrading.</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              {onConfirmLock && (
                <button
                  type="button"
                  onClick={onConfirmLock}
                  className="w-full py-3 px-5 rounded-full text-xs font-bold uppercase tracking-wider text-cosmic-950 bg-gradient-to-r from-gold-300 to-amber-400 hover:shadow-lg hover:shadow-gold-500/30 transition-all text-center"
                >
                  Confirm &amp; Lock as Primary Profile
                </button>
              )}

              <button
                type="button"
                onClick={onUpgrade}
                className="w-full py-2.5 px-4 rounded-full text-xs font-semibold text-gold-300 hover:text-white bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/30 transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Upgrade Plan (Add More Profiles)</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
