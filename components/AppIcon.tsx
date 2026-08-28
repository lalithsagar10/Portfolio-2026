"use client";

import { useCallback, useState, type ReactNode } from "react";

function initialsFrom(name: string) {
  const alnum = name.replace(/[^a-zA-Z0-9\s.]/g, " ");
  const parts = alnum.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0].replace(/\./g, "")[0] + parts[1].replace(/\./g, "")[0]).toUpperCase();
  }
  return (parts[0] ?? name).slice(0, 2).toUpperCase();
}

/** Soft Apple-like icon fills (no purple / cream bias). */
const FILLS = ["#e8e8ed", "#dcdce2", "#e5e5ea", "#f0f0f3", "#d8d8de", "#ececf0"] as const;

function fillFor(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return FILLS[h % FILLS.length];
}

type AppIconProps = {
  label: string;
  /** Optional image (company logo). Falls back to initials. */
  src?: string;
  /** Override initials when src is missing. */
  initials?: string;
  subtitle?: string;
  onClick?: () => void;
  selected?: boolean;
};

export function AppIcon({ label, src, initials, subtitle, onClick, selected }: AppIconProps) {
  const [failed, setFailed] = useState(false);
  const onError = useCallback(() => setFailed(true), []);
  const letters = initials ?? initialsFrom(label);
  const showImg = Boolean(src) && !failed;

  return (
    <button
      type="button"
      onClick={onClick}
      className="pressable group flex w-[5.5rem] flex-col items-center gap-2 sm:w-24"
      aria-pressed={selected}
    >
      <span
        className={`relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[22.5%] shadow-[0_1px_2px_rgba(0,0,0,0.06),inset_0_0_0_0.5px_rgba(0,0,0,0.06)] transition-[box-shadow,transform] duration-[var(--duration-press)] ease-[var(--ease-out)] ${
          selected ? "ring-2 ring-[var(--foreground)]/20 ring-offset-2 ring-offset-[var(--surface-secondary)]" : ""
        }`}
        style={{ background: showImg ? "#fff" : fillFor(label) }}
      >
        {showImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="" className="h-[72%] w-[72%] object-contain" onError={onError} draggable={false} />
        ) : (
          <span className="text-[22px] font-semibold tracking-[-0.03em] text-[var(--foreground)]/75 sm:text-[24px]">
            {letters}
          </span>
        )}
      </span>
      <span className="w-full text-center">
        <span className="block truncate text-[12px] font-medium leading-tight tracking-[-0.01em] text-[var(--foreground)]">
          {label}
        </span>
        {subtitle ? (
          <span className="mt-0.5 block truncate text-[10px] leading-tight tracking-[-0.01em] text-[var(--foreground-tertiary)]">
            {subtitle}
          </span>
        ) : null}
      </span>
    </button>
  );
}

type AppGridProps = {
  children: ReactNode;
  className?: string;
};

/** Home-screen style icon grid — fills horizontal space. */
export function AppGrid({ children, className = "" }: AppGridProps) {
  return (
    <ul
      className={`mx-auto grid w-full max-w-4xl grid-cols-3 justify-items-center gap-x-5 gap-y-8 sm:grid-cols-4 sm:gap-x-10 sm:gap-y-10 md:max-w-5xl md:grid-cols-5 lg:grid-cols-5 ${className}`}
    >
      {children}
    </ul>
  );
}

/** Horizontal icon row — for fewer items (e.g. education). */
export function AppIconRow({ children, className = "" }: AppGridProps) {
  return (
    <ul
      className={`mx-auto flex w-full max-w-2xl flex-wrap items-start justify-center gap-x-12 gap-y-10 sm:gap-x-20 ${className}`}
    >
      {children}
    </ul>
  );
}

export function AppIconFace({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[22.5%] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),inset_0_0_0_0.5px_rgba(0,0,0,0.06)]">
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          className="h-[72%] w-[72%] object-contain"
          onError={() => setFailed(true)}
          draggable={false}
        />
      ) : (
        <span className="text-[15px] font-semibold text-[var(--foreground-secondary)]">
          {initialsFrom(name)}
        </span>
      )}
    </span>
  );
}
