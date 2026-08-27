"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { CalendarDays, CalendarPlus, Check, Edit3, EyeOff, ImagePlus, LoaderCircle, Trash2 } from "lucide-react";

export type AdminCDEOption = { slug: string; label: string };
type AdminActivity = { id: string; cde_slug: string; slug: string; title: string; event_date: string; summary: string; body: string; image_url: string | null; is_published: boolean; published_at: string | null; created_at: string };
type State = { type: "idle" | "success" | "error"; message: string };

function dateLabel(value: string): string {
  return new Intl.DateTimeFormat("es-MX", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T12:00:00Z`));
}

export function ActivityManager({ cdeOptions }: { cdeOptions: AdminCDEOption[] }) {
  const [activities, setActivities] = useState<AdminActivity[]>([]);
  const [editing, setEditing] = useState<AdminActivity | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [state, setState] = useState<State>({ type: "idle", message: "" });

  const loadActivities = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/activities", { cache: "no-store" });
      const result = await response.json() as AdminActivity[] | { message?: string };
      if (!response.ok) throw new Error("message" in result ? result.message : "No se pudieron consultar las actividades.");
      setActivities(result as AdminActivity[]);
    } catch (error) {
      setState({ type: "error", message: error instanceof Error ? error.message : "No se pudieron consultar las actividades." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadActivities(); }, [loadActivities]);

  async function saveActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setState({ type: "idle", message: "" });
    const form = event.currentTarget;
    try {
      const formData = new FormData(form);
      if (editing) formData.set("id", editing.id);
      const response = await fetch("/api/admin/activities", { method: editing ? "PATCH" : "POST", body: formData });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "No se pudo guardar la actividad.");
      form.reset();
      setEditing(null);
      setState({ type: "success", message: result.message ?? "Actividad guardada correctamente." });
      await loadActivities();
    } catch (error) {
      setState({ type: "error", message: error instanceof Error ? error.message : "No se pudo guardar la actividad." });
    } finally {
      setSaving(false);
    }
  }

  async function updateActivity(activity: AdminActivity, action: "publish" | "delete") {
    if (action === "delete" && !window.confirm(`¿Eliminar “${activity.title}”? Esta acción no se puede deshacer.`)) return;
    try {
      const response = await fetch(action === "delete" ? `/api/admin/activities?id=${encodeURIComponent(activity.id)}` : "/api/admin/activities", { method: action === "delete" ? "DELETE" : "PATCH", ...(action === "publish" ? { body: (() => { const form = new FormData(); form.set("id", activity.id); form.set("cdeSlug", activity.cde_slug); form.set("title", activity.title); form.set("eventDate", activity.event_date); form.set("summary", activity.summary); form.set("body", activity.body); form.set("publish", String(!activity.is_published)); return form; })() } : {}) });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "No se pudo actualizar la actividad.");
      setState({ type: "success", message: result.message ?? "Actividad actualizada." });
      if (editing?.id === activity.id) setEditing(null);
      await loadActivities();
    } catch (error) {
      setState({ type: "error", message: error instanceof Error ? error.message : "No se pudo actualizar la actividad." });
    }
  }

  return <div className="space-y-10"><section className="rounded-[2rem] border border-ink/10 bg-paper p-6 shadow-soft sm:p-10"><div className="flex flex-wrap items-end justify-between gap-4"><div><span className="eyebrow text-primary"><CalendarPlus size={14} /> {editing ? "Editar actividad" : "Nueva actividad"}</span><h2 className="display-title mt-4 text-4xl leading-[0.95] sm:text-5xl">{editing ? "Actualizar la noticia." : "Publicar un evento."}</h2></div>{editing && <button type="button" onClick={() => setEditing(null)} className="focus-ring rounded-full border border-ink/15 px-4 py-2 text-sm font-bold text-ink/65 hover:border-primary/40 hover:text-primary">Nueva actividad</button>}</div><p className="mt-5 max-w-2xl text-sm leading-6 text-ink/60">Elige un solo CDE. La actividad aparecerá automáticamente dentro de su sección “Actividades”.</p><form key={editing?.id ?? "new"} onSubmit={saveActivity} className="mt-8 space-y-7"><div className="grid gap-5 md:grid-cols-2"><label className="block text-sm font-bold text-ink md:col-span-2">CDE de publicación<select required name="cdeSlug" defaultValue={editing?.cde_slug ?? cdeOptions[0]?.slug} className="focus-ring mt-2 h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 text-base outline-none sm:text-sm">{cdeOptions.map((option) => <option key={option.slug} value={option.slug}>{option.label}</option>)}</select></label><label className="block text-sm font-bold text-ink md:col-span-2">Título<input required name="title" defaultValue={editing?.title ?? ""} maxLength={180} className="focus-ring mt-2 h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 text-base outline-none sm:text-sm" placeholder="Título de la noticia o evento" /></label><label className="block text-sm font-bold text-ink">Fecha del evento<input required name="eventDate" defaultValue={editing?.event_date ?? ""} type="date" className="focus-ring mt-2 h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 text-base outline-none sm:text-sm" /></label><label className="block text-sm font-bold text-ink"><span className="inline-flex items-center gap-2"><ImagePlus size={15} /> Imagen {editing && <span className="font-normal text-ink/45">(opcional al editar)</span>}</span><input name="image" type="file" accept="image/jpeg,image/png,image/webp" required={!editing} className="focus-ring mt-2 block w-full rounded-xl border border-ink/15 bg-paper px-3 py-3 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-primary/10 file:px-3 file:py-2 file:text-xs file:font-bold file:text-primary" /><span className="mt-2 block text-xs font-normal text-ink/45">JPG, PNG o WebP · máximo 5 MB</span></label><label className="block text-sm font-bold text-ink md:col-span-2">Resumen<textarea required name="summary" defaultValue={editing?.summary ?? ""} maxLength={320} rows={3} className="focus-ring mt-2 w-full resize-y rounded-xl border border-ink/15 bg-paper px-3 py-3 text-base leading-6 outline-none sm:text-sm" placeholder="Resumen que aparecerá en la tarjeta del CDE." /></label><label className="block text-sm font-bold text-ink md:col-span-2">Contenido<textarea required name="body" defaultValue={editing?.body ?? ""} rows={9} className="focus-ring mt-2 w-full resize-y rounded-xl border border-ink/15 bg-paper px-3 py-3 text-base leading-7 outline-none sm:text-sm" placeholder="Cuenta lo que ocurrió o explica la actividad." /></label></div><label className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-mist p-4 text-sm leading-6 text-ink/75"><input name="publish" type="checkbox" defaultChecked={editing?.is_published ?? false} className="mt-1 h-4 w-4 accent-primary" /><span><strong className="text-ink">Publicar inmediatamente.</strong> Si lo dejas desmarcado, se guardará como borrador.</span></label>{state.type !== "idle" && <p role="status" className={`rounded-xl px-4 py-3 text-sm leading-6 ${state.type === "success" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"}`}>{state.message}</p>}<div className="flex flex-wrap gap-3"><button type="submit" disabled={saving} className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60 sm:w-auto"><CalendarPlus size={16} />{saving ? "Guardando…" : editing ? "Actualizar actividad" : "Guardar actividad"}</button>{editing && <button type="button" onClick={() => setEditing(null)} className="focus-ring inline-flex w-full items-center justify-center rounded-full border border-ink/15 px-5 py-3.5 text-sm font-extrabold text-ink/70 hover:border-primary/40 hover:text-primary sm:w-auto">Cancelar edición</button>}</div></form></section><section><div className="flex flex-wrap items-end justify-between gap-4"><div><span className="eyebrow text-secondary">Noticias por CDE</span><h2 className="display-title mt-3 text-4xl leading-none sm:text-5xl">Actividades guardadas.</h2></div><span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-extrabold text-secondary">{activities.length}</span></div>{loading ? <div className="mt-6 flex items-center gap-2 rounded-2xl border border-ink/10 bg-paper p-6 text-sm text-ink/55"><LoaderCircle className="animate-spin" size={17} /> Cargando actividades…</div> : activities.length === 0 ? <div className="mt-6 rounded-2xl border border-dashed border-ink/20 bg-paper p-8 text-sm text-ink/55">Todavía no hay actividades guardadas.</div> : <div className="mt-6 grid gap-4">{activities.map((activity) => <article key={activity.id} className="rounded-2xl border border-ink/10 bg-paper p-5 shadow-card sm:flex sm:items-center sm:justify-between sm:gap-6"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.13em] text-ink/45"><span className={`rounded-full px-2 py-1 ${activity.is_published ? "bg-secondary/10 text-secondary" : "bg-accent/20 text-ink/65"}`}>{activity.is_published ? "Publicada" : "Borrador"}</span><span>{cdeOptions.find((option) => option.slug === activity.cde_slug)?.label ?? activity.cde_slug}</span><span className="inline-flex items-center gap-1"><CalendarDays size={12} />{dateLabel(activity.event_date)}</span></div><h3 className="mt-3 break-words text-lg font-extrabold text-ink">{activity.title}</h3><p className="mt-1 break-words text-sm text-ink/55">{activity.summary}</p></div><div className="mt-5 flex flex-wrap gap-2 sm:mt-0 sm:shrink-0"><button type="button" onClick={() => setEditing(activity)} className="focus-ring inline-flex items-center gap-2 rounded-full border border-ink/15 px-3 py-2 text-xs font-extrabold text-ink/65 hover:border-secondary/40 hover:text-secondary"><Edit3 size={14} /> Editar</button><button type="button" onClick={() => void updateActivity(activity, "publish")} className="focus-ring inline-flex items-center gap-2 rounded-full border border-ink/15 px-3 py-2 text-xs font-extrabold text-ink/65 hover:border-secondary/40 hover:text-secondary">{activity.is_published ? <EyeOff size={14} /> : <Check size={14} />}{activity.is_published ? "Despublicar" : "Publicar"}</button><button type="button" onClick={() => void updateActivity(activity, "delete")} className="focus-ring inline-flex items-center gap-2 rounded-full border border-primary/20 px-3 py-2 text-xs font-extrabold text-primary hover:bg-primary/10"><Trash2 size={14} /> Eliminar</button></div></article>)}</div>}</section></div>;
}
