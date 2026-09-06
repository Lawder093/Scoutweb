"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { Check, ImagePlus, LoaderCircle, Phone, UserPlus, UserRoundX } from "lucide-react";

type ConectaUser = {
  id: string;
  name: string;
  phone: string | null;
  photo_url: string | null;
  cde_slug: string | null;
  community: string | null;
  is_active: boolean;
  created_at: string;
};

type State = { type: "idle" | "success" | "error"; message: string };

const cdeOptions = [
  { slug: "mexico", label: "México" },
  { slug: "colombia", label: "Colombia" },
  { slug: "argentina", label: "Argentina" },
];

const communityOptions = ["Ronda", "Manada", "Tropa", "Iris", "Clan"];

function dateLabel(value: string): string {
  return new Intl.DateTimeFormat("es-MX", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(value));
}

function cdeLabel(slug: string | null): string {
  return cdeOptions.find((option) => option.slug === slug)?.label ?? slug ?? "Sin CDE";
}

function initials(name: string): string {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

export function ConectaUsersManager() {
  const [users, setUsers] = useState<ConectaUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [state, setState] = useState<State>({ type: "idle", message: "" });

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/conecta", { cache: "no-store" });
      const result = await response.json() as ConectaUser[] | { message?: string };
      if (!response.ok) throw new Error("message" in result ? result.message : "No se pudieron consultar los scouts.");
      setUsers(result as ConectaUser[]);
    } catch (error) {
      setState({ type: "error", message: error instanceof Error ? error.message : "No se pudieron consultar los scouts." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadUsers(); }, [loadUsers]);

  async function createUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setState({ type: "idle", message: "" });
    const form = event.currentTarget;
    try {
      const response = await fetch("/api/admin/conecta", { method: "POST", body: new FormData(form) });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "No se pudo crear el scout.");
      form.reset();
      setState({ type: "success", message: result.message ?? "Scout pre-registrado correctamente." });
      await loadUsers();
    } catch (error) {
      setState({ type: "error", message: error instanceof Error ? error.message : "No se pudo crear el scout." });
    } finally {
      setSaving(false);
    }
  }

  async function toggleUser(user: ConectaUser) {
    try {
      const response = await fetch("/api/admin/conecta", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: user.id, isActive: !user.is_active }) });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "No se pudo actualizar el scout.");
      setState({ type: "success", message: result.message ?? "Scout actualizado." });
      await loadUsers();
    } catch (error) {
      setState({ type: "error", message: error instanceof Error ? error.message : "No se pudo actualizar el scout." });
    }
  }

  async function deleteUser(user: ConectaUser) {
    if (!window.confirm(`¿Eliminar a ${user.name}? Esta acción no se puede deshacer.`)) return;
    try {
      const response = await fetch(`/api/admin/conecta?id=${encodeURIComponent(user.id)}`, { method: "DELETE" });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "No se pudo eliminar el scout.");
      setState({ type: "success", message: result.message ?? "Scout eliminado." });
      await loadUsers();
    } catch (error) {
      setState({ type: "error", message: error instanceof Error ? error.message : "No se pudo eliminar el scout." });
    }
  }

  return (
    <div className="grid gap-7 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
      <section className="rounded-[2rem] border border-ink/10 bg-paper p-6 shadow-soft sm:p-8">
        <span className="eyebrow text-primary"><UserPlus size={14} /> Pre-registro privado</span>
        <h2 className="display-title mt-4 text-4xl leading-none">Crear acceso.</h2>
        <p className="mt-4 text-sm leading-6 text-ink/60">El scout usará su teléfono para pedir un código. Durante este prototipo el código se muestra en la pantalla; después se enviará por WhatsApp.</p>
        <form onSubmit={createUser} className="mt-8 space-y-5">
          <label className="block text-sm font-bold text-ink">Nombre completo<input required name="name" minLength={2} maxLength={120} className="focus-ring mt-2 h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 text-base outline-none sm:text-sm" placeholder="Nombre del scout" /></label>
          <label className="block text-sm font-bold text-ink"><span className="inline-flex items-center gap-2"><Phone size={15} /> Teléfono con lada</span><input required name="phone" inputMode="tel" maxLength={30} className="focus-ring mt-2 h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 text-base outline-none sm:text-sm" placeholder="+52 222 000 0000" /></label>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-bold text-ink">CDE<select required name="cdeSlug" defaultValue="" className="focus-ring mt-2 h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 text-base outline-none sm:text-sm"><option value="" disabled>Selecciona</option>{cdeOptions.map((option) => <option key={option.slug} value={option.slug}>{option.label}</option>)}</select></label>
            <label className="block text-sm font-bold text-ink">Comunidad<select required name="community" defaultValue="" className="focus-ring mt-2 h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 text-base outline-none sm:text-sm"><option value="" disabled>Selecciona</option>{communityOptions.map((community) => <option key={community} value={community}>{community}</option>)}</select></label>
          </div>
          <label className="block text-sm font-bold text-ink"><span className="inline-flex items-center gap-2"><ImagePlus size={15} /> Fotografía <span className="font-normal text-ink/45">(opcional)</span></span><input name="image" type="file" accept="image/jpeg,image/png,image/webp" className="focus-ring mt-2 block w-full rounded-xl border border-dashed border-ink/20 bg-mist/40 px-3 py-3 text-sm text-ink/65 file:mr-3 file:rounded-full file:border-0 file:bg-secondary/10 file:px-3 file:py-2 file:text-xs file:font-extrabold file:text-secondary" /><span className="mt-2 block text-xs font-normal text-ink/45">JPG, PNG o WebP · máximo 5 MB.</span></label>
          <label className="flex items-center gap-3 text-sm font-bold text-ink"><input name="isActive" type="checkbox" defaultChecked className="h-4 w-4 accent-primary" /> Acceso activo</label>
          {state.type !== "idle" && <p role="status" className={`rounded-xl px-4 py-3 text-sm leading-6 ${state.type === "success" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"}`}>{state.message}</p>}
          <button type="submit" disabled={saving} className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"><UserPlus size={16} />{saving ? "Guardando…" : "Pre-registrar scout"}</button>
        </form>
      </section>

      <section className="rounded-[2rem] border border-ink/10 bg-paper p-6 shadow-soft sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><span className="eyebrow text-secondary">Accesos de Conecta</span><h2 className="display-title mt-4 text-4xl leading-none">Scouts registrados.</h2></div><span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-extrabold text-secondary">{users.length}</span></div>
        {loading ? <div className="mt-8 flex items-center gap-2 text-sm text-ink/55"><LoaderCircle className="animate-spin" size={17} /> Cargando scouts…</div> : users.length === 0 ? <div className="mt-8 rounded-2xl border border-dashed border-ink/20 p-8 text-sm text-ink/55">Todavía no hay scouts pre-registrados.</div> : <div className="mt-8 space-y-3">{users.map((user) => <article key={user.id} className="rounded-2xl border border-ink/10 p-4 sm:flex sm:items-center sm:justify-between sm:gap-4"><div className="flex min-w-0 items-center gap-3"><div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-secondary/10 text-xs font-extrabold text-secondary">{user.photo_url ? <img src={user.photo_url} alt="" className="h-full w-full object-cover" /> : initials(user.name)}</div><div className="min-w-0"><div className="flex items-center gap-2"><span className={`h-2.5 w-2.5 shrink-0 rounded-full ${user.is_active ? "bg-secondary" : "bg-ink/25"}`} /><h3 className="truncate font-extrabold text-ink">{user.name}</h3></div><p className="mt-1 truncate text-xs text-ink/55">{user.phone ?? "Sin teléfono"} · {cdeLabel(user.cde_slug)} · {user.community ?? "Sin comunidad"}</p><p className="mt-1 text-xs text-ink/40">Creado el {dateLabel(user.created_at)} · {user.is_active ? "Activo" : "Inactivo"}</p></div></div><div className="mt-4 flex flex-wrap gap-2 sm:mt-0 sm:shrink-0"><button type="button" onClick={() => void toggleUser(user)} className="focus-ring inline-flex items-center gap-2 rounded-full border border-ink/15 px-3 py-2 text-xs font-extrabold text-ink/65 hover:border-secondary/40 hover:text-secondary">{user.is_active ? <UserRoundX size={14} /> : <Check size={14} />}{user.is_active ? "Desactivar" : "Activar"}</button><button type="button" onClick={() => void deleteUser(user)} className="focus-ring rounded-full border border-primary/20 px-3 py-2 text-xs font-extrabold text-primary hover:bg-primary/10">Eliminar</button></div></article>)}</div>}
      </section>
    </div>
  );
}
