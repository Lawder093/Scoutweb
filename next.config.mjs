import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

function getSupabaseHostname() {
  const value = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!value) return null;

  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.hostname : null;
  } catch {
    return null;
  }
}

const supabaseHostname = getSupabaseHostname();
const isDevelopment = process.env.NODE_ENV !== "production";
const connectSources = [
  "'self'",
  "https://www.google-analytics.com",
  "https://region1.google-analytics.com",
  ...(supabaseHostname ? [`https://${supabaseHostname}`] : []),
];
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline'",
      `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com`,
      `connect-src ${connectSources.join(" ")}`,
      "frame-src 'self' https://drive.google.com https://docs.google.com",
      ...(isDevelopment ? [] : ["upgrade-insecure-requests"]),
    ].join("; "),
  },
  ...(isDevelopment ? [] : [{ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" }]),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: projectRoot,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 3600,
    remotePatterns: [
      ...(supabaseHostname ? [{ protocol: "https", hostname: supabaseHostname, pathname: "/**" }] : []),
      { protocol: "https", hostname: "escultista.org", pathname: "/**" },
    ],
  },
};

export default nextConfig;
