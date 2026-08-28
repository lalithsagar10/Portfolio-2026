import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="hairline px-6 py-10 sm:px-8">
      <div className="mx-auto max-w-3xl text-caption">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
