import { readFile, readdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { basename, extname, join, relative, sep } from "node:path";
import { createClient } from "@supabase/supabase-js";

const sourceRoot = process.argv[2];
const bucketName = "content-assets";
const targetPrefix = "blog-migrated";
const postsPath = "content/blog/posts.json";
const summariesPath = "content/blog/posts-summary.json";
const concurrency = 5;

if (!sourceRoot) throw new Error("Uso: node scripts/migrate-wordpress-media.mjs /ruta/a/uploads");

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !serviceKey) throw new Error("Faltan SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL o la llave de servicio de Supabase.");

const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);
const contentTypes = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

// A couple of WordPress-generated thumbnails were not present in the cPanel
// export. Use the corresponding full-size files from the same export so the
// migrated article never falls back to the blocked WordPress origin.
const fallbackSourceFiles = new Map([
  ["2025/01/img_5057-1-1024x576.jpeg", "2025/01/IMG_5057-2-1024x576.jpeg"],
  [
    "2023/10/whatsapp-image-2023-02-12-at-16.06.48-1-232x300.jpeg",
    "2023/10/WhatsApp-Image-2023-02-12-at-16.06.48.jpeg",
  ],
]);

function uploadPathFromUrl(value) {
  try {
    const url = new URL(value.replace(/&amp;/g, "&").replace(/&#215;/g, "x"));
    const marker = "/wp-content/uploads/";
    const markerIndex = url.pathname.indexOf(marker);
    if (markerIndex < 0) return null;
    return decodeURIComponent(url.pathname.slice(markerIndex + marker.length)).replace(/^\/+/, "").replace(/×/g, "x");
  } catch {
    return null;
  }
}

function isImagePath(value) {
  return imageExtensions.has(extname(value).toLowerCase());
}

function storagePathFor(relativePath) {
  if (/^[\x20-\x7e]+$/.test(relativePath)) return `${targetPrefix}/${relativePath}`;
  const extension = extname(relativePath);
  const cleanName = basename(relativePath, extension).normalize("NFKD").replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "asset";
  const cleanDirectory = relativePath.slice(0, -basename(relativePath).length).split("/").filter(Boolean).map((part) => part.normalize("NFKD").replace(/[^a-zA-Z0-9_-]+/g, "-")).join("/");
  const suffix = createHash("sha1").update(relativePath).digest("hex").slice(0, 10);
  return `${targetPrefix}/${cleanDirectory ? `${cleanDirectory}/` : ""}${cleanName}-${suffix}${extension.toLowerCase()}`;
}

function pathKey(value) {
  const relativePath = uploadPathFromUrl(value);
  return relativePath ? relativePath.toLowerCase() : null;
}

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectFiles(entryPath));
    else if (entry.isFile() && isImagePath(entry.name)) files.push(entryPath);
  }
  return files;
}

