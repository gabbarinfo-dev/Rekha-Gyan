// PhonePe Payment Gateway Integration Helper
// Using PhonePe Standard Checkout (PG V2 / V3 OAuth API)

const PHONEPE_CLIENT_ID = process.env.PHONEPE_CLIENT_ID || "SU2610011056054548713539";
const PHONEPE_CLIENT_VERSION = process.env.PHONEPE_CLIENT_VERSION || "1";
const PHONEPE_CLIENT_SECRET = process.env.PHONEPE_CLIENT_SECRET || "028d4c85-43e2-4ace-b048-3cbbc633a4dd";
const PHONEPE_MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID || "M23HZXMFsGLFJ";
const PHONEPE_ENV = process.env.PHONEPE_ENV || "PROD";

// Endpoints based on environment
const OAUTH_URL =
  PHONEPE_ENV === "PROD"
    ? "https://api.phonepe.com/apis/identity-manager/v1/oauth/token"
    : "https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token";

const CHECKOUT_PAY_URL =
  PHONEPE_ENV === "PROD"
    ? "https://api.phonepe.com/apis/pg/checkout/v2/pay"
    : "https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/pay";

const ORDER_STATUS_BASE_URL =
  PHONEPE_ENV === "PROD"
    ? "https://api.phonepe.com/apis/pg/checkout/v2/order"
    : "https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/order";

// In-memory token cache to avoid requesting new token on every call
interface CachedToken {
  accessToken: string;
  expiresAt: number; // Unix timestamp in ms
}

let tokenCache: CachedToken | null = null;

/**
 * Fetch a valid OAuth access token from PhonePe identity manager
 */
export async function getPhonePeOAuthToken(): Promise<string> {
  const now = Date.now();
  // If we have a cached token with at least 5 minutes remaining, reuse it
  if (tokenCache && tokenCache.expiresAt - now > 5 * 60 * 1000) {
    return tokenCache.accessToken;
  }

  const body = new URLSearchParams({
    client_id: PHONEPE_CLIENT_ID,
    client_version: PHONEPE_CLIENT_VERSION,
    client_secret: PHONEPE_CLIENT_SECRET,
    grant_type: "client_credentials",
  });

  const response = await fetch(OAUTH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("PhonePe OAuth Error:", response.status, errorText);
    throw new Error(`Failed to authenticate with PhonePe (HTTP ${response.status})`);
  }

  const data = await response.json();
  const accessToken = data.access_token;
  const expiresInSeconds = data.expires_in || 3600;

  tokenCache = {
    accessToken,
    expiresAt: now + expiresInSeconds * 1000,
  };

  return accessToken;
}

export interface CreateOrderParams {
  merchantOrderId: string;
  amountInRupees: number;
  redirectUrl: string;
  expireAfterSeconds?: number;
  userPhone?: string;
  userName?: string;
  metadata?: Record<string, string>;
}

export interface CreateOrderResult {
  success: boolean;
  orderId?: string;
  redirectUrl?: string;
  state?: string;
  error?: string;
}

/**
 * Initiate a checkout session via PhonePe Standard Checkout
 */
export async function createPhonePeOrder(params: CreateOrderParams): Promise<CreateOrderResult> {
  try {
    const token = await getPhonePeOAuthToken();

    const amountInPaise = Math.round(params.amountInRupees * 100);

    const payload = {
      merchantOrderId: params.merchantOrderId,
      amount: amountInPaise,
      expireAfter: params.expireAfterSeconds || 1200,
      paymentFlow: {
        type: "PG_CHECKOUT",
        merchantUrls: {
          redirectUrl: params.redirectUrl,
        },
      },
      disablePaymentRetry: false,
    };

    const response = await fetch(CHECKOUT_PAY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `O-Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok || !data.redirectUrl) {
      console.error("PhonePe Create Order Failed:", response.status, data);
      return {
        success: false,
        error: data.message || `PhonePe returned HTTP ${response.status}`,
      };
    }

    return {
      success: true,
      orderId: data.orderId,
      redirectUrl: data.redirectUrl,
      state: data.state,
    };
  } catch (err: any) {
    console.error("createPhonePeOrder Exception:", err);
    return {
      success: false,
      error: err.message || "Failed to initialize payment session",
    };
  }
}

export interface OrderStatusResult {
  success: boolean;
  merchantOrderId?: string;
  orderId?: string;
  state?: "COMPLETED" | "PENDING" | "FAILED" | string;
  amountInRupees?: number;
  paymentDetails?: any[];
  error?: string;
}

/**
 * Check payment status of an existing order
 */
export async function checkPhonePeOrderStatus(merchantOrderId: string): Promise<OrderStatusResult> {
  try {
    const token = await getPhonePeOAuthToken();

    const response = await fetch(`${ORDER_STATUS_BASE_URL}/${merchantOrderId}/status`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `O-Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("PhonePe Check Status Error:", response.status, data);
      return {
        success: false,
        error: data.message || `PhonePe returned HTTP ${response.status}`,
      };
    }

    return {
      success: true,
      merchantOrderId: data.merchantOrderId,
      orderId: data.orderId,
      state: data.state, // "COMPLETED", "PENDING", "FAILED"
      amountInRupees: data.amount ? data.amount / 100 : undefined,
      paymentDetails: data.paymentDetails || [],
    };
  } catch (err: any) {
    console.error("checkPhonePeOrderStatus Exception:", err);
    return {
      success: false,
      error: err.message || "Failed to verify order status",
    };
  }
}
