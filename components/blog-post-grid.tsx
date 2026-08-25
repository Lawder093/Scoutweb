import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost, BlogPostSummary } from "@/lib/content/types";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { BlogPostCard } from "./blog-post-card";

export function BlogPostGrid({ posts, dark = false, showAllLink = true }: { posts: (BlogPost | BlogPostSummary)[]; dark?: boolean; showAllLink?: boolean }) {
  return (
    <section id="historias" className={dark ? "bg-ink py-24 text-white sm:py-32" : "bg-mist py-24 sm:py-32"}>
      <div className="section-shell">
        <Reveal><div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
          <SectionHeading dark={dark} eyebrow="En movimiento" title={<>Lo que estamos <span className="text-accent">haciendo.</span></>} description="Ideas que salen del cuaderno, se prueban en el territorio y regresan convertidas en preguntas nuevas." />
          {showAllLink && <Link href="/blog" className={(dark ? "text-accent hover:text-white" : "text-secondary hover:text-primary") + " focus-ring inline-flex shrink-0 items-center gap-2 text-sm font-extrabold transition-colors"}>Ver todas las historias <ArrowUpRight size={16} aria-hidden="true" /></Link>}
        </div></Reveal>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">{posts.map((post, index) => <BlogPostCard key={post.id} post={post} index={index} />)}</div>
      </div>
    </section>
  );
}
