import Image from "next/image";
import Link from "next/link";
import { CarteGuide } from "@/components/guides/CarteGuide";
import { GUIDES, OUTILS } from "@/lib/catalogue";

/** La capture de chaque outil, la même que sur la page des outils. */
const CAPTURES: Record<string, string> = {
  "/outils/dossier-de-location": "/outils/dossier-de-location.jpg",
  "/outils/message-de-candidature": "/outils/message-de-candidature.jpg",
};

/**
 * Ce qui sert déjà, gratuitement : les deux outils en grandes cartes à
 * capture, puis les trois guides les plus récents en cartes à photo (Hugo,
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
          <p className="mention">Gratuit, dès aujourd&apos;hui</p>
          <h2 id="outils-titre" className="titre mt-3 max-w-[24ch] text-titre-2 text-ink">
            Votre dossier et vos droits, <em className="font-normal italic text-blue-clair">sans attendre.</em>
          </h2>
        </div>
        <Link href="/outils" className="lien text-[15px]">
          Les outils gratuits
        </Link>
      </div>

      <ul className="mt-10 grid gap-5 md:grid-cols-2">
        {OUTILS.map((o) => (
          <li key={o.chemin}>
            <Link
              href={o.chemin}
              className="group carte-levee flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-rule bg-card transition-transform duration-300 ease-[var(--ease-terouva)] hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
            >
              <span className="fond-capture relative block aspect-[16/9] overflow-hidden">
                {CAPTURES[o.chemin] && (
                  <span className="absolute top-[14%] left-[7%] block aspect-[16/9] w-full overflow-hidden rounded-[0.75rem] border border-white/20 shadow-[0_24px_48px_-18px_rgb(0_0_0/0.65)] transition-transform duration-500 ease-[var(--ease-terouva)] group-hover:-translate-y-1">
                    <Image src={CAPTURES[o.chemin]} alt="" fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover object-top" />
                  </span>
                )}
                <span className="champ absolute top-4 left-4 z-10 rounded-full bg-night px-3 py-1.5 text-night-ink">
                  Outil gratuit
                </span>
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
