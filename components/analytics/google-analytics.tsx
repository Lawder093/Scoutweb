"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
const privatePathPrefixes = ["/admin", "/login", "/conecta", "/perfil", "/configuracion"];

function isPrivatePath(pathname: string | null) {
  return Boolean(pathname && privatePathPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)));
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  const enabled = Boolean(measurementId && /^G-[A-Z0-9]+$/i.test(measurementId));
  const privatePath = isPrivatePath(pathname);

  useEffect(() => {
    if (!enabled || privatePath || !pathname) return;
    trackEvent("page_view", { page_path: pathname, page_title: document.title });
  }, [enabled, pathname, privatePath]);

  if (!enabled || privatePath || !pathname || !measurementId) return null;

  const measurementIdLiteral = JSON.stringify(measurementId);

  return (
    <>
      <Script id="google-analytics-config" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function(){ window.dataLayer.push(Array.from(arguments)); };
window.gtag('js', new Date());
window.gtag('config', ${measurementIdLiteral}, { send_page_view: false });`}
      </Script>
      <Script id="google-analytics-script" src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`} strategy="afterInteractive" />
    </>
  );
}
