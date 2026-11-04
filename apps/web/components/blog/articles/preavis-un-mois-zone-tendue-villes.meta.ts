import type { ArticleMeta } from "@/lib/blog";

/** Fiche de l’article : tout sauf le corps, qui vit dans le fichier .tsx du même nom. */
const meta: ArticleMeta = {
  // Brief : docs/seo/blog/briefs/preavis-un-mois-zone-tendue-villes.md. Étude :
  // docs/seo/blog/donnees/zones-tendues/ (script, méthode, chiffres). La date de
  // publication est provisoire : le chef la fixe au passage en « publie ».
  slug: "preavis-un-mois-zone-tendue-villes",
  // Angle recentré sur les villes (relecture du 2026-11-04) : la requête « préavis 1 mois
  // zone tendue » appartient au guide /guides/preavis-location, d'après le registre.
  titre: "Zones tendues : les 17 grandes villes où le préavis reste de trois mois",
  titreSeo: "Zones tendues : 17 grandes villes hors liste",
  description:
    "Reims, Dijon, Angers, Tours, Rouen : 17 des 42 plus grandes villes sont hors zone tendue. La liste compte 1 430 communes et 26,5 millions d'habitants.",
  chapeau:
    "Dix-sept des 42 villes de plus de 100 000 habitants ne figurent pas sur la liste des zones tendues, dont Reims, Dijon, Angers, Tours et Rouen : le préavis d'une location vide y reste de trois mois. La liste compte 1 430 communes, où vivent 26,5 millions d'habitants, soit 39 % de la population. Relevé du 4 novembre 2026.",
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
      q: "Combien de communes sont en zone tendue ?",
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
      a: "Les communes restent les mêmes, mais le texte qui les liste change. Un décret du 25 août 2026 abroge l'ancien décret au 1er janvier 2027 et reprend le même périmètre pour la nouvelle taxe sur la vacance des logements. Au 4 novembre 2026, le texte auquel le préavis renverra ensuite n'est pas précisé : vérifiez votre commune sur le simulateur officiel.",
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
  statut: "publie",
};

export default meta;
