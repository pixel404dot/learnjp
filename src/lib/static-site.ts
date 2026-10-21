/**
 * Static-site mode (e.g. the GitHub Pages demo). Set `VITE_STATIC_SITE=true`
 * at build time to ship a client-only SPA: no sign-in and no cloud progress
 * sync, so everything is stored in the browser's localStorage.
 */
export const staticSite = import.meta.env.VITE_STATIC_SITE === "true";

/** Prefix a root-relative public asset path (e.g. `/audio/x.mp3`) with Vite's `base`. */
export function assetUrl(path: string): string {
  if (!path.startsWith("/")) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path}`;
}
