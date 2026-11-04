import type { ArticleMeta } from "@/lib/blog";

/** Fiche de l’article : tout sauf le corps, qui vit dans le fichier .tsx du même nom. */
const meta: ArticleMeta = {
  // Brief : docs/seo/blog/briefs/revision-du-loyer-irl.md. Format rendez-vous : même adresse,
  // mise à jour à chaque IRL (prochain : 2027-01-15), avec une entrée dans `misesAJour`.
  slug: "revision-du-loyer-irl",
  titre: "Révision du loyer avec l'IRL du 3e trimestre 2026 : de combien votre loyer peut-il augmenter ?",
  titreSeo: "Révision du loyer et IRL : de combien ?",
  description:
    "IRL du 3e trimestre 2026 : 148,06, soit + 1,57 % sur un an. Le calcul de votre nouveau loyer, le délai du bailleur et les cas où la révision est interdite.",
  chapeau:
    "Si votre bail prévoit une révision, le loyer peut augmenter une fois par an, au plus de la variation de l'indice de référence des loyers. Celui du 3e trimestre 2026 vaut 148,06, en hausse de 1,57 % sur un an : 700 € deviennent 711 €. La révision est interdite pour un logement classé F ou G.",
  publieLe: "2026-11-20",
  pilier: "D",
  format: "rendez-vous",
  lecture: 4,
  guidePilier: "/guides/preavis-location",
  guidesLies: ["/guides/depot-de-garantie", "/guides/dossier-de-location"],
  sources: [
    {
      titre: "Insee · Indice de référence des loyers, troisième trimestre 2026 (Informations rapides n° 246)",
      url: "https://www.insee.fr/fr/statistiques/9081853",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · Indice de référence des loyers (IRL)",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F13723",
      releveLe: "2026-11-04",
    },
    {
      titre: "Légifrance · Article 17-1 de la loi n° 89-462 du 6 juillet 1989 (révision du loyer)",
      url: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000043977085",
      releveLe: "2026-11-04",
    },
    {
      titre: "Légifrance · Article 22 de la loi n° 89-462 du 6 juillet 1989 (dépôt de garantie)",
      url: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000028806696",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · Augmentation et révision du loyer en cours de bail (logement vide)",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F36511/0_1?idFicheParent=F1311",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · L'APL revalorisée au 1er octobre",
      url: "https://www.service-public.gouv.fr/particuliers/actualites/A16807",
      releveLe: "2026-11-04",
    },
  ],
  questions: [
    {
      q: "Quel est l'IRL du 3e trimestre 2026 ?",
      a: "148,06 en France métropolitaine, soit une hausse de 1,57 % sur un an, publié par l'Insee le 15 octobre 2026. Il vaut 143,80 en Corse et 145,21 dans les départements d'outre-mer, avec la même hausse. Le prochain indice paraîtra le 15 janvier 2027.",
    },
    {
      q: "Comment calculer la révision de son loyer ?",
      a: "Nouveau loyer = loyer actuel × IRL du trimestre de référence de cette année ÷ IRL du même trimestre de l'année précédente, arrondi au centime. Pour un loyer de 700 € et le 3e trimestre : 700 × 148,06 ÷ 145,77 = 711,00 €. Le trimestre de référence est celui du bail, ou à défaut le dernier publié à la signature.",
    },
    {
      q: "Le propriétaire peut-il réclamer une révision des années passées ?",
      a: "Non. Il doit manifester sa volonté de réviser le loyer dans l'année qui suit la date de révision, sinon il est réputé y avoir renoncé pour l'année écoulée. Et la hausse ne prend effet qu'à compter de sa demande, sans rattrapage des mois passés.",
    },
    {
      q: "Quand la révision du loyer est-elle interdite ?",
      a: "Quand le bail ne contient pas de clause de révision, pour un bail mobilité, et pour un logement classé F ou G au DPE dont le bail a été signé, renouvelé ou reconduit depuis le 24 août 2022 en métropole (le 1er juillet 2024 outre-mer).",
    },
  ],
  sommaire: [
    { id: "valeurs", titre: "Les dernières valeurs de l'IRL" },
    { id: "conditions", titre: "Quand le loyer peut être révisé" },
    { id: "calcul", titre: "Le calcul du nouveau loyer" },
    { id: "delai", titre: "Une révision oubliée" },
    { id: "interdit", titre: "Les cas où la révision est interdite" },
    { id: "locataire", titre: "Ce que ça change pour vous" },
  ],
  statut: "brouillon",
};

export default meta;
