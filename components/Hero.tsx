import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { site } from "@/lib/content";

function GlassPill({
  children,
  className = "",
  ...props
}: ComponentPropsWithoutRef<typeof Link> & { className?: string }) {
  return (
    <Link
      className={`inline-flex items-center justify-center rounded-full border border-white/55 bg-white/35 px-4 py-2 text-sm font-medium text-stone-800 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.15),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-xl backdrop-saturate-[1.3] transition-[transform,background-color] duration-200 hover:scale-[1.02] hover:bg-white/50 active:scale-[0.98] dark:border-white/12 dark:bg-stone-950/40 dark:text-stone-100 dark:shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] dark:hover:bg-stone-900/55 ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export function Hero() {
  return (
    <section className="relative px-6 pb-16 pt-24 sm:px-8 sm:pb-24 sm:pt-28">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
          Portfolio
        </p>
        <h1 className="font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-stone-900 dark:text-stone-50 sm:text-6xl sm:leading-[1.02] md:text-7xl">
          {site.name}
        </h1>
        <p className="mt-4 text-base text-stone-600 dark:text-stone-300 sm:text-lg">
          {site.location} · {site.relocate}
        </p>

        <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
          <GlassPill href={`tel:${site.phoneTel}`}>{site.phone}</GlassPill>
          <GlassPill href={`mailto:${site.email}`}>Email</GlassPill>
          {site.social.map((s) => (
            <GlassPill key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
              <span className="ml-1 text-stone-400 dark:text-stone-500">↗</span>
            </GlassPill>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-stone-600 dark:text-stone-300 sm:text-xl">
          <span className="font-medium text-stone-800 dark:text-stone-200">{site.role}</span>
          <span className="mx-2 text-stone-300 dark:text-stone-600">·</span>
          {site.tagline}
        </p>
        
      </div>
    </section>
  );
}
