import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Ariane } from "@/components/layout/Ariane";
import { FinDePage } from "@/components/layout/FinDePage";
import { GenerateurMessage } from "@/components/outils/GenerateurMessage";
import { Questions } from "@/components/ui/Questions";
import { DonneesStructurees, filAriane, pageMetadata } from "@/lib/seo";
import { OUTILS } from "@/lib/catalogue";
import { getSiteUrl } from "@/lib/site";

const CHEMIN = "/outils/message-de-candidature";
const OUTIL = OUTILS.find((o) => o.chemin === CHEMIN)!;

export const metadata = pageMetadata({
  titre: OUTIL.titreSeo,
  description: OUTIL.description,
  chemin: CHEMIN,
});

const ETAPES = [
  { nom: "Accueil", chemin: "/" },
  { nom: "Outils gratuits", chemin: "/outils" },
  { nom: "Message de candidature", chemin: CHEMIN },
];

const QUESTIONS = [
  {
    q: "Le générateur est-il vraiment gratuit ?",
    a: "Oui, et sans inscription. Il n'y a ni compte à créer, ni adresse e-mail à laisser, ni limite d'utilisation. Vous pouvez générer autant de messages que vous voulez.",
  },
  {
    q: "Où vont les informations que je saisis ?",
    a: "Nulle part. Le message est écrit par un programme qui tourne dans votre navigateur. Cette page n'envoie aucune donnée à un serveur, et rien n'est enregistré après la fermeture de l'onglet.",
  },
  {
    q: "Faut-il décrire l'appartement dans le message ?",
    a: "Non. La personne qui reçoit votre message a écrit l'annonce : lui répéter la surface, le loyer et le quartier ne prouve rien et allonge le texte. Une phrase sur ce qui vous a plu suffit à montrer que vous l'avez lue.",
  },
  {
    q: "Quel ton choisir ?",
    a: "Le ton direct convient quand l'annonce vient d'un particulier et que vous répondez vite. Le ton chaleureux marche bien quand le propriétaire habite sur place ou cherche quelqu'un de confiance. Le ton professionnel est attendu par les agences.",
  },
  {
    q: "Dois-je joindre mon dossier au premier message ?",
    a: "Non, dites seulement qu'il est prêt. Un premier message court obtient plus de réponses qu'un message long avec des pièces jointes, et vous enverrez le dossier dès que le contact est établi.",
  },
];

