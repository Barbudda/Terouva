import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Chiffres } from "@/components/sections/Chiffres";
import { Video } from "@/components/sections/Video";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { Messages } from "@/components/sections/Messages";
import { Demo } from "@/components/sections/Demo";
import { Outils } from "@/components/sections/Outils";
import { Privacy } from "@/components/sections/Privacy";
import { FAQ } from "@/components/sections/FAQ";
import { Signup } from "@/components/sections/Signup";
import { getSiteUrl } from "@/lib/site";
import { FAQ_ITEMS } from "@/lib/content";
import { DonneesStructurees } from "@/lib/seo";

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
    uploadDate: "2026-10-12",
    duration: "PT29S",
    inLanguage: "fr-FR",
    isFamilyFriendly: true,
    publisher: { "@id": `${siteUrl}/#organization` },
  };

  /**
   * Pas de nœud `SoftwareApplication` ici, et c'est une décision.
   *
   * Google exige trois choses ensemble pour ce type : `name`, `offers`, **et**
   * `aggregateRating` ou `review`. Pas l'un ou l'autre, les trois. Un premier
   * diagnostic maison avait lu cette règle comme une alternative et concluait
   * à tort que le balisage était complet ; l'audit Semrush, lui, comptait cinq
   * items invalides, dont celui-ci.
   *
   * Terouva n'a ni note ni avis, puisqu'il n'est pas encore sorti. Les inventer
   * est exclu. Déclarer un type qu'on ne peut pas remplir honnêtement ne
   * rapporte aucun résultat enrichi et coûte une erreur à chaque audit : on
   * retire le nœud. Le produit reste décrit par `Organization` et `WebSite`
   * dans le gabarit, par la vidéo, et par les questions fréquentes.
   *
   * À rétablir le jour où de vrais avis existent, pas avant.
   */

  return (
    <>
      <DonneesStructurees data={faqJsonLd} />
      <DonneesStructurees data={videoJsonLd} />
      <Nav />
      <main>
        <Hero />
        <Chiffres />
        <Video />
        <Problem />
        <HowItWorks />
        <Features />
        <Messages />
        <Demo />
        <Outils />
        <Privacy />
        <FAQ />
        <Signup />
      </main>
      <Footer />
    </>
  );
}
