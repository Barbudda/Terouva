import { FEATURES } from "@/lib/content";
import { IndexFilets } from "@/components/layout/coquilles/IndexFilets";

/**
 * Ce que fait l'outil, coquille C : un seul index numéroté, 01 à 05.
 *
 * La mention de droite porte l'état, et c'est ce qui rend la liste honnête.
 * « Disponible » : ça marche aujourd'hui, dans l'outil gratuit ou par
 * construction. « En démo » : on le voit dans la démonstration du navigateur.
 * « Bientôt » : il faut l'application, qui n'est pas sortie. Dire « bientôt »
 * en monospace à droite d'une ligne se lit comme une feuille de route ; le
 * dire dans une carte avec une coche verte ressemble à une promesse.
 */
const ETAT: Record<(typeof FEATURES)[number]["icon"], string> = {
  bell: "Bientôt",
  gauge: "En démo",
  pen: "Disponible",
  send: "En démo",
  lock: "Disponible",
};

export function Fonctions() {
  return (
    <div id="fonctions" className="py-pas">
      <IndexFilets
        ariaLabel="Ce que fait Terouva"
        entete={
          <div className="grid grid-cols-12 gap-x-4 pb-10 sm:gap-x-6">
            <p className="mention col-span-12 sm:col-span-4 sm:col-start-2">Ce que fait Terouva</p>
            <h2 className="titre col-span-12 mt-3 text-titre-2 text-ink sm:col-span-7 sm:col-start-2 sm:mt-0">
              Moins de recherche, plus de visites.
            </h2>
          </div>
        }
        lignes={FEATURES.map((f, i) => ({
          numero: `0${i + 1}`,
          titre: f.title,
          description: f.body,
          mention: ETAT[f.icon],
        }))}
      />
    </div>
  );
}
