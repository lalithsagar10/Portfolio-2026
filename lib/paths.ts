/**
 * GitHub Pages project site URL path (repo name). Must match `basePath` in `next.config.ts`.
 * For a custom domain or root deploy, set to "" and update `next.config.ts` accordingly.
 */
export const SITE_BASE_PATH = "/Portfolio-2026";

/** Prefix root-relative static paths for subpath hosting. Leaves http(s) URLs unchanged. */
export function withBasePath(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//i.test(path) || path.startsWith("//") || path.startsWith("data:")) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!SITE_BASE_PATH) return normalized;
  return `${SITE_BASE_PATH}${normalized}`;
}
