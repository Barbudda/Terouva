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
  Sparkles,
} from "lucide-react";
import type { ComponentType } from "react";

export const NAV_LINKS = [
  { href: "#problem", label: "Pourquoi" },
  { href: "#how", label: "Comment ça marche" },
  { href: "#features", label: "Fonctionnalités" },
  { href: "#privacy", label: "Confidentialité" },
  { href: "#faq", label: "Questions" },
];

export const RELEASES_URL = "https://github.com/Barbudda/Terouva/releases/latest";
export const RELEASES_DOWNLOAD_MSI =
  "https://github.com/Barbudda/Terouva/releases/latest/download/Terouva_0.2.0_x64_en-US.msi";

export const HERO = {
  eyebrow: "Version d'essai · gratuite",
  titleLines: [
    "Trouvez,",
    "sans chercher.",
  ],
  titleEmphasis: "Terouva surveille Leboncoin pour vous.",
  subtitle:
    "Dès qu'une annonce correspond à ce que vous cherchez, vous êtes prévenu, avec un message de candidature déjà prêt à envoyer. Tout reste sur votre ordinateur, et c'est vous qui gardez la main.",
  ctaPrimary: { label: "Télécharger pour Windows", href: RELEASES_DOWNLOAD_MSI },
  ctaSecondary: { label: "Voir comment ça marche", href: "#how" },
  meta: "Versions Mac et Linux à venir · Tout reste chez vous · Sans inscription",
};

export const PROBLEM_STATS = [
  {
    value: "47",
    unit: "candidatures",
    label: "reçues en moyenne pour un appartement à Paris, dans les deux premières heures.",
  },
  {
    value: "8",
    unit: "messages lus",
    label: "par le propriétaire, dans l'ordre d'arrivée. Les suivants sont rarement consultés.",
  },
  {
    value: "quelques minutes",
    unit: "d'avance",
    label: "suffisent souvent à faire la différence pour décrocher une visite.",
  },
];

export const PROBLEM = {
  eyebrow: "Pourquoi Terouva",
  title: "Louer est devenu une course.",
  titleAccent: "Arriver à temps compte autant que le dossier.",
  body: "Dans beaucoup de villes, les bonnes annonces partent en quelques heures. Entre le moment où vous voyez une annonce et celui où vous écrivez votre message, d'autres candidats sont souvent déjà passés.",
  punch: "Ce qui vous fait perdre une annonce, ce n'est pas votre dossier : c'est le temps que vous mettez à répondre.",
};

export const STEPS = [
  {
    n: "01",
    title: "Préparez votre profil, une seule fois.",
    body: "Vos informations, votre dossier, votre garant, votre message de présentation, et les critères de chaque recherche. Quelques minutes, et c'est fait pour de bon.",
    detail: "→ Votre profil",
  },
  {
    n: "02",
    title: "Laissez Leboncoin ouvert.",
    body: "Une petite extension pour votre navigateur Chrome regarde les annonces qui s'affichent sur vos pages de recherche, exactement comme si vous les parcouriez vous-même. Chaque nouvelle annonce est transmise à Terouva, sur votre ordinateur.",
    detail: "→ Vos annonces",
  },
  {
    n: "03",
    title: "Répondez sans attendre.",
    body: "Vous êtes prévenu dès qu'une annonce correspond à vos critères. Le message de candidature est déjà écrit, dans le ton de votre choix. Vous le copiez, vous le collez sur Leboncoin, et vous l'envoyez.",
    detail: "→ Vos candidatures",
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
    title: "Des annonces repérées en direct",
    body: "L'extension pour Chrome regarde les pages de recherche que vous ouvrez. Dès qu'une annonce apparaît, elle est transmise à Terouva sur votre ordinateur. Rien de plus que ce que vous consultez déjà.",
    accent: "signal",
  },
  {
    icon: Bell,
    title: "Une alerte au bon moment",
    body: "Dès qu'une annonce correspond vraiment à votre recherche, vous recevez une notification sur votre ordinateur. Vous pouvez réagir tout de suite.",
    accent: "urgent",
  },
  {
    icon: Gauge,
    title: "Un classement que vous comprenez",
    body: "Chaque annonce reçoit une note, et Terouva vous explique pourquoi, critère par critère. Vous voyez en un coup d'œil si elle vous convient.",
    accent: "signal",
  },
  {
    icon: MessagesSquare,
    title: "Des messages tout prêts",
    body: "Terouva rédige pour vous un message de candidature adapté à l'annonce (type de logement, surface, quartier...) et à votre profil, dans le ton que vous préférez : direct, chaleureux ou professionnel.",
    accent: "neutral",
  },
  {
    icon: Sparkles,
    title: "Rien à configurer",
    body: "Pas de compte, pas de carte bancaire, aucun réglage compliqué. Les messages sont créés directement sur votre ordinateur, gratuitement et en un instant.",
    accent: "signal",
  },
  {
    icon: Puzzle,
    title: "L'extension et l'application sur votre machine",
    body: "L'extension Chrome communique avec l'application directement sur votre ordinateur. Rien ne passe par internet.",
    accent: "neutral",
  },
  {
    icon: Layers,
    title: "Ajouter plusieurs annonces d'un coup",
    body: "Vous pouvez aussi coller plusieurs liens d'annonces à la fois : Terouva les ajoute et les classe pour vous.",
    accent: "neutral",
  },
  {
    icon: Activity,
    title: "Un tableau de bord clair",
    body: "Les meilleures annonces du jour, l'état de votre dossier, vos candidatures en attente : tout est réuni au même endroit.",
    accent: "neutral",
  },
  {
    icon: FileJson,
    title: "Vos données vous suivent",
    body: "Vous pouvez enregistrer toutes vos informations dans un fichier et les retrouver sur un autre ordinateur. Elles vous appartiennent.",
    accent: "neutral",
  },
  {
    icon: Lock,
    title: "Tout reste chez vous",
    body: "Vos informations sont enregistrées uniquement sur votre ordinateur. Il n'y a pas de serveur Terouva : ce que nous n'avons pas, nous ne pouvons pas le perdre.",
    accent: "signal",
  },
];

