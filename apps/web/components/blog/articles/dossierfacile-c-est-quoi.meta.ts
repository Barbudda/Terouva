import type { ArticleMeta } from "@/lib/blog";

/** Fiche de l’article : tout sauf le corps, qui vit dans le fichier .tsx du même nom. */
const meta: ArticleMeta = {
  // Brief : docs/seo/blog/briefs/dossierfacile-c-est-quoi.md (calendrier, semaine 6).
  slug: "dossierfacile-c-est-quoi",
  titre: "DossierFacile : ce que c'est, ce que voit le propriétaire, et quand s'en servir",
  titreSeo: "DossierFacile : c'est quoi, est-ce fiable ?",
  description:
    "DossierFacile, le service public gratuit du dossier de location : comment il marche, ce que voit le propriétaire avec votre lien, et ses limites.",
  chapeau:
    "DossierFacile est un service public gratuit, financé par l'État, qui aide à monter un dossier de location complet et à le partager par un lien. Vos pièces reçoivent un filigrane, et vous choisissez ce que voit le propriétaire : le dossier avec ou sans justificatifs, pour une durée limitée, avec un accès que vous pouvez couper.",
  publieLe: "2026-12-14",
  pilier: "B",
  format: "question",
  lecture: 5,
  guidePilier: "/guides/dossier-de-location",
  guidesLies: ["/guides/repondre-a-une-annonce-de-location", "/guides/garantie-visale"],
  outilLie: "/outils/dossier-de-location",
  sources: [
    {
      titre: "DossierFacile · Accueil",
      url: "https://www.dossierfacile.logement.gouv.fr/",
      releveLe: "2026-11-04",
    },
    {
      titre: "DossierFacile · Qui sommes-nous ?",
      url: "https://www.dossierfacile.logement.gouv.fr/information",
      releveLe: "2026-11-04",
    },
    {
      titre: "DossierFacile · Aide : Dossier Facile c'est quoi ?",
      url: "https://aide.dossierfacile.logement.gouv.fr/fr/category/dossier-facile-cest-quoi-1lsxnpb/",
      releveLe: "2026-11-04",
    },
    {
      titre: "DossierFacile · Aide : Comment partager son dossier validé ?",
      url: "https://aide.dossierfacile.logement.gouv.fr/fr/article/comment-partager-son-dossier-valide-1orckmm/",
      releveLe: "2026-11-04",
    },
    {
      titre: "DossierFacile · Aide : Gestion des données",
      url: "https://aide.dossierfacile.logement.gouv.fr/fr/article/gestion-des-donnees-f7zd4h/",
      releveLe: "2026-11-04",
    },
    {
      titre: "DossierFacile · Aide : Supprimer son compte",
      url: "https://aide.dossierfacile.logement.gouv.fr/fr/article/supprimer-son-compte-ccyu3l/",
      releveLe: "2026-11-04",
    },
    {
      titre: "DossierFacile · Aide : Traduction simplifiée en français",
      url: "https://aide.dossierfacile.logement.gouv.fr/fr/article/traduction-simplifiee-en-francais-1wo4sm8/",
      releveLe: "2026-11-04",
    },
    {
      titre:
        "Service-public.gouv.fr · Futur locataire d'un logement privé : justificatifs à donner au propriétaire (F1169)",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169",
      releveLe: "2026-11-04",
    },
  ],
  questions: [
    {
      q: "DossierFacile, c'est quoi ?",
      a: "Un service public numérique gratuit, financé par l'État et porté par la DGALN, qui aide les candidats à réunir les pièces autorisées pour un dossier de location, ajoute un filigrane sur chaque document et permet de partager le dossier par un lien que vous contrôlez.",
    },
    {
      q: "Est-ce que DossierFacile est fiable ?",
      a: "C'est un service de l'État. D'après ses pages, les données sont hébergées en France, les pièces sont supprimées après 45 jours d'inactivité du compte, seuls ses opérateurs les consultent pour les vérifier, des sous-traitants tenus à la confidentialité peuvent les traiter, et rien n'est revendu ni transmis à des tiers sans votre accord.",
    },
    {
      q: "Que voit le propriétaire avec un lien DossierFacile ?",
      a: "Ce que vous avez choisi : le dossier avec ses justificatifs filigranés, ou une version sans documents qui présente votre situation. Le lien expire au bout de 30 jours par défaut, demande les trois premières lettres du nom du dossier, et vous pouvez le suspendre ou le supprimer.",
    },
  ],
  sommaire: [
    { id: "definition", titre: "Qu'est-ce que DossierFacile ?" },
    { id: "fiable", titre: "Est-ce fiable ?" },
    { id: "fonctionnement", titre: "Comment ça fonctionne" },
    { id: "proprietaire", titre: "Ce que voit le propriétaire" },
    { id: "quand", titre: "Quand s'en servir" },
    { id: "recherche", titre: "Ce que ça change pour votre recherche" },
  ],
  statut: "brouillon",
};

export default meta;
