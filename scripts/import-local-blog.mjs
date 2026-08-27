import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
const isDryRun = process.argv.includes("--dry-run");
const importBatchSize = 50;

function writeStatus(message) {
  process.stdout.write(`${message}\n`);
}

if (!SUPABASE_URL) {
  throw new Error("Falta SUPABASE_URL o NEXT_PUBLIC_SUPABASE_URL en el entorno.");
}

if (!isDryRun && !SUPABASE_SECRET_KEY) {
  throw new Error("Falta SUPABASE_SECRET_KEY o SUPABASE_SERVICE_ROLE_KEY en el entorno.");
}

function sanitizeHtml(value) {
  return value
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<\/?(?:iframe|object|embed|form|input|button|textarea|select|meta|link)[^>]*>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\s(?:href|src)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/gi, (match, quoted, doubleValue, singleValue, bareValue) => {
      const url = doubleValue ?? singleValue ?? bareValue ?? "";
      return /^(?:https?:|mailto:|tel:|\/|#)/i.test(url.trim()) ? match : "";
    })
    .replace(/javascript\s*:/gi, "")
    .replace(/data\s*:/gi, "");
}

function toSourceId(id) {
  const match = /^escultista-(\d+)$/.exec(String(id ?? ""));
  return match ? Number(match[1]) : null;
}

function toDate(value, label) {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) {
    throw new Error(`La entrada ${label} no tiene una fecha de publicación válida.`);
  }
  return date.toISOString();
}

function toArray(value) {
  return Array.isArray(value) ? value.filter((item) => typeof item === "string" && item.trim()) : [];
}

function buildBlogRow(post, index) {
  const sourceId = toSourceId(post.id);
  if (!sourceId) {
    throw new Error(`La entrada en posición ${index + 1} tiene un id local inesperado: ${post.id ?? "sin id"}.`);
  }

  const title = typeof post.title === "string" ? post.title.trim() : "";
  const slug = typeof post.slug === "string" ? post.slug.trim() : "";
  if (!title || !slug) {
    throw new Error(`La entrada ${post.id} necesita título y slug.`);
  }

  const category = typeof post.category === "string" && post.category.trim() ? post.category.trim() : "Artículo";
  const categories = toArray(post.categories);

  return {
    slug,
    title,
    excerpt: typeof post.excerpt === "string" ? post.excerpt.trim() : "",
    body: typeof post.body === "string" ? sanitizeHtml(post.body) : "",
    category,
    cover_image_path: typeof post.coverImageUrl === "string" && post.coverImageUrl.trim() ? post.coverImageUrl.trim() : null,
    source_id: sourceId,
    source_url: typeof post.sourceUrl === "string" && post.sourceUrl.trim() ? post.sourceUrl.trim() : null,
    source_modified_at: null,
    author_name: typeof post.authorName === "string" && post.authorName.trim() ? post.authorName.trim() : null,
    categories: categories.length > 0 ? categories : [category],
    tags: toArray(post.tags),
    is_published: true,
    published_at: toDate(post.publishedAt, post.id),
  };
}

async function readLocalRows() {
  const inputPath = resolve(process.cwd(), "content/blog/posts.json");
  const content = await readFile(inputPath, "utf8");
  const posts = JSON.parse(content);
  if (!Array.isArray(posts)) {
    throw new Error("content/blog/posts.json no contiene un arreglo de entradas.");
  }

  const rows = posts.map(buildBlogRow);
  const sourceIds = rows.map((row) => row.source_id);
  const slugs = rows.map((row) => row.slug);
  if (new Set(sourceIds).size !== sourceIds.length) throw new Error("Hay source_id duplicados en el archivo local.");
  if (new Set(slugs).size !== slugs.length) throw new Error("Hay slugs duplicados en el archivo local.");
  return rows;
}

async function upsertRows(client, rows) {
  for (let start = 0; start < rows.length; start += importBatchSize) {
    const batch = rows.slice(start, start + importBatchSize);
    const { error } = await client.from("blog_posts").upsert(batch, { onConflict: "source_id" });
    if (error) {
      throw new Error(`Supabase rechazó el lote ${start + 1}-${start + batch.length}: ${error.message}`);
    }
    writeStatus(`Supabase: lote ${start + 1}-${start + batch.length} importado`);
  }
}

const rows = await readLocalRows();
const dates = rows.map((row) => row.published_at).sort();
writeStatus(`Archivo local validado: ${rows.length} entradas.`);
writeStatus(`Rango de publicación: ${dates[0]} — ${dates.at(-1)}.`);

if (isDryRun) {
  writeStatus("Dry run completado; no se modificó Supabase.");
} else {
  const client = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
    auth: { autoRefreshToken: false, detectSessionInUrl: false, persistSession: false },
  });
  await upsertRows(client, rows);
  writeStatus(`Importación completada: ${rows.length} entradas publicadas en blog_posts.`);
}
