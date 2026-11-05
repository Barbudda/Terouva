// Vague 9, ligne 15. Requête relevée à l'autocomplétion. Apport : les taxes et l'eau réunies, vues du locataire,
// avec l'exception du second logement pour la taxe d'habitation. Pas de régularisation ni de calcul : côté
// bailleur (registre section 8) ; le forfait va vers annonce-location-charges-comprises.

import { article } from "@/lib/blog-format";

const F947 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F947";
const T947 = "Service-public.gouv.fr · Charges à payer par le locataire";
const F59 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F59";
const T59 = "Service-public.gouv.fr · Taxe foncière";
const F42 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F42";
const T42 = "Service-public.gouv.fr · Taxe d'habitation sur les résidences secondaires (THRS)";
const F2066 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F2066";
const T2066 = "Service-public.gouv.fr · Bail d'habitation : documents remis par le propriétaire (bailleur)";
const F14128 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F14128";
const T14128 = "Service-public.gouv.fr · Je déménage en France";

export default article({
  slug: "taxe-ordures-menageres-locataire",
  titre: "Taxe d'ordures, eau, taxe d'habitation : que paie un locataire en plus du loyer ?",
  titreSeo: "Taxe d'ordures : le locataire doit-il la payer ?",
  description:
    "La taxe d'ordures et l'assainissement passent dans vos charges, la taxe foncière reste au propriétaire. L'eau, la taxe d'habitation, les justificatifs.",
  chapeau:
    "Oui, la taxe d'enlèvement des ordures ménagères revient au locataire : le propriétaire la paie, puis se la fait rembourser dans les charges, comme la redevance d'assainissement. L'eau est aussi pour vous. La taxe foncière reste au propriétaire, et la taxe d'habitation d'une résidence principale est supprimée depuis le 1er janvier 2023.",
  publieLe: "2026-11-06",
  pilier: "D",
  format: "question",
  guidePilier: "/guides/depot-de-garantie",
  guidesLies: ["/guides/dossier-de-location"],
  statut: "publie",
  requete: "locataire doit il payer taxe ordures ménagères",
  faits: [
    {
      fait: "Le propriétaire paie, puis demande le remboursement",
      valeur: "TEOM payée par le propriétaire, remboursable par le locataire",
      source: F59,
      titreSource: T59,
      releveLe: "2026-11-05",
      citation: "Mais vous pouvez demander le remboursement de la TEOM à votre locataire, car cette taxe fait partie des charges récupérables .",
    },
    {
      fait: "Taxe foncière au propriétaire",
      valeur: "taxe foncière due même si le logement est loué",
      source: F59,
      titreSource: T59,
      releveLe: "2026-11-05",
      citation: "Vous devez payer la TFPB et la TEOM même si le logement est loué à un locataire .",
    },
    {
      fait: "Même avis pour les deux taxes",
      valeur: "taxe foncière et TEOM sur le même avis",
      source: F59,
      titreSource: T59,
      releveLe: "2026-11-05",
      citation: "Sur le même avis d'imposition, vous trouverez la taxe foncière sur les propriétés baties (TFPB) et la taxe",
    },
    {
      fait: "Taxes et redevances à la charge du locataire",
      valeur: "taxe ou redevance d'ordures, taxe de balayage, redevance assainissement",
      source: F947,
      titreSource: T947,
      releveLe: "2026-11-05",
      citation: "Les dépenses restant à la charge du locataire sont notamment les dépenses suivantes",
    },
    {
      fait: "Assainissement",
      valeur: "redevance assainissement à la charge du locataire",
      source: F947,
      titreSource: T947,
      releveLe: "2026-11-05",
      citation: "des ordures ménagères Taxe de balayage Redevance assainissement .",
    },
    {
      fait: "Redevance facturée à l'occupant",
      valeur: "informer la mairie du départ pour arrêter la facturation",
      source: F14128,
      titreSource: T14128,
      releveLe: "2026-11-05",
      citation: "Si je paie la redevance des ordures ménagères , je dois informer la mairie",
    },
    {
      fait: "Eau dans les charges",
      valeur: "eau froide et chaude de l'ensemble des occupants",
      source: F947,
      titreSource: T947,
      releveLe: "2026-11-05",
      citation: "Eau froide et chaude de l'ensemble des occupants",
    },
    {
      fait: "Facture d'eau annuelle si contrat collectif",
      valeur: "facture et qualité de l'eau transmises une fois par an",
      source: F2066,
      titreSource: T2066,
      releveLe: "2026-11-05",
      citation: "doit envoyer au locataire, 1 fois par an, la facture d'eau et les informations sur la qualité de l'eau",
    },
    {
      fait: "Électricité du logement",
      valeur: "abonnement au nom du locataire",
      source: F947,
      titreSource: T947,
      releveLe: "2026-11-05",
      citation: "chaque locataire doit souscrire un abonnement auprès d'une entreprise distributrice",
    },
    {
      fait: "Taxe d'habitation sur la résidence principale",
      valeur: "supprimée depuis le 1er janvier 2023",
      source: F42,
      titreSource: T42,
      releveLe: "2026-11-05",
      citation: "En revanche, la taxe d'habitation sur les résidences principales est supprimée depuis le 1 er janvier 2023.",
    },
    {
      fait: "Résidence secondaire louée à l'année",
      valeur: "taxe d'habitation due par le locataire",
      source: F42,
      titreSource: T42,
      releveLe: "2026-11-05",
      citation: "Si vous êtes locataire à l'année de votre résidence secondaire, vous devez payer la taxe d'habitation pour celle-ci",
    },
    {
      fait: "Second logement pour le travail",
      valeur: "considéré comme résidence secondaire, dégrèvement possible sur réclamation",
      source: F42,
      titreSource: T42,
      releveLe: "2026-11-05",
      citation: "vous occupez un logement à proximité de votre lieu de travail",
    },
    {
      fait: "Date d'appréciation",
      valeur: "situation au 1er janvier de l'année d'imposition",
      source: F42,
      titreSource: T42,
      releveLe: "2026-11-05",
      citation: "est établie pour l'année entière et dépend de votre situation au 1 er janvier de l'année d'imposition.",
    },
    {
      fait: "Décompte avant la régularisation",
      valeur: "un mois avant la régularisation annuelle",
      source: F947,
      titreSource: T947,
      releveLe: "2026-11-05",
      citation: "Un mois avant la régularisation annuelle, le propriétaire (ou l'agence immobilière) doit communiquer les informations suivantes",
    },
    {
      fait: "Justificatifs consultables",
      valeur: "6 mois suivant l'envoi du décompte",
      source: F947,
      titreSource: T947,
      releveLe: "2026-11-05",
      citation: "Durant les 6 mois suivant l'envoi du décompte, le propriétaire (ou l'agence immobilière) doit tenir à la disposition du locataire l'ensemble des documents justificatifs.",
    },
    {
      fait: "Récapitulatif sur demande",
      valeur: "récapitulatif transmis par mail ou courrier",
      source: F947,
      titreSource: T947,
      releveLe: "2026-11-05",
      citation: "Sur demande du locataire, le propriétaire (ou l'agence immobilière) doit lui transmettre le récapitulatif des charges du logement",
    },
    {
      fait: "Charges au forfait",
      valeur: "pas de complément ni de régularisation",
      source: F947,
      titreSource: T947,
      releveLe: "2026-11-05",
      citation: "Le forfait ne doit pas s'accompagner d'un complément à verser ou d'une régularisation ultérieure.",
    },
  ],
  corps: `
## Le locataire doit-il payer la taxe d'ordures ménagères ? {#ordures}
Oui, dans la plupart des cas. Le propriétaire reçoit la taxe sur son avis de taxe foncière et la règle au fisc, puis il peut vous en demander le remboursement, car elle fait partie des charges récupérables. Vous ne recevez donc aucun avis à votre nom : elle apparaît dans vos charges, à part ou dans votre provision.

Deux cas changent la façon de payer :

- **La commune facture une redevance** plutôt qu'une taxe : elle reste à la charge du locataire, et elle peut vous être facturée directement. Quand vous partez, prévenez alors la mairie ou le service compétent pour arrêter la facturation.
- **Votre bail prévoit un forfait** : les charges sont fixées d'avance, sans complément ni régularisation. L'article sur les [charges comprises dans l'annonce](/blog/annonce-location-charges-comprises) explique comment le lire.

La taxe foncière, elle, reste au propriétaire, même si elle arrive sur le même avis : seule la part des ordures vous concerne. Une ligne « taxe foncière » dans vos charges mérite donc une question écrite.

## Qui paie l'eau et l'assainissement ? {#eau}
Le locataire, dans les deux cas. L'eau froide et chaude des occupants fait partie des charges récupérables, comme la redevance d'assainissement. Si votre logement a un contrat d'eau à votre nom, la facture vous arrive directement. Sinon, le propriétaire répartit la dépense et vous transmet une fois par an la facture et les informations sur la qualité de l'eau.

Avant de signer, demandez dans quel cas vous êtes : la réponse change votre budget. Avec un contrat collectif, regardez si un compteur individuel permet de répartir selon votre consommation réelle. L'électricité du logement est à part : chaque locataire souscrit son propre abonnement, comme le rappelle l'article sur [le jour de la remise des clés](/blog/nouveau-locataire-que-faire).

## Un locataire paie-t-il encore la taxe d'habitation ? {#taxe-habitation}
Pas pour sa résidence principale : cette taxe y est supprimée depuis le 1er janvier 2023. Elle subsiste pour les résidences secondaires, et un locataire à l'année d'une résidence secondaire doit la payer. Elle dépend de votre situation au 1er janvier de l'année d'imposition et vaut pour l'année entière, même si vous partez en cours d'année.

Ce point touche surtout ceux qui ont deux logements. Si vous occupez un logement près de votre travail en plus de celui de votre famille, il est considéré comme une résidence secondaire. Vous pouvez alors demander un dégrèvement, sur réclamation. Un propriétaire ne peut pas non plus la glisser dans les charges d'une résidence principale, puisqu'elle n'existe plus.

## Quels justificatifs demander pour vérifier vos charges ? {#justificatifs}
Demandez le décompte par nature de charges et le mode de répartition entre les logements : le propriétaire doit vous les communiquer un mois avant la régularisation annuelle. Il doit ensuite tenir les pièces à votre disposition pendant 6 mois. Vous pouvez aussi obtenir le récapitulatif des charges de votre logement, par mail ou par courrier.

Avant de signer, posez une question simple : « Quelle somme d'ordures ménagères et d'eau a été payée l'an dernier pour ce logement ? » La réponse vous donne un ordre de grandeur pour votre budget, à ajouter au loyer, aux premiers frais et au [dépôt de garantie](/guides/depot-de-garantie). Si une ligne vous semble anormale, demandez la pièce correspondante par écrit. L'ADIL de votre département peut vous aider à la lire. Le [premier mois d'APL](/blog/apl-premier-mois) est à compter dans le même budget.
`,
});
