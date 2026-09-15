import { DocumentsChecklist } from "@app/components/DocumentsChecklist";
import Profil from "./Profil";
import Recherches from "./Recherches";

/**
 * « Mon dossier » : fusionne le profil locataire et les recherches dans une
 * seule page (simplification grand public : moins d'onglets). On réutilise les
 * composants existants tels quels, sous deux sections claires.
 */
export default function Dossier() {
  return (
    <div className="space-y-12">
      <section aria-labelledby="dossier-profil">
        <div className="mb-5 border-b border-rule pb-3">
          <h2 id="dossier-profil" className="font-serif text-2xl font-medium text-ink">
            Mon profil
          </h2>
          <p className="mt-1 text-[15px] text-ink-2">
            Vos informations servent à rédiger vos messages de candidature.
          </p>
        </div>
        <Profil />
      </section>

      <section aria-labelledby="dossier-recherches">
        <div className="mb-5 border-b border-rule pb-3">
          <h2 id="dossier-recherches" className="font-serif text-2xl font-medium text-ink">
            Mes recherches
          </h2>
          <p className="mt-1 text-[15px] text-ink-2">
            Ce que vous cherchez. Terouva s'en sert pour noter chaque annonce.
          </p>
        </div>
        <Recherches />
      </section>

      <section aria-labelledby="dossier-pieces">
        <div className="mb-5 border-b border-rule pb-3">
          <h2 id="dossier-pieces" className="font-serif text-2xl font-medium text-ink">
            Pièces du dossier
          </h2>
          <p className="mt-1 text-[15px] text-ink-2">
            Pour savoir en un coup d'œil ce qu'il vous reste à rassembler avant une visite.
          </p>
        </div>
        <DocumentsChecklist />
      </section>
    </div>
  );
}
