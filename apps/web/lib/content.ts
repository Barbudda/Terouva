export const NAV_LINKS = [
  { href: "#comment", label: "Comment ça marche" },
  { href: "#fonctions", label: "Ce que fait Terouva" },
  { href: "#donnees", label: "Vos données" },
  { href: "#questions", label: "Questions" },
];

export const RELEASES_DOWNLOAD_MSI =
  "https://github.com/Barbudda/Terouva/releases/latest/download/Terouva_0.2.0_x64_en-US.msi";

export const HERO = {
  kicker: "Pour votre recherche de location sur Leboncoin",
  title: "Trouvez, sans chercher.",
  titleSecond: "Terouva surveille Leboncoin pour vous.",
  subtitle:
    "Dès qu'une annonce correspond à ce que vous cherchez, vous êtes prévenu, avec un message de candidature déjà prêt à envoyer. Tout reste sur votre ordinateur, et c'est vous qui gardez la main.",
  ctaPrimary: { label: "Ouvrir Terouva", href: "/app" },
  ctaSecondary: { label: "Comment ça marche", href: "#comment" },
  meta: "Gratuit et sans inscription. Fonctionne dans votre navigateur, sur Mac, Windows et Linux.",
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
    body: "Vos informations, votre situation, votre garant et les critères de chaque recherche. Quelques minutes, et c'est fait pour de bon.",
  },
  {
    title: "Laissez Leboncoin ouvert.",
    body: "Une petite extension pour Chrome regarde les annonces qui s'affichent sur vos pages de recherche, exactement comme si vous les parcouriez vous-même. Chaque nouvelle annonce est transmise à Terouva, sur votre ordinateur.",
  },
  {
    title: "Répondez sans attendre.",
    body: "Vous êtes prévenu dès qu'une annonce correspond à vos critères. Le message est déjà écrit, dans le ton de votre choix. Vous le collez sur Leboncoin et vous l'envoyez vous-même.",
  },
];

export const FEATURES = [
  {
    title: "Les annonces arrivent toutes seules",
    body: "L'extension regarde les pages de recherche que vous ouvrez. Dès qu'une annonce apparaît, elle rejoint votre liste. Rien de plus que ce que vous consultez déjà.",
  },
  {
    title: "Une alerte au bon moment",
    body: "Quand une annonce récente correspond vraiment à votre recherche, une notification s'affiche sur votre ordinateur. Vous choisissez à partir de quelle note être prévenu.",
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
    title: "Vos e-mails d'alerte aussi",
    body: "Sans extension, ou quand votre navigateur est fermé, collez l'e-mail d'alerte envoyé par Leboncoin : les annonces qu'il contient sont ajoutées à votre liste.",
  },
  {
    title: "Vos candidatures suivies",
    body: "Brouillon, envoyée, réponse reçue : vous savez où vous en êtes pour chaque logement, sans tableau à tenir à côté.",
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
    q: "Comment Terouva voit-il les annonces ?",
    a: "L'extension Chrome regarde les pages de recherche Leboncoin que vous ouvrez vous-même. Chaque nouvelle annonce qui s'affiche est transmise à Terouva, sur votre ordinateur. C'est votre navigateur et votre connexion : Terouva lit seulement ce que vous consultez déjà.",
  },
  {
    q: "Est-ce que Terouva envoie des messages à ma place ?",
    a: "Non. Terouva prépare le message, mais c'est toujours vous qui le collez sur Leboncoin et qui cliquez sur « Envoyer ». Vous gardez la main à chaque étape.",
  },
  {
    q: "Est-ce que c'est légal ?",
    a: "Oui. Vous consultez Leboncoin normalement, dans votre navigateur. Terouva lit uniquement ce que vous avez déjà ouvert et n'envoie jamais rien à votre place.",
  },
  {
    q: "Combien ça coûte ?",
    a: "C'est gratuit pendant la période d'essai. Si une offre payante arrive un jour, elle sera annoncée clairement, et la version qui fonctionne aujourd'hui ne sera pas retirée.",
  },
  {
    q: "Et si je ferme mon navigateur ?",
    a: "La surveillance en direct s'arrête, car l'extension a besoin que Leboncoin soit ouvert. Vous pouvez aussi coller dans Terouva les e-mails d'alerte que Leboncoin vous envoie : les annonces qu'ils contiennent sont ajoutées à votre liste.",
  },
  {
    q: "Où vont mes données ?",
    a: "Nulle part. Tout est enregistré dans votre navigateur, sur votre ordinateur. Pas de serveur, pas de sauvegarde à distance, pas de suivi. Même les messages de candidature sont écrits sur votre machine.",
  },
  {
    q: "Est-ce que ça marche sur Mac ?",
    a: "Oui. Terouva s'ouvre dans votre navigateur, sur Mac comme sur Windows ou Linux. Pour la détection en direct, il faut Chrome (qui existe aussi sur Mac). Sans extension, l'import des e-mails d'alerte fonctionne partout.",
  },
  {
    q: "Faut-il installer quelque chose ?",
    a: "Pour commencer, non : vous ouvrez Terouva et vous remplissez votre dossier. Pour suivre les annonces en direct, vous ajoutez l'extension Terouva à Chrome. Une version Windows à installer existe aussi, en option.",
  },
];

export const CTA_FINAL = {
  title: "Prêt pour la prochaine annonce ?",
  subtitle:
    "Ouvrez Terouva dans votre navigateur, remplissez votre dossier et votre première recherche. Cela prend quelques minutes.",
  primary: { label: "Ouvrir Terouva", href: "/app" },
  secondary: { label: "Version Windows à installer (optionnelle)", href: RELEASES_DOWNLOAD_MSI },
};

export const FOOTER = {
  signature: "Conçu pour vous aider à trouver votre logement plus sereinement.",
  disclaimer: "Terouva n'a aucun lien avec Leboncoin.",
};
