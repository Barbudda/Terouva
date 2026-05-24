/**
 * Returns the absolute URL of the current deployment.
 *
 * Resolution order:
 *  1. NEXT_PUBLIC_SITE_URL          — set this when a custom domain is wired (e.g. https://terouva.app)
 *  2. VERCEL_PROJECT_PRODUCTION_URL — auto-injected by Vercel, stable across deploys (no protocol)
 *  3. VERCEL_URL                    — auto-injected by Vercel, changes per deploy (preview URLs)
 *  4. http://localhost:3030         — local dev fallback
 *
 * Never throws — always returns a valid absolute URL.
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return stripTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL);
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3030";
}

function stripTrailingSlash(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}
