import { article } from "@/lib/blog-format";

const ANIL_BAIL = "https://www.anil.org/votre-besoin/louer/type-de-location/location-vide/bail/";
const T_ANIL_BAIL = "ANIL · Le bail de location, un document obligatoire";

export default article({
  slug: "location-sans-bail-ecrit",
  titre: "Louer sans bail écrit : quels droits, quels risques ?",
  titreSeo: "Louer sans bail écrit : droits et risques",
  description:
    "Le bail doit être écrit, mais une location sans écrit reste valable : comment exiger le bail à tout moment, et quoi garder pour prouver vos paiements.",
  chapeau:
    "La loi impose un bail écrit, mais une location sans écrit reste valable : vous êtes locataire, avec les droits qui vont avec. Vous pouvez exiger à tout moment l'établissement d'un bail écrit, et le bailleur qui refuse s'expose à une amende. En attendant, payez par virement et demandez une quittance chaque mois : ce sont vos preuves.",
  publieLe: "2026-11-04",
  pilier: "D",
  format: "question",
  guidePilier: "/guides/depot-de-garantie",
  guidesLies: ["/guides/etat-des-lieux", "/guides/repondre-a-une-annonce-de-location"],
  statut: "publie",
  requete: "louer sans contrat est-il légal ?",
  faits: [
    {
      fait: "Le bail d'un logement loué en résidence principale doit être écrit",
      valeur: "bail écrit obligatoire",
      source: ANIL_BAIL,
      titreSource: T_ANIL_BAIL,
      releveLe: "2026-11-04",
      citation: "Le bail (contrat de location) d'un logement loué à titre de résidence principale doit être écrit",
    },
    {
      fait: "Une location verbale reste valable",
      valeur: "location verbale valable",
      source: ANIL_BAIL,
      titreSource: T_ANIL_BAIL,
      releveLe: "2026-11-04",
      citation: "Bien que la loi du 6 juillet 1989 impose un écrit, une location verbale reste valable",
    },
    {
      fait: "Propriétaire et locataire peuvent exiger à tout moment un bail écrit",
      valeur: "bail écrit exigible à tout moment",
      source: ANIL_BAIL,
      titreSource: T_ANIL_BAIL,
      releveLe: "2026-11-04",
      citation: "Le propriétaire comme le locataire sont en droit d'exiger, à tout moment, l'établissement d'un bail écrit",
    },
    {
      fait: "Refuser d'établir un bail conforme est puni d'un an d'emprisonnement et d'une amende",
      valeur: "un an d'emprisonnement et 20 000 € d'amende",
      source: ANIL_BAIL,
      titreSource: T_ANIL_BAIL,
      releveLe: "2026-11-04",
      citation: "est puni d'un an d'emprisonnement et de 20 000 euros d'amende",
    },
    {
      fait: "La sanction vise les contrats conclus, reconduits ou renouvelés depuis le 11 avril 2024",
      valeur: "depuis le 11 avril 2024",
      source: ANIL_BAIL,
      titreSource: T_ANIL_BAIL,
      releveLe: "2026-11-04",
      citation: "Cette sanction s'applique aux contrats conclus, reconduits ou renouvelés depuis le 11 avril 2024",
    },
    {
      fait: "Le propriétaire remet gratuitement une quittance au locataire qui la demande",
      valeur: "quittance gratuite sur demande",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1214",
      titreSource: "Service-public.gouv.fr · Paiement du loyer par le locataire (bail d'habitation)",
      releveLe: "2026-11-04",
      citation: "doit remettre gratuitement une quittance de loyer au locataire, lorsque le locataire lui en fait la demande",
    },
    {
      fait: "L'état des lieux se fait par écrit à la remise et à la restitution des clés",
      valeur: "état des lieux écrit à l'entrée et à la sortie",
      source: ANIL_BAIL,
      titreSource: T_ANIL_BAIL,
      releveLe: "2026-11-04",
      citation: "doivent ensemble constater par écrit l'état des lieux lors de la remise des clés et au moment de leur restitution",
    },
    {
      fait: "Aucune somme ne peut être réclamée avant la signature du bail",
      valeur: "aucune somme avant la signature du bail",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169",
      titreSource: "Service-public.gouv.fr · Futur locataire : justificatifs à donner au propriétaire",
      releveLe: "2026-11-04",
      citation: "Aucune somme d'argent ne peut être réclamée par le propriétaire avant la signature du bail d'habitation",
    },
  ],
  corps: `
## Louer sans bail écrit, est-ce légal ? {#legal}
Le bail doit être écrit : la loi du 6 juillet 1989 l'impose pour un logement loué en résidence principale. L'ANIL précise toutefois qu'une location verbale reste valable. Vous êtes donc locataire même sans papier, avec les droits de la loi, mais il vous manque la preuve de ce qui a été convenu : le loyer, les charges, la date d'entrée.

C'est ce manque de preuve qui fait le risque. Le jour d'un désaccord sur le montant du loyer, sur une hausse ou sur le dépôt de garantie, c'est votre parole contre celle du propriétaire, sauf si vos paiements et vos messages parlent pour vous.

## Peut-on exiger un bail écrit en cours de location ? {#exiger}
Oui, à tout moment. Le propriétaire comme le locataire peuvent exiger l'établissement d'un bail écrit. Pour les contrats conclus, reconduits ou renouvelés depuis le 11 avril 2024, le bailleur ou l'intermédiaire qui refuse d'établir un contrat conforme à la loi risque un an d'emprisonnement et 20 000 € d'amende. Faites la demande par écrit.

Une lettre recommandée avec accusé de réception suffit : vous rappelez la date d'entrée, le loyer payé chaque mois, et vous demandez un bail conforme au modèle réglementaire. Le bail signé reprendra les conditions déjà en place, et vous pourrez vérifier son contenu avec l'article sur le [nouveau modèle de bail](/blog/nouveau-modele-de-bail-verifier-avant-de-signer).

## Sans bail, comment prouver ce que vous payez ? {#preuve}
Par des paiements qui laissent une trace : virement ou chèque, avec un libellé qui nomme le mois. Demandez aussi une quittance, que le propriétaire doit vous remettre gratuitement quand vous la demandez. Gardez les messages où le loyer, les charges et la date d'entrée sont écrits : ils remplacent en partie le bail absent, le jour où il faut prouver.

Évitez l'espèce sans reçu : rien ne prouve ensuite votre paiement. Les règles du paiement en liquide sont dans l'article [payer son loyer en espèces](/blog/payer-loyer-en-especes). Vos quittances serviront aussi pour votre prochain dossier, comme l'explique l'article sur l'[attestation de bon payeur](/blog/attestation-bon-payeur-location).

## Et le dépôt de garantie, sans bail ? {#depot}
Versez-le seulement contre un écrit qui en indique le montant, et par un moyen qui laisse une trace. Sans bail ni reçu, le récupérer à la sortie devient une affaire de preuve. Demandez aussi un état des lieux : propriétaire et locataire doivent le constater ensemble, par écrit, à la remise des clés comme à leur restitution.

Le [guide du dépôt de garantie](/guides/depot-de-garantie) rappelle les délais de restitution et ce qui peut être retenu, et le guide de l'[état des lieux](/guides/etat-des-lieux) la façon de le remplir pièce par pièce.

## Que faire avant de verser quoi que ce soit ? {#avant}
Demander le bail. Pour une nouvelle location, aucune somme ne peut vous être réclamée avant sa signature : un propriétaire qui veut un loyer d'avance ou une caution en liquide sans contrat vous demande ce que la loi lui interdit. Le bail signé, en un exemplaire pour chacun, vous donne des droits écrits et les preuves dont vous aurez besoin.

Si le propriétaire refuse tout écrit, c'est un signal : passez à une autre annonce. La méthode pour [répondre à une annonce](/guides/repondre-a-une-annonce-de-location) et poser ces questions dès le premier message est dans le guide.
`,
});
