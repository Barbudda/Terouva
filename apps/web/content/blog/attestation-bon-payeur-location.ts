import { article } from "@/lib/blog-format";

const F1169 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169";
const T1169 = "Service-public.gouv.fr · Futur locataire : justificatifs à donner au propriétaire";
const F35247 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F35247";
const T35247 = "Service-public.gouv.fr · Quittance de loyer : comment l'obtenir ?";

export default article({
  slug: "attestation-bon-payeur-location",
  titre: "Attestation de bon payeur : quand le propriétaire peut-il la demander ?",
  titreSeo: "Attestation de bon payeur : quand la demander ?",
  description:
    "Vos trois dernières quittances suffisent : l'attestation du précédent propriétaire ne sert qu'à défaut. Ce que doit l'ancien bailleur, et un modèle.",
  chapeau:
    "Seulement à défaut de quittances. Pour justifier votre domicile, le propriétaire peut exiger une seule pièce : vos trois dernières quittances de loyer ou, si nécessaire, une attestation du précédent propriétaire indiquant que vous êtes à jour. L'ancien bailleur doit vous remettre gratuitement vos quittances quand vous les demandez ; l'attestation, il la rédige s'il le veut bien.",
  publieLe: "2026-11-04",
  pilier: "B",
  format: "question",
  guidePilier: "/guides/dossier-de-location",
  guidesLies: ["/guides/refus-de-dossier"],
  outilLie: "/outils/dossier-de-location",
  statut: "publie",
  requete: "attestation de bon payeur",
  faits: [
    {
      fait: "Justificatif de domicile : trois dernières quittances ou, si nécessaire, attestation du précédent propriétaire",
      valeur: "3 dernières quittances ou, si nécessaire, attestation du précédent propriétaire",
      source: F1169,
      titreSource: T1169,
      releveLe: "2026-11-04",
      citation: "3 dernières quittances de loyer ou, si nécessaire, une attestation du précédent propriétaire (ou de son mandataire) indiquant que le locataire est à jour de ses loyers et charges",
    },
    {
      fait: "Le propriétaire ne peut exiger qu'un seul justificatif de domicile",
      valeur: "1 seul justificatif",
      source: F1169,
      titreSource: T1169,
      releveLe: "2026-11-04",
      citation: "Le propriétaire (ou l'agence immobilière) peut exiger 1 seul justificatif parmi les documents suivants",
    },
    {
      fait: "Le propriétaire doit remettre gratuitement une quittance sur demande",
      valeur: "quittance remise gratuitement sur demande",
      source: F35247,
      titreSource: T35247,
      releveLe: "2026-11-04",
      citation: "doit vous remettre gratuitement une quittance de loyer, lorsque vous lui en faites la demande",
    },
    {
      fait: "Quittance par courriel seulement avec l'accord du locataire",
      valeur: "par mail, avec votre accord",
      source: F35247,
      titreSource: T35247,
      releveLe: "2026-11-04",
      citation: "peut vous transmettre la quittance de loyer par mail, à la condition que vous ayez donné votre accord",
    },
    {
      fait: "La quittance distingue le loyer et les charges",
      valeur: "détail des sommes, loyer et charges distingués",
      source: F35247,
      titreSource: T35247,
      releveLe: "2026-11-04",
      citation: "La quittance doit indiquer le détail des sommes que vous avez versées, en distinguant le loyer et les charges",
    },
    {
      fait: "Un justificatif non autorisé expose le propriétaire à une amende",
      valeur: "amende jusqu'à 3 000 €",
      source: F1169,
      titreSource: T1169,
      releveLe: "2026-11-04",
      citation: "il encourt une amende pouvant aller jusqu'à 3 000 €",
    },
  ],
  corps: `
## Le propriétaire peut-il exiger une attestation de bon payeur ? {#exiger}
Seulement si vous n'avez pas de quittances. Pour votre domicile, la liste officielle prévoit une seule pièce : vos trois dernières quittances de loyer ou, si nécessaire, une attestation du précédent propriétaire indiquant que vous êtes à jour de vos loyers et charges. Si vous fournissez les quittances, il ne peut pas réclamer l'attestation en plus.

Le propriétaire ne peut exiger qu'un seul justificatif de domicile, et une pièce hors liste l'expose à une amende pouvant aller jusqu'à 3 000 €. Les autres pièces sont dans le guide du [dossier de location](/guides/dossier-de-location).

## Votre ancien propriétaire doit-il vous la donner ? {#ancien-proprietaire}
Il doit vous donner vos quittances, pas forcément une attestation. Service-public le dit nettement : le propriétaire doit remettre gratuitement une quittance de loyer quand vous lui en faites la demande. Pour l'attestation, la fiche ne prévoit pas d'obligation : il la rédige s'il le veut bien. D'où l'intérêt de demander d'abord les quittances.

S'il refuse les quittances, rappelez-lui la règle par écrit. S'il les envoie par courriel, ce n'est possible qu'avec votre accord ; vous pouvez le donner pour aller plus vite.

## Que doit contenir une quittance ou une attestation ? {#contenu}
La quittance détaille les sommes que vous avez versées, en distinguant le loyer et les charges, pour une période donnée. L'attestation, elle, indique que vous êtes à jour de vos loyers et charges. Ajoutez-y l'adresse du logement, la période couverte, le nom et la signature du propriétaire ou de son mandataire, et la date.

Une attestation datée et signée, sur papier libre ou par courriel, se lit sans difficulté ; inutile d'attendre un formulaire.

## Comment la demander à votre ancien propriétaire ? {#modele}
Par un message court, qui demande d'abord les quittances et propose l'attestation en second. Précisez l'adresse du logement, la période et le format qui vous arrange. Un écrit, courriel ou lettre, vous laisse une trace si la réponse tarde. Voici un modèle à adapter, à envoyer avant de commencer vos recherches.

*Madame, Monsieur, je prépare un dossier de location. Pourriez-vous m'adresser les quittances de loyer des trois derniers mois pour le logement situé au [adresse] ? À défaut, une attestation indiquant que je suis à jour de mes loyers et charges pour la période du [date] au [date] me suffirait. Un envoi par courriel me convient. Je vous remercie par avance. [Nom, prénom]*

## Et si vous n'avez jamais été locataire ? {#jamais-loue}
La liste prévoit d'autres pièces pour le domicile, comme l'attestation sur l'honneur de la personne qui vous héberge. Vous n'avez donc ni quittance ni attestation de bon payeur à fournir : présentez la pièce qui correspond à votre situation.

Le cas de l'hébergé est détaillé dans [l'attestation d'hébergement](/blog/attestation-hebergement-dossier-location), et celui du premier logement dans [louer son premier appartement](/blog/louer-son-premier-appartement).
`,
});
