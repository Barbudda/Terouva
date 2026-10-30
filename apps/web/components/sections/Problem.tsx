import { PROBLEM } from "@/lib/content";
import { PapierLarge } from "@/components/layout/coquilles/PapierLarge";

/**
 * Le problème, coquille B. L'énoncé à gauche, et à droite plus bas la
 * seconde voix, qui porte la réserve. Aucune illustration : c'est la section
 * qui doit paraître vide.
 */
export function Problem() {
  const [enonce, reserve] = PROBLEM.body;
  return (
    <PapierLarge id="pourquoi" mention={PROBLEM.eyebrow} depart={2} secondeVoix={<p>{reserve}</p>}>
      <p>{enonce}</p>
    </PapierLarge>
  );
}
