import type { Guide } from "@/components/guides/CadreGuide";

/**
 * Catalogue des pages de contenu, source unique.
 *
 * Le plan du site, le flux RSS, les pages de rubrique et les pages elles-mêmes
 * lisent cette liste. Sans ça, on finit toujours par publier un guide qui
 * n'apparaît ni dans le sitemap ni dans le sommaire, et personne ne le voit.
 */

export const GUIDES: Guide[] = [
  {
    chemin: "/guides/dossier-de-location",
    sommaire: [
      { id: "ce-qui-peut-etre-demande", titre: "Ce qui peut être demandé" },
      { id: "ce-qui-est-interdit", titre: "Ce qui est interdit" },
      { id: "refuser", titre: "Refuser sans perdre le logement" },
      { id: "preparer", titre: "Préparer un dossier qui passe" },
      { id: "apres-refus", titre: "Après un refus" },
    ],
    titre: "Dossier de location : la liste exacte des pièces qu'on peut vous demander",
    titreSeo: "Dossier de location : les pièces autorisées",
    resume:
      "Un propriétaire n'a pas le droit de demander ce qu'il veut. La liste est fixée par décret, elle est limitative, et tout ce qui n'y figure pas peut être refusé sans que votre candidature en souffre légalement.",
    description:
      "La liste officielle des justificatifs qu'un propriétaire peut exiger, ceux qui sont interdits, et la sanction. Sources : service-public et Légifrance.",
    publieLe: "2026-10-11",
    lecture: 7,
    sources: [
      {
        nom: "Service-public.gouv.fr · Quels documents le propriétaire peut-il demander au futur locataire ?",
        url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169",
      },
      {
        nom: "Légifrance · Décret n° 2015-1437 du 5 novembre 2015",
        url: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000031444493",
      },
      {
        nom: "Légifrance · Article 22-2 de la loi n° 89-462 du 6 juillet 1989",
        url: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000022962988",
      },
    ],
    questions: [
      {
        q: "Quels documents faut-il pour louer un appartement ?",
        a: "Quatre catégories, et rien d'autre : une pièce d'identité, un justificatif de domicile, un justificatif de situation professionnelle et un justificatif de ressources. Le décret du 5 novembre 2015 en fixe la liste pour chaque catégorie, et cette liste est limitative : un document qui n'y figure pas peut être refusé.",
      },
      {
        q: "Que mettre dans un dossier de location ?",
        a: "Les pièces des quatre catégories autorisées, dans l'ordre, en un seul fichier lisible. Ajoutez celles de votre garant s'il y en a un : sa liste est différente de la vôtre. N'ajoutez rien de plus, même pour bien faire : un document interdit met le propriétaire en faute, pas vous en avance.",
      },
      {
        q: "Un propriétaire peut-il demander mon RIB avant la signature du bail ?",
        a: "Le RIB ne figure pas dans la liste des pièces autorisées par le décret du 5 novembre 2015. Comme cette liste est limitative, vous pouvez refuser de le fournir avant la signature. Il devient normal de le donner ensuite, pour le paiement du loyer.",
      },
      {
        q: "Peut-on me demander mon avis d'imposition et mes fiches de paie en même temps ?",
        a: "Oui. Dans la catégorie des ressources, le propriétaire peut demander un ou plusieurs documents de la liste : avis d'imposition, trois dernières fiches de paie, attestation de simulation d'aide au logement, et d'autres selon votre situation.",
      },
      {
        q: "Que risque un propriétaire qui demande un document interdit ?",
        a: "Une amende pouvant aller jusqu'à 3 000 € pour un particulier et 15 000 € pour une société, agence comprise.",
      },
      {
        q: "Faut-il envoyer tout le dossier dès le premier message ?",
        a: "Non. Dites qu'il est complet et prêt à être transmis, puis envoyez-le dès que le propriétaire répond. Un premier message court obtient davantage de réponses qu'un envoi massif de pièces jointes.",
      },
      {
        q: "Comment faire un bon dossier de location ?",
        a: "Complet, lisible et prêt avant de commencer à visiter. Un seul fichier PDF nommé clairement, les pièces dans l'ordre des quatre catégories, aucune page floue ou tronquée, et les documents du garant réunis en même temps que les vôtres. Ce qui fait la différence, c'est le délai : un dossier envoyé dans l'heure passe devant un meilleur dossier envoyé le lendemain.",
      },
    ],
  },
  {
    chemin: "/guides/garantie-visale",
    sommaire: [
      { id: "principe", titre: "Ce que c'est" },
      { id: "qui", titre: "Qui peut l'obtenir" },
      { id: "plafonds", titre: "Les plafonds de loyer" },
      { id: "demarche", titre: "La démarche" },
      { id: "duree", titre: "Combien de temps elle dure" },
      { id: "utiliser", titre: "S'en servir dans une candidature" },
    ],
    titre: "Garantie Visale : qui peut l'avoir, et comment l'obtenir avant de visiter",
    titreSeo: "Garantie Visale : conditions et démarche",
    resume:
      "C'est une caution gratuite, accordée par Action Logement, qui remplace un garant physique. Elle se demande avant d'avoir trouvé le logement, et c'est précisément ce qui la rend utile.",
    description:
      "Qui peut obtenir la garantie Visale, les plafonds de loyer, ce qu'elle couvre, et comment recevoir son visa avant même de visiter.",
    publieLe: "2026-10-11",
    lecture: 6,
    sources: [
      {
        nom: "Service-public.gouv.fr · Garantie Visale",
        url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F33453",
      },
      {
        nom: "Action Logement · Simulateur d'éligibilité Visale",
        url: "https://site.actionlogement.fr/eligibilite-visale",
      },
      { nom: "Visale.fr", url: "https://www.visale.fr/" },
    ],
    questions: [
      {
        q: "La garantie Visale est-elle payante ?",
        a: "Non. Elle est gratuite pour le locataire comme pour le propriétaire. Action Logement se porte caution et se retourne ensuite vers le locataire en cas d'impayé.",
      },
      {
        q: "Peut-on demander Visale sans avoir encore trouvé de logement ?",
        a: "Oui, et c'est tout l'intérêt. Vous obtenez un visa valable, que vous présentez ensuite au propriétaire. Sans cela, il faut faire la démarche entre la visite et la signature, au moment où tout va vite.",
      },
      {
        q: "Un propriétaire peut-il refuser la garantie Visale ?",
        a: "Oui, rien ne l'oblige à l'accepter. En pratique, le refus vient souvent d'une méconnaissance du dispositif : il est utile d'expliquer que la caution est portée par Action Logement et qu'elle couvre les impayés pendant les trois premières années du bail.",
      },
      {
        q: "Combien de temps faut-il pour obtenir le visa ?",
        a: "Quelques jours ouvrés après le dépôt du dossier complet sur visale.fr, selon Service-public.",
      },
    ],
  },
  {
    chemin: "/guides/repondre-a-une-annonce-de-location",
    sommaire: [
      { id: "ordre", titre: "Les six informations qui comptent" },
      { id: "modele", titre: "Un modèle complet" },
      { id: "ne-pas-faire", titre: "Ce qui vous dessert" },
      { id: "rapidite", titre: "L'heure d'envoi" },
      { id: "apres", titre: "Après l'envoi" },
    ],
    titre: "Répondre à une annonce de location : ce qui fait la différence",
    sources: [
      { nom: "PAP.fr · Comment convaincre un propriétaire de vous choisir", url: "https://www.pap.fr/locataire/constituer-dossier/locataire-comment-convaincre-un-proprietaire-de-vous-choisir/a19746" },
      { nom: "Vestae · Sélectionner un locataire : critères légaux et bons réflexes", url: "https://vestae.fr/selectionner-locataire-criteres-legaux-bons-reflexes/" },
      { nom: "La Parisienne Immobilière · Sélection du locataire", url: "https://laparisienneimmobiliere.fr/selection-locataire/" },
    ],
    titreSeo: "Répondre à une annonce de location",
    resume:
      "Sur un marché tendu, la visite va souvent au dossier qui arrive tôt et se lit en dix secondes, pas au meilleur dossier. Voici ce qui se joue vraiment dans un premier message.",
    description:
      "Comment écrire un message de candidature pour une location : quoi mettre, dans quel ordre, ce qui dessert, et un modèle gratuit à copier.",
    publieLe: "2026-10-11",
    lecture: 6,
    questions: [
      {
        q: "Quelle longueur pour un message de candidature ?",
        a: "Cinq à sept lignes. Un propriétaire qui reçoit des dizaines de réponses lit les premières lignes de chacune. Tout ce qui dépasse l'écran du téléphone ne sera pas lu.",
      },
      {
        q: "Faut-il joindre son dossier dès le premier message ?",
        a: "Non. Dites qu'il est complet et prêt à être transmis. Les pièces jointes ralentissent la lecture, et certaines messageries les filtrent. Vous enverrez le dossier dès que le contact est établi.",
      },
      {
        q: "Faut-il décrire le logement pour montrer qu'on a lu l'annonce ?",
        a: "Non. La personne qui reçoit le message a écrit l'annonce : lui répéter la surface, le loyer et le quartier ne prouve rien. Une phrase sur ce qui vous a plu suffit, et sonne plus juste.",
      },
      {
        q: "Combien de temps après la publication faut-il répondre ?",
        a: "Le plus tôt possible. Sur les annonces de particuliers dans les zones tendues, les premières réponses sont lues avec attention et les suivantes en diagonale. C'est le seul facteur sur lequel vous pouvez agir sans changer de dossier.",
      },
    ],
  },
  {
    chemin: "/guides/depot-de-garantie",
    sommaire: [
      { id: "montant", titre: "Le montant maximum" },
      { id: "versement", titre: "Quand on le verse" },
      { id: "retenues", titre: "Ce qui peut être retenu" },
      { id: "restitution", titre: "Le délai de restitution" },
      { id: "retard", titre: "Si le propriétaire tarde" },
      { id: "recuperer", titre: "Le récupérer" },
    ],
    titre: "Dépôt de garantie : le montant, les retenues, et le délai pour le récupérer",
    titreSeo: "Dépôt de garantie : montant et restitution",
    resume:
      "C'est la somme la plus souvent mal rendue de toute la location. Le montant est plafonné, les retenues doivent être justifiées pièce par pièce, et le retard du propriétaire se paie. Les trois règles qui comptent tiennent en une page.",
    description:
      "Un mois de loyer en vide, deux en meublé, rendu sous un mois si l'état des lieux est conforme. Les retenues autorisées, et la pénalité en cas de retard.",
    publieLe: "2026-10-19",
    lecture: 6,
    sources: [
      {
        nom: "Service-public.gouv.fr · Dépôt de garantie d'un logement loué",
        url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F31269",
      },
      {
        nom: "Légifrance · Article 22 de la loi n° 89-462 du 6 juillet 1989",
        url: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000031012092",
      },
      {
        nom: "Légifrance · Article 25-6 de la loi n° 89-462 (logements meublés)",
        url: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000029105417",
      },
    ],
    questions: [
      {
        q: "Quel est le montant maximum d'un dépôt de garantie ?",
        a: "Un mois de loyer hors charges pour un logement vide, deux mois pour un meublé. Aucun dépôt ne peut être demandé si le loyer est payé par trimestre d'avance, ni pour un bail mobilité.",
      },
      {
        q: "Le dépôt de garantie est-il encaissé ?",
        a: "Oui. Le propriétaire l'encaisse et le conserve pendant toute la durée du bail ; il n'est pas bloqué sur un compte dédié et ne produit aucun intérêt pour vous. Il vous est restitué après l'état des lieux de sortie, diminué des sommes qu'il est en droit de retenir.",
      },
      {
        q: "Quand faut-il payer le dépôt de garantie ?",
        a: "À la signature du bail, et son montant doit y être écrit. Un propriétaire qui le réclame avant la signature, pour « réserver » le logement, sort du cadre : à ce stade, rien ne vous engage et rien ne l'engage.",
      },
      {
        q: "Peut-on payer le dépôt de garantie en plusieurs fois ?",
        a: "La loi ne prévoit pas d'échelonnement : cela se négocie avec le propriétaire, qui n'a pas à accepter. En revanche, l'avance Loca-Pass d'Action Logement prête jusqu'à 1 200 €, sans intérêts ni frais de dossier, remboursables sur 25 mois au maximum. La demande se fait en ligne, dans les deux mois suivant l'entrée dans le logement.",
      },
      {
        q: "Quel est le délai pour récupérer son dépôt de garantie ?",
        a: "Un mois après la remise des clés si l'état des lieux de sortie est conforme à celui d'entrée, deux mois s'il ne l'est pas. Le délai court à partir de la remise des clés, en main propre ou par lettre recommandée.",
      },
      {
        q: "Que se passe-t-il si le propriétaire ne rend pas le dépôt à temps ?",
        a: "La somme due augmente de 10 % du loyer mensuel hors charges par mois de retard commencé. Cette majoration ne s'applique pas si vous n'avez pas communiqué votre nouvelle adresse.",
      },
      {
        q: "Le dépôt de garantie peut-il servir à payer le dernier mois de loyer ?",
        a: "Non. Le dépôt ne peut pas être utilisé pour régler le dernier loyer : il doit être payé normalement, et le dépôt vous est restitué ensuite, après l'état des lieux de sortie.",
      },
      {
        q: "Comment récupérer son dépôt de garantie ?",
        a: "D'abord une lettre recommandée avec accusé de réception qui réclame la somme, rappelle la date de remise des clés et calcule la majoration de retard. En dessous de 5 000 €, une tentative de règlement amiable est ensuite obligatoire, et gratuite : conciliateur de justice, commission départementale de conciliation ou médiateur. Le tribunal vient en dernier. Vous avez trois ans à compter du jour où le dépôt était dû.",
      },
    ],
  },
  {
    chemin: "/guides/garant-caution",
    sommaire: [
      { id: "qui", titre: "Qui peut se porter garant" },
      { id: "simple-ou-solidaire", titre: "Caution simple ou solidaire" },
      { id: "acte", titre: "L'acte de cautionnement" },
      { id: "justificatifs", titre: "Les justificatifs du garant" },
      { id: "cumul", titre: "Garant et assurance" },
      { id: "fin", titre: "Jusqu'à quand il s'engage" },
      { id: "sans-garant", titre: "Louer sans garant" },
    ],
    titre: "Garant de location : qui peut s'engager, pour combien, et jusqu'à quand",
    // « garant location » pèse 2 900 recherches par mois en France, « acte de
    // cautionnement » autant pour une difficulté plus basse. Le titre portait
    // « garant » sans « location » : il ratait la requête de peu.
    titreSeo: "Garant de location : qui peut l'être",
    resume:
      "Un garant ne signe pas une formalité : il s'engage sur une dette qui peut courir des années après votre départ. Ce que l'acte doit contenir, ce qu'on peut lui demander, et quand son engagement s'arrête vraiment.",
    description:
      "Qui peut se porter garant d'une location, ce que contient l'acte de cautionnement, les documents exigibles, et comment louer sans garant.",
    publieLe: "2026-10-19",
    lecture: 8,
    sources: [
      {
        nom: "Service-public.gouv.fr · Caution d'un locataire ou d'un colocataire",
        url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F31267",
      },
      {
        nom: "Service-public.gouv.fr · Quels documents le propriétaire peut-il demander ?",
        url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169",
      },
      {
        nom: "Légifrance · Article 22-1 de la loi n° 89-462 du 6 juillet 1989",
        url: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000037670636",
      },
      {
        nom: "Légifrance · Décret n° 2015-1437 du 5 novembre 2015",
        url: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000031444493",
      },
    ],
    questions: [
      {
        q: "Qui peut se porter garant pour une location ?",
        a: "N'importe quelle personne physique, parent, proche ou ami, sans condition de lien de famille. Une personne morale aussi : Action Logement avec la garantie Visale, un employeur, une banque.",
      },
      {
        q: "Un propriétaire peut-il demander un garant s'il a déjà une assurance loyers impayés ?",
        a: "Un propriétaire particulier qui a souscrit une assurance contre les risques locatifs ne peut demander une caution que si le locataire est étudiant ou apprenti. Un bailleur personne morale ne peut pas demander de caution à un étudiant boursier de l'enseignement supérieur.",
      },
      {
        q: "Comment trouver un garant pour une location ?",
        a: "Dans l'ordre de ce qui aboutit le plus souvent : un proche, qui n'a pas besoin d'être de votre famille ni propriétaire ; la garantie Visale d'Action Logement, gratuite, qui se demande avant d'avoir trouvé le logement ; votre employeur ou votre banque ; enfin les sociétés de cautionnement privées, qui facturent un pourcentage du loyer annuel.",
      },
      {
        q: "Quels documents doit fournir un garant pour une location ?",
        a: "Quatre catégories : une pièce d'identité, un justificatif de domicile, un justificatif de situation professionnelle et un justificatif de ressources. La liste précise est fixée par le décret du 5 novembre 2015, elle est limitative, et elle n'est pas la même que celle du locataire : le garant ne peut pas fournir d'attestation d'hébergement, ni d'avis d'attribution de bourse.",
      },
      {
        q: "Combien doit gagner un garant pour une location ?",
        a: "Aucun texte ne fixe de seuil. L'usage des propriétaires et des agences est de demander un revenu d'environ trois fois le loyer charges comprises, mais c'est une pratique, pas une règle de droit : vous pouvez la discuter, et un garant qui gagne moins peut être accepté. Ce que la loi encadre, ce sont les documents qui peuvent servir à le vérifier.",
      },
      {
        q: "Peut-on avoir deux garants pour une location ?",
        a: "Oui, rien ne l'interdit, et c'est fréquent quand deux parents se portent caution ensemble. Chacun signe son propre acte de cautionnement et fournit ses propres justificatifs. Attention à ce que l'acte précise : selon sa rédaction, chaque garant peut devoir la totalité de la dette, et pas la moitié.",
      },
      {
        q: "Peut-on louer sans garant ?",
        a: "Oui, et c'est le cas le plus fréquent une fois passé le premier logement. Trois voies : la garantie Visale d'Action Logement, gratuite et demandée avant de visiter ; un propriétaire qui souscrit lui-même une assurance contre les loyers impayés, auquel cas il ne peut plus exiger de caution sauf d'un étudiant ou d'un apprenti ; une société de cautionnement privée, payante, qui se porte garant à la place d'un proche.",
      },
      {
        q: "Faut-il obligatoirement un garant pour louer ?",
        a: "Non, aucune loi ne l'impose. C'est le propriétaire qui décide d'en demander un ou non, et il ne peut pas toujours : s'il a déjà une assurance contre les loyers impayés, il ne peut exiger une caution que d'un étudiant ou d'un apprenti.",
      },
      {
        q: "Peut-on arrêter d'être garant d'une location ?",
        a: "Si l'acte indique une durée, non : la caution va au bout. S'il n'en indique aucune, elle peut résilier à tout moment par lettre recommandée, mais la résiliation ne prend effet qu'à l'expiration du bail en cours, et elle reste tenue des dettes nées pendant ce bail. L'engagement s'arrête de lui-même à la fin du préavis du locataire, ou six mois après en colocation avec clause de solidarité.",
      },
    ],
  },
  {
    chemin: "/guides/refus-de-dossier",
    sommaire: [
      { id: "principe", titre: "Le principe" },
      { id: "interdits", titre: "Les critères interdits" },
      { id: "legitimes", titre: "Ce qui reste légitime" },
      { id: "preuve", titre: "La charge de la preuve" },
      { id: "sanctions", titre: "Les sanctions" },
      { id: "recours", titre: "Où signaler" },
    ],
    titre: "Un propriétaire peut-il refuser votre dossier sans donner de motif ?",
    titreSeo: "Refus de dossier : ce qui est permis",
    resume:
      "Oui, il choisit son locataire, et il n'a pas à se justifier. Mais la liste des raisons qui lui sont interdites est longue, et quand un refus semble en relever, c'est à lui de prouver le contraire.",
    description:
      "Un propriétaire choisit son locataire, mais pas sur n'importe quel critère. Les motifs interdits, la charge de la preuve, les sanctions, et où signaler.",
    publieLe: "2026-10-19",
    lecture: 7,
    sources: [
      {
        nom: "Service-public.gouv.fr · Discrimination à la location d'un logement",
        url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14750",
      },
      {
        nom: "Légifrance · Articles 225-1 à 225-4 du Code pénal",
        url: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070719/LEGISCTA000006165298",
      },
      {
        nom: "Légifrance · Article 1er de la loi n° 89-462 du 6 juillet 1989",
        url: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000037670637",
      },
      {
        nom: "Défenseur des droits · Discriminations à la location de logement",
        url: "https://www.defenseurdesdroits.fr/discriminations-la-location-de-logement-338",
      },
    ],
    questions: [
      {
        q: "Un propriétaire doit-il justifier le refus de mon dossier ?",
        a: "Non. Il choisit librement son locataire et n'a aucune obligation de motiver un refus. La loi n'exige aucune explication de sa part ; elle lui interdit seulement de fonder sa décision sur un critère discriminatoire.",
      },
      {
        q: "Quels critères de refus sont interdits ?",
        a: "L'article 225-1 du Code pénal en liste une vingtaine, parmi lesquels l'origine, le sexe, la situation de famille, la grossesse, l'apparence physique, la vulnérabilité économique, le nom, le lieu de résidence, l'état de santé, le handicap, les mœurs, l'orientation sexuelle, l'âge, les opinions politiques, les activités syndicales, la langue parlée et la religion.",
      },
      {
        q: "Qui doit prouver qu'il y a eu discrimination ?",
        a: "Vous réunissez d'abord des éléments datés qui laissent supposer un motif interdit : messages, courriels, captures d'écran, témoignages. C'est ensuite au propriétaire de démontrer que sa décision repose sur des éléments objectifs, étrangers à toute discrimination.",
      },
      {
        q: "Que risque un propriétaire qui refuse un dossier pour un motif interdit ?",
        a: "Jusqu'à trois ans d'emprisonnement et 45 000 € d'amende. Par ailleurs, demander une pièce qui ne figure pas dans la liste autorisée est passible d'une amende pouvant aller jusqu'à 3 000 € pour un particulier.",
      },
    ],
  },
];

