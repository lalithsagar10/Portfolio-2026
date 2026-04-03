import Link from "next/link";
import { site } from "@/lib/content";

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-stone-200/80 px-6 py-20 dark:border-stone-800/80 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="font-serif text-3xl font-medium tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
          Contact
        </h2>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-stone-600 dark:text-stone-300 sm:text-lg">
          Open to roles and collaborations. Reach out by email or phone—I will get back to you as soon as I can.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
          <Link
            href={`mailto:${site.email}`}
            className="w-fit text-base font-medium text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:decoration-stone-500 dark:text-stone-50 dark:decoration-stone-600 dark:hover:decoration-stone-400"
          >
            {site.email}
          </Link>
          <Link
            href={`tel:${site.phoneTel}`}
            className="w-fit text-base font-medium text-stone-800 transition-colors hover:text-stone-600 dark:text-stone-200 dark:hover:text-stone-400"
          >
            {site.phone}
          </Link>
        </div>
        <p className="mt-4 text-sm text-stone-500 dark:text-stone-400">
          {site.location} · {site.relocate}
        </p>
        <ul className="mt-10 flex flex-wrap gap-6 text-sm font-medium text-stone-600 dark:text-stone-300">
          {site.social.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-stone-900 dark:hover:text-white"
              >
                {s.label}
                <span className="ml-0.5 text-stone-400 dark:text-stone-500">↗</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
