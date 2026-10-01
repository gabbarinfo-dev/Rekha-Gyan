import { NextRequest, NextResponse } from "next/server";
import { checkPhonePeOrderStatus } from "@/lib/phonepe";
import { activateUserPlanServer } from "@/lib/server-registry";

async function handleCallback(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    // Parameters passed when creating the checkout session
    let orderId = searchParams.get("orderId");
    let plan = searchParams.get("plan") || "trial_99";
    let phone = searchParams.get("phone") || "";

    // If POST request, check if PhonePe passed body params
    if (req.method === "POST") {
      try {
        const contentType = req.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const body = await req.json();
          if (body.merchantOrderId) orderId = body.merchantOrderId;
        } else if (contentType.includes("application/x-www-form-urlencoded")) {
          const formData = await req.formData();
          const formOrderId = formData.get("merchantOrderId") as string;
          if (formOrderId) orderId = formOrderId;
        }
      } catch (err) {
        console.warn("Could not parse POST body in callback:", err);
      }
    }

    if (!orderId) {
      console.error("PhonePe callback missing orderId");
      return NextResponse.redirect(new URL("/payment-success?status=failed&error=missing_order_id", req.url));
    }

    // Live query to PhonePe API to verify order state
    const orderStatus = await checkPhonePeOrderStatus(orderId);
    console.log(`PhonePe Callback: Order ${orderId} -> State: ${orderStatus.state}`);

    const proto = req.headers.get("x-forwarded-proto") || "https";
    const hostHeader =
      req.headers.get("x-forwarded-host") ||
      req.headers.get("origin")?.replace(/^https?:\/\//, "") ||
      req.headers.get("host") ||
      "ai.rekhagyan.online";
    const appUrl = `${proto}://${hostHeader}`;

    if (orderStatus.state === "COMPLETED") {
      // Activate plan on server
      if (phone) {
        await activateUserPlanServer({
          phone,
          planId: plan,
          orderId,
          amount: orderStatus.amountInRupees,
        });
      }

      // Redirect to payment success page
      const successUrl = new URL("/payment-success", appUrl);
      successUrl.searchParams.set("status", "success");
      successUrl.searchParams.set("orderId", orderId);
      successUrl.searchParams.set("plan", plan);
      if (phone) successUrl.searchParams.set("phone", phone);

      return NextResponse.redirect(successUrl);
    } else if (orderStatus.state === "PENDING") {
      // Pending state
      const pendingUrl = new URL("/payment-success", appUrl);
      pendingUrl.searchParams.set("status", "pending");
      pendingUrl.searchParams.set("orderId", orderId);
      pendingUrl.searchParams.set("plan", plan);
      if (phone) pendingUrl.searchParams.set("phone", phone);

      return NextResponse.redirect(pendingUrl);
    } else {
      // Failed or cancelled state
      const failUrl = new URL("/payment-success", appUrl);
      failUrl.searchParams.set("status", "failed");
      failUrl.searchParams.set("orderId", orderId);
      failUrl.searchParams.set("plan", plan);

      return NextResponse.redirect(failUrl);
    }
  } catch (error: any) {
    console.error("PhonePe Callback Handler Error:", error);
    return NextResponse.redirect(new URL("/payment-success?status=failed&error=server_error", req.url));
  }
}

export async function GET(req: NextRequest) {
  return handleCallback(req);
}

export async function POST(req: NextRequest) {
  return handleCallback(req);
}
