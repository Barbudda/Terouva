import { GUIDES, OUTILS } from "@/lib/catalogue";
import { IndexFilets } from "@/components/layout/coquilles/IndexFilets";

/**
 * Guides et outils, coquille C : un seul index à deux mentions.
 *
 * C'est le bloc qui fait travailler le maillage interne : chaque ligne pointe
 * vers une page réelle, et tous les guides sont listés, pas seulement trois
 * « mis en avant ». La mention de droite dit la nature de la page et, pour un
 * guide, son temps de lecture. Les outils passent en tête : ils rendent service
 * tout de suite, ce que l'application ne peut pas encore faire.
 */
export function Outils() {
  const lignes = [
    ...OUTILS.map((o) => ({
      titre: o.court,
      description: o.resume,
      mention: "Outil · gratuit",
      href: o.chemin,
    })),
    ...GUIDES.map((g) => ({
      titre: g.titreSeo,
      description: g.resume,
      mention: `Guide · ${g.lecture} min`,
      href: g.chemin,
    })),
  ].map((l, i) => ({ ...l, numero: String(i + 1).padStart(2, "0") }));

  return (
    <div id="outils" className="py-pas">
      <IndexFilets
        ariaLabel="Outils gratuits et guides"
        entete={
          <div className="grid grid-cols-12 gap-x-4 pb-10 sm:gap-x-6">
            <p className="mention col-span-12 sm:col-span-5 sm:col-start-3">Gratuit, dès aujourd&apos;hui</p>
            <h2 className="titre col-span-12 mt-3 text-titre-2 text-ink sm:col-span-8 sm:col-start-3 sm:mt-0">
              Un dossier complet et vos droits, sans attendre l&apos;application.
            </h2>
          </div>
        }
        lignes={lignes}
      />
    </div>
  );
}
