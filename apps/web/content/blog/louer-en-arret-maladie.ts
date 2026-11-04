import { article } from "@/lib/blog-format";

const SP_PIECES = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169";
const T_PIECES = "Service-public.gouv.fr · Futur locataire d'un logement privé : justificatifs à donner au propriétaire";
const SP_DISCRI = "https://www.service-public.gouv.fr/particuliers/vosdroits/F14750";
const T_DISCRI = "Service-public.gouv.fr · Discrimination à la location d'un logement";
const SP_VISALE = "https://www.service-public.gouv.fr/particuliers/vosdroits/F33453";
const T_VISALE = "Service-public.gouv.fr · Garantie Visale : caution pour le locataire";

export default article({
  slug: "louer-en-arret-maladie",
  titre: "Louer en arrêt maladie ou en invalidité : le dossier et vos droits",
  titreSeo: "Louer en arrêt maladie ou en invalidité",
  description:
    "En arrêt maladie ou en invalidité, vos indemnités et votre pension comptent comme revenus. Les pièces à montrer, ce qu'on ne peut pas vous demander.",
  chapeau:
    "Être en arrêt maladie ou en invalidité ne vous interdit pas de louer : l'état de santé fait partie des critères qu'un bailleur n'a pas le droit de retenir. Vos indemnités journalières ou votre pension d'invalidité entrent dans la liste officielle des justificatifs de ressources. Montrez-les avec l'attestation de l'organisme payeur, puis ajoutez une garantie.",
  publieLe: "2026-11-04",
  pilier: "B",
  format: "question",
  guidePilier: "/guides/dossier-de-location",
  guidesLies: ["/guides/refus-de-dossier", "/guides/garantie-visale", "/guides/louer-sans-garant"],
  outilLie: "/outils/dossier-de-location",
  statut: "publie",
  requete: "louer en étant en arrêt maladie",
  faits: [
    {
      fait: "L'état de santé, la perte d'autonomie et le handicap sont des critères interdits pour choisir un locataire",
      valeur: "état de santé, perte d'autonomie, handicap",
      source: SP_DISCRI,
      titreSource: T_DISCRI,
      releveLe: "2026-11-04",
      citation: "Nom Lieu de résidence État de santé Perte d'autonomie Handicap Caractéristiques génétiques",
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
      fait: "La carte Vitale et les relevés de compte bancaire ne peuvent pas être demandés au candidat",
      valeur: "carte Vitale, relevés de compte bancaire",
      source: "https://www.cnil.fr/fr/location-dun-bien-immobilier-quels-justificatifs",
      titreSource: "CNIL · Location d'un bien immobilier : quels justificatifs peut-on demander aux candidats ?",
      releveLe: "2026-11-04",
      citation: "la copie du livret de famille, la carte Vitale, les relevés de compte bancaire, un contrat de mariage ou un jugement de divorce",
    },
    {
      fait: "Les indemnités, pensions et allocations des 3 derniers mois font partie des justificatifs de ressources",
      valeur: "justificatif de versement des indemnités, pensions et allocations des 3 derniers mois",
      source: SP_PIECES,
      titreSource: T_PIECES,
      releveLe: "2026-11-04",
      citation: "Justificatif de versement des indemnités, retraites, pensions, prestations sociales et familiales et allocations perçues lors des 3 derniers mois",
    },
    {
      fait: "Le contrat de travail fait partie des justificatifs de situation professionnelle",
      valeur: "contrat de travail",
      source: SP_PIECES,
      titreSource: T_PIECES,
      releveLe: "2026-11-04",
      citation: "Contrat de travail ou de stage, ou, si nécessaire, attestation de l'employeur précisant l'emploi et la rémunération proposée",
    },
    {
      fait: "Visale compte les indemnités journalières parmi les ressources prises en compte",
      valeur: "indemnités journalières",
      source: SP_VISALE,
      titreSource: T_VISALE,
      releveLe: "2026-11-04",
      citation: "Revenus professionnels Allocations chômage Indemnités journalières RSA Allocation logement Allocations familiales",
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
      fait: "À partir de 31 ans avec un contrat en cours : demande dans les 6 mois après l'embauche, ou salaire net plafonné",
      valeur: "6 mois après l'embauche, ou salaire net mensuel de 1710 € maximum",
      source: SP_VISALE,
      titreSource: T_VISALE,
      releveLe: "2026-11-04",
      citation: "avoir un salaire net mensuel de 1710 € maximum",
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
## Un propriétaire peut-il refuser un candidat en arrêt maladie ? {#refus}
Il ne peut pas vous écarter à cause de votre état de santé : service-public le range parmi les critères interdits pour choisir un locataire, avec le handicap et la perte d'autonomie. Il peut en revanche juger votre situation financière, qui est un critère objectif. C'est donc le montant et la régularité de vos revenus qu'il regarde, pas la raison de votre arrêt.

Vous n'avez pas à dire pourquoi vous êtes arrêté, ni à montrer un document médical. La CNIL cite la carte Vitale parmi les documents qu'on ne peut pas demander à un candidat, avec les relevés de compte bancaire. Si un refus vous semble fondé sur votre santé, le guide du [refus de dossier](/guides/refus-de-dossier) explique comment le signaler.

## Quels justificatifs montrer quand on touche des indemnités journalières ? {#pieces}
La liste officielle des justificatifs de ressources prévoit le justificatif de versement des indemnités, pensions et allocations perçues lors des trois derniers mois, établi par l'organisme payeur. Pour des indemnités journalières, c'est l'attestation de paiement de votre caisse d'assurance maladie ; pour une pension d'invalidité, l'attestation de la caisse qui la verse. Ajoutez votre dernier avis d'imposition.

Si vous êtes toujours salarié pendant l'arrêt, votre contrat de travail reste une pièce de situation professionnelle : il montre que votre poste vous attend. La liste complète est dans le guide du [dossier de location](/guides/dossier-de-location), et la [checklist de dossier](/outils/dossier-de-location) trie les pièces selon votre situation.

## La garantie Visale compte-t-elle les indemnités journalières ? {#visale}
Oui. Service-public cite les indemnités journalières parmi les ressources que Visale prend en compte pour calculer le loyer couvert, à côté des revenus professionnels et des allocations chômage. À 30 ans ou moins, Visale est ouverte quel que soit votre statut, sous conditions. À partir de 31 ans, elle vise le salarié du secteur privé, avec des conditions sur le contrat.

À partir de 31 ans, il faut un contrat de travail en cours et une demande faite dans les 6 mois qui suivent l'embauche, ou un salaire net mensuel de 1710 € maximum. Une personne en invalidité sans contrat de travail n'entre pas, à cet âge, dans les cas que liste service-public. Les plafonds et le simulateur sont dans le guide de la [garantie Visale](/guides/garantie-visale).

## Que peut bloquer l'assurance du propriétaire ? {#assurance}
Un propriétaire assuré contre les loyers impayés suit souvent les conditions de son contrat d'assurance, qui peut fixer les revenus et les situations qu'il accepte. Le dossier coince parfois là, sans que le bailleur ait quoi que ce soit contre vous. S'il est un particulier assuré, il ne peut d'ailleurs vous demander une caution que si vous êtes étudiant ou apprenti.

Avant de relancer, demandez-lui simplement ce que son assureur exige : la réponse vous dit si une autre pièce suffit, ou s'il vaut mieux passer à l'annonce suivante. L'article [assurance loyers impayés et garant](/blog/assurance-loyers-impayes-garant) détaille la règle du cumul.

## Quelles garanties proposer sans Visale ? {#garanties}
Le garant physique, parent ou proche, reste la solution la plus courante : ses propres justificatifs suivent une liste à part, et ses revenus rassurent le bailleur sur la durée. Sans garant, vous pouvez proposer une caution d'organisme, souvent payante, ou viser les bailleurs qui acceptent un dossier sans garantie quand les revenus sont stables et bien montrés.

Le guide [louer sans garant](/guides/louer-sans-garant) compare ces voies et ce qu'elles coûtent.

## Comment présenter votre situation dans le message ? {#message}
En une phrase, sans détail médical : la nature de vos revenus, leur régularité, puis la garantie. Par exemple : « Je perçois une pension d'invalidité versée chaque mois depuis 2023, et ma sœur se porte garante. » Le bailleur voit un revenu régulier et une sécurité, ce qui est tout ce qu'il a le droit de juger dans votre candidature.

Le [modèle de message de candidature](/outils/message-de-candidature) vous aide à le formuler.
`,
});
