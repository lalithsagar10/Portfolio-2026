"use client";

import { useCallback, useState } from "react";
import { withBasePath } from "@/lib/paths";

function initialsFromCompany(name: string) {
  const alnum = name.replace(/[^a-zA-Z0-9\s.]/g, " ");
  const parts = alnum.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const a = parts[0].replace(/\./g, "");
    const b = parts[1].replace(/\./g, "");
    return (a[0] + b[0]).toUpperCase();
  }
  const single = parts[0] ?? name;
  return single.slice(0, 2).toUpperCase();
}

type Props = {
  logoSrc: string;
  /** Organization name (used for initials fallback and accessibility). */
  name: string;
  href: string;
};

export function CompanyLogo({ logoSrc, name, href }: Props) {
  const [useFallback, setUseFallback] = useState(false);
  const initials = initialsFromCompany(name);

  const onImgError = useCallback(() => setUseFallback(true), []);

  const shell =
    "flex h-[52px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-stone-200/90 bg-white shadow-sm transition-opacity hover:opacity-90 dark:border-stone-600/80 dark:bg-stone-800/80 sm:h-14 sm:w-14";

  if (useFallback) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${shell} bg-gradient-to-br from-stone-100 to-stone-200/90 dark:from-stone-700 dark:to-stone-800`}
        aria-label={`${name} — website`}
      >
        <span className="font-semibold tracking-tight text-stone-700 dark:text-stone-200">{initials}</span>
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${shell} p-1.5`}
      aria-label={`${name} — website`}
    >
      {/* Remote favicon URLs; native img keeps onError fallback simple */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={withBasePath(logoSrc)}
          alt=""
        className="h-full w-full object-contain"
        onError={onImgError}
      />
    </a>
  );
}
