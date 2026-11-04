import { article } from "@/lib/blog-format";

const F1686 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1686";
const T1686 = "Service-public.gouv.fr · Clauses interdites dans un bail d'habitation";

export default article({
  slug: "clauses-abusives-bail-location",
  titre: "Clauses interdites dans un bail : la liste à relire avant de signer",
  titreSeo: "Clauses interdites dans un bail : la liste",
  description:
    "Prélèvement imposé, assureur choisi, pénalités, frais de quittance : les clauses interdites d'un bail, ce qu'elles deviennent et que faire une fois signé.",
  chapeau:
    "La loi de 1989 fixe la liste des clauses interdites dans un bail d'habitation : prélèvement automatique imposé, assurance chez l'assureur du propriétaire, amendes, frais de quittance, interdiction d'héberger un proche. Si votre bail en contient une, elle est réputée non écrite : elle ne s'applique pas, et le reste du bail reste valable.",
  publieLe: "2026-11-04",
  pilier: "D",
  format: "question",
  guidePilier: "/guides/preavis-location",
  guidesLies: ["/guides/etat-des-lieux", "/guides/depot-de-garantie"],
  statut: "publie",
  requete: "clause abusive dans bail de location",
  faits: [
    {
      fait: "Les clauses interdites d'un bail d'habitation sont considérées comme non écrites",
      valeur: "clauses réputées non écrites",
      source: F1686,
      titreSource: T1686,
      releveLe: "2026-11-04",
      citation: "Si un bail d'habitation les contient, ces clauses doivent être considérées comme non écrites",
    },
    {
      fait: "Une clause interdite reste nulle même si elle figure dans le contrat",
      valeur: "nulle même signée",
      source: "https://www.anil.org/votre-besoin/louer/type-de-location/location-vide/bail/",
      titreSource: "ANIL · Le bail de location, un document obligatoire",
      releveLe: "2026-11-04",
      citation: "Certaines clauses sont interdites. Même si elles figurent dans le contrat, elles sont nulles",
    },
    {
      fait: "Le bail ne peut pas imposer le prélèvement automatique",
      valeur: "prélèvement automatique imposé interdit",
      source: F1686,
      titreSource: T1686,
      releveLe: "2026-11-04",
      citation: "Une clause qui oblige le locataire à payer le loyer par prélèvement automatique",
    },
    {
      fait: "Le bail ne peut pas prévoir d'amendes ou de pénalités",
      valeur: "amendes et pénalités interdites",
      source: F1686,
      titreSource: T1686,
      releveLe: "2026-11-04",
      citation: "Une clause qui autorise le propriétaire à percevoir des amendes et pénalités en cas d'infraction aux clauses du bail",
    },
    {
      fait: "Le bail ne peut pas faire payer des frais de relance ou d'envoi de quittance",
      valeur: "frais de quittance interdits",
      source: F1686,
      titreSource: T1686,
      releveLe: "2026-11-04",
      citation: "Une clause qui oblige le locataire à payer des frais de relance ou d'envoi de la quittance de loyer",
    },
    {
      fait: "Le bail ne peut pas imposer l'assureur du locataire",
      valeur: "assureur imposé interdit",
      source: F1686,
      titreSource: T1686,
      releveLe: "2026-11-04",
      citation: "une clause qui oblige le locataire à prendre un contrat d'assurance habitation auprès d'un assureur choisi par le propriétaire est interdite",
    },
    {
      fait: "Le bail ne peut pas interdire d'héberger des personnes",
      valeur: "interdiction d'héberger interdite",
      source: F1686,
      titreSource: T1686,
      releveLe: "2026-11-04",
      citation: "Une clause qui interdit au locataire d'héberger des personnes ne vivant pas habituellement avec lui",
    },
    {
      fait: "Le bail ne peut pas rendre le locataire automatiquement responsable des dégradations",
      valeur: "responsabilité automatique interdite",
      source: F1686,
      titreSource: T1686,
      releveLe: "2026-11-04",
      citation: "Une clause qui prévoit que le locataire est automatiquement responsable des dégradations constatées dans le logement",
    },
    {
      fait: "Les ADIL informent gratuitement sur les droits et obligations en matière de logement",
      valeur: "conseil gratuit de l'ADIL",
      source: "https://www.anil.org/lanil-et-les-adil/votre-adil/",
      titreSource: "ANIL · Votre ADIL",
      releveLe: "2026-11-04",
      citation: "pour mission d'informer gratuitement les usagers sur leurs droits et obligations",
    },
  ],
  corps: `
## Qu'est-ce qu'une clause abusive dans un bail de location ? {#definition}
Dans un bail d'habitation, on parle plutôt de clause interdite : l'article 4 de la loi du 6 juillet 1989 en fixe la liste. Une clause de cette liste, même signée, doit être considérée comme non écrite. Le bail reste valable et s'applique sans elle : le propriétaire ne peut ni vous l'opposer, ni vous faire payer ce qu'elle prévoit.

Les clauses ci-dessous sont les plus courantes ; la liste complète, à jour, est sur la fiche de service-public citée en source. Elle vaut pour le vide comme pour le meublé, avec quelques différences selon le type de bail.

## Quelles clauses sur l'argent sont interdites ? {#argent}
Toutes celles qui font payer au locataire autre chose que le loyer, les charges et les sommes prévues par la loi. Le propriétaire ne peut pas imposer le prélèvement automatique, prélever le loyer sur votre salaire, prévoir des amendes ou des pénalités, ni facturer l'envoi des quittances. Une clause qui le prévoit est sans effet, même signée de votre main.

Parmi les clauses interdites les plus fréquentes :
- le paiement du loyer imposé par prélèvement automatique ;
- le prélèvement du loyer sur votre salaire, même avec votre accord ;
- des amendes ou pénalités si vous manquez à une clause du bail ou au règlement de l'immeuble ;
- des frais de relance ou d'envoi de la quittance ;
- des frais d'état des lieux de sortie quand il n'est pas fait par un commissaire de justice ;
- des sommes à verser à l'entrée en plus du dépôt de garantie et des frais d'agence prévus par la loi ;
- le remboursement des réparations sur une simple estimation du propriétaire.

Les frais d'agence eux-mêmes sont encadrés : l'article sur les [frais d'agence](/blog/frais-agence-location) donne les plafonds.

## Quelles clauses limitent à tort votre vie dans le logement ? {#usage}
Le locataire est chez lui. Un bail ne peut donc pas vous interdire d'héberger des personnes qui ne vivent pas avec vous, ni d'exercer une activité politique, syndicale, associative ou religieuse. Il ne peut pas non plus vous obliger à assurer le logement chez un assureur choisi par le propriétaire : l'assurance est obligatoire, son choix vous revient.

Deux autres limites concernent l'accès au logement. Une clause de visite, avant une vente ou une relocation, ne peut pas prévoir de visites les jours fériés ni plus de deux heures les jours ouvrables. Et une clause qui vous interdit de demander une indemnité pour des travaux de plus de 21 jours est interdite. Le cas de l'animal est à part, détaillé dans l'article [le propriétaire peut-il refuser un animal](/blog/proprietaire-refuser-animal-location).

## Quelles clauses déséquilibrent le bail ? {#desequilibre}
Celles qui font peser sur vous une responsabilité systématique ou protègent le propriétaire de toute mise en cause. Un bail ne peut pas vous rendre automatiquement responsable des dégradations constatées, prévoir une responsabilité collective des locataires pour les parties communes, ni dégager le propriétaire de toute responsabilité. Les dégradations se prouvent par l'état des lieux.

La résiliation est aussi encadrée : le bail ne peut prévoir sa rupture de plein droit que pour les motifs de la loi, comme le loyer impayé ou l'absence d'assurance. Une reconduction pour moins de trois ans avec un propriétaire particulier est également interdite. Pour comparer l'état du logement à l'entrée et à la sortie, le guide de l'[état des lieux](/guides/etat-des-lieux) donne la méthode.

## Que faire si le bail signé contient une clause interdite ? {#deja-signe}
Rien tant que le propriétaire ne l'applique pas : la clause est sans effet. S'il vous la réclame, répondez par écrit en rappelant qu'elle figure dans la liste des clauses interdites et qu'elle est réputée non écrite, puis continuez à payer loyer et charges normalement. En cas de désaccord, l'ADIL de votre département vous conseille gratuitement.

Avant de signer, demandez plutôt que la clause soit rayée : un propriétaire de bonne foi acceptera, puisqu'elle ne l'aurait pas protégé. Si une somme a été prélevée au titre d'une telle clause, demandez son remboursement par écrit. Au départ, une retenue fondée sur une telle clause se conteste de la même façon ; le guide du [préavis de location](/guides/preavis-location) rappelle les étapes de la fin du bail.
`,
});
