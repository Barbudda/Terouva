import { article } from "@/lib/blog-format";

const F1194 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1194";
const T1194 = "Service-public.gouv.fr · Émancipation d'un mineur";
const F1169 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169";
const T1169 = "Service-public.gouv.fr · Futur locataire : justificatifs à donner au propriétaire";

export default article({
  slug: "a-quel-age-louer-un-appartement",
  titre: "À quel âge peut-on louer un appartement ?",
  titreSeo: "À quel âge peut-on louer un appartement ?",
  description:
    "À 18 ans, ou dès 16 ans pour un mineur émancipé. Le cas du mineur logé par ses parents, Visale ouverte avant 18 ans, et le dossier d'un jeune majeur.",
  chapeau:
    "À 18 ans : c'est l'âge auquel on signe seul un bail. Avant, seul un mineur émancipé, ce qui n'est possible qu'après 16 ans, peut le faire comme un majeur. Un mineur non émancipé est logé par ses parents. À 18 ans, le dossier tient avec vos revenus ou votre bourse, un garant et souvent la garantie Visale.",
  publieLe: "2026-11-04",
  pilier: "B",
  format: "question",
  guidePilier: "/guides/dossier-de-location",
  guidesLies: ["/guides/garantie-visale", "/guides/garant-caution"],
  outilLie: "/outils/dossier-de-location",
  statut: "brouillon",
  requete: "à quel âge peut-on avoir un appartement",
  faits: [
    {
      fait: "On reste juridiquement mineur jusqu'à 18 ans révolus",
      valeur: "18 ans révolus",
      source: F1194,
      titreSource: T1194,
      releveLe: "2026-11-04",
      citation: "il reste juridiquement mineur jusqu'à ses 18 ans révolus",
    },
    {
      fait: "L'émancipation permet au mineur d'accomplir seul les actes qui demandent la majorité",
      valeur: "accomplir seul les actes nécessitant la majorité légale",
      source: F1194,
      titreSource: T1194,
      releveLe: "2026-11-04",
      citation: "un mineur est juridiquement assimilé à un majeur et peut accomplir seul les actes nécessitant la majorité légale",
    },
    {
      fait: "La demande d'émancipation suppose 16 ans passés",
      valeur: "16 ans passés",
      source: F1194,
      titreSource: T1194,
      releveLe: "2026-11-04",
      citation: "Le mineur doit avoir 16 ans passés (c'est-à-dire 16 ans et 1 jour ) pour que la demande puisse être faite.",
    },
    {
      fait: "Le mineur émancipé est capable de tous les actes de la vie civile",
      valeur: "capable, comme un majeur, de tous les actes de la vie civile",
      source: F1194,
      titreSource: T1194,
      releveLe: "2026-11-04",
      citation: "Le mineur émancipé est capable, comme un majeur, de tous les actes de la vie civile",
    },
    {
      fait: "Visale est ouverte aux locataires d'au moins 17 ans et 10 mois",
      valeur: "au moins 17 ans et 10 mois",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F33453",
      titreSource: "Service-public.gouv.fr · Garantie Visale : caution pour le locataire",
      releveLe: "2026-11-04",
      citation: "Tous les locataires âgés d'au moins 17 ans et 10 mois",
    },
    {
      fait: "Justificatif de domicile possible : l'attestation sur l'honneur de l'hébergeant",
      valeur: "attestation sur l'honneur de l'hébergeant",
      source: F1169,
      titreSource: T1169,
      releveLe: "2026-11-04",
      citation: "attestation sur l'honneur de l'hébergeant indiquant que le locataire réside à son domicile",
    },
    {
      fait: "L'âge fait partie des critères discriminatoires interdits pour écarter un candidat",
      valeur: "âge",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14750",
      titreSource: "Service-public.gouv.fr · Discrimination à la location d'un logement",
      releveLe: "2026-11-04",
      citation: "il est interdit de retenir un critère considéré comme discriminatoire (origine, sexe, âge, orientation sexuelle, etc.)",
    },
  ],
  corps: `
## À partir de quel âge peut-on signer un bail ? {#age}
À 18 ans. On reste juridiquement mineur jusqu'à ses 18 ans révolus, et un bail est un contrat que l'on signe seul à la majorité. Le jour de votre anniversaire, vous pouvez donc louer à votre nom, comme n'importe quel adulte, avec les mêmes pièces dans votre dossier et les mêmes droits face au propriétaire.

Aucun âge minimum plus élevé n'existe pour louer, et le propriétaire ne peut pas écarter un candidat à cause de son âge : il juge la situation financière, pas la date de naissance. Les pièces qu'il peut demander sont dans le guide du [dossier de location](/guides/dossier-de-location).

## Un mineur peut-il louer un appartement ? {#mineur}
Seul, uniquement s'il est émancipé. L'émancipation assimile le mineur à un majeur : il peut accomplir seul les actes qui demandent la majorité, et donc signer un bail. La demande n'est possible qu'à partir de 16 ans passés, et elle passe par le juge. Sans émancipation, un mineur ne signe pas seul.

L'émancipation est une décision lourde pour la famille : elle ne se demande pas pour un logement seulement. Dans la plupart des cas, la question se règle autrement.

## Comment loger un mineur qui part étudier ou travailler ? {#loger-un-mineur}
Par ses parents. Un jeune de 17 ans qui entre dans une école loin de chez lui vit dans un logement que ses parents louent pour lui. Le bail, l'assurance et le paiement passent alors par les parents, qui signent à leur nom.

Pour la forme exacte du bail dans ce cas, l'ADIL de votre département peut vous renseigner. Le jour des 18 ans, rien n'oblige à changer de logement, mais le bail ne passe au nom du jeune que par un nouveau contrat ou un avenant accepté par le propriétaire.

## La garantie Visale est-elle ouverte avant 18 ans ? {#visale}
Oui, de peu. Service-public indique que Visale est ouverte aux locataires âgés d'au moins 17 ans et 10 mois. Un futur étudiant peut donc demander son visa pendant l'été qui précède la rentrée, avant même sa majorité, pour le présenter le jour où il signe. La garantie reste ouverte à 30 ans ou moins, quel que soit le statut.

Les conditions de loyer et de ressources, qui dépendent du statut et de la ville, sont dans le guide de la [garantie Visale](/guides/garantie-visale).

## Que présenter quand on a 18 ans et jamais loué ? {#dossier-18-ans}
Les pièces de la liste officielle, adaptées à votre cas. Pour le domicile, l'attestation sur l'honneur de vos parents, qui vous hébergent, remplace les quittances que vous n'avez pas. Pour les ressources, votre contrat, vos bulletins ou votre avis de bourse. Ajoutez une garantie : un garant ou Visale, qui rassure un propriétaire sur un premier dossier.

Le cas du dossier sans historique est détaillé dans [louer son premier appartement](/blog/louer-son-premier-appartement), et l'attestation dans [l'article qui lui est consacré](/blog/attestation-hebergement-dossier-location). La [checklist de dossier](/outils/dossier-de-location) donne vos pièces selon votre situation.
`,
});
