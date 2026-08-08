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

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: projectRoot,
  images: {
    remotePatterns: [
      ...(supabaseHostname ? [{ protocol: "https", hostname: supabaseHostname, pathname: "/**" }] : []),
      { protocol: "https", hostname: "escultista.org", pathname: "/**" },
    ],
  },
};

export default nextConfig;
