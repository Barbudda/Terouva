import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { FinDePage } from "@/components/layout/FinDePage";
import { CarteGuide } from "@/components/guides/CarteGuide";
import { GUIDES, OUTILS } from "@/lib/catalogue";
import { CAPTURES_OUTILS, captureOutil } from "@/lib/guides-resumes";
import { DonneesStructurees, filAriane, pageMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

const CHEMIN = "/outils";

export const metadata = pageMetadata({
  titre: "Outils gratuits pour votre recherche de logement",
  description:
    "Des outils gratuits pour écrire votre message de candidature et préparer votre dossier, sans compte et sans limite. Ce que vous saisissez ne quitte pas votre ordinateur.",
  chemin: CHEMIN,
});

const ETAPES = [
  { nom: "Accueil", chemin: "/" },
  { nom: "Outils gratuits", chemin: CHEMIN },
];

/**
 * Ce que chaque outil vous donne, en une ligne, et sa capture prise sur la
 * page de l'outil. L'ordre est celui du catalogue, qui est celui d'une
 * candidature : le dossier d'abord, le message ensuite.
 */
const VITRINE: Record<string, { gain: string; points: string[] }> = {
  "/outils/dossier-de-location": {
    gain: "La liste exacte de votre dossier, en trois questions.",
    points: [
      "Les pièces à réunir pour votre situation",
      "Celles qu'on n'a pas le droit de vous demander",
      "Une liste à copier ou à imprimer",
    ],
  },
  "/outils/message-de-candidature": {
    gain: "Le message qui accompagne votre dossier, écrit en une minute.",
    points: [
      "Trois tons : direct, chaleureux, professionnel",
      "Six formulations pour chacun",
      "Prêt à copier dans Leboncoin",
    ],
  },
  "/outils/quel-salaire-pour-un-loyer": {
    gain: "Le loyer que vos ressources permettent, en un calcul.",
    points: [
      "Le repère des trois fois le loyer",
      "Les plafonds de la garantie Visale",
      "Une phrase prête pour votre dossier",
    ],
  },
};

/**
 * La page des outils, sur le format de la rubrique des guides (Hugo,
 * 4 novembre), mais dans le monde sombre du site : la mention, le grand titre
 * et la pile des captures ; puis chaque outil en grande carte, capture
 * d'un côté, promesse de l'autre ; trois lignes sur la confidentialité au lieu
 * de trois paragraphes ; enfin les neuf guides en cartes à photo.
 */
export default function Outils() {
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}${CHEMIN}#collection`,
    name: "Outils gratuits pour votre recherche de logement",
    inLanguage: "fr-FR",
    // `WebPage` plutôt qu'une application : ce type réclame une note ou un
    // avis qui n'existent pas encore.
    hasPart: OUTILS.map((o) => ({
      "@type": "WebPage",
      name: o.titre,
      description: o.description,
      url: `${siteUrl}${o.chemin}`,
      isAccessibleForFree: true,
      ...(CAPTURES_OUTILS[o.chemin] ? { image: `${siteUrl}${CAPTURES_OUTILS[o.chemin]}` } : {}),
    })),
  };

  return (
    <>
      <DonneesStructurees data={jsonLd} />
      <DonneesStructurees data={filAriane(ETAPES)} />
      <Nav home={false} />

      <main className="pb-16">
        <div className="cadre pt-10 md:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="champ flex items-center gap-3 text-blue-clair">
                <span aria-hidden className="h-px w-8 bg-blue-clair" />
                Les outils gratuits
              </p>
              <h1 className="titre mt-6 text-[clamp(3rem,1.6rem+5.4vw,6rem)] text-ink">
                Un dossier complet, <em className="font-normal italic text-blue-clair">un message prêt.</em>
              </h1>
              <p className="mt-8 max-w-[36rem] text-[1.1875rem] leading-relaxed text-ink-2">
                Trois outils pour préparer votre candidature avant même de visiter : la liste des
                pièces à réunir, le loyer que vos ressources permettent, et le message qui
                accompagne votre dossier. Sans compte, sans limite, et rien ne quitte votre
                ordinateur.
              </p>
            </div>
            <PileDeCaptures />
          </div>

          <div className="mt-12 flex flex-wrap gap-2.5 border-t border-rule pt-8">
            <span className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-ink bg-ink py-1.5 pr-4 pl-1.5 text-[15px] text-paper">
              <span aria-hidden className="flex size-8 items-center justify-center rounded-full bg-action text-action-ink">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="size-4">
                  <path d="M10.5 2.5l3 3-7.5 7.5H3v-3l7.5-7.5z" strokeLinejoin="round" />
                </svg>
              </span>
              Outils gratuits
              <span className="text-[12px] tabular-nums text-paper/70">{OUTILS.length}</span>
            </span>
            <Link
              href="/guides"
              className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-rule-fort bg-card py-1.5 pr-4 pl-1.5 text-[15px] text-ink transition-colors hover:border-ink-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
            >
              <span aria-hidden className="flex size-8 items-center justify-center rounded-full bg-paper-2 text-blue-clair">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="size-4">
                  <path d="M2.5 3.5h4a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 0-1.5-1.5h-4zM13.5 3.5h-4A1.5 1.5 0 0 0 8 5v8a1.5 1.5 0 0 1 1.5-1.5h4z" strokeLinejoin="round" />
                </svg>
              </span>
              Guides
              <span className="text-[12px] tabular-nums text-ink-3">{GUIDES.length}</span>
            </Link>
          </div>

          <ol className="mt-10 space-y-14">
            {OUTILS.map((o, i) => {
              const v = VITRINE[o.chemin];
              const c = captureOutil(o.chemin);
              return (
                <li key={o.chemin}>
                  <Link href={o.chemin} className="group grid items-center focus-visible:outline-none lg:grid-cols-12">
                    {/* La capture, sombre comme l'outil, posée sur le dégradé de
                        l'accueil : sur le fond nuit de la page, elle s'y perdait. */}
                    <span
                      className={cn(
                        "fond-capture relative block aspect-[16/10] overflow-hidden rounded-[1.5rem] lg:col-span-7 lg:row-start-1",
                        i % 2 === 0 ? "lg:col-start-1" : "lg:col-start-6",
                      )}
                    >
                      {c.capture ? (
                        <span className="absolute top-[14%] left-[7%] block aspect-[16/9] w-[100%] overflow-hidden rounded-[0.875rem] border border-white/20 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.65)] transition-transform duration-700 ease-[var(--ease-terouva)] group-hover:-translate-y-1">
                          <Image
                            src={c.src}
                            alt={`Capture de l'outil « ${o.court} »`}
                            fill
                            priority={i === 0}
                            sizes="(min-width: 1024px) 720px, 100vw"
                            className="object-cover object-top"
                          />
                        </span>
                      ) : (
                        <Image src={c.src} alt="" fill sizes="(min-width: 1024px) 720px, 100vw" className="object-cover" />
                      )}
                      <span className="champ absolute top-4 left-4 z-10 rounded-full bg-night px-3 py-1.5 text-night-ink">
                        Gratuit
                      </span>
                    </span>
                    <div
                      className={cn(
                        "relative z-10 mx-3 -mt-10 rounded-[1.5rem] border border-rule-fort bg-card p-6 shadow-[0_28px_56px_-30px_rgb(0_0_0/0.7)] sm:mx-6 sm:p-8 lg:row-start-1 lg:mx-0 lg:mt-0 lg:p-10 group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-accent-ink",
                        i % 2 === 0 ? "lg:col-span-6 lg:col-start-7" : "lg:col-span-6 lg:col-start-1",
                      )}
                    >
                      <p className="champ text-accent">
                        {String(i + 1).padStart(2, "0")} <span className="text-ink-3">/</span>{" "}
                        <span className="text-ink">{o.court}</span>
                      </p>
                      <h2 className="titre mt-4 text-[clamp(1.875rem,1.3rem+2vw,2.75rem)] text-ink">
                        {v?.gain ?? o.titre}
                      </h2>
                      {v && (
                        <ul className="mt-6 space-y-2.5">
                          {v.points.map((p) => (
                            <li key={p} className="flex gap-3 text-[15px] text-ink">
                              <span aria-hidden className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md bg-action text-action-ink">
                                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.25" className="size-3">
                                  <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </span>
                              {p}
                            </li>
                          ))}
                        </ul>
                      )}
                      <span className="mt-7 flex items-center gap-3">
                        <span className="champ text-ink">Ouvrir l&apos;outil</span>
                        <span className="flex size-8 items-center justify-center rounded-full bg-action text-action-ink transition-transform duration-200 group-hover:translate-x-0.5">
                          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden className="size-4">
                            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>

          <section aria-labelledby="confidentialite" className="mt-24">
            <h2 id="confidentialite" className="champ text-ink-3">
              Pourquoi rien n&apos;est envoyé
            </h2>
            <ul className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                {
                  titre: "Rien ne quitte votre ordinateur",
                  texte: "Le calcul se fait dans la page. Coupez votre connexion après le chargement : l'outil fonctionne toujours.",
                },
                {
                  titre: "Rien n'est enregistré",
                  texte: "Fermez l'onglet et vos réponses disparaissent. Pas de compte, donc pas d'historique à supprimer.",
                },
                {
                  titre: "Le résultat est à vous",
                  texte: "Vous le copiez, vous le modifiez, et vous l'envoyez vous-même, d'où vous voulez.",
                },
              ].map((r) => (
                <li key={r.titre} className="rounded-[1rem] border border-rule bg-card p-6">
                  <p className="font-medium text-ink">{r.titre}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{r.texte}</p>
                </li>
              ))}
            </ul>
            <p className="marge mt-4">
              Ces outils ne cherchent pas d&apos;annonces et n&apos;envoient rien à votre place. Le
              détail est dans la{" "}
              <Link href="/confidentialite" className="lien">
                page de confidentialité
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="guides" className="mt-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="champ text-blue-clair">Les guides</p>
                <h2 id="guides" className="titre titre--petit mt-3 text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] text-ink">
                  Vos droits, en moins de dix minutes de lecture
                </h2>
              </div>
              <Link href="/guides" className="lien text-[15px]">
                Tous les guides
              </Link>
            </div>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {GUIDES.map((g) => (
                <li key={g.chemin}>
                  <CarteGuide guide={g} />
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

/** Les captures des outils, inclinées les unes sur les autres, comme la pile de photos des guides. */
function PileDeCaptures() {
  const places = [
    "top-[6%] left-[4%] w-[66%] -rotate-[7deg]",
    "top-[28%] left-[26%] z-10 w-[66%] rotate-[4deg]",
    "top-[52%] left-[10%] z-20 w-[66%] -rotate-[2deg]",
  ];
  const captures = Object.values(CAPTURES_OUTILS).slice(0, places.length);
  return (
    <figure aria-hidden className="fond-capture relative mx-auto hidden aspect-[5/4] w-full max-w-[32rem] overflow-hidden rounded-[2rem] lg:col-span-5 lg:block">
      {captures.map((src, i) => (
        <span
          key={src}
          className={`absolute block aspect-[16/10] overflow-hidden rounded-[1rem] border border-white/25 shadow-[0_30px_60px_-24px_rgb(0_0_0/0.7)] ${places[i]}`}
        >
          <Image src={src} alt="" fill sizes="360px" className="object-cover object-top" />
        </span>
      ))}
    </figure>
  );
}
