import { article } from "@/lib/blog-format";

const SP_PIECES = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169";
const T_PIECES = "Service-public.gouv.fr · Futur locataire d'un logement privé : justificatifs à donner au propriétaire";
const SP_DISCRI = "https://www.service-public.gouv.fr/particuliers/vosdroits/F14750";
const T_DISCRI = "Service-public.gouv.fr · Discrimination à la location d'un logement";
const SP_RECEPISSE = "https://www.service-public.gouv.fr/particuliers/vosdroits/F15763";
const T_RECEPISSE = "Service-public.gouv.fr · Qu'est-ce qu'un récépissé de demande de titre de séjour ?";

export default article({
  slug: "louer-avec-recepisse-titre-de-sejour",
  titre: "Louer avec un récépissé de titre de séjour : ce que le bailleur peut demander",
  titreSeo: "Louer avec un récépissé de titre de séjour",
  description:
    "Titre expiré, récépissé en main : la pièce d'identité qui suffit, ce que prouve le récépissé, et pourquoi la nationalité ne peut pas fonder un refus.",
  chapeau:
    "Un récépissé de demande de titre de séjour ne vous empêche pas de louer. Le bailleur peut exiger une seule pièce d'identité en cours de validité, et un passeport étranger fait partie de celles qu'accepte la liste officielle. Le récépissé prouve que votre séjour est régulier pendant l'examen de votre demande, et la nationalité est un critère interdit.",
  publieLe: "2026-11-04",
  pilier: "B",
  format: "question",
  guidePilier: "/guides/dossier-de-location",
  guidesLies: ["/guides/refus-de-dossier", "/guides/garantie-visale"],
  outilLie: "/outils/dossier-de-location",
  statut: "publie",
  requete: "louer avec récépissé demande de renouvellement étudiant",
  faits: [
    {
      fait: "Le récépissé autorise à séjourner en France pour la durée qu'il précise",
      valeur: "séjour autorisé pour la durée indiquée",
      source: SP_RECEPISSE,
      titreSource: T_RECEPISSE,
      releveLe: "2026-11-04",
      citation: "Il vous autorise à séjourner en France pour la durée qu'il précise",
    },
    {
      fait: "Le récépissé est remis quand le dossier de demande est complet",
      valeur: "dossier complet",
      source: SP_RECEPISSE,
      titreSource: T_RECEPISSE,
      releveLe: "2026-11-04",
      citation: "Le récépissé vous est remis si votre dossier est complet",
    },
    {
      fait: "En renouvellement, le récépissé est valable 3 mois",
      valeur: "3 mois",
      source: SP_RECEPISSE,
      titreSource: T_RECEPISSE,
      releveLe: "2026-11-04",
      citation: "Renouvellement ou duplicata de carte de séjour Vous recevez un récépissé valable 3 mois",
    },
    {
      fait: "Sa validité commence le lendemain de la fin de la carte de séjour",
      valeur: "à partir du lendemain de la fin de validité de la carte",
      source: SP_RECEPISSE,
      titreSource: T_RECEPISSE,
      releveLe: "2026-11-04",
      citation: "Sa date de validité débute à partir du lendemain de la date de fin de validité de votre carte de séjour",
    },
    {
      fait: "Pour une première demande, le récépissé dure 4 ou 6 mois",
      valeur: "4 ou 6 mois",
      source: SP_RECEPISSE,
      titreSource: T_RECEPISSE,
      releveLe: "2026-11-04",
      citation: "Vous recevez un récépissé d'une durée de 4 ou 6 mois",
    },
    {
      fait: "Une demande faite sur le téléservice de l'ANEF donne une attestation",
      valeur: "attestation de l'ANEF",
      source: SP_RECEPISSE,
      titreSource: T_RECEPISSE,
      releveLe: "2026-11-04",
      citation: "Si votre demande est réalisée au moyen du téléservice de l'Anef, vous recevrez une attestation",
    },
    {
      fait: "Le bailleur peut exiger 1 pièce d'identité en cours de validité dans une liste",
      valeur: "1 pièce d'identité en cours de validité",
      source: SP_PIECES,
      titreSource: T_PIECES,
      releveLe: "2026-11-04",
      citation: "peut exiger 1 pièce d'identité en cours de validité parmi les documents suivants",
    },
    {
      fait: "Le passeport étranger avec photo fait partie des pièces d'identité acceptées",
      valeur: "passeport français ou étranger",
      source: SP_PIECES,
      titreSource: T_PIECES,
      releveLe: "2026-11-04",
      citation: "Passeport français ou étranger (avec photo) Permis de conduire français ou étranger (avec photo)",
    },
    {
      fait: "La carte de séjour temporaire et la carte de résident font partie de la liste",
      valeur: "carte de séjour temporaire, carte de résident",
      source: SP_PIECES,
      titreSource: T_PIECES,
      releveLe: "2026-11-04",
      citation: "Carte de séjour temporaire ou carte de résident ou carte de ressortissant d'un État membre",
    },
    {
      fait: "Étudiant : carte d'étudiant ou certificat de scolarité de l'année en cours",
      valeur: "carte d'étudiant ou certificat de scolarité",
      source: SP_PIECES,
      titreSource: T_PIECES,
      releveLe: "2026-11-04",
      citation: "Carte d'étudiant ou certificat de scolarité pour l'année en cours",
    },
    {
      fait: "Revenus non imposés en France : l'avis d'imposition étranger est prévu",
      valeur: "avis d'imposition de l'État concerné",
      source: SP_PIECES,
      titreSource: T_PIECES,
      releveLe: "2026-11-04",
      citation: "lorsque tout ou partie des revenus perçus n'a pas été imposé en France",
    },
    {
      fait: "Les copies sont en français ou traduites, montants convertis en euros",
      valeur: "copie en français, montants en euros",
      source: SP_PIECES,
      titreSource: T_PIECES,
      releveLe: "2026-11-04",
      citation: "La copie doit être rédigée ou traduite en français. Les montants inscrits sur la copie doivent être convertis en euros",
    },
    {
      fait: "L'origine et la nation font partie des critères interdits pour choisir un locataire",
      valeur: "origine, nation",
      source: SP_DISCRI,
      titreSource: T_DISCRI,
      releveLe: "2026-11-04",
      citation: "autre que le français) Ethnie Nation Race prétendue Religion",
    },
    {
      fait: "Le Défenseur des droits se saisit gratuitement, par téléphone ou en ligne",
      valeur: "saisine gratuite, par téléphone ou en ligne",
      source: SP_DISCRI,
      titreSource: T_DISCRI,
      releveLe: "2026-11-04",
      citation: "vous pouvez saisir gratuitement le Défenseur des droits par téléphone ou en ligne",
    },
    {
      fait: "À 30 ans ou moins, Visale est ouverte quel que soit le statut, sous conditions",
      valeur: "tous statuts, sous conditions",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F33453",
      titreSource: "Service-public.gouv.fr · Garantie Visale : caution pour le locataire",
      releveLe: "2026-11-04",
      citation: "(étudiant, alternant, fonctionnaire, salarié, sans emploi...), peuvent obtenir la garantie Visale, sous certaines conditions",
    },
  ],
  corps: `
## Peut-on louer avec un récépissé de demande de titre de séjour ? {#recepisse}
Oui. Le récépissé est un document provisoire, remis quand votre dossier de demande est complet, qui vous autorise à séjourner en France pour la durée qu'il précise. La liste des pièces qu'un bailleur peut demander ne réserve pas la location aux titulaires d'une carte de séjour, et la nation fait partie des critères qu'il n'a pas le droit de retenir.

La question se pose surtout aux étudiants dont la carte arrive à échéance en pleine recherche. Elle se règle par le dossier : une pièce d'identité valide, le récépissé, et vos ressources. Le guide du [dossier de location](/guides/dossier-de-location) donne la liste complète des pièces.

## Quelle pièce d'identité présenter avec un titre expiré ? {#identite}
La liste officielle autorise le bailleur à exiger une seule pièce d'identité en cours de validité : carte d'identité, passeport ou permis de conduire, français ou étranger, avec photo, ou carte de séjour. Si votre carte de séjour a expiré, un passeport valide remplit cette case. Le récépissé, lui, prouve que votre séjour reste régulier pendant l'examen de votre demande.

Le récépissé ne figure pas dans la liste des pièces d'identité. Joignez-le quand même, à côté du passeport : il montre que votre carte est en cours de renouvellement et répond à la question avant qu'elle soit posée.

## Le récépissé doit-il couvrir toute la durée du bail ? {#duree}
Non, la liste des pièces n'exige rien de tel. En renouvellement, le récépissé est valable 3 mois à partir du lendemain de la fin de votre carte, et il peut être renouvelé. Pour une première demande, il dure 4 ou 6 mois. Le bail suit sa propre durée, et la date de dépôt de votre demande rassure souvent mieux qu'un long discours.

Si vous avez fait votre demande sur le téléservice de l'ANEF, vous recevez une attestation à la place du récépissé papier : présentez-la de la même manière, avec votre passeport.

## Quelles ressources montrer quand on est étudiant étranger ? {#ressources}
Les mêmes que tout étudiant : carte d'étudiant ou certificat de scolarité de l'année en cours, vos revenus, et l'avis d'imposition de votre pays si une partie de vos revenus n'a pas été imposée en France. Les copies doivent être rédigées ou traduites en français, avec des montants convertis en euros. Un garant ou une garantie complète souvent le dossier.

À 30 ans ou moins, la garantie Visale est ouverte quel que soit le statut, sous conditions : l'article [Visale pour un étudiant étranger](/blog/visale-etudiant-etranger) détaille le cas, et l'article [garant étranger](/blog/garant-etranger-location) traite le parent qui vit hors de France.

## Que faire si le bailleur refuse à cause de votre nationalité ? {#refus}
Un refus fondé sur votre nationalité ou votre origine est une discrimination. Gardez les messages, puis saisissez gratuitement le Défenseur des droits, par téléphone ou en ligne. Si c'est la durée du récépissé qui inquiète le bailleur, montrez la date de dépôt, vos ressources et votre garantie : un dossier complet répond à cette inquiétude mieux qu'une discussion juridique.

Le guide du [refus de dossier](/guides/refus-de-dossier) explique comment rassembler les preuves et vers qui se tourner.
`,
});
