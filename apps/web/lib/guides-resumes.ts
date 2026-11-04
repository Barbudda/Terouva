/**
 * Ce qu'il faut retenir de chaque guide, ses chiffres clés et sa photo, affichés en
 * tête d'article. Tout est tiré du texte du guide lui-même : aucun chiffre
 * n'apparaît ici qui ne soit déjà dans la page, avec sa source.
 */
export type ResumeGuide = {
  aRetenir: string[];
  enChiffres: { valeur: string; libelle: string }[];
};

export const RESUMES: Record<string, ResumeGuide> = {
  "/guides/garantie-visale": {
    aRetenir: [
      "La garantie Visale est une caution gratuite portée par Action Logement : si vous ne payez pas, l'organisme paie à votre place, puis vous demande de le rembourser.",
      "Demandez-la avant même de visiter : le visa s'obtient sur visale.fr en quelques jours ouvrés, et la demande doit précéder la signature du bail.",
      "Le loyer charges comprises doit rester sous un plafond qui dépend de votre région et de votre commune : vérifiez-le sur le simulateur de visale.fr, qui fait foi.",
      "Elle couvre les loyers et charges impayés pendant les trois premières années du bail ; au-delà, il faut en redemander une.",
      "Annoncez-la dès le premier message, juste après votre situation et votre revenu : « Je bénéficie de la garantie Visale. »",
    ],
    enChiffres: [
      { valeur: "Gratuite", libelle: "pour vous comme pour le propriétaire" },
      { valeur: "36 mois", libelle: "de loyers et charges impayés couverts au maximum" },
      { valeur: "2 mois", libelle: "de loyer et de charges pour les dégradations locatives" },
      { valeur: "1 940 €", libelle: "de loyer charges comprises au plus en Île-de-France" },
    ],
  },
  "/guides/dossier-de-location": {
    aRetenir: [
      "La liste des pièces qu'un propriétaire peut exiger est fixée par décret et elle est limitative : tout ce qui n'y figure pas est interdit.",
      "Votre dossier tient en quatre catégories : identité, domicile actuel, activité professionnelle et ressources. Pour l'identité et le domicile, une seule pièce peut être réclamée.",
      "On ne peut pas vous demander de relevé de compte, de carte Vitale ni de chèque de réservation, et aucun argent avant la signature du bail.",
      "Pour refuser une pièce interdite sans perdre le logement, proposez une alternative : vos trois derniers bulletins de salaire et votre avis d'imposition montrent la même chose.",
      "Envoyez un seul fichier PDF, dans l'ordre des quatre catégories et nommé avec votre nom, plutôt que douze pièces jointes.",
    ],
    enChiffres: [
      { valeur: "4 catégories", libelle: "de pièces autorisées, et rien d'autre" },
      { valeur: "1 seul PDF", libelle: "pour tout le dossier, nommé avec votre nom" },
      { valeur: "3 000 €", libelle: "d'amende au plus pour un particulier qui demande une pièce interdite" },
      { valeur: "15 000 €", libelle: "pour une société, agence immobilière comprise" },
    ],
  },
  "/guides/repondre-a-une-annonce-de-location": {
    aRetenir: [
      "Donnez les six informations qui servent au tri : métier et contrat, revenu net mensuel, garant, nombre d'occupants, date d'emménagement et durée envisagée.",
      "Proposez des créneaux de visite précis plutôt qu'un « quand vous voulez » qui oblige le propriétaire à proposer.",
      "Ne répétez pas la surface, le loyer et le quartier de l'annonce : une phrase sur ce qui vous a plu en dit beaucoup plus.",
      "À dossier égal, le rang d'arrivée départage : préparez votre message et votre dossier à l'avance, et réglez la question du garant avant de chercher.",
      "Après l'envoi, une seule relance, deux ou trois jours plus tard, suffit ; au-delà, elle agace.",
    ],
    enChiffres: [
      { valeur: "6 points", libelle: "que le propriétaire regarde avant d'accorder une visite" },
      { valeur: "3 ou 4", libelle: "messages retenus parmi des dizaines de réponses" },
      { valeur: "2 à 3 jours", libelle: "avant une relance, et une seule" },
    ],
  },
  "/guides/depot-de-garantie": {
    aRetenir: [
      "Le dépôt est plafonné à un mois de loyer hors charges pour un logement vide et deux mois pour un meublé ; aucun ne peut être demandé pour un bail mobilité.",
      "Il se verse à la signature du bail, qui doit en indiquer le montant ; un propriétaire qui le réclame avant, pour « réserver », sort du cadre.",
      "Chaque retenue doit être justifiée par un devis, une facture ou une photo ; une somme forfaitaire « pour remise en état » n'a pas à être acceptée.",
      "Laissez votre nouvelle adresse par écrit le jour de la remise des clés : sans elle, la majoration de retard ne s'applique pas.",
      "S'il n'est pas rendu, réclamez-le par lettre recommandée avec accusé de réception ; jusqu'à 5 000 € inclus, une tentative de règlement amiable est obligatoire avant le tribunal : conciliateur ou commission de conciliation, gratuits, ou médiateur, payant.",
    ],
    enChiffres: [
      { valeur: "1 ou 2 mois", libelle: "de loyer hors charges au plus, en vide ou en meublé" },
      { valeur: "1 mois", libelle: "pour vous le rendre si l'état des lieux de sortie est conforme" },
      { valeur: "10 %", libelle: "du loyer hors charges en plus, par mois de retard commencé" },
      { valeur: "3 ans", libelle: "pour le réclamer, à compter du jour où il était dû" },
    ],
  },
  "/guides/garant-caution": {
    aRetenir: [
      "Un parent, un proche ou un ami peut se porter garant : il n'a besoin d'être ni de votre famille, ni propriétaire, ni de votre région.",
      "Vérifiez si l'acte prévoit une caution simple ou solidaire : en solidaire, le propriétaire peut réclamer à votre garant dès le premier impayé, sans passer par vous.",
      "L'acte doit être écrit et signé par la caution, avec le montant du loyer en lettres et en chiffres et ses conditions de révision.",
      "Les justificatifs du garant suivent une liste limitative, différente de celle du locataire : tout ce qui en sort peut être refusé.",
      "Un propriétaire particulier déjà assuré contre les risques locatifs ne peut demander une caution que si vous êtes étudiant ou apprenti.",
    ],
    enChiffres: [
      { valeur: "3 ans", libelle: "pour que le propriétaire réclame les loyers et charges impayés" },
      { valeur: "6 mois", libelle: "d'engagement en plus après le préavis, en colocation solidaire" },
      { valeur: "2 pièces", libelle: "seulement à fournir pour un garant personne morale" },
    ],
  },
  "/guides/refus-de-dossier": {
    aRetenir: [
      "Un propriétaire choisit son locataire et n'a pas à motiver un refus ; la loi lui interdit seulement de le fonder sur un critère discriminatoire.",
      "Le lieu de résidence est un critère protégé. Et un propriétaire qui exige une caution ne peut pas refuser la vôtre parce qu'elle n'a pas la nationalité française ou qu'elle ne réside pas en métropole.",
      "Gardez les échanges par écrit : messages, courriels et captures d'écran datés valent un début de preuve, alors qu'un refus au téléphone ne laisse rien.",
      "Si vous apportez des éléments datés qui laissent supposer un motif interdit, c'est au propriétaire de prouver que sa décision repose sur des éléments objectifs.",
      "Vous pouvez saisir gratuitement le Défenseur des droits, ou porter plainte dans n'importe quel commissariat ou brigade de gendarmerie dans les six ans suivant les faits.",
    ],
    enChiffres: [
      { valeur: "Une vingtaine", libelle: "de critères interdits par l'article 225-1 du Code pénal" },
      { valeur: "3 ans", libelle: "d'emprisonnement encourus pour un refus discriminatoire" },
      { valeur: "45 000 €", libelle: "d'amende encourue pour ce même refus" },
      { valeur: "6 ans", libelle: "pour porter plainte après les faits" },
    ],
  },
  "/guides/louer-sans-garant": {
    aRetenir: [
      "Aucun texte n'oblige un locataire à présenter une caution : le propriétaire est libre d'en demander une, et trois dispositifs permettent de répondre sans mobiliser un proche.",
      "Commencez par la garantie Visale : elle est gratuite, et c'est la seule qui se demande en ligne avant d'avoir trouvé le logement.",
      "Demandez au propriétaire s'il est assuré contre les loyers impayés : si oui, il ne peut plus exiger de caution, sauf d'un étudiant ou d'un apprenti.",
      "Avant de payer une société de cautionnement, demandez le coût total sur la durée du bail et vérifiez que le propriétaire accepte l'organisme.",
      "En visite, dites simplement que vous n'avez pas de garant personnel, puis ce qui le remplace, puis votre métier, votre contrat et votre revenu net.",
    ],
    enChiffres: [
      { valeur: "3 solutions", libelle: "pour répondre sans mobiliser un proche" },
      { valeur: "Gratuite", libelle: "la garantie Visale, à demander avant de visiter" },
      { valeur: "1 200 €", libelle: "prêtés sans intérêts par Loca-Pass pour le dépôt de garantie" },
      { valeur: "25 mois", libelle: "au maximum pour rembourser l'avance Loca-Pass" },
    ],
  },
  "/guides/etat-des-lieux": {
    aRetenir: [
      "Tout ce qui n'est pas noté le jour de l'entrée sera réputé en bon état à la sortie : décrivez chaque pièce, sols, murs, plafonds et équipements.",
      "Venez de jour, testez robinets, volets, radiateurs et prises, prenez des photos datées et relevez vous-même les compteurs d'eau, de gaz et d'électricité.",
      "Vous avez dix jours après l'état des lieux pour en demander la modification, et le premier mois de la saison de chauffe pour le chauffage.",
      "À la sortie, vous ne payez rien pour les honoraires de l'agence, et l'usure normale due au temps ne peut donner lieu à aucune retenue.",
      "Si le propriétaire ne vient pas à la sortie, rendez les clés par lettre recommandée avec accusé de réception : le logement est considéré comme rendu en bon état.",
    ],
    enChiffres: [
      { valeur: "10 jours", libelle: "pour faire corriger l'état des lieux d'entrée" },
      { valeur: "Gratuit", libelle: "quand vous le faites à deux, à l'entrée comme à la sortie" },
      { valeur: "3,03 €/m²", libelle: "TTC au plus à votre charge, avec un professionnel à l'entrée" },
      { valeur: "30 min à 1 h", libelle: "pour un deux-pièces, fait sérieusement" },
    ],
  },
  "/guides/preavis-location": {
    aRetenir: [
      "Le préavis réduit à un mois n'est jamais automatique : invoquez le motif dans la lettre et joignez le justificatif, sinon le délai reste de trois mois.",
      "Pour la zone tendue, vérifiez votre commune sur le simulateur officiel de service-public.gouv.fr, à la date de signature ou de renouvellement de votre bail.",
      "Envoyez le congé par lettre recommandée avec avis de réception, acte de commissaire de justice ou remise en main propre contre émargement ; un courriel n'est pas valable.",
      "Le préavis court du jour où le propriétaire reçoit la lettre : comptez quelques jours d'acheminement dans votre calendrier.",
      "Le congé est irrévocable une fois reçu, sauf accord du propriétaire : ne l'envoyez pas avant d'avoir une solution de relogement ferme.",
    ],
    enChiffres: [
      { valeur: "3 mois", libelle: "de préavis par défaut pour un logement vide" },
      { valeur: "1 mois", libelle: "en meublé, ou en vide avec un motif reconnu et justifié" },
      { valeur: "2 mois", libelle: "de loyer perdus si la lettre oublie le motif du délai réduit" },
      { valeur: "3 modes", libelle: "de remise valables pour la lettre de congé, et trois seulement" },
    ],
  },
};

