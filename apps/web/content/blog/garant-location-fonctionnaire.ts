import { article } from "@/lib/blog-format";

const SP_VISALE = "https://www.service-public.gouv.fr/particuliers/vosdroits/F33453";
const T_VISALE = "Service-public.gouv.fr · Garantie Visale : caution pour le locataire";
const AIP = "https://www.aip-fonctionpublique.fr/";
const T_AIP = "AIP Fonction publique · Aide à l'installation des personnels de l'État";

export default article({
  slug: "garant-location-fonctionnaire",
  titre: "Fonctionnaire ou contractuel : quel garant pour louer ?",
  titreSeo: "Fonctionnaire ou contractuel : quel garant ?",
  description:
    "Visale selon votre âge, l'aide à l'installation des agents de l'État, l'attestation d'employeur du stagiaire : les solutions de l'agent public pour louer.",
  chapeau:
    "À 30 ans ou moins, un fonctionnaire peut obtenir la garantie Visale, sous conditions. À partir de 31 ans, Visale ne vise plus que le salarié du secteur privé et le travailleur saisonnier : l'agent public doit alors trouver un garant, ou un bailleur qui s'en passe. Pour les agents de l'État, l'AIP aide à payer les frais d'entrée.",
  publieLe: "2026-11-04",
  pilier: "C",
  format: "question",
  guidePilier: "/guides/garantie-visale",
  guidesLies: ["/guides/louer-sans-garant", "/guides/garant-caution", "/guides/dossier-de-location"],
  statut: "publie",
  requete: "quel garant pour la fonction publique ?",
  faits: [
    {
      fait: "À 30 ans ou moins, le fonctionnaire peut obtenir Visale, sous conditions",
      valeur: "fonctionnaire, sous conditions",
      source: SP_VISALE,
      titreSource: T_VISALE,
      releveLe: "2026-11-04",
      citation: "(étudiant, alternant, fonctionnaire, salarié, sans emploi...), peuvent obtenir la garantie Visale, sous certaines conditions",
    },
    {
      fait: "À partir de 31 ans, la fiche vise le travailleur saisonnier",
      valeur: "travailleur saisonnier",
      source: SP_VISALE,
      titreSource: T_VISALE,
      releveLe: "2026-11-04",
      citation: "Locataire de 31 ans et plus Travailleur saisonnier Tableau - Garantie Visale : conditions pour le locataire travailleur saisonnier",
    },
    {
      fait: "À partir de 31 ans, la fiche vise aussi le salarié du secteur privé",
      valeur: "salarié du secteur privé",
      source: SP_VISALE,
      titreSource: T_VISALE,
      releveLe: "2026-11-04",
      citation: "Salarié du secteur privé (y compris agricole) Il s'agit notamment du salarié en contrat aidé, en intérim, en CDD",
    },
    {
      fait: "L'AIP est ouverte à l'agent de l'État, fonctionnaire ou contractuel, lors d'une première installation avec changement de résidence",
      valeur: "fonctionnaire ou contractuel de l'État, première installation",
      source: AIP,
      titreSource: T_AIP,
      releveLe: "2026-11-04",
      citation: "Tout agent de la fonction publique de l'État, qu'il soit fonctionnaire ou contractuel, lors de sa première installation nécessitant un changement de résidence",
    },
    {
      fait: "Dépenses couvertes par l'AIP",
      valeur: "premier loyer, charges, dépôt de garantie, frais d'agence, bail, déménagement",
      source: AIP,
      titreSource: T_AIP,
      releveLe: "2026-11-04",
      citation: "Premier mois de loyer, provision pour charges, dépôt de garantie, frais d'agence, rédaction du bail et frais de déménagement",
    },
    {
      fait: "Montants de l'AIP",
      valeur: "jusqu'à 700 €, jusqu'à 1 500 € en zone ALUR ou en quartier prioritaire",
      source: AIP,
      titreSource: T_AIP,
      releveLe: "2026-11-04",
      citation: "AIP Générique : jusqu'à 700€ AIP Ville / AIP en zone ALUR : jusqu'à 1 500€",
    },
    {
      fait: "Délais de demande de l'AIP",
      valeur: "12 mois après le bail, 24 mois après l'affectation",
      source: AIP,
      titreSource: T_AIP,
      releveLe: "2026-11-04",
      citation: "dans les 12 mois suivant la signature du bail du logement ayant motivé les dépenses et dans les 24 mois suivant l'affectation",
    },
    {
      fait: "Les délais sont temporairement prolongés de quatre mois",
      valeur: "prolongation temporaire de quatre mois",
      source: AIP,
      titreSource: T_AIP,
      releveLe: "2026-11-04",
      citation: "les délais d'éligibilité ont été automatiquement prolongés de quatre mois",
    },
    {
      fait: "L'attestation de l'employeur peut remplacer le contrat de travail",
      valeur: "attestation de l'employeur : emploi, rémunération, date d'entrée en fonctions",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169",
      titreSource: "Service-public.gouv.fr · Futur locataire d'un logement privé : justificatifs à donner au propriétaire",
      releveLe: "2026-11-04",
      citation: "attestation de l'employeur précisant l'emploi et la rémunération proposée, la date d'entrée en fonctions envisagée",
    },
    {
      fait: "Un propriétaire particulier assuré contre les impayés ne peut demander une caution que pour un étudiant ou un apprenti",
      valeur: "caution seulement si le locataire est étudiant ou apprenti",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F31267",
      titreSource: "Service-public.gouv.fr · Caution du locataire ou du colocataire dans un logement privé",
      releveLe: "2026-11-04",
      citation: "Le propriétaire qui a déjà une assurance privée contre les risques locatifs peut demander une caution seulement si son locataire est étudiant ou apprenti",
    },
  ],
  corps: `
## Un fonctionnaire peut-il obtenir la garantie Visale ? {#visale}
Oui à 30 ans ou moins : service-public cite le fonctionnaire parmi les locataires qui peuvent obtenir Visale, sous certaines conditions. À partir de 31 ans, la fiche ne vise plus que le travailleur saisonnier et le salarié du secteur privé. Un agent public de 31 ans ou plus, titulaire ou contractuel, n'entre donc pas dans les cas qu'elle liste.

Ces conditions évoluent : avant d'écarter Visale, vérifiez votre cas avec le simulateur d'éligibilité, accessible depuis le guide de la [garantie Visale](/guides/garantie-visale). Si votre demande est refusée, l'article [Visale refusée](/blog/visale-refusee) donne les causes fréquentes.

## Quelle aide existe pour les agents de l'État ? {#aip}
L'aide à l'installation des personnels de l'État (AIP) est ouverte aux fonctionnaires et aux contractuels de l'État, lors d'une première installation qui demande un changement de résidence. Elle couvre une partie du premier loyer, du dépôt de garantie, des frais d'agence et de déménagement : jusqu'à 700 €, et jusqu'à 1 500 € en zone ALUR ou en quartier prioritaire.

La demande se fait dans les 12 mois qui suivent la signature du bail et dans les 24 mois qui suivent l'affectation ; le site de l'AIP indique que ces délais sont prolongés de quatre mois, à titre temporaire. L'AIP aide à payer l'entrée, elle ne remplace pas un garant. Les agents des fonctions publiques territoriale et hospitalière se renseignent auprès du service d'action sociale de leur employeur.

## Quelle pièce fournir quand on est stagiaire ou tout juste nommé ? {#stagiaire}
L'attestation de l'employeur. La liste officielle prévoit, à défaut de contrat de travail, une attestation de l'employeur qui précise l'emploi, la rémunération proposée et la date d'entrée en fonctions envisagée. Demandez-la à votre service des ressources humaines dès votre nomination : elle permet de candidater avant votre premier bulletin de salaire, souvent au moment où vous cherchez dans une ville inconnue.

Le guide du [dossier de location](/guides/dossier-de-location) donne les autres pièces, et l'article [louer avec une promesse d'embauche](/blog/louer-avec-promesse-d-embauche) traite le même décalage entre l'embauche et le premier salaire.

## Le statut de fonctionnaire rassure-t-il un propriétaire ? {#statut}
Souvent, parce que l'emploi est stable et le traitement versé chaque mois. Mettez-le en avant dès la première phrase de votre message, avec votre revenu net mensuel. Le bailleur peut tout de même demander un garant, sauf s'il est un particulier assuré contre les loyers impayés : il ne peut alors exiger de caution que d'un étudiant ou d'un apprenti.

Un bailleur assuré suit les conditions de son assureur : demandez-lui ce qu'il exige, et joignez l'attestation de votre service, qui montre votre statut en une page.

## Sans Visale, quel garant proposer ? {#garant}
Un proche dont les revenus couvrent le loyer reste la solution la plus courante, et ses propres justificatifs suivent une liste à part. À défaut, une caution d'organisme payante existe, et certains bailleurs acceptent un dossier sans garant quand le salaire est stable. Le guide [louer sans garant](/guides/louer-sans-garant) compare ces voies et ce qu'elles coûtent.

Ce que le garant signe, et jusqu'où il s'engage, est détaillé dans le guide [garant et caution](/guides/garant-caution).
`,
});
