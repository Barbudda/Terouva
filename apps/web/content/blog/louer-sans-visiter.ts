import { article } from "@/lib/blog-format";

export default article({
  slug: "louer-sans-visiter",
  titre: "Louer sans visiter : comment candidater à distance sans se faire avoir",
  titreSeo: "Louer un appartement sans le visiter",
  description:
    "Étudiant ou muté dans une autre ville : candidater à distance, faire visiter par un proche ou en vidéo, et ce qu'on ne paie jamais avant d'avoir vu.",
  chapeau:
    "On peut louer depuis une autre ville si quelqu'un voit le logement pour vous : visite en vidéo menée par le propriétaire, ou un proche sur place. Envoyez votre dossier à distance, mais aucune somme ne peut vous être demandée avant la signature du bail, et une demande de carte d'identité avant toute visite est un signe de fausse annonce.",
  publieLe: "2026-11-04",
  pilier: "A",
  format: "cas-pratique",
  guidePilier: "/guides/repondre-a-une-annonce-de-location",
  guidesLies: ["/guides/dossier-de-location"],
  outilLie: "/outils/message-de-candidature",
  statut: "publie",
  requete: "louer sans visiter",
  faits: [
    {
      fait: "Aucune somme avant la signature du bail",
      valeur: "aucune somme ne peut être demandée avant la signature du bail",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169",
      titreSource: "Service-public.gouv.fr · Futur locataire : justificatifs à donner au propriétaire",
      releveLe: "2026-11-04",
      citation: "Aucune somme d'argent ne peut être réclamée par le propriétaire avant la signature du bail d'habitation",
    },
    {
      fait: "Signe d'une fausse annonce : documents officiels avant la visite",
      valeur: "une demande de carte d'identité avant la visite",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34092",
      titreSource: "Service-public.gouv.fr · Arnaques à la location immobilière sur internet",
      releveLe: "2026-11-04",
      citation: "Demande de documents officiels (exemple : carte d'identité) avant la visite du logement",
    },
    {
      fait: "Signe d'une fausse annonce : refus de rencontrer",
      valeur: "un propriétaire qui refuse de vous rencontrer",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34092",
      titreSource: "Service-public.gouv.fr · Arnaques à la location immobilière sur internet",
      releveLe: "2026-11-04",
      citation: "il refuse catégoriquement de vous rencontrer",
    },
    {
      fait: "DossierFacile donne un lien unique vers un dossier vérifié",
      valeur: "DossierFacile, gratuit, vérifie le dossier et donne un lien à envoyer",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/R51424",
      titreSource: "Service-public.gouv.fr · DossierFacile (locataire)",
      releveLe: "2026-11-04",
      citation: "Dossier Facile vérifie que votre dossier est complet et vous envoie un lien unique à communiquer au propriétaire",
    },
  ],
  corps: `
## Peut-on louer un appartement sans le visiter ? {#possible}
Oui, rien ne l'interdit, et c'est la situation de beaucoup d'étudiants et de salariés mutés qui cherchent depuis une autre ville. La seule règle à tenir : quelqu'un doit voir le logement avant que vous ne versiez quoi que ce soit, vous en vidéo ou un proche sur place. Le reste de la candidature se fait à distance, comme décrit dans le guide [répondre à une annonce de location](/guides/repondre-a-une-annonce-de-location).

Dites dès le premier message que vous candidatez à distance, et pourquoi : « je suis muté à Rennes le 1er décembre » rassure plus qu'un silence sur ce point.

## Comment faire visiter le logement à votre place ? {#faire-visiter}
Deux solutions, que vous pouvez combiner : une visite en vidéo en direct, menée par le propriétaire ou l'agence, et un proche qui visite pour vous. Préparez dans les deux cas la liste de ce que vous voulez voir, parce qu'une visite à distance montre ce qu'on vous montre, et rien d'autre.

Pendant la vidéo, demandez à voir les fenêtres ouvertes, la salle de bains en entier, le tableau électrique, la vue depuis la pièce principale. Un proche peut faire plus : écouter le bruit de la rue, tester la pression de l'eau, sentir une odeur d'humidité. La liste des [questions à poser pendant une visite](/blog/questions-a-poser-visite-appartement) lui servira de guide.

## Que pouvez-vous envoyer avant d'avoir vu le logement ? {#envoyer}
Votre message de candidature et votre dossier, rien de plus. Le dossier peut partir sous forme de lien : le service public gratuit DossierFacile vérifie qu'il est complet et vous donne un lien unique à communiquer au propriétaire. Vous gardez ainsi la main sur ce qui circule, au lieu d'envoyer vos pièces en pièce jointe à chaque annonce.

Le [générateur de message de candidature](/outils/message-de-candidature) écrit le premier message avec vos dates d'arrivée, et le guide du [dossier de location](/guides/dossier-de-location) dit quelles pièces un propriétaire peut demander.

## Qu'est-ce qu'on ne paie jamais avant d'avoir vu ? {#jamais}
Rien du tout : aucune somme ne peut être demandée avant la signature du bail, ni pour « réserver », ni pour « bloquer » le logement, ni pour couvrir des frais de dossier. Service-public cite aussi comme signes d'une fausse annonce une demande de carte d'identité avant la visite et un propriétaire qui refuse de vous rencontrer.

À distance, ces signes pèsent plus lourd : c'est justement sur les candidats qui ne peuvent pas se déplacer que comptent les fausses annonces. Un propriétaire honnête accepte une visite en vidéo ou la venue d'un proche. S'il refuse les deux, passez votre chemin, et lisez [comment reconnaître une fausse annonce](/blog/arnaque-location-reconnaitre-fausse-annonce).

## Et pour signer le bail à distance ? {#signer}
Ne signez rien tant que le logement n'a pas été vu, par vous en vidéo ou par la personne qui l'a visité pour vous. C'est au moment de la signature, et pas avant, que le dépôt de garantie et le premier loyer se versent. Si vous ne pouvez pas vous déplacer, demandez au propriétaire comment il organise la signature.

Terouva vous aide en amont : il repère les annonces qui correspondent à votre recherche et prépare votre réponse, que vous relisez et envoyez vous-même. [Être prévenu du lancement](#prevenu)
`,
});
