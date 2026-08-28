"use client";

import { useState } from "react";
import { AppGrid, AppIcon, AppIconFace } from "@/components/AppIcon";
import { DetailSheet } from "@/components/DetailSheet";
import { experience } from "@/lib/content";

export function Experience() {
  const [active, setActive] = useState<number | null>(null);
  const job = active !== null ? experience[active] : null;

  return (
    <section id="experience" className="section hairline bg-[var(--surface-secondary)]">
      <div className="section-inner-wide">
        <div className="mx-auto max-w-3xl text-center md:max-w-4xl">
          <h2 className="text-title text-[var(--foreground)]">Experience</h2>
          <p className="mx-auto mt-3 max-w-xl text-callout text-[var(--foreground-secondary)]">
            Tap a company to open the role — like an app on the Home Screen.
          </p>
        </div>

        <AppGrid className="mt-14">
          {experience.map((item, i) => (
            <li key={`${item.company}-${item.role}`}>
              <AppIcon
                label={item.company.replace(/, Inc$/, "").replace(/ Technologies$/, "")}
                src={item.companyLogo}
                subtitle={item.period.split("–")[0]?.trim()}
                selected={active === i}
                onClick={() => setActive(i)}
              />
            </li>
          ))}
        </AppGrid>
      </div>

      <DetailSheet
        open={job !== null}
        onClose={() => setActive(null)}
        title={job?.company ?? ""}
      >
        {job ? (
          <div className="pb-2">
            <div className="flex items-start gap-4 border-b border-[var(--separator)] pb-5">
              <AppIconFace src={job.companyLogo} name={job.company} />
              <div className="min-w-0 pt-0.5">
                <p className="text-[17px] font-semibold tracking-[-0.015em] text-[var(--foreground)]">
                  {job.role}
                </p>
                <p className="mt-1 text-[14px] tracking-[-0.01em] text-[var(--foreground-secondary)]">
                  {job.location}
                </p>
                <p className="mt-1 text-[13px] font-medium tabular-nums tracking-[-0.01em] text-[var(--foreground-tertiary)]">
                  {job.period}
                </p>
              </div>
            </div>

            {job.bullets.length > 0 ? (
              <ul className="mt-5 space-y-3.5">
                {job.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="relative pl-4 text-[15px] leading-[1.47] tracking-[-0.01em] text-[var(--foreground-secondary)] before:absolute before:left-0 before:top-[0.65em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--foreground-tertiary)]"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            ) : null}

            <a
              href={job.companyLinkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="pressable pressable-hover mt-8 inline-flex text-[15px] font-medium tracking-[-0.01em] text-[var(--link)]"
            >
              View on LinkedIn
            </a>
          </div>
        ) : null}
      </DetailSheet>
    </section>
  );
}
