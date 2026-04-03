import { achievements } from "@/lib/content";

export function Achievements() {
  return (
    <section
      id="achievements"
      className="scroll-mt-20 border-t border-stone-200/80 px-6 py-20 dark:border-stone-800/80 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="font-serif text-3xl font-medium tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
          Achievements & certifications
        </h2>
        <ul className="mt-10 space-y-4">
          {achievements.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-xl border border-stone-200/80 bg-white/60 px-4 py-3 text-sm leading-relaxed text-stone-700 dark:border-stone-700/80 dark:bg-stone-900/35 dark:text-stone-300 sm:text-base"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/90 dark:bg-emerald-400/90" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
