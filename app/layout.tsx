import type { Metadata } from "next";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { defaultOgImage, absoluteUrl, siteDescription, siteName, siteUrl } from "@/lib/seo";
import "./globals.css";

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${siteName} | Educación scout crítica y popular`,
    template: `%s · ${siteName}`,
  },
  description: siteDescription,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: absoluteUrl("/"),
    siteName,
    title: `${siteName} | Educación scout crítica y popular`,
    description: siteDescription,
    images: [{ url: absoluteUrl(defaultOgImage.path), width: defaultOgImage.width, height: defaultOgImage.height, alt: defaultOgImage.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Educación scout crítica y popular`,
    description: siteDescription,
    images: [absoluteUrl(defaultOgImage.path)],
  },
  robots: { index: true, follow: true },
  verification: googleSiteVerification ? { google: googleSiteVerification } : undefined,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="paper-grain"><GoogleAnalytics />{children}</body>
    </html>
  );
}
