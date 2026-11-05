import { article } from "@/lib/blog-format";

const F31267 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F31267";
const T31267 = "Service-public.gouv.fr · Caution du locataire ou du colocataire dans un logement privé";
const ANIL_CG = "https://www.anil.org/votre-besoin/louer/trouver-un-logement/caution-et-garanties/";
const TANIL_CG = "ANIL · Caution et garanties";

export default article({
  slug: "garant-oblige-de-payer",
  titre: "Votre garant est-il obligé de payer ? Quand le propriétaire peut l'actionner",
  titreSeo: "Garant : obligé de payer ? Quand et comment",
  description:
    "Oui, dans la limite de son engagement. Solidaire ou simple, quand il est appelé, recours contre vous : à lire avant de demander ce service à un proche.",
  chapeau:
    "Oui, si l'acte de cautionnement est valable et que vous ne payez pas. En caution solidaire, le propriétaire peut s'adresser à votre garant dès le premier impayé ; en caution simple, il doit d'abord vous réclamer la dette. Votre garant pourra ensuite vous poursuivre pour être remboursé. Mesurez cet engagement avant de le demander.",
  publieLe: "2026-11-06",
  pilier: "C",
  format: "question",
  guidePilier: "/guides/garant-caution",
  guidesLies: ["/guides/garantie-visale", "/guides/louer-sans-garant"],
  statut: "publie",
  requete: "un garant est il obligé de payer",
  faits: [
    {
      fait: "Les dettes couvertes comprennent le loyer, les charges, les intérêts de retard et la remise en état",
      valeur: "loyer, charges, intérêts, remise en état",
      source: F31267,
      titreSource: T31267,
      releveLe: "2026-11-05",
      citation: "Les frais de remise en état du logement dégradé",
    },
    {
      fait: "Si la caution ne paie pas, ses biens, ses revenus et son logement peuvent être saisis",
      valeur: "saisie des biens, revenus et logement",
      source: F31267,
      titreSource: T31267,
      releveLe: "2026-11-05",
      citation: "ses biens personnels, ses revenus et son logement (s'il lui appartient) peuvent être saisis",
    },
    {
      fait: "La caution solidaire est poursuivie dans la limite des sommes pour lesquelles elle s'est engagée",
      valeur: "dans la limite de son engagement",
      source: ANIL_CG,
      titreSource: TANIL_CG,
      releveLe: "2026-11-05",
      citation: "mais dans la limite des sommes pour lesquelles elle s'est engagée",
    },
    {
      fait: "Les formalités de l'acte sont prescrites à peine de nullité",
      valeur: "à peine de nullité",
      source: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000044073458",
      titreSource: "Légifrance · Loi du 6 juillet 1989, article 22-1",
      releveLe: "2026-11-05",
      citation: "Ces formalités sont prescrites à peine de nullité du cautionnement",
    },
    {
      fait: "En caution solidaire, le propriétaire peut s'adresser directement à la caution, sans passer par le locataire",
      valeur: "sans passer par le locataire",
      source: F31267,
      titreSource: T31267,
      releveLe: "2026-11-05",
      citation: "sans même passer par le locataire et donc sans même rechercher si celui-ci pourrait payer",
    },
    {
      fait: "En caution simple, le propriétaire fait appel à la caution seulement si le locataire ne peut pas payer",
      valeur: "seulement si le locataire ne peut pas payer",
      source: F31267,
      titreSource: T31267,
      releveLe: "2026-11-05",
      citation: "uniquement si le locataire n'est pas en mesure de payer ses dettes locatives",
    },
    {
      fait: "Le propriétaire peut réclamer un impayé pendant 3 ans",
      valeur: "3 ans",
      source: F31267,
      titreSource: T31267,
      releveLe: "2026-11-05",
      citation: "peut réclamer pendant 3 ans tout impayé de charges ou de loyers",
    },
    {
      fait: "Un commandement de payer signifié au locataire doit l'être à la caution sous 15 jours",
      valeur: "15 jours",
      source: ANIL_CG,
      titreSource: TANIL_CG,
      releveLe: "2026-11-05",
      citation: "a 15 jours pour signifier à la caution ce commandement",
    },
    {
      fait: "Un bailleur professionnel informe la caution dès le premier impayé non régularisé dans le mois",
      valeur: "premier impayé non régularisé dans le mois",
      source: ANIL_CG,
      titreSource: TANIL_CG,
      releveLe: "2026-11-05",
      citation: "il doit informer la caution dès le premier impayé non régularisé dans le mois",
    },
    {
      fait: "Sans cette information, la caution ne doit ni pénalités ni intérêts de retard",
      valeur: "ni pénalités ni intérêts de retard",
      source: ANIL_CG,
      titreSource: TANIL_CG,
      releveLe: "2026-11-05",
      citation: "la caution ne sera pas tenue de payer des pénalités ou intérêts de retard",
    },
    {
      fait: "La caution peut demander des délais de paiement au juge",
      valeur: "délais de paiement",
      source: F31267,
      titreSource: T31267,
      releveLe: "2026-11-05",
      citation: "elle peut demander des délais de paiement en saisissant le juge des contentieux de la protection",
    },
    {
      fait: "La caution peut saisir la commission de surendettement",
      valeur: "commission de surendettement",
      source: F31267,
      titreSource: T31267,
      releveLe: "2026-11-05",
      citation: "la commission de surendettement du département de son lieu d'habitation",
    },
    {
      fait: "Le surendettement du locataire ne libère pas la caution des impayés déjà faits",
      valeur: "impayés déjà faits",
      source: F31267,
      titreSource: T31267,
      releveLe: "2026-11-05",
      citation: "la caution reste obligée de payer pour les impayés déjà faits",
    },
    {
      fait: "Avec une durée précise, la caution ne peut pas résilier",
      valeur: "pas de résiliation si une durée est indiquée",
      source: F31267,
      titreSource: T31267,
      releveLe: "2026-11-05",
      citation: "Quand une durée précise est indiquée dans l'acte de cautionnement, la caution ne peut pas résilier son engagement",
    },
    {
      fait: "Sans durée, la résiliation ne prend effet qu'à l'expiration du bail",
      valeur: "effet à l'expiration du bail",
      source: F31267,
      titreSource: T31267,
      releveLe: "2026-11-05",
      citation: "La caution peut faire cette démarche à tout moment, mais cette résiliation ne prend effet qu'à l'expiration du bail",
    },
    {
      fait: "Au décès de la caution, les héritiers doivent les dettes déjà faites, pas celles d'après",
      valeur: "dettes déjà faites au moment du décès",
      source: F31267,
      titreSource: T31267,
      releveLe: "2026-11-05",
      citation: "Les héritiers doivent garantir le paiement des dettes locatives qui étaient déjà faites au moment du décès",
    },
    {
      fait: "Après avoir payé, la caution peut poursuivre le locataire pour être remboursée",
      valeur: "poursuites pour obtenir le remboursement",
      source: "https://www.anil.org/fileadmin/ANIL/Editions_grand_public/serie_rapports_locatifs/se_porter_caution.pdf",
      titreSource: "ANIL · Dépliant « Se porter caution » (janvier 2022)",
      releveLe: "2026-11-05",
      citation: "la caution peut engager des poursuites contre le locataire pour obtenir le remboursement des sommes versées",
    },
  ],
  corps: `
## Un garant est-il obligé de payer ? {#oblige}
Oui, dans la limite de son engagement. Votre garant répond de vos loyers, charges, intérêts de retard et frais de remise en état. S'il ne paie pas, ses revenus, ses biens et son logement, s'il en est propriétaire, peuvent être saisis. Cela suppose un acte valable : les formalités de la loi sont prescrites à peine de nullité.

Ce qu'il doit est borné par le montant maximum écrit dans l'acte. Le guide [garant et caution](/guides/garant-caution) détaille ce que cet acte doit contenir, et le [modèle d'acte de caution solidaire](/blog/modele-acte-caution-solidaire) le montre ligne par ligne.

## À partir de quand le propriétaire peut-il se tourner vers lui ? {#quand}
Tout dépend du type de caution écrit dans l'acte. En caution solidaire, le propriétaire peut s'adresser à votre garant dès le premier impayé, sans passer par vous et sans chercher si vous pourriez payer. En caution simple, il doit d'abord vous le réclamer, et ne se tourne vers votre garant que si vous n'êtes pas en mesure de payer.

Dans les deux cas, le propriétaire dispose de 3 ans pour réclamer un loyer ou des charges impayés. Votre garant peut donc recevoir une demande longtemps après les faits, si personne ne l'a prévenu entre-temps.

## Le garant doit-il être prévenu ? {#information}
Oui, dans deux cas précis. Un commandement de payer qui vous est signifié doit aussi l'être à votre garant, dans les 15 jours. Et un bailleur professionnel doit l'informer dès le premier impayé non régularisé dans le mois. À défaut, votre garant n'a pas à payer les pénalités ou intérêts de retard ; le reste de la dette demeure.

Rien ne vous empêche de le prévenir vous-même, et c'est ce que vous lui devez. Un garant averti au premier retard peut encore vous aider à trouver une solution ; celui qui l'apprend par un commissaire de justice, beaucoup moins.

## Que peut faire un garant qui ne peut pas payer ? {#difficultes}
Il peut demander des délais de paiement en saisissant le juge des contentieux de la protection du tribunal dont dépend le logement. Si ces délais ne suffisent pas, il peut saisir la commission de surendettement de son département. Ces démarches étalent ou réorganisent la dette, sans qu'il puisse simplement refuser de répondre à la demande.

Votre propre situation ne le libère pas : même si vous déposez un dossier de surendettement, il reste obligé de payer les impayés déjà faits.

## Quand son engagement s'arrête-t-il ? {#fin}
En principe, en même temps que le vôtre : à la fin de votre préavis si vous partez, ou à l'expiration du bail si le propriétaire y met fin. Avec une durée précise dans l'acte, il reste engagé jusqu'à cette date sans pouvoir résilier. Sans durée, il peut résilier à tout moment, mais l'effet n'intervient qu'à l'expiration du bail.

Dans tous les cas, ce qui était déjà dû reste dû. Au décès de la caution, sauf mention contraire dans l'acte, les héritiers doivent garantir les dettes déjà faites à cette date, pas celles d'après.

## Que peut-il vous réclamer ensuite ? {#recours}
Ce qu'il a payé à votre place. Selon l'ANIL, la caution qui a réglé la dette peut engager des poursuites contre le locataire pour obtenir le remboursement des sommes versées. Le paiement de votre garant ne vous libère donc pas : vous devez alors à votre proche ce que vous deviez au propriétaire.

C'est la vraie question à vous poser avant de lui demander ce service, et à lui poser aussi : pourrait-il payer plusieurs mois de loyer sans que cela l'atteigne ? Si la réponse n'est pas claire, regardez d'abord si la [garantie Visale](/guides/garantie-visale) ou les autres voies du guide [louer sans garant](/guides/louer-sans-garant) peuvent le remplacer. Visale ne supprime pas la dette non plus : vous remboursez Action Logement, mais aucun proche n'est engagé.
`,
});
