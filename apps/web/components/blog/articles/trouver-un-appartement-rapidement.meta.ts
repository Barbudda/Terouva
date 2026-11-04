import type { ArticleMeta } from "@/lib/blog";

/** Fiche de l’article : tout sauf le corps, qui vit dans le fichier .tsx du même nom. */
const meta: ArticleMeta = {
  // Brief : docs/seo/blog/briefs/trouver-un-appartement-rapidement.md.
  slug: "trouver-un-appartement-rapidement",
  titre: "Comment trouver un appartement rapidement : les gestes, dans l'ordre",
  titreSeo: "Trouver un appartement rapidement",
  description:
    "Trouver un appartement vite commence avant la première annonce : dossier prêt, garant réglé, message préparé, critères élargis, fausses annonces évitées.",
  chapeau:
    "Préparez tout avant de chercher : un dossier complet avec les seules pièces autorisées, la question du garant réglée, par exemple avec la garantie Visale demandée à l'avance, et un message prêt à adapter. Activez ensuite des alertes aux critères assez larges, et répondez dans l'heure. Méfiez-vous des annonces qui demandent de l'argent avant le bail.",
  publieLe: "2026-11-04",
  pilier: "A",
  format: "question",
  lecture: 5,
  guidePilier: "/guides/repondre-a-une-annonce-de-location",
  guidesLies: ["/guides/dossier-de-location", "/guides/louer-sans-garant"],
  outilLie: "/outils/dossier-de-location",
  sources: [
    {
      titre: "Service-public.gouv.fr · Futur locataire : justificatifs à donner au propriétaire",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · Garantie Visale",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F33453",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · DossierFacile (locataire)",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/R51424",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · Arnaques à la location immobilière sur internet",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34092",
      releveLe: "2026-11-04",
    },
    {
      titre: "ANIL · Caution et garanties : la garantie Visale",
      url: "https://www.anil.org/votre-besoin/louer/trouver-un-logement/caution-et-garanties/",
      releveLe: "2026-11-04",
    },
  ],
  questions: [
    {
      q: "Comment trouver un appartement rapidement ?",
      a: "En préparant tout avant de chercher : un dossier complet avec les pièces autorisées, un garant ou une garantie Visale déjà obtenue, un message prêt à adapter. Ensuite, des alertes aux critères assez larges avec notifications, et une réponse envoyée dès que l'annonce paraît.",
    },
    {
      q: "Peut-on obtenir la garantie Visale avant d'avoir trouvé un logement ?",
      a: "Oui. Le visa se demande en ligne avant d'avoir trouvé le logement, et Service-public indique qu'il est délivré en quelques jours ouvrés. Vous le présentez ensuite au propriétaire avec votre dossier.",
    },
    {
      q: "Comment repérer une fausse annonce de location ?",
      a: "Service-public cite un prix très bas pour l'emplacement ou la surface, des photos vues dans une autre annonce, un propriétaire qui refuse de vous rencontrer, une demande d'argent avant la signature du bail ou de documents officiels avant la visite.",
    },
  ],
  sommaire: [
    { id: "commencer", titre: "Le dossier d'abord" },
    { id: "garant", titre: "Le garant réglé" },
    { id: "repondre", titre: "Répondre plus vite" },
    { id: "criteres", titre: "Des critères plus larges" },
    { id: "arnaques", titre: "Les fausses annonces" },
    { id: "urgence", titre: "Une solution d'attente" },
  ],
  statut: "publie",
};

export default meta;
