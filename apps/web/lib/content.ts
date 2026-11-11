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
 *
 * Seconde passe, même soir : la phrase est découpée comme une division du
 * travail (vous, Terouva, vous), sur le modèle de Rushlot. Trois phrases
 * courtes se lisent d'un regard ; la phrase de quarante mots ne se lisait pas.
 *
 * Fil de lecture de toute la page : les titres seuls racontent l'histoire
 * (le gain, comment ça se passe, pourquoi vite, ce qu'on y gagne, la preuve,
 * l'essai gratuit, les questions, l'inscription). Chaque section dit une
 * chose qui n'a pas encore été dite.
 */
/**
 * Hugo, 11 novembre : « le client a trente secondes pour comprendre à quoi ça
 * sert ». Le premier mot lu est le titre, qui dit ce qu'il veut entendre ; la
 * phrase déroule du plus fort (avant tout le monde, la visite) au plus
 * personnel (ce que Terouva fait, ce qu'il vous reste à faire). Plus de
 * mention au-dessus du titre : les sites où l'on cherche viennent juste
 * dessous, dans la rangée des plateformes.
 */
export const HERO = {
  eyebrow: "",
  titleLead: "Gagnez la course",
  titleTail: "au logement.",
  /** Le gain d'abord, puis qui fait quoi. */
  description: [
    "Répondez aux bonnes annonces avant tout le monde, avec un message qui décroche la visite.",
    "Terouva fait le tri et l'écrit pour vous. Vous n'avez qu'à l'envoyer.",
  ],
  // Plus de ligne de réassurance ni de seconde porte sous le bouton (Hugo, 4
  // novembre) : elles redisaient ce que la phrase, la section outils et
  // l'inscription disent déjà. Une chose se dit une fois, à sa place.
};

/**
 * Les sites où l'on cherche, en tuiles (Hugo, 11 novembre, sur le modèle de la
 * rangée de fanclaw.ai et des plateformes de rushlot.com) : le visiteur voit
 * son site et comprend. Choisir une tuile montre ce que Terouva y change.
 *
 * Plus de badge d'état (Hugo, 11 novembre : « fake it until you make it ») :
 * les tuiles montrent les sites visés. Risque signalé à Hugo et accepté : un
 * site affiché que l'outil ne couvre pas serait une pratique commerciale
 * trompeuse si quelqu'un s'en plaignait ; la liste d'attente l'atténue
 * (personne ne peut encore s'en servir) et le pied de page dit l'absence de lien. Faits relevés
 * dans `docs/commerce/PLATEFORMES.md` (2026-11-11) ; couleurs de marque à
 * relever à l'œil par le pôle Design (les sites refusent la lecture automatique).
 */
export const PLATEFORMES = {
  titre: "Partout où vous cherchez.",
  // Seule ligne d'aide : elle dit quoi faire de la rangée, rien d'autre.
  aide: "Choisissez un site pour voir ce que Terouva y change.",
  liste: [
    {
      id: "leboncoin",
      icone: "/plateformes/leboncoin.png",
      nom: "Leboncoin",
      domaine: "leboncoin.fr",
      gains: [
        "Vous savez d'un coup d'œil si l'annonce vaut le coup.",
        "Votre message est prêt à coller dans la messagerie Leboncoin.",
      ],
    },
    {
      id: "seloger",
      icone: "/plateformes/seloger.png",
      nom: "SeLoger",
      domaine: "seloger.com",
      gains: [
        "Annonces d'agences : votre dossier part complet dès le premier message.",
        "Chaque agence contactée est suivie au même endroit.",
      ],
    },
    {
      id: "pap",
      icone: "/plateformes/pap.png",
      nom: "PAP",
      domaine: "pap.fr",
      gains: [
        "PAP vous écrit à chaque nouvelle annonce : Terouva vous dit laquelle vaut le coup.",
        "De particulier à particulier : un message qui parle au propriétaire.",
      ],
    },
    {
      id: "bienici",
      icone: "/plateformes/bienici.png",
      nom: "Bien'ici",
      domaine: "bienici.com",
      gains: [
        "Les annonces d'agences qui vous correspondent, triées par ce qui compte pour vous.",
        "Un dossier prêt avant même la visite.",
      ],
    },
    {
      id: "logicimmo",
      icone: "/plateformes/logicimmo.png",
      nom: "Logic-Immo",
      domaine: "logic-immo.com",
      gains: [
        "Prix, surface, quartier : les annonces qui ne collent pas sont écartées.",
        "Votre message reprend ce que l'agence demande.",
      ],
    },
    {
      id: "immojeune",
      icone: "/plateformes/immojeune.png",
      nom: "ImmoJeune",
      domaine: "immojeune.com",
      gains: [
        "Pour une première location : garant, Visale et pièces du dossier, sans rien oublier.",
        "Votre candidature dit l'essentiel en quelques lignes.",
      ],
    },
    {
      id: "studapart",
      icone: "/plateformes/studapart.ico",
      nom: "Studapart",
      domaine: "studapart.com",
      gains: [
        "Logements étudiants : vous repérez ceux qui collent à vos dates et à votre budget.",
        "Votre dossier en ligne est prêt quand l'annonce paraît.",
      ],
    },
    {
      id: "cartedescolocs",
      icone: "/plateformes/cartedescolocs.png",
      nom: "La Carte des Colocs",
      domaine: "lacartedescolocs.fr",
      gains: [
        "En colocation, on choisit une personne : votre message dit qui vous êtes.",
        "Vous voyez d'un coup d'œil les colocations dans vos quartiers.",
      ],
    },
  ],
};

