import { article } from "@/lib/blog-format";

// Mission : docs/seo/blog/PLAN-PAGES-OUTIL.md, page 5. Aucun tarif de chasseur : aucune source
// officielle n'en fixe. Les règles viennent du texte consolidé de la loi Hoguet (Légifrance, 403 au
// script : relecture au navigateur) et des fiches Service-public Entreprendre, lisibles par le script.
// Pas de capture sur cette page.

const HOGUET_1 = "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000028806892";
const T_HOGUET_1 = "Légifrance · Article 1 de la loi n° 70-9 du 2 janvier 1970 (loi Hoguet)";
const HOGUET_3 = "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000051898206";
const T_HOGUET_3 = "Légifrance · Article 3 de la loi n° 70-9 du 2 janvier 1970 (loi Hoguet)";
const HOGUET_6 = "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000032043077";
const T_HOGUET_6 = "Légifrance · Article 6 de la loi n° 70-9 du 2 janvier 1970 (loi Hoguet)";
const F38657 = "https://entreprendre.service-public.gouv.fr/vosdroits/F38657";
const T_F38657 = "Service-public.gouv.fr Entreprendre · Agent immobilier : conditions d'accès et d'exercice en France";
const F32244 = "https://entreprendre.service-public.gouv.fr/vosdroits/F32244";
const T_F32244 = "Service-public.gouv.fr Entreprendre · Devenir agent immobilier";
const MSI = "https://www.mysweetimmo.com/2026/09/24/location-1-candidat-sur-3-repond-en-moins-de-15-minutes/";
const T_MSI = "MySweetImmo · Location : 1 candidat sur 3 répond à l'annonce en moins de 15 minutes (24 septembre 2026)";

