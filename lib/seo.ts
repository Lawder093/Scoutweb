import type { Metadata } from "next";

export const siteName = "Escultismo Crítico Popular";
export const siteDescription = "La Comunidad Crítica de Escultismo Popular, A. C. impulsa educación, cultura, asistencia social y participación comunitaria para construir condiciones más justas y humanas.";
const productionSiteUrl = "https://www.escultista.org";

function resolveSiteUrl(value: string | undefined): URL {
  if (!value) return new URL(productionSiteUrl);

  try {
    const url = new URL(value);
    const localHosts = new Set(["localhost", "127.0.0.1", "[::1]", "::1"]);

    if (url.protocol !== "https:" || localHosts.has(url.hostname) || url.hostname.endsWith(".local")) {
      return new URL(productionSiteUrl);
    }

    return new URL(url.origin);
  } catch {
    return new URL(productionSiteUrl);
  }
}

// Never publish localhost or an insecure origin in canonical, Open Graph,
// robots, or sitemap URLs, even if a stale deployment variable remains set.
export const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL?.trim());

export const defaultOgImage = {
  path: "/images/scouts-hero.png",
  width: 1672,
  height: 941,
  alt: "Scouts caminando en comunidad",
};

type PageMetadataOptions = {
  title: string;
  description?: string;
  path: string;
  type?: "website" | "article";
  image?: { path: string; width?: number; height?: number; alt?: string } | null;
  publishedTime?: string;
};

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}

export function pageMetadata({ title, description = siteDescription, path, type = "website", image, publishedTime }: PageMetadataOptions) {
  const canonical = absoluteUrl(path);
  const selectedImage = image === null ? null : image ?? defaultOgImage;
  const imageUrl = selectedImage ? absoluteUrl(selectedImage.path) : undefined;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type,
      url: canonical,
      siteName,
      title,
      description,
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      images: imageUrl
        ? [{
            url: imageUrl,
            width: selectedImage?.width,
            height: selectedImage?.height,
            alt: selectedImage?.alt ?? title,
          }]
        : undefined,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  } satisfies Metadata;
}
