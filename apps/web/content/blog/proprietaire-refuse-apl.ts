import { article } from "@/lib/blog-format";

export default article({
  slug: "proprietaire-refuse-apl",
  titre: "Un propriétaire peut-il refuser un locataire qui touche les APL ?",
  titreSeo: "Propriétaire qui refuse les APL : est-ce légal ?",
  description:
    "Les APL ne justifient pas un refus : la loi interdit de choisir un locataire sur sa situation économique. Ce qui reste permis, et l'argument qui rassure.",
  chapeau:
    "Écarter un candidat parce qu'il touche les APL peut relever d'un critère que la loi interdit, la vulnérabilité liée à la situation économique, mais nous n'avons pas lu de décision qui le tranche. Il peut juger votre solvabilité, aides comprises. Argument qui rassure : en règle générale, l'APL est versée directement au propriétaire.",
  publieLe: "2026-11-04",
  pilier: "B",
  format: "question",
  guidePilier: "/guides/refus-de-dossier",
  guidesLies: ["/guides/dossier-de-location", "/guides/garantie-visale"],
  outilLie: "/outils/dossier-de-location",
  statut: "publie",
  requete: "propriétaire refuse APL",
  faits: [
    {
      fait: "La situation économique fait partie des critères interdits pour choisir un locataire",
      valeur: "vulnérabilité particulière liée à la situation économique",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14750",
      titreSource: "Service-public.gouv.fr · Discrimination à la location d'un logement",
      releveLe: "2026-11-04",
      citation: "Vulnérabilité particulière liée à la situation économique",
    },
    {
      fait: "Le propriétaire doit choisir sur des critères objectifs, dont la situation financière",
      valeur: "critères objectifs, par exemple la situation financière du candidat",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14750",
      titreSource: "Service-public.gouv.fr · Discrimination à la location d'un logement",
      releveLe: "2026-11-04",
      citation: "doit se fonder sur des critères objectifs (par exemple, la situation financière du candidat)",
    },
    {
      fait: "L'APL est en général versée directement au bailleur, qui la déduit du loyer",
      valeur: "versée directement au bailleur, déduite du loyer",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F12006",
      titreSource: "Service-public.gouv.fr · Aide personnalisée au logement (APL)",
      releveLe: "2026-11-04",
      citation: "en règle générale, directement versée à votre bailleur",
    },
    {
      fait: "La simulation des aides au logement fait partie des justificatifs de ressources autorisés",
      valeur: "attestation de simulation des aides au logement (Caf ou MSA)",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169",
      titreSource: "Service-public.gouv.fr · Futur locataire d'un logement privé : justificatifs à donner au propriétaire",
      releveLe: "2026-11-04",
      citation: "Attestation de simulation des aides au logement établie par la",
    },
  ],
  corps: `
## Un propriétaire a-t-il le droit de refuser un locataire qui touche les APL ?
Pas forcément pour ce seul motif. La loi interdit de rejeter une candidature sur certains critères, parmi lesquels la vulnérabilité particulière liée à la situation économique. Écarter un dossier parce qu'il contient des APL, sans regarder s'il permet de payer le loyer, peut relever de ce critère ; aucune décision lue ne le dit pour les APL. Les autres motifs interdits : [guide du refus de dossier](/guides/refus-de-dossier).

Le propriétaire n'a pas à motiver un refus. C'est ce qui rend ces situations difficiles à prouver, et c'est pourquoi un refus écrit qui cite les APL compte.

## Que peut regarder le propriétaire, alors ?
Votre solvabilité. Service-public rappelle qu'il doit choisir sur des critères objectifs, par exemple la situation financière du candidat. Il peut donc comparer vos ressources au loyer, demander un garant ou une garantie, et préférer un dossier plus solide. Les aides font partie de vos ressources : la simulation de la Caf ou de la MSA figure dans la liste des justificatifs qu'il peut demander.

La différence tient au raisonnement. « Vos ressources, APL comprises, ne couvrent pas le loyer » est un critère financier. « Je ne loue pas aux allocataires » vise votre situation, pas votre capacité à payer.

## Pourquoi certains propriétaires se méfient-ils des APL ?
Souvent par crainte de démarches ou de retards de paiement, plus rarement par préjugé. Beaucoup ignorent que l'aide leur est, en règle générale, versée directement : la Caf la verse au bailleur, qui la déduit du loyer. Le locataire ne paie que la différence, ce qui réduit la part qui dépend de lui chaque mois.

Le rappeler dès le premier message, sans vous justifier, lève une bonne partie des réticences.

## Comment présenter les APL dans votre dossier ?
Comme une ressource parmi d'autres, chiffrée. Joignez la simulation des aides au logement, indiquez le montant estimé et le reste à payer chaque mois. Si vous avez un garant ou une garantie comme Visale, mettez-la en avant au même endroit : notre guide de la [garantie Visale](/guides/garantie-visale) dit qui peut l'obtenir.

Pour la liste des autres pièces selon votre situation, utilisez notre [liste des pièces du dossier de location](/outils/dossier-de-location).

## Que faire si un refus cite clairement les APL ?
Gardez-en la trace : message, annonce, capture d'écran datée. Service-public cite ces éléments comme preuves d'une discrimination à la location. Vous pouvez saisir le Défenseur des droits ou signaler les faits, comme le détaille notre [guide du refus de dossier](/guides/refus-de-dossier).

En parallèle, continuez à répondre à d'autres annonces : une procédure prend du temps, votre recherche n'attend pas.
`,
});