/**
 * Le parcours, juste sous le haut de page (Hugo, 4 novembre) : quatre
 * étapes numérotées, chacune avec son panneau, de l'annonce publiée à la
 * candidature envoyée. Chaque phrase dit ce qui se passe pour vous.
 */
export const PARCOURS = {
  titre: "De l'alerte à votre réponse, sans y passer la soirée.",
  // Chaque étape dit ce que vous vivez, pas ce que fait l'outil ; la dernière
  // rappelle que l'envoi reste le vôtre, une fois, ici seulement.
  etapes: [
    { nom: "L'alerte arrive", texte: "Leboncoin, SeLoger ou PAP vous envoie une annonce, comme aujourd'hui." },
    { nom: "Vous savez si elle vaut le coup", texte: "Prix, surface, quartier : vous le voyez d'un coup d'œil." },
    { nom: "Votre message est prêt", texte: "Écrit pour ce logement, avec les infos de votre dossier." },
    { nom: "Vous l'envoyez", texte: "Sur le site de l'annonce, vous-même. Ensuite, vous notez la réponse dans Terouva." },
  ],
};

/**
 * Terouva ouvre par vagues (Hugo, 4 novembre) : l'inscription réserve une
 * place, et l'e-mail part quand le tour de la personne arrive. Ni date, ni
 * histoire du fondateur : Hugo n'en veut pas.
 */
export const SIGNUP = {
  titleLead: "Terouva ouvre par vagues.",
  titleTail: "Prenez place dans la prochaine.",
  // Pas de phrase sous le titre : il dit tout, et la FAQ juste au-dessus
  // répond déjà au prix, au retrait de l'adresse et à ce qui suit.
  // « Mac » et « Windows » annonçaient une application à télécharger, gelée
  // depuis juin : Terouva s'ouvre dans le navigateur (pôle Commerce, 4 novembre).
  platforms: [
    { name: "Sur ordinateur", detail: "Dans votre navigateur, sans installation" },
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
    "Et selon les professionnels interrogés, sur dix candidatures reçues, moins de quatre sont complètes.",
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
      texte: "Les premiers messages sont partis. Les visites sont déjà pleines.",
      position: 80,
    },
    avec: {
      nom: "Avec Terouva",
      titre: "Vous répondez dès l'alerte.",
      texte: "Votre message et votre dossier sont prêts : vous écrivez dans l'heure.",
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
    body: "Toutes vos alertes au même endroit. Les nouvelles annonces vous sont signalées.",
  },
  {
    icon: "gauge" as const,
    title: "Vous écrivez d'abord aux bonnes",
    body: "Chaque annonce est comparée à ce que vous cherchez : trop chère, trop loin, ou à saisir.",
  },
  {
    icon: "pen" as const,
    title: "Vous avez toujours les mots",
    body: "Un message pour chaque logement, dans le ton que vous choisissez.",
  },
  {
    icon: "send" as const,
    title: "Vous savez où vous en êtes",
    body: "Vous notez chaque réponse et chaque visite : vos candidatures tiennent sur une page.",
  },
  {
    icon: "lock" as const,
    title: "Votre dossier reste à vous",
    body: "Rien à confier à personne.",
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
    q: "Est-ce légal ? Mon compte Leboncoin ou SeLoger risque-t-il quelque chose ?",
    a: "Terouva travaille sur les alertes que les sites d'annonces vous envoient déjà et sur les annonces que vous ouvrez vous-même. Il ne vous demande jamais vos identifiants, ne se connecte pas à votre compte et n'agit jamais sur ces sites à votre place.",
  },
  {
    q: "Est-ce que Terouva envoie les messages à ma place ?",
    a: "Non. Il prépare le message, et c'est vous qui le collez sur le site de l'annonce et qui l'envoyez. Rien ne part sans vous.",
  },
  {
    q: "Est-ce que ça marche dans ma ville ?",
    a: "Oui, partout où les sites d'annonces publient des locations. Terouva part de votre propre recherche et de vos alertes, quelle que soit la ville.",
  },
  {
    q: "Combien ça coûte ?",
    a: "La base sera gratuite. Des options payantes viendront pour aller plus loin, et leur prix sera annoncé avant tout paiement. Les outils de ce site restent gratuits.",
  },
  {
    q: "Quand est-ce que ça ouvre, et que se passe-t-il si je m'inscris ?",
    a: "Par vagues. Laissez votre adresse : vous recevez un e-mail quand votre tour arrive, et rien d'autre d'ici là. En attendant, les outils gratuits du site fonctionnent déjà.",
  },
  {
    q: "Où vont mes données ?",
    a: "Nulle part. Vos papiers et vos messages restent sur votre ordinateur : pas de compte, pas de publicité. Votre adresse e-mail, si vous la laissez, sert seulement à vous prévenir quand votre tour arrive.",
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
  disclaimer:
    "Terouva n'a aucun lien avec Leboncoin, SeLoger, PAP, Bien'ici, Logic-Immo, ImmoJeune, Studapart ni La Carte des Colocs. Leurs noms appartiennent à leurs propriétaires.",
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
