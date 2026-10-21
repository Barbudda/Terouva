import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Ariane } from "@/components/layout/Ariane";
import { FinDePage } from "@/components/layout/FinDePage";
import { ListeDossier } from "@/components/outils/ListeDossier";
import { Questions } from "@/components/ui/Questions";
import { OUTILS } from "@/lib/catalogue";
import { DonneesStructurees, filAriane, pageMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";

const CHEMIN = "/outils/dossier-de-location";
const OUTIL = OUTILS.find((o) => o.chemin === CHEMIN)!;

export const metadata = pageMetadata({
  titre: OUTIL.titreSeo,
  description: OUTIL.description,
  chemin: CHEMIN,
});

const ETAPES = [
  { nom: "Accueil", chemin: "/" },
  { nom: "Outils gratuits", chemin: "/outils" },
  { nom: "Checklist de dossier", chemin: CHEMIN },
];

const QUESTIONS = [
  {
    q: "Quels documents faut-il pour un dossier de location ?",
    a: "Quatre catégories : une pièce d'identité, un justificatif de domicile, un ou plusieurs justificatifs d'activité professionnelle, et un ou plusieurs justificatifs de ressources. Le détail change selon que vous êtes salarié, étudiant, indépendant ou retraité : c'est ce que cette page calcule.",
  },
  {
    q: "Un propriétaire peut-il demander un RIB avant la signature ?",
    a: "Le RIB ne figure pas dans la liste du décret du 5 novembre 2015, qui est limitative. Vous pouvez donc refuser de le fournir avant la signature du bail. Il devient normal de le donner ensuite, pour le paiement du loyer.",
  },
  {
    q: "Que risque un propriétaire qui demande un document interdit ?",
    a: "Une amende pouvant aller jusqu'à 3 000 € pour un particulier, et 15 000 € pour une société, agence immobilière comprise.",
  },
  {
    q: "Faut-il un garant pour louer ?",
    a: "Ce n'est pas obligatoire, mais beaucoup de propriétaires en demandent un. Si vous n'avez pas de garant, la garantie Visale d'Action Logement est gratuite et se demande avant même d'avoir trouvé le logement.",
  },
  {
    q: "Cette liste remplace-t-elle un conseil juridique ?",
    a: "Non. Elle indique ce qu'un propriétaire a le droit de demander, d'après le décret en vigueur. Elle ne dit pas si votre dossier sera accepté, et ne remplace pas l'avis d'un professionnel sur une situation particulière.",
  },
];

export default function OutilDossier() {
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // `WebPage` et non `WebApplication` : Google exige pour ce dernier une
      // note ou un avis en plus du nom et de l'offre, et cet outil n'en a pas.
      // Un type qu'on ne peut pas remplir honnêtement ne donne pas de résultat
      // enrichi et compte comme une erreur à chaque audit. `WebPage` décrit la
      // même chose, sans rien promettre qui n'existe pas.
      {
        "@type": "WebPage",
        "@id": `${siteUrl}${CHEMIN}#outil`,
        name: OUTIL.titre,
        url: `${siteUrl}${CHEMIN}`,
        inLanguage: "fr-FR",
        description: OUTIL.description,
        isAccessibleForFree: true,
        isPartOf: { "@id": `${siteUrl}/#website` },
      },
      {
        "@type": "FAQPage",
        mainEntity: QUESTIONS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <DonneesStructurees data={jsonLd} />
      <DonneesStructurees data={filAriane(ETAPES)} />
      <Nav home={false} />

      <main className="px-4 pt-10 pb-16 sm:px-6 md:pt-14">
        <div className="mx-auto max-w-6xl">
          <Ariane etapes={ETAPES} />

          <h1 className="display mt-5 max-w-3xl text-[2.1rem] text-ink sm:text-5xl">
            Les pièces de votre dossier,{" "}
            et celles qu&apos;on ne peut pas vous demander.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
            La liste est fixée par décret, et elle est limitative. Répondez à trois questions :
            vous obtenez exactement ce qu&apos;il vous faut réunir, sans les pièces qui ne vous
            concernent pas. Gratuit, sans inscription, et rien ne quitte votre navigateur.
          </p>

          <div className="mt-10">
            <ListeDossier />
          </div>

          <section className="mt-20 max-w-3xl">
            <h2 className="display text-2xl text-ink">Pourquoi cette liste et pas une autre</h2>
            <div className="mt-5 space-y-4 leading-relaxed text-ink-2">
              <p>
                Le <strong className="text-ink">décret n° 2015-1437 du 5 novembre 2015</strong>,
                pris pour l&apos;application de la loi du 6 juillet 1989, fixe ce qu&apos;un
                bailleur peut réclamer à un candidat et à sa caution. Cette liste est{" "}
                <strong className="text-ink">limitative</strong> : ce qui n&apos;y figure pas est
                interdit, même demandé poliment, même « pour aller plus vite ».
              </p>
              <p>
                Dans deux catégories, l&apos;identité et le domicile, le propriétaire ne peut
                exiger qu&apos;<strong className="text-ink">un seul</strong> document. Dans les deux
                autres, il peut en demander plusieurs. C&apos;est pour cela que la liste
                ci-dessus indique la règle à côté de chaque catégorie.
              </p>
              <p>
                Les listes toutes faites qu&apos;on trouve ailleurs mélangent souvent les
                situations : elles réclament un contrat de travail à un étudiant, ou des bulletins
                de salaire à un indépendant. Celle-ci part de votre situation, et ne propose que ce
                qui existe pour vous.
              </p>
              <p>
                Pour aller plus loin : le guide{" "}
                <Link href="/guides/dossier-de-location">
                  la liste exacte des pièces qu&apos;on peut vous demander
                </Link>{" "}
                explique comment refuser une demande abusive sans perdre le logement, et ce que
                devient votre dossier après un refus.
              </p>
            </div>
          </section>

          <Questions questions={QUESTIONS} className="mt-16 max-w-3xl" />

          <div className="max-w-3xl">
            <FinDePage
              titre="Et une fois le dossier prêt ?"
              texte="Reste à repérer les bonnes annonces et à écrire le message. C'est ce que fait Terouva, sur votre ordinateur. L'application sort bientôt : laissez votre adresse pour être prévenu."
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
