import { CompanyLogo } from "@/components/CompanyLogo";
import { experience } from "@/lib/content";

export function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-20 border-t border-stone-200/80 px-6 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="font-serif text-3xl font-medium tracking-tight text-stone-900 sm:text-4xl">Experience</h2>
        <p className="mt-3 text-sm text-stone-500 sm:text-base">
          Roles where I shipped full-stack systems, AI products, and resilient backends.
        </p>
        <ol className="mt-12 space-y-12">
          {experience.map((job) => (
            <li
              key={`${job.company}-${job.role}`}
              className="rounded-2xl border border-stone-200/90 bg-white/70 p-6 shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:p-8"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 gap-3 sm:gap-4">
                  <CompanyLogo
                    logoSrc={job.companyLogo}
                    name={job.company}
                    href={job.companyLinkedIn}
                  />
                  <div className="min-w-0 pt-0.5">
                    <h3 className="font-serif text-xl font-medium text-stone-900 sm:text-2xl">{job.role}</h3>
                    <p className="mt-1 text-base font-medium text-stone-700">
                      {job.company}
                      <span className="font-normal text-stone-500">
                        {" "}
                        · {job.location}
                      </span>
                    </p>
                  </div>
                </div>
                <p className="shrink-0 text-sm font-medium tabular-nums text-stone-500 sm:pt-0.5 sm:text-right">
                  {job.period}
                </p>
              </div>
              <ul className="mt-6 list-disc space-y-3 pl-5 text-sm leading-relaxed text-stone-600 marker:text-stone-400 sm:text-base">
                {job.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
