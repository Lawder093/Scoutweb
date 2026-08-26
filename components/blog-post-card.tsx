"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import type { BlogPost, BlogPostSummary, ContentTone } from "@/lib/content/types";
import { Reveal } from "./reveal";

const toneClasses: Record<ContentTone, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  ink: "bg-ink",
  mist: "bg-mist",
};

export function BlogPostCard({ post, index = 0 }: { post: BlogPost | BlogPostSummary; index?: number }) {
  return (
    <Reveal delay={index * 0.05} className={"group overflow-hidden rounded-[1.8rem] " + toneClasses[post.tone] + " " + (post.tone === "accent" || post.tone === "mist" ? "text-ink" : "text-white") + " shadow-card transition-transform hover:-translate-y-1"}>
      <Link href={"/blog/" + post.slug} className="focus-ring block">
        <div className="relative aspect-[1.35/1] overflow-hidden">
          {post.coverImageUrl ? <Image src={post.coverImageUrl} alt="" fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 1024px) 90vw, 33vw" /> : <div className="h-full w-full bg-current opacity-10" aria-hidden="true" />}
          <div className="absolute inset-0 bg-ink/15 mix-blend-multiply" />
        </div>
        <div className="p-6 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-extrabold uppercase tracking-[0.15em] opacity-60"><span>{post.category}</span><span className="flex items-center gap-1"><CalendarDays size={13} aria-hidden="true" />{post.dateLabel}</span></div>
          <h3 className="display-title mt-5 break-words text-2xl leading-[0.98]">{post.title}</h3>
          <p className="mt-4 text-sm leading-6 opacity-70">{post.excerpt}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold opacity-80">Leer más <ArrowUpRight size={16} aria-hidden="true" /></span>
        </div>
      </Link>
    </Reveal>
  );
}
