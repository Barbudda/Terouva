export const NAV_LINKS = [
  { href: "#comment", label: "Comment ça marche" },
  { href: "#fonctions", label: "Ce que fait Terouva" },
  { href: "/outils", label: "Outils gratuits" },
  { href: "/guides", label: "Guides" },
];

/**
 * Titres en deux morceaux : le second passe en rose, comme sur la référence.
 * Le texte reste au vouvoiement, simple et sans promesse invérifiable.
 */
export const HERO = {
  eyebrow: "Bientôt disponible",
  titleLead: "Trouvez votre logement",
  titleTail: "sans y passer vos journées.",
  subtitle:
    "Terouva repère les annonces de location qui vous correspondent, les classe, et prépare votre message de candidature. Vous relisez, vous envoyez. Tout reste sur votre ordinateur.",
  assurances: [
    "Gratuit pendant l'essai",
    "Rien à créer, aucun compte",
    "Vos données restent chez vous",
  ],
  caption: "Quatre annonces d'exemple, notées sur 100 pour une recherche de 2 pièces à Lyon sous 950 €.",
};

export const SIGNUP = {
  eyebrow: "Liste d'attente",
  titleLead: "Terouva arrive.",
  titleTail: "Soyez prévenu le jour du lancement.",
  body: "Laissez votre adresse : vous recevrez un message dès que l'application sera téléchargeable. Un seul e-mail, pas de publicité.",
  assurances: ["Un seul e-mail, au lancement", "Désinscription en un clic", "Aucune donnée revendue"],
  platforms: [
    { name: "Mac", detail: "Bientôt · Intel et puces Apple" },
    { name: "Windows", detail: "Bientôt · Windows 10 et 11" },
  ],
};

/**
 * Chiffres clés. Aucun n'est une statistique d'usage inventée : ce sont des
 * faits sur le produit, vérifiables en l'ouvrant. Deux valent zéro, et c'est
 * justement l'argument.
 */
/**
 * Chiffres clés. Chacun porte son unité **sur la même ligne** : seuls, alignés
 * à l'identique, « 0 · 0 · 3 · 100 » se lisent comme un bandeau de statistiques
 * à moitié chargé, et le lecteur a classé le bloc comme cassé avant d'arriver
 * aux légendes. Collé à son nom, un zéro redevient une affirmation.
 */
export const CHIFFRES = [
  { valeur: "0", unite: "compte à créer", detail: "Ni adresse e-mail, ni mot de passe." },
  { valeur: "0", unite: "serveur", detail: "Vos données ne quittent pas votre machine." },
  { valeur: "3", unite: "tons de message", detail: "Six formulations pour chacun d'eux." },
  { valeur: "100", unite: "points", detail: "La note qui classe chaque annonce." },
];

export const PROBLEM = {
  eyebrow: "Pourquoi Terouva",
  titleLead: "Louer est devenu",
  titleTail: "une course.",
  body: [
    "Dans beaucoup de villes, les bonnes annonces partent en quelques heures. Entre le moment où une annonce est publiée et celui où vous écrivez votre message, d'autres candidats sont souvent déjà passés.",
    "Un bon dossier compte, et répondre tôt aussi. Terouva vous aide à répondre vite, sans rester devant votre écran toute la journée.",
  ],
};

export const STEPS = [
  {
    title: "Préparez votre dossier, une seule fois.",
    body: "Vos informations, votre situation, votre garant et ce que vous cherchez. Quelques minutes, et c'est fait pour de bon.",
  },
  {
    title: "Laissez Terouva regarder pour vous.",
    body: "Pendant que vous parcourez les annonces, Terouva les range dans votre liste et leur donne une note selon vos critères. Il ne consulte jamais les sites à votre place.",
  },
  {
    title: "Répondez sans attendre.",
    body: "Les annonces qui méritent une réponse rapide remontent en haut, message déjà rédigé. Vous le relisez, vous l'envoyez vous-même.",
  },
];

