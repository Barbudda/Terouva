import { generateText } from "ai";

/**
 * Bot interne Terouva — génération du message de candidature.
 *
 * L'app desktop POST ici (listing + profil + ton) ; le backend détient le crédit
 * IA (Vercel AI Gateway, auth OIDC automatique sur déploiement — aucune clé
 * exposée). L'utilisateur final n'a donc AUCUNE clé à gérer.
 *
 * ⚠️ Avant lancement public : ajouter comptes + rate limiting (ce endpoint est
 * ouvert pour l'instant — un acteur malveillant pourrait consommer du crédit).
 */

const MODEL = "anthropic/claude-sonnet-4.6";

interface ListingFacts {
  title?: string | null;
  price?: number | null;
  surface?: number | null;
  rooms?: number | null;
  city?: string | null;
  postal_code?: string | null;
  furnished?: boolean | null;
  property_type?: string | null;
  description?: string | null;
  publisher_type?: string | null;
}

interface ProfileFacts {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
  situation?: string | null;
  income_monthly?: number | null;
  guarantors?: string | null;
  contract_type?: string | null;
  intro_message?: string | null;
  preferred_contact?: string | null;
}

interface Body {
  listing?: ListingFacts;
  profile?: ProfileFacts;
  tone?: string;
}

const SYSTEM = `Tu écris des messages de candidature pour des locations sur Leboncoin, en français, du point de vue du candidat. Tu adaptes chaque message à l'annonce et au profil fournis.

Règles strictes:
- 6 à 10 lignes maximum. Pas de pavé.
- Mentionne 1 ou 2 détails concrets de l'annonce (quartier, surface particulière, mention spécifique de la description) pour montrer que tu l'as lue.
- Cite naturellement les éléments solides du dossier (CDI, revenus, garant), mais sans réciter une fiche. Pas de tableau Excel verbalisé.
- Termine par un appel à action concret : visite, échange, contact direct.
- Pas de formules creuses ("votre annonce a retenu toute mon attention", "je me permets de vous adresser ma candidature"). Naturel.
- Pas d'émoji, pas d'astérisques markdown, pas de bullet points.
- Réponse = uniquement le texte du message, prêt à copier-coller. Pas de préambule, pas de balise, pas de commentaire avant ou après.`;

function toneLabel(tone: string | undefined): string {
  switch (tone) {
    case "direct":
      return "DIRECT (court, factuel, va à l'essentiel)";
    case "warm":
      return "CHALEUREUX (enthousiasme sincère et personnel, sans en faire trop)";
    case "pro":
      return "PROFESSIONNEL (formel, structuré, met en avant les garanties du dossier)";
    default:
      return "PROFESSIONNEL";
  }
}

function kv(label: string, value: unknown): string {
  if (value === null || value === undefined || value === "") return "";
  return `${label}: ${value}\n`;
}

function renderUserPrompt(body: Body): string {
  const l = body.listing ?? {};
  const p = body.profile ?? {};
  let out = `Ton demandé: ${toneLabel(body.tone)}\n\n== Annonce ==\n`;
  out += kv("Titre", l.title);
  if (l.price != null) out += kv("Prix", `${l.price}€ / mois`);
  if (l.surface != null) out += kv("Surface", `${l.surface}m²`);
  if (l.rooms != null) out += kv("Pièces", l.rooms);
  out += kv("Ville", l.city);
  out += kv("Code postal", l.postal_code);
  if (l.furnished != null) out += kv("Meublé", l.furnished ? "oui" : "non");
  out += kv("Type de bien", l.property_type);
  out += kv("Annonceur", l.publisher_type);
  if (l.description) out += `Description: ${l.description.slice(0, 800)}\n`;

  out += "\n== Profil du candidat ==\n";
  const name = `${p.first_name ?? ""} ${p.last_name ?? ""}`.trim();
  if (name) out += kv("Nom complet", name);
  out += kv("Situation pro", p.situation);
  out += kv("Type de contrat recherché", p.contract_type);
  if (p.income_monthly != null) out += kv("Revenu net mensuel", `${p.income_monthly}€`);
  out += kv("Garant", p.guarantors);
  out += kv("Téléphone", p.phone);
  out += kv("Email", p.email);
  out += kv("Mode de contact préféré", p.preferred_contact);
  if (p.intro_message) {
    out += `Présentation libre (à exploiter sans la recopier mot pour mot):\n${p.intro_message.trim()}\n`;
  }
  out += "\nGénère le message maintenant. Uniquement le texte, prêt à coller dans Leboncoin.";
  return out;
}

export async function POST(req: Request): Promise<Response> {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return Response.json({ error: "JSON invalide" }, { status: 400 });
  }
  if (!body.listing || !body.profile) {
    return Response.json({ error: "listing et profile requis" }, { status: 400 });
  }

  try {
    const { text } = await generateText({
      model: MODEL,
      maxOutputTokens: 1024,
      system: SYSTEM,
      prompt: renderUserPrompt(body),
    });
    const clean = (text ?? "").trim();
    if (!clean) {
      return Response.json({ error: "réponse vide" }, { status: 502 });
    }
    return Response.json({ text: clean, model: MODEL });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return Response.json({ error: `génération échouée: ${msg}` }, { status: 502 });
  }
}
