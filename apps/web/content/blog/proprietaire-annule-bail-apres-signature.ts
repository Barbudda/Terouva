import { article } from "@/lib/blog-format";

const F929 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F929";
const T929 = "Service-public.gouv.fr · Préavis et formalités du congé donné par le propriétaire (bailleur)";
const F31301 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F31301";
const T31301 = "Service-public.gouv.fr · Que faire en cas de litige lié à la location d'un logement ?";

export default article({
  slug: "proprietaire-annule-bail-apres-signature",
  titre: "Le propriétaire annule après la signature du bail : que faire ?",
  titreSeo: "Le propriétaire annule le bail signé : que faire ?",
  description:
    "Un bail signé engage aussi le propriétaire : les seuls cas où il peut y mettre fin, la preuve à garder, la lettre à envoyer et l'aide gratuite de l'ADIL.",
  chapeau:
    "Un changement d'avis ne suffit pas. Le bail signé engage le propriétaire autant que vous : il ne peut y mettre fin qu'à l'échéance, pour vendre, reprendre le logement ou un motif légitime et sérieux, avec un préavis. Gardez votre exemplaire signé, demandez par lettre recommandée la remise des clés, et consultez l'ADIL, gratuite.",
  publieLe: "2026-11-04",
  pilier: "A",
  format: "cas-pratique",
  guidePilier: "/guides/repondre-a-une-annonce-de-location",
  guidesLies: ["/guides/preavis-location", "/guides/depot-de-garantie"],
  statut: "publie",
  requete: "bail signé et propriétaire ne veut plus louer",
  faits: [
    {
      fait: "On ne peut pas se rétracter après avoir signé un bail d'habitation",
      valeur: "pas de rétractation après la signature",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1703",
      titreSource: "Service-public.gouv.fr · Peut-on se rétracter après avoir signé un bail d'habitation ?",
      releveLe: "2026-11-04",
      citation: "Non, il n'est pas possible de se rétracter après avoir signé un bail d'habitation",
    },
    {
      fait: "Le propriétaire ne donne congé que pour vendre ou reprendre le logement",
      valeur: "vendre ou reprendre le logement",
      source: F929,
      titreSource: T929,
      releveLe: "2026-11-04",
      citation: "le propriétaire ne peut le faire que pour vendre le logement, ou pour le reprendre (pour l'habiter ou pour y loger un proche)",
    },
    {
      fait: "Ou pour un motif légitime et sérieux, comme une faute du locataire",
      valeur: "motif légitime et sérieux",
      source: F929,
      titreSource: T929,
      releveLe: "2026-11-04",
      citation: "ou pour un motif légitime et sérieux (notamment en cas de faute du locataire)",
    },
    {
      fait: "Pour un logement vide, le congé doit parvenir au locataire au moins six mois avant l'échéance",
      valeur: "six mois",
      source: F929,
      titreSource: T929,
      releveLe: "2026-11-04",
      citation: "Pour que le congé soit valable, il faut que le locataire reçoive la lettre de congé au moins 6 mois avant la date",
    },
    {
      fait: "Avec un propriétaire particulier, le bail d'un logement vide dure au moins trois ans",
      valeur: "trois ans",
      source: "https://www.anil.org/votre-besoin/louer/type-de-location/location-vide/bail/",
      titreSource: "ANIL · Le bail de location, un document obligatoire",
      releveLe: "2026-11-04",
      citation: "Si le propriétaire est un particulier, la durée minimale du bail est de trois ans",
    },
    {
      fait: "La commission départementale de conciliation est gratuite",
      valeur: "conciliation gratuite",
      source: F31301,
      titreSource: T31301,
      releveLe: "2026-11-04",
      citation: "Soit la commission départementale de conciliation (démarche gratuite)",
    },
    {
      fait: "Le juge compétent est le juge des contentieux de la protection",
      valeur: "juge des contentieux de la protection",
      source: F31301,
      titreSource: T31301,
      releveLe: "2026-11-04",
      citation: "vous devez saisir le juge des contentieux de la protection du tribunal dont dépend le logement loué",
    },
    {
      fait: "Les ADIL informent gratuitement sur les droits et obligations en matière de logement",
      valeur: "conseil gratuit de l'ADIL",
      source: "https://www.anil.org/lanil-et-les-adil/votre-adil/",
      titreSource: "ANIL · Votre ADIL",
      releveLe: "2026-11-04",
      citation: "pour mission d'informer gratuitement les usagers sur leurs droits et obligations",
    },
  ],
  corps: `
Le cas type : vous avez signé le bail d'un deux-pièces le 2, l'entrée est prévue le 15. Le 10, le propriétaire vous écrit qu'il a « changé d'avis », qu'il préfère loger un proche ou qu'il a trouvé un autre locataire. Vous avez donné congé de votre logement actuel. Voici ce que vaut votre bail, et ce que vous pouvez faire.

## Le propriétaire peut-il annuler un bail déjà signé ? {#annuler}
Non, pas de lui-même. Service-public le rappelle : il n'est pas possible de se rétracter après avoir signé un bail d'habitation, et la règle vaut pour le propriétaire comme pour vous. Il ne peut mettre fin au bail qu'à son échéance et pour des motifs précis, ou à la suite d'un manquement grave du locataire, comme des loyers impayés. Un changement d'avis n'en fait pas partie.

Le bail produit donc ses effets à la date prévue : vous êtes locataire, et le propriétaire doit vous remettre les clés. Si c'est vous qui voulez sortir du bail, la situation est différente, et l'article [se rétracter après la signature du bail](/blog/se-retracter-apres-signature-bail) l'explique.

## Dans quels cas le propriétaire peut-il mettre fin au bail ? {#cas}
Pour la date d'échéance du bail, et pour trois motifs seulement : vendre le logement, le reprendre pour l'habiter ou y loger un proche, ou un motif légitime et sérieux, notamment une faute du locataire. Pour un logement vide, la lettre de congé doit vous parvenir au moins six mois avant cette échéance, qui arrive au bout de trois ans avec un propriétaire particulier.

Autrement dit, vouloir loger un proche est un motif possible, mais seulement à l'échéance du bail et avec un préavis, jamais quelques jours après la signature. Les règles du congé, côté locataire comme côté propriétaire, sont réunies dans le guide du [préavis de location](/guides/preavis-location).

## Et si c'est l'agence qui annule le bail ? {#agence}
La réponse est la même. L'agence agit au nom du propriétaire : le bail qu'elle vous a fait signer engage le propriétaire comme s'il l'avait signé lui-même. Demandez à l'agence, par écrit, qui a pris la décision et pour quel motif, et adressez aussi votre courrier au propriétaire, dont le nom et l'adresse figurent sur le bail.

Une agence qui invoque un « dossier finalement refusé » après la signature ne change rien : le choix du locataire se fait avant le bail, pas après.

## Quelle preuve garder, et quelle lettre envoyer ? {#preuve}
Votre exemplaire du bail signé d'abord : il prouve l'accord, la date d'effet et le loyer. Ajoutez les messages où le propriétaire annonce l'annulation, et la preuve de ce que vous avez payé, comme le dépôt de garantie. Puis envoyez une lettre recommandée avec accusé de réception qui rappelle la date de signature et demande la remise des clés à la date prévue.

La lettre reste factuelle : « Nous avons signé le bail du logement situé au [adresse] le [date], avec une prise d'effet au [date]. Je vous demande de me remettre les clés à cette date, comme le prévoit le bail. » Joignez une copie du bail, jamais l'original.

## Vers qui se tourner si le propriétaire maintient son refus ? {#recours}
L'ADIL de votre département d'abord : ses conseillers ont pour mission d'informer gratuitement les usagers sur leurs droits et obligations, et peuvent relire votre bail avec vous. Si le désaccord dure, service-public décrit la suite : une démarche amiable, par exemple devant la commission départementale de conciliation, gratuite, puis le juge des contentieux de la protection du tribunal dont dépend le logement.

Devant le juge, vous pouvez demander que le bail soit exécuté, ou réparation de ce que l'annulation vous coûte : nuits d'hôtel, garde-meubles, double loyer. Gardez chaque facture. Et continuez à chercher en parallèle : une procédure prend du temps, et un logement trouvé entre-temps limite le dommage. Si vous avez versé un dépôt de garantie et que vous renoncez au logement d'un commun accord, faites écrire son remboursement : le guide du [dépôt de garantie](/guides/depot-de-garantie) rappelle les règles.

## Comment éviter d'en arriver là ? {#eviter}
Signez un bail complet, en un exemplaire pour chacun, et gardez le vôtre. Le jour de la signature, convenez par écrit de l'heure de la remise des clés et de l'état des lieux. Tant que vous n'avez pas les clés, attendez avant de rendre votre logement actuel si votre préavis le permet, ou gardez une solution de repli pour quelques nuits.

Pour la méthode complète, de la réponse à l'annonce jusqu'à la signature, le guide pour [répondre à une annonce de location](/guides/repondre-a-une-annonce-de-location) reprend chaque étape.
`,
});