export const FEATURES = [
  {
    icon: "inbox" as const,
    title: "Vos annonces au même endroit",
    body: "Une liste à vous, qui se garde d'une fois sur l'autre, au lieu d'onglets ouverts un peu partout.",
  },
  {
    icon: "bell" as const,
    title: "Prévenu au bon moment",
    body: "Les annonces récentes qui correspondent vraiment sont signalées, avec une notification sur votre ordinateur.",
  },
  {
    icon: "gauge" as const,
    title: "Une note que vous comprenez",
    body: "Chaque annonce reçoit une note sur 100, avec ses points forts et ses points faibles, critère par critère.",
  },
  {
    icon: "pen" as const,
    title: "Un message déjà rédigé",
    body: "Adapté à l'annonce et à votre profil, dans le ton que vous préférez : direct, chaleureux ou professionnel.",
  },
  {
    icon: "send" as const,
    title: "Vos candidatures suivies",
    body: "Brouillon, envoyée, réponse reçue : vous savez où vous en êtes pour chaque logement.",
  },
  {
    icon: "lock" as const,
    title: "Rien ne sort de chez vous",
    body: "Pas de compte, pas de serveur, pas de publicité. Vos données vivent sur votre machine, et vous pouvez les emporter.",
  },
];

export const DEMO = {
  eyebrow: "Sans rien installer",
  titleLead: "Essayez l'outil",
  titleTail: "tout de suite.",
  body: "La démonstration tourne dans votre navigateur avec des annonces d'exemple qui arrivent en direct : la note, le message préparé, l'envoi, le suivi. Elle s'efface en un clic quand vous avez fini.",
  cta: { label: "Voir la démonstration", href: "/app?demo=1" },
};

export const PRIVACY = {
  eyebrow: "Vos données",
  titleLead: "Elles restent",
  titleTail: "chez vous.",
  body: "Terouva travaille sur votre ordinateur. Vos recherches, vos annonces, votre dossier et vos messages n'en sortent pas : il n'y a pas de serveur où ils pourraient être envoyés.",
  points: [
    { label: "Où sont vos données", value: "Sur votre ordinateur, et nulle part ailleurs." },
    { label: "Compte à créer", value: "Aucun. Ni e-mail, ni mot de passe." },
    { label: "Publicité et suivi", value: "Aucun." },
    { label: "Changer d'ordinateur", value: "Vous enregistrez vos données dans un fichier, puis vous le rouvrez ailleurs." },
  ],
};

export const FAQ_ITEMS = [
  {
    q: "Quand est-ce que ça sort ?",
    a: "L'application est en préparation. Laissez votre adresse : vous serez prévenu le jour où elle devient téléchargeable, et vous pourrez l'installer tout de suite.",
  },
  {
    q: "Puis-je essayer avant ?",
    a: "Oui. La démonstration fonctionne déjà dans votre navigateur, avec des annonces d'exemple qui arrivent au fil de l'eau : vous voyez la note, le message préparé et le geste d'envoi. Elle s'efface en un clic.",
  },
  {
    q: "Est-ce que Terouva envoie des messages à ma place ?",
    a: "Non. Terouva prépare le message, mais c'est toujours vous qui le collez et qui cliquez sur « Envoyer ». Vous gardez la main à chaque étape.",
  },
  {
    q: "Est-ce que c'est légal ?",
    a: "Oui. Terouva lit ce que vous avez déjà sous les yeux ou ce que vous avez reçu par e-mail. Il ne consulte pas les sites d'annonces à votre place et ne contourne rien.",
  },
  {
    q: "Combien ça coûte ?",
    a: "L'application sera payante, par abonnement, autour de 12 € par mois, avec un essai gratuit pour voir si elle vous sert. Le prix définitif sera annoncé au lancement, et les outils de ce site resteront gratuits.",
  },
  {
    q: "Où vont mes données ?",
    a: "Nulle part. Tout est enregistré sur votre ordinateur. Pas de serveur, pas de sauvegarde à distance, pas de suivi. Même les messages de candidature sont écrits sur votre machine.",
  },
  {
    q: "Et mon adresse e-mail, elle sert à quoi ?",
    a: "Uniquement à vous prévenir du lancement. Un seul message, aucune publicité, et vous pouvez demander sa suppression à tout moment.",
  },
];

export const FOOTER = {
  signature: "Conçu pour vous aider à trouver votre logement plus sereinement.",
  local: "Conçu en local · tourne en local · vous appartient",
  disclaimer: "Terouva n'a aucun lien avec Leboncoin.",
  columns: [
    {
      title: "Produit",
      links: [
        { label: "Comment ça marche", href: "/#comment" },
        { label: "Ce que fait Terouva", href: "/#fonctions" },
        { label: "Voir la démonstration", href: "/app?demo=1" },
        { label: "Vos données", href: "/#donnees" },
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
        { label: "Confidentialité", href: "/confidentialite" },
        { label: "Questions fréquentes", href: "/#questions" },
      ],
    },
  ],
};
