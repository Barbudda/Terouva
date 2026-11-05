// Vague 9, ligne 10. Requête relevée à l'autocomplétion et sur forum. Apport : le cas de l'exemplaire non
// remis, que le guide ne traite pas : le délai de 10 jours court quand même, et l'obstacle à la remise prive
// son auteur de la présomption. Légifrance refuse les robots : les deux citations de l'article 3-2 ont été
// confrontées au texte consolidé, dans sa version en vigueur depuis le 29 juillet 2023, le 2026-11-06.

import { article } from "@/lib/blog-format";

const F31270 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F31270";
const T31270 = "Service-public.gouv.fr · État des lieux d'entrée dans un bail d'habitation";
const ANIL = "https://anil.org/parole-expert-logement-location-etat-lieux-entree";
const TANIL = "ANIL · Qu'est-ce que l'état des lieux d'entrée ?";
const ART32 = "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000047900049";
const TART32 = "Légifrance · Loi n° 89-462 du 6 juillet 1989, article 3-2";

export default article({
  slug: "etat-des-lieux-entree-non-remis",
  titre: "État des lieux d'entrée non remis ou non signé : que faire ?",
  titreSeo: "État des lieux d'entrée non remis : que faire ?",
  description:
    "Votre exemplaire doit vous être remis à la signature. Comment le réclamer, le délai qui court entre-temps et ce que change l'absence de remise.",
  chapeau:
    "Votre exemplaire doit vous être remis au moment de la signature, en main propre ou par voie électronique. S'il manque, réclamez-le aussitôt par écrit : le délai de 10 jours calendaires pour le faire modifier court depuis la date de l'état des lieux. La partie qui fait obstacle à la remise ne peut pas invoquer la présomption de bon état.",
  publieLe: "2026-11-06",
  pilier: "D",
  format: "cas-pratique",
  guidePilier: "/guides/etat-des-lieux",
  guidesLies: ["/guides/depot-de-garantie"],
  statut: "publie",
  requete: "état des lieux d'entrée non remis au locataire",
  faits: [
    {
      fait: "Remise au moment de la signature",
      valeur: "remis au locataire et au propriétaire à la signature",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "Au moment de sa signature, l'état des lieux est remis au locataire et au propriétaire (ou à l'agence immobilière).",
    },
    {
      fait: "Forme de la remise",
      valeur: "en main propre ou par voie dématérialisée",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "Il est remis en main propre ou par voie dématérialisée.",
    },
    {
      fait: "Deux exemplaires signés",
      valeur: "un exemplaire pour chacun, signature des deux parties",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "Les deux parties doivent signer le document pour qu'il ait une valeur.",
    },
    {
      fait: "L'état des lieux est obligatoire",
      valeur: "constat obligatoire, joint au contrat de location",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "L'état des lieux est un constat obligatoire. Il doit être joint au contrat de location.",
    },
    {
      fait: "Document unique pour l'entrée et la sortie",
      valeur: "document unique ou documents distincts",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "Soit sur un document unique, comportant pour chaque pièce du logement une colonne",
    },
    {
      fait: "Délai pour modifier l'état des lieux d'entrée",
      valeur: "10 jours calendaires suivant la date de l'état des lieux",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "suivant la date de l'état des lieux s'agissant de tout élément concernant le logement.",
    },
    {
      fait: "Chauffage : délai à part",
      valeur: "premier mois de la période de chauffe",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "Il peut également en faire la demande durant 1 er mois de la période de chauffe",
    },
    {
      fait: "Refus de modifier : commission de conciliation",
      valeur: "saisine de la commission départementale de conciliation",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "le locataire peut saisir la commission départementale de conciliation dont dépend le logement.",
    },
    {
      fait: "Refus de signer : commissaire de justice",
      valeur: "constat locatif, prévenu au moins 7 jours à l'avance",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "par lettre recommandée avec accusé de réception, et au moins 7 jours à l'avance, du jour où il va réaliser le constat locatif .",
    },
    {
      fait: "Frais du constat",
      valeur: "partagés pour moitié",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "Le total des sommes demandées par le commissaire de justice est partagé pour moitié entre le locataire et le propriétaire",
    },
    {
      fait: "Présomption de l'article 1731 du Code civil",
      valeur: "présomption de réception en bon état en l'absence d'état des lieux",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "Code civil : article 1731 Présomption de réception des lieux en bon état",
    },
    {
      fait: "Contenu de la présomption",
      valeur: "bon état de réparations locatives, sauf preuve du mauvais état initial",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "Il devra le rendre en bon état de réparations locatives, sauf s'il peut prouver le mauvais état initial du logement.",
    },
    {
      fait: "L'article 3-2 vise aussi la remise de l'exemplaire",
      valeur: "absence d'état des lieux ou de remise d'un exemplaire",
      source: ART32,
      titreSource: TART32,
      releveLe: "2026-11-06",
      citation: "A défaut d'état des lieux ou de la remise d'un exemplaire de l'état des lieux à l'une des parties",
    },
    {
      fait: "La partie qui fait obstacle perd la présomption",
      valeur: "présomption non invocable par la partie qui a fait obstacle",
      source: ART32,
      titreSource: TART32,
      releveLe: "2026-11-06",
      citation: "la présomption établie par l'article 1731 du code civil ne peut être invoquée par celle des parties qui a fait obstacle",
    },
    {
      fait: "Propriétaire qui persiste malgré une mise en demeure",
      valeur: "il doit prouver avoir donné le logement en bon état d'usage",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "il devra prouver en fin de bail avoir donné le logement en bon état d'usage pour faire valoir les dégradations causées par le locataire",
    },
    {
      fait: "Mise en demeure",
      valeur: "le locataire doit adresser une mise en demeure en cas de refus",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "le locataire doit lui adresser une mise en demeure",
    },
    {
      fait: "Photos recommandées",
      valeur: "preuves visuelles recommandées",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "Il est recommandé de compléter l'état des lieux avec des preuves visuelles, comme des photos ou des croquis",
    },
  ],
  corps: `
## Quand devez-vous recevoir votre exemplaire de l'état des lieux ? {#remise}
Au moment de la signature : l'état des lieux est remis au locataire et au propriétaire, ou à l'agence, en main propre ou par voie dématérialisée. Une agence qui promet de vous l'envoyer plus tard ne suit donc pas la règle. Demandez une copie sur place, ou prenez chaque page en photo avant de partir.

Quand le document est rempli sur une tablette, vérifiez que vous avez bien reçu le fichier avant de quitter le logement, et ouvrez-le. Si l'entrée et la sortie figurent sur un document unique, avec une colonne pour chacune, ce qui est permis, votre copie de la partie entrée reste votre preuve : ne comptez pas sur l'original que garde le propriétaire pour la retrouver à la sortie.

## Comment réclamer un état des lieux d'entrée non remis ? {#reclamer}
Écrivez le jour même, ou le lendemain, en donnant la date de l'état des lieux et en demandant votre exemplaire signé. Un courriel suffit d'abord. Sans réponse après quelques jours, envoyez une lettre recommandée avec accusé de réception. Pendant ce temps, faites vos propres photos : elles serviront si le document n'arrive jamais.

Voici l'ordre à suivre, chaque étape laissant une trace datée :

1. Le courriel de demande, avec la date du rendez-vous et le nom de la personne présente.
2. Vos photos de chaque pièce et des compteurs, prises le plus tôt possible. L'ANIL recommande ces preuves visuelles, et elles vous aideront à relire le document quand vous le recevrez.
3. Une lettre recommandée, reprise du modèle plus bas, si rien n'arrive.
4. Une demande à la commission départementale de conciliation si le blocage continue, ou un conseil auprès de l'ADIL de votre département.

## Le délai de 10 jours court-il si vous n'avez pas votre exemplaire ? {#dix-jours}
Comptez que oui : les 10 jours calendaires partent de la date de l'état des lieux, et la règle ne prévoit pas de report si votre exemplaire arrive en retard. Joignez donc vos réserves à votre réclamation, dans ce délai, même sans le document. Pour le chauffage, la demande reste possible pendant le premier mois de la période de chauffe.

Écrivez simplement ce que vous avez constaté : « Sous réserve du document que je n'ai pas reçu, je signale une fissure au plafond de la chambre et un robinet qui fuit. » Si le propriétaire refuse ensuite de modifier le document, vous pouvez saisir la commission départementale de conciliation. Le [guide de l'état des lieux](/guides/etat-des-lieux#corriger) détaille ces dix jours.

## Que change l'absence de remise à la sortie ? {#presomption}
Sans état des lieux, le locataire est présumé avoir reçu le logement en bon état de réparations locatives, sauf preuve contraire : c'est la présomption de l'article 1731 du Code civil. Mais l'article 3-2 de la loi de 1989 vise aussi l'exemplaire non remis : la partie qui a fait obstacle ne peut pas invoquer cette présomption.

C'est là que vos écrits comptent. Une agence qui ne répond pas à trois relances datées fait difficilement croire que vous avez négligé le document. Sans ces traces, rien ne montre qui a bloqué la remise, et la présomption risque de jouer contre vous à la sortie, au moment où le propriétaire regardera le [dépôt de garantie](/guides/depot-de-garantie).

Quand un propriétaire refuse de faire l'état des lieux lui-même, la fiche officielle prévoit une mise en demeure : s'il persiste, il devra prouver en fin de bail vous avoir remis le logement en bon état d'usage pour faire valoir des dégradations. Le cas d'un état des lieux qui n'a jamais eu lieu est traité dans le [guide](/guides/etat-des-lieux#absence).

## Que faire si l'état des lieux n'est pas signé ? {#non-signe}
Demandez la signature manquante par écrit, car l'ANIL précise que les deux parties doivent signer pour que le document ait une valeur. Si le propriétaire ou l'agence refuse de signer, l'un ou l'autre peut faire appel à un commissaire de justice, qui prévient chacun au moins 7 jours à l'avance. Les frais du constat sont partagés pour moitié.

Si c'est vous qui hésitez à signer, ne refusez pas tout le document : écrivez vos réserves dessus, puis signez. Un locataire qui refuse l'état des lieux est considéré comme ayant reçu le logement en bon état de réparations locatives, sauf s'il prouve son mauvais état initial. L'article sur le [logement sale à l'entrée](/blog/logement-sale-entree-dans-les-lieux) donne des exemples de réserves précises.

## Un modèle de lettre pour réclamer votre exemplaire {#modele}
Cette base n'a rien d'officiel : adaptez-la, puis envoyez-la en recommandé avec accusé de réception.

*Madame, Monsieur,*

*L'état des lieux d'entrée du logement situé (adresse) a été réalisé le (date) en présence de (nom). Je n'ai pas reçu mon exemplaire signé, alors qu'il doit être remis au locataire au moment de la signature.*

*Je vous demande de me le transmettre sous huit jours, en main propre ou par courriel à l'adresse (adresse). Je vous signale dès à présent les points suivants, à ajouter à ce document : (liste précise, pièce par pièce).*

*Veuillez agréer, Madame, Monsieur, mes salutations distinguées.*

Gardez une copie de la lettre, l'accusé de réception et vos photos avec votre bail, jusqu'à la restitution du dépôt de garantie.
`,
});
