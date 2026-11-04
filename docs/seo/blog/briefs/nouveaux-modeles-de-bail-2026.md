# Brief 2 — Nouveau modèle de bail : ce qu'un locataire vérifie avant de signer

> Rédacteur en chef : `blog-redacteur-en-chef`, 2026-11-04. Rédaction : `seo-redacteur`. Relecture :
> `blog-relecteur`. Publication au plus tard le **2026-11-19** (veille : avant le 20 novembre).

## Entrée `apps/web/lib/blog.ts` (ajout du 2026-11-04, rubrique créée par le commit 045a395)

| Champ | Valeur proposée | Contrôle |
|---|---|---|
| `slug` | `nouveau-modele-de-bail-2026` | |
| `titre` (h1) | « Nouveau modèle de bail : ce qu'un locataire vérifie avant de signer » | |
| `titreSeo` | « Nouveau bail 2026 : quoi vérifier avant de signer » | 59 signes avec « · Terouva » (≤ 60) |
| `description` | « Depuis le 1er octobre 2026, les baux de location suivent un nouveau modèle. Les cinq points à vérifier avant de signer, et ce qui ne change pas. » | 144 signes (70 à 155) |
| `chapeau` | « Depuis le 1er octobre 2026, tout bail de résidence principale, vide ou meublé, suit un nouveau modèle. Il ajoute une clause résolutoire qui vise aussi le dépôt de garantie non versé, rappelle que le logement doit être votre résidence principale et rend le numéro de portable facultatif. Les baux déjà signés ne changent pas. » | 54 mots (40 à 60). « Tout bail » attend le fait n° 3 (renouvellement, reconduction) |
| `pilier` · `format` · `lecture` | `D` · `actualite` · 5 | |
| `guidePilier` | `/guides/depot-de-garantie` (page du cluster D la plus proche, voir « Liens ») | |
| `guidesLies` | `/guides/etat-des-lieux`, `/guides/dossier-de-location` | |
| `outilLie` | `/outils/dossier-de-location` | |

## Fiche

| Champ | Valeur |
|---|---|
| Adresse | `/blog/nouveau-modele-de-bail-2026` |
| Format | actualité datée, tournée vers l'action (vérifier avant de signer) |
| Pilier | D. Le bail et le loyer |
| Requête-mère | « nouveau bail 1er octobre 2026 » / « contrat de location 2026 ce qui change » : requête d'actualité, **absente du registre**, aucune mesure de volume |
| Variantes | nouveau contrat de location 2026 ; bail de location ce qui change ; clause résolutoire dépôt de garantie ; notice d'information bail 2026 ; numéro de téléphone dans le bail |
| Intention | information, avant une signature |
| Ne pas cannibaliser | `/guides/depot-de-garantie` (montant, restitution) et `/guides/etat-des-lieux` : l'article cite leur règle en une phrase et renvoie |
| Guide à mettre à jour dans le même lot | `/guides/depot-de-garantie` : la phrase sur la clause résolutoire en cas de dépôt non versé (file de fraîcheur n° 23, `VEILLE.md`). Par `seo-fraicheur` |
| Longueur | 800 à 1 100 mots. Les pages lues font 600 à 1 500 mots, la plupart écrites pour le bailleur |

## L'angle

Recherche web du 2026-11-04 : SeLoger, PAP (rubrique bailleur), Legalplace, Manda, ADIL 66 (anil.org),
LocService, Legifiscal, immobilierloyer.com. Presque tous s'adressent au **propriétaire** (« vous
n'avez pas à faire resigner vos locataires »). Personne ne donne au **candidat qui va signer** la
liste courte de ce qu'il regarde sur le document qu'on lui tend.

L'article est cette liste : cinq points à vérifier sur le bail, et ce qui **ne change pas** (les
pièces du dossier, le montant du dépôt, l'interdiction de payer avant la signature). Il finit sur le
moment où l'on signe, sans dramatiser : la clause résolutoire concerne celui qui ne paie pas, pas
celui qui signe.

## Plan en questions

Chapeau-réponse (40 à 60 mots) : depuis le 1er octobre 2026, les baux de résidence principale
signés suivent un nouveau modèle ; ce qu'il ajoute, en une phrase ; les baux en cours ne changent pas.

1. Quels baux sont concernés ? (vide, meublé, colocation à bail unique ; à partir de quelle date de
   signature ; ce que dit la source sur le renouvellement et la reconduction, voir fait n° 3)
