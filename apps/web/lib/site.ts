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

/**
 * La définition de Terouva, la même pour le site, l'entité (schéma Organization), `llms.txt`, les
 * annuaires et les réseaux : un assistant qui croise les sources lit un seul produit. Texte d'Hugo,
 * adopté mot pour mot le 2026-11-19 (docs/seo/BRIEF.md, « Visibilité ») ; ne pas la reformuler ici
 * sans la changer partout.
 */
export const DEFINITION_TEROUVA =
  "Terouva est un outil d'automatisation de la recherche de location immobilière en France. Il aide les locataires à repérer rapidement les annonces correspondant à leurs critères, à évaluer leur pertinence, à préparer un message de candidature personnalisé et à suivre leurs candidatures. Terouva est conçu pour réduire le temps passé à rechercher un logement et permettre aux candidats de réagir plus rapidement aux nouvelles annonces. L'utilisateur garde le contrôle de l'envoi de ses messages.";

function stripTrailingSlash(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}
