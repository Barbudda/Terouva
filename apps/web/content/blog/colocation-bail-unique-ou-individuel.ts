import { article } from "@/lib/blog-format";

export default article({
  slug: "colocation-bail-unique-ou-individuel",
  titre: "Colocation : bail unique ou bail individuel, ce que ça change pour vous",
  titreSeo: "Colocation : bail unique ou individuel ?",
  description:
    "Bail unique solidaire ou un bail par colocataire : qui paie si un colocataire ne paie plus, combien de temps après votre départ, ce que signe votre garant.",
  chapeau:
    "Avec un bail unique, tous les colocataires signent le même contrat, le plus souvent avec une clause de solidarité : chacun peut devoir le loyer des autres, jusqu'à six mois après la fin de son préavis. Avec un bail par colocataire, chacun ne doit que sa part. Votre garant s'engage en conséquence.",
  publieLe: "2026-11-04",
  pilier: "D",
  format: "question",
  guidePilier: "/guides/garant-caution",
  guidesLies: ["/guides/garantie-visale"],
  outilLie: "/outils/dossier-de-location",
  statut: "brouillon",
  requete: "colocation bail unique ou individuel",
  faits: [
    {
      fait: "Le bail unique contient le plus souvent une clause de solidarité",
      valeur: "le plus souvent une clause de solidarité",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F31267",
      titreSource: "Service-public.gouv.fr · Caution du locataire ou du colocataire dans un logement privé",
      releveLe: "2026-11-04",
      citation: "Dans la plupart des cas, ce bail unique contient une clause de solidarité",
    },
    {
      fait: "Avec la solidarité, chaque colocataire et sa caution doivent la totalité",
      valeur: "chacun et sa caution peuvent devoir la part des autres",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F31267",
      titreSource: "Service-public.gouv.fr · Caution du locataire ou du colocataire dans un logement privé",
      releveLe: "2026-11-04",
      citation:
        "chaque colocataire et sa caution respective s'engagent à payer la part des autres colocataires si ces derniers ne la paient pas",
    },
    {
      fait: "Solidarité du colocataire partant",
      valeur: "jusqu'à six mois après la fin du préavis, moins si un remplaçant arrive",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F31267",
      titreSource: "Service-public.gouv.fr · Caution du locataire ou du colocataire dans un logement privé",
      releveLe: "2026-11-04",
      citation: "Soit durant les 6 mois qui suivent la fin de son préavis",
    },
    {
      fait: "Un bail par colocataire : chacun doit sa part",
      valeur: "sa part du loyer et des charges, telle qu'écrite dans son bail",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F31267",
      titreSource: "Service-public.gouv.fr · Caution du locataire ou du colocataire dans un logement privé",
      releveLe: "2026-11-04",
      citation: "Le colocataire doit payer sa part du loyer et des charges, telle qu'indiquée dans le bail qu'il a signé",
    },
    {
      fait: "L'acte de cautionnement en colocation nomme le colocataire dont le départ libère la caution",
      valeur: "le colocataire dont le congé met fin à l'engagement",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F31267",
      titreSource: "Service-public.gouv.fr · Caution du locataire ou du colocataire dans un logement privé",
      releveLe: "2026-11-04",
      citation: "Le colocataire dont le préavis (congé) mettra fin à l'engagement de la caution",
    },
    {
      fait: "Un couple marié ou pacsé n'est pas une colocation",
      valeur: "la location à un couple marié ou pacsé n'est pas une colocation",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F31267",
      titreSource: "Service-public.gouv.fr · Caution du locataire ou du colocataire dans un logement privé",
      releveLe: "2026-11-04",
      citation: "La location exclusive d'un logement à un couple marié ou pacsé n'est pas une colocation",
    },
  ],
  corps: `
## Quelle différence entre bail unique et bail individuel ? {#difference}
Avec un bail unique, tous les colocataires signent le même contrat avec le propriétaire, et ce contrat contient le plus souvent une clause de solidarité. Avec des baux individuels, chacun signe son propre contrat pour sa chambre et l'usage des pièces communes. Si l'annonce ne le dit pas, demandez-le avant la visite.

Une location à un couple marié ou pacsé n'est pas une colocation : ces règles ne le concernent pas.

## Que change la clause de solidarité ? {#solidarite}
Avec une clause de solidarité, chaque colocataire et sa caution s'engagent à payer la part des autres si elle n'est pas payée. Si un colocataire cesse de payer, le propriétaire peut réclamer la totalité du loyer et des charges à n'importe lequel d'entre vous, puis à sa caution. Sans cette clause, chacun ne doit que sa part.

Avant de signer un bail unique, demandez donc qui sont les autres colocataires, depuis quand ils sont là, et si l'un d'eux compte partir bientôt.

## Combien de temps reste-t-on engagé après son départ ? {#depart}
Avec un bail unique et une clause de solidarité, le colocataire qui part et sa caution restent tenus de payer la part des autres pendant les six mois qui suivent la fin de son préavis. Cet engagement s'arrête plus tôt si un nouveau colocataire le remplace au bail pendant ce délai.

Avec un bail individuel, la règle est plus simple : vous payez votre part jusqu'à la fin de votre préavis, et rien ensuite pour les autres.

## Que signe votre garant en colocation ? {#garant}
Votre garant s'engage pour vous, mais avec un bail unique solidaire il peut, par ricochet, devoir la part d'un autre colocataire que vous ne pouvez pas couvrir. L'acte de cautionnement doit nommer le colocataire dont le départ met fin à son engagement. Relisez cet acte avec lui avant de signer, et voyez le guide [garant et caution](/guides/garant-caution).

Si vous n'avez pas de garant personnel, la [garantie Visale](/guides/garantie-visale) existe aussi en colocation. Dans les deux cas, préparez votre [dossier de location](/outils/dossier-de-location) avant la visite, avec celui de votre garant.
`,
});
