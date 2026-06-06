import Profil from "./Profil";
import Recherches from "./Recherches";

/**
 * « Mon dossier » — fusionne le profil locataire et les recherches dans une
 * seule page (simplification grand public : moins d'onglets). On réutilise les
 * composants existants tels quels, sous deux sections claires.
 */
export default function Dossier() {
  return (
    <div className="space-y-10">
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold tracking-tight text-zinc-100">
            Mon profil
          </h2>
          <p className="text-sm text-zinc-500">
            Tes infos locataire — elles pré-remplissent tes messages de candidature.
          </p>
        </div>
        <Profil />
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold tracking-tight text-zinc-100">
            Mes recherches
          </h2>
          <p className="text-sm text-zinc-500">
            Les recherches Leboncoin que Terouva surveille et utilise pour scorer.
          </p>
        </div>
        <Recherches />
      </section>
    </div>
  );
}
