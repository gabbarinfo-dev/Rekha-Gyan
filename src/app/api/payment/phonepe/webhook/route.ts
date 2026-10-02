import { NextRequest, NextResponse } from "next/server";
import { checkPhonePeOrderStatus } from "@/lib/phonepe";
import { activateUserPlanServer } from "@/lib/server-registry";
import { sendMetaLeadEvent } from "@/lib/meta-capi";
import fs from "fs";
import path from "path";

function findOrderInfo(orderId: string): any {
  try {
    const filePath = path.join(process.cwd(), "data", "orders-registry.json");
    if (fs.existsSync(filePath)) {
      const orders = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      return orders.find((o: any) => o.merchantOrderId === orderId || o.phonePeOrderId === orderId);
    }
  } catch {}
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json().catch(() => ({}));
    console.log("PhonePe Webhook Received:", JSON.stringify(rawBody));

    // In PhonePe PG V2 / V3, payload has { event, payload: { merchantOrderId, orderId, state, ... } } or similar
    const payload = rawBody.payload || rawBody.data || rawBody;
    const merchantOrderId = payload.merchantOrderId || payload.orderId;

    if (!merchantOrderId) {
      console.warn("PhonePe Webhook received without merchantOrderId");
      return NextResponse.json({ success: true, message: "Acknowledged without orderId" });
    }

    // Verify order status directly with PhonePe API for maximum security
    const orderStatus = await checkPhonePeOrderStatus(merchantOrderId);

    if (orderStatus.state === "COMPLETED") {
      const savedOrder = findOrderInfo(merchantOrderId);
      const phone = savedOrder?.userPhone || payload.mobileNumber || "";
      const plan = savedOrder?.planId || "trial_99";

      if (phone) {
        await activateUserPlanServer({
          phone,
          planId: plan,
          orderId: merchantOrderId,
          amount: orderStatus.amountInRupees,
        });
        console.log(`PhonePe Webhook: Plan ${plan} successfully activated for seeker ${phone}`);

        // Fire Meta Conversions API (CAPI) Lead Event in background (fail-safe)
        sendMetaLeadEvent({
          phone,
          amount: orderStatus.amountInRupees,
          planId: plan,
          orderId: merchantOrderId,
          eventSourceUrl: "https://rekhagyan.online/payment-success",
        }).catch((capiErr) => console.warn("[Meta CAPI Webhook Non-Fatal]", capiErr));
      }
    }

    return NextResponse.json({ success: true, message: "Webhook processed successfully" });
  } catch (err: any) {
    console.error("PhonePe Webhook processing error:", err);
    // Always return 200 OK so PhonePe doesn't retry unnecessarily if error was minor
    return NextResponse.json({ success: false, error: err.message }, { status: 200 });
  }
}
