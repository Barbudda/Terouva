/**
 * Quel loyer pour quelles ressources : le calcul de l'outil
 * `/outils/quel-salaire-pour-un-loyer`.
 *
 * Deux repères, qui n'ont pas le même statut, et la page ne doit jamais les
 * confondre :
 *
 * 1. **« Trois fois le loyer »** est une pratique de propriétaires. Aucun texte
 *    ne l'impose : la fiche service-public F1169 (vérifiée le 2025-04-10) liste
 *    les justificatifs de ressources qu'un bailleur peut demander, sans aucun
 *    seuil ni multiple. On l'affiche parce que c'est ce que les candidats
 *    cherchent, et on le dit tel quel.
 * 2. **Visale** a des règles écrites : fiche F33453 (vérifiée le 2026-01-23),
 *    tableaux relus le 2026-11-04. Plafond de loyer selon la zone ; pour un
 *    étudiant ou un alternant, des seuils fixes ; pour les autres, un loyer
 *    qui ne dépasse pas la moitié des ressources.
 *
 * Fonctions pures, sans dépendance au navigateur : la page les appelle côté
 * client, rien n'est envoyé. Les montants vivent ici et dans
 * `docs/seo/faits-a-integrer/seo-outils.md`, avec leur source et leur date.
 */

/** Repère de pratique, pas une règle de droit (voir l'en-tête). */
export const MULTIPLE_USAGE = 3;

/** Visale, hors étudiants : le loyer ne dépasse pas la moitié des ressources (F33453). */
export const PART_MAX_VISALE = 0.5;

/** Bornes de saisie : au-delà, c'est une faute de frappe, pas un loyer. */
export const LOYER_MAX = 20_000;
export const RESSOURCES_MAX = 100_000;

export type ZoneVisale = "idf" | "region-1575" | "region-1365" | "outre-mer";
export type ProfilVisale = "etudiant" | "autre";

type Zone = {
  libelle: string;
  /** Loyer au-delà duquel Visale n'est pas accordée. */
  plafond: number;
  /** Étudiant ou alternant : loyer jusqu'auquel aucune ressource n'est exigée. */
  seuilEtudiant: number;
  /** Étudiant ou alternant au-dessus du seuil : ressources à dépasser. */
  ressourcesEtudiant: number;
};

/**
 * Les quatre cas de la fiche F33453. En région, le plafond (1 575 € ou
 * 1 365 €) dépend de la commune, que la fiche ne liste pas : elle renvoie au
 * simulateur Visale. D'où deux lignes « Autre région », et le lien vers le
 * simulateur sur la page.
 */
export const ZONES_VISALE: Record<ZoneVisale, Zone> = {
  idf: { libelle: "Île-de-France", plafond: 1940, seuilEtudiant: 1000, ressourcesEtudiant: 2000 },
  "region-1575": {
    libelle: "Autre région, plafond de 1 575 €",
    plafond: 1575,
    seuilEtudiant: 840,
    ressourcesEtudiant: 1680,
  },
  "region-1365": {
    libelle: "Autre région, plafond de 1 365 €",
    plafond: 1365,
    seuilEtudiant: 680,
    ressourcesEtudiant: 1360,
  },
  "outre-mer": {
    libelle: "Outre-mer (Drom et Saint-Martin)",
    plafond: 1575,
    seuilEtudiant: 840,
    ressourcesEtudiant: 1680,
  },
};

export const ZONES: ReadonlyArray<{ valeur: ZoneVisale; libelle: string }> = (
  Object.keys(ZONES_VISALE) as ZoneVisale[]
).map((valeur) => ({ valeur, libelle: ZONES_VISALE[valeur].libelle }));

export const PROFILS: ReadonlyArray<{ valeur: ProfilVisale; libelle: string }> = [
  { valeur: "autre", libelle: "Salarié, jeune actif, autre" },
  { valeur: "etudiant", libelle: "Étudiant ou alternant" },
];

export type Saisie = { valeur: number | null; erreur: string | null };

/**
 * Lit un montant tapé à la française ou non : « 1 200 », « 1200,50 »,
 * « 1 200.50 €». Champ vide : `valeur` nulle, sans erreur.
 */
export function lireMontant(texte: string, max: number): Saisie {
  const net = texte.replace(/[\s  €]/g, "").replace(",", ".");
  if (net === "") return { valeur: null, erreur: null };
  if (!/^\d+(\.\d{1,2})?$/.test(net)) {
    return { valeur: null, erreur: "Indiquez un montant en euros, par exemple 750." };
  }
  const valeur = Number(net);
  if (valeur > max) {
    return { valeur: null, erreur: `Ce montant dépasse ${formatEuros(max)} : vérifiez la saisie.` };
  }
  return { valeur, erreur: null };
}

export type Entrees = {
  /** Loyer charges comprises, par mois. */
  loyer: number | null;
  /** Ressources nettes mensuelles, colocataires compris, aides exclues. */
  ressources: number | null;
  /** Aides au logement simulées, comptées à part : le bailleur choisit. */
  aides: number | null;
  ressourcesGarant: number | null;
  zone: ZoneVisale;
  profil: ProfilVisale;
};

