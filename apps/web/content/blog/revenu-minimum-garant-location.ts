// Vague 6, ligne 16. Requête relevée en autocomplétion : « garant location revenu minimum ».
// Frontière : l'outil quel-salaire-pour-un-loyer calcule pour le locataire ; cet article parle du
// garant et ne présente aucun ratio comme une règle (aucune source officielle n'en fixe).

import { article } from "@/lib/blog-format";

const ANIL = "https://www.anil.org/votre-besoin/louer/trouver-un-logement/caution-et-garanties/";
const F31267 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F31267";
const F1169 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169";

export default article({
  slug: "revenu-minimum-garant-location",
  titre: "Quel revenu faut-il pour se porter garant ?",
  titreSeo: "Garant de location : quel revenu minimum ?",
  description:
    "Aucun texte ne fixe de revenu minimum pour être garant. Ce que le propriétaire regarde, les pièces qu'il peut demander, et le cas du garant en CDD.",
  chapeau:
    "Aucun revenu minimum n'est fixé par la loi pour se porter garant. Le propriétaire juge les ressources du garant sur des pièces dont la liste est fermée : bulletins de salaire, contrat de travail, avis d'imposition, revenus du patrimoine. Un garant en CDD, retraité ou propriétaire peut convenir, si ses ressources couvrent son engagement.",
  publieLe: "2026-11-04",
  pilier: "C",
  format: "question",
  guidePilier: "/guides/garant-caution",
  guidesLies: ["/guides/dossier-de-location", "/guides/garantie-visale", "/guides/louer-sans-garant"],
  outilLie: "/outils/quel-salaire-pour-un-loyer",
  statut: "publie",
  requete: "garant location revenu minimum",
  faits: [
    {
      fait: "But des pièces demandées au candidat et au garant",
      valeur: "vérifier l'identité et le niveau de ressources",
      source: ANIL,
      titreSource: "ANIL · Caution et garanties",
      releveLe: "2026-11-04",
      citation:
        "Ces documents permettent au bailleur de s'assurer, notamment, de l'identité et du niveau de ressources du candidat.",
    },
    {
      fait: "Liste fermée des justificatifs",
      valeur: "aucune autre pièce que celles de la liste",
      source: F1169,
      titreSource: "Service-public.gouv.fr · Dossier de location : pièces que le propriétaire peut demander (F1169)",
      releveLe: "2026-11-04",
      citation: "Le propriétaire a interdiction d'en exiger d'autres.",
    },
    {
      fait: "Justificatifs de ressources d'un garant salarié",
      valeur: "3 derniers bulletins de salaire",
      source: F31267,
      titreSource: "Service-public.gouv.fr · Caution du locataire ou du colocataire dans un logement privé (F31267)",
      releveLe: "2026-11-04",
      citation:
        "peut exiger 1 ou plusieurs documents parmi les documents suivants : 3 derniers bulletins de salaires",
    },
    {
      fait: "Justificatif de situation professionnelle du garant",
      valeur: "contrat de travail ou attestation de l'employeur (emploi, rémunération, date d'entrée, période d'essai)",
      source: F31267,
      titreSource: "Service-public.gouv.fr · Caution du locataire ou du colocataire dans un logement privé (F31267)",
      releveLe: "2026-11-04",
      citation:
        "Contrat de travail ou de stage ou, si nécessaire, attestation de l'employeur précisant l'emploi et la rémunération proposée",
    },
    {
      fait: "Ressources autres que le salaire",
      valeur: "pensions, retraites, allocations ; bien immobilier ; revenus fonciers et de capitaux",
      source: F31267,
      titreSource: "Service-public.gouv.fr · Caution du locataire ou du colocataire dans un logement privé (F31267)",
      releveLe: "2026-11-04",
      citation:
        "Justification de revenus fonciers, de rentes viagères ou de revenus de valeurs et capitaux mobiliers",
    },
    {
      fait: "Ce que risque le garant",
      valeur: "saisie de ses biens, de ses revenus et de son logement s'il en est propriétaire",
      source: F31267,
      titreSource: "Service-public.gouv.fr · Caution du locataire ou du colocataire dans un logement privé (F31267)",
      releveLe: "2026-11-04",
      citation: "ses biens personnels, ses revenus et son logement (s'il lui appartient) peuvent être saisis",
    },
    {
      fait: "Limite de l'engagement d'une caution solidaire",
      valeur: "toute la dette, dans la limite des sommes pour lesquelles elle s'est engagée",
      source: ANIL,
      titreSource: "ANIL · Caution et garanties",
      releveLe: "2026-11-04",
      citation:
        "La caution peut être poursuivie pour toute la dette dont le locataire est redevable, mais dans la limite des sommes pour lesquelles elle s'est engagée.",
    },
  ],
  corps: `
## Existe-t-il un revenu minimum pour se porter garant ? {#minimum}
Non. Ni Service-public ni l'ANIL n'indiquent de revenu minimum pour être garant d'une location. Le propriétaire apprécie lui-même les ressources du garant, à partir des pièces que la réglementation l'autorise à demander. Le [guide du garant](/guides/garant-caution) explique qui peut se porter caution et ce que contient l'acte.

Un multiple du loyer revient souvent dans les annonces et les conseils entre proches. Il n'est inscrit dans aucun des textes cités ici : c'est un repère que fixe chaque propriétaire, ou l'assureur auquel il s'adresse. Il peut donc varier d'une annonce à l'autre, et se discuter.

## Que regarde le propriétaire dans le dossier du garant ? {#regarde}
Son identité et le niveau de ses ressources. L'ANIL rappelle que c'est à cela que servent les pièces demandées au candidat comme au garant. Le propriétaire compare ce que gagne ou possède le garant au loyer et aux charges qu'il garantit, sur toute la durée de son engagement.

Il regarde aussi la stabilité : un revenu régulier rassure plus qu'un montant élevé mais ponctuel. C'est pourquoi le contrat de travail, ou l'attestation de l'employeur, figure dans la liste à côté des bulletins de salaire.

## Quelles pièces peut-on demander au garant pour ses revenus ? {#pieces}
Une ou plusieurs pièces d'une liste fermée : les trois derniers bulletins de salaire, les deux derniers bilans pour un indépendant, les justificatifs de pensions, retraites ou allocations, le dernier avis d'imposition, un titre de propriété ou des justificatifs de revenus fonciers et de capitaux. Le propriétaire ne peut rien exiger d'autre.

Un garant qui gagne peu mais possède un logement, ou touche des loyers, peut donc le montrer avec les pièces prévues pour cela. Le [dossier de location](/guides/dossier-de-location) donne la liste complète, pièce par pièce.

## Peut-on être garant en CDD, au chômage ou à la retraite ? {#situations}
Oui, rien ne l'interdit. La liste des pièces prévoit le contrat de travail ou une attestation de l'employeur, sans exiger de CDI, et accepte les pensions, retraites et allocations comme ressources. Un garant en CDD montre son contrat et ses bulletins ; un retraité, ses relevés de pension et son avis d'imposition.

Pour un garant en CDD, la date de fin du contrat compte : si elle tombe tôt dans la durée du bail, joignez ce qui montre une continuité, comme d'autres contrats déjà enchaînés dans les bulletins. Pour un retraité, le relevé de pension des trois derniers mois suffit à montrer la régularité.

## Que risque le garant si le locataire ne paie plus ? {#risque}
Il doit payer les dettes locatives à la place du locataire. S'il ne le fait pas, Service-public indique que ses biens personnels, ses revenus et son logement, s'il en est propriétaire, peuvent être saisis. Une caution solidaire peut être poursuivie pour toute la dette, mais seulement dans la limite des sommes écrites dans son acte.

C'est la vraie question à se poser avant de signer, plus que le revenu exigé : le montant pour lequel on s'engage, et pour combien de temps. L'acte de cautionnement les écrit noir sur blanc.

## Et si personne n'a les revenus pour être votre garant ? {#sans}
Regardez Visale, la garantie gratuite d'Action Logement, qui remplace un garant personne physique quand vous remplissez ses conditions d'âge ou de situation. Le [guide Visale](/guides/garantie-visale) les détaille, et le guide [louer sans garant](/guides/louer-sans-garant) présente les autres solutions.

Pour savoir quel loyer vos propres revenus permettent de viser, notre outil [quel salaire pour un loyer](/outils/quel-salaire-pour-un-loyer) fait le calcul côté locataire.
`,
});
