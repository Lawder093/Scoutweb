"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Clock3, LoaderCircle, Trash2, X } from "lucide-react";
import type { PostcardView } from "@/lib/content/postcards-types";

type State = { type: "idle" | "success" | "error"; message: string };
function flagFor(country: string): string { return country === "México" ? "🇲🇽" : country === "Colombia" ? "🇨🇴" : country === "Argentina" ? "🇦🇷" : "🌎"; }
function dateLabel(value: string): string { return new Intl.DateTimeFormat("es-MX", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)); }

export function ConectaPostcardsManager() {
  const [postcards, setPostcards] = useState<PostcardView[]>([]);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<State>({ type: "idle", message: "" });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/conecta-postcards", { cache: "no-store" });
      const result = await response.json() as PostcardView[] | { message?: string };
      if (!response.ok) throw new Error("message" in result ? result.message : "No se pudieron consultar las postales.");
      setPostcards(result as PostcardView[]);
    } catch (error) { setState({ type: "error", message: error instanceof Error ? error.message : "No se pudieron consultar las postales." }); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { void load(); }, [load]);

  async function moderate(postcard: PostcardView, action: "approve" | "reject") {
    const rejectionReason = action === "reject" ? window.prompt("Motivo del rechazo (opcional):") ?? "" : "";
    if (action === "reject" && !window.confirm("¿Rechazar esta postal?")) return;
    try {
      const response = await fetch("/api/admin/conecta-postcards", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: postcard.id, action, rejectionReason }) });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "No se pudo moderar la postal.");
      setState({ type: "success", message: result.message ?? "Postal actualizada." });
      await load();
    } catch (error) { setState({ type: "error", message: error instanceof Error ? error.message : "No se pudo moderar la postal." }); }
  }

  async function remove(postcard: PostcardView) {
    if (!window.confirm("¿Eliminar esta postal y su imagen?")) return;
    try {
      const response = await fetch(`/api/admin/conecta-postcards?id=${encodeURIComponent(postcard.id)}`, { method: "DELETE" });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "No se pudo eliminar la postal.");
      setState({ type: "success", message: result.message ?? "Postal eliminada." });
      await load();
    } catch (error) { setState({ type: "error", message: error instanceof Error ? error.message : "No se pudo eliminar la postal." }); }
  }

  return <section className="rounded-[2rem] border border-ink/10 bg-paper p-6 shadow-soft sm:p-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><span className="eyebrow text-secondary">Moderación</span><h2 className="display-title mt-4 text-4xl leading-none">Postales</h2><p className="mt-4 max-w-xl text-sm leading-6 text-ink/60">Aprueba cada envío antes de mostrarlo en el inicio. Las aprobadas se mantienen activas durante 72 horas y después quedan en el archivo por país.</p></div><span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-extrabold text-secondary">{postcards.length}</span></div>{state.type !== "idle" && <p role="status" className={`mt-6 rounded-xl px-4 py-3 text-sm leading-6 ${state.type === "success" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"}`}>{state.message}</p>}{loading ? <div className="mt-8 flex items-center gap-2 text-sm text-ink/55"><LoaderCircle className="animate-spin" size={17} /> Cargando postales…</div> : postcards.length === 0 ? <div className="mt-8 rounded-2xl border border-dashed border-ink/20 p-8 text-sm text-ink/55">No hay postales para revisar.</div> : <div className="mt-8 grid gap-4 lg:grid-cols-2">{postcards.map((postcard) => <article key={postcard.id} className="overflow-hidden rounded-2xl border border-ink/10"><div className="flex gap-4 p-4">{postcard.cover_image_url ? <img src={postcard.cover_image_url} alt={`Postal de ${postcard.author_name}`} className="h-28 w-28 shrink-0 rounded-xl object-cover" /> : null}<div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><span className={`rounded-full px-2.5 py-1 text-[11px] font-black uppercase tracking-wide ${postcard.status === "pending" ? "bg-accent/30 text-ink" : postcard.status === "approved" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"}`}>{postcard.status === "pending" ? "Pendiente" : postcard.status === "approved" ? "Aprobada" : postcard.status === "rejected" ? "Rechazada" : "Archivada"}</span><span className="text-xs text-ink/45">{flagFor(postcard.country_name)} {postcard.country_name}</span></div><h3 className="mt-2 truncate font-black text-ink">{postcard.author_name}</h3><p className="mt-1 text-xs text-ink/55">{postcard.group_name} · {dateLabel(postcard.submitted_at)}</p><p className="mt-3 line-clamp-3 whitespace-pre-wrap text-sm leading-6 text-ink/70">{postcard.message}</p></div></div>{postcard.status === "pending" && <div className="flex gap-2 border-t border-ink/10 p-3"><button type="button" onClick={() => void moderate(postcard, "approve")} className="focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-secondary px-3 py-2.5 text-xs font-extrabold text-white"><Check size={14} /> Aprobar</button><button type="button" onClick={() => void moderate(postcard, "reject")} className="focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-primary/20 px-3 py-2.5 text-xs font-extrabold text-primary"><X size={14} /> Rechazar</button></div>}{postcard.status === "approved" && <div className="flex items-center justify-between border-t border-ink/10 px-4 py-3 text-xs text-ink/45"><span className="inline-flex items-center gap-1"><Clock3 size={13} /> Expira {postcard.expires_at ? dateLabel(postcard.expires_at) : "pronto"}</span><button type="button" onClick={() => void remove(postcard)} className="focus-ring inline-flex items-center gap-1 rounded-full px-2 py-1 font-extrabold text-primary hover:bg-primary/10"><Trash2 size={13} /> Eliminar</button></div>}</article>)}</div>}</section>;
}
