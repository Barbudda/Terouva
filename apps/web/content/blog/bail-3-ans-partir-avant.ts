// Vague 9, ligne 21. Requête relevée à l'autocomplétion et sur forum : « bail 3 ans peut on partir avant ».
// Apport : les trois ans engagent le bailleur, pas le locataire, et ce qui reste dû se limite au préavis.
// Zone tendue : renvoi au guide, aucune ville ; aucun lien vers le modèle de lettre (brouillon).

import { article } from "@/lib/blog-format";

const F1165 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1165";
const T1165 = "Service-public.gouv.fr · Bail d'habitation : quelles différences entre logement vide et logement meublé ?";
const F32360 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F32360";
const T32360 = "Service-public.gouv.fr · Comment calculer le délai de préavis en cas de congé donné par le locataire ?";
const F920 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F920";
const T920 = "Service-public.gouv.fr · Rédaction du bail d'habitation (contrat de location)";
const RESIL = "https://www.anil.org/parole-expert-logement-location/parole-expert-logement-location-resiliation-bail/";
const TRESIL = "ANIL · Comment résilier le bail de sa location ?";

export default article({
  slug: "bail-3-ans-partir-avant",
  titre: "Bail de 3 ans : êtes-vous engagé pour trois ans ?",
  titreSeo: "Bail de 3 ans : peut-on partir avant la fin ?",
  description:
    "Non : vous pouvez partir à tout moment avec un préavis de 3 mois, parfois 1 mois. Les trois ans engagent surtout le propriétaire. Ce qui reste à payer.",
  chapeau:
    "Non. Un bail vide de 3 ans ne vous retient pas : vous pouvez partir à tout moment, en donnant congé et en respectant un préavis de 3 mois, ou de 1 mois dans certains cas. La durée engage surtout le propriétaire, qui ne peut donner congé qu'à l'échéance, pour un motif autorisé. Vous payez jusqu'à la fin du préavis.",
  publieLe: "2026-11-06",
  pilier: "D",
  format: "question",
  guidePilier: "/guides/preavis-location",
  guidesLies: ["/guides/depot-de-garantie"],
  statut: "publie",
  requete: "bail 3 ans peut on partir avant",
  faits: [
    {
      fait: "Le locataire peut partir à tout moment",
      valeur: "à tout moment, avec congé et préavis",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1168",
      titreSource: "Service-public.gouv.fr · Préavis et formalités du congé donné par le locataire (bail d'habitation)",
      releveLe: "2026-11-05",
      citation: "En tant que locataire, vous pouvez à tout moment quitter définitivement le logement que vous utilisez comme résidence principale",
    },
    {
      fait: "Préavis du locataire en logement vide",
      valeur: "3 mois, 1 mois dans certains cas",
      source: F1165,
      titreSource: T1165,
      releveLe: "2026-11-05",
      citation: "Congé à donner avec un délai de préavis de 3 mois (1 mois si cas particulier)",
    },
    {
      fait: "Durée minimale du bail vide",
      valeur: "3 ans (particulier), 6 ans (personne morale)",
      source: "https://www.anil.org/parole-expert-logement-location-bail-meublee-vide/",
      titreSource: "ANIL · Location : quelles sont les différences entre un bail meublé et non meublé ?",
      releveLe: "2026-11-05",
      citation: "de trois ans si le propriétaire est un particulier, de six ans si le propriétaire est une personne morale",
    },
    {
      fait: "Le propriétaire ne donne congé qu'à l'échéance",
      valeur: "à l'échéance et pour un motif autorisé",
      source: F1165,
      titreSource: T1165,
      releveLe: "2026-11-05",
      citation: "À l'échéance du bail et pour un des motifs autorisés (reprise pour habiter, reprise pour vendre, ou motif légitime et sérieux)",
    },
    {
      fait: "Préavis du propriétaire",
      valeur: "au moins 6 mois",
      source: F1165,
      titreSource: T1165,
      releveLe: "2026-11-05",
      citation: "Congé à donner avec un délai de préavis d'au moins 6 mois",
    },
    {
      fait: "Bail plus court par exception",
      valeur: "au minimum 1 an, pour raisons familiales ou professionnelles",
      source: F920,
      titreSource: T920,
      releveLe: "2026-11-05",
      citation: "la durée peut être inférieure à 3 ans (ou 6 ans), mais d'au minimum 1 an",
    },
    {
      fait: "Forme du congé",
      valeur: "recommandé avec avis de réception, commissaire de justice ou remise en main propre",
      source: RESIL,
      titreSource: TRESIL,
      releveLe: "2026-11-05",
      citation: "vous devez adresser un courrier en recommandé avec demande d'avis de réception à votre propriétaire",
    },
    {
      fait: "Remise en main propre",
      valeur: "contre émargement ou récépissé",
      source: RESIL,
      titreSource: TRESIL,
      releveLe: "2026-11-05",
      citation: "Vous pouvez également le remettre en main propre à votre bailleur contre émargement ou récépissé.",
    },
    {
      fait: "Loyer et charges pendant le préavis",
      valeur: "dus pendant toute la période du préavis",
      source: F32360,
      titreSource: T32360,
      releveLe: "2026-11-05",
      citation: "Vous devez payer les loyers et charges locatives durant toute la période de votre préavis",
    },
    {
      fait: "Exception du nouveau locataire",
      valeur: "un autre locataire installé avant la fin du préavis",
      source: F32360,
      titreSource: T32360,
      releveLe: "2026-11-05",
      citation:
        "signe un nouveau bail avec un autre locataire et que celui-ci habite le logement avant la fin de votre préavis",
    },
    {
      fait: "Dernier mois au prorata",
      valeur: "proportionnel au nombre de jours",
      source: F32360,
      titreSource: T32360,
      releveLe: "2026-11-05",
      citation: "Si votre préavis prend fin en cours de mois, le montant du loyer et des charges que vous devez pour ce dernier mois est proportionnel au nombre de jours",
    },
    {
      fait: "Clés rendues avant la fin du préavis",
      valeur: "préavis réduit si nouveau locataire accepté ou lourds travaux",
      source: F32360,
      titreSource: T32360,
      releveLe: "2026-11-05",
      citation: "si le propriétaire accepte un nouveau locataire ou s'il fait de lourds travaux de rénovation",
    },
    {
      fait: "Impayé et résiliation",
      valeur: "le bail risque d'être résilié en cas de loyer impayé",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F31699",
      titreSource: "Service-public.gouv.fr · Bail d'habitation : travaux à la charge du propriétaire (bailleur)",
      releveLe: "2026-11-05",
      citation: "Vous devez respecter l'obligation de payer le loyer sinon votre bail risque d'être résilié.",
    },
    {
      fait: "Le dépôt de garantie ne paie pas les derniers loyers",
      valeur: "pas de déduction sur les derniers loyers",
      source: F32360,
      titreSource: T32360,
      releveLe: "2026-11-05",
      citation: "Vous ne pouvez pas déduire de vos derniers loyers le montant du dépôt de garantie que vous avez versé",
    },
    {
      fait: "Régularisation des charges après le départ",
      valeur: "calcul définitif après la régularisation annuelle",
      source: F32360,
      titreSource: T32360,
      releveLe: "2026-11-05",
      citation: "ne pourra être fait qu'après la régularisation annuelle des charges",
    },
    {
      fait: "Fin de bail sans congé",
      valeur: "bail renouvelé ou reconduit automatiquement",
      source: F920,
      titreSource: T920,
      releveLe: "2026-11-05",
      citation: "À la fin du bail, et en l'absence de préavis (congé) donné par le propriétaire ou le locataire",
    },
    {
      fait: "Renouvellement sur proposition",
      valeur: "renouvelé sur proposition du propriétaire",
      source: F920,
      titreSource: T920,
      releveLe: "2026-11-05",
      citation: "Soit renouvelé sur proposition du propriétaire",
    },
    {
      fait: "Périodes successives",
      valeur: "le bailleur met fin au bail au terme de chaque période de 3 ou 6 ans",
      source: "https://www.anil.org/votre-besoin/louer/type-de-location/location-vide/fin-du-bail/",
      titreSource: "ANIL · Fin du bail en location vide",
      releveLe: "2026-11-05",
      citation: "Le bailleur peut mettre fin au bail à son échéance (au terme de chaque période de 3 ou 6 ans), sous certaines conditions.",
    },
  ],
  corps: `
## Peut-on partir avant la fin d'un bail de 3 ans ? {#partir}
Oui, à tout moment. En tant que locataire, vous pouvez quitter définitivement le logement quand vous le voulez, à condition de donner congé et de respecter un préavis. Vous n'attendez ni la fin des trois ans, ni un anniversaire du bail. Le préavis est de 3 mois en logement vide, et de 1 mois dans certains cas.

Une date de fin écrite dans le bail impressionne, et c'est pour cela que la question revient si souvent. Cette date ne vous oblige pas à rester jusque-là. Le [guide du préavis](/guides/preavis-location) reprend la règle et les erreurs à éviter.

Si vous venez tout juste de signer et que vous voulez déjà renoncer, voyez plutôt notre article sur le fait de [se rétracter après la signature du bail](/blog/se-retracter-apres-signature-bail).

## À quoi sert alors la durée de 3 ans ? {#duree}
Elle vous protège. Le bail vide dure au moins 3 ans si le propriétaire est un particulier, 6 ans si c'est une personne morale. Pendant cette période, le propriétaire ne peut pas vous donner congé : il le fait seulement à l'échéance, pour reprendre le logement, le vendre ou pour un motif légitime et sérieux.

Il doit en plus vous prévenir au moins 6 mois à l'avance. Vous gardez donc la liberté de partir, tandis que lui reste tenu jusqu'à l'échéance. Cette protection suppose que vous respectiez le bail : un loyer impayé, par exemple, peut conduire à sa résiliation.

Il existe une exception à lire dans votre bail : la durée peut descendre à 1 an au minimum si le propriétaire prévoit de reprendre le logement pour des raisons familiales ou professionnelles, et si ce motif y est écrit. Votre liberté de partir ne change pas pour autant.

## Quel préavis respecter pour partir avant la fin du bail ? {#preavis}
Trois mois en principe. Le préavis passe à un mois si le logement est en zone tendue ou si vous êtes dans une situation prévue par la loi, comme certains changements d'emploi ou de santé. Il faut alors le dire dans votre lettre de congé et, selon le cas, joindre un justificatif.

La liste des communes en zone tendue évolue : vérifiez la vôtre au moment d'écrire, avec les explications de la [section sur la zone tendue](/guides/preavis-location#zone-tendue) du guide.

Envoyez le congé en recommandé avec demande d'avis de réception, faites-le signifier par un commissaire de justice, ou remettez-le en main propre contre émargement ou récépissé. Le préavis se calcule à partir de la réception : prévoyez donc un peu de marge avant votre déménagement.

## Que reste-t-il à payer si vous partez avant la fin des 3 ans ? {#payer}
Le loyer et les charges jusqu'à la fin du préavis, et rien pour les mois qui restaient à courir sur les trois ans. Si un autre locataire signe un nouveau bail et s'installe avant la fin de votre préavis, vous cessez de payer à son arrivée. Si le préavis finit en cours de mois, le dernier mois est calculé au prorata.

Trois points à garder en tête :

- Rendre les clés plus tôt ne suffit pas : le préavis ne se réduit que si le propriétaire accepte un nouveau locataire ou s'il fait de lourds travaux de rénovation.
- Vous ne pouvez pas déduire le dépôt de garantie de vos derniers loyers.
- Le calcul définitif des charges payées par provision se fait après la régularisation annuelle : un solde peut arriver après votre départ. Gardez votre nouvelle adresse à jour auprès du propriétaire.

## Que se passe-t-il au bout des 3 ans si personne ne donne congé ? {#reconduction}
Le bail continue. À la fin du bail, sans congé du propriétaire ni du locataire, il est soit renouvelé sur proposition du propriétaire, soit reconduit automatiquement, sans que vous ayez rien à signer dans ce second cas. Le bailleur retrouve la possibilité de donner congé au terme de chaque période de 3 ou 6 ans.

Pour vous, rien ne change : pendant la reconduction aussi, vous pouvez partir à tout moment avec le même préavis. En meublé, les durées sont plus courtes : voyez notre comparaison [meublé ou vide](/blog/meuble-ou-vide-locataire).
`,
});
