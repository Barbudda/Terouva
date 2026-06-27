import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { Privacy } from "@/components/sections/Privacy";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { getSiteUrl } from "@/lib/site";

export default function Home() {
  const siteUrl = getSiteUrl();
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Terouva",
    url: `${siteUrl}/`,
    description:
      "Terouva surveille Leboncoin pour vous et prépare votre message. Vous êtes prévenu dès qu'une annonce vous correspond. Tout reste sur votre ordinateur.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "macOS, Windows, Linux",
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
        <Privacy />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
