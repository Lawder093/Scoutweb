import { articles } from "@/lib/site-data";
import importedBlogPostSummaries from "@/content/blog/posts-summary.json";
import type { BlogPostSummary, ContentTone } from "./types";

const tones: ContentTone[] = ["primary", "secondary", "accent", "mist", "ink", "accent"];

function toneAt(index: number): ContentTone {
  return tones[index % tones.length];
}

function slugify(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const staticFallbackBlogPostSummaries: BlogPostSummary[] = articles.map((article, index) => ({
  id: "fallback-blog-" + (index + 1),
  slug: slugify(article.title),
  title: article.title,
  excerpt: article.text,
  category: article.category,
  publishedAt: new Date(Date.UTC(2024, index === 0 ? 8 : 7, index === 0 ? 12 : index === 1 ? 28 : 6, 12)).toISOString(),
  dateLabel: article.date,
  coverImageUrl: article.image,
  authorName: null,
  sourceUrl: null,
  categories: [article.category],
  tags: [],
  tone: toneAt(index),
}));

const importedFallbackBlogPostSummaries: BlogPostSummary[] = importedBlogPostSummaries.map((post, index) => ({
  ...post,
  tone: toneAt(index),
}));

export const fallbackBlogPostSummaries = importedFallbackBlogPostSummaries.length > 0 ? importedFallbackBlogPostSummaries : staticFallbackBlogPostSummaries;