export type Visale =
  | { statut: "sans-condition"; seuil: number }
  | { statut: "accordable"; condition: string; /** false tant que les ressources manquent. */ remplie: boolean }
  | { statut: "ressources-insuffisantes"; condition: string; manque: number }
  | { statut: "hors-plafond"; plafond: number }
  | { statut: "a-completer" };

export type Resultat = {
  /** Loyer ÷ ressources, en pourcentage entier ; null sans les deux. */
  tauxEffort: number | null;
  /** Le même taux si le bailleur compte les aides ; null sans aides. */
  tauxAvecAides: number | null;
  /** Ressources qu'un bailleur « trois fois le loyer » attend. */
  ressourcesAttendues: number | null;
  /** Écart au repère : positif s'il manque, 0 s'il est atteint. */
  manqueRepere: number | null;
  /** Loyer qui respecte le repère, quand seules les ressources sont connues. */
  loyerRepere: number | null;
  /** Loyer le plus haut que Visale couvre pour ces ressources (hors étudiant). */
  loyerVisale: number | null;
  visale: Visale;
  /** Ressources du garant face au même repère. */
  garant: { attendu: number; manque: number } | null;
};

/** Arrondi à l'euro du côté prudent : on attend un peu plus, on promet un peu moins. */
const versLeHaut = (n: number) => Math.ceil(n - 1e-9);
const versLeBas = (n: number) => Math.floor(n + 1e-9);
const pourcent = (part: number, total: number) => Math.round((part / total) * 100);

export function calculerLoyer(e: Entrees): Resultat {
  const zone = ZONES_VISALE[e.zone];
  const loyer = e.loyer && e.loyer > 0 ? e.loyer : null;
  const ressources = e.ressources && e.ressources > 0 ? e.ressources : null;
  const aides = e.aides && e.aides > 0 ? e.aides : null;

  const ressourcesAttendues = loyer ? versLeHaut(loyer * MULTIPLE_USAGE) : null;
  const manqueRepere =
    ressourcesAttendues !== null && e.ressources !== null
      ? Math.max(0, versLeHaut(ressourcesAttendues - (ressources ?? 0)))
      : null;

  return {
    tauxEffort: loyer && ressources ? pourcent(loyer, ressources) : null,
    tauxAvecAides: loyer && ressources && aides ? pourcent(loyer, ressources + aides) : null,
    ressourcesAttendues,
    manqueRepere,
    loyerRepere: ressources ? versLeBas(ressources / MULTIPLE_USAGE) : null,
    loyerVisale:
      ressources && e.profil === "autre"
        ? Math.min(zone.plafond, versLeBas(ressources * PART_MAX_VISALE))
        : null,
    visale: regleVisale(loyer, ressources, e.profil, zone),
    garant:
      ressourcesAttendues !== null && e.ressourcesGarant !== null
        ? {
            attendu: ressourcesAttendues,
            manque: Math.max(0, versLeHaut(ressourcesAttendues - e.ressourcesGarant)),
          }
        : null,
  };
}

function regleVisale(
  loyer: number | null,
  ressources: number | null,
  profil: ProfilVisale,
  zone: Zone,
): Visale {
  if (loyer === null) return { statut: "a-completer" };
  if (loyer > zone.plafond) return { statut: "hors-plafond", plafond: zone.plafond };

  if (profil === "etudiant") {
    if (loyer <= zone.seuilEtudiant) return { statut: "sans-condition", seuil: zone.seuilEtudiant };
    const condition = `ressources de plus de ${formatEuros(zone.ressourcesEtudiant)} par mois`;
    if (ressources === null) return { statut: "accordable", condition, remplie: false };
    // La fiche dit « doit dépasser » : l'égalité ne suffit pas.
    return ressources > zone.ressourcesEtudiant
      ? { statut: "accordable", condition, remplie: true }
      : {
          statut: "ressources-insuffisantes",
          condition,
          manque: versLeBas(zone.ressourcesEtudiant - ressources) + 1,
        };
  }

  const minimum = versLeHaut(loyer / PART_MAX_VISALE);
  const condition = `ressources d'au moins ${formatEuros(minimum)} par mois`;
  if (ressources === null) return { statut: "accordable", condition, remplie: false };
  return ressources >= minimum
    ? { statut: "accordable", condition, remplie: true }
    : { statut: "ressources-insuffisantes", condition, manque: versLeHaut(minimum - ressources) };
}

/**
 * « 2 100 € ». Intl sépare les milliers par une espace fine insécable ; on met
 * une espace insécable avant l'unité, pour que « € » ne passe pas seul à la
 * ligne sur un téléphone.
 */
export function formatEuros(n: number): string {
  return `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n)} €`;
}

/**
 * La phrase à copier dans un message ou un dossier. Elle ne dit que des faits
 * que la personne a saisis, jamais un verdict.
 */
export function resumeEnTexte(e: Entrees, r: Resultat): string | null {
  if (e.loyer === null || e.ressources === null || r.tauxEffort === null) return null;
  const garant =
    e.ressourcesGarant !== null
      ? ` Garant : ${formatEuros(e.ressourcesGarant)} nets par mois.`
      : "";
  return (
    `Ressources du foyer : ${formatEuros(e.ressources)} nets par mois, ` +
    `pour un loyer de ${formatEuros(e.loyer)} charges comprises ` +
    `(taux d'effort de ${r.tauxEffort} %).${garant}`
  );
}