export default function OutilMessage() {
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${siteUrl}${CHEMIN}#outil`,
        name: "Générateur de message de candidature pour une location",
        url: `${siteUrl}${CHEMIN}`,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Tout navigateur web",
        inLanguage: "fr-FR",
        description:
          "Écrit le message qui accompagne un dossier de location, à partir de votre situation et de votre garant. Trois tons, six formulations, aucune donnée envoyée.",
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
        isAccessibleForFree: true,
        browserRequirements: "JavaScript activé",
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
        <div className="mx-auto max-w-5xl">
          <Ariane etapes={ETAPES} />

          <h1 className="display mt-5 max-w-3xl text-[2.1rem] text-ink sm:text-5xl">
            Le message qui accompagne votre dossier,{" "}
            <span className="text-accent">écrit en une minute.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
            Remplissez vos informations, choisissez un ton, copiez. C&apos;est gratuit, il n&apos;y
            a rien à installer et rien à créer. Les champs restent dans votre navigateur : cette
            page n&apos;envoie aucune donnée.
          </p>

          <div className="mt-10">
            <GenerateurMessage />
          </div>

          <div className="mt-20 grid gap-12 md:grid-cols-2">
            <section>
              <h2 className="display text-2xl text-ink">Ce qui fait un message qui obtient une visite</h2>
              <ul className="mt-5 space-y-5 leading-relaxed text-ink-2">
                <li>
                  <strong className="text-ink">Être court.</strong> Un propriétaire qui reçoit
                  quarante réponses lit les premières lignes. Cinq lignes qui disent l&apos;essentiel
                  valent mieux qu&apos;une page.
                </li>
                <li>
                  <strong className="text-ink">Dire tout de suite ce qui rassure.</strong> Votre
                  métier, votre type de contrat, votre revenu net, votre garant. C&apos;est la seule
                  chose que le propriétaire ne sait pas encore, et c&apos;est ce qu&apos;il cherche.
                </li>
                <li>
                  <strong className="text-ink">Annoncer un dossier prêt.</strong> Sans
                  l&apos;envoyer au premier message. Dire qu&apos;il est complet suffit à vous placer
                  devant ceux qui mettront trois jours à le réunir.
                </li>
                <li>
                  <strong className="text-ink">Proposer une disponibilité.</strong> Une phrase qui
                  ouvre la visite, pas une question qui attend une réponse.
                </li>
                <li>
                  <strong className="text-ink">Répondre vite.</strong> Sur les annonces de
                  particuliers, les premiers messages sont lus avec attention, les suivants en
                  diagonale.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="display text-2xl text-ink">Ce qui dessert un message</h2>
              <ul className="mt-5 space-y-5 leading-relaxed text-ink-2">
                <li>
                  <strong className="text-ink">Récapituler l&apos;annonce.</strong> « Votre 2 pièces
                  de 42 m² à 890 € » : la personne en face l&apos;a écrite. Cette phrase ne prouve
                  rien et signale un message recopié.
                </li>
                <li>
                  <strong className="text-ink">Le copier-coller visible.</strong> Les formules
                  entre parenthèses du type « intéressé(e) », les crochets oubliés, un ton qui ne
                  ressemble à personne.
                </li>
                <li>
                  <strong className="text-ink">En faire trop.</strong> Raconter sa vie, promettre
                  d&apos;être le locataire idéal, multiplier les superlatifs. Les faits suffisent.
                </li>
                <li>
                  <strong className="text-ink">Donner des informations que personne ne peut
                  demander.</strong> Un propriétaire n&apos;a pas le droit d&apos;exiger votre
                  relevé de compte, votre dossier médical ou votre extrait de casier :{" "}
                  <Link href="/guides/dossier-de-location" className="text-accent underline underline-offset-4">
                    la liste des pièces autorisées est fixée par décret
                  </Link>
                  . Ne les proposez pas de vous-même.
                </li>
              </ul>
            </section>
          </div>

          <section className="mt-20 max-w-[44rem]">
            <h2 className="display text-2xl text-ink">Comment le message est construit</h2>
            <p className="mt-4 leading-relaxed text-ink-2">
              Le générateur assemble six blocs, toujours dans cet ordre, et saute ceux pour
              lesquels il n&apos;a pas l&apos;information. Un profil à moitié rempli donne donc un
              message plus court, jamais un message à trous.
            </p>
            <ol className="mt-6 space-y-4 leading-relaxed text-ink-2">
              <li>
                <strong className="text-ink">La salutation</strong>, sans nom de famille
                hasardeux : la plupart des annonces de particuliers n&apos;en donnent pas.
              </li>
              <li>
                <strong className="text-ink">Une phrase d&apos;accroche</strong>, qui dit
                l&apos;intérêt sans récapituler l&apos;annonce. Trois formulations existent par
                ton, pour que deux candidatures envoyées le même jour ne soient pas identiques.
              </li>
              <li>
                <strong className="text-ink">Votre situation</strong> : métier, type de contrat,
                revenu net, garant, et le fait que le dossier est complet. C&apos;est le bloc que
                le propriétaire lit vraiment.
              </li>
              <li>
                <strong className="text-ink">Les éléments pratiques</strong> : combien de personnes
                vivront dans le logement, à partir de quand vous pouvez emménager, et pour combien
                de temps vous comptez rester.
              </li>
              <li>
                <strong className="text-ink">Votre disponibilité pour visiter</strong>, avec vos
                créneaux réels si vous les avez indiqués, et une formule qui ouvre la visite sinon.
              </li>
              <li>
                <strong className="text-ink">La signature</strong> : nom, téléphone, et courriel au
                ton professionnel. Un message sans moyen de vous joindre oblige à répondre dans la
                messagerie du site, ce qui ajoute un délai.
              </li>
            </ol>
            <p className="mt-6 leading-relaxed text-ink-2">
              Rien n&apos;est écrit à votre place sur ce que vous valez comme locataire : le
              générateur n&apos;emploie ni superlatif, ni promesse, ni formule du type
              « intéressé(e) ». Il met vos faits dans l&apos;ordre où ils se lisent le mieux, et
              vous relisez avant d&apos;envoyer.
            </p>
          </section>

          <Questions questions={QUESTIONS} className="mt-20" />

          <section className="mt-20 max-w-[44rem]">
            <h2 className="display text-2xl text-ink">Après le message</h2>
            <p className="mt-4 leading-relaxed text-ink-2">
              Un message qui marche déclenche une réponse dans l&apos;heure, et la conversation
              passe aussitôt à des sujets qu&apos;il vaut mieux avoir réglés d&apos;avance. Les
              trois qui reviennent toujours :
            </p>
            <ul className="mt-6 space-y-5 leading-relaxed text-ink-2">
              <li>
                <strong className="text-ink">« Pouvez-vous m&apos;envoyer votre dossier ? »</strong>{" "}
                Les pièces qu&apos;on peut vous réclamer sont fixées par décret, et la liste est
                limitative. Le guide du{" "}
                <Link
                  href="/guides/dossier-de-location"
                  className="text-accent underline underline-offset-4"
                >
                  dossier de location
                </Link>{" "}
                donne les pièces autorisées, les interdites et la sanction encourue.
              </li>
              <li>
                <strong className="text-ink">« Qui est votre garant ? »</strong> C&apos;est la
                question qui élimine le plus de candidatures. Ce que la caution signe vraiment est
                détaillé dans le guide du{" "}
                <Link
                  href="/guides/garant-caution"
                  className="text-accent underline underline-offset-4"
                >
                  garant
                </Link>{" "}
                ; si vous n&apos;avez personne à solliciter, la{" "}
                <Link
                  href="/guides/garantie-visale"
                  className="text-accent underline underline-offset-4"
                >
                  garantie Visale
                </Link>{" "}
                s&apos;obtient gratuitement avant la visite.
              </li>
              <li>
                <strong className="text-ink">« Il faudra prévoir le dépôt de garantie. »</strong>{" "}
                Un mois de loyer hors charges pour un logement vide, deux pour un meublé. Le{" "}
                <Link
                  href="/guides/depot-de-garantie"
                  className="text-accent underline underline-offset-4"
                >
                  guide du dépôt de garantie
                </Link>{" "}
                dit aussi ce qu&apos;on peut en retenir, et sous quel délai il doit vous être
                rendu.
              </li>
            </ul>
            <p className="mt-6 leading-relaxed text-ink-2">
              Et si une candidature est écartée sans explication, c&apos;est le droit du
              propriétaire. Les motifs qui lui sont en revanche interdits, et ce qu&apos;on peut
              faire quand un refus en relève, sont réunis dans le guide sur le{" "}
              <Link
                href="/guides/refus-de-dossier"
                className="text-accent underline underline-offset-4"
              >
                refus de dossier
              </Link>
              .
            </p>
          </section>

          <FinDePage />
        </div>
      </main>

      <Footer />
    </>
  );
}
