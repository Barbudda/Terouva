import type { ArticleMeta } from "@/lib/blog";

/** Fiche de l’article : tout sauf le corps, qui vit dans le fichier .tsx du même nom. */
const meta: ArticleMeta = {
  // Brief : docs/seo/blog/briefs/filigrane-documents-dossier-location.md.
  slug: "filigrane-documents-dossier-location",
  titre: "Mettre un filigrane sur les documents de son dossier de location",
  titreSeo: "Filigrane sur son dossier de location",
  description:
    "Quoi écrire dans le filigrane de votre dossier de location, où le placer, et comment l'ajouter avec Filigrane Facile ou sans rien envoyer en ligne.",
  chapeau:
    "Un filigrane protège les copies de votre dossier de location : écrivez en travers de chaque pièce à qui vous l'envoyez, la date et l'usage. La copie ne peut plus resservir telle quelle, et vous savez d'où vient une fuite. Le service public Filigrane Facile le fait gratuitement, et un simple logiciel ou un stylo suffisent aussi.",
  publieLe: "2026-11-04",
  pilier: "B",
  format: "question",
  lecture: 5,
  guidePilier: "/guides/dossier-de-location",
  guidesLies: ["/guides/garant-caution"],
  outilLie: "/outils/dossier-de-location",
  sources: [
    {
      titre: "Filigrane Facile · Ajoutez un filigrane à n'importe quel document",
      url: "https://filigrane.beta.gouv.fr/",
      releveLe: "2026-11-04",
    },
    {
      titre:
        "France Travail · Filigrane Facile : protégez vos documents de candidature contre l'usurpation d'identité",
      url: "https://www.francetravail.fr/candidat/soyez-vigilants/filigrane-facile--un-nouveau-ser.html",
      releveLe: "2026-11-04",
    },
    {
      titre:
        "Service-public.gouv.fr · Futur locataire d'un logement privé : justificatifs à donner au propriétaire (F1169)",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169",
      releveLe: "2026-11-04",
    },
    {
      titre: "DossierFacile · Accueil (filigrane des documents)",
      url: "https://www.dossierfacile.logement.gouv.fr/",
      releveLe: "2026-11-04",
    },
  ],
  questions: [
    {
      q: "Que mettre dans le filigrane d'un dossier de location ?",
      a: "À qui vous envoyez le document, la date et l'usage, par exemple « Dossier de location pour [nom du propriétaire], le [date], usage unique ». Le nom du destinataire vous dit d'où vient une fuite ; la date et l'usage empêchent de présenter la copie pour une autre démarche.",
    },
    {
      q: "Comment mettre un filigrane sur une pièce d'identité gratuitement ?",
      a: "Avec Filigrane Facile, service gratuit de l'État sur filigrane.beta.gouv.fr : sans inscription, vous déposez un fichier JPG, PNG, HEIC ou PDF, écrivez un texte de 100 caractères au plus et téléchargez un PDF. On peut aussi ajouter la mention avec un logiciel de PDF, ou à la main sur une copie imprimée puis numérisée.",
    },
    {
      q: "Un propriétaire peut-il refuser une pièce filigranée ?",
      a: "Vous avez le droit de fournir une copie, et le propriétaire a le droit d'exiger de voir l'original, d'après Service-public. Un filigrane lisible ne change pas cette règle : si le propriétaire veut vérifier, montrez-lui l'original plutôt que d'envoyer une copie sans protection.",
    },
  ],
  sommaire: [
    { id: "pourquoi", titre: "Pourquoi un filigrane ?" },
    { id: "texte", titre: "Quoi écrire" },
    { id: "placement", titre: "Où le placer" },
    { id: "filigrane-facile", titre: "Avec Filigrane Facile" },
    { id: "hors-ligne", titre: "Sans rien envoyer en ligne" },
    { id: "refus", titre: "Le propriétaire peut-il refuser ?" },
    { id: "recherche", titre: "Ce que ça change pour votre recherche" },
  ],
  statut: "publie",
};

export default meta;
