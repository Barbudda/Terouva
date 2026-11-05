import { article } from "@/lib/blog-format";

const F18490 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F18490";
const T18490 = "Service-public.gouv.fr · Avance Loca-Pass : aide au locataire pour le dépôt de garantie";
const F1334 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1334";
const T1334 = "Service-public.gouv.fr · Quelle aide apporte le Fonds de solidarité pour le logement (FSL) ?";
const F2008 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F2008";
const T2008 = "Service-public.gouv.fr · Prime de déménagement";
const F38492 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F38492";
const T38492 = "Service-public.gouv.fr · Vous déménagez : aides financières";

export default article({
  slug: "aide-depot-de-garantie",
  titre: "Aides pour payer le dépôt de garantie : Loca-Pass, FSL, et après ?",
  titreSeo: "Aide dépôt de garantie : Loca-Pass et FSL",
  description:
    "Avance Loca-Pass jusqu'à 1 200 €, FSL de votre département : qui y a droit, ce qu'elles couvrent, leurs délais, et la prime de déménagement des familles.",
  chapeau:
    "Deux aides existent : l'avance Loca-Pass d'Action Logement, un prêt sans intérêts jusqu'à 1 200 €, à demander au plus tard 2 mois après l'entrée, et le FSL de votre département, prêt ou subvention accordé sous conditions de revenus. Les familles d'au moins 3 enfants peuvent aussi obtenir une prime pour leurs frais de déménagement.",
  publieLe: "2026-11-06",
  pilier: "D",
  format: "question",
  guidePilier: "/guides/depot-de-garantie",
  guidesLies: ["/guides/louer-sans-garant"],
  statut: "publie",
  requete: "aide dépôt de garantie logement",
  faits: [
    {
      fait: "L'avance Loca-Pass est un prêt sans intérêts ni frais de dossier",
      valeur: "prêt sans intérêts, ni frais de dossier",
      source: F18490,
      titreSource: T18490,
      releveLe: "2026-11-05",
      citation: "Il s'agit d'un prêt (sans intérêts, ni frais de dossier)",
    },
    {
      fait: "L'avance ne peut pas dépasser 1 200 €",
      valeur: "1 200 €",
      source: F18490,
      titreSource: T18490,
      releveLe: "2026-11-05",
      citation: "L'avance Loca-Pass ne peut pas dépasser 1 200 €",
    },
    {
      fait: "La demande se fait au plus tard 2 mois après l'entrée",
      valeur: "2 mois après l'entrée",
      source: F18490,
      titreSource: T18490,
      releveLe: "2026-11-05",
      citation: "Vous devez faire votre demande au plus tard 2 mois après votre entrée dans le logement",
    },
    {
      fait: "Salarié ou préretraité du secteur privé : éligible",
      valeur: "salarié ou préretraité du privé",
      source: F18490,
      titreSource: T18490,
      releveLe: "2026-11-05",
      citation: "Salarié ou préretraité d'une entreprise du secteur privé",
    },
    {
      fait: "Étudiant boursier d'État français : éligible",
      valeur: "étudiant boursier",
      source: F18490,
      titreSource: T18490,
      releveLe: "2026-11-05",
      citation: "Étudiant boursier d'Etat français Étudiant salarié avec un CDD de 3 mois minimum",
    },
    {
      fait: "Étudiant avec une convention de stage d'au moins 3 mois : éligible",
      valeur: "convention de stage d'au moins 3 mois",
      source: F18490,
      titreSource: T18490,
      releveLe: "2026-11-05",
      citation: "Étudiant salarié ayant une convention de stage d'au moins 3 mois en cours au moment de la demande",
    },
    {
      fait: "Personne qui n'a pas encore 30 ans, en recherche d'emploi : éligible",
      valeur: "recherche d'emploi, pas encore 30 ans",
      source: F18490,
      titreSource: T18490,
      releveLe: "2026-11-05",
      citation: "Personne de moins de 30 ans et en recherche d'emploi",
    },
    {
      fait: "Personne qui n'a pas encore 30 ans, avec un emploi non permanent, quel que soit le secteur : éligible",
      valeur: "emploi non permanent, pas encore 30 ans",
      source: F18490,
      titreSource: T18490,
      releveLe: "2026-11-05",
      citation: "Personne de moins de 30 ans et ayant un emploi non permanent",
    },
    {
      fait: "Le logement doit être la résidence principale, loué vide ou meublé",
      valeur: "résidence principale, vide ou meublé",
      source: F18490,
      titreSource: T18490,
      releveLe: "2026-11-05",
      citation: "Soit d'un bail pour un logement loué vide ou meublé",
    },
    {
      fait: "Après accord, fiche de dialogue et offre de prêt se signent chacune dans les 15 jours, puis le versement arrive dans les 10 jours",
      valeur: "15 jours, 15 jours, 10 jours",
      source: F18490,
      titreSource: T18490,
      releveLe: "2026-11-05",
      citation: "Dans les 10 jours qui suivent la signature de l'offre de prêt, Action logement vous verse l'avance Loca-pass",
    },
    {
      fait: "Le remboursement commence 3 mois après le versement",
      valeur: "3 mois après le versement",
      source: F18490,
      titreSource: T18490,
      releveLe: "2026-11-05",
      citation: "Vous devez commencer à rembourser l'avance Loca-Pass 3 mois après son versement",
    },
    {
      fait: "Le remboursement minimum est de 20 € par mois",
      valeur: "20 €",
      source: F18490,
      titreSource: T18490,
      releveLe: "2026-11-05",
      citation: "Vous devez rembourser au moins 20 € par mois",
    },
    {
      fait: "Remboursement en 25 mois maximum pour un bail de 25 mois ou plus, aligné sur le bail s'il est plus court",
      valeur: "25 mois maximum",
      source: F18490,
      titreSource: T18490,
      releveLe: "2026-11-05",
      citation: "Vous devez rembourser l'avance Loca-Pass en 25 mois maximum",
    },
    {
      fait: "En quittant le logement avant la fin du bail, il reste 3 mois maximum pour tout rembourser",
      valeur: "3 mois après le départ",
      source: F18490,
      titreSource: T18490,
      releveLe: "2026-11-05",
      citation: "vous avez 3 mois maximum après votre départ pour rembourser la totalité de l'avance Loca-Pass",
    },
    {
      fait: "Le salarié du secteur agricole demande l'Agri-Loca-Pass",
      valeur: "Agri-Loca-Pass",
      source: F18490,
      titreSource: T18490,
      releveLe: "2026-11-05",
      citation: "d'une entreprise du secteur privé agricole , vous pouvez demander",
    },
    {
      fait: "Le FSL peut financer le dépôt de garantie, le premier loyer, les frais d'agence, le déménagement, l'assurance",
      valeur: "dépôt, loyer, agence, déménagement, assurance",
      source: F1334,
      titreSource: T1334,
      releveLe: "2026-11-05",
      citation: "des frais de déménagement, de l'assurance habitation, ou de l'achat des équipements",
    },
    {
      fait: "L'aide du FSL prend la forme d'un prêt ou d'une subvention",
      valeur: "prêt ou subvention",
      source: F1334,
      titreSource: T1334,
      releveLe: "2026-11-05",
      citation: "Cette aide financière peut prendre la forme d'un prêt ou d'une subvention",
    },
    {
      fait: "Le FSL pose un plafond de revenus, et chaque fonds a ses propres critères",
      valeur: "critères propres à chaque département",
      source: F1334,
      titreSource: T1334,
      releveLe: "2026-11-05",
      citation: "Chaque FSL a ses propres critères d'attribution",
    },
    {
      fait: "L'aide peut être refusée si le loyer est trop élevé par rapport aux revenus",
      valeur: "refus si loyer trop élevé",
      source: F1334,
      titreSource: T1334,
      releveLe: "2026-11-05",
      citation: "si votre loyer est trop élevé par rapport au total de vos revenus, l'aide du FSL peut vous être refusée",
    },
    {
      fait: "La demande de FSL passe par une assistante sociale",
      valeur: "assistante sociale",
      source: F1334,
      titreSource: T1334,
      releveLe: "2026-11-05",
      citation: "Vous devez contacter une assistante sociale",
    },
    {
      fait: "L'aide au logement diminue le loyer",
      valeur: "diminue le loyer",
      source: F38492,
      titreSource: T38492,
      releveLe: "2026-11-05",
      citation: "Elle permet de diminuer le montant de votre loyer",
    },
    {
      fait: "La prime de déménagement vise les familles d'au moins 3 enfants à charge",
      valeur: "3 enfants à charge",
      source: F2008,
      titreSource: T2008,
      releveLe: "2026-11-05",
      citation: "Vous avez au moins 3 enfants à charge (nés ou à naître)",
    },
    {
      fait: "Il faut avoir droit à l'APL ou à l'ALF pour le nouveau logement",
      valeur: "APL ou ALF",
      source: F2008,
      titreSource: T2008,
      releveLe: "2026-11-05",
      citation: "allocation de logement familiale (ALF) pour votre nouveau logement",
    },
    {
      fait: "Le dossier se dépose dans les 6 mois après le déménagement",
      valeur: "6 mois",
      source: F2008,
      titreSource: T2008,
      releveLe: "2026-11-05",
      citation: "dans un délai de 6 mois maximum après le déménagement",
    },
    {
      fait: "La prime est plafonnée à 1 147,58 € pour 3 enfants (fiche vérifiée le 1er avril 2026)",
      valeur: "1 147,58 €",
      source: F2008,
      titreSource: T2008,
      releveLe: "2026-11-05",
      citation: "3 enfants 1 147,58 € 4 enfants",
    },
  ],
  corps: `
## Quelles aides pour payer le dépôt de garantie ? {#lesquelles}
Deux aides visent directement cette somme : l'avance Loca-Pass, un prêt d'Action Logement, et le Fonds de solidarité pour le logement (FSL), propre à chaque département. La première dépend surtout de votre statut, la seconde de vos revenus. Le montant du dépôt lui-même et ses règles sont dans le guide du [dépôt de garantie](/guides/depot-de-garantie).

Commencez par Loca-Pass si vous êtes dans sa liste : les conditions sont nationales et la démarche se fait en ligne. Le FSL s'adresse d'abord aux ménages en difficulté, et sa réponse dépend de votre département.

## Qui a droit à l'avance Loca-Pass ? {#loca-pass}
Les salariés et préretraités du secteur privé, à tout âge, ainsi que certains étudiants et jeunes. Vous pouvez aussi en bénéficier si vous n'avez pas encore 30 ans et que vous êtes en formation en alternance, en recherche d'emploi ou en emploi non permanent. Le logement doit être votre résidence principale, loué vide ou meublé.

La liste complète :

- salarié ou préretraité d'une entreprise du secteur privé (hors agricole, qui passe par l'Agri-Loca-Pass) ;
- étudiant boursier d'État français ;
- étudiant salarié avec un CDD d'au moins 3 mois en cours, ou plusieurs CDD cumulant 3 mois sur les 6 derniers mois, ou une convention de stage d'au moins 3 mois en cours ;
- personne qui n'a pas encore 30 ans, en contrat d'apprentissage ou de professionnalisation, en recherche d'emploi, ou en emploi non permanent, secteur privé ou public.

Attention à ne pas confondre avec Visale : les âges et les conditions ne sont pas les mêmes, et l'une n'ouvre pas l'autre. En colocation, l'avance ne couvre que votre part du dépôt.

## Quand arrive l'avance, et comment se rembourse-t-elle ? {#delais}
Après accord, vous signez une fiche de dialogue dans les 15 jours, puis une offre de prêt dans les 15 jours, et l'argent arrive dans les 10 jours suivants. Vous avez jusqu'à 2 mois après l'entrée pour demander, mais le dépôt se paie à la signature du bail : anticipez, ou prévoyez d'avancer la somme.

L'avance peut aller jusqu'à 1 200 € et financer tout ou partie du dépôt. Elle reste un prêt :

- le remboursement commence 3 mois après le versement, avec au moins 20 € par mois ;
- pour un bail de 25 mois ou plus, il s'étale sur 25 mois au maximum ;
- pour un bail plus court, sa durée s'aligne sur celle du bail ;
- si vous partez avant la fin du bail, il vous reste 3 mois au maximum pour tout rembourser.

## Le FSL peut-il payer votre dépôt de garantie ? {#fsl}
Oui, si vous remplissez les critères de votre département. Le FSL peut financer le dépôt, le premier loyer, les frais d'agence, le déménagement ou l'assurance habitation, sous forme de prêt ou de subvention. Il pose un plafond de revenus et n'accorde rien automatiquement : un loyer trop élevé par rapport à vos revenus peut suffire à un refus.

Vous ne déposez pas la demande seul : une assistante sociale la fait pour vous. Selon votre situation, vous la rencontrez à la Caf, à la MSA, à la mairie ou aux services du département. Comme chaque fonds fixe ses règles, demandez-leur les plafonds et les délais, et posez la question avant de signer : un refus reçu après l'entrée vous laisse seul face à la dépense. Certains FSL se portent aussi garants, comme l'explique l'article [organisme garant pour une location](/blog/organisme-garant-location).

## La CAF aide-t-elle à payer le dépôt de garantie ? {#caf}
Pas par l'aide au logement, qui diminue votre loyer une fois installé et ne verse rien pour le dépôt. Son rôle à ce stade tient au FSL : si vous êtes allocataire, c'est votre caisse qu'il faut contacter pour rencontrer l'assistante sociale qui fera la demande. L'aide vient alors du fonds de votre département.

Étudiant ou non, gardez le même ordre : Loca-Pass si vous êtes éligible, puis le FSL, puis l'aide au logement une fois le bail signé.

## Qui peut obtenir la prime de déménagement ? {#prime}
Les familles d'au moins 3 enfants à charge, nés ou à naître, qui ont droit à l'APL ou à l'ALF pour leur nouveau logement. Le déménagement doit avoir lieu dans la période fixée autour de la naissance du dernier enfant. La prime couvre les frais réels de déménagement, pas le dépôt de garantie, et elle se demande à la Caf ou à la MSA.

Elle est plafonnée à 1 147,58 € pour 3 enfants, d'après la fiche vérifiée le 1er avril 2026, et le dossier se dépose dans les 6 mois après le déménagement, avec le formulaire et les justificatifs des dépenses.
`,
});
