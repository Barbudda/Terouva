import { article } from "@/lib/blog-format";

// Mission : docs/seo/blog/PLAN-PAGES-OUTIL.md, page 2. Reprend la section #alertes du brouillon
// « être le premier à répondre » (non publié), avec les pages d'aide des sites lues le 2026-11-19.
// PAP refuse les robots (403) : ses deux citations se relisent dans un navigateur.

const LBC_RECHERCHE = "https://assistance.leboncoin.info/hc/fr/articles/360000592385";
const T_LBC_RECHERCHE = "Leboncoin, centre d'aide · Comment sauvegarder et gérer une recherche ?";
const LBC_ALERTES = "https://assistance.leboncoin.info/hc/fr/articles/360000969319";
const T_LBC_ALERTES = "Leboncoin, centre d'aide · Comment programmer des alertes et notifications de nouvelles annonces publiées ?";
const LBC_EXCLURE = "https://assistance.leboncoin.info/hc/fr/articles/4410105936914";
const SELOGER = "https://edito.seloger.com/conseils-d-experts/acheter/ne-passer-cote-bien-ideal-seloger-article-23683.html";
const T_SELOGER = "SeLoger · Comment ne (surtout) pas passer à côté du bien idéal avec SeLoger ?";
const PAP = "https://www.pap.fr/annonce/locations";
const T_PAP = "PAP · Annonces de location, fenêtre « Créez votre alerte e-mail »";
const MSI = "https://www.mysweetimmo.com/2026/09/24/location-1-candidat-sur-3-repond-en-moins-de-15-minutes/";
const T_MSI = "MySweetImmo · Location : 1 candidat sur 3 répond à l'annonce en moins de 15 minutes (24 septembre 2026)";

