import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Ariane } from "@/components/layout/Ariane";
import { FinDePage } from "@/components/layout/FinDePage";
import { CalculLoyer } from "@/components/outils/CalculLoyer";
import { BandeNuit } from "@/components/layout/coquilles/BandeNuit";
import { Questions } from "@/components/ui/Questions";
import { OUTILS } from "@/lib/catalogue";
import { DonneesStructurees, filAriane, pageMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";

const CHEMIN = "/outils/quel-salaire-pour-un-loyer";
const OUTIL = OUTILS.find((o) => o.chemin === CHEMIN)!;

export const metadata = pageMetadata({
  titre: OUTIL.titreSeo,
  description: OUTIL.description,
  chemin: CHEMIN,
});

const ETAPES = [
  { nom: "Accueil", chemin: "/" },
  { nom: "Outils gratuits", chemin: "/outils" },
  { nom: "Salaire et loyer", chemin: CHEMIN },
];

// Sources : service-public F1169 (vérifiée le 2025-04-10) pour les
// justificatifs, F33453 (vérifiée le 2026-01-23) pour Visale, art. 22-1 de
// la loi du 6 juillet 1989 et ANIL pour l'assurance loyers impayés. Le détail
// est dans docs/seo/faits-a-integrer/seo-outils.md.
const QUESTIONS = [
  {
    q: "Faut-il gagner trois fois le loyer pour louer ?",
    a: "Non, aucun texte ne l'impose. La réglementation fixe la liste des justificatifs de ressources qu'un propriétaire peut demander, sans aucun seuil de revenus. « Trois fois le loyer » est un repère que beaucoup de propriétaires appliquent pour trier les dossiers : certains acceptent moins, d'autres demandent davantage.",
  },
  {
    q: "Quel salaire pour un loyer de 700 € ?",
    a: "Avec le repère courant, 2 100 € nets par mois pour 700 € charges comprises. Pour la garantie Visale, hors étudiants, le loyer ne doit pas dépasser la moitié de vos ressources : 1 400 € par mois suffisent, si vous êtes éligible à Visale et que le loyer reste sous le plafond de votre zone. Le calculateur fait le compte pour tout montant.",
  },
  {
    q: "Les APL comptent-elles dans les revenus ?",
    a: "Le propriétaire peut vous demander une attestation de simulation des aides au logement établie par la Caf ou la MSA : elle fait partie des justificatifs de ressources autorisés. Rien ne l'oblige à ajouter ces aides à vos revenus dans son calcul. Le calculateur les compte à part et vous montre les deux résultats.",
  },
  {
    q: "Le calcul se fait-il en net ou en brut ?",
    a: "Aucun texte ne le fixe, pas plus que le multiple. Le calculateur raisonne en net, sur le loyer charges comprises : c'est la lecture la plus prudente. Si l'annonce ou l'agence précise un autre critère, demandez-le par écrit et refaites le calcul avec ce critère.",
  },
  {
    q: "Que faire si mes ressources ne suffisent pas ?",
    a: "Trois pistes : un garant dont les ressources rassurent le propriétaire, la garantie Visale, gratuite et à demander avant de signer le bail, ou une colocation, qui additionne les ressources. Un propriétaire assuré contre les loyers impayés ne peut pas exiger en plus un garant, sauf si vous êtes étudiant ou apprenti.",
  },
];

export default function OutilSalaireLoyer() {
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // `WebPage` et non `WebApplication`, comme les deux autres outils : Google
      // exige pour ce dernier une note ou un avis en plus de l'offre, et l'outil
      // n'en a pas. Rempli à moitié, il est signalé invalide à chaque audit (porte
      // du lot 1, 2026-11-04) ; inventer une note est exclu.
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

      <main className="pb-16">
        <div className="cadre pt-4 md:pt-6">
          <Ariane etapes={ETAPES} />

          <h1 className="titre mt-5 max-w-[22ch] text-titre-2 text-ink">
            Le loyer que vos ressources permettent, et ce que les propriétaires regardent.
          </h1>
          <p className="enonce mt-6 text-ink-2">
            Indiquez un loyer, vos ressources, ou les deux. Vous voyez votre taux d&apos;effort, le
            repère des trois fois le loyer et les règles de la garantie Visale. Gratuit, sans
            inscription, et rien ne quitte votre navigateur.
          </p>
        </div>

        {/* L'outil est un instrument : il vit dans le monde nuit, l'explication
            autour reste sur le papier, comme pour les deux autres outils. */}
        <BandeNuit className="mt-10">
          <div className="cadre">
            <CalculLoyer />
          </div>
        </BandeNuit>

        <div className="cadre">
          <section className="mt-20 max-w-3xl">
            <h2 className="titre titre--petit text-[1.75rem] text-ink">
              Ce qu&apos;un propriétaire a le droit de regarder
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-ink-2">
              <p>
                Le <strong className="text-ink">décret n° 2015-1437 du 5 novembre 2015</strong> fixe
                les justificatifs de ressources qu&apos;un bailleur peut vous demander : avis
                d&apos;imposition, trois dernières fiches de paie, bilans pour un indépendant,
                attestations de pensions ou d&apos;allocations, avis de bourse, simulation des aides
                au logement. Il ne fixe <strong className="text-ink">aucun niveau de revenus</strong>.
              </p>
              <p>
                « Trois fois le loyer » est donc une habitude de propriétaires. Elle revient à un taux
                d&apos;effort d&apos;un tiers : la part de vos ressources qui part dans le loyer.
                C&apos;est ce taux que le calculateur affiche en premier : il se compare d&apos;une
                annonce à l&apos;autre, quel que soit le repère du propriétaire.
              </p>
              <p>
                La garantie Visale, elle, a des règles écrites : un plafond de loyer selon la zone,
                des seuils fixes pour les étudiants et les alternants, et pour les autres un loyer
                qui ne dépasse pas la moitié des ressources. Le détail est dans le guide{" "}
                <Link href="/guides/garantie-visale" className="lien">
                  la garantie Visale, conditions et démarche
                </Link>
                .
              </p>
            </div>
          </section>

          <section className="mt-16 max-w-3xl">
            <h2 className="titre titre--petit text-[1.75rem] text-ink">Une fois le calcul fait</h2>
            <ul className="mt-6 space-y-5 leading-relaxed text-ink-2">
              <li>
                <strong className="text-ink">Réunir les justificatifs.</strong> La{" "}
                <Link href="/outils/dossier-de-location" className="lien">
                  checklist de dossier
                </Link>{" "}
                donne la liste exacte pour votre situation, et ce qu&apos;on ne peut pas vous
                demander.
              </li>
              <li>
                <strong className="text-ink">Si le repère n&apos;est pas atteint.</strong> Un garant
                compense le plus souvent :{" "}
                <Link href="/guides/garant-caution" className="lien">
                  ce que signe un garant
                </Link>
                . Sans personne à solliciter :{" "}
                <Link href="/guides/louer-sans-garant" className="lien">
                  louer sans garant
                </Link>
                .
              </li>
              <li>
                <strong className="text-ink">Écrire au propriétaire.</strong> Le{" "}
                <Link href="/outils/message-de-candidature" className="lien">
                  générateur de message
                </Link>{" "}
                écrit le premier message en une minute. Ajoutez-y la phrase copiée ici avant de
                l&apos;envoyer.
              </li>
            </ul>
          </section>

          <Questions questions={QUESTIONS} className="mt-16 max-w-3xl" />

          <div className="max-w-3xl">
            <FinDePage
              titre="Et une fois le dossier prêt ?"
              texte="Reste à repérer les bonnes annonces et à écrire le message. C'est ce que fait Terouva, sur votre ordinateur. Terouva ouvre par vagues : laissez votre adresse pour prendre place."
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
