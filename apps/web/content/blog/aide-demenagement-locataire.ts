// Vague 10, lot A, n° 3. Requête relevée à l'autocomplétion (caf, étudiant, action logement, fonctionnaire, personne
// seule, france travail). Apport : la carte des aides de la fiche F38492 par profil, avec un renvoi vers chaque aide
// déjà détaillée sur le site (Loca-Pass, FSL et prime : `aide-depot-de-garantie` ; AIP : `garant-location-fonctionnaire` ;
// Mobili-Jeune : `louer-en-apprentissage-alternance`). France Travail et Mobili-Pass ne figurent pas dans F38492 : non
// nommés. Montant de la prime de déménagement (changé au 1er avril 2026) : laissé à l'article qui la détaille.
// « Moins de 30 ans » des sources écrit « pas encore 30 ans » (règle du vérificateur).

import { article } from "@/lib/blog-format";

const F38492 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F38492";
const T38492 = "Service-public.gouv.fr · Vous déménagez : aides financières";
const F12006 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F12006";
const T12006 = "Service-public.gouv.fr · Aide personnalisée au logement (APL)";
const AIP = "https://www.aip-fonctionpublique.fr/";
const T_AIP = "AIP Fonction publique · Aide à l'installation des personnels de l'État";

export default article({
  slug: "aide-demenagement-locataire",
  titre: "Aides au déménagement : lesquelles selon votre situation",
  titreSeo: "Aides au déménagement selon votre situation",
  description:
    "APL, Loca-Pass, FSL, prime des familles, aides des étudiants, des alternants, des agents de l'État, de la MDPH et des communes : qui peut demander quoi.",
  chapeau:
    "Il n'existe pas une aide au déménagement, mais plusieurs, selon votre situation. Tout locataire peut demander l'APL pour son nouveau logement. Loca-Pass et le FSL aident à payer l'entrée ; les familles de 3 enfants, les étudiants qui changent d'académie, les alternants, les agents de l'État, les bénéficiaires de la PCH et les retraités ont des aides propres.",
  publieLe: "2026-11-15",
  pilier: "D",
  format: "question",
  guidePilier: "/guides/depot-de-garantie",
  guidesLies: ["/guides/dossier-de-location", "/guides/garantie-visale"],
  statut: "publie",
  requete: "aide déménagement",
  faits: [
    {
      fait: "Les aides varient selon la situation",
      valeur: "conditions variables, liste selon locataire, colocataire ou propriétaire",
      source: F38492,
      titreSource: T38492,
      releveLe: "2026-11-15",
      citation: "Le droit à chaque aide est soumis à des conditions qui varient.",
    },
    {
      fait: "Nouvelle demande d'APL en cas de déménagement",
      valeur: "nouvelle demande pour le nouveau logement",
      source: F12006,
      titreSource: T12006,
      releveLe: "2026-11-15",
      citation: "En cas de déménagement, vous devez faire une nouvelle demande d'APL pour votre nouveau logement.",
    },
    {
      fait: "Loca-Pass paie le dépôt de garantie à votre place",
      valeur: "Action Logement paie le dépôt de garantie",
      source: F38492,
      titreSource: T38492,
      releveLe: "2026-11-15",
      citation: "Via le dispositif appelé Avance Loca-Pass , Action Logement peut payer à votre place le dépôt de garantie",
    },
    {
      fait: "Loca-Pass pour le jeune en recherche d'emploi",
      valeur: "personne de moins de 30 ans en recherche d'emploi",
      source: F38492,
      titreSource: T38492,
      releveLe: "2026-11-15",
      citation: "Personne de moins de 30 ans et en recherche d'emploi",
    },
    {
      fait: "Le FSL aide aux frais d'installation",
      valeur: "dépôt, premier loyer, frais d'agence, déménagement, assurance, équipements",
      source: F38492,
      titreSource: T38492,
      releveLe: "2026-11-15",
      citation: "du dépôt de garantie, du premier loyer, des frais d'agence immobilière, des frais de déménagement, de l'assurance habitation",
    },
    {
      fait: "Le FSL verse un prêt ou une subvention",
      valeur: "prêt ou subvention",
      source: F38492,
      titreSource: T38492,
      releveLe: "2026-11-15",
      citation: "L'aide du FSL peut être versée sous forme de prêt (à rembourser au FSL), ou sous forme de subvention (sans remboursement).",
    },
    {
      fait: "L'avance Loca-Pass est un prêt sans intérêts ni frais de dossier",
      valeur: "prêt sans intérêts, ni frais de dossier",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F18490",
      titreSource: "Service-public.gouv.fr · Avance Loca-Pass : aide au locataire pour le dépôt de garantie",
      releveLe: "2026-11-15",
      citation: "Il s'agit d'un prêt (sans intérêts, ni frais de dossier)",
    },
    {
      fait: "La demande de FSL passe par une assistante sociale",
      valeur: "assistante sociale",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1334",
      titreSource: "Service-public.gouv.fr · Quelle aide apporte le Fonds de solidarité pour le logement (FSL) ?",
      releveLe: "2026-11-15",
      citation: "Vous devez contacter une assistante sociale",
    },
    {
      fait: "Prime de déménagement : 3 enfants et droit à l'APL ou l'ALF",
      valeur: "3 enfants à charge, droit à l'APL ou à l'ALF dans le nouveau logement",
      source: F38492,
      titreSource: T38492,
      releveLe: "2026-11-15",
      citation: "que vous avez droit à l'aide personnalisée au logement (APL) ou à l'allocation de logement familiale (ALF) pour votre nouveau logement",
    },
    {
      fait: "Aide à la mobilité Parcoursup",
      valeur: "établissement hors de l'académie de résidence, sous conditions",
      source: F38492,
      titreSource: T38492,
      releveLe: "2026-11-15",
      citation: "en dehors de votre académie de résidence, vous pouvez avoir droit à l'aide à la mobilité Parcoursup sous certaines conditions",
    },
    {
      fait: "Aide à la mobilité en master",
      valeur: "première année de master dans une autre région académique que la licence",
      source: F38492,
      titreSource: T38492,
      releveLe: "2026-11-15",
      citation: "inscrit en première année de master dans une région académique différente de celle où vous avez obtenu votre licence",
    },
    {
      fait: "Mobili-Jeune pour les alternants du privé non agricole",
      valeur: "moins de 30 ans, apprentissage ou professionnalisation, secteur privé non agricole",
      source: F38492,
      titreSource: T38492,
      releveLe: "2026-11-15",
      citation: "Si vous avez moins de 30 ans et êtes en contrat d'apprentissage ou de professionnalisation dans une entreprise du secteur privé non agricole",
    },
    {
      fait: "Mobili-Jeune prend en charge une partie du loyer",
      valeur: "une partie du loyer pendant la formation en alternance",
      source: F38492,
      titreSource: T38492,
      releveLe: "2026-11-15",
      citation: "Elle permet de prendre en charge une partie de votre loyer",
    },
    {
      fait: "Saisonnier agricole : aide d'Action Logement",
      valeur: "jusqu'à 600 € pour les frais d'hébergement",
      source: F38492,
      titreSource: T38492,
      releveLe: "2026-11-15",
      citation: "une aide d'un montant pouvant atteindre 600 € peut vous êtes versée pour vos frais d'hébergement",
    },
    {
      fait: "L'AIP est ouverte à l'agent de l'État, fonctionnaire ou contractuel, lors d'une première installation avec changement de résidence",
      valeur: "fonctionnaire ou contractuel de l'État, première installation",
      source: AIP,
      titreSource: T_AIP,
      releveLe: "2026-11-15",
      citation: "Tout agent de la fonction publique de l'État, qu'il soit fonctionnaire ou contractuel, lors de sa première installation nécessitant un changement de résidence",
    },
    {
      fait: "PCH : frais de déménagement pris en charge",
      valeur: "au maximum 3 000 € par période de 10 ans, logement accessible",
      source: F38492,
      titreSource: T38492,
      releveLe: "2026-11-15",
      citation: "Cette prise en charge est d'au maximum 3 000 € par période de 10 ans.",
    },
    {
      fait: "Retraités : aide possible des caisses de retraite",
      valeur: "caisse principale ou complémentaire",
      source: F38492,
      titreSource: T38492,
      releveLe: "2026-11-15",
      citation: "votre caisse de retraite principale et/ou votre caisse de retraite complémentaire vous versent une aide financière pour votre déménagement",
    },
    {
      fait: "Aide sociale de certaines communes",
      valeur: "mairie ou CCAS de la ville d'arrivée",
      source: F38492,
      titreSource: T38492,
      releveLe: "2026-11-15",
      citation: "Il faut s'adresser à la mairie ou au centre communal d'action sociale (CCAS) de votre ville d'arrivée.",
    },
  ],
  corps: `
## Quelles aides au déménagement pour un locataire ? {#lesquelles}
Plusieurs, chacune avec ses conditions : l'aide au logement pour le nouveau logement, l'avance Loca-Pass et le FSL pour payer l'entrée, la prime de déménagement des familles nombreuses, puis des aides réservées à certains publics (étudiants, alternants, agents de l'État, personnes handicapées, retraités). Votre commune peut aussi en verser une. Commencez par repérer celles qui correspondent à votre situation.

La fiche de service-public sur les aides au déménagement les classe selon que vous serez locataire, colocataire ou propriétaire. Cette page les reprend pour le locataire, profil par profil, et renvoie vers les articles qui détaillent déjà chacune. Chaque aide a ses propres délais : notez-les dès que vous savez que vous déménagez, avant de signer le bail.

## La Caf aide-t-elle à payer un déménagement ? {#caf}
Pas directement, sauf pour les familles. La Caf verse l'aide au logement de votre nouveau logement, qui baisse le loyer une fois installé : il faut faire une nouvelle demande à chaque déménagement. Avec 3 enfants à charge, nés ou à naître, et un droit à l'APL ou à l'ALF dans le nouveau logement, vous pouvez obtenir la prime de déménagement.

La prime dépend aussi de la date du déménagement, liée à l'âge du dernier enfant ou à la grossesse : ses conditions et son montant sont dans l'article sur les [aides pour le dépôt de garantie](/blog/aide-depot-de-garantie). Pour une personne seule ou un couple sans trois enfants, la prime ne s'applique pas : regardez Loca-Pass et le FSL. L'aide au logement démarre le mois suivant la demande, comme l'explique l'article sur l'[APL du premier mois](/blog/apl-premier-mois).

## Quelle aide pour payer le dépôt de garantie et l'installation ? {#entree}
Deux aides couvrent l'entrée. Avec l'avance Loca-Pass, Action Logement paie le dépôt de garantie à votre place, si vous êtes par exemple salarié du privé, étudiant boursier ou salarié sous conditions, ou jeune en recherche d'emploi. Le Fonds de solidarité pour le logement (FSL) de votre département peut payer le dépôt, le premier loyer, les frais d'agence, le déménagement ou l'assurance.

Le FSL verse un prêt ou une subvention, selon vos ressources et les règles de votre département, et sa demande passe par une assistante sociale. Loca-Pass est un prêt à rembourser. Les publics exacts, les plafonds et les délais sont dans l'article sur les [aides pour le dépôt de garantie](/blog/aide-depot-de-garantie), et le montant du dépôt lui-même dans le guide du [dépôt de garantie](/guides/depot-de-garantie).

Pour Loca-Pass, la personne en recherche d'emploi, en contrat d'apprentissage ou de professionnalisation, ou en emploi non permanent (vacataire, contractuel) doit ne pas avoir encore 30 ans. Au-delà, regardez le FSL.

## Étudiant : quelles aides pour déménager ? {#etudiant}
Deux aides visent l'étudiant qui change de ville pour ses études. L'aide à la mobilité Parcoursup, si vous entrez dans un établissement supérieur hors de votre académie de résidence, et l'aide à la mobilité en master, si votre première année de master se déroule dans une autre région académique que votre licence. Les deux s'accordent sous conditions.

Leurs conditions et leurs montants sont dans les fiches de service-public liées depuis la fiche [Vous déménagez : aides financières](https://www.service-public.gouv.fr/particuliers/vosdroits/F38492). L'étudiant boursier, ou salarié avec un contrat ou un stage d'au moins 3 mois, peut aussi demander Loca-Pass pour le dépôt. Pour le garant, voyez l'article sur le [garant étudiant](/blog/garant-etudiant-logement).

## Apprenti ou alternant : quelle aide pour se loger ? {#alternance}
L'aide Mobili-Jeune d'Action Logement, si vous n'avez pas encore 30 ans et êtes en contrat d'apprentissage ou de professionnalisation dans une entreprise du secteur privé non agricole. Elle prend en charge une partie de votre loyer pendant la formation, sous d'autres conditions. En entreprise agricole, la même aide s'appelle Agri-Mobili-Jeune.

Mobili-Jeune ne paie pas le camion de déménagement : elle allège le loyer chaque mois, ce qui compte autant pour boucler le budget de l'entrée. Ses montants et le délai de demande sont dans l'article [louer en apprentissage ou en alternance](/blog/louer-en-apprentissage-alternance). Le saisonnier agricole peut, lui, obtenir d'Action Logement jusqu'à 600 € pour ses frais d'hébergement.

## Agent de l'État : quelle aide à l'installation ? {#fonctionnaire}
L'aide à l'installation des personnels de l'État (AIP), ouverte à tout agent de la fonction publique de l'État, fonctionnaire ou contractuel, lors de sa première installation qui demande un changement de résidence. Elle aide à payer les frais d'entrée et se demande sur le site de l'AIP, sous conditions et dans des délais à respecter.

Les dépenses couvertes, les montants selon la zone et les délais sont détaillés dans l'article [fonctionnaire ou contractuel : quel garant pour louer](/blog/garant-location-fonctionnaire). Les agents de la fonction publique territoriale ou hospitalière ne sont pas visés par l'AIP : renseignez-vous auprès de votre employeur.

## Handicap ou retraite : qui peut prendre en charge les frais ? {#pch-retraite}
Si vous percevez la prestation de compensation du handicap (PCH), vos frais de déménagement vers un logement accessible peuvent être pris en charge, au maximum 3 000 € par période de 10 ans : la demande se fait auprès de votre MDPH. Si vous êtes retraité, votre caisse de retraite principale ou complémentaire peut verser une aide au déménagement.

Pour la retraite, rien n'est automatique : il faut se renseigner au préalable auprès de chaque organisme, caisse principale et caisse complémentaire, avant le déménagement. Pour le dossier de location lui-même, l'article [louer un appartement à la retraite](/blog/louer-appartement-retraite) liste les pièces à donner.

## Votre commune peut-elle vous aider à déménager ? {#commune}
Certaines communes versent une aide sociale au déménagement. Il faut s'adresser à la mairie ou au centre communal d'action sociale (CCAS) de votre ville d'arrivée, pas de celle que vous quittez. Les conditions dépendent de chaque commune : demandez-les dès que vous savez où vous allez habiter, avant de réserver le déménagement.

Si vos ressources sont modestes, la mairie peut aussi vous orienter vers l'assistante sociale qui monte la demande de FSL. Gardez les devis et les factures de votre déménagement : ils pourront vous être demandés.
`,
});
