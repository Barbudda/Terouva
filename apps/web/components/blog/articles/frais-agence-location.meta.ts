import type { ArticleMeta } from "@/lib/blog";

/** Fiche de l'article : tout sauf le corps, qui vit dans le fichier .tsx du même nom. */
const meta: ArticleMeta = {
  // Brief : docs/seo/blog/briefs/frais-agence-location.md. Plafonds de 2026 lus
  // sur la fiche F375 de Service-public (vérifiée le 2026-01-12) : ils sont
  // révisés chaque année, l'article est à remettre à jour en janvier.
  slug: "frais-agence-location",
  titre: "Frais d'agence en location : le montant maximum, et qui paie quoi",
  titreSeo: "Frais d'agence location : maximum et qui paie",
  description:
    "Plafonds 2026 des frais d'agence pour le locataire : 12,10 €, 10,09 € ou 8,07 € le m² selon la zone, plus 3,03 € pour l'état des lieux. Calcul et règles.",
  chapeau:
    "Le locataire paie au plus la moitié des frais de visite, de dossier et de bail, et jamais plus qu'un plafond au mètre carré : 12,10 € en zone très tendue, 10,09 € en zone tendue, 8,07 € ailleurs en 2026. L'état des lieux d'entrée s'ajoute, plafonné à 3,03 € le m². Le reste revient au propriétaire.",
  publieLe: "2026-11-04",
  pilier: "D",
  format: "question",
  lecture: 5,
  guidePilier: "/guides/preavis-location",
  guidesLies: ["/guides/etat-des-lieux", "/guides/depot-de-garantie"],
  sources: [
    {
      titre: "Service-public.gouv.fr · Frais d'agence immobilière à la location d'un logement",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F375",
      releveLe: "2026-11-04",
    },
    {
      titre: "Légifrance · Article 5 de la loi n° 89-462 du 6 juillet 1989",
      url: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000037670711",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · Justificatifs à donner au propriétaire",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169",
      releveLe: "2026-11-04",
    },
  ],
  questions: [
    {
      q: "Quand paie-t-on les frais d'agence d'une location ?",
      a: "À la signature du bail pour la visite, le dossier et la rédaction du bail ; à partir de sa réalisation pour l'état des lieux d'entrée. L'article 5 de la loi du 6 juillet 1989 le prévoit. Aucune somme ne peut être demandée avant la signature du bail.",
    },
    {
      q: "Les frais d'agence sont-ils les mêmes en meublé ?",
      a: "Les règles de partage et les plafonds au mètre carré de l'article 5 visent aussi les logements meublés loués en résidence principale : le texte renvoie aux deux types de location.",
    },
    {
      q: "Paie-t-on des frais d'agence au renouvellement du bail ?",
      a: "Seulement si l'agence rédige un nouveau bail, par exemple pour une hausse d'un loyer sous-évalué. Les frais sont alors partagés avec les mêmes limites : la moitié de la facture et le plafond au mètre carré de la zone.",
    },
  ],
  sommaire: [
    { id: "maximum", titre: "Le montant maximum" },
    { id: "qui-paie", titre: "Qui paie quoi" },
    { id: "exemple", titre: "Un calcul sur un studio" },
    { id: "etat-des-lieux", titre: "L'état des lieux" },
    { id: "quand", titre: "Quand payer" },
    { id: "verifier", titre: "Vérifier et réagir" },
    { id: "recherche", titre: "Ce que ça change pour vous" },
  ],
  statut: "publie",
};

export default meta;
