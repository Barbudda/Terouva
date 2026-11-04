import { article } from "@/lib/blog-format";

const SP_PIECES = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169";
const T_PIECES = "Service-public.gouv.fr · Futur locataire d'un logement privé : justificatifs à donner au propriétaire";
const SP_DISCRI = "https://www.service-public.gouv.fr/particuliers/vosdroits/F14750";
const T_DISCRI = "Service-public.gouv.fr · Discrimination à la location d'un logement";
const SP_EPOUX = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1159";
const T_EPOUX = "Service-public.gouv.fr · Couple marié locataire de son logement : quelles sont les règles ?";

export default article({
  slug: "louer-pendant-separation-divorce",
  titre: "Louer un appartement pendant un divorce ou une séparation",
  titreSeo: "Louer un appartement pendant un divorce",
  description:
    "Vous pouvez louer seul avant le jugement. Ce que le bailleur peut demander, les revenus qu'il regarde, et le bail familial qui vous engage encore.",
  chapeau:
    "Vous pouvez louer seul avant le jugement de divorce : la situation de famille fait partie des critères qu'un bailleur n'a pas le droit de retenir, et il ne peut exiger ni contrat de mariage ni jugement de divorce. Mais marié, vous restez cotitulaire du bail familial, et votre départ ne met pas fin tout de suite au loyer.",
  publieLe: "2026-11-04",
  pilier: "B",
  format: "cas-pratique",
  guidePilier: "/guides/dossier-de-location",
  guidesLies: ["/guides/refus-de-dossier", "/guides/preavis-location"],
  outilLie: "/outils/dossier-de-location",
  statut: "publie",
  requete: "puis-je louer un appartement si je ne suis pas divorcée ?",
  faits: [
    {
      fait: "La situation de famille est un critère interdit pour choisir un locataire",
      valeur: "situation de famille",
      source: SP_DISCRI,
      titreSource: T_DISCRI,
      releveLe: "2026-11-04",
      citation: "Origine Sexe Situation de famille Grossesse Apparence physique",
    },
    {
      fait: "Un relevé de compte ou un contrat de mariage ne peut pas être réclamé",
      valeur: "relevé de compte, contrat de mariage",
      source: SP_DISCRI,
      titreSource: T_DISCRI,
      releveLe: "2026-11-04",
      citation: "il est impossible de réclamer certains documents privés tel qu'un relevé de compte ou un contrat de mariage",
    },
    {
      fait: "Le contrat de mariage, le jugement de divorce et le livret de famille ne peuvent pas être demandés",
      valeur: "livret de famille, contrat de mariage, jugement de divorce",
      source: "https://www.cnil.fr/fr/location-dun-bien-immobilier-quels-justificatifs",
      titreSource: "CNIL · Location d'un bien immobilier : quels justificatifs peut-on demander aux candidats ?",
      releveLe: "2026-11-04",
      citation: "la copie du livret de famille, la carte Vitale, les relevés de compte bancaire, un contrat de mariage ou un jugement de divorce",
    },
    {
      fait: "Les 3 derniers bulletins de salaire font partie des justificatifs de ressources",
      valeur: "3 dernières fiches de paie",
      source: SP_PIECES,
      titreSource: T_PIECES,
      releveLe: "2026-11-04",
      citation: "3 dernières fiches de paie 2 derniers bilans ou, si nécessaire, attestation de ressources",
    },
    {
      fait: "Les prestations familiales et pensions des 3 derniers mois font partie des justificatifs de ressources",
      valeur: "prestations sociales et familiales des 3 derniers mois",
      source: SP_PIECES,
      titreSource: T_PIECES,
      releveLe: "2026-11-04",
      citation: "Justificatif de versement des indemnités, retraites, pensions, prestations sociales et familiales et allocations perçues lors des 3 derniers mois",
    },
    {
      fait: "Hébergé : l'attestation sur l'honneur de l'hébergeant sert de justificatif de domicile",
      valeur: "attestation sur l'honneur de l'hébergeant",
      source: SP_PIECES,
      titreSource: T_PIECES,
      releveLe: "2026-11-04",
      citation: "attestation sur l'honneur de l'hébergeant indiquant que le locataire réside à son domicile",
    },
    {
      fait: "Chaque époux est titulaire du bail du logement qu'ils habitent ensemble",
      valeur: "chaque époux titulaire du bail",
      source: SP_EPOUX,
      titreSource: T_EPOUX,
      releveLe: "2026-11-04",
      citation: "Chaque époux est titulaire du bail et locataire du logement qu'ils habitent ensemble, quel que soit son régime matrimonial",
    },
    {
      fait: "La règle vaut même si un seul des époux a signé le bail avant le mariage",
      valeur: "un seul signataire avant le mariage",
      source: SP_EPOUX,
      titreSource: T_EPOUX,
      releveLe: "2026-11-04",
      citation: "même si 1 seul des époux a signé le bail avant le mariage",
    },
    {
      fait: "La fiche s'appuie sur l'article 1751 du Code civil",
      valeur: "article 1751 du Code civil",
      source: SP_EPOUX,
      titreSource: T_EPOUX,
      releveLe: "2026-11-04",
      citation: "Code civil : article 1751 Co-titularité, séparation, divorce, abandon, décès",
    },
    {
      fait: "L'époux qui part reste tenu du loyer jusqu'à la fin du préavis de l'autre ou jusqu'à la mention du divorce",
      valeur: "loyer dû jusqu'à la fin du préavis de l'autre époux ou la mention du divorce",
      source: SP_EPOUX,
      titreSource: T_EPOUX,
      releveLe: "2026-11-04",
      citation: "obligé de payer le loyer et les charges dus jusqu'à la fin du préavis donné par l'autre époux, ou dus jusqu'à ce que le divorce soit noté",
    },
    {
      fait: "En cas de violences, l'époux qui part donne congé avec un préavis de 1 mois",
      valeur: "préavis de 1 mois",
      source: SP_EPOUX,
      titreSource: T_EPOUX,
      releveLe: "2026-11-04",
      citation: "Lorsque l'un des époux est violent, l'autre époux peut donner son congé au propriétaire (ou à l'agence immobilière) avec un délai de préavis de 1 mois",
    },
    {
      fait: "Avec une ordonnance de protection ou une condamnation, il n'est plus redevable des impayés suivants",
      valeur: "plus redevable des impayés à partir de cette date",
      source: SP_EPOUX,
      titreSource: T_EPOUX,
      releveLe: "2026-11-04",
      citation: "n'est pas redevable des impayés faits à partir de cette date",
    },
  ],
  corps: `
## Peut-on louer un appartement avant que le divorce soit prononcé ? {#avant-jugement}
Oui. Rien ne vous oblige à attendre le jugement pour signer un bail seul. Le bailleur ne peut pas écarter votre candidature à cause de votre situation de famille, qui fait partie des critères interdits, et il ne peut exiger ni votre contrat de mariage ni un jugement de divorce. Il juge vos revenus, comme pour n'importe quel candidat.

Le cas le plus courant : vous quittez le logement familial et cherchez un studio ou un deux-pièces, alors que la procédure n'en est qu'au début. Votre candidature se monte comme celle d'une personne seule, avec les pièces du guide du [dossier de location](/guides/dossier-de-location).

## Quels revenus le bailleur prend-il en compte ? {#revenus}
Les vôtres. Vos trois derniers bulletins de salaire montrent ce que vous gagnez seul. Votre dernier avis d'imposition est souvent encore commun : il fait apparaître les revenus du foyer, ce qui peut troubler le bailleur. Présentez les deux et expliquez en une ligne que l'avis date de la vie commune. Les prestations familiales que vous percevez déjà comptent aussi.

La liste officielle prévoit en effet le justificatif de versement des pensions, prestations sociales et familiales des trois derniers mois. Le bailleur regarde ensuite le loyer face à ces revenus : l'outil [quel salaire pour un loyer](/outils/quel-salaire-pour-un-loyer) vous dit où vous en êtes avant de candidater.

## Le bail du logement familial vous engage-t-il encore ? {#bail-familial}
Oui, si vous êtes marié et habitiez ensemble un logement loué vide : chaque époux en est titulaire, même si un seul l'a signé avant le mariage. Si vous partez seul, vous donnez congé, mais vous restez tenu du loyer avec votre conjoint jusqu'à la fin de son propre préavis, ou jusqu'à ce que le divorce soit noté à l'état civil.

C'est la règle de l'article 1751 du Code civil, que service-public détaille. Elle a une exception : en cas de violences sur vous ou sur un enfant qui vit avec vous, le préavis est d'un mois, et avec une ordonnance de protection ou une condamnation, vous n'êtes plus redevable des impayés faits après la remise de votre lettre. Les règles du congé sont dans le guide du [préavis de location](/guides/preavis-location).

## Quelles pièces montrer quand on se sépare ? {#pieces}
Les pièces habituelles, à votre seul nom : pièce d'identité, justificatif de domicile, contrat de travail, trois derniers bulletins de salaire, avis d'imposition. Pour le domicile, si un proche vous héberge le temps de la séparation, une attestation sur l'honneur de la personne qui vous héberge suffit. Vous n'avez pas à expliquer votre procédure, ni à en fournir la moindre pièce.

L'article [attestation d'hébergement](/blog/attestation-hebergement-dossier-location) donne le contenu de cette attestation et ce qu'elle doit éviter.

## Comment présenter votre situation au bailleur ? {#message}
Simplement, sans détail sur la séparation : « Je cherche un deux-pièces pour moi et ma fille, en garde alternée, avec un salaire en CDI depuis trois ans. » L'enfant compte pour le nombre de pièces, et le bailleur n'a pas à connaître l'état de votre procédure. Si l'avis d'imposition est commun, ajoutez une phrase pour le dire, sans plus.

Si l'on vous oppose la présence d'un enfant, l'article [refus de location avec enfants](/blog/refus-location-enfants) explique ce que dit la loi.
`,
});
