import { article } from "@/lib/blog-format";

const SP_PIECES = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169";
const T_PIECES = "Service-public.gouv.fr · Futur locataire d'un logement privé : justificatifs à donner au propriétaire";
const SP_DISCRI = "https://www.service-public.gouv.fr/particuliers/vosdroits/F14750";
const T_DISCRI = "Service-public.gouv.fr · Discrimination à la location d'un logement";
const SP_CONGE = "https://www.service-public.gouv.fr/particuliers/vosdroits/F929";
const T_CONGE = "Service-public.gouv.fr · Préavis et formalités du congé donné par le propriétaire (bailleur)";

export default article({
  slug: "louer-appartement-retraite",
  titre: "Louer un appartement à la retraite, après 70 ans",
  titreSeo: "Louer un appartement à la retraite, après 70 ans",
  description:
    "L'âge est un critère interdit et votre pension compte comme revenu. Pourquoi certains bailleurs hésitent quand même, et le dossier qui les rassure.",
  chapeau:
    "On peut louer à 75 ans : l'âge est l'un des critères qu'un bailleur n'a pas le droit de retenir, et votre pension figure dans la liste officielle des justificatifs de ressources. Certains propriétaires hésitent pour une autre raison : un locataire de plus de 65 ans aux revenus modestes est protégé contre le congé. Un dossier complet y répond.",
  publieLe: "2026-11-04",
  pilier: "B",
  format: "question",
  guidePilier: "/guides/refus-de-dossier",
  guidesLies: ["/guides/dossier-de-location", "/guides/garant-caution"],
  outilLie: "/outils/dossier-de-location",
  statut: "publie",
  requete: "âgée de 75 ans cherche un appartement en location",
  faits: [
    {
      fait: "L'âge est un critère interdit pour choisir un locataire",
      valeur: "âge",
      source: SP_DISCRI,
      titreSource: T_DISCRI,
      releveLe: "2026-11-04",
      citation: "Mœurs Orientation sexuelle Identité de genre Âge Opinions politiques Activités syndicales",
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
      fait: "Captures d'écran et copies de mails peuvent prouver une discrimination",
      valeur: "captures d'écran, copies de mails, attestations de témoins",
      source: SP_DISCRI,
      titreSource: T_DISCRI,
      releveLe: "2026-11-04",
      citation: "Captures d'écran (SMS, images envoyées par messages, etc.) Copie de mails",
    },
    {
      fait: "Le Défenseur des droits se saisit gratuitement, par téléphone ou en ligne",
      valeur: "saisine gratuite, par téléphone ou en ligne",
      source: SP_DISCRI,
      titreSource: T_DISCRI,
      releveLe: "2026-11-04",
      citation: "vous pouvez saisir gratuitement le Défenseur des droits par téléphone ou en ligne",
    },
    {
      fait: "Les retraites et pensions des 3 derniers mois font partie des justificatifs de ressources",
      valeur: "justificatif de versement des retraites et pensions des 3 derniers mois",
      source: SP_PIECES,
      titreSource: T_PIECES,
      releveLe: "2026-11-04",
      citation: "Justificatif de versement des indemnités, retraites, pensions, prestations sociales et familiales et allocations perçues lors des 3 derniers mois",
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
      fait: "Le titre de propriété d'un bien ou l'avis de taxe foncière fait partie des justificatifs de ressources",
      valeur: "titre de propriété, avis de taxe foncière",
      source: SP_PIECES,
      titreSource: T_PIECES,
      releveLe: "2026-11-04",
      citation: "Titre de propriété d'un bien immobilier ou dernier avis de taxe foncière",
    },
    {
      fait: "Justificatif de domicile : les 3 dernières quittances, ou une attestation du précédent propriétaire",
      valeur: "3 dernières quittances de loyer",
      source: SP_PIECES,
      titreSource: T_PIECES,
      releveLe: "2026-11-04",
      citation: "3 dernières quittances de loyer ou, si nécessaire, une attestation du précédent propriétaire",
    },
    {
      fait: "Le locataire de plus de 65 ans à l'échéance du bail, aux revenus sous un plafond, est protégé",
      valeur: "plus de 65 ans à l'échéance du bail, revenus inférieurs à un plafond",
      source: SP_CONGE,
      titreSource: T_CONGE,
      releveLe: "2026-11-04",
      citation: "Locataire de plus de 65 ans à la date d'échéance du bail Pour être protégé, le locataire doit avoir des revenus inférieurs à certains montants",
    },
    {
      fait: "Le bail d'un locataire protégé se renouvelle automatiquement",
      valeur: "renouvellement automatique",
      source: SP_CONGE,
      titreSource: T_CONGE,
      releveLe: "2026-11-04",
      citation: "Lorsque le locataire est protégé, le bail se renouvelle automatiquement à l'échéance du bail",
    },
    {
      fait: "Le propriétaire qui propose un relogement à proximité pendant le préavis échappe à cette protection",
      valeur: "solution de relogement à proximité",
      source: SP_CONGE,
      titreSource: T_CONGE,
      releveLe: "2026-11-04",
      citation: "Il propose au locataire, pendant la durée du préavis, une solution de relogement située à proximité du logement du locataire",
    },
    {
      fait: "La protection ne joue pas non plus si le propriétaire a plus de 65 ans ou des revenus sous les mêmes plafonds",
      valeur: "propriétaire de plus de 65 ans ou aux revenus sous les mêmes montants",
      source: SP_CONGE,
      titreSource: T_CONGE,
      releveLe: "2026-11-04",
      citation: "Ses revenus (à la date où le locataire prend possession de la lettre de congé) sont inférieurs à ces mêmes montants",
    },
    {
      fait: "À partir de 31 ans, Visale vise le travailleur saisonnier et le salarié du secteur privé",
      valeur: "travailleur saisonnier, salarié du secteur privé",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F33453",
      titreSource: "Service-public.gouv.fr · Garantie Visale : caution pour le locataire",
      releveLe: "2026-11-04",
      citation: "Locataire de 31 ans et plus Travailleur saisonnier Tableau - Garantie Visale : conditions pour le locataire travailleur saisonnier",
    },
  ],
  corps: `
## Un propriétaire peut-il refuser un locataire à cause de son âge ? {#age}
Non. Service-public range l'âge parmi les critères interdits pour choisir un locataire, comme l'état de santé ou la perte d'autonomie. Le bailleur doit se fonder sur des critères objectifs, par exemple votre situation financière. Un refus motivé par votre âge est une discrimination que vous pouvez signaler, gratuitement, au Défenseur des droits, par téléphone ou en ligne.

Ce motif est rarement écrit en toutes lettres. Gardez les messages échangés : service-public cite les captures d'écran, les copies de mails et les attestations de témoins parmi les preuves utiles. Le guide du [refus de dossier](/guides/refus-de-dossier) détaille les recours.

## Quels justificatifs fournir quand on est retraité ? {#pieces}
Pour les ressources, la liste officielle prévoit le justificatif de versement des retraites et pensions des trois derniers mois, établi par l'organisme payeur, et votre dernier ou avant-dernier avis d'imposition. Les attestations de paiement de votre caisse de retraite de base et de votre complémentaire suffisent. Si vous possédez un bien, son titre de propriété ou l'avis de taxe foncière entre aussi dans la liste.

Les pièces de situation professionnelle (contrat de travail, extrait K bis, carte d'étudiant) ne vous concernent pas : votre pension tient lieu de revenu. Pour le domicile, vos trois dernières quittances de loyer montrent que vous payez à l'heure. La liste complète est dans le guide du [dossier de location](/guides/dossier-de-location).

## Pourquoi certains propriétaires hésitent-ils devant un locataire âgé ? {#protection}
Souvent à cause du congé. En location vide, un locataire de plus de 65 ans à l'échéance du bail, dont les revenus restent sous un plafond, est protégé : son bail se renouvelle automatiquement, sauf si le propriétaire lui propose un relogement à proximité pendant le préavis. Certains bailleurs préfèrent éviter cette situation, ce qui reste un refus fondé sur l'âge.

La protection a ses propres exceptions : elle ne joue pas non plus quand le propriétaire a lui-même plus de 65 ans ou des revenus sous les mêmes plafonds. Elle intervient au moment du congé, jamais à la signature. Les plafonds de revenus, par ville et par nombre de personnes, sont sur la fiche de service-public consacrée au congé du bailleur.

## Faut-il un garant quand on est retraité ? {#garant}
Pas forcément : une pension versée chaque mois est un revenu stable, qui ne dépend ni d'un contrat ni d'un employeur. Si le bailleur tient à une caution, un proche peut se porter garant avec ses propres justificatifs. La garantie Visale, elle, ne vise à partir de 31 ans que le travailleur saisonnier et le salarié du secteur privé, ce qui exclut un retraité.

Les règles de la caution, et ce que le garant signe, sont dans le guide [garant et caution](/guides/garant-caution).

## Comment rassurer un propriétaire dans votre message ? {#message}
Annoncez d'emblée ce qui le rassure : votre pension, sa régularité, et depuis quand vous louez votre logement actuel sans incident. Par exemple : « Retraitée, je perçois chaque mois deux pensions, et je suis locataire au même endroit depuis douze ans. » Proposez de joindre vos quittances : une longue suite de loyers payés à l'heure parle mieux qu'une promesse.

Le [modèle de message de candidature](/outils/message-de-candidature) vous aide à tenir tout cela en trois lignes.
`,
});
