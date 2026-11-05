// Vague 9, ligne 14. Requête relevée à l'autocomplétion. Apport : le calendrier de l'aide et le budget à prévoir
// pour les premiers mois, sans « astuce » (garde-fou de la vague). F12006 parle du mois DE LA DEMANDE.
// Non affirmé après relecture : un allocataire qui passe directement d'un logement à l'autre semble servi sans interruption
// (extrait Caf vu en recherche, page non lisible par script) : non affirmé, l'article renvoie à la Caf.

import { article } from "@/lib/blog-format";

const F12006 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F12006";
const T12006 = "Service-public.gouv.fr · Aide personnalisée au logement (APL)";

export default article({
  slug: "apl-premier-mois",
  titre: "APL : pourquoi le premier mois n'est pas versé",
  titreSeo: "APL : pourquoi le premier mois n'est pas versé",
  description:
    "L'APL est due à partir du mois qui suit votre demande, et payée le 5 du mois suivant. Le calendrier, quand faire la demande et le budget à prévoir.",
  chapeau:
    "L'APL est due à partir du 1er jour qui suit le mois de votre demande, et elle est payée le 5 de chaque mois. Si vous emménagez le 15 octobre, vos droits s'ouvrent en novembre et le premier versement arrive le 5 décembre. Déposez votre demande dès l'entrée et prévoyez de payer seul les premiers loyers.",
  publieLe: "2026-11-06",
  pilier: "D",
  format: "question",
  guidePilier: "/guides/depot-de-garantie",
  guidesLies: ["/guides/dossier-de-location"],
  statut: "publie",
  requete: "apl premier mois",
  faits: [
    {
      fait: "Date à laquelle l'APL est due",
      valeur: "1er jour qui suit le mois de la demande",
      source: F12006,
      titreSource: T12006,
      releveLe: "2026-11-05",
      citation: "Non. L'APL est due à partir du 1er jour qui suit le mois de votre demande.",
    },
    {
      fait: "Date de paiement",
      valeur: "tous les 5 du mois",
      source: F12006,
      titreSource: T12006,
      releveLe: "2026-11-05",
      citation: "Le paiement a lieu quant à lui tous les 5 du mois.",
    },
    {
      fait: "Exemple officiel",
      valeur: "emménagement le 15 octobre, droits en novembre, 1er versement le 5 décembre",
      source: F12006,
      titreSource: T12006,
      releveLe: "2026-11-05",
      citation: "Par exemple, vous emménagez le 15 octobre, l'ouverture des droits se fera en novembre et le 1 er versement aura lieu le 5 décembre.",
    },
    {
      fait: "Délai moyen de traitement",
      valeur: "36,5 jours pour un dossier complet",
      source: F12006,
      titreSource: T12006,
      releveLe: "2026-11-05",
      citation: "le délai moyen de traitement de votre demande est de 36,5 jours (soit environ 1,2 mois).",
    },
    {
      fait: "Versement au bailleur",
      valeur: "en règle générale versée au bailleur, qui la déduit du loyer",
      source: F12006,
      titreSource: T12006,
      releveLe: "2026-11-05",
      citation: "Le bailleur déduit l'APL du montant de votre loyer.",
    },
    {
      fait: "Résidence principale",
      valeur: "uniquement pour la résidence principale, au minimum 8 mois par an",
      source: F12006,
      titreSource: T12006,
      releveLe: "2026-11-05",
      citation: "L'APL est attribuée uniquement pour votre résidence principale, c'est-à-dire celle que vous occupez au minimum 8 mois par an (sauf exceptions).",
    },
    {
      fait: "Déménagement : nouvelle demande",
      valeur: "nouvelle demande pour le nouveau logement",
      source: F12006,
      titreSource: T12006,
      releveLe: "2026-11-05",
      citation: "En cas de déménagement, vous devez faire une nouvelle demande d'APL pour votre nouveau logement.",
    },
    {
      fait: "Compte Caf",
      valeur: "création d'un compte obligatoire pour un non-allocataire",
      source: F12006,
      titreSource: T12006,
      releveLe: "2026-11-05",
      citation: "Vous devez vous créer un compte Caf.",
    },
    {
      fait: "Suivi du dossier",
      valeur: "suivi depuis le compte en ligne",
      source: F12006,
      titreSource: T12006,
      releveLe: "2026-11-05",
      citation: "Le suivi de votre demande d'APL se fait directement à partir de votre compte en ligne",
    },
    {
      fait: "Colocation",
      valeur: "chaque colocataire peut toucher l'APL s'il figure au bail",
      source: F12006,
      titreSource: T12006,
      releveLe: "2026-11-05",
      citation: "Chaque colocataire peut toucher l'APL. Chacun doit avoir son nom sur le bail",
    },
  ],
  corps: `
## Pourquoi l'APL n'est-elle pas versée le premier mois ? {#pourquoi}
Parce que l'APL n'est due qu'à partir du 1er jour qui suit le mois de votre demande : le mois où vous la déposez ne donne droit à aucune aide. Ce décalage ne dépend ni de votre Caf ni de votre propriétaire. Il concerne le calendrier de l'aide, et il ne signale aucun problème dans votre dossier.

Le montant se calcule à part, selon vos ressources, votre loyer et les personnes à votre charge. Une demande acceptée ne change donc rien à ce premier mois. Si votre bailleur refuse l'aide, le sujet est différent : voyez l'article sur le [propriétaire qui refuse l'APL](/blog/proprietaire-refuse-apl).

## Quand arrive le premier versement de l'APL ? {#versement}
Le paiement a lieu le 5 de chaque mois, pour le mois écoulé dans l'exemple de Service-public. Vous emménagez le 15 octobre : l'ouverture des droits se fait en novembre et le 1er versement a lieu le 5 décembre. Il s'écoule donc environ sept semaines entre votre arrivée et le premier euro d'aide.

Pour un dossier complet, le délai moyen de traitement est de 36,5 jours, et vous suivez son état depuis votre compte en ligne (en attente, en cours, traité). Le premier versement peut donc arriver plus tard que dans l'exemple si le dossier est incomplet. Répondez vite si la Caf vous demande une pièce.

## Quand faire sa demande d'APL pour ne pas perdre un mois ? {#demande}
Dès votre entrée dans le logement, et dans tous les cas avant la fin du mois d'emménagement. La règle compte le mois de la demande : pour une entrée en octobre, une demande déposée en novembre fait démarrer l'aide en décembre. Chaque mois de retard repousse d'autant le début de l'aide.

Préparez avant l'entrée ce que la demande réclame : le bail signé, le montant du loyer et, si vous n'êtes pas encore allocataire, un compte Caf, dont la création est obligatoire. La demande se fait en ligne. Le logement doit être votre résidence principale, occupée au minimum 8 mois par an, sauf exceptions.

En colocation, chacun peut toucher l'APL s'il a son nom sur le bail et fait sa propre demande. Si vous déménagez d'un logement déjà aidé, il faut une nouvelle demande pour le nouveau logement : demandez à votre Caf, avant de partir, à quelle date l'aide reprendra dans votre cas.

## Quel budget prévoir pour les premiers mois sans APL ? {#budget}
Comptez le loyer entier, sans déduction, jusqu'au premier versement. Dans l'exemple d'une entrée le 15 octobre, vous payez la fin du mois d'octobre et le loyer de novembre sans aide. S'y ajoutent le dépôt de garantie, l'assurance, l'ouverture de vos contrats et le déménagement. Calculez cette somme avant de signer.

Une liste pour ne rien oublier au moment de faire vos comptes :

- **Le premier loyer** : souvent calculé au prorata si vous arrivez en cours de mois, comme l'explique l'article sur le [premier loyer au prorata](/blog/premier-loyer-prorata).
- **Le loyer du mois suivant**, sans aide.
- **Le [dépôt de garantie](/guides/depot-de-garantie)**, à verser à l'entrée.
- **Les frais d'installation** : assurance, électricité, meubles. L'article sur [le jour de la remise des clés](/blog/nouveau-locataire-que-faire) les met en ordre.

## Que faire du loyer une fois l'APL versée ? {#loyer}
L'APL est, en règle générale, versée directement à votre bailleur, qui la déduit de votre loyer. Ne retirez donc pas vous-même une estimation de votre virement avant le premier versement : vous seriez en impayé sur la différence. Attendez que la Caf ait confirmé le montant, et accordez-vous avec le propriétaire sur le loyer restant à payer.

Demandez-lui par écrit comment il compte imputer le premier versement, qui arrive après le loyer du mois concerné. Vous éviterez un malentendu, et la quittance vous servira à vérifier que l'aide a bien été déduite.
`,
});
