# Brief 5 — Un propriétaire peut-il refuser un candidat au chômage ?

> Rédacteur en chef : `blog-redacteur-en-chef`, 2026-11-04. Rédaction : `seo-redacteur`. Relecture :
> `blog-relecteur` (relecture juridique serrée : discrimination). Publication semaine du 2026-11-30
> (calendrier, semaine 4).

## Entrée `apps/web/lib/blog.ts`

| Champ | Valeur proposée | Contrôle |
|---|---|---|
| `slug` | `refus-location-chomage` | |
| `titre` (h1) | « Un propriétaire peut-il refuser un candidat au chômage ? » | |
| `titreSeo` | « Louer au chômage : un refus est-il légal ? » | 52 signes avec « · Terouva » (≤ 60) |
| `description` | « Un propriétaire peut-il écarter un candidat parce qu'il est au chômage ? Ce que dit la loi, ce qui reste permis, et comment présenter vos ressources. » | 149 signes (70 à 155) |
| `chapeau` | « Le chômage ne figure pas en tant que tel parmi les critères de discrimination du Code pénal : un propriétaire peut écarter un dossier dont les ressources lui semblent trop faibles. Mais la vulnérabilité économique est un critère interdit, et un refus fondé sur la nature des revenus plutôt que sur leur montant peut être discriminatoire. » | 56 mots (40 à 60). Attend les faits n° 1 à 3 |
| `pilier` | `B` | |
| `format` | `question` | |
| `lecture` | 5 | pour 900 à 1 100 mots |
| `guidePilier` | `/guides/refus-de-dossier` | page du cluster B qui porte la règle ; le pilier B (`/guides/dossier-de-location`) est en guide lié |
| `guidesLies` | `/guides/dossier-de-location`, `/guides/garantie-visale` | |
| `outilLie` | `/outils/dossier-de-location` | |
| `statut` | `brouillon` jusqu'au feu vert de `blog-relecteur` | |

## Fiche

| Champ | Valeur |
|---|---|
| Requête-mère | « refus de louer à un chômeur », **variante** de la requête-mère « refus dossier location » (registre v1, ligne du guide refus ; source : autocomplétion du 2026-11-04) |
| Variantes | louer un appartement au chômage ; location chômage propriétaire peut refuser ; dossier de location au chômage ; allocations chômage revenus location ; louer sans CDI (registre, ligne « louer sans garant ») |
| Intention | information, avec un dossier à monter |
| Ne pas cannibaliser | `/guides/refus-de-dossier` (« refus dossier location », 25 impressions, pos. 43,6 : la page la plus vue du site). Le guide liste déjà les 25 critères dont la vulnérabilité économique : l'article ne recopie pas la liste, il traite **un seul cas** jusqu'au bout. `louer sans CDI` reste au guide `louer-sans-garant` |
| Guide à mettre à jour dans le même lot | `/guides/refus-de-dossier`, section « Quels motifs de refus restent légitimes ? » : une ligne qui renvoie à l'article. Par `seo-maillage` |
| Longueur | 900 à 1 100 mots |

## L'angle

Recherche web du 2026-11-04 (SERP google.fr **non lue**, à faire par `seo-registre`) : SeLoger, ANIL,
LocService et 123loger traitent la discrimination au logement en général. Aucune page lue ne répond
franchement au cas du chômage, qui tombe entre deux règles :

- le propriétaire **peut** juger la capacité à payer, sur les pièces de la liste autorisée ;
- il **ne peut pas** refuser pour vulnérabilité économique, ni (selon le Défenseur des droits)
  écarter des revenus à cause de leur nature plutôt que de leur montant.

L'article trace cette frontière avec des exemples simples, puis passe à ce qui aide vraiment le
candidat : quelles pièces prouvent des allocations, et quelles garanties restent ouvertes (Visale
pour les 30 ans et moins quelle que soit la situation, garant, Loca-Pass pour le dépôt).

## Plan en questions

