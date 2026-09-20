import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";

export interface StoredUser {
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

// Default initial admin and seed data
const DEFAULT_USERS: StoredUser[] = [
  {
    phone: "8511739865",
    name: "Nishant Dantare",
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
  // 1. Process data directory
  paths.push(path.join(process.cwd(), "data", "users-registry.json"));
  // 2. OS temp directory (works everywhere on Vercel / serverless / Linux / Windows)
  paths.push(path.join(os.tmpdir(), "rekha-users-registry.json"));
  return paths;
}

let inMemoryUsers: StoredUser[] = [...DEFAULT_USERS];

function readUsersFromDisk(): StoredUser[] {
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
      // Continue to next path
    }
  }

  return inMemoryUsers;
}

function writeUsersToDisk(users: StoredUser[]) {
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
      // Non-blocking fallback to next candidate
    }
  }
}

/**
 * GET /api/admin/users
 * Returns either all users or checks status for a specific phone:
 * GET /api/admin/users?phone=8511739865
 */
export async function GET(req: NextRequest) {
  const phone = req.nextUrl.searchParams.get("phone");
  const users = readUsersFromDisk();

  if (phone) {
    const cleanPhone = phone.replace(/\D/g, "");
    const user = users.find((u) => u.phone === cleanPhone);
    return NextResponse.json({ success: true, user: user || null });
  }

  return NextResponse.json({
    success: true,
    count: users.length,
    users,
    activeSubscribers: users.filter((u) => u.isSubscribed).length,
  });
}

/**
 * POST /api/admin/users
 * Registers or updates a user whenever they sign up, consult, or are added manually by Super Admin
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      phone,
      name,
      dob,
      tob,
      pob,
      gender,
      issue,
      lifeFocus,
      isSubscribed,
      subscriptionPlan,
      subscriptionDurationDays,
    } = body;

    const cleanPhone = (phone || "").replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      return NextResponse.json(
        { success: false, error: "Valid 10-digit phone number is required." },
        { status: 400 }
      );
    }

    const users = readUsersFromDisk();
    const existingIndex = users.findIndex((u) => u.phone === cleanPhone);

    const isAdmin = cleanPhone === "8511739865" || (name && name.toLowerCase().includes("nishant dantare"));

    const now = new Date();
    let expiryDate: string | undefined = undefined;
    if (isSubscribed && subscriptionDurationDays) {
      expiryDate = new Date(now.getTime() + subscriptionDurationDays * 24 * 60 * 60 * 1000).toISOString();
    }

    if (existingIndex >= 0) {
      // Update existing record
      users[existingIndex] = {
        ...users[existingIndex],
        name: name || users[existingIndex].name,
        dob: dob || users[existingIndex].dob,
        tob: tob || users[existingIndex].tob,
        pob: pob || users[existingIndex].pob,
        gender: gender || users[existingIndex].gender,
        issue: issue || users[existingIndex].issue,
        lifeFocus: lifeFocus || users[existingIndex].lifeFocus,
        isAdmin: isAdmin || users[existingIndex].isAdmin,
        isSubscribed: isSubscribed !== undefined ? Boolean(isSubscribed) : users[existingIndex].isSubscribed,
        subscriptionPlan: subscriptionPlan !== undefined ? subscriptionPlan : users[existingIndex].subscriptionPlan,
        subscriptionDurationDays: subscriptionDurationDays || users[existingIndex].subscriptionDurationDays,
        subscriptionExpiryDate: expiryDate || users[existingIndex].subscriptionExpiryDate,
      };
      if (isAdmin) {
        users[existingIndex].isSubscribed = true;
        users[existingIndex].subscriptionPlan = "unlimited_1009";
      }
    } else {
      // Add new record
      users.push({
        phone: cleanPhone,
        name: name || "Seeker",
        dob: dob || "",
        tob: tob || "",
        pob: pob || "",
        gender: gender || "",
        issue: issue || "",
        lifeFocus: lifeFocus || "",
        createdAt: new Date().toISOString(),
        isSubscribed: isAdmin ? true : Boolean(isSubscribed),
        subscriptionPlan: isAdmin ? "unlimited_1009" : (subscriptionPlan || null),
        subscriptionDurationDays: subscriptionDurationDays || 30,
        subscriptionStartDate: isSubscribed ? now.toISOString() : undefined,
        subscriptionExpiryDate: expiryDate,
        isAdmin,
      });
    }

    writeUsersToDisk(users);
    return NextResponse.json({
      success: true,
      message: "User registry synchronized successfully.",
      user: users.find((u) => u.phone === cleanPhone),
    });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

/**
 * PUT /api/admin/users
 * Admin updates subscription status (Switch ON / OFF, assign specific plan, duration, etc.)
 */
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, isSubscribed, plan, durationDays } = body;

    const cleanPhone = (phone || "").replace(/\D/g, "");
    if (!cleanPhone) {
      return NextResponse.json({ success: false, error: "Phone number required." }, { status: 400 });
    }

    const users = readUsersFromDisk();
    const userIndex = users.findIndex((u) => u.phone === cleanPhone);

    if (userIndex < 0) {
      return NextResponse.json({ success: false, error: "User not found in registry." }, { status: 404 });
    }

    const now = new Date();
    let expiryDate: string | undefined = undefined;

    const days = durationDays !== undefined ? Number(durationDays) : 30;

    if (isSubscribed && days > 0) {
      const exp = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
      expiryDate = exp.toISOString();
    }

    users[userIndex] = {
      ...users[userIndex],
      isSubscribed: Boolean(isSubscribed),
      subscriptionPlan: isSubscribed ? (plan || "trial_99") : null,
      subscriptionDurationDays: isSubscribed ? days : 0,
      subscriptionStartDate: isSubscribed ? now.toISOString() : undefined,
      subscriptionExpiryDate: isSubscribed ? expiryDate : undefined,
    };

    writeUsersToDisk(users);

    const planLabel = {
      trial_99: "₹99 Starter Pack",
      duo_599: "₹599 Duo Pass",
      unlimited_1009: "₹1,099 Pro Pass",
    }[plan as "trial_99" | "duo_599" | "unlimited_1009"] || "Custom Plan";

    return NextResponse.json({
      success: true,
      message: isSubscribed
        ? `Successfully activated ${planLabel} for ${users[userIndex].name} (${days} days)!`
        : `Deactivated subscription for ${users[userIndex].name}.`,
      user: users[userIndex],
    });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/users
 * Delete a user record from registry
 */
export async function DELETE(req: NextRequest) {
  try {
    const phone = req.nextUrl.searchParams.get("phone");
    const cleanPhone = (phone || "").replace(/\D/g, "");
    if (!cleanPhone) {
      return NextResponse.json({ success: false, error: "Phone number required." }, { status: 400 });
    }

    if (cleanPhone === "8511739865") {
      return NextResponse.json({ success: false, error: "Cannot delete Super Admin account." }, { status: 403 });
    }

    let users = readUsersFromDisk();
    const beforeCount = users.length;
    users = users.filter((u) => u.phone !== cleanPhone);

    if (users.length === beforeCount) {
      return NextResponse.json({ success: false, error: "User not found." }, { status: 404 });
    }

    writeUsersToDisk(users);
    return NextResponse.json({ success: true, message: "User deleted from registry." });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
