// Vague 9, ligne 17. Requête relevée à l'autocomplétion : « locataire peut il repeindre les murs ».
// Apport : la frontière aménager / transformer, les deux lectures des trous dans le mur, et la clause travaux qui
// permet de repeindre un logement défraîchi aux frais du propriétaire, dont les réponses habituelles ne parlent pas.

import { article } from "@/lib/blog-format";

const F1874 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1874";
const T1874 = "Service-public.gouv.fr · Utilisation du logement et travaux par le locataire";
const F31697 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F31697";
const T31697 = "Service-public.gouv.fr · Entretien courant et réparations locatives à la charge du locataire";
const ANIL = "https://www.anil.org/parole-expert-logement-locataire-qui-paie-les-reparations/";
const TANIL = "ANIL · Locataire ou propriétaire : qui paie les réparations dans une location ?";
const F31699 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F31699";
const T31699 = "Service-public.gouv.fr · Bail d'habitation : travaux à la charge du propriétaire (bailleur)";

export default article({
  slug: "repeindre-murs-location",
  titre: "Repeindre et percer les murs d'une location : faut-il demander ?",
  titreSeo: "Repeindre les murs d'une location : vos droits",
  description:
    "Rafraîchir les peintures ne demande pas d'accord, transformer le logement si. Ce qu'on peut exiger au départ, et comment faire payer le propriétaire.",
  chapeau:
    "Vous pouvez rafraîchir les peintures sans rien demander : c'est un aménagement libre. Une couleur très marquée se demande d'abord, et une transformation exige un accord écrit. Sans cet accord, le propriétaire peut garder les travaux sans vous indemniser ou exiger la remise en état à vos frais. Les trous de tableaux se rebouchent avant de partir.",
  publieLe: "2026-11-06",
  pilier: "D",
  format: "question",
  guidePilier: "/guides/etat-des-lieux",
  guidesLies: ["/guides/depot-de-garantie"],
  statut: "publie",
  requete: "locataire peut il repeindre les murs",
  faits: [
    {
      fait: "Droit d'aménager librement, peinture comprise",
      valeur: "aménagement libre : changement de moquette, rafraîchissement des peintures murales",
      source: F1874,
      titreSource: T1874,
      releveLe: "2026-11-05",
      citation:
        "Le locataire a le droit d'aménager librement le logement qu'il occupe (changement de moquette, rafraîchissement des peintures murales...).",
    },
    {
      fait: "En cas de doute, demander",
      valeur: "peinture criarde : mieux vaut demander l'autorisation",
      source: F1874,
      titreSource: T1874,
      releveLe: "2026-11-05",
      citation:
        "En cas de doute (par exemple, si le locataire veut peindre les murs d'une peinture criarde), mieux vaut demander l'autorisation du propriétaire",
    },
    {
      fait: "Transformation : accord écrit",
      valeur: "pas de gros travaux de transformation sans accord écrit",
      source: F1874,
      titreSource: T1874,
      releveLe: "2026-11-05",
      citation:
        "il ne peut pas faire de gros travaux de transformation du local ou de ses équipements sans l'accord écrit du propriétaire",
    },
    {
      fait: "Exemple de transformation",
      valeur: "abattre une cloison",
      source: F1874,
      titreSource: T1874,
      releveLe: "2026-11-05",
      citation: "Les règles sont différentes selon qu'il s'agit de travaux de transformation (par exemple, abattre une cloison)",
    },
    {
      fait: "Sans accord : conservation sans indemnité",
      valeur: "le propriétaire conserve sans indemniser",
      source: F1874,
      titreSource: T1874,
      releveLe: "2026-11-05",
      citation: "Soit conserver les transformations faites, sans indemniser le locataire du coût des travaux faits",
    },
    {
      fait: "Sans accord : remise en état",
      valeur: "remise en état immédiate, aux frais du locataire",
      source: F1874,
      titreSource: T1874,
      releveLe: "2026-11-05",
      citation: "Soit exiger que le locataire remette, immédiatement et à ses frais, le logement dans l'état où il était avant les travaux.",
    },
    {
      fait: "Travaux qui mettent en péril les équipements ou la sécurité",
      valeur: "remise immédiate aux frais du locataire",
      source: F1874,
      titreSource: T1874,
      releveLe: "2026-11-05",
      citation:
        "Si les travaux de transformations mettent en péril le bon fonctionnement des équipements ou la sécurité du local, le propriétaire peut exiger la remise immédiate des lieux en l'état",
    },
    {
      fait: "Litige aménagement ou transformation : conciliation",
      valeur: "conciliation obligatoire avant le juge jusqu'à 5 000 €",
      source: F1874,
      titreSource: T1874,
      releveLe: "2026-11-05",
      citation:
        "Mais l'étape de conciliation est obligatoire, pour pouvoir ensuite saisir le juge, lorsque le litige est inférieur ou égal à 5 000 €",
    },
    {
      fait: "Reboucher les trous de pose",
      valeur: "reboucher les trous de tableaux et de miroirs",
      source: F31697,
      titreSource: T31697,
      releveLe: "2026-11-05",
      citation: "Reboucher les trous éventuellement faits par exemple à la suite de la pose de tableaux, de miroirs.",
    },
    {
      fait: "Petits raccords à la charge du locataire",
      valeur: "petits raccords de peintures et de tapisseries",
      source: F31697,
      titreSource: T31697,
      releveLe: "2026-11-05",
      citation: "Faire les petits raccords de peintures et de tapisseries",
    },
    {
      fait: "Les trous dans les murs comptent parmi les dégradations",
      valeur: "trous dans les murs cités comme usage anormal",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "des dégradations dues à un usage anormal du logement : moquette brûlée, trous dans les murs",
    },
    {
      fait: "Vétusté à la charge du bailleur",
      valeur: "l'usure naturelle relève du bailleur",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "Les réparations rendues nécessaires par la vétusté (c'est-à-dire l'usure naturelle) relèvent du bailleur.",
    },
    {
      fait: "Modifier l'état des lieux d'entrée",
      valeur: "10 jours calendaires",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F31270",
      titreSource: "Service-public.gouv.fr · État des lieux d'entrée dans un bail d'habitation",
      releveLe: "2026-11-05",
      citation:
        "Le locataire peut demander au propriétaire (ou à son représentant) de modifier l'état des lieux d'entrée dans les 10 jours calendaires",
    },
    {
      fait: "Clause travaux à l'entrée",
      valeur: "le locataire fait les travaux, aux frais du propriétaire",
      source: F31699,
      titreSource: T31699,
      releveLe: "2026-11-05",
      citation:
        "le locataire et le propriétaire peuvent convenir ensemble que le locataire se charge des travaux ou réparations nécessaires, aux frais du propriétaire",
    },
    {
      fait: "Contenu de la clause travaux",
      valeur: "montant déduit du loyer, durée, dédommagement en cas de départ anticipé",
      source: F31699,
      titreSource: T31699,
      releveLe: "2026-11-05",
      citation: "Manière dont le montant des travaux sera déduit du loyer",
    },
    {
      fait: "Clause travaux et décence",
      valeur: "pas de travaux liés à la décence dans cette clause",
      source: F31699,
      titreSource: T31699,
      releveLe: "2026-11-05",
      citation: "Les travaux ou réparations faites par le locataire dans le cadre de la clause travaux ne doivent pas être liés à la décence du logement",
    },
    {
      fait: "Travaux d'adaptation ou de rénovation énergétique : silence du propriétaire",
      valeur: "2 mois pour répondre, le silence vaut accord",
      source: F1874,
      titreSource: T1874,
      releveLe: "2026-11-05",
      citation: "Après avoir reçu la demande du locataire, le propriétaire a 2 mois pour répondre. L'absence de réponse dans ce délai vaut accord.",
    },
    {
      fait: "Travaux d'adaptation : pas de remise en état",
      valeur: "le propriétaire ne peut pas exiger la remise en état",
      source: F1874,
      titreSource: T1874,
      releveLe: "2026-11-05",
      citation:
        "Au départ du locataire (à la fin du bail), le propriétaire ne peut pas exiger que le locataire remette le logement dans l'état où il était avant ces travaux.",
    },
  ],
  corps: `
## Un locataire peut-il repeindre les murs sans demander ? {#repeindre}
Oui pour un rafraîchissement : le locataire a le droit d'aménager librement le logement, et service-public cite la peinture murale en exemple. Pour une couleur très marquée, mieux vaut demander d'abord, car l'exemple donné en cas de doute est justement la peinture criarde. Aucune règle ne dresse de liste des couleurs permises.

La demande tient en trois lignes, envoyées par message ou par courriel : « Je souhaite repeindre le séjour en vert foncé à partir du 15 mars. Pouvez-vous me confirmer votre accord par retour ? » Gardez la réponse jusqu'au départ. Elle évite une discussion au moment de rendre les clés, parfois plusieurs années plus tard, avec une agence qui n'a pas suivi l'échange.

## Peut-on percer les murs d'une location ? {#percer}
Oui pour fixer un tableau ou un miroir, à condition de reboucher ensuite : service-public range ce rebouchage dans les réparations locatives, à votre charge. L'ANIL cite en revanche les « trous dans les murs » parmi les dégradations d'un usage anormal. Ce qui reste visible à votre départ peut donc vous être réclamé.

Faites le rebouchage et les petits raccords de peinture avant l'état des lieux de sortie, et gardez une photo du mur terminé. Au-delà d'une simple fixation, dès que vous touchez à une cloison ou à un équipement, vous quittez l'aménagement : passez à la section suivante.

## Quels travaux demandent l'accord écrit du propriétaire ? {#accord}
Les gros travaux de transformation du local ou de ses équipements, comme abattre une cloison. Sans accord écrit, le propriétaire choisit à votre départ : conserver les transformations sans vous indemniser, ou exiger que vous remettiez le logement dans son état d'origine, immédiatement et à vos frais. L'accord doit donc précéder le chantier.

Le propriétaire n'a même pas à attendre votre départ si les travaux mettent en péril le bon fonctionnement des équipements ou la sécurité du local : il peut alors exiger la remise en état tout de suite.

Si vous n'êtes pas d'accord sur la nature des travaux, adressez-vous au conciliateur de justice, puis au juge. La conciliation est obligatoire avant le juge lorsque le litige est inférieur ou égal à 5 000 €.

## Que peut exiger le propriétaire à votre départ ? {#depart}
Tout se compare à l'[état des lieux d'entrée](/guides/etat-des-lieux), qui sert de point de départ. L'usure naturelle relève du bailleur ; les dégradations peuvent vous être réclamées, et une transformation faite sans accord peut être remise en état à vos frais. Une peinture simplement défraîchie par les années n'est donc pas une dégradation.

Le jour de l'entrée, décrivez chaque mur et photographiez ce qui est déjà marqué. Vous avez ensuite 10 jours calendaires pour demander une modification de l'état des lieux. Le [guide du dépôt de garantie](/guides/depot-de-garantie) détaille ce qui peut être retenu à la fin.

## Logement défraîchi à l'arrivée : peut-on repeindre aux frais du propriétaire ? {#clause-travaux}
Oui, si vous le convenez ensemble avant de signer. Lorsque le logement n'est pas en bon état d'usage à l'entrée, le bail peut contenir une clause travaux : vous réalisez la remise en état, aux frais du propriétaire, et le montant vient en déduction du loyer pendant une durée fixée.

La clause précise la nature des travaux, la manière dont leur montant est déduit du loyer, la durée de cette réduction, et votre dédommagement si vous partez plus tôt. Conservez vos factures : elles servent de preuve de vos dépenses.

Cette voie ne vaut pas pour tout. Les travaux liés à la décence du logement ne peuvent pas entrer dans cette clause : ils restent à la charge du propriétaire, comme l'explique notre article sur le [logement décent](/blog/logement-decent-criteres-visite).

## Et les travaux pour un handicap ou pour mieux isoler le logement ? {#adaptation}
Ils suivent une règle à part. Vous les demandez par lettre recommandée avec accusé de réception, à vos frais, pour une adaptation au handicap, à la perte d'autonomie ou une rénovation énergétique. Le propriétaire a 2 mois pour répondre, et son silence vaut accord. Il ne pourra pas exiger la remise en état à votre départ.

Le propriétaire peut toutefois proposer de faire les travaux lui-même, ou saisir le juge pour un motif sérieux et légitime. La lettre doit reprendre une mention précise, et décrire les travaux et l'entreprise choisie : service-public en donne le texte, avec un modèle pour les travaux d'adaptation.
`,
});
