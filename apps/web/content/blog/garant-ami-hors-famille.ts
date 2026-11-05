import { article } from "@/lib/blog-format";

const F31267 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F31267";
const T31267 = "Service-public.gouv.fr · Caution du locataire ou du colocataire dans un logement privé";
const F1169 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169";
const T1169 = "Service-public.gouv.fr · Futur locataire : justificatifs à donner au propriétaire";
const ANIL_PG = "https://www.anil.org/parole-expert-logement-location-pas-garant/";
const TANIL_PG = "ANIL · Je cherche une location, mais je n'ai pas de garant";
const L221 = "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000044073458";
const TL221 = "Légifrance · Loi du 6 juillet 1989, article 22-1";

export default article({
  slug: "garant-ami-hors-famille",
  titre: "Un ami peut-il être votre garant ?",
  titreSeo: "Un ami peut-il être votre garant ?",
  description:
    "Oui, aucun lien de famille n'est exigé. Ce qu'un propriétaire peut encore regarder, comment présenter ce garant et ce que votre ami signe vraiment.",
  chapeau:
    "Oui. Aucune règle n'exige de lien de famille : service-public cite le parent et l'ami. Un propriétaire peut pourtant écarter un garant dont les ressources lui semblent trop justes. Présentez votre ami avec ses justificatifs et une phrase d'explication, et dites-lui ce qu'il signe : il répond de vos dettes sur ses revenus et ses biens.",
  publieLe: "2026-11-06",
  pilier: "C",
  format: "question",
  guidePilier: "/guides/garant-caution",
  guidesLies: ["/guides/dossier-de-location", "/guides/garantie-visale"],
  statut: "publie",
  requete: "garant ami de la famille",
  faits: [
    {
      fait: "La caution peut être une personne physique : parent, ami",
      valeur: "parent, ami",
      source: F31267,
      titreSource: T31267,
      releveLe: "2026-11-05",
      citation: "soit une personne physique (parent, ami...)",
    },
    {
      fait: "L'ANIL décrit le garant comme une personne proche, famille ou ami",
      valeur: "famille ou ami",
      source: ANIL_PG,
      titreSource: TANIL_PG,
      releveLe: "2026-11-05",
      citation: "est généralement une personne proche de vous (famille ou ami)",
    },
    {
      fait: "Pour être acceptée, la caution doit prouver des garanties financières suffisantes",
      valeur: "garanties financières suffisantes",
      source: F31267,
      titreSource: T31267,
      releveLe: "2026-11-05",
      citation: "prouvant qu'elle a des garanties financières suffisantes pour payer les éventuels impayés du locataire",
    },
    {
      fait: "Le propriétaire ne peut demander au garant que les pièces de la liste",
      valeur: "identité, domicile, situation professionnelle, ressources",
      source: F1169,
      titreSource: T1169,
      releveLe: "2026-11-05",
      citation: "Le propriétaire a interdiction d'en exiger d'autres",
    },
    {
      fait: "Le bailleur ne peut pas refuser une caution pour sa nationalité ou parce qu'elle réside hors du territoire métropolitain",
      valeur: "nationalité, territoire métropolitain",
      source: L221,
      titreSource: TL221,
      releveLe: "2026-11-05",
      citation: "ne peut refuser la caution présentée au motif qu'elle ne possède pas la nationalité française ou qu'elle ne réside pas sur le territoire métropolitain",
    },
    {
      fait: "Les dettes couvertes comprennent le loyer, les charges, les intérêts de retard et la remise en état",
      valeur: "loyer, charges, intérêts, remise en état",
      source: F31267,
      titreSource: T31267,
      releveLe: "2026-11-05",
      citation: "Les frais de remise en état du logement dégradé",
    },
    {
      fait: "Si la caution ne paie pas, ses biens, ses revenus et son logement peuvent être saisis",
      valeur: "saisie des biens, revenus et logement",
      source: F31267,
      titreSource: T31267,
      releveLe: "2026-11-05",
      citation: "ses biens personnels, ses revenus et son logement (s'il lui appartient) peuvent être saisis",
    },
    {
      fait: "En caution solidaire, le propriétaire peut s'adresser directement à la caution, sans passer par le locataire",
      valeur: "sans passer par le locataire",
      source: F31267,
      titreSource: T31267,
      releveLe: "2026-11-05",
      citation: "sans même passer par le locataire et donc sans même rechercher si celui-ci pourrait payer",
    },
    {
      fait: "La caution personne physique appose elle-même la mention de son engagement",
      valeur: "mention apposée par la caution elle-même",
      source: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044071230",
      titreSource: "Légifrance · Code civil, article 2297 (en vigueur depuis le 1er janvier 2022)",
      releveLe: "2026-11-04",
      citation: "la caution personne physique appose elle-même la mention qu'elle s'engage en qualité de caution à payer au créancier ce que lui doit le débiteur",
    },
    {
      fait: "Avec une durée précise, la caution ne peut pas résilier son engagement",
      valeur: "pas de résiliation si une durée est indiquée",
      source: F31267,
      titreSource: T31267,
      releveLe: "2026-11-05",
      citation: "Quand une durée précise est indiquée dans l'acte de cautionnement, la caution ne peut pas résilier son engagement",
    },
    {
      fait: "Après avoir payé, la caution peut poursuivre le locataire pour être remboursée",
      valeur: "poursuites pour obtenir le remboursement",
      source: "https://www.anil.org/fileadmin/ANIL/Editions_grand_public/serie_rapports_locatifs/se_porter_caution.pdf",
      titreSource: "ANIL · Dépliant « Se porter caution » (janvier 2022)",
      releveLe: "2026-11-05",
      citation: "la caution peut engager des poursuites contre le locataire pour obtenir le remboursement des sommes versées",
    },
  ],
  corps: `
## Un garant doit-il être de la famille ? {#famille}
Non. La caution peut être n'importe quelle personne physique : service-public cite le parent et l'ami, et l'ANIL parle d'une personne proche, de la famille ou non. Rien n'oblige un ami à justifier du lien qui vous unit. Le guide [garant et caution](/guides/garant-caution) reprend la règle générale et les autres cautions possibles.

Une annonce peut réclamer un garant « de la famille » : aucun texte ne fonde cette condition. Le propriétaire reste en revanche libre de préférer un autre dossier.

## Que peut regarder ou refuser le propriétaire ? {#refuser}
Les mêmes choses que pour un parent : l'identité, le domicile, l'activité et les ressources de votre ami, avec les seules pièces de la liste autorisée. Il peut écarter une caution dont les garanties financières lui semblent insuffisantes. Il ne peut pas la refuser au motif qu'elle n'a pas la nationalité française ou qu'elle réside hors du territoire métropolitain.

Le niveau de revenus attendu n'est fixé nulle part : l'article [revenu minimum d'un garant](/blog/revenu-minimum-garant-location) explique comment un propriétaire raisonne. Et si un seul garant ne le rassure pas, voyez [deux garants pour une location](/blog/deux-garants-location). Les pièces de la liste sont dans le guide du [dossier de location](/guides/dossier-de-location).

## Comment présenter un ami garant ? {#presenter}
Comme un dossier ordinaire, avec une phrase en plus. Joignez les justificatifs de votre ami à votre candidature, puis expliquez simplement qui il est et qu'il connaît l'engagement qu'il prend. Aucune lettre n'est exigée ; ce mot sert à lever une question avant qu'elle ne soit posée, sans vous justifier de ne pas présenter un parent.

Par exemple : « Mon garant est [prénom et nom], un ami proche, [métier], en poste depuis [durée]. Il connaît l'engagement qu'il prend et vous trouverez ses justificatifs joints. Je peux vous mettre en relation si vous le souhaitez. »

Évitez le récit de famille : le propriétaire regarde la solidité de la caution, pas les raisons de votre choix.

## Qu'est-ce que votre ami signe vraiment ? {#signe}
Un acte de cautionnement, qui l'engage à payer vos dettes locatives : loyer, charges, intérêts de retard et frais de remise en état. S'il ne paie pas, ses revenus, ses biens et son logement, s'il en est propriétaire, peuvent être saisis. Il appose lui-même la mention de son engagement, avec le montant maximum qu'il accepte.

Le lien d'amitié n'allège rien : l'engagement est le même que celui d'un parent. Le [modèle d'acte de caution solidaire](/blog/modele-acte-caution-solidaire) montre ce qu'il lira, ligne par ligne.

## Que dire à votre ami avant qu'il accepte ? {#avant}
Trois choses, sans les atténuer : le montant maximum, la durée, et le type de caution. En caution solidaire, le propriétaire peut s'adresser à lui directement, sans passer par vous. Avec une durée précise, il ne pourra pas résilier avant son terme. Et s'il paie à votre place, il pourra vous poursuivre pour être remboursé.

Le plus utile se décide avant la signature : convenez qu'en cas de difficulté, vous le prévenez vous-même, avant le propriétaire. L'article [votre garant est-il obligé de payer ?](/blog/garant-oblige-de-payer) détaille ce qui se passe après un impayé.

Si demander ce service vous pèse, ou si votre ami hésite, la [garantie Visale](/guides/garantie-visale) évite de l'engager, quand vous remplissez ses conditions.
`,
});
