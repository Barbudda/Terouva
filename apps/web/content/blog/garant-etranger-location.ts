// Vague 6, ligne 14. Requête relevée en autocomplétion : « garant étranger location France ».
// Apport : la règle de non-refus et, surtout, les pièces qu'un garant vivant hors de France peut
// réellement fournir (avis d'imposition étranger, traduction, conversion en euros).

import { article } from "@/lib/blog-format";

const ANIL = "https://www.anil.org/votre-besoin/louer/trouver-un-logement/caution-et-garanties/";
const F31267 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F31267";
const F1169 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169";

export default article({
  slug: "garant-etranger-location",
  titre: "Garant étranger : un propriétaire peut-il le refuser ?",
  titreSeo: "Garant étranger : peut-on vous le refuser ?",
  description:
    "Un garant étranger ou vivant hors de France ne peut pas être refusé pour ce motif. Les pièces qu'il fournit, traduites et converties en euros.",
  chapeau:
    "Non. Un propriétaire qui demande un garant ne peut pas refuser le vôtre parce qu'il n'a pas la nationalité française ou qu'il vit hors de l'Hexagone. Votre garant fournit les mêmes pièces qu'un garant en France, avec l'avis d'imposition de son pays, une traduction en français et des montants convertis en euros.",
  publieLe: "2026-11-04",
  pilier: "C",
  format: "question",
  guidePilier: "/guides/garant-caution",
  guidesLies: ["/guides/dossier-de-location", "/guides/refus-de-dossier", "/guides/louer-sans-garant"],
  outilLie: "/outils/dossier-de-location",
  statut: "brouillon",
  requete: "garant étranger location",
  faits: [
    {
      fait: "Refus d'une caution pour sa nationalité ou son lieu de résidence",
      valeur: "interdit : ni nationalité étrangère, ni résidence hors de l'Hexagone",
      source: ANIL,
      titreSource: "ANIL · Caution et garanties",
      releveLe: "2026-11-04",
      citation:
        "Le bailleur ne peut refuser la caution d'une personne, par exemple, au motif qu'elle ne possède pas la nationalité française ou qu'elle réside en dehors du territoire hexagone",
    },
    {
      fait: "Pièce d'identité du garant",
      valeur: "carte d'identité, passeport ou permis de conduire, français ou étranger, avec photo",
      source: F31267,
      titreSource: "Service-public.gouv.fr · Caution du locataire ou du colocataire dans un logement privé (F31267)",
      releveLe: "2026-11-04",
      citation: "Carte d'identité française ou étrangère (avec photo) Passeport français ou étranger (avec photo)",
    },
    {
      fait: "Revenus non imposés en France",
      valeur: "dernier ou avant-dernier document équivalent de l'administration fiscale du pays",
      source: F31267,
      titreSource: "Service-public.gouv.fr · Caution du locataire ou du colocataire dans un logement privé (F31267)",
      releveLe: "2026-11-04",
      citation:
        "Lorsque tout ou partie des revenus perçus n'a pas été imposé en France, il faut fournir le dernier ou avant-dernier document équivalent",
    },
    {
      fait: "Langue et devise des copies",
      valeur: "rédigées ou traduites en français, montants convertis en euros",
      source: F31267,
      titreSource: "Service-public.gouv.fr · Caution du locataire ou du colocataire dans un logement privé (F31267)",
      releveLe: "2026-11-04",
      citation:
        "La copie doit être rédigée ou traduite en français. Les montants inscrits sur la copie doivent être convertis en euros.",
    },
    {
      fait: "Original exigible",
      valeur: "le propriétaire peut demander à voir l'original",
      source: F31267,
      titreSource: "Service-public.gouv.fr · Caution du locataire ou du colocataire dans un logement privé (F31267)",
      releveLe: "2026-11-04",
      citation: "Mais le propriétaire (ou l'agence immobilière) a le droit d'exiger la présentation de l'original.",
    },
    {
      fait: "Liste fermée des justificatifs",
      valeur: "aucune autre pièce que celles de la liste",
      source: F1169,
      titreSource: "Service-public.gouv.fr · Dossier de location : pièces que le propriétaire peut demander (F1169)",
      releveLe: "2026-11-04",
      citation: "Le propriétaire a interdiction d'en exiger d'autres.",
    },
  ],
  corps: `
## Un propriétaire peut-il refuser un garant parce qu'il est étranger ? {#refus}
Non. Le propriétaire qui exige un garant ne peut pas refuser celui que vous proposez parce qu'il n'a pas la nationalité française, ni parce qu'il habite hors de l'Hexagone. L'ANIL le rappelle dans sa fiche sur la caution. Le [guide du garant](/guides/garant-caution) reprend cette règle avec les autres conditions de l'acte de cautionnement.

La règle vise le motif du refus. Un propriétaire reste libre de juger qu'un dossier ne le rassure pas, mais il ne peut pas écarter un garant pour sa nationalité ou son pays de résidence. Si un refus vous est donné pour cette raison, gardez le message écrit : c'est ce qui permet ensuite de le contester. Le guide [refus de dossier](/guides/refus-de-dossier) explique vers qui se tourner.

## Quelles pièces un garant vivant à l'étranger doit-il fournir ? {#pieces}
Les mêmes que tout garant : une pièce d'identité, un justificatif de domicile, un justificatif de situation professionnelle et un ou plusieurs justificatifs de ressources. La liste est fixée par décret et le propriétaire ne peut rien exiger d'autre. Seuls changent la forme des documents, leur langue et leur devise.

Pour l'identité, Service-public accepte une carte d'identité, un passeport ou un permis de conduire, **français ou étrangers**, avec photo. Pour les ressources, un garant salarié à l'étranger fournit ses derniers bulletins de salaire et son contrat de travail ou une attestation de son employeur. Le [dossier de location](/guides/dossier-de-location) détaille chaque pièce.

## Que remplace l'avis d'imposition quand le garant n'est pas imposé en France ? {#impots}
Le document fiscal de son pays. Quand tout ou partie de ses revenus n'a pas été imposé en France, le garant fournit le dernier ou l'avant-dernier document équivalent établi par l'administration fiscale de l'État où il déclare. Le propriétaire ne peut pas exiger à la place un avis d'imposition français qu'il n'a pas.

Choisissez le document le plus récent que votre garant a reçu, et celui qui montre le revenu annuel de la façon la plus lisible. Si le pays délivre plusieurs pièces, une attestation de revenus de l'administration fiscale vaut mieux qu'une simple déclaration remplie par lui.

## Faut-il traduire les documents et convertir les montants ? {#traduction}
Oui. Le garant peut envoyer des copies, mais chaque copie doit être rédigée ou traduite en français, et les montants qu'elle porte doivent être convertis en euros. Le propriétaire a aussi le droit de demander à voir l'original, ce qui compte quand votre garant vit loin : prévoyez comment le montrer, en visio par exemple.

Une conversion lisible évite les malentendus : indiquez à côté de chaque montant le taux retenu et sa date, et le montant mensuel en euros. Un propriétaire qui compare des salaires en devises étrangères à son loyer hésite moins quand le calcul est déjà fait.

### Ce qu'on ne peut pas demander à votre garant
La liste du décret est fermée, et elle ne change pas parce que votre garant vit à l'étranger. Si l'on vous réclame pour lui une pièce qui n'y figure pas, répondez en joignant la pièce équivalente de la liste et en citant la fiche Service-public sur les justificatifs autorisés.

## Comment présenter un garant étranger pour rassurer le propriétaire ? {#presenter}
Envoyez un dossier complet dès la première réponse : pièces traduites, montants convertis, et une ligne qui dit où vit votre garant et comment le joindre. Un propriétaire hésite surtout devant ce qu'il ne sait pas vérifier. Un dossier en français, classé dans l'ordre de la liste officielle, lui ôte cette difficulté.

Notre [outil de dossier de location](/outils/dossier-de-location) range les pièces dans cet ordre, les vôtres et celles du garant. Si aucun garant n'est possible, ni en France ni à l'étranger, le guide [louer sans garant](/guides/louer-sans-garant) présente les autres solutions.
`,
});
