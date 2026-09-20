"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  ShieldAlert,
  Users,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Phone,
  MessageCircle,
  Database,
  Calendar,
  HelpCircle,
  RefreshCw,
  Zap,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

interface StoredUser {
  phone: string;
  name: string;
  dob?: string;
  tob?: string;
  pob?: string;
  gender?: string;
  issue?: string;
  lifeFocus?: string;
  createdAt: string;
  isSubscribed: boolean;
  subscriptionPlan?: "trial_99" | "unlimited_1009" | null;
  subscriptionDurationDays?: number;
  subscriptionStartDate?: string;
  subscriptionExpiryDate?: string;
  isAdmin?: boolean;
}

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanelModal({ isOpen, onClose }: AdminPanelModalProps) {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState<StoredUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDuration, setSelectedDuration] = useState<number>(30);
  const [selectedPlan, setSelectedPlan] = useState<"trial_99" | "unlimited_1009">("trial_99");
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.success && Array.isArray(data.users)) {
        setUsers(data.users);
      }
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleToggleSubscription = async (phone: string, turnOn: boolean) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          isSubscribed: turnOn,
          plan: turnOn ? selectedPlan : null,
          durationDays: turnOn ? selectedDuration : 0,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage(data.message);
        setTimeout(() => setActionMessage(null), 4000);
        fetchUsers();
      } else {
        alert(data.error || "Failed to update subscription");
      }
    } catch (e: any) {
      alert("Network error: " + e.message);
    }
  };

  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase();
    return (
      (u.name && u.name.toLowerCase().includes(q)) ||
      (u.phone && u.phone.includes(q)) ||
      (u.issue && u.issue.toLowerCase().includes(q)) ||
      (u.lifeFocus && u.lifeFocus.toLowerCase().includes(q))
    );
  });

  const activeSubscribersCount = users.filter((u) => u.isSubscribed).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-6xl my-4 sm:my-8 rounded-3xl bg-cosmic-950 border border-gold-500/40 shadow-2xl shadow-purple-950/80 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 bg-cosmic-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-gold-400 to-amber-500 text-cosmic-950 flex items-center justify-center font-black shadow-lg shadow-gold-500/20">
              👑
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
                  REKHA Super Admin Command Center
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 text-[11px] font-bold border border-gold-500/30">
                  Nishant Dantare
                </span>
              </div>
              <p className="text-xs text-slate-300">
                User Signups, Consultation Queries, Database Records &amp; Manual Subscription Switches
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={fetchUsers}
              disabled={loading}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-gold-400" : ""}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action notification banner */}
        {actionMessage && (
          <div className="bg-emerald-500/15 border-b border-emerald-500/30 px-6 py-2.5 text-xs text-emerald-300 flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{actionMessage}</span>
          </div>
        )}

        {/* Key Metrics & Controls Row */}
        <div className="p-4 sm:p-6 bg-cosmic-900/40 border-b border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className="text-[11px] uppercase font-semibold text-slate-400">Total Users Registered</div>
            <div className="text-xl sm:text-2xl font-bold text-white mt-0.5">{users.length}</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className="text-[11px] uppercase font-semibold text-emerald-400">Active Subscriptions</div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-300 mt-0.5">{activeSubscribersCount}</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className="text-[11px] uppercase font-semibold text-amber-400">Free / Unsubscribed</div>
            <div className="text-xl sm:text-2xl font-bold text-amber-300 mt-0.5">{users.length - activeSubscribersCount}</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className="text-[11px] uppercase font-semibold text-gold-400">Database Storage</div>
            <div className="text-xs font-medium text-slate-300 mt-1 flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-gold-400" />
              <span>Bluehost Server + Supabase</span>
            </div>
          </div>
        </div>

        {/* Admin Switch Configuration Bar */}
        <div className="p-4 bg-cosmic-950 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-300 font-semibold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-gold-400" />
              Batch Activation Settings:
            </span>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(Number(e.target.value))}
              className="bg-cosmic-800 border border-gold-500/30 rounded-xl px-2.5 py-1.5 text-white font-medium focus:outline-none focus:border-gold-400"
            >
              <option value={30}>30 Days Duration</option>
              <option value={60}>60 Days Duration</option>
              <option value={180}>180 Days Duration</option>
              <option value={365}>365 Days (1 Year)</option>
            </select>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value as any)}
              className="bg-cosmic-800 border border-gold-500/30 rounded-xl px-2.5 py-1.5 text-white font-medium focus:outline-none focus:border-gold-400"
            >
              <option value="trial_99">₹99 Single Native Plan</option>
              <option value="unlimited_1009">₹1009 Family Destiny Plan (4 Persons)</option>
            </select>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search name, phone, issue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-cosmic-900 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-gold-500/50"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="flex-1 overflow-x-auto overflow-y-auto p-2 sm:p-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="p-3">User &amp; Phone</th>
                <th className="p-3">Birth Coordinates</th>
                <th className="p-3">Primary Issue / Question Wanted</th>
                <th className="p-3">Subscription Status</th>
                <th className="p-3">Admin Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    No users matching search criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const isSub = Boolean(u.isSubscribed);
                  const isSuperAdmin = u.phone === "8511739865" || u.isAdmin;
                  const waLink = `https://wa.me/91${u.phone}?text=Hello%20${encodeURIComponent(u.name)},%20I%20am%20Nishant%20Dantare%20from%20REKHA.%20Regarding%20your%20query%20"${encodeURIComponent(u.issue || "Destiny Consultation")}"...`;

                  return (
                    <tr key={u.phone} className="hover:bg-white/[0.02] transition-colors">
                      {/* Name & Phone */}
                      <td className="p-3">
                        <div className="font-bold text-white text-sm flex items-center gap-1.5">
                          <span>{u.name}</span>
                          {isSuperAdmin && <span className="text-gold-400 text-xs">👑 Super Admin</span>}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-slate-400 flex items-center gap-1 font-mono text-xs">
                            <Phone className="w-3 h-3 text-gold-400" />
                            {u.phone}
                          </span>
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                            title="Open WhatsApp Chat"
                          >
                            <MessageCircle className="w-2.5 h-2.5" />
                            WhatsApp
                          </a>
                        </div>
                      </td>

                      {/* Birth Details */}
                      <td className="p-3">
                        <div className="text-slate-300">
                          {u.dob ? `DOB: ${u.dob}` : "DOB: Not logged"}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {u.tob ? `Time: ${u.tob}` : "Time: Midday"}
                          {u.pob ? ` • ${u.pob}` : ""}
                        </div>
                      </td>

                      {/* Issue / Question */}
                      <td className="p-3 max-w-xs">
                        {u.lifeFocus && (
                          <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded bg-gold-500/10 text-gold-300 border border-gold-500/20 mb-1">
                            {u.lifeFocus}
                          </span>
                        )}
                        <p className="text-slate-200 line-clamp-2 italic">
                          &ldquo;{u.issue || "General palmistry & Vedic alignment reading"}&rdquo;
                        </p>
                      </td>

                      {/* Subscription Status */}
                      <td className="p-3">
                        {isSub ? (
                          <div>
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/30 text-[11px]">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              {u.subscriptionPlan === "unlimited_1009" ? "₹1009 Unlimited Pass" : "₹99 Trial Active"}
                            </span>
                            {u.subscriptionExpiryDate && (
                              <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-slate-400" />
                                <span>Expires: {new Date(u.subscriptionExpiryDate).toLocaleDateString()}</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-white/10 text-[11px]">
                            <XCircle className="w-3 h-3" />
                            Free / Unsubscribed
                          </span>
                        )}
                      </td>

                      {/* Action Switch Buttons */}
                      <td className="p-3">
                        {isSuperAdmin ? (
                          <span className="text-[11px] text-gold-400 italic">Always Active</span>
                        ) : isSub ? (
                          <button
                            type="button"
                            onClick={() => handleToggleSubscription(u.phone, false)}
                            className="px-3 py-1.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 font-semibold text-[11px] transition-all"
                          >
                            Switch OFF
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleToggleSubscription(u.phone, true)}
                            className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-semibold text-[11px] flex items-center gap-1 transition-all"
                          >
                            <Zap className="w-3 h-3 text-emerald-400" />
                            <span>Switch ON ({selectedDuration}d)</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Database & Hosting Architecture Explainer Footer */}
        <div className="p-4 bg-cosmic-900 border-t border-white/10 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-gold-400 shrink-0" />
            <span>
              <strong>Where is this data saved?</strong> Currently saved in your Bluehost / server persistent registry (<code>data/users-registry.json</code>). You can also plug in your friend&apos;s free Supabase Postgres anytime!
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-gold-500 text-cosmic-950 font-bold text-xs shrink-0"
          >
            Close Panel
          </button>
        </div>

      </div>
    </div>
  );
}
