import { CompanyLogo } from "@/components/CompanyLogo";
import { education } from "@/lib/content";

export function Education() {
  return (
    <section
      id="education"
      className="scroll-mt-20 border-t border-stone-200/80 px-6 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="font-serif text-3xl font-medium tracking-tight text-stone-900 sm:text-4xl">Education</h2>
        <ul className="mt-10 space-y-6">
          {education.map((e) => (
            <li
              key={e.school}
              className="rounded-2xl border border-stone-200/90 bg-white/70 p-6 sm:p-8"
            >
              <div className="flex gap-3 sm:gap-4">
                <CompanyLogo
                  logoSrc={e.logoSrc}
                  name={e.school}
                  href={"logoHref" in e && e.logoHref ? e.logoHref : e.website}
                />
                <div className="min-w-0 pt-0.5">
                  <p className="font-medium text-stone-900">{e.degree}</p>
                  <p className="mt-1 text-stone-700">
                    <a
                      href={e.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-stone-800 underline decoration-stone-300 underline-offset-2 transition-colors hover:decoration-stone-500"
                    >
                      {e.school}
                    </a>
                    <span className="font-normal text-stone-500">
                      {" "}
                      — {e.detail}
                    </span>
                  </p>
                  {"gpa" in e && e.gpa ? (
                    <p className="mt-2 text-sm text-stone-500">
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
