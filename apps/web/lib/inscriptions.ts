import { createHash } from "node:crypto";
import { del, get, head, list, put, BlobNotFoundError } from "@vercel/blob";

/**
 * Liste d'attente, gardée dans Vercel Blob.
 *
 * Le choix mérite une explication. La liste vivait chez Resend, ce qui
 * supposait un compte tiers et une clé à recopier dans les réglages. Elle n'a
 * jamais été recopiée : la route d'inscription répondait donc 503 et **chaque
 * adresse laissée sur le site était perdue**. Un stockage qui demande une
 * démarche qu'on ne fait pas ne stocke rien.
 *
 * Vercel Blob se crée depuis le tableau de bord du projet et son jeton est
 * injecté tout seul dans l'environnement : rien à recopier, donc rien à
 * oublier. C'est la seule raison du choix, pas une préférence technique.
 *
 * **Une adresse, un objet.** Les fonctions serverless ne partagent rien : deux
 * inscriptions simultanées qui liraient puis réécriraient un même fichier JSON
 * s'écraseraient l'une l'autre. Un objet par adresse rend la collision
 * impossible. Le nom de l'objet est l'empreinte de l'adresse, jamais l'adresse
 * elle-même : un nom d'objet se retrouve dans des journaux, pas une donnée
 * personnelle.
 *
 * Ce module ne touche à rien d'autre. Terouva reste sans serveur : ce qu'une
 * personne cherche, voit ou écrit dans l'application ne passe jamais par ici.
 */

const PREFIXE = "inscriptions/";
/**
 * Journal de sauvegarde, une copie par inscription.
 *
 * Il ne protège pas contre la perte du magasin : les deux vivent au même
 * endroit. Il protège contre ce qui est bien plus probable, un bug de notre
 * côté qui effacerait ou corromprait les enregistrements vivants.
 *
 * **Une suppression purge aussi le journal.** Garder une adresse en copie après
 * une demande de retrait serait exactement ce qu'un retrait est censé empêcher,
 * et transformerait une sauvegarde en rétention illicite. La protection contre
 * le clic malheureux n'est donc pas ici : elle est dans la confirmation
 * demandée avant de retirer une ligne.
 */
const JOURNAL = "journal/";
/** Taille d'une page de listing Blob. */
const PAR_PAGE = 1000;
/** 10 pages = 10 000 adresses. Au-delà, la console le dit au lieu de mentir. */
const PAGES_MAX = 10;
/** Lectures simultanées. Au-delà, on fatigue l'API sans gagner de temps. */
const PARALLELE = 20;

export type Inscrit = {
  /** Empreinte de l'adresse : identifiant stable, non réversible. */
  clef: string;
  email: string;
  /** Date ISO de l'inscription. */
  date: string;
};

export type Liste =
  | { kind: "ok"; inscrits: Inscrit[]; tronquee: boolean }
  | { kind: "config" }
  | { kind: "erreur"; message: string };

export type Ecriture = "enregistre" | "deja" | "config" | "erreur";

/** Empreinte de l'adresse, normalisée : même adresse, même clé, donc pas de doublon. */
export function clefPour(email: string): string {
  return createHash("sha256").update(email.trim().toLowerCase()).digest("hex").slice(0, 40);
}

export function cheminPour(email: string): string {
  return `${PREFIXE}${clefPour(email)}.json`;
}

/**
 * Y a-t-il un magasin relié ?
 *
 * Deux façons de s'authentifier, et Vercel choisit la seconde quand on relie un
 * magasin depuis le tableau de bord :
 *
 * - `BLOB_READ_WRITE_TOKEN` : un jeton de longue durée, l'ancienne méthode ;
 * - `BLOB_STORE_ID` + `VERCEL_OIDC_TOKEN` : un jeton court, émis à chaque
 *   exécution de la fonction. C'est plus sûr, puisqu'il n'y a plus de secret
 *   durable à fuiter, et c'est ce que pose la liaison depuis l'interface.
 *
 * Ne tester que le premier faisait répondre « pas configuré » sur un magasin
 * parfaitement relié. Les deux comptent.
 */
