import Image from "next/image";
import { ImageIcon, Shirt } from "lucide-react";
import type { CDEUniformBadge, CDEUniformData } from "@/content/cdes/types";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "./section-title";

function BadgeSlot({ badge }: { badge: CDEUniformBadge }) {
  return (
    <div className="flex min-h-24 items-center gap-4 rounded-2xl border border-dashed border-ink/20 bg-paper p-4">
      <div className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-mist text-secondary">
        {badge.image ? <Image src={badge.image} alt={badge.alt ?? badge.title} fill className="object-contain p-2" sizes="56px" /> : <ImageIcon size={22} aria-hidden="true" />}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-ink/70">{badge.title}</p>
        <p className="mt-1 text-xs leading-5 text-ink/45">Imagen pendiente</p>
      </div>
    </div>
  );
}

function BadgeColumn({ title, badges }: { title: string; badges: CDEUniformBadge[] }) {
  return (
    <div>
      <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.15em] text-secondary">{title}</p>
      <div className="space-y-3">
        {badges.map((badge) => <BadgeSlot key={badge.id} badge={badge} />)}
      </div>
    </div>
  );
}

export function CommunityUniformSection({ communityName, uniform }: { communityName: string; uniform?: CDEUniformData }) {
  if (!uniform) return null;

  return (
    <section id="uniforme" className="scroll-mt-36 bg-paper py-20 sm:py-28">
      <div className="section-shell">
        <Reveal>
          <SectionTitle
            eyebrow="Uniforme · distintivos"
            title={<>Una identidad que se <span className="text-primary">lleva puesta.</span></>}
            description={`Aquí se mostrará la distribución del uniforme y sus insignias para ${communityName}. Las imágenes oficiales se podrán incorporar sin cambiar la estructura.`}
          />
        </Reveal>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[1fr_minmax(260px,360px)_1fr] lg:gap-10">
          <Reveal delay={0.05}>
            <BadgeColumn title="Lado izquierdo" badges={uniform.leftBadges} />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative mx-auto flex aspect-[3/4] w-full max-w-[360px] items-center justify-center overflow-hidden rounded-[2rem] bg-ink p-8 text-center shadow-soft">
              {uniform.modelImage ? (
                <Image src={uniform.modelImage} alt={uniform.modelAlt ?? `Modelo del uniforme de ${communityName}`} fill className="object-contain" sizes="(max-width: 1024px) 80vw, 360px" />
              ) : (
                <div className="flex flex-col items-center text-white/70">
                  <div className="grid h-24 w-24 place-items-center rounded-full border border-dashed border-accent/60 text-accent">
                    <Shirt size={44} strokeWidth={1.2} aria-hidden="true" />
                  </div>
                  <p className="mt-6 text-sm font-extrabold uppercase tracking-[0.14em] text-white">Modelo del uniforme</p>
                  <p className="mt-2 max-w-[190px] text-xs leading-5 text-white/45">Aquí irá la imagen de la persona con el uniforme completo.</p>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <BadgeColumn title="Lado derecho" badges={uniform.rightBadges} />
          </Reveal>
        </div>

        <p className="mt-8 text-center text-xs leading-5 text-ink/45">Espacios preparados para añadir las insignias oficiales y el modelo de cada comunidad.</p>
      </div>
    </section>
  );
}
