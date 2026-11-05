// Vague 9, ligne 22. Requête relevée à l'autocomplétion : « louer meublé ou vide locataire ».
// Apport : la comparaison vue depuis le locataire seulement (rien sur la fiscalité), et le cas du meuble manquant,
// qui fait d'une location annoncée meublée une location vide.

import { article } from "@/lib/blog-format";

const F1165 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1165";
const T1165 = "Service-public.gouv.fr · Bail d'habitation : quelles différences entre logement vide et logement meublé ?";
const ANIL = "https://www.anil.org/parole-expert-logement-location-bail-meublee-vide/";
const TANIL = "ANIL · Location : quelles sont les différences entre un bail meublé et non meublé ?";

export default article({
  slug: "meuble-ou-vide-locataire",
  titre: "Meublé ou vide : ce qui change pour le locataire",
  titreSeo: "Meublé ou vide : ce qui change pour vous",
  description:
    "En meublé : bail d'un an, préavis d'un mois, dépôt jusqu'à deux mois. En vide : trois ans, trois mois, un mois de dépôt. Et si un meuble manque.",
  chapeau:
    "En meublé, le bail dure au moins 1 an au lieu de 3 ans, votre préavis est de 1 mois au lieu de 3 en principe, et le dépôt de garantie peut atteindre 2 mois de loyer hors charges au lieu de 1. Le loyer est plus élevé, et s'il manque un meuble obligatoire, la location compte comme vide.",
  publieLe: "2026-11-06",
  pilier: "D",
  format: "question",
  guidePilier: "/guides/depot-de-garantie",
  guidesLies: ["/guides/preavis-location", "/guides/etat-des-lieux"],
  statut: "publie",
  requete: "louer meublé ou vide locataire",
  faits: [
    {
      fait: "Durée du bail meublé",
      valeur: "1 an minimum, 9 mois si le locataire est étudiant",
      source: F1165,
      titreSource: T1165,
      releveLe: "2026-11-05",
      citation: "1 an minimum (9 mois si le locataire est étudiant)",
    },
    {
      fait: "Durée du bail vide",
      valeur: "3 ans minimum",
      source: F1165,
      titreSource: T1165,
      releveLe: "2026-11-05",
      citation: "Durée du bail 3 ans minimum , sauf cas particulier",
    },
    {
      fait: "Durée selon le propriétaire",
      valeur: "3 ans (particulier), 6 ans (personne morale)",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "de trois ans si le propriétaire est un particulier, de six ans si le propriétaire est une personne morale",
    },
    {
      fait: "Bail étudiant de 9 mois",
      valeur: "9 mois, sans renouvellement possible",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "Lorsque le logement est loué à un étudiant, le contrat peut prévoir une durée de neuf mois, sans renouvellement possible.",
    },
    {
      fait: "Bail mobilité",
      valeur: "un à dix mois",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "qui est un contrat de courte durée (un à dix mois)",
    },
    {
      fait: "Préavis du locataire en vide",
      valeur: "3 mois, 1 mois si cas particulier",
      source: F1165,
      titreSource: T1165,
      releveLe: "2026-11-05",
      citation: "Congé à donner avec un délai de préavis de 3 mois (1 mois si cas particulier)",
    },
    {
      fait: "Préavis du locataire en meublé",
      valeur: "1 mois, à tout moment",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "Il doit en informer le propriétaire en lui envoyant une lettre de congé et respecter un préavis d'un mois.",
    },
    {
      fait: "Congé du propriétaire en vide",
      valeur: "au moins 6 mois",
      source: F1165,
      titreSource: T1165,
      releveLe: "2026-11-05",
      citation: "Congé à donner avec un délai de préavis d'au moins 6 mois",
    },
    {
      fait: "Congé du propriétaire en meublé",
      valeur: "au moins 3 mois",
      source: F1165,
      titreSource: T1165,
      releveLe: "2026-11-05",
      citation: "Congé à donner avec un délai de préavis d'au moins 3 mois",
    },
    {
      fait: "Dépôt de garantie en vide",
      valeur: "1 mois de loyer hors charges",
      source: F1165,
      titreSource: T1165,
      releveLe: "2026-11-05",
      citation: "Montant maximum : 1 mois de loyer (hors charges)",
    },
    {
      fait: "Dépôt de garantie en meublé",
      valeur: "2 mois de loyer hors charges",
      source: F1165,
      titreSource: T1165,
      releveLe: "2026-11-05",
      citation: "Montant maximum : 2 mois de loyer (hors charges)",
    },
    {
      fait: "Loyer plus élevé en meublé",
      valeur: "loyer supérieur au même logement vide",
      source: F1165,
      titreSource: T1165,
      releveLe: "2026-11-05",
      citation: "Le loyer d'un logement meublé est supérieur au loyer du même logement loué vide, compte tenu du mobilier mis à disposition.",
    },
    {
      fait: "Inventaire du mobilier",
      valeur: "inventaire et état détaillé, à la remise et à la restitution des clés",
      source: F1165,
      titreSource: T1165,
      releveLe: "2026-11-05",
      citation: "un inventaire et un état détaillé du mobilier doivent être faits lors de la remise des clés au locataire",
    },
    {
      fait: "Pas de facturation à part",
      valeur: "aucune autre facturation que l'état des lieux",
      source: F1165,
      titreSource: T1165,
      releveLe: "2026-11-05",
      citation: "L'établissement de ces documents ne peut donner lieu à aucune autre facturation que celle liée à l'établissement de l'état des lieux",
    },
    {
      fait: "Équipement en panne en meublé",
      valeur: "réparé ou remplacé par le bailleur",
      source: "https://www.anil.org/parole-expert-logement-locataire-qui-paie-les-reparations/",
      titreSource: "ANIL · Locataire ou propriétaire : qui paie les réparations dans une location ?",
      releveLe: "2026-11-05",
      citation:
        "lorsqu'un équipement fourni par le bailleur ne fonctionne plus (par exemple, une machine à laver qui tombe en panne), celui-ci doit être réparé ou remplacé par le bailleur",
    },
    {
      fait: "Mêmes obligations d'entretien",
      valeur: "mêmes obligations en vide et en meublé",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "les obligations du propriétaire et du locataire sont les mêmes que ce soit un bail vide ou meublé",
    },
    {
      fait: "Rendre le mobilier",
      valeur: "rendre l'ensemble des meubles au départ",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "il doit rendre l'ensemble des meubles qui lui ont été mis à disposition par le propriétaire",
    },
    {
      fait: "Dégradation au-delà du dépôt",
      valeur: "somme supplémentaire possible",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "le propriétaire peut exiger une somme supplémentaire",
    },
    {
      fait: "Logement vide par définition",
      valeur: "dépourvu d'au moins un meuble obligatoire",
      source: F1165,
      titreSource: T1165,
      releveLe: "2026-11-05",
      citation: "dépourvu d'au moins 1 des meubles ou objets caractérisant un logement meublé",
    },
    {
      fait: "Requalification en vide",
      valeur: "location vide si tous les meubles prévus n'y sont pas",
      source: ANIL,
      titreSource: TANIL,
      releveLe: "2026-11-05",
      citation: "la location sera considérée comme une location vide si le logement n'a pas l'ensemble des meubles et équipements prévus par la loi",
    },
    {
      fait: "Règles communes",
      valeur: "décence, assurance, cautionnement, charges récupérables",
      source: F1165,
      titreSource: T1165,
      releveLe: "2026-11-05",
      citation: "De nombreuses règles sont communes au logement vide et au logement meublé",
    },
  ],
  corps: `
## Quelles différences entre un bail meublé et un bail vide pour le locataire ? {#differences}
Quatre points comptent pour vous : la durée, le préavis, le dépôt de garantie et le loyer. Le meublé est plus court et plus souple, et il demande plus d'argent au départ. Le vide vous garantit le logement plus longtemps, avec un dépôt plus faible. Le reste, comme la décence ou l'assurance, suit des règles communes.

- **Durée du bail** : au moins 1 an en meublé, au moins 3 ans en vide (6 ans si le propriétaire est une personne morale).
- **Votre préavis** : 1 mois en meublé, 3 mois en principe en vide.
- **Préavis du propriétaire** : au moins 3 mois en meublé, au moins 6 mois en vide, à l'échéance et pour un motif autorisé.
- **Dépôt de garantie** : jusqu'à 2 mois de loyer hors charges en meublé, 1 mois en vide.
- **Loyer** : plus élevé en meublé que pour le même logement vide.

Un bail meublé de 3 ans n'est pas la règle : 1 an est le minimum, renouvelable. Pour les cas courts, voyez le [bail meublé étudiant de 9 mois](/blog/bail-meuble-etudiant-9-mois), sans renouvellement possible, et le [bail mobilité](/blog/bail-mobilite), de un à dix mois.

## Combien pouvez-vous devoir à l'entrée selon le bail ? {#depot}
Le dépôt de garantie peut atteindre 2 mois de loyer hors charges en meublé, contre 1 mois en vide. Le meublé peut donc vous demander jusqu'à deux fois plus au moment de signer, et son loyer est aussi plus élevé que celui du même logement vide. Prévoyez cet écart dans votre budget de départ.

Vérifiez que le montant demandé est calculé sur le loyer sans les charges. Le [guide du dépôt de garantie](/guides/depot-de-garantie) explique les retenues possibles et le délai de restitution, et il vaut pour les deux types de bail.

## Meublé ou vide : lequel est le plus simple à quitter ? {#partir}
Le meublé. Vous pouvez partir à tout moment dans les deux cas, mais le préavis y est de 1 mois, alors qu'il est en principe de 3 mois en vide, et de 1 mois seulement dans certains cas. Si vous savez que vous bougerez dans l'année, cette différence peut compenser un loyer plus élevé.

Faites le calcul à votre échelle : deux mois de préavis en moins, contre un loyer plus élevé chaque mois et un dépôt plus lourd. Le [guide du préavis](/guides/preavis-location) détaille les cas du préavis réduit en location vide.

En sens inverse, le propriétaire d'un meublé peut vous demander de partir plus vite : à l'échéance annuelle et avec un préavis d'au moins 3 mois, contre 6 mois en vide après trois ans. Si vous cherchez à rester longtemps, le vide vous protège davantage.

## Que pouvez-vous attendre du mobilier d'un meublé ? {#mobilier}
Une liste obligatoire de meubles et d'objets, un inventaire détaillé, et des équipements qui fonctionnent. L'inventaire et l'état détaillé du mobilier se font à la remise des clés et à leur restitution, sans autre facturation que celle de l'état des lieux. Si un équipement fourni tombe en panne, le bailleur doit le réparer ou le remplacer.

La [liste des meubles obligatoires](/blog/meubles-obligatoires-location-meublee) tient en quelques lignes : vérifiez-la pièce par pièce à la visite. Pour le reste, l'entretien courant suit les mêmes règles en vide et en meublé.

Au départ, vous rendez l'ensemble des meubles. Si le dépôt de garantie ne suffit pas à couvrir le remplacement d'un meuble que vous avez dégradé, le propriétaire peut vous demander une somme supplémentaire. Décrivez donc précisément chaque meuble à l'entrée, photos à l'appui. Le [guide de l'état des lieux](/guides/etat-des-lieux) dit comment s'y prendre.

## Que se passe-t-il s'il manque un meuble obligatoire ? {#meuble-manquant}
La location ne devrait plus être traitée comme meublée. Service-public définit le logement vide comme celui auquel il manque au moins un des meubles caractérisant un meublé, et l'ANIL indique que la location sera alors considérée comme vide. Les règles du vide, plus protectrices sur la durée et le dépôt, sont donc en jeu.

Signalez le manque par écrit avant de signer : le propriétaire peut alors ajouter le meuble, ce qui règle la question. Si vous l'apprenez après, gardez votre inventaire et des photos, et demandez à l'ADIL de votre département comment procéder dans votre situation. Elle vous renseigne gratuitement.
`,
});
