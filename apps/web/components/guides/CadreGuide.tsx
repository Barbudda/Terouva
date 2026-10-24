import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Ariane } from "@/components/layout/Ariane";
import { FinDePage } from "@/components/layout/FinDePage";
import { Questions } from "@/components/ui/Questions";
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

/**
 * Cadre commun des guides : fil d'Ariane, titre, date de vérification,
 * sources, balisage `Article` et `BreadcrumbList`, puis l'appel à la liste
 * d'attente.
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
    // Le titre court, pas le long : le fil d'Ariane reprenait la phrase entière
    // du titre, qui passait sur deux lignes dès le mobile et répétait mot pour
    // mot le H1 placé juste en dessous.
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
        // Un `Article` sans image est incomplet pour Google, et c'était le cas
        // des trois guides : trois erreurs sur un audit par ailleurs propre.
        // Chaque guide a déjà son image de partage générée au build ; c'est
        // elle qu'on déclare, plutôt que d'en inventer une.
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
    <>
      <DonneesStructurees data={jsonLd} />
      <DonneesStructurees data={filAriane(etapes)} />
      <Nav home={false} />

      <main className="px-4 pt-10 pb-16 sm:px-6 md:pt-14">
        <div className="mx-auto max-w-5xl">
          <Ariane etapes={etapes} />

          <h1 className="display mt-5 max-w-3xl text-[2.1rem] text-ink sm:text-[2.75rem]">
            {guide.titre}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">{guide.resume}</p>
          <p className="mt-4 text-sm text-ink-3">
            Vérifié le {verifieLe} · {guide.lecture} min de lecture
          </p>

          <div className="mt-10 gap-14 lg:flex lg:items-start">
            <article className="article">{children}</article>

            {guide.sommaire && guide.sommaire.length > 0 && (
              <nav
                aria-label="Sommaire"
                className="sticky top-28 hidden w-56 shrink-0 lg:block"
              >
                <p className="text-[13px] font-bold tracking-wider text-ink uppercase">
                  Sur cette page
                </p>
                <ul className="mt-4 space-y-2.5 border-l border-rule pl-4 text-[14px] leading-snug">
                  {guide.sommaire.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="text-ink-2 transition-colors hover:text-accent"
                      >
                        {s.titre}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>

          {guide.sources && guide.sources.length > 0 && (
            <section className="mt-14 max-w-[44rem] border-t border-rule pt-6">
              <h2 className="text-[13px] font-bold tracking-wider text-ink uppercase">Sources</h2>
              <ul className="mt-4 space-y-2 text-[15px] text-ink-2">
                {guide.sources.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener"
                      className="text-accent underline underline-offset-4"
                    >
                      {s.nom}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Affichées, et pas seulement balisées : c'est la condition posée
              par Google pour un bloc `FAQPage`, et c'est aussi ce qu'un
              assistant cite le plus volontiers, parce qu'une réponse courte
              sous sa question se reprend telle quelle. */}
          <Questions questions={guide.questions ?? []} className="mt-16 max-w-[44rem]" />

          <div className="max-w-[44rem]">
            <FinDePage />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
