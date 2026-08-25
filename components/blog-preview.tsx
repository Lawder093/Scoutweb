import type { BlogPostSummary } from "@/lib/content/types";
import { BlogPostGrid } from "./blog-post-grid";

export function BlogPreview({ posts }: { posts: BlogPostSummary[] }) {
  return <BlogPostGrid posts={posts.slice(0, 3)} />;
}
