// Vague 10, lot A, n° 2. Requête relevée à l'autocomplétion, fils Droit-Finances (« quels sont mes droits »,
// « réglementation »). Apport : le contrat que service-public recommande, l'annexe obligatoire quand la cuisine et la
// salle d'eau se partagent, la durée et le dépôt du meublé, l'assurance et l'APL de la chambre. F34635 lue en français.
// Non affirmé : que le titre Ier bis de la loi de 1989 s'applique toujours à la chambre chez le propriétaire (Légifrance
// illisible par script, aucune fiche service-public ne le dit) ; l'article s'en tient à la recommandation de F34635.
// Écartés : la taxe d'habitation et la « durée maximale de 90 jours » des fils, sans source officielle.

import { article } from "@/lib/blog-format";

const F34635 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F34635";
const T34635 = "Service-public.gouv.fr · Je pars de chez mes parents";
const F1165 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1165";
const T1165 = "Service-public.gouv.fr · Bail d'habitation : quelles différences entre logement vide et logement meublé ?";
const F12006 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F12006";
const T12006 = "Service-public.gouv.fr · Aide personnalisée au logement (APL)";

export default article({
  slug: "chambre-chez-l-habitant-locataire",
  titre: "Louer une chambre chez l'habitant : bail, durée, ce que vous pouvez exiger",
  titreSeo: "Chambre chez l'habitant : bail, durée, droits",
  description:
    "Le bail meublé conseillé, l'annexe obligatoire si vous partagez cuisine et salle d'eau, la durée, le dépôt, l'assurance et l'APL de la chambre.",
  chapeau:
    "Pour une chambre chez l'habitant, service-public recommande de signer un bail meublé classique ou un bail mobilité. Le bail devient obligatoire, avec une annexe, si vous partagez la cuisine et la salle d'eau du propriétaire. Un bail meublé dure au moins 1 an, ou 9 mois pour un étudiant, et le dépôt est plafonné à 2 mois de loyer.",
  publieLe: "2026-11-15",
  pilier: "D",
  format: "question",
  guidePilier: "/guides/repondre-a-une-annonce-de-location",
  guidesLies: ["/guides/depot-de-garantie", "/guides/etat-des-lieux"],
  statut: "publie",
  requete: "chambre chez l'habitant",
  faits: [
    {
      fait: "Bail recommandé pour une chambre chez l'habitant",
      valeur: "bail d'habitation classique pour un logement meublé ou bail mobilité, recommandé",
      source: F34635,
      titreSource: T34635,
      releveLe: "2026-11-15",
      citation: "Dans tous les cas, il est recommandé de signer un bail d habitation classique pour un logement meublé ou un bail mobilité",
    },
    {
      fait: "Bail avec annexe obligatoire quand cuisine et sanitaires sont partagés",
      valeur: "bail avec annexe sur les équipements partagés, obligatoire",
      source: F34635,
      titreSource: T34635,
      releveLe: "2026-11-15",
      citation: "il est obligatoire de rédiger un bail avec une annexe indiquant que le propriétaire partage ceux de son logement avec le locataire de la chambre",
    },
    {
      fait: "Caractéristiques minimales de la chambre",
      valeur: "9 m² minimum, une fenêtre, chauffée, un minimum de meubles",
      source: F34635,
      titreSource: T34635,
      releveLe: "2026-11-15",
      citation: "minimum , avoir une fenêtre, être chauffée et contenir un minimum de meubles (literie, table, siège, rangements, luminaires)",
    },
    {
      fait: "Forfait de charges mentionné au contrat",
      valeur: "forfait de charges pour l'électricité, le gaz et l'eau, écrit au contrat",
      source: F34635,
      titreSource: T34635,
      releveLe: "2026-11-15",
      citation: "il lui fait payer un forfait charges pour l'électricité, le gaz et l'eau. Ce forfait doit être mentionné dans le contrat de location.",
    },
    {
      fait: "Assurance : pas obligatoire si le propriétaire a une assurance complète",
      valeur: "pas d'obligation d'assurance si le propriétaire est déjà assuré complètement",
      source: F34635,
      titreSource: T34635,
      releveLe: "2026-11-15",
      citation: "et que le propriétaire a déjà souscrit une assurance complète, je ne suis pas obligé de souscrire de contrat d'assurance",
    },
    {
      fait: "Aide au logement à condition d'avoir signé un bail",
      valeur: "aide de la Caf possible avec un bail signé",
      source: F34635,
      titreSource: T34635,
      releveLe: "2026-11-15",
      citation: "Je peux demander une aide au logement de la Caf à la condition d'avoir bien signé un bail",
    },
    {
      fait: "Trois baux pour une résidence principale",
      valeur: "bail vide, bail meublé, bail mobilité",
      source: F1165,
      titreSource: T1165,
      releveLe: "2026-11-15",
      citation: "le bail d'un logement vide, le bail d'un logement meublé et le bail mobilité",
    },
    {
      fait: "Durée d'un bail meublé",
      valeur: "1 an minimum, 9 mois si le locataire est étudiant",
      source: F1165,
      titreSource: T1165,
      releveLe: "2026-11-15",
      citation: "1 an minimum (9 mois si le locataire est étudiant)",
    },
    {
      fait: "Durée d'un bail mobilité",
      valeur: "1 mois minimum, 10 mois maximum",
      source: F1165,
      titreSource: T1165,
      releveLe: "2026-11-15",
      citation: "Minimum : 1 mois Maximum : 10 mois Au-delà de 10 mois, renouvellement du bail interdit",
    },
    {
      fait: "Dépôt de garantie d'un meublé",
      valeur: "2 mois de loyer hors charges en meublé, dépôt interdit en bail mobilité",
      source: F1165,
      titreSource: T1165,
      releveLe: "2026-11-15",
      citation: "Montant maximum : 2 mois de loyer (hors charges) Interdit",
    },
    {
      fait: "Préavis du locataire en meublé",
      valeur: "à tout moment, préavis de 1 mois",
      source: F1165,
      titreSource: T1165,
      releveLe: "2026-11-15",
      citation: "À tout moment Congé à donner avec un délai de préavis de 1 mois",
    },
    {
      fait: "Situations ouvrant le bail mobilité",
      valeur: "études, stage, formation, apprentissage, service civique, mutation, mission temporaire",
      source: F1165,
      titreSource: T1165,
      releveLe: "2026-11-15",
      citation: "Formation professionnelle Études supérieures Contrat d'apprentissage Stage Engagement volontaire dans le cadre d'un service civique Mutation professionnelle Mission temporaire",
    },
    {
      fait: "Congé du propriétaire en meublé",
      valeur: "à l'échéance, pour un motif autorisé, préavis d'au moins 3 mois",
      source: F1165,
      titreSource: T1165,
      releveLe: "2026-11-15",
      citation: "Congé à donner avec un délai de préavis d'au moins 3 mois",
    },
    {
      fait: "Inventaire du mobilier à la remise des clés",
      valeur: "inventaire et état détaillé du mobilier à la remise des clés",
      source: F1165,
      titreSource: T1165,
      releveLe: "2026-11-15",
      citation: "un inventaire et un état détaillé du mobilier doivent être faits lors de la remise des clés au locataire",
    },
    {
      fait: "Meublé de tourisme : bref séjour hors résidence principale",
      valeur: "bref séjour, sans en faire sa résidence principale",
      source: F1165,
      titreSource: T1165,
      releveLe: "2026-11-15",
      citation: "le locataire utilise le logement pour un bref séjour, et sans en faire sa résidence principale",
    },
    {
      fait: "Résidence principale pour l'APL",
      valeur: "au minimum 8 mois par an",
      source: F12006,
      titreSource: T12006,
      releveLe: "2026-11-15",
      citation: "c'est-à-dire celle que vous occupez au minimum 8 mois par an (sauf exceptions)",
    },
  ],
  corps: `
## Quel contrat signer pour une chambre chez l'habitant ? {#bail}
Un bail écrit. Service-public recommande, dans tous les cas, un bail d'habitation classique pour un logement meublé ou un bail mobilité. Et si la chambre n'a ni coin cuisine ni sanitaires privatifs, le bail devient obligatoire, avec une annexe qui indique que le propriétaire partage les siens avec vous. Ce que change l'absence d'écrit est expliqué dans l'article sur la [location sans bail écrit](/blog/location-sans-bail-ecrit).

Lisez l'annonce avec cette grille avant de répondre : une chambre « meublée », louée pour y vivre toute l'année, appelle un bail meublé ou un bail mobilité, pas un simple accord oral ni un reçu. Le guide pour [répondre à une annonce de location](/guides/repondre-a-une-annonce-de-location) vous aide à poser la question dès le premier message, sans braquer le propriétaire.

Une chambre louée par un locataire, et non par le propriétaire qui habite les lieux, relève d'une autre situation : la sous-location, avec un accord écrit à vérifier. Voyez l'article sur la [sous-location légale](/blog/sous-location-legale-sous-locataire).

## Combien de temps dure le bail d'une chambre meublée ? {#duree}
Avec un bail meublé, au moins 1 an, ou 9 mois si vous êtes étudiant. Avec un bail mobilité, de 1 à 10 mois, sans renouvellement au-delà, s'il correspond à votre situation : études, stage, formation, apprentissage, service civique, mutation ou mission temporaire. Dans les deux cas, vous pouvez partir à tout moment avec un préavis de 1 mois.

Le choix dépend de votre projet : une année d'études appelle le bail de 9 mois, détaillé dans l'article sur le [bail meublé étudiant](/blog/bail-meuble-etudiant-9-mois) ; un stage de quatre mois, le [bail mobilité](/blog/bail-mobilite). Une durée écrite vous protège aussi : avec un bail meublé, le propriétaire ne donne congé qu'à l'échéance, pour un motif autorisé, et avec un préavis d'au moins 3 mois.

## Combien de dépôt de garantie pour une chambre ? {#depot}
Au plus 2 mois de loyer hors charges avec un bail meublé, comme pour tout logement meublé. Avec un bail mobilité, le dépôt de garantie est interdit. Un propriétaire qui vous demande trois mois d'avance, ou un dépôt en plus d'un bail mobilité, dépasse ce que prévoient les baux d'une résidence principale.

Demandez un reçu pour toute somme versée, et ne payez rien avant la signature. Les règles de restitution sont dans le guide du [dépôt de garantie](/guides/depot-de-garantie). L'état des lieux, avec l'inventaire du mobilier fait à la remise des clés, protège votre dépôt au départ : le [guide de l'état des lieux](/guides/etat-des-lieux) dit quoi vérifier.

## Que doit contenir la chambre que vous louez ? {#chambre}
Service-public pose un minimum : une chambre d'au moins 9 m², avec une fenêtre, chauffée, et un minimum de meubles, à savoir une literie, une table, un siège, des rangements et des luminaires. Vérifiez ces points à la visite, mètre en main si la surface vous paraît juste, avant de parler du loyer.

La façon de mesurer la surface habitable est détaillée dans l'article sur la [surface minimum d'une location](/blog/surface-minimum-location). Si la chambre est meublée, comparez aussi le mobilier à la liste du meublé : l'article [meublé ou vide](/blog/meuble-ou-vide-locataire) explique ce qui se passe quand un meuble obligatoire manque.

## Comment se partagent la cuisine, la salle de bain et les charges ? {#pieces-communes}
Par écrit. Quand vous utilisez la cuisine et la salle d'eau du propriétaire, le bail doit comporter une annexe qui le dit. Les charges prennent souvent la forme d'un forfait pour l'électricité, le gaz et l'eau, qui doit être mentionné dans le contrat. Lisez son montant avant de signer : c'est ce que vous paierez chaque mois, en plus du loyer.

Profitez de la rédaction de l'annexe pour faire écrire ce que l'annonce ne dit pas : les pièces auxquelles vous avez accès (salon, buanderie, jardin), la clé de votre chambre et celle de l'entrée, les horaires de la cuisine s'il y en a, la possibilité de recevoir quelqu'un. Ces points se discutent mieux à la visite qu'au premier désaccord. Une règle de vie qui vous gêne au départ vous gênera davantage dans six mois.

## Faut-il une assurance habitation pour une chambre chez l'habitant ? {#assurance}
Pas toujours. Si le propriétaire a déjà souscrit une assurance complète pour son logement, vous n'êtes pas obligé de souscrire votre propre contrat pour la chambre. Demandez-lui de le confirmer par écrit, avec l'attestation de son assureur, car c'est vous qui seriez exposé en cas de dégât des eaux ou d'incendie parti de votre chambre.

Sans cette confirmation, assurez-vous comme tout locataire : les règles sont dans l'article sur l'[assurance habitation du locataire](/blog/assurance-habitation-locataire). Vos affaires personnelles (ordinateur, vélo) ne sont pas forcément couvertes par le contrat du propriétaire : posez la question à son assureur ou au vôtre.

## Peut-on toucher l'APL pour une chambre chez l'habitant ? {#apl}
Oui, à condition d'avoir signé un bail : c'est la règle que rappelle service-public pour la chambre meublée chez l'habitant. Il faut aussi que la chambre soit votre résidence principale, occupée au minimum 8 mois par an, sauf exceptions, et que vous remplissiez les conditions de ressources. La demande se fait en ligne auprès de la Caf.

Un accord oral ou un simple reçu ne suffit donc pas pour l'aide. Si le propriétaire refuse le bail parce qu'il ne veut pas que la Caf soit informée, l'article sur le [propriétaire qui refuse l'APL](/blog/proprietaire-refuse-apl) vous aide à mesurer ce que vous perdez. Comptez aussi le premier mois sans aide, expliqué dans l'article sur l'[APL du premier mois](/blog/apl-premier-mois).

## Et si la chambre n'est pas votre résidence principale ? {#hors-residence-principale}
Les règles décrites plus haut sont celles des baux d'une résidence principale : bail vide, bail meublé ou bail mobilité. Une chambre louée pour quelques nuits ou quelques semaines, sans y vivre, se loue comme un meublé de tourisme, pour un bref séjour. Les durées minimales, le plafond du dépôt et l'aide au logement ne vous concernent alors pas.

C'est souvent le cas des chambres louées pour un déplacement, une formation de quelques jours ou en attendant un logement. Si vous comptez rester plusieurs mois et y avoir votre adresse, dites-le au propriétaire dès le départ et demandez un bail meublé ou un bail mobilité.
`,
});
