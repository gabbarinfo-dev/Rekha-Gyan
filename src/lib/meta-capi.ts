import crypto from "crypto";

export interface MetaConversionParams {
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
 * SHA-256 hashing function required by Meta for customer information
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
  if (digits.length === 10) {
    digits = `91${digits}`;
  } else if (digits.length === 11 && digits.startsWith("0")) {
    digits = `91${digits.slice(1)}`;
  }
  return digits;
}

/**
 * Sends complete Server-Side Conversion events (Purchase, Subscribe, Lead) to Meta Conversions API (CAPI).
 * Dispatches to all configured Dataset IDs with deduplication keys.
 */
export async function sendMetaLeadEvent(params: MetaConversionParams): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const rawDatasetIds = process.env.META_DATASET_ID || "1332457502143531,1452275130078605";
    const datasetIds = rawDatasetIds.split(",").map((s) => s.trim()).filter(Boolean);
    const accessToken =
      process.env.META_ACCESS_TOKEN ||
      "EAAYngk9gXYoBSiUhpGijmkSivbx3ZBansQkCZB2zpnExVH2XXewcsJyCUFZCQXEnf18NKJZCSYrGiGVj3rRiX77VaHC6eV6bZATKhZBY3bHFQEvYD5XghcoMR4bVJFftYPkz7SwnwBMY3oHUPehtQ3TrjhPb5ul4pXiVwHDykDZBzKots1KMgKFI7GZClwJ87QZDZD";

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

    const now = Math.floor(Date.now() / 1000);
    const orderRef = params.orderId || `ord_${now}_${Math.random().toString(36).slice(2, 7)}`;
    const eventUrl = params.eventSourceUrl || "https://rekhagyan.online/payment-success";
    const amountVal = params.amount || 99;
    const planName = params.planId || "Starter Subscription";

    // Batch payload containing: Purchase, Subscribe, and Lead
    // Matches Meta's exact payload recommendations
    const payload = {
      data: [
        {
          action_source: "website",
          event_name: "Purchase",
          event_time: now,
          event_id: `purchase_${orderRef}`,
          event_source_url: eventUrl,
          custom_data: {
            currency: "INR",
            value: amountVal,
            content_name: planName,
            content_type: "product",
          },
          user_data: userData,
        },
        {
          action_source: "website",
          event_name: "Subscribe",
          event_time: now,
          event_id: `subscribe_${orderRef}`,
          event_source_url: eventUrl,
          custom_data: {
            currency: "INR",
            value: amountVal,
            content_name: planName,
            predicted_ltv: amountVal,
          },
          user_data: userData,
        },
        {
          action_source: "website",
          event_name: "Lead",
          event_time: now,
          event_id: `lead_${orderRef}`,
          event_source_url: eventUrl,
          custom_data: {
            event_source: "crm",
            lead_event_source: "Rekha Gyan Website CRM",
            currency: "INR",
            value: amountVal,
            content_name: planName,
          },
          user_data: userData,
        },
      ],
    };

    const results = await Promise.all(
      datasetIds.map(async (dsId) => {
        const endpoint = `https://graph.facebook.com/v26.0/${dsId}/events?access_token=${encodeURIComponent(accessToken)}`;
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json().catch(() => ({}));
        return { dsId, ok: res.ok, status: res.status, json };
      })
    );

    const allOk = results.every((r) => r.ok);
    console.log(`[Meta CAPI Broadcast Results]`, JSON.stringify(results));

    return {
      success: allOk,
      data: results.map((r) => r.json),
      error: allOk ? undefined : "Some dataset endpoints returned errors",
    };
  } catch (err: any) {
    console.error("[Meta CAPI Fatal Caught]", err);
    return { success: false, error: err.message };
  }
}
