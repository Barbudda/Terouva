import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Fonctions } from "@/components/sections/Fonctions";
import { Messages } from "@/components/sections/Messages";
import { Outils } from "@/components/sections/Outils";
import { Inscription } from "@/components/sections/Inscription";
import { FAQ_ITEMS } from "@/lib/content";
import { DonneesStructurees } from "@/lib/seo";

/**
 * L'accueil : sept blocs, ce que l'on gagne d'abord.
 *
 *   A plein cadre  (Hero)        le parcours, de l'annonce à l'envoi
 *   B papier large (Problem)     le gain : écrire parmi les premiers
 *   C index        (Fonctions)   ce que fait l'outil, ligne par ligne
 *   E mosaïque     (Messages)    les messages qu'il écrit
 *   C index        (Outils)      ce qui sert déjà, gratuitement
 *   D bande nuit   (Inscription) questions et liste d'attente
 *   F pied logotype (Footer)
 *
 * Le 4 novembre, Hugo : le visiteur veut savoir ce qu'il gagne, pas comment
 * c'est fait. L'explication du fonctionnement (la note et ce qui la compose,
 * la vidéo) sort de la page ; la section sur les données aussi, réduite à une
 * ligne des fonctions et à une question de la FAQ.
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
        <Problem />
        <Fonctions />
        <Messages />
        <Outils />
        <Inscription />
      </main>
      <Footer />
    </>
  );
}
