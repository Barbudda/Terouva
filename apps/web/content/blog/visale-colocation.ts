import { article } from "@/lib/blog-format";

export default article({
  slug: "visale-colocation",
  titre: "Visale en colocation : bail unique ou bail individuel ?",
  titreSeo: "Visale en colocation : bail unique ou individuel",
  description:
    "À deux sur un bail unique, un colocataire éligible suffit. À trois ou plus, Visale recommande un bail par colocataire. Ce que ça change pour le loyer.",
  chapeau:
    "Visale couvre la colocation. À deux sur un même bail, il suffit qu'un des colocataires soit éligible, et les ressources des deux comptent pour le loyer maximum. À partir de trois, Visale recommande un bail indépendant par colocataire, chacun avec son propre visa et son propre loyer maximum.",
  publieLe: "2026-11-23",
  pilier: "C",
  format: "question",
  guidePilier: "/guides/garantie-visale",
  guidesLies: ["/guides/garant-caution", "/guides/louer-sans-garant"],
  statut: "brouillon",
  requete: "visale colocation",
  faits: [
    {
      fait: "À deux colocataires, un seul visa suffit si l'un des deux est éligible",
      valeur: "2 colocataires sur le même visa, dès que l'un d'eux est éligible",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F33453",
      titreSource: "Service-public.gouv.fr · Garantie Visale : caution pour le locataire",
      releveLe: "2026-11-04",
      citation: "dès que l'un d'eux est éligible. Dans ce cas, les ressources des 2 colocataires sont pris en compte pour calculer le loyer maximum.",
    },
    {
      fait: "À trois colocataires ou plus, un bail indépendant par colocataire est recommandé",
      valeur: "à partir de 3 colocataires, un bail indépendant chacun",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F33453",
      titreSource: "Service-public.gouv.fr · Garantie Visale : caution pour le locataire",
      releveLe: "2026-11-04",
      citation: "il est recommandé que chaque colocataire signe un bail indépendant avec le bailleur.",
    },
    {
      fait: "Chaque colocataire fait alors sa propre demande de visa avec ses propres ressources",
      valeur: "une demande individuelle de visa par colocataire",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F33453",
      titreSource: "Service-public.gouv.fr · Garantie Visale : caution pour le locataire",
      releveLe: "2026-11-04",
      citation: "Chaque colocataire doit faire une demande individuelle de visa, en renseignant ses propres ressources pour le calcul de son loyer maximum.",
    },
    {
      fait: "Avec un bail individuel, le loyer ne dépasse pas le montant du visa",
      valeur: "un loyer qui ne dépasse pas le montant indiqué sur le visa",
      source: "https://www.visale.fr/vos-questions/faq-bailleurs/les-conditions-deligibilite-locataire-bail-logement/",
      titreSource: "Visale.fr · Les conditions d'éligibilité (locataire, bail, logement)",
      releveLe: "2026-11-04",
      citation: "Chaque colocataire fait alors une demande de visa individuel et signe un bail dont le loyer ne devra pas dépasser le montant indiqué sur le visa.",
    },
    {
      fait: "À deux, le lien familial entre colocataires ne compte pas",
      valeur: "avec ou sans lien familial entre les colocataires",
      source: "https://www.visale.fr/vos-questions/faq-bailleurs/les-conditions-deligibilite-locataire-bail-logement/",
      titreSource: "Visale.fr · Les conditions d'éligibilité (locataire, bail, logement)",
      releveLe: "2026-11-04",
      citation: "Bail signé par deux colocataires (avec ou sans lien familial entre les colocataires)",
    },
  ],
  corps: `
## Visale couvre-t-elle une colocation à deux sur un même bail ? {#a-deux}
Oui. Quand deux colocataires signent le même bail, un seul visa suffit pour les deux, dès que l'un d'eux remplit les conditions de Visale. Les ressources des deux colocataires sont additionnées pour calculer le loyer maximum garanti. Le lien entre vous ne compte pas : frères et sœurs, couple ou amis sont traités de la même façon.

Concrètement, si l'un de vous a 30 ans ou moins et que l'autre en a plus, la demande peut partir de celui qui est éligible. Les conditions d'âge, de statut et de loyer sont détaillées dans le guide de la [garantie Visale](/guides/garantie-visale).

## Et à trois colocataires ou plus ? {#a-trois}
À partir de trois colocataires, Visale recommande que chacun signe un bail indépendant avec le propriétaire. Chaque colocataire fait alors sa propre demande de visa, avec ses propres ressources, et obtient son propre loyer maximum. Le loyer de son bail ne doit pas dépasser le montant inscrit sur son visa.

Cela change la façon de chercher : une colocation à trois sur un bail unique se prête mal à Visale. Avant de répondre à une annonce de grande colocation, demandez au propriétaire s'il accepte des baux individuels, une chambre par contrat.

## Bail unique ou bail individuel : lequel choisir avec Visale ? {#choisir}
À deux, le bail unique est le plus simple : un seul visa, des ressources additionnées, donc un loyer maximum plus haut. À trois ou plus, le bail individuel est celui que Visale recommande, parce que chaque visa garantit le loyer d'un seul colocataire. Le choix dépend donc d'abord du nombre de colocataires.

Le bail individuel a un autre avantage : chacun part quand il veut, sans engager les autres. Avec un bail unique, le départ d'un colocataire pose la question de la solidarité entre ceux qui restent et de la caution du partant. Le guide du [garant et de la caution](/guides/garant-caution) explique combien de temps un garant reste tenu en colocation.

## Que faire si Visale ne convient pas à votre colocation ? {#refus}
Si le propriétaire ne veut pas de Visale, si un colocataire a un garant et pas l'autre, ou si Visale ne couvre pas votre situation, d'autres solutions existent. Elles sont comparées, avec ce qu'elles coûtent et ce qu'elles demandent, dans le guide pour [louer sans garant](/guides/louer-sans-garant). Commencez par celle qui ne coûte rien.

Le plus efficace reste de présenter le visa dès le premier message, avec les deux noms et les ressources du foyer : le propriétaire voit tout de suite que la question du garant est réglée.
`,
});
