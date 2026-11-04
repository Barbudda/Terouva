import type { ArticleMeta } from "@/lib/blog";

/** Fiche de l’article : tout sauf le corps, qui vit dans le fichier .tsx du même nom. */
const meta: ArticleMeta = {
  // Brief : docs/seo/blog/briefs/nouveaux-modeles-de-bail-2026.md. L'adresse du brief portait
  // l'année, que les tests interdisent ; celle-ci reste vraie tant que ce modèle est en vigueur.
  slug: "nouveau-modele-de-bail-verifier-avant-de-signer",
  titre: "Nouveau modèle de bail : ce qu'un locataire vérifie avant de signer",
  titreSeo: "Nouveau bail : quoi vérifier avant de signer",
  description:
    "Depuis le 1er octobre 2026, les baux suivent un nouveau modèle. Ce qui change pour le locataire, ce qui reste, et cinq points à relire avant de signer.",
  chapeau:
    "Depuis le 1er octobre 2026, les baux de résidence principale conclus ou renouvelés suivent un nouveau modèle. Il écrit la clause résolutoire, qui vise aussi le dépôt de garantie non versé, ajoute la mention de résidence principale quand elle s'impose et un numéro de portable facultatif. Les baux déjà signés ne changent pas.",
  publieLe: "2026-11-16",
  pilier: "D",
  format: "actualite",
  lecture: 5,
  guidePilier: "/guides/depot-de-garantie",
  guidesLies: ["/guides/etat-des-lieux", "/guides/dossier-de-location"],
  outilLie: "/outils/dossier-de-location",
  sources: [
    {
      titre: "Légifrance · Décret n° 2026-596 du 6 juillet 2026 (contrats types de location), article 3",
      url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000054393114",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · De nouveaux modèles de bail et une notice d'information actualisée",
      url: "https://www.service-public.gouv.fr/particuliers/actualites/A19067",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · Documents que le propriétaire peut demander au futur locataire",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · Dépôt de garantie dans un bail d'habitation",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F31269",
      releveLe: "2026-11-04",
    },
  ],
  questions: [
    {
      q: "Un bail signé avant le 1er octobre 2026 doit-il être refait ?",
      a: "Non. Le décret n° 2026-596 du 6 juillet 2026 s'applique aux contrats conclus ou renouvelés à compter du 1er octobre 2026. Un bail déjà signé reste valable tel quel. Le texte ne parle pas de la reconduction tacite : pour un cas précis, l'ADIL de votre département peut vous renseigner.",
    },
    {
      q: "Le bail peut-il être résilié si le dépôt de garantie n'est pas versé ?",
      a: "Oui. Le nouveau modèle écrit la clause résolutoire, qui vise le loyer, les charges et le dépôt de garantie non versés. La résiliation n'intervient qu'après un commandement de payer resté sans effet pendant six semaines. Cette obligation existe depuis la loi du 27 juillet 2023 ; le modèle la reprend.",
    },
    {
      q: "Faut-il donner son numéro de portable dans le bail ?",
      a: "Non, c'est facultatif. Le nouveau modèle prévoit une case pour le portable du bailleur et celui du locataire, afin de faciliter les échanges et la prévention des expulsions, mais vous pouvez la laisser vide.",
    },
    {
      q: "Quelle notice doit être jointe au bail ?",
      a: "La notice d'information réécrite par un arrêté du 9 octobre 2026. Elle doit être annexée aux contrats conclus ou renouvelés depuis le 18 octobre 2026, et résume vos droits et obligations : loyer, garanties, impayés, congé, litiges.",
    },
  ],
  sommaire: [
    { id: "concernes", titre: "Les baux concernés" },
    { id: "clause-resolutoire", titre: "Le dépôt de garantie dans la clause résolutoire" },
    { id: "residence-principale", titre: "La mention de résidence principale" },
    { id: "telephone", titre: "Le numéro de portable" },
    { id: "notice", titre: "La notice d'information" },
    { id: "inchange", titre: "Ce qui ne change pas" },
    { id: "verifier", titre: "Les cinq points à relire" },
  ],
  statut: "brouillon",
};

export default meta;
