# Brief 4 — Visale refusée : pourquoi, et que faire

> Rédacteur en chef : `blog-redacteur-en-chef`, 2026-11-04. Rédaction : `seo-redacteur`. Relecture :
> `blog-relecteur`. Publication semaine du 2026-11-23 (calendrier, semaine 3).

## Entrée `apps/web/lib/blog.ts`

| Champ | Valeur proposée | Contrôle |
|---|---|---|
| `slug` | `visale-refusee` | |
| `titre` (h1) | « Garantie Visale refusée : pourquoi, et ce que vous pouvez faire » | |
| `titreSeo` | « Visale refusée : pourquoi, et que faire ? » | 51 signes avec « · Terouva » (≤ 60) |
| `description` | « Visa Visale refusé ou propriétaire qui n'en veut pas : deux refus différents. Les causes vérifiables, ce que vous pouvez corriger, les autres garanties. » | 152 signes (70 à 155) |
| `chapeau` | « Un refus de Visale vient de l'un de deux côtés. Action Logement refuse le visa quand une condition manque : âge, situation, ressources ou loyer trop élevé. Le propriétaire, lui, peut ne pas vouloir de cette garantie. Dans le premier cas, corrigez le dossier ou visez un loyer plus bas ; dans le second, proposez un autre garant. » | 58 mots (40 à 60). La phrase sur le propriétaire attend le fait n° 6 : si aucune source ne la porte, la réécrire |
| `pilier` | `C` | |
| `format` | `question` | |
| `lecture` | 5 | pour 900 à 1 000 mots |
| `guidePilier` | `/guides/garantie-visale` | le guide est la page de la requête-mère ; l'article n'en est qu'une variante |
| `guidesLies` | `/guides/louer-sans-garant`, `/guides/garant-caution` | |
| `outilLie` | `/outils/dossier-de-location` | |
| `statut` | `brouillon` jusqu'au feu vert de `blog-relecteur` | |

## Fiche

| Champ | Valeur |
|---|---|
| Requête-mère | « garantie visale refusée », **variante** de la requête-mère « garantie visale conditions » (registre v1, ligne du guide Visale ; source : autocomplétion du 2026-11-04) |
| Variantes | visale refusée ; refus visale que faire ; demande de visa non conforme ; propriétaire refuse visale ; les agences acceptent-elles Visale ? (PAA, registre) |
| Intention | information, avec un problème à régler maintenant |
| Ne pas cannibaliser | `/guides/garantie-visale` garde « conditions », « c'est quoi », « plafonds », « démarche ». L'article ne réexpose pas les conditions : il les cite en une phrase et renvoie au guide, puis traite **ce qui se passe après un non** |
| Guide à mettre à jour dans le même lot | `/guides/garantie-visale` : une ligne « Si votre demande est refusée » qui renvoie à l'article. Les corrections de la file de fraîcheur (n° 8, 9, 24 de `VEILLE.md`) sont passées en partie par le commit 112f697 : `seo-fraicheur` vérifie ce qui reste (validité du visa, n° 24) |
| Longueur | 900 à 1 000 mots |

## L'angle

