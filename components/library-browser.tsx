"use client";

import { Grid2X2, List, Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { LibraryResource } from "@/lib/content/types";
import { LibraryResourceCard } from "./library-resource-card";
import { Reveal } from "./reveal";

const LOAD_BATCH = 12;
type SortOption = "recent" | "title" | "order";
type ViewOption = "grid" | "list";

export function LibraryBrowser({ resources }: { resources: LibraryResource[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [tag, setTag] = useState("Todas");
  const [sort, setSort] = useState<SortOption>("order");
  const [visibleCount, setVisibleCount] = useState(LOAD_BATCH);
  const [view, setView] = useState<ViewOption>("grid");
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const categories = useMemo(() => ["Todas", ...Array.from(new Set(resources.flatMap((resource) => resource.categories)))], [resources]);
  const tags = useMemo(() => ["Todas", ...Array.from(new Set(resources.flatMap((resource) => resource.tags)))], [resources]);

  const filteredResources = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("es");
    const filtered = resources.filter((resource) => {
      const searchableText = [resource.title, resource.creator, resource.description, ...resource.categories, ...resource.tags].join(" ").toLocaleLowerCase("es");
      return (!normalizedQuery || searchableText.includes(normalizedQuery))
        && (category === "Todas" || resource.categories.includes(category))
        && (tag === "Todas" || resource.tags.includes(tag));
    });

    return filtered.sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title, "es");
      if (sort === "recent") return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      return a.displayOrder - b.displayOrder;
    });
  }, [category, query, resources, sort, tag]);

  const visibleResources = filteredResources.slice(0, visibleCount);
  const hasMoreResources = visibleCount < filteredResources.length;

  const resetVisibleResources = () => setVisibleCount(LOAD_BATCH);
  const updateQuery = (value: string) => { setQuery(value); resetVisibleResources(); };

  const updateCategory = (value: string) => { setCategory(value); resetVisibleResources(); };

  const updateTag = (value: string) => { setTag(value); resetVisibleResources(); };

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !hasMoreResources || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisibleCount((current) => Math.min(current + LOAD_BATCH, filteredResources.length));
        }
      },
      { rootMargin: "640px 0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [filteredResources.length, hasMoreResources, visibleCount]);

  return (
    <div id="recursos" className="mt-14 scroll-mt-32">
      <div className="rounded-[1.8rem] border border-ink/10 bg-paper p-5 shadow-card sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-secondary"><SlidersHorizontal size={15} /> Filtrar recursos</div>
          <div className="flex items-center gap-1 rounded-full border border-ink/10 p-1" role="group" aria-label="Vista de la biblioteca">
            <button type="button" aria-pressed={view === "grid"} onClick={() => setView("grid")} className={`focus-ring inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-extrabold transition-colors ${view === "grid" ? "bg-primary text-white" : "text-ink/55 hover:text-primary"}`}><Grid2X2 size={14} /> Mosaico</button>
            <button type="button" aria-pressed={view === "list"} onClick={() => setView("list")} className={`focus-ring inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-extrabold transition-colors ${view === "list" ? "bg-primary text-white" : "text-ink/55 hover:text-primary"}`}><List size={14} /> Lista</button>
          </div>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
          <label className="block text-sm font-bold text-ink">
            Buscar
            <span className="relative mt-2 block">
              <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/45" aria-hidden="true" />
              <input id="library-search" type="search" value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="Título, autor o palabra clave" className="focus-ring h-12 w-full rounded-xl border border-ink/15 bg-paper pl-10 pr-3 text-base font-medium outline-none placeholder:text-ink/40 sm:text-sm" />
            </span>
          </label>
          <label className="block text-sm font-bold text-ink">Categoría<select value={category} onChange={(event) => updateCategory(event.target.value)} className="focus-ring mt-2 h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 text-base font-medium outline-none sm:text-sm">{categories.map((option) => <option key={option}>{option}</option>)}</select></label>
          <label className="block text-sm font-bold text-ink">Etiqueta<select value={tag} onChange={(event) => updateTag(event.target.value)} className="focus-ring mt-2 h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 text-base font-medium outline-none sm:text-sm">{tags.map((option) => <option key={option}>{option}</option>)}</select></label>
          <label className="block text-sm font-bold text-ink">Ordenar<select value={sort} onChange={(event) => { setSort(event.target.value as SortOption); setPage(1); }} className="focus-ring mt-2 h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 text-base font-medium outline-none sm:text-sm"><option value="order">Orden editorial</option><option value="recent">Más recientes</option><option value="title">Título A–Z</option></select></label>
        </div>
      </div>

      <p className="mt-7 text-sm font-bold text-ink/60" aria-live="polite">Mostrando {visibleResources.length} de {filteredResources.length} {filteredResources.length === 1 ? "recurso" : "recursos"}</p>

      {visibleResources.length > 0 ? (
        <div className="mt-5">
          <div className={view === "grid" ? "grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4" : "space-y-4"}>{visibleResources.map((resource, index) => <Reveal key={resource.id} delay={index * 0.05}><LibraryResourceCard resource={resource} compact={view === "grid"} /></Reveal>)}</div>
        </div>
      ) : (
        <div className="mt-5 rounded-[1.8rem] border border-dashed border-ink/20 bg-paper px-6 py-14 text-center">
          <h2 className="display-title text-3xl">No encontramos ese recurso</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink/60">Prueba con otra palabra o limpia los filtros para explorar toda la colección.</p>
          <button type="button" onClick={() => { setQuery(""); setCategory("Todas"); setTag("Todas"); resetVisibleResources(); }} className="focus-ring mt-6 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white">Limpiar filtros</button>
        </div>
      )}

      {hasMoreResources && <div ref={loadMoreRef} className="mt-10 flex min-h-12 items-center justify-center"><button type="button" onClick={() => setVisibleCount((current) => Math.min(current + LOAD_BATCH, filteredResources.length))} className="focus-ring rounded-full border border-ink/15 px-6 py-3 text-sm font-bold text-ink hover:border-primary hover:text-primary">Cargar más recursos</button></div>}
    </div>
  );
}
