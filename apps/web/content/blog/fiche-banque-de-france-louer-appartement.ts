import { article } from "@/lib/blog-format";

const FICP = "https://www.service-public.gouv.fr/particuliers/vosdroits/F17608";
const TFICP = "Service-public.gouv.fr · Fichier des incidents de remboursement des crédits aux particuliers (FICP)";
const F1169 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169";
const T1169 = "Service-public.gouv.fr · Futur locataire : justificatifs à donner au propriétaire";

export default article({
  slug: "fiche-banque-de-france-louer-appartement",
  titre: "Fiché à la Banque de France : peut-on louer un appartement ?",
  titreSeo: "Fiché à la Banque de France : peut-on louer ?",
  description:
    "Le propriétaire n'a pas accès au FICP et ne peut pas réclamer vos relevés de compte. Ce que votre dossier montre, ce qui peut bloquer, et quoi présenter.",
  chapeau:
    "Oui. Le FICP est consulté par les banques et les sociétés de financement, pas par les propriétaires, et la liste des pièces qu'un bailleur peut exiger ne comprend ni relevé de compte ni attestation bancaire. Votre fichage ne se voit donc pas. Ce qui compte, ce sont vos revenus et la garantie que vous présentez.",
  publieLe: "2026-11-04",
  pilier: "B",
  format: "question",
  guidePilier: "/guides/refus-de-dossier",
  guidesLies: ["/guides/dossier-de-location", "/guides/louer-sans-garant"],
  outilLie: "/outils/dossier-de-location",
  statut: "publie",
  requete: "fichage FICP refus location logement",
  faits: [
    {
      fait: "Les établissements de crédit et les sociétés de financement consultent le FICP",
      valeur: "établissements de crédit et sociétés de financement",
      source: FICP,
      titreSource: TFICP,
      releveLe: "2026-11-04",
      citation: "Les établissements de crédit et les sociétés de financement consultent le FICP pour étudier la solvabilité",
    },
    {
      fait: "Les établissements de paiement et de monnaie électronique peuvent aussi le consulter avant d'accorder un moyen de paiement",
      valeur: "établissements de paiement et de monnaie électronique",
      source: FICP,
      titreSource: TFICP,
      releveLe: "2026-11-04",
      citation: "établissements de paiement et de monnaie électronique peuvent consulter le fichier avant d'accorder un moyen de paiement",
    },
    {
      fait: "La personne fichée peut consulter le fichier",
      valeur: "droit d'accéder au fichier",
      source: FICP,
      titreSource: TFICP,
      releveLe: "2026-11-04",
      citation: "Vous avez aussi le droit d'accéder au fichier.",
    },
    {
      fait: "Le propriétaire vérifie l'identité, le domicile, la situation professionnelle et les revenus, avec des justificatifs limités",
      valeur: "identité, domicile, situation professionnelle, revenus",
      source: F1169,
      titreSource: T1169,
      releveLe: "2026-11-04",
      citation: "est autorisé à vérifier certaines informations sur le futur locataire (identité, domicile, situation professionnelle, revenus). Seuls certains justificatifs sont autorisés.",
    },
    {
      fait: "Un justificatif non autorisé expose le propriétaire à une amende",
      valeur: "amende jusqu'à 3 000 €, ou 15 000 € pour une personne morale",
      source: F1169,
      titreSource: T1169,
      releveLe: "2026-11-04",
      citation: "il encourt une amende pouvant aller jusqu'à 3 000 € (ou 15 000 € s'il s'agit d'une personne morale",
    },
    {
      fait: "Le choix du locataire se fonde sur des critères objectifs comme la situation financière",
      valeur: "critères objectifs, par exemple la situation financière du candidat",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14750",
      titreSource: "Service-public.gouv.fr · Discrimination à la location d'un logement",
      releveLe: "2026-11-04",
      citation: "doit se fonder sur des critères objectifs (par exemple, la situation financière du candidat)",
    },
  ],
  corps: `
## Un propriétaire peut-il consulter le fichier de la Banque de France ? {#consulter}
Non. Selon service-public, le FICP est consulté par les établissements de crédit et les sociétés de financement pour juger une demande de crédit, et par les établissements de paiement avant d'accorder un moyen de paiement. Un propriétaire ou une agence immobilière n'y figure pas. Vous seul, en tant que personne fichée, pouvez aussi demander à voir votre inscription.

Le propriétaire n'a donc aucun moyen direct de savoir que vous êtes inscrit, et il n'a pas à vous le demander. Le motif d'un refus se juge selon le guide du [refus de dossier](/guides/refus-de-dossier).

## Peut-il vous demander vos relevés de compte ? {#releves}
Non. Le propriétaire peut vérifier quatre choses, votre identité, votre domicile, votre situation professionnelle et vos revenus, et seulement avec les justificatifs de la liste officielle. Les relevés de compte et les attestations bancaires n'y figurent pas. Réclamer une pièce hors liste l'expose à une amende pouvant aller jusqu'à 3 000 €, ou 15 000 € pour une personne morale.

Si une annonce ou une agence exige un relevé bancaire, vous pouvez rappeler poliment la liste. La [liste des pièces du dossier](/guides/dossier-de-location) est celle de service-public, à jour.

## Qu'est-ce qui peut quand même bloquer votre dossier ? {#bloquer}
Ce que vos pièces autorisées montrent. Le propriétaire choisit sur des critères objectifs, d'abord votre situation financière : si un remboursement ou une retenue réduit le net qui figure sur vos bulletins de paie, c'est ce net qu'il compare au loyer. Le fichage lui-même ne se voit pas ; ses conséquences sur vos revenus, parfois.

Regardez donc vos trois derniers bulletins comme le propriétaire les lira. Si le net affiché paraît faible pour le loyer visé, mieux vaut viser un loyer plus bas ou renforcer le dossier par une garantie que d'espérer qu'il passe.

## Comment présenter un dossier solide malgré un fichage ? {#dossier}
En donnant au propriétaire ce qu'il cherche : un revenu qui couvre le loyer et une garantie qui prend le relais. Un garant physique, la garantie Visale si vous y avez droit, ou un propriétaire déjà assuré contre les impayés suffisent souvent à le rassurer. Aucune de ces garanties ne vous oblige à parler de votre inscription au FICP.

Les solutions sans garant familial sont détaillées dans le guide [louer sans garant](/guides/louer-sans-garant), et la [checklist de dossier](/outils/dossier-de-location) donne vos pièces selon votre situation.

## Faut-il en parler au propriétaire ? {#en-parler}
Vous n'y êtes pas tenu, et la question n'a pas à vous être posée : le fichier concerne vos crédits, pas vos loyers. Si vous avez déjà loué, vos quittances ou une attestation de votre ancien propriétaire montrent mieux que tout discours que vous payez votre loyer à l'heure. C'est ce document-là qui parle à un bailleur.

Pour vérifier ce que le fichier dit de vous, la demande de consultation se fait en ligne, sur place ou par courrier auprès de la Banque de France.
`,
});
