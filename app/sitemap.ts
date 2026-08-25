import type { MetadataRoute } from "next";
import { cdes } from "@/content/cdes";
import { getBlogPosts, getLibraryResources } from "@/lib/content/services";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, resources] = await Promise.all([getBlogPosts(1000), getLibraryResources(1000)]);
  const now = new Date();

  return [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/cde"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...Object.keys(cdes).map((slug) => ({ url: absoluteUrl(`/cde/${slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: absoluteUrl("/biblioteca"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...resources.map((resource) => ({ url: absoluteUrl(`/biblioteca/${resource.slug}`), lastModified: resource.publishedAt, changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "daily", priority: 0.8 },
    ...posts.map((post) => ({ url: absoluteUrl(`/blog/${post.slug}`), lastModified: post.publishedAt, changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: absoluteUrl("/tienda"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/sumate"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
