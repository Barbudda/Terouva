// Vague 9, ligne 19. Requête relevée à l'autocomplétion et sur forum : « punaise de lit location qui paie ».
// Apport : la réponse de l'ANIL (les fils de forum se contredisent), vue depuis l'arrivée dans le logement : ce qu'il
// faut dater dès le premier jour pour contrer l'exception, et le loyer qui reste dû pendant ce temps.

import { article } from "@/lib/blog-format";

const ANIL = "https://www.anil.org/parole-expert-logement-habiter-vie-pratique-punaise/";
const TANIL = "ANIL · Votre logement est infesté de punaises. Comment les reconnaître et les traiter ?";
const F2042 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F2042";
const T2042 = "Service-public.gouv.fr · Logement à louer décent";
const F31699 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F31699";
const T31699 = "Service-public.gouv.fr · Bail d'habitation : travaux à la charge du propriétaire (bailleur)";

export default article({
  slug: "punaises-de-lit-location",
  titre: "Punaises de lit à l'arrivée dans une location : qui paie ?",
  titreSeo: "Punaises de lit en location : qui paie ?",
  description:
    "Le propriétaire paie la détection et la désinfestation, sauf s'il prouve que vous les avez apportées. Ce qu'il faut écrire et dater dès l'arrivée.",
  chapeau:
    "Un logement infesté de punaises n'est pas décent : le propriétaire paie la détection et la désinfestation, sauf s'il prouve que vous les avez apportées. À votre arrivée, prévenez-le par écrit sans attendre et gardez des preuves datées. Le loyer reste dû pendant ce temps. Sans réponse après deux mois, la commission de conciliation et le juge restent possibles.",
  publieLe: "2026-11-06",
  pilier: "D",
  format: "cas-pratique",
  guidePilier: "/guides/etat-des-lieux",
  guidesLies: [],
  statut: "publie",
  requete: "punaise de lit location qui paie",
  faits: [
    {
      fait: "Date de mise à jour de la page de l'ANIL",
      valeur: "à jour au 15 mars 2022",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "À jour au 15 mars 2022",
    },
    {
      fait: "Un logement infesté n'est pas décent",
      valeur: "le logement ne pourra pas être considéré comme décent",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "votre logement est infesté de punaises, votre logement ne pourra pas être considéré comme décent",
    },
    {
      fait: "Le propriétaire paie",
      valeur: "frais de détection et de désinfestation à la charge du propriétaire",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation:
        "le propriétaire, qui doit remettre au locataire un logement décent, devra payer les frais de détection et de désinfestation des punaises de lit",
    },
    {
      fait: "L'exception",
      valeur: "le propriétaire ne paie pas s'il prouve que les punaises sont dues au locataire",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation:
        "Le propriétaire pourra ne pas prendre en charge les frais s'il prouve que la présence des punaises du lit est due à son locataire.",
    },
    {
      fait: "Critère de décence",
      valeur: "un logement décent n'est pas infesté de parasites",
      source: F2042,
      titreSource: T2042,
      releveLe: "2026-11-05",
      citation: "Un logement décent est un logement qui n'est pas infesté par des animaux nuisibles (par exemple : rats) ou par des parasites",
    },
    {
      fait: "À quels logements s'applique la décence",
      valeur: "résidence principale du locataire, ou bail mobilité",
      source: F2042,
      titreSource: T2042,
      releveLe: "2026-11-05",
      citation: "du locataire, ou loué avec un bail mobilité, doit être décent",
    },
    {
      fait: "Mêmes critères en vide et en meublé",
      valeur: "critères de décence communs au vide et au meublé",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1165",
      titreSource: "Service-public.gouv.fr · Bail d'habitation : quelles différences entre logement vide et logement meublé ?",
      releveLe: "2026-11-05",
      citation: "De nombreuses règles sont communes au logement vide et au logement meublé",
    },
    {
      fait: "Prévenir le propriétaire",
      valeur: "le locataire informe directement son propriétaire",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "Si vous êtes locataire, vous devez informer directement votre propriétaire.",
    },
    {
      fait: "Pas de lien avec l'hygiène",
      valeur: "pas de lien avec un manque d'hygiène",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "la présence de punaises n'a pas de lien avec un manque d'hygiène",
    },
    {
      fait: "D'où elles viennent",
      valeur: "vêtements d'occasion, meubles récupérés, chambres d'hôtels",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "vêtements achetés d'occasion, meubles récupérés dans la rue, chambres d'hôtels",
    },
    {
      fait: "Premiers gestes",
      valeur: "laver à plus de 60°C, nettoyer à la vapeur à 120°C",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "laver les vêtements en machine à plus de 60°C",
    },
    {
      fait: "Produits chimiques",
      valeur: "pas sans recourir à des professionnels",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "les produits chimiques et les fumigènes anti-insectes ne doivent pas être utilisés sans recourir à des professionnels",
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
      fait: "Le loyer reste dû",
      valeur: "le locataire continue à payer le loyer",
      source: F31699,
      titreSource: T31699,
      releveLe: "2026-11-05",
      citation: "Même si le propriétaire ne fait pas les travaux qu'il doit faire, le locataire doit continuer à payer le loyer.",
    },
    {
      fait: "Pouvoir du juge sur le loyer",
      valeur: "le juge peut réduire le loyer ou suspendre son paiement",
      source: F2042,
      titreSource: T2042,
      releveLe: "2026-11-05",
      citation: "Il peut réduire le montant du loyer ou suspendre, avec ou sans consignation",
    },
    {
      fait: "Mise en demeure",
      valeur: "lettre recommandée avec accusé de réception",
      source: F2042,
      titreSource: T2042,
      releveLe: "2026-11-05",
      citation:
        "Le locataire doit mettre en demeure le propriétaire de réaliser les travaux de mise en conformité, par lettre recommandée avec accusé de réception.",
    },
    {
      fait: "Délai de deux mois et conciliation",
      valeur: "deux mois, puis commission départementale de conciliation",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation:
        "En l'absence de réponse du propriétaire dans un délai de deux mois, il peut saisir la Commission départementale de conciliation afin qu'elle rende un avis.",
    },
    {
      fait: "Signal Logement",
      valeur: "accompagnement par les services de l'État selon le département",
      source: F2042,
      titreSource: T2042,
      releveLe: "2026-11-05",
      citation: "afin d'obtenir un accompagnement des services de l'État dans sa démarche auprès du propriétaire",
    },
    {
      fait: "Allocation de logement",
      valeur: "allocation conservée par la CAF en cas de non-décence constatée",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "L'allocation de logement pourra également être conservée par la CAF en cas de constat de non-décence.",
    },
  ],
  corps: `
## Qui paie la désinfestation quand un logement a des punaises de lit ? {#qui-paie}
En principe, le propriétaire. Selon l'ANIL, dans sa page à jour au 15 mars 2022, un logement infesté de punaises ne peut pas être considéré comme décent, et le propriétaire doit payer les frais de détection et de désinfestation. Il échappe à ces frais seulement s'il prouve que leur présence est due à son locataire.

Cette règle vaut pour le logement loué comme résidence principale, vide ou meublé, et pour le bail mobilité : service-public y range l'absence de parasites parmi les critères de décence. Une location de vacances n'entre pas dans ce cadre. Sur les forums, les réponses partent dans tous les sens : fiez-vous à l'ANIL ou à l'ADIL de votre département, qui répond gratuitement.

## Que faire le jour où vous les découvrez à l'arrivée ? {#arrivee}
Prévenez le propriétaire ou l'agence par écrit, le jour même, avec des photos datées. Plus votre message est proche de la remise des clés, plus il sera difficile de prétendre que vous les avez apportées. N'installez pas vos affaires dans la pièce touchée, et demandez une réponse écrite avec une date d'intervention.

1. Photographiez les insectes, leurs traces sur le matelas ou le sommier, et les piqûres s'il y en a.
2. Faites-les noter à l'[état des lieux d'entrée](/guides/etat-des-lieux) si vous êtes encore à ce stade. Sinon, demandez une modification dans les 10 jours calendaires qui suivent.
3. Écrivez au propriétaire : « Le [date], j'ai constaté des punaises de lit dans [pièce]. Merci de m'indiquer la date de détection et de traitement. » Gardez la preuve de l'envoi.
4. Lavez ce qui peut l'être en machine à plus de 60°C. N'utilisez ni produit chimique ni fumigène sans passer par un professionnel : l'ANIL le déconseille.

## Et si le propriétaire dit que vous les avez apportées ? {#exception}
C'est à lui de le prouver, pas à vous de prouver le contraire. L'ANIL précise qu'il ne peut éviter les frais que s'il établit que la présence des punaises est due au locataire. Votre message du premier jour et vos photos datées sont vos meilleurs arguments si vous venez juste d'emménager.

Ne vous laissez pas non plus renvoyer à une question de propreté : l'ANIL rappelle que la présence de punaises n'a pas de lien avec un manque d'hygiène. Elles arrivent surtout avec des vêtements achetés d'occasion, des meubles récupérés dans la rue ou un séjour à l'hôtel. Pendant les premières semaines, évitez donc d'en faire entrer, pour que votre dossier reste net.

Après plusieurs mois de présence, cette preuve par la date perd de sa force. L'ADIL pourra vous dire où vous en êtes.

## Peut-on arrêter de payer le loyer en attendant le traitement ? {#loyer}
Non. Même si le propriétaire ne fait pas les travaux qu'il doit faire, le locataire doit continuer à payer le loyer. Le retenir de vous-même vous met en situation d'impayé. Seul le juge peut, s'il constate que le logement n'est pas décent, réduire le loyer ou en suspendre le paiement.

Si vous touchez une allocation de logement, l'ANIL indique que la CAF peut la conserver en cas de constat de non-décence : renseignez-vous auprès d'elle si c'est votre cas.

## Que faire si le propriétaire ne répond pas ? {#sans-reponse}
Envoyez une mise en demeure par lettre recommandée avec accusé de réception, en demandant la mise en conformité du logement. Si elle reste sans réponse deux mois, vous pouvez saisir la commission départementale de conciliation, pour obtenir un avis, ou le juge, qui peut fixer les travaux à réaliser et leur délai.

Selon le département, le service en ligne Signal Logement permet aussi d'obtenir un accompagnement des services de l'État dans votre démarche. Notre article sur le [logement décent](/blog/logement-decent-criteres-visite) détaille les autres critères à vérifier, et celui sur un [logement sale à l'entrée](/blog/logement-sale-entree-dans-les-lieux) ce qui relève de l'état des lieux.
`,
});
