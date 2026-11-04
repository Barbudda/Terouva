import { article } from "@/lib/blog-format";

export default article({
  slug: "assurance-loyers-impayes-garant",
  titre: "Le propriétaire a une assurance loyers impayés : peut-il vous demander un garant ?",
  titreSeo: "Assurance loyers impayés : un garant en plus ?",
  description:
    "Un propriétaire assuré contre les impayés ne peut pas exiger de caution, sauf d'un étudiant ou d'un apprenti. La règle, ses limites, et quoi répondre.",
  chapeau:
    "Non, en principe. Un propriétaire qui a souscrit une assurance contre les loyers impayés ne peut pas vous demander de caution, à peine de nullité. Deux exceptions : l'étudiant et l'apprenti, à qui il peut demander les deux. La règle ne touche pas le dépôt de garantie, qui reste dû.",
  publieLe: "2026-11-04",
  pilier: "C",
  format: "question",
  guidePilier: "/guides/garant-caution",
  guidesLies: ["/guides/louer-sans-garant", "/guides/dossier-de-location"],
  statut: "publie",
  requete: "assurance loyer impayé garant",
  faits: [
    {
      fait: "Un bailleur assuré ne peut pas demander de caution",
      valeur: "cautionnement interdit, à peine de nullité, au bailleur qui a souscrit une assurance ou une autre garantie",
      source: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000044073458",
      titreSource: "Légifrance · Article 22-1 de la loi n° 89-462 du 6 juillet 1989",
      releveLe: "2026-11-04",
      citation: "Le cautionnement ne peut pas être demandé, à peine de nullité, par un bailleur qui a souscrit une assurance, ou toute autre forme de garantie",
    },
    {
      fait: "Exception pour l'étudiant et l'apprenti",
      valeur: "sauf logement loué à un étudiant ou un apprenti",
      source: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000044073458",
      titreSource: "Légifrance · Article 22-1 de la loi n° 89-462 du 6 juillet 1989",
      releveLe: "2026-11-04",
      citation: "sauf en cas de logement loué à un étudiant ou un apprenti",
    },
    {
      fait: "La règle ne vise pas le dépôt de garantie",
      valeur: "le dépôt de garantie n'est pas concerné",
      source: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000044073458",
      titreSource: "Légifrance · Article 22-1 de la loi n° 89-462 du 6 juillet 1989",
      releveLe: "2026-11-04",
      citation: "Cette disposition ne s'applique pas au dépôt de garantie mentionné à l'article 22.",
    },
    {
      fait: "Bailleur personne morale : caution limitée",
      valeur: "caution seulement d'un organisme fixé par décret, ou pour un étudiant non boursier",
      source: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000044073458",
      titreSource: "Légifrance · Article 22-1 de la loi n° 89-462 du 6 juillet 1989",
      releveLe: "2026-11-04",
      citation: "ou si le logement est loué à un étudiant ne bénéficiant pas d'une bourse de l'enseignement supérieur",
    },
  ],
  corps: `
## Un propriétaire assuré peut-il exiger un garant ? {#regle}
Non, sauf exception. L'article 22-1 de la loi du 6 juillet 1989 interdit au propriétaire qui a souscrit une assurance, ou toute autre garantie couvrant les obligations du locataire, de demander une caution. La sanction est la nullité : un acte de cautionnement signé malgré cette interdiction ne vaut rien. La règle vise l'assurance contre les loyers impayés.

Le guide du [garant et de la caution](/guides/garant-caution) détaille ce qu'est un cautionnement et ce qu'il engage. Ici, la question est plus étroite : peut-on cumuler les deux protections sur le dos du locataire ?

## Qui reste concerné par une demande de garant ? {#exceptions}
L'étudiant et l'apprenti. Pour un logement loué à l'un d'eux, la loi permet au propriétaire assuré de demander aussi une caution. Pour tous les autres candidats, salariés, indépendants ou demandeurs d'emploi, le cumul est interdit. Si vous êtes étudiant ou apprenti, préparez donc les deux : votre garant et votre dossier.

Une règle voisine vaut pour les propriétaires personnes morales, comme une société ou une banque (hors société civile familiale) : ils ne peuvent demander une caution que si elle vient d'un organisme fixé par décret, ou si le logement est loué à un étudiant non boursier.

## Le dépôt de garantie est-il aussi interdit ? {#depot}
Non. La loi le dit expressément : l'interdiction de cumul ne s'applique pas au dépôt de garantie. Un propriétaire assuré peut donc vous demander un dépôt, dans les plafonds habituels, en plus de son assurance. Seule la caution d'une personne est exclue, pas la somme versée à la signature.

## Comment savoir si le propriétaire est assuré ? {#savoir}
En le lui demandant, simplement et par écrit. La question est légitime : la réponse change ce que vous devez fournir. Si le propriétaire confirme qu'il est assuré et vous demande malgré tout un garant, rappelez-lui la règle de l'article 22-1, sans agressivité, et proposez le reste de votre [dossier de location](/guides/dossier-de-location).

Si vous n'avez pas de garant, de toute façon, plusieurs solutions existent, comparées dans le guide pour [louer sans garant](/guides/louer-sans-garant). Posez la question de l'assurance au premier échange, avant d'avoir mobilisé un proche.
`,
});
