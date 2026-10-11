import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { Messages } from "@/components/sections/Messages";
import { Demo } from "@/components/sections/Demo";
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
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
  };

  return (
    <>
      <DonneesStructurees data={appJsonLd} />
      <DonneesStructurees data={faqJsonLd} />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Features />
        <Messages />
        <Demo />
        <Privacy />
        <FAQ />
        <Signup />
      </main>
      <Footer />
    </>
  );
}
