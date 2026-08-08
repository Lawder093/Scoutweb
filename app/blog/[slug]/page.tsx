import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getBlogPostBySlug } from "@/lib/content/services";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="pt-16">
        <article className="section-shell py-20 sm:py-28">
          <Link href="/blog" className="focus-ring inline-flex items-center gap-2 text-sm font-extrabold text-secondary hover:text-primary"><ArrowLeft size={16} /> Volver al blog</Link>
          <div className="mt-12 max-w-4xl">
            <span className="eyebrow">{post.category}</span>
            <h1 className="display-title mt-6 text-5xl leading-[0.9] sm:text-8xl">{post.title}</h1>
            <div className="mt-7 flex items-center gap-2 text-sm text-ink/55"><CalendarDays size={15} />{post.dateLabel}</div>
          </div>
          {post.coverImageUrl && <div className="relative mt-12 aspect-[1.8/1] overflow-hidden rounded-[2rem] bg-mist"><Image src={post.coverImageUrl} alt="" fill unoptimized={post.coverImageUrl.startsWith("http")} className="object-cover" sizes="(max-width: 1280px) 90vw, 1100px" /></div>}
          <div className="mt-12 max-w-3xl text-lg leading-8 text-ink/75 sm:text-xl [&_a]:font-bold [&_a]:text-primary [&_a]:underline [&_h2]:display-title [&_h2]:mt-10 [&_h2]:text-3xl [&_p]:mt-6 [&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6" dangerouslySetInnerHTML={{ __html: post.body }} />
          {post.sourceUrl && <a href={post.sourceUrl} target="_blank" rel="noreferrer" className="focus-ring mt-10 inline-flex text-sm font-extrabold text-secondary hover:text-primary">Ver publicación original ↗</a>}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
