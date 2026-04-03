import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-stone-200/80 px-6 py-10 dark:border-stone-800/80 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 text-sm text-stone-500 dark:text-stone-400 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="font-mono text-xs text-stone-400 dark:text-stone-500">Next.js · TypeScript · Tailwind</p>
      </div>
    </footer>
  );
}
