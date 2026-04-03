import { summary } from "@/lib/content";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 border-t border-stone-200/80 px-6 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="font-serif text-3xl font-medium tracking-tight text-stone-900 sm:text-4xl">Summary</h2>
        {summary.kicker ? (
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.22em] text-stone-500 sm:text-[13px]">
            {summary.kicker}
          </p>
        ) : null}

        <div className="mt-10 rounded-2xl border border-stone-200/90 bg-white/65 p-6 shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:mt-12 sm:p-8 sm:shadow-[0_2px_24px_-12px_rgba(28,25,23,0.08)]">
          <div className="space-y-6 border-l-2 border-amber-200/80 pl-5 sm:space-y-7 sm:pl-6">
            {summary.paragraphs.map((p, i) => (
              <p
                key={i}
                className={`text-base leading-[1.75] sm:text-lg sm:leading-relaxed ${
                  i === 0 ? "text-stone-700" : "text-stone-600"
                }`}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
