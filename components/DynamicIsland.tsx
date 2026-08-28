"use client";

import { useEffect, useRef, useState } from "react";

type DynamicIslandProps = {
  /** Stable id for the active section (triggers expand on change). */
  sectionKey: string;
  /** Human label shown while expanded. */
  label: string;
};

/**
 * Liquid-glass Dynamic Island — mobile only. Expands with section name on scroll.
 */
export function DynamicIsland({ sectionKey, label }: DynamicIslandProps) {
  const [expanded, setExpanded] = useState(false);
  const [shownLabel, setShownLabel] = useState(label);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const skipFirst = useRef(true);
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    if (skipFirst.current) {
      skipFirst.current = false;
      setShownLabel(label);
      return;
    }

    setShownLabel(label);
    setExpanded(true);

    if (collapseTimer.current) clearTimeout(collapseTimer.current);
    collapseTimer.current = setTimeout(
      () => setExpanded(false),
      reduceMotion ? 900 : 2000
    );

    return () => {
      if (collapseTimer.current) clearTimeout(collapseTimer.current);
    };
  }, [sectionKey, label, reduceMotion, isMobile]);

  if (!isMobile) return null;

  return (
    <div className="pointer-events-none" aria-live="polite" aria-atomic="true">
      <div
        className={`liquid-island relative flex items-center justify-center overflow-hidden ${
          reduceMotion
            ? "transition-[width,height,border-radius,box-shadow] duration-200 ease-[var(--ease-out)]"
            : "transition-[width,height,border-radius,box-shadow,padding] duration-[420ms] ease-[var(--ease-drawer)]"
        } ${
          expanded
            ? "h-[36px] w-[min(52vw,200px)] rounded-[18px] px-3.5"
            : "h-[32px] w-[108px] rounded-[16px] px-0"
        }`}
        role="status"
      >
        {/* Liquid highlight */}
        <span
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background:
              "linear-gradient(165deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 38%, rgba(255,255,255,0) 62%)",
          }}
          aria-hidden
        />

        <span
          className={`relative z-[1] flex items-center gap-1.5 whitespace-nowrap text-[12px] font-semibold tracking-[-0.02em] text-[var(--foreground)] transition-[opacity,transform] ${
            reduceMotion ? "duration-150" : "duration-300"
          } ease-[var(--ease-out)] ${
            expanded ? "translate-y-0 scale-100 opacity-100" : "translate-y-0.5 scale-[0.96] opacity-0"
          }`}
        >
          <span className="relative flex h-1.5 w-1.5 shrink-0 items-center justify-center" aria-hidden>
            <span className="absolute h-1.5 w-1.5 animate-ping rounded-full bg-[var(--foreground)]/25" />
            <span className="relative h-1 w-1 rounded-full bg-[var(--foreground)]" />
          </span>
          {shownLabel}
        </span>
      </div>
      <span className="sr-only">{expanded ? `Now viewing ${shownLabel}` : ""}</span>
    </div>
  );
}