function extractImageUrls(html) {
  const urls = [];
  for (const match of String(html ?? "").matchAll(/https?:\/\/[^"'\s<>]+\/wp-content\/uploads\/[^"'\s<>]+/gi)) {
    const url = match[0].replace(/[),.;]+$/, "");
    if (isImagePath(uploadPathFromUrl(url) ?? "")) urls.push(url);
  }
  return urls;
}

function publicUrl(client, storagePath) {
  return client.storage.from(bucketName).getPublicUrl(storagePath).data.publicUrl;
}

async function runConcurrent(items, worker) {
  let cursor = 0;
  async function consume() {
    while (cursor < items.length) {
      const index = cursor++;
      await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, consume));
}

const posts = JSON.parse(await readFile(postsPath, "utf8"));
const sourceFiles = await collectFiles(sourceRoot);
const exactFiles = new Map();
const basenameFiles = new Map();
for (const file of sourceFiles) {
  const rel = relative(sourceRoot, file).split(sep).join("/");
  exactFiles.set(rel.toLowerCase(), file);
  const name = rel.split("/").at(-1).toLowerCase();
  basenameFiles.set(name, [...(basenameFiles.get(name) ?? []), file]);
}

const requestedUrls = new Set();
for (const post of posts) {
  if (post.coverImageUrl) requestedUrls.add(post.coverImageUrl);
  for (const url of extractImageUrls(post.body)) requestedUrls.add(url);
}

const assets = new Map();
const missing = new Set();
for (const url of requestedUrls) {
  const rel = uploadPathFromUrl(url);
  if (!rel || !isImagePath(rel)) continue;
  const fallbackRel = fallbackSourceFiles.get(rel.toLowerCase());
  const localFile = exactFiles.get(rel.toLowerCase())
    ?? ((basenameFiles.get(rel.split("/").at(-1).toLowerCase()) ?? []).length === 1 ? basenameFiles.get(rel.split("/").at(-1).toLowerCase())[0] : null)
    ?? (fallbackRel ? exactFiles.get(fallbackRel.toLowerCase()) : null);
  if (!localFile) {
    missing.add(rel);
    continue;
  }
  const key = rel.toLowerCase();
  const storageRel = fallbackRel ?? rel;
  if (!assets.has(key)) assets.set(key, { key, rel, localFile, storagePath: storagePathFor(storageRel) });
}

const client = createClient(supabaseUrl, serviceKey, { auth: { autoRefreshToken: false, detectSessionInUrl: false, persistSession: false } });
const assetList = [...assets.values()];
console.log(`Encontrados ${sourceFiles.length} archivos de imagen locales.`);
console.log(`Se migrarán ${assetList.length} imágenes usadas por el blog.`);
if (missing.size) console.log(`No se encontraron ${missing.size} referencias:`, [...missing]);

await runConcurrent(assetList, async (asset, index) => {
  const body = await readFile(asset.localFile);
  const extension = extname(asset.localFile).toLowerCase();
  const { error } = await client.storage.from(bucketName).upload(asset.storagePath, body, {
    cacheControl: "31536000",
    contentType: contentTypes[extension] ?? "application/octet-stream",
    upsert: true,
  });
  if (error) throw new Error(`No se pudo subir ${asset.rel}: ${error.message}`);
  asset.publicUrl = publicUrl(client, asset.storagePath);
  if ((index + 1) % 25 === 0 || index + 1 === assetList.length) console.log(`Subidas ${index + 1}/${assetList.length} imágenes.`);
});

function resolveAsset(value) {
  const key = pathKey(value);
  return key ? assets.get(key)?.publicUrl ?? null : null;
}

function rewriteBody(html) {
  return String(html ?? "").replace(/https?:\/\/[^"'\s<>]+\/wp-content\/uploads\/[^"'\s<>]+/gi, (url) => resolveAsset(url) ?? url);
}

const localPosts = posts.map((post) => ({
  ...post,
  coverImageUrl: resolveAsset(post.coverImageUrl) ?? post.coverImageUrl,
  body: rewriteBody(post.body),
}));
await writeFile(postsPath, `${JSON.stringify(localPosts, null, 2)}\n`, "utf8");
await writeFile(summariesPath, `${JSON.stringify(localPosts.map(({ body, ...summary }) => summary), null, 2)}\n`, "utf8");

const { data: databasePosts, error: databaseError } = await client.from("blog_posts").select("id,source_id,body,cover_image_path");
if (databaseError) throw new Error(`No se pudieron consultar las entradas migradas: ${databaseError.message}`);
const databaseBySourceId = new Map((databasePosts ?? []).map((post) => [String(post.source_id), post]));
let updated = 0;
let notInDatabase = 0;
for (const post of localPosts) {
  const sourceId = String(post.id).replace(/^escultista-/, "");
  const databasePost = databaseBySourceId.get(sourceId);
  if (!databasePost) {
    notInDatabase += 1;
    continue;
  }
  const originalPost = posts.find((item) => String(item.id) === String(post.id));
  const coverPath = uploadPathFromUrl(originalPost?.coverImageUrl ?? "");
  const update = {
    body: post.body,
    cover_image_path: coverPath && assets.has(coverPath.toLowerCase()) ? assets.get(coverPath.toLowerCase()).storagePath : databasePost.cover_image_path,
  };
  const { error } = await client.from("blog_posts").update(update).eq("id", databasePost.id);
  if (error) throw new Error(`No se pudo actualizar ${post.slug}: ${error.message}`);
  updated += 1;
}

console.log(`Base de datos actualizada: ${updated} entradas.`);
if (notInDatabase) console.log(`Entradas locales no encontradas en la base de datos: ${notInDatabase}.`);
console.log("Migración de imágenes completada.");
