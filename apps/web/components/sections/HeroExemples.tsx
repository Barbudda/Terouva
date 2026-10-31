"use client";

import { useSyncExternalStore } from "react";
import { EXEMPLES_ACCUEIL } from "@/lib/exemples";
import { cn } from "@/lib/utils";

/**
 * Les exemples du plein cadre. Les deux flèches rondes de la référence passent
 * d'une annonce de la démonstration à l'autre, et les trois panneaux suivent :
 * l'annonce lue, sa note, le message qui lui répond. Rien n'est décoratif : ce
 * sont les six annonces réelles de la démo, notes et messages compris.
 *
 * Les flèches vivent sur les côtés du cadre, les panneaux en bas : ce sont des
 * composants séparés. Ils partagent l'exemple courant par un petit magasin de
 * module plutôt que par un contexte, pour que la coquille reste un composant
 * serveur.
 */
const TOTAL = EXEMPLES_ACCUEIL.length;
let courant = 0;
const abonnes = new Set<() => void>();

function abonner(rappel: () => void) {
  abonnes.add(rappel);
  return () => {
    abonnes.delete(rappel);
  };
}

function choisir(index: number) {
  courant = (index + TOTAL) % TOTAL;
  abonnes.forEach((rappel) => rappel());
}

function useExemple() {
  const index = useSyncExternalStore(
    abonner,
    () => courant,
    () => 0,
  );
  return { index, ...EXEMPLES_ACCUEIL[index] };
}

const euros = (n: number, decimales = 0) =>
  `${n.toLocaleString("fr-FR", { maximumFractionDigits: decimales })} €`;

/** Une flèche ronde, en vitre, comme sur la référence. */
export function Fleche({
  sens,
  className,
}: {
  sens: -1 | 1;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => choisir(courant + sens)}
      aria-label={
        sens < 0 ? "Annonce d'exemple précédente" : "Annonce d'exemple suivante"
      }
      className={cn("fleche-ronde", className)}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="size-5"
      >
        {sens < 0 ? (
          <path d="M19 12H5M11 6l-6 6 6 6" />
        ) : (
          <path d="M5 12h14M13 6l6 6-6 6" />
        )}
      </svg>
    </button>
  );
}

/** Sur petit écran, les flèches descendent au-dessus des panneaux, avec le compteur. */
export function ControlesMobiles() {
  const { index } = useExemple();
  return (
    <div className="flex items-center justify-center gap-4 lg:hidden">
      <Fleche sens={-1} className="fleche-ronde--petite inline-flex" />
      <p className="rounded-full bg-paper/70 px-3 py-1.5 font-mono text-[13px] text-ink tabular-nums backdrop-blur-sm">
        {index + 1} / {TOTAL}
      </p>
      <Fleche sens={1} className="fleche-ronde--petite inline-flex" />
    </div>
  );
}

