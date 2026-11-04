import { article } from "@/lib/blog-format";

const SP_PIECES = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169";
const T_PIECES = "Service-public.gouv.fr · Futur locataire d'un logement privé : justificatifs à donner au propriétaire";
const CNIL = "https://www.cnil.fr/fr/precisions-sur-le-projet-de-fichier-des-incidents-de-paiement-dans-le-secteur-du-logement-locatif";
const T_CNIL = "CNIL · Précisions sur le projet de fichier des incidents de paiement dans le secteur du logement locatif";
const SP_CHARGES = "https://www.service-public.gouv.fr/particuliers/vosdroits/F947";
const T_CHARGES = "Service-public.gouv.fr · Charges à payer par le locataire (charges locatives ou charges récupérables)";

export default article({
  slug: "anciens-impayes-loyer-fichier-locataires",
  titre: "D'anciens impayés de loyer : existe-t-il un fichier des locataires ?",
  titreSeo: "Impayés de loyer : fichier des mauvais payeurs ?",
  description:
    "Ce que la CNIL exige d'un fichier d'impayés, ce qu'une ancienne dette peut faire apparaître dans un dossier, et comment la présenter sans rien cacher.",
  chapeau:
    "La liste des pièces qu'un bailleur peut demander ne prévoit la consultation d'aucun fichier de locataires, et la CNIL exige d'un fichier d'impayés des garanties strictes. Une ancienne dette peut pourtant ressortir : l'ancien bailleur peut la réclamer pendant 3 ans, et son attestation dit si vous êtes à jour. Mieux vaut l'expliquer, preuves à l'appui, que la taire.",
  publieLe: "2026-11-04",
  pilier: "B",
  format: "question",
  guidePilier: "/guides/refus-de-dossier",
  guidesLies: ["/guides/dossier-de-location", "/guides/louer-sans-garant"],
  statut: "publie",
  requete: "fichier mauvais payeur",
  faits: [
    {
      fait: "La FNAIM a annoncé en janvier 2020 un projet de fichier des incidents de paiement locatifs",
      valeur: "annonce du 15 janvier 2020",
      source: CNIL,
      titreSource: T_CNIL,
      releveLe: "2026-11-04",
      citation: "Le 15 janvier 2020, le président de la FNAIM a annoncé la création prochaine d'un fichier des incidents de paiement",
    },
    {
      fait: "Aucun texte n'interdit par principe un fichier d'impayés",
      valeur: "pas d'interdiction de principe",
      source: CNIL,
      titreSource: T_CNIL,
      releveLe: "2026-11-04",
      citation: "aucun texte n'interdisait, par principe, la mise en oeuvre d'un fichier d'impayés",
    },
    {
      fait: "Un tel fichier doit limiter les données, encadrer l'inscription et l'accès, fixer une durée de conservation",
      valeur: "données proportionnées, inscription vérifiée, accès limité, durée de conservation",
      source: CNIL,
      titreSource: T_CNIL,
      releveLe: "2026-11-04",
      citation: "vérifier de manière exigeante les conditions dans lesquelles un locataire peut y être inscrit, délimiter strictement les personnes ayant accès à de telles données",
    },
    {
      fait: "La CNIL insiste sur l'information des personnes inscrites et l'effacement",
      valeur: "information des personnes, mécanismes d'effacement",
      source: CNIL,
      titreSource: T_CNIL,
      releveLe: "2026-11-04",
      citation: "notamment leur parfaite information et les mécanismes d'effacement",
    },
    {
      fait: "Le FICP est consulté par les établissements de crédit pour étudier la solvabilité",
      valeur: "FICP consulté par les établissements de crédit",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F17608",
      titreSource: "Service-public.gouv.fr · Fichier des incidents de remboursement des crédits aux particuliers (FICP)",
      releveLe: "2026-11-04",
      citation: "Les établissements de crédit et les sociétés de financement consultent le FICP pour étudier la solvabilité",
    },
    {
      fait: "Justificatif de domicile : 3 dernières quittances, ou attestation du précédent propriétaire que le locataire est à jour",
      valeur: "3 dernières quittances, attestation du précédent propriétaire",
      source: SP_PIECES,
      titreSource: T_PIECES,
      releveLe: "2026-11-04",
      citation: "3 dernières quittances de loyer ou, si nécessaire, une attestation du précédent propriétaire (ou de son mandataire) indiquant que le locataire est à jour de ses loyers et charges",
    },
    {
      fait: "Le propriétaire peut réclamer un impayé de loyer pendant 3 ans",
      valeur: "3 ans",
      source: SP_CHARGES,
      titreSource: T_CHARGES,
      releveLe: "2026-11-04",
      citation: "peut réclamer pendant 3 ans tout impayé de charges ou de loyers qui lui est dû",
    },
    {
      fait: "Exemple : une dette d'octobre 2026 peut être réclamée jusqu'en octobre 2029",
      valeur: "octobre 2026, octobre 2029",
      source: SP_CHARGES,
      titreSource: T_CHARGES,
      releveLe: "2026-11-04",
      citation: "une dette de loyer ou de charges datant de octobre 2026 peut être réclamée jusqu'en octobre 2029",
    },
  ],
  corps: `
## Existe-t-il un fichier des locataires mauvais payeurs ? {#fichier}
Aucun fichier public de ce type ne figure dans les règles de la location : la liste des pièces qu'un bailleur peut demander ne prévoit la consultation d'aucun fichier. La CNIL rappelle qu'aucun texte n'interdit par principe un fichier d'impayés, mais qu'il doit vérifier de manière exigeante les conditions d'inscription, limiter strictement les accès et fixer une durée de conservation.

La CNIL a rappelé ces exigences en janvier 2020, quand le président de la FNAIM a annoncé un projet de fichier des incidents de paiement dans la location. Elle insiste aussi sur l'information des personnes inscrites et sur les mécanismes d'effacement : si l'on vous dit que vous êtes « fiché », demandez par écrit de quel fichier il s'agit. Le fichier de la Banque de France, le FICP, concerne le crédit, et ce sont les établissements de crédit qui le consultent ; l'article [fiche Banque de France](/blog/fiche-banque-de-france-louer-appartement) le détaille.

## Que peut révéler une ancienne dette de loyer ? {#dette}
Surtout votre justificatif de domicile. La liste officielle prévoit vos trois dernières quittances de loyer ou, si nécessaire, une attestation du précédent propriétaire indiquant que vous êtes à jour de vos loyers et charges. Si une dette reste due, votre ancien bailleur ne signera pas cette attestation, et il peut vous réclamer un loyer impayé pendant 3 ans.

Service-public donne l'exemple d'une dette d'octobre 2026, qui peut être réclamée jusqu'en octobre 2029. Une dette ancienne n'a donc pas forcément disparu : mieux vaut savoir où elle en est avant de candidater.

## Faut-il parler d'anciens impayés au propriétaire ? {#en-parler}
Rien ne vous oblige à raconter votre passé locatif, mais vous ne devez jamais fournir un faux document ni une fausse attestation. Si le bailleur demande l'attestation de votre précédent propriétaire, ou si la dette est encore réclamée, expliquez-le en deux phrases, avec la preuve de ce que vous avez réglé ou de l'échéancier en cours.

Un dossier vrai et expliqué inspire plus confiance qu'un dossier parfait qui se révèle faux au moment de la signature. Si l'on vous écarte malgré tout, le guide du [refus de dossier](/guides/refus-de-dossier) explique ce qu'un bailleur peut et ne peut pas retenir.

## Comment rassurer un bailleur après des impayés ? {#rassurer}
Montrez ce qui a changé : des revenus réguliers aujourd'hui, la dette soldée ou un plan de remboursement respecté, et une garantie. Vos quittances récentes, ou une attestation de bon payeur de votre logement actuel, pèsent plus que l'ancien incident. Un garant ou une garantie comme Visale, selon votre âge et votre situation, couvre précisément le risque que le bailleur redoute.

L'article [attestation de bon payeur](/blog/attestation-bon-payeur-location) dit comment l'obtenir, et le guide [louer sans garant](/guides/louer-sans-garant) compare les garanties possibles.

## Que faire si une ancienne dette vous suit encore ? {#dette-en-cours}
Prenez contact avec l'ancien bailleur pour convenir d'un échéancier écrit, puis gardez chaque preuve de paiement. Un plan respecté devient un argument dans votre dossier : il montre que vous tenez vos engagements. Si la dette vous paraît contestable ou trop ancienne, l'ADIL de votre département peut vous expliquer vos droits face à l'ancien propriétaire.

Dans votre message de candidature, une phrase suffit : « J'ai eu un retard de loyer en 2024, soldé depuis, et je joins mes quittances de l'année. » Le reste du dossier, complet, parle pour vous : le guide du [dossier de location](/guides/dossier-de-location) en donne la liste.
`,
});
