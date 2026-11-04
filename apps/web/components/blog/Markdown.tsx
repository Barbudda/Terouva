import Link from "next/link";
import type { ReactNode } from "react";
import { lireBlocs } from "@/lib/blog-format";

/**
 * Rendu du Markdown restreint des articles au format série (voir `lib/blog-format.ts`).
 * Chargé par import dynamique depuis `lib/blog-index.ts`, seulement quand une page d'article est
 * rendue : la liste des articles se lit sans charger React ni `next/link`.
 */
export function corpsDe(markdown: string) {
  return function CorpsMarkdown() {
    return <>{rendreMarkdown(markdown)}</>;
  };
}

export function rendreMarkdown(md: string): ReactNode[] {
  return lireBlocs(md).map((b, i) => {
    switch (b.type) {
      case "h2":
        return (
          <h2 key={i} id={b.id}>
            {enLigne(b.texte)}
          </h2>
        );
      case "h3":
        return <h3 key={i}>{enLigne(b.texte)}</h3>;
      case "ul":
        return (
          <ul key={i}>
            {b.items.map((t, j) => (
              <li key={j}>{enLigne(t)}</li>
            ))}
          </ul>
        );
      case "ol":
        return (
          <ol key={i}>
            {b.items.map((t, j) => (
              <li key={j}>{enLigne(t)}</li>
            ))}
          </ol>
        );
      default:
        return <p key={i}>{enLigne(b.texte)}</p>;
    }
  });
}

const JETON = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|\[[^\]]+\]\([^)\s]+\))/g;

function enLigne(texte: string): ReactNode[] {
  return texte.split(JETON).filter((m) => m !== "").map((m, i) => {
    if (m.startsWith("**")) return <strong key={i}>{m.slice(2, -2)}</strong>;
    const lien = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(m);
    if (lien) {
      const [, txt, href] = lien;
      return href.startsWith("/") ? (
        <Link key={i} href={href}>
          {txt}
        </Link>
      ) : (
        <a key={i} href={href} rel="noopener">
          {txt}
        </a>
      );
    }
    if (m.startsWith("*") && m.endsWith("*") && m.length > 2) return <em key={i}>{m.slice(1, -1)}</em>;
    return m;
  });
}

