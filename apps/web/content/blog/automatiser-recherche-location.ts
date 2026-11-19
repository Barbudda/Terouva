import { article } from "@/lib/blog-format";

// Mission : docs/seo/blog/PLAN-PAGES-OUTIL.md, page 4. Vise les questions posées en phrases aux
// assistants IA (l'autocomplétion Google est vide sur « automatiser recherche appartement »).
// Ligne rouge : aucun mode d'emploi de script ou de robot ; on dit qu'ils existent et ce que les
// conditions d'utilisation des sites en disent. Les CGU de Leboncoin et de PAP refusent les robots
// (403) : leurs citations se relisent dans un navigateur.

const LBC_RECHERCHE = "https://assistance.leboncoin.info/hc/fr/articles/360000592385";
const T_LBC_RECHERCHE = "Leboncoin, centre d'aide · Comment sauvegarder et gérer une recherche ?";
const LBC_MESSAGERIE = "https://assistance.leboncoin.info/hc/fr/articles/4407783631122";
const T_LBC_MESSAGERIE = "Leboncoin, centre d'aide · Je ne suis pas autorisé à accéder à la messagerie leboncoin";
const LBC_EXCLURE = "https://assistance.leboncoin.info/hc/fr/articles/4410105936914";
const MSI = "https://www.mysweetimmo.com/2026/09/24/location-1-candidat-sur-3-repond-en-moins-de-15-minutes/";
const T_MSI = "MySweetImmo · Location : 1 candidat sur 3 répond à l'annonce en moins de 15 minutes (24 septembre 2026)";

