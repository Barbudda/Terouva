/**
 * Annonces et messages d'exemple montrés sur la page d'accueil.
 *
 * Rien n'est inventé pour l'effet : ce sont les six annonces de la
 * démonstration, leurs notes calculées par `scoreListing` et leurs messages
 * écrits par `generateMessage`, recopiés tels quels. Si le moteur change, ces
 * valeurs doivent être régénérées, sinon la page promet autre chose que le
 * produit. Le profil est celui de la démonstration (Camille Martin, infirmière,
 * recherche un 2 pièces à Lyon sous 950 €, avec balcon et ascenseur).
 */

export type AnnonceExemple = {
  titre: string;
  prix: number;
  surface: number;
  ville: string;
  note: number;
  /** Fraîcheur affichée, comme sur une liste d'annonces réelle. */
  publie: string;
  /** Particulier ou agence : ça pèse dans la note. */
  auteur: string;
  /** Ce qui a fait monter ou descendre la note, en clair. */
  pour?: string;
  contre?: string;
};

/** Du plus pertinent au moins pertinent, comme Terouva les classe. */
export const ANNONCES: AnnonceExemple[] = [
  {
    titre: "T2 lumineux avec balcon, Croix-Rousse",
    prix: 890,
    surface: 42,
    ville: "Lyon 4e",
    note: 96,
    publie: "il y a 3 min",
    auteur: "Particulier",
    pour: "Balcon, ascenseur, publiée à l'instant",
  },
  {
    titre: "2 pièces rénové, Guillotière",
    prix: 845,
    surface: 40,
    ville: "Lyon 7e",
    note: 96,
    publie: "il y a 2 min",
    auteur: "Particulier",
    pour: "Sous votre budget, balcon, ascenseur",
  },
  {
    titre: "2 pièces proche Part-Dieu",
    prix: 930,
    surface: 38,
    ville: "Lyon 3e",
    note: 66,
    publie: "il y a 1 h",
    auteur: "Agence",
    pour: "Dans le budget, bonne surface",
    contre: "Ni balcon ni ascenseur",
  },
  {
    titre: "Grand studio avec cave, Monplaisir",
    prix: 760,
    surface: 34,
    ville: "Lyon 8e",
    note: 47,
    publie: "il y a 2 h",
    auteur: "Particulier",
    contre: "Une seule pièce, pas d'ascenseur",
  },
  {
    titre: "Studio meublé, Jean Macé",
    prix: 640,
    surface: 28,
    ville: "Lyon 7e",
    note: 14,
    publie: "il y a 8 min",
    auteur: "Particulier",
    contre: "Trop petit, meublé, une seule pièce",
  },
  {
    titre: "T3 au dernier étage, Villeurbanne",
    prix: 1080,
    surface: 61,
    ville: "Villeurbanne",
    note: 1,
    publie: "il y a 3 h",
    auteur: "Agence",
    contre: "Au-dessus du budget, hors de la ville visée",
  },
];

/** Les quatre premières suffisent à la scène d'accueil. */
export const ANNONCES_SCENE = ANNONCES.slice(0, 4);

export type MessageExemple = {
  /** L'annonce à laquelle ce message répond. */
  annonce: string;
  lieu: string;
  prix: number;
  note: number;
  ton: "Direct" | "Chaleureux" | "Professionnel";
  texte: string;
};

/**
 * Six brouillons produits par `generateMessage`, pour six situations
 * différentes : salariée, couple, ingénieure, alternant, fonctionnaire,
 * indépendant. Six profils et non un seul, parce qu'un même profil donnerait
 * six messages au milieu identique — ce que le ruban rendrait visible.
 *
 * Aucun ne récite l'annonce : ni surface, ni prix, ni quartier, ni code postal.
 * Chacun donne en revanche ce avec quoi un bailleur trie avant la visite : la
 * situation, les ressources, le garant, le nombre d'occupants, la date
 * d'emménagement, la durée envisagée et des créneaux de visite précis.
 */
