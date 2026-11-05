// Vague 9, ligne 18. Requête relevée à l'autocomplétion : « chaudière locataire ou propriétaire ».
// Apport : la question vue depuis l'entrée dans les lieux : l'attestation à demander avant d'emménager, la frontière
// entre petite pièce et panne, le délai du premier mois de chauffe, et le loyer qui reste dû pendant la réparation.

import { article } from "@/lib/blog-format";

const F20760 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F20760";
const T20760 = "Service-public.gouv.fr · Entretien annuel de la chaudière : quelles règles pour le locataire ?";
const F31697 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F31697";
const T31697 = "Service-public.gouv.fr · Entretien courant et réparations locatives à la charge du locataire";
const F31699 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F31699";
const T31699 = "Service-public.gouv.fr · Bail d'habitation : travaux à la charge du propriétaire (bailleur)";
const F31270 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F31270";
const T31270 = "Service-public.gouv.fr · État des lieux d'entrée dans un bail d'habitation";
const F2042 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F2042";
const T2042 = "Service-public.gouv.fr · Logement à louer décent";
const ANIL = "https://www.anil.org/parole-expert-logement-locataire-qui-paie-les-reparations/";
const TANIL = "ANIL · Locataire ou propriétaire : qui paie les réparations dans une location ?";