/**
 * La photo de chaque guide : bandeau en tête d'article, vignette dans la
 * rubrique. Toutes viennent d'Unsplash, sous la licence Unsplash (usage
 * commercial libre, sans attribution obligatoire) ; aucune n'est une photo
 * Unsplash+. On crédite quand même l'auteur sous le bandeau, avec un lien.
 * Fichiers recadrés en 16:10, 1600 px, dans `public/guides/`.
 */
export type Photo = {
  src: string;
  alt: string;
  auteur: string;
  /** La page de la photo sur Unsplash. */
  url: string;
};

export const PHOTOS: Record<string, Photo> = {
  "/guides/dossier-de-location": {
    src: "/guides/dossier-de-location.jpg",
    alt: "Des feuilles de dossier et un stylo posés sur une table en bois",
    auteur: "2H Media",
    url: "https://unsplash.com/photos/une-table-en-bois-surmontee-de-papiers-et-dun-stylo-spScdgWY-_c",
  },
  "/guides/garantie-visale": {
    src: "/guides/garantie-visale.jpg",
    alt: "Deux personnes signent des documents sur une table",
    auteur: "Romain Dancre",
    url: "https://unsplash.com/photos/personne-en-chemise-a-manches-longues-orange-ecrivant-sur-papier-blanc-doplSDELX7E",
  },
  "/guides/repondre-a-une-annonce-de-location": {
    src: "/guides/repondre-a-une-annonce-de-location.jpg",
    alt: "Une personne en pull jaune écrit sur un ordinateur portable",
    auteur: "Christin Hume",
    url: "https://unsplash.com/photos/person-using-laptop-computer-Hcfwew744z4",
  },
  "/guides/depot-de-garantie": {
    src: "/guides/depot-de-garantie.jpg",
    alt: "Une tirelire en forme de cochon et quelques pièces sur une table",
    auteur: "Andre Taissin",
    url: "https://unsplash.com/photos/tirelire-cochon-rose-sur-table-en-bois-marron-5OUMf1Mr5pU",
  },
  "/guides/garant-caution": {
    src: "/guides/garant-caution.jpg",
    alt: "Une main signe un document au stylo",
    auteur: "Cytonn Photography",
    url: "https://unsplash.com/photos/person-writing-on-white-paper-GJao3ZTX9gU",
  },
  "/guides/refus-de-dossier": {
    src: "/guides/refus-de-dossier.jpg",
    alt: "Le loquet doré d'une porte rose, fermée",
    auteur: "Amanda Vick",
    url: "https://unsplash.com/photos/serrure-de-porte-marron-IAQJjjNq0fs",
  },
  "/guides/louer-sans-garant": {
    src: "/guides/louer-sans-garant.jpg",
    alt: "Une main tend un trousseau de clés devant l'entrée d'un appartement",
    auteur: "Jakub Żerdzicki",
    url: "https://unsplash.com/photos/tenant-les-cles-de-la-maison-devant-lentree-bqUZEAeWuok",
  },
  "/guides/etat-des-lieux": {
    src: "/guides/etat-des-lieux.jpg",
    alt: "Une pièce vide au parquet clair, éclairée par de grandes fenêtres",
    auteur: "Christian Lue",
    url: "https://unsplash.com/photos/chambre-vide-avec-parquet-et-grande-fenetre-4YhNRgL59Fc",
  },
  "/guides/preavis-location": {
    src: "/guides/preavis-location.jpg",
    alt: "Des cartons de déménagement empilés entre des plantes",
    auteur: "Dina Badamshina",
    url: "https://unsplash.com/photos/une-piece-remplie-de-bacs-et-de-plantes-j7vbBmTHmjY",
  },
};

