import type { ArticleMeta } from "@/lib/blog";

/** Fiche de l’article : tout sauf le corps, qui vit dans le fichier .tsx du même nom. */
const meta: ArticleMeta = {
  // Brief : docs/seo/blog/briefs/arnaque-location-reconnaitre-fausse-annonce.md.
  // Requête du registre : « arnaque location annonce » (P1). Date de publication
  // provisoire, hors calendrier des douze semaines : au chef de la caler.
  slug: "arnaque-location-reconnaitre-fausse-annonce",
  titre: "Arnaque à la location : reconnaître une fausse annonce avant d'envoyer quoi que ce soit",
  titreSeo: "Arnaque à la location : repérer une fausse annonce",
  description:
    "Loyer trop bas, propriétaire injoignable, argent demandé pour réserver : les signes d'une fausse annonce de location, et que faire si vous avez déjà payé.",
  chapeau:
    "Une fausse annonce de location se trahit presque toujours de la même façon : un loyer trop bas pour le quartier, un propriétaire qui ne peut pas vous rencontrer, et une demande d'argent ou de papiers d'identité avant la visite. Aucune somme ne peut vous être réclamée avant la signature du bail : refusez tout paiement pour « réserver ».",
  publieLe: "2026-12-09",
  pilier: "A",
  format: "question",
  lecture: 6,
  guidePilier: "/guides/repondre-a-une-annonce-de-location",
  guidesLies: ["/guides/dossier-de-location"],
  outilLie: "/outils/dossier-de-location",
  sources: [
    {
      titre: "Service-public.gouv.fr · Arnaques à la location immobilière sur internet (F34092)",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34092",
      releveLe: "2026-11-04",
    },
    {
      titre: "Cybermalveillance.gouv.fr · Comment réagir en cas d'arnaque à la location immobilière ?",
      url: "https://www.cybermalveillance.gouv.fr/tous-nos-contenus/fiches-reflexes/arnaques-location-immobiliere",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · Signaler une escroquerie à la location (fausse annonce), THESEE",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/R47990",
      releveLe: "2026-11-04",
    },
    {
      titre: "Service-public.gouv.fr · Dossier de location : pièces que le propriétaire peut demander (F1169)",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1169",
      releveLe: "2026-11-04",
    },
  ],
  questions: [
    {
      q: "Comment savoir si une annonce de location est une arnaque ?",
      a: "Service-public cite cinq signes : un prix très bas pour l'emplacement ou la surface, des photos visibles dans une autre annonce, un propriétaire qui refuse de vous rencontrer, une demande d'argent avant la signature du bail, et une demande de papiers officiels avant la visite. Un seul de ces signes suffit pour ralentir.",
    },
    {
      q: "Un propriétaire peut-il demander de l'argent pour réserver un logement ?",
      a: "Non. Service-public indique que le propriétaire ou l'agence a interdiction de réclamer une somme en contrepartie de la réservation du logement, et qu'aucune somme ne peut être réclamée avant la signature du bail. Le dépôt de garantie et le premier loyer se règlent au moment du bail et de la remise des clés.",
    },
    {
      q: "J'ai payé une fausse annonce : comment récupérer mon argent ?",
      a: "Prévenez votre banque tout de suite : opposition pour une carte ou un chèque, contestation pour un virement. Gardez l'annonce et les messages, signalez l'annonce au site qui l'a publiée, puis faites un signalement ou une plainte sur THESEE, ou déposez plainte au commissariat ou à la gendarmerie.",
    },
  ],
  sommaire: [
    { id: "signes", titre: "Les signes d'une fausse annonce" },
    { id: "verifier", titre: "Vérifier avant de répondre" },
    { id: "argent", titre: "L'argent avant le bail" },
    { id: "documents", titre: "Vos papiers : quand et comment" },
    { id: "visite", titre: "Quand la visite ne suffit pas" },
    { id: "victime", titre: "Si vous avez déjà payé ou envoyé vos papiers" },
    { id: "loi", titre: "Ce que dit la loi" },
  ],
  statut: "brouillon",
};

export default meta;
