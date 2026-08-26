"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, KeyRound, Mail } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const nextPath = searchParams.get("next")?.startsWith("/") ? searchParams.get("next")! : "/admin/blog";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;
      router.replace(nextPath);
      router.refresh();
    } catch (signInError) {
      setError(signInError instanceof Error ? signInError.message : "No pudimos iniciar sesión.");
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <label className="block text-sm font-bold text-ink">
        Correo electrónico
        <span className="relative mt-2 block">
          <Mail size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" aria-hidden="true" />
          <input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="focus-ring h-12 w-full rounded-xl border border-ink/15 bg-paper pl-10 pr-3 text-base outline-none sm:text-sm" />
        </span>
      </label>
      <label className="block text-sm font-bold text-ink">
        Contraseña
        <span className="relative mt-2 block">
          <KeyRound size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" aria-hidden="true" />
          <input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="focus-ring h-12 w-full rounded-xl border border-ink/15 bg-paper pl-10 pr-3 text-base outline-none sm:text-sm" />
        </span>
      </label>
      {error && <p role="alert" className="rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm leading-6 text-primary">{error}</p>}
      <button type="submit" disabled={isLoading} className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60">
        {isLoading ? "Entrando…" : "Iniciar sesión"} <ArrowRight size={17} aria-hidden="true" />
      </button>
      <Link href="/" className="focus-ring mx-auto flex w-fit rounded-lg text-sm font-bold text-secondary hover:text-primary">Volver al sitio</Link>
    </form>
  );
}
