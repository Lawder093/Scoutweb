"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Keep the boundary silent in production; the framework reports the digest.
    void error;
  }, [error]);

  return (
    <main className="section-shell flex min-h-screen items-center py-24">
      <div className="max-w-xl">
        <span className="eyebrow text-primary">Algo salió mal</span>
        <h1 className="display-title mt-6 break-words text-5xl leading-[0.9] sm:text-8xl">Volvamos a intentarlo.</h1>
        <p className="mt-7 text-lg leading-8 text-ink/65">No pudimos cargar este contenido. Puedes reintentar o regresar al inicio.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <button type="button" onClick={() => reset()} className="focus-ring rounded-full bg-primary px-5 py-3 text-sm font-bold text-white">Reintentar</button>
          <Link href="/" className="focus-ring rounded-full border border-ink/15 px-5 py-3 text-sm font-bold text-ink">Ir al inicio</Link>
        </div>
      </div>
    </main>
  );
}
