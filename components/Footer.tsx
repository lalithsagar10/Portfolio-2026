import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-stone-200/80 px-6 py-10 sm:px-8">
      <div className="mx-auto max-w-3xl text-sm text-stone-500">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
