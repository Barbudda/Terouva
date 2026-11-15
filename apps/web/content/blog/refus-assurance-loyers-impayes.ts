import { article } from "@/lib/blog-format";

const ART22_1 = "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000044073458";
const T_ART22_1 = "Légifrance · Article 22-1 de la loi n° 89-462 du 6 juillet 1989";
const CNIL = "https://www.cnil.fr/fr/le-droit-dacces-connaitre-les-donnees-quun-organisme-detient-sur-vous";
const T_CNIL = "CNIL · Le droit d'accès : connaître les données qu'un organisme détient sur vous";

export default article({
  slug: "refus-assurance-loyers-impayes",
  titre: "Dossier refusé par l'assurance loyers impayés : que faire ?",
  titreSeo: "Refus de l'assurance loyers impayés : que faire ?",
  description:
    "L'assureur du propriétaire a écarté votre dossier ? Qui décide, ce que vous pouvez demander, la règle sur le garant, et vers quels logements chercher.",
  chapeau:
    "Le refus vient de l'assureur du propriétaire, qui décide s'il couvre votre bail. Vous pouvez demander le motif, et obtenir de l'assureur une copie des données qu'il détient sur vous. Si le propriétaire assure votre bail, il ne peut pas vous demander de garant en plus, sauf si vous êtes étudiant ou apprenti.",
  publieLe: "2026-11-15",
  pilier: "C",
  format: "question",
  guidePilier: "/guides/refus-de-dossier",
  guidesLies: ["/guides/garant-caution", "/guides/louer-sans-garant", "/guides/dossier-de-location"],
  statut: "publie",
  requete: "refus dossier assurance loyer impayé",
  faits: [
    {
      fait: "Un bailleur assuré ne peut pas demander de caution, à peine de nullité",
      valeur: "cautionnement interdit, à peine de nullité, au bailleur qui a souscrit une assurance",
      source: ART22_1,
      titreSource: T_ART22_1,
      releveLe: "2026-11-15",
      citation: "Le cautionnement ne peut pas être demandé, à peine de nullité, par un bailleur qui a souscrit une assurance, ou toute autre forme de garantie",
    },
    {
      fait: "L'interdiction vise l'assurance qui garantit les obligations du locataire, sauf étudiant ou apprenti",
      valeur: "sauf logement loué à un étudiant ou un apprenti",
      source: ART22_1,
      titreSource: T_ART22_1,
      releveLe: "2026-11-15",
      citation: "garantissant les obligations locatives du locataire, sauf en cas de logement loué à un étudiant ou un apprenti",
    },
    {
      fait: "La règle ne vise pas le dépôt de garantie",
      valeur: "le dépôt de garantie n'est pas concerné",
      source: ART22_1,
      titreSource: T_ART22_1,
      releveLe: "2026-11-15",
      citation: "Cette disposition ne s'applique pas au dépôt de garantie mentionné à l'article 22.",
    },
    {
      fait: "Le droit d'accès donne une copie des données détenues",
      valeur: "copie des données personnelles détenues",
      source: CNIL,
      titreSource: T_CNIL,
      releveLe: "2026-11-15",
      citation: "devra vous fournir une copie des données personnelles qu'il détient sur vous",
    },
    {
      fait: "L'organisme indique d'où viennent les données qu'il n'a pas recueillies auprès de vous",
      valeur: "source des données collectées",
      source: CNIL,
      titreSource: T_CNIL,
      releveLe: "2026-11-15",
      citation: "toute information relative à la source spécifique des données collectées",
    },
    {
      fait: "L'organisme informe d'une décision automatisée, de son fonctionnement et de ses conséquences",
      valeur: "existence, fonctionnement et conséquences d'une décision automatisée",
      source: CNIL,
      titreSource: T_CNIL,
      releveLe: "2026-11-15",
      citation: "l'existence d'une prise de décision automatisée (y compris en cas de profilage), le fonctionnement de celle-ci, l'importance et les conséquences pour vous",
    },
    {
      fait: "Réponse dans un délai d'un mois, porté à trois mois si la demande est complexe",
      valeur: "un mois, trois mois au plus",
      source: CNIL,
      titreSource: T_CNIL,
      releveLe: "2026-11-15",
      citation: "au plus tard dans un délai d'un mois, qui peut être porté à trois mois compte tenu de la complexité de la demande",
    },
    {
      fait: "Le droit d'accès permet de contrôler l'exactitude des données et de les faire rectifier",
      valeur: "contrôle de l'exactitude, rectification",
      source: CNIL,
      titreSource: T_CNIL,
      releveLe: "2026-11-15",
      citation: "il permet également de contrôler l'exactitude des données et, au besoin, de les faire rectifier ou effacer",
    },
    {
      fait: "En cas de prolongation, l'organisme en donne la raison dans le délai d'un mois",
      valeur: "raisons de la prolongation données dans le mois",
      source: CNIL,
      titreSource: T_CNIL,
      releveLe: "2026-11-15",
      citation: "l'organisme doit vous informer des raisons de cette prolongation dans le délai d'un mois",
    },
    {
      fait: "Le droit d'accès est gratuit",
      valeur: "gratuit",
      source: CNIL,
      titreSource: T_CNIL,
      releveLe: "2026-11-15",
      citation: "l'accès à ce droit est gratuit",
    },
    {
      fait: "La demande s'adresse d'abord à l'organisme, avant toute plainte à la CNIL",
      valeur: "d'abord auprès de l'organisme",
      source: CNIL,
      titreSource: T_CNIL,
      releveLe: "2026-11-15",
      citation: "avant de saisir la cnil, vous devez exercer votre droit auprès de la société",
    },
  ],
  corps: `
## Qui a refusé votre dossier, le propriétaire ou l'assureur ? {#qui-decide}
L'assureur, d'abord. Quand le propriétaire a souscrit une assurance contre les loyers impayés, son assureur examine votre dossier et accepte ou non de couvrir le bail, selon le contrat qu'il a signé avec le propriétaire. Le propriétaire reste ensuite libre de son choix, et peut décider de ne louer qu'à un candidat que son assurance couvre.

Les seuils de revenus qui circulent en ligne ne sont pas des règles de loi : seul le contrat du propriétaire dit ce que son assureur exige. Demander au propriétaire ce qui a bloqué est donc la première chose à faire. Le guide sur le [refus de dossier](/guides/refus-de-dossier) rappelle qu'il n'a pas à motiver son choix, et quels motifs lui sont interdits.

## Pouvez-vous savoir pourquoi l'assureur a dit non ? {#motif}
Vous pouvez au moins savoir ce qu'il sait de vous. L'assureur traite vos données personnelles : le droit d'accès vous permet d'obtenir une copie de ce qu'il détient, d'apprendre d'où viennent les données qu'il n'a pas reçues de vous, et d'être informé s'il a pris une décision automatisée, de son fonctionnement et de ses conséquences pour vous.

La marche à suivre :
1. Demandez au propriétaire le nom de son assureur, par écrit.
2. Écrivez à l'assureur pour exercer votre droit d'accès. La demande est gratuite.
3. Il doit répondre dans un délai d'un mois. Ce délai peut être porté à trois mois si la demande est complexe, à condition qu'il vous en donne la raison dans le premier mois.
4. Sans réponse, vous pouvez saisir la CNIL, à condition d'avoir d'abord écrit à l'assureur. Gardez une copie de vos courriers.

Une erreur dans ce qu'il détient (un revenu mal lu, une pièce attribuée à quelqu'un d'autre) se corrige ensuite : le droit d'accès sert aussi à vérifier l'exactitude de vos données.

## Le propriétaire peut-il alors vous demander un garant ? {#garant}
Pas en plus de son assurance, sauf si vous êtes étudiant ou apprenti. La loi interdit au propriétaire qui a souscrit une assurance garantissant les obligations du locataire de demander une caution, à peine de nullité. S'il vous propose de louer quand même avec un garant, faites-lui confirmer par écrit que votre bail n'est pas couvert par son assurance.

Le dépôt de garantie, lui, reste dû : la règle ne le vise pas. Le détail du non-cumul est dans l'article [assurance loyers impayés et garant](/blog/assurance-loyers-impayes-garant), et ce qu'engage un garant dans le guide du [garant et de la caution](/guides/garant-caution).

## Faut-il retoucher son dossier pour qu'il passe ? {#dossier-exact}
Non. Présentez un dossier exact et complet, rien de plus. Ce qui peut changer une réponse, c'est une pièce manquante ou illisible que vous remplacez, ou une ressource réelle que vous aviez oubliée. Un document modifié est un faux, et un colocataire de façade ne paiera pas votre loyer : ni l'un ni l'autre n'est une solution.

Vérifiez votre dossier pièce par pièce avec la [checklist du dossier de location](/outils/dossier-de-location) : elle donne les pièces à réunir selon votre situation, et celles qu'on n'a pas le droit de vous demander.

## Vers quels logements chercher après ce refus ? {#ou-chercher}
Vers ceux dont le propriétaire n'a pas d'assurance contre les impayés, ou accepte une autre garantie pour votre bail. Posez la question dès le premier message : la réponse dit ce que vous devrez fournir. Avec un garant solide ou une garantie gratuite, un dossier refusé par un assureur peut convenir à un autre propriétaire.

Les solutions pour louer sans garant, et celles qui remplacent un garant, sont comparées dans le guide pour [louer sans garant](/guides/louer-sans-garant). Si votre contrat est récent, les articles sur la location en [intérim](/blog/louer-en-interim) ou en [période d'essai](/blog/louer-en-periode-d-essai) montrent comment présenter une situation qui inquiète les assureurs.
`,
});
