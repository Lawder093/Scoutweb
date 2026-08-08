const ALLOWED_PROTOCOLS = /^(?:https?:|mailto:|tel:|\/|#)/i;

/**
 * Sanitizes editorial HTML at the last trust boundary before it reaches the
 * blog detail page. Imported content is sanitized too, but database content
 * must never be trusted solely because it came from an internal dashboard.
 */
export function sanitizeHtml(value: string): string {
  return value
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<\/?(?:iframe|object|embed|form|input|button|textarea|select|meta|link)[^>]*>/gi, "")
    .replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\s(?:href|src)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/gi, (match, quoted, doubleValue, singleValue, bareValue) => {
      const url = doubleValue ?? singleValue ?? bareValue ?? "";
      return ALLOWED_PROTOCOLS.test(url.trim()) ? match : "";
    })
    .replace(/javascript\s*:/gi, "")
    .replace(/data\s*:/gi, "");
}
