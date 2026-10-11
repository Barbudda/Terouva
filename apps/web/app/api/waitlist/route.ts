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

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

export async function POST(request: Request) {
  let body: unknown = null;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Requête illisible." }, 400);
  }

  const input = parseWaitlistInput(body);
  // Robot : on répond comme si tout allait bien, sans rien enregistrer.
  if (input.kind === "bot") return json({ ok: true });
  if (input.kind === "invalid") return json({ ok: false, error: input.message }, 400);

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
