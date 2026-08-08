"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight, Compass, Star } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section id="inicio" className="relative flex min-h-[740px] items-center overflow-hidden pb-20 pt-36 sm:min-h-[780px]">
      <div className="absolute -right-24 top-32 h-72 w-72 rounded-full bg-accent/30 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="section-shell relative grid items-center gap-14 lg:grid-cols-[1.04fr_.96fr] lg:gap-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/60 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Una educación para transformar
          </div>
          <h1 className="display-title max-w-3xl text-[4.2rem] leading-[0.88] text-ink sm:text-7xl lg:text-[6.6rem]">
            Escultismo <span className="text-primary">Crítico</span> Popular
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-ink/70 sm:text-xl">
            Aprender juntes. Organizarnos mejor. Hacer del mundo un lugar más justo, alegre y habitable.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="#historia" className="focus-ring inline-flex items-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-bold text-white shadow-[0_12px_28px_rgba(131,24,23,.22)] transition-transform hover:-translate-y-1">
              Conoce el proyecto <ArrowDown size={17} />
            </Link>
            <Link href="#biblioteca" className="focus-ring inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-6 py-4 text-sm font-bold text-ink transition-colors hover:border-secondary hover:text-secondary">
              Ir a la biblioteca <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="mt-12 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink/45">
            <span className="h-px w-10 bg-ink/25" />
            Desde Abya Yala, para todes
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.16, ease: "easeOut" }} className="relative mx-auto w-full max-w-[500px]">
          <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-secondary p-5 shadow-soft sm:p-8">
            <div className="absolute inset-0 bg-dot-grid bg-[size:18px_18px] opacity-20" />
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full border-[22px] border-accent/80" />
            <div className="absolute -bottom-20 -left-14 h-52 w-52 rounded-full border-[28px] border-primary/80" />
            <div className="relative flex h-full flex-col justify-between rounded-[1.8rem] border border-white/35 bg-white/10 p-6 text-white sm:p-8">
              <div className="flex items-start justify-between">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-ink shadow-lg">
                  <Compass size={29} strokeWidth={1.8} />
                </div>
                <span className="rounded-full border border-white/35 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em]">Manifiesto 01</span>
              </div>
              <div>
                <p className="display-title text-5xl leading-[0.9] sm:text-6xl">La aventura<br /><span className="text-accent">es colectiva.</span></p>
                <div className="mt-9 flex items-center justify-between border-t border-white/25 pt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
                  <span>Curiosidad</span><span>•</span><span>Cuidado</span><span>•</span><span>Acción</span>
                </div>
              </div>
            </div>
            <Star className="absolute left-3 top-1/2 text-accent" size={21} fill="currentColor" />
          </div>
          <div className="absolute -bottom-7 -left-5 rounded-2xl bg-paper px-4 py-3 shadow-card sm:-left-10">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Star size={18} fill="currentColor" /></span>
              <div><p className="text-xs font-extrabold text-ink">Una red en movimiento</p><p className="mt-0.5 text-[11px] text-ink/55">México · Colombia · Argentina</p></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
