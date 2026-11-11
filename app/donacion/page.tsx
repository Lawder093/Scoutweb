import type { Metadata } from "next";
import { ArrowUpRight, HeartHandshake, Mail, MessageCircle, ShieldCheck } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { ActivityMosaicCarousel } from "@/components/donation/activity-mosaic-carousel";
import { institutionalContact } from "@/content/contact";
import { pageMetadata } from "@/lib/seo";

const paypalDonationUrl = "https://www.paypal.com/ncp/payment/GJQBV668ZBNJC";

export const metadata: Metadata = pageMetadata({
  title: "Donación",
  description: "Apoya el trabajo educativo y comunitario de la Comunidad Crítica de Escultismo Popular.",
  path: "/donacion",
});

export default function DonacionPage() {
  return (
    <>
      <SiteHeader />
      <main id="contenido-principal" tabIndex={-1} className="min-h-screen bg-paper">
        <section className="bg-ink px-4 pb-16 pt-32 text-white sm:px-6 sm:pb-24 sm:pt-40">
          <div className="mx-auto max-w-[1180px]">
            <div className="flex items-center gap-3 text-accent"><HeartHandshake size={20} aria-hidden="true" /><span className="eyebrow text-accent">Apoya el proyecto</span></div>
            <h1 className="display-title mt-7 max-w-4xl text-5xl leading-[0.92] sm:text-7xl">Tu donación mantiene la comunidad en movimiento</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">Cada aportación ayuda a sostener actividades educativas, materiales y procesos comunitarios de la Comunidad Crítica de Escultismo Popular.</p>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 sm:py-20">
          <div className="mx-auto mt-5 grid max-w-[980px] gap-5 md:grid-cols-2">
            <div className="rounded-[2rem] border border-ink/10 bg-white p-7 shadow-card sm:p-9">
              <div className="flex items-center gap-3 text-primary"><Mail size={20} aria-hidden="true" /><span className="eyebrow">Contacto</span></div>
              <h2 className="display-title mt-6 text-3xl leading-none sm:text-4xl">Resolvemos tus dudas</h2>
              <p className="mt-5 text-sm leading-7 text-ink/65">Para confirmar una donación, solicitar un recibo o conocer nuestros proyectos:</p>
              <TrackedLink eventName="contact_email_click" eventParams={{ location: "donacion", source: "contact_card" }} href={`mailto:${institutionalContact.email}`} className="focus-ring mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-secondary hover:text-primary"><Mail size={16} />{institutionalContact.email}</TrackedLink>
              <TrackedLink eventName="click_whatsapp" eventParams={{ location: "donacion", source: "contact_card" }} href={institutionalContact.whatsappUrl} target="_blank" rel="noreferrer" className="focus-ring mt-4 flex items-center gap-2 text-sm font-extrabold text-secondary hover:text-primary"><MessageCircle size={16} />Abrir WhatsApp</TrackedLink>
            </div>

            <div className="rounded-[2rem] border border-ink/10 bg-mist p-7 sm:p-9">
              <div className="flex items-center gap-3 text-primary"><ShieldCheck size={20} aria-hidden="true" /><span className="eyebrow">Transparencia</span></div>
              <h2 className="display-title mt-6 text-3xl leading-none sm:text-4xl">Donar con claridad</h2>
              <p className="mt-5 text-sm leading-7 text-ink/65">Consulta la información institucional, fiscal y legal de nuestra asociación en la página de donataria.</p>
              <a href="/legal/donataria-donaciones" className="focus-ring mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-secondary hover:text-primary">Ver información legal <ArrowUpRight size={16} /></a>
            </div>
          </div>

          <ActivityMosaicCarousel />

          <section className="mx-auto mt-5 max-w-[1180px] rounded-[2.25rem] border border-ink/10 bg-white p-7 shadow-card sm:p-10" aria-labelledby="paypal-donation-title">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
              <div>
                <div className="flex items-center gap-3 text-primary"><HeartHandshake size={21} aria-hidden="true" /><span className="eyebrow">Donación en línea</span></div>
                <h2 id="paypal-donation-title" className="display-title mt-6 max-w-3xl text-4xl leading-none sm:text-5xl">Apoya este trabajo directamente con PayPal</h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-ink/65 sm:text-base">Después de conocer nuestras actividades y la memoria de la comunidad, puedes hacer tu aportación desde el formulario seguro de PayPal. El importe y los datos del pago se revisan directamente en PayPal.</p>
              </div>

              <div className="rounded-[1.75rem] bg-accent p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-2xl font-black tracking-[-0.04em] text-ink">PayPal</span>
                  <ShieldCheck size={24} className="text-ink" aria-hidden="true" />
                </div>
                <p className="mt-5 text-sm leading-6 text-ink/70">Pago procesado en la página oficial de PayPal.</p>
                <TrackedLink eventName="donation_paypal_click" eventParams={{ location: "donacion", source: "paypal_card" }} href={paypalDonationUrl} target="_blank" rel="noreferrer" className="focus-ring mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-extrabold text-white transition-transform hover:-translate-y-1">Donar con PayPal <ArrowUpRight size={16} /></TrackedLink>
              </div>
            </div>
          </section>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
