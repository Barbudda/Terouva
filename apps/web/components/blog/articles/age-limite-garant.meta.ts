import type { ArticleMeta } from "@/lib/blog";

/** Fiche de l'article : tout sauf le corps, qui vit dans le fichier .tsx du même nom. */
const meta: ArticleMeta = {
  // Brief : docs/seo/blog/briefs/age-limite-garant.md. Question des « Autres
  // questions » de la requête « garant location » (registre v1).
  slug: "age-limite-garant",
  titre: "Se porter garant d'une location : y a-t-il un âge limite ?",
  titreSeo: "Garant de location : y a-t-il un âge limite ?",
  description:
    "Aucun âge maximum pour se porter garant d'une location : ce que dit le Code civil, ce que le propriétaire peut regarder, le cas du garant retraité.",
  chapeau:
    "Non, la loi ne fixe aucun âge maximum pour se porter garant. Le Code civil permet à toute personne de contracter, sauf à un mineur non émancipé ou à un majeur protégé. Un parent retraité peut donc être caution. Ce que le propriétaire regarde, ce sont ses ressources, prouvées par les pièces autorisées, et non sa date de naissance.",
  publieLe: "2026-11-23",
  pilier: "C",
  format: "question",
  lecture: 4,
  guidePilier: "/guides/garant-caution",
  guidesLies: ["/guides/louer-sans-garant", "/guides/garantie-visale"],
  outilLie: "/outils/dossier-de-location",
  sources: [
    {
      titre: "Légifrance · Articles 1145 et 1146 du Code civil (capacité de contracter)",
      url: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070721/LEGISCTA000032008378/",
      releveLe: "2026-11-04",
    },
    {
      titre: "Légifrance · Articles 225-1 à 225-4 du Code pénal",
      url: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070719/LEGISCTA000006165298",
      releveLe: "2026-11-04",
    },
    {
      titre: "Légifrance · Article 22-1 de la loi n° 89-462 du 6 juillet 1989",
      url: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000044073458",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · Caution du locataire ou du colocataire",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F31267",
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
      q: "Un retraité peut-il se porter garant d'une location ?",
      a: "Oui. Aucun texte ne fixe d'âge maximum. Le retraité prouve ses ressources avec les pièces prévues pour une caution, par exemple le justificatif de versement de ses pensions des trois derniers mois ou son dernier avis d'imposition.",
    },
    {
      q: "Un mineur peut-il être garant ?",
      a: "Non, sauf s'il est émancipé. Le Code civil range les mineurs non émancipés parmi les personnes incapables de contracter, et l'acte de cautionnement est un contrat.",
    },
    {
      q: "Que devient la caution si le garant décède ?",
      a: "Si l'acte ne prévoit rien, l'engagement passe aux héritiers pour les dettes déjà nées au jour du décès, pas pour celles qui naissent ensuite, selon Service-public.",
    },
  ],
  sommaire: [
    { id: "maximum", titre: "Un âge maximum ?" },
    { id: "minimum", titre: "Un âge minimum ?" },
    { id: "refus", titre: "Un refus à cause de l'âge" },
    { id: "retraite", titre: "Le garant retraité" },
    { id: "deces", titre: "Si le garant décède" },
    { id: "recherche", titre: "Ce que ça change pour vous" },
  ],
  statut: "brouillon",
};

export default meta;
