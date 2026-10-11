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
 * Six messages produits par `generateMessage`, un par annonce, dans les trois
 * tons. Ce sont des brouillons : c'est toujours l'utilisateur qui relit, qui
 * colle et qui envoie.
 */
export const MESSAGES: MessageExemple[] = [
  {
    annonce: "T2 lumineux avec balcon",
    lieu: "Croix-Rousse",
    prix: 890,
    note: 96,
    ton: "Direct",
    texte:
      "Bonjour,\n\nCe 2 pièces de 42m² à Lyon 4e (69004), 890€ par mois, et l'espace extérieur en particulier, correspond exactement à ce que je recherche.\nJe suis Camille Martin, infirmière.\nMon dossier : infirmière, CDI, revenu net de 2400€/mois, garant : garantie Visale. Tout est prêt à être transmis.\n\nDisponible pour visiter très vite. Joignable au 06 12 34 56 78.\n\nCordialement,\nCamille Martin",
  },
  {
    annonce: "2 pièces rénové",
    lieu: "Guillotière",
    prix: 845,
    note: 96,
    ton: "Chaleureux",
    texte:
      "Bonjour et merci pour votre annonce,\n\nJe suis très intéressé(e) par ce 2 pièces de 40m² à Lyon 7e (69007), 845€ par mois : j'ai particulièrement noté l'espace extérieur.\n\nJe m'appelle Camille Martin, actuellement infirmière.\n\nCôté dossier : infirmière, CDI, revenu net de 2400€/mois, garant : garantie Visale. Tous les justificatifs sont prêts.\n\nCe serait un plaisir d'en discuter et de visiter rapidement. Mon numéro : 06 12 34 56 78.\n\nBien à vous,\nCamille Martin",
  },
  {
    annonce: "2 pièces proche Part-Dieu",
    lieu: "Lyon 3e",
    prix: 930,
    note: 66,
    ton: "Professionnel",
    texte:
      "Madame, Monsieur,\n\nCe 2 pièces de 38m² à Lyon 3e (69003) me plaît beaucoup.\n\nJe m'appelle Camille Martin, infirmière en CDI, avec un revenu net mensuel de 2400€.\nJe dispose d'un garant : garantie Visale.\nL'ensemble des pièces (identité, contrat, bulletins de salaire, avis d'imposition) sont disponibles sur demande.\n\nJe reste à votre disposition pour convenir d'une visite. Vous pouvez me joindre au 06 12 34 56 78.\n\nCordialement,\nCamille Martin",
  },
  {
    annonce: "Grand studio avec cave",
    lieu: "Monplaisir",
    prix: 760,
    note: 47,
    ton: "Chaleureux",
    texte:
      "Bonjour,\n\nJe suis très intéressé(e) par ce studio de 34m² à Lyon 8e (69008), 760€ par mois : j'ai particulièrement noté la cave ou le parking.\n\nJe m'appelle Camille Martin, actuellement infirmière.\n\nCôté dossier : infirmière, CDI, revenu net de 2400€/mois, garant : garantie Visale. Tous les justificatifs sont prêts.\n\nJe serais ravi(e) d'échanger et de visiter dès que vous le pouvez. Vous pouvez me joindre au 06 12 34 56 78.\n\nBien à vous,\nCamille Martin",
  },
  {
    annonce: "Studio meublé",
    lieu: "Jean Macé",
    prix: 640,
    note: 14,
    ton: "Professionnel",
    texte:
      "Bonjour,\n\nCe studio de 28m² à Lyon 7e (69007) me plaît beaucoup, notamment pour le calme.\n\nJe m'appelle Camille Martin, infirmière en CDI, avec un revenu net mensuel de 2400€.\nJe dispose d'un garant : garantie Visale.\nL'ensemble des pièces (identité, contrat, bulletins de salaire, avis d'imposition) sont disponibles sur demande.\n\nJe reste à votre disposition pour convenir d'une visite. Vous pouvez me joindre au 06 12 34 56 78.\n\nCordialement,\nCamille Martin",
  },
  {
    annonce: "T3 au dernier étage",
    lieu: "Villeurbanne",
    prix: 1080,
    note: 1,
    ton: "Direct",
    texte:
      "Bonjour,\n\nCe 3 pièces de 61m² à Villeurbanne (69100), 1080€ par mois, et la cave ou le parking en particulier, correspond exactement à ce que je recherche.\nJe suis Camille Martin, infirmière.\nMon dossier : infirmière, CDI, revenu net de 2400€/mois, garant : garantie Visale. Tout est prêt à être transmis.\n\nJe peux visiter dès que possible. Vous pouvez me joindre au 06 12 34 56 78.\n\nCordialement,\nCamille Martin",
  },
];
