import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { FinDePage } from "@/components/layout/FinDePage";
import { Rubrique, type FicheGuide } from "@/components/guides/Rubrique";
import {
  BLOG,
  PILIERS,
  articlesPublies,
  blogOuvert,
  cheminArticle,
  cheminPilier,
  dateLongue,
  piliersAvecPage,
  piliersHabites,
} from "@/lib/blog";
import { DonneesStructurees, filAriane, pageMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";

/*
 * Tant qu'aucun article n'est publié, la rubrique existe mais ne s'annonce
 * pas : `noindex`, hors du plan du site, et aucun lien n'y mène. La même
 * condition (`blogOuvert`) décide de tout.
 */
export const metadata = pageMetadata({
  // 60 signes au plus avec le suffixe « · Terouva » (test du blog).
  titre: "Actualité de la location pour les candidats",
  description:
    "Ce qui change pour les locataires qui cherchent un logement : règles, chiffres officiels, cas pratiques. Daté, sourcé, relu avant publication.",
  chemin: BLOG,
  indexable: blogOuvert(),
  flux: true,
});

const ARIANE = [
  { nom: "Accueil", chemin: "/" },
  { nom: "Blog", chemin: BLOG },
];

/**
 * La rubrique, refaite le 4 novembre sur la demande d'Hugo comme celle des guides (modèle des
 * blogs de Rushlot et FanClaw) : chaque article en carte, titre et sous-titre accrocheurs et une
 * image, le clic mène à l'article. Filtres par pilier, l'article le plus récent à la une. Les pages
 * de pilier restent liées en bas pour les moteurs.
 */
export default function Blog() {
  const siteUrl = getSiteUrl();
  const articles = articlesPublies();
  const piliers = piliersHabites();
  const avecPage = new Set(piliersAvecPage());
  const fiches: FicheGuide[] = articles.map((a) => ({
    chemin: cheminArticle(a),
    titre: a.titre,
    description: a.description,
    rubrique: PILIERS[a.pilier],
    etape: a.pilier,
    date: dateLongue(a.modifieLe ?? a.publieLe),
    lecture: a.lecture,
    photo: { src: `${cheminArticle(a)}/opengraph-image`, alt: a.titre },
  }));
  const rubriques = Object.fromEntries(piliers.map((p) => [p, PILIERS[p]]));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteUrl}${BLOG}#blog`,
    name: "Blog Terouva",
    url: `${siteUrl}${BLOG}`,
    inLanguage: "fr-FR",
    publisher: { "@id": `${siteUrl}/#organization` },
    blogPost: articles.map((a) => ({
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
      <DonneesStructurees data={filAriane(ARIANE)} />
      <Nav home={false} />

      <main className="pb-16">
        <div className="cadre pt-10 md:pt-20">
          <p className="champ flex items-center gap-3 text-accent-ink">
            <span aria-hidden className="h-px w-8 bg-accent-ink" />
            Le blog Terouva
          </p>
          <h1 className="titre mt-6 max-w-[16ch] text-[clamp(3rem,1.6rem+5.4vw,6rem)] text-ink">
            Les questions qu&apos;on se pose <em className="font-normal italic text-accent-ink">avant de signer.</em>
          </h1>
          <p className="mt-8 max-w-[38rem] text-[1.1875rem] leading-relaxed text-ink-2">
            Un cas précis, une réponse nette : ce que le propriétaire peut demander, ce qu&apos;il ne
            peut pas refuser, ce qui change cette année. Chaque article est daté et cite ses{" "}
            <Link href="/guides" className="lien font-medium">
              sources officielles
            </Link>
            .
          </p>

          {articles.length === 0 ? (
            <section className="mt-14 max-w-[44rem] border-t border-rule-fort pt-6">
              <h2 className="champ text-ink-3">Aucun article pour l&apos;instant</h2>
              <p className="mt-3 leading-relaxed text-ink-2">
                Les premiers sont en préparation. En attendant, les{" "}
                <Link href="/guides" className="lien">
                  guides pour trouver une location
                </Link>{" "}
                répondent aux questions permanentes : le dossier, le garant, le dépôt de garantie.
              </p>
            </section>
          ) : (
            <>
              {/* Même présentation que la rubrique des guides (modèle Rushlot et FanClaw) :
                  filtres par pilier, article à la une, liste numérotée à vignettes. La vignette
                  est l'image de partage de l'article, qui porte déjà son titre. */}
              <div id="liste" className="scroll-mt-24">
                <Rubrique guides={fiches} rubriques={rubriques} libelle="Filtrer les articles" />
              </div>

              {avecPage.size > 0 && (
                <nav aria-label="Les articles par thème" className="mt-12 flex flex-wrap gap-x-6 gap-y-2">
                  <span className="champ text-ink-3">Par thème :</span>
                  {[...avecPage].map((p) => (
                    <Link key={p} href={cheminPilier(p)} className="lien text-[15px]">
                      {PILIERS[p]}
                    </Link>
                  ))}
                </nav>
              )}
            </>
          )}

          <div className="max-w-[44rem]">
            <FinDePage />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
