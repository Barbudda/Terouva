import type { ArticleMeta } from "@/lib/blog";

/** Fiche de l’article : tout sauf le corps, qui vit dans le fichier .tsx du même nom. */
const meta: ArticleMeta = {
  // Brief : docs/seo/blog/briefs/etre-le-premier-a-repondre-a-une-annonce.md. Requête en P3,
  // « demande non prouvée » au registre, et proche de la section « L'heure d'envoi » du guide
  // pilier : publication à arbitrer par le chef (voir le brief).
  slug: "etre-le-premier-a-repondre-a-une-annonce",
  titre: "Être le premier à répondre à une annonce de location : pourquoi, et comment s'organiser",
  titreSeo: "Être le premier à répondre à une annonce",
  description:
    "Pourquoi répondre tôt à une annonce de location compte, pourquoi ça ne suffit pas, et comment s'organiser pour envoyer le premier message complet.",
  chapeau:
    "Un propriétaire organise ses visites avec les premiers messages qui lui conviennent. Répondre tôt compte donc, à condition d'envoyer le premier message complet : métier, revenu, garant, date d'arrivée. Cela se prépare avant l'annonce, avec un message écrit à l'avance, un dossier prêt, la garantie Visale si besoin, et des alertes bien réglées.",
  publieLe: "2026-11-16",
  pilier: "A",
  format: "question",
  lecture: 4,
  guidePilier: "/guides/repondre-a-une-annonce-de-location",
  guidesLies: ["/guides/dossier-de-location"],
  outilLie: "/outils/message-de-candidature",
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
  ],
  questions: [
    {
      q: "Faut-il être le premier à répondre à une annonce de location ?",
      a: "Répondre tôt aide, parce que le propriétaire organise ses visites avec les premiers messages qui lui conviennent. Mais un message rapide et incomplet l'oblige à vous relancer pendant qu'il lit les suivants : visez le premier message complet, avec métier, revenu, garant et date d'arrivée.",
    },
    {
      q: "Comment être prévenu dès qu'une annonce de location paraît ?",
      a: "Avec les alertes des sites d'annonces, réglées sur vos seuls critères indispensables et reçues en notification sur votre téléphone. L'alerte ne fait gagner du temps que si votre message et votre dossier sont déjà prêts.",
    },
  ],
  sommaire: [
    { id: "pourquoi", titre: "Pourquoi le rang compte" },
    { id: "complet", titre: "Premier et complet" },
    { id: "avant", titre: "Ce qui se prépare avant" },
    { id: "alertes", titre: "Être prévenu à temps" },
    { id: "piege", titre: "Le piège de la vitesse" },
    { id: "terouva", titre: "Ce que fait Terouva" },
  ],
  statut: "brouillon",
};

export default meta;
