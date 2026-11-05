import Link from "next/link";
import { CarteGuide } from "@/components/guides/CarteGuide";
import { GUIDES, OUTILS } from "@/lib/catalogue";
import { Vignette, motifDe } from "@/components/visuels/Vignette";


/**
 * Ce qui sert déjà, gratuitement : les outils en grandes cartes à
 * vignette dessinée, puis les trois guides les plus récents en cartes à vignette (Hugo,
 * 4 novembre : la liste de onze lignes ne guidait pas l'œil). Les neuf
 * guides restent liés depuis le pied de page et depuis la rubrique.
 */
export function Outils() {
  const recents = [...GUIDES]
    .sort((a, b) => (b.modifieLe ?? b.publieLe).localeCompare(a.modifieLe ?? a.publieLe))
    .slice(0, 3);

  return (
    <section id="outils" aria-labelledby="outils-titre" className="cadre scroll-mt-20 py-demi-pas">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="outils-titre" className="titre max-w-[24ch] text-titre-2 text-ink">
            Votre message et votre dossier, gratuitement.
          </h2>
        </div>
        <Link href="/outils" className="lien text-[15px]">
          Tous les outils
        </Link>
      </div>

      <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {OUTILS.map((o) => (
          <li key={o.chemin}>
            <Link
              href={o.chemin}
              className="group carte-levee flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-rule bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
            >
              {/* La vignette dessine ce que fait l'outil : la capture, réduite à
                  une carte, était illisible et chargeait tard. */}
              <span className="relative block aspect-[16/10] overflow-hidden border-b border-rule">
                <Vignette motif={motifDe(o.chemin)} graine={o.chemin} />
              </span>
              <span className="flex flex-1 flex-col p-6">
                <span className="text-[19px] leading-snug font-medium text-ink">{o.court}</span>
                <span className="mt-1.5 text-[15px] leading-relaxed text-ink-2">{o.resume}</span>
                <span className="mt-auto flex items-center gap-3 pt-5">
                  <span className="champ text-ink">Ouvrir l&apos;outil</span>
                  <span className="flex size-8 items-center justify-center rounded-full bg-action text-action-ink transition-transform duration-200 group-hover:translate-x-0.5">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden className="size-4">
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-14 flex items-baseline justify-between gap-4">
        <h3 className="champ text-ink-3">Les derniers guides</h3>
        <Link href="/guides" className="lien text-[15px]">
          Les {GUIDES.length} guides
        </Link>
      </div>
      <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {recents.map((g) => (
          <li key={g.chemin}>
            <CarteGuide guide={g} />
          </li>
        ))}
      </ul>
    </section>
  );
}
