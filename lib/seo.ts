export const siteName = "Escultismo Crítico Popular";
export const siteDescription = "Una comunidad educativa que aprende, se organiza y transforma desde Abya Yala.";
export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://escultismocriticopopular.org");

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}
