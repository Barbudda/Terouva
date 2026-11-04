import Link from "next/link";
import { cheminArticle, dateLongue, type Article } from "@/lib/blog";

/**
 * Une liste d'articles à filets : la date, le titre, la description. Une seule
 * forme pour la rubrique, les pages de pilier et le bloc « Articles liés » des
 * guides, pour qu'un article se reconnaisse d'une page à l'autre. Pas de
 * vignette : un article n'a pas de photo, et une liste de textes datés se lit
 * plus vite qu'une grille de cartes.
 */
export function ListeArticles({ articles }: { articles: Article[] }) {
  return (
    <ol className="border-t border-rule">
      {articles.map((a) => (
        <li key={a.slug} className="border-b border-rule">
          <Link
            href={cheminArticle(a)}
            className="group flex flex-col gap-2 py-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
          >
            <time dateTime={a.publieLe} className="champ text-ink-3">
              {dateLongue(a.publieLe)}
            </time>
            <span className="titre titre--petit text-[1.5rem] text-ink transition-colors duration-200 group-hover:text-accent-ink">
              {a.titre}
            </span>
            <span className="max-w-[44rem] leading-relaxed text-ink-2">{a.description}</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
