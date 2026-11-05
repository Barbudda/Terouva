import { article } from "@/lib/blog-format";

const F31267 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F31267";
const T31267 = "Service-public.gouv.fr · Caution du locataire ou du colocataire dans un logement privé";
const F33453 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F33453";
const T33453 = "Service-public.gouv.fr · Garantie Visale : caution pour le locataire";
const F1169 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169";
const T1169 = "Service-public.gouv.fr · Futur locataire : justificatifs à donner au propriétaire";
const ANIL_PG = "https://www.anil.org/parole-expert-logement-location-pas-garant/";
const TANIL_PG = "ANIL · Je cherche une location, mais je n'ai pas de garant";
const L221 = "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000044073458";
const TL221 = "Légifrance · Loi du 6 juillet 1989, article 22-1";

export default article({
  slug: "garant-obligatoire-en-cdi",
  titre: "En CDI, peut-on encore vous demander un garant ?",
  titreSeo: "Garant obligatoire en CDI : la règle",
  description:
    "Oui : le CDI ne dispense d'aucune garantie. Ce qui limite la demande, c'est l'assurance du propriétaire. Que lui répondre et que lui proposer à la place.",
  chapeau:
    "Oui. Votre CDI ne vous dispense pas d'un garant : le propriétaire peut en demander un, quel que soit votre contrat. Ce qui peut l'en empêcher, c'est son assurance contre les impayés : assuré, il ne peut plus exiger de caution, sauf d'un étudiant ou d'un apprenti. Posez-lui la question, puis proposez Visale si vous y avez droit.",
  publieLe: "2026-11-06",
  pilier: "C",
  format: "question",
  guidePilier: "/guides/louer-sans-garant",
  guidesLies: ["/guides/garantie-visale", "/guides/dossier-de-location"],
  statut: "publie",
  requete: "garant obligatoire quand on est en cdi",
  faits: [
    {
      fait: "Le garant n'est pas obligatoire, mais le propriétaire peut en demander un",
      valeur: "non obligatoire, mais demande possible",
      source: ANIL_PG,
      titreSource: TANIL_PG,
      releveLe: "2026-11-05",
      citation: "Il n'est pas obligatoire d'avoir un garant pour louer un logement. Cependant, votre propriétaire peut vous en demander un",
    },
    {
      fait: "Selon la situation et les ressources, un bailleur peut même demander plusieurs garants",
      valeur: "plusieurs garants possibles",
      source: ANIL_PG,
      titreSource: TANIL_PG,
      releveLe: "2026-11-05",
      citation: "un bailleur peut même demander plusieurs garants",
    },
    {
      fait: "Le contrat de travail fait partie des justificatifs de situation professionnelle",
      valeur: "contrat de travail",
      source: F1169,
      titreSource: T1169,
      releveLe: "2026-11-05",
      citation: "Contrat de travail ou de stage, ou, si nécessaire, attestation de l'employeur précisant l'emploi et la rémunération proposée",
    },
    {
      fait: "Un propriétaire assuré ne peut demander une caution qu'à un étudiant ou un apprenti",
      valeur: "caution seulement si le locataire est étudiant ou apprenti",
      source: F31267,
      titreSource: T31267,
      releveLe: "2026-11-05",
      citation: "peut demander une caution seulement si son locataire est étudiant ou apprenti",
    },
    {
      fait: "Un bailleur assuré qui demande un cautionnement encourt la nullité",
      valeur: "à peine de nullité",
      source: L221,
      titreSource: TL221,
      releveLe: "2026-11-05",
      citation: "Le cautionnement ne peut pas être demandé, à peine de nullité, par un bailleur qui a souscrit une assurance",
    },
    {
      fait: "Un bailleur personne morale ne peut demander une caution que d'un organisme listé par décret, ou pour un étudiant non boursier",
      valeur: "organisme listé par décret",
      source: L221,
      titreSource: TL221,
      releveLe: "2026-11-05",
      citation: "s'il est apporté par un des organismes dont la liste est fixée par décret en Conseil d'Etat",
    },
    {
      fait: "À 30 ans ou moins, un salarié peut obtenir Visale, sous conditions",
      valeur: "30 ans ou moins, sous conditions",
      source: F33453,
      titreSource: T33453,
      releveLe: "2026-11-06",
      citation: "Locataire de 30 ans et moins",
    },
    {
      fait: "À partir de 31 ans, le salarié du privé peut demander Visale dans les 6 mois qui suivent l'embauche",
      valeur: "6 mois après l'embauche",
      source: F33453,
      titreSource: T33453,
      releveLe: "2026-11-05",
      citation: "Soit faire la demande de la garantie Visale dans les 6 mois qui suivent l'embauche",
    },
    {
      fait: "Ou dans les 6 mois qui suivent une mutation",
      valeur: "6 mois après la mutation",
      source: F33453,
      titreSource: T33453,
      releveLe: "2026-11-05",
      citation: "Soit faire la demande de la garantie Visale dans les 6 mois qui suivent la mutation",
    },
    {
      fait: "Ou avec un salaire net mensuel de 1710 € au plus",
      valeur: "1710 €",
      source: F33453,
      titreSource: T33453,
      releveLe: "2026-11-05",
      citation: "Soit avoir un salaire net mensuel de 1710 € maximum",
    },
    {
      fait: "L'ANIL précise que cette condition de salaire vaut quelle que soit la situation d'emploi, CDI compris",
      valeur: "CDI compris",
      source: "https://www.anil.org/votre-besoin/louer/trouver-un-logement/caution-et-garanties/",
      titreSource: "ANIL · Caution et garanties",
      releveLe: "2026-11-05",
      citation: "quelle que soit la situation d'emploi (CDI, CDD, intérim",
    },
    {
      fait: "Pour Visale, le bailleur doit accepter l'acte de cautionnement",
      valeur: "acceptation du bailleur",
      source: F33453,
      titreSource: T33453,
      releveLe: "2026-11-05",
      citation: "doit accepter l'acte de cautionnement. En cas de dégradations locatives",
    },
  ],
  corps: `
## Un garant est-il obligatoire quand on est en CDI ? {#obligatoire}
Aucune loi ne vous impose d'avoir un garant, en CDI comme ailleurs, mais le propriétaire peut vous en demander un. Votre contrat ne change pas cette règle : il compte parmi les pièces qu'il peut réclamer, pour mesurer votre situation, sans vous ouvrir aucune dispense. Le guide [louer sans garant](/guides/louer-sans-garant) donne le cadre général.

Beaucoup de candidats pensent l'inverse parce qu'un CDI rassure souvent assez pour que la question ne se pose plus. C'est un usage, qui dépend du propriétaire, du loyer et de vos revenus. Il peut même, selon votre situation, demander plusieurs garants.

## Qu'est-ce qui limite vraiment la demande ? {#limite}
Son assurance. Un propriétaire qui a souscrit une assurance contre les risques locatifs ne peut plus demander de caution, sauf si vous êtes étudiant ou apprenti, et un cautionnement demandé malgré tout encourt la nullité. Votre contrat de travail n'y change rien : c'est sa situation à lui qui compte, et il faut la lui demander.

Autre limite : si le propriétaire est une société, hors société civile familiale, il ne peut demander qu'une caution venue d'un organisme dont la liste est fixée par décret, sauf pour un étudiant sans bourse. Le cumul entre assurance et garant est détaillé dans l'article [assurance loyers impayés et garant](/blog/assurance-loyers-impayes-garant).

## Que répondre à un propriétaire qui veut un garant ? {#repondre}
Posez une question plutôt que de citer la loi : demandez s'il est assuré contre les impayés, car la réponse décide de tout. Présentez ensuite ce que vous avez : votre CDI, votre revenu, votre dossier complet, et une solution si vous en avez une. Vous lui laissez la décision, avec des éléments pour la prendre.

1. « Êtes-vous assuré contre les loyers impayés ? Si oui, mon dossier tient sans garant. »
2. « Je suis en CDI depuis [durée], avec [revenu net] par mois, et mon dossier est complet. »
3. « Si vous souhaitez une garantie, je peux demander le visa Visale, ou vous présenter un garant. »

Ne dites que ce qui est vrai pour vous : proposez Visale seulement si vous remplissez ses conditions.

## Visale est-elle ouverte à un salarié en CDI ? {#visale}
Oui, sous conditions. À 30 ans ou moins, le salarié peut l'obtenir, selon son loyer et ses ressources. À partir de 31 ans, le salarié du secteur privé doit faire sa demande dans les 6 mois qui suivent l'embauche ou la mutation, ou gagner au plus 1710 € net par mois, quel que soit son contrat.

Elle se demande avant la signature du bail, et le propriétaire doit accepter l'acte. À partir de 31 ans, un CDI ancien avec un salaire au-dessus de ce seuil ne remplit donc aucune de ces conditions. Les plafonds de loyer sont dans le guide de la [garantie Visale](/guides/garantie-visale).

## Que proposer si vous n'avez ni garant ni Visale ? {#proposer}
Commencez par un dossier sans trou : contrat de travail, trois dernières fiches de paie, dernier avis d'imposition, dans la limite de la liste autorisée. Puis posez la question de l'assurance. En dernier recours seulement, regardez une société de cautionnement, payante, en vérifiant d'abord que le propriétaire l'accepte.

Le guide du [dossier de location](/guides/dossier-de-location) donne la liste complète. Si vous êtes encore en période d'essai, l'article [louer en période d'essai](/blog/louer-en-periode-d-essai) traite ce cas.
`,
});
