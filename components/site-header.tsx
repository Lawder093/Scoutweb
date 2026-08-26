"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Inicio", href: "/" },
  { label: "CDE", href: "/cde" },
  { label: "Biblioteca", href: "/biblioteca" },
  { label: "Blog", href: "/blog" },
  { label: "Tienda", href: "/tienda" },
];

const mobileNavigation = [...navigation, { label: "Súmate", href: "/sumate" }];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-[1240px] rounded-full border border-ink/10 bg-paper/90 px-3 shadow-card backdrop-blur-md sm:px-5">
        <div className="flex h-[62px] items-center justify-between">
          <Link href="/" className="focus-ring flex items-center gap-3 rounded-full" onClick={() => setIsOpen(false)}>
            <span className="block rounded-lg bg-white px-2 py-1"><Image src="/images/ccep-logo-horizontal.png" alt="Comunidad Crítica de Escultismo Popular" width={315} height={108} className="h-9 w-auto sm:h-10" /></span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Navegación principal">
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`focus-ring rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary/10 hover:text-secondary ${isActive(item.href) ? "bg-primary/10 text-primary" : "text-ink/70"}`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/sumate" className="focus-ring hidden rounded-full bg-ink px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-transform hover:-translate-y-0.5 md:block">
              Súmate
            </Link>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-ink/10 text-ink md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <nav id="mobile-navigation" className="max-h-[calc(100dvh-6rem)] overflow-y-auto border-t border-ink/10 py-3 md:hidden" aria-label="Menú móvil">
            {mobileNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring block rounded-xl px-3 py-3 text-sm font-semibold text-ink/75 hover:bg-secondary/10 hover:text-secondary"
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
