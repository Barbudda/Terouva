/**
 * Le masthead est un en-tête de publication : trois colonnes intitulées, pas
 * une rangée de liens. Chaque colonne dit à quel monde elle mène : l'outil,
 * les guides, les droits. Les intitulés sont en capitales monospace (`.champ`).
 */
export const NAV_COLONNES = [
  {
    titre: "L'outil",
    liens: [
      { href: "#gains", label: "Ce que vous y gagnez" },
      { href: "#fonctions", label: "Ce que fait Terouva" },
      { href: "/outils", label: "Outils gratuits" },
      { href: "#inscription", label: "Être prévenu" },
    ],
  },
  {
    titre: "Les guides",
    liens: [
      { href: "/guides/dossier-de-location", label: "Le dossier de location" },
      { href: "/guides/louer-sans-garant", label: "Louer sans garant" },
      { href: "/guides/repondre-a-une-annonce-de-location", label: "Répondre à une annonce" },
      { href: "/guides", label: "Tous les guides" },
    ],
  },
  {
    titre: "Vos droits",
    liens: [
      { href: "/guides/depot-de-garantie", label: "Le dépôt de garantie" },
      { href: "/guides/preavis-location", label: "Le préavis" },
      { href: "/guides/etat-des-lieux", label: "L'état des lieux" },
      { href: "/guides/refus-de-dossier", label: "Un refus de dossier" },
    ],
  },
];

/**
 * L'accueil dit ce que l'on gagne, pas comment l'outil marche (Hugo, 4
 * novembre, sur le modèle de Rushlot et FanClaw). Le titre porte le gain :
 * écrire parmi les premiers, c'est ce qui décroche une visite. Il garde le
 * mot « logement », celui que l'on cherche (Hugo, 4 novembre).
 *
 * Pôle Commerce, même soir (`docs/commerce/MESSAGE.md`) : la mention dit le
 * domaine au lieu de « Bientôt », qui était le premier mot lu ; la phrase dit
 * d'où viennent les annonces (vos alertes, pas un robot qui surveille
 * Leboncoin) et ce qui nous distingue des alertes : on aide à répondre en
 * premier, pas seulement à recevoir. L'état du produit descend sous le bouton.
 */
export const HERO = {
  eyebrow: "Pour votre location sur Leboncoin",
  titleLead: "Les bons logements,",
  titleTail: "avant les autres.",
  /** La proposition de valeur, en deux phrases : ce que fait Terouva, ce que vous y gagnez. */
  description: [
    "Terouva trie les alertes Leboncoin que vous recevez, vous dit quels logements valent le coup et écrit votre message de candidature.",
    "Vous répondez en une minute, avec un dossier complet, pendant que l'annonce est encore fraîche.",
  ],
  /** La seconde porte, pour qui veut essayer avant de laisser son e-mail : un outil qui marche déjà. */
  essai: { label: "Écrire mon message, gratuitement", href: "/outils/message-de-candidature" },
  reassurance: "Ouverture prochaine · gratuit pour commencer · rien ne part sans vous",
};

/**
 * Le parcours, juste sous le haut de page (Hugo, 4 novembre) : quatre
 * étapes numérotées, chacune avec son panneau, de l'annonce publiée à la
 * candidature envoyée. Chaque phrase dit ce qui se passe pour vous.
 */
export const PARCOURS = {
  mention: "Votre soirée, rendue",
  titre: "De l'alerte à votre réponse, sans y passer la soirée.",
  // Chaque étape dit ce que vous vivez, pas ce que fait l'outil ; la dernière
  // rappelle que l'envoi reste le vôtre, une fois, ici seulement.
  etapes: [
    { nom: "L'alerte arrive", texte: "Leboncoin vous envoie une annonce, comme aujourd'hui." },
    { nom: "Vous savez si elle vaut le coup", texte: "Budget, surface, quartier : la réponse d'un coup d'œil." },
    { nom: "Votre message est prêt", texte: "Écrit pour ce logement, avec votre dossier. Vous le relisez." },
    { nom: "Vous l'envoyez", texte: "Sur Leboncoin, vous-même. Vous notez ensuite la réponse dans Terouva." },
  ],
};

