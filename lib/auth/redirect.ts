/** Accept only same-origin relative paths after authentication. */
export function safeNextPath(value: string | null | undefined, fallback = "/admin/blog"): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || /[\\\u0000-\u001f\u007f]/.test(value)) return fallback;
  try {
    const origin = "https://www.escultista.org";
    const target = new URL(value, origin);
    return target.origin === origin ? `${target.pathname}${target.search}${target.hash}` : fallback;
  } catch {
    return fallback;
  }
}
