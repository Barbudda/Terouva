// Vague 8, ligne 21. Requête relevée sur forum (CommentÇaMarche) : « appartement insalubre et/ou indécent ».
// Apport : la liste des critères de décence traduite en gestes de visite (eau, humidité, électricité, chauffage),
// la différence indécent / insalubre, et le chemin à suivre quand un défaut apparaît après la signature.

import { article } from "@/lib/blog-format";

const F2042 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F2042";
const T2042 = "Service-public.gouv.fr · Logement à louer décent";
const HI = "https://www.anil.org/habitat-indigne/";
const THI = "ANIL · L'habitat indigne";
const ANILPE = "https://anil.org/parole-expert-logement-location-etat-lieux-entree";
const TANILPE = "ANIL · Qu'est-ce que l'état des lieux d'entrée ?";
const F31270 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F31270";
const T31270 = "Service-public.gouv.fr · État des lieux d'entrée dans un bail d'habitation";

export default article({
  slug: "logement-decent-criteres-visite",
  titre: "Logement décent : ce qu'on vérifie pendant la visite",
  titreSeo: "Logement décent : que vérifier à la visite ?",
  description:
    "Cinq critères de décence, de l'humidité à l'électricité, la différence avec l'insalubre, et la marche à suivre si un défaut apparaît après la signature.",
  chapeau:
    "Un logement décent répond à cinq critères fixés par décret : surface et performance énergétique minimales, absence de risque pour la sécurité et la santé, absence de nuisibles, équipements de base. À la visite, regardez l'humidité, l'eau, l'électricité et le chauffage ; si un défaut apparaît ensuite, écrivez au propriétaire.",
  publieLe: "2026-11-04",
  pilier: "D",
  format: "cas-pratique",
  guidePilier: "/guides/repondre-a-une-annonce-de-location",
  guidesLies: ["/guides/etat-des-lieux", "/guides/dossier-de-location"],
  statut: "publie",
  requete: "appartement insalubre et/ou indécent",
  faits: [
    {
      fait: "Les critères de la décence",
      valeur: "cinq critères : surface, performance énergétique, sécurité et santé, absence de nuisibles, équipements",
      source: F2042,
      titreSource: T2042,
      releveLe: "2026-11-04",
      citation:
        "Un logement décent répond à 5 critères : surface et performance énergétique minimales, absence de risque pour la sécurité et la santé du locataire",
    },
    {
      fait: "Protection contre les infiltrations d'eau",
      valeur: "menuiseries et couverture protègent contre les infiltrations",
      source: F2042,
      titreSource: T2042,
      releveLe: "2026-11-04",
      citation:
        "Les menuiseries extérieures et la couverture avec ses raccords et accessoires assurent la protection contre les infiltrations d'eau dans l'habitation.",
    },
    {
      fait: "Aération et humidité",
      valeur: "renouvellement de l'air et évacuation de l'humidité adaptés à une occupation normale",
      source: F2042,
      titreSource: T2042,
      releveLe: "2026-11-04",
      citation:
        "permettent un renouvellement de l'air et une évacuation de l'humidité adaptés aux besoins d'une occupation normale du logement",
    },
    {
      fait: "Électricité et gaz",
      valeur: "réseaux conformes aux normes de sécurité et en bon état",
      source: F2042,
      titreSource: T2042,
      releveLe: "2026-11-04",
      citation:
        "Les réseaux et branchements d'électricité et de gaz sont conformes aux normes de sécurité et sont en bon état d'usage et de fonctionnement.",
    },
    {
      fait: "Équipements de base",
      valeur: "chauffage, eau potable, évacuation, cuisine, installation sanitaire, réseau électrique",
      source: F2042,
      titreSource: T2042,
      releveLe: "2026-11-04",
      citation: "Le logement doit comporter les éléments d'équipement et de confort suivants",
    },
    {
      fait: "Local en sous-sol",
      valeur: "ne peut pas être proposé à la location",
      source: F2042,
      titreSource: T2042,
      releveLe: "2026-11-04",
      citation: "Un local situé au sous-sol ne peut pas être proposé à la location",
    },
    {
      fait: "Performance énergétique, bail signé de 2025 à 2027",
      valeur: "classes A à F du DPE",
      source: F2042,
      titreSource: T2042,
      releveLe: "2026-11-04",
      citation:
        "Seul un logement appartenant aux classes A à F du diagnostic de performance énergétique (DPE) peut être loué avec un bail d'habitation.",
    },
    {
      fait: "Performance énergétique, bail signé de 2028 à 2033",
      valeur: "classes A à E du DPE",
      source: F2042,
      titreSource: T2042,
      releveLe: "2026-11-04",
      citation:
        "Seul un logement appartenant aux classes A à E du diagnostic de performance énergétique (DPE) pourra être loué avec un bail d'habitation.",
    },
    {
      fait: "Le décret qui définit la décence",
      valeur: "décret du 30 janvier 2002",
      source: HI,
      titreSource: THI,
      releveLe: "2026-11-04",
      citation: "Un logement est non décent lorsqu'il ne respecte pas les caractéristiques définies par le décret du 30 janvier 2002.",
    },
    {
      fait: "Conciliation gratuite avant le juge",
      valeur: "commission départementale de conciliation, démarche gratuite",
      source: F2042,
      titreSource: T2042,
      releveLe: "2026-11-04",
      citation: "d'engager préalablement une conciliation auprès de : La commission départementale de conciliation (démarche gratuite)",
    },
    {
      fait: "Arrêté d'insalubrité et décence",
      valeur: "un logement sous arrêté ne peut pas être considéré comme décent",
      source: F2042,
      titreSource: T2042,
      releveLe: "2026-11-04",
      citation:
        "Le logement qui fait l'objet d'un arrêté de mise en sécurité ou de traitement de l'insalubrité ne peut pas être considéré comme un logement décent.",
    },
    {
      fait: "Indécent n'est pas forcément indigne",
      valeur: "un logement indécent n'est pas forcément indigne",
      source: HI,
      titreSource: THI,
      releveLe: "2026-11-04",
      citation: "mais, à l'inverse, un logement indécent n'est pas forcément indigne.",
    },
    {
      fait: "Droits des occupants sous arrêté",
      valeur: "suspension du loyer, hébergement ou relogement",
      source: HI,
      titreSource: THI,
      releveLe: "2026-11-04",
      citation:
        "la suspension du loyer ; un hébergement pendant les travaux ou un relogement en cas d'interdiction définitive d'habiter",
    },
    {
      fait: "Signaler le défaut par écrit",
      valeur: "lettre recommandée avec avis de réception recommandée",
      source: F2042,
      titreSource: T2042,
      releveLe: "2026-11-04",
      citation:
        "Il est recommandé de le faire par écrit, et d'envoyer cette lettre par courrier recommandé avec avis de réception.",
    },
    {
      fait: "Le loyer reste dû",
      valeur: "ne pas cesser de payer tout ou partie du loyer",
      source: F2042,
      titreSource: T2042,
      releveLe: "2026-11-04",
      citation:
        "Le locataire ne doit en aucun cas cesser de payer tout ou partie de son loyer sous prétexte que le propriétaire ne respecte pas ses obligations.",
    },
    {
      fait: "Saisine du juge",
      valeur: "juge des contentieux de la protection après 2 mois sans réponse ou désaccord",
      source: F2042,
      titreSource: T2042,
      releveLe: "2026-11-04",
      citation:
        "si la mise en demeure est restée sans réponse ou si le désaccord persiste, le locataire (ou le propriétaire) peut saisir le juge des contentieux de la protection",
    },
    {
      fait: "Délai pour compléter l'état des lieux d'entrée",
      valeur: "10 jours calendaires",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-04",
      citation:
        "Le locataire peut demander au propriétaire (ou à son représentant) de modifier l'état des lieux d'entrée dans les 10 jours calendaires",
    },
    {
      fait: "Éléments de chauffage",
      valeur: "l'état des lieux peut être complété pendant le premier mois de chauffe",
      source: ANILPE,
      titreSource: TANILPE,
      releveLe: "2026-11-04",
      citation: "Concernant les éléments de chauffage, l'état des lieux peut être complété pendant le premier mois de chauffe.",
    },
  ],
  corps: `
## Quels critères un logement doit-il remplir pour être décent ? {#criteres}
Cinq, selon Service-public : une surface et une performance énergétique minimales, l'absence de risque pour la sécurité et la santé du locataire, l'absence d'animaux nuisibles et de parasites, et la présence d'équipements de base. La surface est traitée dans l'article sur la [surface minimum d'un logement en location](/blog/surface-minimum-location) ; le reste se vérifie à la visite.

Selon l'ANIL, un logement est non décent quand il ne respecte pas les caractéristiques définies par le décret du 30 janvier 2002. Un local situé au sous-sol, par exemple, ne peut pas être proposé à la location. Le [guide pour répondre à une annonce](/guides/repondre-a-une-annonce-de-location) vous aide à préparer la visite.

## Quoi regarder pendant la visite, pièce par pièce ? {#visite}
Quatre choses se voient en dix minutes : l'humidité, l'eau, l'électricité, le chauffage. Cherchez des taches ou des moisissures aux angles du plafond, vérifiez que les fenêtres ferment et que la ventilation fonctionne, ouvrez les robinets, actionnez les interrupteurs, repérez la source de chauffage et regardez où l'eau chaude est produite.

Exemple : lors d'une visite en novembre, une tache grise marque l'angle d'une salle de bains sans fenêtre. Service-public demande une aération qui permette d'évacuer l'humidité pour une occupation normale. Photographiez la tache, demandez si une ventilation existe, et faites noter l'état à l'état des lieux d'entrée.

## Quelle différence entre un logement indécent et un logement insalubre ? {#insalubre}
Un logement indécent ne respecte pas les critères du décret de 2002 ; un logement insalubre peut être frappé d'un arrêté de traitement de l'insalubrité. Un logement sous arrêté ne peut pas être considéré comme décent, mais l'inverse n'est pas vrai : l'ANIL précise qu'un logement indécent n'est pas forcément indigne.

Les conséquences diffèrent. Pour un logement indécent, vous écrivez au propriétaire et suivez la procédure ci-dessous. Si le logement est frappé d'un arrêté, l'ANIL indique que les occupants peuvent obtenir la suspension du loyer, un hébergement pendant les travaux ou un relogement en cas d'interdiction définitive d'habiter.

## Quel est le critère énergétique d'un logement loué en ce moment ? {#dpe}
Pour un bail signé, renouvelé ou reconduit entre 2025 et 2027, Service-public indique que seul un logement des classes A à F du diagnostic de performance énergétique peut être loué. Un logement classé G ne peut donc plus être loué avec un bail d'habitation signé dans cette période.

Le seuil se durcit ensuite : classes A à E pour un bail signé, renouvelé ou reconduit entre 2028 et 2033. La classe figure dans l'annonce et dans le bail ; vérifiez-la avant la visite. Un logement qui ne respecte pas ce critère n'est pas décent, au sens du décret.

## Que faire si un défaut apparaît après la signature ? {#apres-signature}
Qu'on parle de logement non décent ou de « vice caché », la marche est la même : signalez le défaut au propriétaire par écrit, de préférence par courrier recommandé avec avis de réception, et continuez à payer votre loyer.

Si la mise en demeure reste sans réponse ou si le désaccord persiste, le locataire peut saisir le juge des contentieux de la protection. Une conciliation gratuite est possible avant, auprès de la commission départementale de conciliation. Et si le défaut était déjà là à votre arrivée, demandez dans les 10 jours calendaires de compléter l'état des lieux d'entrée ; pour le chauffage, l'ANIL accorde le premier mois de chauffe.
`,
});
