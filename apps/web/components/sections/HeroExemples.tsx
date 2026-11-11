"use client";

import { useSyncExternalStore } from "react";
import { EXEMPLES_ACCUEIL } from "@/lib/exemples";
import { PLATEFORMES } from "@/lib/content";
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

/** Les deux flèches et le compteur, au-dessus des panneaux du parcours. */
export function Controles({ className }: { className?: string }) {
  const { index } = useExemple();
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Fleche sens={-1} className="fleche-ronde--petite inline-flex" />
      <p className="rounded-full bg-paper/70 px-3 py-1.5 font-mono text-[13px] text-ink tabular-nums backdrop-blur-sm">
        {index + 1} / {TOTAL}
      </p>
      <Fleche sens={1} className="fleche-ronde--petite inline-flex" />
    </div>
  );
}

/**
 * Le site d'où vient chaque annonce d'exemple, au rythme des flèches. Les
 * annonces d'agence passent sur SeLoger, celles de particuliers alternent
 * entre Leboncoin et PAP (PAP ne publie que des particuliers).
 */
const SITE_EXEMPLE = ["leboncoin", "pap", "seloger", "leboncoin", "pap", "seloger"];
function siteDe(index: number, auteur: string) {
  const id = auteur === "Agence" ? "seloger" : (SITE_EXEMPLE[index] ?? "leboncoin");
  return PLATEFORMES.liste.find((p) => p.id === id) ?? PLATEFORMES.liste[0];
}

/**
 * L'annonce telle qu'elle paraît sur le site qui l'a publiée : une ligne de
 * liste vue sur téléphone, vignette à gauche, titre, loyer en gras, badge du
 * vendeur, lieu et fraîcheur en gris. C'est une reconstitution : la couleur
 * du site et la grammaire de ses cartes, pas son logo ni ses polices, et
 * l'annonce est l'une des six annonces fictives de la démo. La vignette est
 * une fenêtre dessinée, jamais une photo.
 */
export function PanneauAnnonce() {
  const { index, annonce: a } = useExemple();
  const site = siteDe(index, a.auteur);
  return (
    <article
      data-site={site.id}
      className="annonce-site h-full rounded-[0.875rem] p-4"
    >
      <p className="sr-only" aria-live="polite">
        Exemple {index + 1} sur {TOTAL} : {a.titre}, note {a.note} sur 100.
      </p>
      <div key={index} className="bascule">
        <div className="annonce-site-tete">
          <p className="annonce-site-nom">{site.nom}</p>
          <p className="font-mono text-[12px] tabular-nums">
            {index + 1}/{TOTAL}
          </p>
        </div>
        <div className="mt-3 flex gap-3">
          <div className="annonce-site-vignette" aria-hidden>
            <svg viewBox="0 0 48 48" fill="none" className="size-8">
              <rect x="10" y="8" width="28" height="32" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M24 8v32M10 22h28" stroke="currentColor" strokeWidth="2" />
            </svg>
            <svg viewBox="0 0 24 24" fill="none" className="annonce-site-coeur">
              <path
                d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="annonce-site-titre line-clamp-2">{a.titre}</p>
            <p className="annonce-site-prix">
              {euros(a.prix)}
              <span className="annonce-site-mois"> / mois</span>
            </p>
            <p className="annonce-site-badge">{a.auteur}</p>
          </div>
        </div>
        <p className="annonce-site-lieu">
          {a.surface} m² · {a.ville} · {a.publie}
        </p>
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
        Six annonces d&apos;exemple, classées pour vous.
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

/**
 * La fin du parcours : la candidature est partie, envoyée par la personne
 * elle-même, et Terouva en tient le suivi. Le premier pas est fait, les deux
 * suivants attendent le propriétaire.
 */
export function PanneauEnvoi() {
  const { index, annonce: a } = useExemple();
  const suivi = [
    { etape: "Envoyée", fait: true },
    { etape: "Réponse", fait: false },
    { etape: "Visite", fait: false },
  ];
  return (
    <article className="monde-papier h-full rounded-[0.875rem] border border-rule bg-card p-5 text-ink">
      <div key={index} className="bascule">
        <p className="champ inline-flex items-center gap-2 text-accent-ink">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="size-3.5"
          >
            <path d="M3 8.5l3 3 7-7" />
          </svg>
          Candidature envoyée
        </p>
        <p className="mt-3 line-clamp-2 text-[14px] leading-snug font-medium">
          {a.titre}
        </p>
        <ol className="mt-4 grid grid-cols-3 gap-2">
          {suivi.map((s) => (
            <li key={s.etape}>
              <span
                aria-hidden
                className={cn(
                  "block h-1 rounded-full",
                  s.fait ? "bg-action" : "bg-rule",
                )}
              />
              <span className="champ mt-1.5 block text-ink-3">{s.etape}</span>
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}
