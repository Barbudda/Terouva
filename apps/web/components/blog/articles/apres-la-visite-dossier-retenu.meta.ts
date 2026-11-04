import type { ArticleMeta } from "@/lib/blog";

/** Fiche de l’article : tout sauf le corps, qui vit dans le fichier .tsx du même nom. */
const meta: ArticleMeta = {
  // Brief : docs/seo/blog/briefs/apres-la-visite-dossier-retenu.md. Semaine 11 du
  // calendrier. Ne vise pas « mail après visite », qui revient à l'outil.
  slug: "apres-la-visite-dossier-retenu",
  titre: "Après la visite : comment savoir si votre dossier est retenu",
  titreSeo: "Après la visite : votre dossier est-il retenu ?",
  description:
    "Les signes qu'un dossier de location est accepté, quand relancer, ce qu'on ne peut pas vous demander et ce qu'il faut vérifier avant de signer.",
  chapeau:
    "Votre dossier est retenu quand on vous propose de signer : envoi du projet de bail, date d'état des lieux, ou demande de votre visa Visale. Avant cela, un accord de principe ne garantit rien. Gardez vos autres candidatures en cours, relancez une seule fois, et ne payez rien : aucune somme ne peut vous être demandée avant le bail.",
  publieLe: "2027-01-18",
  pilier: "A",
  format: "cas-pratique",
  lecture: 5,
  guidePilier: "/guides/repondre-a-une-annonce-de-location",
  guidesLies: ["/guides/refus-de-dossier", "/guides/garantie-visale"],
  outilLie: "/outils/message-de-candidature",
  sources: [
    {
      titre: "Service-public.gouv.fr · Dossier de location : pièces que le propriétaire peut demander (F1169)",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · Frais d'agence immobilière à la location d'un logement (F375)",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F375",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · Dépôt de garantie (F31269)",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F31269",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · État des lieux d'entrée (F31270)",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F31270",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · Garantie Visale (F33453)",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F33453",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · Discrimination dans l'accès au logement (F14750)",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14750",
      releveLe: "2026-11-04",
    },
  ],
  questions: [
    {
      q: "Comment savoir si mon dossier de location est accepté ?",
      a: "Quand on vous propose de signer : le propriétaire ou l'agence vous envoie le projet de bail, fixe une date d'état des lieux, ou vous demande votre visa Visale pour ce logement. Un « votre dossier nous intéresse » est un bon signe, pas un accord : continuez vos autres candidatures jusqu'à la signature.",
    },
    {
      q: "Peut-on me demander un chèque pour garder le logement en attendant le bail ?",
      a: "Non. Service-public indique que le propriétaire ou l'agence a interdiction de réclamer une somme en contrepartie de la réservation du logement, et qu'aucune somme ne peut être réclamée avant la signature du bail. Rien ne se paie pour « garder » un logement.",
    },
    {
      q: "Combien l'agence peut-elle me facturer si mon dossier est retenu ?",
      a: "Pour le dossier, la visite et la rédaction du bail, votre part ne peut pas dépasser la moitié des honoraires ni un plafond au mètre carré : 12,10 € en zone très tendue, 10,09 € en zone tendue, 8,07 € ailleurs. L'état des lieux d'entrée a son propre plafond, 3,03 € par mètre carré.",
    },
  ],
  sommaire: [
    { id: "signes", titre: "Les signes d'un dossier retenu" },
    { id: "attendre", titre: "Attendre ou relancer" },
    { id: "argent", titre: "Rien à payer pour garder le logement" },
    { id: "oui", titre: "On vous dit oui : que vérifier" },
    { id: "non", titre: "Un refus ou un silence" },
  ],
  statut: "brouillon",
};

export default meta;
