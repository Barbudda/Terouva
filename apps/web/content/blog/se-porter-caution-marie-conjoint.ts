import { article } from "@/lib/blog-format";

const F835 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F835";
const T835 = "Service-public.gouv.fr · Mariage sans contrat : régime de la communauté réduite aux acquêts";

export default article({
  slug: "se-porter-caution-marie-conjoint",
  titre: "Se porter garant quand on est marié : le conjoint doit-il signer ?",
  titreSeo: "Garant marié : le conjoint doit-il signer ?",
  description:
    "Non, mais sans son accord exprès la caution n'engage que vos biens propres et vos revenus. Ce que change le régime, et ce que verra le propriétaire.",
  chapeau:
    "Non, un époux peut se porter caution seul. Marié sans contrat, il n'engage alors que ses biens propres et ses revenus ; si le conjoint donne son consentement exprès, l'engagement s'étend aux biens communs. Pour le locataire, le propriétaire juge la caution sur les revenus de celui qui signe, sauf si les deux époux s'engagent.",
  publieLe: "2026-11-04",
  pilier: "C",
  format: "question",
  guidePilier: "/guides/garant-caution",
  guidesLies: ["/guides/louer-sans-garant"],
  statut: "brouillon",
  requete: "se porter caution alors qu'on est marié",
  faits: [
    {
      fait: "Le régime sans contrat de mariage est la communauté réduite aux acquêts",
      valeur: "mariage sans contrat : communauté réduite aux acquêts",
      source: F835,
      titreSource: T835,
      releveLe: "2026-11-04",
      citation: "Mariage sans contrat : régime de la communauté réduite aux acquêts",
    },
    {
      fait: "L'époux qui se porte caution seul engage ses biens propres et ses revenus",
      valeur: "biens propres et revenus",
      source: F835,
      titreSource: T835,
      releveLe: "2026-11-04",
      citation: "Si vous vous engagez seul, vous engagez vos biens propres et vos revenus.",
    },
    {
      fait: "Avec le consentement exprès du conjoint, la caution porte aussi sur les biens communs",
      valeur: "consentement exprès : biens communs engagés",
      source: F835,
      titreSource: T835,
      releveLe: "2026-11-04",
      citation: "l'engagement porte aussi sur vos biens communs",
    },
    {
      fait: "Consentement exprès : donné de manière claire, explicite et sans ambiguïté",
      valeur: "clair, explicite et sans ambiguïté",
      source: F835,
      titreSource: T835,
      releveLe: "2026-11-04",
      citation: "De manière claire, explicite et sans ambiguïté",
    },
    {
      fait: "Biens propres : biens possédés avant le mariage, ou reçus par donation ou succession",
      valeur: "avant le mariage, donation ou succession",
      source: F835,
      titreSource: T835,
      releveLe: "2026-11-04",
      citation: "dont l'un de vous 2 est propriétaire avant le mariage Bien reçu par donation",
    },
    {
      fait: "La caution s'engage par écrit, dans un acte de cautionnement",
      valeur: "acte de cautionnement écrit",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F31267",
      titreSource: "Service-public.gouv.fr · Caution du locataire ou du colocataire",
      releveLe: "2026-11-04",
      citation: "à payer les dettes locatives dont est redevable le locataire mentionné dans l'acte de cautionnement",
    },
  ],
  corps: `
## Le conjoint doit-il signer l'acte de caution ? {#signer}
Non. Un époux peut se porter caution seul, sans la signature de l'autre. Mais la signature du conjoint change l'étendue de l'engagement : marié sans contrat, celui qui signe seul n'engage que ses biens propres et ses revenus. Les biens communs du couple ne sont engagés que si le conjoint donne son consentement exprès à la caution.

Le reste de l'acte ne change pas : il s'écrit, porte le montant du loyer et la durée de l'engagement, comme le décrit le guide du [garant et de la caution](/guides/garant-caution).

## Qu'engage un époux qui se porte caution seul ? {#seul}
Marié sans contrat, sous le régime de la communauté réduite aux acquêts, il engage ses biens propres, ceux qu'il avait avant le mariage ou qu'il a reçus par donation ou héritage, et ses revenus. En cas d'impayés, le propriétaire peut se tourner vers ces biens et ces revenus, pas vers la maison ou l'épargne communes.

C'est une protection pour le conjoint qui n'a rien signé. C'est aussi une limite pour le propriétaire, qui le sait souvent.

## Que change le consentement exprès du conjoint ? {#consentement}
Il étend l'engagement aux biens communs. Service-public le résume ainsi : si votre époux donne son consentement exprès à votre engagement de caution, l'engagement porte aussi sur vos biens communs. Le conjoint qui consent n'est pas caution lui-même pour autant ; il accepte seulement que le patrimoine commun réponde de la dette garantie.

« Exprès » veut dire clair, explicite et sans ambiguïté. En pratique, le conjoint l'écrit et le signe en même temps que l'acte, pour que personne ne puisse le discuter plus tard.

## Et si vous êtes marié sous un autre régime ? {#autre-regime}
La règle dépend alors de votre contrat de mariage, qui fixe ce que vous avez en commun et ce qui reste à chacun. Ce que la caution peut atteindre en découle. Relisez votre contrat, ou interrogez le notaire qui l'a rédigé : il sait ce que votre régime met en commun, et ce que votre signature engagerait.

Ce point ne change pas les pièces que le garant fournit, qui restent celles de la liste officielle.

## Pour le locataire, que change un garant marié ? {#dossier}
La solidité que le propriétaire voit. Il juge la caution sur les revenus et le patrimoine de celui qui s'engage ; un garant seul aux revenus modestes, marié à un conjoint qui gagne bien, ne rassure qu'à hauteur de ses propres revenus. Si les deux époux se portent caution, chacun s'engage par écrit, et le dossier compte leurs deux revenus.

Deux garants dans un même dossier sont possibles : le cas est détaillé dans [deux garants pour une location](/blog/deux-garants-location). Sans garant familial, les autres voies sont dans le guide [louer sans garant](/guides/louer-sans-garant).
`,
});
