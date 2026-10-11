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
 * Six brouillons produits par `generateMessage`, un par annonce, dans les trois
 * tons et six variantes différentes.
 *
 * Aucun ne récite l'annonce : ni surface, ni prix, ni quartier, ni code postal.
 * La personne qui reçoit le message a écrit l'annonce ; lui répéter sa fiche ne
 * prouve rien et sent le texte fabriqué. Ce sont des brouillons : c'est
 * toujours l'utilisateur qui relit, qui colle et qui envoie.
 */
export const MESSAGES: MessageExemple[] = [
  {
    annonce: "T2 lumineux avec balcon",
    lieu: "Croix-Rousse",
    prix: 890,
    note: 96,
    ton: "Direct",
    texte:
      "Bonjour,\n\nVotre annonce m'intéresse beaucoup, en particulier pour le balcon.\n\nJe suis infirmière en CDI. Mon revenu net est de 2 400 € par mois et je bénéficie de la garantie Visale. Mon dossier est complet.\n\nJe peux visiter dès que vous le souhaitez.\n\nCordialement,\nCamille Martin\n06 12 34 56 78",
  },
  {
    annonce: "2 pièces rénové",
    lieu: "Guillotière",
    prix: 845,
    note: 96,
    ton: "Chaleureux",
    texte:
      "Bonjour,\n\nJe viens de voir votre annonce et elle me plaît beaucoup, en particulier pour le balcon.\n\nJe suis Camille Martin, infirmière en CDI, avec un revenu net de 2 400 € par mois. Je bénéficie de la garantie Visale et tous mes justificatifs sont prêts.\n\nJe peux me rendre disponible facilement pour une visite, dites-moi ce qui vous convient.\n\nBien à vous,\nCamille Martin\n06 12 34 56 78",
  },
  {
    annonce: "2 pièces proche Part-Dieu",
    lieu: "Lyon 3e",
    prix: 930,
    note: 66,
    ton: "Professionnel",
    texte:
      "Madame, Monsieur,\n\nJe me permets de vous contacter au sujet de votre annonce.\n\nJe suis Camille Martin, infirmière en CDI. Mon revenu net mensuel est de 2 400 €. Je bénéficie de la garantie Visale. L'ensemble des justificatifs (pièce d'identité, contrat de travail, bulletins de salaire, avis d'imposition) est prêt à vous être transmis.\n\nJe me tiens à votre disposition pour organiser une visite.\n\nCordialement,\nCamille Martin\n06 12 34 56 78",
  },
  {
    annonce: "T3 au dernier étage",
    lieu: "Villeurbanne",
    prix: 1080,
    note: 1,
    ton: "Direct",
    texte:
      "Bonjour,\n\nVotre annonce m'intéresse beaucoup.\n\nJe suis infirmière en CDI, avec un revenu net de 2 400 € par mois. Je bénéficie de la garantie Visale et tous mes justificatifs sont prêts.\n\nJe peux visiter dès que vous le souhaitez.\n\nCordialement,\nCamille Martin\n06 12 34 56 78",
  },
  {
    annonce: "Grand studio avec cave",
    lieu: "Monplaisir",
    prix: 760,
    note: 47,
    ton: "Chaleureux",
    texte:
      "Bonjour,\n\nJe viens de voir votre annonce et elle me plaît beaucoup.\n\nJe suis Camille Martin, infirmière en CDI. Je gagne 2 400 € net par mois. Je bénéficie de la garantie Visale, et mon dossier est prêt à vous être envoyé.\n\nJe peux me rendre disponible facilement pour une visite, dites-moi ce qui vous convient.\n\nBien à vous,\nCamille Martin\n06 12 34 56 78",
  },
  {
    annonce: "Studio meublé",
    lieu: "Jean Macé",
    prix: 640,
    note: 14,
    ton: "Professionnel",
    texte:
      "Bonjour,\n\nVotre annonce a retenu toute mon attention, en particulier pour le calme.\n\nJe suis Camille Martin, infirmière en CDI. Mon revenu net est de 2 400 € par mois et je bénéficie de la garantie Visale. L'ensemble des justificatifs (pièce d'identité, contrat de travail, bulletins de salaire, avis d'imposition) est prêt à vous être transmis.\n\nJe me tiens à votre disposition pour organiser une visite.\n\nCordialement,\nCamille Martin\n06 12 34 56 78",
  },
];
