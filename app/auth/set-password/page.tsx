"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, LoaderCircle } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function SetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    void supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.replace("/login");
      setLoading(false);
    });
  }, [router]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (password.length < 8) return setError("La contraseña debe tener al menos 8 caracteres.");
    if (password !== confirmation) return setError("Las contraseñas no coinciden.");
    setSaving(true);
    const supabase = createSupabaseBrowserClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return <main className="paper-grain flex min-h-screen items-center justify-center bg-mist px-4 py-12 sm:px-6"><section className="w-full max-w-md rounded-[2rem] border border-ink/10 bg-paper p-7 shadow-soft sm:p-10"><span className="eyebrow text-primary"><KeyRound size={14} /> Nueva contraseña</span><h1 className="display-title mt-5 text-5xl leading-[0.9]">Activa tu<br /><span className="text-primary">acceso.</span></h1><p className="mt-5 text-base leading-7 text-ink/65">Crea una contraseña para entrar al panel con los permisos que te asignó el propietario.</p>{loading ? <div className="mt-8 flex items-center gap-2 text-sm text-ink/55"><LoaderCircle className="animate-spin" size={17} /> Verificando invitación…</div> : <form onSubmit={submit} className="mt-8 space-y-5"><label className="block text-sm font-bold text-ink">Contraseña<input required minLength={8} type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="focus-ring mt-2 h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 text-base outline-none sm:text-sm" /></label><label className="block text-sm font-bold text-ink">Repite la contraseña<input required minLength={8} type="password" autoComplete="new-password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} className="focus-ring mt-2 h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 text-base outline-none sm:text-sm" /></label>{error && <p role="alert" className="rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm leading-6 text-primary">{error}</p>}<button type="submit" disabled={saving} className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-extrabold text-white disabled:cursor-wait disabled:opacity-60">{saving && <LoaderCircle className="animate-spin" size={17} />}Guardar contraseña</button></form>}</section></main>;
}
