import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { getSetting } from "@/lib/db";
import { Onboarding } from "@/pages/Onboarding";
import Annonces from "@/pages/Annonces";
import Candidatures from "@/pages/Candidatures";
import Dossier from "@/pages/Dossier";
import Surveillance from "@/pages/Surveillance";
import Profil from "@/pages/Profil";
import Recherches from "@/pages/Recherches";
import Reglages from "@/pages/Reglages";

export default function App() {
  // null = en cours de vérification, false = à onboarder, true = prêt.
  const [onboarded, setOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    getSetting("onboarded")
      .then((v) => setOnboarded(v === "1"))
      .catch(() => setOnboarded(true)); // en cas d'erreur DB, ne bloque pas l'app
  }, []);

  if (onboarded === null) {
    return <div className="h-full grid place-items-center text-zinc-500">…</div>;
  }

  if (!onboarded) {
    return <Onboarding onDone={() => setOnboarded(true)} />;
  }

  return (
    <Routes>
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
