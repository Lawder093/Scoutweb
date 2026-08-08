import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import type { BlogPost, ContentTone } from "@/lib/content/types";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const toneClasses: Record<ContentTone, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  ink: "bg-ink",
  mist: "bg-mist",
};

export function BlogPostGrid({ posts, dark = false }: { posts: BlogPost[]; dark?: boolean }) {
  return (
    <section id="historias" className={dark ? "bg-ink py-24 text-white sm:py-32" : "bg-mist py-24 sm:py-32"}>
      <div className="section-shell">
        <Reveal>
          <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
            <SectionHeading
              dark={dark}
              eyebrow="En movimiento"
              title={<>Lo que estamos <span className="text-accent">haciendo.</span></>}
              description="Ideas que salen del cuaderno, se prueban en el territorio y regresan convertidas en preguntas nuevas."
            />
            <Link href="/blog" className={`focus-ring inline-flex shrink-0 items-center gap-2 text-sm font-extrabold transition-colors ${dark ? "text-accent hover:text-white" : "text-secondary hover:text-primary"}`}>
              Ver todas las historias <ArrowUpRight size={16} />
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.id} delay={index * 0.08} className={`group overflow-hidden rounded-[1.8rem] ${toneClasses[post.tone]} ${post.tone === "accent" || post.tone === "mist" ? "text-ink" : "text-white"} shadow-card transition-transform hover:-translate-y-1`}>
              <Link href={`/blog/${post.slug}`} className="focus-ring block">
                <div className="relative aspect-[1.35/1] overflow-hidden">
                  {post.coverImageUrl ? (
                    <Image src={post.coverImageUrl} alt="" fill unoptimized={post.coverImageUrl.startsWith("http")} className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 1024px) 90vw, 33vw" />
                  ) : (
                    <div className="h-full w-full bg-current opacity-10" aria-hidden="true" />
                  )}
                  <div className="absolute inset-0 bg-ink/15 mix-blend-multiply" />
                </div>
                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-[0.15em] opacity-60">
                    <span>{post.category}</span>
                    <span className="flex items-center gap-1"><CalendarDays size={13} />{post.dateLabel}</span>
                  </div>
                  <h3 className="display-title mt-5 text-2xl leading-[0.98]">{post.title}</h3>
                  <p className="mt-4 text-sm leading-6 opacity-70">{post.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold opacity-80">Leer más <ArrowUpRight size={16} /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
