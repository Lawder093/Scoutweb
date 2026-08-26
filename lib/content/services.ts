import "server-only";

import { cache } from "react";
import { createSupabasePublicServerClient } from "@/lib/supabase/public-server";
import { fallbackBlogPostSummaries } from "./fallback-summaries";
import { fallbackLibraryResources } from "./fallback-library";
import { findPublishedBlogPost, listPublishedBlogPostSummaries, type BlogPostRow, type BlogPostSummaryRow } from "./repositories/blog";
import { findPublicLibraryResource, listPublicLibraryResources, type LibraryResourceRow } from "./repositories/library";
import { resolvePublicAssetUrl } from "./storage";
import { sanitizeHtml } from "./sanitize";
import type { BlogPost, BlogPostSummary, ContentTone, LibraryResource } from "./types";

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
    downloadUrl: resolvePublicAssetUrl(client, row.file_path),
    displayOrder: row.display_order,
    tone: toneAt(index),
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
