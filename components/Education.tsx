import { CompanyLogo } from "@/components/CompanyLogo";
import { education } from "@/lib/content";

export function Education() {
  return (
    <section
      id="education"
      className="scroll-mt-20 border-t border-stone-200/80 px-6 py-20 dark:border-stone-800/80 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="font-serif text-3xl font-medium tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
          Education
        </h2>
        <ul className="mt-10 space-y-6">
          {education.map((e) => (
            <li
              key={e.school}
              className="rounded-2xl border border-stone-200/90 bg-white/70 p-6 dark:border-stone-700/80 dark:bg-stone-900/40 sm:p-8"
            >
              <div className="flex gap-3 sm:gap-4">
                <CompanyLogo
                  logoSrc={e.logoSrc}
                  name={e.school}
                  href={"logoHref" in e && e.logoHref ? e.logoHref : e.website}
                />
                <div className="min-w-0 pt-0.5">
                  <p className="font-medium text-stone-900 dark:text-stone-50">{e.degree}</p>
                  <p className="mt-1 text-stone-700 dark:text-stone-300">
                    <a
                      href={e.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-stone-800 underline decoration-stone-300 underline-offset-2 transition-colors hover:decoration-stone-500 dark:text-stone-200 dark:decoration-stone-600 dark:hover:decoration-stone-400"
                    >
                      {e.school}
                    </a>
                    <span className="font-normal text-stone-500 dark:text-stone-500">
                      {" "}
                      — {e.detail}
                    </span>
                  </p>
                  {"gpa" in e && e.gpa ? (
                    <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                      {"gpaLabel" in e && e.gpaLabel ? e.gpaLabel : "GPA"}: {e.gpa}
                    </p>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
