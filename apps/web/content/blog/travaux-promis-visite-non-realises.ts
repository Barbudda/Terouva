// Vague 8, ligne 19. Requête relevée sur forum (CommentÇaMarche) : « propriétaire qui ne fait pas les travaux promis ».
// Apport : la promesse faite à la visite ne vaut que si elle est écrite avant la signature ; le bail ne mentionne que
// les travaux déjà faits ; l'état des lieux garde la trace ; et on continue de payer le loyer pendant la relance.

import { article } from "@/lib/blog-format";

const F920 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F920";
const T920 = "Service-public.gouv.fr · Rédaction du bail d'habitation (contrat de location)";
const F31270 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F31270";
const T31270 = "Service-public.gouv.fr · État des lieux d'entrée dans un bail d'habitation";
const F31699 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F31699";
const T31699 = "Service-public.gouv.fr · Bail d'habitation : travaux à la charge du propriétaire (bailleur)";

export default article({
  slug: "travaux-promis-visite-non-realises",
  titre: "Travaux promis à la visite et jamais faits : que faire ?",
  titreSeo: "Travaux promis à la visite jamais faits",
  description:
    "Une promesse orale se prouve mal : faites écrire les travaux et leur date avant le bail, notez-les à l'état des lieux, puis relancez par écrit.",
  chapeau:
    "Une promesse de travaux faite à la visite n'a de poids que si vous pouvez la prouver. Le bail ne mentionne que les travaux déjà faits : faites donc écrire ceux qu'on vous promet, avec leur date, avant de signer. Notez-les à l'état des lieux, relancez par écrit, et continuez de payer le loyer.",
  publieLe: "2026-11-04",
  pilier: "D",
  format: "cas-pratique",
  guidePilier: "/guides/etat-des-lieux",
  guidesLies: ["/guides/repondre-a-une-annonce-de-location", "/guides/depot-de-garantie"],
  statut: "publie",
  requete: "propriétaire qui ne fait pas les travaux promis",
  faits: [
    {
      fait: "Ce que le bail mentionne sur les travaux",
      valeur: "les travaux effectués depuis le dernier bail, pas ceux qui sont promis",
      source: F920,
      titreSource: T920,
      releveLe: "2026-11-04",
      citation: "Nature et montant des travaux effectués dans le logement depuis le dernier bail (ou le dernier renouvellement)",
    },
    {
      fait: "L'état des lieux peut recevoir des réserves",
      valeur: "observations ou réserves, illustrées d'images",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-04",
      citation: "Elle peut être complétée d'observations ou de réserves, et illustrée d'images.",
    },
    {
      fait: "Délai pour faire modifier l'état des lieux d'entrée",
      valeur: "10 jours calendaires",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-04",
      citation:
        "Le locataire peut demander au propriétaire (ou à son représentant) de modifier l'état des lieux d'entrée dans les 10 jours calendaires",
    },
    {
      fait: "Le propriétaire doit les travaux qui ne sont pas des réparations locatives",
      valeur: "tous les travaux non à la charge du locataire pendant toute la durée du bail",
      source: F31699,
      titreSource: T31699,
      releveLe: "2026-11-04",
      citation:
        "Durant toute la durée du bail, le propriétaire doit faire tous les travaux qui ne sont pas à la charge du locataire",
    },
    {
      fait: "Le loyer reste dû",
      valeur: "le locataire continue à payer le loyer même si les travaux ne sont pas faits",
      source: F31699,
      titreSource: T31699,
      releveLe: "2026-11-04",
      citation:
        "Même si le propriétaire ne fait pas les travaux qu'il doit faire, le locataire doit continuer à payer le loyer.",
    },
    {
      fait: "Mise en demeure par lettre recommandée",
      valeur: "lettre recommandée avec accusé de réception pour mettre en demeure le propriétaire",
      source: F31699,
      titreSource: T31699,
      releveLe: "2026-11-04",
      citation:
        "Si, malgré cet avertissement, le propriétaire ne fait pas le nécessaire, le locataire doit le mettre en demeure d'exécuter ses obligations.",
    },
    {
      fait: "Saisine de la commission de conciliation",
      valeur: "2 mois après la lettre, sans accord ou sans réponse",
      source: F31699,
      titreSource: T31699,
      releveLe: "2026-11-04",
      citation:
        "ou si le propriétaire n'a pas répondu, le locataire peut saisir la commission départementale de conciliation (CDC)",
    },
    {
      fait: "Loyer réduit ou suspendu par le juge (logement non décent)",
      valeur: "le juge peut réduire le loyer ou suspendre son paiement",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2042",
      titreSource: "Service-public.gouv.fr · Logement à louer décent",
      releveLe: "2026-11-04",
      citation: "Il peut réduire le montant du loyer ou suspendre, avec ou sans consignation",
    },
    {
      fait: "Pouvoir du juge",
      valeur: "contraindre le propriétaire à faire les travaux, ou autoriser le locataire à les faire",
      source: F31699,
      titreSource: T31699,
      releveLe: "2026-11-04",
      citation:
        "Si le juge estime que les travaux font partie des obligations du propriétaire, il peut contraindre le propriétaire à faire les travaux.",
    },
  ],
  corps: `
## Une promesse de travaux faite à la visite engage-t-elle le propriétaire ? {#promesse}
Elle n'a de poids que si vous pouvez la prouver. Le bail ne mentionne que les travaux déjà effectués depuis le dernier bail, pas ceux qu'on vous promet. Demandez donc que les travaux promis et leur date figurent par écrit, dans le bail ou un message du propriétaire, avant de signer. Le [guide pour répondre à une annonce](/guides/repondre-a-une-annonce-de-location) donne la marche à suivre pour vos échanges avec le propriétaire.

Exemple : lors d'une visite, le propriétaire dit qu'il repeindra la chambre avant votre arrivée. Sans écrit, vous n'avez que votre souvenir contre le sien. Avec un message qui dit « peinture de la chambre avant le jour de l'état des lieux », vous avez un point d'appui daté.

## Comment faire écrire les travaux avant de signer ? {#ecrire}
Envoyez un message court au propriétaire ou à l'agence, le jour même de la visite : « Pour confirmer ce que nous avons évoqué, les travaux suivants seront faits avant mon entrée : … Pouvez-vous me le confirmer par retour de message ? » Une réponse qui confirme vaut mieux que le silence, et un refus de le noter vous renseigne aussi.

Si le propriétaire accepte, demandez que la liste figure dans le bail ou en annexe, avec une date limite. Ne versez rien tant que cet écrit n'existe pas. Pour le dépôt de garantie, voyez le [guide du dépôt de garantie](/guides/depot-de-garantie).

## Que noter à l'état des lieux si les travaux ne sont pas faits ? {#etat-des-lieux}
Tout ce qui devait être fait et ne l'est pas : mur non repeint, joint non refait, appareil non remplacé. L'état des lieux d'entrée peut être complété d'observations ou de réserves, et illustré d'images. Décrivez l'état réel pièce par pièce, photographiez, et inscrivez la mention « travaux promis, non réalisés » avec ce qu'on vous avait annoncé.

Vous disposez ensuite de 10 jours calendaires après la date de l'état des lieux pour demander au propriétaire de le modifier. Le [guide de l'état des lieux](/guides/etat-des-lieux) détaille cette démarche et ses suites.

## Que faire quand la date est passée et que rien n'est fait ? {#relance}
Écrivez, puis mettez en demeure. Service-public décrit la marche pour les travaux à la charge du propriétaire : un avertissement, puis une lettre recommandée avec accusé de réception. Si, deux mois après, il n'y a pas d'accord ou pas de réponse, vous pouvez saisir la commission départementale de conciliation, puis le juge.

Le juge peut contraindre le propriétaire à faire les travaux. Ce chemin vaut pour les travaux qui incombent au propriétaire, comme l'entretien normal du logement. Pour un simple embellissement promis (peinture, par exemple), c'est la promesse écrite qui compte : l'ADIL de votre département peut vous dire quoi faire selon votre cas.

## Peut-on retenir une partie du loyer en attendant les travaux ? {#loyer}
Non. Service-public le dit sans détour : même si le propriétaire ne fait pas les travaux qu'il doit faire, le locataire doit continuer à payer le loyer. Retenir une somme vous expose à un impayé, avec les conséquences qui vont avec, alors que votre bon droit reste à établir.

Seul le juge peut réduire le loyer ou suspendre son paiement, et Service-public le décrit pour un logement non décent. Gardez vos preuves : messages, photos datées, lettre recommandée. Elles serviront devant la commission de conciliation comme devant le juge.
`,
});
