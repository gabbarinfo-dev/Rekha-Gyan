"use client";

import React, { useState } from "react";
import AdminPanelModal from "@/components/AdminPanelModal";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock } from "lucide-react";
import AuthModal from "@/components/AuthModal";

export default function AdminPage() {
  const { user, isAdmin } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full cosmic-card rounded-3xl p-8 border border-gold-500/30 text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400 to-amber-500 text-cosmic-950 flex items-center justify-center font-black text-2xl mx-auto shadow-xl shadow-gold-500/25">
          👑
        </div>

        <h1 className="text-2xl font-bold font-serif text-white">
          REKHA Super Admin Portal
        </h1>

        {isAdmin ? (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Authenticated as Super Admin (Nishant Dantare)</span>
            </div>

            <AdminPanelModal isOpen={true} onClose={() => window.location.href = "/"} />
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-slate-300">
              This area is strictly reserved for Super Admin Nishant Dantare. Please sign in with your admin mobile credentials to view user data and control subscriptions.
            </p>

            <button
              onClick={() => setAuthOpen(true)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-gold-300 via-gold-400 to-amber-300 text-cosmic-950 font-bold text-sm uppercase tracking-wider shadow-lg shadow-gold-500/20"
            >
              Sign In As Super Admin
            </button>
          </div>
        )}

        <div className="pt-2">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-gold-300 flex items-center justify-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
