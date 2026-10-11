import type { Listing, MessageTone, UserProfile } from "./types";

/**
 * Moteur de messages Terouva, 100 % local, aucune API externe.
 *
 * Écrit un message de candidature court, dans l'un des trois tons, avec des
 * variantes de formulation (un nouveau clic donne une autre version).
 *
 * **Le message ne récite jamais l'annonce.** Pas de surface, pas de prix, pas
 * de nombre de pièces, pas de ville ni de code postal : la personne qui reçoit
 * le message a écrit l'annonce et sait de laquelle il s'agit. Les lui répéter
 * ne prouve rien, allonge le message et sent le texte fabriqué. On commence
 * donc par ce que le propriétaire ne sait pas encore : qui écrit, et quel
 * dossier. Seule exception, une phrase courte sur ce qui a plu dans l'annonce
 * (le balcon, la lumière, le calme) : ça, c'est une réaction de lecteur, pas
 * une fiche technique.
 *
 * Invariants (garantis dans toutes les variantes) :
 * - le nom et le téléphone (ou un repère à compléter) apparaissent toujours ;
 * - le ton « pro » mentionne le revenu s'il est renseigné ;
 * - le ton « chaleureux » réutilise le message de présentation s'il existe ;
 * - aucune forme entre parenthèses du type « intéressé(e) » : on ne connaît pas
 *   le genre de l'utilisateur, et ces parenthèses signent un texte à trous.
 */

interface Ctx {
  listing: Listing;
  profile: UserProfile;
  v: number; // index de variante
}

function fullName(p: UserProfile): string {
  return [p.first_name, p.last_name].filter(Boolean).join(" ").trim() || "[votre nom]";
}

