import { projects } from "@/lib/content";

export function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-20 border-t border-stone-200/80 px-6 py-20 dark:border-stone-800/80 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
            Projects
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400">From AI systems to research & product builds</p>
        </div>
        <ul className="mt-12 space-y-6">
          {projects.map((project) => (
            <li key={project.title}>
              <article className="rounded-2xl border border-stone-200/90 bg-white/70 p-6 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-stone-300/90 hover:shadow-[0_16px_48px_-20px_rgba(0,0,0,0.15)] dark:border-stone-700/80 dark:bg-stone-900/40 dark:hover:border-stone-600/80 dark:hover:shadow-[0_16px_48px_-20px_rgba(0,0,0,0.5)] sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-serif text-xl font-medium text-stone-900 dark:text-stone-50 sm:text-2xl">
                    {project.title}
                  </h3>
                  <span className="text-xs font-medium uppercase tracking-wider text-stone-400 dark:text-stone-500">
                    {project.period}
                  </span>
                </div>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-stone-600 marker:text-stone-400 dark:text-stone-300 dark:marker:text-stone-600 sm:text-base">
                  {project.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-stone-100/90 px-3 py-1 text-xs font-medium text-stone-600 dark:bg-stone-800/80 dark:text-stone-300"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