/** L'annonce lue : une feuille claire, ce que Terouva en retient. */
export function PanneauAnnonce() {
  const { index, annonce: a } = useExemple();
  const lignes = [
    { champ: "Loyer", valeur: euros(a.prix) },
    { champ: "Surface", valeur: `${a.surface} m²` },
    { champ: "Au m²", valeur: euros(a.prix / a.surface, 1) },
    { champ: "Annonceur", valeur: a.auteur },
  ];
  return (
    <article className="monde-papier h-full rounded-[0.875rem] border border-rule bg-card p-5 text-ink">
      <p className="sr-only" aria-live="polite">
        Exemple {index + 1} sur {TOTAL} : {a.titre}, note {a.note} sur 100.
      </p>
      <div key={index} className="bascule">
        <div className="flex items-start justify-between gap-4">
          <p className="text-[15px] leading-snug font-medium">{a.titre}</p>
          <p className="champ shrink-0 text-ink-3 tabular-nums">
            {index + 1}/{TOTAL}
          </p>
        </div>
        <p className="marge mt-1">
          {a.ville} · {a.publie}
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
          {lignes.map((l) => (
            <div key={l.champ}>
              <dt className="champ text-ink-3">{l.champ}</dt>
              <dd className="mt-0.5 text-[14px] font-medium tabular-nums">
                {l.valeur}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

/**
 * La note : l'anneau, ce qui la fait monter ou descendre, et le graphique des
 * six annonces classées, comme la courbe du panneau central de la référence.
 * Chaque barre se clique : elle affiche son annonce.
 */
export function PanneauNote() {
  const { index, annonce: a } = useExemple();
  const rayon = 26;
  const perimetre = 2 * Math.PI * rayon;
  return (
    <article className="monde-papier h-full rounded-[0.875rem] border border-white/70 bg-paper/85 p-5 text-ink backdrop-blur-md">
      <div className="flex items-center gap-5">
        <div className="relative size-16 shrink-0">
          <svg viewBox="0 0 64 64" className="size-full -rotate-90" aria-hidden>
            <circle
              cx="32"
              cy="32"
              r={rayon}
              fill="none"
              stroke="var(--color-rule)"
              strokeWidth="3"
            />
            <circle
              cx="32"
              cy="32"
              r={rayon}
              fill="none"
              stroke="var(--color-action)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={perimetre}
              strokeDashoffset={perimetre * (1 - a.note / 100)}
              className="transition-[stroke-dashoffset] duration-500 ease-[var(--ease-terouva)]"
            />
          </svg>
          <p className="absolute inset-0 flex items-center justify-center font-mono text-xl tabular-nums">
            {a.note}
            <span className="sr-only"> sur 100</span>
          </p>
        </div>
        <div
          key={index}
          className="bascule min-w-0 flex-1 space-y-2 text-[13px] leading-snug text-ink-2"
        >
          {a.pour && (
            <p>
              <span className="champ mr-1.5 text-accent-ink">Pour</span>
              {a.pour}
            </p>
          )}
          {a.contre && (
            <p>
              <span className="champ mr-1.5 text-ink-3">Contre</span>
              {a.contre}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 flex h-20 items-end gap-2">
        {EXEMPLES_ACCUEIL.map((e, j) => {
          const hauteur = `${Math.max(e.annonce.note, 6)}%`;
          const actif = j === index;
          return (
            <button
              key={e.annonce.titre}
              type="button"
              onClick={() => choisir(j)}
              aria-label={`Voir l'annonce « ${e.annonce.titre} », note ${e.annonce.note} sur 100`}
              aria-pressed={actif}
              className="group relative flex h-full flex-1 items-end rounded-sm"
            >
              <span
                aria-hidden
                className={cn(
                  "block w-full rounded-t-[3px] transition-colors duration-200",
                  actif ? "bg-action" : "bg-blue/30 group-hover:bg-blue/55",
                )}
                style={{ height: hauteur }}
              />
              {actif && (
                <span
                  aria-hidden
                  className="absolute left-1/2 size-3.5 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-card bg-action shadow-sm"
                  style={{ bottom: hauteur }}
                />
              )}
            </button>
          );
        })}
      </div>
      <p className="marge mt-2">
        Les six annonces de la démonstration, classées par note.
      </p>
    </article>
  );
}

/** Le message qui répond à l'annonce : les premières lignes du brouillon réel. */
export function PanneauMessage() {
  const { index, message: m } = useExemple();
  const paragraphes = m.texte.split("\n\n").slice(0, 3);
  return (
    <article className="h-full rounded-[0.875rem] border border-white/10 bg-night/80 p-5 text-night-ink backdrop-blur-md">
      <div key={index} className="bascule">
        <p className="champ text-blue-clair">Ton {m.ton.toLowerCase()}</p>
        <div className="mt-3 space-y-2 text-[13px] leading-relaxed text-night-ink-2">
          {paragraphes.map((p) => (
            <p key={p} className="line-clamp-2">
              {p}
            </p>
          ))}
        </div>
        <p className="champ mt-4 text-night-ink-2">
          Vous relisez, vous l&apos;envoyez
        </p>
      </div>
    </article>
  );
}
