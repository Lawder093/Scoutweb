import "server-only";

import { cache } from "react";
import { createSupabasePublicServerClient } from "@/lib/supabase/public-server";
import { fallbackBlogPostSummaries } from "./fallback-summaries";
import { fallbackLibraryResources } from "./fallback-library";
import { findPublishedBlogPost, listPublishedBlogPostSummaries, type BlogPostRow, type BlogPostSummaryRow } from "./repositories/blog";
import { listPublishedCDEActivities, type CDEActivityRow } from "./repositories/cde-activities";
import { findPublicLibraryResource, listPublicLibraryResources, type LibraryResourceRow } from "./repositories/library";
import { resolvePublicAssetUrl, resolvePublicDownloadUrl } from "./storage";
import { sanitizeHtml } from "./sanitize";
import type { BlogPost, BlogPostSummary, ContentTone, LibraryResource } from "./types";
import type { CDEActivity } from "@/content/cdes/types";

const tones: ContentTone[] = ["primary", "secondary", "accent", "mist", "ink", "accent"];
const useSupabase = process.env.CONTENT_SOURCE !== "local" && Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL);

function toneAt(index: number): ContentTone {
  return tones[index % tones.length];
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("es-MX", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(date));
}

function logFallback(message: string, error: unknown): void {
  if (process.env.NODE_ENV === "production") return;
  const detail = error instanceof Error ? error.message : "Error desconocido";
  console.warn(message + ": " + detail);
}

function mapBlogPostSummary(row: BlogPostSummaryRow, index: number, client: ReturnType<typeof createSupabasePublicServerClient>): BlogPostSummary {
  const publishedAt = row.published_at ?? row.created_at;
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
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

function mapBlogPost(row: BlogPostRow, index: number, client: ReturnType<typeof createSupabasePublicServerClient>): BlogPost {
  return { ...mapBlogPostSummary(row, index, client), body: sanitizeHtml(row.body) };
}

function mapLibraryResource(row: LibraryResourceRow, index: number, client: ReturnType<typeof createSupabasePublicServerClient>): LibraryResource {
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
    readerUrl: "/biblioteca/" + row.slug,
    downloadUrl: resolvePublicDownloadUrl(client, row.file_path),
    displayOrder: row.display_order,
    tone: toneAt(index),
  };
}

function mapCDEActivity(row: CDEActivityRow, fallbackImage: string, client: ReturnType<typeof createSupabasePublicServerClient>): CDEActivity {
  return {
    id: row.id,
    title: row.title,
    date: new Intl.DateTimeFormat("es-MX", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${row.event_date}T12:00:00Z`)),
    image: resolvePublicAssetUrl(client, row.image_path) ?? fallbackImage,
    summary: row.summary,
    content: row.body || undefined,
  };
}

async function getLocalBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { fallbackBlogPosts } = await import("./fallback");
  return fallbackBlogPosts.find((post) => post.slug === slug) ?? null;
}

export async function getBlogPosts(limit = 12): Promise<BlogPostSummary[]> {
  if (!useSupabase) return fallbackBlogPostSummaries.slice(0, limit);
  try {
    const client = createSupabasePublicServerClient();
    const rows = await listPublishedBlogPostSummaries(client, limit);
    return rows.map((row, index) => mapBlogPostSummary(row, index, client));
  } catch (error) {
    logFallback("Contenido editorial no disponible; se utilizará el contenido local", error);
    return fallbackBlogPostSummaries.slice(0, limit);
  }
}

export const getBlogPostSummaries = getBlogPosts;

export async function getCDEActivities(cdeSlug: string, fallback: CDEActivity[], fallbackImage: string, limit = 12): Promise<CDEActivity[]> {
  if (!useSupabase) return fallback;
  try {
    const client = createSupabasePublicServerClient();
    const rows = await listPublishedCDEActivities(client, cdeSlug, limit);
    return rows.length > 0 ? rows.map((row) => mapCDEActivity(row, fallbackImage, client)) : fallback;
  } catch (error) {
    logFallback("Actividades del CDE no disponibles; se utilizará el contenido local", error);
    return fallback;
  }
}

export const getBlogPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  if (!useSupabase) return getLocalBlogPostBySlug(slug);
  try {
    const client = createSupabasePublicServerClient();
    const row = await findPublishedBlogPost(client, slug);
    return row ? mapBlogPost(row, 0, client) : getLocalBlogPostBySlug(slug);
  } catch (error) {
    logFallback("Artículo editorial no disponible; se utilizará el contenido local", error);
    return getLocalBlogPostBySlug(slug);
  }
});

export async function getLibraryResources(limit = 12): Promise<LibraryResource[]> {
  if (!useSupabase) return fallbackLibraryResources.slice(0, limit);
  try {
    const client = createSupabasePublicServerClient();
    const rows = await listPublicLibraryResources(client, limit);
    return rows.map((row, index) => mapLibraryResource(row, index, client));
  } catch (error) {
    logFallback("Biblioteca no disponible; se utilizará el contenido local", error);
    return fallbackLibraryResources.slice(0, limit);
  }
}

export const getLibraryResourceBySlug = cache(async (slug: string): Promise<LibraryResource | null> => {
  if (!useSupabase) return fallbackLibraryResources.find((resource) => resource.slug === slug) ?? null;
  try {
    const client = createSupabasePublicServerClient();
    const row = await findPublicLibraryResource(client, slug);
    return row ? mapLibraryResource(row, 0, client) : fallbackLibraryResources.find((resource) => resource.slug === slug) ?? null;
  } catch (error) {
    logFallback("Recurso editorial no disponible; se utilizará el contenido local", error);
    return fallbackLibraryResources.find((resource) => resource.slug === slug) ?? null;
  }
});
