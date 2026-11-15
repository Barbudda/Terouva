import { article } from "@/lib/blog-format";

const ART1984 = "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006445236";
const ART1985 = "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006445238";
const F1411 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1411";
const T_F1411 = "Service-public.gouv.fr · Légalisation de signature sur un document établi sous signature privée";

export default article({
  slug: "signer-bail-par-procuration",
  titre: "Signer son bail à distance : procuration ou signature électronique",
  titreSeo: "Signer un bail par procuration ou à distance",
  description:
    "Vous ne pouvez pas être là le jour de la signature ? Le mandat écrit à un proche, la signature électronique, et l'exemplaire que vous devez recevoir.",
  chapeau:
    "Un proche peut signer le bail à votre place si vous lui donnez un mandat, qui peut être une simple lettre signée. Vous restez le locataire, engagé par ce qu'il signe dans les limites du mandat. Une signature électronique vaut aussi, si le procédé vous identifie. Aucune règle n'oblige le propriétaire à accepter l'une ou l'autre.",
  publieLe: "2026-11-15",
  pilier: "D",
  format: "cas-pratique",
  guidePilier: "/guides/repondre-a-une-annonce-de-location",
  guidesLies: ["/guides/dossier-de-location", "/guides/etat-des-lieux"],
  statut: "publie",
  requete: "signature bail par procuration",
  faits: [
    {
      fait: "Le mandat donne à une personne le pouvoir d'agir au nom d'une autre",
      valeur: "pouvoir de faire quelque chose pour le mandant et en son nom",
      source: ART1984,
      titreSource: "Légifrance · Article 1984 du Code civil",
      releveLe: "2026-11-15",
      citation: "Le mandat ou procuration est un acte par lequel une personne donne à une autre le pouvoir de faire quelque chose pour le mandant et en son nom.",
    },
    {
      fait: "Le mandat existe quand le mandataire l'accepte",
      valeur: "formé par l'acceptation du mandataire",
      source: ART1984,
      titreSource: "Légifrance · Article 1984 du Code civil",
      releveLe: "2026-11-15",
      citation: "Le contrat ne se forme que par l'acceptation du mandataire.",
    },
    {
      fait: "Le mandat peut être donné par une simple lettre",
      valeur: "acte authentique, acte sous seing privé, même par lettre",
      source: ART1985,
      titreSource: "Légifrance · Article 1985 du Code civil",
      releveLe: "2026-11-15",
      citation: "Le mandat peut être donné par acte authentique ou par acte sous seing privé, même par lettre.",
    },
    {
      fait: "Le mandataire ne peut pas dépasser son mandat",
      valeur: "rien au-delà de ce que dit le mandat",
      source: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006445247",
      titreSource: "Légifrance · Article 1989 du Code civil",
      releveLe: "2026-11-15",
      citation: "Le mandataire ne peut rien faire au-delà de ce qui est porté dans son mandat",
    },
    {
      fait: "Le mandant est tenu de ce que le mandataire a signé dans les limites du pouvoir donné",
      valeur: "engagé conformément au pouvoir donné, au-delà seulement s'il ratifie",
      source: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006445293",
      titreSource: "Légifrance · Article 1998 du Code civil",
      releveLe: "2026-11-15",
      citation: "Le mandant est tenu d'exécuter les engagements contractés par le mandataire, conformément au pouvoir qui lui a été donné.",
    },
    {
      fait: "L'écrit électronique a la même force que le papier, sous conditions",
      valeur: "même force probante, si l'auteur est identifié et l'intégrité garantie",
      source: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032042461",
      titreSource: "Légifrance · Article 1366 du Code civil",
      releveLe: "2026-11-15",
      citation: "L'écrit électronique a la même force probante que l'écrit sur support papier, sous réserve que puisse être dûment identifiée la personne dont il émane",
    },
    {
      fait: "La signature électronique repose sur un procédé fiable d'identification",
      valeur: "procédé fiable d'identification lié à l'acte",
      source: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032042456",
      titreSource: "Légifrance · Article 1367 du Code civil",
      releveLe: "2026-11-15",
      citation: "Lorsqu'elle est électronique, elle consiste en l'usage d'un procédé fiable d'identification garantissant son lien avec l'acte auquel elle s'attache.",
    },
    {
      fait: "En électronique, chaque partie doit pouvoir disposer d'un exemplaire ou y accéder",
      valeur: "exemplaire sur support durable, ou accès",
      source: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032042416",
      titreSource: "Légifrance · Article 1375 du Code civil",
      releveLe: "2026-11-15",
      citation: "le procédé permet à chaque partie de disposer d'un exemplaire sur support durable ou d'y avoir accès",
    },
    {
      fait: "Le bail est écrit en autant d'exemplaires que de parties",
      valeur: "un exemplaire par partie",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F920",
      titreSource: "Service-public.gouv.fr · Rédaction du bail d'habitation (contrat de location)",
      releveLe: "2026-11-15",
      citation: "le bail doit être fait par écrit en autant d'exemplaires qu'il y a de parties",
    },
    {
      fait: "La légalisation authentifie votre signature sur un acte sous signature privée",
      valeur: "authentifie votre propre signature",
      source: F1411,
      titreSource: T_F1411,
      releveLe: "2026-11-15",
      citation: "sert à authentifier votre propre signature lorsqu'elle est apposée sur un acte sous signature privée",
    },
    {
      fait: "La légalisation est gratuite en mairie",
      valeur: "gratuite en mairie",
      source: F1411,
      titreSource: T_F1411,
      releveLe: "2026-11-15",
      citation: "la démarche est gratuite en mairie",
    },
    {
      fait: "Un propriétaire qui refuse de vous rencontrer est un signe de fausse annonce",
      valeur: "refus catégorique de rencontrer le candidat",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34092",
      titreSource: "Service-public.gouv.fr · Arnaque à la location immobilière",
      releveLe: "2026-11-15",
      citation: "il refuse catégoriquement de vous rencontrer",
    },
    {
      fait: "Aucune somme avant la signature du bail",
      valeur: "aucune somme avant la signature du bail",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169",
      titreSource: "Service-public.gouv.fr · Quels justificatifs le propriétaire peut-il demander au locataire ?",
      releveLe: "2026-11-15",
      citation: "Aucune somme d'argent ne peut être réclamée par le propriétaire avant la signature du bail d'habitation",
    },
  ],
  corps: `
## Un proche peut-il signer le bail à votre place ? {#procuration}
Oui, avec un mandat, aussi appelé procuration : vous donnez à une personne le pouvoir de signer pour vous et en votre nom. Le mandat peut être une simple lettre signée de votre main, et il ne vaut que si la personne accepte la mission. Le bail reste à votre nom : c'est vous le locataire, pas celui qui tient le stylo.

Le cas typique : votre dossier est retenu, le propriétaire veut signer cette semaine et vous êtes à l'autre bout du pays. Avant d'en arriver là, le guide pour [répondre à une annonce de location](/guides/repondre-a-une-annonce-de-location) aide à annoncer tôt que vous ne pourrez pas venir, et l'article [louer sans visiter](/blog/louer-sans-visiter) dit ce qu'il faut avoir vu avant de signer.

## Que doit contenir la procuration ? {#contenu}
Ce que la personne a le droit de signer, et rien de plus large que nécessaire. Le mandataire ne peut rien faire au-delà de ce qui est écrit dans son mandat, et vous êtes tenu de ce qu'il signe dans ces limites. Plus le texte est précis, plus vous êtes protégé.

Une procuration utile tient sur une page :
- votre nom, votre adresse et ceux de la personne que vous chargez de signer ;
- l'adresse du logement, le nom du propriétaire, et le contrat visé (vide, meublé, bail mobilité) ;
- le loyer, les charges et la durée que vous acceptez, pour qu'elle ne signe pas autre chose ;
- ce qu'elle peut faire en plus, ou non : l'état des lieux, la remise des clés ;
- la date et votre signature.

Joindre une copie de votre pièce d'identité aide le propriétaire à vérifier qui signe. S'il doute de votre signature, la légalisation l'authentifie : la démarche est gratuite en mairie. Elle porte en principe sur votre signature, pas sur le contenu du texte.

## La signature électronique d'un bail est-elle valable ? {#signature-electronique}
Oui. L'écrit électronique a la même force que le papier si l'on peut identifier qui l'a signé et si l'acte est conservé sans être modifié. La signature électronique doit reposer sur un procédé fiable d'identification, lié à l'acte signé.

En pratique, le propriétaire ou son agence vous envoie le bail par un service de signature : vous vous identifiez, vous lisez, vous signez. C'est souvent plus simple qu'une procuration, puisque vous signez vous-même. Lisez le bail en entier avant de valider : la signature électronique engage autant qu'un stylo.

## Quel exemplaire devez-vous recevoir ? {#exemplaire}
Le vôtre, signé par tous. Sur papier, le bail est fait en autant d'exemplaires qu'il y a de parties. Signé en ligne, le procédé doit permettre à chacun de disposer d'un exemplaire sur un support durable ou d'y avoir accès. Téléchargez-le et gardez-le : c'est la preuve de vos droits.

Si un proche a signé pour vous, demandez-lui de vous envoyer l'exemplaire et gardez la procuration avec. Et quelle que soit la formule, aucune somme ne peut vous être réclamée avant la signature du bail : ni loyer, ni dépôt, ni frais de réservation.

## Et si le propriétaire veut vous voir en personne ? {#bailleur-refuse}
Aucune règle ne l'oblige à accepter une procuration ou une signature électronique. Il peut préférer signer face à vous. Proposez les deux formules dès qu'il retient votre dossier, avec une date où vous pourrez venir si aucune ne lui convient.

Gardez en tête l'inverse aussi : un propriétaire qui refuse de vous rencontrer et vous presse de signer à distance avant toute visite présente l'un des signes des fausses annonces. Le jour venu, l'état des lieux peut lui aussi se faire par un proche : la marche à suivre est dans l'article sur la [procuration pour l'état des lieux](/blog/procuration-etat-des-lieux). Votre garant, lui, signe son propre acte : voir [signer l'acte de caution à distance](/blog/garant-signer-acte-de-caution-a-distance).
`,
});