export const PRIVACY = {
  eyebrow: "Confidentialité",
  title: "Vos données restent chez vous.",
  body: "Pas de serveur, pas de compte, pas de publicité, pas de suivi. Vos informations ne quittent pas votre ordinateur.",
  points: [
    {
      label: "Où sont vos données",
      value: "Uniquement sur votre ordinateur.",
      mono: "rien en ligne",
    },
    {
      label: "Synchronisation",
      value: "Aucune.",
      mono: "rien n'est envoyé",
    },
    {
      label: "Compte à créer",
      value: "Aucun.",
      mono: "ni e-mail ni mot de passe",
    },
    {
      label: "Publicité et suivi",
      value: "Aucun.",
      mono: "pas de pisteur",
    },
  ],
};

export const FAQ_ITEMS = [
  {
    q: "Comment Terouva voit-il les annonces en temps réel ?",
    a: "L'extension Chrome regarde les pages de recherche Leboncoin que vous ouvrez vous-même. Chaque nouvelle annonce qui s'affiche est transmise à l'application Terouva, sur votre ordinateur. C'est votre navigateur, votre session, votre connexion : Terouva lit seulement ce que vous consultez déjà.",
  },
  {
    q: "Est-ce que c'est légal ?",
    a: "Oui. Vous consultez Leboncoin normalement, dans votre navigateur. Terouva fonctionne sur votre ordinateur et lit uniquement ce que vous avez déjà ouvert. Il n'envoie jamais de message à votre place : c'est toujours vous qui décidez.",
  },
  {
    q: "Combien ça coûte ?",
    a: "C'est gratuit pendant la période d'essai. Si une offre payante arrive un jour, ce sera annoncé clairement, et la version qui fonctionne aujourd'hui ne sera pas retirée.",
  },
  {
    q: "Est-ce que ça agit à ma place ?",
    a: "Non. Terouva vous aide, mais ne fait rien tout seul. C'est vous qui copiez le message et qui cliquez sur « Envoyer ». Vous gardez la main à chaque étape.",
  },
  {
    q: "Et si je ferme mon navigateur ?",
    a: "La surveillance en direct s'arrête, car l'extension a besoin que Leboncoin soit ouvert. Vous pouvez aussi recevoir les annonces autrement : en transférant à Terouva les e-mails d'alerte que Leboncoin vous envoie, vos nouvelles annonces sont ajoutées à votre liste.",
  },
  {
    q: "Où vont mes données ?",
    a: "Nulle part. Tout est enregistré sur votre ordinateur. Pas de serveur, pas de cloud, pas de sauvegarde à distance, pas de suivi. Même les messages de candidature sont écrits sur votre machine.",
  },
  {
    q: "Faut-il un compte ou payer pour les messages ?",
    a: "Non, rien du tout. Terouva écrit les messages sur votre ordinateur, à partir de votre profil et des détails de l'annonce, dans trois tons au choix. C'est gratuit, immédiat, et sans aucune connaissance technique.",
  },
  {
    q: "Mac et Linux, c'est pour quand ?",
    a: "L'application fonctionne d'abord sur Windows. Les versions pour Mac et Linux arriveront dans les semaines qui viennent.",
  },
];

export const CTA_FINAL = {
  title: "Prêt à essayer ?",
  subtitle:
    "Installez Terouva, renseignez votre profil et vos recherches. Vous serez prêt pour la prochaine annonce.",
  primary: { label: "Télécharger pour Windows", href: RELEASES_DOWNLOAD_MSI },
  secondary: { label: "Voir toutes les versions", href: RELEASES_URL },
};

export const FOOTER = {
  signature:
    "Conçu pour vous aider à trouver votre logement plus sereinement.",
  disclaimer: "Sans lien avec Leboncoin.",
};

/** Annonces décoratives affichées en fond du hero (données d'exemple). */
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