export default article({
  slug: "chasseur-immobilier-location",
  titre: "Chasseur immobilier pour une location : son rôle, sa rémunération, et quand s'en passer",
  titreSeo: "Chasseur immobilier pour une location",
  description:
    "Ce que fait un chasseur pour une location, la carte professionnelle qu'exige la loi Hoguet, quand il peut être payé, et comment s'en passer.",
  chapeau:
    "Un chasseur immobilier cherche et visite des logements à votre place, sous mandat écrit. La loi Hoguet exige une carte professionnelle et interdit, sauf exceptions qu'elle prévoit, d'être payé avant que l'opération soit conclue par écrit. Aucun texte ne fixe son tarif. Si vous pouvez visiter vous-même, des alertes bien réglées et un dossier prêt permettent de s'en passer.",
  publieLe: "2026-11-19",
  pilier: "A",
  format: "question",
  guidePilier: "/guides/repondre-a-une-annonce-de-location",
  guidesLies: ["/guides/dossier-de-location"],
  outilLie: "/outils/message-de-candidature",
  statut: "publie",
  requete: "chasseur immobilier location",
  faits: [
    {
      fait: "La loi Hoguet s'applique aux personnes qui, de manière habituelle, prêtent leur concours aux opérations sur les biens d'autrui",
      valeur: "concours habituel aux opérations sur les biens d'autrui",
      source: HOGUET_1,
      titreSource: T_HOGUET_1,
      releveLe: "2026-11-19",
      citation:
        "se livrent ou prêtent leur concours, même à titre accessoire, aux opérations portant sur les biens d'autrui et relatives à",
    },
    {
      fait: "Parmi ces opérations, la loi cite la recherche et la location de logements",
      valeur: "la recherche et la location",
      source: HOGUET_1,
      titreSource: T_HOGUET_1,
      releveLe: "2026-11-19",
      citation: "L'achat, la vente, la recherche, l'échange, la location ou sous-location, saisonnière ou non, en nu ou en meublé",
    },
    {
      fait: "Ces activités ne peuvent être exercées qu'avec une carte professionnelle",
      valeur: "carte professionnelle obligatoire",
      source: HOGUET_3,
      titreSource: T_HOGUET_3,
      releveLe: "2026-11-19",
      citation:
        "Les activités visées à l'article 1er ne peuvent être exercées que par les personnes physiques ou morales titulaires d'une carte professionnelle",
    },
    {
      fait: "La carte est délivrée par le président de la chambre de commerce et d'industrie",
      valeur: "carte délivrée par la CCI",
      source: F38657,
      titreSource: T_F38657,
      releveLe: "2026-11-19",
      citation:
        "il faut être titulaire d'une carte professionnelle. cette carte est délivrée par le président de la chambre de commerce et d'industrie",
    },
    {
      fait: "Exercer sans carte est une infraction pénale",
      valeur: "6 mois d'emprisonnement et 7 500 € d'amende",
      source: F38657,
      titreSource: T_F38657,
      releveLe: "2026-11-19",
      citation: "il s'agit d'une infraction pénale punie de 6 mois d'emprisonnement et de 7 500 €",
    },
    {
      fait: "Le professionnel affiche son numéro de carte et ses tarifs TTC avec leur barème",
      valeur: "numéro de carte et barème TTC affichés",
      source: F32244,
      titreSource: T_F32244,
      releveLe: "2026-11-19",
      citation:
        "vous devez afficher de façon visible par la clientèle les informations suivantes : numéro de votre carte professionnelle",
    },
    {
      fait: "Les tarifs affichés comprennent le mode de calcul et le barème",
      valeur: "tarifs TTC et mode de calcul",
      source: F32244,
      titreSource: T_F32244,
      releveLe: "2026-11-19",
      citation: "tarifs ttc de vos prestations et leur mode de calcul avec le barème des prix",
    },
    {
      fait: "Le mandat est écrit et précise la rémunération et qui la paie",
      valeur: "rémunération et partie qui la paie, par écrit",
      source: HOGUET_6,
      titreSource: T_HOGUET_6,
      releveLe: "2026-11-19",
      citation: "Les conditions de détermination de la rémunération, ainsi que l'indication de la partie qui en aura la charge",
    },
    {
      fait: "Aucune somme, frais de recherche compris, n'est due avant que l'opération soit conclue par écrit",
      valeur: "rien n'est dû avant l'opération conclue",
      source: HOGUET_6,
      titreSource: T_HOGUET_6,
      releveLe: "2026-11-19",
      citation:
        "représentatif d'honoraires, de frais de recherche, de démarche, de publicité ou d'entremise quelconque, n'est dû aux personnes indiquées à l'article 1er",
    },
    {
      fait: "La rémunération des personnes mandatées pour la mise en location est à la charge du bailleur, sauf visite, dossier, bail et état des lieux",
      valeur: "à la charge exclusive du bailleur, sauf exceptions",
      source: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000037670711",
      titreSource: "Légifrance · Article 5 de la loi n° 89-462 du 6 juillet 1989",
      releveLe: "2026-11-19",
      citation:
        "prêter leur concours à l'entremise ou à la négociation d'une mise en location d'un logement, tel que défini aux articles 2 et 25-3, est à la charge exclusive du bailleur",
    },
    {
      fait: "Pour une agence, les frais de mise en location autres que visite, dossier, bail et état des lieux sont payés par le propriétaire",
      valeur: "autres frais payés entièrement par le propriétaire",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F375",
      titreSource: "Service-public.gouv.fr · Frais d'agence immobilière à la location d'un logement",
      releveLe: "2026-11-19",
      citation:
        "tous les autres frais facturés par l'agence immobilière pour la mise en location d'un logement d'habitation sont à payer entièrement par le propriétaire",
    },
    {
      fait: "Les ADIL conseillent gratuitement les particuliers sur leurs questions de logement",
      valeur: "conseil gratuit de l'ADIL",
      source: "https://www.anil.org/",
      titreSource: "ANIL · Agence nationale pour l'information sur le logement, accueil",
      releveLe: "2026-11-19",
      citation: "nos conseillers locaux vous apporteront un accompagnement personnalisé et gratuit sur toutes vos questions liées au logement",
    },
    {
      fait: "Une majorité des candidats contacte l'annonceur dans l'heure",
      valeur: "64,3 % dans l'heure",
      source: MSI,
      titreSource: T_MSI,
      releveLe: "2026-11-19",
      citation:
        "31,9 % des candidats tentent de contacter l'annonceur dans les quinze premières minutes. ils sont même 64,3 % à le faire dans l'heure",
    },
  ],
  corps: `
## Que fait un chasseur immobilier pour une location ? {#role}
Il cherche à votre place. Vous lui confiez vos critères par un mandat écrit, il surveille les annonces et son réseau, trie, visite, et vous présente les logements qui tiennent la route. Certains aident aussi à monter le dossier ou accompagnent jusqu'à la signature du bail. Vous gardez la décision : c'est vous qui choisissez et signez.

Le service se justifie surtout par le temps qu'il vous rend : les visites en semaine, les relances, le tri d'annonces mal remplies. Le message qui accompagne une candidature reste le même travail, que vous le fassiez seul ou avec lui ; le guide pour [répondre à une annonce de location](/guides/repondre-a-une-annonce-de-location) explique ce qu'un propriétaire y cherche.

## Un chasseur immobilier doit-il avoir une carte professionnelle ? {#carte}
Oui, s'il fait ce travail de façon habituelle. La loi Hoguet du 2 janvier 1970 vise les personnes qui prêtent leur concours aux opérations sur les biens d'autrui, et cite la recherche et la location parmi elles. Ces activités ne s'exercent qu'avec une carte professionnelle, délivrée par le président de la chambre de commerce et d'industrie.

Exercer sans carte est une infraction pénale, punie de 6 mois d'emprisonnement et de 7 500 € d'amende selon Service-public. Le professionnel doit afficher de façon visible le numéro de sa carte : demandez-le, et refusez de signer avec quelqu'un qui ne peut pas le donner.

## Combien coûte un chasseur immobilier pour une location ? {#prix}
Aucun texte ne fixe de tarif propre au chasseur. Le professionnel affiche ses tarifs TTC, avec leur mode de calcul et son barème, et le mandat écrit doit dire comment sa rémunération se calcule et qui la paie. Une règle protège le locataire : aucune somme, frais de recherche compris, n'est due avant que l'opération soit conclue par écrit.

La loi encadre des exceptions : les clauses d'exclusivité ou pénales du mandat, celle qui rend des honoraires dus même si l'opération se conclut sans le professionnel, et le client qui agit pour son activité professionnelle. Lisez ces clauses avant de signer. Pour une location, une autre règle existe. L'article 5 de la loi du 6 juillet 1989 met la rémunération des personnes mandatées pour la mise en location d'un logement à la charge exclusive du bailleur, sauf la visite, le dossier, le bail et l'état des lieux, partagés et plafonnés. Service-public l'applique aux frais d'agence : tous les autres frais sont payés entièrement par le propriétaire. Le texte ne dit pas qui a signé le mandat, et aucune fiche officielle ne précise comment il s'applique au chasseur que le locataire paie lui-même. Avant de signer, demandez au chasseur, par écrit, sur quelle base il vous facture ; en cas de doute, l'ADIL de votre département vous conseille gratuitement. Les plafonds qui valent pour une agence sont dans l'article sur les [frais d'agence](/blog/frais-agence-location).

## Pour qui un chasseur vaut-il son prix ? {#pour-qui}
Pour ceux qui ne peuvent pas faire les visites eux-mêmes : une mutation dans une autre ville, une arrivée depuis l'étranger, un emploi du temps qui ne laisse aucun créneau en semaine. Le chasseur voit le logement à votre place et vous évite des allers-retours. Pour un locataire présent sur place, avec un peu de temps chaque soir, le gain est plus mince.

Il apporte aussi une connaissance du quartier et des agences locales, utile quand on ne connaît pas la ville. Il ne change rien, en revanche, à ce que le propriétaire regarde dans un dossier : vos revenus, votre garant et la clarté de votre message restent les vôtres.

## Comment s'en passer quand on cherche seul ? {#s-en-passer}
En faisant soi-même, en mieux organisé, ce qu'il ferait : des alertes bien réglées sur chaque site où la ville publie, un message de candidature prêt, un dossier complet en un lien, et un créneau chaque jour pour répondre. La vitesse compte : selon des enquêtes de Leboncoin Immo relayées par MySweetImmo, 64,3 % des candidats contactent l'annonceur dans l'heure.

Les pièces du dispositif :
- les alertes, réglées site par site, avec l'article sur l'[alerte location appartement](/blog/alerte-location-appartement) ;
- le message, avec le [générateur de message de candidature](/outils/message-de-candidature), gratuit ;
- le dossier, avec la [liste des pièces autorisées](/guides/dossier-de-location) ;
- les outils existants, dans [les meilleures applications pour trouver une location](/blog/meilleures-applications-trouver-location) ;
- le reste de la chaîne, étape par étape, dans [automatiser sa recherche de location](/blog/automatiser-recherche-location).

## Que vérifier avant de signer avec un chasseur ? {#verifier}
Trois choses, avant toute signature : le numéro de sa carte professionnelle, un mandat écrit qui dit comment il est payé et par qui, et l'absence de tout paiement avant la conclusion de l'opération. Un chasseur qui réclame à un particulier des frais de recherche d'avance contredit la loi Hoguet. Un mandat sans montant ni mode de calcul ne vous protège pas.

Demandez aussi ce qu'il fait exactement : visites, sélection, dossier, présence à l'état des lieux. Comparez avec le temps que vous y consacreriez vous-même. Et quoi qu'il arrive, ne versez rien à un propriétaire pour réserver un logement : les signes d'une [fausse annonce](/blog/arnaque-location-reconnaitre-fausse-annonce) valent aussi pour les offres transmises par un intermédiaire.

## Où se place Terouva par rapport à un chasseur ? {#terouva}
Terouva ne visite pas à votre place : c'est un outil que vous utilisez vous-même. Parmi les annonces que vos sites d'annonces vous signalent et celles que vous ouvrez, il repère celles qui correspondent à vos critères, prépare votre message et suit vos candidatures. Il ne se connecte pas à votre compte, et c'est vous qui envoyez chaque message.

Sa définition : « Terouva est un outil d'automatisation de la recherche de location immobilière en France. Il aide les locataires à repérer rapidement les annonces correspondant à leurs critères, à évaluer leur pertinence, à préparer un message de candidature personnalisé et à suivre leurs candidatures. Terouva est conçu pour réduire le temps passé à rechercher un logement et permettre aux candidats de réagir plus rapidement aux nouvelles annonces. L'utilisateur garde le contrôle de l'envoi de ses messages. »

Rien ne part sans vous. Terouva n'est pas encore ouvert : il ouvre par vagues, et l'inscription vous réserve une place. [Être prévenu](#prevenu)
`,
});
