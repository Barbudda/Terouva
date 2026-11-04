import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Ariane } from "@/components/layout/Ariane";
import { FinDePage } from "@/components/layout/FinDePage";
import { BLOG, PILIERS, articlesPublies, blogOuvert, cheminArticle, dateLongue, type Pilier } from "@/lib/blog";
import { DonneesStructurees, filAriane, pageMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";

/*
 * Tant qu'aucun article n'est publié, la rubrique existe mais ne s'annonce
 * pas : `noindex`, hors du plan du site, et aucun lien n'y mène. La même
 * condition (`blogOuvert`) décide des quatre.
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
 * La rubrique : les articles du plus récent au plus ancien, regroupés par
 * pilier. Le « filtre » est une ancre par pilier, rendue côté serveur : à
 * moins de quinze articles, des pages de catégorie seraient des pages minces.
 */
export default function Blog() {
  const siteUrl = getSiteUrl();
  const articles = articlesPublies();
  const piliers = (Object.keys(PILIERS) as Pilier[]).filter((p) => articles.some((a) => a.pilier === p));

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
          <Ariane etapes={ARIANE} />
          <h1 className="titre mt-6 max-w-[18ch] text-[clamp(2.75rem,1.6rem+4.6vw,5rem)] text-ink">
            Ce qui change quand on cherche un logement
          </h1>
          <p className="mt-6 max-w-[38rem] text-[1.1875rem] leading-relaxed text-ink-2">
            Les règles, les chiffres officiels et les situations concrètes du moment, du côté de la
            personne qui candidate. Chaque article est daté et cite ses sources.
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
              {piliers.length > 1 && (
                <nav aria-label="Piliers" className="mt-10">
                  <ul className="flex flex-wrap gap-2">
                    {piliers.map((p) => (
                      <li key={p}>
                        <a
                          href={`#pilier-${p.toLowerCase()}`}
                          className="inline-flex min-h-11 items-center rounded-full border border-rule-fort bg-card px-4 text-[14px] text-ink transition-colors duration-200 hover:border-ink-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
                        >
                          {PILIERS[p]}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              {piliers.map((p) => (
                <section key={p} id={`pilier-${p.toLowerCase()}`} aria-labelledby={`titre-${p}`} className="mt-16 scroll-mt-24">
                  <h2 id={`titre-${p}`} className="champ text-accent-ink">
                    {PILIERS[p]}
                  </h2>
                  <ol className="mt-4 border-t border-rule">
                    {articles
                      .filter((a) => a.pilier === p)
                      .map((a) => (
                        <li key={a.slug} className="border-b border-rule">
                          <Link
                            href={cheminArticle(a)}
                            className="group flex flex-col gap-2 py-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
                          >
                            <time dateTime={a.publieLe} className="champ text-ink-3">
                              {dateLongue(a.publieLe)}
                            </time>
                            <span className="titre titre--petit text-[1.5rem] text-ink transition-colors duration-200 group-hover:text-accent-ink">
                              {a.titre}
                            </span>
                            <span className="max-w-[44rem] leading-relaxed text-ink-2">{a.description}</span>
                          </Link>
                        </li>
                      ))}
                  </ol>
                </section>
              ))}
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
