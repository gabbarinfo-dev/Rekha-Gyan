import fs from "fs";
import path from "path";
import os from "os";
import {
  fetchUsersRegistryFromWordPress,
  saveUsersRegistryToWordPress,
  WordPressStoredUser,
} from "@/lib/wordpress";

export const SUPER_ADMIN_PHONE = "8511739865";
export const SUPER_ADMIN_NAME = "Nishant Dantare";

export interface StoredUser extends WordPressStoredUser {}

const DEFAULT_USERS: StoredUser[] = [
  {
    phone: SUPER_ADMIN_PHONE,
    name: SUPER_ADMIN_NAME,
    dob: "29-04-1987",
    gender: "Male",
    pob: "Ajmer, Rajasthan",
    issue: "Core Platform Administration & Destiny Vision Architecture",
    lifeFocus: "Career & Wealth Breakthrough",
    createdAt: new Date().toISOString(),
    isSubscribed: true,
    subscriptionPlan: "unlimited_1009",
    subscriptionDurationDays: 3650,
    subscriptionStartDate: new Date().toISOString(),
    subscriptionExpiryDate: "2099-12-31T23:59:59.000Z",
    isAdmin: true,
  },
];

function getStoragePaths(): string[] {
  const paths: string[] = [];
  paths.push(path.join(process.cwd(), "data", "users-registry.json"));
  paths.push(path.join(os.tmpdir(), "rekha-users-registry.json"));
  return paths;
}

let inMemoryUsers: StoredUser[] = [...DEFAULT_USERS];

export function readUsersFromDisk(): StoredUser[] {
  const candidatePaths = getStoragePaths();

  for (const filePath of candidatePaths) {
    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, "utf8");
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const mergedMap = new Map<string, StoredUser>();
          DEFAULT_USERS.forEach((u) => mergedMap.set(u.phone, u));
          parsed.forEach((u) => mergedMap.set(u.phone, u));
          inMemoryUsers.forEach((u) => mergedMap.set(u.phone, u));
          inMemoryUsers = Array.from(mergedMap.values());
          return inMemoryUsers;
        }
      }
    } catch {
      // Continue
    }
  }

  return inMemoryUsers;
}

export function writeUsersToDisk(users: StoredUser[]) {
  inMemoryUsers = users;
  const candidatePaths = getStoragePaths();

  for (const filePath of candidatePaths) {
    try {
      const dirPath = path.dirname(filePath);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf8");
    } catch {
      // Non-blocking fallback
    }
  }
}

export async function getLatestUsers(): Promise<StoredUser[]> {
  const diskUsers = readUsersFromDisk();
  try {
    const wpUsers = await fetchUsersRegistryFromWordPress();
    if (wpUsers && Array.isArray(wpUsers) && wpUsers.length > 0) {
      const mergedMap = new Map<string, StoredUser>();
      DEFAULT_USERS.forEach((u) => mergedMap.set(u.phone, u));
      diskUsers.forEach((u) => mergedMap.set(u.phone, u));
      wpUsers.forEach((u) => mergedMap.set(u.phone, u as StoredUser));
      const combined = Array.from(mergedMap.values());
      writeUsersToDisk(combined);
      return combined;
    }
  } catch (err) {
    console.warn("WordPress users sync notice:", err);
  }
  return diskUsers;
}

/**
 * Server-side authority verification
 */
export async function verifyUserSubscription(phone?: string): Promise<{
  isSuperAdmin: boolean;
  isSubscribed: boolean;
  plan: string | null;
  user?: StoredUser;
}> {
  if (!phone) {
    return { isSuperAdmin: false, isSubscribed: false, plan: null };
  }

  const clean = phone.replace(/\D/g, "");

  // Super Admin Always has Full Unconditional Authority
  if (clean === SUPER_ADMIN_PHONE) {
    return {
      isSuperAdmin: true,
      isSubscribed: true,
      plan: "unlimited_1009",
      user: DEFAULT_USERS[0],
    };
  }

  const users = await getLatestUsers();
  const found = users.find((u) => u.phone === clean);

  if (!found) {
    return { isSuperAdmin: false, isSubscribed: false, plan: null };
  }

  const isSub = Boolean(found.isSubscribed);
  let isValid = isSub;

  // Check expiration if set
  if (found.subscriptionExpiryDate) {
    const expiry = new Date(found.subscriptionExpiryDate).getTime();
    if (Date.now() > expiry) {
      isValid = false;
    }
  }

  return {
    isSuperAdmin: Boolean(found.isAdmin),
    isSubscribed: isValid,
    plan: found.subscriptionPlan || null,
    user: found,
  };
}

// -------------------------------------------------------------------
// IP Rate Limiting (Protects from bots, continuous curls, and DDoS)
// -------------------------------------------------------------------
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const ipRateLimits = new Map<string, RateLimitRecord>();

