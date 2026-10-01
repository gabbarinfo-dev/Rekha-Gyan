"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface SavedProfile {
  id: string;
  name: string;
  gender?: string;
  dob?: string;
  tob?: string;
  pob?: string;
  savedLeftPalm?: string;
  savedRightPalm?: string;
  isPrimary?: boolean;
}

export type SubscriptionTierType =
  | "trial_99"
  | "duo_599"
  | "unlimited_1009"
  | "love_ex_249"
  | "kalesh_saas_299"
  | "intercaste_349";

export interface UserProfile {
  phone: string;
  name: string;
  gender?: string;
  dob?: string;
  tob?: string;
  pob?: string;
  maritalStatus?: "Single / Unmarried" | "In a Relationship" | "Married" | "Separated / Dooriyan" | "Divorced" | string;
  issue?: string;
  lifeFocus?: string;
  savedLeftPalm?: string;
  savedRightPalm?: string;
  isSubscribed?: boolean;
  subscriptionPlan?: SubscriptionTierType | null;
  activePasses?: string[];
  subscriptionDate?: string;
  subscriptionExpiryDate?: string;
  isAdmin?: boolean;
  primaryProfileLocked?: boolean;
  primaryProfileName?: string;
  profiles?: SavedProfile[];
  deepQuestionsRemaining?: number;
  partnerQuestionsRemaining?: number;
  matchmakingRemaining?: number;
  kundliDownloadsUsed?: number;
  kundliDownloadedProfiles?: string[];
}

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (phone: string, pin: string) => { success: boolean; error?: string };
  signup: (phone: string, pin: string, name: string) => { success: boolean; error?: string };
  registerOrLoginInline: (details: {
    phone: string;
    pin: string;
    name: string;
    gender?: string;
    dob?: string;
    tob?: string;
    pob?: string;
    maritalStatus?: string;
  }) => { success: boolean; error?: string };
  hasServiceAccess: (serviceId: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  unlockSubscription: (plan: SubscriptionTierType) => void;
  lockPrimaryProfile: () => void;
  consumeQuota: (type: "deepQuestion" | "partnerQuestion" | "matchmaking") => boolean;
  canAskPartnerQuestion: () => boolean;
  canDoMatchmaking: () => boolean;
  addMatchmakingCredits: (count: number) => void;
  isEligibleForKundli: () => boolean;
  canDownloadKundli: (profileName?: string) => boolean;
  recordKundliDownload: (profileName?: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_DB_KEY = "rekha_users_db";
const ACTIVE_SESSION_KEY = "rekha_active_session";

// Super Admin Credentials
const ADMIN_PHONE = "8511739865";
const ADMIN_PASS = "Dantare@$1029";
const ADMIN_NAME = "Nishant Dantare";
const ADMIN_DOB = "29-04-1987";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  // Load existing session on mount & verify live with server registry
  useEffect(() => {
    try {
      const activePhone = localStorage.getItem(ACTIVE_SESSION_KEY);
      if (activePhone) {
        const usersMap = JSON.parse(localStorage.getItem(USERS_DB_KEY) || "{}");
        if (usersMap[activePhone]) {
          const profile = usersMap[activePhone];
          // Check if admin - verify PIN before granting authority
          if (activePhone === ADMIN_PHONE) {
            if (profile._pin === ADMIN_PASS || profile._pin === "1029") {
              profile.isAdmin = true;
              profile.isSubscribed = true;
              profile.name = ADMIN_NAME;
              profile.dob = ADMIN_DOB;
            } else {
              profile.isAdmin = false;
              profile.isSubscribed = false;
            }
          }
          setUser(profile);
        }

        // Live check against server registry to verify if Super Admin activated or switched a plan!
        fetch(`/api/admin/users?phone=${activePhone}`)
          .then((r) => r.json())
          .then((data) => {
            if (data.success && data.user) {
              const serverUser = data.user;
              setUser((prev) => {
                if (!prev) return prev;
                const isSuperAdmin = prev.phone === ADMIN_PHONE && (prev as any)._pin === ADMIN_PASS;
                const updated: UserProfile = {
                  ...prev,
                  isSubscribed: isSuperAdmin ? true : Boolean(serverUser.isSubscribed),
                  subscriptionPlan: isSuperAdmin ? "unlimited_1009" : serverUser.subscriptionPlan || null,
                  subscriptionExpiryDate: serverUser.subscriptionExpiryDate,
                  matchmakingRemaining: serverUser.matchmakingRemaining !== undefined ? serverUser.matchmakingRemaining : prev.matchmakingRemaining,
                  deepQuestionsRemaining: serverUser.deepQuestionsRemaining !== undefined ? serverUser.deepQuestionsRemaining : prev.deepQuestionsRemaining,
                };
                // update local storage
                try {
                  const currentMap = JSON.parse(localStorage.getItem(USERS_DB_KEY) || "{}");
                  if (currentMap[activePhone]) {
                    currentMap[activePhone] = { ...currentMap[activePhone], ...updated };
                    localStorage.setItem(USERS_DB_KEY, JSON.stringify(currentMap));
                  }
                } catch {}
                return updated;
              });
            }
          })
          .catch((err) => console.warn("Live server plan check non-blocking error:", err));
      }
    } catch (e) {
      console.error("Failed to restore session:", e);
    }
  }, []);

  const syncToServerRegistry = async (profileData: any) => {
    try {
      fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      }).catch((err) => console.warn("Background server sync non-blocking error:", err));
    } catch {
      // non-blocking
    }
  };

  const login = (phone: string, pin: string) => {
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      return { success: false, error: "Please enter a valid 10-digit mobile number." };
    }
    if (!pin || pin.length < 4) {
      return { success: false, error: "PIN / Password must be at least 4 characters." };
    }

    // Direct Super Admin Recognition
    if (cleanPhone === ADMIN_PHONE && (pin === ADMIN_PASS || pin === "1029")) {
      const adminProfile: UserProfile = {
        phone: ADMIN_PHONE,
        name: ADMIN_NAME,
        gender: "Male",
        dob: ADMIN_DOB,
        pob: "Ajmer, Rajasthan",
        isAdmin: true,
        isSubscribed: true,
        subscriptionPlan: "unlimited_1009",
        subscriptionDate: new Date().toISOString(),
        subscriptionExpiryDate: "2099-12-31T23:59:59.000Z",
      };

      try {
        const usersMap = JSON.parse(localStorage.getItem(USERS_DB_KEY) || "{}");
        usersMap[ADMIN_PHONE] = { ...adminProfile, _pin: ADMIN_PASS };
        localStorage.setItem(USERS_DB_KEY, JSON.stringify(usersMap));
        localStorage.setItem(ACTIVE_SESSION_KEY, ADMIN_PHONE);
      } catch {
        // safe
      }

      setUser(adminProfile);
      syncToServerRegistry(adminProfile);
      return { success: true };
    }

    try {
      const usersMap = JSON.parse(localStorage.getItem(USERS_DB_KEY) || "{}");
      const existing = usersMap[cleanPhone];

      if (!existing) {
        return {
          success: false,
          error: "Account not found for this number. Please click 'Create Account' to sign up in 10 seconds.",
        };
      }

      if (existing._pin !== pin) {
        return { success: false, error: "Incorrect Password / PIN. Please try again." };
      }

      const { _pin, ...profile } = existing;
      const isAdminUser = cleanPhone === ADMIN_PHONE;
      const finalProfile = {
        ...profile,
        isAdmin: isAdminUser,
        isSubscribed: isAdminUser ? true : profile.isSubscribed,
      };

      setUser(finalProfile);
      localStorage.setItem(ACTIVE_SESSION_KEY, cleanPhone);
      syncToServerRegistry(finalProfile);
      return { success: true };
    } catch (e) {
      return { success: false, error: "Login failed. Please try again." };
    }
  };

  const signup = (phone: string, pin: string, name: string) => {
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      return { success: false, error: "Please enter a valid 10-digit mobile number." };
    }
    if (!name.trim()) {
      return { success: false, error: "Please enter your full name." };
    }
    if (!pin || pin.length < 4) {
      return { success: false, error: "PIN / Password must be at least 4 characters." };
    }

    const isAdminUser = cleanPhone === ADMIN_PHONE;

    try {
      const usersMap = JSON.parse(localStorage.getItem(USERS_DB_KEY) || "{}");
      if (usersMap[cleanPhone] && !isAdminUser) {
        return {
          success: false,
          error: "Account already exists for this number. Please switch to 'Login'.",
        };
      }

      const newProfile: UserProfile & { _pin: string } = {
        phone: cleanPhone,
        name: isAdminUser ? ADMIN_NAME : name.trim(),
        dob: isAdminUser ? ADMIN_DOB : undefined,
        _pin: pin,
        isAdmin: isAdminUser,
        isSubscribed: isAdminUser,
        subscriptionPlan: isAdminUser ? "unlimited_1009" : null,
      };

      usersMap[cleanPhone] = newProfile;
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(usersMap));

      const { _pin, ...publicProfile } = newProfile;
      setUser(publicProfile);
      localStorage.setItem(ACTIVE_SESSION_KEY, cleanPhone);
      syncToServerRegistry(publicProfile);
      return { success: true };
    } catch (e) {
      return { success: false, error: "Signup failed. Please try again." };
    }
  };

  const registerOrLoginInline = (details: {
    phone: string;
    pin: string;
    name: string;
    gender?: string;
    dob?: string;
    tob?: string;
    pob?: string;
    maritalStatus?: string;
  }) => {
    const cleanPhone = (details.phone || "").replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      return { success: false, error: "Kripya 10-digit mobile number enter karein." };
    }
    if (!details.pin || details.pin.length < 4) {
      return { success: false, error: "4-Digit Security PIN zaroori hai." };
    }
    if (!details.name.trim()) {
      return { success: false, error: "Kripya apna poora naam likhein." };
    }

    try {
      const usersMap = JSON.parse(localStorage.getItem(USERS_DB_KEY) || "{}");
      const existing = usersMap[cleanPhone];

      if (existing) {
        // User exists -> verify PIN
        if (
          existing._pin !== details.pin &&
          !(cleanPhone === ADMIN_PHONE && (details.pin === ADMIN_PASS || details.pin === "1029"))
        ) {
          return {
            success: false,
            error: "Is mobile number par account pehle se bana hai. Kripya apna sahi 4-digit PIN dalein.",
          };
        }
        // Login & update details
        const isAdminUser = cleanPhone === ADMIN_PHONE;
        const updatedProfile: UserProfile = {
          ...existing,
          name: details.name.trim() || existing.name,
          gender: details.gender || existing.gender,
          dob: details.dob || existing.dob,
          tob: details.tob || existing.tob,
          pob: details.pob || existing.pob,
          maritalStatus: details.maritalStatus || existing.maritalStatus,
          isAdmin: isAdminUser,
          isSubscribed: isAdminUser ? true : existing.isSubscribed,
        };
        const { _pin, ...publicProfile } = updatedProfile as any;
        setUser(publicProfile);
        usersMap[cleanPhone] = { ...updatedProfile, _pin: existing._pin };
        localStorage.setItem(USERS_DB_KEY, JSON.stringify(usersMap));
        localStorage.setItem(ACTIVE_SESSION_KEY, cleanPhone);
        syncToServerRegistry(publicProfile);
        return { success: true };
      } else {
        // Create new account
        const isAdminUser = cleanPhone === ADMIN_PHONE;
        const newProfile: UserProfile & { _pin: string } = {
          phone: cleanPhone,
          name: isAdminUser ? ADMIN_NAME : details.name.trim(),
          gender: details.gender || "Male",
          dob: isAdminUser ? ADMIN_DOB : details.dob,
          tob: details.tob || "12:00",
          pob: details.pob || "",
          maritalStatus: details.maritalStatus || "Single / Unmarried",
          _pin: details.pin,
          isAdmin: isAdminUser,
          isSubscribed: isAdminUser,
          subscriptionPlan: isAdminUser ? "unlimited_1009" : null,
          activePasses: isAdminUser
            ? ["unlimited_1009", "duo_599", "trial_99", "love_ex_249", "kalesh_saas_299", "intercaste_349"]
            : [],
          createdAt: new Date().toISOString(),
        } as any;

        usersMap[cleanPhone] = newProfile;
        localStorage.setItem(USERS_DB_KEY, JSON.stringify(usersMap));
        const { _pin, ...publicProfile } = newProfile;
        setUser(publicProfile);
        localStorage.setItem(ACTIVE_SESSION_KEY, cleanPhone);
        syncToServerRegistry(publicProfile);
        return { success: true };
      }
    } catch (e) {
      return { success: false, error: "Account create nahi ho saka. Kripya punah prayas karein." };
    }
  };

  const hasServiceAccess = (serviceId: string): boolean => {
    if (user?.isAdmin) return true;
    if (!user?.isSubscribed) return false;
    if (user.activePasses?.includes(serviceId)) return true;
    if (user.subscriptionPlan === serviceId) return true;
    // Standard master passes
    if (user.subscriptionPlan === "unlimited_1009") {
      if (serviceId === "trial_99" || serviceId === "duo_599") return true;
    }
    if (user.subscriptionPlan === "duo_599" && serviceId === "trial_99") return true;
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(ACTIVE_SESSION_KEY);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    try {
      const updated = { ...user, ...data };
      if (user.phone === ADMIN_PHONE) {
        updated.isAdmin = true;
        updated.isSubscribed = true;
      }
      setUser(updated);

      const usersMap = JSON.parse(localStorage.getItem(USERS_DB_KEY) || "{}");
      if (usersMap[user.phone]) {
        usersMap[user.phone] = {
          ...usersMap[user.phone],
          ...data,
        };
        localStorage.setItem(USERS_DB_KEY, JSON.stringify(usersMap));
      }

      syncToServerRegistry(updated);
    } catch (e) {
      console.error("Failed to update profile:", e);
    }
  };

  const unlockSubscription = (plan: SubscriptionTierType) => {
    if (!user) return;
    const initialQuotas: Record<string, { deep: number; partner: number; match: number }> = {
      trial_99: { deep: 2, partner: 0, match: 1 },
      duo_599: { deep: 6, partner: 2, match: 3 },
      unlimited_1009: { deep: 18, partner: 6, match: 5 },
      love_ex_249: { deep: 2, partner: 2, match: 1 },
      kalesh_saas_299: { deep: 3, partner: 3, match: 2 },
      intercaste_349: { deep: 4, partner: 4, match: 2 },
    };
    const quotas = initialQuotas[plan] || { deep: 2, partner: 1, match: 1 };
    const currentPasses = user.activePasses || [];
    const newPasses = currentPasses.includes(plan) ? currentPasses : [...currentPasses, plan];

    updateProfile({
      isSubscribed: true,
      subscriptionPlan: plan,
      activePasses: newPasses,
      subscriptionDate: new Date().toISOString(),
      deepQuestionsRemaining: (user.deepQuestionsRemaining ?? 0) + quotas.deep,
      partnerQuestionsRemaining: (user.partnerQuestionsRemaining ?? 0) + quotas.partner,
      matchmakingRemaining: (user.matchmakingRemaining ?? 0) + quotas.match,
    });
  };

  const lockPrimaryProfile = () => {
    if (!user) return;
    updateProfile({
      primaryProfileLocked: true,
      primaryProfileName: user.name,
    });
  };

  const canAskPartnerQuestion = () => {
    if (user?.isAdmin) return true;
    if (!user?.isSubscribed) return false;
    if (user.subscriptionPlan === "trial_99") return false;
    return (user.partnerQuestionsRemaining ?? 0) > 0;
  };

  const canDoMatchmaking = () => {
    if (user?.isAdmin) return true;
    if (!user?.isSubscribed) return false;
    return (user.matchmakingRemaining ?? 0) > 0;
  };

  const addMatchmakingCredits = (count: number) => {
    if (!user) return;
    const current = user.matchmakingRemaining ?? 0;
    updateProfile({
      matchmakingRemaining: current + count,
    });
  };

  const consumeQuota = (type: "deepQuestion" | "partnerQuestion" | "matchmaking"): boolean => {
    if (user?.isAdmin) return true;
    if (!user || !user.isSubscribed) return false;

    if (type === "partnerQuestion") {
      if (!canAskPartnerQuestion()) return false;
      updateProfile({
        partnerQuestionsRemaining: Math.max(0, (user.partnerQuestionsRemaining ?? 1) - 1),
      });
      return true;
    }

    if (type === "matchmaking") {
      if (!canDoMatchmaking()) return false;
      updateProfile({
        matchmakingRemaining: Math.max(0, (user.matchmakingRemaining ?? 1) - 1),
      });
      return true;
    }

    // Default deep question
    const remaining = user.deepQuestionsRemaining ?? 1;
    if (remaining <= 0) return false;
    updateProfile({
      deepQuestionsRemaining: Math.max(0, remaining - 1),
    });
    return true;
  };

  const isEligibleForKundli = (): boolean => {
    if (user?.isAdmin) return true;
    if (!user || !user.isSubscribed) return false;
    const plan = user.subscriptionPlan;
    // Strictly the 3 core plans: 99 / 499 / 999
    return plan === "trial_99" || plan === "duo_599" || plan === "unlimited_1009";
  };

  const getMaxAllowedKundliDownloads = (): number => {
    if (user?.isAdmin) return 999;
    if (!user?.isSubscribed) return 0;
    if (user.subscriptionPlan === "trial_99") return 1; // 1 user allowed -> 1 download
    if (user.subscriptionPlan === "duo_599") return 2; // 2 users allowed -> 2 downloads (1 per user)
    if (user.subscriptionPlan === "unlimited_1009") return Math.max(5, (user.profiles?.length || 1)); // family allowed
    return 0;
  };

  const canDownloadKundli = (profileName?: string): boolean => {
    if (user?.isAdmin) return true;
    if (!isEligibleForKundli()) return false;
    const maxAllowed = getMaxAllowedKundliDownloads();
    const used = user?.kundliDownloadsUsed || 0;
    if (used >= maxAllowed) return false;

    // Check if this specific profile name has already downloaded their 1-time kundli
    const pName = (profileName || user?.primaryProfileName || user?.name || "primary").trim().toLowerCase();
    const downloadedList = (user?.kundliDownloadedProfiles || []).map((p) => p.trim().toLowerCase());
    if (downloadedList.includes(pName)) return false;

    return true;
  };

  const recordKundliDownload = (profileName?: string): boolean => {
    if (user?.isAdmin) return true;
    if (!canDownloadKundli(profileName)) return false;

    const pName = (profileName || user?.primaryProfileName || user?.name || "primary").trim().toLowerCase();
    const downloadedList = user?.kundliDownloadedProfiles || [];
    const updatedList = downloadedList.includes(pName) ? downloadedList : [...downloadedList, pName];
    const currentUsed = user?.kundliDownloadsUsed || 0;

    updateProfile({
      kundliDownloadsUsed: currentUsed + 1,
      kundliDownloadedProfiles: updatedList,
    });
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isAdmin: Boolean(user?.isAdmin || user?.phone === ADMIN_PHONE),
        login,
        signup,
        registerOrLoginInline,
        hasServiceAccess,
        logout,
        updateProfile,
        unlockSubscription,
        lockPrimaryProfile,
        consumeQuota,
        canAskPartnerQuestion,
        canDoMatchmaking,
        addMatchmakingCredits,
        isEligibleForKundli,
        canDownloadKundli,
        recordKundliDownload,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
