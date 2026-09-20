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

export interface UserProfile {
  phone: string;
  name: string;
  gender?: string;
  dob?: string;
  tob?: string;
  pob?: string;
  issue?: string;
  lifeFocus?: string;
  savedLeftPalm?: string;
  savedRightPalm?: string;
  isSubscribed?: boolean;
  subscriptionPlan?: "trial_99" | "duo_599" | "unlimited_1009" | null;
  subscriptionDate?: string;
  subscriptionExpiryDate?: string;
  isAdmin?: boolean;
  primaryProfileLocked?: boolean;
  primaryProfileName?: string;
  profiles?: SavedProfile[];
  deepQuestionsRemaining?: number;
  partnerQuestionsRemaining?: number;
  matchmakingRemaining?: number;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (phone: string, pin: string) => { success: boolean; error?: string };
  signup: (phone: string, pin: string, name: string) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  unlockSubscription: (plan: "trial_99" | "duo_599" | "unlimited_1009") => void;
  lockPrimaryProfile: () => void;
  consumeQuota: (type: "deepQuestion" | "partnerQuestion" | "matchmaking") => boolean;
  canAskPartnerQuestion: () => boolean;
  canDoMatchmaking: () => boolean;
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

  // Load existing session on mount & verify with server registry
  useEffect(() => {
    try {
      const activePhone = localStorage.getItem(ACTIVE_SESSION_KEY);
      if (activePhone) {
        const usersMap = JSON.parse(localStorage.getItem(USERS_DB_KEY) || "{}");
        if (usersMap[activePhone]) {
          const profile = usersMap[activePhone];
          // Check if admin
          if (activePhone === ADMIN_PHONE) {
            profile.isAdmin = true;
            profile.isSubscribed = true;
            profile.name = ADMIN_NAME;
            profile.dob = ADMIN_DOB;
          }
          setUser(profile);
        }
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

  const unlockSubscription = (plan: "trial_99" | "duo_599" | "unlimited_1009") => {
    if (!user) return;
    const initialQuotas = {
      trial_99: { deep: 2, partner: 0, match: 0 },
      duo_599: { deep: 6, partner: 2, match: 2 },
      unlimited_1009: { deep: 99, partner: 99, match: 4 },
    }[plan];

    updateProfile({
      isSubscribed: true,
      subscriptionPlan: plan,
      subscriptionDate: new Date().toISOString(),
      deepQuestionsRemaining: initialQuotas.deep,
      partnerQuestionsRemaining: initialQuotas.partner,
      matchmakingRemaining: initialQuotas.match,
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
    if (user.subscriptionPlan === "trial_99") return false;
    return (user.matchmakingRemaining ?? 0) > 0;
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

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isAdmin: Boolean(user?.isAdmin || user?.phone === ADMIN_PHONE),
        login,
        signup,
        logout,
        updateProfile,
        unlockSubscription,
        lockPrimaryProfile,
        consumeQuota,
        canAskPartnerQuestion,
        canDoMatchmaking,
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
