import {
  Activity,
  Bell,
  FileJson,
  Gauge,
  Layers,
  Lock,
  MessagesSquare,
  Puzzle,
} from "lucide-react";
import type { ComponentType } from "react";

export const NAV_LINKS = [
  { href: "#problem", label: "Le problème" },
  { href: "#how", label: "Comment ça marche" },
  { href: "#features", label: "Features" },
  { href: "#privacy", label: "Confidentialité" },
  { href: "#faq", label: "FAQ" },
];

export const HERO = {
  eyebrow: "Beta v0.1 · gratuite",
  titleLines: [
    "On ne trouve pas un appart",
    "en cherchant.",
  ],
  titleEmphasis: "On en trouve un en arrivant le premier.",
  subtitle:
    "Terouva surveille Leboncoin, classe les annonces selon tes critères et te prépare ton message de candidature pendant que les autres lisent encore l'annonce.",
  ctaPrimary: { label: "Télécharger pour Windows", href: "#download" },
  ctaSecondary: { label: "Voir comment", href: "#how" },
  meta: "macOS & Linux bientôt · 100 % local · Aucun compte",
};

export const PROBLEM_STATS = [
  {
    value: "47",
    unit: "candidatures",
    label: "en moyenne sur une annonce LBC à Paris dans les 2 premières heures.",
  },
  {
    value: "8",
    unit: "messages lus",
    label: "par le propriétaire, dans l'ordre d'arrivée. Les 39 autres sont ignorés.",
  },
  {
    value: "~3 min",
    unit: "de réactivité",
    label: "c'est le délai gagnant moyen. Plus tu attends, plus tu disparais.",
  },
];

export const PROBLEM = {
  eyebrow: "Le problème",
  title: "50 candidatures en 2 heures.",
  titleAccent: "Le proprio en lit 8.",
  body: "Dans toutes les grandes villes françaises, la location est devenue une course. Refresh entre deux réunions, annonce vue 30 min trop tard, 5 min à rédiger, et au moment où tu cliques « Envoyer », c'est déjà plié.",
  punch: "Le délai qui te tue, c'est ces 30 min + 5 min. Pas ton dossier.",
};

export const STEPS = [
  {
    n: "01",
    title: "Configure une fois.",
    body: "Profil locataire, dossier, garant, message de présentation. Quatre minutes max. Tu ne le refais jamais.",
    detail: "→ Profil",
  },
  {
    n: "02",
    title: "Capture une annonce.",
    body: "Colle l'URL, ou clique l'extension Chrome depuis la page LBC ouverte. Terouva parse et score selon TES critères.",
    detail: "→ Score expliqué",
  },
  {
    n: "03",
    title: "Frappe en premier.",
    body: "Message déjà rédigé avec tes infos. Tu choisis le ton (direct, chaleureux, pro), tu copies, tu colles sur LBC. 20 secondes.",
    detail: "→ Marquer envoyé",
  },
];

type Feature = {
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  body: string;
  accent: "signal" | "urgent" | "neutral";
};

export const FEATURES: Feature[] = [
  {
    icon: Gauge,
    title: "Scoring transparent",
    body: "Chaque score s'explique règle par règle. Tu sais pourquoi une annonce est à 92, pas à 60. Pas une boîte noire.",
    accent: "signal",
  },
  {
    icon: MessagesSquare,
    title: "Messages 3 tons",
    body: "Direct, chaleureux, professionnel. Auto-rempli avec ton profil et les détails de l'annonce. Aucun copier-coller manuel.",
    accent: "neutral",
  },
  {
    icon: Bell,
    title: "Notif desktop immédiate",
    body: "Score ≥ seuil → ping natif Windows. Tu te jettes dessus en 5 secondes, sans surveiller LBC en permanence.",
    accent: "urgent",
  },
  {
    icon: Layers,
    title: "Import multi-URL",
    body: "Colle 20 URLs d'un coup, Terouva parse + score chacune en série. Idéal après une session de scroll.",
    accent: "neutral",
  },
  {
    icon: Puzzle,
    title: "Extension Chrome",
    body: "1 clic depuis n'importe quelle page LBC ouverte. Le parsing tourne dans TON navigateur, avec TES cookies.",
    accent: "signal",
  },
  {
    icon: Activity,
    title: "Dashboard cockpit",
    body: "Top annonces du jour, dossier prêt ou non, candidatures en attente. Tu sais quoi faire en 5 secondes.",
    accent: "neutral",
  },
  {
    icon: FileJson,
    title: "Backup JSON",
    body: "Export/import complet. Tu changes d'ordi, tu réimportes, tout est là. Tes données t'appartiennent.",
    accent: "neutral",
  },
  {
    icon: Lock,
    title: "100 % local SQLite",
    body: "Tout vit dans terouva.db sur ton disque. Zéro serveur Terouva. Ce qu'on n'a pas, on ne peut pas le perdre.",
    accent: "signal",
  },
];

