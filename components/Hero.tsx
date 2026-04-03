import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { HeroBackgroundVideo } from "@/components/HeroBackgroundVideo";
import { site } from "@/lib/content";
import { videoMimeType } from "@/lib/videoMimeType";

function GlassPill({
  children,
  className = "",
  ...props
}: ComponentPropsWithoutRef<typeof Link> & { className?: string }) {
  return (
    <Link
      className={`inline-flex items-center justify-center rounded-full border border-white/55 bg-white/35 px-4 py-2 text-sm font-medium text-stone-800 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.15),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-xl backdrop-saturate-[1.3] transition-[transform,background-color] duration-200 hover:scale-[1.02] hover:bg-white/50 active:scale-[0.98] ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 pb-36 pt-24 sm:px-8 sm:pb-44 sm:pt-28 md:pb-52">
      {site.heroVideoSrc ? (
        <>
          <div className="pointer-events-none absolute inset-0 z-0">
            <HeroBackgroundVideo src={site.heroVideoSrc} mimeType={videoMimeType(site.heroVideoSrc)} />
            <div
              className="absolute inset-0 hidden bg-[var(--surface)] motion-reduce:block"
              aria-hidden
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#f7f6f3]/75 via-[#f7f6f3]/55 to-[#f7f6f3]/82 motion-reduce:from-[var(--surface)] motion-reduce:via-[var(--surface)] motion-reduce:to-[var(--surface)]"
            aria-hidden
          />
          {site.heroVideoLocation ? (
            <div className="pointer-events-none absolute bottom-8 right-4 z-[2] max-w-[min(calc(100%-2rem),22rem)] sm:bottom-12 sm:right-6 md:bottom-16 md:right-8">
              <p
                className="rounded-2xl border border-white/20 bg-stone-900/30 px-4 py-2.5 text-right text-[10px] font-medium uppercase leading-relaxed tracking-[0.14em] text-white/95 shadow-[0_4px_32px_rgba(0,0,0,0.18)] backdrop-blur-md sm:rounded-3xl sm:px-5 sm:py-3 sm:text-[11px] sm:tracking-[0.15em]"
                role="note"
              >
                Filmed in {site.heroVideoLocation}
              </p>
            </div>
          ) : null}
        </>
      ) : (
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-stone-200/40 via-[var(--surface)] to-stone-300/30"
          aria-hidden
        />
      )}

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-stone-600">
          Portfolio
        </p>
        <h1 className="font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-stone-900 sm:text-6xl sm:leading-[1.02] md:text-7xl">
          {site.name}
        </h1>
        <p className="mt-4 text-base text-stone-700 sm:text-lg">
          {site.location} · {site.relocate}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <GlassPill href={`tel:${site.phoneTel}`}>{site.phone}</GlassPill>
          <GlassPill href={`mailto:${site.email}`}>Email</GlassPill>
          {site.social.map((s) => (
            <GlassPill key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
              <span className="ml-1 text-stone-400">↗</span>
            </GlassPill>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-stone-700 sm:text-xl">
          <span className="font-medium text-stone-900">{site.role}</span>
          <span className="mx-2 text-stone-400">·</span>
          {site.tagline}
        </p>
      </div>
    </section>
  );
}
