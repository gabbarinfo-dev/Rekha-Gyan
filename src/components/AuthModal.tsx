"use client";

import React, { useState } from "react";
import { X, Phone, Lock, User, Sparkles, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialMode?: "login" | "signup";
}

export default function AuthModal({
  isOpen,
  onClose,
  onSuccess,
  initialMode = "login",
}: AuthModalProps) {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (mode === "login") {
      const res = login(phone, pin);
      if (res.success) {
        setSuccessMsg("Welcome back! Redirecting...");
        setTimeout(() => {
          onClose();
          if (onSuccess) onSuccess();
        }, 600);
      } else {
        setError(res.error || "Login failed");
      }
    } else {
      const res = signup(phone, pin, name);
      if (res.success) {
        setSuccessMsg("Account created successfully! Welcome to Rekha Gyan.");
        setTimeout(() => {
          onClose();
          if (onSuccess) onSuccess();
        }, 600);
      } else {
        setError(res.error || "Signup failed");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-cosmic-900 border border-gold-500/30 shadow-2xl shadow-purple-950/60 overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-400 via-mystic-violet to-cosmic-800 p-0.5 shadow-lg shadow-gold-500/25 mb-3">
            <div className="w-full h-full bg-cosmic-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-gold-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold font-serif text-white">
            {mode === "login" ? "Welcome Back to REKHA" : "Create Your Astro Profile"}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {mode === "login"
              ? "Access your saved palm scans & personalized Vedic readings"
              : "Save your details once, get instant 1-click palm readings anytime"}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex rounded-2xl bg-cosmic-950 p-1 border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError(null);
            }}
            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
              mode === "login"
                ? "bg-gradient-to-r from-gold-300 to-amber-400 text-cosmic-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setError(null);
            }}
            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
              mode === "signup"
                ? "bg-gradient-to-r from-gold-300 to-amber-400 text-cosmic-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error / Success Alerts */}
        {error && (
          <div className="mb-4 p-3.5 rounded-2xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}
        {successMsg && (
          <div className="mb-4 p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-gold-400" /> Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aryan Sharma"
                className="w-full px-4 py-3 rounded-2xl bg-cosmic-950 border border-white/10 text-white placeholder-slate-500 focus:border-gold-400 focus:outline-none text-sm transition-all"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-gold-400" /> Mobile Number
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-xs font-bold text-slate-400 border-r border-white/10 pr-2">
                +91
              </span>
              <input
                type="tel"
                required
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                placeholder="10-digit mobile number"
                className="w-full pl-16 pr-4 py-3 rounded-2xl bg-cosmic-950 border border-white/10 text-white placeholder-slate-500 focus:border-gold-400 focus:outline-none text-sm transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-gold-400" /> 4-Digit PIN or Password
            </label>
            <input
              type="password"
              required
              minLength={4}
              maxLength={20}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter your 4-digit PIN or password"
              className="w-full px-4 py-3 rounded-2xl bg-cosmic-950 border border-white/10 text-white placeholder-slate-500 focus:border-gold-400 focus:outline-none text-sm transition-all tracking-wider"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3.5 text-xs font-bold uppercase tracking-wider text-cosmic-950 bg-gradient-to-r from-gold-300 via-gold-400 to-amber-300 rounded-2xl shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            {mode === "login" ? "Sign In to Account" : "Create Account & Save Profile"}
          </button>
        </form>

        {/* Benefits Footer */}
        <div className="mt-6 pt-4 border-t border-white/5 space-y-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Saves both palm photos so you don&apos;t have to re-upload</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span>Zero SMS delay • 100% confidential &amp; encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
}