export default article({
  slug: "chaudiere-locataire-ou-proprietaire",
  titre: "Chaudière en location : qui paie l'entretien, qui paie la panne ?",
  titreSeo: "Chaudière : locataire ou propriétaire ?",
  description:
    "L'entretien annuel vous revient, la panne due à l'âge de l'appareil revient au propriétaire. Ce qu'il faut demander et noter dès l'entrée.",
  chapeau:
    "L'entretien annuel d'une chaudière individuelle revient au locataire, sauf si le bail prévoit le contraire. Une panne due à l'usure revient au propriétaire. Dès l'entrée, demandez la dernière attestation d'entretien et notez l'état de l'appareil : vous pouvez signaler un défaut de chauffage jusqu'à la fin du premier mois de la période de chauffe.",
  publieLe: "2026-11-06",
  pilier: "D",
  format: "question",
  guidePilier: "/guides/etat-des-lieux",
  guidesLies: ["/guides/depot-de-garantie"],
  statut: "publie",
  requete: "chaudière locataire ou propriétaire",
  faits: [
    {
      fait: "Le locataire fait faire l'entretien annuel",
      valeur: "entretien annuel à la charge du locataire, sauf clause contraire",
      source: F20760,
      titreSource: T20760,
      releveLe: "2026-11-05",
      citation: "En tant que locataire, vous devez faire réaliser un entretien annuel de la chaudière.",
    },
    {
      fait: "Un chauffagiste qualifié de son choix",
      valeur: "chauffagiste qualifié, ou celui du bailleur si le bail le prévoit",
      source: F20760,
      titreSource: T20760,
      releveLe: "2026-11-05",
      citation: "Le bail peut toutefois prévoir que c'est le bailleur qui doit faire appel à un chauffagiste qualifié de son choix.",
    },
    {
      fait: "Chaudière collective",
      valeur: "propriétaire de l'immeuble ou syndicat des copropriétaires",
      source: F20760,
      titreSource: T20760,
      releveLe: "2026-11-05",
      citation:
        "Pour les chaudières collectives, c'est le propriétaire de l'immeuble ou le syndicat des copropriétaires qui doit faire appel à un chauffagiste qualifié.",
    },
    {
      fait: "Appareils concernés",
      valeur: "fioul, gaz, bois, charbon, multicombustible, pompes à chaleur",
      source: F20760,
      titreSource: T20760,
      releveLe: "2026-11-05",
      citation: "Cette obligation concerne aussi les pompes à chaleur et appareils de chauffage avec ventilation.",
    },
    {
      fait: "Rythme de l'entretien",
      valeur: "chaque année civile",
      source: F20760,
      titreSource: T20760,
      releveLe: "2026-11-05",
      citation: "Si le dernier entretien a eu lieu en mai 2025, le prochain entretien devra avoir lieu avant la fin de l'année 2026.",
    },
    {
      fait: "Attestation d'entretien",
      valeur: "remise dans les 15 jours, conservée au moins 2 ans",
      source: F20760,
      titreSource: T20760,
      releveLe: "2026-11-05",
      citation: "Le chauffagiste doit vous remettre une attestation d'entretien dans un délai de 15 jours suivant sa visite.",
    },
    {
      fait: "Durée de conservation",
      valeur: "2 ans minimum",
      source: F20760,
      titreSource: T20760,
      releveLe: "2026-11-05",
      citation: "Il doit être conservé pendant une durée minimale de 2 ans.",
    },
    {
      fait: "Le bailleur peut demander l'attestation",
      valeur: "attestation demandée à tout moment par le bailleur",
      source: "https://www.anil.org/parole-expert-logement-location-regles-temperature-chauffage/",
      titreSource: "ANIL · Chauffage : que savoir sur la température minimum d'un logement ?",
      releveLe: "2026-11-05",
      citation: "Vous pouvez demander cette attestation à tout moment.",
    },
    {
      fait: "Pas d'amende, mais une retenue possible",
      valeur: "montant de l'entretien retenu sur le dépôt de garantie",
      source: F20760,
      titreSource: T20760,
      releveLe: "2026-11-05",
      citation: "si vous ne présentez pas une attestation d'entretien, votre bailleur peut retenir le montant de l'entretien sur le dépôt de garantie",
    },
    {
      fait: "Pas de sanction réglementaire",
      valeur: "aucune amende",
      source: F20760,
      titreSource: T20760,
      releveLe: "2026-11-05",
      citation: "La réglementation ne prévoit pas de sanction en l'absence d'entretien annuel de la chaudière.",
    },
    {
      fait: "Risque d'assurance",
      valeur: "l'assureur peut refuser d'indemniser",
      source: F20760,
      titreSource: T20760,
      releveLe: "2026-11-05",
      citation: "En cas d'accident avec une chaudière mal entretenue, l'assureur peut également refuser de vous indemniser",
    },
    {
      fait: "Petites pièces à la charge du locataire",
      valeur: "joints, clapets, allumage piézo-électrique",
      source: F31697,
      titreSource: T31697,
      releveLe: "2026-11-05",
      citation: "Remplacer les bilames, pistons, membranes, boîtes à eau, allumage piézo-électrique, clapets et joints des appareils à gaz",
    },
    {
      fait: "Ramonage à la charge du locataire",
      valeur: "ramonage des conduits",
      source: F31697,
      titreSource: T31697,
      releveLe: "2026-11-05",
      citation: "Il doit faire ramoner les conduits de ventilation et d'évacuation des fumées et des gaz",
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
      fait: "Le propriétaire doit tous les travaux hors réparations locatives",
      valeur: "tous les travaux qui ne sont pas des réparations locatives",
      source: F31699,
      titreSource: T31699,
      releveLe: "2026-11-05",
      citation: "Durant toute la durée du bail, le propriétaire doit faire tous les travaux qui ne sont pas à la charge du locataire",
    },
    {
      fait: "Exception : faute du locataire",
      valeur: "l'obligation ne s'applique pas en cas de faute du locataire",
      source: F31699,
      titreSource: T31699,
      releveLe: "2026-11-05",
      citation: "Cette obligation ne s'applique pas lorsque les travaux sont rendus nécessaires par la faute du locataire.",
    },
    {
      fait: "Équipements en état à l'entrée",
      valeur: "chauffage et eau chaude en bon état d'usage et de fonctionnement",
      source: F2042,
      titreSource: T2042,
      releveLe: "2026-11-05",
      citation:
        "Les équipements de chauffage et de production d'eau chaude sont conformes aux normes de sécurité et sont en bon état d'usage et de fonctionnement.",
    },
    {
      fait: "Délai pour le chauffage à l'état des lieux",
      valeur: "premier mois de la période de chauffe",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "Il peut également en faire la demande durant 1 er mois de la période de chauffe",
    },
    {
      fait: "Délai général à l'état des lieux",
      valeur: "10 jours calendaires",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation:
        "Le locataire peut demander au propriétaire (ou à son représentant) de modifier l'état des lieux d'entrée dans les 10 jours calendaires",
    },
    {
      fait: "Relevés d'index à l'état des lieux",
      valeur: "relevés des index pour chaque énergie",
      source: F31270,
      titreSource: T31270,
      releveLe: "2026-11-05",
      citation: "complète l'état des lieux d'entrée (et de l'état des lieux de sortie lors du départ du locataire) par les relevés des index pour chaque énergie",
    },
    {
      fait: "Le loyer reste dû",
      valeur: "le locataire continue à payer",
      source: F31699,
      titreSource: T31699,
      releveLe: "2026-11-05",
      citation: "Même si le propriétaire ne fait pas les travaux qu'il doit faire, le locataire doit continuer à payer le loyer.",
    },
    {
      fait: "Mise en demeure puis conciliation",
      valeur: "lettre recommandée, 2 mois, puis commission de conciliation ou conciliateur",
      source: F31699,
      titreSource: T31699,
      releveLe: "2026-11-05",
      citation: "Si, malgré cet avertissement, le propriétaire ne fait pas le nécessaire, le locataire doit le mettre en demeure d'exécuter ses obligations.",
    },
    {
      fait: "Pouvoir du juge sur le loyer (logement non décent)",
      valeur: "le juge peut réduire le loyer ou suspendre son paiement",
      source: F2042,
      titreSource: T2042,
      releveLe: "2026-11-05",
      citation: "Il peut réduire le montant du loyer ou suspendre, avec ou sans consignation",
    },
    {
      fait: "En cas de soupçon d'intoxication",
      valeur: "aérer, arrêter les appareils, appeler les secours",
      source: F20760,
      titreSource: T20760,
      releveLe: "2026-11-05",
      citation: "En cas de soupçon d'intoxication, vous devez aérer votre logement, arrêter les appareils à combustion et appeler les secours.",
    },
  ],
  corps: `
## Qui paie l'entretien annuel de la chaudière ? {#entretien}
Vous, si la chaudière est individuelle : le locataire fait faire l'entretien annuel par un chauffagiste qualifié de son choix, sauf si le bail prévoit le contraire. Pour une chaudière collective, c'est le propriétaire de l'immeuble ou le syndicat des copropriétaires qui s'en occupe. Lisez donc le bail avant d'appeler un professionnel.

L'entretien revient chaque année civile, et il vaut aussi pour les pompes à chaleur et les appareils de chauffage avec ventilation. Le chauffagiste vous remet une attestation dans les 15 jours suivant sa visite : gardez-la au moins 2 ans. Le ramonage des conduits est lui aussi à votre charge.

Aucune amende n'est prévue si vous n'entretenez pas la chaudière. Mais sans attestation, le bailleur peut retenir le montant de l'entretien sur le [dépôt de garantie](/guides/depot-de-garantie), et l'assureur peut refuser de vous indemniser après un accident.

## Qui paie quand la chaudière tombe en panne ? {#panne}
Le propriétaire, sauf s'il s'agit d'une petite réparation ou d'une panne causée par votre faute. Il doit tous les travaux qui ne sont pas des réparations locatives, et l'usure naturelle relève de lui. La réparation d'une pièce usée par les années, ou le remplacement d'un appareil trop ancien, lui revient donc.

Restent à votre charge les petites pièces listées par service-public pour les appareils à gaz : joints, clapets, membranes, allumage piézo-électrique. Quand le chauffagiste intervient, demandez-lui d'écrire la cause de la panne sur sa facture : c'est ce papier qui dira qui paie.

L'attestation d'entretien prend ici toute son utilité. Elle montre que vous avez fait votre part, alors que le propriétaire n'a pas à payer des travaux rendus nécessaires par la faute du locataire.

## Que demander sur la chaudière avant d'emménager ? {#avant}
La dernière attestation d'entretien. Aucune règle ne nomme sa remise au nouveau locataire, mais la demande est simple et sa réponse vous renseigne : elle indique quand l'appareil a été vu et quand le prochain entretien tombe. Si le dernier date de mai 2025, le suivant doit avoir lieu avant la fin de 2026.

Si on ne peut rien vous montrer, écrivez-le au propriétaire le jour de l'entrée, et faites passer un chauffagiste tôt dans la saison. Vous aurez ainsi une trace de l'état de l'appareil à votre arrivée.

À l'[état des lieux](/guides/etat-des-lieux), décrivez la chaudière, sa marque et son état visible, et faites noter les relevés des index pour chaque énergie. Service-public les prévoit dès que le logement a une installation de chauffage ou d'eau chaude individuelle.

## Pas de chauffage ou d'eau chaude à l'arrivée : que faire ? {#arrivee}
Prévenez le propriétaire par écrit le jour même : les équipements de chauffage et d'eau chaude doivent être en bon état de fonctionnement. Vous pouvez faire modifier l'état des lieux dans les 10 jours calendaires, et pour le chauffage jusqu'à la fin du premier mois de la période de chauffe.

Ce second délai existe parce qu'un chauffage se teste mal en juillet. Emménagez-vous hors saison ? Faites un essai dès l'arrivée, puis écrivez au premier froid si quelque chose ne va pas.

Sans réaction, envoyez une lettre recommandée avec accusé de réception. Si, 2 mois après, il n'y a ni accord ni réponse, vous pouvez saisir la commission départementale de conciliation ou un conciliateur de justice, puis le juge. Notre article sur le [logement décent](/blog/logement-decent-criteres-visite) détaille les critères à invoquer.

Un doute sur le monoxyde de carbone (maux de tête, nausées, vertiges) ne se traite pas par courrier : aérez, arrêtez les appareils et appelez les secours.

## Peut-on arrêter de payer le loyer tant que la chaudière ne marche pas ? {#loyer}
Non. Même si le propriétaire ne fait pas les travaux qu'il doit faire, le locataire doit continuer à payer le loyer. Le retenir de vous-même vous met en situation d'impayé, alors que le propriétaire est celui qui est en tort. Écrivez, gardez chaque preuve, et suivez les étapes de la section précédente.

Seul le juge peut réduire le loyer ou suspendre son paiement, et service-public le décrit pour un logement jugé non décent. Vos messages, la facture du chauffagiste et vos photos datées serviront à ce moment-là.
`,
});
