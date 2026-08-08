"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "comunidad", label: "Comunidad" },
  { id: "nosotros", label: "Nosotros" },
  { id: "actividades", label: "Actividades" },
  { id: "conecta", label: "Conecta" },
];

export function CDENavigation() {
  const [active, setActive] = useState("comunidad");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-22% 0px -62% 0px", threshold: [0.1, 0.35, 0.7] });
    sections.forEach(({ id }) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);

  return <nav aria-label="Navegación del CDE" className="sticky top-20 z-30 border-y border-ink/10 bg-paper/92 shadow-card backdrop-blur-md"><div className="section-shell flex gap-1 overflow-x-auto py-3"><span className="mr-3 hidden shrink-0 items-center text-[10px] font-extrabold uppercase tracking-[0.15em] text-ink/40 sm:flex">CDE</span>{sections.map((section) => <a key={section.id} href={`#${section.id}`} aria-current={active === section.id ? "page" : undefined} className={`focus-ring relative shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-colors ${active === section.id ? "bg-primary text-white" : "text-ink/55 hover:bg-primary/10 hover:text-primary"}`}>{section.label}</a>)}</div></nav>;
}
