import { PROBLEM } from "@/lib/content";
import { PapierLarge } from "@/components/layout/coquilles/PapierLarge";
import { VieAnnonce } from "@/components/sections/illustrations/VieAnnonce";

/**
 * Le gain, coquille B. L'énoncé à gauche, la seconde voix en face dans un
 * cadre, et dessous, sur toute la largeur, la vie d'une bonne annonce : où
 * l'on arrive avec Terouva, et où l'on arrive sans.
 */
export function Problem() {
  const [enonce, reserve] = PROBLEM.body;
  return (
    <PapierLarge
      id="gains"
      mention={PROBLEM.eyebrow}
      depart={2}
      secondeVoix={<p>{reserve}</p>}
      illustration={<VieAnnonce />}
      disposition="dessous"
    >
      <p>{enonce}</p>
    </PapierLarge>
  );
}
