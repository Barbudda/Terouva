// Vague 9, ligne 12. Requête relevée à l'autocomplétion. Apport : l'ordre du premier jour, compteurs et contrat
// d'énergie avant tout. Aucun fournisseur ni assureur nommé, aucun prix (garde-fou de la vague).

import { article } from "@/lib/blog-format";

const F31270 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F31270";
const T31270 = "Service-public.gouv.fr · État des lieux d'entrée dans un bail d'habitation";
const F14128 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F14128";
const T14128 = "Service-public.gouv.fr · Je déménage en France";
const F1349 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1349";
const T1349 = "Service-public.gouv.fr · Obligation du locataire : assurance habitation couvrant les risques locatifs";
const F947 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F947";
const T947 = "Service-public.gouv.fr · Charges à payer par le locataire";
const F2066 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F2066";
const T2066 = "Service-public.gouv.fr · Bail d'habitation : documents remis par le propriétaire (bailleur)";
const F12006 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F12006";
const T12006 = "Service-public.gouv.fr · Aide personnalisée au logement (APL)";
const EI = "https://www.energie-info.fr/fiche_pratique/je-demenage-jemmenage-les-demarches-pour-lelectricite-et-le-gaz-naturel/";
const TEI = "Énergie-info (médiateur national de l'énergie) · Je déménage, j'emménage";
const EIR = "https://www.energie-info.fr/fiche_pratique/releve-compteur-calcul-consommation/";
const TEIR = "Énergie-info (médiateur national de l'énergie) · Relevé des compteurs et calcul de la consommation";
const ANIL = "https://anil.org/parole-expert-logement-location-etat-lieux-entree";
const TANIL = "ANIL · Qu'est-ce que l'état des lieux d'entrée ?";

