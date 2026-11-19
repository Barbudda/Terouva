import { article } from "@/lib/blog-format";

// Page Jinka (PLAN-PAGES-OUTIL.md, mission 3). Publicité comparative : Code de la consommation,
// art. L122-1 et L122-2, relus sur Légifrance le 2026-11-19. Jinka est décrit avec les mots de ses
// propres pages (CGU, accueil, « qui sommes-nous », Vigie, fiche App Store), sans avis inventé ni
// phrase sur ce qui lui manquerait. Les citations des pages jinka.fr évitent les apostrophes : le
// site les encode en `&#x27;`, que `npm run blog:sources` ne normalise pas.

const CGU = "https://www.jinka.fr/cgu";
const TCGU = "Jinka · Conditions générales d'utilisation (version du 4 août 2026)";
const QSN = "https://www.jinka.fr/qui-sommes-nous";
const TQSN = "Jinka · Qui sommes-nous ?";
const VIGIE = "https://www.jinka.fr/vigie";
const TVIGIE = "Jinka · Vigie, l'agent anti-arnaque, et le baromètre des arnaques à la location";
const STORE = "https://apps.apple.com/fr/app/jinka/id1519258255";
const TSTORE = "App Store · Jinka - Achat & Location Immo";

export default article({
  slug: "jinka-application-location",
  titre: "Jinka est-il gratuit ? Ce que fait l'application, et comment la compléter",
  titreSeo: "Jinka est-il gratuit ? Ce que fait l'application",
  description:
    "Oui pour le locataire, d'après les CGU de Jinka. Ce que fait l'application selon ses propres pages, et comment la combiner avec vos réponses aux annonces.",
  chapeau:
    "Oui. Les conditions générales d'utilisation de Jinka mettent l'application à disposition du grand public à titre gratuit, et son offre payante s'adresse aux professionnels qui y diffusent leurs annonces. L'application réunit les annonces de plus de 5 000 sites, écarte celles qu'elle juge suspectes et permet de contacter l'annonceur. Page éditée par Terouva.",
  publieLe: "2026-11-19",
  pilier: "A",
  format: "comparatif",
  guidePilier: "/guides/repondre-a-une-annonce-de-location",
  guidesLies: ["/guides/dossier-de-location"],
  outilLie: "/outils/message-de-candidature",
  statut: "publie",
  requete: "jinka est il gratuit",
  faits: [
    {
      fait: "Jinka met son application et son site à disposition du grand public gratuitement",
      valeur: "gratuit",
      source: CGU,
      titreSource: TCGU,
      releveLe: "2026-11-19",
      citation: "met à disposition du grand public, à titre gratuit",
    },
    {
      fait: "L'offre payante Jinka Pro s'adresse aux professionnels de l'immobilier",
      valeur: "offre payante réservée aux professionnels",
      source: "https://www.jinka.fr/cgv",
      titreSource: "Jinka Pro · Conditions générales de vente (version du 10 novembre 2026)",
      releveLe: "2026-11-19",
      citation: "notamment une agence immobilière, un agent commercial ou mandataire indépendant, un office notarial ou un administrateur de biens",
    },
    {
      fait: "La fiche App Store de Jinka indique une application gratuite",
      valeur: "gratuit",
      source: STORE,
      titreSource: TSTORE,
      releveLe: "2026-11-19",
      citation: "jinka - achat & location immo + 5 000 sites immobiliers gratuit",
    },
    {
      fait: "Jinka annonce réunir les annonces de plus de 5 000 sites immobiliers",
      valeur: "plus de 5 000 sites",
      source: "https://www.jinka.fr/",
      titreSource: "Jinka · Accueil",
      releveLe: "2026-11-19",
      citation: "1 app, + 5 000 sites immobiliers soyez le premier à recevoir les annonces de milliers de sites immobiliers",
    },
    {
      fait: "Jinka envoie par e-mail ou par notification les nouvelles annonces correspondant aux alertes",
      valeur: "notification ou e-mail à chaque nouvelle annonce",
      source: CGU,
      titreSource: TCGU,
      releveLe: "2026-11-19",
      citation: "recevoir des notifications, sur son adresse e-mail ou par notification, concernant les nouvelles annonces disponibles en ligne correspondant à ses alertes",
    },
    {
      fait: "Jinka permet de contacter par téléphone ou par e-mail les auteurs des annonces",
      valeur: "contact de l'annonceur par téléphone ou e-mail",
      source: CGU,
      titreSource: TCGU,
      releveLe: "2026-11-19",
      citation: "contacter, par téléphone ou par email, les auteurs des annonces immobilières identifiées dans le cadre des alertes",
    },
    {
      fait: "Depuis Jinka, on contacte l'annonceur ou on dépose sa candidature",
      valeur: "contact ou candidature depuis l'application",
      source: QSN,
      titreSource: TQSN,
      releveLe: "2026-11-19",
      citation: "contactez les propriétaires et agences ou déposez votre candidature instantanément depuis jinka",
    },
    {
      fait: "Jinka intègre DossierFacile pour l'envoi du dossier de location",
      valeur: "DossierFacile intégré",
      source: QSN,
      titreSource: TQSN,
      releveLe: "2026-11-19",
      citation: "tout en protégeant vos données, nous intégrons dossierfacile : ce service public certifie et sécurise",
    },
    {
      fait: "Jinka dit filtrer les doublons, les fausses annonces et les arnaques avant l'envoi",
      valeur: "filtre des doublons et des arnaques",
      source: QSN,
      titreSource: TQSN,
      releveLe: "2026-11-19",
      citation: "notre ia filtre les doublons, les fausses annonces et les arnaques pour ne vous envoyer, en temps réel",
    },
    {
      fait: "Vigie compare le loyer au marché, cherche les photos ailleurs sur le web et lit la description",
      valeur: "loyer, photos, description",
      source: VIGIE,
      titreSource: TVIGIE,
      releveLe: "2026-11-19",
      citation: "vigie compare le loyer au marché, cherche les photos ailleurs sur le web et lit la description",
    },
    {
      fait: "Jinka présente l'avis de Vigie comme un avis généré par une IA, jamais une garantie",
      valeur: "jamais une garantie",
      source: VIGIE,
      titreSource: TVIGIE,
      releveLe: "2026-11-19",
      citation: "un avis généré par une ia, jamais une garantie",
    },
    {
      fait: "Selon le baromètre de Jinka, 6 % des annonces de location publiées en octobre 2026 ont été écartées par ses filtres",
      valeur: "6 %",
      source: VIGIE,
      titreSource: TVIGIE,
      releveLe: "2026-11-19",
      citation: "6 % des annonces de location publiées ont été écartées par les filtres de jinka avant toute alerte",
    },
    {
      fait: "L'application Jinka permet de garder des favoris et d'ajouter des notes et des contacts pour gérer ses visites",
      valeur: "favoris, notes et contacts pour les visites",
      source: STORE,
      titreSource: TSTORE,
      releveLe: "2026-11-19",
      citation: "sauvegardez vos favoris et gérez vos visites en ajoutant des notes et des contacts sur vos annonces préférées",
    },
    {
      fait: "La fiche App Store de Jinka affichait une note de 4,8 sur 5 pour 76 000 notes",
      valeur: "4,8 sur 5, 76 k notes",
      source: STORE,
      titreSource: TSTORE,
      releveLe: "2026-11-19",
      citation: "plus notes et avis 4,8 sur 5 76 k notes",
    },
    {
      fait: "L'alerte Leboncoin arrive par notification sur l'application ou par e-mail, au choix",
      valeur: "notification sur l'application ou e-mail",
      source: "https://assistance.leboncoin.info/hc/fr/articles/360000969319-Comment-programmer-des-alertes-et-notifications-de-nouvelles-annonces-publi%C3%A9es",
      titreSource: "Leboncoin · Comment programmer des alertes et notifications de nouvelles annonces publiées ?",
      releveLe: "2026-11-19",
      citation: "le smartphone active les notifications sur l'application l'enveloppe active les notifications par email",
    },
    {
      fait: "Près de deux candidats sur trois contactent l'annonceur dans l'heure qui suit la publication",
      valeur: "64,3 % dans l'heure",
      source: "https://www.mysweetimmo.com/2026/09/24/location-1-candidat-sur-3-repond-en-moins-de-15-minutes/",
      titreSource: "MySweetImmo · Location : 1 candidat sur 3 répond en moins de 15 minutes (24 septembre 2026)",
      releveLe: "2026-11-19",
      citation: "ils sont même 64,3 % à le faire dans l'heure",
    },
  ],
  corps: `
*Cette page est éditée par Terouva, qui figure dans la comparaison. Jinka y est décrit avec les mots de ses propres pages, relevés le 19 novembre 2026. La comparaison de tous les outils, par catégorie, est dans notre page sur les [meilleures applications pour trouver une location](/blog/meilleures-applications-trouver-location).*

## Jinka est-il gratuit ? {#gratuit}
Oui, pour vous. Les conditions générales d'utilisation de Jinka, en version du 4 août 2026, mettent l'application et le site à disposition du grand public à titre gratuit, et la fiche App Store l'indique aussi. L'offre payante, Jinka Pro, a ses propres conditions de vente : elle s'adresse aux professionnels, agences, mandataires, notaires ou administrateurs de biens, qui y diffusent leurs annonces.

Sur l'App Store, la fiche affichait une note de 4,8 sur 5 pour environ 76 000 notes le 19 novembre 2026. Une note moyenne dit peu de votre ville : le plus sûr reste de créer une alerte et de voir ce qu'elle vous envoie pendant une semaine.

## Que fait Jinka, d'après ses propres pages ? {#ce-que-fait-jinka}
Jinka réunit dans une seule application les annonces de plus de 5 000 sites immobiliers. Vous créez une alerte avec vos critères, et l'application vous envoie les nouvelles annonces par notification ou par e-mail. Elle permet ensuite de contacter l'annonceur par téléphone ou par e-mail, ou de déposer votre candidature, avec DossierFacile intégré pour le dossier.

Ses pages décrivent aussi :
- les favoris, avec des notes et des contacts pour organiser vos visites ;
- le filtre des doublons, des fausses annonces et des arnaques avant l'envoi de l'alerte ;
- Vigie, un avis sur une annonce précise, détaillé plus bas.

## Comment Jinka écarte-t-il les fausses annonces ? {#fausses-annonces}
Par deux moyens, selon ses pages. Un filtre retire des annonces dès la collecte : d'après le baromètre publié par Jinka, 6 % des annonces de location publiées en octobre 2026 ont été écartées avant toute alerte. Vigie analyse ensuite, à la demande, une annonce précise : il compare le loyer au marché, cherche les photos ailleurs sur le web et lit la description.

Jinka présente lui-même l'avis de Vigie comme un avis généré par une IA, jamais une garantie. Les signes qui doivent vous arrêter, avec ou sans outil (argent demandé avant la visite, propriétaire injoignable, loyer trop bas), sont dans notre article sur les [fausses annonces de location](/blog/arnaque-location-reconnaitre-fausse-annonce).

## Faut-il garder l'alerte Leboncoin avec Jinka ? {#leboncoin}
Rien ne vous empêche de cumuler les deux. L'alerte de Leboncoin vient du site où l'annonce paraît : vous la réglez dans « Mes recherches », par notification sur l'application ou par e-mail. Pour savoir si Jinka vous apporte les annonces de votre ville, comparez pendant quelques jours ce que vous recevez des deux côtés, puis gardez ce qui vous sert.

Si vous recevez deux fois la même annonce, peu importe : ce qui compte, c'est le temps entre l'alerte et votre réponse.

## Comment utiliser Jinka et Terouva ensemble ? {#ensemble}
Ils interviennent à deux étapes différentes. Jinka, comme l'alerte d'un site d'annonces, vous prévient qu'une annonce vient de paraître. Terouva se place à l'étape suivante : trier l'annonce selon votre recherche, préparer le message de candidature et suivre où en est chaque candidature. Vous gardez Jinka pour être prévenu ; la réponse, elle, se prépare avant que l'alerte arrive.

Le délai compte : d'après deux études de leboncoin immo relayées par MySweetImmo, 64,3 % des candidats contactent l'annonceur dans l'heure qui suit la publication. Avoir le message et le dossier prêts avant l'alerte, c'est ce qui vous place parmi eux. La méthode pour écrire ce message est dans le guide [répondre à une annonce de location](/guides/repondre-a-une-annonce-de-location).

## Terouva, l'éditeur de cette page {#terouva}
Terouva est un outil d'automatisation de la recherche de location immobilière en France. Il aide les locataires à repérer rapidement les annonces correspondant à leurs critères, à évaluer leur pertinence, à préparer un message de candidature personnalisé et à suivre leurs candidatures. Terouva est conçu pour réduire le temps passé à rechercher un logement et permettre aux candidats de réagir plus rapidement aux nouvelles annonces. L'utilisateur garde le contrôle de l'envoi de ses messages.

![Annonce d'exemple ouverte, notée 97 sur 100, avec ses points forts et, sous « Votre message de candidature », un message prêt à copier](/blog/captures/terouva-demo-message-candidature.webp "Dans Terouva, une annonce ouverte : ses points forts, aucun point faible, et le message de candidature prêt, avec les boutons pour le copier ou le marquer comme envoyé. Exemple de démonstration, novembre 2026.")

Concrètement, les annonces viennent des alertes que vos sites d'annonces vous envoient et de celles que vous ouvrez vous-même : ce sont les sites qui font l'alerte. Terouva ne se connecte pas à votre compte, ne demande pas vos identifiants et n'agit pas sur ces sites. Le message, c'est vous qui le collez et l'envoyez sur le site de l'annonce. Rien ne part sans vous.

Terouva n'est pas encore ouvert. Il ouvre par vagues, et l'inscription vous réserve une place : [être prévenu](/). Dès aujourd'hui, le [générateur de message de candidature](/outils/message-de-candidature) est gratuit et sans inscription, quelle que soit l'application qui vous a envoyé l'annonce.
`,
});
