import type { Metadata } from "next";
import Image from "next/image";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <main className="paper-grain flex min-h-screen items-center justify-center bg-mist px-4 py-12 sm:px-6">
      <section className="w-full max-w-md rounded-[2rem] border border-ink/10 bg-paper p-7 shadow-soft sm:p-10">
        <Image src="/images/ccep-logo-horizontal.png" alt="Comunidad Crítica de Escultismo Popular" width={315} height={108} className="h-12 w-auto" />
        <span className="eyebrow mt-10 text-primary">Área editorial</span>
        <h1 className="display-title mt-5 text-5xl leading-[0.9]">Entrar para<br /><span className="text-primary">publicar.</span></h1>
        <p className="mt-5 text-base leading-7 text-ink/65">Accede con tu cuenta autorizada para crear y publicar entradas en el blog.</p>
        <LoginForm />
      </section>
    </main>
  );
}
