import { competencyGroups } from "@/lib/content";

export function Skills() {
  return (
    <section id="skills" className="section hairline">
      <div className="section-inner">
        <h2 className="text-title text-[var(--foreground)]">Competencies</h2>
        <p className="mt-3 max-w-lg text-callout text-[var(--foreground-secondary)]">
          Languages, tools, frameworks, and how I work with teams.
        </p>
        <div className="mt-14 space-y-10">
          {competencyGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-[13px] font-semibold tracking-[-0.01em] text-[var(--foreground-tertiary)]">
                {group.title}
              </h3>
              <p className="mt-3 text-body text-[var(--foreground-secondary)]">
                {group.items.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
