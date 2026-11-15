import { article } from "@/lib/blog-format";

const LOI = "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000509310";
const F920 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F920";
const T_F920 = "Service-public.gouv.fr · Rédaction du bail d'habitation (contrat de location)";
const F34759 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F34759";
const T_F34759 = "Service-public.gouv.fr · Quelles sont les règles d'un bail mobilité ?";
const ANIL_COP =
  "https://www.anil.org/documentation-experte/analyses-juridiques-jurisprudence/analyses-juridiques/analyses-juridiques-2010/les-conventions-doccupation-precaire";
const T_ANIL_COP = "ANIL · Analyse juridique n° 2010-23 : les conventions d'occupation précaire (à jour au 9 janvier 2013)";

export default article({
  slug: "bail-precaire-location-au-mois",
  titre: "« Bail précaire » ou location au mois : quel contrat pour y habiter ?",
  titreSeo: "Bail précaire d'habitation : ce que dit la loi",
  description:
    "Pour le logement où vous vivez, la loi ne prévoit pas de bail précaire. Les durées courtes qu'elle permet, et ce que vaut le contrat qu'on vous propose.",
  chapeau:
    "Pour une résidence principale, la loi de 1989 ne prévoit ni bail précaire ni bail au mois. Les seules durées courtes sont le bail d'au moins un an pour un événement précis, le meublé d'un an ou de neuf mois pour un étudiant, et le bail mobilité. Une « convention d'occupation précaire » exige un motif réel.",
  publieLe: "2026-11-15",
  pilier: "D",
  format: "question",
  guidePilier: "/guides/preavis-location",
  guidesLies: ["/guides/depot-de-garantie", "/guides/dossier-de-location"],
  statut: "publie",
  requete: "bail précaire habitation",
  faits: [
    {
      fait: "La loi définit la résidence principale par une occupation d'au moins huit mois par an",
      valeur: "logement occupé au moins huit mois par an",
      source: LOI,
      titreSource: "Légifrance · Loi n° 89-462 du 6 juillet 1989, article 2",
      releveLe: "2026-11-15",
      citation: "La résidence principale est entendue comme le logement occupé au moins huit mois par an",
    },
    {
      fait: "Les règles de la loi de 1989 sur le bail sont d'ordre public",
      valeur: "dispositions d'ordre public",
      source: LOI,
      titreSource: "Légifrance · Loi n° 89-462 du 6 juillet 1989, article 2",
      releveLe: "2026-11-15",
      citation: "Les dispositions du présent titre sont d'ordre public.",
    },
    {
      fait: "Trois baux permettent de louer un logement comme résidence principale",
      valeur: "bail vide, bail meublé, bail mobilité",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1165",
      titreSource: "Service-public.gouv.fr · Bail d'habitation : quelles différences entre logement vide et logement meublé ?",
      releveLe: "2026-11-15",
      citation: "trois types de bail permettent de mettre en location un logement pour que le locataire en fasse sa résidence principale",
    },
    {
      fait: "Un bail vide peut durer moins de trois ans, mais au moins un an, si le propriétaire doit reprendre le logement pour raisons familiales ou professionnelles",
      valeur: "au moins un an, pour reprise familiale ou professionnelle",
      source: F920,
      titreSource: T_F920,
      releveLe: "2026-11-15",
      citation: "la durée peut être inférieure à 3 ans (ou 6 ans), mais d'au minimum 1 an, si le propriétaire prévoit de reprendre son logement",
    },
    {
      fait: "Ce bail court nomme les raisons et l'événement",
      valeur: "raisons et événement écrits dans le contrat",
      source: LOI,
      titreSource: "Légifrance · Loi n° 89-462 du 6 juillet 1989, article 11",
      releveLe: "2026-11-15",
      citation: "Le contrat doit mentionner les raisons et l'événement invoqués.",
    },
    {
      fait: "Le propriétaire confirme l'événement deux mois avant le terme",
      valeur: "confirmation deux mois au moins avant le terme",
      source: LOI,
      titreSource: "Légifrance · Loi n° 89-462 du 6 juillet 1989, article 11",
      releveLe: "2026-11-15",
      citation: "le bailleur confirme, deux mois au moins avant le terme du contrat, la réalisation de l'événement",
    },
    {
      fait: "Sans événement ou sans confirmation, le bail est réputé de trois ans",
      valeur: "bail réputé de trois ans",
      source: LOI,
      titreSource: "Légifrance · Loi n° 89-462 du 6 juillet 1989, article 11",
      releveLe: "2026-11-15",
      citation: "Lorsque l'événement ne s'est pas produit ou n'est pas confirmé, le contrat de location est réputé être de trois ans.",
    },
    {
      fait: "Le bail meublé dure un an, ou neuf mois pour un étudiant",
      valeur: "1 an, ou 9 mois pour un étudiant",
      source: F920,
      titreSource: T_F920,
      releveLe: "2026-11-15",
      citation: "La durée du bail d'une location meublée est de : 1 an ou de 9 mois si le logement est loué à 1 étudiant",
    },
    {
      fait: "Le locataire d'un meublé part avec un préavis d'un mois, même sur un bail de neuf mois",
      valeur: "préavis de 1 mois",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1703",
      titreSource: "Service-public.gouv.fr · Peut-on se rétracter après avoir signé un bail d'habitation ?",
      releveLe: "2026-11-15",
      citation: "respecter un délai de préavis de 1 mois, y compris lorsque la durée du bail est de seulement 9 mois",
    },
    {
      fait: "Le bail mobilité dure de un à dix mois",
      valeur: "1 mois minimum, 10 mois maximum",
      source: F34759,
      titreSource: T_F34759,
      releveLe: "2026-11-15",
      citation: "Le bail mobilité est conclu pour au minimum 1 mois et au maximum 10 mois.",
    },
    {
      fait: "Le locataire en bail mobilité justifie de sa situation",
      valeur: "document justifiant la situation du locataire",
      source: F34759,
      titreSource: T_F34759,
      releveLe: "2026-11-15",
      citation: "Le locataire doit justifier de sa situation par un document",
    },
    {
      fait: "Sans motif écrit, le bail mobilité ne s'applique pas",
      valeur: "motif non indiqué : bail mobilité non applicable",
      source: F34759,
      titreSource: T_F34759,
      releveLe: "2026-11-15",
      citation: "si ce motif n'est pas indiqué, le bail mobilité n'est pas applicable",
    },
    {
      fait: "Sans la mention ou le motif, le contrat suit les règles du meublé (titre Ier bis)",
      valeur: "régi par le titre Ier bis, celui du meublé",
      source: LOI,
      titreSource: "Légifrance · Loi n° 89-462 du 6 juillet 1989, article 25-13",
      releveLe: "2026-11-15",
      citation: "le contrat de location est régi par les dispositions du titre Ier bis",
    },
    {
      fait: "Exception pour les résidences à vocation d'emploi, qui attend un décret",
      valeur: "une semaine à 18 mois en résidence à vocation d'emploi, décret à publier",
      source: F34759,
      titreSource: T_F34759,
      releveLe: "2026-11-15",
      citation: "un décret doit être publié pour permettre l'entrée en vigueur de cette nouvelle règle",
    },
    {
      fait: "La convention d'occupation précaire n'est régie par aucun texte et n'est admise que si elle ne contourne pas la loi",
      valeur: "aucun texte, admise si elle n'élude pas la législation des baux d'habitation",
      source: ANIL_COP,
      titreSource: T_ANIL_COP,
      releveLe: "2026-11-15",
      citation: "Aucun texte particulier ne la régissant, la jurisprudence a admis sa validité si elle n'a pas pour but d'éluder la législation",
    },
    {
      fait: "Sans cause objective de précarité, le contrat est qualifié de bail",
      valeur: "qualifiée de bail sans cause objective de précarité",
      source: ANIL_COP,
      titreSource: T_ANIL_COP,
      releveLe: "2026-11-15",
      citation: "S'il ne démontre pas l'existence d'une cause objective de précarité, la convention sera qualifiée de bail par les juges",
    },
    {
      fait: "La seule durée ne fait pas la précarité",
      valeur: "la durée de l'occupation ne suffit pas",
      source: ANIL_COP,
      titreSource: T_ANIL_COP,
      releveLe: "2026-11-15",
      citation: "mais la durée de l'occupation est, en soi, insuffisante",
    },
    {
      fait: "Le bail est écrit en autant d'exemplaires que de parties",
      valeur: "bail écrit, un exemplaire par partie",
      source: F920,
      titreSource: T_F920,
      releveLe: "2026-11-15",
      citation: "le bail doit être fait par écrit en autant d'exemplaires qu'il y a de parties",
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
## Un bail précaire existe-t-il pour le logement où l'on vit ? {#bail-precaire}
Non. Aucune règle de la loi du 6 juillet 1989 ne prévoit de bail précaire pour une résidence principale, c'est-à-dire un logement occupé au moins huit mois par an. Pour ce logement, trois contrats existent : le bail vide, le bail meublé et le bail mobilité. Leurs règles sont d'ordre public : un contrat ne peut pas les écarter.

Le mot revient pourtant dans les annonces et les échanges avec certains propriétaires. Il désigne le plus souvent une « convention d'occupation précaire », un contrat né de la pratique et non de la loi, dont la validité tient à des conditions strictes (voir plus bas). Ce que chaque contrat change à votre départ est détaillé dans le guide du [préavis de location](/guides/preavis-location).

## Quelles durées courtes la loi prévoit-elle ? {#durees-courtes}
Trois, chacune avec ses conditions. Un bail vide d'au moins un an, quand le propriétaire particulier doit reprendre le logement pour un événement précis, familial ou professionnel. Un meublé d'un an, ou de neuf mois si vous êtes étudiant. Et le bail mobilité, d'un à dix mois, si vous êtes en formation professionnelle, en études supérieures, en apprentissage, en stage, en service civique, en mutation ou en mission temporaire.

- **Le bail vide de moins de trois ans** : le contrat doit mentionner les raisons et l'événement. Le propriétaire confirme l'événement deux mois au moins avant le terme. S'il ne s'est pas produit ou n'est pas confirmé, le bail est réputé être de trois ans.
- **Le meublé** : un an au moins, reconduit si personne ne donne congé ; neuf mois sans reconduction pour un étudiant. Le détail est dans l'article sur le [meublé étudiant de neuf mois](/blog/bail-meuble-etudiant-9-mois).
- **Le bail mobilité** : il n'est ni renouvelé ni reconduit, et vous justifiez de votre situation par un document. Tout est dans l'article sur le [bail mobilité](/blog/bail-mobilite).

Une exception récente porte le bail mobilité d'une semaine à dix-huit mois dans les résidences à vocation d'emploi. Au 15 novembre 2026, service-public indique qu'un décret doit encore être publié pour qu'elle entre en vigueur.

## Que vaut une « convention d'occupation précaire » ? {#convention-precaire}
Elle ne tient que si un motif réel la justifie. Aucun texte ne la régit : d'après l'ANIL, les juges l'admettent quand la précarité vient de circonstances particulières, indépendantes de la volonté des parties, et que le contrat ne sert pas à contourner la loi sur les baux d'habitation. Sans cause objective de précarité, le contrat est qualifié de bail.

Deux conséquences pour vous. La durée courte ne suffit pas à rendre une occupation précaire, et le nom donné au contrat non plus. Demandez au propriétaire quel motif il invoque et vérifiez qu'il est écrit. S'il n'en a pas d'autre que de pouvoir vous faire partir quand il le veut, vous êtes devant un bail ordinaire, avec ses règles de durée et de préavis.

## Peut-on louer au mois un logement où l'on vit ? {#au-mois}
Seulement par un bail mobilité, qui peut durer un mois si vous êtes dans l'une des situations qu'il vise. Sinon, le contrat dure au moins un an en meublé. Ce qui ressemble à une location au mois, c'est votre droit de partir : en meublé, vous donnez congé à tout moment avec un préavis d'un mois, même sur un bail de neuf mois.

En vide, le préavis est plus long, et réduit dans certains cas, dont la zone tendue : le guide du préavis donne la règle et la manière de [vérifier votre commune](/guides/preavis-location#zone-tendue). Si vous hésitez entre les deux formules, la comparaison [meublé ou vide](/blog/meuble-ou-vide-locataire) vous aidera.

Un logement qui n'est pas votre résidence principale sort de ces règles, qui ne visent qu'elle. Mais la loi définit la résidence principale par l'occupation : au moins huit mois par an, sauf obligation professionnelle, raison de santé ou force majeure.

## Que vérifier avant de signer un contrat court ? {#verifier}
Trois points. Le type de contrat, écrit en toutes lettres : bail vide de moins de trois ans, meublé, meublé étudiant ou bail mobilité. La durée, avec selon le cas l'événement qui justifie le bail court ou le motif du bail mobilité. Et un écrit en autant d'exemplaires que de parties. Un contrat « précaire » sans motif ne coche aucune de ces cases.

- **Un bail mobilité sans motif écrit n'est pas un bail mobilité** : service-public le dit en toutes lettres, et le contrat suit alors les règles du meublé ordinaire.
- **Rien à payer avant la signature** : aucune somme ne peut vous être réclamée avant la signature du bail.
- **Pas d'écrit du tout ?** Vos droits et la manière d'obtenir le bail sont dans l'article [louer sans bail écrit](/blog/location-sans-bail-ecrit).
`,
});
