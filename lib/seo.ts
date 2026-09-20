import type { Metadata } from "next";

export const siteName = "Escultismo Crítico Popular";
export const siteDescription = "Una propuesta de educación no formal basada en la pedagogía crítica, el escultismo y las educaciones populares.";
// Production must provide NEXT_PUBLIC_SITE_URL. The local fallback prevents the
// app from publishing an unverified domain in development or preview builds.
export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000");

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
