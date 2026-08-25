"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import type { BlogPostSummary } from "@/lib/content/types";
import { BlogPostCard } from "./blog-post-card";

const PAGE_SIZE = 12;
type SortOption = "recent" | "oldest" | "title";

function uniqueTerms(posts: BlogPostSummary[], field: "categories" | "tags"): string[] {
  return Array.from(new Set(posts.flatMap((post) => post[field]).filter(Boolean))).sort((a, b) => a.localeCompare(b, "es"));
}

export function BlogBrowser({ posts }: { posts: BlogPostSummary[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [tag, setTag] = useState("Todas");
  const [sort, setSort] = useState<SortOption>("recent");
  const [page, setPage] = useState(1);
  const categories = useMemo(() => ["Todas", ...uniqueTerms(posts, "categories")], [posts]);
  const tags = useMemo(() => ["Todas", ...uniqueTerms(posts, "tags")], [posts]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("es");
    const result = posts.filter((post) => {
      const searchableText = [post.title, post.excerpt, post.category, post.authorName ?? "", ...post.categories, ...post.tags].join(" ").toLocaleLowerCase("es");
      return (!normalizedQuery || searchableText.includes(normalizedQuery)) && (category === "Todas" || post.categories.includes(category)) && (tag === "Todas" || post.tags.includes(tag));
    });
    return result.sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title, "es");
      const dateDifference = new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      return sort === "recent" ? dateDifference : -dateDifference;
    });
  }, [category, posts, query, sort, tag]);

  const pageCount = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visiblePosts = filteredPosts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const clearFilters = () => { setQuery(""); setCategory("Todas"); setTag("Todas"); setSort("recent"); setPage(1); };

  return (
    <section id="historias" className="bg-ink py-24 text-white sm:py-32">
      <div className="section-shell">
        <div className="rounded-[1.8rem] border border-white/15 bg-white/[0.06] p-5 sm:p-6">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-accent"><SlidersHorizontal size={15} aria-hidden="true" /> Explora las historias</div>
          <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]">
            <label className="block text-sm font-bold text-white">Buscar<span className="relative mt-2 block"><Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/45" aria-hidden="true" /><input id="blog-search" type="search" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Título, autor o palabra clave" className="focus-ring h-12 w-full rounded-xl border border-white/20 bg-white/10 pl-10 pr-3 text-sm font-medium text-white outline-none placeholder:text-white/45" /></span></label>
            <label className="block text-sm font-bold text-white">Categoría<select value={category} onChange={(event) => { setCategory(event.target.value); setPage(1); }} className="focus-ring mt-2 h-12 w-full rounded-xl border border-white/20 bg-ink px-3 text-sm font-medium text-white outline-none">{categories.map((option) => <option key={option}>{option}</option>)}</select></label>
            <label className="block text-sm font-bold text-white">Etiqueta<select value={tag} onChange={(event) => { setTag(event.target.value); setPage(1); }} className="focus-ring mt-2 h-12 w-full rounded-xl border border-white/20 bg-ink px-3 text-sm font-medium text-white outline-none">{tags.map((option) => <option key={option}>{option}</option>)}</select></label>
            <label className="block text-sm font-bold text-white">Ordenar<select value={sort} onChange={(event) => { setSort(event.target.value as SortOption); setPage(1); }} className="focus-ring mt-2 h-12 w-full rounded-xl border border-white/20 bg-ink px-3 text-sm font-medium text-white outline-none"><option value="recent">Más recientes</option><option value="oldest">Más antiguas</option><option value="title">Título A–Z</option></select></label>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-bold text-white/65" aria-live="polite">{filteredPosts.length} {filteredPosts.length === 1 ? "historia encontrada" : "historias encontradas"} · Página {currentPage} de {pageCount}</p>
          {(query || category !== "Todas" || tag !== "Todas" || sort !== "recent") && <button type="button" onClick={clearFilters} className="focus-ring rounded-full border border-white/20 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.1em] text-accent transition-colors hover:bg-white/10">Limpiar filtros</button>}
        </div>
        {visiblePosts.length > 0 ? <div className="mt-5 grid gap-5 lg:grid-cols-3">{visiblePosts.map((post, index) => <BlogPostCard key={post.id} post={post} index={index} />)}</div> : <div className="mt-5 rounded-[1.8rem] border border-dashed border-white/20 px-6 py-14 text-center"><h2 className="display-title text-3xl">No encontramos esa historia.</h2><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/60">Prueba con otra palabra o limpia los filtros para volver a explorar el archivo.</p><button type="button" onClick={clearFilters} className="focus-ring mt-6 rounded-full bg-accent px-5 py-3 text-sm font-bold text-ink">Limpiar filtros</button></div>}
        {pageCount > 1 && <nav className="mt-9 flex items-center justify-center gap-3" aria-label="Paginación del blog"><button type="button" disabled={currentPage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className="focus-ring rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35">Anterior</button><span className="text-sm font-bold text-white/60" aria-current="page">Página {currentPage} de {pageCount}</span><button type="button" disabled={currentPage === pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))} className="focus-ring rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35">Siguiente</button></nav>}
      </div>
    </section>
  );
}
