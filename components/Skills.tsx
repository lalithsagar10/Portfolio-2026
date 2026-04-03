import { competencyGroups } from "@/lib/content";

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-20 border-t border-stone-200/80 px-6 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="font-serif text-3xl font-medium tracking-tight text-stone-900 sm:text-4xl">Competencies</h2>
        <p className="mt-3 max-w-lg text-sm text-stone-500 sm:text-base">
          Languages, tools, frameworks, and how I work with teams.
        </p>
        <div className="mt-12 space-y-10">
          {competencyGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500">{group.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-stone-200/90 bg-white/70 px-3.5 py-2 text-sm text-stone-700 shadow-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
