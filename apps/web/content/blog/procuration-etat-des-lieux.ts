// Vague 9, ligne 11. Requête relevée à l'autocomplétion. Apport : pour qui emménage de loin, qui choisir, un
// modèle court, ce que le représentant vérifie, et les dix jours qui restent ensuite.
// Le mot « procuration » n'est pas dans F31270 ; Service-public parle de « personnes mandatées ». Légifrance
// refuse les robots : la citation de l'article 3-2 a été confrontée au texte consolidé le 2026-11-06.

import { article } from "@/lib/blog-format";

const F31270 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F31270";
const T31270 = "Service-public.gouv.fr · État des lieux d'entrée dans un bail d'habitation";
const F1349 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1349";
const T1349 = "Service-public.gouv.fr · Obligation du locataire : assurance habitation couvrant les risques locatifs";
const ART32 = "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000047900049";
const TART32 = "Légifrance · Loi n° 89-462 du 6 juillet 1989, article 3-2";

export default article({
  slug: "procuration-etat-des-lieux",
  titre: "Absent le jour de l'état des lieux d'entrée : la procuration",
  titreSeo: "Procuration pour l'état des lieux d'entrée",
  description:
    "Quelqu'un peut faire l'état des lieux d'entrée à votre place : qui choisir, un modèle de procuration, ce qu'il vérifie et les dix jours qui vous restent.",
  chapeau:
    "Vous pouvez vous faire représenter : l'état des lieux peut être établi par un tiers que vous mandatez, dont le nom et la signature figurent sur le document. Donnez-lui une procuration écrite et prévenez le propriétaire. Une fois sur place, vous gardez 10 jours calendaires après l'état des lieux pour demander une modification.",
  publieLe: "2026-11-06",
  pilier: "D",
  format: "cas-pratique",
  guidePilier: "/guides/etat-des-lieux",
  guidesLies: ["/guides/depot-de-garantie"],
  statut: "publie",
  requete: "procuration état des lieux d'entrée",
  faits: [
    {
      fait: "L'état des lieux peut être établi par un tiers mandaté",
      valeur: "établi par les parties ou par un tiers mandaté par elles",
      source: ART32,
      titreSource: TART32,
      releveLe: "2026-11-04",
      citation: "contradictoirement et amiablement par les parties ou par un tiers mandaté par elles",
    },
    {
      fait: "Le document nomme les personnes mandatées",
      valeur: "nom et domicile des personnes mandatées",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "S'il y a lieu, nom ou dénomination et domicile ou siège social des personnes mandatées pour réaliser l'état des lieux",
    },
    {
      fait: "La personne mandatée signe",
      valeur: "signature des parties ou des personnes mandatées",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "Signature des parties (locataire, propriétaire) ou des personnes mandatées pour réaliser l'état des lieux.",
    },
    {
      fait: "Remise de l'exemplaire",
      valeur: "en main propre ou par voie dématérialisée",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "Il est remis en main propre ou par voie dématérialisée.",
    },
    {
      fait: "Éclairage",
      valeur: "bonnes conditions d'éclairage",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "L'état des lieux doit être fait dans de bonnes conditions d'éclairage.",
    },
    {
      fait: "Contenu : réserves et images",
      valeur: "observations, réserves et images",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "Elle peut être complétée d'observations ou de réserves, et illustrée d'images.",
    },
    {
      fait: "Clés notées à l'état des lieux",
      valeur: "clés ou autre moyen d'accès",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "Clés ou tout autre moyen d'accès aux locaux à usage privatif ou commun",
    },
    {
      fait: "Compteurs",
      valeur: "relevés des compteurs individuels",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "S'il y a lieu, relevés des compteurs individuels de consommation d'eau ou d'énergie",
    },
    {
      fait: "Attestation d'assurance à la remise des clés",
      valeur: "à fournir à la remise des clés",
      source: F1349,
      titreSource: T1349,
      releveLe: "2026-11-05",
      citation: "Lorsque le propriétaire (ou l'agence immobilière) vous remet les clefs du logement",
    },
    {
      fait: "Délai de modification",
      valeur: "10 jours calendaires suivant la date de l'état des lieux",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "suivant la date de l'état des lieux s'agissant de tout élément concernant le logement.",
    },
    {
      fait: "Chauffage",
      valeur: "premier mois de la période de chauffe",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "Il peut également en faire la demande durant 1 er mois de la période de chauffe",
    },
    {
      fait: "Si personne ne vient : commissaire de justice",
      valeur: "constat locatif en cas de refus de venir",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "lorsque le locataire ou le propriétaire (ou son représentant) refuse de venir au rendez-vous",
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
      fait: "Refus de modifier : commission de conciliation",
      valeur: "saisine de la commission départementale de conciliation",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "le locataire peut saisir la commission départementale de conciliation dont dépend le logement.",
    },
  ],
  corps: `
## Peut-on se faire représenter à l'état des lieux d'entrée ? {#tiers}
Oui. La loi de 1989 prévoit que l'état des lieux est établi par les parties ou par un tiers qu'elles mandatent, et Service-public demande d'inscrire sur le document le nom et le domicile des personnes mandatées, qui signent à la place des parties. Votre représentant agit donc pour vous, et sa signature vous engage.

Une procuration écrite vous protège tous les deux : elle montre au propriétaire que la personne a le droit de signer, et elle fixe ce que vous lui demandez. Prévenez le propriétaire ou l'agence quelques jours avant, avec le nom de cette personne, pour éviter qu'on refuse de lui remettre les clés le jour venu. Le [guide de l'état des lieux](/guides/etat-des-lieux#entree) décrit le déroulé habituel du rendez-vous.

## Qui choisir pour vous représenter ? {#qui}
Choisissez une personne de confiance, disponible en journée, qui prendra le temps d'ouvrir chaque robinet et de noter les défauts. Un parent ou un ami proche convient très bien, s'il accepte de ne rien laisser passer. Évitez la personne qui représente déjà le propriétaire, puisqu'elle vérifierait alors son propre travail pour votre compte.

Le plus utile est de la briefer avant : sur place, elle doit oser dire « je note cette tache » devant l'agent. Donnez-lui les photos de l'annonce et ce qui vous a marqué pendant la visite. Si vous avez loué à distance, l'article sur la [location sans visite](/blog/louer-sans-visiter) dit ce qu'il faut demander avant de signer.

## Que doit vérifier votre représentant sur place ? {#verifier}
La même chose que vous : l'état de chaque pièce, les équipements, les clés et les compteurs, de jour ou avec un bon éclairage. Il complète le document par des observations ou des réserves et l'illustre d'images. Avant de partir, il doit recevoir un exemplaire signé, en main propre ou par voie électronique, et vous l'envoyer.

Remettez-lui avant le rendez-vous votre attestation d'assurance, à fournir lors de la remise des clés, et cette liste :

- **Chaque pièce** : sols, murs, plafonds, fenêtres et volets, avec des mots précis et pas seulement « bon état ».
- **Les équipements** : robinets, chasse d'eau, prises, plaques, radiateurs, à tester devant le propriétaire.
- **Les compteurs** : eau, électricité, gaz, relevés et photographiés.
- **Les clés et badges** : leur nombre, écrit sur le document.
- **La vidéo** : un tour complet du logement, envoyé le jour même, vous permet de repérer ce qu'il aurait manqué.

## Un modèle court de procuration {#modele}
Cette base n'a rien d'officiel. Écrivez-la, datez-la, signez-la et joignez-y une copie d'une pièce d'identité si le propriétaire le demande.

*Je soussigné(e) (vos nom et prénom), né(e) le (date), demeurant (adresse actuelle), locataire du logement situé (adresse du logement) selon le bail signé le (date),*

*donne procuration à (nom et prénom), demeurant (adresse),*

*pour me représenter le (date) à l'état des lieux d'entrée de ce logement, y porter toute observation ou réserve, le signer en mon nom, en recevoir un exemplaire et recevoir les clés.*

*Fait à (lieu), le (date). Signature.*

Votre représentant garde l'original sur lui le jour du rendez-vous. Vous gardez une copie avec le bail.

## Que vous reste-t-il à faire une fois sur place ? {#dix-jours}
Relisez l'état des lieux dès votre arrivée : vous pouvez demander de le modifier dans les 10 jours calendaires qui suivent sa date, pour tout élément concernant le logement. Ce délai ne part pas de votre emménagement. Si vous arrivez deux semaines plus tard, il sera déjà passé, sauf pour le chauffage, modifiable pendant le premier mois de la période de chauffe.

Si vous ne pouvez pas venir à temps, demandez à votre représentant de faire ce contrôle à votre place, avec vos photos et vos questions. Envoyez toute demande par écrit. En cas de refus, vous pouvez saisir la commission départementale de conciliation. Si personne ne peut se rendre au rendez-vous, parlez-en au propriétaire pour déplacer la date : le recours au commissaire de justice est prévu pour le refus de venir ou de signer, et ses frais sont partagés pour moitié.
`,
});
