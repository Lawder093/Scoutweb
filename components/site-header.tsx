"use client";

import { LogIn, Menu, X } from "lucide-react";
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

const loginItem = { label: "Entrar", href: "/login" };
const mobileNavigation = [...navigation, { label: "Súmate", href: "/sumate" }, loginItem];

type GlassTone = "light" | "dark";

function parseBackgroundColor(color: string) {
  const channels = color.match(/[\d.]+/g)?.map(Number);

  if (!channels || channels.length < 3) {
    return null;
  }

  const [red, green, blue] = channels;
  const alpha = channels[3] ?? 1;
  const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;

  return { alpha, luminance };
}

function detectGlassTone(): GlassTone {
  const header = document.querySelector<HTMLElement>(".site-header");
  const headerBottom = header?.getBoundingClientRect().bottom ?? 74;
  const sampleY = Math.min(window.innerHeight - 1, Math.max(0, headerBottom + 8));
  const sampleXs = [window.innerWidth * 0.2, window.innerWidth * 0.5, window.innerWidth * 0.8];
  const tones: GlassTone[] = [];

  for (const sampleX of sampleXs) {
    const elements = document.elementsFromPoint(sampleX, sampleY);

    for (const element of elements) {
      if (element.closest(".site-header")) {
        continue;
      }

      const themedSurface = element.closest("[data-glass-tone]") as HTMLElement | null;
      const explicitTone = themedSurface?.dataset.glassTone;

      if (explicitTone === "dark" || explicitTone === "light") {
        tones.push(explicitTone);
        break;
      }

      let current: HTMLElement | null = element as HTMLElement;

      while (current && current !== document.body) {
        const background = parseBackgroundColor(getComputedStyle(current).backgroundColor);

        if (background && background.alpha >= 0.55) {
          tones.push(background.luminance < 0.46 ? "dark" : "light");
          break;
        }

        current = current.parentElement;
      }

      if (tones.length >= sampleXs.indexOf(sampleX) + 1) {
        break;
      }
    }
  }

  const darkToneCount = tones.filter((tone) => tone === "dark").length;
  return tones.length > 0 && darkToneCount > tones.length / 2 ? "dark" : "light";
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [glassTone, setGlassTone] = useState<GlassTone>(pathname === "/" ? "dark" : "light");

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    const closeMenuOnDesktop = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };

    window.addEventListener("resize", closeMenuOnDesktop);
    return () => window.removeEventListener("resize", closeMenuOnDesktop);
  }, []);

  useEffect(() => {
    const updateGlassTone = () => {
      setGlassTone(detectGlassTone());
    };

    let frame: number | null = null;
    const scheduleUpdate = () => {
      if (frame !== null) return;

      frame = window.requestAnimationFrame(() => {
        frame = null;
        updateGlassTone();
      });
    };

    updateGlassTone();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [isOpen, pathname]);

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  const handleNavigation = (href: string) => {
    setIsOpen(false);
    if (!href.includes("#")) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  };
  const isDarkGlass = glassTone === "dark";
  const navBaseClass = isDarkGlass ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-ink/70 hover:bg-secondary/10 hover:text-secondary";
  const navActiveClass = isDarkGlass ? "bg-white/10 text-white" : "bg-primary/10 text-primary";
  const mobileNavBaseClass = isDarkGlass ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-ink/75 hover:bg-secondary/10 hover:text-secondary";

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50" data-glass-tone={glassTone}>
      {isOpen && <button type="button" aria-label="Cerrar menú" className="fixed inset-0 z-40 bg-ink/45 backdrop-blur-[2px] md:hidden" onClick={() => setIsOpen(false)} />}
      <div
        className={`site-header__surface relative z-50 mx-auto max-w-[1240px] px-3 transition-[border-radius,background-color,box-shadow,border-color,color] duration-300 sm:px-5 ${isOpen ? "rounded-[1.75rem]" : "rounded-full"}`}
        data-tone={glassTone}
        data-state={isOpen ? "open" : "closed"}
      >
        <div className="flex h-[62px] items-center justify-between">
          <Link href="/" className="focus-ring flex items-center gap-3 rounded-full" onClick={() => handleNavigation("/")}>
            <span className="site-header__logo block rounded-lg px-2 py-1"><Image src="/images/ccep-logo-horizontal.png" alt="Comunidad Crítica de Escultismo Popular" width={315} height={108} className="h-9 w-auto sm:h-10" /></span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Navegación principal">
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`focus-ring rounded-full px-4 py-2 text-sm font-semibold transition-colors ${navBaseClass} ${isActive(item.href) ? navActiveClass : ""}`}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => handleNavigation(item.href)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/sumate" onClick={() => handleNavigation("/sumate")} className={`focus-ring hidden rounded-full px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] transition-transform hover:-translate-y-0.5 md:block ${isDarkGlass ? "bg-white text-ink" : "bg-ink text-white"}`}>
              Súmate
            </Link>
            <Link
              href={loginItem.href}
              aria-label="Entrar al área editorial"
              onClick={() => handleNavigation(loginItem.href)}
              className={`focus-ring hidden items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold uppercase tracking-[0.1em] transition-colors md:inline-flex ${isDarkGlass ? (isActive(loginItem.href) ? "border-accent bg-accent/20 text-accent" : "border-white/25 text-white/80 hover:border-accent hover:text-accent") : (isActive(loginItem.href) ? "border-primary bg-primary/10 text-primary" : "border-ink/15 text-ink/70 hover:border-primary/40 hover:text-primary")}`}
            >
              <LogIn size={15} aria-hidden="true" />
              {loginItem.label}
            </Link>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              className={`focus-ring grid h-10 w-10 place-items-center rounded-full border md:hidden ${isDarkGlass ? "border-white/25 text-white" : "border-ink/10 text-ink"}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <nav id="mobile-navigation" className={`max-h-[calc(100dvh-6rem)] overflow-y-auto border-t py-3 md:hidden ${isDarkGlass ? "border-white/15" : "border-ink/10"}`} aria-label="Menú móvil">
            {mobileNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`focus-ring block rounded-xl px-3 py-3 text-sm font-semibold ${mobileNavBaseClass} ${item.href === loginItem.href ? `mt-2 border-t pt-4 ${isDarkGlass ? "border-white/15 text-accent" : "border-ink/10 text-primary"}` : ""}`}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => handleNavigation(item.href)}
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
