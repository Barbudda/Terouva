import { Resend } from "resend";
import { isAlreadyRegistered, parseWaitlistInput } from "@/lib/waitlist";

/**
 * Inscription à la liste d'attente.
 *
 * SEULE route serveur du projet, et elle le restera : l'application Terouva
 * reste entièrement locale (aucune donnée de recherche, d'annonce ou de
 * candidature ne passe par ici). Cette route ne fait qu'une chose : transmettre
 * une adresse e-mail à Resend, qui garde la liste et servira à prévenir du
 * lancement. Rien n'est stocké de notre côté.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Le formulaire tient en quelques centaines d'octets. */
const MAX_BODY = 4_000;
/** Fenêtre de limitation : 5 inscriptions par adresse IP toutes les 10 minutes. */
const RATE_MAX = 5;
const RATE_WINDOW_MS = 10 * 60_000;

/**
 * Compteur en mémoire. Les instances serverless ne partagent rien : ce n'est
 * donc qu'un ralentisseur, pas un rempart. Le vrai filtrage de masse se règle
 * côté Vercel (pare-feu), sans code.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    if (hits.size > 5_000) for (const [k, v] of hits) if (v.resetAt < now) hits.delete(k);
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_MAX;
}

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...headers },
  });
}

/**
 * Le formulaire est envoyé depuis une page de ce site. Un autre site ne doit pas
 * pouvoir inscrire ses visiteurs à leur insu : son `fetch` porterait une origine
 * différente. Une requête sans origine (outil en ligne de commande) est admise :
 * elle ne concerne aucun visiteur.
 */
function foreignOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host !== request.headers.get("host");
  } catch {
    return true;
  }
}

export async function POST(request: Request) {
  if (foreignOrigin(request)) return json({ ok: false, error: "Origine refusée." }, 403);

  // Type imposé : un envoi depuis un autre site déclencherait un contrôle
  // préalable (preflight) auquel cette route ne répond pas.
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return json({ ok: false, error: "Format non accepté." }, 415);
  }

  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY) {
    return json({ ok: false, error: "Requête trop volumineuse." }, 413);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY) return json({ ok: false, error: "Requête trop volumineuse." }, 413);

  let body: unknown = null;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "Requête illisible." }, 400);
  }

  const input = parseWaitlistInput(body);
  // Robot : on répond comme si tout allait bien, sans rien enregistrer.
  if (input.kind === "bot") return json({ ok: true });
  if (input.kind === "invalid") return json({ ok: false, error: input.message }, 400);

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "inconnue";
  if (rateLimited(ip)) {
    return json(
      { ok: false, error: "Trop de tentatives. Réessayez dans quelques minutes." },
      429,
      { "retry-after": String(Math.ceil(RATE_WINDOW_MS / 1000)) },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[waitlist] RESEND_API_KEY absente : inscription impossible.");
    return json(
      { ok: false, error: "Les inscriptions sont momentanément indisponibles. Réessayez plus tard." },
      503,
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.contacts.create({
      email: input.email,
      unsubscribed: false,
    });
    if (error && !isAlreadyRegistered(error)) {
      console.error("[waitlist] création du contact refusée :", error.name, error.message);
      return json({ ok: false, error: "L'inscription n'a pas pu être enregistrée." }, 502);
    }

    // Le segment sert à envoyer l'annonce de lancement. Facultatif : sans lui,
    // le contact existe quand même, il faudra juste le cibler autrement.
    const segmentId = process.env.RESEND_SEGMENT_ID;
    if (segmentId) {
      const { error: segmentError } = await resend.contacts.segments.add({
        email: input.email,
        segmentId,
      });
      if (segmentError && !isAlreadyRegistered(segmentError)) {
        // Le contact est enregistré : on ne fait pas échouer l'inscription pour ça.
        console.error("[waitlist] ajout au segment refusé :", segmentError.message);
      }
    }

    return json({ ok: true });
  } catch (e) {
    console.error("[waitlist] appel Resend impossible :", e);
    return json({ ok: false, error: "L'inscription n'a pas pu être enregistrée." }, 502);
  }
}
