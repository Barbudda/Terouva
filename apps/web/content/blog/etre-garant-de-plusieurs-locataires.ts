// Vague 8, ligne 18. Requête relevée sur forum (CommentÇaMarche) : « peut-on être caution solidaire pour 2 bails ».
// Apport : pas de plafond lu dans les textes officiels, mais chaque acte engage séparément ; la protection
// « proportionnalité » ne joue pas pour un bail d'habitation selon la Cour de cassation (2022, ancien Code de la
// consommation) ; et le cas d'un garant de plusieurs colocataires, où l'acte doit désigner qui met fin à l'engagement.

import { article } from "@/lib/blog-format";

const F31267 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F31267";
const T31267 = "Service-public.gouv.fr · Caution du locataire ou du colocataire dans un logement privé (F31267)";
const ANIL = "https://www.anil.org/votre-besoin/louer/trouver-un-logement/caution-et-garanties/";
const TANIL = "ANIL · Caution et garanties";
const CONSO = "https://www.anil.org/jurisprudences-cautionnement-bail-habitation-regles-droit-consommation/";
const TCONSO = "ANIL · Cautionnement et bail d'habitation : exclusion des règles du droit de la consommation (Cass. civ. 3, 17 février 2022)";

export default article({
  slug: "etre-garant-de-plusieurs-locataires",
  titre: "Peut-on être garant de plusieurs locataires en même temps ?",
  titreSeo: "Être garant de plusieurs locataires",
  description:
    "Aucun texte lu ne limite le nombre de cautionnements, mais chacun engage vos revenus et vos biens. Ce que regarde le bailleur et ce qui protège le garant.",
  chapeau:
    "Oui : ni Service-public ni l'ANIL ne fixent de nombre maximal de cautionnements par personne. Chaque acte vous engage pourtant séparément, et le propriétaire juge vos garanties financières pièces en main. Et ne comptez pas sur la règle de proportionnalité : pour un bail d'habitation, la Cour de cassation a écarté en 2022 les protections du Code de la consommation.",
  publieLe: "2026-11-04",
  pilier: "C",
  format: "question",
  guidePilier: "/guides/garant-caution",
  guidesLies: ["/guides/louer-sans-garant", "/guides/dossier-de-location"],
  statut: "publie",
  requete: "peut-on être caution solidaire pour 2 bails",
  faits: [
    {
      fait: "Ce que le propriétaire apprécie chez la caution",
      valeur: "des justificatifs prouvant des garanties financières suffisantes pour payer les impayés éventuels",
      source: F31267,
      titreSource: T31267,
      releveLe: "2026-11-04",
      citation:
        "Pour être acceptée, la caution doit fournir au propriétaire un certain nombre de justificatifs prouvant qu'elle a des garanties financières suffisantes pour payer les éventuels impayés du locataire.",
    },
    {
      fait: "Étendue de l'engagement d'une caution solidaire",
      valeur: "toute la dette du locataire, dans la limite des sommes pour lesquelles la caution s'est engagée",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-04",
      citation:
        "La caution peut être poursuivie pour toute la dette dont le locataire est redevable, mais dans la limite des sommes pour lesquelles elle s'est engagée.",
    },
    {
      fait: "Saisie des biens de la caution",
      valeur: "biens personnels, revenus et logement saisissables si la caution ne rembourse pas",
      source: F31267,
      titreSource: T31267,
      releveLe: "2026-11-04",
      citation:
        "Si la caution ne rembourse pas les dettes locatives, ses biens personnels, ses revenus et son logement (s'il lui appartient) peuvent être saisis",
    },
    {
      fait: "Contenu obligatoire de l'acte pour une caution personne physique",
      valeur: "mention exprimant que la caution connaît la nature et l'étendue de son engagement",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-04",
      citation:
        "une mention exprimant clairement que la caution a connaissance de la nature et de l'étendue de son engagement",
    },
    {
      fait: "Résiliation d'un cautionnement à durée indéterminée",
      valeur: "possible à tout moment par lettre recommandée, sans l'accord du bailleur",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-04",
      citation:
        "elle peut résilier le cautionnement à tout moment (par lettre recommandée avec demande d'avis de réception) sans l'accord du bailleur",
    },
    {
      fait: "Effet de la résiliation",
      valeur: "l'engagement prend fin à l'expiration du bail en cours",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-04",
      citation: "toutefois son engagement ne prendra fin qu'à l'expiration du bail en cours.",
    },
    {
      fait: "Garant de plusieurs colocataires",
      valeur: "l'acte désigne le colocataire dont le départ met fin à l'engagement, sinon le cautionnement est nul",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-04",
      citation:
        "Si la caution s'engage pour plusieurs colocataires, l'acte doit désigner celui dont le départ mettra fin à l'engagement de la caution.",
    },
    {
      fait: "Information de la caution par un bailleur professionnel",
      valeur: "dès le premier impayé non régularisé dans le mois",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-04",
      citation:
        "Lorsque le bailleur est un professionnel, il doit informer la caution dès le premier impayé non régularisé dans le mois",
    },
    {
      fait: "Droit de la consommation et caution d'un bail d'habitation",
      valeur: "dispositions protectrices du Code de la consommation écartées, la loi du 6 juillet 1989 seule applicable",
      source: CONSO,
      titreSource: TCONSO,
      releveLe: "2026-11-04",
      citation:
        "l'application des dispositions protectrices des consommateurs, telles que prévue par le Code de la consommation, est exclue lorsqu'une personne physique s'engage en qualité de caution.",
    },
    {
      fait: "Même solution pour un bailleur professionnel",
      valeur: "la décision vaut aussi quand le bailleur exerce une activité professionnelle",
      source: CONSO,
      titreSource: TCONSO,
      releveLe: "2026-11-04",
      citation:
        "Cette solution s'applique également au bailleur qui exerce une activité professionnelle et qui peut être ainsi assimilé à un créancier professionnel.",
    },
    {
      fait: "Réforme des sûretés signalée par l'ANIL",
      valeur: "le droit des sûretés personnelles a fait l'objet d'une réforme importante",
      source: CONSO,
      titreSource: TCONSO,
      releveLe: "2026-11-04",
      citation: "le droit des sûretés personnelles a récemment fait l'objet d'une importante réforme.",
    },
  ],
  corps: `
## Peut-on se porter garant pour plusieurs locataires à la fois ? {#nombre}
Oui : ni Service-public ni l'ANIL ne fixent de nombre maximal de cautionnements. Le seul frein est pratique : chaque acte engage vos revenus et vos biens, et chaque propriétaire juge vos garanties financières avec les pièces que vous lui remettez. Le [guide du garant](/guides/garant-caution) détaille le contenu d'un acte.

Un parent qui garantit deux enfants dans deux logements signe donc deux actes, avec deux propriétaires qui ne savent rien l'un de l'autre. C'est à vous de mesurer ce que vous pourriez payer si les deux locataires cessaient de payer en même temps.

## Que regarde le propriétaire quand vous êtes déjà garant ailleurs ? {#revenus}
Il regarde vos justificatifs. Selon Service-public, la caution doit fournir des pièces prouvant qu'elle a des garanties financières suffisantes pour payer les éventuels impayés du locataire. La liste des pièces porte sur l'identité, le domicile, la situation professionnelle et les ressources ; elle ne prévoit pas de pièce sur vos autres engagements.

Le propriétaire compare donc vos revenus au loyer qu'il vous demande de garantir, sans toujours savoir que vous avez signé ailleurs. La fiche officielle n'impose pas de lui dire que vous avez signé ailleurs, mais vous savez mieux que lui ce que vous pouvez payer. Sur le niveau de revenus attendu, voyez [le revenu minimum d'un garant](/blog/revenu-minimum-garant-location).

## Le risque est-il multiplié quand on garantit plusieurs loyers ? {#risque}
Oui, il s'additionne. Avec une caution solidaire, le propriétaire peut vous réclamer toute la dette du locataire, dans la limite des sommes pour lesquelles vous vous êtes engagé. Deux actes solidaires signifient deux dettes possibles, sans partage entre elles, et vos biens personnels, vos revenus et votre logement peuvent être saisis si vous ne payez pas.

Deux protections existent quand même. Un bailleur professionnel doit vous informer dès le premier impayé non régularisé dans le mois, selon l'ANIL. Et si l'acte ne précise aucune durée, vous pouvez le résilier par lettre recommandée, sans l'accord du bailleur ; l'engagement ne prend alors fin qu'à l'expiration du bail en cours.

## La règle de proportionnalité protège-t-elle le garant d'un locataire ? {#proportionnalite}
Ne comptez pas dessus. La Cour de cassation a jugé le 17 février 2022 que la caution d'un bail d'habitation relève de la loi du 6 juillet 1989 et que les protections du Code de la consommation sont écartées, même si le bailleur est un professionnel, d'après l'ANIL qui résume la décision.

Cette décision porte sur l'ancien régime ; l'ANIL signale elle-même que le droit des sûretés personnelles a ensuite été réformé. Aucune décision ne tranche encore, à notre connaissance, ce que devient la règle de proportionnalité pour un bail d'habitation depuis cette réforme. Faute de certitude, évaluez votre engagement comme s'il pouvait être réclamé en entier, et posez la question à votre ADIL avant de signer.

## Un garant de plusieurs colocataires doit-il signer un acte particulier ? {#colocation}
Oui, l'acte doit être précis. Si vous vous portez caution pour plusieurs colocataires, il doit désigner celui dont le départ mettra fin à votre engagement. À défaut de cette précision, l'ANIL indique que le cautionnement est nul.

Si vous garantissez un seul colocataire, l'acte doit l'identifier. Dans les deux cas, chaque acte doit faire apparaître une mention exprimant clairement que vous connaissez la nature et l'étendue de votre engagement. Pour comparer avec la garantie par deux garants pour un seul locataire, voyez [deux garants pour un même bail](/blog/deux-garants-location).
`,
});
