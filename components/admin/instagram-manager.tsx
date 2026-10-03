"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Eye, EyeOff, Instagram, LoaderCircle, Save } from "lucide-react";

export type AdminInstagramCDEOption = { slug: string; label: string; country: string };
type AdminInstagramLink = { cde_slug: string; instagram_url: string; is_published: boolean };
type Draft = { instagramUrl: string; isPublished: boolean };
type State = { type: "idle" | "success" | "error"; message: string };

function initialDrafts(options: AdminInstagramCDEOption[], links: AdminInstagramLink[]): Record<string, Draft> {
  const saved = new Map(links.map((link) => [link.cde_slug, link]));
  return Object.fromEntries(options.map((option) => {
    const link = saved.get(option.slug);
    return [option.slug, { instagramUrl: link?.instagram_url ?? "", isPublished: link?.is_published ?? false }];
  }));
}

export function InstagramManager({ cdeOptions }: { cdeOptions: AdminInstagramCDEOption[] }) {
  const [drafts, setDrafts] = useState<Record<string, Draft>>(() => initialDrafts(cdeOptions, []));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [state, setState] = useState<State>({ type: "idle", message: "" });

  const loadLinks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/instagram", { cache: "no-store" });
      const result = await response.json() as AdminInstagramLink[] | { message?: string };
      if (!response.ok) throw new Error("message" in result ? result.message : "No se pudieron consultar los enlaces.");
      setDrafts(initialDrafts(cdeOptions, result as AdminInstagramLink[]));
    } catch (error) {
      setState({ type: "error", message: error instanceof Error ? error.message : "No se pudieron consultar los enlaces." });
    } finally {
      setLoading(false);
    }
  }, [cdeOptions]);

  useEffect(() => { void loadLinks(); }, [loadLinks]);

  function updateDraft(slug: string, update: Partial<Draft>) {
    setDrafts((current) => ({ ...current, [slug]: { ...current[slug], ...update } }));
  }

  async function saveLink(slug: string) {
    const draft = drafts[slug];
    if (!draft) return;
    setSaving(slug);
    setState({ type: "idle", message: "" });
    try {
      const response = await fetch("/api/admin/instagram", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ cdeSlug: slug, instagramUrl: draft.instagramUrl, isPublished: draft.isPublished }) });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "No se pudo guardar el enlace.");
      setState({ type: "success", message: result.message ?? "Enlace guardado correctamente." });
      await loadLinks();
    } catch (error) {
      setState({ type: "error", message: error instanceof Error ? error.message : "No se pudo guardar el enlace." });
    } finally {
      setSaving(null);
    }
  }

  return <div className="space-y-8"><section className="rounded-[2rem] border border-ink/10 bg-paper p-6 shadow-soft sm:p-10"><div className="flex items-start gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-white"><Instagram size={23} aria-hidden="true" /></span><div><span className="eyebrow text-primary">Publicación destacada</span><h2 className="display-title mt-3 text-4xl leading-[0.95] sm:text-5xl">Un enlace por CDE.</h2></div></div><p className="mt-5 max-w-2xl text-sm leading-6 text-ink/60">Pega el enlace de una publicación, reel o video de Instagram. Cuando marques “Mostrar en el sitio”, aparecerá en la página principal. Puedes cambiarlo cuando quieras.</p>{state.type !== "idle" && <p role="status" className={`mt-6 rounded-xl px-4 py-3 text-sm leading-6 ${state.type === "success" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"}`}>{state.message}</p>}</section>{loading ? <div className="flex items-center gap-2 rounded-2xl border border-ink/10 bg-paper p-6 text-sm text-ink/55"><LoaderCircle className="animate-spin" size={17} /> Cargando enlaces…</div> : <div className="grid gap-6 lg:grid-cols-3">{cdeOptions.map((option) => { const draft = drafts[option.slug] ?? { instagramUrl: "", isPublished: false }; const isSaving = saving === option.slug; return <article key={option.slug} className="rounded-[2rem] border border-ink/10 bg-paper p-6 shadow-card"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink/45">{option.country}</p><h3 className="mt-2 break-words text-xl font-extrabold leading-tight">{option.label}</h3></div><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${draft.isPublished ? "bg-secondary/10 text-secondary" : "bg-ink/5 text-ink/40"}`}>{draft.isPublished ? <Eye size={18} aria-hidden="true" /> : <EyeOff size={18} aria-hidden="true" />}</span></div><label className="mt-7 block text-sm font-bold text-ink">Enlace de Instagram<input type="url" value={draft.instagramUrl} onChange={(event) => updateDraft(option.slug, { instagramUrl: event.target.value })} className="focus-ring mt-2 h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 text-base outline-none sm:text-sm" placeholder="https://www.instagram.com/p/..." /></label><label className="mt-5 flex items-start gap-3 rounded-2xl border border-ink/10 bg-mist p-4 text-sm leading-6 text-ink/75"><input type="checkbox" checked={draft.isPublished} onChange={(event) => updateDraft(option.slug, { isPublished: event.target.checked })} className="mt-1 h-4 w-4 accent-primary" /><span><strong className="text-ink">Mostrar en el sitio.</strong><span className="mt-1 block text-xs text-ink/50">Desactívalo para ocultarlo sin borrar el enlace.</span></span></label><button type="button" onClick={() => void saveLink(option.slug)} disabled={isSaving} className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3.5 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60">{isSaving ? <LoaderCircle className="animate-spin" size={16} /> : <Save size={16} />}{isSaving ? "Guardando…" : "Guardar enlace"}</button></article>; })}</div>}{state.type === "success" && <p className="inline-flex items-center gap-2 text-sm font-bold text-secondary"><Check size={16} /> La página principal se actualiza al guardar.</p>}</div>;
}
