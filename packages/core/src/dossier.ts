/**
 * Quelles pièces composent un dossier de location, selon la situation.
 *
 * La liste vient du décret n° 2015-1437 du 5 novembre 2015, pris pour
 * l'application de la loi du 6 juillet 1989. Elle est **limitative** : un
 * bailleur ne peut rien demander qui n'y figure pas, sous peine d'une amende
 * pouvant atteindre 3 000 €, et 15 000 € pour une personne morale.
 *
 * Deux principes guident ce fichier :
 *
 * 1. **On ne demande que ce qui existe.** Un étudiant n'a pas de contrat de
 *    travail, un indépendant n'a pas de bulletins de salaire. Une liste unique
 *    pour tout le monde fait réunir des pièces impossibles et en oublie
 *    d'autres.
 * 2. **On n'invente rien.** Chaque libellé correspond à une ligne du décret.
 *    Ce qui n'y est pas n'est pas ici.
 *
 * Ce n'est pas un conseil juridique : c'est la liste de ce qu'un propriétaire
 * a le droit de demander, pas un avis sur l'acceptation d'un dossier.
 */

export type Situation =
  | "salarie"
  | "fonctionnaire"
  | "independant"
  | "etudiant"
  | "alternant"
  | "retraite"
  | "demandeur";

/** Où vous habitez aujourd'hui : cela change le justificatif de domicile. */
export type Logement = "locataire" | "heberge" | "proprietaire";

/** Qui se porte garant, s'il y en a un. */
export type Garantie = "aucune" | "personne" | "visale";

export const SITUATIONS: Array<{ valeur: Situation; libelle: string }> = [
  { valeur: "salarie", libelle: "Salarié du privé" },
  { valeur: "fonctionnaire", libelle: "Fonctionnaire" },
  { valeur: "independant", libelle: "Indépendant ou profession libérale" },
  { valeur: "etudiant", libelle: "Étudiant" },
  { valeur: "alternant", libelle: "Alternant ou apprenti" },
  { valeur: "retraite", libelle: "Retraité" },
  { valeur: "demandeur", libelle: "Sans emploi" },
];

export const LOGEMENTS: Array<{ valeur: Logement; libelle: string }> = [
  { valeur: "locataire", libelle: "Je suis locataire" },
  { valeur: "heberge", libelle: "Je suis hébergé" },
  { valeur: "proprietaire", libelle: "Je suis propriétaire" },
];

export const GARANTIES: Array<{ valeur: Garantie; libelle: string }> = [
  { valeur: "personne", libelle: "Un garant (parent, proche…)" },
  { valeur: "visale", libelle: "La garantie Visale" },
  { valeur: "aucune", libelle: "Ni garant ni garantie" },
];

export type Piece = {
  libelle: string;
  /**
   * Une variante de la pièce précédente, pas une pièce de plus : on fournit
   * l'une ou l'autre. Elle ne compte donc pas dans le total annoncé.
   */
  alternative?: boolean;
  /** Ce qu'il faut savoir pour ne pas se tromper de document. */
  precision?: string;
};

export type Categorie = {
  titre: string;
  /** Combien de pièces de cette catégorie le bailleur peut exiger. */
  regle: string;
  pieces: Piece[];
};

export type Dossier = {
  vous: Categorie[];
  /** Vide s'il n'y a pas de garant physique. */
  garant: Categorie[];
  /** Message particulier (Visale, absence de garant). */
  note: string | null;
  interdits: string[];
};

/** Entrée du formulaire. */
export type Demande = { situation: Situation; logement: Logement; garantie: Garantie };

const IDENTITE: Categorie = {
  titre: "Identité",
  regle: "Une seule pièce",
  pieces: [
    {
      libelle: "Carte d'identité, passeport ou permis de conduire",
      precision:
        "En cours de validité. Le permis, français ou étranger, doit comporter une photographie.",
    },
    {
      alternative: true,
      libelle: "Ou titre de séjour",
      precision:
        "Carte de séjour temporaire, carte de résident, ou carte de ressortissant d'un État de l'Union européenne ou de l'Espace économique européen.",
    },
  ],
};