/**
 * Allows up to maxRequests free analyses per timeWindowMs per IP
 */
export function checkIpRateLimit(
  ip: string,
  isWhitelisted: boolean = false,
  maxRequests: number = 4,
  timeWindowMs: number = 3600 * 1000 // 1 hour window
): { allowed: boolean; remaining: number; resetInSeconds: number } {
  if (isWhitelisted) {
    return { allowed: true, remaining: 999, resetInSeconds: 0 };
  }

  const now = Date.now();
  const record = ipRateLimits.get(ip);

  if (!record || now > record.resetAt) {
    ipRateLimits.set(ip, { count: 1, resetAt: now + timeWindowMs });
    return { allowed: true, remaining: maxRequests - 1, resetInSeconds: Math.ceil(timeWindowMs / 1000) };
  }

  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds: Math.ceil((record.resetAt - now) / 1000),
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetInSeconds: Math.ceil((record.resetAt - now) / 1000),
  };
}

// -------------------------------------------------------------------
// Secure Server-Side Reading Cache (Prevents leak to DevTools)
// -------------------------------------------------------------------
export interface CachedReading {
  reading: string;
  pujaVidhi: any;
  synastry?: any;
  userPhone?: string;
  createdAt: number;
}

const readingCache = new Map<string, CachedReading>();

export function cacheServerReading(id: string, data: CachedReading) {
  readingCache.set(id, data);
  // Auto purge cache after 48 hours
  setTimeout(() => readingCache.delete(id), 48 * 3600 * 1000);
}

export function getServerReading(id: string): CachedReading | undefined {
  return readingCache.get(id);
}

/**
 * Server-side subscription and credit unlock upon successful payment
 */
export async function activateUserPlanServer(params: {
  phone: string;
  planId: string;
  orderId: string;
  amount?: number;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const { phone, planId, orderId } = params;
    if (!phone) return { success: false, error: "Missing phone number" };

    const clean = phone.replace(/\D/g, "");
    const users = await getLatestUsers();
    let userIndex = users.findIndex((u) => u.phone === clean);

    const now = new Date();
    const startDate = now.toISOString();

    if (planId.startsWith("topup")) {
      const topupCredits = planId === "topup_99" ? 5 : 2;
      if (userIndex >= 0) {
        users[userIndex].matchmakingRemaining = (users[userIndex].matchmakingRemaining || 0) + topupCredits;
      } else {
        users.push({
          phone: clean,
          name: "Seeker",
          createdAt: startDate,
          isSubscribed: false,
          matchmakingRemaining: topupCredits,
        });
      }
    } else {
      const planConfigs: Record<string, { days: number; deep: number; partner: number; match: number }> = {
        trial_99: { days: 30, deep: 2, partner: 0, match: 1 },
        duo_599: { days: 60, deep: 6, partner: 2, match: 3 },
        unlimited_1009: { days: 365, deep: 18, partner: 6, match: 5 },
        love_ex_249: { days: 45, deep: 4, partner: 2, match: 2 },
        kalesh_saas_299: { days: 45, deep: 5, partner: 2, match: 3 },
        intercaste_349: { days: 60, deep: 6, partner: 3, match: 4 },
      };

      const config = planConfigs[planId] || planConfigs.trial_99;
      const expiry = new Date(now.getTime() + config.days * 24 * 60 * 60 * 1000).toISOString();

      if (userIndex >= 0) {
        users[userIndex].isSubscribed = true;
        users[userIndex].subscriptionPlan = planId as any;
        users[userIndex].subscriptionStartDate = startDate;
        users[userIndex].subscriptionExpiryDate = expiry;
        users[userIndex].subscriptionDurationDays = config.days;
        users[userIndex].deepQuestionsRemaining = (users[userIndex].deepQuestionsRemaining || 0) + config.deep;
        users[userIndex].partnerQuestionsRemaining = (users[userIndex].partnerQuestionsRemaining || 0) + config.partner;
        users[userIndex].matchmakingRemaining = (users[userIndex].matchmakingRemaining || 0) + config.match;
      } else {
        users.push({
          phone: clean,
          name: "Seeker",
          createdAt: startDate,
          isSubscribed: true,
          subscriptionPlan: planId as any,
          subscriptionStartDate: startDate,
          subscriptionExpiryDate: expiry,
          subscriptionDurationDays: config.days,
          deepQuestionsRemaining: config.deep,
          partnerQuestionsRemaining: config.partner,
          matchmakingRemaining: config.match,
        });
      }
    }

    // Persist to disk and sync with WordPress
    writeUsersToDisk(users);
    saveUsersRegistryToWordPress(users).catch((err) =>
      console.warn("WP sync notice after payment activation:", err)
    );

    return { success: true };
  } catch (err: any) {
    console.error("activateUserPlanServer failed:", err);
    return { success: false, error: err.message };
  }
}