export function guide(chemin: string): Guide {
  const g = GUIDES.find((x) => x.chemin === chemin);
  if (!g) throw new Error(`Guide absent du catalogue : ${chemin}`);
  return g;
}

export type Outil = {
  chemin: string;
  titre: string;
  /** Titre pour les moteurs : 60 signes maximum, suffixe « · Terouva » compris. */
  titreSeo: string;
  /** Titre court, pour les listes et la navigation. */
  court: string;
  resume: string;
  description: string;
};

export const OUTILS: Outil[] = [
  {
    chemin: "/outils/dossier-de-location",
    titre: "Checklist de dossier de location, selon votre situation",
    // « checklist dossier location » n'est tapé par personne ; « quels
    // documents pour louer un appartement » l'est 480 fois par mois, et c'est
    // exactement la question à laquelle l'outil répond.
    titreSeo: "Quels documents pour louer un appartement",
    court: "Checklist de dossier",
    resume:
      "La liste exacte des pièces à réunir pour votre situation, et celles qu'on n'a pas le droit de vous demander.",
    description:
      "Trois questions, et vous obtenez la liste des pièces de votre dossier de location, plus celles qui sont interdites. Gratuit, sans inscription.",
  },
  {
    chemin: "/outils/message-de-candidature",
    titre: "Générateur de message de candidature pour une location",
    titreSeo: "Générateur de message de candidature",
    court: "Message de candidature",
    resume:
      "Le message qui accompagne votre dossier, écrit en une minute. Trois tons, six formulations, rien d'envoyé nulle part.",
    description:
      "Écrivez le message qui accompagne votre dossier de location. Gratuit, sans inscription, trois tons. Rien n'est envoyé : tout reste dans votre navigateur.",
  },
];
