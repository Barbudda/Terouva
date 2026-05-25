import {
  Activity,
  Bell,
  Eye,
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
  eyebrow: "Beta v0.2 · gratuite",
  titleLines: [
    "On ne trouve pas un appart",
    "en cherchant.",
  ],
  titleEmphasis: "On en trouve un en arrivant le premier.",
  subtitle:
    "Quand tu ouvres Leboncoin, Terouva regarde par-dessus ton épaule. Chaque nouvelle annonce qui matche tes critères déclenche une notif desktop instantanée, avec un message de candidature déjà prêt. Tu cliques, tu envoies. Pas de bot, pas d'évasion : c'est ton navigateur, ta session, ton IP.",
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
    body: "Profil locataire, dossier, garant, message de présentation, critères de chaque recherche. Quatre minutes max. Tu ne le refais jamais.",
    detail: "→ Profil",
  },
  {
    n: "02",
    title: "Garde Leboncoin ouvert.",
    body: "L'extension Chrome observe ta page de résultats en temps réel — c'est ton navigateur, ta session, ton IP, indistinguable d'un user qui scroll. Chaque nouvelle annonce qui apparaît dans le DOM file directement vers Terouva.",
    detail: "→ Surveillance",
  },
  {
    n: "03",
    title: "Frappe en premier.",
    body: "Notif desktop dès qu'une annonce franchit ton seuil de score. Message déjà rédigé en 3 tons au choix. Tu copies, tu colles sur LBC, tu envoies. 20 secondes après que l'annonce est sortie.",
    detail: "→ Candidatures",
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
    icon: Eye,
    title: "Surveillance live LBC",
    body: "L'extension Chrome observe les pages de résultats que tu ouvres. Chaque annonce qui apparaît dans le DOM est envoyée à Terouva en local. Zéro requête supplémentaire vers LBC, indistinguable d'un user qui refresh.",
    accent: "signal",
  },
  {
    icon: Bell,
    title: "Notif desktop instantanée",
    body: "Dès qu'une annonce détectée franchit ton seuil de score, ping natif Windows. Tu te jettes dessus en 5 secondes.",
    accent: "urgent",
  },
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
    icon: Puzzle,
    title: "Pont Chrome ↔ desktop",
    body: "Serveur HTTP local 127.0.0.1 + token bearer. L'extension parle à Terouva en local, le trafic ne quitte jamais ta machine.",
    accent: "neutral",
  },
  {
    icon: Layers,
    title: "Import multi-URL",
    body: "Colle 20 URLs d'un coup, Terouva parse + score chacune en série. Pour quand tu n'as pas LBC ouvert.",
    accent: "neutral",
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
    q: "Comment Terouva voit les annonces en temps réel ?",
    a: "L'extension Chrome installe un observateur léger sur les pages de résultats Leboncoin que tu ouvres toi-même dans ton navigateur. Chaque nouvelle annonce qui apparaît dans le DOM (refresh manuel, scroll infini, ou re-fetch interne de LBC) est envoyée à l'app Terouva en local (127.0.0.1, token bearer). C'est ton navigateur, ta session, ton IP résidentielle. Aucun bot, aucune automation du browser, aucune signature à camoufler.",
  },
  {
    q: "Est-ce que c'est légal ?",
    a: "Oui. Tu consultes Leboncoin dans ton navigateur comme d'habitude. Terouva tourne sur ta machine et lit ce que TU as déjà chargé. Aucun scraping serveur, aucun bot agressif, aucune évasion de détection, aucun envoi automatisé sans ton clic.",
  },
  {
    q: "Combien ça coûte ?",
    a: "Gratuit en beta v0.1. Un modèle freemium pourra arriver plus tard, sans surprise et sans casser la version qui marche.",
  },
  {
    q: "Ça remplace mon navigateur ?",
    a: "Non. Terouva est un copilote, pas un agent autonome. Le navigateur n'est jamais piloté. Tu valides chaque action sensible : c'est toi qui copies le message, c'est toi qui cliques Envoyer.",
  },
  {
    q: "Et si je ferme Chrome ?",
    a: "La surveillance live s'arrête naturellement (logique : l'extension a besoin que LBC soit ouvert). Tu peux toujours ingérer manuellement une URL dans l'app, ou par lot. Un mode polling background tournera bientôt côté Terouva avec un rythme humain quand Chrome est fermé.",
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
