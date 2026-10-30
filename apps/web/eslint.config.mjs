import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

/**
 * Configuration ESLint du site : les règles Next.js (Core Web Vitals) et
 * TypeScript, rien de plus. Le projet n'en avait pas, et `next lint` ouvrait
 * un assistant interactif qu'aucune vérification automatique ne pouvait passer.
 */
const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [".next/**", ".next-corrompu-*/**", "node_modules/**", "public/**"],
  },
  {
    rules: {
      // Le site est en français : une apostrophe par phrase. JSX la rend
      // telle quelle, l'échapper partout n'apporte rien qu'un texte illisible.
      "react/no-unescaped-entities": "off",
    },
  },
  {
    // L'application (`/app`) est une page unique pilotée par react-router à
    // l'intérieur de Next ; ses liens `<a href="/">` sortent volontairement de
    // la page unique. Elle est hors périmètre de la refonte : on ne la touche pas.
    files: ["components/app/**/*.tsx"],
    rules: { "@next/next/no-html-link-for-pages": "off" },
  },
];