function domicile(logement: Logement): Categorie {
  const pieces: Record<Logement, Piece[]> = {
    locataire: [
      {
        libelle: "Vos trois dernières quittances de loyer",
        precision:
          "À défaut, une attestation de votre propriétaire actuel indiquant que vous êtes à jour de vos loyers et charges.",
      },
    ],
    heberge: [
      {
        libelle: "Attestation sur l'honneur de la personne qui vous héberge",
        precision: "Elle indique que vous vivez chez elle. Un modèle simple suffit.",
      },
    ],
    proprietaire: [
      {
        libelle: "Dernier avis de taxe foncière, ou titre de propriété",
        precision: "Pour votre résidence principale.",
      },
    ],
  };
  return { titre: "Domicile actuel", regle: "Un seul justificatif", pieces: pieces[logement] };
}

function activite(situation: Situation): Categorie {
  const pieces: Record<Situation, Piece[]> = {
    salarie: [
      {
        libelle: "Contrat de travail, ou attestation de votre employeur",
        precision: "L'attestation précise l'emploi, la rémunération et la date d'entrée en fonction.",
      },
    ],
    fonctionnaire: [
      { libelle: "Arrêté de nomination, ou attestation de votre employeur" },
    ],
    independant: [
      {
        libelle: "Le justificatif qui correspond à votre statut",
        precision:
          "Extrait K ou K bis de moins de trois mois pour une entreprise commerciale ; fiche d'immatriculation au Registre national des entreprises de moins de trois mois pour un artisan ; copie du certificat d'identification de l'Insee pour un travailleur indépendant ; copie de la carte professionnelle pour une profession libérale.",
      },
    ],
    etudiant: [
      { libelle: "Carte d'étudiant, ou certificat de scolarité de l'année en cours" },
    ],
    alternant: [
      { libelle: "Contrat d'alternance ou d'apprentissage" },
      { libelle: "Carte d'étudiant, ou certificat de scolarité de l'année en cours" },
    ],
    retraite: [
      { libelle: "Tout document récent attestant de votre situation", precision: "Par exemple votre titre de pension." },
    ],
    demandeur: [
      {
        libelle: "Tout document récent attestant de votre situation",
        precision: "Par exemple votre attestation France Travail.",
      },
    ],
  };
  return {
    titre: "Activité professionnelle",
    regle: "Un ou plusieurs documents",
    pieces: pieces[situation],
  };
}

const AIDE_LOGEMENT: Piece = {
  libelle: "Attestation de simulation d'aide au logement",
  precision:
    "Délivrée par la Caf ou la MSA, ou faite par vous-même sur leur simulateur. Elle montre l'aide à laquelle vous aurez droit.",
};

const AVIS_IMPOSITION: Piece = {
  libelle: "Dernier ou avant-dernier avis d'imposition",
  precision: "Un avis de non-imposition convient aussi.",
};

function ressources(situation: Situation): Categorie {
  const propres: Record<Situation, Piece[]> = {
    salarie: [{ libelle: "Vos trois derniers bulletins de salaire" }],
    fonctionnaire: [{ libelle: "Vos trois derniers bulletins de salaire" }],
    alternant: [
      { libelle: "Vos trois derniers bulletins de salaire" },
      { alternative: true, libelle: "Ou la justification du versement de vos indemnités de stage" },
    ],
    independant: [{ libelle: "Vos deux derniers bilans", precision: "Pas davantage : au-delà de deux, c'est interdit." }],
    etudiant: [
      { libelle: "Avis d'attribution de bourse, si vous êtes boursier" },
      { alternative: true, libelle: "Ou la justification du versement de vos indemnités de stage" },
    ],
    retraite: [
      {
        libelle: "Justification du versement de vos pensions",
        precision: "Sur les trois derniers mois, ou le document ouvrant vos droits.",
      },
    ],
    demandeur: [
      {
        libelle: "Justification du versement de vos indemnités ou prestations",
        precision: "Sur les trois derniers mois, ou le document ouvrant vos droits.",
      },
    ],
  };
  return {
    titre: "Ressources",
    regle: "Un ou plusieurs documents",
    pieces: [AVIS_IMPOSITION, ...propres[situation], AIDE_LOGEMENT],
  };
}

/**
 * Les documents que le bailleur ne peut pas réclamer.
 *
 * Le principe est plus large que cette liste : tout ce qui n'est pas dans le
 * décret est interdit. Ceux-ci sont nommés par la loi parce qu'ils étaient
 * demandés couramment.
 */
