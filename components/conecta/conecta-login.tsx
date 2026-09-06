"use client";

import { FormEvent, useState } from "react";
import { ArrowLeft, ArrowRight, KeyRound, LoaderCircle, LockKeyhole, Phone } from "lucide-react";

type State = { type: "idle" | "success" | "error"; message: string };

export function ConectaLogin() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [prototypeCode, setPrototypeCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<State>({ type: "idle", message: "" });

  async function requestCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setState({ type: "idle", message: "" });
    try {
      const response = await fetch("/api/conecta/auth/request-code", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ phone }) });
      const result = await response.json() as { message?: string; prototypeCode?: string };
      if (!response.ok) throw new Error(result.message ?? "No se pudo generar el código.");
      setPrototypeCode(result.prototypeCode ?? null);
      setStep("code");
      setState({ type: "success", message: result.message ?? "Revisa el código de acceso." });
    } catch (error) {
      setState({ type: "error", message: error instanceof Error ? error.message : "No se pudo generar el código." });
    } finally {
      setLoading(false);
    }
  }

  async function verifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setState({ type: "idle", message: "" });
    try {
      const response = await fetch("/api/conecta/auth/verify-code", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ phone, code }) });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "No se pudo verificar el código.");
      window.location.href = "/conecta";
    } catch (error) {
      setState({ type: "error", message: error instanceof Error ? error.message : "No se pudo verificar el código." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section-shell flex min-h-[calc(100dvh-13rem)] items-center justify-center py-20">
      <div className="w-full max-w-xl rounded-[2rem] border border-secondary/20 bg-paper p-7 shadow-soft sm:p-10">
        <span className="eyebrow text-secondary"><LockKeyhole size={14} /> Acceso privado</span>
        <h1 className="display-title mt-5 text-5xl leading-[0.92] sm:text-7xl">Conecta.</h1>
        <p className="mt-5 max-w-md text-base leading-7 text-ink/65">Un espacio común para los scouts de México, Colombia y Argentina. El acceso sólo funciona con un número pre-registrado por la administración.</p>

        {step === "phone" ? <form onSubmit={requestCode} className="mt-9 space-y-5"><label className="block text-sm font-extrabold text-ink"><span className="inline-flex items-center gap-2"><Phone size={16} /> Número de teléfono con lada</span><input required value={phone} onChange={(event) => setPhone(event.target.value)} inputMode="tel" autoComplete="tel" className="focus-ring mt-2 h-14 w-full rounded-2xl border border-ink/15 bg-paper px-4 text-base outline-none" placeholder="+52 222 000 0000" /></label><p className="text-xs leading-5 text-ink/50">No necesitas crear una contraseña. Tu sesión se cerrará automáticamente después de un día.</p>{state.type !== "idle" && <p role="status" className={`rounded-xl px-4 py-3 text-sm leading-6 ${state.type === "success" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"}`}>{state.message}</p>}<button type="submit" disabled={loading} className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-5 py-4 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60">{loading ? <LoaderCircle className="animate-spin" size={17} /> : <ArrowRight size={17} />}{loading ? "Generando código…" : "Solicitar código"}</button></form> : <form onSubmit={verifyCode} className="mt-9 space-y-5"><div className="rounded-2xl bg-secondary/10 p-4 text-sm leading-6 text-secondary"><p className="font-extrabold">Código solicitado para {phone}</p><p className="mt-1">{state.type === "success" ? state.message : "Escribe el código de seis dígitos para continuar."}</p></div>{prototypeCode && <div className="rounded-2xl border border-accent/50 bg-accent/15 p-5 text-center"><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-ink/60">Modo prototipo · código de prueba</p><p className="mt-2 font-mono text-4xl font-black tracking-[0.25em] text-ink">{prototypeCode}</p><p className="mt-2 text-xs text-ink/55">En la siguiente etapa este código llegará por WhatsApp.</p></div>}<label className="block text-sm font-extrabold text-ink"><span className="inline-flex items-center gap-2"><KeyRound size={16} /> Código de acceso</span><input required value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} className="focus-ring mt-2 h-14 w-full rounded-2xl border border-ink/15 bg-paper px-4 text-center font-mono text-2xl tracking-[0.35em] outline-none" placeholder="000000" /></label>{state.type === "error" && <p role="alert" className="rounded-xl bg-primary/10 px-4 py-3 text-sm leading-6 text-primary">{state.message}</p>}<button type="submit" disabled={loading || code.length !== 6} className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-5 py-4 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60">{loading ? <LoaderCircle className="animate-spin" size={17} /> : <LockKeyhole size={17} />}{loading ? "Verificando…" : "Entrar a Conecta"}</button><button type="button" onClick={() => { setStep("phone"); setCode(""); setPrototypeCode(null); setState({ type: "idle", message: "" }); }} className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-sm font-extrabold text-ink/65 hover:border-secondary/40 hover:text-secondary"><ArrowLeft size={16} /> Cambiar número</button></form>}
      </div>
    </section>
  );
}
