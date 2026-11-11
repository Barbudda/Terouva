"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { PLATEFORMES } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * La rangée des sites où l'on cherche, juste sous le plein cadre : le visiteur
 * reconnaît les icônes qu'il a sur son téléphone avant de lire quoi que ce
 * soit. Une tuile d'app par site, à la couleur de sa marque, et sous la rangée
 * les deux gains du site choisi.
 *
 * Aucun des huit sites n'a d'icône dans Simple Icons (vérifié le 11 novembre
 * 2026, versions 15 et 16) : chaque tuile porte donc le nom du site en
 * mot-symbole. Les couleurs ont été relevées sur la page d'accueil de chaque
 * site, elles vivent dans `styles/plateformes.css`.
 *
 * Motif onglets accessible : une seule tuile dans l'ordre de tabulation, les
 * flèches passent d'un site à l'autre, Début et Fin vont aux extrémités.
 */
const SITES = PLATEFORMES.liste;

/**
 * Taille du mot-symbole, en pourcentage de la largeur de la tuile : le mot le
 * plus long doit tenir sur une ligne. Au-delà de deux mots, le nom se répartit
 * sur deux lignes, et c'est la demi-longueur qui compte.
 */
function tailleMot(nom: string) {
  const mots = nom.split(" ");
  const ligne =
    mots.length > 2
      ? Math.ceil(nom.length / 2)
      : Math.max(...mots.map((m) => m.length));
  return `${Math.min(32, 175 / ligne).toFixed(1)}cqi`;
}

export function Plateformes() {
  const [choisi, setChoisi] = useState(0);
  const onglets = useRef<(HTMLButtonElement | null)[]>([]);
  const site = SITES[choisi];

  const aller = (i: number) => {
    const j = (i + SITES.length) % SITES.length;
    setChoisi(j);
    const onglet = onglets.current[j];
    onglet?.focus();
    // Sur téléphone, la rangée défile : la tuile choisie au clavier reste visible.
    onglet?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  const auClavier = (e: KeyboardEvent<HTMLButtonElement>) => {
    const cibles: Record<string, number> = {
      ArrowRight: choisi + 1,
      ArrowLeft: choisi - 1,
      Home: 0,
      End: SITES.length - 1,
    };
    if (e.key in cibles) {
      e.preventDefault();
      aller(cibles[e.key]);
    }
  };

  return (
    <section
      id="plateformes"
      aria-labelledby="plateformes-titre"
      className="plateformes cadre scroll-mt-20"
    >
      <h2 id="plateformes-titre" className="titre text-titre-2 text-ink">
        {PLATEFORMES.titre}
      </h2>
      <p className="mt-3 text-ink-2">{PLATEFORMES.aide}</p>

      <div
        role="tablist"
        aria-labelledby="plateformes-titre"
        className="plateformes-rangee"
      >
        {SITES.map((s, i) => {
          const actif = i === choisi;
          const ouverture = s.etat === "À l'ouverture";
          return (
            <button
              key={s.id}
              ref={(el) => {
                onglets.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`plateforme-${s.id}`}
              aria-selected={actif}
              aria-controls="plateformes-gains"
              tabIndex={actif ? 0 : -1}
              onClick={() => setChoisi(i)}
              onKeyDown={auClavier}
              data-site={s.id}
              className="plateformes-onglet"
            >
              <span className="plateformes-tuile" aria-hidden>
                <span
                  className="plateformes-mot"
                  style={{ "--mot": tailleMot(s.nom) } as CSSProperties}
                >
                  {s.nom}
                </span>
              </span>
              <span className="sr-only">{s.nom}, </span>
              <span
                className={cn(
                  "plateformes-badge",
                  ouverture && "plateformes-badge--ouverture",
                )}
              >
                {s.etat}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="plateformes-gains"
        aria-labelledby={`plateforme-${site.id}`}
        data-site={site.id}
        className="plateformes-gains"
      >
        <p className="champ text-ink-3">{site.domaine}</p>
        <ul key={site.id} className="bascule mt-4 grid gap-4 md:grid-cols-2 md:gap-8">
          {site.gains.map((g) => (
            <li key={g} className="plateformes-gain">
              {g}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
