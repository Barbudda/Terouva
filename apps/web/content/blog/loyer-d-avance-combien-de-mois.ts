import { article } from "@/lib/blog-format";

const F31269 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F31269";
const T31269 = "Service-public.gouv.fr · Dépôt de garantie d'un logement loué vide ou meublé";
const ANIL = "https://www.anil.org/votre-besoin/louer/le-loyer/fixation-du-loyer-au-moment-de-la-mise-en-location/";
const TANIL = "ANIL · Montant du loyer : fixation au moment de la mise en location";

export default article({
  slug: "loyer-d-avance-combien-de-mois",
  titre: "Loyer d'avance : combien de mois un propriétaire peut-il demander ?",
  titreSeo: "Loyer d'avance : combien de mois peut-on exiger ?",
  description:
    "Le loyer se paie en général chaque mois, et vous pouvez demander un paiement mensuel. Ce que valent deux mois et demi réclamés à l'entrée, quoi répondre.",
  chapeau:
    "En général un seul : le loyer se paie chaque mois, en début ou en fin de mois, à la date fixée par le bail. Si le bail prévoit un autre rythme, vous pouvez demander au propriétaire un paiement mensuel. Et quand le loyer se paie par trimestre d'avance, aucun dépôt de garantie ne peut s'y ajouter.",
  publieLe: "2026-11-04",
  pilier: "D",
  format: "question",
  guidePilier: "/guides/depot-de-garantie",
  guidesLies: ["/guides/dossier-de-location"],
  statut: "publie",
  requete: "exigence de payer 2 mois et demi de loyer d'avance",
  faits: [
    {
      fait: "Le loyer se paie en général chaque mois, en début ou en fin de mois, à la date du bail",
      valeur: "chaque mois, en début ou en fin de mois",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1214",
      titreSource: "Service-public.gouv.fr · Paiement du loyer par le locataire (bail d'habitation)",
      releveLe: "2026-11-04",
      citation: "En général, le loyer est à payer chaque mois, soit en début, soit en fin de mois.",
    },
    {
      fait: "Si le paiement n'est pas mensuel, le locataire peut demander un paiement mensuel",
      valeur: "paiement mensuel sur demande du locataire",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-04",
      citation: "Si le paiement n'est pas mensuel, le locataire peut en faire la demande au bailleur.",
    },
    {
      fait: "Loyer payé d'avance chaque trimestre : dépôt de garantie interdit",
      valeur: "trimestre d'avance : dépôt interdit",
      source: F31269,
      titreSource: T31269,
      releveLe: "2026-11-04",
      citation: "Lorsque le loyer est à payer d'avance chaque trimestre",
    },
    {
      fait: "Dépôt de garantie en location vide : au plus 1 mois de loyer hors charges",
      valeur: "1 mois de loyer hors charges",
      source: F31269,
      titreSource: T31269,
      releveLe: "2026-11-04",
      citation: "ne doit pas dépasser 1 mois de loyer (hors charges)",
    },
    {
      fait: "Dépôt de garantie en meublé : au plus 2 mois de loyer hors charges",
      valeur: "2 mois de loyer hors charges",
      source: F31269,
      titreSource: T31269,
      releveLe: "2026-11-04",
      citation: "ne doit pas dépasser 2 mois de loyer (hors charges)",
    },
    {
      fait: "Aucune somme ne peut être réclamée avant la signature du bail",
      valeur: "aucune somme avant la signature du bail",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169",
      titreSource: "Service-public.gouv.fr · Futur locataire : justificatifs à donner au propriétaire",
      releveLe: "2026-11-04",
      citation: "Aucune somme d'argent ne peut être réclamée par le propriétaire avant la signature du bail d'habitation.",
    },
  ],
  corps: `
## Combien de mois de loyer d'avance peut-on vous demander ? {#combien}
En général un seul. Le loyer se paie à la date fixée par le bail, le plus souvent chaque mois, en début ou en fin de mois. Payer « d'avance » veut dire régler le mois qui commence, pas plusieurs mois à la fois. Si un bail prévoit un autre rythme, vous pouvez demander au propriétaire de payer mensuellement.

À la signature, vous réglez donc le premier loyer, éventuellement calculé au prorata, et le [dépôt de garantie](/guides/depot-de-garantie) s'il est prévu. Pas une réserve de plusieurs mois.

## Terme à échoir, terme échu : quelle différence ? {#terme}
C'est le moment où vous payez dans le mois. À terme à échoir, vous payez le loyer au début du mois que vous allez occuper. À terme échu, vous payez à la fin du mois, ou au début du suivant, pour le mois déjà passé. Le bail indique lequel s'applique.

Dans les deux cas, il s'agit d'un mois de loyer à la fois. Le terme change la date du prélèvement, pas le nombre de mois réglés.

## Que valent deux mois et demi réclamés à l'entrée ? {#deux-mois-et-demi}
Regardez d'abord ce que la somme recouvre. Un premier loyer, un dépôt de garantie et des frais d'agence peuvent faire deux mois et demi sans rien d'irrégulier. Le dépôt est plafonné : un mois de loyer hors charges en vide, deux mois en meublé. Ce qui dépasse ces postes, demandé comme loyer d'avance, mérite une question écrite.

Les frais d'agence ont leurs propres plafonds, détaillés dans [frais d'agence en location](/blog/frais-agence-location).

## Un propriétaire peut-il demander un trimestre d'avance ? {#trimestre}
Le bail peut prévoir un paiement trimestriel, mais vous pouvez alors demander un paiement mensuel au propriétaire. Et si le loyer est à payer d'avance chaque trimestre, le dépôt de garantie est interdit : le propriétaire ne peut pas cumuler les deux. Un trimestre d'avance plus un mois de dépôt, dans un même bail, ne tient donc pas.

Faites la demande de paiement mensuel par écrit, idéalement avant la signature, pour que le bail l'écrive dès le départ.

## Et avant la signature du bail ? {#avant-signature}
Rien. Aucune somme ne peut être réclamée par le propriétaire avant la signature du bail : ni loyer d'avance, ni réservation, ni dépôt. Une demande de virement pour « bloquer » le logement avant le bail est interdite, et elle peut être le signe d'une fausse annonce. Payez le jour de la signature, contre un bail signé.

Le cas d'une somme demandée pour réserver le logement est traité dans [acompte de réservation](/blog/acompte-reservation-location-appartement), et celui des fausses annonces dans [reconnaître une fausse annonce](/blog/arnaque-location-reconnaitre-fausse-annonce).
`,
});
