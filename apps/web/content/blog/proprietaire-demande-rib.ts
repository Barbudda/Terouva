import { article } from "@/lib/blog-format";

const F1169 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169";
const T1169 = "Service-public.gouv.fr · Futur locataire : justificatifs à donner au propriétaire";
const F1214 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1214";
const T1214 = "Service-public.gouv.fr · Paiement du loyer par le locataire (bail d'habitation)";
const CNIL = "https://cnil.fr/fr/location-dun-bien-immobilier-quels-justificatifs";
const TCNIL = "CNIL · Location d'un bien immobilier : quels justificatifs peut-on demander aux candidats ?";
const CYBER = "https://www.cybermalveillance.gouv.fr/tous-nos-contenus/fiches-reflexes/arnaques-location-immobiliere";
const TCYBER = "Cybermalveillance.gouv.fr · Arnaques à la location immobilière";

export default article({
  slug: "proprietaire-demande-rib",
  titre: "Un propriétaire peut-il demander votre RIB ?",
  titreSeo: "Un propriétaire peut-il demander votre RIB ?",
  description:
    "Le RIB n'est pas dans la liste du dossier. Différence avec le relevé et le prélèvement, moment où le donner, et quand la demande doit vous alerter.",
  chapeau:
    "Le RIB ne figure pas dans la liste des justificatifs du dossier, et le propriétaire ne peut pas exiger d'autres pièces que celles de cette liste. Aucune règle ne le nomme pour autant. Gardez-le pour après la signature, si un prélèvement que vous acceptez ou un virement le rend utile, et méfiez-vous d'une demande avant la visite.",
  publieLe: "2026-11-06",
  pilier: "B",
  format: "question",
  guidePilier: "/guides/dossier-de-location",
  guidesLies: ["/guides/refus-de-dossier"],
  statut: "publie",
  requete: "un propriétaire peut il demander un rib",
  faits: [
    {
      fait: "Il existe une liste de justificatifs autorisés",
      valeur: "liste de justificatifs autorisés",
      source: F1169,
      titreSource: T1169,
      releveLe: "2026-11-05",
      citation: "Il existe une liste de justificatifs autorisés",
    },
    {
      fait: "Le propriétaire a interdiction d'exiger d'autres pièces",
      valeur: "interdiction d'en exiger d'autres",
      source: F1169,
      titreSource: T1169,
      releveLe: "2026-11-05",
      citation: "Le propriétaire a interdiction d'en exiger d'autres",
    },
    {
      fait: "Réclamer un justificatif non autorisé expose à une amende de 3 000 €, ou 15 000 € pour une personne morale",
      valeur: "3 000 €, 15 000 €",
      source: F1169,
      titreSource: T1169,
      releveLe: "2026-11-05",
      citation: "il encourt une amende pouvant aller jusqu'à 3 000 € (ou 15 000 €",
    },
    {
      fait: "Le propriétaire ne peut pas demander de relevés de compte bancaire aux candidats",
      valeur: "relevés de compte bancaire exclus",
      source: CNIL,
      titreSource: TCNIL,
      releveLe: "2026-11-05",
      citation: "ne peuvent pas demander aux candidats à la location certains documents",
    },
    {
      fait: "Le bailleur ne peut pas imposer le prélèvement automatique",
      valeur: "prélèvement automatique jamais imposé",
      source: F1214,
      titreSource: T1214,
      releveLe: "2026-11-05",
      citation: "Le bailleur n'a pas le droit d'imposer le prélèvement automatique comme moyen de paiement du loyer",
    },
    {
      fait: "Le locataire est libre de refuser le mode de paiement proposé",
      valeur: "libre de refuser",
      source: F1214,
      titreSource: T1214,
      releveLe: "2026-11-05",
      citation: "Le locataire est libre de refuser la proposition du propriétaire",
    },
    {
      fait: "Le loyer se paie par tout moyen : chèque, virement ou espèces dans la limite prévue",
      valeur: "chèque, virement",
      source: F1214,
      titreSource: T1214,
      releveLe: "2026-11-05",
      citation: "Vous pouvez payer votre loyer par tout moyen (chèque, virement ou espèces",
    },
    {
      fait: "Aucune somme ne peut être réclamée avant la signature du bail",
      valeur: "aucune somme avant la signature",
      source: F1169,
      titreSource: T1169,
      releveLe: "2026-11-05",
      citation: "Aucune somme d'argent ne peut être réclamée par le propriétaire avant la signature du bail d'habitation",
    },
    {
      fait: "Les arnaques à la location visent des informations personnelles et de l'argent",
      valeur: "usage frauduleux, argent",
      source: CYBER,
      titreSource: TCYBER,
      releveLe: "2026-11-05",
      citation: "Soutirer de l'argent et/ou des informations personnelles et documents d'identité pour en faire un usage frauduleux",
    },
    {
      fait: "Un faux bailleur prétend souvent ne pas pouvoir se déplacer",
      valeur: "démarches à distance",
      source: CYBER,
      titreSource: TCYBER,
      releveLe: "2026-11-05",
      citation: "prétend qu'il ne peut se déplacer et souhaite faire toutes les démarches à distance",
    },
    {
      fait: "En cas d'arnaque, informer sa banque et surveiller ses opérations",
      valeur: "informer sa banque",
      source: CYBER,
      titreSource: TCYBER,
      releveLe: "2026-11-05",
      citation: "Informez votre banque et surveillez régulièrement les opérations sur votre compte bancaire",
    },
  ],
  corps: `
## Le RIB fait-il partie du dossier de location ? {#dossier}
Non. La liste fixée par le décret du 5 novembre 2015 réunit quatre catégories : identité, domicile, situation professionnelle et ressources. Le RIB n'y figure pas, et le propriétaire a interdiction d'exiger d'autres pièces que celles de cette liste. Aucune règle ne cite le RIB lui-même, ni pour l'imposer ni pour l'interdire nommément.

Un propriétaire qui réclame un justificatif hors liste s'expose à une amende pouvant aller jusqu'à 3 000 €, ou 15 000 € pour une personne morale. La liste complète, pour vous et votre garant, est dans le guide du [dossier de location](/guides/dossier-de-location). Un RIB n'apprend d'ailleurs rien sur vos revenus : il ne sert pas à évaluer une candidature.

## Quelle différence avec un relevé de compte ou un prélèvement ? {#difference}
Le RIB donne les coordonnées de votre compte, le relevé montre ce qui y entre et en sort, et l'autorisation de prélèvement permet de le débiter. La CNIL range les relevés de compte parmi les documents qu'on ne peut pas demander à un candidat. Le prélèvement, lui, peut être proposé, jamais imposé, comme moyen de payer le loyer.

La confusion est fréquente parce que ces demandes arrivent ensemble. Si on vous demande un RIB « pour mettre en place le prélèvement » dès le dossier, deux questions se posent à la fois : aucun bail n'est signé, et vous restez libre de refuser ce mode de paiement.

## Quand donner votre RIB ? {#quand}
Après la signature du bail, et seulement s'il sert à quelque chose : un prélèvement du loyer que vous acceptez, ou une somme à vous rendre par virement. Vous pouvez payer votre loyer autrement, par chèque ou par virement que vous déclenchez vous-même, et refuser le mode de paiement proposé. Vous n'avez pas à justifier le refus du prélèvement.

Pour payer par virement, c'est vous qui avez besoin des coordonnées du propriétaire. Vérifiez que le nom du titulaire du compte correspond à celui inscrit au bail, comme le rappelle l'article [louer à un particulier ou à une agence](/blog/louer-particulier-ou-agence). Le mode de paiement lui-même est traité dans l'article [payer son loyer en espèces](/blog/payer-loyer-en-especes).

## Une demande de RIB est-elle un signal d'arnaque ? {#arnaque}
Elle le devient quand elle arrive tôt : avant la visite, avant le bail, ou avec vos papiers d'identité. Les fausses annonces cherchent à obtenir des informations et des documents pour en faire un usage frauduleux, ou de l'argent. Un bailleur pressé qui dit ne pas pouvoir se déplacer et demande vos coordonnées bancaires mérite que vous arrêtiez l'échange.

Une demande de RIB seule ne prouve rien : un propriétaire peut la faire par habitude. Regardez ce qui l'accompagne, à commencer par une demande d'argent, puisque aucune somme ne peut être réclamée avant la signature du bail. Les autres signes sont dans l'article [reconnaître une fausse annonce de location](/blog/arnaque-location-reconnaitre-fausse-annonce). Si vous avez déjà transmis vos coordonnées à quelqu'un qui vous inquiète, informez votre banque et surveillez les opérations sur votre compte.

## Que répondre si on vous le demande ? {#repondre}
Restez simple : proposez de le transmettre après la signature, si un paiement le nécessite, et rappelez que votre dossier est complet. La réaction du propriétaire vous renseigne d'ailleurs : une insistance forte ou pressée, sans visite ni bail, doit vous rendre plus prudent, quel que soit le motif avancé.

Par exemple : « Mon dossier est complet avec les pièces de la liste autorisée. Je vous transmettrai mes coordonnées bancaires après la signature du bail, si elles sont utiles pour un paiement. »

Si le refus de le donner devient le motif affiché d'un refus de dossier, le guide sur le [refus de dossier](/guides/refus-de-dossier) indique ce que vous pouvez faire valoir.
`,
});
