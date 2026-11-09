"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, KeyRound, LoaderCircle, LockKeyhole, Phone } from "lucide-react";

type State = { type: "idle" | "error"; message: string };

export function ConectaLogin() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<State>({ type: "idle", message: "" });

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setState({ type: "idle", message: "" });
    try {
      const response = await fetch("/api/conecta/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ phone, password }) });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "No se pudo iniciar sesión.");
      window.location.href = "/conecta";
    } catch (error) {
      setState({ type: "error", message: error instanceof Error ? error.message : "No se pudo iniciar sesión." });
    } finally {
      setLoading(false);
    }
  }

  return <section className="section-shell flex min-h-[calc(100dvh-13rem)] items-center justify-center py-20"><div className="w-full max-w-xl rounded-[2rem] border border-secondary/20 bg-paper p-7 shadow-soft sm:p-10"><span className="eyebrow text-secondary"><LockKeyhole size={14} /> Acceso para postales</span><h1 className="display-title mt-5 text-5xl leading-[0.92] sm:text-7xl">Conecta.</h1><p className="mt-5 max-w-md text-base leading-7 text-ink/65">Entra con el teléfono y la contraseña que te asignó el administrador de tu área para enviar una postal a la comunidad scout.</p><form onSubmit={login} className="mt-9 space-y-5"><label className="block text-sm font-extrabold text-ink"><span className="inline-flex items-center gap-2"><Phone size={16} /> Número de teléfono con lada</span><input required value={phone} onChange={(event) => setPhone(event.target.value)} inputMode="tel" autoComplete="tel" className="focus-ring mt-2 h-14 w-full rounded-2xl border border-ink/15 bg-paper px-4 text-base outline-none" placeholder="+52 222 000 0000" /></label><label className="block text-sm font-extrabold text-ink"><span className="inline-flex items-center gap-2"><KeyRound size={16} /> Contraseña</span><input required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="current-password" className="focus-ring mt-2 h-14 w-full rounded-2xl border border-ink/15 bg-paper px-4 text-base outline-none" placeholder="La contraseña asignada" /></label>{state.type === "error" && <p role="alert" className="rounded-xl bg-primary/10 px-4 py-3 text-sm leading-6 text-primary">{state.message}</p>}<button type="submit" disabled={loading} className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-5 py-4 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60">{loading ? <LoaderCircle className="animate-spin" size={17} /> : <ArrowRight size={17} />}{loading ? "Entrando…" : "Entrar a Conecta"}</button></form></div></section>;
}
