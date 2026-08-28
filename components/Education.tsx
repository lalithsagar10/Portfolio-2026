"use client";

import { useState } from "react";
import { AppIcon, AppIconFace, AppIconRow } from "@/components/AppIcon";
import { DetailSheet } from "@/components/DetailSheet";
import { education } from "@/lib/content";

function schoolLabel(school: string) {
  if (school.includes("Central Missouri")) return "UC Missouri";
  if (school.includes("Anil Neerukonda")) return "ANITS";
  const words = school.split(/\s+/).filter(Boolean);
  if (words.length <= 2) return school;
  return words.slice(0, 2).join(" ");
}

function degreeShort(degree: string) {
  if (degree.startsWith("Master")) return "M.S.";
  if (degree.startsWith("Bachelor")) return "B.Tech";
  return degree.split(":")[0]?.trim() ?? degree;
}

export function Education() {
  const [active, setActive] = useState<number | null>(null);
  const entry = active !== null ? education[active] : null;
  const logoHref =
    entry && "logoHref" in entry && entry.logoHref ? entry.logoHref : entry?.website;

  return (
    <section id="education" className="section hairline">
      <div className="section-inner-wide">
        <div className="mx-auto max-w-3xl text-center md:max-w-4xl">
          <h2 className="text-title text-[var(--foreground)]">Education</h2>
          <p className="mx-auto mt-3 max-w-xl text-callout text-[var(--foreground-secondary)]">
            Tap a school to open the degree details.
          </p>
        </div>

        <AppIconRow className="mt-14">
          {education.map((e, i) => (
            <li key={e.school}>
              <AppIcon
                label={schoolLabel(e.school)}
                src={e.logoSrc}
                subtitle={degreeShort(e.degree)}
                selected={active === i}
                onClick={() => setActive(i)}
              />
            </li>
          ))}
        </AppIconRow>
      </div>

      <DetailSheet
        open={entry !== null}
        onClose={() => setActive(null)}
        title={entry ? schoolLabel(entry.school) : ""}
      >
        {entry ? (
          <div className="pb-2">
            <div className="flex items-start gap-4 border-b border-[var(--separator)] pb-5">
              <AppIconFace src={entry.logoSrc} name={entry.school} />
              <div className="min-w-0 pt-0.5">
                <p className="text-[17px] font-semibold tracking-[-0.015em] text-[var(--foreground)]">
                  {entry.degree}
                </p>
                <p className="mt-1 text-[14px] tracking-[-0.01em] text-[var(--foreground-secondary)]">
                  {entry.detail}
                </p>
                {"gpa" in entry && entry.gpa ? (
                  <p className="mt-1 text-[13px] font-medium tracking-[-0.01em] text-[var(--foreground-tertiary)]">
                    {"gpaLabel" in entry && entry.gpaLabel ? entry.gpaLabel : "GPA"}: {entry.gpa}
                  </p>
                ) : null}
              </div>
            </div>

            <a
              href={entry.website}
              target="_blank"
              rel="noopener noreferrer"
              className="pressable pressable-hover mt-8 inline-flex text-[15px] font-medium tracking-[-0.01em] text-[var(--link)]"
            >
              Visit school website
            </a>
            {logoHref && logoHref !== entry.website ? (
              <a
                href={logoHref}
                target="_blank"
                rel="noopener noreferrer"
                className="pressable pressable-hover mt-4 block text-[15px] font-medium tracking-[-0.01em] text-[var(--link)]"
              >
                View on LinkedIn
              </a>
            ) : null}
          </div>
        ) : null}
      </DetailSheet>
    </section>
  );
}
