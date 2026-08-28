import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { HeroBackgroundVideo } from "@/components/HeroBackgroundVideo";
import { site } from "@/lib/content";
import { videoMimeType } from "@/lib/videoMimeType";

function CtaLink({
  children,
  className = "",
  ...props
}: ComponentPropsWithoutRef<typeof Link> & { className?: string }) {
  return (
    <Link
      className={`pressable inline-flex items-center justify-center rounded-full bg-[var(--foreground)] px-5 py-2.5 text-[15px] font-medium tracking-[-0.01em] text-white ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

function SecondaryLink({
  children,
  className = "",
  ...props
}: ComponentPropsWithoutRef<typeof Link> & { className?: string }) {
  return (
    <Link
      className={`pressable inline-flex items-center justify-center rounded-full border border-[var(--separator)] bg-white/70 px-5 py-2.5 text-[15px] font-medium tracking-[-0.01em] text-[var(--foreground)] backdrop-blur-md ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 pb-28 pt-24 sm:px-8 sm:pb-36 sm:pt-28">
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
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-white/70 via-white/45 to-white/85 motion-reduce:from-[var(--surface)] motion-reduce:via-[var(--surface)] motion-reduce:to-[var(--surface)]"
            aria-hidden
          />
          {site.heroVideoLocation ? (
            <p
              className="pointer-events-none absolute bottom-8 right-5 z-[2] text-right text-[11px] font-medium tracking-[-0.01em] text-[var(--foreground-secondary)] sm:bottom-12 sm:right-8"
              role="note"
            >
              Filmed in {site.heroVideoLocation}
            </p>
          ) : null}
        </>
      ) : (
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[var(--surface-secondary)]"
          aria-hidden
        />
      )}

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        <h1 className="text-display text-[var(--foreground)]">{site.name}</h1>
        <p className="mt-5 text-[19px] font-normal tracking-[-0.015em] text-[var(--foreground-secondary)] sm:text-[21px]">
          {site.role}
          <span className="mx-2 text-[var(--foreground-tertiary)]">·</span>
          {site.location}
        </p>
        <p className="mx-auto mt-6 max-w-xl text-body text-[var(--foreground-secondary)]">
          {site.tagline}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <CtaLink href={`mailto:${site.email}`}>Email me</CtaLink>
          <SecondaryLink href="#experience">View work</SecondaryLink>
        </div>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[14px] font-medium tracking-[-0.01em] text-[var(--foreground-tertiary)]">
          {site.social.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pressable pressable-hover"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
