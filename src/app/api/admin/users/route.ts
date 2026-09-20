import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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
  subscriptionPlan?: "trial_99" | "unlimited_1009" | null;
  subscriptionDurationDays?: number;
  subscriptionStartDate?: string;
  subscriptionExpiryDate?: string;
  isAdmin?: boolean;
}

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users-registry.json");

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

function readUsersFromDisk(): StoredUser[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, JSON.stringify(DEFAULT_USERS, null, 2), "utf8");
      return DEFAULT_USERS;
    }
    const raw = fs.readFileSync(USERS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_USERS;
  } catch (e) {
    console.error("Error reading users registry file:", e);
    return DEFAULT_USERS;
  }
}

function writeUsersToDisk(users: StoredUser[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
  } catch (e) {
    console.error("Error writing users registry file:", e);
  }
}

/**
 * GET /api/admin/users
 * Returns list of all registered and consulted users
 */
export async function GET(req: NextRequest) {
  const users = readUsersFromDisk();
  return NextResponse.json({ success: true, count: users.length, users });
}

/**
 * POST /api/admin/users
 * Registers or updates a user whenever they sign up or submit a consultation
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, name, dob, tob, pob, gender, issue, lifeFocus } = body;

    const cleanPhone = (phone || "").replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      return NextResponse.json({ success: false, error: "Valid 10-digit phone required" }, { status: 400 });
    }

    const users = readUsersFromDisk();
    const existingIndex = users.findIndex((u) => u.phone === cleanPhone);

    const isAdmin = cleanPhone === "8511739865" || (name && name.toLowerCase().includes("nishant dantare"));

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
      };
      if (isAdmin) {
        users[existingIndex].isSubscribed = true;
        users[existingIndex].subscriptionPlan = "unlimited_1009";
      }
    } else {
      // Add new record
      users.push({
        phone: cleanPhone,
        name: name || "Visitor",
        dob: dob || "",
        tob: tob || "",
        pob: pob || "",
        gender: gender || "",
        issue: issue || "",
        lifeFocus: lifeFocus || "",
        createdAt: new Date().toISOString(),
        isSubscribed: isAdmin,
        subscriptionPlan: isAdmin ? "unlimited_1009" : null,
        isAdmin,
      });
    }

    writeUsersToDisk(users);
    return NextResponse.json({ success: true, message: "User registry synchronized." });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

/**
 * PUT /api/admin/users
 * Admin updates subscription status (Switch ON / OFF with custom duration)
 */
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, isSubscribed, plan, durationDays } = body;

    const cleanPhone = (phone || "").replace(/\D/g, "");
    if (!cleanPhone) {
      return NextResponse.json({ success: false, error: "Phone number required" }, { status: 400 });
    }

    const users = readUsersFromDisk();
    const userIndex = users.findIndex((u) => u.phone === cleanPhone);

    if (userIndex < 0) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const now = new Date();
    let expiryDate: string | undefined = undefined;

    if (isSubscribed && durationDays) {
      const exp = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000);
      expiryDate = exp.toISOString();
    }

    users[userIndex] = {
      ...users[userIndex],
      isSubscribed: Boolean(isSubscribed),
      subscriptionPlan: isSubscribed ? (plan || "trial_99") : null,
      subscriptionDurationDays: isSubscribed ? durationDays : 0,
      subscriptionStartDate: isSubscribed ? now.toISOString() : undefined,
      subscriptionExpiryDate: isSubscribed ? expiryDate : undefined,
    };

    writeUsersToDisk(users);
    return NextResponse.json({
      success: true,
      message: `Subscription for ${users[userIndex].name} has been ${isSubscribed ? "ACTIVATED" : "DEACTIVATED"}.`,
      user: users[userIndex],
    });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
