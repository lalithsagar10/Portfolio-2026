"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { DynamicIsland } from "@/components/DynamicIsland";
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

const sectionLabel: Record<string, string> = {
  home: "Home",
  ...Object.fromEntries(nav.map((item) => [item.href.slice(1), item.label])),
};

const SCROLL_ACTIVE_OFFSET = 100;

type Highlight = { left: number; top: number; width: number; height: number };

type HeaderProps = {
  resumeHref: string | null;
};

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

export function Header({ resumeHref }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [highlight, setHighlight] = useState<Highlight | null>(null);
  const [scrolled, setScrolled] = useState(false);

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
      let current = "home";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top } = el.getBoundingClientRect();
        if (top <= SCROLL_ACTIVE_OFFSET) current = id;
      }
      setActiveSection((prev) => (prev === current ? prev : current));
      setScrolled(window.scrollY > 8);
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

  const brand = site.name.split(" ").filter(Boolean).slice(-1)[0] ?? site.name;
  const islandLabel = sectionLabel[activeSection] ?? "Home";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`material border-b transition-[border-color,box-shadow] duration-[var(--duration-ui)] ease-[var(--ease-out)] ${
            scrolled ? "border-[var(--material-border)] shadow-[0_1px_0_rgba(0,0,0,0.03)]" : "border-transparent"
          }`}
        >
          {/*
            Mobile (< lg): 3-column row — brand | island | menu.
            Desktop (lg+): brand + nav only; island hidden.
          */}
          <div className="relative mx-auto grid h-12 max-w-6xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 px-3 sm:h-14 sm:px-5 lg:flex lg:gap-3 lg:px-6">
            <Link
              href="#"
              onClick={closeMenu}
              className="pressable pressable-hover z-10 min-w-0 justify-self-start truncate text-[15px] font-semibold tracking-[-0.02em] text-[var(--foreground)] lg:shrink-0"
            >
              {brand}
            </Link>

            <div className="z-20 flex justify-center justify-self-center lg:hidden">
              <DynamicIsland sectionKey={activeSection} label={islandLabel} />
            </div>

            <nav
              className="nav-scrollbar relative hidden min-h-0 min-w-0 flex-1 overflow-x-auto lg:block"
              aria-label="Primary"
            >
              <div
                ref={navInnerRef}
                className="relative mx-auto flex w-max max-w-full items-center justify-center gap-0.5"
              >
                {highlight && highlight.width > 0 ? (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute z-0 rounded-full bg-[var(--fill-strong)] transition-[left,top,width,height,opacity] duration-[var(--duration-ui)] ease-[var(--ease-out)] motion-reduce:transition-none"
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
                    className="pressable relative z-10 shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium tracking-[-0.01em] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] sm:px-3.5"
                    onClick={() => setSectionFromClick(item.href)}
                  >
                    {item.label}
                  </Link>
                ))}
                {resumeHref ? (
                  <a
                    href={resumeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pressable relative z-10 shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-semibold tracking-[-0.01em] text-[var(--foreground)] sm:px-3.5"
                  >
                    Resume
                  </a>
                ) : null}
              </div>
            </nav>

            <div className="z-10 flex shrink-0 items-center justify-self-end lg:ml-0">
              <button
                type="button"
                className="pressable inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--foreground)] lg:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((o) => !o)}
              >
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
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
          className={`absolute inset-0 bg-black/20 transition-opacity duration-[var(--duration-ui)] ease-[var(--ease-out)] ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={closeMenu}
          aria-label="Close menu overlay"
        />
        <div
          className={`material absolute left-3 right-3 top-[3.75rem] overflow-hidden rounded-2xl border border-[var(--material-border)] shadow-[0_16px_48px_-12px_rgba(0,0,0,0.18)] transition-[opacity,transform] duration-[var(--duration-ui)] ease-[var(--ease-drawer)] sm:left-4 sm:right-4 ${
            menuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <nav className="flex max-h-[min(70vh,520px)] flex-col gap-0.5 overflow-y-auto p-2" aria-label="Mobile primary">
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
                  className={`pressable rounded-xl px-4 py-3 text-[17px] font-medium tracking-[-0.015em] transition-[background-color,color] duration-[var(--duration-ui)] ease ${
                    isActive
                      ? "bg-[var(--fill-strong)] text-[var(--foreground)]"
                      : "text-[var(--foreground-secondary)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            {resumeHref ? (
              <a
                href={resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="pressable rounded-xl px-4 py-3 text-[17px] font-semibold tracking-[-0.015em] text-[var(--foreground)]"
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
