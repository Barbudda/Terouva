import Image from "next/image";
import { PLATEFORMES } from "@/lib/content";
import { TitreSection } from "@/components/ui/TitreSection";

/**
 * Les sites où l'on cherche, juste sous le plein cadre. Vague 2 du pôle Design
 * (15 novembre, docs/design/VAGUE-2.md) : à la manière du « Grow everywhere »
 * de FanClaw, un titre géant et de grandes icônes, rien d'autre. Le visiteur
 * reconnaît les applis qu'il a sur son téléphone ; il n'a rien à choisir.
 * Les onglets et les gains par site ont quitté la page (journal v2-vitrine).
 *
 * Les icônes officielles ont été relevées le 11 novembre dans la balise
 * `apple-touch-icon` de chaque site (`public/plateformes/`). Le pied de page
 * dit que Terouva n'a de lien avec aucun d'eux. La couleur de marque
 * (`styles/plateformes.css`) reste en fond, derrière les icônes transparentes.
 */
export function Plateformes() {
  return (
    <section
      id="plateformes"
      aria-labelledby="plateformes-titre"
      className="plateformes monde-papier scroll-mt-20"
    >
      <div className="cadre">
        <TitreSection id="plateformes-titre" titre={PLATEFORMES.titre} />

        <ul className="plateformes-icones">
          {PLATEFORMES.liste.map((s) => (
            <li key={s.id} data-site={s.id} className="plateformes-tuile">
              <Image
                src={s.icone}
                alt={s.nom}
                width={180}
                height={180}
                unoptimized
                className="plateformes-icone"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
