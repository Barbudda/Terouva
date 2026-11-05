import { article } from "@/lib/blog-format";

const F31267 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F31267";
const T31267 = "Service-public.gouv.fr · Caution du locataire ou du colocataire dans un logement privé";
const F33453 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F33453";
const T33453 = "Service-public.gouv.fr · Garantie Visale : caution pour le locataire";
const F1334 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1334";
const T1334 = "Service-public.gouv.fr · Quelle aide apporte le Fonds de solidarité pour le logement (FSL) ?";
const ANIL_PG = "https://www.anil.org/parole-expert-logement-location-pas-garant/";
const TANIL_PG = "ANIL · Je cherche une location, mais je n'ai pas de garant";
const ANIL_CG = "https://www.anil.org/votre-besoin/louer/trouver-un-logement/caution-et-garanties/";
const TANIL_CG = "ANIL · Caution et garanties";
const L221 = "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000044073458";
const TL221 = "Légifrance · Loi du 6 juillet 1989, article 22-1";

export default article({
  slug: "organisme-garant-location",
  titre: "Organisme garant pour une location : lequel existe vraiment ?",
  titreSeo: "Organisme garant location : lequel existe ?",
  description:
    "Visale, FSL selon le département, sociétés payantes : qui se porte vraiment garant, où passe la CAF, et pourquoi le propriétaire garde son mot à dire.",
  chapeau:
    "Trois sortes d'organismes se portent garant d'un locataire : Action Logement avec Visale, gratuite ; le FSL, dans certains départements seulement ; des sociétés privées, payantes. Ni la CAF ni l'État ne figurent parmi les cautions citées par service-public et l'ANIL. Et le propriétaire doit accepter : il peut préférer une personne.",
  publieLe: "2026-11-06",
  pilier: "C",
  format: "question",
  guidePilier: "/guides/louer-sans-garant",
  guidesLies: ["/guides/garantie-visale", "/guides/garant-caution"],
  statut: "publie",
  requete: "organisme garant location",
  faits: [
    {
      fait: "Une personne morale peut être caution : Action Logement, une entreprise, une banque",
      valeur: "Action Logement, entreprise, banque",
      source: F31267,
      titreSource: T31267,
      releveLe: "2026-11-05",
      citation: "soit une personne morale (Action-Logement qui distribue la garantie Visale",
    },
    {
      fait: "Pour Visale, le bailleur doit accepter l'acte de cautionnement",
      valeur: "acceptation du bailleur",
      source: F33453,
      titreSource: T33453,
      releveLe: "2026-11-05",
      citation: "doit accepter l'acte de cautionnement. En cas de dégradations locatives",
    },
    {
      fait: "Action Logement paie d'abord le bailleur, puis se fait rembourser par le locataire",
      valeur: "remboursement par le locataire",
      source: F33453,
      titreSource: T33453,
      releveLe: "2026-11-05",
      citation: "Action logement verse d'abord au bailleur le montant dû, et se fait ensuite rembourser par le locataire",
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
      fait: "Visale est un cautionnement exclusif de toute autre garantie",
      valeur: "exclusive de toute autre garantie",
      source: ANIL_CG,
      titreSource: TANIL_CG,
      releveLe: "2026-11-05",
      citation: "contrat de cautionnement exclusif de toute autre garantie (notamment caution ou assurance)",
    },
    {
      fait: "Dans certains départements, le FSL peut se porter garant",
      valeur: "FSL garant selon le département",
      source: ANIL_PG,
      titreSource: TANIL_PG,
      releveLe: "2026-11-05",
      citation: "Dans certains départements, le FSL peut se porter garant pour vous en cas d'impayés de loyer",
    },
    {
      fait: "La demande de FSL se fait auprès de la Caf ou du Conseil départemental",
      valeur: "Caf ou Conseil départemental",
      source: ANIL_PG,
      titreSource: TANIL_PG,
      releveLe: "2026-11-05",
      citation: "Vous devez faire votre demande auprès de votre Caisse d'Allocations Familiales (Caf) ou votre Conseil Départemental",
    },
    {
      fait: "Le département de la Marne liste une garantie des loyers et charges parmi les aides de son FSL",
      valeur: "garantie des loyers et charges locatives (Marne)",
      source: "https://www.marne.fr/missions-et-actions-du-departement/insertion/fonds-de-solidarite-pour-le-logement-fsl/",
      titreSource: "Département de la Marne · Fonds de solidarité pour le logement",
      releveLe: "2026-11-05",
      citation: "Garantie des loyers et charges locatives Aide à la prise en charge de dépôt de garantie",
    },
    {
      fait: "Chaque FSL a ses propres critères d'attribution",
      valeur: "critères propres à chaque département",
      source: F1334,
      titreSource: T1334,
      releveLe: "2026-11-05",
      citation: "Chaque FSL a ses propres critères d'attribution",
    },
    {
      fait: "L'aide du FSL n'est pas automatique",
      valeur: "aide non automatique",
      source: F1334,
      titreSource: T1334,
      releveLe: "2026-11-05",
      citation: "n'est pas accordée de façon automatique",
    },
    {
      fait: "Un allocataire de la Caf s'adresse à sa caisse pour rencontrer l'assistante sociale qui fait la demande",
      valeur: "passage par la caisse",
      source: F1334,
      titreSource: T1334,
      releveLe: "2026-11-05",
      citation: "Si vous recevez une aide de la Caf, vous devez contacter votre caisse",
    },
    {
      fait: "Certains organismes proposent des assurances loyers impayés à la charge du locataire",
      valeur: "prises en charge par le locataire",
      source: ANIL_CG,
      titreSource: TANIL_CG,
      releveLe: "2026-11-06",
      citation: "certains organismes proposent également des assurances « loyers impayés » prises en charge par le locataire",
    },
    {
      fait: "Un intérimaire peut, sous conditions, prétendre à une garantie du FASTT",
      valeur: "garantie du FASTT pour l'intérimaire",
      source: ANIL_PG,
      titreSource: TANIL_PG,
      releveLe: "2026-11-05",
      citation: "qui est complémentaire à la garantie Visale et qui assure au propriétaire le paiement du loyer",
    },
    {
      fait: "Un bailleur personne morale ne peut demander une caution que d'un organisme listé par décret, ou pour un étudiant non boursier",
      valeur: "organisme listé par décret, ou étudiant non boursier",
      source: L221,
      titreSource: TL221,
      releveLe: "2026-11-05",
      citation: "s'il est apporté par un des organismes dont la liste est fixée par décret en Conseil d'Etat",
    },
  ],
  corps: `
## Quels organismes se portent vraiment garant ? {#lesquels}
Action Logement avec la garantie Visale, gratuite ; le Fonds de solidarité pour le logement (FSL) dans certains départements ; et des sociétés privées, contre paiement. Service-public cite aussi l'entreprise et la banque comme cautions possibles. Le guide [louer sans garant](/guides/louer-sans-garant) compare ces voies et ce qu'elles coûtent.

Ce qui les distingue, en pratique :

- **Visale** : accordée par Action Logement, sur demande en ligne avant la signature du bail. Les conditions tiennent à votre âge, votre statut et votre loyer, détaillées dans le guide de la [garantie Visale](/guides/garantie-visale).
- **Le FSL** : réservé aux ménages en difficulté, et garant seulement si le fonds de votre département le prévoit.
- **Une société de cautionnement** : privée et payante, à garder pour la fin. Vérifiez que le propriétaire l'accepte avant de payer.
- **La banque** : elle peut être votre caution, avec un coût et des conditions qui dépendent de son offre, comme l'explique l'article sur la [caution bancaire](/blog/caution-bancaire-location).
- **Le FASTT**, si vous êtes intérimaire : sous conditions d'heures travaillées, il propose une garantie complémentaire à Visale.

## La CAF peut-elle se porter garant ? {#caf}
La CAF ne figure pas parmi les cautions que citent service-public et l'ANIL. Son rôle est ailleurs : pour un allocataire, c'est une porte d'entrée vers le FSL, puisque la demande passe par une assistante sociale jointe à la caisse, ou par le Conseil départemental. Si une garantie est accordée, elle vient alors de ce fonds.

Quand vous cherchez « garant CAF », la vraie question à poser à votre caisse est donc celle-ci : le FSL de mon département propose-t-il une garantie de loyer, et suis-je dans ses critères ?

## L'État se porte-t-il garant d'un locataire ? {#etat}
Pas directement : la caution gratuite qu'on présente souvent comme celle de l'État est Visale, et c'est Action Logement qui l'accorde. Elle ne fait pas disparaître votre dette. En cas d'impayé, Action Logement verse d'abord au propriétaire le montant dû, puis se fait rembourser par vous, selon un échéancier qui peut être aménagé.

## Le FSL peut-il être votre garant ? {#fsl}
Seulement si votre département le prévoit. Il existe un fonds par département, chacun avec ses propres critères, et son aide n'est jamais automatique. L'ANIL indique que le FSL de certains départements peut se porter garant en cas d'impayés. La Marne, par exemple, liste une garantie des loyers et charges locatives parmi ses aides.

La réponse se trouve donc au niveau local : services du département, Caf ou mairie, et l'ADIL de votre département, qui renseigne gratuitement. Si le fonds ne propose rien comme garantie, il peut encore aider à l'entrée dans le logement : l'article sur les [aides au dépôt de garantie](/blog/aide-depot-de-garantie) détaille ce volet.

## Un propriétaire peut-il préférer un garant physique ? {#preference}
Oui. Demander une caution est son choix, et aucune règle ne l'oblige à retenir un organisme plutôt qu'une personne. Visale suppose même son accord, puisqu'il doit accepter l'acte de cautionnement. Elle exclut aussi toute autre garantie : il ne peut pas prendre Visale et un garant personnel en plus. Présentez donc le visa tôt, avec un dossier complet.

La situation s'inverse si le propriétaire est une société, hors société civile familiale. Il ne peut alors demander qu'une caution venue d'un organisme dont la liste est fixée par décret, sauf si le logement est loué à un étudiant sans bourse. Le guide [garant et caution](/guides/garant-caution) explique ce qu'un garant personnel signe, si vous en trouvez un.
`,
});
