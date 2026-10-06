import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@app/components/Layout";
import { getSetting } from "@app/lib/db";
import { useDemoStore } from "@app/store/useDemoStore";
import { Onboarding } from "@app/pages/Onboarding";
import Annonces from "@app/pages/Annonces";
import ExempleAnnonce from "@app/pages/ExempleAnnonce";
import Candidatures from "@app/pages/Candidatures";
import Dossier from "@app/pages/Dossier";
import Surveillance from "@app/pages/Surveillance";
import Profil from "@app/pages/Profil";
import Recherches from "@app/pages/Recherches";
import Reglages from "@app/pages/Reglages";

export default function App() {
  // null = en cours de vérification, false = à onboarder, true = prêt.
  const [onboarded, setOnboarded] = useState<boolean | null>(null);

  // La démonstration pose puis retire le drapeau « onboarded » : on le relit à
  // chaque bascule, pour entrer directement dans l'app au lancement et
  // reproposer la configuration à la sortie.
  const demoActive = useDemoStore((s) => s.active);

  useEffect(() => {
    getSetting("onboarded")
      .then((v) => setOnboarded(v === "1"))
      .catch(() => setOnboarded(true)); // en cas d'erreur DB, ne bloque pas l'app
  }, [demoActive]);

  if (onboarded === null) {
    return (
      <div role="status" className="grid h-dvh place-items-center bg-paper text-[15px] text-ink-3">
        Ouverture de Terouva…
      </div>
    );
  }

  if (!onboarded) {
    return <Onboarding onDone={() => setOnboarded(true)} />;
  }

  return (
    <Routes>
      {/* Annonce d'exemple de la démonstration : plein écran, hors coque. */}
      <Route path="/exemple/:n" element={<ExempleAnnonce />} />
      <Route element={<Layout />}>
        {/* Feed-first : l'écran principal = les annonces. */}
        <Route path="/" element={<Annonces />} />
        <Route path="/annonces/:id" element={<Annonces />} />
        <Route path="/candidatures" element={<Candidatures />} />
        <Route path="/dossier" element={<Dossier />} />
        <Route path="/reglages" element={<Reglages />} />
        {/* Routes secondaires (accessibles depuis Réglages / liens), hors nav principale. */}
        <Route path="/surveillance" element={<Surveillance />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/recherches" element={<Recherches />} />
      </Route>
    </Routes>
  );
}
