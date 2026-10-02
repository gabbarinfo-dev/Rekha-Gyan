import crypto from "crypto";

interface MetaLeadEventParams {
  phone?: string;
  email?: string;
  leadId?: number | string;
  amount?: number;
  planId?: string;
  orderId?: string;
  clientIp?: string;
  userAgent?: string;
  eventSourceUrl?: string;
}

/**
 * SHA-256 hashing function required by Meta for PII compliance
 */
function hashSha256(val: string): string {
  if (!val) return "";
  const cleaned = val.trim().toLowerCase();
  return crypto.createHash("sha256").update(cleaned).digest("hex");
}

/**
 * Normalizes phone numbers to E.164 without '+' or leading zeros (Meta requirement)
 * e.g., "98765 43210" -> "919876543210"
 */
function normalizePhone(phone: string): string {
  if (!phone) return "";
  let digits = phone.replace(/\D/g, "");
  // If Indian 10-digit number without country code, prepend 91
  if (digits.length === 10) {
    digits = `91${digits}`;
  } else if (digits.length === 11 && digits.startsWith("0")) {
    digits = `91${digits.slice(1)}`;
  }
  return digits;
}

/**
 * Sends a Server-Side "Lead" conversion event to Meta Conversions API (CAPI)
 * Adheres strictly to Meta's CRM implementation payload specifications.
 */
export async function sendMetaLeadEvent(params: MetaLeadEventParams): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const datasetId = process.env.META_DATASET_ID || "1452275130078605";
    const accessToken = process.env.META_ACCESS_TOKEN || "EAAYngk9gXYoBStOZBZB2iCFgsriZAIZBxFVucQ1FgXDZCZBBhXVZApboeUvV1fn8Q2zzhHZBHoJSxpnu3zdwllcJUPNqjt16BbBZCjB41lXY2o29xr9IVFDYet0nEmN3zFGD42ZANsaf1vy3vzrltP1zFXo587xZAZAEgIct5G4MrZC2qNZB4ZCKZACcrCZBiWSXgkBmMPgZDZD";

    if (!accessToken) {
      console.warn("Meta CAPI: Missing META_ACCESS_TOKEN. Event skipped.");
      return { success: false, error: "Missing META_ACCESS_TOKEN" };
    }

    const userData: Record<string, any> = {};

    if (params.phone) {
      const normalized = normalizePhone(params.phone);
      if (normalized) {
        userData.ph = [hashSha256(normalized)];
      }
    }

    if (params.email) {
      userData.em = [hashSha256(params.email)];
    }

    if (params.leadId) {
      userData.lead_id = params.leadId;
    }

    if (params.clientIp) {
      userData.client_ip_address = params.clientIp;
    }

    if (params.userAgent) {
      userData.client_user_agent = params.userAgent;
    }

    // Exact Meta CRM Lead event payload structure requested in the Meta Instruction Guide
    const payload = {
      data: [
        {
          action_source: "system_generated",
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
          event_id: params.orderId || `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          event_source_url: params.eventSourceUrl || "https://rekhagyan.online",
          custom_data: {
            event_source: "crm",
            lead_event_source: "Rekha Gyan Website CRM",
            value: params.amount || 99,
            currency: "INR",
            content_name: params.planId || "Starter Subscription",
          },
          user_data: userData,
        },
      ],
    };

    const endpoint = `https://graph.facebook.com/v26.0/${datasetId}/events?access_token=${encodeURIComponent(accessToken)}`;

    console.log(`[Meta CAPI] Dispatching CRM Lead event for order: ${params.orderId || "direct"}`);

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseJson = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error("[Meta CAPI Error]", JSON.stringify(responseJson));
      return { success: false, error: responseJson?.error?.message || `HTTP ${res.status}` };
    }

    console.log(`[Meta CAPI Success] Events received by Meta:`, responseJson);
    return { success: true, data: responseJson };
  } catch (err: any) {
    // Non-blocking fail-safe: never throw or break payment or reading flow
    console.error("[Meta CAPI Fatal Caught]", err);
    return { success: false, error: err.message };
  }
}
