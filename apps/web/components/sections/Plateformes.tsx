"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { PLATEFORMES } from "@/lib/content";
import { TitreSection } from "@/components/ui/TitreSection";

/**
 * Les sites où l'on cherche, juste sous le plein cadre. Vague 2 du pôle Design
 * (15 novembre, docs/design/VAGUE-2.md), à la manière du « Grow everywhere » de
 * FanClaw : un titre géant, de grandes icônes nommées, et sous la rangée une
 * grande carte qui dit ce que Terouva change sur le site choisi. Les critiques
 * du même jour : sans le nom, la moitié des icônes est méconnaissable ; sans la
 * carte, on voit des logos, pas un gain.
 *
 * Les icônes officielles ont été relevées le 11 novembre dans la balise
 * `apple-touch-icon` de chaque site (`public/plateformes/`). Le pied de page
 * dit que Terouva n'a de lien avec aucun d'eux.
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
    onglets.current[j]?.focus();
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
      className="plateformes monde-papier scroll-mt-20"
    >
      <div className="cadre">
        <TitreSection id="plateformes-titre" titre={PLATEFORMES.titre} />

        <div role="tablist" aria-labelledby="plateformes-titre" className="plateformes-icones">
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
                <span className="plateformes-tuile">
                  {/* Le nom est écrit dessous : l'image est décorative. */}
                  <Image src={s.icone} alt="" width={180} height={180} unoptimized className="plateformes-icone" />
                </span>
                <span className="plateformes-nom">{s.nom}</span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id="plateformes-gains"
          aria-labelledby={`plateforme-${site.id}`}
          data-site={site.id}
          className="plateformes-carte"
        >
          <p className="plateformes-carte-site">
            <Image src={site.icone} alt="" width={48} height={48} unoptimized className="size-12 rounded-[22%]" />
            <span>{site.nom}</span>
          </p>
          <ul key={site.id} className="bascule plateformes-gains">
            {site.gains.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
