import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Ariane } from "@/components/layout/Ariane";
import { FinDePage } from "@/components/layout/FinDePage";
import { GenerateurMessage } from "@/components/outils/GenerateurMessage";
import { DonneesStructurees, filAriane, pageMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";

const CHEMIN = "/outils/message-de-candidature";

export const metadata = pageMetadata({
  titre: "Générateur de message de candidature pour une location",
  description:
    "Écrivez en une minute le message qui accompagne votre dossier de location. Gratuit, sans inscription, trois tons au choix. Rien n'est envoyé : tout se passe dans votre navigateur.",
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

          <section className="mt-20">
            <h2 className="display text-2xl text-ink">Questions fréquentes</h2>
            <div className="mt-6 space-y-3">
              {QUESTIONS.map((item) => (
                <details key={item.q} className="group card-soft px-6">
                  <summary className="flex cursor-pointer items-start justify-between gap-6 py-5 text-[17px] font-bold text-ink transition-colors hover:text-accent">
                    <span>{item.q}</span>
                    <svg
                      viewBox="0 0 16 16"
                      aria-hidden
                      className="mt-1.5 size-4 shrink-0 text-accent transition-transform duration-200 group-open:rotate-45"
                    >
                      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </summary>
                  <p className="max-w-2xl pb-5 leading-relaxed text-ink-2">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <FinDePage />
        </div>
      </main>

      <Footer />
    </>
  );
}
