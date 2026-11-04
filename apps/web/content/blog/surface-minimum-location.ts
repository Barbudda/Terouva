import { article } from "@/lib/blog-format";

export default article({
  slug: "surface-minimum-location",
  titre: "Surface minimum d'un logement en location : vérifier l'annonce avant de répondre",
  titreSeo: "Surface minimum d'un logement en location",
  description:
    "9 m² et 2,20 m sous plafond, ou 20 m³ : la règle de décence, ce qu'elle ne dit pas des occupants, et quoi faire si la surface du bail est fausse.",
  chapeau:
    "Un logement loué doit avoir au moins une pièce principale de 9 m² avec 2,20 m sous plafond, ou de 20 m³. Les seuils par personne servent aux aides au logement, pas au bail. Vérifiez aussi la surface écrite dans le bail : une erreur de plus de 5 % fait baisser le loyer.",
  publieLe: "2026-11-04",
  pilier: "D",
  format: "question",
  guidePilier: "/guides/repondre-a-une-annonce-de-location",
  guidesLies: ["/guides/dossier-de-location"],
  statut: "publie",
  requete: "surface minimum location",
  faits: [
    {
      fait: "Surface minimale d'un logement décent",
      valeur: "une pièce principale de 9 m² avec 2,20 m sous plafond, ou de 20 m³",
      source: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000217471",
      titreSource: "Légifrance · Décret n° 2002-120 du 30 janvier 2002 (logement décent), article 4",
      releveLe: "2026-11-04",
      citation:
        "une surface habitable au moins égale à 9 mètres carrés et une hauteur sous plafond au moins égale à 2,20 mètres",
    },
    {
      fait: "Surface exigée pour l'aide au logement en colocation",
      valeur: "16 m² pour 2 colocataires, 9 m² de plus par colocataire, jusqu'à 78 m² pour 8 personnes et plus",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2042",
      titreSource: "Service-public.gouv.fr · Logement à louer décent",
      releveLe: "2026-11-04",
      citation: "pour 2 colocataires. Pour chaque colocataire supplémentaire, il faut 9",
    },
    {
      fait: "Chambre minimale quand chaque colocataire signe son propre bail",
      valeur: "une chambre d'au moins 9 m² et 20 m³ par colocataire",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2042",
      titreSource: "Service-public.gouv.fr · Logement à louer décent",
      releveLe: "2026-11-04",
      citation: "Chaque colocataire doit avoir une chambre d'une surface au moins égale à 9",
    },
    {
      fait: "Surface du bail supérieure de plus de 5 % à la réalité",
      valeur: "plus de 5 % : diminution de loyer proportionnelle à l'écart",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F920",
      titreSource: "Service-public.gouv.fr · Rédaction du bail d'habitation",
      releveLe: "2026-11-04",
      citation:
        "le locataire peut demander au propriétaire une diminution de loyer proportionnelle à l'écart constaté",
    },
    {
      fait: "Surface absente du bail",
      valeur: "mise en demeure du propriétaire dans le mois qui suit la signature",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F920",
      titreSource: "Service-public.gouv.fr · Rédaction du bail d'habitation",
      releveLe: "2026-11-04",
      citation:
        "Si la surface habitable du logement loué n'est pas mentionnée dans le bail, le locataire peut mettre en demeure",
    },
  ],
  corps: `
## Quelle est la surface minimum d'un logement en location ? {#surface-minimum}
Un logement loué comme résidence principale doit avoir au moins une pièce principale de 9 m² avec 2,20 m sous plafond, ou d'un volume de 20 m³. C'est l'un des critères de décence fixés par un décret de 2002. Un studio sous ces seuils ne peut pas être loué comme résidence principale, quel que soit son prix.

Le règlement sanitaire de votre département peut être plus exigeant. Avant de répondre à une annonce, regardez la surface annoncée et la hauteur sous plafond si elle est indiquée, surtout pour un studio sous les toits. Le guide [répondre à une annonce de location](/guides/repondre-a-une-annonce-de-location) montre quoi demander dans votre premier message.

## Faut-il une surface minimum par personne pour louer ? {#par-personne}
Non, pas pour signer un bail : la règle de décence porte sur le logement, pas sur le nombre d'occupants. Les surfaces par personne que l'on trouve en cherchant « pour 2 personnes » ou « pour 4 personnes » viennent d'autres règles, en particulier celles des aides au logement, qui peuvent vous concerner si vous comptez en demander une.

En colocation, l'aide au logement demande par exemple 16 m² pour 2 colocataires, puis 9 m² de plus par colocataire, jusqu'à 78 m² pour 8 personnes et plus. Si vous comptez sur cette aide, vérifiez la surface avant de candidater.

## Quelle surface pour une colocation ? {#colocation}
Tout dépend du contrat. Avec un bail unique signé par tous, la règle est celle de n'importe quel logement : une pièce principale de 9 m² et 2,20 m sous plafond. Quand chaque colocataire signe son propre bail, chacun doit avoir une chambre d'au moins 9 m² et 20 m³, sans compter les pièces communes.

## Que faire si la surface du bail est fausse ? {#surface-fausse}
Si le bail indique une surface plus grande que la réalité de plus de 5 %, vous pouvez demander au propriétaire une baisse de loyer proportionnelle à l'écart, par lettre recommandée. Si la surface n'est pas écrite du tout, vous pouvez le mettre en demeure de l'indiquer dans le mois qui suit la signature.

Mesurez donc le logement à l'entrée, pièce par pièce, et gardez vos relevés avec l'[état des lieux](/guides/etat-des-lieux). Une annonce qui ne donne pas la surface mérite une question avant la visite, et un [dossier de location](/guides/dossier-de-location) prêt vous permet de répondre vite une fois la réponse obtenue.
`,
});
