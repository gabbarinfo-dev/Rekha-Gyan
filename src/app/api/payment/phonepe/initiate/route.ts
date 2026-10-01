import { NextRequest, NextResponse } from "next/server";
import { createPhonePeOrder } from "@/lib/phonepe";
import fs from "fs";
import path from "path";
import os from "os";

const PLAN_CATALOG: Record<string, { price: number; label: string }> = {
  trial_99: { price: 99, label: "₹99 Starter Pack" },
  duo_599: { price: 499, label: "₹499 Duo Pass" },
  unlimited_1009: { price: 999, label: "₹999 Pro & Family Pass" },
  topup_60: { price: 60, label: "₹60 Matchmaking Top-Up (2 Credits)" },
  topup_99: { price: 99, label: "₹99 Matchmaking Top-Up (5 Credits)" },
};

function getOrdersFilePath(): string {
  const localDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(localDir)) {
    try {
      fs.mkdirSync(localDir, { recursive: true });
    } catch {}
  }
  return path.join(localDir, "orders-registry.json");
}

function saveOrder(order: any) {
  try {
    const filePath = getOrdersFilePath();
    let orders: any[] = [];
    if (fs.existsSync(filePath)) {
      try {
        orders = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      } catch {}
    }
    orders.unshift(order);
    if (orders.length > 500) orders = orders.slice(0, 500);
    fs.writeFileSync(filePath, JSON.stringify(orders, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to save order to disk:", e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { planId, userPhone, userName, userDob } = body;

    if (!planId || !PLAN_CATALOG[planId]) {
      return NextResponse.json(
        { success: false, error: "Invalid plan or option selected" },
        { status: 400 }
      );
    }

    const plan = PLAN_CATALOG[planId];
    const amountInRupees = plan.price;

    // Generate unique Merchant Order ID: RG_{TIMESTAMP}_{RANDOM}
    const merchantOrderId = `RG_${Date.now()}_${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    const host =
      process.env.NEXT_PUBLIC_APP_URL ||
      req.headers.get("origin") ||
      req.headers.get("host") ||
      "https://rekhagyan.online";
    const appUrl = host.startsWith("http") ? host : `https://${host}`;

    // Callback URL where PhonePe returns the user after transaction
    const redirectUrl = `${appUrl}/api/payment/phonepe/callback?orderId=${merchantOrderId}&plan=${planId}&phone=${encodeURIComponent(
      userPhone || ""
    )}`;

    const result = await createPhonePeOrder({
      merchantOrderId,
      amountInRupees,
      redirectUrl,
      userPhone,
      userName,
    });

    if (!result.success || !result.redirectUrl) {
      return NextResponse.json(
        { success: false, error: result.error || "Failed to create PhonePe payment session" },
        { status: 500 }
      );
    }

    // Persist order in backend storage
    saveOrder({
      merchantOrderId,
      phonePeOrderId: result.orderId,
      planId,
      amountInRupees,
      userPhone: userPhone || "",
      userName: userName || "",
      userDob: userDob || "",
      status: "PENDING",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      merchantOrderId,
      orderId: result.orderId,
      redirectUrl: result.redirectUrl,
    });
  } catch (error: any) {
    console.error("Payment Initiate Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
