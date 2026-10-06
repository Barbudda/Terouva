export const NAV_LINKS = [
  { href: "#comment", label: "Comment ça marche" },
  { href: "#fonctions", label: "Ce que fait Terouva" },
  { href: "#donnees", label: "Vos données" },
  { href: "#questions", label: "Questions" },
];

export const HERO = {
  kicker: "Pour votre recherche de location sur Leboncoin",
  title: "Trouvez, sans chercher.",
  titleSecond: "Terouva trie vos alertes Leboncoin et prépare vos messages.",
  subtitle:
    "Leboncoin vous envoie déjà des alertes. Terouva en fait une liste claire : chaque annonce est notée selon vos critères, avec un message de candidature prêt à relire et à envoyer. Tout reste sur votre ordinateur, et c'est vous qui envoyez.",
  ctaPrimary: { label: "Ouvrir Terouva", href: "/app" },
  ctaSecondary: { label: "Voir la démonstration", href: "/app?demo=1" },
  meta: "Gratuit, sans inscription et sans rien installer. Fonctionne dans votre navigateur, sur Mac, Windows et Linux.",
  caption: "L'écran « Mes annonces », rempli avec des annonces d'exemple.",
};

export const PROBLEM = {
  title: "Louer est devenu une course.",
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
    title: "Créez votre alerte sur Leboncoin.",
    body: "Terouva prépare la recherche à partir de vos critères et vous emmène dessus. Vous l'enregistrez sur Leboncoin et activez l'alerte par e-mail : Leboncoin vous préviendra à chaque nouvelle annonce.",
  },
  {
    title: "Collez l'e-mail, répondez tout de suite.",
    body: "Un collage suffit. Terouva en sort les annonces, les note, met en avant celles qui méritent une réponse rapide et rédige votre message. Vous le relisez, vous le collez sur Leboncoin, vous envoyez.",
  },
];

export const FEATURES = [
  {
    title: "Vos alertes deviennent une liste",
    body: "Collez l'e-mail d'alerte envoyé par Leboncoin : Terouva en extrait les annonces et les range dans une liste à vous, qui se garde d'une fois sur l'autre.",
  },
  {
    title: "Les bonnes annonces remontent",
    body: "Celles qui méritent une réponse rapide sont signalées en haut de la liste, et une notification s'affiche sur votre ordinateur quand Terouva est ouvert.",
  },
  {
    title: "Une note que vous comprenez",
    body: "Chaque annonce reçoit une note sur 100, avec ses points forts et ses points faibles, critère par critère.",
  },
  {
    title: "Un message déjà rédigé",
    body: "Terouva écrit un message adapté à l'annonce et à votre profil, dans le ton que vous préférez : direct, chaleureux ou professionnel. Vous le relisez et le modifiez si besoin.",
  },
  {
    title: "Vos candidatures suivies",
    body: "Brouillon, envoyée, réponse reçue : vous savez où vous en êtes pour chaque logement, sans tableau à tenir à côté.",
  },
  {
    title: "Vos données vous suivent",
    body: "Vous enregistrez tout dans un fichier, et vous le rouvrez sur un autre ordinateur. Vos données vous appartiennent.",
  },
];

export const PRIVACY = {
  title: "Vos données restent chez vous.",
  body: "Terouva n'a pas de serveur. Vos recherches, vos annonces, votre profil et vos messages sont enregistrés uniquement dans votre navigateur, sur votre ordinateur. Pas de compte, pas de mot de passe, pas de publicité.",
  points: [
    { label: "Où sont vos données", value: "Sur votre ordinateur, et nulle part ailleurs." },
    { label: "Compte à créer", value: "Aucun. Ni e-mail, ni mot de passe." },
    { label: "Publicité et suivi", value: "Aucun." },
    { label: "Changer d'ordinateur", value: "Vous enregistrez vos données dans un fichier, puis vous le rouvrez ailleurs." },
  ],
};

export const FAQ_ITEMS = [
  {
    q: "Puis-je essayer avant de créer une alerte ?",
    a: "Oui. Le bouton « Voir la démonstration » remplit Terouva avec des annonces d'exemple qui arrivent au fil de l'eau, comme en vrai : la note, le message préparé et le geste d'envoi. Vous effacez la démonstration en un clic quand vous avez fini.",
  },
  {
    q: "Comment Terouva reçoit-il les annonces ?",
    a: "Par les alertes que Leboncoin vous envoie par e-mail. Vous enregistrez votre recherche sur Leboncoin, vous activez l'alerte, puis vous collez l'e-mail reçu dans Terouva : il en sort les annonces, les note et prépare vos messages. Terouva ne se connecte jamais à Leboncoin lui-même.",
  },
  {
    q: "Est-ce que Terouva envoie des messages à ma place ?",
    a: "Non. Terouva prépare le message, mais c'est toujours vous qui le collez sur Leboncoin et qui cliquez sur « Envoyer ». Vous gardez la main à chaque étape.",
  },
  {
    q: "Est-ce que c'est légal ?",
    a: "Oui. Terouva lit les e-mails que Leboncoin vous envoie, à vous. Il ne consulte pas le site à votre place, ne contourne rien et n'envoie jamais rien tout seul.",
  },
  {
    q: "Combien ça coûte ?",
    a: "C'est gratuit pendant la période d'essai. Si une offre payante arrive un jour, elle sera annoncée clairement, et la version qui fonctionne aujourd'hui ne sera pas retirée.",
  },
  {
    q: "Faut-il installer quelque chose ?",
    a: "Non. Terouva s'ouvre dans votre navigateur, sur Mac, Windows ou Linux. Une extension Chrome existe en option, pour faire entrer les annonces toutes seules pendant que vous parcourez Leboncoin.",
  },
  {
    q: "Où vont mes données ?",
    a: "Nulle part. Tout est enregistré dans votre navigateur, sur votre ordinateur. Pas de serveur, pas de sauvegarde à distance, pas de suivi. Même les messages de candidature sont écrits sur votre machine.",
  },
  {
    q: "Et si je change d'ordinateur ?",
    a: "Vous enregistrez vos données dans un fichier depuis les réglages, puis vous le rouvrez sur l'autre ordinateur. Rien ne transite par internet.",
  },
];

export const CTA_FINAL = {
  title: "Prêt pour la prochaine annonce ?",
  subtitle:
    "Ouvrez Terouva dans votre navigateur, remplissez votre dossier et votre première recherche. Cela prend quelques minutes.",
  primary: { label: "Ouvrir Terouva", href: "/app" },
  secondary: { label: "Voir la démonstration", href: "/app?demo=1" },
};

export const FOOTER = {
  signature: "Conçu pour vous aider à trouver votre logement plus sereinement.",
  disclaimer: "Terouva n'a aucun lien avec Leboncoin.",
};
