"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image from "next/image";

const activityImages = [
  { src: "/images/conecta/actividades/actividad-01.jpg", alt: "Actividad comunitaria con niñas y niños" },
  { src: "/images/conecta/actividades/actividad-02.jpg", alt: "Participación scout en una actividad comunitaria" },
  { src: "/images/conecta/actividades/actividad-03.jpg", alt: "Entrega de artículos durante una jornada comunitaria" },
  { src: "/images/conecta/actividades/actividad-04.jpg", alt: "Acompañamiento scout durante una jornada comunitaria" },
  { src: "/images/conecta/actividades/actividad-05.jpg", alt: "Equipo scout organizando una actividad" },
  { src: "/images/conecta/actividades/actividad-06.jpg", alt: "Encuentro con familias de la comunidad" },
  { src: "/images/conecta/actividades/actividad-07.jpg", alt: "Equipo scout trasladando materiales" },
  { src: "/images/conecta/actividades/actividad-08.jpg", alt: "Personas compartiendo materiales en comunidad" },
  { src: "/images/conecta/actividades/actividad-09.jpg", alt: "Equipo scout y comunidad reunidos" },
  { src: "/images/conecta/actividades/actividad-10.jpg", alt: "Scout conversando con integrantes de la comunidad" },
  { src: "/images/conecta/actividades/actividad-11.jpg", alt: "Equipo scout colaborando durante una actividad" },
  { src: "/images/conecta/actividades/actividad-12.jpg", alt: "Niño participando en una jornada comunitaria" },
  { src: "/images/conecta/actividades/actividad-13.jpg", alt: "Actividad comunitaria alrededor de bicicletas" },
];

const mosaicClasses = [
  "col-span-2 row-span-1 sm:col-span-2 sm:row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
];

export function ActivityMosaicCarousel() {
  const slides = useMemo(() => {
    const groups: typeof activityImages[] = [];
    for (let index = 0; index < activityImages.length; index += 4) {
      groups.push(activityImages.slice(index, index + 4));
    }
    return groups;
  }, []);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || slides.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [isPaused, slides.length]);

  function goToSlide(index: number) {
    setActiveSlide((index + slides.length) % slides.length);
  }

  return (
    <section className="mx-auto mt-5 max-w-[1180px] rounded-[2.25rem] bg-secondary px-5 py-8 text-white shadow-soft sm:px-9 sm:py-10" aria-labelledby="actividad-comunitaria-title">
      <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow text-accent">Memoria comunitaria</p>
          <h2 id="actividad-comunitaria-title" className="display-title mt-5 text-4xl leading-[0.95] sm:text-6xl">La comunidad se mueve cuando participamos.</h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base">Un álbum de encuentros, jornadas y acciones compartidas por la comunidad scout.</p>
        </div>
        <div className="flex items-center gap-2" aria-label="Controles del carrusel">
          <button type="button" onClick={() => goToSlide(activeSlide - 1)} className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-accent hover:text-accent" aria-label="Ver actividad anterior"><ChevronLeft size={18} /></button>
          <button type="button" onClick={() => goToSlide(activeSlide + 1)} className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-accent hover:text-accent" aria-label="Ver actividad siguiente"><ChevronRight size={18} /></button>
          <button type="button" onClick={() => setIsPaused((current) => !current)} className="focus-ring ml-1 grid h-11 w-11 place-items-center rounded-full bg-accent text-ink transition-transform hover:-translate-y-0.5" aria-label={isPaused ? "Reanudar carrusel" : "Pausar carrusel"} aria-pressed={isPaused}>
            {isPaused ? <Play size={16} /> : <Pause size={16} />}
          </button>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-[1.6rem]" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${activeSlide * 100}%)` }} aria-live="polite">
          {slides.map((slide, slideIndex) => (
            <div key={`activity-slide-${slideIndex}`} className="grid min-h-[24rem] w-full shrink-0 auto-rows-[8rem] grid-cols-2 gap-2 bg-ink/10 p-2 sm:min-h-0 sm:aspect-[4/3] sm:auto-rows-auto sm:grid-cols-4 sm:grid-rows-2" aria-hidden={activeSlide !== slideIndex}>
              {slide.map((image, imageIndex) => (
                <div key={image.src} className={`relative min-h-32 overflow-hidden rounded-xl bg-ink/20 sm:min-h-44 ${slide.length === 1 && imageIndex === 0 ? "col-span-2 row-span-3 sm:col-span-4 sm:row-span-2" : (mosaicClasses[imageIndex] ?? "col-span-1 row-span-1")}`}>
                  <Image src={image.src} alt={image.alt} fill sizes="(min-width: 640px) 50vw, 100vw" priority={slideIndex === 0} className="object-cover transition-transform duration-700 hover:scale-105" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2" aria-label="Seleccionar actividad">
          {slides.map((slide, index) => (
            <button key={`activity-dot-${index}`} type="button" onClick={() => goToSlide(index)} className={`focus-ring h-2.5 rounded-full transition-all ${activeSlide === index ? "w-8 bg-accent" : "w-2.5 bg-white/35 hover:bg-white/70"}`} aria-label={`Ver grupo de actividades ${index + 1}`} aria-current={activeSlide === index ? "true" : undefined} />
          ))}
        </div>
        <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-white/50">{activeSlide + 1} / {slides.length}</span>
      </div>
    </section>
  );
}
