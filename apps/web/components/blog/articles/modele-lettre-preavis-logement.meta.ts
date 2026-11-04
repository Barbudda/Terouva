import type { ArticleMeta } from "@/lib/blog";

/** Fiche de l’article : tout sauf le corps, qui vit dans le fichier .tsx du même nom. */
const meta: ArticleMeta = {
  // Brief : docs/seo/blog/briefs/modele-lettre-preavis-logement.md.
  slug: "modele-lettre-preavis-logement",
  titre: "Modèle de lettre de préavis de logement : 1 mois, 3 mois, meublé",
  titreSeo: "Lettre de préavis logement : 4 modèles",
  description:
    "Quatre modèles de lettre de préavis à compléter : logement vide à trois mois, un mois en zone tendue ou pour un motif, et logement meublé.",
  chapeau:
    "La lettre de préavis dépend de votre bail. En logement vide, le préavis est de trois mois, ou d'un mois en zone tendue et dans certaines situations, à condition de l'écrire dans la lettre. En meublé, il est d'un mois sans motif. Voici quatre modèles à compléter, et la phrase qui évite de payer deux mois de trop.",
  publieLe: "2026-12-07",
  pilier: "D",
  format: "modele",
  lecture: 5,
  guidePilier: "/guides/preavis-location",
  guidesLies: ["/guides/etat-des-lieux", "/guides/depot-de-garantie"],
  sources: [
    {
      titre:
        "Service-public.gouv.fr · Préavis et formalités du congé donné par le locataire (F1168)",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1168",
      releveLe: "2026-11-04",
    },
    {
      titre:
        "Service-public.gouv.fr · Modèle de lettre : donner son préavis au propriétaire du logement (R16635)",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/R16635",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · Simulateur : délai de préavis du locataire (zones tendues)",
      url: "https://www.service-public.gouv.fr/simulateur/calcul/zones-tendues",
      releveLe: "2026-11-04",
    },
  ],
  questions: [
    {
      q: "Que doit contenir une lettre de préavis pour un logement en zone tendue ?",
      a: "L'adresse du logement loué et la mention que vous bénéficiez d'un délai de préavis réduit à un mois, en renvoyant à l'article 15 de la loi du 6 juillet 1989. Sans ces mentions, Service-public indique que le préavis est de trois mois.",
    },
    {
      q: "Quel est le préavis pour quitter un logement meublé ?",
      a: "Un mois, dans tous les cas, y compris pour un bail étudiant de neuf mois. Vous n'avez ni motif à indiquer, ni justificatif à fournir.",
    },
    {
      q: "Une lettre de préavis peut-elle être envoyée par courriel ?",
      a: "Non. Elle part par lettre recommandée avec avis de réception, par acte de commissaire de justice ou en main propre contre récépissé. Le délai court à partir de la réception par le propriétaire.",
    },
  ],
  sommaire: [
    { id: "choisir", titre: "Quelle lettre choisir ?" },
    { id: "trois-mois", titre: "Logement vide, trois mois" },
    { id: "zone-tendue", titre: "Zone tendue, un mois" },
    { id: "motif", titre: "Un mois pour un autre motif" },
    { id: "meuble", titre: "Logement meublé, un mois" },
    { id: "a-deux", titre: "Deux sur le bail" },
    { id: "envoi", titre: "Comment l'envoyer" },
    { id: "recherche", titre: "Ce que ça change pour votre recherche" },
  ],
  statut: "brouillon",
};

export default meta;
