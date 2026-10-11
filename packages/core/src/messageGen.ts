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

/** Ce qui se dit « en » : un type de contrat. « professeure en CDD ». */
const CONTRATS = /^(cdi|cdd|interim|alternance|apprentissage|stage|contrat)\b/;
/** Ce qui se dit en apposition : un statut. « professeure, fonctionnaire ». */
const STATUTS = /^(fonctionnaire|titulaire|independant|freelance|liberal|auto ?entrepreneur|retraite|etudiant|apprenti|interimaire)\b/;

/**
 * Le champ « contrat » est libre. On ne le reprend que s'il est reconnu, et la
 * façon de l'accrocher dépend de sa nature : « en CDI » se dit, « en
 * fonctionnaire » ne se dit pas. Un champ non reconnu est omis plutôt que de
 * produire « infirmière en non meublé ».
 */
function contrat(p: UserProfile): { texte: string; liaison: "en" | "apposition" } | null {
  const c = p.contract_type?.trim();
  if (!c) return null;
  const n = norm(c);
  const liaison = CONTRATS.test(n) ? "en" : STATUTS.test(n) ? "apposition" : null;
  if (!liaison) return null;
  // Déjà présent dans la situation (« Salarié CDI ») : ne pas le répéter.
  if (p.situation && norm(p.situation).includes(n)) return null;
  return { texte: c, liaison };
}

/** « infirmière en CDI », « professeure, fonctionnaire », « en CDI », ou « ». */
function qualite(p: UserProfile): string {
  const situation = p.situation?.trim();
  const c = contrat(p);
  if (situation && c) {
    return c.liaison === "en" ? `${situation} en ${c.texte}` : `${situation}, ${c.texte}`;
  }
  if (situation) return situation;
  if (!c) return "";
  return c.liaison === "en" ? `en ${c.texte}` : c.texte;
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
  // « j'ai un garant : X » plutôt que « mon garant est X » : le champ est libre,
  // et « mon garant est mes parents » ne s'accorde pas.
  return `j'ai un garant : ${g}`;
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
      if (revenu && g && !g.includes(" : ")) phrases.push(`Mon revenu net est de ${revenu} par mois et ${g}.`);
      else {
        if (revenu) phrases.push(`Mon revenu net est de ${revenu} par mois.`);
        if (g) phrases.push(`${cap(g)}.`);
      }
      if (cloture) phrases.push("Mon dossier est complet.");
      break;

    case 1:
      phrases.push(qui(revenu ? `, avec un revenu net de ${revenu} par mois` : ""));
      if (cloture) {
        if (g && !g.includes(" : ")) phrases.push(`${cap(g)} et tous mes justificatifs sont prêts.`);
        else {
          if (g) phrases.push(`${cap(g)}.`);
          phrases.push("Tous mes justificatifs sont prêts.");
        }
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
        if (g && !g.includes(" : ")) phrases.push(`${cap(g)}, et mon dossier est prêt à vous être envoyé.`);
        else {
          if (g) phrases.push(`${cap(g)}.`);
          phrases.push("Mon dossier est prêt à vous être envoyé.");
        }
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

const MOIS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

/** « 1er décembre », « 15 mars ». Sans l'année : on emménage dans l'année. */
function dateFr(iso: string): string | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!m) return null;
  const jour = Number(m[3]);
  const mois = MOIS[Number(m[2]) - 1];
  if (!mois || jour < 1 || jour > 31) return null;
  return `${jour === 1 ? "1er" : jour} ${mois}`;
}

/**
 * Le paragraphe pratique : combien de personnes, à partir de quand, pour
 * combien de temps.
 *
 * Ce sont, avec les ressources et le garant, les informations que les guides
 * destinés aux bailleurs citent comme servant à trier avant la visite. Les
 * omettre oblige le propriétaire à poser la question, c'est-à-dire à faire un
 * aller-retour de plus là où il a dix autres candidats.
 *
 * Chaque phrase n'apparaît que si le champ est rempli : un message sur un
 * profil incomplet ne doit pas afficher de trous.
 */
