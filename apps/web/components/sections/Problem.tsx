import { PROBLEM } from "@/lib/content";
import { PapierLarge } from "@/components/layout/coquilles/PapierLarge";
import { VieAnnonce } from "@/components/sections/illustrations/VieAnnonce";

/**
 * Le problème, coquille B. L'énoncé à gauche, la réserve en face dans un
 * cadre, et dessous, sur toute la largeur, la vie d'une bonne annonce : ce
 * que l'énoncé dit, montré sur une piste. La section paraissait vide
 * (Hugo, 1er novembre).
 */
export function Problem() {
  const [enonce, reserve] = PROBLEM.body;
  return (
    <PapierLarge
      id="pourquoi"
      mention={PROBLEM.eyebrow}
      depart={2}
      secondeVoix={<p>{reserve}</p>}
      illustration={<VieAnnonce />}
      disposition="dessous"
      className="pt-[calc(var(--spacing-pas)+3rem)]"
    >
      <p>{enonce}</p>
    </PapierLarge>
  );
}
