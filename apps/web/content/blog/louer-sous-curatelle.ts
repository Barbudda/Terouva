import { article } from "@/lib/blog-format";

const F2094 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F2094";
const T_F2094 = "Service-public.gouv.fr · Curatelle d'une personne majeure";
const ART467 = "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006427797";
const ART469 = "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006427801";
const ART472 = "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006427805";

export default article({
  slug: "louer-sous-curatelle",
  titre: "Louer un appartement sous curatelle : qui signe le bail ?",
  titreSeo: "Louer sous curatelle : qui signe le bail ?",
  description:
    "Curatelle simple ou renforcée : qui signe le bail, quelles pièces donner au propriétaire, et ce qu'il ne peut pas vous demander sur votre mesure.",
  chapeau:
    "Cela dépend de votre mesure. En curatelle simple, service-public range la conclusion d'un bail parmi les actes de gestion courante, que vous faites seul. En curatelle renforcée, vous signez avec l'assistance du curateur, qui appose sa signature à côté de la vôtre et règle vos dépenses. Le jugement peut fixer une autre liste : lisez-le d'abord.",
  publieLe: "2026-11-15",
  pilier: "B",
  format: "cas-pratique",
  guidePilier: "/guides/dossier-de-location",
  guidesLies: ["/guides/refus-de-dossier", "/guides/louer-sans-garant"],
  statut: "publie",
  requete: "louer un appartement sous curatelle",
  faits: [
    {
      fait: "La personne protégée choisit son lieu de résidence",
      valeur: "choix du lieu de résidence par la personne protégée",
      source: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006428039",
      titreSource: "Légifrance · Article 459-2 du Code civil",
      releveLe: "2026-11-15",
      citation: "La personne protégée choisit le lieu de sa résidence.",
    },
    {
      fait: "En curatelle, l'assistance du curateur est requise pour les actes qui, en tutelle, demanderaient l'autorisation du juge",
      valeur: "assistance pour les actes soumis à autorisation en tutelle",
      source: ART467,
      titreSource: "Légifrance · Article 467 du Code civil",
      releveLe: "2026-11-15",
      citation: "La personne en curatelle ne peut, sans l'assistance du curateur, faire aucun acte qui, en cas de tutelle, requerrait une autorisation du juge",
    },
    {
      fait: "L'assistance se manifeste par la signature du curateur à côté de celle de la personne protégée",
      valeur: "signature du curateur à côté de la vôtre",
      source: ART467,
      titreSource: "Légifrance · Article 467 du Code civil",
      releveLe: "2026-11-15",
      citation: "l'assistance du curateur se manifeste par l'apposition de sa signature à côté de celle de la personne protégée",
    },
    {
      fait: "En curatelle simple, la personne accomplit seule les actes de gestion courante",
      valeur: "actes de gestion courante faits seul",
      source: F2094,
      titreSource: T_F2094,
      releveLe: "2026-11-15",
      citation: "la personne protégée accomplit seule les actes de gestion courante",
    },
    {
      fait: "Service-public donne la conclusion d'un bail d'habitation comme exemple d'acte de gestion courante",
      valeur: "conclusion d'un bail d'habitation, exemple d'acte d'administration",
      source: F2094,
      titreSource: T_F2094,
      releveLe: "2026-11-15",
      citation: "par exemple : conclusion d'un bail d'habitation ou ouverture d'un compte de dépôt",
    },
    {
      fait: "En curatelle renforcée, la personne s'engage avec l'assistance du curateur",
      valeur: "engagement avec l'assistance du curateur",
      source: F2094,
      titreSource: T_F2094,
      releveLe: "2026-11-15",
      citation: "il peut s'engager dans un acte uniquement avec l'assistance de son curateur",
    },
    {
      fait: "En curatelle renforcée, le curateur gère le compte et règle les dépenses",
      valeur: "le curateur règle les dépenses",
      source: F2094,
      titreSource: T_F2094,
      releveLe: "2026-11-15",
      citation: "le curateur gère le compte bancaire du majeur protégé et règle ses dépenses",
    },
    {
      fait: "En curatelle renforcée, le juge peut autoriser le curateur à conclure seul le bail",
      valeur: "bail conclu seul par le curateur, sur autorisation du juge",
      source: ART472,
      titreSource: "Légifrance · Article 472 du Code civil",
      releveLe: "2026-11-15",
      citation: "le juge peut autoriser le curateur à conclure seul un bail d'habitation ou une convention d'hébergement assurant le logement de la personne protégée",
    },
    {
      fait: "Service-public précise le cas : la personne ne fait pas les démarches pour se loger",
      valeur: "quand la personne n'effectue pas les démarches",
      source: F2094,
      titreSource: T_F2094,
      releveLe: "2026-11-15",
      citation: "lorsque le majeur protégé n'effectue pas les démarches pour se loger",
    },
    {
      fait: "Le curateur ne peut pas agir à la place de la personne",
      valeur: "pas de substitution du curateur",
      source: ART469,
      titreSource: "Légifrance · Article 469 du Code civil",
      releveLe: "2026-11-15",
      citation: "Le curateur ne peut se substituer à la personne en curatelle pour agir en son nom.",
    },
    {
      fait: "Si le curateur refuse son assistance, la personne peut demander au juge d'agir seule",
      valeur: "autorisation du juge en cas de refus du curateur",
      source: ART469,
      titreSource: "Légifrance · Article 469 du Code civil",
      releveLe: "2026-11-15",
      citation: "Si le curateur refuse son assistance à un acte pour lequel son concours est requis, la personne en curatelle peut demander au juge l'autorisation de l'accomplir seule.",
    },
    {
      fait: "En curatelle aménagée, le juge fixe la liste des actes faits seul",
      valeur: "liste fixée par le juge des tutelles",
      source: F2094,
      titreSource: T_F2094,
      releveLe: "2026-11-15",
      citation: "la liste des actes que la personne peut faire seule est fixée par le juge des tutelles",
    },
    {
      fait: "Le propriétaire ne peut exiger que les justificatifs de la liste autorisée",
      valeur: "aucun justificatif hors de la liste",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169",
      titreSource: "Service-public.gouv.fr · Quels justificatifs le propriétaire peut-il demander au locataire ?",
      releveLe: "2026-11-15",
      citation: "il existe une liste de justificatifs autorisés . le propriétaire a interdiction d'en exiger d'autres",
    },
    {
      fait: "Les pensions, prestations et allocations se justifient par leur relevé de versement",
      valeur: "justificatif de versement des pensions, prestations et allocations",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169",
      titreSource: "Service-public.gouv.fr · Quels justificatifs le propriétaire peut-il demander au locataire ?",
      releveLe: "2026-11-15",
      citation: "justificatif de versement des indemnités, retraites, pensions, prestations sociales et familiales et allocations perçues lors des 3 derniers mois",
    },
    {
      fait: "État de santé, perte d'autonomie et handicap sont des motifs de choix interdits",
      valeur: "état de santé, perte d'autonomie, handicap",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14750",
      titreSource: "Service-public.gouv.fr · Discrimination à la location d'un logement",
      releveLe: "2026-11-15",
      citation: "lieu de résidence état de santé perte d'autonomie handicap caractéristiques génétiques",
    },
    {
      fait: "L'article 225-1 du Code pénal liste les critères de discrimination",
      valeur: "vulnérabilité économique, état de santé, perte d'autonomie, handicap",
      source: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000045391831",
      titreSource: "Légifrance · Article 225-1 du Code pénal",
      releveLe: "2026-11-15",
      citation: "de leur lieu de résidence, de leur état de santé, de leur perte d'autonomie, de leur handicap",
    },
  ],
  corps: `
## Sous curatelle, pouvez-vous louer le logement de votre choix ? {#choix}
Oui. La loi le dit sans détour : la personne protégée choisit le lieu de sa résidence. La curatelle ne vous empêche ni de chercher, ni de répondre à une annonce, ni de louer. Elle règle seulement la manière dont vous signez certains actes, et cette manière dépend de la mesure que le juge a prononcée.

Avant de candidater, relisez votre jugement : il dit s'il s'agit d'une curatelle simple, renforcée ou aménagée, et il peut ajouter ou retirer des actes. Le reste de la candidature suit les règles de tout [dossier de location](/guides/dossier-de-location).

## En curatelle simple, qui signe le bail ? {#curatelle-simple}
En principe vous seul. La loi exige l'assistance du curateur pour les actes qui, en tutelle, demanderaient l'autorisation du juge. Service-public range la conclusion d'un bail d'habitation parmi les actes de gestion courante, que la personne en curatelle simple accomplit seule. Votre jugement peut toutefois prévoir autre chose : c'est lui qui fait foi.

Si un doute subsiste, ou si le propriétaire le demande, le plus simple est que votre curateur signe à côté de vous. C'est la forme que prend son assistance pour un acte écrit, et elle ne retire rien à votre place de locataire : le bail reste à votre nom.

## En curatelle renforcée, qui signe le bail ? {#curatelle-renforcee}
Vous, avec votre curateur. Service-public indique qu'en curatelle renforcée vous vous engagez avec son assistance, et qu'il appose sa signature à côté de la vôtre. Il gère aussi votre compte et règle vos dépenses : c'est donc lui qui paiera le loyer. Prévenez-le dès que vous visitez, pour qu'il soit disponible le jour de la signature.

Le curateur ne peut pas agir en votre nom à votre place. Le juge peut intervenir dans deux cas :
- en curatelle renforcée, le juge peut autoriser le curateur à conclure seul le bail qui assure votre logement, notamment quand vous ne faites pas les démarches pour vous loger ;
- à l'inverse, si votre curateur refuse de vous assister pour un acte où son concours est requis, vous pouvez demander au juge l'autorisation de signer seul.

En curatelle aménagée, le juge a fixé la liste des actes que vous pouvez faire seul : le bail y figure ou non, et le jugement le dit.

## Quelles pièces fournir au propriétaire ? {#pieces}
Les mêmes que tout candidat : identité, domicile, situation professionnelle, ressources. Le propriétaire ne peut exiger que les justificatifs de la liste autorisée, et il a interdiction d'en demander d'autres. Votre jugement de curatelle n'en fait pas partie. Si vos revenus sont des pensions ou des allocations, le justificatif de versement les prouve comme une fiche de paie.

En curatelle renforcée, le propriétaire saura de toute façon qu'un curateur intervient, puisqu'il signe. Le présenter tôt comme celui qui règle le loyer peut rassurer : le paiement passe par une personne chargée de gérer votre budget. Si vous n'avez pas de garant, le guide pour [louer sans garant](/guides/louer-sans-garant) compare les solutions.

## Un propriétaire peut-il refuser votre dossier à cause de la curatelle ? {#refus}
La curatelle ne figure pas, comme telle, dans la liste des motifs de discrimination du Code pénal. Mais cette liste comprend l'état de santé, la perte d'autonomie, le handicap et la particulière vulnérabilité résultant de la situation économique. Un refus fondé en réalité sur l'un de ces motifs est interdit, quel que soit le mot employé pour le justifier.

Le propriétaire reste libre de choisir son locataire sur d'autres critères, liés au paiement du loyer. Si un refus vous paraît tenir à votre santé ou à votre handicap, le guide sur le [refus de dossier](/guides/refus-de-dossier) explique comment le prouver et à qui le signaler.
`,
});
