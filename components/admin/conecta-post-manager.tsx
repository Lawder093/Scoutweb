"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { ImagePlus, LoaderCircle, MessageCircle, Send, Trash2 } from "lucide-react";

type ConectaAdminPost = {
  id: string;
  title: string;
  caption: string;
  image_url: string | null;
  location: string | null;
  external_url: string | null;
  published_at: string;
  comments?: unknown[];
};

type State = { type: "idle" | "success" | "error"; message: string };

function dateLabel(value: string): string {
  return new Intl.DateTimeFormat("es-MX", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export function ConectaPostManager() {
  const [posts, setPosts] = useState<ConectaAdminPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [state, setState] = useState<State>({ type: "idle", message: "" });

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/conecta-posts", { cache: "no-store" });
      const result = await response.json() as ConectaAdminPost[] | { message?: string };
      if (!response.ok) throw new Error("message" in result ? result.message : "No se pudieron consultar las publicaciones.");
      setPosts(result as ConectaAdminPost[]);
    } catch (error) {
      setState({ type: "error", message: error instanceof Error ? error.message : "No se pudieron consultar las publicaciones." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadPosts(); }, [loadPosts]);

  async function createPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setState({ type: "idle", message: "" });
    const form = event.currentTarget;
    try {
      const response = await fetch("/api/admin/conecta-posts", { method: "POST", body: new FormData(form) });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "No se pudo crear la publicación.");
      form.reset();
      setState({ type: "success", message: result.message ?? "Publicación creada correctamente." });
      await loadPosts();
    } catch (error) {
      setState({ type: "error", message: error instanceof Error ? error.message : "No se pudo crear la publicación." });
    } finally {
      setSaving(false);
    }
  }

  async function deletePost(post: ConectaAdminPost) {
    if (!window.confirm(`¿Eliminar “${post.title}” y sus comentarios? Esta acción no se puede deshacer.`)) return;
    try {
      const response = await fetch(`/api/admin/conecta-posts?id=${encodeURIComponent(post.id)}`, { method: "DELETE" });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "No se pudo eliminar la publicación.");
      setState({ type: "success", message: result.message ?? "Publicación eliminada." });
      await loadPosts();
    } catch (error) {
      setState({ type: "error", message: error instanceof Error ? error.message : "No se pudo eliminar la publicación." });
    }
  }

  return (
    <div className="grid gap-7 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
      <section className="rounded-[2rem] border border-ink/10 bg-paper p-6 shadow-soft sm:p-8">
        <span className="eyebrow text-secondary"><Send size={14} /> Publicación global</span>
        <h2 className="display-title mt-4 text-4xl leading-none">Compartir en Conecta.</h2>
        <p className="mt-4 text-sm leading-6 text-ink/60">Cada entrada es visible para las cuentas activas de los tres CDE. Por ahora permite una fotografía, texto y un enlace opcional.</p>
        <form onSubmit={createPost} className="mt-8 space-y-5">
          <label className="block text-sm font-bold text-ink">Título<input required name="title" maxLength={180} className="focus-ring mt-2 h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 text-base outline-none sm:text-sm" placeholder="Un momento de la comunidad" /></label>
          <label className="block text-sm font-bold text-ink">Texto<textarea required name="caption" maxLength={2000} rows={5} className="focus-ring mt-2 w-full resize-y rounded-xl border border-ink/15 bg-paper px-3 py-3 text-base leading-6 outline-none sm:text-sm" placeholder="Cuenta qué está pasando y por qué importa…" /></label>
          <div className="grid gap-5 sm:grid-cols-2"><label className="block text-sm font-bold text-ink">Lugar <span className="font-normal text-ink/45">(opcional)</span><input name="location" maxLength={160} className="focus-ring mt-2 h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 text-base outline-none sm:text-sm" placeholder="Puebla, México" /></label><label className="block text-sm font-bold text-ink">Enlace <span className="font-normal text-ink/45">(opcional)</span><input name="externalUrl" type="url" maxLength={600} className="focus-ring mt-2 h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 text-base outline-none sm:text-sm" placeholder="https://…" /></label></div>
          <label className="block text-sm font-bold text-ink"><span className="inline-flex items-center gap-2"><ImagePlus size={15} /> Fotografía</span><input required name="image" type="file" accept="image/jpeg,image/png,image/webp" className="focus-ring mt-2 block w-full rounded-xl border border-dashed border-ink/20 bg-mist/40 px-3 py-3 text-sm text-ink/65 file:mr-3 file:rounded-full file:border-0 file:bg-secondary/10 file:px-3 file:py-2 file:text-xs file:font-extrabold file:text-secondary" /><span className="mt-2 block text-xs font-normal text-ink/45">JPG, PNG o WebP · máximo 5 MB.</span></label>
          {state.type !== "idle" && <p role="status" className={`rounded-xl px-4 py-3 text-sm leading-6 ${state.type === "success" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"}`}>{state.message}</p>}
          <button type="submit" disabled={saving} className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-5 py-3.5 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"><Send size={16} />{saving ? "Publicando…" : "Publicar en Conecta"}</button>
        </form>
      </section>

      <section className="rounded-[2rem] border border-ink/10 bg-paper p-6 shadow-soft sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><span className="eyebrow text-primary">Feed privado</span><h2 className="display-title mt-4 text-4xl leading-none">Publicaciones.</h2></div><span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary">{posts.length}</span></div>
        {loading ? <div className="mt-8 flex items-center gap-2 text-sm text-ink/55"><LoaderCircle className="animate-spin" size={17} /> Cargando publicaciones…</div> : posts.length === 0 ? <div className="mt-8 rounded-2xl border border-dashed border-ink/20 p-8 text-sm text-ink/55">Todavía no hay publicaciones en Conecta.</div> : <div className="mt-8 space-y-4">{posts.map((post) => <article key={post.id} className="overflow-hidden rounded-2xl border border-ink/10"><div className="flex gap-4 p-4">{post.image_url && <img src={post.image_url} alt="" className="h-20 w-20 shrink-0 rounded-xl object-cover" />}<div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><div><h3 className="break-words font-extrabold text-ink">{post.title}</h3><p className="mt-1 text-xs text-ink/45">{dateLabel(post.published_at)}{post.location ? ` · ${post.location}` : ""}</p></div><button type="button" aria-label={`Eliminar ${post.title}`} onClick={() => void deletePost(post)} className="focus-ring shrink-0 rounded-full border border-primary/20 p-2 text-primary hover:bg-primary/10"><Trash2 size={15} /></button></div><p className="mt-3 line-clamp-3 text-sm leading-6 text-ink/60">{post.caption}</p><span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-secondary"><MessageCircle size={13} /> {post.comments?.length ?? 0} comentarios</span></div></div></article>)}</div>}
      </section>
    </div>
  );
}