export const SIGNUP = {
  eyebrow: "Liste d'attente",
  titleLead: "Essayez Terouva",
  titleTail: "dès le jour de l'ouverture.",
  body: "Laissez votre adresse : vous recevrez un seul e-mail, le jour où Terouva ouvre. La base sera gratuite.",
  // « Désinscription en un clic » promettait un lien qui n'existe pas : aucun
  // e-mail n'est encore parti. Le retrait se fait sur demande, et c'est ce que
  // dit la politique de confidentialité.
  assurances: ["Un seul e-mail, à l'ouverture", "Retrait sur simple demande", "Aucune donnée revendue"],
  // « Mac » et « Windows » annonçaient une application à télécharger, gelée
  // depuis juin : Terouva s'ouvre dans le navigateur (pôle Commerce, 4 novembre).
  platforms: [
    { name: "Sur ordinateur", detail: "Dans votre navigateur, sans installation" },
    { name: "Leboncoin", detail: "Les locations, partout en France" },
  ],
};

/**
 * Le gain, montré sur la vie d'une annonce. Le chiffre du texte vient d'une
 * enquête de leboncoin immo (2026), relue le 4 novembre dans l'article de
 * MySweetImmo cité ; il porte une urgence réelle, qu'on n'a pas à fabriquer.
 */
export const PROBLEM = {
  eyebrow: "Ce que vous y gagnez",
  titreLead: "Près de deux candidats sur trois",
  titreTail: "écrivent dans l'heure.",
  texte:
    "C'est ce que montrent les enquêtes de leboncoin immo menées en 2026. Les professionnels interrogés y ajoutent que sur dix candidatures reçues, moins de quatre sont complètes. Avec Terouva, votre message et votre dossier sont prêts quand l'alerte arrive.",
  source: {
    label: "Enquêtes leboncoin immo 2026, rapportées par MySweetImmo",
    href: "https://www.mysweetimmo.com/2026/09/24/location-1-candidat-sur-3-repond-en-moins-de-15-minutes/",
  },
  /** La même annonce, deux arrivées : la position est en pourcentage de sa vie. */
  vie: {
    etapes: ["Publiée", "Premiers messages", "Visites complètes", "Retirée"],
    sans: {
      nom: "Sans Terouva",
      titre: "Vous la découvrez le soir.",
      texte: "Les premiers messages sont partis, les visites sont déjà pleines.",
      position: 80,
    },
    avec: {
      nom: "Avec Terouva",
      titre: "Vous répondez dès l'alerte.",
      texte: "Vous écrivez dans la première heure, parmi les premiers candidats.",
      position: 7,
    },
  },
};

/**
 * Chaque ligne dit ce que l'on y gagne, puis en une phrase ce que fait
 * l'outil pour cela. L'icône sert de clé à l'état affiché dans `Fonctions`.
 */
export const FEATURES = [
  {
    icon: "bell" as const,
    title: "Vous ne ratez plus une annonce",
    body: "Les annonces de vos alertes arrivent au même endroit, et les nouvelles vous sont signalées.",
  },
  {
    icon: "gauge" as const,
    title: "Vous écrivez d'abord aux bonnes",
    body: "Chaque annonce est comparée à votre recherche, avec la raison en clair : trop cher, trop loin, ou à saisir.",
  },
  {
    icon: "pen" as const,
    title: "Vous avez toujours les mots",
    body: "Un message différent pour chaque logement, dans le ton que vous choisissez, qui donne envie de vous répondre.",
  },
  {
    icon: "send" as const,
    title: "Vous savez où vous en êtes",
    body: "Les réponses que vous notez, les visites prévues : toutes vos candidatures tiennent sur une page.",
  },
  {
    icon: "lock" as const,
    title: "Votre dossier reste à vous",
    body: "Pas de compte à créer, rien à confier à personne.",
  },
];

/**
 * Les questions dans l'ordre où le locataire se les pose, et dans ses mots :
 * ce que ça fait, puis le risque pour son compte, puis qui envoie. La FAQ
 * levait deux objections sur six ; « ma ville » et « après l'inscription »
 * n'avaient aucune réponse (audit du pôle Commerce, 4 novembre).
 */
