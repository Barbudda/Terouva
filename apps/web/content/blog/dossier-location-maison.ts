// Vague 9, ligne 20. Requête vue en Search Console et à l'autocomplétion : « dossier location maison ».
// Apport : le dossier ne change pas, ce qui change vient après la signature : jardin, gouttières, fosse septique,
// chaudière, abonnements et état des lieux de l'extérieur. Aucun arrêt cité (voir garde-fous de la vague 9).

import { article } from "@/lib/blog-format";

const F31697 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F31697";
const T31697 = "Service-public.gouv.fr · Entretien courant et réparations locatives à la charge du locataire";
const F31270 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F31270";
const T31270 = "Service-public.gouv.fr · État des lieux d'entrée dans un bail d'habitation";
const F1169 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169";
const T1169 = "Service-public.gouv.fr · Futur locataire d'un logement privé : justificatifs à donner au propriétaire";
const F14128 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F14128";
const T14128 = "Service-public.gouv.fr · Je déménage en France";
const F1349 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1349";
const T1349 = "Service-public.gouv.fr · Obligation du locataire : assurance habitation couvrant les risques locatifs";

export default article({
  slug: "dossier-location-maison",
  titre: "Louer une maison : le dossier, le jardin, ce qui change",
  titreSeo: "Dossier de location d'une maison : ce qui change",
  description:
    "Les pièces du dossier restent celles d'un appartement. Ce qui change vient après : jardin, gouttières, fosse septique, chaudière et état des lieux.",
  chapeau:
    "Pour une maison, le propriétaire ne peut demander que les pièces de la liste officielle, comme pour un appartement. Ce qui change vient après la signature : l'entretien courant du jardin, la taille des arbres et arbustes, les gouttières et l'entretien de la chaudière vous reviennent. Vérifiez ce que le bail vous confie et notez l'extérieur à l'état des lieux.",
  publieLe: "2026-11-06",
  pilier: "B",
  format: "cas-pratique",
  guidePilier: "/guides/dossier-de-location",
  guidesLies: ["/guides/etat-des-lieux"],
  statut: "publie",
  requete: "dossier location maison",
  faits: [
    {
      fait: "Une liste de justificatifs autorisés",
      valeur: "liste fermée de justificatifs",
      source: F1169,
      titreSource: T1169,
      releveLe: "2026-11-05",
      citation: "Le propriétaire a interdiction d'en exiger d'autres.",
    },
    {
      fait: "Le bail décrit le logement et ce qui est privatif",
      valeur: "maison ou appartement, équipements à usage privatif et commun",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F920",
      titreSource: "Service-public.gouv.fr · Rédaction du bail d'habitation (contrat de location)",
      releveLe: "2026-11-05",
      citation:
        "Description du logement (maison ou appartement, en copropriété ou non, nombre de pièces) et de ses équipements à usage privatif et commun",
    },
    {
      fait: "Jardin privatif dans le décret sur les réparations locatives",
      valeur: "entretien courant, taille, élagage, échenillage des arbres et arbustes",
      source: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000006491868",
      titreSource: "Légifrance · Décret n° 87-712 du 26 août 1987 relatif aux réparations locatives, annexe",
      releveLe: "2026-11-05",
      citation:
        "Entretien courant, notamment des allées, pelouses, massifs, bassins et piscines ; taille, élagage, échenillage des arbres et arbustes",
    },
    {
      fait: "Le décret vise l'usage exclusif",
      valeur: "parties extérieures dont le locataire a l'usage exclusif",
      source: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000006491868",
      titreSource: "Légifrance · Décret n° 87-712 du 26 août 1987 relatif aux réparations locatives, annexe",
      releveLe: "2026-11-05",
      citation: "Parties extérieures dont le locataire a l'usage exclusif",
    },
    {
      fait: "Le jardin selon service-public",
      valeur: "entretien courant du jardin par le locataire",
      source: F31697,
      titreSource: T31697,
      releveLe: "2026-11-05",
      citation: "Le locataire doit se charger de l'entretien courant du jardin",
    },
    {
      fait: "Arbres et arbustes selon service-public",
      valeur: "taille, élagage, échenillage",
      source: F31697,
      titreSource: T31697,
      releveLe: "2026-11-05",
      citation: "les arbres et arbustes (par exemple, taille, élagage, échenillage)",
    },
    {
      fait: "Branches chez le voisin",
      valeur: "le propriétaire veille à ce que les branches ne dépassent pas",
      source: F31697,
      titreSource: T31697,
      releveLe: "2026-11-05",
      citation: "Le propriétaire doit veiller à ce que les branches des arbres ne dépassent pas sur le terrain du voisin.",
    },
    {
      fait: "Gouttières",
      valeur: "dégorger les conduits, chéneaux et gouttières",
      source: F31697,
      titreSource: T31697,
      releveLe: "2026-11-05",
      citation: "Le locataire doit dégorger les conduits de descentes d'eaux pluviales, chéneaux et gouttières.",
    },
    {
      fait: "Auvents et terrasses",
      valeur: "nettoyage régulier",
      source: F31697,
      titreSource: T31697,
      releveLe: "2026-11-05",
      citation: "Le locataire doit nettoyer régulièrement les auvents, terrasses et marquises",
    },
    {
      fait: "Portail",
      valeur: "entretien des grilles de portail",
      source: F31697,
      titreSource: T31697,
      releveLe: "2026-11-05",
      citation: "Le locataire doit entretenir les grilles de portail",
    },
    {
      fait: "Fosse septique : vidange",
      valeur: "vidange à la charge du locataire",
      source: F31697,
      titreSource: T31697,
      releveLe: "2026-11-05",
      citation: "Le locataire doit vidanger les fosses septiques, les puisards et les fosses d'aisance",
    },
    {
      fait: "Fosse septique : curage",
      valeur: "curage à la charge du propriétaire",
      source: F31697,
      titreSource: T31697,
      releveLe: "2026-11-05",
      citation: "C'est le propriétaire qui doit curer la fosse septique",
    },
    {
      fait: "Entretien de la chaudière",
      valeur: "entretien annuel par le locataire",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F20760",
      titreSource: "Service-public.gouv.fr · Entretien annuel de la chaudière : quelles règles pour le locataire ?",
      releveLe: "2026-11-05",
      citation: "En tant que locataire, vous devez faire réaliser un entretien annuel de la chaudière.",
    },
    {
      fait: "Fournisseurs d'énergie",
      valeur: "contacter les fournisseurs pour le futur logement",
      source: F14128,
      titreSource: T14128,
      releveLe: "2026-11-05",
      citation: "contacter les fournisseurs pour mon futur logement, relever les compteurs le jour de mon déménagement/emménagement",
    },
    {
      fait: "Service des eaux",
      valeur: "informer les services des eaux",
      source: F14128,
      titreSource: T14128,
      releveLe: "2026-11-05",
      citation: "J'informe les entreprises qui gèrent mes comptes ou abonnements, passés ou à venir : services des eaux",
    },
    {
      fait: "Assurance obligatoire",
      valeur: "au minimum les risques locatifs",
      source: F1349,
      titreSource: T1349,
      releveLe: "2026-11-05",
      citation: "couvrant au minimum les risques locatifs, c'est-à-dire au moins les risques incendie, dégât des eaux, explosion",
    },
    {
      fait: "Attestation à la remise des clés",
      valeur: "attestation fournie à la remise des clés",
      source: F1349,
      titreSource: T1349,
      releveLe: "2026-11-05",
      citation: "Lorsque le propriétaire (ou l'agence immobilière) vous remet les clefs du logement",
    },
    {
      fait: "Contenu de l'état des lieux",
      valeur: "chaque pièce et partie du logement",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "Pour chaque pièce et partie du logement, description précise de l'état des revêtements des sols, murs et plafonds, des équipements et des meubles du logement.",
    },
    {
      fait: "Observations et images",
      valeur: "observations, réserves et images",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "Elle peut être complétée d'observations ou de réserves, et illustrée d'images.",
    },
    {
      fait: "Compteurs non branchés",
      valeur: "précision possible à l'état des lieux",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "le fait que les compteurs d'eau, de gaz ou d'électricité ne sont pas branchés",
    },
    {
      fait: "Clés et moyens d'accès à l'état des lieux",
      valeur: "clés et moyens d'accès mentionnés",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "Clés ou tout autre moyen d'accès aux locaux à usage privatif ou commun",
    },
    {
      fait: "Modifier l'état des lieux d'entrée",
      valeur: "10 jours calendaires",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation:
        "Le locataire peut demander au propriétaire (ou à son représentant) de modifier l'état des lieux d'entrée dans les 10 jours calendaires",
    },
  ],
  corps: `
## Le dossier de location change-t-il pour une maison ? {#dossier}
Non. La liste des justificatifs autorisés ne distingue pas la maison de l'appartement, et le propriétaire a interdiction d'en exiger d'autres. Pièce d'identité, domicile, activité, ressources : préparez les mêmes documents, et ceux de votre garant s'il y en a un. Le [guide du dossier de location](/guides/dossier-de-location) en donne le détail.

Un particulier qui loue sa maison pose parfois une question de plus : qui va s'occuper du jardin ? Il n'y a aucun justificatif à fournir là-dessus. Une phrase dans votre message de candidature suffit à montrer que vous avez compris ce qui vous attend, par exemple : « J'ai bien noté l'entretien du jardin et de la chaudière. »

## Qui entretient le jardin et les haies d'une maison louée ? {#jardin}
Le locataire, pour l'entretien courant d'un jardin dont il a l'usage exclusif. Le décret du 26 août 1987 cite les allées, les pelouses, les massifs, ainsi que la taille, l'élagage et l'échenillage des arbres et arbustes. Il ne nomme pas les haies : faites préciser par écrit qui les taille.

Regardez d'abord si le bail vous confie bien ce jardin : il doit décrire le logement et ce qui est à usage privatif. Un terrain partagé avec le propriétaire ou un autre occupant n'entre pas dans cette règle, faute d'usage exclusif. Faites écrire clairement qui fait quoi dans ce cas.

Pour un grand arbre, ne concluez pas seul. Écrivez au propriétaire avant toute intervention, et demandez à l'ADIL de votre département ce qui vaut dans votre situation : elle répond gratuitement. Le propriétaire doit de son côté veiller à ce que les branches ne dépassent pas sur le terrain du voisin.

## Qu'est-ce qui vous revient d'autre à l'extérieur d'une maison ? {#exterieur}
Les gouttières à dégorger, les auvents et terrasses à nettoyer, les grilles de portail à entretenir, et les fosses septiques à vidanger. Le curage de la fosse septique reste au propriétaire. Ces tâches n'existent pas ou sont collectives dans un immeuble : ce sont elles qu'on découvre en passant d'un appartement à une maison.

Posez deux questions dès la visite : où est la fosse, s'il y en a une, et quand a-t-elle été vidée pour la dernière fois ? La réponse vous dit ce qui vous attend pendant le bail.

## Chaudière, compteurs, assurance : que préparer pour l'entrée ? {#avant}
Prévoyez l'entretien annuel de la chaudière, contactez les fournisseurs d'énergie, informez le service des eaux, et donnez votre attestation d'assurance à la remise des clés. L'assurance doit couvrir au minimum les risques locatifs : incendie, dégât des eaux, explosion. Le jour de l'entrée, relevez aussi tous les compteurs de la maison.

Si la chaudière vous inquiète, notre article sur la [chaudière en location](/blog/chaudiere-locataire-ou-proprietaire) dit ce qu'il faut demander et qui paie quoi. Signalez à votre assureur le garage, l'abri ou la piscine s'il y en a, et vérifiez ce que votre contrat couvre.

Si un compteur d'eau, de gaz ou d'électricité n'est pas branché, faites-le noter à l'état des lieux.

## Que noter à l'état des lieux d'une maison ? {#etat-des-lieux}
L'extérieur autant que l'intérieur. L'état des lieux d'entrée décrit chaque pièce et partie du logement, et il peut être complété d'observations, de réserves et d'images. Faites-y figurer le jardin, les haies, la terrasse, les gouttières et le portail, avec des photos datées, ainsi que toutes les clés et télécommandes reçues.

Une pelouse se juge mal d'une saison à l'autre : une photo prise en janvier ne dit rien de ce qu'on attendra de vous en juin. Notez donc les faits (haie haute de deux mètres, arbre déjà malade, allée envahie), et non une simple mention « bon état ».

Vous avez ensuite 10 jours calendaires pour demander une modification. Le [guide de l'état des lieux](/guides/etat-des-lieux) explique comment faire, et ce qui se passe à la sortie.
`,
});
