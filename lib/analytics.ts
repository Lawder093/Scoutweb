export type AnalyticsValue = string | number | boolean;
export type AnalyticsParams = Record<string, AnalyticsValue | null | undefined>;

const EVENT_NAME_PATTERN = /^[a-z][a-z0-9_]{0,39}$/;
const PARAMETER_NAME_PATTERN = /^[a-z][a-z0-9_]{0,39}$/;
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim();
const conversionLabels: Record<string, string | undefined> = {
  contact_email_click: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_EMAIL?.trim(),
  click_whatsapp: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_WHATSAPP?.trim(),
  contact_phone_click: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_PHONE?.trim(),
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function" || !EVENT_NAME_PATTERN.test(name)) return;

  const safeParams = Object.fromEntries(
    Object.entries(params).filter(([key, value]) => PARAMETER_NAME_PATTERN.test(key) && value !== null && value !== undefined),
  );

  window.gtag("event", name, safeParams);

  const conversionLabel = conversionLabels[name];
  if (googleAdsId && conversionLabel) {
    window.gtag("event", "conversion", { send_to: `${googleAdsId}/${conversionLabel}` });
  }
}