export function configuree(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

/**
 * Enregistre une adresse. Réinscrire la même ne change rien, et surtout ne
 * remet pas la date à zéro : la première inscription est celle qui compte.
 */
export async function enregistrer(email: string): Promise<Ecriture> {
  if (!configuree()) return "config";
  const chemin = cheminPour(email);

  try {
    await head(chemin);
    return "deja";
  } catch (e) {
    // Tout sauf « absent » est une vraie panne : on ne l'écrase pas d'un écrit.
    if (!(e instanceof BlobNotFoundError)) {
      console.error("[inscriptions] lecture impossible :", e);
      return "erreur";
    }
  }

  try {
    await put(chemin, JSON.stringify({ email, date: new Date().toISOString() }), {
      access: "private",
      addRandomSuffix: false,
      contentType: "application/json",
    });
    await journaliser(email);
    return "enregistre";
  } catch (e) {
    // Course entre deux inscriptions simultanées : le second écrit échoue
    // parce que l'objet vient d'apparaître. L'adresse est bien là.
    try {
      await head(chemin);
      return "deja";
    } catch {
      console.error("[inscriptions] écriture impossible :", e);
      return "erreur";
    }
  }
}

/**
 * Écrit la copie de sauvegarde. Elle ne doit jamais faire échouer une
 * inscription : si le journal tombe, l'adresse est quand même enregistrée, et
 * c'est l'enregistrement vivant qui compte.
 */
async function journaliser(email: string): Promise<void> {
  try {
    await put(
      `${JOURNAL}${clefPour(email)}/${Date.now()}.json`,
      JSON.stringify({ email, date: new Date().toISOString() }),
      { access: "private", addRandomSuffix: false, contentType: "application/json" },
    );
  } catch (e) {
    console.error("[inscriptions] copie de sauvegarde non écrite :", e);
  }
}

/**
 * Compte les adresses distinctes présentes au journal.
 *
 * Sert à la console : une sauvegarde qu'on ne voit pas est une sauvegarde dont
 * on ne sait pas si elle existe. Afficher l'écart entre les deux comptes est le
 * seul moyen de s'apercevoir que le journal a décroché.
 */
export async function compterSauvegardes(): Promise<number | null> {
  if (!configuree()) return null;
  const clefs = new Set<string>();
  let cursor: string | undefined;
  try {
    for (let page = 0; page < PAGES_MAX; page += 1) {
      const res = await list({ prefix: JOURNAL, limit: PAR_PAGE, cursor });
      for (const b of res.blobs) {
        const reste = b.pathname.slice(JOURNAL.length);
        const clef = reste.split("/")[0];
        if (clef) clefs.add(clef);
      }
      if (!res.hasMore || !res.cursor) break;
      cursor = res.cursor;
    }
  } catch {
    return null;
  }
  return clefs.size;
}

async function lireUn(pathname: string, repli: Date): Promise<Inscrit | null> {
  try {
    const res = await get(pathname, { access: "private" });
    if (!res) return null;
    const brut = await new Response(res.stream).text();
    const data = JSON.parse(brut) as { email?: unknown; date?: unknown };
    if (typeof data.email !== "string" || !data.email) return null;
    const date = typeof data.date === "string" ? data.date : repli.toISOString();
    return { clef: pathname.slice(PREFIXE.length).replace(/\.json$/, ""), email: data.email, date };
  } catch {
    // Un objet illisible ne doit pas faire tomber toute la console.
    return null;
  }
}

/** Toute la liste, de la plus récente à la plus ancienne. */
export async function lireInscrits(): Promise<Liste> {
  if (!configuree()) return { kind: "config" };

  const entrees: Array<{ pathname: string; uploadedAt: Date }> = [];
  let cursor: string | undefined;
  let tronquee = false;

  try {
    for (let page = 0; page < PAGES_MAX; page += 1) {
      const res = await list({ prefix: PREFIXE, limit: PAR_PAGE, cursor });
      for (const b of res.blobs) entrees.push({ pathname: b.pathname, uploadedAt: b.uploadedAt });
      if (!res.hasMore || !res.cursor) break;
      cursor = res.cursor;
      if (page === PAGES_MAX - 1) tronquee = true;
    }
  } catch (e) {
    return {
      kind: "erreur",
      message: e instanceof Error ? e.message : "Lecture de la liste impossible.",
    };
  }

  const inscrits: Inscrit[] = [];
  for (let i = 0; i < entrees.length; i += PARALLELE) {
    const lot = entrees.slice(i, i + PARALLELE);
    const lus = await Promise.all(lot.map((e) => lireUn(e.pathname, e.uploadedAt)));
    for (const u of lus) if (u) inscrits.push(u);
  }

  inscrits.sort((a, b) => b.date.localeCompare(a.date));
  return { kind: "ok", inscrits, tronquee };
}

/** Nombre d'inscriptions sur les `jours` derniers jours. */
export function inscritsRecents(
  inscrits: Inscrit[],
  jours: number,
  maintenant = Date.now(),
): number {
  const seuil = maintenant - jours * 24 * 60 * 60 * 1000;
  return inscrits.filter((i) => {
    const t = Date.parse(i.date);
    return !Number.isNaN(t) && t >= seuil;
  }).length;
}

/**
 * Retire une adresse de la liste.
 *
 * Resend gérait les désinscriptions de son côté ; ici il n'y a personne pour le
 * faire. Sans ce bouton, une demande de retrait serait impossible à honorer,
 * ce qui n'est pas tenable pour des adresses collectées sur un formulaire.
 *
 * La clé suffit, et c'est voulu : la console n'a pas besoin de renvoyer
 * l'adresse au serveur pour la supprimer.
 */
export async function supprimer(clef: string): Promise<boolean> {
  if (!configuree()) return false;
  // Une clé est une empreinte hexadécimale, rien d'autre. Refuser le reste
  // évite qu'un chemin bricolé aille supprimer un objet voisin.
  if (!/^[0-9a-f]{40}$/.test(clef)) return false;

  try {
    await del(`${PREFIXE}${clef}.json`);

    // Le retrait doit être complet. Laisser la copie de sauvegarde en place
    // reviendrait à garder l'adresse de quelqu'un qui a demandé à partir.
    try {
      const { blobs } = await list({ prefix: `${JOURNAL}${clef}/` });
      if (blobs.length > 0) await del(blobs.map((b) => b.url));
    } catch (e) {
      // On le signale fort : l'enregistrement vivant est parti, mais une copie
      // subsiste, et c'est la seule situation où ce code laisse traîner une
      // donnée personnelle.
      console.error("[inscriptions] PURGE DU JOURNAL ÉCHOUÉE pour", clef, e);
    }

    return true;
  } catch (e) {
    console.error("[inscriptions] suppression impossible :", e);
    return false;
  }
}

/**
 * Export CSV, pour reprendre la liste dans n'importe quel outil d'envoi le jour
 * du lancement. Le point-virgule est le séparateur attendu par Excel en
 * français ; une virgule y collerait toutes les colonnes ensemble.
 */
export function versCsv(inscrits: Inscrit[]): string {
  const echappe = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const lignes = [["email", "date"].join(";")];
  for (const i of inscrits) lignes.push([echappe(i.email), echappe(i.date)].join(";"));
  return lignes.join("\r\n");
}
