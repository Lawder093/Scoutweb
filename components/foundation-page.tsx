import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Check, HeartHandshake, HeartPulse, Leaf, LucideIcon, Music2, ShieldCheck } from "lucide-react";
import { foundationBankDetails, foundationBeneficiaries, foundationMission, foundationODS, foundationRights, foundationValues, foundationVision, foundationWorkAreas, foundationMilestones } from "@/content/foundation";

const sectionLinks = [
  { href: "#proposito", label: "Nuestro propósito" },
  { href: "#trabajo", label: "Qué hacemos" },
  { href: "#beneficiarios", label: "A quiénes acompañamos" },
  { href: "#historia", label: "Nuestra historia" },
  { href: "#transparencia", label: "Transparencia y apoyo" },
];

const workAreaIcons: Record<string, LucideIcon> = {
  "Educación y desarrollo": BookOpen,
  "Asistencia social": HeartHandshake,
  "Salud y bienestar": HeartPulse,
  "Cultura y comunidad": Music2,
  "Derechos y protección": ShieldCheck,
  "Territorio y ambiente": Leaf,
};

export function FoundationContent() {
  return (
    <>
        <section className="bg-mist pb-14 pt-32 md:pt-48 xl:pt-36">
          <div className="section-shell">
            <div className="grid items-end gap-7 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
              <div><p className="text-sm font-bold leading-6 text-primary">Comunidad Crítica de Escultismo Popular, A. C.</p><h1 className="display-title mt-6 max-w-3xl text-5xl leading-[1.02] sm:text-7xl">Acompañar el presente, <span className="text-primary">abrir posibilidades</span></h1></div>
              <p className="max-w-xl text-lg leading-8 text-ink/75">Somos una asociación civil sin fines de lucro. Impulsamos educación, cultura y asistencia social con una convicción: una vida más justa y humana se construye con las comunidades.</p>
            </div>
            <figure className="mt-10">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-white sm:aspect-[2/1]"><Image src="/images/conecta/actividades/actividad-09.jpg" alt="Integrantes de la asociación y de la comunidad durante una jornada de apoyo" fill priority className="object-cover object-[center_60%]" sizes="(min-width: 1280px) 1180px, 100vw" /></div>
              <figcaption className="mt-3 text-sm leading-6 text-ink/65">Una labor que toma forma en encuentros, colaboración y acompañamiento</figcaption>
            </figure>
            <nav aria-label="Contenido de la asociación" className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-ink/15 pt-6">{sectionLinks.map((link) => <a key={link.href} href={link.href} className="focus-ring rounded py-2 text-sm font-bold text-primary underline-offset-4 hover:underline">{link.label}</a>)}</nav>
          </div>
        </section>

        <section id="proposito" className="bg-white py-16 sm:py-24">
          <div className="section-shell grid gap-10 md:grid-cols-2 md:gap-16">
            <div><h2 className="display-title text-4xl sm:text-5xl">Nuestra misión</h2><p className="mt-6 text-lg leading-8 text-ink/75">{foundationMission}</p></div>
            <div className="border-t border-ink/15 pt-8 md:border-l md:border-t-0 md:pl-12 md:pt-0"><h2 className="display-title text-4xl text-primary sm:text-5xl">Lo que queremos construir</h2><p className="mt-6 text-lg leading-8 text-ink/75">{foundationVision}</p></div>
          </div>
        </section>

        <section id="trabajo" className="bg-mist py-16 sm:py-24">
          <div className="section-shell">
            <div className="grid gap-5 lg:grid-cols-2 lg:gap-16"><h2 className="display-title text-4xl leading-tight sm:text-6xl">Nuestro trabajo tiene <span className="text-primary">muchas formas</span></h2><p className="self-end text-lg leading-8 text-ink/75">Estas líneas orientan el proyecto de la asociación. Cada actividad parte del diálogo con las personas y de las necesidades de su entorno.</p></div>
            <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">{foundationWorkAreas.map((area, index) => { const Icon = workAreaIcons[area.title] ?? BookOpen; return <article key={area.title} className="border-t border-ink/20 pt-5"><div className="flex items-center justify-between gap-4"><span className="text-sm font-bold text-primary">{String(index + 1).padStart(2, "0")}</span><span className="grid h-10 w-10 place-items-center rounded-full border border-primary/20 bg-white text-primary" aria-hidden="true"><Icon size={19} strokeWidth={1.8} /></span></div><h3 className="mt-5 text-xl font-extrabold">{area.title}</h3><p className="mt-3 text-base leading-7 text-ink/70">{area.description}</p></article>; })}</div>
            <div className="mt-12 flex flex-wrap gap-4"><Link href="/donacion" className="focus-ring inline-flex items-center gap-3 rounded-full bg-primary px-6 py-4 text-sm font-bold text-white hover:bg-ink">Ver actividades y apoyar <ArrowUpRight size={18} aria-hidden="true" /></Link><Link href="/#coro-esperanza" className="focus-ring inline-flex items-center gap-3 rounded-full border border-ink/20 px-6 py-4 text-sm font-bold hover:bg-white">Conocer el Coro Esperanza <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
          </div>
        </section>

        <section id="beneficiarios" className="bg-white py-16 sm:py-24">
          <div className="section-shell grid gap-12 lg:grid-cols-[1fr_.85fr] lg:gap-20">
            <div><h2 className="display-title text-4xl leading-tight sm:text-6xl">Las personas, <span className="text-primary">en el centro</span></h2><p className="mt-6 text-lg leading-8 text-ink/75">El trabajo asistencial se dirige a personas y comunidades en situación de vulnerabilidad. Buscamos acompañar sus procesos con respeto, escucha y participación.</p><ul className="mt-8 divide-y divide-ink/15">{foundationBeneficiaries.map((item) => <li key={item.title} className="py-5"><h3 className="text-lg font-extrabold">{item.title}</h3><p className="mt-2 text-base leading-7 text-ink/70">{item.description}</p></li>)}</ul></div>
            <div><figure><div className="relative aspect-[4/3] overflow-hidden rounded-2xl"><Image src="/images/conecta/actividades/actividad-06.jpg" alt="Encuentro de un integrante de la asociación con familias de la comunidad" fill className="object-cover" sizes="(min-width: 1024px) 500px, 100vw" /></div><figcaption className="mt-3 text-sm leading-6 text-ink/60">El apoyo se construye con las personas que participan</figcaption></figure><div className="mt-8 rounded-2xl bg-mist p-6 sm:p-8"><h3 className="text-xl font-extrabold">Un compromiso con sus derechos</h3><ul className="mt-5 space-y-4">{foundationRights.map((right) => <li key={right} className="flex gap-3 text-sm leading-6 text-ink/75"><Check className="mt-1 shrink-0 text-primary" size={16} aria-hidden="true" />{right}</li>)}</ul></div></div>
          </div>
        </section>

        <section className="bg-primary py-16 text-white sm:py-20" data-glass-tone="dark">
          <div className="section-shell"><h2 className="display-title text-4xl sm:text-5xl">Nuestra forma de trabajar</h2><div className="mt-9 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{foundationValues.map((value) => <div key={value.title} className="border-t border-white/35 pt-5"><h3 className="text-xl font-bold text-accent">{value.title}</h3><p className="mt-3 text-base leading-7 text-white/85">{value.description}</p></div>)}</div></div>
        </section>

        <section id="historia" className="bg-mist py-16 sm:py-24">
          <div className="section-shell grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
            <div><h2 className="display-title text-4xl leading-tight sm:text-6xl">Una historia que <span className="text-primary">sigue creciendo</span></h2><p className="mt-6 text-lg leading-8 text-ink/75">Nuestras raíces están en la educación escultista. Con el tiempo, el proyecto amplió su mirada hacia el trabajo cultural, asistencial y comunitario.</p><Link href="/cde" className="focus-ring mt-6 inline-flex items-center gap-2 rounded py-2 font-bold text-primary">Conocer los CDE <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
            <ol className="divide-y divide-ink/20 border-t border-ink/20">{foundationMilestones.map((item) => <li key={item.year} className="grid grid-cols-[4.5rem_1fr] gap-4 py-7 sm:grid-cols-[5.5rem_1fr]"><span className="text-2xl font-extrabold text-primary">{item.year}</span><div><h3 className="text-lg font-extrabold">{item.title}</h3><p className="mt-3 text-base leading-7 text-ink/70">{item.text}</p></div></li>)}</ol>
          </div>
        </section>

        <section id="transparencia" className="bg-white py-16 sm:py-24">
          <div className="section-shell grid gap-10 lg:grid-cols-[1fr_.85fr] lg:gap-20">
            <div><h2 className="display-title text-4xl leading-tight sm:text-6xl">Conocer para <span className="text-primary">confiar</span></h2><p className="mt-6 text-lg leading-8 text-ink/75">Consulta la información de la asociación y pregunta por los proyectos que te interesan. Una colaboración empieza con información clara.</p><div className="mt-8 divide-y divide-ink/15 border-y border-ink/15">{[{href:"/biblioteca",label:"Proyecto, estatutos y documentos"},{href:"/legal/transparencia",label:"Información institucional y transparencia"},{href:"/legal/donataria-donaciones",label:"Información sobre donaciones"},{href:"/contacto",label:"Contacto con la asociación"}].map((item) => <Link key={item.href} href={item.href} className="focus-ring flex items-center justify-between gap-3 rounded py-5 text-base font-bold text-primary hover:text-ink">{item.label}<ArrowUpRight className="shrink-0" size={18} aria-hidden="true" /></Link>)}</div></div>
            <aside className="self-start rounded-2xl bg-mist p-7 sm:p-9" aria-labelledby="apoyar-title"><HeartHandshake size={28} className="text-primary" aria-hidden="true" /><h3 id="apoyar-title" className="display-title mt-5 text-4xl">Súmate a esta labor</h3><p className="mt-5 text-base leading-7 text-ink/75">Puedes hacer una aportación a través de PayPal o contactar a la asociación para coordinar otra forma de apoyo.</p><Link href="/donacion" className="focus-ring mt-6 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-4 text-sm font-bold text-white hover:bg-ink">Ir a donaciones <ArrowUpRight size={18} aria-hidden="true" /></Link><div className="mt-8 border-t border-ink/15 pt-6"><h4 className="text-base font-bold">Datos bancarios publicados</h4><dl className="mt-4 space-y-4"><div><dt className="text-sm text-ink/65">Cuenta</dt><dd className="mt-1 font-mono text-xl font-bold text-primary">{foundationBankDetails.account}</dd></div><div><dt className="text-sm text-ink/65">CLABE</dt><dd className="mt-1 break-all font-mono text-lg font-bold text-primary">{foundationBankDetails.clabe}</dd></div></dl><p className="mt-5 text-sm leading-6 text-ink/70">Confirma la vigencia y el titular de la cuenta con la asociación antes de transferir.</p></div></aside>
          </div>
          <div className="section-shell mt-16 border-t border-ink/15 pt-8"><h3 className="text-xl font-extrabold">Compromisos de desarrollo sostenible</h3><ul className="mt-5 flex flex-wrap gap-3">{foundationODS.map((objective) => <li key={objective} className="rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold">{objective}</li>)}</ul><p className="mt-6 max-w-3xl text-sm leading-7 text-ink/65">La ficha de la organización en <a href="https://agenda2030.puebla.gob.mx/sociedad/comunidad-critica-de-escultismo-popular-a-c" target="_blank" rel="noreferrer" className="focus-ring rounded font-bold text-primary underline underline-offset-4">Agenda 2030 Puebla</a> recoge su misión, visión y líneas asistenciales. Su inclusión en el directorio es informativa y no implica un aval gubernamental.</p></div>
        </section>
    </>
  );
}
