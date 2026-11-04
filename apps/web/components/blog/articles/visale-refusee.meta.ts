import type { ArticleMeta } from "@/lib/blog";

/** Fiche de l'article : tout sauf le corps, qui vit dans le fichier .tsx du même nom. */
const meta: ArticleMeta = {
  // Brief : docs/seo/blog/briefs/visale-refusee.md. Les faits n° 5 et 9 du
  // brief (que faire après un refus, validité du visa) viennent de la FAQ
  // locataires de visale.fr, lue dans un navigateur le 2026-11-04.
  slug: "visale-refusee",
  titre: "Garantie Visale refusée : pourquoi, et ce que vous pouvez faire",
  titreSeo: "Visale refusée : pourquoi, et que faire ?",
  description:
    "Visa Visale refusé ou propriétaire qui n'en veut pas : deux refus différents. Les causes vérifiables, ce que vous pouvez corriger, les autres garanties.",
  chapeau:
    "Un refus de Visale a deux origines. Action Logement refuse le visa quand une condition manque : âge, situation, ressources, loyer trop élevé ou dossier incomplet. Le propriétaire, lui, doit souscrire le contrat et peut ne pas le faire. Dans le premier cas, corrigez la demande ou visez un loyer plus bas ; dans le second, proposez une autre garantie.",
  publieLe: "2026-11-23",
  pilier: "C",
  format: "question",
  lecture: 6,
  guidePilier: "/guides/garantie-visale",
  guidesLies: ["/guides/louer-sans-garant", "/guides/garant-caution"],
  outilLie: "/outils/dossier-de-location",
  sources: [
    {
      titre: "Service-public.gouv.fr · Garantie Visale : caution pour le locataire",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F33453",
      releveLe: "2026-11-04",
    },
    {
      titre: "Visale.fr · FAQ locataires, « Ma demande de visa »",
      url: "https://www.visale.fr/vos-questions/faq-locataires/ma-demande-de-visa/",
      releveLe: "2026-11-04",
    },
    {
      titre: "Légifrance · Article 22-1 de la loi n° 89-462 du 6 juillet 1989",
      url: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000044073458",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · Avance Loca-Pass",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F18490",
      releveLe: "2026-11-04",
    },
  ],
  questions: [
    {
      q: "Combien de temps un visa Visale est-il valable ?",
      a: "Trois mois au plus, six mois pour les étudiants, les alternants et les volontaires du service civique, selon la FAQ de visale.fr. La date figure sur le visa. Passé ce délai, le visa devient obsolète et il faut refaire une demande, à condition de remplir toujours les conditions.",
    },
    {
      q: "Peut-on avoir deux visas Visale en même temps ?",
      a: "Non. Visale n'autorise qu'une demande de visa à la fois. Pour modifier un visa, il faut l'annuler puis créer une nouvelle demande, ce qui n'est possible que s'il n'est pas déjà rattaché à un contrat de cautionnement.",
    },
    {
      q: "Le visa suffit-il à garantir le logement ?",
      a: "Non. Le visa certifie que vous êtes éligible. La garantie n'existe qu'une fois que le propriétaire a créé son compte sur visale.fr et signé le contrat de cautionnement, avant la signature du bail.",
    },
  ],
  sommaire: [
    { id: "qui", titre: "Qui a refusé" },
    { id: "conditions", titre: "Les conditions qui manquent" },
    { id: "incomplet", titre: "Demande incomplète ou non conforme" },
    { id: "loyer", titre: "Un loyer au-dessus du plafond" },
    { id: "redemander", titre: "Refaire une demande" },
    { id: "proprietaire", titre: "Le propriétaire qui refuse Visale" },
    { id: "sans-visale", titre: "Sans Visale" },
    { id: "recherche", titre: "Ce que ça change pour vous" },
  ],
  statut: "brouillon",
};

export default meta;
