import { article } from "@/lib/blog-format";

const SP_PIECES = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169";
const T_PIECES = "Service-public.gouv.fr · Futur locataire d'un logement privé : justificatifs à donner au propriétaire";
const SP_VISALE = "https://www.service-public.gouv.fr/particuliers/vosdroits/F33453";
const T_VISALE = "Service-public.gouv.fr · Garantie Visale : caution pour le locataire";
const AUDIENS = "https://www.audiens.org/solutions/services-aux-entreprises-audiens-logement.html";
const T_AUDIENS = "Audiens · Audiens Logement";

export default article({
  slug: "louer-intermittent-du-spectacle",
  titre: "Louer quand on est intermittent du spectacle : le dossier qui passe",
  titreSeo: "Louer en étant intermittent du spectacle",
  description:
    "Intermittent du spectacle : les pièces qui montrent vos revenus sur l'année, pourquoi l'assurance du bailleur bloque, et les garanties à proposer.",
  chapeau:
    "Intermittent du spectacle, vous pouvez louer : il s'agit de montrer vos revenus sur l'année plutôt que sur un mois. Bulletins de salaire, allocations versées par France Travail et avis d'imposition sont des pièces de la liste officielle. Le blocage vient souvent de l'assurance loyers impayés du bailleur ; un garant, ou Visale selon votre âge, le lève.",
  publieLe: "2026-11-04",
  pilier: "B",
  format: "cas-pratique",
  guidePilier: "/guides/dossier-de-location",
  guidesLies: ["/guides/garantie-visale", "/guides/louer-sans-garant"],
  outilLie: "/outils/dossier-de-location",
  statut: "publie",
  requete: "louer une maison quand on est intermittent spectacle",
  faits: [
    {
      fait: "Le choix du locataire se fonde sur des critères objectifs comme la situation financière",
      valeur: "critères objectifs, par exemple la situation financière",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14750",
      titreSource: "Service-public.gouv.fr · Discrimination à la location d'un logement",
      releveLe: "2026-11-04",
      citation: "doit se fonder sur des critères objectifs (par exemple, la situation financière du candidat)",
    },
    {
      fait: "Les 3 dernières fiches de paie font partie des justificatifs de ressources",
      valeur: "3 dernières fiches de paie",
      source: SP_PIECES,
      titreSource: T_PIECES,
      releveLe: "2026-11-04",
      citation: "3 dernières fiches de paie 2 derniers bilans ou, si nécessaire, attestation de ressources",
    },
    {
      fait: "Les allocations des 3 derniers mois, attestées par l'organisme payeur, font partie des justificatifs de ressources",
      valeur: "allocations perçues lors des 3 derniers mois",
      source: SP_PIECES,
      titreSource: T_PIECES,
      releveLe: "2026-11-04",
      citation: "Justificatif de versement des indemnités, retraites, pensions, prestations sociales et familiales et allocations perçues lors des 3 derniers mois",
    },
    {
      fait: "Le dernier ou l'avant-dernier avis d'imposition fait partie des justificatifs de ressources",
      valeur: "dernier ou avant-dernier avis d'imposition",
      source: SP_PIECES,
      titreSource: T_PIECES,
      releveLe: "2026-11-04",
      citation: "Dernier ou avant-dernier avis d'imposition ou de non-imposition",
    },
    {
      fait: "Le contrat de travail ou l'attestation de l'employeur font partie des justificatifs de situation professionnelle",
      valeur: "contrat de travail, attestation de l'employeur",
      source: SP_PIECES,
      titreSource: T_PIECES,
      releveLe: "2026-11-04",
      citation: "Contrat de travail ou de stage, ou, si nécessaire, attestation de l'employeur précisant l'emploi et la rémunération proposée",
    },
    {
      fait: "Un propriétaire particulier assuré contre les impayés ne peut demander une caution que pour un étudiant ou un apprenti",
      valeur: "caution seulement si le locataire est étudiant ou apprenti",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F31267",
      titreSource: "Service-public.gouv.fr · Caution du locataire ou du colocataire dans un logement privé",
      releveLe: "2026-11-04",
      citation: "Le propriétaire qui a déjà une assurance privée contre les risques locatifs peut demander une caution seulement si son locataire est étudiant ou apprenti",
    },
    {
      fait: "À 30 ans ou moins, Visale est ouverte quel que soit le statut, sous conditions",
      valeur: "tous statuts, sous conditions",
      source: SP_VISALE,
      titreSource: T_VISALE,
      releveLe: "2026-11-04",
      citation: "(étudiant, alternant, fonctionnaire, salarié, sans emploi...), peuvent obtenir la garantie Visale, sous certaines conditions",
    },
    {
      fait: "À partir de 31 ans, Visale vise le salarié du secteur privé, dont le salarié en CDD",
      valeur: "salarié du secteur privé, en CDD",
      source: SP_VISALE,
      titreSource: T_VISALE,
      releveLe: "2026-11-04",
      citation: "Salarié du secteur privé (y compris agricole) Il s'agit notamment du salarié en contrat aidé, en intérim, en CDD",
    },
    {
      fait: "Avec un contrat en cours : demande dans les 6 mois qui suivent l'embauche",
      valeur: "6 mois après l'embauche",
      source: SP_VISALE,
      titreSource: T_VISALE,
      releveLe: "2026-11-04",
      citation: "Soit faire la demande de la garantie Visale dans les 6 mois qui suivent l'embauche",
    },
    {
      fait: "Ou un salaire net mensuel plafonné",
      valeur: "1710 € maximum",
      source: SP_VISALE,
      titreSource: T_VISALE,
      releveLe: "2026-11-04",
      citation: "avoir un salaire net mensuel de 1710 € maximum",
    },
    {
      fait: "Visale compte les allocations chômage parmi les ressources prises en compte",
      valeur: "allocations chômage",
      source: SP_VISALE,
      titreSource: T_VISALE,
      releveLe: "2026-11-04",
      citation: "Revenus professionnels Allocations chômage Indemnités journalières RSA Allocation logement Allocations familiales",
    },
    {
      fait: "Audiens cite l'avance du dépôt de garantie parmi les services d'accès au logement",
      valeur: "avance du dépôt de garantie",
      source: AUDIENS,
      titreSource: T_AUDIENS,
      releveLe: "2026-11-04",
      citation: "en passant par l'avance du dépôt de garantie, les services pour faciliter l'accès au logement sont nombreux",
    },
    {
      fait: "Ces services sont assurés par Action Logement pour le compte d'Audiens",
      valeur: "Action Logement pour le compte d'Audiens",
      source: AUDIENS,
      titreSource: T_AUDIENS,
      releveLe: "2026-11-04",
      citation: "Action Logement prend en charge pour le compte d'Audiens",
    },
  ],
  corps: `
## Un propriétaire peut-il refuser un intermittent du spectacle ? {#refus}
Il peut choisir un autre candidat sur des critères objectifs, comme la situation financière, mais votre statut n'est pas un motif en soi. En pratique, le refus vient de la forme de vos revenus : des cachets et des contrats courts, puis des allocations entre deux périodes de travail. Votre dossier doit montrer que l'ensemble tient sur l'année.

Le bailleur lit souvent un dossier en quelques secondes, et trois bulletins inégaux lui font peur. Tout l'enjeu est de lui donner la vue sur douze mois, que vous seul pouvez assembler.

## Quelles pièces fournir quand on est intermittent ? {#pieces}
La liste officielle couvre votre situation : vos trois dernières fiches de paie, le justificatif de versement des allocations des trois derniers mois établi par France Travail, et votre dernier ou avant-dernier avis d'imposition. Ce dernier compte le plus, parce qu'il montre une année entière de cachets et d'allocations, là où trois bulletins ne racontent que trois mois.

Ajoutez les contrats signés pour les mois qui viennent : la liste prévoit le contrat de travail, ou l'attestation de l'employeur qui précise l'emploi et la rémunération. Une page qui résume vos revenus mois par mois aide le bailleur à lire le tout. La liste complète est dans le guide du [dossier de location](/guides/dossier-de-location), et la [checklist de dossier](/outils/dossier-de-location) la trie selon votre situation.

## Pourquoi l'assurance du propriétaire bloque-t-elle souvent ? {#assurance}
Un propriétaire assuré contre les loyers impayés suit en général les conditions de son contrat d'assurance, qui portent souvent sur le type de contrat de travail et le niveau de revenus. Des contrats courts peuvent ne pas y entrer, même avec de bons revenus sur l'année. Un particulier assuré ne peut d'ailleurs vous demander une caution que si vous êtes étudiant ou apprenti.

Demandez donc tôt si le logement est assuré, et ce que l'assureur exige. Si votre profil n'y entre pas, mieux vaut viser un bailleur qui accepte une caution. L'article [assurance loyers impayés et garant](/blog/assurance-loyers-impayes-garant) détaille la règle.

## La garantie Visale est-elle ouverte aux intermittents ? {#visale}
À 30 ans ou moins, oui, quel que soit votre statut, sous conditions. À partir de 31 ans, Visale vise le salarié du secteur privé, et service-public cite le salarié en CDD parmi les cas : avec un contrat en cours, la demande se fait dans les 6 mois qui suivent l'embauche, ou votre salaire net mensuel ne dépasse pas 1710 €.

Les allocations chômage comptent parmi les ressources que Visale prend en compte pour fixer le loyer couvert. Avec des contrats très courts, le simulateur d'éligibilité vous dit vite si votre cas passe : le guide de la [garantie Visale](/guides/garantie-visale) y renvoie.

## Existe-t-il des aides au logement propres au spectacle ? {#aides}
Audiens, le groupe de protection sociale du spectacle, présente des services d'accès au logement assurés pour son compte par Action Logement, du prêt à l'aide à la mobilité, en passant par l'avance du dépôt de garantie. Les conditions dépendent de vos employeurs et de votre situation : demandez-les à Audiens ou à Action Logement avant de chercher.

Sans aide ni Visale, il reste le garant et les autres voies du guide [louer sans garant](/guides/louer-sans-garant).

## Cas pratique : comment Léa présente-t-elle son dossier ? {#cas}
Léa, 34 ans, régisseuse son, alterne cachets et allocations. Elle met en tête de son message son revenu annuel tiré de son avis d'imposition, joint ses trois derniers bulletins, l'attestation de ses allocations et deux contrats signés pour l'automne, puis propose son frère comme garant. Le bailleur lit une année stable et une sécurité, sans avoir à reconstituer quoi que ce soit.

Le [modèle de message de candidature](/outils/message-de-candidature) vous aide à tenir cette présentation en trois lignes.
`,
});
