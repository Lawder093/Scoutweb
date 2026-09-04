import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Building2,
  Facebook,
  Globe2,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  ExternalLink,
  Youtube,
} from "lucide-react";
import { BrandMark } from "./brand-mark";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import {
  cdeContacts,
  contactChannels,
  institutionalContact,
  legalDetails,
  legalNotice,
  representatives,
  socialLinks,
} from "@/content/contact";

const channelIcons = {
  email: Mail,
  phone: Phone,
  network: Globe2,
  social: Instagram,
};

const socialIcons = {
  Facebook,
  Instagram,
  YouTube: Youtube,
};

export function ContactSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;

  return (
    <section id="sumate" className="relative overflow-hidden bg-mist py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-28 top-16 h-72 w-72 rounded-full border-[36px] border-accent/20" />
      <div className="pointer-events-none absolute -left-24 top-[32rem] h-64 w-64 rounded-full border-[24px] border-primary/10" />

      <div className="section-shell relative">
        <Reveal className="overflow-hidden rounded-[2.5rem] bg-secondary text-white shadow-soft">
          <div className="grid items-center lg:grid-cols-[1.1fr_.9fr]">
            <div className="p-7 sm:p-10 lg:p-14">
              <div className="flex items-center gap-3 text-accent">
                <BrandMark size={38} decorative className="opacity-95" />
                <span className="eyebrow text-accent">Súmate a la conversación</span>
              </div>
              <Heading className="display-title mt-7 max-w-3xl text-5xl leading-[0.94] sm:text-6xl md:text-7xl">
                La comunidad <span className="text-accent">está abierta.</span>
              </Heading>
              <p className="mt-7 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
                Si quieres activar un proyecto, compartir una experiencia o simplemente saludar, aquí estamos. Este espacio se construye con muchas manos y distintos territorios.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`mailto:${institutionalContact.email}`} className="focus-ring inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-extrabold text-white transition-transform hover:-translate-y-1">
                  Escríbenos <ArrowUpRight size={16} />
                </a>
                <a href={institutionalContact.whatsappUrl} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-extrabold text-white transition-colors hover:border-accent hover:text-accent">
                  Abrir WhatsApp <MessageCircle size={16} />
                </a>
              </div>
            </div>
            <div className="relative min-h-[19rem] overflow-hidden bg-primary p-7 sm:p-10 lg:min-h-[28rem] lg:p-12">
              <div className="absolute -right-14 -top-16 h-56 w-56 rounded-full border-[20px] border-white/15" />
              <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-accent/80 blur-[1px]" />
              <div className="relative flex h-full flex-col justify-between gap-12">
                <Image src="/images/ccep-logo-horizontal.png" alt="Comunidad Crítica de Escultismo Popular" width={630} height={215} className="h-auto w-full max-w-[18rem] rounded-2xl bg-white p-3" priority />
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/65">Una red en movimiento</p>
                  <p className="display-title mt-3 max-w-sm text-3xl leading-none text-white sm:text-4xl">México · Argentina · Colombia</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div id="redes" className="mt-5 grid scroll-mt-32 gap-4 md:grid-cols-3">
          {contactChannels.map((channel, index) => {
            const Icon = channelIcons[channel.kind];
            const isInternal = channel.href.startsWith("/");
            return (
              <Reveal key={channel.label} delay={index * 0.08} className="group rounded-[1.8rem] border border-ink/10 bg-paper p-6 shadow-card transition-transform hover:-translate-y-1 sm:p-7">
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-white"><Icon size={21} /></span>
                  <ArrowUpRight className="text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={19} />
                </div>
                <h2 className="mt-10 text-xl font-extrabold">{channel.label}</h2>
                {isInternal ? <Link href={channel.href} className="focus-ring mt-3 inline-flex items-center text-sm leading-6 text-ink/60 transition-colors hover:text-primary">{channel.value}</Link> : <a href={channel.href} target={channel.href.startsWith("http") ? "_blank" : undefined} rel={channel.href.startsWith("http") ? "noreferrer" : undefined} className="focus-ring mt-3 inline-flex items-center text-sm leading-6 text-ink/60 transition-colors hover:text-primary">{channel.value}</a>}
              </Reveal>
            );
          })}
        </div>

        <div className="mt-20 grid gap-5 lg:grid-cols-[1.1fr_.9fr] lg:items-start">
          <Reveal className="rounded-[2.2rem] bg-paper p-7 shadow-card sm:p-10">
            <SectionHeading eyebrow="Contacto institucional" title={<>Hacer red también es <span className="text-primary">encontrarnos.</span></>} description="Estos son los canales oficiales de la Comunidad Crítica de Escultismo Popular, A. C." />
            <div className="mt-9 space-y-5 border-t border-ink/10 pt-7">
              <a href="https://maps.app.goo.gl/Pnwm9gSv7P1fwJfN7" target="_blank" rel="noreferrer" className="focus-ring flex items-start gap-3 rounded-xl text-sm leading-6 text-ink/70 transition-colors hover:text-primary"><MapPin className="mt-0.5 shrink-0 text-primary" size={19} /><span>{institutionalContact.address}</span></a>
              <a href={`mailto:${institutionalContact.email}`} className="focus-ring flex items-center gap-3 rounded-xl text-sm font-bold text-ink/75 transition-colors hover:text-primary"><Mail className="shrink-0 text-primary" size={19} />{institutionalContact.email}</a>
              <a href={institutionalContact.whatsappUrl} target="_blank" rel="noreferrer" className="focus-ring flex items-center gap-3 rounded-xl text-sm font-bold text-ink/75 transition-colors hover:text-primary"><Phone className="shrink-0 text-primary" size={19} />{institutionalContact.phone}</a>
            </div>
            <div className="mt-9 flex flex-wrap gap-2 border-t border-ink/10 pt-6">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.label as keyof typeof socialIcons] ?? Globe2;
                return <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-full border border-ink/10 px-4 py-2 text-xs font-extrabold text-ink/65 transition-colors hover:border-primary/30 hover:text-primary"><Icon size={15} />{social.label}</a>;
              })}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="rounded-[2.2rem] bg-accent p-7 shadow-card sm:p-10">
            <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-ink text-white"><Building2 size={20} /></span><span className="eyebrow text-ink">Equipo responsable</span></div>
            <h2 className="display-title mt-7 text-3xl leading-none sm:text-4xl">Personas que cuidan el proceso.</h2>
            <div className="mt-8 divide-y divide-ink/15">
              {representatives.map((person) => <div key={person.role} className="py-4 first:pt-0 last:pb-0"><p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-ink/55">{person.role}</p><p className="mt-1 font-extrabold text-ink">{person.name}</p></div>)}
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-5 rounded-[2.2rem] border border-ink/10 bg-paper p-7 shadow-card sm:p-10">
          <div className="grid gap-9 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-secondary text-white"><ShieldCheck size={20} /></span><span className="eyebrow">Transparencia</span></div>
              <h2 className="display-title mt-7 text-3xl leading-none sm:text-4xl">Un proyecto con memoria y responsabilidad.</h2>
              <p className="mt-5 text-sm leading-7 text-ink/60">Consulta aquí los datos públicos de registro y el aviso legal que acompaña nuestra labor.</p>
            </div>
            <div>
              <div className="grid gap-3 sm:grid-cols-2">
                {legalDetails.map((detail) => <div key={detail.label} className="rounded-2xl bg-mist p-4"><p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-ink/45">{detail.label}</p><p className="mt-2 text-sm font-bold leading-6 text-ink">{detail.value}</p></div>)}
              </div>
              <div className="mt-5 space-y-2">
                {legalNotice.map((notice) => <details key={notice.title} className="group rounded-2xl border border-ink/10 px-5 py-4"><summary className="cursor-pointer list-none text-sm font-extrabold text-ink marker:hidden">{notice.title}<span className="float-right text-primary transition-transform group-open:rotate-45">+</span></summary><p className="max-w-2xl pt-3 text-sm leading-7 text-ink/60">{notice.text}</p></details>)}
              </div>
            </div>
          </div>
        </Reveal>

        <div id="centros" className="mt-24 scroll-mt-28">
          <Reveal><SectionHeading eyebrow="Centros de Desarrollo Escultista" title={<>La red se encuentra en <span className="text-primary">varios territorios.</span></>} description="Cada CDE sostiene una experiencia propia y comparte los principios de la Comunidad Crítica de Escultismo Popular." /></Reveal>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {cdeContacts.map((cde, index) => <Reveal key={cde.slug} delay={index * 0.08} className="flex h-full flex-col rounded-[2rem] border border-ink/10 bg-paper p-6 shadow-card transition-transform hover:-translate-y-1 sm:p-7">
              <div className="flex items-center justify-between gap-3"><span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.15em] text-primary">{cde.country}</span><Link href={`/cde/${cde.slug}`} className="focus-ring rounded-full p-2 text-primary transition-colors hover:bg-primary/10" aria-label={`Explorar CDE ${cde.country}`}><ArrowUpRight size={18} /></Link></div>
              <h2 className="display-title mt-7 text-3xl leading-none">{cde.name}</h2>
              <p className="mt-4 text-sm leading-6 text-ink/60">{cde.description}</p>
              <div className="mt-6 space-y-4 border-t border-ink/10 pt-6 text-sm leading-6 text-ink/70">
                <a href={cde.mapUrl} target="_blank" rel="noreferrer" className="focus-ring flex items-start gap-2 rounded-lg transition-colors hover:text-primary"><MapPin className="mt-0.5 shrink-0 text-primary" size={17} /><span>{cde.address}</span></a>
                <p className="flex items-center gap-2"><Building2 className="shrink-0 text-primary" size={17} /><span><strong className="text-ink">Responsable:</strong> {cde.responsible}</span></p>
                {cde.email && <a href={`mailto:${cde.email}`} className="focus-ring flex items-center gap-2 rounded-lg transition-colors hover:text-primary"><Mail className="shrink-0 text-primary" size={17} />{cde.email}</a>}
                {cde.phone && <a href={`tel:${cde.phone.replace(/[^+\d]/g, "")}`} className="focus-ring flex items-center gap-2 rounded-lg transition-colors hover:text-primary"><Phone className="shrink-0 text-primary" size={17} />{cde.phone}</a>}
              </div>
              <div className="mt-auto flex flex-wrap gap-2 pt-7">
                <Link href={`/cde/${cde.slug}`} className="focus-ring inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2.5 text-xs font-extrabold text-white transition-transform hover:-translate-y-0.5">Ver CDE <ArrowUpRight size={14} /></Link>
                <a href={cde.mapUrl} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-full border border-ink/10 px-4 py-2.5 text-xs font-extrabold text-ink/70 transition-colors hover:border-primary/30 hover:text-primary">Ubicación <MapPin size={14} /></a>
                {cde.website && <a href={cde.website} target="_blank" rel="noreferrer" className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-ink/10 text-ink/55 transition-colors hover:border-primary/30 hover:text-primary" aria-label={`Sitio web de ${cde.name}`}><ExternalLink size={15} /></a>}
              </div>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-ink/10 pt-5">
                {cde.social.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="focus-ring rounded-lg text-[11px] font-extrabold text-ink/45 transition-colors hover:text-primary">{social.label}</a>)}
              </div>
            </Reveal>)}
          </div>
        </div>

        <Reveal delay={0.12} className="mt-16 rounded-[2rem] bg-primary p-7 text-white sm:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><div className="flex items-center gap-2 text-accent"><MessageCircle size={20} /><span className="text-xs font-extrabold uppercase tracking-[0.16em]">Para empezar</span></div><h2 className="display-title mt-5 max-w-2xl text-4xl leading-[0.95] sm:text-5xl">Cuéntanos qué quieres poner en movimiento.</h2></div><a href={`mailto:${institutionalContact.email}`} className="focus-ring inline-flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-extrabold text-ink transition-transform hover:-translate-y-1">Mandar un correo <ArrowUpRight size={16} /></a></div>
        </Reveal>
      </div>
    </section>
  );
}
