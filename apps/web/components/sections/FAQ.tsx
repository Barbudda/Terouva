import { FAQ_ITEMS } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Questions } from "@/components/ui/Questions";

/**
 * Questions fréquentes, en liste pleine largeur, titre au-dessus.
 *
 * C'était un titre à gauche et une pile de sept cartes blanches à droite :
 * la même composition que le hero, et sept cadres arrondis à l'ombre douce
 * là où le `DESIGN.md` demande des filets. Une FAQ se balaie de haut en bas ;
 * la coincer dans une demi-largeur doublait sa hauteur pour rien. La liste
 * elle-même est rendue par le composant partagé, le même que sur les guides
 * et les outils, pour qu'une FAQ ait une seule forme sur tout le site.
 */
export function FAQ() {
  return (
    <section id="questions" className="px-4 pb-16 sm:px-6 md:pb-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading lead="Questions" tail="fréquentes." className="monte max-w-2xl" />
        <Questions questions={FAQ_ITEMS} titre={null} className="monte mt-10 max-w-3xl" ouvrirPremiere />
      </div>
    </section>
  );
}
