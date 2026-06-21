import type { Listing, MessageTone, UserProfile } from "./types";

/**
 * Moteur de messages Terouva — 100 % local, aucune API externe.
 *
 * Produit un message de candidature qui **cite des détails concrets de l'annonce**
 * (type de bien, surface, quartier, une caractéristique repérée dans la
 * description) pour montrer qu'elle a été lue, décliné en 3 tons, avec des
 * variantes de formulation (un nouveau clic = une nouvelle version).
 *
 * Invariants (garantis dans toutes les variantes, pour la fiabilité) :
 * - le nom et le téléphone (ou un placeholder) apparaissent toujours ;
 * - le ton « pro » mentionne le revenu si renseigné ;
 * - le ton « chaleureux » réutilise le message de présentation s'il existe.
 */

interface Ctx {
  listing: Listing;
  profile: UserProfile;
  v: number; // index de variante
}

function fullName(p: UserProfile): string {
  return [p.first_name, p.last_name].filter(Boolean).join(" ").trim() || "—";
}

function norm(s: string): string {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

/** « ce studio de 28m² », « ce 2 pièces de 45m² », « cet appartement »… */
function propertyDescriptor(l: Listing): string {
  const t = norm(`${l.title ?? ""}`);
  let base: string;
  if (l.rooms === 1 || /\bstudio\b/.test(t)) base = "ce studio";
  else if (l.rooms && l.rooms > 1) base = `ce ${l.rooms} pièces`;
  else if (l.property_type === "house" || /maison|villa|pavillon/.test(t))
    base = "cette maison";
  else base = "cet appartement";
  return l.surface ? `${base} de ${l.surface}m²` : base;
}

/** « à Paris (75011) », « à Lyon », ou « ». */
function locationPhrase(l: Listing): string {
  if (!l.city) return "";
  return l.postal_code ? ` à ${l.city} (${l.postal_code})` : ` à ${l.city}`;
}

/** Repère une caractéristique notable dans le titre + description. */
function notableFeature(l: Listing): string | null {
  const text = norm(`${l.title ?? ""} ${l.description ?? ""}`);
  const map: Array<[RegExp, string]> = [
    [/\bbalcon\b|terrasse|loggia/, "l'espace extérieur"],
    [/lumineux|lumineuse|ensoleill|plein sud|clair\b/, "la luminosité"],
    [/\bcalme\b|au calme|tranquille/, "le calme"],
    [/renov|refait|refait a neuf|neuf\b|moderne/, "la rénovation récente"],
    [/parquet|cheminee|moulures|cachet|charme|ancien/, "le cachet"],
    [/\bvue\b|degagee|panoram/, "la vue"],
    [/ascenseur/, "l'ascenseur"],
    [/cave\b|parking|garage|box\b/, "les annexes (cave/parking)"],
  ];
  for (const [re, label] of map) if (re.test(text)) return label;
  return null;
}

/** Phrase d'accroche personnalisée, qui prouve qu'on a lu l'annonce. */
function hook(l: Listing, v: number): string {
  const what = propertyDescriptor(l);
  const where = locationPhrase(l);
  const feat = notableFeature(l);
  const price = l.price ? ` (${l.price}€/mois)` : "";
  const featClause = feat ? `, et ${feat} en particulier,` : "";
  const variants = [
    `${cap(what)}${where}${price}${featClause} correspond exactement à ce que je recherche.`,
    `Je suis très intéressé(e) par ${what}${where}${price}${feat ? ` — ${feat} retient mon attention` : ""}.`,
    `${cap(what)}${where} me plaît beaucoup${feat ? `, notamment pour ${feat}` : ""}.`,
  ];
  return variants[v % variants.length];
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Éléments forts du dossier, en phrase naturelle (pas une fiche). */
function dossierSentence(p: UserProfile): string {
  const parts: string[] = [];
  if (p.situation) parts.push(p.situation.trim());
  if (p.contract_type) parts.push(p.contract_type.trim());
  if (p.income_monthly) parts.push(`revenu net de ${p.income_monthly}€/mois`);
  if (p.guarantors) parts.push(`garant : ${p.guarantors.trim()}`);
  if (parts.length === 0) return "";
  return parts.join(", ");
}

function phoneClause(p: UserProfile): string {
  return p.phone?.trim() || "[téléphone]";
}

function pick<T>(arr: T[], v: number): T {
  return arr[v % arr.length];
}

// ────────────────────────────── tons ──────────────────────────────

function generateDirect({ listing, profile, v }: Ctx): string {
  const name = fullName(profile);
  const intro = pick(["Bonjour,", "Bonjour,"], v);
  const me = `Je suis ${name}${profile.situation ? `, ${profile.situation}` : ""}.`;
  const dossier = dossierSentence(profile);
  const dossierLine = dossier ? `Mon dossier : ${dossier}. Tout est prêt à être transmis.` : `Dossier complet disponible immédiatement.`;
  const close = pick(
    [
      `Disponible pour visiter très vite. Joignable au ${phoneClause(profile)}.`,
      `Je peux visiter dès que possible — ${phoneClause(profile)}.`,
    ],
    v,
  );
  return [intro, "", hook(listing, v), me, dossierLine, "", close, "", `Cordialement,\n${name}`].join("\n");
}

function generateWarm({ listing, profile, v }: Ctx): string {
  const name = fullName(profile);
  const intro = pick(["Bonjour,", "Bonjour et merci pour votre annonce,"], v);
  const me = profile.intro_message?.trim()
    ? profile.intro_message.trim()
    : `Je m'appelle ${name}${profile.situation ? `, actuellement ${profile.situation}` : ""}.`;
  const dossier = dossierSentence(profile);
  const dossierLine = dossier
    ? `Côté dossier : ${dossier} — tous les justificatifs sont prêts.`
    : `Mon dossier locataire est prêt à être transmis.`;
  const close = pick(
    [
      `Je serais ravi(e) d'échanger et de visiter dès que vous le pouvez. Vous pouvez me joindre au ${phoneClause(profile)}.`,
      `Ce serait un plaisir d'en discuter et de visiter rapidement — ${phoneClause(profile)}.`,
    ],
    v,
  );
  return [intro, "", hook(listing, v), "", me, "", dossierLine, "", close, "", `Bien à vous,\n${name}`].join("\n");
}

function generatePro({ listing, profile, v }: Ctx): string {
  const name = fullName(profile);
  const intro = pick(["Madame, Monsieur,", "Bonjour,"], v);
  const me = `Je m'appelle ${name}${profile.situation ? `, ${profile.situation}` : ""}${
    profile.contract_type ? ` en ${profile.contract_type}` : ""
  }${profile.income_monthly ? `, avec un revenu net mensuel de ${profile.income_monthly}€` : ""}.`;
  const garant = profile.guarantors
    ? `Je dispose d'un garant : ${profile.guarantors}.`
    : `Je peux fournir un garant si nécessaire.`;
  const docs = `L'ensemble des pièces (identité, contrat, bulletins de salaire, avis d'imposition) sont disponibles sur demande.`;
  const close = `Je reste à votre disposition pour convenir d'une visite. Vous pouvez me joindre au ${phoneClause(profile)}${
    profile.email ? ` ou par e-mail à ${profile.email}` : ""
  }.`;
  return [intro, "", hook(listing, v), "", me, garant, docs, "", close, "", `Cordialement,\n${name}`].join("\n");
}

/**
 * Génère le message. `variant` permet d'obtenir une formulation différente à
 * chaque appel (bouton « régénérer ») ; par défaut aléatoire.
 */
export function generateMessage(
  listing: Listing,
  profile: UserProfile,
  tone: MessageTone,
  variant?: number,
): string {
  const v = variant ?? Math.floor(Math.random() * 6);
  const ctx: Ctx = { listing, profile, v };
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
