import { article } from "@/lib/blog-format";

export default article({
  slug: "se-retracter-apres-signature-bail",
  titre: "Peut-on se rétracter après avoir signé un bail de location ?",
  titreSeo: "Se rétracter après avoir signé un bail ?",
  description:
    "Aucun délai de rétractation n'existe pour un bail d'habitation. Une fois signé, il faut donner congé et respecter le préavis. Ce qui reste possible.",
  chapeau:
    "Non. Un bail d'habitation signé ne prévoit aucun délai de rétractation, même le lendemain et avant d'avoir reçu les clés. Pour en sortir, le locataire doit donner congé au propriétaire et respecter un préavis : trois mois en logement vide, sauf motif de délai réduit, un mois en meublé et en bail mobilité.",
  publieLe: "2026-11-04",
  pilier: "D",
  format: "question",
  guidePilier: "/guides/preavis-location",
  guidesLies: ["/guides/etat-des-lieux", "/guides/depot-de-garantie"],
  statut: "publie",
  requete: "se rétracter après signature bail location",
  faits: [
    {
      fait: "Pas de rétractation après la signature d'un bail d'habitation",
      valeur: "aucune rétractation possible",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1703",
      titreSource: "Service-public.gouv.fr · Peut-on se rétracter après avoir signé un bail d'habitation ?",
      releveLe: "2026-11-04",
      citation: "Non, il n'est pas possible de se rétracter après avoir signé un bail d'habitation.",
    },
    {
      fait: "Le locataire peut mettre fin au bail en donnant congé avec préavis",
      valeur: "congé et délai de préavis",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1703",
      titreSource: "Service-public.gouv.fr · Peut-on se rétracter après avoir signé un bail d'habitation ?",
      releveLe: "2026-11-04",
      citation: "Le locataire peut mettre fin au bail à tout moment, mais il doit pour cela donner congé au propriétaire",
    },
    {
      fait: "Meublé : préavis d'un mois, même pour un bail de 9 mois",
      valeur: "un mois en meublé, bail étudiant de 9 mois compris",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1703",
      titreSource: "Service-public.gouv.fr · Peut-on se rétracter après avoir signé un bail d'habitation ?",
      releveLe: "2026-11-04",
      citation: "respecter un délai de préavis de 1 mois, y compris lorsque la durée du bail est de seulement 9 mois",
    },
    {
      fait: "Logement en péril ou insalubre : pas de préavis, sous conditions",
      valeur: "pas de délai si péril ou insalubrité, après avoir averti le propriétaire",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1703",
      titreSource: "Service-public.gouv.fr · Peut-on se rétracter après avoir signé un bail d'habitation ?",
      releveLe: "2026-11-04",
      citation: "Ce délai ne s'applique pas si le logement est en péril ou insalubre",
    },
    {
      fait: "Logement vide : préavis de trois mois sans motif de délai réduit",
      valeur: "trois mois sans motif indiqué et justifié",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1168",
      titreSource: "Service-public.gouv.fr · Préavis et formalités du congé donné par le locataire",
      releveLe: "2026-11-04",
      citation: "Attention, si vous n'indiquez de motif, le délai de préavis de 3 mois s'applique.",
    },
    {
      fait: "Le préavis se compte de date à date à partir de la réception",
      valeur: "congé reçu le 5 septembre : fin le 5 octobre pour un mois",
      source: "https://www.service-public.gouv.fr/particuliers/vosdroits/F32360",
      titreSource: "Service-public.gouv.fr · Calculer le délai de préavis du locataire",
      releveLe: "2026-11-04",
      citation: "Si le destinataire a reçu le congé le 5 septembre, le préavis court jusqu'au 5 octobre à minuit",
    },
  ],
  corps: `
## Existe-t-il un délai de rétractation pour un bail de location ? {#delai}
Non. Service-public le dit sans nuance : il n'est pas possible de se rétracter après avoir signé un bail d'habitation. Aucun délai de réflexion ne court après la signature. Une fois les deux signatures posées, le contrat engage le locataire comme le propriétaire, même si vous n'êtes pas encore entré dans les lieux.

Ce qui reste possible, c'est de mettre fin au bail, comme n'importe quel locataire installé : en donnant congé, avec un préavis.

## Comment sortir d'un bail qu'on vient de signer ? {#sortir}
En donnant congé au propriétaire, par lettre recommandée avec avis de réception, acte de commissaire de justice ou remise en main propre contre récépissé. Le préavis part du jour où le propriétaire reçoit la lettre, et se compte de date à date. Pendant ce temps, le loyer reste dû, sauf si un nouveau locataire entre plus tôt.

Le guide du [préavis de location](/guides/preavis-location) détaille la lettre, les modes d'envoi et le calcul de la date de fin. Un congé reçu le 5 septembre, par exemple, prend fin le 5 octobre à minuit pour un préavis d'un mois.

## Combien de temps de préavis après une signature ? {#combien}
Le même que pour tout locataire. Trois mois en logement vide, réduits à un mois si vous invoquez dans la lettre un motif prévu par la loi, comme la zone tendue ou une mutation, avec son justificatif. Un mois en meublé, y compris pour un bail étudiant de neuf mois, et un mois pour un bail mobilité.

Seule exception à tout préavis : un logement en péril ou insalubre, à condition d'avoir d'abord averti le propriétaire des désordres et fait les démarches pour l'obliger aux travaux.

## Que deviennent l'état des lieux et le dépôt de garantie ? {#etat-des-lieux}
Les règles ordinaires s'appliquent, même si vous partez quelques semaines après la signature. Si vous avez reçu les clés, l'état des lieux d'entrée sert de comparaison avec celui de sortie, et cette comparaison fixe ce que le propriétaire peut retenir sur votre dépôt de garantie. Le guide de l'[état des lieux](/guides/etat-des-lieux) explique comment le faire, et celui du [dépôt de garantie](/guides/depot-de-garantie) le délai pour le récupérer.

## Comment éviter d'en arriver là ? {#avant}
En gardant la signature pour la fin. Avant elle, rien ne vous engage, et aucune somme ne peut vous être demandée pour réserver le logement. Visitez, lisez le bail en entier, posez vos questions, puis signez. Si vous hésitez entre deux logements, dites-le au propriétaire plutôt que de signer pour vous réserver une option.
`,
});
