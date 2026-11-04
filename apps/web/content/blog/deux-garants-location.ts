// Vague 6, ligne 15. Requête relevée en autocomplétion : « deux garants location ».
// Apport : les vraies limites ne portent pas sur le nombre de garants mais sur le cumul avec une
// assurance loyers impayés ou avec Visale, et sur ce que chaque garant risque selon l'acte.

import { article } from "@/lib/blog-format";

const ANIL = "https://www.anil.org/votre-besoin/louer/trouver-un-logement/caution-et-garanties/";
const F31267 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F31267";

export default article({
  slug: "deux-garants-location",
  titre: "Un propriétaire peut-il demander deux garants ?",
  titreSeo: "Deux garants pour une location : est-ce permis ?",
  description:
    "Deux garants ne sont pas interdits, mais le cumul avec une assurance loyers impayés ou avec Visale l'est. Ce que chaque garant risque selon l'acte.",
  chapeau:
    "Oui, un propriétaire particulier peut accepter ou demander deux garants : les textes officiels lus ne fixent aucun nombre. Les limites sont ailleurs. S'il a une assurance loyers impayés, il ne peut exiger aucun garant, sauf pour un étudiant ou un apprenti. Et Visale exclut toute autre garantie, garant compris.",
  publieLe: "2026-11-04",
  pilier: "C",
  format: "question",
  guidePilier: "/guides/garant-caution",
  guidesLies: ["/guides/garantie-visale", "/guides/louer-sans-garant", "/guides/dossier-de-location"],
  statut: "brouillon",
  requete: "deux garants location",
  faits: [
    {
      fait: "Bailleur particulier assuré contre les impayés",
      valeur: "caution possible seulement pour un locataire étudiant ou apprenti",
      source: F31267,
      titreSource: "Service-public.gouv.fr · Caution du locataire ou du colocataire dans un logement privé (F31267)",
      releveLe: "2026-11-04",
      citation:
        "Le propriétaire qui a déjà une assurance privée contre les risques locatifs peut demander une caution seulement si son locataire est étudiant ou apprenti.",
    },
    {
      fait: "Cumul des garanties pour un étudiant ou un apprenti",
      valeur: "autorisé",
      source: ANIL,
      titreSource: "ANIL · Caution et garanties",
      releveLe: "2026-11-04",
      citation: "Si le locataire est étudiant ou apprenti, le bailleur est autorisé à cumuler les garanties.",
    },
    {
      fait: "Visale et autres garanties",
      valeur: "exclusive de toute autre garantie, caution ou assurance",
      source: ANIL,
      titreSource: "ANIL · Caution et garanties",
      releveLe: "2026-11-04",
      citation:
        "La garantie Visale est un contrat de cautionnement exclusif de toute autre garantie (notamment caution ou assurance).",
    },
    {
      fait: "Bailleur société (personne morale) et étudiant boursier",
      valeur: "aucune caution",
      source: F31267,
      titreSource: "Service-public.gouv.fr · Caution du locataire ou du colocataire dans un logement privé (F31267)",
      releveLe: "2026-11-04",
      citation:
        "Le propriétaire ne peut pas demander de caution si le locataire est un étudiant recevant une bourse de l'enseignement supérieur.",
    },
    {
      fait: "Plusieurs cautions solidaires",
      valeur: "chacune peut être poursuivie pour toute la dette",
      source: ANIL,
      titreSource: "ANIL · Caution et garanties",
      releveLe: "2026-11-04",
      citation: "S'il y a plusieurs cautions, chaque caution solidaire peut être poursuivie pour l'ensemble de la dette",
    },
    {
      fait: "Plusieurs cautions simples",
      valeur: "chacune n'est poursuivie que pour sa part",
      source: ANIL,
      titreSource: "ANIL · Caution et garanties",
      releveLe: "2026-11-04",
      citation:
        "la caution ne peut être poursuivie que pour une part de la dette et le montant total sera réparti entre les différentes cautions",
    },
  ],
  corps: `
## Un propriétaire a-t-il le droit de demander deux garants ? {#droit}
Un propriétaire particulier peut accepter deux garants, ou les demander : ni Service-public ni l'ANIL ne fixent de nombre maximal dans leurs fiches sur la caution. Ce qui est encadré, c'est le cumul d'un garant avec d'autres garanties. Le [guide du garant](/guides/garant-caution) rappelle les règles de l'acte de cautionnement, valables pour chaque garant.

Un propriétaire demande deux garants quand le revenu d'un seul lui paraît juste face au loyer, ou les accepte quand chacun des parents veut se porter caution. Ce n'est pas une obligation légale : c'est une condition que le propriétaire pose, et que vous pouvez discuter, par exemple en proposant un seul garant au dossier plus solide.

## Peut-il demander un garant s'il a une assurance loyers impayés ? {#assurance}
Non, sauf exception. Un propriétaire particulier déjà assuré contre les loyers impayés ne peut demander une caution que si son locataire est étudiant ou apprenti. Dans ce cas seulement, l'ANIL précise qu'il peut cumuler les garanties. Pour tout autre locataire, demander un garant en plus de l'assurance est interdit.

Posez la question franchement quand on vous réclame deux garants : « Le logement est-il couvert par une assurance loyers impayés ? » Si la réponse est oui et que vous n'êtes ni étudiant ni apprenti, aucun garant ne peut vous être demandé. Le guide [louer sans garant](/guides/louer-sans-garant) détaille ce cas.

## Avec Visale, peut-on vous demander un garant en plus ? {#visale}
Non. Selon l'ANIL, la garantie Visale est un contrat de cautionnement exclusif de toute autre garantie, caution ou assurance. Un propriétaire qui accepte votre visa Visale ne peut donc pas y ajouter un garant personne physique, ni un deuxième garant. Il choisit Visale, ou une autre garantie.

C'est un argument utile quand vous n'avez pas deux garants à proposer : un visa Visale remplace l'ensemble. Les conditions d'âge, de ressources et de loyer sont dans le [guide Visale](/guides/garantie-visale).

### Le cas des propriétaires en société
Quand le bailleur est une société, hors société civile familiale, les règles sont plus strictes. Service-public indique par exemple qu'il ne peut pas demander de caution à un étudiant boursier de l'enseignement supérieur. Demander deux garants à ce locataire revient à en demander deux de trop.

## Que risque chaque garant quand il y en a deux ? {#risque}
Tout dépend de l'acte de cautionnement. Avec deux cautions solidaires, le propriétaire peut réclamer toute la dette à l'une ou à l'autre, au choix, dans la limite de ce que chacune a signé. Avec deux cautions simples, chacune n'est poursuivie que pour sa part, et la dette se répartit entre elles.

Avant de signer, chacun de vos garants doit donc lire son propre acte : la mention manuscrite, la durée et le plafond de l'engagement le concernent personnellement. Deux garants ne divisent pas le risque par deux quand la clause de solidarité est présente.

## Comment répondre à un propriétaire qui demande deux garants ? {#repondre}
Vérifiez d'abord s'il est assuré contre les impayés, puis proposez ce que vous avez : un garant au dossier complet, ou un visa Visale qui exclut tout autre garant. Si vous avez deux garants, envoyez les pièces des deux en même temps, rangées dans le même ordre, pour qu'il compare sans attendre.

La liste des pièces que l'on peut demander à un garant est la même pour le premier et pour le second ; le [dossier de location](/guides/dossier-de-location) la donne en entier.
`,
});
