"use client";

import { FormEvent, useState } from "react";
import { ExternalLink, Heart, LoaderCircle, LogOut, MapPin, MessageCircle, Send, Shield, Trash2 } from "lucide-react";
import type { ConectaUser } from "@/lib/auth/conecta";
import type { ConectaCommentView, ConectaPostView } from "@/lib/content/repositories/conecta";

type State = { type: "idle" | "success" | "error"; message: string };

function dateLabel(value: string): string {
  return new Intl.DateTimeFormat("es-MX", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function initials(name: string): string {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

function profileLine(user: { cde_slug: string | null; community: string | null }): string {
  const cde = user.cde_slug ? user.cde_slug.charAt(0).toUpperCase() + user.cde_slug.slice(1) : "CDE";
  return `${cde} · ${user.community ?? "Comunidad"}`;
}

function Avatar({ name, imageUrl, size = "normal" }: { name: string; imageUrl: string | null; size?: "normal" | "small" }) {
  const dimensions = size === "small" ? "h-8 w-8 text-[10px]" : "h-11 w-11 text-xs";
  return <div className={`grid shrink-0 place-items-center overflow-hidden rounded-full bg-accent text-ink ${dimensions}`}>{imageUrl ? <img src={imageUrl} alt="" className="h-full w-full object-cover" /> : initials(name)}</div>;
}

function Comment({ comment, canModerate, onDelete }: { comment: ConectaCommentView; canModerate: boolean; onDelete: (comment: ConectaCommentView) => void }) {
  const commenter = comment.user;
  return <li className="flex gap-3"><Avatar name={commenter?.name ?? "Scout"} imageUrl={commenter?.photo_url ?? null} size="small" /><div className="min-w-0 flex-1 rounded-2xl bg-mist/75 px-4 py-3"><div className="flex flex-wrap items-baseline justify-between gap-2"><div><span className="font-extrabold text-ink">{commenter?.name ?? "Scout"}</span><span className="ml-2 text-xs text-ink/45">{commenter ? profileLine(commenter) : "Conecta"}</span></div>{canModerate && <button type="button" aria-label="Eliminar comentario" onClick={() => onDelete(comment)} className="focus-ring rounded-full p-1 text-primary/70 hover:bg-primary/10 hover:text-primary"><Trash2 size={13} /></button>}</div><p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-ink/70">{comment.body}</p><p className="mt-2 text-[11px] text-ink/40">{dateLabel(comment.created_at)}</p></div></li>;
}

export function ConectaFeed({ initialPosts, user, canModerate }: { initialPosts: ConectaPostView[]; user: ConectaUser; canModerate: boolean }) {
  const [posts, setPosts] = useState(initialPosts);
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [submittingPostId, setSubmittingPostId] = useState<string | null>(null);
  const [state, setState] = useState<State>({ type: "idle", message: "" });

  async function submitComment(event: FormEvent<HTMLFormElement>, postId: string) {
    event.preventDefault();
    const body = (commentDrafts[postId] ?? "").trim();
    if (!body) return;
    setSubmittingPostId(postId);
    setState({ type: "idle", message: "" });
    try {
      const response = await fetch("/api/conecta/comments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ postId, body }) });
      const result = await response.json() as { message?: string; comment?: ConectaCommentView };
      if (!response.ok || !result.comment) throw new Error(result.message ?? "No se pudo publicar el comentario.");
      setPosts((current) => current.map((post) => post.id === postId ? { ...post, comments: [...post.comments, result.comment as ConectaCommentView] } : post));
      setCommentDrafts((current) => ({ ...current, [postId]: "" }));
    } catch (error) {
      setState({ type: "error", message: error instanceof Error ? error.message : "No se pudo publicar el comentario." });
    } finally {
      setSubmittingPostId(null);
    }
  }

  async function deleteComment(comment: ConectaCommentView) {
    if (!window.confirm("¿Eliminar este comentario?")) return;
    try {
      const response = await fetch(`/api/conecta/comments?id=${encodeURIComponent(comment.id)}`, { method: "DELETE" });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "No se pudo eliminar el comentario.");
      setPosts((current) => current.map((post) => post.id === comment.post_id ? { ...post, comments: post.comments.filter((item) => item.id !== comment.id) } : post));
    } catch (error) {
      setState({ type: "error", message: error instanceof Error ? error.message : "No se pudo eliminar el comentario." });
    }
  }

  async function logout() {
    await fetch("/api/conecta/auth/logout", { method: "POST" });
    window.location.href = "/conecta";
  }

  return <main className="min-h-screen bg-mist pb-24 pt-28"><section className="section-shell"><div className="flex flex-col gap-5 rounded-[2rem] bg-secondary px-6 py-7 text-white shadow-soft sm:flex-row sm:items-center sm:justify-between sm:px-9"><div className="flex items-center gap-4"><Avatar name={user.name} imageUrl={user.photo_url} /><div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/65">Sesión de Conecta</p><h1 className="display-title mt-1 text-3xl">Hola, {user.name.split(" ")[0]}.</h1><p className="mt-1 text-sm text-white/75">{profileLine(user)}</p></div></div><button type="button" onClick={() => void logout()} className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-xs font-extrabold text-white hover:border-white hover:bg-white/10"><LogOut size={15} /> Cerrar sesión</button></div><div className="mx-auto mt-12 max-w-2xl"><div className="mb-8"><span className="eyebrow text-secondary"><Shield size={14} /> Feed privado · comunidad global</span><h2 className="display-title mt-4 text-5xl leading-[0.92] sm:text-7xl">Lo que estamos<br /><span className="text-secondary">viviendo juntes.</span></h2><p className="mt-5 max-w-xl text-base leading-7 text-ink/60">Publicaciones generales de los Centros de Desarrollo Escultista. Lee, comenta y mantén la conversación viva.</p></div>{state.type === "error" && <p role="alert" className="mb-6 rounded-2xl bg-primary/10 px-4 py-3 text-sm leading-6 text-primary">{state.message}</p>}{posts.length === 0 ? <div className="rounded-[2rem] border border-dashed border-ink/20 bg-paper p-10 text-center shadow-card"><Heart className="mx-auto text-secondary" size={28} /><h3 className="mt-4 text-xl font-extrabold text-ink">Todavía no hay publicaciones.</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink/55">Cuando el equipo publique el primer momento de la comunidad aparecerá aquí.</p></div> : <div className="space-y-8">{posts.map((post) => <article key={post.id} className="overflow-hidden rounded-[2rem] border border-ink/10 bg-paper shadow-card"><div className="p-5 sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-extrabold uppercase tracking-[0.14em] text-secondary">{dateLabel(post.published_at)}{post.location ? <span className="ml-2 inline-flex items-center gap-1 text-ink/45"><MapPin size={12} />{post.location}</span> : null}</p><h3 className="mt-3 text-2xl font-black tracking-[-0.03em] text-ink sm:text-3xl">{post.title}</h3></div><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary/10 text-secondary"><MessageCircle size={18} /></span></div><p className="mt-4 whitespace-pre-wrap text-base leading-7 text-ink/70">{post.caption}</p></div>{post.image_url && <img src={post.image_url} alt={post.title} className="block max-h-[640px] w-full bg-ink/5 object-cover" />}{post.external_url && <div className="px-5 pt-5 sm:px-7"><a href={post.external_url} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-full border border-secondary/25 px-4 py-2.5 text-sm font-extrabold text-secondary hover:bg-secondary/10">Ver enlace <ExternalLink size={15} /></a></div>}<div className="p-5 sm:p-7"><div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-ink/45"><MessageCircle size={14} /> {post.comments.length} {post.comments.length === 1 ? "comentario" : "comentarios"}</div><ul className="mt-5 space-y-3">{post.comments.map((comment) => <Comment key={comment.id} comment={comment} canModerate={canModerate} onDelete={(item) => void deleteComment(item)} />)}</ul><form onSubmit={(event) => void submitComment(event, post.id)} className="mt-6 flex items-end gap-3"><Avatar name={user.name} imageUrl={user.photo_url} size="small" /><div className="min-w-0 flex-1"><label htmlFor={`comment-${post.id}`} className="sr-only">Escribe un comentario</label><textarea id={`comment-${post.id}`} value={commentDrafts[post.id] ?? ""} onChange={(event) => setCommentDrafts((current) => ({ ...current, [post.id]: event.target.value.slice(0, 1200) }))} rows={2} maxLength={1200} placeholder="Escribe un comentario…" className="focus-ring w-full resize-none rounded-2xl border border-ink/15 bg-paper px-4 py-3 text-base leading-6 outline-none sm:text-sm" /></div><button type="submit" disabled={submittingPostId === post.id || !(commentDrafts[post.id] ?? "").trim()} aria-label="Publicar comentario" className="focus-ring grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40">{submittingPostId === post.id ? <LoaderCircle className="animate-spin" size={17} /> : <Send size={17} />}</button></form></div></article>)}</div>}</div></section></main>;
}