function norm(s: string): string {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

/**
 * Montant à la française : « 2 400 € ». Espace ordinaire et non insécable fine,
 * parce que le message finit collé dans un formulaire quelconque, où les
 * espaces exotiques s'affichent parfois en carré.
 */
function montant(n: number): string {
  return `${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;
}

/**
 * Ce qu'on remarque dans une annonce et qu'on a envie de commenter.
 *
 * Volontairement restreint aux agréments : on dit « le balcon m'a plu », jamais
 * « l'ascenseur m'a plu ». L'ascenseur, la cave ou le parking comptent dans la
 * note, pas dans le compliment.
 */
function agrement(l: Listing): string | null {
  const text = norm(`${l.title ?? ""} ${l.description ?? ""}`);
  const map: Array<[RegExp, string]> = [
    [/terrasse/, "la terrasse"],
    [/\bjardin\b/, "le jardin"],
    [/\bbalcon\b|loggia/, "le balcon"],
    [/lumineux|lumineuse|ensoleill|plein sud/, "la lumière"],
    [/\bcalme\b|au calme|tranquille/, "le calme"],
    [/parquet|cheminee|moulures|cachet|charme/, "le cachet"],
    [/\bvue\b|degagee|panoram/, "la vue"],
    [/renov|refait a neuf|refait\b/, "la rénovation"],
  ];
  for (const [re, label] of map) if (re.test(text)) return label;
  return null;
}

/** « Votre annonce m'intéresse beaucoup, en particulier pour le balcon. » */
function accroche(l: Listing, v: number, variantes: string[]): string {
  const quoi = agrement(l);
  const base = variantes[v % variantes.length];
  return quoi ? `${base.replace(/\.$/, "")}, en particulier pour ${quoi}.` : base;
}

/**
 * Le contrat de travail n'est repris que s'il ressemble à un contrat : le champ
 * est libre, et certains y rangent tout autre chose (« non meublé »…). Mieux
 * vaut l'omettre qu'écrire « infirmière en non meublé ».
 */
function contrat(p: UserProfile): string | null {
  const c = p.contract_type?.trim();
  if (!c) return null;
  const connu = /^(cdi|cdd|interim|intérim|alternance|apprentissage|stage|fonctionnaire|titulaire|independant|indépendant|freelance|liberal|libéral|retraite|retraité|etudiant|étudiant)\b/i;
  if (!connu.test(norm(c))) return null;
  // Déjà présent dans la situation (« Salarié CDI ») : ne pas le répéter.
  if (p.situation && norm(p.situation).includes(norm(c))) return null;
  return c;
}

/** « infirmière en CDI », « infirmière », « en CDI », ou « ». */
function qualite(p: UserProfile): string {
  const situation = p.situation?.trim();
  const c = contrat(p);
  if (situation && c) return `${situation} en ${c}`;
  return situation || (c ? `en ${c}` : "");
}

/**
 * La garantie, dite comme on la dit à l'oral. Le champ est libre : « garantie
 * Visale » se tourne autrement que « mes parents ».
 */
function garantie(p: UserProfile): string | null {
  const g = p.guarantors?.trim();
  if (!g) return null;
  if (/^(garantie|visale|caution|loca ?pass)/i.test(norm(g))) {
    return `je bénéficie de la ${g}`;
  }
  return `mon garant est ${g}`;
}

/**
 * Le paragraphe qui compte : qui écrit, ce qu'il gagne, qui se porte garant.
 * C'est la seule chose que le propriétaire ne sait pas encore.
 *
 * Trois tournures, pas une seule : un dossier toujours annoncé dans le même
 * ordre et la même phrase se reconnaît d'un message à l'autre, et c'est
 * exactement ce qui fait « texte à trous ». `cloture` est désactivée au ton
 * professionnel, où la phrase sur les justificatifs dit déjà la même chose.
 */
function dossier(
  p: UserProfile,
  avecNom: string | null,
  variante: number,
  { cloture = true, formel = false }: { cloture?: boolean; formel?: boolean } = {},
): string {
  const q = qualite(p);
  const revenu = p.income_monthly ? montant(p.income_monthly) : null;
  const g = garantie(p);
  // Décalé d'un cran tous les trois : sinon les variantes 0 et 3 (puis 1 et 4…)
  // rendraient exactement le même message, et « régénérer » ne servirait à rien.
  const v = variante + Math.floor(variante / 3);

  const qui = (suite = "") =>
    avecNom
      ? `Je suis ${avecNom}${q ? `, ${q}` : ""}${suite}.`
      : q
        ? `Je suis ${q}${suite}.`
        : null;

  const phrases: Array<string | null> = [];

  switch (v % 3) {
    case 0:
      phrases.push(qui());
      if (revenu) phrases.push(`Mon revenu net est de ${revenu} par mois${g ? ` et ${g}` : ""}.`);
      else if (g) phrases.push(`${cap(g)}.`);
      if (cloture) phrases.push("Mon dossier est complet.");
      break;

    case 1:
      phrases.push(qui(revenu ? `, avec un revenu net de ${revenu} par mois` : ""));
      if (cloture) {
        phrases.push(g ? `${cap(g)} et tous mes justificatifs sont prêts.` : "Tous mes justificatifs sont prêts.");
      } else if (g) {
        phrases.push(`${cap(g)}.`);
      }
      break;

    default:
      phrases.push(qui());
      if (revenu) {
        // « Je gagne » sonne juste à l'oral, pas dans une lettre formelle.
        phrases.push(
          formel ? `Mon revenu net mensuel est de ${revenu}.` : `Je gagne ${revenu} net par mois.`,
        );
      }
      if (cloture) {
        phrases.push(
          g ? `${cap(g)}, et mon dossier est prêt à vous être envoyé.` : "Mon dossier est prêt à vous être envoyé.",
        );
      } else if (g) {
        phrases.push(`${cap(g)}.`);
      }
  }

  const texte = phrases.filter(Boolean).join(" ");
  // Profil vide : mieux vaut une phrase honnête que rien du tout.
  return texte || "Je vous écris au sujet de votre annonce. Mon dossier est prêt.";
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function telephone(p: UserProfile): string {
  return p.phone?.trim() || "[téléphone]";
}

/** Nom, puis téléphone (et courriel au ton pro) : comme on signe un e-mail. */
function signature(p: UserProfile, formule: string, avecEmail = false): string {
  const lignes = [formule, fullName(p), telephone(p)];
  if (avecEmail && p.email?.trim()) lignes.push(p.email.trim());
  return lignes.join("\n");
}

function assemble(blocs: Array<string | null>): string {
  return blocs.filter((b): b is string => Boolean(b)).join("\n\n");
}

// ────────────────────────────── tons ──────────────────────────────

function generateDirect({ listing, profile, v }: Ctx): string {
  const dispo = [
    "Je peux visiter dès que vous le souhaitez.",
    "Je suis disponible pour visiter rapidement, en semaine comme le week-end.",
    "Dites-moi quand vous faites visiter, je m'organise.",
  ][v % 3];

  return assemble([
    "Bonjour,",
    accroche(listing, v, [
      "Votre annonce m'intéresse beaucoup.",
      "Votre annonce correspond à ce que je cherche.",
      "Votre annonce a retenu mon attention.",
    ]),
    dossier(profile, null, v),
    dispo,
    signature(profile, "Cordialement,"),
  ]);
}

function generateWarm({ listing, profile, v }: Ctx): string {
  const presentation = profile.intro_message?.trim() || null;
  const dispo = [
    "Je serais disponible pour visiter quand cela vous arrange.",
    "Je peux me rendre disponible facilement pour une visite, dites-moi ce qui vous convient.",
    "Si le logement est toujours libre, j'aimerais beaucoup en discuter avec vous.",
  ][v % 3];

  return assemble([
    "Bonjour,",
    accroche(listing, v, [
      "Votre annonce m'a tout de suite plu.",
      "Je viens de voir votre annonce et elle me plaît beaucoup.",
      "Votre annonce est exactement le genre de logement que je cherche.",
    ]),
    presentation,
    dossier(profile, fullName(profile), v),
    dispo,
    signature(profile, "Bien à vous,"),
  ]);
}

function generatePro({ listing, profile, v }: Ctx): string {
  const ouverture = ["Madame, Monsieur,", "Bonjour,"][v % 2];
  const pieces =
    "L'ensemble des justificatifs (pièce d'identité, contrat de travail, bulletins de salaire, avis d'imposition) est prêt à vous être transmis.";

  return assemble([
    ouverture,
    accroche(listing, v, [
      "Je me permets de vous contacter au sujet de votre annonce.",
      "Votre annonce a retenu toute mon attention.",
    ]),
    `${dossier(profile, fullName(profile), v, { cloture: false, formel: true })} ${pieces}`,
    "Je me tiens à votre disposition pour organiser une visite.",
    signature(profile, "Cordialement,", true),
  ]);
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
