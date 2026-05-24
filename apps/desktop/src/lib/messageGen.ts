import type { Listing, MessageTone, UserProfile } from "@/types";

interface Ctx {
  listing: Listing;
  profile: UserProfile;
}

function fullName(p: UserProfile): string {
  return [p.first_name, p.last_name].filter(Boolean).join(" ").trim() || "—";
}

function hookLine(l: Listing): string {
  const bits: string[] = [];
  if (l.surface) bits.push(`${l.surface}m²`);
  if (l.rooms) bits.push(`${l.rooms} pièces`);
  if (l.city) bits.push(l.city);
  if (l.price) bits.push(`${l.price}€/mois`);
  return bits.join(" • ");
}

function dossier(p: UserProfile): string[] {
  const out: string[] = [];
  if (p.situation) out.push(p.situation);
  if (p.contract_type) out.push(p.contract_type);
  if (p.income_monthly) out.push(`${p.income_monthly}€ net/mois`);
  if (p.guarantors) out.push(`garant : ${p.guarantors}`);
  return out;
}

function generateDirect({ listing, profile }: Ctx): string {
  const name = fullName(profile);
  const intro = `Bonjour,`;
  const hook = `Votre annonce (${hookLine(listing)}) m'intéresse.`;
  const me = `Je suis ${name}${profile.situation ? `, ${profile.situation}` : ""}.`;
  const dossierLine =
    dossier(profile).length > 0
      ? `Mon dossier : ${dossier(profile).join(", ")}.`
      : "";
  const docs = `Dossier locataire complet disponible immédiatement.`;
  const close = `Disponible pour visiter rapidement. Vous pouvez me joindre au ${profile.phone || "[téléphone]"}.`;
  const sign = `Cordialement,\n${name}`;
  return [intro, "", hook, me, dossierLine, docs, "", close, "", sign]
    .filter(Boolean)
    .join("\n");
}

function generateWarm({ listing, profile }: Ctx): string {
  const name = fullName(profile);
  const intro = `Bonjour,`;
  const hook = `Votre annonce a attiré mon attention : ${hookLine(listing)}, exactement ce que je recherche.`;
  const me = profile.intro_message?.trim()
    ? profile.intro_message.trim()
    : `Je suis ${name}${profile.situation ? `, actuellement ${profile.situation}` : ""}.`;
  const dossierLine =
    dossier(profile).length > 0
      ? `Côté dossier : ${dossier(profile).join(", ")}. Tous les justificatifs sont prêts.`
      : `Dossier locataire prêt à être transmis.`;
  const close = `Je serais ravi(e) d'échanger et de visiter le logement dès que possible. Vous pouvez me joindre au ${profile.phone || "[téléphone]"} ou par message.`;
  const sign = `Bien à vous,\n${name}`;
  return [intro, "", hook, "", me, "", dossierLine, "", close, "", sign].join("\n");
}

function generatePro({ listing, profile }: Ctx): string {
  const name = fullName(profile);
  const intro = `Madame, Monsieur,`;
  const hook = `Je me permets de vous contacter au sujet de votre annonce (${hookLine(listing)}), qui correspond à mes critères.`;
  const me = `Je m'appelle ${name}${profile.situation ? `, ${profile.situation}` : ""}${
    profile.contract_type ? ` en ${profile.contract_type}` : ""
  }${profile.income_monthly ? `, avec un revenu net mensuel de ${profile.income_monthly}€` : ""}.`;
  const dossierLine = profile.guarantors
    ? `Je dispose d'un garant : ${profile.guarantors}.`
    : `Je peux fournir un garant si nécessaire.`;
  const docs = `L'ensemble des pièces justificatives (identité, contrat, bulletins de salaire, avis d'imposition) sont disponibles sur demande.`;
  const close = `Je reste à votre disposition pour convenir d'une visite. Vous pouvez me joindre au ${profile.phone || "[téléphone]"} ou par e-mail à ${profile.email || "[email]"}.`;
  const sign = `Cordialement,\n${name}`;
  return [intro, "", hook, "", me, dossierLine, docs, "", close, "", sign].join("\n");
}

export function generateMessage(
  listing: Listing,
  profile: UserProfile,
  tone: MessageTone,
): string {
  const ctx = { listing, profile };
  switch (tone) {
    case "direct":
      return generateDirect(ctx);
    case "warm":
      return generateWarm(ctx);
    case "pro":
      return generatePro(ctx);
  }
}

export const TONE_LABELS: Record<MessageTone, string> = {
  direct: "Direct",
  warm: "Chaleureux",
  pro: "Professionnel",
};
