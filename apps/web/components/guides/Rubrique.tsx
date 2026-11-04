"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type FicheGuide = {
  chemin: string;
  titre: string;
  description: string;
  rubrique: string;
  etape: "avant" | "candidature" | "apres";
  date: string;
  lecture: number;
  photo?: { src: string; alt: string };
};

type Filtre = "tous" | FicheGuide["etape"];

/**
 * La liste de la rubrique, sur le modèle de Rushlot et FanClaw : des filtres
 * par moment du parcours, avec leur compte ; l'article à la une en grande
 * carte ; puis les autres en lignes numérotées, vignette, titre, chapô,
 * rubrique et date.
 *
 * Tout est rendu côté serveur : le filtre ne fait que masquer des lignes, les
 * moteurs voient les neuf guides et leurs liens quel que soit l'onglet.
 */
export function Rubrique({
  guides,
  rubriques,
}: {
  /** Du plus récent au plus ancien. */
  guides: FicheGuide[];
  rubriques: Record<FicheGuide["etape"], string>;
}) {
  const [filtre, setFiltre] = useState<Filtre>("tous");
  const visibles = filtre === "tous" ? guides : guides.filter((g) => g.etape === filtre);
  const [une, ...suite] = visibles;

  const onglets: { cle: Filtre; nom: string; compte: number }[] = [
    { cle: "tous", nom: "Tous", compte: guides.length },
    ...(Object.keys(rubriques) as FicheGuide["etape"][]).map((cle) => ({
      cle,
      nom: rubriques[cle],
      compte: guides.filter((g) => g.etape === cle).length,
    })),
  ];

  return (
    <>
      <div className="mt-12 border-t border-rule pt-8">
        {/* Sur téléphone, une seule rangée qui défile : quatre lignes de filtres
            repoussaient l'article à la une sous le pli. */}
        <div
          role="group"
          aria-label="Filtrer les guides"
          className="-mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          <Link
            href="/outils"
            className="inline-flex min-h-11 shrink-0 items-center gap-2.5 rounded-full border border-[color-mix(in_oklch,var(--color-action)_35%,var(--color-rule))] bg-[color-mix(in_oklch,var(--color-action)_8%,var(--color-card))] py-1.5 pr-4 pl-1.5 text-[15px] text-ink transition-colors hover:border-action"
          >
            <Pastille actif>
              <path d="M10.5 2.5l3 3-7.5 7.5H3v-3l7.5-7.5z" strokeLinejoin="round" />
            </Pastille>
            Outils gratuits
          </Link>
          {onglets.map((o) => {
            const actif = o.cle === filtre;
            return (
              <button
                key={o.cle}
                type="button"
                aria-pressed={actif}
                onClick={() => setFiltre(o.cle)}
                className={cn(
                  "inline-flex min-h-11 shrink-0 items-center gap-2.5 rounded-full border py-1.5 pr-4 pl-1.5 text-[15px] whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink",
                  actif
                    ? "border-ink bg-ink text-paper"
                    : "border-rule-fort bg-card text-ink hover:border-ink-3",
                )}
              >
                <Pastille actif={actif}>{ICONES[o.cle]}</Pastille>
                {o.nom}
                <span className={cn("text-[12px] tabular-nums", actif ? "text-paper/70" : "text-ink-3")}>
                  {o.compte}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {une && <ALaUne guide={une} />}

      {suite.length > 0 && (
        <ol className="mt-14 border-t border-rule">
          {suite.map((g, i) => (
            <li key={g.chemin} className="border-b border-rule">
              <Link
                href={g.chemin}
                className="group grid grid-cols-[6.5rem_1fr] items-start gap-x-4 gap-y-2 py-6 sm:grid-cols-[3.5rem_10.5rem_1fr] sm:gap-x-6 lg:grid-cols-[4.5rem_12rem_1fr_15.5rem] lg:items-center lg:gap-x-8"
              >
                <span aria-hidden className="titre hidden text-[2.75rem] leading-none text-rule-fort transition-colors group-hover:text-accent-ink sm:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative aspect-[16/11] overflow-hidden rounded-[0.875rem] bg-paper-2">
                  {g.photo && (
                    <Image
                      src={g.photo.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 192px, (min-width: 640px) 168px, 104px"
                      className="object-cover transition-transform duration-500 ease-[var(--ease-terouva)] group-hover:scale-[1.04]"
                    />
                  )}
                </span>
                <div className="min-w-0">
                  <h3 className="titre titre--petit text-[1.25rem] text-ink transition-colors group-hover:text-accent-ink sm:text-[1.5rem]">
                    {g.titre}
                  </h3>
                  <span className="mt-2 hidden text-[15px] leading-relaxed text-ink-2 sm:line-clamp-2">
                    {g.description}
                  </span>
                  <span className="champ mt-2 block text-ink-3 lg:hidden">
                    {g.rubrique} · {g.lecture} min
                  </span>
                </div>
                <span className="hidden flex-col items-end gap-2 text-right lg:flex">
                  <span className="champ rounded-full border border-rule-fort bg-card px-3 py-1 whitespace-nowrap text-accent-ink">
                    {g.rubrique}
                  </span>
                  <span className="champ whitespace-nowrap text-ink-3">
                    {g.date} · {g.lecture} min de lecture
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}

/** L'article à la une : la photo à gauche, la carte qui la chevauche à droite. */
function ALaUne({ guide: g }: { guide: FicheGuide }) {
  return (
    <Link
      href={g.chemin}
      className="group mt-10 grid items-center focus-visible:outline-none lg:grid-cols-12"
    >
      <span className="relative block aspect-[16/11] overflow-hidden rounded-[1.5rem] bg-paper-2 lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:aspect-[16/12]">
        {g.photo && (
          <Image
            src={g.photo.src}
            alt={g.photo.alt}
            fill
            priority
            sizes="(min-width: 1024px) 720px, 100vw"
            className="object-cover transition-transform duration-700 ease-[var(--ease-terouva)] group-hover:scale-[1.03]"
          />
        )}
        <span className="champ absolute top-4 left-4 rounded-full bg-card/90 px-3 py-1.5 text-accent-ink backdrop-blur-sm">
          {g.rubrique}
        </span>
      </span>
      <div className="relative z-10 -mt-10 mx-3 rounded-[1.5rem] border border-rule bg-card p-6 shadow-[0_24px_48px_-30px_rgb(23_24_26/0.4)] sm:mx-6 sm:p-8 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:mx-0 lg:mt-0 lg:p-10 group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-accent-ink">
        <span className="champ flex items-center gap-2 text-action">
          <svg viewBox="0 0 16 16" aria-hidden className="size-3.5 fill-current">
            <path d="M8 1.5l1.9 4 4.4.5-3.3 3 .9 4.3L8 11.1l-3.9 2.2.9-4.3-3.3-3 4.4-.5z" />
          </svg>
          <span className="text-accent-ink">À la une</span>
        </span>
        <h2 className="titre mt-4 text-[clamp(1.875rem,1.3rem+2vw,2.75rem)] text-ink">{g.titre}</h2>
        <span className="mt-4 block text-[16px] leading-relaxed text-ink-2">{g.description}</span>
        <span className="mt-6 flex items-center gap-4">
          <span className="champ text-ink-3">{g.lecture} min de lecture</span>
          <span className="champ inline-flex items-center gap-2 text-ink">
            Lire
            <span className="flex size-8 items-center justify-center rounded-full bg-action text-action-ink transition-transform duration-200 group-hover:translate-x-0.5">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden className="size-4">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </span>
        </span>
      </div>
    </Link>
  );
}

/** Le carré d'icône des filtres : plein quand le filtre est actif. */
function Pastille({ actif, children }: { actif?: boolean; children: React.ReactNode }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-8 items-center justify-center rounded-full",
        actif ? "bg-action text-action-ink" : "bg-paper-2 text-accent-ink",
      )}
    >
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="size-4">
        {children}
      </svg>
    </span>
  );
}

const ICONES: Record<Filtre, React.ReactNode> = {
  tous: (
    <>
      <rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1" />
      <rect x="9" y="2.5" width="4.5" height="4.5" rx="1" />
      <rect x="2.5" y="9" width="4.5" height="4.5" rx="1" />
      <rect x="9" y="9" width="4.5" height="4.5" rx="1" />
    </>
  ),
  // Avant de visiter : la loupe de la recherche.
  avant: (
    <>
      <circle cx="7" cy="7" r="4" />
      <path d="M10 10l3.5 3.5" />
    </>
  ),
  // Au moment de candidater : le message qui part.
  candidature: <path d="M2.5 7.5l11-5-4 11-2-4.5-5-1.5z" strokeLinejoin="round" />,
  // Une fois le logement trouvé : la clé.
  apres: (
    <>
      <circle cx="5.5" cy="10.5" r="3" />
      <path d="M7.7 8.3l5.8-5.8M11.5 4.5l1.5 1.5" />
    </>
  ),
};
