import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Ariane } from "@/components/layout/Ariane";
import { FinDePage } from "@/components/layout/FinDePage";
import { FiltresPiliers } from "@/components/blog/FiltresPiliers";
import { ListeArticles } from "@/components/blog/ListeArticles";
import {
  BLOG,
  PAGES_PILIERS,
  PILIERS,
  articlesDuPilier,
  cheminArticle,
  cheminPilier,
  piliersAvecPage,
  piliersHabites,
  pilierParSlug,
  type Pilier,
} from "@/lib/blog";
import { GUIDES } from "@/lib/catalogue";
import { DonneesStructurees, filAriane, pageMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";

/*
 * Une page par pilier, seulement pour les piliers assez fournis
 * (`SEUIL_PAGE_PILIER`). Les autres adresses répondent 404 : une page de
 * catégorie à deux articles serait une page mince qui répète `/blog`.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return piliersAvecPage().map((p) => ({ pilier: PAGES_PILIERS[p].slug }));
}

type Props = { params: Promise<{ pilier: string }> };

/** Le pilier de l'adresse, s'il a sa page. */
function lire(slug: string): Pilier | undefined {
  const p = pilierParSlug(slug);
  return p && piliersAvecPage().includes(p) ? p : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = lire((await params).pilier);
  if (!p) return {};
  return pageMetadata({
    titre: PAGES_PILIERS[p].titreSeo,
    description: PAGES_PILIERS[p].description,
    chemin: cheminPilier(p),
    flux: true,
  });
}

export default async function PagePilier({ params }: Props) {
  const p = lire((await params).pilier);
  if (!p) notFound();

  const siteUrl = getSiteUrl();
  const chemin = cheminPilier(p);
  const articles = articlesDuPilier(p);
  const guide = GUIDES.find((g) => g.chemin === PAGES_PILIERS[p].guide);
  const etapes = [
    { nom: "Accueil", chemin: "/" },
    { nom: "Blog", chemin: BLOG },
    { nom: PILIERS[p], chemin },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}${chemin}#collection`,
    name: PILIERS[p],
    description: PAGES_PILIERS[p].description,
    url: `${siteUrl}${chemin}`,
    inLanguage: "fr-FR",
    isPartOf: { "@type": "Blog", "@id": `${siteUrl}${BLOG}#blog` },
    hasPart: articles.map((a) => ({
      "@type": "BlogPosting",
      headline: a.titre,
      description: a.description,
      url: `${siteUrl}${cheminArticle(a)}`,
      image: [`${siteUrl}${cheminArticle(a)}/opengraph-image`],
      datePublished: a.publieLe,
      dateModified: a.modifieLe ?? a.publieLe,
    })),
  };

  return (
    <div className="monde-papier min-h-screen">
      <DonneesStructurees data={jsonLd} />
      <DonneesStructurees data={filAriane(etapes)} />
      <Nav home={false} />

      <main className="pb-16">
        <div className="cadre pt-10 md:pt-20">
          <Ariane etapes={etapes} />
          <h1 className="titre mt-6 max-w-[20ch] text-[clamp(2.5rem,1.5rem+4vw,4.5rem)] text-ink">
            {PILIERS[p]}
          </h1>
          <p className="mt-6 max-w-[38rem] text-[1.1875rem] leading-relaxed text-ink-2">
            {PAGES_PILIERS[p].intro}
          </p>
          {guide && (
            <p className="mt-4 max-w-[38rem] text-[15px] leading-relaxed text-ink-2">
              Le guide de référence sur ce thème, tenu à jour :{" "}
              <Link href={guide.chemin} className="lien">
                {guide.titreSeo}
              </Link>
              . Les articles disent ce qui change et traitent les cas précis.
            </p>
          )}

          <FiltresPiliers
            piliers={piliersHabites()}
            avecPage={new Set(piliersAvecPage())}
            actif={p}
            className="mt-10"
          />

          <div className="mt-10">
            <ListeArticles articles={articles} />
          </div>

          <div className="max-w-[44rem]">
            <FinDePage />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
