import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { FinDePage } from "@/components/layout/FinDePage";
import { RUBRIQUES, dateCourte } from "@/components/guides/CadreGuide";
import { Rubrique, type FicheGuide } from "@/components/guides/Rubrique";
import { GUIDES, OUTILS } from "@/lib/catalogue";
import { FACADES, PHOTOS } from "@/lib/guides-resumes";
import { DonneesStructurees, filAriane, pageMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";

const CHEMIN = "/guides";

export const metadata = pageMetadata({
  titre: "Guides pour trouver une location",
  description:
    "Le dossier, le garant, le message : ce qu'il faut savoir pour chercher un logement. Des pages courtes, vérifiées, avec leurs sources.",
  chemin: CHEMIN,
});

const ARIANE = [
  { nom: "Accueil", chemin: "/" },
  { nom: "Guides", chemin: CHEMIN },
];

/** La capture de chaque outil gratuit, prise sur la page de l'outil. */
const CAPTURES: Record<string, string> = {
  "/outils/dossier-de-location": "/outils/dossier-de-location.jpg",
  "/outils/message-de-candidature": "/outils/message-de-candidature.jpg",
};

/**
 * La rubrique, refaite le 4 novembre sur le modèle des blogs de Rushlot et de
 * FanClaw : le titre et une pile de photos, les filtres par moment du
 * parcours, l'article à la une, la liste numérotée à vignettes, puis les
 * outils gratuits avec leur capture. La méthode d'écriture tient en trois
 * lignes au lieu de trois paragraphes.
 */
export default function Guides() {
  const siteUrl = getSiteUrl();

  // Du plus récent au plus ancien : le premier passe à la une.
  const fiches: FicheGuide[] = [...GUIDES]
    .sort((a, b) => (b.modifieLe ?? b.publieLe).localeCompare(a.modifieLe ?? a.publieLe))
    .map((g) => ({
      chemin: g.chemin,
      titre: g.titreSeo,
      description: g.description,
      rubrique: RUBRIQUES[g.etape],
      etape: g.etape,
      date: dateCourte(g),
      lecture: g.lecture,
      photo: PHOTOS[g.chemin] && { src: PHOTOS[g.chemin].src, alt: PHOTOS[g.chemin].alt },
    }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}${CHEMIN}#collection`,
    name: "Guides pour trouver une location",
    inLanguage: "fr-FR",
    // L'image est exigée par Google sur un « Article », y compris listé ici.
    hasPart: GUIDES.map((g) => ({
      "@type": "Article",
      headline: g.titre,
      description: g.description,
      url: `${siteUrl}${g.chemin}`,
      image: [
        ...(PHOTOS[g.chemin] ? [`${siteUrl}${PHOTOS[g.chemin].src}`] : []),
        `${siteUrl}${g.chemin}/opengraph-image`,
      ],
      datePublished: g.publieLe,
    })),
  };

  return (
    <div className="monde-papier min-h-screen">
      <DonneesStructurees data={jsonLd} />
      <DonneesStructurees data={filAriane(ARIANE)} />
      <Nav home={false} />

      <main className="pb-16">
        <div className="cadre pt-10 md:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="champ flex items-center gap-3 text-accent-ink">
                <span aria-hidden className="h-px w-8 bg-accent-ink" />
                Les guides Terouva
              </p>
              <h1 className="titre mt-6 text-[clamp(3rem,1.6rem+5.4vw,6rem)] text-ink">
                Louez en connaissant <em className="font-normal italic text-accent-ink">vos droits.</em>
              </h1>
              <p className="mt-8 max-w-[36rem] text-[1.1875rem] leading-relaxed text-ink-2">
                Le dossier, le garant, la caution, l&apos;état des lieux, le préavis : des{" "}
                <a href="#liste" className="lien font-medium">
                  guides courts
                </a>
                , vérifiés sur les textes officiels, et des{" "}
                <Link href="/outils" className="lien font-medium">
                  outils gratuits
                </Link>{" "}
                qui tournent dans votre navigateur.
              </p>
            </div>
            <PileDePhotos />
          </div>

          <div id="liste" className="scroll-mt-24">
            <Rubrique guides={fiches} rubriques={RUBRIQUES} />
          </div>

          <section aria-labelledby="outils" className="mt-24">
            <p className="champ text-accent-ink">Outils gratuits</p>
            <h2 id="outils" className="titre titre--petit mt-3 text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] text-ink">
              Préparez votre candidature pendant votre lecture
            </h2>
            <p className="mt-3 max-w-[40rem] leading-relaxed text-ink-2">
              Chacun tourne dans votre navigateur. Rien de ce que vous saisissez ne quitte votre
              ordinateur.
            </p>
            <ul className="mt-8 grid gap-5 md:grid-cols-2">
              {OUTILS.map((o) => (
                <li key={o.chemin}>
                  <Link
                    href={o.chemin}
                    className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-rule bg-card transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-rule-fort focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
                  >
                    {CAPTURES[o.chemin] && (
                      <span className="relative block aspect-[16/9] overflow-hidden border-b border-rule bg-[color-mix(in_oklch,var(--color-action)_10%,var(--color-paper-2))]">
                        <Image
                          src={CAPTURES[o.chemin]}
                          alt=""
                          fill
                          sizes="(min-width: 768px) 560px, 100vw"
                          className="object-cover object-top transition-transform duration-500 ease-[var(--ease-terouva)] group-hover:scale-[1.02]"
                        />
                        <span className="champ absolute top-4 left-4 rounded-full bg-action px-3 py-1.5 text-action-ink">
                          Gratuit
                        </span>
                      </span>
                    )}
                    <span className="flex flex-1 flex-col p-6">
                      <span className="titre titre--petit text-[1.5rem] text-ink">{o.court}</span>
                      <span className="mt-2 leading-relaxed text-ink-2">{o.resume}</span>
                      <span className="mt-auto pt-5 text-[15px] font-medium text-accent-ink">
                        Ouvrir l&apos;outil <span aria-hidden>→</span>
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="methode" className="mt-24">
            <h2 id="methode" className="champ text-ink-3">
              Comment ces guides sont écrits
            </h2>
            <ul className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                {
                  titre: "Une source officielle",
                  texte: "Chaque règle vient de service-public.gouv.fr ou de Légifrance, citée en bas de page avec son lien.",
                },
                {
                  titre: "Une date de vérification",
                  texte: "Affichée en tête de chaque guide : le jour où le texte a été relu contre sa source.",
                },
                {
                  titre: "Les chiffres avec leur condition",
                  texte: "Un plafond avec sa zone, un délai avec son point de départ, un montant hors charges ou non.",
                },
              ].map((r) => (
                <li key={r.titre} className="rounded-[1rem] border border-rule bg-card p-6">
                  <p className="font-medium text-ink">{r.titre}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{r.texte}</p>
                </li>
              ))}
            </ul>
            <p className="marge mt-4">
              Ces pages renseignent, elles ne remplacent pas un conseil juridique. L&apos;ADIL de votre
              département vous renseigne gratuitement sur votre situation.
            </p>
          </section>

          <div className="max-w-[44rem]">
            <FinDePage />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/**
 * La pile de photos du haut de la rubrique, comme sur Rushlot et FanClaw :
 * trois cartes inclinées qui se chevauchent. Décorative, d'où l'alternative
 * vide ; les crédits sont dans la légende cachée.
 */
function PileDePhotos() {
  const cartes = [
    { photo: FACADES[0], classe: "left-[4%] top-[8%] w-[56%] -rotate-[7deg]", cadrage: "object-bottom" },
    { photo: PHOTOS["/guides/louer-sans-garant"], classe: "left-[30%] top-[22%] w-[46%] rotate-[3deg]" },
    { photo: PHOTOS["/guides/etat-des-lieux"], classe: "left-[50%] top-[2%] w-[44%] rotate-[9deg]" },
  ];
  return (
    <figure className="relative mx-auto hidden aspect-[5/4] w-full max-w-[32rem] lg:col-span-5 lg:block">
      {cartes.map(({ photo, classe, cadrage }, i) => (
        <span
          key={photo.src}
          className={`absolute block aspect-[4/3] overflow-hidden rounded-[1.25rem] border-[6px] border-card bg-paper-2 shadow-[0_28px_50px_-24px_rgb(23_24_26/0.5)] ${classe}`}
          style={{ zIndex: i + 1 }}
        >
          <Image src={photo.src} alt="" fill sizes="280px" className={`object-cover ${cadrage ?? ""}`} />
        </span>
      ))}
      <figcaption className="sr-only">
        Photos : {cartes.map((c) => c.photo.auteur).join(", ")}, sur Unsplash.
      </figcaption>
    </figure>
  );
}
