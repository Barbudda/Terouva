import { article } from "@/lib/blog-format";

const F1159 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1159";
const T1159 = "Service-public.gouv.fr · Couple marié locataire de son logement : quelles sont les règles ?";
const F2565 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F2565";
const T2565 = "Service-public.gouv.fr · Couple pacsé locataire de son logement : quelles sont les règles ?";
const F35202 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F35202/1_0";
const T35202 = "Service-public.gouv.fr · Couple de concubins locataire : 1 seul concubin signe le bail";

export default article({
  slug: "bail-couple-un-ou-deux-noms",
  titre: "Louer en couple : un bail à un nom ou à deux ?",
  titreSeo: "Louer en couple : un bail à un nom ou à deux ?",
  description:
    "Mariés, vous êtes tous deux titulaires d'office ; pacsés, sur simple demande ; en concubinage, seulement si les deux signent. Revenus et ajout d'un nom.",
  chapeau:
    "À deux noms, le plus souvent : le propriétaire additionne vos revenus, et chacun a des droits sur le logement. Mariés, vous êtes tous les deux titulaires du bail même si un seul a signé. Pacsés, il suffit de le demander par lettre recommandée. En concubinage, celui qui n'a pas signé n'a aucun droit sur le logement.",
  publieLe: "2026-11-04",
  pilier: "D",
  format: "question",
  guidePilier: "/guides/dossier-de-location",
  guidesLies: ["/guides/preavis-location"],
  outilLie: "/outils/dossier-de-location",
  statut: "publie",
  requete: "dossier de location seul ou en couple",
  faits: [
    {
      fait: "Chaque époux est titulaire du bail du logement commun, même si un seul a signé avant le mariage",
      valeur: "chaque époux titulaire du bail",
      source: F1159,
      titreSource: T1159,
      releveLe: "2026-11-04",
      citation: "Chaque époux est titulaire du bail et locataire du logement qu'ils habitent ensemble, quel que soit son régime matrimonial",
    },
    {
      fait: "Le propriétaire peut demander le loyer à l'un ou l'autre des époux",
      valeur: "paiement demandé à n'importe lequel des époux",
      source: F1159,
      titreSource: T1159,
      releveLe: "2026-11-04",
      citation: "peut demander le paiement à n'importe lequel des époux",
    },
    {
      fait: "Partenaires de Pacs : cotitularité sur demande écrite en recommandé",
      valeur: "demande écrite par courrier recommandé avec accusé de réception",
      source: F2565,
      titreSource: T2565,
      releveLe: "2026-11-04",
      citation: "Cette demande doit être faite par écrit et envoyée par courrier recommandé avec accusé de réception.",
    },
    {
      fait: "Le propriétaire ne peut pas refuser la cotitularité demandée par des partenaires de Pacs",
      valeur: "ne peut pas la refuser",
      source: F2565,
      titreSource: T2565,
      releveLe: "2026-11-04",
      citation: "Le propriétaire (ou l'agence immobilière) ne peut pas la refuser, compte tenu de l'existence du Pacs.",
    },
    {
      fait: "Partenaires de Pacs : tenus du loyer et des charges pendant toute la durée du Pacs",
      valeur: "pendant toute la durée du Pacs",
      source: F2565,
      titreSource: T2565,
      releveLe: "2026-11-04",
      citation: "obligés de payer le loyer et les charges pendant toute la durée du Pacs",
    },
    {
      fait: "Concubin non signataire : aucun droit sur le logement",
      valeur: "aucun droit ni titre sur le logement",
      source: F35202,
      titreSource: T35202,
      releveLe: "2026-11-04",
      citation: "L'autre concubin n'a aucun droit ni titre sur le logement",
    },
    {
      fait: "Le propriétaire ne peut réclamer le loyer au concubin non signataire, sauf s'il est caution",
      valeur: "jamais réclamé à l'autre concubin, sauf caution",
      source: F35202,
      titreSource: T35202,
      releveLe: "2026-11-04",
      citation: "ne peut jamais réclamer le paiement à l'autre concubin, sauf si celui-ci s'est porté caution",
    },
    {
      fait: "Ajouter un concubin au bail : le propriétaire est libre d'accepter ou de refuser",
      valeur: "libre d'accepter ou de refuser",
      source: "https://www.anil.org/parole-expert-logement-couple-locataire-bail-location/",
      titreSource: "ANIL · Louer en couple : que devez-vous savoir sur la location à deux ?",
      releveLe: "2026-11-04",
      citation: "mais celui-ci est libre d'accepter ou de refuser",
    },
  ],
  corps: `
## Vaut-il mieux un bail à un nom ou à deux ? {#un-ou-deux}
À deux noms, dans la plupart des cas. Le propriétaire additionne alors vos deux revenus pour juger le loyer, ce qui ouvre des logements qu'un seul salaire ne permettrait pas. En échange, chacun peut devoir le loyer entier. Le dossier se monte avec les pièces de chacun, selon la [liste officielle du dossier](/guides/dossier-de-location).

À un seul nom, seul le signataire compte pour le propriétaire, et seul lui a des droits sur le logement si vous n'êtes ni mariés ni pacsés. C'est simple, mais fragile pour celui qui n'a pas signé.

## Mariés, faut-il signer tous les deux ? {#maries}
Ce n'est pas nécessaire pour vos droits. Chaque époux est titulaire du bail du logement que le couple habite, quel que soit le régime matrimonial, et même si un seul a signé, y compris avant le mariage. En contrepartie, le propriétaire peut demander le loyer et les charges à l'un ou à l'autre, en entier.

Signer à deux reste utile pour le dossier : le propriétaire voit les deux revenus dès la candidature, et n'a pas à les découvrir après coup.

## Pacsés, comment devenir tous les deux titulaires ? {#pacses}
En le demandant. Si un seul partenaire a signé, vous pouvez demander ensemble au propriétaire d'être cotitulaires, par écrit et par courrier recommandé avec accusé de réception. Il ne peut pas refuser, du fait de votre Pacs. Les deux partenaires sont ensuite tenus du loyer et des charges pendant toute la durée du Pacs.

Si vous signez le bail à deux dès le départ, cette demande n'a pas lieu d'être : vous êtes cotitulaires par votre signature.

## En concubinage, que risque celui qui n'est pas sur le bail ? {#concubins}
Tout dépend du bail. Seul le concubin qui a signé est titulaire et locataire ; l'autre n'a aucun droit ni titre sur le logement, même s'il paie la moitié du loyer. Si le signataire donne congé, l'autre doit partir au plus tard en même temps, sauf si le propriétaire accepte de signer un nouveau bail avec lui.

À l'inverse, il ne doit rien au propriétaire : celui-ci ne peut réclamer le loyer qu'au signataire, sauf si l'autre s'est porté caution. Signer à deux protège donc le concubin qui vit dans le logement. Sans signature, seuls un abandon brutal du logement ou le décès du signataire lui ouvrent un transfert du bail, sous conditions.

## Peut-on ajouter un nom au bail après la signature ? {#ajouter}
Oui, avec l'accord du propriétaire, sauf pour un couple marié ou pacsé qui a ses propres règles. Un concubin peut demander à être ajouté, mais le propriétaire est libre d'accepter ou de refuser. S'il accepte, l'ajout se fait par un avenant signé de tous, ou par un nouveau bail qui remplace l'ancien.

Pour un couple qui se forme pendant le bail, mieux vaut le faire tôt : la demande est plus simple quand les deux revenus sont déjà là. La colocation entre personnes qui ne forment pas un couple suit d'autres règles, détaillées dans [bail unique ou bail individuel](/blog/colocation-bail-unique-ou-individuel).
`,
});
