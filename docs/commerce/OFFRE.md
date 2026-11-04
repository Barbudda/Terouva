# Offre et licence : volet CTO (2026-11-04)

Étude du pôle CTO & Commerce, à fusionner avec les trois autres volets. Rien n'est en ligne,
aucun compte n'est créé. Les prix relevés viennent de recherches web du 2026-11-04 ; quand la
seule source est un blog tiers, c'est dit.

## 1. Concurrents et alternatives côté locataire

| Nom | Ce qu'ils font | Prix pour le locataire | Source | Relevé |
|---|---|---|---|---|
| Alertes natives Leboncoin | Recherche sauvegardée, alerte e-mail ou push à chaque nouvelle annonce | Gratuit | leboncoin.fr (connu, non relu) | 2026-11-04 |
| Pass Locataire+ (Leboncoin) | Vérifie identité et revenus (MiTrust), badges sur le dossier, message mis en avant chez le bailleur | **14,90 € TTC, paiement unique, valable un mois** | https://www.leboncoin.fr/service/pass-locataire-plus-immo ; CGV historisées 28/09/2026 https://api.leboncoin.fr/api/tools/cms/v2/page/cgv/history/12028 | 2026-11-04 |
| Jinka | Agrège plus de 100 sites, alertes en temps réel, dédoublonnage, lien DossierFacile | Gratuit ; Premium **≈ 9,99 €/mois** (« alertes prioritaires ») | Blogs tiers : https://leblogimmobilier.org/2026/08/11/jinka-avis/ , https://www.kazaki.fr/blog/jinka-avis ; App Store https://apps.apple.com/FR/app/id1519258255 | 2026-11-04 (prix non vu sur source officielle) |
| LocService | Le locataire dépose son dossier, les bailleurs particuliers le contactent | **29 €/mois sans engagement** | https://www.locservice.fr/tarifs | 2026-11-04 |
| Studapart | Logement étudiant réservé en ligne, garantie optionnelle | Frais de réservation **179 à 499 €** selon la ville et l'annonce | Annonces studapart.com (ex. Troyes 229 €, Stains 499 €) ; mysweetimmo.com 2023 | 2026-11-04 |
| SeLoger, Bien'ici | Portails d'annonces, alertes e-mail et push | Gratuit | sites des éditeurs (connu, non relu) | 2026-11-04 |
| DossierFacile | Dossier locataire vérifié par l'État, partageable par lien | Gratuit (service public) | https://www.dossierfacile.logement.gouv.fr (connu, non relu) | 2026-11-04 |

Ce que le tableau dit pour Terouva :
- **L'alerte seule ne se vend pas** : Leboncoin, SeLoger, Bien'ici et Jinka la donnent. Jinka
  fait payer la *vitesse* (≈ 10 €/mois), Leboncoin fait payer *l'avantage auprès du bailleur*
  (14,90 € le mois). Ce sont les deux leviers que Terouva touche aussi : répondre vite et bien.
- **Le format « un mois, paiement unique » existe déjà chez Leboncoin à 14,90 €.** Le public
  connaît ce prix pour ce problème précis ; c'est notre plafond psychologique naturel.
- LocService à 29 €/mois et Studapart à 200-500 € montrent qu'un locataire paie quand il est
  pressé, mais ces prix-là correspondent à un accès à des logements, pas à un outil.

