import type { ReactNode } from "react";
import { competencyGroups, type CompetencyGroup } from "@/lib/content";

type IconProps = { className?: string };

function IconCode({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M8 7L3 12l5 5M16 7l5 5-5 5M13 5l-2 14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconServer({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <path d="M7 7h.01M7 17h.01" strokeLinecap="round" />
    </svg>
  );
}

function IconDatabase({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
      <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </svg>
  );
}

function IconBolt({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" strokeLinejoin="round" />
    </svg>
  );
}

function IconPlug({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M9 7V3M15 7V3M8 7h8v4a4 4 0 01-4 4v6M12 15v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconDesign({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" strokeLinejoin="round" />
      <path d="M5 18l.8 2.2L8 21l-2.2.8L5 24l-.8-2.2L2 21l2.2-.8L5 18z" strokeLinejoin="round" />
      <path d="M18 15l.6 1.6L20 17l-1.4.4L18 19l-.6-1.6L16 17l1.4-.4L18 15z" strokeLinejoin="round" />
    </svg>
  );
}

function IconShield({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconSpark({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  );
}

function IconCloud({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path
        d="M7.5 18h9.2A4.3 4.3 0 0020 14.5a4.2 4.2 0 00-3.4-4.1A5.5 5.5 0 007.2 9.3 3.8 3.8 0 004.5 16.2 3.2 3.2 0 007.5 18z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconChart({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 19V5M4 19h16" strokeLinecap="round" />
      <path d="M8 15v-3M12 15V8M16 15v-5" strokeLinecap="round" />
    </svg>
  );
}

const ICONS: Record<CompetencyGroup["id"], (p: IconProps) => ReactNode> = {
  languages: IconCode,
  backend: IconServer,
  databases: IconDatabase,
  realtime: IconBolt,
  apis: IconPlug,
  design: IconDesign,
  security: IconShield,
  ai: IconSpark,
  cloud: IconCloud,
  testing: IconChart,
};

function SkillGroup({ group }: { group: CompetencyGroup }) {
  const Icon = ICONS[group.id];

  return (
    <article className="min-w-0">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[var(--fill)] text-[var(--foreground)]">
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <h3 className="text-[15px] font-semibold tracking-[-0.015em] text-[var(--foreground)] sm:text-[16px]">
          {group.title}
        </h3>
      </div>
      <ul className="mt-4 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <li
            key={item}
            className="rounded-full bg-[var(--fill)] px-3 py-1.5 text-[13px] font-medium tracking-[-0.01em] text-[var(--foreground-secondary)] transition-[background-color,color,transform] duration-[var(--duration-press)] ease-[var(--ease-out)] hover:bg-[var(--fill-strong)] hover:text-[var(--foreground)]"
          >
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section hairline bg-[var(--surface-secondary)]">
      <div className="section-inner-wide">
        <div className="mx-auto max-w-3xl text-center md:max-w-4xl">
          <h2 className="text-title text-[var(--foreground)]">Core Competencies</h2>
          <p className="mx-auto mt-3 max-w-xl text-callout text-[var(--foreground-secondary)]">
            Languages, systems, AI, cloud, and craft — the stack I build with every day.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-10 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-12 lg:grid-cols-2">
          {competencyGroups.map((group) => (
            <SkillGroup key={group.id} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
