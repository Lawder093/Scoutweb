import type { Metadata } from "next";
import { BookOpen, FileText, HeartHandshake, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { FoundationContent } from "@/components/foundation-page";
import { NosotrosMosaicBoard } from "@/components/nosotros-mosaic-board";
import { OrganizationJsonLd } from "@/components/seo/organization-json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Nosotros", description: "Conoce la institución, el currículo, las donaciones y la transparencia de la Comunidad Crítica de Escultismo Popular, A. C.", path: "/nosotros" });

const institutionalModules = [
  { title: "Currículum institucional", description: "Presentación, objetivos, metas, beneficiarios y memoria de actividades.", href: "/curriculum-institucional", icon: FileText },
  { title: "Donaciones y donataria", description: "Formas de apoyar, datos bancarios, información fiscal y proyectos solidarios.", href: "/legal/donataria-donaciones", icon: HeartHandshake },
  { title: "Transparencia", description: "Informes, acuses y documentos públicos para participar con confianza.", href: "/legal/transparencia", icon: ShieldCheck },
  { title: "Documentos de la asociación", description: "Consulta estatutos, proyectos y materiales institucionales en la biblioteca.", href: "/biblioteca", icon: BookOpen },
];

export default function NosotrosPage() {
  return <>
    <OrganizationJsonLd />
    <SiteHeader />
    <main id="contenido-principal" tabIndex={-1}>
      <section className="bg-ink px-4 pb-16 pt-32 text-white sm:px-6 sm:pb-24 sm:pt-40"><div className="mx-auto max-w-[1180px]"><p className="text-sm font-extrabold uppercase tracking-[0.16em] text-accent">Nosotros</p><h1 className="display-title mt-6 max-w-4xl text-5xl leading-[0.92] sm:text-8xl">Una asociación que <span className="text-accent">acompaña procesos</span></h1><p className="mt-8 max-w-3xl text-lg leading-8 text-white/75 sm:text-xl">Aquí reunimos la información de la institución, su currículo, sus formas de apoyo y los documentos que explican cómo trabajamos.</p></div></section>
      <section className="apple-module apple-module--mist px-4 py-12 sm:px-6 sm:py-16" aria-labelledby="institutional-modules-title"><div className="mx-auto max-w-[1180px]"><div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow text-primary">Información institucional</p><h2 id="institutional-modules-title" className="display-title mt-4 text-4xl sm:text-5xl">Todo lo que necesitas para conocernos</h2></div><p className="max-w-sm text-sm leading-6 text-ink/65">Estos mosaicos concentran las rutas que antes estaban dispersas en el sitio.</p></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{institutionalModules.map(({ title, description, href, icon: Icon }) => <Link key={href} href={href} className="apple-card focus-ring bg-white p-6"><Icon size={23} className="text-primary" aria-hidden="true" /><h3 className="mt-8 text-xl font-extrabold leading-tight">{title}</h3><p className="mt-3 text-sm leading-6 text-ink/65">{description}</p></Link>)}</div></div></section>
      <NosotrosMosaicBoard />
      <FoundationContent />
    </main>
    <SiteFooter />
  </>;
}
