"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  MessageCircle,
  Database,
  RefreshCw,
  Zap,
  UserPlus,
  Trash2,
  Eye,
  Calendar,
  Sparkles,
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
  subscriptionPlan?: "trial_99" | "duo_599" | "unlimited_1009" | null;
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
  const [filterType, setFilterType] = useState<"all" | "active" | "free">("all");
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Per-user inline plan and duration selection state
  const [userRowPlans, setUserRowPlans] = useState<
    Record<string, { plan: "trial_99" | "duo_599" | "unlimited_1009"; durationDays: number }>
  >({});

  // Manual Seeker Registration Modal state
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserPhone, setNewUserPhone] = useState("");
  const [newUserDob, setNewUserDob] = useState("");
  const [newUserTob, setNewUserTob] = useState("");
  const [newUserPob, setNewUserPob] = useState("");
  const [newUserIssue, setNewUserIssue] = useState("");
  const [newUserPlan, setNewUserPlan] = useState<"trial_99" | "duo_599" | "unlimited_1009">("trial_99");
  const [newUserDuration, setNewUserDuration] = useState<number>(30);

  // Detail view state
  const [viewingUser, setViewingUser] = useState<StoredUser | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      const serverUsers: StoredUser[] = (data.success && Array.isArray(data.users)) ? data.users : [];

      // Check browser localStorage for any local accounts to merge & sync to server
      try {
        const localUsersMap = JSON.parse(localStorage.getItem("rekha_users_db") || "{}");
        const localPhones = Object.keys(localUsersMap);

        for (const phone of localPhones) {
          const u = localUsersMap[phone];
          const existsOnServer = serverUsers.some((su) => su.phone === phone);
          if (!existsOnServer && phone) {
            const mergedItem: StoredUser = {
              phone,
              name: u.name || "Seeker",
              dob: u.dob || "",
              tob: u.tob || "",
              pob: u.pob || "",
              gender: u.gender || "",
              issue: u.issue || "",
              lifeFocus: u.lifeFocus || "",
              createdAt: u.createdAt || new Date().toISOString(),
              isSubscribed: Boolean(u.isSubscribed),
              subscriptionPlan: u.subscriptionPlan || null,
              subscriptionExpiryDate: u.subscriptionExpiryDate,
              isAdmin: Boolean(u.isAdmin),
            };
            serverUsers.push(mergedItem);

            // Sync to server in background
            fetch("/api/admin/users", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(mergedItem),
            }).catch(() => {});
          }
        }
      } catch (err) {
        console.warn("Local storage merge error:", err);
      }

      setUsers(serverUsers);
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

  const getRowSettings = (phone: string, currentPlan?: string | null) => {
    if (userRowPlans[phone]) return userRowPlans[phone];
    return {
      plan: (currentPlan as any) || "trial_99",
      durationDays: 30,
    };
  };

  const handleUpdatePlan = async (
    phone: string,
    isSubscribed: boolean,
    customPlan?: "trial_99" | "duo_599" | "unlimited_1009",
    customDays?: number
  ) => {
    const settings = getRowSettings(phone);
    const planToSet = customPlan || settings.plan;
    const daysToSet = customDays !== undefined ? customDays : settings.durationDays;

    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          isSubscribed,
          plan: isSubscribed ? planToSet : null,
          durationDays: isSubscribed ? daysToSet : 0,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage(data.message);
        setTimeout(() => setActionMessage(null), 4000);

        // Update local storage if present
        try {
          const localMap = JSON.parse(localStorage.getItem("rekha_users_db") || "{}");
          if (localMap[phone]) {
            localMap[phone].isSubscribed = isSubscribed;
            localMap[phone].subscriptionPlan = isSubscribed ? planToSet : null;
            localMap[phone].subscriptionExpiryDate = data.user?.subscriptionExpiryDate;
            localStorage.setItem("rekha_users_db", JSON.stringify(localMap));
          }
        } catch {}

        fetchUsers();
      } else {
        alert(data.error || "Failed to update subscription");
      }
    } catch (e: any) {
      alert("Network error: " + e.message);
    }
  };

  const handleDeleteUser = async (phone: string, name: string) => {
    if (phone === "8511739865") {
      alert("Super Admin account cannot be deleted.");
      return;
    }
    if (!confirm(`Are you sure you want to remove user "${name}" (${phone}) from registry?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users?phone=${phone}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setActionMessage(`User ${name} removed from registry.`);
        setTimeout(() => setActionMessage(null), 3000);

        // Remove from local storage
        try {
          const localMap = JSON.parse(localStorage.getItem("rekha_users_db") || "{}");
          if (localMap[phone]) {
            delete localMap[phone];
            localStorage.setItem("rekha_users_db", JSON.stringify(localMap));
          }
        } catch {}

        fetchUsers();
      } else {
        alert(data.error || "Failed to delete user");
      }
    } catch (e: any) {
      alert("Network error: " + e.message);
    }
  };

  const handleCreateNewUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newUserPhone.replace(/\D/g, "");
    if (clean.length < 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!newUserName.trim()) {
      alert("Please enter full name.");
      return;
    }

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: clean,
          name: newUserName.trim(),
          dob: newUserDob,
          tob: newUserTob,
          pob: newUserPob,
          issue: newUserIssue,
          isSubscribed: true,
          subscriptionPlan: newUserPlan,
          subscriptionDurationDays: newUserDuration,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage(`Registered & activated plan for ${newUserName}!`);
        setTimeout(() => setActionMessage(null), 4000);
        setShowAddUserModal(false);
        setNewUserName("");
        setNewUserPhone("");
        setNewUserDob("");
        setNewUserTob("");
        setNewUserPob("");
        setNewUserIssue("");
        fetchUsers();
      } else {
        alert(data.error || "Failed to register seeker");
      }
    } catch (err: any) {
      alert("Network error: " + err.message);
    }
  };

  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      (u.name && u.name.toLowerCase().includes(q)) ||
      (u.phone && u.phone.includes(q)) ||
      (u.issue && u.issue.toLowerCase().includes(q)) ||
      (u.lifeFocus && u.lifeFocus.toLowerCase().includes(q)) ||
      (u.pob && u.pob.toLowerCase().includes(q));

    if (!matchesSearch) return false;
    if (filterType === "active") return Boolean(u.isSubscribed);
    if (filterType === "free") return !u.isSubscribed;
    return true;
  });

  const activeSubscribersCount = users.filter((u) => u.isSubscribed).length;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-3 sm:p-6 pt-20 sm:pt-12 pb-16 bg-black/90 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-7xl my-auto rounded-3xl bg-cosmic-950 border border-gold-500/40 shadow-2xl shadow-purple-950/80 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 bg-cosmic-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-400 to-amber-500 text-cosmic-950 flex items-center justify-center font-black text-xl shadow-lg shadow-gold-500/20">
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
                User Signups, Consultation Queries, Database Records &amp; Full Plan Authority
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowAddUserModal(true)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Register Seeker</span>
            </button>

            <button
              onClick={fetchUsers}
              disabled={loading}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-gold-400" : ""}`} />
              <span>Sync &amp; Refresh</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action notification toast */}
        {actionMessage && (
          <div className="bg-emerald-500/20 border-b border-emerald-500/40 px-6 py-2.5 text-xs text-emerald-300 flex items-center gap-2 animate-fadeIn font-semibold">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{actionMessage}</span>
          </div>
        )}

        {/* Key Metrics Row */}
        <div className="p-4 sm:p-5 bg-cosmic-900/40 border-b border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div
            onClick={() => setFilterType("all")}
            className={`p-3 rounded-2xl border cursor-pointer transition-all ${
              filterType === "all" ? "bg-white/10 border-gold-400" : "bg-white/[0.03] border-white/5 hover:bg-white/[0.06]"
            }`}
          >
            <div className="text-[11px] uppercase font-semibold text-slate-400">Total Users Registered</div>
            <div className="text-xl sm:text-2xl font-bold text-white mt-0.5">{users.length}</div>
          </div>
          <div
            onClick={() => setFilterType("active")}
            className={`p-3 rounded-2xl border cursor-pointer transition-all ${
              filterType === "active" ? "bg-emerald-500/15 border-emerald-400" : "bg-white/[0.03] border-white/5 hover:bg-white/[0.06]"
            }`}
          >
            <div className="text-[11px] uppercase font-semibold text-emerald-400">Active Subscriptions</div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-300 mt-0.5">{activeSubscribersCount}</div>
          </div>
          <div
            onClick={() => setFilterType("free")}
            className={`p-3 rounded-2xl border cursor-pointer transition-all ${
              filterType === "free" ? "bg-amber-500/15 border-amber-400" : "bg-white/[0.03] border-white/5 hover:bg-white/[0.06]"
            }`}
          >
            <div className="text-[11px] uppercase font-semibold text-amber-400">Free / Unsubscribed</div>
            <div className="text-xl sm:text-2xl font-bold text-amber-300 mt-0.5">{users.length - activeSubscribersCount}</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className="text-[11px] uppercase font-semibold text-gold-400">Registry Storage</div>
            <div className="text-xs font-medium text-slate-300 mt-1 flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span className="truncate">Persistent Server File</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-3 sm:p-4 bg-cosmic-950 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold">Filter:</span>
            <button
              onClick={() => setFilterType("all")}
              className={`px-3 py-1 rounded-lg border font-medium ${
                filterType === "all" ? "bg-gold-500 text-cosmic-950 border-gold-400 font-bold" : "bg-white/5 text-slate-300 border-white/10"
              }`}
            >
              All Users ({users.length})
            </button>
            <button
              onClick={() => setFilterType("active")}
              className={`px-3 py-1 rounded-lg border font-medium ${
                filterType === "active" ? "bg-emerald-500 text-white border-emerald-400 font-bold" : "bg-white/5 text-slate-300 border-white/10"
              }`}
            >
              Active Subscriptions ({activeSubscribersCount})
            </button>
            <button
              onClick={() => setFilterType("free")}
              className={`px-3 py-1 rounded-lg border font-medium ${
                filterType === "free" ? "bg-amber-500 text-cosmic-950 border-amber-400 font-bold" : "bg-white/5 text-slate-300 border-white/10"
              }`}
            >
              Unsubscribed ({users.length - activeSubscribersCount})
            </button>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by name, phone, city, question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-cosmic-900 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-gold-500/50"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="flex-1 overflow-x-auto overflow-y-auto p-2 sm:p-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="p-3">User &amp; Contact</th>
                <th className="p-3">Birth &amp; Astral Coordinates</th>
                <th className="p-3">Consultation Query Wanted</th>
                <th className="p-3">Current Status</th>
                <th className="p-3 min-w-[280px]">Authority Plan Management</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-400">
                    <div className="text-base font-semibold text-slate-300">No user records found.</div>
                    <p className="text-xs text-slate-500 mt-1">
                      {searchQuery ? "Try refining your search query." : "Click '+ Register Seeker' above to manually add consultation seekers."}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const isSub = Boolean(u.isSubscribed);
                  const isSuperAdmin = u.phone === "8511739865" || u.isAdmin;
                  const rowSettings = getRowSettings(u.phone, u.subscriptionPlan);
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
                        <div className="text-slate-300 font-medium">
                          {u.dob ? `DOB: ${u.dob}` : "DOB: Not logged"}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {u.tob ? `Time: ${u.tob}` : "Time: Midday"}
                          {u.pob ? ` • ${u.pob}` : ""}
                        </div>
                        {u.gender && (
                          <div className="text-[10px] text-slate-500 capitalize">{u.gender}</div>
                        )}
                      </td>

                      {/* Issue / Question */}
                      <td className="p-3 max-w-xs">
                        {u.lifeFocus && (
                          <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded bg-gold-500/10 text-gold-300 border border-gold-500/20 mb-1">
                            {u.lifeFocus}
                          </span>
                        )}
                        <p className="text-slate-200 line-clamp-2 italic text-xs">
                          &ldquo;{u.issue || "General palmistry & Vedic alignment reading"}&rdquo;
                        </p>
                      </td>

                      {/* Current Status */}
                      <td className="p-3">
                        {isSub ? (
                          <div>
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/30 text-[11px]">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              {u.subscriptionPlan === "unlimited_1009"
                                ? "₹1,099 Pro Pass"
                                : u.subscriptionPlan === "duo_599"
                                ? "₹599 Duo Pass"
                                : "₹99 Starter"}
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

                      {/* Authority Plan Management Controls */}
                      <td className="p-3">
                        {isSuperAdmin ? (
                          <span className="text-xs text-gold-400 italic">Always Active (Super Admin)</span>
                        ) : (
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-1.5">
                              {/* Plan Dropdown */}
                              <select
                                value={rowSettings.plan}
                                onChange={(e) =>
                                  setUserRowPlans((prev) => ({
                                    ...prev,
                                    [u.phone]: {
                                      ...getRowSettings(u.phone),
                                      plan: e.target.value as any,
                                    },
                                  }))
                                }
                                className="bg-cosmic-900 border border-gold-500/30 rounded-lg px-2 py-1 text-white text-[11px] focus:outline-none"
                              >
                                <option value="trial_99">₹99 Starter</option>
                                <option value="duo_599">₹599 Duo Pass</option>
                                <option value="unlimited_1009">₹1,099 Pro Pass</option>
                              </select>

                              {/* Duration Dropdown */}
                              <select
                                value={rowSettings.durationDays}
                                onChange={(e) =>
                                  setUserRowPlans((prev) => ({
                                    ...prev,
                                    [u.phone]: {
                                      ...getRowSettings(u.phone),
                                      durationDays: Number(e.target.value),
                                    },
                                  }))
                                }
                                className="bg-cosmic-900 border border-gold-500/30 rounded-lg px-2 py-1 text-white text-[11px] focus:outline-none"
                              >
                                <option value={30}>30 Days</option>
                                <option value={60}>60 Days</option>
                                <option value={180}>180 Days</option>
                                <option value={365}>1 Year</option>
                                <option value={3650}>Lifetime</option>
                              </select>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleUpdatePlan(u.phone, true)}
                                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1 transition-all ${
                                  isSub
                                    ? "bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300"
                                    : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                                }`}
                              >
                                <Zap className="w-3 h-3" />
                                <span>{isSub ? "Switch Plan" : "Activate Plan"}</span>
                              </button>

                              {isSub && (
                                <button
                                  type="button"
                                  onClick={() => handleUpdatePlan(u.phone, false)}
                                  className="px-2.5 py-1 rounded-lg bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 font-semibold text-[11px] transition-all"
                                >
                                  Deactivate
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </td>

                      {/* View Details & Delete */}
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setViewingUser(u)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all"
                            title="View Full Coordinates & Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {!isSuperAdmin && (
                            <button
                              type="button"
                              onClick={() => handleDeleteUser(u.phone, u.name)}
                              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all"
                              title="Delete User Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 bg-cosmic-900 border-t border-white/10 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-gold-400 shrink-0" />
            <span>
              <strong>Full Plan Authority:</strong> You can select any tier (₹99 Starter, ₹599 Duo, ₹1,099 Pro) and duration for any user. Changes take effect on their device instantly.
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-cosmic-950 font-bold text-xs shrink-0 transition-all"
          >
            Close Panel
          </button>
        </div>
      </div>

      {/* MODAL 1: Register New Seeker Form */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg p-6 rounded-3xl bg-cosmic-950 border border-gold-500/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-white font-serif font-bold text-lg">
                <UserPlus className="w-5 h-5 text-emerald-400" />
                <span>Register Seeker &amp; Activate Plan</span>
              </div>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateNewUser} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Honey Sharma"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full bg-cosmic-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">10-Digit Mobile Number *</label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="e.g., 9876543210"
                  value={newUserPhone}
                  onChange={(e) => setNewUserPhone(e.target.value)}
                  className="w-full bg-cosmic-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-gold-400 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Date of Birth</label>
                  <input
                    type="date"
                    value={newUserDob}
                    onChange={(e) => setNewUserDob(e.target.value)}
                    className="w-full bg-cosmic-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Time of Birth</label>
                  <input
                    type="time"
                    value={newUserTob}
                    onChange={(e) => setNewUserTob(e.target.value)}
                    className="w-full bg-cosmic-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Place of Birth (City, State)</label>
                <input
                  type="text"
                  placeholder="e.g., Delhi, India"
                  value={newUserPob}
                  onChange={(e) => setNewUserPob(e.target.value)}
                  className="w-full bg-cosmic-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Consultation Concern / Sacred Question</label>
                <textarea
                  rows={2}
                  placeholder="User's primary dilemma, relationship question, or career goal..."
                  value={newUserIssue}
                  onChange={(e) => setNewUserIssue(e.target.value)}
                  className="w-full bg-cosmic-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="block text-gold-300 mb-1 font-semibold">Plan To Activate</label>
                  <select
                    value={newUserPlan}
                    onChange={(e) => setNewUserPlan(e.target.value as any)}
                    className="w-full bg-cosmic-900 border border-gold-500/40 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="trial_99">₹99 Starter Pack</option>
                    <option value="duo_599">₹599 Duo Pass</option>
                    <option value="unlimited_1009">₹1,099 Pro Pass</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gold-300 mb-1 font-semibold">Duration</label>
                  <select
                    value={newUserDuration}
                    onChange={(e) => setNewUserDuration(Number(e.target.value))}
                    className="w-full bg-cosmic-900 border border-gold-500/40 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value={30}>30 Days</option>
                    <option value={60}>60 Days</option>
                    <option value={180}>180 Days</option>
                    <option value={365}>1 Year</option>
                    <option value={3650}>Lifetime (10 Yrs)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-500/25"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Save &amp; Activate Plan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Full User Details View Modal */}
      {viewingUser && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg p-6 rounded-3xl bg-cosmic-950 border border-gold-500/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-xl font-bold font-serif text-white flex items-center gap-2">
                  <span>{viewingUser.name}</span>
                  {viewingUser.isAdmin && <span className="text-gold-400 text-xs">👑 Super Admin</span>}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Phone: +91 {viewingUser.phone}</p>
              </div>
              <button
                onClick={() => setViewingUser(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                <div className="text-gold-400 font-bold uppercase tracking-wider text-[10px]">
                  Birth &amp; Astrological Coordinates
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-200">
                  <div><strong>DOB:</strong> {viewingUser.dob || "Not specified"}</div>
                  <div><strong>Time:</strong> {viewingUser.tob || "Midday approx"}</div>
                  <div><strong>Place:</strong> {viewingUser.pob || "Not specified"}</div>
                  <div><strong>Gender:</strong> {viewingUser.gender || "Not specified"}</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5">
                <div className="text-gold-400 font-bold uppercase tracking-wider text-[10px]">
                  Consultation Query / Dilemma
                </div>
                {viewingUser.lifeFocus && (
                  <div className="inline-block px-2 py-0.5 rounded bg-gold-500/10 text-gold-300 border border-gold-500/20 text-[10px] font-semibold mb-1">
                    {viewingUser.lifeFocus}
                  </div>
                )}
                <p className="text-slate-100 italic leading-relaxed">
                  &ldquo;{viewingUser.issue || "General palmistry & life alignment reading"}&rdquo;
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5">
                <div className="text-gold-400 font-bold uppercase tracking-wider text-[10px]">
                  Subscription Status
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">
                    {viewingUser.isSubscribed
                      ? viewingUser.subscriptionPlan === "unlimited_1009"
                        ? "₹1,099 Pro Pass"
                        : viewingUser.subscriptionPlan === "duo_599"
                        ? "₹599 Duo Pass"
                        : "₹99 Starter Pack"
                      : "Free / Unsubscribed"}
                  </span>
                  {viewingUser.isSubscribed && (
                    <span className="text-emerald-400 font-semibold text-xs">Active</span>
                  )}
                </div>
                {viewingUser.subscriptionExpiryDate && (
                  <div className="text-slate-400 text-[11px]">
                    Expires on: {new Date(viewingUser.subscriptionExpiryDate).toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end">
              <button
                onClick={() => setViewingUser(null)}
                className="px-4 py-2 rounded-xl bg-gold-500 text-cosmic-950 font-bold text-xs"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

