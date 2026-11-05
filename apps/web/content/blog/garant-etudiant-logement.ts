import { article } from "@/lib/blog-format";

const F31267 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F31267";
const T31267 = "Service-public.gouv.fr · Caution du locataire ou du colocataire dans un logement privé";
const F33453 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F33453";
const T33453 = "Service-public.gouv.fr · Garantie Visale : caution pour le locataire";
const F1169 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169";
const T1169 = "Service-public.gouv.fr · Futur locataire : justificatifs à donner au propriétaire";
const ANIL_CG = "https://www.anil.org/votre-besoin/louer/trouver-un-logement/caution-et-garanties/";
const L221 = "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000044073458";
const TL221 = "Légifrance · Loi du 6 juillet 1989, article 22-1";

export default article({
  slug: "garant-etudiant-logement",
  titre: "Étudiant : quel garant pour louer ?",
  titreSeo: "Étudiant : quel garant pour louer ?",
  description:
    "Parents, proche ou Visale : les garants d'un étudiant, et ce qu'un propriétaire peut lui demander, assurance comprise, qu'il soit boursier ou non.",
  chapeau:
    "Un étudiant a deux voies : un garant personnel, parent ou ami, ou Visale, ouverte à 30 ans ou moins, sans justificatif de ressources jusqu'à un certain loyer. Attention : un propriétaire déjà assuré contre les impayés peut quand même demander une caution à un étudiant, une exception que la loi réserve aussi à l'apprenti.",
  publieLe: "2026-11-06",
  pilier: "C",
  format: "question",
  guidePilier: "/guides/louer-sans-garant",
  guidesLies: ["/guides/garantie-visale", "/guides/garant-caution", "/guides/dossier-de-location"],
  statut: "publie",
  requete: "garant étudiant logement",
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
      fait: "La caution doit prouver des garanties financières suffisantes",
      valeur: "garanties financières suffisantes",
      source: F31267,
      titreSource: T31267,
      releveLe: "2026-11-05",
      citation: "prouvant qu'elle a des garanties financières suffisantes pour payer les éventuels impayés du locataire",
    },
    {
      fait: "Visale est ouverte à partir de 17 ans et 10 mois, jusqu'à 30 ans inclus, y compris à l'étudiant",
      valeur: "à partir de 17 ans et 10 mois, à 30 ans ou moins",
      source: F33453,
      titreSource: T33453,
      releveLe: "2026-11-05",
      citation: "Tous les locataires âgés d'au moins 17 ans et 10 mois",
    },
    {
      fait: "La demande de Visale se fait avant la signature du bail",
      valeur: "demande avant la signature du bail",
      source: F33453,
      titreSource: T33453,
      releveLe: "2026-11-05",
      citation: "La demande doit être faite avant la signature du bail",
    },
    {
      fait: "Sans justifier de ressources, l'étudiant est garanti jusqu'à un certain loyer",
      valeur: "loyer garanti sans justification de ressources",
      source: ANIL_CG,
      titreSource: "ANIL · Caution et garanties",
      releveLe: "2026-11-05",
      citation: "sans justification de ressources, le montant de loyer garanti est de",
    },
    {
      fait: "Pour un étudiant, Visale couvre aussi la résidence universitaire",
      valeur: "résidence universitaire",
      source: F33453,
      titreSource: T33453,
      releveLe: "2026-11-05",
      citation: "Soit résidence universitaire Soit logement-foyer Soit foyer jeune travailleur",
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
      fait: "Un bailleur personne morale, hors société civile familiale, ne peut demander une caution que d'un organisme listé par décret",
      valeur: "organisme dont la liste est fixée par décret",
      source: L221,
      titreSource: TL221,
      releveLe: "2026-11-05",
      citation: "s'il est apporté par un des organismes dont la liste est fixée par décret en Conseil d'Etat",
    },
    {
      fait: "Ce bailleur peut aussi demander une caution à un étudiant non boursier",
      valeur: "étudiant non boursier",
      source: L221,
      titreSource: TL221,
      releveLe: "2026-11-05",
      citation: "ou si le logement est loué à un étudiant ne bénéficiant pas d'une bourse de l'enseignement supérieur",
    },
    {
      fait: "La liste des justificatifs comprend la carte d'étudiant ou le certificat de scolarité",
      valeur: "carte d'étudiant ou certificat de scolarité",
      source: F1169,
      titreSource: T1169,
      releveLe: "2026-11-05",
      citation: "Carte d'étudiant ou certificat de scolarité pour l'année en cours",
    },
  ],
  corps: `
## Quel garant choisir quand on est étudiant ? {#choisir}
Vos parents si leurs revenus couvrent le loyer, un autre proche, ou Visale si vous n'avez personne. Aucun lien de famille n'est exigé : service-public cite le parent et l'ami. Ce que le propriétaire examine, ce sont les garanties financières de cette personne. Le guide [louer sans garant](/guides/louer-sans-garant) situe Visale parmi les autres voies.

Si vos parents se portent garants, ils le font par un acte séparé : l'article [bail au nom des parents ou de l'étudiant](/blog/bail-au-nom-des-parents-ou-de-l-etudiant) montre pourquoi cela change tout par rapport à un bail à leur nom. Si le garant est un proche hors de la famille, voyez [un ami peut-il être votre garant ?](/blog/garant-ami-hors-famille).

## Visale fonctionne-t-elle pour un étudiant ? {#visale}
Oui, de 17 ans et 10 mois jusqu'à 30 ans inclus. Un étudiant peut l'obtenir sans justifier de ressources jusqu'à un certain loyer, qui dépend de la zone ; au-dessus, ses ressources comptent, puis la garantie s'arrête à un plafond. Elle couvre le logement privé comme la résidence universitaire, et se demande avant de signer le bail.

Les plafonds par zone sont dans le guide de la [garantie Visale](/guides/garantie-visale). Le visa ne suffit pas à lui seul : le propriétaire doit accepter l'acte. Si vous venez de l'étranger, l'article [Visale pour un étudiant étranger](/blog/visale-etudiant-etranger) traite ce cas.

## Le Crous peut-il être votre garant ? {#crous}
Service-public cite comme personnes morales Action Logement, une entreprise ou une banque ; le Crous n'en fait pas partie. Pour une chambre en résidence universitaire comme pour un logement privé, la voie à demander est Visale. Si on vous parle d'un autre dispositif, demandez à votre Crous une page officielle à jour avant d'y compter.

## Que peut exiger le propriétaire d'un étudiant ? {#exiger}
Une caution, même s'il est déjà assuré contre les impayés : c'est l'exception prévue pour l'étudiant et l'apprenti. Pour un autre locataire, ce cumul lui est interdit. Le dossier reste limité à la liste autorisée, où figurent votre carte d'étudiant ou votre certificat de scolarité, et les justificatifs de votre garant, s'il en a un.

Le cas change si le propriétaire est une société, hors société civile familiale :

- **Vous n'êtes pas boursier** : elle peut vous demander une caution, d'une personne ou d'un organisme.
- **Vous êtes boursier** : elle ne peut demander qu'une caution venue d'un organisme dont la liste est fixée par décret.

Le propriétaire particulier, lui, n'a pas cette limite : il peut demander un garant à un étudiant, boursier ou non. Le détail de ce que signe votre garant est dans le guide [garant et caution](/guides/garant-caution), et les pièces autorisées dans le guide du [dossier de location](/guides/dossier-de-location).

## Le dépôt de garantie reste à trouver {#depot}
Un garant répond des impayés ; il ne paie pas le dépôt de garantie à votre place à l'entrée. Pour cette somme, un étudiant peut regarder du côté de l'avance Loca-Pass et du FSL : l'article sur les [aides au dépôt de garantie](/blog/aide-depot-de-garantie) donne les conditions, qui ne sont pas les mêmes que celles de Visale.
`,
});
