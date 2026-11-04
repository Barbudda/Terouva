import { article } from "@/lib/blog-format";

const F1169 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169";
const T1169 = "Service-public.gouv.fr · Futur locataire : justificatifs à donner au propriétaire";
const F375 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F375";
const T375 = "Service-public.gouv.fr · Frais d'agence immobilière à la location d'un logement";

export default article({
  slug: "louer-particulier-ou-agence",
  titre: "Louer auprès d'un particulier ou d'une agence : ce qui change pour vous",
  titreSeo: "Louer à un particulier ou par une agence",
  description:
    "Sur Leboncoin, les deux publient : frais, pièces demandées, bail, délais de réponse et signes d'un faux particulier, comparés côté locataire.",
  chapeau:
    "Moins qu'on ne le croit. Particulier ou agence, les pièces qu'on peut vous demander sont les mêmes, le bail suit le même modèle réglementaire et rien n'est dû avant sa signature. Ce qui change : les honoraires, partagés et plafonnés avec une agence, nuls avec un particulier, et la façon de vérifier à qui vous parlez.",
  publieLe: "2026-11-04",
  pilier: "A",
  format: "cas-pratique",
  guidePilier: "/guides/repondre-a-une-annonce-de-location",
  guidesLies: ["/guides/dossier-de-location"],
  statut: "publie",
  requete: "les risques de louer un studio sans agence",
  faits: [
    {
      fait: "Les frais de dossier, de visite et de bail facturés par l'agence sont partagés",
      valeur: "frais partagés entre locataire et propriétaire",
      source: F375,
      titreSource: T375,
      releveLe: "2026-11-04",
      citation: "de visite du logement et de rédaction du bail est à partager entre le locataire et le propriétaire",
    },
    {
      fait: "La part du locataire ne dépasse ni la moitié des frais, ni un plafond au mètre carré",
      valeur: "moitié des frais et plafond au mètre carré",
      source: F375,
      titreSource: T375,
      releveLe: "2026-11-04",
      citation: "Le montant payé par le locataire ne peut pas dépasser à la fois",
    },
    {
      fait: "Le propriétaire ne peut faire payer au locataire que le loyer et les charges",
      valeur: "aucun frais autre que le loyer et les charges",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1686",
      titreSource: "Service-public.gouv.fr · Clauses interdites dans un bail d'habitation",
      releveLe: "2026-11-04",
      citation: "Le propriétaire ne doit pas obliger le locataire à lui payer des frais, autres que le loyer et les charges locatives",
    },
    {
      fait: "Exiger une pièce hors de la liste expose à une amende",
      valeur: "3 000 €, 15 000 € pour une personne morale",
      source: F1169,
      titreSource: T1169,
      releveLe: "2026-11-04",
      citation: "il encourt une amende pouvant aller jusqu'à 3 000 € (ou 15 000 € s'il s'agit d'une personne morale",
    },
    {
      fait: "Aucune somme ne peut être réclamée avant la signature du bail",
      valeur: "aucune somme avant la signature du bail",
      source: F1169,
      titreSource: T1169,
      releveLe: "2026-11-04",
      citation: "Aucune somme d'argent ne peut être réclamée par le propriétaire avant la signature du bail d'habitation",
    },
    {
      fait: "Le bail suit le modèle réglementaire en vigueur à sa signature",
      valeur: "bail conforme au modèle réglementaire",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2066",
      titreSource: "Service-public.gouv.fr · Bail d'habitation : documents remis par le propriétaire (bailleur)",
      releveLe: "2026-11-04",
      citation: "Il doit être conforme au modèle de bail réglementaire en vigueur à la date de signature du bail",
    },
  ],
  corps: `
Le cas type : deux studios dans le même quartier sur Leboncoin, au même loyer. L'un est publié par un particulier, l'autre par une agence qui affiche des honoraires. Lequel choisir, et que surveiller dans chaque cas ?

## Louer sans agence est-il plus risqué pour le locataire ? {#risques}
Pas sur le plan des droits. Le particulier comme l'agence ne peuvent exiger que les justificatifs de la liste officielle, aucune somme ne peut être demandée avant la signature du bail, et le bail suit le même modèle réglementaire dans les deux cas. Le risque propre à la location entre particuliers tient à l'identité : vérifier que votre interlocuteur est bien le propriétaire.

Le reste se joue sur la qualité de l'échange. Un particulier sérieux répond à vos questions, fait visiter et vous laisse relire le bail. Une agence sérieuse fait de même, avec des honoraires en plus. Dans les deux cas, la méthode pour [répondre à une annonce](/guides/repondre-a-une-annonce-de-location) est la même.

## Quels frais paie-t-on avec une agence, et avec un particulier ? {#frais}
Avec une agence, les frais de dossier, de visite et de rédaction du bail sont partagés entre vous et le propriétaire : votre part ne peut dépasser ni la moitié de la facture, ni un plafond au mètre carré qui dépend de la zone. Avec un particulier, aucun honoraire : il ne peut vous faire payer d'autres frais que le loyer et les charges.

À l'entrée, le dépôt de garantie s'ajoute dans les deux cas. Le calcul des plafonds, zone par zone, est détaillé dans l'article sur les [frais d'agence](/blog/frais-agence-location). Un particulier qui annonce des « frais de dossier » vous demande ce que la loi ne lui permet pas.

## Les pièces demandées sont-elles les mêmes ? {#pieces}
Oui. La liste des justificatifs autorisés vaut pour le propriétaire comme pour l'agence, et tous deux risquent une amende s'ils en exigent d'autres : jusqu'à 3 000 €, ou 15 000 € pour une personne morale. Un dossier complet et conforme à cette liste sert donc tel quel pour une annonce de particulier comme pour une annonce d'agence.

La liste pièce par pièce, et celles qu'on ne peut pas vous demander, sont dans le [guide du dossier de location](/guides/dossier-de-location).

## Qui répond le plus vite ? {#delais}
Aucune règle ne fixe de délai, ni à l'un ni à l'autre. Un particulier décide seul et peut répondre le soir même. Une agence trie souvent les dossiers, puis les soumet au propriétaire, ce qui ajoute une étape mais aussi un interlocuteur joignable aux heures de bureau. Dans les deux cas, un dossier complet envoyé tôt a plus de chances d'être lu.

Si le silence dure après votre envoi, l'article sur le [propriétaire qui ne répond pas](/blog/proprietaire-ne-repond-pas) aide à décider quand relancer.

## Comment reconnaître un faux particulier ? {#faux-particulier}
Deux profils trompent : l'escroc qui se dit propriétaire d'un logement qu'il ne possède pas, et l'intermédiaire qui se présente en particulier pour facturer des frais. Méfiez-vous de qui demande de l'argent avant la visite ou avant le bail, refuse de faire visiter, ou annonce des frais de dossier : un vrai particulier n'a rien à vous facturer en plus du loyer.

À la signature, comparez le nom et l'adresse du bailleur inscrits sur le bail avec la personne qui vous a fait visiter. Les autres signes d'une annonce piégée, du loyer trop bas au propriétaire qui ne peut pas vous rencontrer, sont dans l'article sur les [fausses annonces de location](/blog/arnaque-location-reconnaitre-fausse-annonce).
`,
});
