import { NextRequest, NextResponse } from "next/server";
import { isCouponUsedByUser } from "@/lib/server-registry";

const ELIGIBLE_PASSES = ["duo_599", "love_ex_249", "kalesh_saas_299", "intercaste_349"];

const PASS_NAMES: Record<string, string> = {
  duo_599: "Duo Pass",
  love_ex_249: "Khoya Pyar & Get Your Ex Back Pass",
  kalesh_saas_299: "Ghar Kalesh & Sasural Shanti Pass",
  intercaste_349: "Intercaste Vivah & Parivaar Manana Pass",
};

const ORIGINAL_PRICES: Record<string, number> = {
  duo_599: 499,
  love_ex_249: 249,
  kalesh_saas_299: 299,
  intercaste_349: 349,
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, planId, phone } = body;

    const cleanCode = (code || "").trim().toUpperCase();
    if (!cleanCode) {
      return NextResponse.json(
        { valid: false, error: "Please enter a coupon code." },
        { status: 400 }
      );
    }

    if (cleanCode !== "VIP99") {
      return NextResponse.json(
        { valid: false, error: "Invalid coupon code. Please check and try again." },
        { status: 400 }
      );
    }

    if (!planId || !ELIGIBLE_PASSES.includes(planId)) {
      return NextResponse.json(
        {
          valid: false,
          error: "VIP99 coupon code Duo Pass aur Special Vedic Passes ke liye valid hai (Family Pass ke liye nahi).",
        },
        { status: 400 }
      );
    }

    const cleanPhone = (phone || "").replace(/\D/g, "");
    if (cleanPhone && cleanPhone.length >= 10) {
      const alreadyUsed = await isCouponUsedByUser(cleanPhone, cleanCode);
      if (alreadyUsed) {
        return NextResponse.json(
          {
            valid: false,
            error: "Aap is VIP99 code ko pehle hi use kar chuke hain. Ek user isse sirf ek hi baar use kar sakta hai.",
          },
          { status: 400 }
        );
      }
    }

    const origPrice = ORIGINAL_PRICES[planId] || 249;
    const discountedPrice = 99;
    const savings = origPrice - discountedPrice;

    return NextResponse.json({
      valid: true,
      code: "VIP99",
      planId,
      planName: PASS_NAMES[planId],
      originalPrice: origPrice,
      discountedPrice,
      savings,
      message: `🎉 VIP99 Applied! Price discounted to ₹99 (₹${savings} Saved).`,
    });
  } catch (error: any) {
    console.error("Coupon validation error:", error);
    return NextResponse.json(
      { valid: false, error: error.message || "Failed to validate coupon" },
      { status: 500 }
    );
  }
}
