import { NextRequest, NextResponse } from "next/server";
import { sendMetaLeadEvent } from "@/lib/meta-capi";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || undefined;
    const userAgent = req.headers.get("user-agent") || undefined;

    const result = await sendMetaLeadEvent({
      phone: body.phone,
      email: body.email,
      leadId: body.leadId,
      amount: body.amount ? Number(body.amount) : undefined,
      planId: body.planId || body.plan,
      orderId: body.orderId,
      eventSourceUrl: body.eventSourceUrl || "https://rekhagyan.online",
      clientIp,
      userAgent,
    });

    return NextResponse.json({
      success: result.success,
      metaResponse: result.data,
      error: result.error,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
