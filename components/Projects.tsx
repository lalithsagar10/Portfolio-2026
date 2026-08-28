"use client";

import { useState } from "react";
import { AppGrid, AppIcon } from "@/components/AppIcon";
import { DetailSheet } from "@/components/DetailSheet";
import { projects } from "@/lib/content";

function shortLabel(title: string) {
  // Prefer a crisp Home Screen label
  const cleaned = title.split("(")[0]?.trim() ?? title;
  const parts = cleaned.split(/\s+/);
  if (parts.length <= 2) return cleaned;
  return parts.slice(0, 2).join(" ");
}

export function Projects() {
  const [active, setActive] = useState<number | null>(null);
  const project = active !== null ? projects[active] : null;

  return (
    <section id="projects" className="section hairline">
      <div className="section-inner-wide">
        <div className="mx-auto max-w-3xl text-center md:max-w-4xl">
          <h2 className="text-title text-[var(--foreground)]">Projects</h2>
          <p className="mx-auto mt-3 max-w-xl text-callout text-[var(--foreground-secondary)]">
            Each build as an app — open one to read what shipped.
          </p>
        </div>

        <AppGrid className="mt-14">
          {projects.map((item, i) => (
            <li key={item.title}>
              <AppIcon
                label={shortLabel(item.title)}
                initials={shortLabel(item.title)
                  .split(/\s+/)
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join("")
                  .toUpperCase()}
                subtitle={item.period.split("–")[0]?.trim() ?? item.period}
                selected={active === i}
                onClick={() => setActive(i)}
              />
            </li>
          ))}
        </AppGrid>
      </div>

      <DetailSheet
        open={project !== null}
        onClose={() => setActive(null)}
        title={project ? shortLabel(project.title) : ""}
      >
        {project ? (
          <div className="pb-2">
            <div className="border-b border-[var(--separator)] pb-5">
              <p className="text-[17px] font-semibold tracking-[-0.015em] text-[var(--foreground)]">
                {project.title}
              </p>
              <p className="mt-1 text-[13px] font-medium tabular-nums tracking-[-0.01em] text-[var(--foreground-tertiary)]">
                {project.period}
              </p>
            </div>

            <ul className="mt-5 space-y-3.5">
              {project.bullets.map((b, i) => (
                <li
                  key={i}
                  className="relative pl-4 text-[15px] leading-[1.47] tracking-[-0.01em] text-[var(--foreground-secondary)] before:absolute before:left-0 before:top-[0.65em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--foreground-tertiary)]"
                >
                  {b}
                </li>
              ))}
            </ul>

            <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1.5">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="text-[13px] font-medium tracking-[-0.01em] text-[var(--foreground-tertiary)]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </DetailSheet>
    </section>
  );
}
