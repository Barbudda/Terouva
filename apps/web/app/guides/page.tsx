import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Ariane } from "@/components/layout/Ariane";
import { FinDePage } from "@/components/layout/FinDePage";
import { GUIDES, OUTILS } from "@/lib/catalogue";
import { DonneesStructurees, filAriane, pageMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";

const CHEMIN = "/guides";

export const metadata = pageMetadata({
  titre: "Guides pour trouver une location",
  description:
    "Le dossier, le garant, le message : ce qu'il faut savoir pour chercher un logement. Des pages courtes, vérifiées, avec leurs sources.",
  chemin: CHEMIN,
});

const ETAPES = [
  { nom: "Accueil", chemin: "/" },
  { nom: "Guides", chemin: CHEMIN },
];

export default function Guides() {
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}${CHEMIN}#collection`,
    name: "Guides pour trouver une location",
    inLanguage: "fr-FR",
    hasPart: GUIDES.map((g) => ({
      "@type": "Article",
      headline: g.titre,
      description: g.description,
      url: `${siteUrl}${g.chemin}`,
      datePublished: g.publieLe,
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
            Chercher un logement,{" "}
            <span className="text-accent">sans y perdre son temps ni ses droits.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
            Des pages courtes sur ce qui bloque vraiment une recherche : le dossier, le garant, le
            premier message. Chacune indique sa date de vérification et ses sources, parce que ce
            sujet est plein de textes recopiés et périmés.
          </p>

          <ul className="mt-12 divide-y divide-rule border-t border-rule">
            {GUIDES.map((g) => (
              <li key={g.chemin}>
                <Link href={g.chemin} className="group block py-7">
                  <h2 className="display max-w-3xl text-xl text-ink transition-colors group-hover:text-accent sm:text-2xl">
                    {g.titre}
                  </h2>
                  <p className="mt-2.5 max-w-2xl leading-relaxed text-ink-2">{g.resume}</p>
                  <p className="mt-3 text-sm text-ink-3">{g.lecture} min de lecture</p>
                </Link>
              </li>
            ))}
          </ul>

          <section className="mt-16">
            <h2 className="display text-2xl text-ink">Et des outils, gratuits</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {OUTILS.map((o) => (
                <li key={o.chemin}>
                  <Link href={o.chemin} className="card-soft group block h-full p-6">
                    <h3 className="font-bold text-ink transition-colors group-hover:text-accent">
                      {o.titre}
                    </h3>
                    <p className="mt-2 leading-relaxed text-ink-2">{o.resume}</p>
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
