import { articles, libraryBooks } from "@/lib/site-data";
import importedBlogPosts from "@/content/blog/posts.json";
import { sanitizeHtml } from "./sanitize";
import type { BlogPost, ContentTone, LibraryResource } from "./types";

const tones: ContentTone[] = ["primary", "secondary", "accent", "mist", "ink", "accent"];

function toneAt(index: number): ContentTone {
  return tones[index % tones.length];
}

function dateLabel(date: string): string {
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const staticFallbackBlogPosts: BlogPost[] = articles.map((article, index) => {
  const publishedAt = new Date(Date.UTC(2024, index === 0 ? 8 : 7, index === 0 ? 12 : index === 1 ? 28 : 6, 12)).toISOString();

  return {
    id: `fallback-blog-${index + 1}`,
    slug: slugify(article.title),
    title: article.title,
    excerpt: article.text,
    body: article.text,
    category: article.category,
    publishedAt,
    dateLabel: article.date,
    coverImageUrl: article.image,
    authorName: null,
    sourceUrl: null,
    categories: [article.category],
    tags: [],
    tone: toneAt(index),
  };
});

const importedFallbackBlogPosts: BlogPost[] = importedBlogPosts.map((post, index) => ({
  id: post.id,
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  body: sanitizeHtml(post.body),
  category: post.category,
  publishedAt: post.publishedAt,
  dateLabel: post.dateLabel,
  coverImageUrl: post.coverImageUrl,
  authorName: post.authorName,
  sourceUrl: post.sourceUrl,
  categories: post.categories,
  tags: post.tags ?? [],
  tone: toneAt(index),
}));

export const fallbackBlogPosts = importedFallbackBlogPosts.length > 0 ? importedFallbackBlogPosts : staticFallbackBlogPosts;

export const fallbackLibraryResources: LibraryResource[] = libraryBooks.map((book, index) => {
  const publishedAt = new Date(Date.UTC(2024, 8, 20 - index * 2, 12)).toISOString();

  return {
    id: `fallback-library-${index + 1}`,
    slug: slugify(book.title),
    title: book.title,
    creator: book.author,
    description: "Recurso editorial para compartir, adaptar y llevar al territorio.",
    categories: ["Recursos educativos"],
    tags: ["educación popular", "aprendizaje colectivo"],
    publishedAt,
    dateLabel: dateLabel(publishedAt),
    coverImageUrl: null,
    readerUrl: null,
    fileUrl: null,
    downloadUrl: null,
    displayOrder: index + 1,
    tone: toneAt(index),
  };
});
