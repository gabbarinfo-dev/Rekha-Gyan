/**
 * Meta Pixel Client-Side Event Tracking Helper
 * Specifically tracks on Pixel/Dataset: 1332457502143531
 */

export const META_SUBSCRIBE_PIXEL_ID = "1332457502143531";

/**
 * Fires the Meta "Subscribe" event specifically to Pixel 1332457502143531
 * using `trackSingle` to avoid firing on other initialized pixels.
 */
export function trackMetaSubscribeClick(): void {
  try {
    if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
      (window as any).fbq(
        "trackSingle",
        META_SUBSCRIBE_PIXEL_ID,
        "Subscribe"
      );
    }
  } catch (err) {
    // Fail safely without disrupting the payment flow
    console.warn("Meta Pixel tracking error:", err);
  }
}
