// Vague 10, lot A, n° 1. Requête relevée à l'autocomplétion, fils Droit-Finances (bail commun ou individuel,
// colocataire absent du bail). Apport : chacun sa demande, l'aide sur sa part, le nom sur le bail, la surface, le couple
// qui n'est pas une colocation. « Colocation avec un parent » : aucune source ne la traite, seule la variante du parent
// propriétaire (F12006) est écrite. Aucun montant ni simulation, le calendrier est renvoyé à `apl-premier-mois`.

import { article } from "@/lib/blog-format";

const F34661 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F34661";
const T34661 = "Service-public.gouv.fr · Colocation : quelles sont les règles ?";
const F12006 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F12006";
const T12006 = "Service-public.gouv.fr · Aide personnalisée au logement (APL)";
const F38492 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F38492";
const T38492 = "Service-public.gouv.fr · Vous déménagez : aides financières";
const ANIL = "https://www.anil.org/votre-besoin/louer/type-de-location/colocation/colocation-avec-un-contrat-unique/";
const TANIL = "ANIL · Colocation avec un contrat unique";

export default article({
  slug: "apl-colocation",
  titre: "APL en colocation : qui la touche, et sur quel loyer ?",
  titreSeo: "APL en colocation : qui la touche ?",
  description:
    "Chaque colocataire fait sa propre demande et touche une aide calculée sur sa part du loyer. Le nom sur le bail, la surface, le couple et les parents.",
  chapeau:
    "En colocation, chaque colocataire qui a droit à l'APL la touche à trois conditions : avoir son nom sur le bail, faire sa demande à la Caf, et habiter un logement décent d'au moins 16 m² pour deux, plus 9 m² par colocataire en plus. L'aide se calcule sur votre part du loyer, que le bail soit unique ou individuel.",
  publieLe: "2026-11-15",
  pilier: "D",
  format: "question",
  guidePilier: "/guides/depot-de-garantie",
  guidesLies: ["/guides/dossier-de-location", "/guides/garantie-visale"],
  statut: "publie",
  requete: "colocation apl",
  faits: [
    {
      fait: "Chaque colocataire peut obtenir une aide au logement pour sa part de loyer",
      valeur: "aide pour la part de loyer que chacun paie",
      source: F34661,
      titreSource: T34661,
      releveLe: "2026-11-15",
      citation: "Chaque colocataire peut obtenir une aide personnelle au logement (APL, ALS, ALF) pour la part de loyer qu'il paie",
    },
    {
      fait: "Chaque colocataire fait une demande individuelle",
      valeur: "demande individuelle à la Caf ou à la MSA",
      source: F34661,
      titreSource: T34661,
      releveLe: "2026-11-15",
      citation: "Il remplit les conditions pour avoir droit à cette aide au logement Il fait une demande individuelle à la Caf",
    },
    {
      fait: "Surface exigée pour l'aide en colocation",
      valeur: "16 m² pour 2 colocataires, 9 m² de plus par colocataire supplémentaire",
      source: F34661,
      titreSource: T34661,
      releveLe: "2026-11-15",
      citation: "au moins égale à 16 m² pour 2 colocataires. Pour chaque colocataire supplémentaire, il faut 9 m² supplémentaires",
    },
    {
      fait: "Nom sur le bail et revenus personnels",
      valeur: "chacun son nom sur le bail et ses revenus personnels",
      source: F12006,
      titreSource: T12006,
      releveLe: "2026-11-15",
      citation: "Chacun doit avoir son nom sur le bail et déclarer ses revenus personnels lors de la demande d'APL.",
    },
    {
      fait: "Le calcul tient compte de la part de chacun",
      valeur: "part de loyer versée par chacun",
      source: F12006,
      titreSource: T12006,
      releveLe: "2026-11-15",
      citation: "Le calcul de l'aide tient compte de la part de loyer versée par chacun.",
    },
    {
      fait: "Loyer retenu divisé selon le nombre de colocataires",
      valeur: "loyer divisé en fonction du nombre de colocataires",
      source: F38492,
      titreSource: T38492,
      releveLe: "2026-11-15",
      citation: "Le loyer pris en considération pour le calcul de l'aide est alors divisé en fonction du nombre de colocataires.",
    },
    {
      fait: "Dépôt de garantie réparti entre colocataires",
      valeur: "dépôt de garantie réparti entre chaque colocataire",
      source: F38492,
      titreSource: T38492,
      releveLe: "2026-11-15",
      citation: "En cas de colocation, le montant du dépôt de garantie est réparti entre chaque colocataire.",
    },
    {
      fait: "Un occupant qui ne signe pas le bail n'est pas colocataire",
      valeur: "aucun droit sur le logement, même en payant une part",
      source: F34661,
      titreSource: T34661,
      releveLe: "2026-11-15",
      citation: "Il n'a pas de droit sur le logement, même s'il paie une partie du loyer.",
    },
    {
      fait: "Bail individuel : chambre et parties communes précisées",
      valeur: "un bail par colocataire, chambre et parties communes précisées",
      source: F34661,
      titreSource: T34661,
      releveLe: "2026-11-15",
      citation: "Chaque bail doit préciser la chambre dont chaque colocataire a l'usage privatif",
    },
    {
      fait: "Bail unique : demandes faites individuellement",
      valeur: "demande individuelle de chaque locataire",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-15",
      citation: "Les demandes doivent être faites individuellement par chaque locataire à la Caisse d'allocations familiales",
    },
    {
      fait: "Un couple marié ou pacsé n'est pas en colocation",
      valeur: "couple marié ou pacsé à la signature : pas une colocation",
      source: F34661,
      titreSource: T34661,
      releveLe: "2026-11-15",
      citation: "location d'un logement à un unique couple (marié ou pacsé au moment de la signature du bail) n'est pas une colocation",
    },
    {
      fait: "Ressources du couple prises en compte",
      valeur: "ressources de la personne avec qui vous vivez en couple",
      source: F12006,
      titreSource: T12006,
      releveLe: "2026-11-15",
      citation: "Montant de vos ressources, celles de la personne avec laquelle vous vivez en couple",
    },
    {
      fait: "Pas d'APL si le propriétaire est un ascendant",
      valeur: "propriétaire ascendant ou descendant : pas d'APL",
      source: F12006,
      titreSource: T12006,
      releveLe: "2026-11-15",
      citation: "Non si votre propriétaire est un ascendant (père, mère, grand-père, grand-mère…) ou un descendant",
    },
    {
      fait: "Étudiant allocataire : fin des prestations familiales des parents",
      valeur: "les parents ne reçoivent plus de prestations familiales pour l'étudiant",
      source: F12006,
      titreSource: T12006,
      releveLe: "2026-11-15",
      citation: "si vous bénéficiez de l'APL, vos parents ne recevront plus de prestations familiales vous concernant",
    },
    {
      fait: "Rattachement fiscal maintenu",
      valeur: "rattachement au foyer fiscal des parents possible",
      source: F12006,
      titreSource: T12006,
      releveLe: "2026-11-15",
      citation: "Par contre, vous pouvez continuer à être rattaché(e) au foyer fiscal de vos parents.",
    },
  ],
  corps: `
## Chaque colocataire peut-il toucher l'APL ? {#qui}
Oui. Chaque colocataire peut obtenir une aide au logement pour la part de loyer qu'il paie, s'il remplit lui-même les conditions de l'aide. Chacun fait sa propre demande à la Caf (ou à la MSA), avec son nom sur le bail et ses revenus personnels. Un colocataire qui n'a pas droit à l'aide ne prive pas les autres de la leur.

La demande se fait en ligne, une par personne, même si vous avez signé un seul bail tous ensemble. Déposez-la dès votre entrée : l'aide ne démarre qu'au mois qui suit la demande, comme l'explique l'article sur le [premier mois sans APL](/blog/apl-premier-mois). Si un colocataire tarde, seul son droit est retardé.

## Sur quel loyer l'APL est-elle calculée en colocation ? {#part-de-loyer}
Sur votre part, pas sur le loyer entier. La Caf calcule l'aide en tenant compte de la part de loyer versée par chacun, et le loyer retenu est divisé en fonction du nombre de colocataires. Dans votre demande, vous déclarez vos revenus personnels, et c'est votre situation qui fixe le montant.

Si les parts sont inégales, par exemple une grande chambre payée plus cher, faites préciser la vôtre par écrit dans le bail ou dans une annexe signée par tous. C'est le chiffre que vous déclarerez. Le simulateur de la Caf vous donne ensuite une estimation pour votre cas.

L'APL ne paie rien des sommes de l'entrée. En colocation, le dépôt de garantie est réparti entre chaque colocataire : prévoyez votre quote-part, ou voyez les [aides pour le dépôt de garantie](/blog/aide-depot-de-garantie). Son montant et ses règles sont dans le guide du [dépôt de garantie](/guides/depot-de-garantie).

## Bail unique ou bail individuel : lequel pour toucher l'APL ? {#bail}
Les deux ouvrent le droit à l'aide, aux mêmes conditions. Avec un bail unique, tous les colocataires signent le même contrat, et chacun fait quand même sa demande de son côté. Avec un bail individuel, chacun signe son contrat avec le propriétaire, qui précise la chambre dont il a l'usage privatif et les pièces communes.

Le choix compte surtout pour ce que vous devez si un colocataire ne paie pas, avec la clause de solidarité du bail unique : l'article sur le [bail unique ou individuel](/blog/colocation-bail-unique-ou-individuel) le détaille. Pour l'aide, retenez seulement que votre part de loyer doit être lisible, dans un cas comme dans l'autre.

## Que se passe-t-il si votre nom n'est pas sur le bail ? {#nom-sur-le-bail}
Vous n'êtes pas colocataire, même si vous payez une partie du loyer. Service-public le dit sans détour : un occupant qui ne signe pas le bail n'a pas de droit sur le logement. Et la Caf demande que chaque colocataire ait son nom sur le bail. Avant de verser votre part, demandez donc à signer, ou un avenant qui vous ajoute.

C'est la situation des colocations où « un seul locataire réel » a signé et sous-loue des chambres. Dans ce cas, vous êtes sous-locataire, avec d'autres règles pour l'aide et un accord du propriétaire à vérifier : voyez l'article sur la [sous-location](/blog/sous-location-legale-sous-locataire) avant de payer quoi que ce soit.

## Quelle surface faut-il pour l'APL en colocation ? {#surface}
Le logement doit être décent et faire au moins 16 m² pour deux colocataires, puis 9 m² de plus pour chaque colocataire supplémentaire. Une colocation à trois demande donc au moins 25 m², une colocation à quatre au moins 34 m². En dessous, l'aide peut être refusée à tous, même si chaque chambre semble correcte.

Avec des baux individuels, chaque chambre doit en plus respecter les règles de décence, détaillées dans l'article sur la [surface minimum d'une location](/blog/surface-minimum-location). Demandez la surface habitable avant de signer, et comparez-la au nombre de colocataires prévu : l'annonce d'une « grande colocation » dans un petit appartement est un signal à vérifier.

## Un couple qui loue ensemble est-il en colocation ? {#couple}
Non, s'il est marié ou pacsé au moment de la signature du bail : la location d'un logement à un seul couple n'est pas une colocation. Les règles de la colocation, une part de loyer pour chacun, ne s'appliquent donc pas. Pour l'aide, la Caf compte vos ressources et celles de la personne avec laquelle vous vivez en couple.

Déclarez donc dans la demande votre situation de couple telle qu'elle est (mariage, Pacs ou concubinage), puisque ce sont les ressources du couple qui comptent. La question du nom sur le bail, elle, est traitée dans l'article [bail en couple : un ou deux noms](/blog/bail-couple-un-ou-deux-noms).

## Peut-on toucher l'APL si le logement appartient à vos parents ? {#parents}
Non, si le propriétaire est votre père, votre mère, un grand-parent, ou un ascendant de votre conjoint ou partenaire de Pacs. La règle tient au lien entre vous et le propriétaire, en colocation comme ailleurs : vos colocataires sans lien de famille avec lui ne sont pas visés. Un frère, une sœur, un oncle ou une tante propriétaire n'empêche pas l'aide.

Si l'appartement familial est loué à plusieurs amis, chacun fait donc sa demande, et la vôtre sera refusée pour ce lien de parenté. Mieux vaut le savoir avant de fixer les parts : le loyer que vous paierez sera votre loyer réel, sans aide.

## Étudiant en colocation : que change l'APL pour vos parents ? {#etudiant}
Un étudiant peut toucher l'APL dans une colocation comme dans un studio, avec ses propres ressources (salaire, bourse). En contrepartie, vos parents ne reçoivent plus de prestations familiales vous concernant dès que vous bénéficiez de l'aide. Vous pouvez en revanche rester rattaché au foyer fiscal de vos parents.

Faites le calcul en famille avant la demande : l'aide va dans votre budget, les prestations perdues dans celui de vos parents. Pour le garant, la [garantie Visale](/guides/garantie-visale) s'ouvre aussi en colocation, comme l'explique l'article sur [Visale en colocation](/blog/visale-colocation).
`,
});
