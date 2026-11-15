import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Plateformes } from "@/components/sections/Plateformes";
import { Etapes } from "@/components/sections/Etapes";
import { Problem } from "@/components/sections/Problem";
import { Messages } from "@/components/sections/Messages";
import { Outils } from "@/components/sections/Outils";
import { Inscription } from "@/components/sections/Inscription";
import { FAQ_ITEMS } from "@/lib/content";
import { DonneesStructurees } from "@/lib/seo";

/**
 * L'accueil, vague 2 du pôle Design (15 novembre, docs/design/VAGUE-2.md).
 * Hugo : le minimum, en très grand, à la manière de FanClaw et Rushlot. Après
 * le plein cadre, tout passe sur crème, coupé par deux bandes nuit.
 *
 *   plein cadre   (Hero)        le titre et la proposition de valeur
 *   crème         (Plateformes) partout où vous cherchez
 *   crème         (Etapes)      le récit produit, quatre grandes cartes
 *   nuit          (Problem)     le temps gagné, un chiffre géant
 *   crème         (Messages)    les messages qu'il écrit
 *   crème         (Outils)      les outils gratuits
 *   crème et nuit (Inscription) questions, puis clôture et liste d'attente
 *
 * Le 4 novembre, Hugo : le visiteur veut savoir ce qu'il gagne, pas comment
 * c'est fait. Le parcours et les fonctions disaient la même chose en deux
 * sections : ils ne font plus qu'un récit.
 */
export default function Home() {
  // Les questions fréquentes balisées remontent parfois directement dans les
  // résultats de recherche, sous le lien du site. C'est le balisage qui rapporte
  // le plus pour le moins d'effort, à condition que les réponses soient les
  // mêmes que celles affichées sur la page.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  // Plus de balisage VideoObject : la vidéo a quitté l'accueil, et Google
  // n'accepte une vidéo balisée que si elle est visible sur la page.

  /**
   * Pas de nœud `SoftwareApplication` ici, et c'est une décision.
   *
   * Google exige trois choses ensemble pour ce type : `name`, `offers`, **et**
   * `aggregateRating` ou `review`. Terouva n'a ni note ni avis, puisqu'il n'est
   * pas encore sorti. Déclarer un type qu'on ne peut pas remplir honnêtement ne
   * rapporte aucun résultat enrichi et coûte une erreur à chaque audit. À
   * rétablir le jour où de vrais avis existent, pas avant.
   */

  return (
    <>
      <DonneesStructurees data={faqJsonLd} />
      <Nav />
      <main className="overflow-x-clip">
        <Hero />
        <Plateformes />
        <Etapes />
        <Problem />
        <Messages />
        <Outils />
        <Inscription />
      </main>
      <Footer />
    </>
  );
}
