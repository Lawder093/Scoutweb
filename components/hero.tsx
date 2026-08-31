"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { BrandMark } from "./brand-mark";

export function Hero() {
  return (
    <section id="inicio" data-glass-tone="dark" className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-white sm:min-h-screen">
      <Image src="/images/inicio-cover.jpg" alt="Comunidad de escultismo popular reunida" fill priority className="object-cover object-[55%_center] sm:object-[60%_center]" sizes="100vw" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(29,43,52,.92)_0%,rgba(29,43,52,.74)_36%,rgba(29,43,52,.22)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink/45 to-transparent" />
      <div className="section-shell relative z-10 pb-16 pt-40 sm:pb-24 lg:pb-28">
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }} className="min-w-0 max-w-3xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm"><BrandMark size={25} decorative /> Una educación para transformar</div>
          <div className="mb-8 w-fit rounded-2xl bg-white px-4 py-2 shadow-lg"><Image src="/images/ccep-logo-horizontal.png" alt="Comunidad Crítica de Escultismo Popular" width={630} height={215} className="h-12 w-auto sm:h-14" /></div>
          <h1 className="display-title max-w-3xl break-words text-5xl leading-[0.88] sm:text-8xl lg:text-[7rem]">Escultismo<br /><span className="text-accent">Crítico Popular</span></h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-white/80 sm:mt-8 sm:text-xl sm:leading-8">Una propuesta de educación no formal basada en la pedagogía crítica, el escultismo y las educaciones populares.</p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row"><Link href="#historia" className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3.5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(131,24,23,.28)] transition-transform hover:-translate-y-1 sm:w-auto sm:px-6 sm:py-4">Conocer nuestra historia <ArrowDown size={17} /></Link><Link href="#cde" className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-4 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:border-accent hover:text-accent sm:w-auto sm:px-6 sm:py-4">Explorar los CDE <ArrowRight size={17} /></Link></div>
        </motion.div>
      </div>
      <div className="absolute bottom-8 right-8 z-10 hidden items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/55 lg:flex"><span className="h-px w-10 bg-white/40" /> Desplaza para explorar</div>
    </section>
  );
}
