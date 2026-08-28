import Link from "next/link";
import { site } from "@/lib/content";

export function Contact() {
  return (
    <section id="contact" className="section hairline">
      <div className="section-inner text-center sm:text-left">
        <h2 className="text-title text-[var(--foreground)]">Contact</h2>
        <p className="mx-auto mt-4 max-w-lg text-body text-[var(--foreground-secondary)] sm:mx-0">
          Open to roles and collaborations. Reach out by email or phone—I will get back to you as soon as I can.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:items-start">
          <Link
            href={`mailto:${site.email}`}
            className="pressable pressable-hover text-[21px] font-semibold tracking-[-0.02em] text-[var(--link)] sm:text-[24px]"
          >
            {site.email}
          </Link>
          <Link
            href={`tel:${site.phoneTel}`}
            className="pressable pressable-hover text-[17px] font-medium tracking-[-0.015em] text-[var(--foreground)]"
          >
            {site.phone}
          </Link>
          <p className="text-caption">{site.location}</p>
        </div>
        <ul className="mt-10 flex flex-wrap justify-center gap-6 text-[15px] font-medium tracking-[-0.01em] text-[var(--foreground-secondary)] sm:justify-start">
          {site.social.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pressable pressable-hover"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
