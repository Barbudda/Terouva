import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Ariane } from "@/components/layout/Ariane";
import { FinDePage } from "@/components/layout/FinDePage";
import { Questions } from "@/components/ui/Questions";
import { Sommaire } from "@/components/guides/Sommaire";
import { CarteGuide } from "@/components/guides/CarteGuide";
import { ArticlesLies } from "@/components/blog/ArticlesLies";
import { GUIDES } from "@/lib/catalogue";
import { PHOTOS, RESUMES } from "@/lib/guides-resumes";
import { DonneesStructurees, filAriane } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";

export type Guide = {
  chemin: string;
  titre: string;
  /** Titre pour les moteurs : 60 signes maximum, suffixe « · Terouva » compris. */
  titreSeo: string;
  /** Ce que la personne gagne à lire la page, en une phrase. */
  resume: string;
  description: string;
  publieLe: string;
  modifieLe?: string;
  /** Temps de lecture affiché, en minutes. */
  lecture: number;
  /**
   * Moment du parcours locatif auquel le guide sert.
   *
   * Sert à regrouper la rubrique : à neuf guides, une liste à plat ne dit plus
   * dans quel ordre lire, ni lequel concerne la personne aujourd'hui.
   */
  etape: "avant" | "candidature" | "apres";
  sources?: Array<{ nom: string; url: string }>;
  questions?: Array<{ q: string; a: string }>;
  /** Titres de section, dans l'ordre. `id` doit exister dans la page. */
  sommaire?: Array<{ id: string; titre: string }>;
};

/** La rubrique affichée en mention, au-dessus du titre, et sur les filtres de la rubrique. */
export const RUBRIQUES: Record<Guide["etape"], string> = {
  avant: "Avant de visiter",
  candidature: "Au moment de candidater",
  apres: "Une fois le logement trouvé",
};

