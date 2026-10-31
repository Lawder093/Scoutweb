"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim();
const privatePathPrefixes = ["/admin", "/login", "/conecta", "/perfil", "/configuracion"];

function isPrivatePath(pathname: string | null) {
  return Boolean(pathname && privatePathPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)));
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  const analyticsEnabled = Boolean(measurementId && /^G-[A-Z0-9]+$/i.test(measurementId));
  const adsEnabled = Boolean(googleAdsId && /^AW-[A-Z0-9-]+$/i.test(googleAdsId));
  const privatePath = isPrivatePath(pathname);

  useEffect(() => {
    if (!analyticsEnabled || privatePath || !pathname) return;
    trackEvent("page_view", { page_path: pathname, page_title: document.title });
  }, [analyticsEnabled, pathname, privatePath]);

  if ((!analyticsEnabled && !adsEnabled) || privatePath || !pathname) return null;

  const measurementIdLiteral = measurementId ? JSON.stringify(measurementId) : "null";
  const googleAdsIdLiteral = googleAdsId ? JSON.stringify(googleAdsId) : "null";

  return (
    <>
      <Script id="google-analytics-config" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function(){ window.dataLayer.push(Array.from(arguments)); };
window.gtag('js', new Date());
${analyticsEnabled ? `window.gtag('config', ${measurementIdLiteral}, { send_page_view: false });` : ""}
${adsEnabled ? `window.gtag('config', ${googleAdsIdLiteral}, { allow_ad_personalization_signals: false });` : ""}`}
      </Script>
      <Script id="google-analytics-script" src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId ?? googleAdsId ?? "")}`} strategy="afterInteractive" />
    </>
  );
}