Durée d'une recherche : la seule mesure chiffrée trouvée est ancienne (enquête CLCV 2013,
18-27 ans, 72 % d'étudiants) : 49,6 % trouvent en moins d'un mois, 35,6 % en 1 à 3 mois,
11,3 % en 3 à 6 mois, 2,4 % au-delà
(https://www.clcv.org/storage/app/media/locataires-prive/LOG-dossier_presseEnquête_lgt_jeunes_juil.2013.pdf).
En zone tendue aujourd'hui, c'est sans doute plus long (CIDJ, septembre 2026 : des jeunes encore
sans toit un mois après la rentrée, témoignages, pas une mesure). Conséquence : **85 % des
recherches tiennent en trois mois**. Un abonnement mensuel qui se renouvelle en silence après la
signature du bail serait mal vécu ; un pass à durée fixe colle au besoin.

## 2. Paliers proposés

Fonctions existantes (d'après `apps/web/components/app/pages` et `lib`) : recherches,
surveillance (extension Chrome), annonces notées (`scoring.ts`), import par e-mail d'alerte
(`lbcEmail.ts`) et par capture (`lbcCapture.ts`, bookmarklet), message préparé (`messageGen.ts`),
dossier et checklist, candidatures, profil, sauvegarde (`backup.ts`), mode démo.

**Gratuit, sans limite de durée** : ce qui fait comprendre le produit et prépare le terrain.
- Profil, dossier et checklist de pièces, sauvegarde et export.
- **Une** recherche, annonces importées à la main (e-mail d'alerte, capture, bookmarklet).
- La note de chaque annonce et ses raisons, triées.
- Le message préparé pour les annonces notées (le générateur est déjà gratuit sur le site).
- Le suivi des candidatures.

**Payant (le pass)** : ce qui fait gagner la course, une fois qu'on a vu la note marcher.
- **Surveillance continue** par l'extension et **notification** dès qu'une annonce dépasse le
  seuil : c'est la vitesse, ce que Jinka fait déjà payer.
- **Recherches multiples** (plusieurs villes ou budgets en parallèle).
- Message adapté à chaque annonce à partir du profil et du dossier (variantes de ton, pièces
  citées), plutôt que le modèle unique.

Pourquoi ce découpage fait payer au bon moment : en gratuit, la personne importe ses annonces,
voit Terouva les noter juste et préparer la réponse. La valeur est prouvée sur ses propres
annonces. Ce qu'elle constate ensuite, c'est le retard : l'annonce importée ce soir était en
ligne depuis cinq heures. L'app peut l'afficher honnêtement (« publiée il y a 5 h ») ; le pass
répond à ce constat-là, au moment où il est vécu, et pas avant.

### Prix recommandé (variante A, à retenir)

| Offre | Prix TTC | Raisonnement |
|---|---|---|
| Pass 1 mois | **12 €** | Sous le Pass Locataire+ (14,90 €), au niveau de Jinka Premium (≈ 10 €) ; cohérent avec les 12 € déjà annoncés dans `llms.txt`, donc pas de promesse cassée |
| Pass 3 mois | **29 €** | Couvre 85 % des recherches ; 9,67 €/mois, soit une remise lisible sans être agressive |

Paiement unique, **aucun renouvellement automatique** : la recherche finit, le pass s'arrête
seul. Coût de vente estimé avec un vendeur à la place du marchand à 5 % + 0,50 $ (≈ 0,46 €) :
≈ 1,06 € sur 12 € (9 %), ≈ 1,91 € sur 29 € (7 %), hors surcoûts internationaux et PayPal.

### Variante B (si la session Commerce veut du récurrent)

Abonnement **9 €/mois sans engagement**, résiliable en un clic, rappel e-mail avant chaque
renouvellement. Plus simple à expliquer face à Jinka, mais renouvellements subis après la
signature du bail, remboursements et réclamations à gérer. Je la déconseille pour le lancement.

## 3. Architecture de licence recommandée

**Lemon Squeezy (vendeur à la place du marchand) pour encaisser, et un jeton signé Ed25519
émis par une route Vercel, vérifié hors ligne dans l'app.**

1. **Achat** : bouton « Prendre le pass » ouvre le checkout Lemon Squeezy (produit 1 mois ou
   3 mois, paiement unique). LS est le vendeur légal : il facture, collecte et reverse la TVA de
   chaque pays de l'UE ; Hugo est payé par LS, sans déclaration OSS à sa charge.
2. **Émission** : LS redirige vers `terouva.com/app/pass?order=<id>`. La route
   `app/api/pass/route.ts` interroge l'API LS (clé `LEMONSQUEEZY_API_KEY`), vérifie que la
   commande est payée et non remboursée, puis renvoie un jeton
   `{ v, offre, debut, fin, commande (haché) }` signé avec `TEROUVA_PASS_PRIVATE_KEY` (Ed25519).
   Le même jeton part par e-mail via Resend (déjà configuré) pour pouvoir le retrouver.
3. **Vérification hors ligne** : la clé publique est dans le code de l'app ; `@noble/ed25519`
   (ou WebCrypto Ed25519, Chrome 137 et plus) vérifie la signature et la date de fin. Le jeton
   est rangé dans IndexedDB (`settings`), inclus dans la sauvegarde exportée. Aucun appel réseau
   ensuite ; l'app note la dernière date vue pour repérer une horloge reculée.
4. **Révocation** : pas de liste noire. Le pass expire seul (1 ou 3 mois) ; un remboursement
   laisse le jeton valable jusqu'à sa fin, perte maximale 29 €. Assumé à ce prix-là.
5. **Sans compte** : ni identifiant ni mot de passe Terouva. Seul LS connaît l'e-mail
   d'achat ; la route ne stocke rien (sans état, pas de base). Formulaire « Retrouver mon pass »
   (e-mail → recherche des commandes LS → renvoi du jeton par Resend).
6. **Ce qu'Hugo crée lui-même** : compte Lemon Squeezy (identité, IBAN, vérification du
   magasin), deux produits, une clé API ; la paire Ed25519 générée en local (privée dans les
   variables Vercel, jamais dans git) ; l'adresse d'envoi Resend.
7. **Effort estimé** : 3 à 4 jours (route et jeton 1 j, vérification et verrous dans l'app 1 j,
   écrans pass, retrouver, pages CGV 1 j, tests et recette en mode test LS 0,5 à 1 j).

Écartés : *Stripe seul* (Hugo devient vendeur, TVA par pays au-delà du seuil OSS de 10 000 €) ;
*Stripe Managed Payments* (≈ 3,5 % en plus des frais Stripe, encore en préversion, disponibilité
France non confirmée) ; *validation par l'API de licences LS* à chaque ouverture (appel réseau
avec la clé, désactivation de clé impossible par API selon leur doc :
https://docs.lemonsqueezy.com/guides/tutorials/license-keys) ; *Keygen* (un service de plus
pour un besoin qu'un jeton signé couvre) ; *Paddle* (même tarif ≈ 5 % + 0,50 $, validation du
compte plus lourde pour un démarrage ; bonne solution de repli si LS refuse le magasin).

Frais relevés sur des comparatifs tiers, pas sur les pages officielles (à vérifier par Hugo à
l'inscription) : LS 5 % + 0,50 $, surcoût international possible ≈ 1,5 %
(https://dodopayments.com/blogs/lemonsqueezy-review ,
https://resources.rework.com/pt/tools/billing-revenue/paddle-vs-lemon-squeezy) ; Paddle 5 % + 0,50 $
(https://apicostcalc.com/paddle.html) ; Stripe Managed Payments +3,5 %
(https://dodopayments.com/blogs/stripe-managed-payments-fees-explained).

## 4. Textes d'offre pour le site

> Terouva est gratuit pour préparer votre dossier, noter vos annonces et rédiger vos réponses.
> Le pass ajoute la surveillance de vos recherches et vous prévient dès qu'une annonce vous correspond.
> 12 € pour un mois, 29 € pour trois mois, payés une fois : rien ne se renouvelle tout seul.
> Pas de compte à créer : votre pass reste dans votre navigateur, avec vos données.
> Vous relisez et envoyez toujours vos messages vous-même.

Correction dans `apps/web/app/llms.txt/route.ts`, paragraphe « État du produit » : remplacer
« Elle sera payante par abonnement, autour de 12 € par mois, avec un essai gratuit. Le prix
définitif sera annoncé au lancement. » par :

> L'application aura une version gratuite (dossier, notes des annonces, messages préparés) et un
> pass payant pour la surveillance et les alertes : 12 € pour un mois ou 29 € pour trois mois,
> paiement unique, sans renouvellement automatique. Les prix seront confirmés au lancement.

À faire seulement quand Hugo valide les prix. Corriger aussi, dans le même fichier, « L'application
tourne sur l'ordinateur de l'utilisateur » en « dans le navigateur de l'utilisateur ».

## 5. Risques et questions pour Hugo

1. **Statut fiscal** : Blue Lake Dev est-elle en franchise de TVA ? Avec un vendeur à la place
   du marchand, Hugo facture LS (société étrangère) et non le client ; à confirmer avec un
   comptable, ainsi que la déclaration des revenus versés par LS.
2. **Le pass dépend de l'extension** : la surveillance passe par l'extension Chrome, pas encore
   publiée. Sans elle, le payant se réduit aux recherches multiples. Publier l'extension avant
   d'ouvrir la vente.
3. **Contournement** : un jeton se copie et l'horloge se recule. Accepté à 12-29 €, l'app reste
   locale ; d'accord pour ne pas aller plus loin ?
4. **Lemon Squeezy appartient à Stripe**, qui pousse son propre produit (Managed Payments).
   Risque d'évolution de l'offre ; Paddle reste le plan B, le jeton signé ne change pas.
5. **CGV, droit de rétractation et remboursement** à écrire avant la vente (contenu numérique
   fourni immédiatement : renonciation expresse à cocher au checkout). Quel geste en cas
   d'insatisfaction : remboursement sous 7 jours sans question ?
