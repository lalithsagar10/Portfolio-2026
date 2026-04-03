import { summary } from "@/lib/content";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 border-t border-stone-200/80 px-6 py-20 dark:border-stone-800/80 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="font-serif text-3xl font-medium tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
          Summary
        </h2>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-stone-600 dark:text-stone-300 sm:text-lg">
          {summary.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
