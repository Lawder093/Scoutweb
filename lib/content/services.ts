import "server-only";

import { createSupabasePublicServerClient } from "@/lib/supabase/public-server";
import { fallbackBlogPosts, fallbackLibraryResources } from "./fallback";
import { findPublishedBlogPost, listPublishedBlogPosts, type BlogPostRow } from "./repositories/blog";
import { findPublicLibraryResource, listPublicLibraryResources, type LibraryResourceRow } from "./repositories/library";
import { resolvePublicAssetUrl } from "./storage";
import { sanitizeHtml } from "./sanitize";
import type { BlogPost, BlogPostSummary, ContentTone, LibraryResource } from "./types";

const tones: ContentTone[] = ["primary", "secondary", "accent", "mist", "ink", "accent"];

function toneAt(index: number): ContentTone {
  return tones[index % tones.length];
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

function logFallback(message: string, error: unknown): void {
  const detail = error instanceof Error ? error.message : "Error desconocido";
  console.warn(`${message}: ${detail}`);
}

function mapBlogPost(
  row: BlogPostRow,
  index: number,
  client: ReturnType<typeof createSupabasePublicServerClient>,
): BlogPost {
  const publishedAt = row.published_at ?? row.created_at;

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    body: sanitizeHtml(row.body),
    category: row.category,
    publishedAt,
    dateLabel: formatDate(publishedAt),
    coverImageUrl: resolvePublicAssetUrl(client, row.cover_image_path),
    authorName: row.author_name,
    sourceUrl: row.source_url,
    categories: row.categories,
    tags: row.tags,
    tone: toneAt(index),
  };
}

function mapLibraryResource(
  row: LibraryResourceRow,
  index: number,
  client: ReturnType<typeof createSupabasePublicServerClient>,
): LibraryResource {
  const publishedAt = row.published_at ?? row.created_at;

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    creator: row.creator,
    description: row.description,
    categories: ["Recursos educativos"],
    tags: [],
    publishedAt,
    dateLabel: formatDate(publishedAt),
    coverImageUrl: resolvePublicAssetUrl(client, row.cover_image_path),
    readerUrl: `/biblioteca/${row.slug}`,
    downloadUrl: resolvePublicAssetUrl(client, row.file_path),
    displayOrder: row.display_order,
    tone: toneAt(index),
  };
}

export async function getBlogPosts(limit = 12): Promise<BlogPost[]> {
  try {
    const client = createSupabasePublicServerClient();
    const rows = await listPublishedBlogPosts(client, limit);
    return rows.map((row, index) => mapBlogPost(row, index, client));
  } catch (error) {
    logFallback("Contenido editorial no disponible; se utilizará el contenido local", error);
    return fallbackBlogPosts.slice(0, limit);
  }
}

export async function getBlogPostSummaries(limit = 1000): Promise<BlogPostSummary[]> {
  const posts = await getBlogPosts(limit);
  return posts.map(({ body, ...summary }) => summary);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const client = createSupabasePublicServerClient();
    const row = await findPublishedBlogPost(client, slug);
    return row ? mapBlogPost(row, 0, client) : fallbackBlogPosts.find((post) => post.slug === slug) ?? null;
  } catch (error) {
    logFallback("Artículo editorial no disponible; se utilizará el contenido local", error);
    return fallbackBlogPosts.find((post) => post.slug === slug) ?? null;
  }
}

export async function getLibraryResources(limit = 12): Promise<LibraryResource[]> {
  try {
    const client = createSupabasePublicServerClient();
    const rows = await listPublicLibraryResources(client, limit);
    return rows.map((row, index) => mapLibraryResource(row, index, client));
  } catch (error) {
    logFallback("Biblioteca no disponible; se utilizará el contenido local", error);
    return fallbackLibraryResources.slice(0, limit);
  }
}

export async function getLibraryResourceBySlug(slug: string): Promise<LibraryResource | null> {
  try {
    const client = createSupabasePublicServerClient();
    const row = await findPublicLibraryResource(client, slug);
    return row ? mapLibraryResource(row, 0, client) : fallbackLibraryResources.find((resource) => resource.slug === slug) ?? null;
  } catch (error) {
    logFallback("Recurso editorial no disponible; se utilizará el contenido local", error);
    return fallbackLibraryResources.find((resource) => resource.slug === slug) ?? null;
  }
}