Recherche web du 2026-11-04 (pas une lecture de SERP google.fr ; **SERP à lire par `seo-registre`**,
la variante n'a pas encore sa ligne de lecture au registre) : les premiers résultats sont presque
tous de **123loger.com**, qui a au moins quatre articles sur le refus de Visale. C'est aussi le site
le plus cité par les assistants dans notre test du 2026-11-04 (15 citations, `JOURNAL.md`). On ne le
bat pas en volume. On le bat sur trois points :

1. **Deux refus qui n'ont rien à voir**, posés dès le chapeau : le visa refusé par Action Logement
   (une condition manque) et le propriétaire qui ne veut pas de Visale. La conduite à tenir diffère.
2. **Uniquement des sources officielles datées** (service-public F33453, visale.fr, actionlogement.fr,
   Légifrance), là où les pages concurrentes ne citent qu'elles-mêmes.
3. **Les changements du 6 janvier 2026** comme cause de refus encore mal connue : plafond de
   ressources des salariés de plus de 30 ans à 1 710 €, plafonds de loyer en trois catégories de communes.

## Plan en questions

1. Qui a refusé : Action Logement ou le propriétaire ? (comment le savoir : message sur l'espace
   Visale, ou réponse du bailleur)
2. Pourquoi Action Logement refuse-t-il un visa ? (les conditions qui manquent le plus souvent,
   d'après les conditions officielles : âge et situation, ressources, loyer au-dessus du plafond de
   la commune, part du loyer dans les ressources, dossier incomplet. On ne dit pas « le plus souvent »
   sans source : on dit « les conditions à vérifier »)
3. Que faire si votre loyer dépasse le plafond Visale ? (simulateur visale.fr, viser un loyer plus
   bas dans la même ville ; plafonds en une phrase et lien vers la section du guide)
4. Peut-on refaire une demande, ou contester ? (ce que visale.fr et Action Logement prévoient
   réellement : réclamation, nouvelle demande après correction. Rien d'autre)
5. Un propriétaire peut-il refuser Visale ? (fait n° 6 ; et le cas du bailleur personne morale, qui
   ne peut exiger une caution que d'un organisme agréé comme Visale, ou pour un étudiant non boursier)
6. Les agences acceptent-elles Visale ? (seulement si une source officielle ou une donnée réelle
   existe ; sinon la question est retirée, pas devinée)
7. Sans Visale, quelles solutions restent ? (garant physique, société de cautionnement sans prix,
   Loca-Pass pour le dépôt de garantie, qui n'est pas une caution ; lien vers `louer-sans-garant`)

Section « Ce que ça change pour votre recherche » : demander le visa **avant** de chercher, le
mentionner dès le premier message (lien vers l'article « propriétaire ne répond pas » et le guide
pilier A), trier les annonces par le plafond Visale de la commune.

## Faits à sourcer (dans `docs/seo/FAITS.md` avant publication)

| # | Fait | Source visée | Déjà relevé ? |
|---|---|---|---|
| 1 | Conditions d'âge et de situation : 30 ans et moins ; salariés de plus de 30 ans (promesse à 3 mois, 6 mois après embauche ou mutation, ou 1 710 € nets au plus) | SP F33453 (vérifiée le 2026-01-23), visale.fr | oui (`faits-confirmes-2026-11-04.md`) |
| 2 | Loyer au plus 50 % des ressources ; plafonds de loyer 1 940 € / 1 575 € / 1 365 € ; seuils étudiants | F33453, actionlogement.fr | oui |
| 3 | Délai du visa : quelques jours ouvrés ; demande avant la signature du bail | F33453 | oui |
| 4 | Changements du 2026-01-06 (trois premières années, 1 710 €, trois catégories de communes) | visale.fr, « ce qui change en 2026 » | oui (veille) |
| 5 | Ce que prévoit Visale après un refus (réclamation, nouvelle demande, message « non conforme ») | visale.fr (FAQ, espace locataire) : **répond 403 aux robots, à lire dans un navigateur** ; actionlogement.fr | non. Le numéro de téléphone et le libellé « non conforme » ne viennent que d'un site concurrent : ne pas les reprendre sans la source officielle |
| 6 | Un bailleur privé personne physique est-il libre de refuser Visale ? | Légifrance (art. 22-1 loi 1989), service-public, ANIL | non. Si aucune source ne le dit, écrire ce que la loi impose (rien à ce sujet pour le bailleur personne physique, à vérifier) sans conclure au-delà |
| 7 | Bailleur personne morale (hors SCI familiale jusqu'au 4e degré) : caution seulement d'un organisme agréé ou pour un étudiant non boursier | art. 22-1 (LEGIARTI000044073458) | oui |
| 8 | Loca-Pass : avance du dépôt de garantie, 1 200 € au plus, sans intérêts, 25 mois, demande au plus tard 2 mois après l'entrée | SP F18490 (vérifiée le 2026-09-11) | oui |
| 9 | Durée de validité du visa | visale.fr (FAQ) | non (file de fraîcheur n° 24, en attente) |

Aucun chiffre sur la part des demandes refusées, aucune « cause la plus fréquente » : rien de publié
par Action Logement n'a été lu.

## Liens internes obligatoires

- Pilier : `/guides/garantie-visale`, depuis les questions 2 et 3 (ancre « les conditions de la garantie Visale »).
- Guide voisin : `/guides/louer-sans-garant`, depuis la question 7.
- Guide voisin : `/guides/garant-caution`, depuis les questions 5 et 7.
- Outil : `/outils/dossier-de-location`, depuis la section « Ce que ça change ».
- Article : `/blog/proprietaire-ne-repond-pas` s'il est publié.
- Sortants : F33453, visale.fr (simulateur), Légifrance art. 22-1, F18490.

## Appel à l'action

L'outil gratuit de dossier (« Préparer votre dossier, visa compris »), puis « Être prévenu ». Pas de
recommandation d'une société de cautionnement nommée, pas de prix.

## Visuel demandé à `seo-visuels`

Un schéma à deux branches (SVG, monde papier) : « Visa refusé par Action Logement » → vérifier les
conditions, corriger, redemander ; « Garantie refusée par le propriétaire » → proposer un autre
garant, ou chercher un autre logement. Texte alternatif qui décrit les deux branches.

## Contrôles avant publication

- `blog-relecteur` : aucune règle déduite d'un site concurrent ; les conditions recopiées du guide
  sont identiques au guide (sinon, l'un des deux est faux).
- Pas de comparatif de sociétés de garantie, pas de prix, pas de marque concurrente citée comme source.
