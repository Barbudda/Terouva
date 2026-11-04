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
 */
export const HERO = {
  eyebrow: "Bientôt disponible",
  titleLead: "Les bons logements,",
  titleTail: "avant les autres.",
  /** La proposition de valeur, en deux phrases : ce que fait Terouva, ce que vous y gagnez. */
  description: [
    "Terouva vous prévient dès qu'un logement qui vous correspond paraît sur Leboncoin, avec votre message de candidature déjà écrit.",
    "Vous l'envoyez en une minute, parmi les premiers, et la visite est plus facile à obtenir.",
  ],
};

/**
 * Le parcours, juste sous le haut de page (Hugo, 4 novembre) : quatre
 * étapes numérotées, chacune avec son panneau, de l'annonce publiée à la
 * candidature envoyée. Chaque phrase dit ce qui se passe pour vous.
 */
export const PARCOURS = {
  mention: "Le parcours",
  titre: "De l'annonce publiée à votre message envoyé.",
  etapes: [
    { nom: "Publiée sur Leboncoin", texte: "Un logement qui correspond à vos critères vient de paraître." },
    { nom: "Repérée pour vous", texte: "Terouva vous prévient, et vous dit si elle vaut le coup." },
    { nom: "Votre message, déjà écrit", texte: "Adapté à l'annonce et à votre dossier. Vous le relisez." },
    { nom: "Envoyé par vous", texte: "Vous l'envoyez en une minute, et Terouva suit la réponse." },
  ],
};

export const SIGNUP = {
  eyebrow: "Liste d'attente",
  titleLead: "Terouva arrive.",
  titleTail: "Soyez prévenu le jour du lancement.",
  body: "Un seul e-mail, le jour où Terouva devient téléchargeable.",
  // « Désinscription en un clic » promettait un lien qui n'existe pas : aucun
  // e-mail n'est encore parti. Le retrait se fait sur demande, et c'est ce que
  // dit la politique de confidentialité.
  assurances: ["Un seul e-mail, au lancement", "Retrait sur simple demande", "Aucune donnée revendue"],
  platforms: [
    { name: "Mac", detail: "Bientôt · Intel et puces Apple" },
    { name: "Windows", detail: "Bientôt · Windows 10 et 11" },
  ],
};

/**
 * Le gain, montré sur la vie d'une annonce. Aucune heure ni aucun chiffre :
 * ils varient trop d'une ville à l'autre pour être affichés sans source.
 */
export const PROBLEM = {
  eyebrow: "Ce que vous y gagnez",
  titreLead: "Écrivez parmi les premiers,",
  titreTail: "sans surveiller votre téléphone.",
  texte:
    "Un bon logement reçoit ses premiers messages en quelques heures. Écrire tôt, avec un message complet, c'est ce qui décroche une visite. Terouva s'occupe des deux.",
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
      titre: "Vous êtes prévenu à sa parution.",
      texte: "Votre message est prêt : vous l'envoyez parmi les premiers.",
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
    body: "Chaque logement qui correspond à vos critères vous est signalé, avec une notification.",
  },
  {
    icon: "gauge" as const,
    title: "Vous savez laquelle vaut le coup",
    body: "Une note sur 100 et ses raisons en clair : vous écrivez d'abord à celles qui comptent.",
  },
  {
    icon: "pen" as const,
    title: "Votre message est déjà écrit",
    body: "Adapté à l'annonce et à votre dossier, dans le ton que vous choisissez. Vous relisez, vous envoyez.",
  },
  {
    icon: "send" as const,
    title: "Vous savez où vous en êtes",
    body: "Envoyée, réponse reçue, visite prévue : toutes vos candidatures au même endroit.",
  },
  {
    icon: "lock" as const,
    title: "Votre dossier reste à vous",
    body: "Aucun compte à créer. Tout reste sur votre ordinateur.",
  },
];

export const FAQ_ITEMS = [
  {
    q: "Qu'est-ce que Terouva fait pour moi ?",
    a: "Il vous signale les logements Leboncoin qui correspondent à vos critères dès qu'ils paraissent, vous dit lesquelles valent le coup, et écrit votre message de candidature. Vous écrivez parmi les premiers, sans y passer vos journées.",
  },
  {
    q: "Est-ce que Terouva envoie les messages à ma place ?",
    a: "Non. Il prépare le message, et c'est vous qui le collez sur Leboncoin et qui l'envoyez. Rien ne part sans vous.",
  },
  {
    q: "Quand est-ce que ça sort ?",
    a: "Bientôt. Laissez votre adresse : vous serez prévenu le jour du lancement. En attendant, les outils gratuits du site fonctionnent déjà.",
  },
  {
    q: "Combien ça coûte ?",
    a: "Environ 12 € par mois, avec un essai gratuit. Le prix définitif sera annoncé au lancement, et les outils de ce site resteront gratuits.",
  },
  {
    q: "Est-ce que c'est légal ?",
    a: "Oui. Terouva lit les annonces que vous consultez ou recevez déjà par e-mail. Il ne va pas sur les sites à votre place et ne contourne rien.",
  },
  {
    q: "Où vont mes données ?",
    a: "Nulle part. Tout reste sur votre ordinateur : pas de compte, pas de serveur, pas de publicité. Votre adresse e-mail, si vous la laissez, sert seulement à vous prévenir du lancement.",
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
  local: "Conçu en local · tourne en local · vous appartient",
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
