import type { ArticleMeta } from "@/lib/blog";

/** Fiche de l’article : tout sauf le corps, qui vit dans le fichier .tsx du même nom. */
const meta: ArticleMeta = {
  // Brief : docs/seo/blog/briefs/encadrement-des-loyers-novembre-2026.md. L'adresse
  // du brief portait l'année, que les tests interdisent ; celle-ci couvre
  // les deux issues du vote et ne changera pas.
  slug: "encadrement-des-loyers-fin-ou-prolongation",
  titre: "Encadrement des loyers fin novembre 2026 : ce qui est sûr, ce qui dépend du vote",
  titreSeo: "Encadrement des loyers : fin ou prolongation",
  description:
    "Le plafonnement des loyers arrive à son terme fin novembre 2026. Ce qui est acquis, ce qui dépend du vote, et comment vérifier le loyer d'une annonce.",
  chapeau:
    "L'expérimentation qui plafonne le niveau des loyers dans neuf territoires arrive à son terme fin novembre 2026. Le Sénat a voté le 21 octobre une prolongation de deux ans, mais l'Assemblée nationale ne l'a pas encore adoptée. Quoi qu'il arrive, la hausse de loyer entre deux locataires reste encadrée en zone tendue jusqu'au 31 juillet 2027.",
  publieLe: "2026-11-13",
  pilier: "D",
  format: "actualite",
  lecture: 6,
  guidePilier: "/guides/preavis-location",
  guidesLies: ["/guides/repondre-a-une-annonce-de-location", "/guides/dossier-de-location"],
  sources: [
    {
      titre: "Légifrance · Article 140 de la loi n° 2018-1021 du 23 novembre 2018 (loi Elan)",
      url: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000043977071",
      releveLe: "2026-11-04",
    },
    {
      titre: "Sénat · Proposition de loi pour retrouver la confiance et l'équilibre dans les rapports locatifs",
      url: "https://www.senat.fr/travaux-parlementaires/textes-legislatifs/la-loi-en-clair/proposition-de-loi-pour-retrouver-la-confiance-et-lequilibre-dans-les-rapports-locatifs.html",
      releveLe: "2026-11-04",
    },
    {
      titre: "Sénat · Dossier législatif de la proposition de loi",
      url: "https://www.senat.fr/dossier-legislatif/ppl25-217.html",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · Encadrement des loyers",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1314",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · Encadrement de l'évolution des loyers reconduit",
      url: "https://www.service-public.gouv.fr/particuliers/actualites/A17566",
      releveLe: "2026-11-04",
    },
  ],
  questions: [
    {
      q: "Quand l'encadrement des loyers prend-il fin ?",
      a: "L'expérimentation créée par la loi Elan dure huit ans à compter de sa publication au Journal officiel du 24 novembre 2018. Le Sénat écrit qu'elle « arrive à son terme le 23 novembre 2026 » ; Service-public indique qu'elle s'applique à Paris « jusqu'au 24 novembre 2026 ». Une prolongation de deux ans est votée au Sénat, pas encore adoptée.",
    },
    {
      q: "L'encadrement des loyers est-il prolongé ?",
      a: "Pas encore. Le Sénat a adopté le 21 octobre 2026, en première lecture, une prolongation de deux ans à périmètre constant. Le texte a été transmis à l'Assemblée nationale et n'est pas adopté définitivement : tant qu'il ne l'est pas, il ne s'applique pas.",
    },
    {
      q: "La hausse de loyer entre deux locataires est-elle toujours limitée ?",
      a: "Oui, dans les communes en zone tendue. Un décret du 20 juillet 2026 reconduit l'encadrement de l'évolution des loyers du 1er août 2026 au 31 juillet 2027, indépendamment du vote sur le plafonnement. Des exceptions existent, notamment après des travaux importants.",
    },
    {
      q: "Combien de temps pour contester un complément de loyer ?",
      a: "Aujourd'hui, trois mois à partir de la signature du bail, devant la commission départementale de conciliation, gratuitement. Le texte voté au Sénat porterait ce délai à un an, mais il ne s'applique pas tant qu'il n'est pas adopté définitivement.",
    },
  ],
  sommaire: [
    { id: "terme", titre: "Ce qui s'arrête fin novembre" },
    { id: "territoires", titre: "Les territoires encadrés" },
    { id: "vote", titre: "La prolongation en discussion" },
    { id: "evolution", titre: "La hausse entre deux locataires" },
    { id: "bail", titre: "Un bail signé cet hiver" },
    { id: "verifier", titre: "Vérifier le loyer d'une annonce" },
    { id: "contester", titre: "Contester un loyer trop haut" },
    { id: "recherche", titre: "Ce que ça change pour vous" },
  ],
  statut: "brouillon",
};

export default meta;
