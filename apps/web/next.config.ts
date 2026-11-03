import type { NextConfig } from "next";

/** Domaine canonique du site. Tout le reste y renvoie. */
const DOMAINE = "terouva.com";

/**
 * Politique de sécurité du contenu.
 *
 * `'unsafe-inline'` reste nécessaire pour les scripts : les pages sont
 * générées au build, et Next y injecte ses données en scripts en ligne. Le
 * remplacer par un nonce obligerait à rendre chaque page à la demande, et à
 * perdre le cache statique. Le reste ferme ce qui peut l'être : aucune
 * origine de script extérieure, aucun cadre, aucun plugin.
 *
 * Les seules origines extérieures sont celles que le code appelle vraiment :
 * l'annuaire d'adresses de l'État (et son repli IGN) pour construire un lien
 * de recherche, et les photos d'annonces que l'extension transmet à /app.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.leboncoin.fr",
  "font-src 'self' data:",
  "connect-src 'self' https://api-adresse.data.gouv.fr https://data.geopf.fr",
  "media-src 'self'",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      /**
       * Une seule adresse pour une seule page.
       *
       * Le site répondait à la fois sur terouva.com et sur terouva.vercel.app.
       * Deux adresses qui servent le même contenu se font concurrence : les
       * moteurs en choisissent une, et les liens reçus se répartissent entre
       * les deux au lieu de s'additionner. Le sous-domaine renvoie donc
       * définitivement vers le domaine.
       *
       * Les adresses de prévisualisation (terouva-xxxx.vercel.app) ne sont pas
       * concernées : la condition porte sur l'hôte exact.
       */
      {
        source: "/:chemin*",
        has: [{ type: "host", value: "terouva.vercel.app" }],
        destination: `https://${DOMAINE}/:chemin*`,
        permanent: true,
      },
      {
        source: "/:chemin*",
        has: [{ type: "host", value: `www.${DOMAINE}` }],
        destination: `https://${DOMAINE}/:chemin*`,
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:chemin*",
        headers: [
          // Oblige le navigateur à rester en HTTPS pendant deux ans, y compris
          // au premier caractère tapé. Évite une redirection par visite.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Le site n'a pas besoin d'être affiché dans le cadre d'un autre.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Aucune de ces fonctions n'est utilisée.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // En observation seulement (Report-Only) : le navigateur signale
          // dans la console ce que la politique bloquerait, sans rien bloquer.
          // On la passera en Content-Security-Policy quand la console sera
          // restée propre sur le site et sur /app.
          { key: "Content-Security-Policy-Report-Only", value: CSP },
        ],
      },
    ];
  },
};

export default nextConfig;
