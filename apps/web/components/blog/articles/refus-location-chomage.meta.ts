import type { ArticleMeta } from "@/lib/blog";

/** Fiche de l'article : tout sauf le corps, qui vit dans le fichier .tsx du même nom. */
const meta: ArticleMeta = {
  // Brief : docs/seo/blog/briefs/refus-location-chomage.md. Le libellé du
  // critère est recopié de l'article 225-1 du Code pénal en vigueur, lu sur
  // Légifrance le 2026-11-04 ; la décision 2019-001 a été relue le même jour.
  slug: "refus-location-chomage",
  titre: "Un propriétaire peut-il refuser un candidat au chômage ?",
  titreSeo: "Louer au chômage : un refus est-il légal ?",
  description:
    "Un propriétaire peut-il écarter un candidat parce qu'il est au chômage ? Ce que dit la loi, ce qui reste permis, et comment présenter vos ressources.",
  chapeau:
    "Le chômage ne figure pas en tant que tel parmi les critères de discrimination du Code pénal : un propriétaire peut écarter un dossier aux ressources trop faibles. Mais la vulnérabilité économique est un critère interdit, et le Défenseur des droits a jugé discriminatoire, au titre du handicap, le refus d'un candidat qui touchait une pension d'invalidité.",
  publieLe: "2026-11-04",
  pilier: "B",
  format: "question",
  lecture: 6,
  guidePilier: "/guides/refus-de-dossier",
  guidesLies: ["/guides/dossier-de-location", "/guides/garantie-visale"],
  outilLie: "/outils/dossier-de-location",
  sources: [
    {
      titre: "Légifrance · Articles 225-1 à 225-4 du Code pénal",
      url: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070719/LEGISCTA000006165298",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · Discrimination à la location d'un logement",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14750",
      releveLe: "2026-11-04",
    },
    {
      titre: "Défenseur des droits · Décision n° 2019-001 du 28 janvier 2019",
      url: "https://juridique.defenseurdesdroits.fr/doc_num.php?explnum_id=18508",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · Justificatifs à donner au propriétaire",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · Garantie Visale",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F33453",
      releveLe: "2026-11-04",
    },
  ],
  questions: [
    {
      q: "Quel document prouve des allocations chômage dans un dossier de location ?",
      a: "Le justificatif de versement des allocations perçues lors des trois derniers mois, ou le justificatif de l'ouverture des droits, établi par l'organisme payeur. Il fait partie de la liste des pièces de ressources que le propriétaire peut demander.",
    },
    {
      q: "Peut-on obtenir la garantie Visale au chômage ?",
      a: "À 30 ans et moins, Visale ne pose pas de condition d'emploi, mais des conditions de loyer et de ressources. À partir de 31 ans, elle est réservée aux salariés du secteur privé sous conditions, ou à ceux qui ont une promesse d'embauche avec prise de fonction dans les trois mois.",
    },
    {
      q: "Où signaler un refus de location qui semble discriminatoire ?",
      a: "Au Défenseur des droits, gratuitement, ou par une plainte dans un commissariat ou une brigade de gendarmerie, dans les six ans suivant les faits. Gardez les échanges écrits : ce sont eux qui permettent de montrer le motif.",
    },
  ],
  sommaire: [
    { id: "interdit", titre: "Le chômage, motif interdit ?" },
    { id: "permis", titre: "Ce que le propriétaire peut regarder" },
    { id: "nature", titre: "Salaire ou allocations" },
    { id: "pieces", titre: "Prouver vos allocations" },
    { id: "garanties", titre: "Les garanties possibles" },
    { id: "signaler", titre: "Un refus qui semble discriminatoire" },
    { id: "recherche", titre: "Ce que ça change pour vous" },
  ],
  statut: "publie",
};

export default meta;