export const MESSAGES: MessageExemple[] = [
  {
    annonce: "T2 lumineux avec balcon",
    lieu: "Croix-Rousse",
    prix: 890,
    note: 96,
    ton: "Direct",
    texte:
      "Bonjour,\n\nVotre annonce m'intéresse beaucoup, en particulier pour le balcon.\n\nJe suis infirmière en CDI. Mon revenu net est de 2 400 € par mois et je bénéficie de la garantie Visale. Mon dossier est complet.\n\nJe serais la seule personne à y vivre, et je peux emménager à partir du 1er décembre. Je cherche à m'installer durablement.\n\nPour la visite, je suis disponible en semaine après 18 h ou le samedi.\n\nCordialement,\nCamille Martin\n06 12 34 56 78",
  },
  {
    annonce: "2 pièces rénové",
    lieu: "Guillotière",
    prix: 845,
    note: 96,
    ton: "Chaleureux",
    texte:
      "Bonjour,\n\nJe viens de voir votre annonce et elle me plaît beaucoup, en particulier pour le calme.\n\nJe suis Yanis Benali, développeur en CDI, avec un revenu net de 3 100 € par mois. J'ai un garant : mes parents. Tous mes justificatifs sont prêts.\n\nNous serions 2 à y vivre, et nous pouvons emménager à partir du 15 novembre. Nous cherchons à nous installer pour au moins trois ans.\n\nPour la visite, je suis disponible le soir et le week-end.\n\nBien à vous,\nYanis Benali\n07 55 21 09 44",
  },
  {
    annonce: "2 pièces proche Part-Dieu",
    lieu: "Lyon 3e",
    prix: 930,
    note: 66,
    ton: "Professionnel",
    texte:
      "Madame, Monsieur,\n\nJe me permets de vous contacter au sujet de votre annonce, en particulier pour la rénovation.\n\nJe suis Awa Diop, ingénieure en CDI. Mon revenu net mensuel est de 3 600 €. Je bénéficie de la garantie Visale. L'ensemble des justificatifs (pièce d'identité, contrat de travail, bulletins de salaire, avis d'imposition) est prêt à vous être transmis.\n\nJe serais la seule personne à y vivre, et je peux emménager à partir du 5 janvier. Je cherche à m'installer durablement.\n\nPour la visite, je suis disponible en journée, du lundi au vendredi.\n\nCordialement,\nAwa Diop\n06 78 90 12 34\nawa.diop@exemple.fr",
  },
  {
    annonce: "T3 au dernier étage",
    lieu: "Villeurbanne",
    prix: 1080,
    note: 1,
    ton: "Direct",
    texte:
      "Bonjour,\n\nVotre annonce m'intéresse beaucoup, en particulier pour la terrasse.\n\nJe suis étudiant en alternance, avec un revenu net de 1 250 € par mois. J'ai un garant : mes parents. Tous mes justificatifs sont prêts.\n\nJe serais la seule personne à y vivre, et je peux emménager à partir du 2 novembre. Je cherche à m'installer pour au moins deux ans.\n\nPour la visite, je suis disponible le mercredi et le week-end.\n\nCordialement,\nLucas Deniel\n06 44 33 22 11",
  },
  {
    annonce: "Grand studio avec cave",
    lieu: "Monplaisir",
    prix: 760,
    note: 47,
    ton: "Chaleureux",
    texte:
      "Bonjour,\n\nJe viens de voir votre annonce et elle me plaît beaucoup, en particulier pour le cachet.\n\nJe cherche un logement calme pour préparer l'agrégation.\n\nJe suis Inès Mercier, professeure, fonctionnaire. Je gagne 2 250 € net par mois. Je bénéficie de la garantie Visale, et mon dossier est prêt à vous être envoyé.\n\nJe serais la seule personne à y vivre, et je peux emménager à partir du 15 décembre. Je cherche à m'installer durablement.\n\nPour la visite, je suis disponible en semaine après 17 h.\n\nBien à vous,\nInès Mercier\n07 11 22 33 44",
  },
  {
    annonce: "Studio meublé",
    lieu: "Jean Macé",
    prix: 640,
    note: 14,
    ton: "Professionnel",
    texte:
      "Bonjour,\n\nVotre annonce a retenu toute mon attention, en particulier pour la vue.\n\nJe suis Thomas Bastien, graphiste, indépendant. Mon revenu net est de 2 800 € par mois. J'ai un garant : une caution solidaire. L'ensemble des justificatifs (pièce d'identité, avis d'imposition, deux derniers bilans) est prêt à vous être transmis.\n\nNous serions 2 à y vivre, et nous pouvons emménager à partir du 1er décembre. Nous cherchons à nous installer pour au moins trois ans.\n\nPour la visite, je suis disponible en semaine, en fin de journée.\n\nCordialement,\nThomas Bastien\n06 90 80 70 60\nt.bastien@exemple.fr",
  },
];
