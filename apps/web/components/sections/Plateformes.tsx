"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { PLATEFORMES } from "@/lib/content";

/**
 * La rangée des sites où l'on cherche, juste sous le plein cadre : le visiteur
 * reconnaît les icônes qu'il a sur son téléphone avant de lire quoi que ce
 * soit. Une tuile d'app par site, à la couleur de sa marque, et sous la rangée
 * les deux gains du site choisi.
 *
 * Chaque tuile porte l'icône officielle du site (Hugo, 11 novembre : « mets
 * leurs plaquettes »), relevée le même jour dans la balise `apple-touch-icon`
 * de sa page d'accueil et rangée dans `public/plateformes/`. Les noms sont cités
 * pour dire où l'outil agit ; le pied de page dit que Terouva n'a de lien avec
 * aucun de ces sites. La couleur de marque (`styles/plateformes.css`) reste en
 * fond, derrière les icônes transparentes.
 *
 * Motif onglets accessible : une seule tuile dans l'ordre de tabulation, les
 * flèches passent d'un site à l'autre, Début et Fin vont aux extrémités.
 */
const SITES = PLATEFORMES.liste;

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
              {/* Plus de badge d'état (Hugo, 11 novembre) : la tuile seule. Le nom
                  du site est le texte de l'icône, qui donne son nom à l'onglet. */}
              <span className="plateformes-tuile">
                <Image
                  src={s.icone}
                  alt={s.nom}
                  width={180}
                  height={180}
                  unoptimized
                  className="plateformes-icone"
                />
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
