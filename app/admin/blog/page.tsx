import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ArrowLeft, PenLine } from "lucide-react";
import Link from "next/link";
import { BlogPostForm } from "@/components/admin/blog-post-form";
import { SignOutButton } from "@/components/admin/sign-out-button";
import { getContentAdmin } from "@/lib/auth/admin";

export const metadata: Metadata = { title: "Nueva entrada", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const user = await getContentAdmin();
  if (!user) redirect("/login?next=/admin/blog");

  const usingSupabase = process.env.CONTENT_SOURCE !== "local";

  return (
    <main className="min-h-screen bg-mist pb-20 pt-8 sm:pt-10">
      <div className="section-shell">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="focus-ring inline-flex items-center gap-2 rounded-lg text-sm font-extrabold text-secondary hover:text-primary"><ArrowLeft size={16} /> Volver al sitio</Link>
          <SignOutButton />
        </header>
        <section className="mt-12 max-w-4xl rounded-[2rem] border border-ink/10 bg-paper p-6 shadow-soft sm:p-10">
          <span className="eyebrow text-primary"><PenLine size={14} /> Área editorial</span>
          <h1 className="display-title mt-5 text-5xl leading-[0.9] sm:text-7xl">Crear una<br /><span className="text-primary">entrada.</span></h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-ink/65">Escribe una historia, herramienta o conversación para compartirla con la comunidad.</p>
          {!usingSupabase && <p className="mt-6 rounded-xl border border-accent/40 bg-accent/15 px-4 py-3 text-sm leading-6 text-ink/75">El sitio está en modo local. La entrada se guardará en Supabase, pero no aparecerá en el blog público hasta configurar <code className="font-bold">CONTENT_SOURCE=supabase</code>.</p>}
          <BlogPostForm />
        </section>
      </div>
    </main>
  );
}
