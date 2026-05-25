import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import Recherches from "@/pages/Recherches";
import Annonces from "@/pages/Annonces";
import Candidatures from "@/pages/Candidatures";
import Surveillance from "@/pages/Surveillance";
import Profil from "@/pages/Profil";
import Reglages from "@/pages/Reglages";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/surveillance" element={<Surveillance />} />
        <Route path="/recherches" element={<Recherches />} />
        <Route path="/annonces" element={<Annonces />} />
        <Route path="/annonces/:id" element={<Annonces />} />
        <Route path="/candidatures" element={<Candidatures />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/reglages" element={<Reglages />} />
      </Route>
    </Routes>
  );
}
