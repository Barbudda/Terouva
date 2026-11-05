import { article } from "@/lib/blog-format";

const F31267 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F31267";
const T31267 = "Service-public.gouv.fr · Caution du locataire ou du colocataire dans un logement privé";
const ACTE = "https://www.service-public.gouv.fr/simulateur/calcul/ActeCautionnement";
const TACTE = "Service-public.gouv.fr · Modèle de lettre : se porter caution solidaire (ou simple) d'un locataire";
const R42281 = "https://www.service-public.gouv.fr/particuliers/vosdroits/R42281";
const TR42281 = "Service-public.gouv.fr · Acte de caution solidaire (ou simple) d'un locataire";
const L221 = "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000044073458";
const TL221 = "Légifrance · Loi du 6 juillet 1989, article 22-1";
const C2297 = "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044071230";
const T2297 = "Légifrance · Code civil, article 2297 (en vigueur depuis le 1er janvier 2022)";

export default article({
  slug: "modele-acte-caution-solidaire",
  titre: "Acte de caution solidaire : modèle et mentions à vérifier",
  titreSeo: "Acte de caution solidaire : modèle à lire",
  description:
    "Un modèle lisible d'acte de caution solidaire, les mentions de l'article 22-1, celle que la caution appose elle-même, et comment fixer le montant maximum.",
  chapeau:
    "Un acte de caution solidaire reprend le loyer et sa révision, l'alinéa de l'article 22-1 sur la résiliation, et la mention que la caution appose elle-même, avec un montant maximum. Ce montant se fixe librement. Voici un modèle à lire et à confronter au bail, pour vérifier chaque ligne avant que votre garant ne signe.",
  publieLe: "2026-11-06",
  pilier: "C",
  format: "cas-pratique",
  guidePilier: "/guides/garant-caution",
  guidesLies: ["/guides/louer-sans-garant"],
  statut: "publie",
  requete: "caution solidaire modèle",
  faits: [
    {
      fait: "La caution peut utiliser un modèle pour rédiger l'acte",
      valeur: "modèle utilisable par la caution",
      source: F31267,
      titreSource: T31267,
      releveLe: "2026-11-05",
      citation: "Pour rédiger l'acte de cautionnement, la caution locative peut utiliser un modèle de document",
    },
    {
      fait: "L'acte peut être un document séparé, figurer dans le bail ou être établi par un notaire",
      valeur: "document séparé, bail ou notaire",
      source: "https://www.anil.org/votre-besoin/louer/trouver-un-logement/caution-et-garanties/",
      titreSource: "ANIL · Caution et garanties",
      releveLe: "2026-11-05",
      citation: "doit être écrit et établi sur un document séparé ou directement dans le bail",
    },
    {
      fait: "L'acte fait apparaître le loyer et sa révision tels qu'ils figurent au bail, et reproduit l'avant-dernier alinéa",
      valeur: "loyer, révision, avant-dernier alinéa reproduit",
      source: L221,
      titreSource: TL221,
      releveLe: "2026-11-05",
      citation: "faisant apparaître le montant du loyer et les conditions de sa révision tels qu'ils figurent au contrat de location",
    },
    {
      fait: "Le bailleur remet à la caution un exemplaire du bail ; ces formalités sont prescrites à peine de nullité",
      valeur: "exemplaire du bail, nullité",
      source: L221,
      titreSource: TL221,
      releveLe: "2026-11-05",
      citation: "Le bailleur remet à la caution un exemplaire du contrat de location. Ces formalités sont prescrites à peine de nullité du cautionnement",
    },
    {
      fait: "L'alinéa à reproduire : résiliation possible sans indication de durée",
      valeur: "texte de l'avant-dernier alinéa",
      source: ACTE,
      titreSource: TACTE,
      releveLe: "2026-11-05",
      citation: "ne comporte aucune indication de durée ou lorsque la durée du cautionnement est stipulée indéterminée, la caution peut le résilier unilatéralement",
    },
    {
      fait: "La caution personne physique appose elle-même la mention de son engagement",
      valeur: "mention apposée par la caution elle-même",
      source: C2297,
      titreSource: T2297,
      releveLe: "2026-11-04",
      citation: "la caution personne physique appose elle-même la mention qu'elle s'engage en qualité de caution à payer au créancier ce que lui doit le débiteur",
    },
    {
      fait: "En cas d'écart entre les deux montants de la mention, la somme en lettres l'emporte",
      valeur: "somme écrite en toutes lettres",
      source: C2297,
      titreSource: T2297,
      releveLe: "2026-11-04",
      citation: "En cas de différence, le cautionnement vaut pour la somme écrite en toutes lettres",
    },
    {
      fait: "Depuis le 1er janvier 2022, la mention n'a plus à être écrite à la main, sans que cela soit interdit",
      valeur: "écriture à la main facultative",
      source: R42281,
      titreSource: TR42281,
      releveLe: "2026-11-05",
      citation: "la mention manuscrite n'est pas obligatoire mais elle reste possible",
    },
    {
      fait: "En caution solidaire, la caution reconnaît ne pas pouvoir exiger que le créancier poursuive d'abord le débiteur",
      valeur: "bénéfices de discussion et de division",
      source: ACTE,
      titreSource: TACTE,
      releveLe: "2026-11-05",
      citation: "elle reconnaît ne pouvoir exiger du créancier qu'il poursuive d'abord le débiteur ou qu'il divise ses poursuites entre les cautions",
    },
    {
      fait: "L'engagement couvre ce que l'acte énumère, dans la limite d'un montant en principal et accessoires",
      valeur: "en principal et accessoires",
      source: ACTE,
      titreSource: TACTE,
      releveLe: "2026-11-05",
      citation: "des réparations et des dégradations locatives, des impôts et taxes, des frais et dépens de procédure",
    },
    {
      fait: "Le montant de l'engagement se fixe librement, sans minimum ni maximum",
      valeur: "fixé librement",
      source: ACTE,
      titreSource: TACTE,
      releveLe: "2026-11-05",
      citation: "Ce montant est fixé librement par les parties sans minimum ou maximum",
    },
    {
      fait: "Il est d'usage d'indiquer le loyer multiplié par 12 et par la durée du bail",
      valeur: "loyer x 12 x durée du bail",
      source: ACTE,
      titreSource: TACTE,
      releveLe: "2026-11-05",
      citation: "Il est d'usage d'indiquer le montant du loyer x 12 x la durée du bail",
    },
    {
      fait: "Avec une durée précise, la caution ne peut pas résilier",
      valeur: "pas de résiliation si une durée est indiquée",
      source: F31267,
      titreSource: T31267,
      releveLe: "2026-11-05",
      citation: "Quand une durée précise est indiquée dans l'acte de cautionnement, la caution ne peut pas résilier son engagement",
    },
    {
      fait: "Le propriétaire remet à la caution un exemplaire de l'acte, sauf s'il est intégré au bail",
      valeur: "exemplaire de l'acte",
      source: F31267,
      titreSource: T31267,
      releveLe: "2026-11-05",
      citation: "doit remettre à la caution un exemplaire de l'acte de cautionnement, sauf si l'acte est intégré au bail",
    },
  ],
  corps: `
## Qui rédige l'acte de caution solidaire ? {#qui}
Aucune règle ne réserve la rédaction à l'un ou à l'autre : le propriétaire, l'agence ou la caution peuvent préparer le texte, sur un document séparé ou dans le bail, et un notaire peut aussi l'établir. Une chose ne se délègue pas : la caution signe et appose elle-même sa mention. Le guide [garant et caution](/guides/garant-caution) replace l'acte dans son contexte.

Le plus souvent, le document vous arrive déjà prêt. Il reste à le lire : l'avoir reçu d'une agence ne le rend pas conforme.

## Quelles mentions vérifier ? {#mentions}
Quatre éléments, tous exigés pour une caution personne physique : le montant du loyer et ses conditions de révision, tels qu'ils figurent au bail ; l'avant-dernier alinéa de l'article 22-1 reproduit ; la mention de l'article 2297 apposée par la caution ; et un exemplaire du bail remis à la caution. Sans eux, le cautionnement est nul.

Pour vérifier, posez le bail à côté de l'acte et comparez :

1. **Le loyer** est-il le même, et la révision reprend-elle la clause du bail ?
2. **L'alinéa sur la résiliation** est-il reproduit en entier ?
3. **La mention** vient-elle de la caution, avec un montant en lettres et en chiffres ?
4. **Le type de caution et la durée** sont-ils ceux qui ont été convenus ?
5. **Le bail** a-t-il bien été remis à la caution ?

En colocation, l'acte doit aussi désigner le colocataire dont le départ mettra fin à l'engagement.

## Le modèle, à adapter {#modele}
Ce texte suit la structure du générateur de service-public et sert à lire ou à préparer un acte. Il ne garantit pas la validité de celui que vous signerez : confrontez-le à votre bail, et posez vos questions à l'ADIL de votre département si un point vous arrête. Les passages entre crochets dépendent de votre situation.

**Acte de cautionnement solidaire**

Je soussigné(e) [prénom et nom de la caution], né(e) le [date] à [commune], demeurant [adresse], déclare me porter caution solidaire de [prénom et nom du locataire] pour les obligations résultant du bail consenti par [nom du bailleur], demeurant [adresse du bailleur], pour le logement situé [adresse du logement].

J'ai pris connaissance du montant du loyer de [montant en lettres], soit [montant en chiffres] par mois, révisé selon les conditions suivantes : [clause de révision reprise du bail].

Cet engagement vaut pour le paiement, en cas de défaillance du locataire, des loyers, des charges, des réparations et dégradations locatives [et des autres sommes convenues].

Il est valable pour une durée [déterminée, jusqu'au : date] ou [indéterminée].

Je reconnais avoir pris connaissance de l'avant-dernier alinéa de l'article 22-1 de la loi du 6 juillet 1989 : « Lorsque le cautionnement d'obligations résultant d'un contrat de location conclu en application du présent titre ne comporte aucune indication de durée ou lorsque la durée du cautionnement est stipulée indéterminée, la caution peut le résilier unilatéralement. La résiliation prend effet au terme du contrat de location, qu'il s'agisse du contrat initial ou d'un contrat reconduit ou renouvelé, au cours duquel le bailleur reçoit notification de la résiliation. »

*Mention apposée par la caution elle-même :* « Je m'engage en qualité de caution à payer à [nom du bailleur] ce que lui doit [nom du locataire] en cas de défaillance de celui-ci, dans la limite de [montant maximum en toutes lettres], soit [montant en chiffres], en principal et accessoires. Je reconnais ne pouvoir exiger de [nom du bailleur] qu'il poursuive d'abord [nom du locataire] ou qu'il divise ses poursuites entre les cautions. »

Je reconnais avoir reçu un exemplaire du bail.

Fait à [commune], le [date]. [Signature de la caution]

Pour une caution simple, l'acte dit « simple » et la dernière phrase de la mention disparaît : la caution garde alors le droit de demander que le locataire soit poursuivi d'abord. Service-public propose aussi un [générateur d'acte en ligne](https://www.service-public.gouv.fr/simulateur/calcul/ActeCautionnement), à relire de la même façon.

## La mention doit-elle être écrite à la main ? {#main}
Non. Depuis le 1er janvier 2022, l'écriture à la main n'est plus obligatoire, tout en restant possible. La mention doit en revanche venir de la caution elle-même : elle ne se remplit pas à sa place. Si la somme écrite en lettres diffère de celle en chiffres, le cautionnement vaut pour la somme en lettres : relisez les deux.

À distance, la même règle s'applique : l'article [signer l'acte de caution à distance](/blog/garant-signer-acte-de-caution-a-distance) détaille la marche à suivre.

## Comment fixer le montant maximum ? {#montant}
Il se fixe librement, sans minimum ni maximum : service-public indique qu'il est d'usage d'écrire le loyer multiplié par 12 et par la durée du bail. Ce chiffre plafonne ce que votre garant peut devoir, en principal et accessoires, sur toute la durée de son engagement. Il mérite donc une vraie discussion avant la signature.

Pour un bail de 3 ans, l'usage revient à 36 mois de loyer. Vérifiez deux choses en le lisant : le montant couvre-t-il les charges, puisque l'usage cité parle du loyer, et votre garant pourrait-il réellement assumer cette somme ? Le propriétaire peut refuser un montant qu'il juge trop bas, et votre garant peut refuser de signer un montant trop élevé : aucune formule ne s'impose à l'un ni à l'autre.

## Durée précise ou durée indéterminée : quelle différence ? {#duree}
Avec une durée précise, la caution ne peut pas résilier : elle reste engagée jusqu'à la date prévue. Sans durée indiquée, ou avec une durée indéterminée, elle peut résilier à tout moment, mais l'effet n'intervient qu'au terme du bail en cours. Ce choix pèse autant que le montant, et il se fait avant de signer.

Une fois l'acte signé, votre garant garde son exemplaire, sauf si l'acte est intégré au bail, auquel cas il garde le bail. Ce qu'il risque ensuite est dans l'article [votre garant est-il obligé de payer ?](/blog/garant-oblige-de-payer), et s'il change d'avis avant de signer, voyez [garant qui se rétracte avant la signature](/blog/garant-se-retracte-avant-signature).
`,
});
