import fs from "fs";
import path from "path";

const RESUME_DIR = path.join(process.cwd(), "public", "Resume");

/**
 * Picks the résumé file from `public/Resume/` by filename — rename freely.
 * Expects a single file in that folder (ignores dotfiles). Prefers a `.pdf` if several exist.
 */
export function getResumeHref(): string | null {
  if (!fs.existsSync(RESUME_DIR)) return null;

  const files = fs
    .readdirSync(RESUME_DIR)
    .filter((name) => !name.startsWith("."))
    .filter((name) => fs.statSync(path.join(RESUME_DIR, name)).isFile())
    .sort((a, b) => a.localeCompare(b));

  const pdf = files.find((name) => name.toLowerCase().endsWith(".pdf"));
  const file = pdf ?? files[0];
  if (!file) return null;

  return `/Resume/${encodeURIComponent(file)}`;
}
