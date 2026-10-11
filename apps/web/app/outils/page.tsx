import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Ariane } from "@/components/layout/Ariane";
import { FinDePage } from "@/components/layout/FinDePage";
import { GUIDES, OUTILS } from "@/lib/catalogue";
import { DonneesStructurees, filAriane, pageMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";

const CHEMIN = "/outils";

export const metadata = pageMetadata({
  titre: "Outils gratuits pour votre recherche de logement",
  description:
    "Des outils qui tournent dans votre navigateur, sans compte et sans limite. Rien n'est envoyé à un serveur, rien n'est conservé.",
  chemin: CHEMIN,
});

const ETAPES = [
  { nom: "Accueil", chemin: "/" },
  { nom: "Outils gratuits", chemin: CHEMIN },
];

export default function Outils() {
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}${CHEMIN}#collection`,
    name: "Outils gratuits pour votre recherche de logement",
    inLanguage: "fr-FR",
    hasPart: OUTILS.map((o) => ({
      "@type": "WebApplication",
      name: o.titre,
      description: o.description,
      url: `${siteUrl}${o.chemin}`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Tout navigateur web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      isAccessibleForFree: true,
    })),
  };

  return (
    <>
      <DonneesStructurees data={jsonLd} />
      <DonneesStructurees data={filAriane(ETAPES)} />
      <Nav home={false} />

      <main className="px-4 pt-10 pb-16 sm:px-6 md:pt-14">
        <div className="mx-auto max-w-5xl">
          <Ariane etapes={ETAPES} />

          <h1 className="display mt-5 max-w-3xl text-[2.1rem] text-ink sm:text-5xl">
            Des outils gratuits, <span className="text-accent">qui ne gardent rien.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
            Pas de compte à créer, pas de limite d&apos;utilisation, pas d&apos;adresse e-mail à
            laisser. Tout tourne dans votre navigateur : ces pages n&apos;envoient aucune donnée à
            un serveur, et rien n&apos;est conservé quand vous fermez l&apos;onglet.
          </p>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {OUTILS.map((o) => (
              <li key={o.chemin}>
                <Link href={o.chemin} className="card-soft group block h-full p-6 sm:p-7">
                  <h2 className="display text-xl text-ink transition-colors group-hover:text-accent">
                    {o.titre}
                  </h2>
                  <p className="mt-3 leading-relaxed text-ink-2">{o.resume}</p>
                  <p className="mt-4 text-sm font-semibold text-accent">Ouvrir l&apos;outil</p>
                </Link>
              </li>
            ))}
          </ul>

          <section className="mt-16">
            <h2 className="display text-2xl text-ink">À lire aussi</h2>
            <ul className="mt-6 divide-y divide-rule border-t border-rule">
              {GUIDES.map((g) => (
                <li key={g.chemin}>
                  <Link href={g.chemin} className="group block py-5">
                    <h3 className="max-w-3xl font-bold text-ink transition-colors group-hover:text-accent">
                      {g.titre}
                    </h3>
                    <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-ink-2">
                      {g.resume}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <div className="max-w-[44rem]">
            <FinDePage />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
