import { article } from "@/lib/blog-format";

const SP_PIECES = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169";
const T_PIECES = "Service-public.gouv.fr · Futur locataire d'un logement privé : justificatifs à donner au propriétaire";
const SP_DISCRI = "https://www.service-public.gouv.fr/particuliers/vosdroits/F14750";
const T_DISCRI = "Service-public.gouv.fr · Discrimination à la location d'un logement";
const CNIL = "https://www.cnil.fr/fr/location-dun-bien-immobilier-quels-justificatifs";
const T_CNIL = "CNIL · Location d'un bien immobilier : quels justificatifs peut-on demander aux candidats ?";
const SP_VISALE = "https://www.service-public.gouv.fr/particuliers/vosdroits/F33453";
const T_VISALE = "Service-public.gouv.fr · Garantie Visale : caution pour le locataire";

export default article({
  slug: "louer-avec-epargne-peu-de-revenus",
  titre: "Louer avec de l'épargne mais peu de revenus : quelles pièces montrer ?",
  titreSeo: "Louer avec de l'épargne mais peu de revenus",
  description:
    "Le bailleur ne peut pas exiger vos relevés de compte. Les pièces que la liste officielle prévoit pour un capital, et les garanties si cela ne suffit pas.",
  chapeau:
    "La liste officielle des justificatifs prévoit votre cas : les revenus de capitaux mobiliers, les revenus fonciers et les rentes s'y prouvent comme un salaire, et un titre de propriété y figure aussi. Le bailleur ne peut pas exiger vos relevés de compte bancaire. Si votre capital rapporte peu, un garant ou Visale, selon votre âge, rassure le bailleur.",
  publieLe: "2026-11-04",
  pilier: "B",
  format: "question",
  guidePilier: "/guides/dossier-de-location",
  guidesLies: ["/guides/louer-sans-garant", "/guides/garantie-visale"],
  outilLie: "/outils/quel-salaire-pour-un-loyer",
  statut: "publie",
  requete: "louer avec peu de revenus mais beaucoup de ressources",
  faits: [
    {
      fait: "Les revenus fonciers, rentes viagères et revenus de capitaux mobiliers font partie des justificatifs de ressources",
      valeur: "revenus fonciers, rentes viagères, revenus de valeurs et capitaux mobiliers",
      source: SP_PIECES,
      titreSource: T_PIECES,
      releveLe: "2026-11-04",
      citation: "Justificatif de revenus fonciers, de rentes viagères ou de revenus de valeurs et capitaux mobiliers",
    },
    {
      fait: "Le titre de propriété d'un bien ou l'avis de taxe foncière fait partie des justificatifs de ressources",
      valeur: "titre de propriété, avis de taxe foncière",
      source: SP_PIECES,
      titreSource: T_PIECES,
      releveLe: "2026-11-04",
      citation: "Titre de propriété d'un bien immobilier ou dernier avis de taxe foncière",
    },
    {
      fait: "Le dernier ou l'avant-dernier avis d'imposition fait partie des justificatifs de ressources",
      valeur: "dernier ou avant-dernier avis d'imposition",
      source: SP_PIECES,
      titreSource: T_PIECES,
      releveLe: "2026-11-04",
      citation: "Dernier ou avant-dernier avis d'imposition ou de non-imposition",
    },
    {
      fait: "Un justificatif non autorisé expose le propriétaire à une amende",
      valeur: "amende jusqu'à 3 000 €",
      source: SP_PIECES,
      titreSource: T_PIECES,
      releveLe: "2026-11-04",
      citation: "il encourt une amende pouvant aller jusqu'à 3 000 € (ou 15 000 € s'il s'agit d'une personne morale",
    },
    {
      fait: "Un relevé de compte ne peut pas être réclamé au candidat",
      valeur: "relevé de compte",
      source: SP_DISCRI,
      titreSource: T_DISCRI,
      releveLe: "2026-11-04",
      citation: "il est impossible de réclamer certains documents privés tel qu'un relevé de compte ou un contrat de mariage",
    },
    {
      fait: "Le choix du locataire se fonde sur des critères objectifs comme la situation financière",
      valeur: "critères objectifs, par exemple la situation financière",
      source: SP_DISCRI,
      titreSource: T_DISCRI,
      releveLe: "2026-11-04",
      citation: "doit se fonder sur des critères objectifs (par exemple, la situation financière du candidat)",
    },
    {
      fait: "La CNIL cite les relevés de compte bancaire parmi les documents qu'on ne peut pas demander",
      valeur: "relevés de compte bancaire",
      source: CNIL,
      titreSource: T_CNIL,
      releveLe: "2026-11-04",
      citation: "la copie du livret de famille, la carte Vitale, les relevés de compte bancaire, un contrat de mariage ou un jugement de divorce",
    },
    {
      fait: "La CNIL déconseille d'envoyer un document personnel avant d'avoir écarté l'escroquerie",
      valeur: "pas de document personnel avant vérification",
      source: CNIL,
      titreSource: T_CNIL,
      releveLe: "2026-11-04",
      citation: "Il est notamment déconseillé au candidat d'envoyer tout document personnel avant d'avoir vérifié qu'il ne s'agit pas d'une escroquerie",
    },
    {
      fait: "À 30 ans ou moins, Visale est ouverte quel que soit le statut, sous conditions",
      valeur: "tous statuts, sous conditions",
      source: SP_VISALE,
      titreSource: T_VISALE,
      releveLe: "2026-11-04",
      citation: "(étudiant, alternant, fonctionnaire, salarié, sans emploi...), peuvent obtenir la garantie Visale, sous certaines conditions",
    },
    {
      fait: "À partir de 31 ans, Visale vise le salarié du secteur privé",
      valeur: "salarié du secteur privé",
      source: SP_VISALE,
      titreSource: T_VISALE,
      releveLe: "2026-11-04",
      citation: "Salarié du secteur privé (y compris agricole) Il s'agit notamment du salarié en contrat aidé, en intérim, en CDD",
    },
    {
      fait: "Un propriétaire particulier assuré contre les impayés ne peut demander une caution que pour un étudiant ou un apprenti",
      valeur: "caution seulement si le locataire est étudiant ou apprenti",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F31267",
      titreSource: "Service-public.gouv.fr · Caution du locataire ou du colocataire dans un logement privé",
      releveLe: "2026-11-04",
      citation: "Le propriétaire qui a déjà une assurance privée contre les risques locatifs peut demander une caution seulement si son locataire est étudiant ou apprenti",
    },
  ],
  corps: `
## Un capital peut-il remplacer un salaire dans un dossier de location ? {#capital}
En partie. La liste officielle des justificatifs de ressources ne se limite pas aux salaires : elle prévoit les revenus de valeurs et capitaux mobiliers, les revenus fonciers et les rentes viagères, ainsi que le titre de propriété d'un bien. Le bailleur juge votre capacité à payer le loyer chaque mois, et un capital qui produit des revenus réguliers y répond.

Le bailleur reste libre de choisir parmi les candidats, sur des critères objectifs comme la situation financière. Un capital qui ne rapporte presque rien se montre mal avec les pièces de la liste : c'est là qu'une garantie prend le relais. La liste complète est dans le guide du [dossier de location](/guides/dossier-de-location).

## Quelles pièces prouvent une épargne ou un patrimoine ? {#pieces}
Trois pièces de la liste s'y prêtent : le justificatif de revenus de valeurs et capitaux mobiliers (intérêts, dividendes), le justificatif de revenus fonciers si vous louez un bien, et le titre de propriété ou le dernier avis de taxe foncière. Votre dernier avis d'imposition fait aussi apparaître la plupart de ces revenus, ce qui en fait souvent la pièce la plus parlante.

Pour les revenus de placements, le relevé fiscal annuel de votre banque ou de votre assureur suffit. Les intérêts des livrets défiscalisés, comme le livret A, n'apparaissent pas sur l'avis d'imposition : c'est la limite de l'exercice, et la raison pour laquelle une garantie complète souvent ce type de dossier.

## Le propriétaire peut-il exiger vos relevés de compte ? {#releves}
Non. Service-public et la CNIL citent les relevés de compte parmi les documents qu'un bailleur ne peut pas réclamer, et le propriétaire qui exige une pièce non autorisée s'expose à une amende pouvant aller jusqu'à 3 000 €. Vous pouvez choisir de montrer une attestation d'épargne de votre banque pour appuyer votre dossier, mais rien ne vous y oblige.

Méfiez-vous des annonces qui réclament des documents bancaires avant toute visite : la CNIL déconseille d'envoyer un document personnel avant d'avoir vérifié qu'il ne s'agit pas d'une escroquerie. L'article [filigrane sur vos documents](/blog/filigrane-documents-dossier-location) explique comment protéger ce que vous envoyez.

## Quelles garanties ajouter si le bailleur ne regarde que les revenus ? {#garanties}
Le garant reste la réponse la plus simple : un proche dont les revenus couvrent le loyer. À 30 ans ou moins, la garantie Visale est ouverte quel que soit votre statut, sous conditions ; à partir de 31 ans, elle vise le salarié du secteur privé. Un bailleur particulier assuré contre les impayés ne peut vous demander une caution que si vous êtes étudiant ou apprenti.

Les autres voies, dont la caution d'organisme, sont comparées dans le guide [louer sans garant](/guides/louer-sans-garant). Proposer de payer plusieurs mois d'avance est encadré : l'article [loyer d'avance](/blog/loyer-d-avance-combien-de-mois) dit ce que la loi permet.

## Comment présenter votre situation dans le message ? {#message}
Dès la première phrase, avec la pièce qui la prouve : « En reconversion, je vis de revenus de placements déclarés, visibles sur mon dernier avis d'imposition, et un ami se porte garant. » Le bailleur comprend en une ligne pourquoi vos bulletins de salaire sont faibles et ce qui les remplace. Sans cette phrase, votre dossier risque d'être écarté avant d'être lu.

L'outil [quel salaire pour un loyer](/outils/quel-salaire-pour-un-loyer) vous donne le revenu mensuel que les bailleurs attendent pour le loyer visé.
`,
});
