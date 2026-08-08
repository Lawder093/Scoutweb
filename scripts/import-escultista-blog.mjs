import { createClient } from "@supabase/supabase-js";

const SOURCE_URL = process.env.ESCULTISTA_SOURCE_URL ?? "https://escultista.org";
const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
const isDryRun = process.argv.includes("--dry-run");
const pageSize = 100;
const importBatchSize = 50;

if (!SUPABASE_URL) {
  throw new Error("Falta SUPABASE_URL o NEXT_PUBLIC_SUPABASE_URL en el entorno.");
}

if (!isDryRun && !SUPABASE_SECRET_KEY) {
  throw new Error("Falta SUPABASE_SECRET_KEY en el entorno para realizar la importación.");
}

function decodeHtml(value) {
  const namedEntities = {
    "&amp;": "&",
    "&apos;": "'",
    "&gt;": ">",
    "&hellip;": "…",
    "&ldquo;": "“",
    "&lsquo;": "‘",
    "&nbsp;": " ",
    "&rdquo;": "”",
    "&rsquo;": "’",
    "&lt;": "<",
    "&quot;": '"',
  };

  return value
    .replace(/&(?:amp|apos|gt|hellip|ldquo|lsquo|nbsp|rdquo|rsquo|lt|quot);/g, (entity) => namedEntities[entity])
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function stripHtml(value) {
  return decodeHtml(value.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

function sanitizeHtml(value) {
  return value
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/javascript:/gi, "");
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getEmbeddedTerms(post) {
  const termGroups = post?._embedded?.["wp:term"];
  return Array.isArray(termGroups) ? termGroups.flat().filter((term) => term?.name && term?.taxonomy) : [];
}

function getCategories(post) {
  return getEmbeddedTerms(post)
    .filter((term) => term.taxonomy === "category")
    .map((term) => term.name);
}

function getTags(post) {
  return getEmbeddedTerms(post)
    .filter((term) => term.taxonomy === "post_tag")
    .map((term) => term.name);
}

function getAuthorName(post) {
  return post?._embedded?.author?.[0]?.name ?? null;
}

function getFeaturedImage(post) {
  return post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;
}

function buildBlogRow(post) {
  const title = stripHtml(post.title?.rendered ?? "Entrada sin título");
  const categories = getCategories(post);
  const tags = getTags(post);
  const sourceSlug = slugify(post.slug || title || `entrada-${post.id}`);

  return {
    slug: `escultista-${post.id}-${sourceSlug}`,
    title,
    excerpt: stripHtml(post.excerpt?.rendered ?? ""),
    body: sanitizeHtml(post.content?.rendered ?? ""),
    category: categories[0] ?? "Artículo",
    cover_image_path: getFeaturedImage(post),
    source_id: post.id,
    source_url: post.link,
    source_modified_at: post.modified ?? null,
    author_name: getAuthorName(post),
    categories,
    tags,
    is_published: post.status === "publish",
    published_at: post.date,
  };
}

async function fetchPage(page) {
  const endpoint = new URL("/wp-json/wp/v2/posts", SOURCE_URL);
  endpoint.searchParams.set("per_page", String(pageSize));
  endpoint.searchParams.set("page", String(page));
  endpoint.searchParams.set("status", "publish");
  endpoint.searchParams.set("_embed", "1");

  const response = await fetch(endpoint, { headers: { Accept: "application/json" } });
  if (!response.ok) {
    throw new Error(`WordPress respondió ${response.status} al consultar la página ${page}.`);
  }

  return {
    posts: await response.json(),
    totalPages: Number(response.headers.get("x-wp-totalpages") ?? page),
  };
}

async function fetchAllPosts() {
  const firstPage = await fetchPage(1);
  const posts = [...firstPage.posts];

  for (let page = 2; page <= firstPage.totalPages; page += 1) {
    const currentPage = await fetchPage(page);
    posts.push(...currentPage.posts);
    console.log(`WordPress: página ${page}/${firstPage.totalPages} · ${posts.length} entradas recopiladas`);
  }

  return posts.map(buildBlogRow);
}

async function upsertRows(client, rows) {
  for (let start = 0; start < rows.length; start += importBatchSize) {
    const batch = rows.slice(start, start + importBatchSize);
    const { error } = await client.from("blog_posts").upsert(batch, { onConflict: "source_id" });
    if (error) {
      throw new Error(`Supabase rechazó el lote ${start + 1}-${start + batch.length}: ${error.message}`);
    }
    console.log(`Supabase: lote ${start + 1}-${start + batch.length} importado`);
  }
}

const rows = await fetchAllPosts();
const dates = rows.map((row) => row.published_at).filter(Boolean).sort();

console.log(`Encontradas ${rows.length} entradas de ${SOURCE_URL}.`);
console.log(`Rango de publicación: ${dates[0] ?? "sin fecha"} — ${dates.at(-1) ?? "sin fecha"}.`);

if (!isDryRun) {
  const client = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
    auth: { autoRefreshToken: false, detectSessionInUrl: false, persistSession: false },
  });
  await upsertRows(client, rows);
  console.log("Importación completada.");
} else {
  console.log("Dry run completado; no se modificó Supabase.");
}
