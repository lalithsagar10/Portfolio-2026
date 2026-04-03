"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { site } from "@/lib/content";

const nav = [
  { href: "#about", label: "Summary" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#achievements", label: "Awards" },
  { href: "#travel", label: "Travel" },
  { href: "#contact", label: "Contact" },
] as const;

const sectionIds = nav.map((item) => item.href.slice(1));

/** Viewport line (px from top): section “wins” when its top has crossed this. */
const SCROLL_ACTIVE_OFFSET = 100;

type Highlight = { left: number; top: number; width: number; height: number };

function MenuIcon() {
  return (
    <svg className="h-5 w-5 sm:h-[22px] sm:w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-5 w-5 sm:h-[22px] sm:w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0]);
  const [highlight, setHighlight] = useState<Highlight | null>(null);

  const navInnerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const updateHighlight = useCallback(() => {
    const inner = navInnerRef.current;
    const link = linkRefs.current[activeSection];
    if (!inner || !link) {
      setHighlight(null);
      return;
    }
    setHighlight({
      left: link.offsetLeft,
      top: link.offsetTop,
      width: link.offsetWidth,
      height: link.offsetHeight,
    });
  }, [activeSection]);

  useLayoutEffect(() => {
    updateHighlight();
  }, [updateHighlight, menuOpen]);

  useEffect(() => {
    const inner = navInnerRef.current;
    if (!inner) return;
    const ro = new ResizeObserver(() => updateHighlight());
    ro.observe(inner);
    window.addEventListener("resize", updateHighlight);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateHighlight);
    };
  }, [updateHighlight]);

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top } = el.getBoundingClientRect();
        if (top <= SCROLL_ACTIVE_OFFSET) current = id;
      }
      setActiveSection((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const setSectionFromClick = useCallback((href: string) => {
    if (href.startsWith("#")) setActiveSection(href.slice(1));
  }, []);

  const glassBar =
    "rounded-2xl border border-white/55 bg-white/40 shadow-[0_6px_28px_-10px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-2xl backdrop-saturate-[1.35]";

  const glassBtn =
    "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/50 bg-white/35 text-stone-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-xl transition-[transform,background-color,border-color] duration-200 hover:scale-[1.03] hover:bg-white/55 active:scale-[0.98]";

  const navPill =
    "relative z-10 shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium tracking-tight text-stone-800 transition-[color,transform] duration-200 hover:text-stone-900 active:scale-[0.98] sm:px-3.5 sm:py-2 sm:text-[13px]";

  const highlightClass =
    "pointer-events-none absolute z-0 rounded-full bg-gradient-to-r from-white/75 via-amber-50/50 to-white/75 shadow-[0_2px_14px_-4px_rgba(120,113,108,0.25),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-white/70 transition-[left,top,width,height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-3.5">
        <div className={`flex min-h-12 h-12 w-full items-center gap-2.5 px-3 sm:min-h-14 sm:h-14 sm:gap-3 sm:px-5 ${glassBar}`}>
          <Link
            href="#"
            onClick={closeMenu}
            className="shrink-0 rounded-full px-2.5 py-1 font-serif text-[15px] font-medium uppercase tracking-tight text-stone-900 transition-opacity hover:opacity-70 sm:text-base"
          >
            {site.name.split(" ").filter(Boolean).slice(-1)[0] ?? site.name}
          </Link>

          <nav
            className="nav-scrollbar relative hidden min-h-0 min-w-0 flex-1 overflow-x-auto lg:block"
            aria-label="Primary"
          >
            <div
              ref={navInnerRef}
              className="relative mx-auto flex min-h-11 w-max max-w-full items-center justify-center gap-1 sm:min-h-12 sm:gap-1.5"
            >
              {highlight && highlight.width > 0 ? (
                <span
                  aria-hidden
                  className={highlightClass}
                  style={{
                    left: highlight.left,
                    top: highlight.top,
                    width: highlight.width,
                    height: highlight.height,
                    opacity: 1,
                  }}
                />
              ) : null}
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={(el) => {
                    linkRefs.current[item.href.slice(1)] = el;
                  }}
                  className={navPill}
                  onClick={() => setSectionFromClick(item.href)}
                >
                  {item.label}
                </Link>
              ))}
              {site.resumePdf ? (
                <a
                  href={site.resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${navPill} border border-white/40 bg-white/20 hover:bg-stone-900/10`}
                >
                  Resume
                </a>
              ) : null}
            </div>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-1.5 lg:ml-0">
            <button
              type="button"
              className={`${glassBtn} lg:hidden`}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 lg:hidden ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-stone-900/20 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={closeMenu}
          aria-label="Close menu overlay"
        />
        <div
          className={`absolute left-3 right-3 top-[4.5rem] overflow-hidden rounded-2xl border border-white/50 bg-white/40 shadow-[0_24px_64px_-16px_rgba(15,23,42,0.25)] backdrop-blur-2xl backdrop-saturate-[1.4] transition-[opacity,transform] duration-300 ease-out sm:left-4 sm:right-4 sm:top-[4.75rem] ${menuOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"}`}
        >
          <nav className="flex max-h-[min(70vh,520px)] flex-col gap-1 overflow-y-auto p-3" aria-label="Mobile primary">
            {nav.map((item) => {
              const id = item.href.slice(1);
              const isActive = activeSection === id;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setSectionFromClick(item.href);
                    closeMenu();
                  }}
                  className={`rounded-2xl px-4 py-3.5 text-base font-medium transition-[background-color,box-shadow,color] duration-300 ease-out ${
                    isActive
                      ? "bg-gradient-to-r from-white/80 via-amber-50/45 to-white/80 text-stone-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] ring-1 ring-white/60"
                      : "text-stone-800 hover:bg-white/55"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