1. Le chômage est-il un motif de refus interdit ? (non en tant que tel ; la vulnérabilité économique,
   oui : sens exact du critère, depuis quand, d'après le texte)
2. Qu'est-ce qu'un propriétaire a le droit de regarder ? (les ressources, sur les pièces autorisées ;
   un dossier moins solide peut être écarté : lien vers le guide refus)
3. Peut-il refuser vos allocations parce que ce n'est pas un salaire ? (position du Défenseur des
   droits sur la nature des revenus ; le précédent de la pension d'invalidité, déjà sourcé)
4. Quelles pièces prouvent des allocations chômage ? (ce que le décret 2015-1437 prévoit pour les
   prestations et allocations : libellé exact à recopier, pas de reformulation)
5. Quelles garanties restent possibles au chômage ? (Visale : conditions pour 30 ans et moins, et
   pourquoi la condition « salarié » ferme la porte au-delà de 30 ans, sauf promesse d'embauche ;
   garant ; Loca-Pass)
6. Comment savoir si un refus est discriminatoire, et que faire ? (renvoi aux sections preuve et
   recours du guide refus, en deux phrases)

Section « Ce que ça change pour votre recherche » : annoncer ressources et garantie dès le premier
message (pilier A), dossier complet prêt (outil), viser des loyers que les ressources couvrent.

## Faits à sourcer (dans `docs/seo/FAITS.md` avant publication)

| # | Fait | Source visée | Déjà relevé ? |
|---|---|---|---|
| 1 | Liste des critères de l'art. 225-1 C. pén. ; le chômage n'y figure pas en tant que tel | Légifrance art. 225-1 ; SP F14750 (vérifiée le 2025-08-12) | liste oui ; l'absence du chômage est à relire dans le texte en vigueur |
| 2 | Libellé exact du critère de vulnérabilité économique et sa date d'entrée | Légifrance art. 225-1 (version en vigueur et historique) | non |
| 3 | Position du Défenseur des droits sur la nature des revenus (« louer sans discriminer », 7 cas pratiques, 2017) | defenseurdesdroits.fr (PDF repéré par la recherche du 2026-11-04, à lire) | non |
| 4 | Refus fondé sur une pension d'invalidité jugé discriminatoire | Défenseur des droits, décision 2019-001 | oui (`faits-confirmes-2026-11-04.md`) |
| 5 | Pièces de ressources admises pour les prestations et allocations | décret 2015-1437, annexe I (Légifrance) | liste générale oui ; libellé de la ligne « allocations » non |
| 6 | Visale : 30 ans et moins sans condition d'activité ; plus de 30 ans réservé aux salariés sous conditions | SP F33453 (vérifiée le 2026-01-23) | oui |
| 7 | Loca-Pass | SP F18490 (vérifiée le 2026-09-11) | oui ; conditions d'accès d'un demandeur d'emploi à vérifier avant d'en parler |
| 8 | Sanctions et recours (3 ans et 45 000 €, jusqu'à 5 ans et 75 000 € ; Défenseur des droits ; 6 ans pour porter plainte) | art. 225-2, F14750 | oui |
| 9 | Partage de la charge de la preuve : au civil seulement | loi 89-462 art. 1er | oui (file de fraîcheur n° 16) |

Aucun chiffre sur les refus subis par les demandeurs d'emploi, aucune statistique de testing : non
sourcés aujourd'hui. Aucun montant de revenu « suffisant » (la règle des trois fois le loyer n'est
pas une règle légale, `VEILLE.md`).

## Liens internes obligatoires

- Pilier de la règle : `/guides/refus-de-dossier`, depuis les questions 1, 2 et 6.
- Pilier B : `/guides/dossier-de-location`, depuis la question 4.
- Guide voisin : `/guides/garantie-visale`, depuis la question 5.
- Outil : `/outils/dossier-de-location`, depuis la section « Ce que ça change ».
- Sortants : Légifrance (225-1, 225-2, décret 2015-1437), F14750, Défenseur des droits (antidiscriminations.fr si la source officielle le confirme).

## Appel à l'action

L'outil gratuit de dossier (il propose une liste par situation), puis « Être prévenu ». Ton
bienveillant, aucune promesse de logement.

## Visuel demandé à `seo-visuels`

Deux colonnes simples (SVG, monde papier) : « Ce qu'il peut regarder » (montant des ressources,
garanties, pièces de la liste) / « Ce qu'il ne peut pas retenir contre vous » (vulnérabilité
économique, nature des revenus selon le Défenseur des droits, pièce hors liste). Texte alternatif
qui reprend les deux colonnes.

## Contrôles avant publication

- `blog-relecteur` : rien ne laisse croire qu'un refus pour ressources insuffisantes est illégal ; la
  position du Défenseur des droits est attribuée à lui, pas présentée comme la loi.
- Pas de « vous avez droit à » sans texte. Mot « Leboncoin » absent. Aucun prix ni offre.
