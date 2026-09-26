import { NextRequest, NextResponse } from "next/server";
import { verifyUserSubscription, getServerReading } from "@/lib/server-registry";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { readingId, userPhone } = body;

    if (!readingId) {
      return NextResponse.json(
        { success: false, error: "Reading ID is required to unlock." },
        { status: 400 }
      );
    }

    // Check server-side authority
    const { isSuperAdmin, isSubscribed } = await verifyUserSubscription(userPhone);

    if (!isSuperAdmin && !isSubscribed) {
      return NextResponse.json(
        {
          success: false,
          error: "Active subscription required. Please unlock via WhatsApp or sign in.",
          requiresSubscription: true,
        },
        { status: 403 }
      );
    }

    // Retrieve cached full reading
    const cached = getServerReading(readingId);
    if (!cached) {
      return NextResponse.json(
        {
          success: false,
          error: "Reading session expired or not found. Please re-run your consultation.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      reading: cached.reading,
      pujaVidhi: cached.pujaVidhi,
      synastry: cached.synastry,
      isUnlocked: true,
    });
  } catch (error: any) {
    console.error("Unlock reading error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to unlock reading." },
      { status: 500 }
    );
  }
}