/** Date courte, comme sur une liste d'articles : « 11 oct. 2026 ». */
export function dateCourte(guide: Guide) {
  return new Date(guide.modifieLe ?? guide.publieLe).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Le gabarit d'un guide, sur le modèle des articles de Rushlot et de FanClaw
 * (Hugo, 4 novembre : « le texte est posé là sans attraction »).
 *
 * De haut en bas : la rubrique et le retour à la liste, le titre, le chapô, la
 * ligne de métadonnées, puis la photo en bandeau. Dessous, le sommaire
 * numéroté collé à gauche ; au centre, les chiffres clés, puis la prose, ouverte par une lettrine et
 * coupée en sections numérotées comme le sommaire. En bas : sources, questions,
 * trois guides à lire ensuite, l'inscription.
 *
 * La date de vérification n'est pas décorative. Ces pages citent du droit qui
 * change ; afficher quand on l'a relu, et d'où ça vient, c'est ce qui distingue
 * un guide d'un texte de remplissage.
 */
export function CadreGuide({ guide, children }: { guide: Guide; children: React.ReactNode }) {
  const siteUrl = getSiteUrl();
  const photo = PHOTOS[guide.chemin];
  const resume = RESUMES[guide.chemin];
  const etapes = [
    { nom: "Accueil", chemin: "/" },
    { nom: "Guides", chemin: "/guides" },
    { nom: guide.titreSeo, chemin: guide.chemin },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${siteUrl}${guide.chemin}#article`,
        headline: guide.titre,
        description: guide.description,
        // Un `Article` sans image est incomplet pour Google : la photo du
        // bandeau d'abord, l'image de partage générée au build ensuite.
        image: [
          ...(photo ? [`${siteUrl}${photo.src}`] : []),
          `${siteUrl}${guide.chemin}/opengraph-image`,
        ],
        inLanguage: "fr-FR",
        datePublished: guide.publieLe,
        dateModified: guide.modifieLe ?? guide.publieLe,
        mainEntityOfPage: `${siteUrl}${guide.chemin}`,
        author: { "@type": "Organization", name: "Terouva", url: `${siteUrl}/` },
        publisher: { "@id": `${siteUrl}/#organization` },
        ...(guide.sources?.length
          ? { citation: guide.sources.map((s) => ({ "@type": "CreativeWork", name: s.nom, url: s.url })) }
          : {}),
      },
      ...(guide.questions?.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: guide.questions.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            },
          ]
        : []),
    ],
  };

  const verifieLe = new Date(guide.modifieLe ?? guide.publieLe).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="monde-papier min-h-screen">
      <DonneesStructurees data={jsonLd} />
      <DonneesStructurees data={filAriane(etapes)} />
      <Nav home={false} />

      <main className="pb-16">
        <header className="cadre pt-8 md:pt-14">
          <div className="flex items-center justify-between gap-4">
            <p className="champ text-accent-ink">{RUBRIQUES[guide.etape]}</p>
            <Link
              href="/guides"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-rule-fort bg-card px-4 text-[14px] text-ink transition-colors duration-200 hover:border-ink-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden className="size-4 text-accent-ink">
                <path d="M13 8H3M7 4L3 8l4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="hidden sm:inline">Retour aux guides</span>
              <span className="sm:hidden">Guides</span>
            </Link>
          </div>
          <h1 className="titre mt-6 max-w-[20ch] text-[clamp(2.25rem,1.3rem+3.6vw,4rem)] text-ink">
            {guide.titre}
          </h1>
          <p className="mt-6 max-w-[42rem] text-[1.1875rem] leading-relaxed text-ink-2">{guide.resume}</p>
          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-t border-rule pt-4">
            <Meta nom="Mis à jour le" valeur={verifieLe} />
            <Meta nom="Lecture" valeur={`${guide.lecture} min`} />
            {guide.sources && guide.sources.length > 0 && (
              <Meta nom="Sources" valeur={`${guide.sources.length} officielle${guide.sources.length > 1 ? "s" : ""}`} />
            )}
          </dl>

          {photo && (
            <figure className="mt-8 md:mt-10">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-paper-2 shadow-[0_24px_48px_-28px_rgb(23_24_26/0.45)] sm:aspect-[16/8] md:rounded-[1.75rem]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  priority
                  sizes="(min-width: 1280px) 1200px, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-2.5 text-right text-[13px] text-ink-3">
                Photo :{" "}
                <a href={photo.url} target="_blank" rel="noopener" className="hover:text-ink hover:underline">
                  {photo.auteur}, Unsplash
                </a>
              </figcaption>
            </figure>
          )}
        </header>

        <div className="grille mt-10 lg:mt-14">
          {guide.sommaire && guide.sommaire.length > 0 && (
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-24 pr-4">
                <Sommaire entrees={guide.sommaire} />
              </div>
            </aside>
          )}

          <div className="col-span-12 lg:col-span-9 lg:col-start-4">
            <Ariane etapes={etapes} />

            {guide.sommaire && guide.sommaire.length > 0 && (
              <details className="group mt-6 rounded-[1rem] border border-rule bg-card lg:hidden">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-5 text-[15px] font-medium text-ink">
                  Sur cette page
                  <span aria-hidden className="text-ink-3 transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <ol className="border-t border-rule px-5 py-3">
                  {guide.sommaire.map((e, i) => (
                    <li key={e.id}>
                      <a href={`#${e.id}`} className="flex gap-3 py-2 text-[15px] text-ink-2 hover:text-ink">
                        <span className="champ pt-0.5 text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                        {e.titre}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            )}

            {/* Ni « À retenir » (il recopiait les réponses) ni ligne produit (FinDePage la dit). */}
            {resume && (
              <section aria-labelledby="en-chiffres" className="mt-6 max-w-[48rem]">
                <h2 id="en-chiffres" className="champ text-ink-3">En chiffres</h2>
                <dl className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
                  {resume.enChiffres.map((c) => (
                    <div key={c.valeur + c.libelle} className="flex flex-col rounded-[1rem] border border-rule bg-card p-4 sm:p-6">
                      <dt className="order-2 mt-2 text-[14px] leading-snug text-ink-2">{c.libelle}</dt>
                      <dd className="titre order-1 text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] text-accent-ink">
                        {souder(c.valeur)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            <article className="article article--marge article--lettrine mt-12">{children}</article>

            <div className="max-w-[44rem]">
              {guide.sources && guide.sources.length > 0 && (
                <section className="mt-14 border-t border-rule-fort pt-5">
                  <h2 className="champ text-ink-3">Sources</h2>
                  <ul className="mt-4 space-y-2 text-[15px] text-ink-2">
                    {guide.sources.map((s) => (
                      <li key={s.url}>
                        <a href={s.url} target="_blank" rel="noopener" className="lien">
                          {s.nom}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Affichées, et pas seulement balisées : c'est la condition posée
                  par Google pour un bloc `FAQPage`. */}
              <Questions questions={guide.questions ?? []} className="mt-16" />
            </div>

            {/* Les articles du blog rattachés à ce guide, s'il y en a : le
                lien retour du pilier vers ses satellites. */}
            <ArticlesLies chemin={guide.chemin} />

            <ALireAussi chemin={guide.chemin} etape={guide.etape} />

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

/**
 * Trois guides à lire ensuite, en cartes à photo : ceux du même moment du
 * parcours d'abord, puis les plus récents. C'est le maillage qui fait passer
 * d'un article à l'autre, et chaque nouveau guide en reçoit des liens sans
 * qu'on retouche les anciens.
 */
function ALireAussi({ chemin, etape }: { chemin: string; etape: Guide["etape"] }) {
  const autres = GUIDES.filter((g) => g.chemin !== chemin);
  const suite = [
    ...autres.filter((g) => g.etape === etape),
    ...autres
      .filter((g) => g.etape !== etape)
      .sort((a, b) => (b.modifieLe ?? b.publieLe).localeCompare(a.modifieLe ?? a.publieLe)),
  ].slice(0, 3);
  if (suite.length === 0) return null;
  return (
    <nav aria-labelledby="a-lire-aussi" className="mt-16">
      <h2 id="a-lire-aussi" className="titre titre--petit text-[1.75rem] text-ink">
        À lire aussi
      </h2>
      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {suite.map((g) => (
          <li key={g.chemin}>
            <CarteGuide guide={g} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Les espaces d'un chiffre ne doivent jamais casser : « 1 940 € » ou « 10 % »
 * sur deux lignes ne se lisent plus. Les autres espaces restent sécables, pour
 * qu'une valeur en mots comme « Une vingtaine » tienne dans sa tuile.
 */
function souder(valeur: string) {
  return valeur.replace(/(\d) (?=[\d€%])/g, "$1\u00a0");
}

function Meta({ nom, valeur }: { nom: string; valeur: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <dt className="champ text-ink-3">{nom}</dt>
      <dd className="champ text-ink">{valeur}</dd>
    </div>
  );
}