export default article({
  slug: "automatiser-recherche-location",
  titre: "Automatiser sa recherche d'appartement : ce qu'on peut confier à un outil, étape par étape",
  titreSeo: "Automatiser sa recherche d'appartement",
  description:
    "L'alerte, le tri, le message et le suivi s'automatisent ; l'envoi reste à vous. Les étapes, et pourquoi les robots qui fouillent les sites posent problème.",
  chapeau:
    "Quatre étapes s'automatisent sans risque : l'alerte, envoyée par les sites d'annonces ; le tri des annonces reçues ; le brouillon du message de candidature ; le suivi des réponses. L'envoi doit rester à vous. Les robots qui consultent les sites à votre place se heurtent à leurs conditions d'utilisation : Leboncoin interdit l'extraction de ses bases de données.",
  publieLe: "2026-11-19",
  pilier: "A",
  format: "question",
  guidePilier: "/guides/repondre-a-une-annonce-de-location",
  guidesLies: ["/guides/dossier-de-location"],
  outilLie: "/outils/message-de-candidature",
  statut: "publie",
  requete: "automatiser recherche appartement",
  faits: [
    {
      fait: "Leboncoin permet d'enregistrer jusqu'à 50 recherches sauvegardées, chacune pouvant envoyer une alerte",
      valeur: "jusqu'à 50 recherches sauvegardées",
      source: LBC_RECHERCHE,
      titreSource: T_LBC_RECHERCHE,
      releveLe: "2026-11-19",
      citation: "vous pouvez enregistrer jusqu'à 50 recherches sauvegardées depuis votre compte",
    },
    {
      fait: "Leboncoin permet de masquer les annonces déjà écartées dans une recherche sauvegardée",
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
      fait: "Sur dix candidatures reçues, 3,7 en moyenne sont complètes tout de suite",
      valeur: "3,7 sur 10",
      source: MSI,
      titreSource: T_MSI,
      releveLe: "2026-11-19",
      citation: "sur dix candidatures reçues, seules 3,7 sont en moyenne immédiatement complètes et exploitables",
    },
    {
      fait: "Une majorité des candidats contacte l'annonceur dans l'heure",
      valeur: "64,3 % dans l'heure",
      source: MSI,
      titreSource: T_MSI,
      releveLe: "2026-11-19",
      citation:
        "31,9 % des candidats tentent de contacter l'annonceur dans les quinze premières minutes. ils sont même 64,3 % à le faire dans l'heure",
    },
    {
      fait: "Leboncoin n'accepte pas l'envoi de messages répétitifs",
      valeur: "messages répétitifs refusés",
      source: LBC_MESSAGERIE,
      titreSource: T_LBC_MESSAGERIE,
      releveLe: "2026-11-19",
      citation: "l'envoi de messages répétitifs nuit à l'expérience des utilisateurs. cette pratique n'est pas acceptée par leboncoin",
    },
    {
      fait: "Leboncoin peut bloquer l'accès à la messagerie en cas d'activité suspecte",
      valeur: "accès à la messagerie bloqué",
      source: LBC_MESSAGERIE,
      titreSource: T_LBC_MESSAGERIE,
      releveLe: "2026-11-19",
      citation: "nous pouvons bloquer l'accès à la messagerie lorsque nous remarquons des comportements ou des activités suspectes",
    },
    {
      fait: "Les conditions d'utilisation de Leboncoin interdisent l'extraction de ses bases de données",
      valeur: "extraction et réutilisation interdites",
      source: "https://www.leboncoin.fr/dc/cgu",
      titreSource: "Leboncoin · Mentions légales et conditions générales d'utilisation",
      releveLe: "2026-11-19",
      citation:
        "toute extraction et/ou réutilisation de tout ou partie de ces bases de données, au sens des articles L 342-1 et L 342-2 du code de la propriété intellectuelle, est interdite",
    },
    {
      fait: "Les conditions d'utilisation de PAP interdisent l'extraction automatisée de son contenu, hors usage strictement personnel",
      valeur: "extraction automatisée interdite hors fins strictement personnelles",
      source: "https://www.pap.fr/groupe/cgu",
      titreSource: "PAP · Conditions générales d'utilisation",
      releveLe: "2026-11-19",
      citation:
        "Il est également interdit d'extraire, réutiliser ou indexer de manière automatisée ou manuelle tout ou partie du contenu du Site, à des fins autres que strictement personnelles",
    },
  ],
  corps: `
## Peut-on automatiser sa recherche d'appartement ? {#peut-on}
Oui, en partie. Quatre étapes se confient sans risque à un outil : être prévenu des nouvelles annonces, trier celles qui arrivent, préparer le message de candidature et suivre les réponses. Deux choses doivent rester à vous : l'envoi du message, et l'accès à votre compte sur les sites d'annonces. Les robots qui consultent les sites à votre place, eux, se heurtent aux conditions d'utilisation de ces sites.

La suite reprend les étapes dans l'ordre où elles se présentent, avec ce qui existe aujourd'hui pour chacune. Pour choisir entre les outils, voyez [les meilleures applications pour trouver une location](/blog/meilleures-applications-trouver-location). Pour la réponse elle-même, la méthode est dans le guide pour [répondre à une annonce de location](/guides/repondre-a-une-annonce-de-location).

## Étape 1 : comment être prévenu des nouvelles annonces sans les guetter ? {#alerte}
Avec les alertes des sites d'annonces. Sur Leboncoin, SeLoger ou PAP, vous enregistrez une recherche et vous activez l'alerte : le site vous envoie une notification ou un e-mail à chaque nouvelle annonce qui correspond. Leboncoin accepte jusqu'à 50 recherches sauvegardées par compte. C'est la seule étape où l'automatisation est déjà faite, gratuitement, par les sites eux-mêmes.

Le réglage compte plus que l'outil : des critères larges, la notification du téléphone plutôt que le seul e-mail, une recherche par secteur. Le détail site par site est dans l'article sur l'[alerte location appartement](/blog/alerte-location-appartement).

## Étape 2 : comment trier les annonces sans tout relire ? {#tri}
En décidant une fois pour toutes ce qui vous fait renoncer, puis en appliquant la même grille à chaque annonce : loyer charges comprises, surface, quartier, date de disponibilité, meublé ou non. Les sites aident un peu. Leboncoin masque jusqu'à 20 annonces par recherche sauvegardée et exclut un mot écrit après NOT. Le reste du tri se fait encore à la lecture.

C'est l'étape qui prend le plus de temps quand les alertes sont bien réglées, car la plupart des annonces reçues ne vont pas. Écrivez votre grille avant de commencer, en séparant l'indispensable du souhaité, et tenez-vous-y. Une annonce qui ne coche pas l'indispensable ne mérite pas d'être ouverte deux fois.

![Six annonces d'exemple à Lyon et Villeurbanne, notées sur 100 et étiquetées de « À contacter vite » à « Peu adaptée »](/blog/captures/terouva-demo-annonces-triees.webp "Dans Terouva, les annonces triées par note. Sur les deux mieux notées, un bouton copie le message et ouvre l'annonce ; l'envoi reste à vous. Exemple de démonstration, novembre 2026.")

## Étape 3 : peut-on préparer le message de candidature à l'avance ? {#message}
Oui, et c'est ce qui fait gagner le plus. Un message écrit une fois, avec votre situation, votre revenu, votre garant et vos disponibilités, ne demande qu'une phrase à changer pour chaque logement. Selon une enquête de Leboncoin Immo relayée par MySweetImmo, 3,7 candidatures sur dix seulement sont complètes à la réception : un message complet se remarque.

![Annonce d'exemple ouverte, notée 97 sur 100, avec ses points forts et, sous « Votre message de candidature », un message prêt à copier](/blog/captures/terouva-demo-message-candidature.webp "Dans Terouva, une annonce ouverte : ses points forts, aucun point faible, et le message de candidature prêt, avec les boutons pour le copier ou le marquer comme envoyé. Exemple de démonstration, novembre 2026.")

Le [générateur de message de candidature](/outils/message-de-candidature) le rédige avec vous, gratuitement et sans inscription. Le dossier suit le même principe : un seul lien, préparé avant la première alerte, avec les pièces de la [liste officielle](/guides/dossier-de-location).

## Étape 4 : comment suivre ses candidatures quand on en envoie beaucoup ? {#suivi}
Avec une liste tenue à jour à chaque envoi : l'adresse, la date, la réponse, la date de visite et votre ordre de préférence. Un tableur suffit, et un outil peut la remplir pour vous à partir des annonces auxquelles vous avez répondu. Quand un propriétaire propose la signature, vous savez en une minute si vous acceptez ou si vous attendez une autre réponse.

![Page « Mes candidatures » de Terouva : deux candidatures d'exemple, l'une « Envoyée », l'autre « Réponse reçue », avec leur date d'envoi](/blog/captures/terouva-demo-suivi-candidatures.webp "Dans Terouva, le suivi des candidatures : chacune garde sa date d'envoi et son état, que vous mettez à jour vous-même. Exemple de démonstration, novembre 2026.")

Ce que vous pouvez promettre ou non pendant que plusieurs candidatures sont en cours est expliqué dans l'article sur les [candidatures en même temps](/blog/plusieurs-candidatures-location-en-meme-temps).

## Que faut-il garder à la main ? {#a-la-main}
L'envoi, toujours. Un message parti tout seul ne tient pas compte de ce que dit l'annonce, des questions posées par le propriétaire ou d'un détail qui aurait dû vous faire renoncer. Et sur Leboncoin, l'envoi de messages répétitifs n'est pas accepté : le site peut bloquer l'accès à la messagerie quand il remarque une activité suspecte, ce qui arrête votre recherche net.

Gardez aussi à la main tout ce qui engage : la visite, le choix entre deux propositions, la signature du bail. Sur une annonce qui presse de payer avant la visite, les signes d'une [fausse annonce](/blog/arnaque-location-reconnaitre-fausse-annonce) se vérifient en une minute.

## Les robots et « bots Leboncoin » sont-ils une bonne idée ? {#robots}
Ils posent plus de problèmes qu'ils n'en règlent. Des scripts circulent pour consulter les sites d'annonces en boucle, voire répondre à votre place, mais ils se heurtent aux conditions des sites. Les conditions de Leboncoin interdisent l'extraction et la réutilisation de tout ou partie de ses bases de données. Celles de PAP interdisent l'extraction automatisée de son contenu à des fins autres que strictement personnelles.

Le risque est concret. Un compte qui envoie des messages en série peut perdre l'accès à la messagerie, et un script auquel vous donnez votre identifiant et votre mot de passe a la main sur votre compte. Le gain, lui, est faible : les alertes des sites signalent déjà chaque nouvelle annonce, gratuitement. Ce qui départage ensuite les candidats tient au message prêt et au dossier complet.

## Que fait Terouva dans cette chaîne ? {#terouva}
Terouva automatise les étapes 2 à 4 et vous laisse l'envoi. Les annonces viennent des alertes que vos sites d'annonces vous envoient et de celles que vous ouvrez vous-même. Terouva ne se connecte pas à votre compte, ne demande pas vos identifiants et n'agit pas sur ces sites. C'est vous qui collez et envoyez le message sur le site de l'annonce.

Sa définition, mot pour mot : « Terouva est un outil d'automatisation de la recherche de location immobilière en France. Il aide les locataires à repérer rapidement les annonces correspondant à leurs critères, à évaluer leur pertinence, à préparer un message de candidature personnalisé et à suivre leurs candidatures. Terouva est conçu pour réduire le temps passé à rechercher un logement et permettre aux candidats de réagir plus rapidement aux nouvelles annonces. L'utilisateur garde le contrôle de l'envoi de ses messages. »

Rien ne part sans vous. Terouva n'est pas encore ouvert : il ouvre par vagues, et l'inscription vous réserve une place. En attendant, le [générateur de message](/outils/message-de-candidature) sert dès aujourd'hui. [Être prévenu](#prevenu)
`,
});