export const INTERDITS: string[] = [
  "Une photographie d'identité, sauf celle de votre pièce d'identité",
  "Votre carte d'assuré social, donc la carte Vitale",
  "Une copie de relevé de compte bancaire ou postal",
  "Une attestation de bonne tenue de compte",
  "Une attestation d'absence de crédit en cours",
  "Une autorisation de prélèvement automatique",
  "Un jugement de divorce, hors le paragraphe commençant par « Par ces motifs »",
  "Un contrat de mariage ou un certificat de concubinage",
  "Un chèque de réservation du logement",
  "Votre dossier médical personnel",
  "Un extrait de casier judiciaire",
  "Une attestation de non-inscription au fichier des incidents de remboursement des crédits",
  "Plus de deux bilans, si vous êtes indépendant",
  "Une attestation de votre employeur quand vous fournissez contrat et bulletins de salaire",
];

/** Le dossier complet, pour une situation donnée. */
export function dossierRequis({ situation, logement, garantie }: Demande): Dossier {
  const vous = [IDENTITE, domicile(logement), activite(situation), ressources(situation)];

  // Le décret traite la caution dans une annexe qui reprend les mêmes
  // catégories : on ne détaille donc pas différemment.
  const garant: Categorie[] =
    garantie === "personne"
      ? [
          { ...IDENTITE, titre: "Identité du garant" },
          {
            titre: "Domicile du garant",
            regle: "Un seul justificatif",
            pieces: [{ libelle: "Quittances de loyer, avis de taxe foncière ou titre de propriété" }],
          },
          {
            titre: "Activité du garant",
            regle: "Un ou plusieurs documents",
            pieces: [{ libelle: "Contrat de travail, attestation d'employeur, ou justificatif de son statut" }],
          },
          {
            titre: "Ressources du garant",
            regle: "Un ou plusieurs documents",
            pieces: [
              { libelle: "Dernier ou avant-dernier avis d'imposition" },
              { libelle: "Trois derniers bulletins de salaire, ou l'équivalent selon son statut" },
            ],
          },
        ]
      : [];

  const notes: Record<Garantie, string | null> = {
    visale:
      "Avec la garantie Visale, vous n'avez aucune pièce de garant à fournir : vous présentez votre visa, obtenu avant de signer. C'est Action Logement qui se porte caution.",
    aucune:
      "Sans garant, votre dossier reste recevable, mais beaucoup de propriétaires en demandent un. La garantie Visale est gratuite et se demande avant même d'avoir trouvé le logement.",
    personne: null,
  };

  return { vous, garant, note: notes[garantie], interdits: INTERDITS };
}

/** Version texte, pour le bouton « copier la liste ». */
export function dossierEnTexte(dossier: Dossier): string {
  const bloc = (titre: string, categories: Categorie[]) =>
    categories.length === 0
      ? ""
      : `${titre.toUpperCase()}\n\n` +
        categories
          .map(
            (c) =>
              `${c.titre} (${c.regle.toLowerCase()})\n` +
              c.pieces.map((p) => `  - ${p.libelle}`).join("\n"),
          )
          .join("\n\n") +
        "\n\n";

  return (
    bloc("Votre dossier", dossier.vous) +
    bloc("Pour votre garant", dossier.garant) +
    (dossier.note ? `${dossier.note}\n\n` : "") +
    "CE QU'ON NE PEUT PAS VOUS DEMANDER\n\n" +
    dossier.interdits.map((i) => `  - ${i}`).join("\n") +
    "\n\nUne demande hors liste expose le propriétaire à une amende pouvant atteindre " +
    "3 000 €, et 15 000 € pour une agence.\n" +
    "Liste établie par le décret n° 2015-1437 du 5 novembre 2015."
  );
}

/**
 * Nombre de pièces réellement à réunir : les variantes ne comptent pas, puisque
 * l'une remplace l'autre. Annoncer « 13 pièces » quand il y en a 11 à fournir
 * décourage pour rien.
 */
export function compterPieces(categories: Categorie[]): number {
  return categories.reduce(
    (n, c) => n + c.pieces.filter((p) => !p.alternative).length,
    0,
  );
}
