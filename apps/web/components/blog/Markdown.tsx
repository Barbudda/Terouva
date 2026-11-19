import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { dimensionsCapture } from "@/lib/blog-captures";
import { lireBlocs, type Bloc } from "@/lib/blog-format";
import { typographier } from "@/components/blog/typographie";

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
      case "figure":
        return <Capture key={i} bloc={b} />;
      default:
        return <p key={i}>{enLigne(b.texte)}</p>;
    }
  });
}

/**
 * Une capture de l'outil dans le texte. Largeur et hauteur viennent du fichier : la place est
 * réservée avant le chargement. `sizes` suit la colonne de l'article : pleine largeur sur téléphone,
 * la mesure (34 rem) ensuite, puis prose et marge réunies dès 64 rem (voir `lecture.css`).
 * Un fichier manquant arrête le rendu plutôt que de publier une image cassée ; le vérificateur
 * l'attrape avant.
 */
function Capture({ bloc }: { bloc: Extract<Bloc, { type: "figure" }> }) {
  const taille = dimensionsCapture(bloc.src);
  if (!taille) throw new Error(`Capture introuvable ou illisible (WebP attendu) : public${bloc.src}`);
  return (
    <figure className="capture">
      <Image
        src={bloc.src}
        alt={bloc.alt}
        width={taille.largeur}
        height={taille.hauteur}
        loading="lazy"
        sizes="(min-width: 64rem) 54rem, (min-width: 36rem) 34rem, 100vw"
      />
      {bloc.legende && <figcaption>{enLigne(bloc.legende)}</figcaption>}
    </figure>
  );
}

const JETON = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|\[[^\]]+\]\([^)\s]+\))/g;

function enLigne(texte: string): ReactNode[] {
  return texte.split(JETON).filter((m) => m !== "").map((m, i) => {
    if (m.startsWith("**")) return <strong key={i}>{typographier(m.slice(2, -2))}</strong>;
    const lien = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(m);
    if (lien) {
      const [, brut, href] = lien;
      const txt = typographier(brut);
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
    if (m.startsWith("*") && m.endsWith("*") && m.length > 2) return <em key={i}>{typographier(m.slice(1, -1))}</em>;
    return typographier(m);
  });
}

