import type { ArticleMeta } from "@/lib/blog";

/** Fiche de l’article : tout sauf le corps, qui vit dans le fichier .tsx du même nom. */
const meta: ArticleMeta = {
  // Brief : docs/seo/blog/briefs/dpe-recalcule-lire-l-etiquette-d-une-annonce.md.
  slug: "dpe-recalcule-lire-l-etiquette-d-une-annonce",
  titre: "DPE recalculé au 1er janvier 2027 : lire l'étiquette d'une annonce avant de répondre",
  titreSeo: "DPE 2027 : lire l'étiquette d'une annonce",
  description:
    "Classe énergie, classe climat, dépenses estimées : ce que l'étiquette d'une annonce dit au locataire, et ce que le DPE recalculé change en janvier 2027.",
  chapeau:
    "Une annonce de location affiche la classe énergie, la classe climat et les dépenses d'énergie estimées. Un logement classé G ne peut plus être loué en métropole, et le loyer d'un logement F ou G ne peut pas être révisé. Au 1er janvier 2027, le nouveau calcul peut améliorer l'étiquette des logements chauffés à l'électricité.",
  publieLe: "2026-11-04",
  pilier: "D",
  format: "actualite",
  lecture: 5,
  guidePilier: "/guides/repondre-a-une-annonce-de-location",
  guidesLies: ["/guides/dossier-de-location"],
  outilLie: "/outils/message-de-candidature",
  sources: [
    {
      titre: "Service-public.gouv.fr · Nouveau calcul du DPE : votre logement est-il concerné ?",
      url: "https://www.service-public.gouv.fr/particuliers/actualites/A18446",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · Diagnostic de performance énergétique (DPE)",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F16096",
      releveLe: "2026-11-04",
    },
    {
      titre: "Légifrance · Code de la construction, articles R126-21 à R126-25 (annonces immobilières)",
      url: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006074096/LEGISCTA000043818607/",
      releveLe: "2026-11-04",
    },
    {
      titre: "Légifrance · Article 17-1 de la loi n° 89-462 du 6 juillet 1989 (révision du loyer)",
      url: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000043977085",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · Vérifier son DPE ou audit énergétique (outil de l'Ademe)",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/R67366",
      releveLe: "2026-11-04",
    },
  ],
  questions: [
    {
      q: "Que doit indiquer une annonce de location sur le DPE ?",
      a: "La classe énergie et la classe climat, de A à G, lisibles et en couleur sur une annonce en ligne, et le « montant estimé des dépenses annuelles d'énergie pour un usage standard » avec l'année de référence des prix. Si le logement dépasse le seuil de consommation fixé par la loi, la mention « Logement à consommation énergétique excessive » s'ajoute.",
    },
    {
      q: "Un logement classé G peut-il encore être loué ?",
      a: "Non, en France métropolitaine, depuis le 1er janvier 2025 : un logement classé G ne peut plus être proposé à la location. Les logements classés F suivront le 1er janvier 2028, et les logements classés E le 1er janvier 2034.",
    },
    {
      q: "Le loyer d'un logement classé F ou G peut-il augmenter ?",
      a: "Pas par la révision annuelle. Pour un bail signé, renouvelé ou reconduit depuis le 24 août 2022 en métropole, la révision du loyer et la majoration pour travaux sont interdites dans un logement classé F ou G (article 17-1 de la loi du 6 juillet 1989).",
    },
    {
      q: "Que change le DPE au 1er janvier 2027 ?",
      a: "Le coefficient qui convertit l'électricité en énergie primaire passe de 1,9 à 1,7. L'étiquette d'un logement qui utilise beaucoup l'électricité peut s'améliorer d'une classe, rarement de deux ; aucune ne se dégrade. Un DPE déjà réalisé reste valable dix ans et peut être mis à jour gratuitement sur le service de l'Ademe.",
    },
  ],
  sommaire: [
    { id: "annonce", titre: "Ce que l'annonce doit afficher" },
    { id: "lettre", titre: "Ce que la lettre change pour vous" },
    { id: "nouveau-calcul", titre: "Le nouveau calcul au 1er janvier 2027" },
    { id: "annonces-janvier", titre: "Une étiquette peut être dépassée" },
    { id: "verifier", titre: "Vérifier le DPE d'un logement" },
    { id: "repondre", titre: "Répondre à une annonce F ou G" },
  ],
  statut: "publie",
};

export default meta;
