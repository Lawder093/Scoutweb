// Read-only QA: no forms, payments, credentials or database writes.
// Usage: node scripts/qa-public-site.mjs https://www.escultista.org
import { writeFile } from "node:fs/promises";

const base = new URL(process.argv[2] || "https://www.escultista.org");
const production = "https://www.escultista.org";
const decode = (value) => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"');
const result = { date: new Date().toISOString(), base: base.origin, pages: [], assets: [], checks: [], failures: [] };
const assets = new Set();
async function get(path, method = "GET", redirect = "follow") {
  return fetch(new URL(path, base), { method, redirect, signal: AbortSignal.timeout(20000) });
}
async function pool(items, action) {
  let index = 0;
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (index < items.length) {
      const item = items[index++];
      try { await action(item); } catch (error) { result.failures.push({ path: item, error: error.message }); }
    }
  }));
}
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*"([^"]*)"/g)].map((match) => [match[1], decode(match[2])]));
const sitemap = await get("/sitemap.xml");
const sitemapXml = await sitemap.text();
const paths = [...new Set([...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(decode(match[1])).pathname))];
if (sitemap.status !== 200 || !paths.length) result.failures.push({ path: "/sitemap.xml", status: sitemap.status });
const robots = await get("/robots.txt");
const robotsText = await robots.text();
if (robots.status !== 200 || !robotsText.includes(`${production}/sitemap.xml`)) result.failures.push({ path: "/robots.txt", status: robots.status });
await pool(paths, async (path) => {
  const response = await get(path);
  const html = (await response.text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  const tags = [...html.matchAll(/<(?:link|meta)\b[^>]*>/gi)].map((match) => attributes(match[0]));
  const canonical = tags.find((tag) => tag.rel === "canonical")?.href;
  const meta = (name) => tags.find((tag) => tag.name === name || tag.property === name)?.content;
  const issues = [];
  if (response.status !== 200) issues.push(`HTTP ${response.status}`);
  if (!/<title>[^<]+<\/title>/.test(html)) issues.push("title missing");
  for (const name of ["description", "og:title", "og:description", "og:url", "og:image", "twitter:card"]) if (!meta(name)) issues.push(`${name} missing`);
  if (!canonical || new URL(canonical).href !== new URL(path, production).href) issues.push(`canonical: ${canonical}`);
  if (meta("og:url") !== canonical) issues.push("og:url does not match canonical");
  if (/https?:\/\/(?:localhost|127\.0\.0\.1)/.test(html)) issues.push("localhost in HTML");
  if ((html.match(/<h1\b/g) || []).length !== 1) issues.push("expected exactly one H1");
  if (!html.includes('lang="es"')) issues.push("lang missing");
  for (const header of ["content-security-policy", "x-frame-options", "x-content-type-options"]) if (!response.headers.has(header)) issues.push(`${header} missing`);
  const important = !path.startsWith("/blog/") && !path.startsWith("/biblioteca/") || result.pages.filter((page) => page.path.startsWith("/blog/")).length < 3;
  if (important) {
    for (const match of html.matchAll(/<img\b[^>]*>/g)) {
      const attrs = attributes(match[0]);
      if (attrs.src) assets.add(decode(attrs.src));
      if (!("alt" in attrs)) issues.push("image missing alt attribute");
    }
  }
  result.pages.push({ path, status: response.status, canonical, issues });
  if (issues.length) result.failures.push({ path, issues });
  if (result.pages.length % 50 === 0) console.log(`Checked ${result.pages.length}/${paths.length} pages`);
});
await pool([...assets], async (src) => {
  const url = new URL(src, base);
  if (![base.origin, production, "https://cmtrdwogfcjbcksqcnln.supabase.co"].includes(url.origin)) return;
  const response = await get(url.href);
  await response.arrayBuffer();
  const type = response.headers.get("content-type") || "";
  result.assets.push({ src, status: response.status, type });
  if (response.status !== 200 || !type.startsWith("image/")) result.failures.push({ path: src, status: response.status, type });
});
for (const [path, status] of [["/qa-missing-page-20261111", 404], ["/api/admin/users", 403], ["/api/admin/blog", 403]]) {
  const response = await get(path, "GET", "manual");
  result.checks.push({ path, expected: status, actual: response.status });
  if (response.status !== status) result.failures.push({ path, expected: status, actual: response.status });
}
result.pages.sort((a, b) => a.path.localeCompare(b.path));
if (process.env.QA_REPORT) await writeFile(process.env.QA_REPORT, JSON.stringify(result, null, 2));
console.log(JSON.stringify({ pages: result.pages.length, assets: result.assets.length, checks: result.checks, failures: result.failures }, null, 2));
process.exitCode = result.failures.length ? 1 : 0;
