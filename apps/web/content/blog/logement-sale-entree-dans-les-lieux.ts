// Vague 8, ligne 20. Requête relevée sur forum (CommentÇaMarche) : « appartement sale à l'entrée en lieux ».
// Apport : aucune fiche officielle lue ne parle de ménage ; tout se joue sur la preuve de l'état d'entrée
// (réserves précises, photos, 10 jours pour compléter) et sur la comparaison entrée/sortie.

import { article } from "@/lib/blog-format";

const F31270 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F31270";
const T31270 = "Service-public.gouv.fr · État des lieux d'entrée dans un bail d'habitation";
const F33671 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F33671";
const T33671 = "Service-public.gouv.fr · État des lieux de sortie dans un bail d'habitation";
const ANILPE = "https://anil.org/parole-expert-logement-location-etat-lieux-entree";
const TANILPE = "ANIL · Qu'est-ce que l'état des lieux d'entrée ?";
const F2042 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F2042";
const T2042 = "Service-public.gouv.fr · Logement à louer décent";

export default article({
  slug: "logement-sale-entree-dans-les-lieux",
  titre: "Logement sale à l'entrée : qui fait le ménage ?",
  titreSeo: "Logement sale à l'entrée : qui fait le ménage ?",
  description:
    "Aucun texte officiel lu ne règle le ménage d'entrée : tout se joue sur l'état des lieux. Que noter, quel délai pour le compléter, et la suite à la sortie.",
  chapeau:
    "Aucune règle ne nomme le ménage : le propriétaire doit remettre un logement en bon état d'usage, et tout se joue sur la preuve. Notez chaque saleté à l'état des lieux, avec photos, et demandez les corrections dans les 10 jours calendaires. Ce qui est consigné à l'entrée sert de point de comparaison à la sortie.",
  publieLe: "2026-11-04",
  pilier: "D",
  format: "question",
  guidePilier: "/guides/etat-des-lieux",
  guidesLies: ["/guides/depot-de-garantie", "/guides/repondre-a-une-annonce-de-location"],
  statut: "publie",
  requete: "appartement sale à l'entrée en lieux",
  faits: [
    {
      fait: "Conditions de l'état des lieux d'entrée",
      valeur: "bonnes conditions d'éclairage",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-04",
      citation: "L'état des lieux doit être fait dans de bonnes conditions d'éclairage.",
    },
    {
      fait: "Observations, réserves et images",
      valeur: "description précise de chaque pièce, complétée d'observations ou de réserves, illustrée d'images",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-04",
      citation: "Elle peut être complétée d'observations ou de réserves, et illustrée d'images.",
    },
    {
      fait: "Photos et croquis recommandés",
      valeur: "preuves visuelles recommandées pour un document aussi détaillé que possible",
      source: ANILPE,
      titreSource: TANILPE,
      releveLe: "2026-11-04",
      citation:
        "Il est recommandé de compléter l'état des lieux avec des preuves visuelles, comme des photos ou des croquis, afin de fournir un document aussi détaillé que possible.",
    },
    {
      fait: "Délai pour faire modifier l'état des lieux d'entrée",
      valeur: "10 jours calendaires",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-04",
      citation:
        "Le locataire peut demander au propriétaire (ou à son représentant) de modifier l'état des lieux d'entrée dans les 10 jours calendaires",
    },
    {
      fait: "Le document sert à comparer l'entrée et la sortie",
      valeur: "comparaison de l'état constaté à l'entrée et à la sortie",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-04",
      citation:
        "Ce document doit permettre la comparaison de l'état du logement constaté à l'entrée et à la sortie des lieux.",
    },
    {
      fait: "Sans état des lieux d'entrée",
      valeur: "le logement est considéré comme remis en bon état",
      source: ANILPE,
      titreSource: TANILPE,
      releveLe: "2026-11-04",
      citation: "le logement sera considéré comme ayant été remis au locataire en bon état",
    },
    {
      fait: "Propriétaire qui refuse l'état des lieux malgré une mise en demeure",
      valeur: "il doit prouver en fin de bail avoir donné le logement en bon état d'usage",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-04",
      citation:
        "il devra prouver en fin de bail avoir donné le logement en bon état d'usage pour faire valoir les dégradations causées par le locataire",
    },
    {
      fait: "Vétusté et dépôt de garantie",
      valeur: "les différences dues à la vétusté ne peuvent pas entraîner de retenue",
      source: F33671,
      titreSource: T33671,
      releveLe: "2026-11-04",
      citation: "du logement ou des équipements ne peuvent pas entraîner de retenue sur le dépôt de garantie",
    },
    {
      fait: "Locataire qui refuse l'état des lieux",
      valeur: "il est considéré comme ayant reçu le logement en bon état de réparations locatives",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-04",
      citation: "Le locataire est considéré comme ayant reçu le logement en bon état de réparations locatives",
    },
    {
      fait: "Éléments de chauffage",
      valeur: "l'état des lieux peut être complété pendant le premier mois de chauffe",
      source: ANILPE,
      titreSource: TANILPE,
      releveLe: "2026-11-04",
      citation: "Concernant les éléments de chauffage, l'état des lieux peut être complété pendant le premier mois de chauffe.",
    },
    {
      fait: "Un logement infesté n'est pas décent",
      valeur: "animaux nuisibles ou parasites : le logement n'est pas décent",
      source: F2042,
      titreSource: T2042,
      releveLe: "2026-11-04",
      citation:
        "Un logement décent est un logement qui n'est pas infesté par des animaux nuisibles (par exemple : rats) ou par des parasites",
    },
  ],
  corps: `
## Le propriétaire doit-il remettre un logement propre ? {#propre}
Aucune règle ne nomme le ménage : ce qui compte est le logement remis en bon état d'usage, que le propriétaire doit pouvoir prouver s'il invoque des dégradations en fin de bail. Ce qui se règle, c'est donc la preuve. Tout ce qui est sale ou abîmé à votre arrivée doit figurer à l'[état des lieux d'entrée](/guides/etat-des-lieux).

Un logement légèrement poussiéreux et un logement où vous ne pouvez pas poser vos affaires ne se traitent pas de la même façon. Dans le premier cas, une mention précise suffit. Dans le second, demandez au propriétaire de faire nettoyer avant l'état des lieux, ou signez avec une réserve détaillée. Ne refusez pas l'état des lieux lui-même : un locataire qui refuse est considéré comme ayant reçu le logement en bon état de réparations locatives.

## Que noter à l'état des lieux quand le logement est sale ? {#noter}
Décrivez chaque saleté pièce par pièce, avec des mots précis : « four encrassé », « joints de douche noircis », « traces de graisse sur la hotte ». Service-public demande une description précise du sol, des murs, des plafonds et des équipements, qui peut être complétée d'observations ou de réserves et illustrée d'images.

Faites l'état des lieux de jour, ou avec un bon éclairage : la fiche officielle l'exige. L'ANIL recommande aussi de compléter le document avec des photos ou des croquis. Une photo datée de la hotte vaut mieux qu'un adjectif, et les deux parties doivent signer le document final.

## Peut-on compléter l'état des lieux après être entré ? {#dix-jours}
Oui, pendant 10 jours calendaires. Le locataire peut demander au propriétaire, ou à son représentant, de modifier l'état des lieux d'entrée dans ce délai, pour tout élément concernant le logement. Envoyez la demande par écrit, avec vos photos, et gardez la preuve de l'envoi. Pour les éléments de chauffage, l'ANIL indique que le premier mois de chauffe compte aussi.

Si le propriétaire refuse de modifier l'état des lieux, le [guide de l'état des lieux](/guides/etat-des-lieux) rappelle que la commission départementale de conciliation peut être saisie, gratuitement. Ne laissez pas passer le délai en vous disant que vous nettoierez vous-même : une saleté non notée devient votre état d'arrivée.

## La saleté trouvée à l'entrée peut-elle vous être reprochée à la sortie ? {#sortie}
Ce qui est noté sale à l'entrée ne peut pas être présenté comme votre dégradation à la sortie : l'état des lieux sert à comparer l'état constaté à l'entrée et à la sortie. À l'inverse, sans état des lieux d'entrée, l'ANIL précise que le logement est considéré comme remis en bon état. D'où l'intérêt de tout consigner.

Les différences dues à la vétusté, c'est-à-dire à l'usure normale, ne peuvent pas non plus entraîner de retenue sur le dépôt de garantie. Pour savoir ce que vous devrez remettre en état, relisez votre état des lieux d'entrée le jour de l'état des lieux de sortie, pièce par pièce.

## Quand la saleté devient-elle un problème de décence ? {#decence}
Quand elle cache une infestation. Un logement décent n'est pas infesté par des animaux nuisibles, comme des rats, ni par des parasites, comme des puces de lit ou des cafards, d'après Service-public. Ce n'est plus une affaire de ménage mais d'obligation du propriétaire.

Notez la présence de cafards ou de traces de rongeurs à l'état des lieux, photographiez, puis écrivez au propriétaire. Les critères de décence et la marche à suivre sont dans l'article sur les [critères d'un logement décent à vérifier pendant la visite](/blog/logement-decent-criteres-visite).
`,
});
