"use client";

import Image from "next/image";
import { ArrowDown, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { CDEData } from "@/content/cdes/types";
import { BrandMark } from "@/components/brand-mark";

export function CDEHero({ cde }: { cde: CDEData }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section data-glass-tone="dark" className="relative isolate overflow-hidden bg-ink text-white">
      <Image src={cde.heroImage} alt={`Comunidad ${cde.country}`} fill priority className="object-cover object-center" sizes="100vw" />
      <div className="absolute inset-0 -z-0 bg-[linear-gradient(90deg,rgba(29,43,52,.94)_0%,rgba(29,43,52,.76)_48%,rgba(29,43,52,.32)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/55 to-transparent" />
      <div className="section-shell relative z-10 flex min-h-[100svh] items-end pb-16 pt-28 sm:min-h-[620px] sm:pb-24">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease: "easeOut" }}
          className="min-w-0 max-w-3xl"
        >
          <div className="mb-7 inline-flex max-w-full items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/80 backdrop-blur">
            <MapPin size={14} className="shrink-0 text-accent" /> <span className="break-words">{cde.region}</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="relative grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white p-2 shadow-xl"><BrandMark size={48} decorative priority /><span className="absolute -bottom-2 -right-2 rounded-full bg-primary px-2 py-1 text-[8px] font-black tracking-[0.12em] text-white">CDE</span></span>
            <div className="min-w-0">
              <p className="break-words text-xs font-extrabold uppercase tracking-[0.16em] text-white/65">{cde.communityName}</p>
              <h1 className="display-title mt-2 break-words text-5xl leading-[0.85] sm:text-8xl">{cde.country}</h1>
            </div>
          </div>
          <p className="mt-7 max-w-2xl text-base leading-7 text-white/78 sm:mt-8 sm:text-xl sm:leading-8">{cde.description}</p>
          <a href="#comunidad" className="focus-ring mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-extrabold text-ink transition-transform hover:-translate-y-1 sm:w-auto">Entrar a la comunidad <ArrowDown size={16} /></a>
        </motion.div>
      </div>
    </section>
  );
}
