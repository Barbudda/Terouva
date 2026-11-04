import type { ArticleMeta } from "@/lib/blog";

/** Fiche de l’article : tout sauf le corps, qui vit dans le fichier .tsx du même nom. */
const meta: ArticleMeta = {
  // Brief : docs/seo/blog/briefs/preavis-un-mois-zone-tendue-villes.md. Étude :
  // docs/seo/blog/donnees/zones-tendues/ (script, méthode, chiffres). La date de
  // publication est provisoire : le chef la fixe au passage en « publie ».
  slug: "preavis-un-mois-zone-tendue-villes",
  titre: "Préavis d'un mois en zone tendue : 17 grandes villes restent à trois mois",
  titreSeo: "Préavis d'un mois : les villes en zone tendue",
  description:
    "1 430 communes en zone tendue, 26,5 millions d'habitants : où le préavis d'une location vide tombe à un mois, et les 17 grandes villes restées à trois.",
  chapeau:
    "En location vide, le préavis tombe de trois mois à un mois dans 1 430 communes classées en zone tendue, où vivent 26,5 millions d'habitants, soit 39 % de la population. Mais 17 des 42 villes de plus de 100 000 habitants n'en font pas partie, dont Reims, Dijon, Angers, Tours et Rouen. Chiffres relevés le 4 novembre 2026.",
  publieLe: "2026-11-04",
  pilier: "D",
  format: "etude",
  lecture: 5,
  guidePilier: "/guides/preavis-location",
  guidesLies: ["/guides/etat-des-lieux", "/guides/depot-de-garantie"],
  sources: [
    {
      titre: "Ministère de la Transition écologique · Liste des communes selon le zonage TLV (décret du 22 décembre 2025)",
      url: "https://www.data.gouv.fr/datasets/liste-des-communes-selon-le-zonage-tlv-1",
      releveLe: "2026-11-04",
    },
    {
      titre: "Insee · Fichier d'ensemble des populations en 2023",
      url: "https://www.insee.fr/fr/statistiques/8680726",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · Préavis et formalités du congé donné par le locataire",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1168",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · Simulateur : savoir si un logement est en zone tendue",
      url: "https://www.service-public.gouv.fr/simulateur/calcul/zones-tendues",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · Une taxe unique pour les logements vacants à partir de 2027",
      url: "https://www.service-public.gouv.fr/particuliers/actualites/A18896",
      releveLe: "2026-11-04",
    },
    {
      titre: "Légifrance · Décret n° 2026-831 du 25 août 2026",
      url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000054761859",
      releveLe: "2026-11-04",
    },
  ],
  questions: [
    {
      q: "Combien de communes sont en zone tendue pour le préavis ?",
      a: "1 430 communes sur 34 875, depuis le décret du 22 décembre 2025. Elles réunissent 26,5 millions d'habitants, soit 39 % de la population hors Mayotte. Dans ces communes, le locataire d'un logement vide peut donner un préavis d'un mois au lieu de trois, à condition de l'indiquer dans sa lettre de congé.",
    },
    {
      q: "Quelles grandes villes ne sont pas en zone tendue ?",
      a: "Dix-sept des 42 communes de 100 000 habitants ou plus : Reims, Saint-Étienne, Le Havre, Dijon, Angers, Clermont-Ferrand, Le Mans, Brest, Tours, Amiens, Limoges, Metz, Perpignan, Besançon, Rouen, Mulhouse et Nancy. Le préavis d'une location vide y reste de trois mois, sauf autre motif prévu par la loi.",
    },
    {
      q: "Une commune « touristique et tendue » donne-t-elle droit au préavis d'un mois ?",
      a: "Non. Selon Service-public, seul le premier tableau de l'annexe du décret du 10 mai 2013 ouvre le préavis réduit. Les 2 259 communes « touristiques et tendues », ajoutées en 2023 dans un second tableau, n'en font pas partie.",
    },
    {
      q: "La liste des zones tendues change-t-elle en 2027 ?",
      a: "Oui. Un décret du 25 août 2026 fixe une nouvelle liste pour la taxe sur la vacance des logements à partir de 2027 et abroge l'ancienne au 1er janvier 2027. Au 4 novembre 2026, la liste qui servira ensuite au préavis n'est pas encore précisée : vérifiez votre commune sur le simulateur officiel au moment d'écrire votre lettre.",
    },
  ],
  sommaire: [
    { id: "chiffres", titre: "Les chiffres clés" },
    { id: "villes", titre: "Les grandes villes en zone tendue" },
    { id: "pourquoi", titre: "Pourquoi certaines n'y sont pas" },
    { id: "verifier", titre: "Vérifier votre commune" },
    { id: "touristiques", titre: "Les communes touristiques" },
    { id: "autres-motifs", titre: "Les autres motifs" },
    { id: "2027", titre: "Ce qui change en 2027" },
    { id: "methode", titre: "Méthode" },
  ],
  statut: "brouillon",
};

export default meta;
