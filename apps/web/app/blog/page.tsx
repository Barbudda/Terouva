import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Ariane } from "@/components/layout/Ariane";
import { FinDePage } from "@/components/layout/FinDePage";
import { FiltresPiliers } from "@/components/blog/FiltresPiliers";
import { ListeArticles } from "@/components/blog/ListeArticles";
import {
  APERCU_PILIER,
  BLOG,
  PILIERS,
  articlesDuPilier,
  articlesPublies,
  blogOuvert,
  cheminArticle,
  cheminPilier,
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
 * La rubrique, tenue pour vingt articles et plus : une section par pilier,
 * dans l'ordre de la ligne éditoriale, chacune du plus récent au plus ancien.
 * Un pilier qui a sa page (`SEUIL_PAGE_PILIER` articles) n'en montre ici que
 * les derniers, avec le lien vers la liste complète ; les autres montrent tout.
 * Les filtres sont des liens rendus côté serveur : pas de JavaScript, et chaque
 * filtre est une adresse qu'un moteur peut suivre.
 */
export default function Blog() {
  const siteUrl = getSiteUrl();
  const articles = articlesPublies();
  const piliers = piliersHabites();
  const avecPage = new Set(piliersAvecPage());

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
              <FiltresPiliers piliers={piliers} avecPage={avecPage} className="mt-10" />

              {piliers.map((p) => {
                const duPilier = articlesDuPilier(p);
                const tronque = avecPage.has(p);
                return (
                  <section
                    key={p}
                    id={`pilier-${p.toLowerCase()}`}
                    aria-labelledby={`titre-${p}`}
                    className="mt-16 scroll-mt-24"
                  >
                    <h2 id={`titre-${p}`} className="champ text-accent-ink">
                      {PILIERS[p]}
                    </h2>
                    <div className="mt-4">
                      <ListeArticles articles={tronque ? duPilier.slice(0, APERCU_PILIER) : duPilier} />
                    </div>
                    {tronque && (
                      <p className="mt-4">
                        <Link href={cheminPilier(p)} className="lien text-[15px]">
                          Les {duPilier.length} articles sur ce thème : {PILIERS[p].toLowerCase()}
                        </Link>
                      </p>
                    )}
                  </section>
                );
              })}
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
