"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Eye, EyeOff, LoaderCircle, MailPlus, Save, ShieldCheck, Trash2, UserPlus } from "lucide-react";

const permissionOptions = [
  { key: "blog", label: "Blog" },
  { key: "conecta", label: "Conecta" },
  { key: "activities", label: "Actividades" },
  { key: "instagram", label: "Instagram" },
] as const;
type PermissionKey = (typeof permissionOptions)[number]["key"];
type Permissions = Record<PermissionKey, boolean>;
type AdminUser = { id: string; email: string; display_name: string; permissions: Permissions; is_active: boolean; is_owner: boolean; last_sign_in_at: string | null };
type State = { type: "idle" | "success" | "error"; message: string };

const blankPermissions = (): Permissions => ({ blog: false, conecta: false, activities: false, instagram: false });

export function AdminUserManager() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [newPermissions, setNewPermissions] = useState<Permissions>({ blog: true, conecta: false, activities: false, instagram: false });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [state, setState] = useState<State>({ type: "idle", message: "" });

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/users", { cache: "no-store" });
      const result = await response.json() as AdminUser[] | { message?: string };
      if (!response.ok) throw new Error("message" in result ? result.message : "No se pudieron consultar los usuarios.");
      setUsers(result as AdminUser[]);
    } catch (error) {
      setState({ type: "error", message: error instanceof Error ? error.message : "No se pudieron consultar los usuarios." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadUsers(); }, [loadUsers]);

  function updateUser(id: string, update: Partial<AdminUser>) {
    setUsers((current) => current.map((user) => user.id === id ? { ...user, ...update } : user));
  }

  function updateUserPermission(id: string, key: PermissionKey, value: boolean) {
    setUsers((current) => current.map((user) => user.id === id ? { ...user, permissions: { ...user.permissions, [key]: value } } : user));
  }

  async function createUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreating(true);
    setState({ type: "idle", message: "" });
    try {
      const response = await fetch("/api/admin/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, displayName, permissions: newPermissions }) });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "No se pudo crear el usuario.");
      setEmail("");
      setDisplayName("");
      setNewPermissions({ blog: true, conecta: false, activities: false, instagram: false });
      setState({ type: "success", message: result.message ?? "Usuario creado correctamente." });
      await loadUsers();
    } catch (error) {
      setState({ type: "error", message: error instanceof Error ? error.message : "No se pudo crear el usuario." });
    } finally {
      setCreating(false);
    }
  }

  async function saveUser(user: AdminUser) {
    setSaving(user.id);
    setState({ type: "idle", message: "" });
    try {
      const response = await fetch("/api/admin/users", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: user.id, email: user.email, displayName: user.display_name, permissions: user.permissions, isActive: user.is_active }) });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "No se pudo actualizar el usuario.");
      setState({ type: "success", message: result.message ?? "Permisos actualizados." });
    } catch (error) {
      setState({ type: "error", message: error instanceof Error ? error.message : "No se pudo actualizar el usuario." });
      await loadUsers();
    } finally {
      setSaving(null);
    }
  }

  async function revokeUser(user: AdminUser) {
    if (!window.confirm(`¿Revocar el acceso de ${user.email}? La cuenta de Supabase se conservará.`)) return;
    try {
      const response = await fetch(`/api/admin/users?id=${encodeURIComponent(user.id)}`, { method: "DELETE" });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "No se pudo revocar el acceso.");
      setState({ type: "success", message: result.message ?? "Acceso revocado." });
      await loadUsers();
    } catch (error) {
      setState({ type: "error", message: error instanceof Error ? error.message : "No se pudo revocar el acceso." });
    }
  }

  return <div className="space-y-8"><section className="rounded-[2rem] border border-ink/10 bg-paper p-6 shadow-soft sm:p-10"><div className="flex items-start gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-white"><UserPlus size={23} aria-hidden="true" /></span><div><span className="eyebrow text-primary"><ShieldCheck size={14} /> Sólo propietario</span><h2 className="display-title mt-3 text-4xl leading-[0.95] sm:text-5xl">Invitar a una persona.</h2></div></div><p className="mt-5 max-w-2xl text-sm leading-6 text-ink/60">La persona recibirá un correo para crear su contraseña. Después sólo podrá ver y editar las secciones que marques.</p>{state.type !== "idle" && <p role="status" className={`mt-6 rounded-xl px-4 py-3 text-sm leading-6 ${state.type === "success" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"}`}>{state.message}</p>}<form onSubmit={createUser} className="mt-8 grid gap-5 md:grid-cols-2"><label className="block text-sm font-bold text-ink">Nombre<input required value={displayName} onChange={(event) => setDisplayName(event.target.value)} maxLength={120} className="focus-ring mt-2 h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 text-base outline-none sm:text-sm" placeholder="Nombre de la persona" /></label><label className="block text-sm font-bold text-ink">Correo<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="focus-ring mt-2 h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 text-base outline-none sm:text-sm" placeholder="persona@ejemplo.com" /></label><fieldset className="md:col-span-2"><legend className="text-sm font-bold text-ink">Permisos iniciales</legend><div className="mt-3 grid gap-3 sm:grid-cols-4">{permissionOptions.map(({ key, label }) => <label key={key} className="flex items-center gap-3 rounded-xl border border-ink/10 bg-mist px-4 py-3 text-sm font-bold text-ink/75"><input type="checkbox" checked={newPermissions[key]} onChange={(event) => setNewPermissions((current) => ({ ...current, [key]: event.target.checked }))} className="h-4 w-4 accent-primary" />{label}</label>)}</div></fieldset><button type="submit" disabled={creating} className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60 md:w-fit">{creating ? <LoaderCircle className="animate-spin" size={16} /> : <MailPlus size={16} />}{creating ? "Enviando…" : "Enviar invitación"}</button></form></section><section><div className="flex items-end justify-between gap-4"><div><span className="eyebrow text-secondary">Accesos actuales</span><h2 className="display-title mt-3 text-4xl leading-none sm:text-5xl">Permisos por usuario.</h2></div><span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-extrabold text-secondary">{users.length}</span></div>{loading ? <div className="mt-6 flex items-center gap-2 rounded-2xl border border-ink/10 bg-paper p-6 text-sm text-ink/55"><LoaderCircle className="animate-spin" size={17} /> Cargando usuarios…</div> : users.length === 0 ? <div className="mt-6 rounded-2xl border border-dashed border-ink/20 bg-paper p-8 text-sm text-ink/55">Todavía no hay cuentas de Supabase registradas.</div> : <div className="mt-6 space-y-4">{users.map((user) => { const isSaving = saving === user.id; return <article key={user.id} className="rounded-[2rem] border border-ink/10 bg-paper p-6 shadow-card sm:p-7"><div className="flex flex-wrap items-start justify-between gap-4"><div><div className="flex flex-wrap items-center gap-2"><h3 className="break-all text-lg font-extrabold text-ink">{user.display_name || user.email}</h3>{user.is_owner && <span className="rounded-full bg-accent/30 px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-ink/65">Propietario</span>}{!user.is_active && <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-primary">Desactivado</span>}</div><p className="mt-1 break-all text-sm text-ink/55">{user.email}</p></div>{user.is_owner ? <span className="inline-flex items-center gap-2 text-sm font-bold text-secondary"><Eye size={16} /> Acceso total</span> : <label className="inline-flex items-center gap-2 text-sm font-bold text-ink/65"><input type="checkbox" checked={user.is_active} onChange={(event) => updateUser(user.id, { is_active: event.target.checked })} className="h-4 w-4 accent-secondary" /> Usuario activo</label>}</div>{user.is_owner ? <p className="mt-6 rounded-2xl bg-mist px-4 py-3 text-sm leading-6 text-ink/65">Tu cuenta tiene acceso total y no puede ser modificada desde este panel.</p> : <><fieldset className="mt-6"><legend className="text-sm font-bold text-ink">Permisos</legend><div className="mt-3 grid gap-3 sm:grid-cols-4">{permissionOptions.map(({ key, label }) => <label key={key} className="flex items-center gap-3 rounded-xl border border-ink/10 bg-mist px-4 py-3 text-sm font-bold text-ink/75"><input type="checkbox" checked={user.permissions[key]} onChange={(event) => updateUserPermission(user.id, key, event.target.checked)} className="h-4 w-4 accent-primary" />{label}</label>)}</div></fieldset><div className="mt-6 flex flex-wrap gap-3"><button type="button" onClick={() => void saveUser(user)} disabled={isSaving} className="focus-ring inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-extrabold text-white disabled:cursor-wait disabled:opacity-60">{isSaving ? <LoaderCircle className="animate-spin" size={16} /> : <Save size={16} />}{isSaving ? "Guardando…" : "Guardar permisos"}</button><button type="button" onClick={() => void revokeUser(user)} className="focus-ring inline-flex items-center gap-2 rounded-full border border-primary/20 px-4 py-3 text-sm font-extrabold text-primary hover:bg-primary/10"><Trash2 size={16} /> Revocar acceso</button></div></>}</article>; })}</div>}</section>{state.type === "success" && <p className="inline-flex items-center gap-2 text-sm font-bold text-secondary"><Check size={16} /> Los cambios quedaron guardados.</p>}</div>;
}
