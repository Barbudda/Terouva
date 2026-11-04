import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Ariane } from "@/components/layout/Ariane";
import { FinDePage } from "@/components/layout/FinDePage";
import { Questions } from "@/components/ui/Questions";
import { Sommaire } from "@/components/guides/Sommaire";
import { CarteGuide } from "@/components/guides/CarteGuide";
import { BLOG, PILIERS, cheminArticle, dateLongue, type Article } from "@/lib/blog";
import { GUIDES, OUTILS } from "@/lib/catalogue";
import { DonneesStructurees, filAriane } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";

/**
 * Le gabarit d'un article, dérivé de celui des guides : même monde papier,
 * même colonne de lecture, même sommaire collé à gauche. Ce qui change tient
 * à la nature d'un article : il est **daté**. La date de publication est en
 * tête, la date de mise à jour à côté, et ce qui a changé est dit en clair
 * au-dessus du texte, pas enfoui dans un historique.
 *
 * En bas, toujours les trois mêmes suites (le guide pilier, l'outil qui fait
 * le travail, un guide voisin) : un article sans suite laisse le lecteur au
 * milieu de sa question.
 */
export function CadreArticle({ article, children }: { article: Article; children: React.ReactNode }) {
  const siteUrl = getSiteUrl();
  const chemin = cheminArticle(article);
  const etapes = [
    { nom: "Accueil", chemin: "/" },
    { nom: "Blog", chemin: BLOG },
    { nom: article.titreSeo, chemin },
  ];

  const pilier = GUIDES.find((g) => g.chemin === article.guidePilier);
  const voisins = article.guidesLies
    .map((c) => GUIDES.find((g) => g.chemin === c))
    .filter((g): g is NonNullable<typeof g> => g !== undefined);
  const outil = OUTILS.find((o) => o.chemin === article.outilLie);
  const suites = [...(pilier ? [pilier] : []), ...voisins].slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${siteUrl}${chemin}#article`,
        headline: article.titre,
        description: article.description,
        image: [`${siteUrl}${chemin}/opengraph-image`],
        inLanguage: "fr-FR",
        datePublished: article.publieLe,
        dateModified: article.modifieLe ?? article.publieLe,
        mainEntityOfPage: `${siteUrl}${chemin}`,
        // L'organisation signe tant qu'aucune page auteur n'existe : on
        // n'invente pas de personne (ligne éditoriale, section 8).
        author: { "@type": "Organization", name: "Terouva", url: `${siteUrl}/` },
        publisher: { "@id": `${siteUrl}/#organization` },
        isPartOf: { "@type": "Blog", "@id": `${siteUrl}${BLOG}#blog`, name: "Blog Terouva" },
        ...(article.sources.length
          ? { citation: article.sources.map((s) => ({ "@type": "CreativeWork", name: s.titre, url: s.url })) }
          : {}),
      },
      // Balisées parce qu'affichées plus bas par `Questions`, qui lit la même liste.
      ...(article.questions?.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: article.questions.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            },
          ]
        : []),
    ],
  };

  const misesAJour = [...(article.misesAJour ?? [])].sort((a, b) => b.le.localeCompare(a.le));

  return (
    <div className="monde-papier min-h-screen">
      <DonneesStructurees data={jsonLd} />
      <DonneesStructurees data={filAriane(etapes)} />
      <Nav home={false} />

      <main className="pb-16">
        <header className="cadre pt-8 md:pt-14">
          <div className="flex items-center justify-between gap-4">
            <p className="champ text-accent-ink">{PILIERS[article.pilier]}</p>
            <Link
              href={BLOG}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-rule-fort bg-card px-4 text-[14px] text-ink transition-colors duration-200 hover:border-ink-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden className="size-4 text-accent-ink">
                <path d="M13 8H3M7 4L3 8l4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="hidden sm:inline">Retour au blog</span>
              <span className="sm:hidden">Blog</span>
            </Link>
          </div>
          <h1 className="titre mt-6 max-w-[22ch] text-[clamp(2.25rem,1.3rem+3.6vw,4rem)] text-ink">
            {article.titre}
          </h1>
          <p className="mt-6 max-w-[42rem] text-[1.1875rem] leading-relaxed text-ink-2">{article.chapeau}</p>
          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-t border-rule pt-4">
            <Meta nom="Publié le" iso={article.publieLe} />
            {article.modifieLe && article.modifieLe !== article.publieLe && (
              <Meta nom="Mis à jour le" iso={article.modifieLe} />
            )}
            <div className="flex items-baseline gap-2">
              <dt className="champ text-ink-3">Lecture</dt>
              <dd className="champ text-ink">{article.lecture} min</dd>
            </div>
          </dl>
        </header>

        <div className="grille mt-10 lg:mt-14">
          {article.sommaire && article.sommaire.length > 0 && (
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-24 pr-4">
                <Sommaire entrees={article.sommaire} />
              </div>
            </aside>
          )}

          <div className="col-span-12 lg:col-span-9 lg:col-start-4">
            <Ariane etapes={etapes} />

            {misesAJour.length > 0 && (
              <section
                aria-labelledby="mises-a-jour"
                className="mt-6 max-w-[48rem] rounded-[1.25rem] border border-rule bg-[color-mix(in_oklch,var(--color-action)_7%,var(--color-card))] p-6"
              >
                <h2 id="mises-a-jour" className="champ text-accent-ink">
                  Ce qui a changé
                </h2>
                <ul className="mt-4 space-y-3">
                  {misesAJour.map((m) => (
                    <li key={m.le + m.quoi} className="text-[15px] leading-relaxed text-ink">
                      <time dateTime={m.le} className="font-medium">
                        Le {dateLongue(m.le)}
                      </time>{" "}
                      : {m.quoi}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <article className="article article--marge mt-12">{children}</article>

            <div className="max-w-[44rem]">
              {article.sources.length > 0 && (
                <section className="mt-14 border-t border-rule-fort pt-5">
                  <h2 className="champ text-ink-3">Sources</h2>
                  <ul className="mt-4 space-y-2 text-[15px] text-ink-2">
                    {article.sources.map((s) => (
                      <li key={s.url}>
                        <a href={s.url} target="_blank" rel="noopener" className="lien">
                          {s.titre}
                        </a>{" "}
                        <span className="text-ink-3">
                          (consulté le <time dateTime={s.releveLe}>{dateLongue(s.releveLe)}</time>)
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <Questions questions={article.questions ?? []} className="mt-16" />
            </div>

            {(suites.length > 0 || outil) && (
              <nav aria-labelledby="pour-aller-plus-loin" className="mt-16">
                <h2 id="pour-aller-plus-loin" className="titre titre--petit text-[1.75rem] text-ink">
                  Pour aller plus loin
                </h2>
                <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {suites.map((g) => (
                    <li key={g.chemin}>
                      <CarteGuide guide={g} />
                    </li>
                  ))}
                  {outil && (
                    <li>
                      <Link
                        href={outil.chemin}
                        className="group flex h-full flex-col rounded-[1.25rem] border border-rule bg-card p-5 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-rule-fort focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
                      >
                        <span className="champ text-accent-ink">Outil gratuit</span>
                        <span className="mt-2 text-[17px] leading-snug font-medium text-ink">{outil.court}</span>
                        <span className="mt-2 text-[14px] leading-relaxed text-ink-2">{outil.resume}</span>
                        <span className="mt-auto pt-4 text-[15px] font-medium text-accent-ink">
                          Ouvrir l&apos;outil
                        </span>
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            )}

            <div className="max-w-[44rem]">
              <FinDePage />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Meta({ nom, iso }: { nom: string; iso: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <dt className="champ text-ink-3">{nom}</dt>
      <dd className="champ text-ink">
        <time dateTime={iso}>{dateLongue(iso)}</time>
      </dd>
    </div>
  );
}