export const FAQ_ITEMS = [
  {
    q: "Qu'est-ce que Terouva fait pour moi ?",
    a: "Il vous fait gagner le temps entre l'alerte et votre réponse : vous savez tout de suite si l'annonce vaut la peine, et votre message est déjà écrit. Vous gardez la main sur l'envoi.",
  },
  {
    q: "Est-ce légal ? Mon compte Leboncoin risque-t-il quelque chose ?",
    a: "Terouva travaille sur les alertes que Leboncoin vous envoie déjà et sur les annonces que vous ouvrez vous-même. Il ne vous demande jamais vos identifiants, ne se connecte pas à votre compte et n'agit jamais sur Leboncoin à votre place.",
  },
  {
    q: "Est-ce que Terouva envoie les messages à ma place ?",
    a: "Non. Il prépare le message, et c'est vous qui le collez sur Leboncoin et qui l'envoyez. Rien ne part sans vous.",
  },
  {
    q: "Est-ce que ça marche dans ma ville ?",
    a: "Oui, partout où Leboncoin publie des locations. Terouva part de votre propre recherche et de vos alertes, quelle que soit la ville.",
  },
  {
    q: "Combien ça coûte ?",
    a: "La base sera gratuite. Des options payantes viendront pour aller plus loin, et leur prix sera annoncé avant tout paiement. Les outils de ce site restent gratuits.",
  },
  {
    q: "Quand est-ce que ça sort, et que se passe-t-il si je m'inscris ?",
    a: "La date n'est pas encore fixée. Si vous laissez votre adresse, vous recevez un seul e-mail, le jour de l'ouverture, et rien d'autre d'ici là. En attendant, les outils gratuits du site fonctionnent déjà.",
  },
  {
    q: "Où vont mes données ?",
    a: "Nulle part. Vos papiers et vos messages restent sur votre ordinateur : pas de compte, pas de publicité. Votre adresse e-mail, si vous la laissez, sert seulement à vous prévenir de l'ouverture.",
  },
];

/**
 * L'éditeur du site, d'après la synthèse du guichet unique (formalité
 * J00295677454, validée le 28 octobre 2026). Affiché dans les mentions
 * légales et le pied de page : un seul endroit à corriger s'il change.
 * Hugo a choisi le 2 novembre de publier son adresse et son téléphone, que
 * la LCEN exige d'une entreprise individuelle.
 */
export const EDITEUR = {
  marque: "Blue Lake Dev",
  nom: "Hugo Moëne",
  siren: "132 159 203",
  siret: "132 159 203 00018",
  adresse: ["60 chemin des Fours à Chaux", "74320 Sévrier, France"],
  telephone: "06 24 51 09 09",
  telephoneLien: "+33624510909",
  email: "hugo8.m@outlook.fr",
} as const;

export const FOOTER = {
  signature: "Conçu pour vous aider à trouver votre logement plus sereinement.",
  local: "Aucun compte · aucune publicité",
  disclaimer: "Terouva n'a aucun lien avec Leboncoin.",
  columns: [
    {
      title: "Produit",
      links: [
        { label: "Ce que vous y gagnez", href: "/#gains" },
        { label: "Ce que fait Terouva", href: "/#fonctions" },
        { label: "Vos données", href: "/confidentialite" },
      ],
    },
    {
      title: "Outils gratuits",
      links: [
        { label: "Message de candidature", href: "/outils/message-de-candidature" },
        { label: "Checklist de dossier", href: "/outils/dossier-de-location" },
        { label: "Tous les outils", href: "/outils" },
      ],
    },
    {
      // Les six guides sont listés ici volontairement : un lien présent sur
      // toutes les pages est ce qui sort un guide récent de l'isolement, et un
      // guide sans lien entrant n'est lu par personne, moteurs compris.
      title: "Guides",
      links: [
        { label: "Le dossier de location", href: "/guides/dossier-de-location" },
        { label: "Louer sans garant", href: "/guides/louer-sans-garant" },
        { label: "Le garant et la caution", href: "/guides/garant-caution" },
        { label: "La garantie Visale", href: "/guides/garantie-visale" },
        { label: "L'état des lieux", href: "/guides/etat-des-lieux" },
        { label: "Le dépôt de garantie", href: "/guides/depot-de-garantie" },
        { label: "Le préavis de location", href: "/guides/preavis-location" },
        { label: "Répondre à une annonce", href: "/guides/repondre-a-une-annonce-de-location" },
        { label: "Un refus de dossier", href: "/guides/refus-de-dossier" },
        { label: "Tous les guides", href: "/guides" },
      ],
    },
    {
      title: "Mentions légales",
      links: [
        { label: "Mentions légales", href: "/mentions-legales" },
        { label: "Confidentialité", href: "/confidentialite" },
        { label: "Conditions d'utilisation", href: "/cgu" },
        { label: "Questions fréquentes", href: "/#questions" },
      ],
    },
  ],
};
