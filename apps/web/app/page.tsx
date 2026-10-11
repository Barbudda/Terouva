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

export default function Home() {
  const siteUrl = getSiteUrl();
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
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
