import { createClient } from "@supabase/supabase-js";

const SOURCE_URL = process.env.ESCULTISTA_DOCUMENTS_URL ?? "https://escultista.org/documentos/";
const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
const STORAGE_BUCKET = "content-assets";
const isDryRun = process.argv.includes("--dry-run");
const importDate = new Date().toISOString();

const placeholderSlugs = [
  "la-asamblea-como-fogata",
  "jugar-en-serio",
  "mapa-de-cuidados",
  "bitacora-del-territorio",
  "desarmar-la-brujula",
  "manual-de-la-alegria",
];

const titleOverrides = {
  "1B6MAqpsRux11NNm1DyaFkMB2WfxDAn4o": "CCEP – PROTOCOLO DE INGRESO, PARTICIPACIÓN Y PERMANENCIA",
};

function writeStatus(message) {
  process.stdout.write(`${message}\n`);
}

if (!SUPABASE_URL) {
  throw new Error("Falta SUPABASE_URL o NEXT_PUBLIC_SUPABASE_URL en el entorno.");
}

if (!isDryRun && !SUPABASE_SECRET_KEY) {
  throw new Error("Falta SUPABASE_SECRET_KEY o SUPABASE_SERVICE_ROLE_KEY en el entorno.");
}

function decodeHtml(value) {
  const namedEntities = {
    "&amp;": "&",
    "&nbsp;": " ",
    "&quot;": '"',
    "&apos;": "'",
    "&ndash;": "–",
    "&mdash;": "—",
    "&rsquo;": "’",
    "&ldquo;": "“",
    "&rdquo;": "”",
  };

  return value
    .replace(/&(?:amp|nbsp|quot|apos|ndash|mdash|rsquo|ldquo|rdquo);/g, (entity) => namedEntities[entity])
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function stripHtml(value) {
  return decodeHtml(value.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractDriveId(href) {
  const match = /(?:[?&]id=|\/file\/d\/)([^&/]+)/.exec(href);
  return match?.[1] ?? null;
}

function extractDocuments(html) {
  const tokens = [...html.matchAll(/<(h[1-6]|a)\b([^>]*)>([\s\S]*?)<\/\1>/gi)];
  const documents = new Map();
  let section = "Materiales";

  for (const [, tag, attributes, inner] of tokens) {
    const text = stripHtml(inner);
    if (tag.toLowerCase().startsWith("h")) {
      if (text) section = text;
      continue;
    }

    const hrefMatch = /href=(?:"([^"]+)"|'([^']+)')/i.exec(attributes);
    const href = hrefMatch?.[1] ?? hrefMatch?.[2];
    if (!href || !href.includes("drive.google.com")) continue;

    const decodedHref = decodeHtml(href);
    const driveId = extractDriveId(decodedHref);
    if (!driveId) continue;

    const title = titleOverrides[driveId] ?? (text || `Material ${driveId.slice(0, 8)}`);
    const current = documents.get(driveId);
    if (!current || title.length > current.title.length) {
      documents.set(driveId, { driveId, title, section, sourceUrl: decodedHref });
    }
  }

  return [...documents.values()].map((document, index) => {
    const slug = `material-${slugify(document.title)}-${document.driveId.slice(0, 8).toLowerCase()}`;
    return {
      ...document,
      slug,
      filePath: `library/materiales/${slug}.pdf`,
      displayOrder: index + 1,
    };
  });
}

async function fetchDocumentsPage() {
  const response = await fetch(SOURCE_URL, { headers: { Accept: "text/html" }, signal: AbortSignal.timeout(60_000) });
  if (!response.ok) throw new Error(`La página de documentos respondió ${response.status}.`);
  return response.text();
}

async function downloadPdf(document) {
  const downloadUrl = new URL("https://drive.usercontent.google.com/download");
  downloadUrl.searchParams.set("id", document.driveId);
  downloadUrl.searchParams.set("export", "download");
  downloadUrl.searchParams.set("confirm", "t");

  const response = await fetch(downloadUrl, {
    headers: { Accept: "application/pdf,application/octet-stream" },
    redirect: "follow",
    signal: AbortSignal.timeout(120_000),
  });
  if (!response.ok) throw new Error(`Google Drive respondió ${response.status}.`);

  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 5 || bytes.subarray(0, 5).toString() !== "%PDF-") {
    throw new Error(`La respuesta no es un PDF válido (${response.headers.get("content-type") ?? "tipo desconocido"}).`);
  }

  return bytes;
}

function buildLibraryRow(document) {
  return {
    slug: document.slug,
    title: document.title,
    creator: `Escultismo Crítico Popular · ${document.section}`,
    description: `Documento PDF de la sección «${document.section}» de la biblioteca. Disponible para consulta y descarga.`,
    cover_image_path: null,
    file_path: document.filePath,
    file_mime_type: "application/pdf",
    is_public: true,
    published_at: importDate,
    display_order: document.displayOrder,
  };
}

async function hideDemoResources(client) {
  const { error } = await client.from("library_resources").update({ is_public: false }).in("slug", placeholderSlugs);
  if (error) throw new Error(`No se pudieron ocultar los recursos de demostración: ${error.message}`);
}

const html = await fetchDocumentsPage();
const documents = extractDocuments(html);
if (documents.length === 0) throw new Error("No se encontraron enlaces de Google Drive en la página de documentos.");

writeStatus(`Fuente validada: ${documents.length} PDF únicos encontrados en ${SOURCE_URL}.`);
const sections = new Map();
for (const document of documents) sections.set(document.section, (sections.get(document.section) ?? 0) + 1);
writeStatus(`Secciones: ${[...sections.entries()].map(([name, count]) => `${name} (${count})`).join(" · ")}`);

if (isDryRun) {
  for (const document of documents) writeStatus(`${document.displayOrder}. ${document.title} · ${document.section}`);
  writeStatus("Dry run completado; no se descargaron archivos ni se modificó Supabase.");
} else {
  const client = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
    auth: { autoRefreshToken: false, detectSessionInUrl: false, persistSession: false },
  });
  const failures = [];

  for (const document of documents) {
    try {
      const pdf = await downloadPdf(document);
      const { error: uploadError } = await client.storage.from(STORAGE_BUCKET).upload(document.filePath, pdf, {
        cacheControl: "31536000",
        contentType: "application/pdf",
        upsert: true,
      });
      if (uploadError) throw new Error(`Storage: ${uploadError.message}`);

      const { error: rowError } = await client.from("library_resources").upsert(buildLibraryRow(document), { onConflict: "slug" });
      if (rowError) throw new Error(`Catálogo: ${rowError.message}`);
      writeStatus(`Importado ${document.displayOrder}/${documents.length}: ${document.title} (${Math.round(pdf.length / 1024)} KB)`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      failures.push(`${document.title}: ${message}`);
      writeStatus(`ERROR ${document.displayOrder}/${documents.length}: ${document.title} · ${message}`);
    }
  }

  await hideDemoResources(client);
  if (failures.length > 0) {
    throw new Error(`Importación incompleta: ${documents.length - failures.length}/${documents.length} archivos cargados. ${failures.join(" | ")}`);
  }
  writeStatus(`Importación completada: ${documents.length} PDF disponibles en la biblioteca.`);
}
