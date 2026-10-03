import { NextRequest, NextResponse } from "next/server";
import { createPhonePeOrder } from "@/lib/phonepe";
import { isCouponUsedByUser } from "@/lib/server-registry";
import fs from "fs";
import path from "path";
import os from "os";

const PLAN_CATALOG: Record<string, { price: number; label: string }> = {
  trial_99: { price: 99, label: "₹99 Starter Pack" },
  duo_599: { price: 499, label: "₹499 Duo Pass" },
  unlimited_1009: { price: 999, label: "₹999 Pro & Family Pass" },
  topup_60: { price: 60, label: "₹60 Matchmaking Top-Up (2 Credits)" },
  topup_99: { price: 99, label: "₹99 Matchmaking Top-Up (5 Credits)" },
  love_ex_249: { price: 249, label: "₹249 Khoya Pyar & Get Your Ex Back Pass" },
  kalesh_saas_299: { price: 299, label: "₹299 Ghar Kalesh & Sasural Shanti Pass" },
  intercaste_349: { price: 349, label: "₹349 Intercaste Vivah & Parivaar Manana Pass" },
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
    const { planId, userPhone, userName, userDob, couponCode } = body;

    if (!planId || !PLAN_CATALOG[planId]) {
      return NextResponse.json(
        { success: false, error: "Invalid plan or option selected" },
        { status: 400 }
      );
    }

    const cleanPhone = (userPhone || "").replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: "A valid 10-digit mobile number is required to link and activate your subscription.",
        },
        { status: 400 }
      );
    }

    const safeName = (userName || "Seeker").trim();

    const plan = PLAN_CATALOG[planId];
    let amountInRupees = plan.price;
    let appliedCoupon: string | undefined = undefined;

    // Validate VIP99 coupon if provided
    if (couponCode) {
      const cleanCoupon = String(couponCode).trim().toUpperCase();
      if (cleanCoupon === "VIP99") {
        const ELIGIBLE_PASSES = ["duo_599", "love_ex_249", "kalesh_saas_299", "intercaste_349"];
        if (!ELIGIBLE_PASSES.includes(planId)) {
          return NextResponse.json(
            {
              success: false,
              error: "VIP99 coupon code Duo Pass aur Special Vedic Passes ke liye valid hai (Family Pass ke liye nahi).",
            },
            { status: 400 }
          );
        }

        const alreadyUsed = await isCouponUsedByUser(cleanPhone, cleanCoupon);
        if (alreadyUsed) {
          return NextResponse.json(
            {
              success: false,
              error: "Aap is VIP99 code ko pehle hi use kar chuke hain. Ek user isse sirf ek hi baar use kar sakta hai.",
            },
            { status: 400 }
          );
        }

        // Apply discount: Price becomes exactly ₹99
        amountInRupees = 99;
        appliedCoupon = "VIP99";
      } else {
        return NextResponse.json(
          { success: false, error: "Invalid coupon code entered." },
          { status: 400 }
        );
      }
    }

    // Generate unique Merchant Order ID: RG_{TIMESTAMP}_{RANDOM}
    const merchantOrderId = `RG_${Date.now()}_${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    const proto = req.headers.get("x-forwarded-proto") || "https";
    const hostHeader =
      req.headers.get("x-forwarded-host") ||
      req.headers.get("origin")?.replace(/^https?:\/\//, "") ||
      req.headers.get("host") ||
      "ai.rekhagyan.online";
    const appUrl = `${proto}://${hostHeader}`;

    // Callback URL where PhonePe returns the user after transaction
    const redirectUrl = `${appUrl}/api/payment/phonepe/callback?orderId=${merchantOrderId}&plan=${planId}&phone=${encodeURIComponent(
      cleanPhone
    )}${appliedCoupon ? `&coupon=${appliedCoupon}` : ""}`;

    const result = await createPhonePeOrder({
      merchantOrderId,
      amountInRupees,
      redirectUrl,
      userPhone: cleanPhone,
      userName: safeName,
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
      originalPrice: plan.price,
      couponCode: appliedCoupon,
      userPhone: cleanPhone,
      userName: safeName,
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
