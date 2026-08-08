const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : null;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      ...(supabaseHostname ? [{ protocol: "https", hostname: supabaseHostname, pathname: "/**" }] : []),
      { protocol: "https", hostname: "escultista.org", pathname: "/**" },
    ],
  },
};

export default nextConfig;