export const PRIVACY = {
  eyebrow: "Confidentialité",
  title: "Tes données ne sortent pas de chez toi.",
  body: "Pas de serveur Terouva. Pas de compte. Pas de tracker. Pas d'analytics tiers. Pas de cloud. Pas de bullshit.",
  points: [
    {
      label: "Stockage",
      value: "terouva.db sur ton disque",
      mono: "~/AppData/.../terouva.db",
    },
    {
      label: "Synchronisation",
      value: "Aucune.",
      mono: "POST /sync · 404 Not Found",
    },
    {
      label: "Compte requis",
      value: "Aucun.",
      mono: "auth.required = false",
    },
    {
      label: "Tracker analytics",
      value: "Aucun.",
      mono: "window.analytics === undefined",
    },
  ],
};

export const STACK_ITEMS = [
  { name: "Tauri 2", role: "Shell desktop natif (Rust)" },
  { name: "React 19 + TS", role: "UI cockpit" },
  { name: "Tailwind v4", role: "Design system" },
  { name: "SQLite", role: "Base locale, via tauri-plugin-sql" },
  { name: "scraper (Rust)", role: "Parse HTML LBC en local" },
  { name: "Chrome MV3", role: "Extension capture LBC" },
];

export const FAQ_ITEMS = [
  {
    q: "Est-ce que c'est légal ?",
    a: "Oui. Tu consultes Leboncoin dans ton navigateur, comme d'habitude. Terouva tourne sur ta machine et utilise les pages que TU ouvres. Aucun scraping serveur, aucun bot agressif, aucun envoi automatisé sans ton clic.",
  },
  {
    q: "Combien ça coûte ?",
    a: "Gratuit en beta v0.1. Un modèle freemium pourra arriver plus tard, sans surprise et sans casser la version qui marche.",
  },
  {
    q: "Ça remplace mon navigateur ?",
    a: "Non. Terouva est un copilote, pas un agent autonome. Tu valides chaque action sensible : c'est toi qui copies le message, qui ouvres LBC, qui cliques Envoyer.",
  },
  {
    q: "Mes données partent où ?",
    a: "Nulle part. Pas de cloud Terouva, pas de backup distant, pas d'analytics. Backup JSON manuel si tu veux migrer toi-même.",
  },
  {
    q: "Mac et Linux, c'est pour quand ?",
    a: "L'app est codée avec Tauri 2, donc cross-platform par construction. Windows en premier (priorité Beta). Builds Mac & Linux dans les semaines qui viennent.",
  },
];

export const CTA_FINAL = {
  title: "Arrête de scroll.",
  subtitle:
    "Télécharge, configure ton profil, branche tes recherches. Tu seras prêt pour la prochaine annonce.",
  primary: { label: "Télécharger pour Windows", href: "#download" },
  secondary: { label: "Lire la doc", href: "#how" },
};

export const FOOTER = {
  signature:
    "Fait par un dev qui en a marre de perdre des appartements à 5 minutes près.",
  disclaimer: "Pas affilié à Leboncoin.",
};

/** Listings used in the hero ticker (decorative, plausible fake data). */
export const TICKER_LISTINGS = [
  { title: "Studio lumineux 28m² · Paris 11e", price: 1240, score: 92 },
  { title: "2 pièces refait à neuf · Lyon 3e", price: 980, score: 87 },
  { title: "T1 meublé balcon · Bordeaux Bastide", price: 720, score: 74 },
  { title: "Loft 42m² ascenseur · Paris 20e", price: 1450, score: 88 },
  { title: "Duplex sous combles · Lille Vauban", price: 845, score: 81 },
  { title: "Studio 22m² · Toulouse Capitole", price: 590, score: 79 },
  { title: "2 pièces lumineux · Nantes Chantenay", price: 770, score: 85 },
  { title: "T2 vue jardin · Marseille 6e", price: 880, score: 76 },
];
