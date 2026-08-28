import { achievements } from "@/lib/content";

export function Achievements() {
  return (
    <section id="achievements" className="section hairline bg-[var(--surface-secondary)]">
      <div className="section-inner">
        <h2 className="text-title text-[var(--foreground)]">Achievements & certifications</h2>
        <ul className="mt-12 space-y-5">
          {achievements.map((item) => (
            <li
              key={item}
              className="relative pl-4 text-body text-[var(--foreground-secondary)] before:absolute before:left-0 before:top-[0.65em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--foreground-tertiary)]"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
