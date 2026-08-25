import { libraryBooks } from "@/lib/site-data";
import type { ContentTone, LibraryResource } from "./types";

const tones: ContentTone[] = ["primary", "secondary", "accent", "mist", "ink", "accent"];

function toneAt(index: number): ContentTone {
  return tones[index % tones.length];
}

function dateLabel(date: string): string {
  return new Intl.DateTimeFormat("es-MX", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(date));
}

function slugify(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const fallbackLibraryResources: LibraryResource[] = libraryBooks.map((book, index) => {
  const publishedAt = new Date(Date.UTC(2024, 8, 20 - index * 2, 12)).toISOString();
  return {
    id: "fallback-library-" + (index + 1),
    slug: slugify(book.title),
    title: book.title,
    creator: book.author,
    description: "Recurso editorial para compartir, adaptar y llevar al territorio.",
    categories: ["Recursos educativos"],
    tags: ["educación popular", "aprendizaje colectivo"],
    publishedAt,
    dateLabel: dateLabel(publishedAt),
    coverImageUrl: null,
    readerUrl: null,
    downloadUrl: null,
    displayOrder: index + 1,
    tone: toneAt(index),
  };
});