export default article({
  slug: "alerte-location-appartement",
  titre: "Alerte location appartement : comment la régler pour être prévenu à temps",
  titreSeo: "Alerte location appartement : bien la régler",
  description:
    "L'alerte vient du site d'annonces. Comment la régler sur Leboncoin, SeLoger et PAP, pourquoi elle arrive tard, et quoi préparer pour répondre dans l'heure.",
  chapeau:
    "Ce sont les sites d'annonces qui envoient l'alerte : vous enregistrez une recherche sur Leboncoin, SeLoger ou PAP, puis vous activez la notification. Gardez des critères larges, préférez la notification du téléphone au seul e-mail, et préparez message et dossier avant qu'elle sonne : 64,3 % des candidats contactent l'annonceur dans l'heure.",
  publieLe: "2026-11-19",
  pilier: "A",
  format: "question",
  guidePilier: "/guides/repondre-a-une-annonce-de-location",
  guidesLies: ["/guides/dossier-de-location"],
  outilLie: "/outils/message-de-candidature",
  statut: "publie",
  requete: "alerte location appartement",
  faits: [
    {
      fait: "Sur Leboncoin, l'alerte part d'une recherche sauvegardée, jusqu'à 50 par compte",
      valeur: "jusqu'à 50 recherches sauvegardées",
      source: LBC_RECHERCHE,
      titreSource: T_LBC_RECHERCHE,
      releveLe: "2026-11-19",
      citation: "vous pouvez enregistrer jusqu'à 50 recherches sauvegardées depuis votre compte",
    },
    {
      fait: "Leboncoin envoie l'alerte en notification sur l'application ou par e-mail, selon le pictogramme activé",
      valeur: "notification sur l'application ou par e-mail",
      source: LBC_ALERTES,
      titreSource: T_LBC_ALERTES,
      releveLe: "2026-11-19",
      citation: "le smartphone active les notifications sur l'application l'enveloppe active les notifications par email",
    },
    {
      fait: "Les alertes Leboncoin demandent d'être connecté à son compte",
      valeur: "alertes réservées aux recherches sauvegardées d'un compte connecté",
      source: LBC_ALERTES,
      titreSource: T_LBC_ALERTES,
      releveLe: "2026-11-19",
      citation: "recevoir des alertes et des notifications lors de la publication de nouveaux résultats de vos recherches sauvegardées",
    },
    {
      fait: "Leboncoin permet de masquer des annonces dans une recherche sauvegardée",
      valeur: "jusqu'à 20 annonces masquées par recherche",
      source: LBC_RECHERCHE,
      titreSource: T_LBC_RECHERCHE,
      releveLe: "2026-11-19",
      citation: "vous pouvez masquer jusqu'à 20 annonces par recherche sauvegardée",
    },
    {
      fait: "Leboncoin exclut d'une recherche le mot écrit après NOT en majuscules",
      valeur: "mot exclu après NOT",
      source: LBC_EXCLURE,
      titreSource: "Leboncoin, centre d'aide · Comment exclure un mot-clé d'une recherche ?",
      releveLe: "2026-11-19",
      citation: "écrivez votre recherche suivie de la mention NOT en majuscule et du terme que vous voulez exclure",
    },
    {
      fait: "Sur l'application Leboncoin, la cloche bleue indique que les notifications d'une recherche sont activées",
      valeur: "cloche bleue",
      source: LBC_ALERTES,
      titreSource: T_LBC_ALERTES,
      releveLe: "2026-11-19",
      citation: "si la cloche est bleue cela indique que les notifications sont activées",
    },
    {
      fait: "SeLoger présente ses alertes comme une information en temps réel",
      valeur: "en temps réel",
      source: SELOGER,
      titreSource: T_SELOGER,
      releveLe: "2026-11-19",
      citation:
        "vous restez informé(e) en temps réel lorsque de nouvelles annonces susceptibles de correspondre à votre recherche sont publiées",
    },
    {
      fait: "SeLoger conseille d'enregistrer ses recherches et d'activer les alertes",
      valeur: "enregistrer la recherche, puis activer l'alerte",
      source: SELOGER,
      titreSource: T_SELOGER,
      releveLe: "2026-11-19",
      citation: "enregistrez vos recherches et activez les alertes. vous pourrez ainsi être informé des nouvelles annonces sans avoir à recommencer votre recherche chaque jour",
    },
    {
      fait: "PAP envoie un e-mail dès qu'une nouvelle annonce correspond aux critères",
      valeur: "un e-mail à chaque nouvelle annonce",
      source: PAP,
      titreSource: T_PAP,
      releveLe: "2026-11-19",
      citation: "Dès qu'une nouvelle annonce correspond à vos critères, on vous envoie un e-mail",
    },
    {
      fait: "PAP demande des critères plus restrictifs quand l'alerte enverrait trop d'e-mails",
      valeur: "critères plus restrictifs si l'alerte déborde",
      source: PAP,
      titreSource: T_PAP,
      releveLe: "2026-11-19",
      citation: "Indiquez des critères plus restrictifs pour recevoir uniquement les annonces qui vous intéressent",
    },
    {
      fait: "Une part des candidats contacte l'annonceur dans les quinze minutes, et une majorité dans l'heure",
      valeur: "31,9 % en quinze minutes, 64,3 % dans l'heure",
      source: MSI,
      titreSource: T_MSI,
      releveLe: "2026-11-19",
      citation:
        "31,9 % des candidats tentent de contacter l'annonceur dans les quinze premières minutes. ils sont même 64,3 % à le faire dans l'heure",
    },
    {
      fait: "Moins de quatre candidatures sur dix sont complètes à la réception",
      valeur: "3,7 sur 10",
      source: MSI,
      titreSource: T_MSI,
      releveLe: "2026-11-19",
      citation: "sur dix candidatures reçues, seules 3,7 sont en moyenne immédiatement complètes et exploitables",
    },
  ],
  corps: `
## Qui envoie les alertes de location ? {#qui-envoie}
Le site d'annonces lui-même. Sur Leboncoin, SeLoger ou PAP, vous lancez une recherche avec vos critères, vous l'enregistrez, puis vous activez l'alerte : le site vous prévient quand une nouvelle annonce y correspond. Les alertes se règlent donc site par site. Des applications réunissent aussi les annonces de plusieurs sites dans une seule alerte.

Comptez une alerte par site où votre ville publie, et une recherche par secteur si vous visez deux quartiers éloignés. Les applications qui regroupent plusieurs sites sont présentées dans [les meilleures applications pour trouver une location](/blog/meilleures-applications-trouver-location). Le reste de la méthode, une fois l'annonce trouvée, est dans le guide pour [répondre à une annonce de location](/guides/repondre-a-une-annonce-de-location).

## Comment créer une alerte sur Leboncoin ? {#leboncoin}
Connectez-vous à votre compte, lancez la recherche avec la catégorie, vos critères et vos villes, puis choisissez « Sauvegarder la recherche ». Dans « Mes recherches », activez ensuite l'alerte : le smartphone pour la notification de l'application, l'enveloppe pour l'e-mail. Leboncoin accepte jusqu'à 50 recherches sauvegardées par compte, ce qui laisse de la place pour plusieurs secteurs.

Deux réglages servent beaucoup en location :
- **masquer** une annonce déjà vue dans la recherche sauvegardée, jusqu'à 20 annonces par recherche, pour que la liste ne montre plus que le neuf ;
- **exclure un mot** en l'écrivant après NOT en majuscules, par exemple « appartement NOT colocation ». Excluez peu : un mot de trop cache aussi les bonnes annonces.

Sur l'application iOS ou Android, la recherche se retrouve dans « Favoris », puis « Mes recherches » ; la cloche bleue indique que les notifications sont activées.

## Comment créer une alerte sur SeLoger et sur PAP ? {#seloger-pap}
Sur SeLoger, le conseil du site est d'enregistrer vos recherches et d'activer les alertes, pour être informé des nouvelles annonces sans refaire la recherche chaque jour. SeLoger annonce une information en temps réel. Sur PAP, la page de résultats propose « Créez votre alerte e-mail » : dès qu'une nouvelle annonce correspond à vos critères, le site vous envoie un e-mail.

PAP prévient aussi quand vos critères sont si larges que vous seriez submergé d'e-mails, et vous demande alors de les resserrer. C'est le bon signal pour retirer un quartier ou baisser d'une pièce. Sur ces deux sites comme ailleurs, installez l'application si vous voulez une notification sur le téléphone, et vérifiez qu'elle est autorisée dans les réglages du téléphone.

## Quels critères mettre dans une alerte ? {#criteres}
Seulement ce qui fait renoncer à coup sûr : la ville ou les quartiers, le loyer maximum charges comprises, le nombre de pièces minimum. Laissez de côté l'étage, le balcon ou le parking : une annonce mal remplie disparaît de vos résultats si elle ne coche pas la case, alors qu'elle vous aurait plu. Une alerte trop précise reste muette.

Mettez le loyer maximum un peu au-dessus de votre budget réel : certains propriétaires affichent le loyer hors charges, d'autres charges comprises, et une annonce à quelques euros près se négocie parfois. Si le volume devient ingérable, resserrez un critère à la fois, comme le conseille PAP, plutôt que tous d'un coup.

## Pourquoi une alerte « en temps réel » arrive-t-elle tard, ou pas du tout ? {#en-retard}
Le plus souvent, l'alerte part bien, mais elle se perd en route : notifications de l'application coupées dans le téléphone, e-mail classé dans les promotions ou les indésirables, compte déconnecté, ou critères si étroits qu'aucune annonce ne passe. Une alerte par e-mail seule se lit aussi plus tard qu'une notification, surtout pendant la journée de travail.

Vérifiez dans l'ordre :
1. que l'alerte est bien activée dans « Mes recherches » ou « Mes alertes » du site, et pas seulement la recherche enregistrée ;
2. que les notifications de l'application sont autorisées, y compris en mode économie d'énergie ;
3. que l'adresse d'envoi du site est dans vos contacts, pour que l'e-mail arrive dans la boîte principale ;
4. qu'un critère ou un mot exclu ne filtre pas les annonces que vous attendiez : refaites la recherche à la main et comparez.

## Que préparer pour répondre dans l'heure ? {#repondre-dans-l-heure}
Le message et le dossier, avant que l'alerte sonne. Selon des enquêtes de Leboncoin Immo relayées par MySweetImmo, 31,9 % des candidats contactent l'annonceur dans les quinze premières minutes et 64,3 % dans l'heure. Et sur dix candidatures reçues, 3,7 seulement sont complètes tout de suite : arriver tôt avec un message complet vous place devant la plupart des autres.

Concrètement :
- **le message**, écrit une fois, avec une phrase à changer pour chaque logement : le [générateur de message de candidature](/outils/message-de-candidature) le rédige avec vous, gratuitement ;
- **le dossier**, en un seul lien, par exemple avec [DossierFacile](/blog/dossierfacile-c-est-quoi), avec les seules pièces de la [liste officielle](/guides/dossier-de-location) ;
- **un créneau** pour répondre : une alerte lue deux heures plus tard fait perdre ce que la préparation avait gagné.

La vitesse a un piège : une annonce trop belle qui presse de payer. Les signes d'une [fausse annonce](/blog/arnaque-location-reconnaitre-fausse-annonce) se vérifient en une minute. Si vous envoyez plusieurs candidatures à la fois, l'article sur les [candidatures en même temps](/blog/plusieurs-candidatures-location-en-meme-temps) dit quoi ne pas promettre.

## Que fait Terouva une fois l'alerte arrivée ? {#terouva}
Terouva prend le relais au moment où l'alerte arrive. Parmi les annonces que vos sites vous signalent et celles que vous ouvrez vous-même, il repère celles qui correspondent à vos critères, les trie et prépare un message de candidature personnalisé. L'alerte reste envoyée par le site : Terouva ne se connecte pas à votre compte, ne demande pas vos identifiants et n'agit pas sur ces sites.

![Annonce d'exemple ouverte, notée 97 sur 100, avec ses points forts et, sous « Votre message de candidature », un message prêt à copier](/blog/captures/terouva-demo-message-candidature.webp "Dans Terouva, une annonce ouverte : ses points forts, aucun point faible, et le message de candidature prêt, avec les boutons pour le copier ou le marquer comme envoyé. Exemple de démonstration, novembre 2026.")

Sa définition : « Terouva est un outil d'automatisation de la recherche de location immobilière en France. Il aide les locataires à repérer rapidement les annonces correspondant à leurs critères, à évaluer leur pertinence, à préparer un message de candidature personnalisé et à suivre leurs candidatures. Terouva est conçu pour réduire le temps passé à rechercher un logement et permettre aux candidats de réagir plus rapidement aux nouvelles annonces. L'utilisateur garde le contrôle de l'envoi de ses messages. »

C'est vous qui collez et envoyez le message sur le site de l'annonce : rien ne part sans vous. Terouva n'est pas encore ouvert. Il ouvre par vagues, et l'inscription vous réserve une place. Ce qui peut être confié à un outil, étape par étape, est détaillé dans [automatiser sa recherche de location](/blog/automatiser-recherche-location). [Être prévenu](#prevenu)
`,
});
