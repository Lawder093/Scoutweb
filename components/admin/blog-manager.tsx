"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Edit3, EyeOff, FileText, LoaderCircle, Trash2 } from "lucide-react";
import { BlogPostForm, type EditableBlogPost } from "./blog-post-form";

type AdminBlogPost = EditableBlogPost & {
  published_at: string | null;
  created_at: string;
};

type State = { type: "idle" | "error" | "success"; message: string };

function dateLabel(value: string | null): string {
  if (!value) return "Sin publicar";
  return new Intl.DateTimeFormat("es-MX", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(value));
}

export function BlogManager() {
  const [posts, setPosts] = useState<AdminBlogPost[]>([]);
  const [editing, setEditing] = useState<AdminBlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<State>({ type: "idle", message: "" });

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/blog", { cache: "no-store" });
      const result = await response.json() as AdminBlogPost[] | { message?: string };
      if (!response.ok) throw new Error("message" in result ? result.message : "No se pudieron consultar las entradas.");
      setPosts(result as AdminBlogPost[]);
    } catch (error) {
      setState({ type: "error", message: error instanceof Error ? error.message : "No se pudieron consultar las entradas." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadPosts(); }, [loadPosts]);

  async function updatePost(post: AdminBlogPost, action: "publish" | "delete") {
    if (action === "delete" && !window.confirm(`¿Eliminar “${post.title}”? Esta acción no se puede deshacer.`)) return;
    setState({ type: "idle", message: "" });
    try {
      const response = await fetch(action === "delete" ? `/api/admin/blog?id=${encodeURIComponent(post.id)}` : "/api/admin/blog", {
        method: action === "delete" ? "DELETE" : "PATCH",
        headers: action === "delete" ? undefined : { "Content-Type": "application/json" },
        body: action === "delete" ? undefined : JSON.stringify({ id: post.id, publish: !post.is_published }),
      });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "No se pudo actualizar la entrada.");
      setState({ type: "success", message: result.message ?? "Entrada actualizada." });
      if (editing?.id === post.id) setEditing(null);
      await loadPosts();
    } catch (error) {
      setState({ type: "error", message: error instanceof Error ? error.message : "No se pudo actualizar la entrada." });
    }
  }

  return <div className="space-y-10"><div className="rounded-[2rem] border border-ink/10 bg-paper p-6 shadow-soft sm:p-10"><div className="flex flex-wrap items-end justify-between gap-4"><div><span className="eyebrow text-primary"><FileText size={14} /> {editing ? "Editar entrada" : "Nueva entrada"}</span><h2 className="display-title mt-4 text-4xl leading-[0.95] sm:text-5xl">{editing ? "Editar y publicar." : "Escribir para la comunidad."}</h2></div>{editing && <button type="button" onClick={() => setEditing(null)} className="focus-ring rounded-full border border-ink/15 px-4 py-2 text-sm font-bold text-ink/65 hover:border-primary/40 hover:text-primary">Nueva entrada</button>}</div><BlogPostForm key={editing?.id ?? "new"} post={editing} onSaved={() => { setEditing(null); void loadPosts(); }} onCancel={() => setEditing(null)} /></div><section><div className="flex flex-wrap items-end justify-between gap-4"><div><span className="eyebrow text-secondary">Archivo editorial</span><h2 className="display-title mt-3 text-4xl leading-none sm:text-5xl">Entradas guardadas.</h2></div><span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-extrabold text-secondary">{posts.length} {posts.length === 1 ? "entrada" : "entradas"}</span></div>{state.type !== "idle" && <p role="status" className={`mt-5 rounded-xl px-4 py-3 text-sm ${state.type === "success" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"}`}>{state.message}</p>}{loading ? <div className="mt-6 flex items-center gap-2 rounded-2xl border border-ink/10 bg-paper p-6 text-sm text-ink/55"><LoaderCircle className="animate-spin" size={17} /> Cargando entradas…</div> : posts.length === 0 ? <div className="mt-6 rounded-2xl border border-dashed border-ink/20 bg-paper p-8 text-sm text-ink/55">Todavía no hay entradas guardadas.</div> : <div className="mt-6 grid gap-4">{posts.map((post) => <article key={post.id} className="rounded-2xl border border-ink/10 bg-paper p-5 shadow-card sm:flex sm:items-center sm:justify-between sm:gap-6"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.13em] text-ink/45"><span className={`rounded-full px-2 py-1 ${post.is_published ? "bg-secondary/10 text-secondary" : "bg-accent/20 text-ink/65"}`}>{post.is_published ? "Publicada" : "Borrador"}</span><span>{post.category}</span><span>{dateLabel(post.published_at ?? post.created_at)}</span></div><h3 className="mt-3 break-words text-lg font-extrabold text-ink">{post.title}</h3><p className="mt-1 break-words text-sm text-ink/55">/{post.slug}</p></div><div className="mt-5 flex flex-wrap gap-2 sm:mt-0 sm:shrink-0"><button type="button" onClick={() => setEditing(post)} className="focus-ring inline-flex items-center gap-2 rounded-full border border-ink/15 px-3 py-2 text-xs font-extrabold text-ink/65 hover:border-secondary/40 hover:text-secondary"><Edit3 size={14} /> Editar</button><button type="button" onClick={() => void updatePost(post, "publish")} className="focus-ring inline-flex items-center gap-2 rounded-full border border-ink/15 px-3 py-2 text-xs font-extrabold text-ink/65 hover:border-secondary/40 hover:text-secondary">{post.is_published ? <EyeOff size={14} /> : <Check size={14} />}{post.is_published ? "Despublicar" : "Publicar"}</button><button type="button" onClick={() => void updatePost(post, "delete")} className="focus-ring inline-flex items-center gap-2 rounded-full border border-primary/20 px-3 py-2 text-xs font-extrabold text-primary hover:bg-primary/10"><Trash2 size={14} /> Eliminar</button></div></article>)}</div>}</section></div>;
}
