import { summary } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="section hairline">
      <div className="section-inner">
        <h2 className="text-title text-[var(--foreground)]">Summary</h2>
        {summary.kicker ? (
          <p className="mt-3 text-callout text-[var(--foreground-tertiary)]">{summary.kicker}</p>
        ) : null}

        <div className="mt-10 space-y-6 sm:mt-12 sm:space-y-7">
          {summary.paragraphs.map((p, i) => (
            <p
              key={i}
              className={`text-body ${i === 0 ? "text-[var(--foreground)]" : "text-[var(--foreground-secondary)]"}`}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
