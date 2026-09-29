import type { Metadata } from "next";
import { ArrowUpRight, HeartHandshake, Mail, MessageCircle, ShieldCheck } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { institutionalContact } from "@/content/contact";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Donación",
  description: "Apoya el trabajo educativo y comunitario de la Comunidad Crítica de Escultismo Popular.",
  path: "/donacion",
});

export default function DonacionPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-paper">
        <section className="bg-ink px-4 pb-16 pt-32 text-white sm:px-6 sm:pb-24 sm:pt-40">
          <div className="mx-auto max-w-[1180px]">
            <div className="flex items-center gap-3 text-accent"><HeartHandshake size={20} aria-hidden="true" /><span className="eyebrow text-accent">Apoya el proyecto</span></div>
            <h1 className="display-title mt-7 max-w-4xl text-5xl leading-[0.92] sm:text-7xl">Tu donación mantiene la comunidad en movimiento.</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">Cada aportación ayuda a sostener actividades educativas, materiales y procesos comunitarios de la Comunidad Crítica de Escultismo Popular.</p>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-[980px] gap-5 lg:grid-cols-[1.1fr_.9fr]">
            <div className="rounded-[2.25rem] bg-secondary p-7 text-white shadow-soft sm:p-10">
              <div className="flex items-center gap-3 text-accent"><HeartHandshake size={21} aria-hidden="true" /><span className="eyebrow text-accent">Donación electrónica</span></div>
              <h2 className="display-title mt-7 text-4xl leading-none sm:text-5xl">Haz tu aportación por transferencia.</h2>
              <p className="mt-6 max-w-xl text-sm leading-7 text-white/70">Escríbenos para recibir los datos de transferencia actualizados, confirmar la recepción de tu aportación y solicitar la información fiscal que corresponda.</p>
              <TrackedLink eventName="contact_email_click" eventParams={{ location: "donacion", source: "primary_cta" }} href={`mailto:${institutionalContact.email}?subject=Quiero%20donar`} className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-extrabold text-ink transition-transform hover:-translate-y-1">Solicitar datos para donar <ArrowUpRight size={16} /></TrackedLink>
            </div>

            <div className="rounded-[2.25rem] bg-accent p-7 shadow-card sm:p-10">
              <div className="flex items-center gap-3 text-ink"><HeartHandshake size={21} aria-hidden="true" /><span className="eyebrow text-ink">También puedes ayudar</span></div>
              <h2 className="display-title mt-7 text-4xl leading-none">Apadrina un proceso.</h2>
              <p className="mt-6 text-sm leading-7 text-ink/70">Las personas físicas y morales también pueden donar en dinero o en especie a nuestras causas y proyectos.</p>
              <TrackedLink eventName="click_whatsapp" eventParams={{ location: "donacion", source: "secondary_cta" }} href={institutionalContact.whatsappUrl} target="_blank" rel="noreferrer" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-extrabold text-white transition-transform hover:-translate-y-1">Hablar por WhatsApp <MessageCircle size={16} /></TrackedLink>
            </div>
          </div>

          <div className="mx-auto mt-5 grid max-w-[980px] gap-5 md:grid-cols-2">
            <div className="rounded-[2rem] border border-ink/10 bg-white p-7 shadow-card sm:p-9">
              <div className="flex items-center gap-3 text-primary"><Mail size={20} aria-hidden="true" /><span className="eyebrow">Contacto</span></div>
              <h2 className="display-title mt-6 text-3xl leading-none sm:text-4xl">Resolvemos tus dudas.</h2>
              <p className="mt-5 text-sm leading-7 text-ink/65">Para confirmar una donación, solicitar un recibo o conocer nuestros proyectos:</p>
              <TrackedLink eventName="contact_email_click" eventParams={{ location: "donacion", source: "contact_card" }} href={`mailto:${institutionalContact.email}`} className="focus-ring mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-secondary hover:text-primary"><Mail size={16} />{institutionalContact.email}</TrackedLink>
              <TrackedLink eventName="click_whatsapp" eventParams={{ location: "donacion", source: "contact_card" }} href={institutionalContact.whatsappUrl} target="_blank" rel="noreferrer" className="focus-ring mt-4 flex items-center gap-2 text-sm font-extrabold text-secondary hover:text-primary"><MessageCircle size={16} />Abrir WhatsApp</TrackedLink>
            </div>

            <div className="rounded-[2rem] border border-ink/10 bg-mist p-7 sm:p-9">
              <div className="flex items-center gap-3 text-primary"><ShieldCheck size={20} aria-hidden="true" /><span className="eyebrow">Transparencia</span></div>
              <h2 className="display-title mt-6 text-3xl leading-none sm:text-4xl">Donar con claridad.</h2>
              <p className="mt-5 text-sm leading-7 text-ink/65">Consulta la información institucional, fiscal y legal de nuestra asociación en la página de donataria.</p>
              <a href="/legal/donataria-donaciones" className="focus-ring mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-secondary hover:text-primary">Ver información legal <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
