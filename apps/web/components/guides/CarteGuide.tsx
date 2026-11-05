import Link from "next/link";
import { RUBRIQUES, type Guide } from "@/components/guides/CadreGuide";
import { Vignette, motifDe } from "@/components/visuels/Vignette";

/**
 * Un guide en carte : sa vignette dessinée (jamais vide : un guide sans
 * motif à lui prend celui de sa rubrique), sa rubrique, son titre, son chapô, son temps
 * de lecture. Sert à « À lire aussi » sous chaque guide et au bas de la page
 * des outils ; les jetons de couleur suivent le monde de la page, clair ou
 * sombre.
 */
export function CarteGuide({ guide: g }: { guide: Guide }) {
  return (
    <Link
      href={g.chemin}
      className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-rule bg-card transition-[border-color] duration-200 hover:border-rule-fort focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
    >
      <span className="relative block aspect-[16/10] overflow-hidden border-b border-rule">
        <Vignette motif={motifDe(g.chemin, g.etape)} graine={g.chemin} />
      </span>
      <span className="flex flex-1 flex-col p-5">
        <span className="champ text-accent-ink">{RUBRIQUES[g.etape]}</span>
        <span className="mt-2 text-[17px] leading-snug font-medium text-ink">{g.titreSeo}</span>
        <span className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-ink-2">{g.description}</span>
        <span className="champ mt-auto pt-4 text-ink-3">{g.lecture} min de lecture</span>
      </span>
    </Link>
  );
}
