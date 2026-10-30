import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Ariane } from "@/components/layout/Ariane";
import { FinDePage } from "@/components/layout/FinDePage";
import { Questions } from "@/components/ui/Questions";
import { Sommaire } from "@/components/guides/Sommaire";
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

/** La rubrique affichée en mention, au-dessus du titre. */
const RUBRIQUES: Record<Guide["etape"], string> = {
  avant: "Avant de visiter",
  candidature: "Au moment de candidater",
  apres: "Une fois le logement trouvé",
};

/**
 * Cadre commun des guides : le monde papier à l'état pur, sur un site
 * désormais sombre. Le scope `.monde-papier` enveloppe toute la page.
 *
 * Un en-tête d'article (rubrique en `.champ`, titre, chapeau en énoncé, ligne
 * de métadonnées à filets), puis trois colonnes sur grand écran : le sommaire
 * collé à gauche, la prose au centre sur 44 rem, et une marge de droite qui ne
 * sert qu'aux notes (les `.note` y flottent, voir `globals.css`). Cette
 * troisième colonne est ce qui donne au guide l'allure d'un ouvrage.
 *
 * La date de vérification n'est pas décorative. Ces pages citent du droit qui
 * change ; afficher quand on l'a relu, et d'où ça vient, c'est ce qui distingue
 * un guide d'un texte de remplissage.
 */
export function CadreGuide({ guide, children }: { guide: Guide; children: React.ReactNode }) {
  const siteUrl = getSiteUrl();
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
        // Un `Article` sans image est incomplet pour Google. Chaque guide a
        // son image de partage générée au build ; c'est elle qu'on déclare.
        image: [`${siteUrl}${guide.chemin}/opengraph-image`],
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
        <header className="grille pt-4 md:pt-6">
          <div className="col-span-12 lg:col-span-9">
            <Ariane etapes={etapes} />
            <p className="champ mt-8 text-ink-3">{RUBRIQUES[guide.etape]}</p>
            <h1 className="titre mt-4 max-w-[22ch] text-titre-2 text-ink">{guide.titre}</h1>
            <p className="enonce mt-6 text-ink-2">{guide.resume}</p>
          </div>
          <dl className="col-span-12 mt-8 flex flex-wrap gap-x-10 gap-y-3 border-y border-rule py-3 lg:col-span-9">
            <Meta nom="Mis à jour le" valeur={verifieLe} />
            <Meta nom="Lecture" valeur={`${guide.lecture} min`} />
            {guide.sources && guide.sources.length > 0 && (
              <Meta nom="Sources" valeur={`${guide.sources.length} officielle${guide.sources.length > 1 ? "s" : ""}`} />
            )}
          </dl>
        </header>

        <div className="grille mt-10 lg:mt-14">
          {guide.sommaire && guide.sommaire.length > 0 && (
            <aside className="hidden lg:col-span-2 lg:block">
              <div className="sticky top-20">
                <Sommaire entrees={guide.sommaire} />
              </div>
            </aside>
          )}

          <div className="col-span-12 lg:col-span-9 lg:col-start-4">
            <article className="article article--marge">{children}</article>

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

              <FinDePage />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Meta({ nom, valeur }: { nom: string; valeur: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <dt className="champ text-ink-3">{nom}</dt>
      <dd className="champ text-ink">{valeur}</dd>
    </div>
  );
}
