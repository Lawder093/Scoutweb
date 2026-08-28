import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BookOpen, Compass, Lightbulb } from "lucide-react";
import type { CDECommunity, CDEData } from "@/content/cdes/types";
import { getCommunityPage } from "@/content/cdes/community-pages";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Reveal } from "@/components/reveal";
import { ActivityCard } from "./activity-card";
import { CommunityPhotoReel } from "./community-photo-reel";
import { SectionTitle } from "./section-title";

export function CommunityDetailPage({ cde, community }: { cde: CDEData; community: CDECommunity }) {
  const page = getCommunityPage(cde, community);
  const heroImage = community.image ?? cde.heroImage;

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-paper">
        <div className="section-shell pb-5 pt-28">
          <Link href={`/cde/${cde.slug}#comunidad`} className="focus-ring inline-flex items-center gap-2 text-sm font-extrabold text-secondary hover:text-primary">
            <ArrowLeft size={16} aria-hidden="true" />
            Volver a {cde.communityName}
          </Link>
        </div>

        <section className="bg-ink py-14 text-white sm:py-20">
          <div className="section-shell grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <Reveal>
              <span className="eyebrow text-accent">{cde.communityName} · {community.kind}</span>
              <h1 className="display-title mt-6 break-words text-6xl leading-[0.88] sm:text-8xl">{community.name}</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">{community.description}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <span className="rounded-full bg-accent px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-ink">{community.ageRange}</span>
                <span className="rounded-full border border-white/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white/75">{cde.country}</span>
              </div>
              <nav aria-label={`Secciones de ${community.name}`} className="mt-9 flex flex-wrap gap-2">
                <a href="#actividades" className="focus-ring inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-white">
                  Actividades <ArrowUpRight size={15} aria-hidden="true" />
                </a>
                <a href="#curriculum" className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-sm font-bold text-white hover:border-accent hover:text-accent">
                  Currículum <BookOpen size={15} aria-hidden="true" />
                </a>
                <a href="#fundamento" className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-sm font-bold text-white hover:border-accent hover:text-accent">
                  Fundamento <Lightbulb size={15} aria-hidden="true" />
                </a>
              </nav>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative aspect-[1.2/1] overflow-hidden rounded-[2rem] bg-secondary">
                <Image src={heroImage} alt={`Actividad de la comunidad ${community.name}`} fill className="object-cover" sizes="(max-width: 1024px) 90vw, 520px" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 flex items-center gap-2 text-sm font-extrabold text-white">
                  <Compass size={18} className="text-accent" aria-hidden="true" />
                  Una comunidad, un territorio, muchos caminos
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="section-shell grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
            <Reveal className="rounded-[2rem] bg-mist p-7 sm:p-10">
              <span className="eyebrow text-secondary">La comunidad</span>
              <h2 className="display-title mt-5 text-4xl leading-[0.95] sm:text-5xl">
                Un espacio para <span className="text-primary">aprender juntes.</span>
              </h2>
              <p className="mt-7 max-w-2xl text-base leading-8 text-ink/70">{page.introduction}</p>
              <div className="mt-8 border-t border-ink/10 pt-7">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-secondary">Propósito educativo</p>
                <p className="mt-3 text-base leading-7 text-ink/70">{page.purpose}</p>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="rounded-[2rem] bg-accent p-7 sm:p-10">
              <span className="eyebrow text-ink">Ficha rápida</span>
              <dl className="mt-8 space-y-6">
                <div>
                  <dt className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink/55">CDE</dt>
                  <dd className="mt-2 text-xl font-extrabold">{cde.communityName}</dd>
                </div>
                <div className="border-t border-ink/15 pt-6">
                  <dt className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink/55">Rango de edad</dt>
                  <dd className="mt-2 text-xl font-extrabold">{community.ageRange}</dd>
                </div>
                <div className="border-t border-ink/15 pt-6">
                  <dt className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink/55">Recorrido</dt>
                  <dd className="mt-2 text-xl font-extrabold">Currículum, fundamento y práctica</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </section>

        <CommunityPhotoReel communityName={community.name} photos={page.photoReel ?? []} />

        <section id="curriculum" className="scroll-mt-36 bg-mist py-20 sm:py-28">
          <div className="section-shell">
            <Reveal>
              <SectionTitle
                eyebrow="Currículum"
                title={<>Una ruta para <span className="text-secondary">crecer en comunidad.</span></>}
                description="Los contenidos se organizan como experiencias abiertas que pueden adaptarse al territorio y a las preguntas del grupo."
              />
            </Reveal>
            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {page.curriculum.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.06} className="rounded-[1.8rem] border border-ink/10 bg-paper p-6 shadow-card sm:p-7">
                  <span className="text-4xl font-black text-primary/25">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-7 text-xl font-extrabold">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-ink/60">{item.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.topics.map((topic) => (
                      <span key={topic} className="rounded-full bg-secondary/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-secondary">{topic}</span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="fundamento" className="scroll-mt-36 bg-ink py-20 text-white sm:py-28">
          <div className="section-shell">
            <Reveal>
              <SectionTitle
                dark
                eyebrow="Fundamento del conocimiento"
                title={<>Lo que orienta <span className="text-accent">la práctica.</span></>}
                description="Una base común para leer la experiencia, acompañar procesos y construir conocimiento con otras personas."
              />
            </Reveal>
            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {page.knowledgeFoundation.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.06} className="rounded-[1.8rem] border border-white/10 bg-white/5 p-7">
                  <Lightbulb className="text-accent" size={24} strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="mt-8 text-xl font-extrabold">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/65">{item.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="actividades" className="scroll-mt-36 bg-paper py-20 sm:py-28">
          <div className="section-shell">
            <Reveal>
              <SectionTitle
                eyebrow="Actividades"
                title={<>Lo que pasa en <span className="text-primary">{community.name}.</span></>}
                description={`Experiencias, encuentros y publicaciones propias de ${cde.communityName}.`}
              />
            </Reveal>
            <div className="mt-14 grid gap-5 lg:grid-cols-2">
              {page.activities.map((activity, index) => (
                <Reveal key={activity.id} delay={index * 0.08}>
                  <ActivityCard activity={activity} />
                </Reveal>
              ))}
            </div>
            <Link href={`/cde/${cde.slug}#comunidad`} className="focus-ring mt-10 inline-flex items-center gap-2 text-sm font-extrabold text-secondary hover:text-primary">
              Explorar las demás comunidades <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