2. Qu'est-ce que la clause résolutoire du nouveau bail, et pourquoi elle vise aussi le dépôt de
   garantie ? (commandement de payer, six semaines, juge : uniquement ce que dit la source)
3. Que veut dire la mention de résidence principale ?
4. Devez-vous donner votre numéro de portable ? (facultatif)
5. Qu'est-ce que la notice d'information, et comment savoir si c'est la bonne ? (arrêté du 9 octobre
   2026, baux conclus ou renouvelés depuis le 18 octobre 2026)
6. Qu'est-ce qui ne change pas pour votre dossier ? (liste limitative des pièces, aucune somme avant
   la signature, montant du dépôt : une phrase chacun, lien vers le guide)
7. Que faire si le propriétaire vous tend l'ancien modèle ? (seulement si une source dit la
   conséquence ; sinon, on dit qu'il faut demander le modèle en vigueur et on renvoie à l'ADIL)

Encadré final « Les cinq points à vérifier avant de signer » : modèle daté d'octobre 2026, clause
résolutoire lue, mention de résidence principale, notice d'information jointe, date de versement du
dépôt de garantie notée. Sous forme de liste courte, sans coches.

## Faits à sourcer (tous dans `docs/seo/FAITS.md` avant publication)

| # | Fait | Source visée | Déjà relevé ? |
|---|---|---|---|
| 1 | Nouveaux modèles au 2026-10-01 ; clause résolutoire pour loyer, charges ou dépôt non versé, après commandement resté sans effet six semaines ; mention de résidence principale ; portable facultatif | service-public A19067 (2026-09-23, mis à jour 2026-10-22) | oui (veille) |
| 2 | Texte qui fixe les modèles : **décret n° 2026-596 du 6 juillet 2026** selon la presse | Légifrance : vérifier numéro, date, article d'entrée en vigueur | non : presse seulement |
| 3 | Bail renouvelé ou reconduit tacitement après le 1er octobre : nouveau modèle ou non ? Les pages lues se contredisent | Légifrance (texte du décret), ANIL ; **si rien n'est clair, l'écrire** | non |
| 4 | Notice d'information révisée par arrêté du 9 octobre 2026, à annexer aux baux conclus ou renouvelés depuis le 18 octobre 2026 | A19067 ; Légifrance pour l'arrêté | A19067 oui ; arrêté non |
| 5 | Origine de l'obligation de clause résolutoire : loi du 27 juillet 2023 | A19067 ; Légifrance | A19067 oui |
| 6 | Aucune somme avant la signature du bail | service-public F1169 | oui (`faits-confirmes-2026-11-04.md`) |
| 7 | Pièces du dossier : liste limitative du décret 2015-1437 | F1169 + décret | oui |
| 8 | Dépôt de garantie : 1 mois hors charges en vide, 2 en meublé | art. 22 et 25-6, F31269 | oui |
| 9 | Article 2 du décret (aides au logement) au 2027-01-01, selon la presse | Légifrance | non : ne pas en parler si non confirmé, c'est hors angle |

## Liens internes obligatoires

- Page du cluster D la plus proche (à la place du pilier `/guides/preavis-location`, hors sujet ici) :
  `/guides/depot-de-garantie`, depuis la question 2 et l'encadré, ancre « le montant et la
  restitution du dépôt de garantie ».
- Guide voisin : `/guides/etat-des-lieux`, depuis la question 6 (« le jour de la signature, l'état des lieux d'entrée »).
- Guide voisin et outil : `/guides/dossier-de-location` et `/outils/dossier-de-location`, depuis la question 6.
- Liens sortants : A19067, Légifrance (décret, arrêté), ADIL de son département (anil.org).

## Appel à l'action

L'outil gratuit de dossier en premier (« Préparer la liste de vos pièces »), puis « Être prévenu ».
Le produit n'intervient pas dans la signature : ne rien suggérer d'autre.

## Visuel demandé à `seo-visuels`

Une page de bail schématisée (SVG, monde papier), avec les cinq zones à vérifier repérées par un
numéro et une légende courte. Pas une capture d'un vrai modèle de bail (droits et lisibilité) : un
schéma. Texte alternatif qui énumère les cinq points.

## Contrôles avant publication

- Ton : informatif, pas alarmiste. Pas de « attention » en tête de paragraphe.
- `blog-relecteur` : le point de la reconduction (fait n° 3) n'est pas présenté comme tranché s'il ne l'est pas.
- Aucun prix ni offre. Mot « Leboncoin » absent.
