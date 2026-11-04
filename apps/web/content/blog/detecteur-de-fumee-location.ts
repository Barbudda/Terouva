// Vague 8, ligne 22. Requête relevée sur forum (CommentÇaMarche) : « détecteur de fumée dans un logement loué ».
// Apport : la répartition officielle (propriétaire installe, occupant entretient), le meublé où le propriétaire garde
// tout, ce qu'on vérifie le jour de l'état des lieux, et les articles du Code de la construction en vigueur.

import { article } from "@/lib/blog-format";

const F19950 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F19950";
const T19950 = "Service-public.gouv.fr · Détecteur de fumée : sécurité incendie dans le logement";

export default article({
  slug: "detecteur-de-fumee-location",
  titre: "Détecteur de fumée en location : qui l'installe, qui l'entretient ?",
  titreSeo: "Détecteur de fumée en location : qui s'en charge ?",
  description:
    "Le propriétaire installe le détecteur, vous l'entretenez, sauf en meublé où il garde tout. Ce qu'on vérifie le jour de l'état des lieux et l'assurance.",
  chapeau:
    "Le propriétaire doit installer le détecteur de fumée ; l'occupant l'entretient et, si besoin, le remplace. En location meublée, le propriétaire garde installation, entretien et renouvellement. Le jour de l'état des lieux, il doit aussi vérifier que l'appareil fonctionne, et vous prévenez votre assureur.",
  publieLe: "2026-11-04",
  pilier: "D",
  format: "question",
  guidePilier: "/guides/etat-des-lieux",
  guidesLies: ["/guides/repondre-a-une-annonce-de-location", "/guides/depot-de-garantie"],
  statut: "publie",
  requete: "détecteur de fumée dans un logement loué",
  faits: [
    {
      fait: "Répartition entre propriétaire et occupant",
      valeur: "le propriétaire installe, l'occupant entretient et remplace si besoin",
      source: F19950,
      titreSource: T19950,
      releveLe: "2026-11-04",
      citation:
        "Le propriétaire doit installer le détecteur de fumée, tandis que l'occupant s'occupe de son entretien, et, si besoin, de son remplacement.",
    },
    {
      fait: "Vérification à l'état des lieux",
      valeur: "le propriétaire vérifie le bon fonctionnement lors de l'état des lieux",
      source: F19950,
      titreSource: T19950,
      releveLe: "2026-11-04",
      citation:
        "le propriétaire doit également vérifier le bon fonctionnement du détecteur de fumée lors de l'état des lieux",
    },
    {
      fait: "Location meublée",
      valeur: "le propriétaire assume installation, entretien et renouvellement",
      source: F19950,
      titreSource: T19950,
      releveLe: "2026-11-04",
      citation:
        "le propriétaire assume l'ensemble des obligations : installation, entretien, renouvellement. Cela concerne : Les locations meublées Les logements saisonniers",
    },
    {
      fait: "Nombre minimal",
      valeur: "au moins un détecteur par logement",
      source: F19950,
      titreSource: T19950,
      releveLe: "2026-11-04",
      citation: "Chaque logement (appartement, maison) doit être équipé d'au moins un détecteur de fumée",
    },
    {
      fait: "Marquage et norme",
      valeur: "marquage CE et norme NF EN 14604",
      source: F19950,
      titreSource: T19950,
      releveLe: "2026-11-04",
      citation:
        "Le détecteur de fumée doit impérativement comporter le marquage CE accompagné de la référence à la norme NF EN 14604",
    },
    {
      fait: "Emplacement",
      valeur: "fixé solidement au plafond",
      source: F19950,
      titreSource: T19950,
      releveLe: "2026-11-04",
      citation: "Le détecteur de fumée doit être fixé solidement au plafond.",
    },
    {
      fait: "Emplacement dans un logement avec couloir",
      valeur: "de préférence dans la circulation ou le dégagement (palier, couloir) qui dessert les chambres",
      source: F19950,
      titreSource: T19950,
      releveLe: "2026-11-04",
      citation: "installé de préférence dans la circulation ou dégagement (palier, couloir) desservant les chambres",
    },
    {
      fait: "Emplacement dans un studio",
      valeur: "le plus loin possible de la cuisine et de la salle de bain",
      source: F19950,
      titreSource: T19950,
      releveLe: "2026-11-04",
      citation:
        "(cas d'un studio), le détecteur de fumée doit être installé le plus loin possible de la cuisine et de la salle de bain.",
    },
    {
      fait: "Déclaration à l'assureur",
      valeur: "l'occupant prévient son assureur habitation avec une attestation et une preuve d'achat ou d'installation",
      source: F19950,
      titreSource: T19950,
      releveLe: "2026-11-04",
      citation:
        "l'occupant doit prévenir son assureur avec lequel il a souscrit son assurance habitation pour lui indiquer que le logement est équipé",
    },
    {
      fait: "Absence de détecteur et indemnisation",
      valeur: "l'assureur ne peut pas refuser d'indemniser, mais peut réduire l'indemnité s'il prouve l'aggravation",
      source: F19950,
      titreSource: T19950,
      releveLe: "2026-11-04",
      citation:
        "Même en l'absence de détecteur de fumée, l'assureur ne peut pas refuser d'indemniser en cas de sinistre",
    },
    {
      fait: "Textes applicables",
      valeur: "articles L142-1 à L142-4 et R142-1 à R142-5 du Code de la construction et de l'habitation",
      source: F19950,
      titreSource: T19950,
      releveLe: "2026-11-04",
      citation: "articles L142-1 à L142-4 Code de la construction et de l habitation : articles R142-1 à R142-5",
    },
  ],
  corps: `
## Qui doit fournir et installer le détecteur de fumée dans un logement loué ? {#qui}
Le propriétaire. Service-public indique qu'il doit installer le détecteur de fumée, et que chaque logement doit être équipé d'au moins un appareil. L'achat et la pose sont donc à sa charge, pas à la vôtre. Le détecteur doit porter le marquage CE et la référence à la norme NF EN 14604.

Si votre logement n'en a pas à l'entrée, notez-le à l'[état des lieux](/guides/etat-des-lieux) et demandez-le par écrit.

## Qui l'entretient et le remplace ? {#entretien}
L'occupant, c'est-à-dire vous. Selon Service-public, l'occupant s'occupe de l'entretien du détecteur et, si besoin, de son remplacement, par exemple quand les piles sont usées. Cette répartition vaut pour une location vide ; en meublé, elle change, comme on le voit plus bas.

Le détecteur doit être fixé solidement au plafond, de préférence dans le couloir ou le palier qui dessert les chambres. Dans un studio, la fiche demande de le placer le plus loin possible de la cuisine et de la salle de bain.

## Le propriétaire reste-t-il responsable en location meublée ? {#meuble}
Oui, il garde toutes les obligations. Pour les locations meublées, Service-public indique que le propriétaire assume l'installation, l'entretien et le renouvellement du détecteur, sans partage avec l'occupant, contrairement à la location vide. Il en va de même pour les logements saisonniers.

Si vous louez un meublé, les piles à changer ou l'appareil à remplacer ne sont donc pas à votre charge. Pour savoir si votre location est bien un meublé, voyez les [meubles obligatoires en location meublée](/blog/meubles-obligatoires-location-meublee).

## Que vérifier le jour de l'état des lieux d'entrée ? {#etat-des-lieux}
Trois choses : la présence d'au moins un détecteur, son marquage CE avec la norme NF EN 14604, et son bon fonctionnement. Service-public précise que, pour un logement loué, le propriétaire doit vérifier le bon fonctionnement du détecteur lors de l'état des lieux. Demandez-lui de l'essayer devant vous.

Faites inscrire dans le document la présence de l'appareil, son emplacement et le résultat du test. Si l'appareil manque ou ne sonne pas, notez-le dans les réserves et réclamez-le par écrit : le [guide de l'état des lieux](/guides/etat-des-lieux) explique comment compléter le document ensuite.

## Faut-il prévenir son assurance habitation ? {#assurance}
Oui, c'est à l'occupant de le faire. Il doit prévenir son assureur que le logement est équipé, en remettant une attestation accompagnée d'une preuve d'achat ou d'installation : facture, photo ou certificat de conformité. Service-public propose un modèle de lettre pour cette déclaration.

L'absence de détecteur n'est pas une cause de refus d'indemnisation : même sans appareil, l'assureur ne peut pas refuser d'indemniser en cas de sinistre. Il peut toutefois réduire l'indemnité s'il prouve que cette absence a aggravé les conséquences. Gardez donc la facture ou le message du propriétaire qui vous remet l'appareil.

## Quels articles de loi citer à un propriétaire qui conteste ? {#texte}
Les articles L142-1 à L142-4 du Code de la construction et de l'habitation, ainsi que les articles R142-1 à R142-5, que Service-public cite comme références. La fiche, que vous pouvez montrer au propriétaire, les range sous le détecteur de fumée.

Si un forum ou un ancien document cite un autre numéro d'article, vérifiez-le sur la fiche officielle avant de l'écrire dans une lettre. En cas de désaccord persistant, l'ADIL de votre département peut vous renseigner gratuitement ; le [guide du dépôt de garantie](/guides/depot-de-garantie) vous aide à garder vos preuves jusqu'à la sortie.
`,
});
