import { NextRequest, NextResponse } from "next/server";
import { getAbandonedLeads, markLeadWhatsappSent } from "@/lib/server-registry";

const INTERNAL_BOT_SECRET = process.env.WHATSAPP_BOT_SECRET || "rekha_leads_secret_9274090534";

/**
 * GET /api/internal/whatsapp-leads?secret=...&minDelay=5
 * Returns un-contacted, non-subscribed leads who did a reading at least minDelay minutes ago.
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const secret = searchParams.get("secret");

    if (secret !== INTERNAL_BOT_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const minDelay = parseInt(searchParams.get("minDelay") || "5", 10);
    const leads = await getAbandonedLeads(isNaN(minDelay) ? 5 : minDelay);

    const now = Date.now();
    const formatted = leads.map((lead) => {
      const createdTime = new Date(lead.createdAt).getTime();
      const elapsedMinutes = Math.round((now - createdTime) / 60000);
      return {
        phone: lead.phone,
        name: lead.name,
        issue: lead.issue || "",
        lifeFocus: lead.lifeFocus || "",
        service: lead.selectedService || lead.subscriptionPlan || "general",
        createdAt: lead.createdAt,
        elapsedMinutes,
      };
    });

    return NextResponse.json({
      success: true,
      count: formatted.length,
      leads: formatted,
    });
  } catch (error: any) {
    console.error("Error in /api/internal/whatsapp-leads GET:", error);
    return NextResponse.json({ error: error?.message || "Internal error" }, { status: 500 });
  }
}

/**
 * POST /api/internal/whatsapp-leads
 * Marks a lead as contacted on WhatsApp so duplicate messages are never sent.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { secret, phone, status } = body;

    if (secret !== INTERNAL_BOT_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!phone) {
      return NextResponse.json({ error: "Missing phone" }, { status: 400 });
    }

    if (status === "sent" || !status) {
      const updated = await markLeadWhatsappSent(phone);
      return NextResponse.json({ success: updated, phone });
    }

    return NextResponse.json({ success: true, message: "Ignored status" });
  } catch (error: any) {
    console.error("Error in /api/internal/whatsapp-leads POST:", error);
    return NextResponse.json({ error: error?.message || "Internal error" }, { status: 500 });
  }
}
