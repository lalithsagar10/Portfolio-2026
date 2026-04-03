"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { site } from "@/lib/content";
import { withBasePath } from "@/lib/paths";

function readDarkClass() {
  return document.documentElement.classList.contains("dark");
}

function subscribeDarkClass(onChange: () => void) {
  const el = document.documentElement;
  const mo = new MutationObserver(() => onChange());
  mo.observe(el, { attributes: true, attributeFilter: ["class"] });
  return () => mo.disconnect();
}

const nav = [
  { href: "#about", label: "Summary" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#achievements", label: "Awards" },
  { href: "#contact", label: "Contact" },
];

function SunIcon() {
  return (
    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dark = useSyncExternalStore(subscribeDarkClass, readDarkClass, () => false);

  const toggleTheme = useCallback(() => {
    const next = !readDarkClass();
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const glassBar =
    "rounded-xl border border-white/55 bg-white/35 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.1),inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-2xl backdrop-saturate-[1.35] dark:border-white/[0.12] dark:bg-stone-950/45 dark:shadow-[0_8px_32px_-12px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)]";

  const glassBtn =
    "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/50 bg-white/30 text-stone-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-xl transition-[transform,background-color,border-color] duration-200 hover:scale-[1.03] hover:bg-white/50 active:scale-[0.98] dark:border-white/10 dark:bg-white/5 dark:text-stone-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] dark:hover:bg-white/10 [&_svg]:h-[15px] [&_svg]:w-[15px]";

  const navPill =
    "shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium tracking-tight text-stone-700 transition-[background-color,color,transform] duration-200 hover:bg-white/55 hover:text-stone-900 active:scale-[0.98] sm:px-3 sm:text-xs dark:text-stone-200 dark:hover:bg-white/10 dark:hover:text-white";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-2 sm:px-5 sm:pt-2.5">
        <div className={`flex h-9 w-full items-center gap-2 px-2.5 sm:h-10 sm:gap-3 sm:px-4 ${glassBar}`}>
          <Link
            href="#"
            onClick={closeMenu}
            className="shrink-0 rounded-full px-2 py-0.5 font-serif text-sm font-medium tracking-tight text-stone-900 transition-opacity hover:opacity-70 dark:text-stone-50 sm:text-[15px]"
          >
            {site.name.split(" ")[0]}
          </Link>

          <nav
            className="nav-scrollbar hidden min-h-0 min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto sm:gap-1 lg:flex"
            aria-label="Primary"
          >
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className={navPill}>
                {item.label}
              </Link>
            ))}
            {site.resumePdf ? (
              <a
                href={withBasePath(site.resumePdf)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${navPill} border border-white/40 bg-white/25 dark:border-white/10 dark:bg-white/5`}
              >
                Résumé
              </a>
            ) : null}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-1.5 lg:ml-0">
            <button
              type="button"
              onClick={toggleTheme}
              className={glassBtn}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>

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
          className={`absolute inset-0 bg-stone-900/20 backdrop-blur-sm transition-opacity duration-300 dark:bg-black/50 ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={closeMenu}
          aria-label="Close menu overlay"
        />
        <div
          className={`absolute left-3 right-3 top-[3.25rem] overflow-hidden rounded-2xl border border-white/50 bg-white/40 shadow-[0_24px_64px_-16px_rgba(15,23,42,0.25)] backdrop-blur-2xl backdrop-saturate-[1.4] transition-[opacity,transform] duration-300 ease-out dark:border-white/10 dark:bg-stone-950/55 dark:shadow-[0_24px_64px_-12px_rgba(0,0,0,0.7)] sm:left-4 sm:right-4 sm:top-14 ${menuOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"}`}
        >
          <nav className="flex max-h-[min(70vh,520px)] flex-col gap-1 overflow-y-auto p-3" aria-label="Mobile primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-2xl px-4 py-3.5 text-base font-medium text-stone-800 transition-colors hover:bg-white/60 dark:text-stone-100 dark:hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
            {site.resumePdf ? (
              <a
                href={withBasePath(site.resumePdf)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="rounded-2xl px-4 py-3.5 text-base font-medium text-stone-800 transition-colors hover:bg-white/60 dark:text-stone-100 dark:hover:bg-white/10"
              >
                Resume
              </a>
            ) : null}
          </nav>
        </div>
      </div>
    </>
  );
}
