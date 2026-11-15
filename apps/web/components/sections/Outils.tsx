import Link from "next/link";
import { OUTILS } from "@/lib/catalogue";
import { TitreSection } from "@/components/ui/TitreSection";
import { Vignette, motifDe } from "@/components/visuels/Vignette";

/**
 * Ce qui sert déjà, gratuitement. Vague 2 du pôle Design (15 novembre,
 * docs/design/VAGUE-2.md) : sur crème, un titre géant et trois cartes, comme le
 * « 3 steps » de FanClaw. Chaque carte porte la vignette dessinée de l'outil
 * (variante papier dans `styles/visuels.css`), son nom et une phrase.
 *
 * La rangée « Derniers guides » a quitté l'accueil : le pied de page et la
 * rubrique /guides les listent tous.
 */
export function Outils() {
  return (
    <section id="outils" aria-labelledby="outils-titre" className="outils monde-papier scroll-mt-20">
      <div className="cadre">
        <TitreSection id="outils-titre" titre="Votre message et votre dossier," accent="gratuitement." />

        <ul className="outils-cartes">
          {OUTILS.map((o) => (
            <li key={o.chemin}>
              <Link href={o.chemin} className="group outils-carte">
                {/* La vignette dessine ce que fait l'outil. */}
                <span className="outils-vignette">
                  <Vignette motif={motifDe(o.chemin)} graine={o.chemin} />
                </span>
                <span className="flex flex-1 flex-col px-7 pt-6 pb-8">
                  <span className="text-[22px] leading-snug font-semibold tracking-[-0.01em] text-ink">
                    {o.court}
                  </span>
                  <span className="mt-2 text-[16px] leading-relaxed text-ink-2">{o.resume}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-center">
          <Link href="/outils" className="lien text-[16px]">
            Tous les outils
          </Link>
        </p>
      </div>
    </section>
  );
}
