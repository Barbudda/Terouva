// Vague 9, ligne 13. Requête relevée à l'autocomplétion. Apport : le moment exact où l'obligation se vérifie,
// les exceptions et les deux voies du bailleur. Sans comparatif, sans prix, sans assureur nommé. Le 10 % cité est
// la majoration légale, pas un tarif.

import { article } from "@/lib/blog-format";

const F1349 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1349";
const T1349 = "Service-public.gouv.fr · Obligation du locataire : assurance habitation couvrant les risques locatifs";
const ANIL = "https://www.anil.org/parole-expert-logement-assurance-habitation-obligatoire/";
const TANIL = "ANIL · L'assurance habitation est-elle obligatoire ?";
const F14128 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F14128";
const T14128 = "Service-public.gouv.fr · Je déménage en France";

export default article({
  slug: "assurance-habitation-locataire",
  titre: "Assurance habitation du locataire : obligatoire dès quand ?",
  titreSeo: "Assurance habitation du locataire : dès quand ?",
  description:
    "Obligatoire dès la remise des clés, en vide comme en meublé : les exceptions, ce qu'elle doit couvrir et ce que risque le locataire sans attestation.",
  chapeau:
    "L'assurance contre les risques locatifs est obligatoire pour un locataire, en vide comme en meublé et en bail mobilité. Vous devez fournir l'attestation à la remise des clés, puis chaque année sur demande. Sans elle, le propriétaire peut demander la résiliation du bail ou vous assurer lui-même, à vos frais. La location saisonnière suit d'autres règles.",
  publieLe: "2026-11-06",
  pilier: "D",
  format: "question",
  guidePilier: "/guides/etat-des-lieux",
  guidesLies: ["/guides/dossier-de-location"],
  statut: "publie",
  requete: "assurance habitation locataire obligatoire",
  faits: [
    {
      fait: "Obligation du locataire",
      valeur: "obligation de souscrire un contrat d'assurance habitation",
      source: F1349,
      titreSource: T1349,
      releveLe: "2026-11-05",
      citation: "Le locataire a l'obligation de souscrire un contrat d'assurance habitation couvrant au minimum les risques locatifs",
    },
    {
      fait: "Le bailleur veille à l'assurance du locataire",
      valeur: "il n'a pas l'obligation de s'assurer, mais doit veiller à ce que le locataire le soit",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "il doit veiller à ce que le locataire en dispose.",
    },
    {
      fait: "L'attestation est annexée au bail",
      valeur: "attestation d'assurance parmi les annexes",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2066",
      titreSource: "Service-public.gouv.fr · Bail d'habitation : documents remis par le propriétaire (bailleur)",
      releveLe: "2026-11-05",
      citation: "assurance contre les risques locatifs que le locataire a",
    },
    {
      fait: "Vide, meublé, bail mobilité",
      valeur: "vide ou meublé, bail mobilité compris",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "Elle est obligatoire pour un locataire d'un logement vide ou meublé (y compris un bail mobilité ).",
    },
    {
      fait: "Moment de l'attestation",
      valeur: "à la remise des clés",
      source: F1349,
      titreSource: T1349,
      releveLe: "2026-11-05",
      citation: "Lorsque le propriétaire (ou l'agence immobilière) vous remet les clefs du logement",
    },
    {
      fait: "Attestation annuelle",
      valeur: "une fois par an, à la demande du propriétaire",
      source: F1349,
      titreSource: T1349,
      releveLe: "2026-11-05",
      citation: "Une fois par an, à la demande du propriétaire (ou de l'agence immobilière).",
    },
    {
      fait: "Exception : location saisonnière",
      valeur: "pas d'obligation pour les locataires saisonniers",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "Les locataires de logements saisonniers ne sont pas obligés de souscrire à une assurance habitation.",
    },
    {
      fait: "Meublé de tourisme",
      valeur: "règles différentes",
      source: F1349,
      titreSource: T1349,
      releveLe: "2026-11-05",
      citation: "Les règles sont différentes en cas de location",
    },
    {
      fait: "Colocation",
      valeur: "règles selon le type de colocation",
      source: F14128,
      titreSource: T14128,
      releveLe: "2026-11-05",
      citation: "dépendent du type de la colocation (avec un seul ou avec plusieurs contrat de location)",
    },
    {
      fait: "Seule garantie obligatoire",
      valeur: "risques locatifs : incendie, explosion, dégât des eaux",
      source: F1349,
      titreSource: T1349,
      releveLe: "2026-11-05",
      citation: "seule la garantie des risques locatifs est obligatoire.",
    },
    {
      fait: "Voisins non couverts",
      valeur: "garantie recours des voisins et des tiers facultative",
      source: F1349,
      titreSource: T1349,
      releveLe: "2026-11-05",
      citation: "Elle ne couvre pas les dommages qui pourraient être causés aux voisins",
    },
    {
      fait: "Biens personnels non couverts",
      valeur: "multirisques habitation facultative",
      source: F1349,
      titreSource: T1349,
      releveLe: "2026-11-05",
      citation: "La garantie des risques locatifs ne couvre pas non plus vos biens personnels",
    },
    {
      fait: "Sans assurance : ce que risque le locataire face aux victimes",
      valeur: "indemniser lui-même les victimes, bail résilié",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "À défaut d'assurance, le locataire s'expose à devoir indemniser lui-même les victimes d'un sinistre et peut voir son bail résilié.",
    },
    {
      fait: "Les deux voies du propriétaire",
      valeur: "résilier le bail ou prendre une assurance pour le compte du locataire",
      source: F1349,
      titreSource: T1349,
      releveLe: "2026-11-05",
      citation: "peut choisir, soit de résilier votre bail, soit de prendre une assurance risques locatifs pour votre compte.",
    },
    {
      fait: "Clause résolutoire : commandement",
      valeur: "1 mois après le commandement",
      source: F1349,
      titreSource: T1349,
      releveLe: "2026-11-05",
      citation: "Après avoir reçu le commandement, vous avez 1 mois pour prendre une assurance risques locatifs.",
    },
    {
      fait: "Assurance pour compte : délai",
      valeur: "1 mois après le courrier recommandé",
      source: F1349,
      titreSource: T1349,
      releveLe: "2026-11-05",
      citation: "Après ce délai d'un mois, si vous n'avez pris d'assurance, le propriétaire peut en prendre une pour votre compte.",
    },
    {
      fait: "Assurance pour compte : majoration",
      valeur: "majoration d'au maximum 10 %",
      source: F1349,
      titreSource: T1349,
      releveLe: "2026-11-05",
      citation: "que le propriétaire (ou l'agence immobilière) peut augmenter d'au maximum 10 % .",
    },
    {
      fait: "Assurance pour compte : remboursement mensuel",
      valeur: "un douzième à chaque loyer",
      source: F1349,
      titreSource: T1349,
      releveLe: "2026-11-05",
      citation: "Le montant total à rembourser doit être inscrit sur l'avis d'échéance et sur la quittance de loyer",
    },
    {
      fait: "Le courrier ferme la voie de la résiliation",
      valeur: "plus de résiliation pour absence d'assurance après ce courrier",
      source: F1349,
      titreSource: T1349,
      releveLe: "2026-11-05",
      citation: "il ne peut plus demander la résiliation du bail pour absence d'assurance",
    },
    {
      fait: "Mettre fin à l'assurance pour compte",
      valeur: "remettre sa propre attestation",
      source: F1349,
      titreSource: T1349,
      releveLe: "2026-11-05",
      citation: "Pour cela, vous devez prendre une assurance",
    },
  ],
  corps: `
## L'assurance habitation est-elle obligatoire pour un locataire ? {#obligation}
Oui : un locataire doit souscrire un contrat couvrant au minimum les risques locatifs, c'est-à-dire l'incendie, le dégât des eaux et l'explosion. L'ANIL précise que l'obligation vaut pour un logement vide comme pour un meublé, bail mobilité compris. Un étudiant locataire avec un bail d'habitation suit la même règle que les autres, sans régime à part.

Le propriétaire n'a pas à l'assurer pour vous, mais il doit veiller à ce que vous le soyez, d'après l'ANIL. Il ne prend une assurance à votre place que dans un cas, décrit plus bas, quand vous ne fournissez rien.

## À partir de quand devez-vous être assuré ? {#quand}
Vous devez fournir l'attestation au moment où le propriétaire ou l'agence vous remet les clés, puis une fois par an s'il vous la demande. Souscrivez donc avant le rendez-vous, avec une date d'effet au plus tard ce jour-là. L'attestation fait partie des annexes du bail, avec le dossier de diagnostics et l'état des lieux.

Le contrat vise un logement précis : préparez son adresse et votre date d'entrée. Si vous entrez avant la date prévue au bail, l'article sur l'[entrée anticipée](/blog/entrer-dans-le-logement-avant-la-date-du-bail) explique comment éviter une période sans couverture. Le jour venu, l'attestation se remet avec l'[état des lieux d'entrée](/guides/etat-des-lieux). Si vous déménagez, résiliez aussi le contrat de l'ancien logement.

## Qui n'est pas obligé de s'assurer ? {#exceptions}
Les locataires de logements saisonniers ne sont pas obligés de souscrire une assurance habitation, indique l'ANIL, et Service-public signale des règles différentes pour un meublé de tourisme. Ces exceptions visent des séjours de vacances. Dès que le logement est loué avec un bail d'habitation ou un bail mobilité, l'obligation s'applique, y compris pour une courte durée.

En colocation, la règle dépend du type de contrat : un seul bail pour tous ou un bail par personne. L'article sur la [colocation](/blog/colocation-bail-unique-ou-individuel) présente ces deux formes. Vérifiez avec l'assureur que tous les noms utiles figurent au contrat.

## Que doit couvrir l'assurance au minimum ? {#couverture}
Seule la garantie des risques locatifs est obligatoire. Elle couvre les dommages causés au logement loué par un incendie, une explosion ou un dégât des eaux. Elle ne couvre ni vos biens personnels, ni les dommages causés aux voisins si le sinistre s'étend. Ces deux protections sont facultatives et s'ajoutent par des garanties complémentaires.

Regardez deux choses sur votre attestation : le nom du locataire et l'adresse exacte du logement. Avant de choisir une formule minimale, pensez à ce que vous auriez à payer sans couverture. L'ANIL rappelle qu'un locataire sans assurance s'expose à indemniser lui-même les victimes d'un sinistre. Le contrat multirisques habitation réunit garantie obligatoire et garanties facultatives : c'est à vous de voir ce qui correspond à votre situation.

## Que peut faire le propriétaire sans attestation ? {#sans-attestation}
Il a deux possibilités : demander la résiliation du bail, ou prendre une assurance pour votre compte. Avec une clause résolutoire ou un courrier annonçant cette assurance, vous disposez d'un mois pour réagir. Sans clause résolutoire dans le bail, il peut vous assigner directement devant le juge, avec ou sans mise en demeure préalable.

Voici comment cela se passe dans chaque cas :

- **Résiliation avec clause résolutoire** : un commissaire de justice vous remet un commandement. Vous avez 1 mois pour vous assurer. Passé ce délai, le propriétaire peut saisir le juge pour faire constater la résiliation et demander l'expulsion.
- **Assurance pour votre compte** : il vous prévient par courrier recommandé avec avis de réception. Après 1 mois sans assurance de votre part, il peut souscrire. Il ne peut alors plus demander la résiliation du bail pour absence d'assurance.
- **Ce que vous remboursez** : la prime, qu'il peut majorer d'au maximum 10 %, par douzièmes avec le loyer. Le montant figure sur l'avis d'échéance et sur la quittance.

Vous pouvez mettre fin à ce dispositif à tout moment en prenant votre propre assurance et en lui remettant l'attestation. Il doit alors résilier la sienne le plus vite possible, et vous lui remboursez la part de prime due jusqu'à cette résiliation.
`,
});
