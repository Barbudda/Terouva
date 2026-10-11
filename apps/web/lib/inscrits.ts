import { Resend } from "resend";

/**
 * Lecture de la liste d'attente.
 *
 * Il n'y a pas de base de données : la liste vit chez Resend, qui servira aussi
 * à envoyer l'annonce de lancement. Cette fonction ne fait que la relire pour
 * la page privée /liste. Rien n'est écrit ici.
 */
export type Inscrit = {
  id: string;
  email: string;
  /** Date ISO d'inscription, telle que Resend la renvoie. */
  date: string;
  desinscrit: boolean;
};

export type Liste =
  | { kind: "ok"; inscrits: Inscrit[]; tronquee: boolean }
  | { kind: "config" }
  | { kind: "erreur"; message: string };

const PAR_PAGE = 100;
/** 20 pages = 2000 adresses. Au-delà, la page le dit au lieu de mentir. */
const PAGES_MAX = 20;

export async function lireInscrits(): Promise<Liste> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { kind: "config" };

  const resend = new Resend(apiKey);
  const segmentId = process.env.RESEND_SEGMENT_ID;
  const inscrits: Inscrit[] = [];
  let after: string | undefined;

  try {
    for (let page = 0; page < PAGES_MAX; page += 1) {
      const { data, error } = await resend.contacts.list({
        limit: PAR_PAGE,
        ...(after ? { after } : {}),
        ...(segmentId ? { segmentId } : {}),
      });

      if (error) return { kind: "erreur", message: error.message };
      if (!data) break;

      for (const contact of data.data) {
        inscrits.push({
          id: contact.id,
          email: contact.email,
          date: contact.created_at,
          desinscrit: contact.unsubscribed,
        });
      }

      if (!data.has_more || data.data.length === 0) {
        // Du plus récent au plus ancien : c'est l'ordre utile pour nous.
        inscrits.sort((a, b) => b.date.localeCompare(a.date));
        return { kind: "ok", inscrits, tronquee: false };
      }
      after = data.data[data.data.length - 1]?.id;
      if (!after) break;
    }
  } catch (e) {
    return {
      kind: "erreur",
      message: e instanceof Error ? e.message : "Lecture impossible.",
    };
  }

  inscrits.sort((a, b) => b.date.localeCompare(a.date));
  return { kind: "ok", inscrits, tronquee: true };
}

/** Nombre d'inscrits depuis `jours` jours, désinscrits exclus. */
export function inscritsRecents(inscrits: Inscrit[], jours: number, maintenant = Date.now()): number {
  const seuil = maintenant - jours * 24 * 60 * 60 * 1000;
  return inscrits.filter((i) => !i.desinscrit && Date.parse(i.date) >= seuil).length;
}
