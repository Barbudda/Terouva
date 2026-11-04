// Vague 8, ligne 17. Requête relevée sur forum (CommentÇaMarche) : « caution bancaire pour location appartement ».
// Apport : la banque est bien une caution admise, mais aucune fiche officielle ne fixe son coût, le blocage
// d'une somme n'est pas systématique, et les règles de cumul (assurance, Visale) jouent aussi avec elle.

import { article } from "@/lib/blog-format";

const F31267 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F31267";
const T31267 = "Service-public.gouv.fr · Caution du locataire ou du colocataire dans un logement privé (F31267)";
const ANIL = "https://www.anil.org/votre-besoin/louer/trouver-un-logement/caution-et-garanties/";
const TANIL = "ANIL · Caution et garanties";
const KOHEN = "https://kohenavocats.fr/2026/10/28/caution-bancaire-location-obtenir-recuperer-argent-bloque/";
const TKOHEN = "Cabinet Kohen Avocats · Caution bancaire pour une location (28 octobre 2026)";

export default article({
  slug: "caution-bancaire-location",
  titre: "Caution bancaire pour une location : la banque peut-elle remplacer le garant ?",
  titreSeo: "Caution bancaire pour une location",
  description:
    "Une banque peut être votre caution, mais son coût et le blocage d'une somme dépendent de l'offre. Ce que le propriétaire peut cumuler ou refuser.",
  chapeau:
    "Oui : Service-public cite la banque parmi les personnes morales qui peuvent se porter caution d'un locataire. Aucun tarif officiel n'existe, et le blocage d'une somme n'est pas systématique. Un propriétaire assuré contre les impayés ne peut demander une caution qu'à un étudiant ou un apprenti, et Visale exclut toute autre garantie.",
  publieLe: "2026-11-04",
  pilier: "C",
  format: "question",
  guidePilier: "/guides/louer-sans-garant",
  guidesLies: ["/guides/garant-caution", "/guides/garantie-visale", "/guides/dossier-de-location"],
  statut: "publie",
  requete: "caution bancaire pour location appartement",
  faits: [
    {
      fait: "Une banque peut être caution d'un locataire",
      valeur: "la banque figure parmi les personnes morales admises comme caution",
      source: F31267,
      titreSource: T31267,
      releveLe: "2026-11-04",
      citation: "qui distribue la garantie Visale , une entreprise, une banque...",
    },
    {
      fait: "Caution et dépôt de garantie sont deux choses distinctes",
      valeur: "ne pas confondre la caution (personne ou organisme) et le dépôt de garantie (somme d'argent)",
      source: F31267,
      titreSource: T31267,
      releveLe: "2026-11-04",
      citation: "Il ne faut pas confondre caution (personne ou organisme)",
    },
    {
      fait: "L'acte de cautionnement indique si la caution est simple ou solidaire",
      valeur: "le type de caution est indiqué dans l'acte de cautionnement",
      source: F31267,
      titreSource: T31267,
      releveLe: "2026-11-04",
      citation: "est indiqué dans l'acte de cautionnement",
    },
    {
      fait: "Propriétaire particulier assuré contre les impayés",
      valeur: "caution possible seulement pour un locataire étudiant ou apprenti",
      source: F31267,
      titreSource: T31267,
      releveLe: "2026-11-04",
      citation:
        "Le propriétaire qui a déjà une assurance privée contre les risques locatifs peut demander une caution seulement si son locataire est étudiant ou apprenti.",
    },
    {
      fait: "Propriétaire société : liste des cautions admises",
      valeur: "personnes définies par la loi, sauf location à un étudiant non boursier",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-04",
      citation:
        "Les personnes pouvant se porter caution sont définies par la loi (fonds de solidarité logement,...), sauf en cas de location à un étudiant non boursier.",
    },
    {
      fait: "Visale et autres garanties",
      valeur: "exclusive de toute autre garantie, caution ou assurance",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-04",
      citation:
        "La garantie Visale est un contrat de cautionnement exclusif de toute autre garantie (notamment caution ou assurance).",
    },
    {
      fait: "Le blocage d'une somme n'est pas systématique",
      valeur: "une contre-garantie peut être demandée, le blocage n'est pas obligatoire dans toute caution bancaire",
      source: KOHEN,
      titreSource: TKOHEN,
      releveLe: "2026-11-04",
      citation:
        "Une banque peut demander une contre-garantie, mais le blocage d'une somme n'est pas une caractéristique obligatoire de toute caution bancaire.",
    },
    {
      fait: "Formes que prend la garantie donnée à la banque",
      valeur: "compte bloqué, placement donné en garantie ou autre montage",
      source: KOHEN,
      titreSource: TKOHEN,
      releveLe: "2026-11-04",
      citation:
        "Selon l'offre et les actes, le locataire peut rencontrer un compte bloqué, un placement donné en garantie ou un autre montage.",
    },
    {
      fait: "Frais possibles",
      valeur: "frais de mise en place et de gestion",
      source: KOHEN,
      titreSource: TKOHEN,
      releveLe: "2026-11-04",
      citation: "Il peut aussi exister des frais de mise en place et de gestion.",
    },
    {
      fait: "Un contrat distinct entre le locataire et la banque",
      valeur: "contrat séparé de l'acte de cautionnement",
      source: KOHEN,
      titreSource: TKOHEN,
      releveLe: "2026-11-04",
      citation:
        "un contrat distinct peut organiser la garantie que la banque prend à l'égard du locataire.",
    },
    {
      fait: "Que demander par écrit à la banque",
      valeur: "qui détient l'argent, quel document le bloque, qui peut autoriser sa libération",
      source: KOHEN,
      titreSource: TKOHEN,
      releveLe: "2026-11-04",
      citation:
        "Il faut demander par écrit quel établissement détient réellement l'argent, quel document rend la somme indisponible et qui peut autoriser sa libération.",
    },
  ],
  corps: `
## Une banque peut-elle se porter garante à la place de vos parents ? {#principe}
Oui. La fiche de Service-public sur la caution locative cite la banque parmi les personnes morales qui peuvent se porter caution, comme une entreprise ou Action Logement avec Visale. C'est à vous de demander une offre à votre banque, qui fixe elle-même ses conditions. Le [guide pour louer sans garant](/guides/louer-sans-garant) présente les autres solutions.

Concrètement, la banque s'engage envers le propriétaire à payer si vous ne payez plus, dans les limites de l'acte de cautionnement. Cet acte précise si la caution est simple ou solidaire. Entre vous et la banque, un contrat distinct organise ce que vous lui devez en échange : c'est lui qu'il faut lire avec le plus d'attention.

## Faut-il bloquer une somme d'argent pour obtenir cette caution ? {#somme-bloquee}
Pas toujours. Une banque peut demander une contre-garantie, mais le blocage d'une somme n'est pas obligatoire dans toute caution bancaire. Selon l'offre, vous pouvez rencontrer un compte bloqué, un placement donné en garantie ou un autre montage.

Avant de signer, demandez par écrit quel établissement détient l'argent, quel document le rend indisponible et qui peut autoriser sa libération. Cette somme n'est pas le dépôt de garantie versé au propriétaire : la fiche officielle rappelle qu'il ne faut pas confondre la caution avec le dépôt de garantie.

## Combien coûte une caution bancaire ? {#cout}
Aucun tarif officiel n'existe : le prix dépend de l'offre de chaque banque. Des frais de mise en place et de gestion peuvent s'ajouter, et une somme peut rester immobilisée pendant le bail. Demandez le détail par écrit avant de remettre le moindre argent, puis comparez avec les autres solutions.

Pour une société de cautionnement, le [guide pour louer sans garant](/guides/louer-sans-garant) explique que chaque société fixe son propre tarif. Le raisonnement est le même avec une banque : comparez le coût total sur toute la durée du bail, pas seulement le premier paiement.

## Que peut exiger le propriétaire en plus d'une caution bancaire ? {#bailleur}
Cela dépend de lui. Un propriétaire particulier déjà assuré contre les loyers impayés ne peut demander une caution qu'à un étudiant ou un apprenti ; dans ce cas seulement, il peut cumuler les garanties. Pour tout autre locataire, une caution en plus de son assurance est interdite, banque comprise.

Un propriétaire société est soumis à des conditions plus strictes : l'ANIL indique que les personnes pouvant se porter caution sont définies par la loi, sauf pour un étudiant non boursier. Une banque n'y est donc pas acceptée d'office. Posez la question avant de payer quoi que ce soit.

## Caution bancaire, société de cautionnement ou Visale : laquelle choisir ? {#choisir}
Regardez d'abord Visale : l'ANIL précise qu'elle est exclusive de toute autre garantie, donc le propriétaire ne peut pas y ajouter une caution. Si vous n'y avez pas droit et que personne ne peut se porter garant pour vous, comparez par écrit l'offre de votre banque et celles des sociétés de cautionnement.

Les [conditions de Visale](/guides/garantie-visale) sont détaillées dans notre guide. Pour la caution d'un proche, le [guide du garant](/guides/garant-caution) rappelle ce que contient l'acte. Quelle que soit la solution, faites accepter la garantie par le propriétaire avant de bloquer ou de verser quoi que ce soit.
`,
});
