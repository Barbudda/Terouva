import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

/**
 * Les zones privées : l'application local-first et la liste d'attente. Elles
 * n'ont rien à indexer et `/app` est un piège à robot (une application à route
 * unique, sans contenu serveur).
 */
const PRIVE = ["/app", "/liste"];

/**
 * Robots des moteurs génératifs, déclarés un par un.
 *
 * La règle `*` les autorisait déjà : une règle générique vaut pour tout agent
 * sans règle propre. Les nommer ne change donc pas le comportement, mais rend
 * l'intention lisible, pour nous comme pour les outils d'audit qui cherchent
 * ces agents par leur nom et signalent une absence comme un blocage.
 *
 * Deux familles, qui ne font pas la même chose :
 * - `GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended` collectent
 *   pour l'entraînement ou la mémoire des modèles ;
 * - `OAI-SearchBot`, `PerplexityBot`, `ChatGPT-User`, `Claude-SearchBot` vont
 *   chercher une page au moment d'une question, et c'est **celle-là** qui amène
 *   une citation avec un lien.
 *
 * On ouvre les deux : un guide sourcé qu'un assistant peut lire est un guide
 * qu'il peut citer, et c'est la seule forme de référencement qui progresse
 * encore sans budget.
 */
const ROBOTS_IA = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "Amazonbot",
  "Meta-ExternalAgent",
  "cohere-ai",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVE },
      ...ROBOTS_IA.map((userAgent) => ({ userAgent, allow: "/", disallow: PRIVE })),
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
