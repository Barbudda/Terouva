import type { NextConfig } from "next";

/** Domaine canonique du site. Tout le reste y renvoie. */
const DOMAINE = "terouva.com";

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
        ],
      },
    ];
  },
};

export default nextConfig;
