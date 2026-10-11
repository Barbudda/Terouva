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
      "Sur un marché tendu, ce n'est pas toujours le meilleur dossier qui obtient la visite, c'est celui qui arrive tôt et qui se lit en dix secondes. Voici ce qui se joue vraiment dans un premier message.",
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
