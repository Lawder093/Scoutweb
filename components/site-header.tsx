"use client";

import { LogIn, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Inicio", href: "/" },
  { label: "Asociación", href: "/asociacion" },
  { label: "CDE", href: "/cde" },
  { label: "Blog", href: "/blog" },
  { label: "Tienda", href: "/tienda" },
  { label: "Contacto", href: "/contacto" },
  { label: "Transparencia", href: "/legal/transparencia" },
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

function resetScrollPosition() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function SiteHeader() {
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [glassTone, setGlassTone] = useState<GlassTone>("light");

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    if (window.location.hash) return;

    resetScrollPosition();
    const frame = window.requestAnimationFrame(resetScrollPosition);
    const timeout = window.setTimeout(resetScrollPosition, 100);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.querySelector<HTMLAnchorElement>("#mobile-navigation a")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
      if (event.key === "Tab") {
        const links = Array.from(document.querySelectorAll<HTMLElement>(".site-header__surface a, .site-header__surface button"))
          .filter((element) => element.getClientRects().length > 0);
        const first = links[0];
        const last = links[links.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first?.focus();
        }
      }
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
      resetScrollPosition();
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
        <div className="flex min-h-[62px] flex-wrap items-center justify-between gap-y-2 py-1 md:py-2 xl:min-h-[62px] xl:flex-nowrap xl:gap-y-0 xl:py-0">
          <Link href="/" scroll={false} className="focus-ring order-1 flex shrink-0 items-center gap-3 rounded-full" onClick={() => handleNavigation("/")}>
            <span className="site-header__logo block rounded-lg px-2 py-1"><Image src="/images/ccep-logo-horizontal.png" alt="Comunidad Crítica de Escultismo Popular" width={315} height={108} className="h-9 w-auto sm:h-10" /></span>
          </Link>

          <nav className="order-3 hidden items-center gap-1 md:mt-2 md:basis-full md:justify-center md:border-t md:pt-2 md:flex xl:order-2 xl:mt-0 xl:basis-auto xl:justify-start xl:border-t-0 xl:pt-0" aria-label="Navegación principal">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                scroll={false}
                className={`focus-ring whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${navBaseClass} ${isActive(item.href) ? navActiveClass : ""}`}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => handleNavigation(item.href)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="order-2 flex items-center gap-2 xl:order-3 xl:gap-3">
            <Link href="/sumate" scroll={false} onClick={() => handleNavigation("/sumate")} className={`focus-ring hidden rounded-full px-3 py-2.5 text-[10px] font-bold uppercase tracking-[0.1em] transition-transform hover:-translate-y-0.5 md:block lg:px-5 lg:py-3 lg:text-xs lg:tracking-[0.12em] ${isDarkGlass ? "bg-white text-ink" : "bg-ink text-white"}`}>
              Súmate
            </Link>
            <Link
              href={loginItem.href}
              scroll={false}
              aria-label="Entrar al área editorial"
              onClick={() => handleNavigation(loginItem.href)}
              className={`focus-ring hidden items-center gap-2 rounded-full border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.08em] transition-colors md:inline-flex lg:px-4 lg:py-2.5 lg:text-xs lg:tracking-[0.1em] ${isDarkGlass ? (isActive(loginItem.href) ? "border-accent bg-accent/20 text-accent" : "border-white/25 text-white/80 hover:border-accent hover:text-accent") : (isActive(loginItem.href) ? "border-primary bg-primary/10 text-primary" : "border-ink/15 text-ink/70 hover:border-primary/40 hover:text-primary")}`}
            >
              <LogIn size={15} aria-hidden="true" />
              {loginItem.label}
            </Link>
            <button
              ref={menuButtonRef}
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
                scroll={false}
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