function pratique(p: UserProfile, v: number): string | null {
  const n = p.occupants;
  // Sans l'information, on parle au singulier : c'est le cas le plus fréquent
  // et ça évite un « nous » qui sonnerait faux.
  const pluriel = Boolean(n && n > 1);

  const qui = n && n > 0 ? (n === 1 ? "je serais la seule personne à y vivre" : `nous serions ${n} à y vivre`) : null;

  const quand = p.move_in_date ? dateFr(p.move_in_date) : null;
  // Quand la phrase commence déjà par « je serais », la variante « je serais
  // disponible » répéterait le verbe : on prend l'autre.
  const variante = qui ? 0 : v % 2;
  const date = quand
    ? [
        pluriel ? `nous pouvons emménager à partir du ${quand}` : `je peux emménager à partir du ${quand}`,
        pluriel
          ? `nous serions disponibles à partir du ${quand}`
          : `je serais disponible à partir du ${quand}`,
      ][variante]
    : null;

  const phrases: string[] = [];
  // Liées plutôt qu'enfilées : trois phrases qui commencent toutes par « je »
  // se lisent comme un formulaire, pas comme quelqu'un qui écrit.
  if (qui && date) phrases.push(cap(`${qui}, et ${date}.`));
  else if (qui) phrases.push(cap(`${qui}.`));
  else if (date) phrases.push(cap(`${date}.`));

  const duree = p.intended_stay?.trim();
  if (duree) {
    phrases.push(
      pluriel ? `Nous cherchons à nous installer ${duree}.` : `Je cherche à m'installer ${duree}.`,
    );
  }

  return phrases.length ? phrases.join(" ") : null;
}

/** Créneaux de visite réels s'ils sont connus, formule vague sinon. */
function disponibilite(p: UserProfile, parDefaut: string): string {
  const creneaux = p.visit_availability?.trim();
  return creneaux ? `Pour la visite, je suis disponible ${creneaux}.` : parDefaut;
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
    pratique(profile, v),
    disponibilite(profile, dispo),
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
    pratique(profile, v),
    disponibilite(profile, dispo),
    signature(profile, "Bien à vous,"),
  ]);
}

/**
 * Les pièces citées doivent exister pour la personne qui écrit : promettre un
 * contrat de travail et des bulletins de salaire à un indépendant se voit tout
 * de suite, et décrédibilise le reste du message. La liste suit celle du décret
 * du 5 novembre 2015, catégorie par catégorie.
 */
function justificatifs(p: UserProfile): string {
  const quoi = norm(`${p.situation ?? ""} ${p.contract_type ?? ""}`);
  // Un contrat de travail prime sur tout le reste : un étudiant en alternance
  // ou en CDI a bien des bulletins de salaire.
  if (/\b(cdi|cdd|interim|alternance|apprenti)\b/.test(quoi)) {
    return "pièce d'identité, contrat de travail, bulletins de salaire, avis d'imposition";
  }
  if (/independant|freelance|liberal|auto ?entrepreneur|gerant/.test(quoi)) {
    return "pièce d'identité, avis d'imposition, deux derniers bilans";
  }
  if (/retraite/.test(quoi)) {
    return "pièce d'identité, avis d'imposition, justificatifs de pension";
  }
  if (/etudiant/.test(quoi)) {
    return "pièce d'identité, certificat de scolarité, avis d'imposition et justificatifs du garant";
  }
  return "pièce d'identité, contrat de travail, bulletins de salaire, avis d'imposition";
}

function generatePro({ listing, profile, v }: Ctx): string {
  const ouverture = ["Madame, Monsieur,", "Bonjour,"][v % 2];
  const pieces = `L'ensemble des justificatifs (${justificatifs(profile)}) est prêt à vous être transmis.`;

  return assemble([
    ouverture,
    accroche(listing, v, [
      "Je me permets de vous contacter au sujet de votre annonce.",
      "Votre annonce a retenu toute mon attention.",
    ]),
    `${dossier(profile, fullName(profile), v, { cloture: false, formel: true })} ${pieces}`,
    pratique(profile, v),
    disponibilite(profile, "Je me tiens à votre disposition pour organiser une visite."),
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