export default article({
  slug: "nouveau-locataire-que-faire",
  titre: "Nouveau locataire : que faire le jour de la remise des clés ?",
  titreSeo: "Nouveau locataire : que faire le jour des clés ?",
  description:
    "L'ordre du premier jour : attestation d'assurance, état des lieux, clés, compteurs, électricité et eau, puis votre nouvelle adresse et l'APL.",
  chapeau:
    "Le jour des clés, remettez votre attestation d'assurance, faites l'état des lieux, comptez les clés et relevez les compteurs. Transmettez ensuite les index à votre fournisseur d'énergie : sans contrat à votre nom, le courant peut être coupé sans préavis. Dans les jours qui suivent, déclarez votre nouvelle adresse et demandez l'APL si vous y avez droit.",
  publieLe: "2026-11-06",
  pilier: "D",
  format: "cas-pratique",
  guidePilier: "/guides/etat-des-lieux",
  guidesLies: ["/guides/depot-de-garantie"],
  statut: "publie",
  requete: "nouveau locataire que faire",
  faits: [
    {
      fait: "Attestation à la remise des clés",
      valeur: "attestation à fournir à la remise des clés",
      source: F1349,
      titreSource: T1349,
      releveLe: "2026-11-05",
      citation: "Lorsque le propriétaire (ou l'agence immobilière) vous remet les clefs du logement",
    },
    {
      fait: "Les clés sont remises à l'état des lieux",
      valeur: "clés remises au moment de l'état des lieux d'entrée",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "Le propriétaire doit remettre les clés au locataire au moment de l'état des lieux d'entrée.",
    },
    {
      fait: "Les clés figurent à l'état des lieux",
      valeur: "clés ou autre moyen d'accès",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "Clés ou tout autre moyen d'accès aux locaux à usage privatif ou commun",
    },
    {
      fait: "Compteurs à l'état des lieux",
      valeur: "relevés des compteurs individuels, sauf charges au forfait",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "S'il y a lieu, relevés des compteurs individuels de consommation d'eau ou d'énergie",
    },
    {
      fait: "Compteurs non branchés",
      valeur: "précision à ajouter à l'état des lieux",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "le fait que les compteurs d'eau, de gaz ou d'électricité ne sont pas branchés.",
    },
    {
      fait: "Relevé le jour de l'emménagement",
      valeur: "relever le compteur et transmettre les index",
      source: EI,
      titreSource: TEI,
      releveLe: "2026-11-05",
      citation: "Le jour du déménagement, je relève le(s) compteur(s) de mon ancien ET de mon nouveau logement.",
    },
    {
      fait: "Compteur communicant",
      valeur: "index transmis tous les mois au fournisseur",
      source: EIR,
      titreSource: TEIR,
      releveLe: "2026-11-05",
      citation: "les index réels de consommation sont transmis tous les mois à mon fournisseur",
    },
    {
      fait: "Le locataire ouvre son propre abonnement",
      valeur: "chaque locataire souscrit un abonnement",
      source: F947,
      titreSource: T947,
      releveLe: "2026-11-05",
      citation: "chaque locataire doit souscrire un abonnement auprès d'une entreprise distributrice",
    },
    {
      fait: "Prévenir le fournisseur à l'avance",
      valeur: "au moins 15 jours avant d'emménager",
      source: EI,
      titreSource: TEI,
      releveLe: "2026-11-05",
      citation: "au moins 15 jours avant d'emménager , je prends contact avec le fournisseur d'électricité / de gaz de mon choix pour souscrire un contrat.",
    },
    {
      fait: "Sans contrat, l'énergie peut être coupée",
      valeur: "coupure possible à tout moment, sans préavis",
      source: EI,
      titreSource: TEI,
      releveLe: "2026-11-05",
      citation: "l'énergie peut être coupée à tout moment, sans préavis, dès lors que je ne suis pas titulaire d'un contrat pour ce logement.",
    },
    {
      fait: "Délai de mise en service",
      valeur: "5 jours ouvrables en règle générale",
      source: EI,
      titreSource: TEI,
      releveLe: "2026-11-05",
      citation: "En règle générale, un délai de mise en service de 5 jours ouvrables est nécessaire",
    },
    {
      fait: "Mise en service express",
      valeur: "sous deux jours, avec des frais possibles",
      source: EI,
      titreSource: TEI,
      releveLe: "2026-11-05",
      citation: "sous deux jours, des frais pourront m'être facturés.",
    },
    {
      fait: "Eau : prévenir le service des eaux",
      valeur: "informer les services des eaux et opérateurs",
      source: F14128,
      titreSource: T14128,
      releveLe: "2026-11-05",
      citation: "J'informe les entreprises qui gèrent mes comptes ou abonnements, passés ou à venir : services des eaux, opérateurs de téléphonie, télévision, internet .",
    },
    {
      fait: "Eau en contrat collectif",
      valeur: "facture d'eau transmise une fois par an",
      source: F2066,
      titreSource: T2066,
      releveLe: "2026-11-05",
      citation: "Si le contrat de fourniture d'eau n'est pas individualisé",
    },
    {
      fait: "Déclaration unique du changement d'adresse",
      valeur: "déclaration en ligne en une seule opération",
      source: F14128,
      titreSource: T14128,
      releveLe: "2026-11-05",
      citation: "Je peux déclarer en ligne et en une seule opération , mon changement d'adresse à plusieurs organismes",
    },
    {
      fait: "Réexpédition du courrier",
      valeur: "service payant de La Poste",
      source: F14128,
      titreSource: T14128,
      releveLe: "2026-11-05",
      citation: "Je peux faire réexpédier mon courrier en utilisant le service payant de La Poste",
    },
    {
      fait: "Carte grise",
      valeur: "nouvelle adresse à inscrire",
      source: F14128,
      titreSource: T14128,
      releveLe: "2026-11-05",
      citation: "Je dois faire inscrire ma nouvelle adresse sur la carte grise .",
    },
    {
      fait: "Nouvelle demande d'APL",
      valeur: "nouvelle demande pour le nouveau logement",
      source: F12006,
      titreSource: T12006,
      releveLe: "2026-11-05",
      citation: "En cas de déménagement, vous devez faire une nouvelle demande d'APL pour votre nouveau logement.",
    },
    {
      fait: "Délai de modification de l'état des lieux",
      valeur: "10 jours calendaires",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "suivant la date de l'état des lieux s'agissant de tout élément concernant le logement.",
    },
  ],
  corps: `
## Que faire en premier le jour de la remise des clés ? {#ordre}
Remettez votre attestation d'assurance, puis faites l'état des lieux avant de déposer le moindre carton : un logement vide se contrôle mieux. Comptez les clés et relevez les compteurs pendant le rendez-vous. Le rendez-vous fini, transmettez les index à votre fournisseur d'énergie et photographiez le logement, pièce par pièce, avant d'y installer vos affaires.

L'ordre qui évite les oublis :

1. **L'attestation d'assurance**, à donner lors de la remise des clés. Le contrat doit donc être signé avant : l'article sur l'[assurance habitation du locataire](/blog/assurance-habitation-locataire) dit ce qu'il doit couvrir.
2. **L'[état des lieux d'entrée](/guides/etat-des-lieux)**, signé, avec votre exemplaire en main. S'il vous manque, l'article sur l'[état des lieux non remis](/blog/etat-des-lieux-entree-non-remis) donne la marche à suivre.
3. **Les clés**, comptées et écrites sur le document : logement, boîte aux lettres, cave, badge.
4. **Les compteurs**, relevés et photographiés.
5. **L'électricité, le gaz et l'eau**, sur lesquels vous agissez dès la sortie du rendez-vous.
6. **Votre nouvelle adresse et l'APL**, dans les jours qui suivent.

Si vous entrez avant la date prévue au bail, lisez d'abord l'article sur l'[entrée anticipée](/blog/entrer-dans-le-logement-avant-la-date-du-bail).

## Comment relever les compteurs quand on emménage ? {#compteurs}
Notez les chiffres de chaque compteur d'électricité, de gaz et d'eau, et prenez-les en photo avec la date. Ces relevés figurent à l'état des lieux quand les charges ne sont pas au forfait. Transmettez ensuite les index à votre fournisseur : ils servent à calculer votre première facture et vous séparent de la consommation de l'occupant précédent.

Un compteur communicant, comme Linky pour l'électricité ou Gazpar pour le gaz, transmet ses index tous les mois au fournisseur. Le relevé du premier jour reste utile, parce que votre photo datée ne dépend de personne. Si un compteur n'est pas branché, faites-le préciser sur l'état des lieux : Service-public cite cet exemple.

## Faut-il ouvrir l'électricité à son nom le jour de l'entrée ? {#electricite}
Oui, et idéalement avant : le médiateur national de l'énergie conseille de contacter le fournisseur de votre choix au moins 15 jours avant d'emménager. Même si le courant fonctionne à votre arrivée, il peut être coupé à tout moment, sans préavis, tant qu'aucun contrat n'est à votre nom. L'abonnement vous revient, quel que soit le bail.

Si l'électricité ou le gaz sont coupés à votre arrivée et que vous n'avez rien souscrit, faites-le tout de suite : la mise en service demande en général 5 jours ouvrables. Une mise en service express sous deux jours existe, et des frais peuvent vous être facturés. Prévoyez une solution pour ces premiers jours si vous vous y prenez tard.

## Qui s'occupe de l'eau quand on arrive ? {#eau}
Cela dépend du logement. En immeuble, l'eau est souvent payée dans les charges, et vous ne faites alors aucune démarche : le propriétaire vous transmet la facture une fois par an si le contrat n'est pas individualisé. Avec un compteur et un contrat à votre nom, prévenez le service des eaux de votre arrivée, en donnant votre relevé.

Le bail et l'annonce vous disent dans quel cas vous êtes. En cas de doute, posez la question le jour de l'état des lieux, puisque le propriétaire ou l'agent connaît le service compétent. La répartition complète est dans l'article sur [ce que paie un locataire en plus du loyer](/blog/taxe-ordures-menageres-locataire).

## Que faire dans les jours qui suivent la remise des clés ? {#adresse}
Déclarez votre nouvelle adresse en ligne, en une seule opération, auprès de plusieurs organismes comme les impôts, l'assurance maladie et la Caf. Demandez ensuite l'APL si vous y avez droit, et relisez l'état des lieux tant que vous pouvez le faire modifier : vous avez 10 jours calendaires à compter de sa date.

Le reste de la liste, à faire dans la semaine :

- **L'APL** : en cas de déménagement, il faut une nouvelle demande pour le nouveau logement. La date de la demande compte, comme l'explique l'article sur le [premier mois d'APL](/blog/apl-premier-mois).
- **Le courrier** : La Poste propose un service payant de réexpédition.
- **Internet et téléphone** : prévenez vos opérateurs de votre changement d'adresse.
- **La carte grise** : vous devez y faire inscrire votre nouvelle adresse.
- **La banque, l'employeur et les assurances** : donnez-leur votre nouvelle adresse.

Rangez le bail, l'état des lieux, vos photos et vos relevés au même endroit. Vous en aurez besoin à la sortie, pour le [dépôt de garantie](/guides/depot-de-garantie).
`,
});
