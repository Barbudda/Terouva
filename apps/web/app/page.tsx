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

  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Terouva",
    url: `${siteUrl}/`,
    description:
      "Terouva repère les annonces de location qui vous correspondent, les classe et prépare votre message de candidature. Tout reste sur votre ordinateur.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "macOS, Windows",
    inLanguage: "fr-FR",
    // Pas de bloc `offers` : l'application n'est pas encore en vente et son prix
    // n'est pas arrêté. Annoncer « 0 € » serait faux, annoncer un prix qui peut
    // bouger le serait aussi, et un balisage inexact se paie en référencement.
  };

  return (
    <>
      <DonneesStructurees data={appJsonLd} />
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
