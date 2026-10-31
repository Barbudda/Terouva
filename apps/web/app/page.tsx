import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Instrument } from "@/components/sections/Instrument";
import { Fonctions } from "@/components/sections/Fonctions";
import { Messages } from "@/components/sections/Messages";
import { Outils } from "@/components/sections/Outils";
import { Privacy } from "@/components/sections/Privacy";
import { Inscription } from "@/components/sections/Inscription";
import { getSiteUrl } from "@/lib/site";
import { FAQ_ITEMS } from "@/lib/content";
import { DonneesStructurees } from "@/lib/seo";

/**
 * L'accueil : neuf blocs, six coquilles, et l'alternance des deux mondes.
 *
 *   A plein cadre  (Hero)        papier
 *   B papier large (Problem)     papier
 *   D bande nuit   (Instrument)  nuit
 *   C index        (Fonctions)   papier
 *   E mosaïque     (Messages)    papier
 *   C index        (Outils)      papier
 *   B papier large (Privacy)     papier
 *   D bande nuit   (Inscription) nuit
 *   F pied logotype (Footer)     papier
 *
 * Aucune coquille deux fois de suite, aucune plus de deux fois. Deux sections
 * consécutives ne démarrent jamais à la même colonne (voir chaque composant).
 */
export default function Home() {
  const siteUrl = getSiteUrl();

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

  // Une vidéo balisée peut ressortir dans les résultats de recherche avec sa
  // vignette. La durée suit la norme ISO 8601 : PT29S, vingt-neuf secondes.
  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Terouva en 29 secondes",
    description:
      "Comment Terouva repère les annonces de location qui vous correspondent, les note, et prépare votre message de candidature. Animation sans son.",
    thumbnailUrl: [`${siteUrl}/promo/affiche.jpg`],
    contentUrl: `${siteUrl}/promo/terouva.mp4`,
    // Refaite le 31 octobre avec le nouveau design de l'accueil.
    uploadDate: "2026-10-31",
    duration: "PT29S",
    inLanguage: "fr-FR",
    isFamilyFriendly: true,
    publisher: { "@id": `${siteUrl}/#organization` },
  };

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
      <DonneesStructurees data={videoJsonLd} />
      <Nav />
      <main className="overflow-x-clip">
        <Hero />
        <Problem />
        <Instrument />
        <Fonctions />
        <Messages />
        <Outils />
        <Privacy />
        <Inscription />
      </main>
      <Footer />
    </>
  );
}
