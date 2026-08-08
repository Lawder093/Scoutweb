import type { BlogPost } from "@/lib/content/types";
import { BlogPostGrid } from "./blog-post-grid";

export function BlogPreview({ posts }: { posts: BlogPost[] }) {
  return <BlogPostGrid posts={posts.slice(0, 3)} />;
}
