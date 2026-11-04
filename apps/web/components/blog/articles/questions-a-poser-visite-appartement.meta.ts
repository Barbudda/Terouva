import type { ArticleMeta } from "@/lib/blog";

/** Fiche de l’article : tout sauf le corps, qui vit dans le fichier .tsx du même nom. */
const meta: ArticleMeta = {
  // Brief : docs/seo/blog/briefs/questions-a-poser-visite-appartement.md. La
  // date de publication est provisoire : le chef la fixe au passage en « publie ».
  slug: "questions-a-poser-visite-appartement",
  titre: "Visite d'appartement : les questions à poser avant de candidater",
  titreSeo: "Visite d'appartement : les questions à poser",
  description:
    "Loyer, charges, chauffage, surface, classe énergie, frais d'agence : les questions à poser lors d'une visite de location, et une liste à garder sur vous.",
  chapeau:
    "À une visite de location, posez d'abord les questions qui coûtent : charges et ce qu'elles couvrent, coût du chauffage, classe énergie, frais d'agence. Vérifiez ensuite la surface, l'humidité et les fenêtres, puis demandez quelles pièces envoyer et quand le propriétaire décide. Arrivez avec votre dossier prêt : vous pourrez l'envoyer le soir même.",
  publieLe: "2026-11-04",
  pilier: "A",
  format: "modele",
  lecture: 6,
  guidePilier: "/guides/repondre-a-une-annonce-de-location",
  guidesLies: ["/guides/dossier-de-location", "/guides/etat-des-lieux"],
  outilLie: "/outils/dossier-de-location",
  sources: [
    {
      titre: "Service-public.gouv.fr · Logement à louer décent",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2042",
      releveLe: "2026-11-04",
    },
    {
      titre: "ANIL · Les frais d'agence mis à la charge du locataire : comment vérifier ?",
      url: "https://www.anil.org/parole-expert-logement-location-frais-agence-locataire/",
      releveLe: "2026-11-04",
    },
  ],
  questions: [
    {
      q: "Quelles questions poser lors d'une visite d'appartement ?",
      a: "Commencez par l'argent : loyer charges comprises, ce que couvrent les charges, dernière régularisation, coût du chauffage en hiver, frais d'agence. Regardez ensuite le logement : surface, classe énergie, humidité, fenêtres, eau chaude. Terminez par le bail et la candidature : vide ou meublé, date d'entrée, pièces demandées, garant accepté, date de décision.",
    },
    {
      q: "Quelle surface minimum pour louer un logement ?",
      a: "Le logement doit avoir au moins une pièce principale de 9 m² avec une hauteur sous plafond de 2,20 m, ou d'un volume de 20 m³. C'est un des critères de décence fixés pour un logement loué comme résidence principale ; le règlement sanitaire départemental peut être plus strict.",
    },
    {
      q: "Un logement classé G peut-il être loué ?",
      a: "Non, pour un bail signé, renouvelé ou reconduit entre 2025 et 2027 : seuls les logements classés de A à F au diagnostic de performance énergétique peuvent être loués. À partir de 2028, la limite passe à la classe E, selon Service-public.",
    },
    {
      q: "Combien une agence peut-elle facturer au locataire ?",
      a: "Pour la visite, le dossier et le bail, au plus 12 € par mètre carré habitable en zone très tendue, 10 € en zone tendue et 8 € ailleurs, sans dépasser la part payée par le propriétaire. L'état des lieux d'entrée est plafonné à 3 € par mètre carré.",
    },
  ],
  sommaire: [
    { id: "avant", titre: "Avant de vous déplacer" },
    { id: "loyer", titre: "Le loyer et les charges" },
    { id: "logement", titre: "Le logement" },
    { id: "immeuble", titre: "L'immeuble et le quartier" },
    { id: "bail", titre: "Le bail et l'entrée" },
    { id: "honoraires", titre: "Les frais d'agence" },
    { id: "candidature", titre: "La candidature" },
    { id: "liste", titre: "La liste à garder" },
  ],
  statut: "brouillon",
};

export default meta;