/** Les façades de la pile, en tête de la rubrique. */
export const FACADES: Photo[] = [
  {
    src: "/guides/facade-1.jpg",
    alt: "Les derniers étages d'un immeuble haussmannien à l'heure dorée",
    auteur: "Thomas K",
    url: "https://unsplash.com/photos/batiment-haussmann-a-paris-au-coucher-du-soleil-SsdXH3G_4p4",
  },
  {
    src: "/guides/facade-2.jpg",
    alt: "Des immeubles parisiens sous un ciel nuageux",
    auteur: "Wyatt Simpson",
    url: "https://unsplash.com/photos/de-beaux-immeubles-parisiens-sous-un-ciel-nuageux-JcbUM1vhf1w",
  },
  {
    src: "/guides/facade-3.jpg",
    alt: "Un immeuble d'angle aux nombreux balcons",
    auteur: "Wyatt Simpson",
    url: "https://unsplash.com/photos/un-grand-batiment-avec-de-nombreuses-fenetres-et-balcons-3v0aQxhZtVk",
  },
  {
    src: "/guides/facade-4.jpg",
    alt: "Une façade rose aux volets clos",
    auteur: "Barry Talley",
    url: "https://unsplash.com/photos/un-grand-batiment-avec-beaucoup-de-fenetres-et-de-volets-o7XvWqYKBto",
  },
];
