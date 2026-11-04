# Calendrier éditorial du blog — Terouva

> Propriétaire : `blog-redacteur-en-chef`. Version 2 du 2026-11-04 (la version 1, douze semaines à
> un article par semaine, est remplacée après la décision d'Hugo d'un **blog en volume**, `BRIEF.md`).
> Ligne éditoriale : `LIGNE-EDITORIALE.md`. Vague 6 : `PLAN-VAGUE-6.md`. Dates officielles : `VEILLE.md`.

## Rythme : par lots, avec une mesure entre deux lots

- **Un lot toutes les deux semaines, 7 articles au plus.** Le brief demande des lots de 5 à 10 ; je
  retiens le bas de la fourchette haute parce que le site est jeune (17 pages indexables, Domain
  Rating 0) et qu'un lot de 7 en double déjà la partie éditoriale en quatre lots. Ce qui limite
  vraiment, c'est la relecture : chaque article passe par `blog-relecteur`, distinct de l'auteur.
- **Porte entre deux lots** (`seo-analyste`, une semaine après chaque lot) : inspection d'URL et
  couverture dans Search Console. Le lot suivant part si la plupart des articles du lot précédent
  sont indexés, ou au moins explorés. S'ils sont surtout « explorés, actuellement non indexés », on
  arrête, on relit le lot (apport propre, cannibalisation) et on espace.
- **Les actualités ne suivent pas les lots** : elles partent à leur date (encadrement, IRL) et
  comptent dans le lot de leur quinzaine.
- **Pause des fêtes** : rien entre le 2026-12-18 et le 2027-01-06 (la mesure y serait illisible).

## Les lots

| Lot | Mise en ligne | Articles | Vague | Porte de mesure |
|---|---|---|---|---|
| 1 | jeudi 2026-11-12 | Encadrement des loyers (slug `encadrement-des-loyers-fin-ou-prolongation`, **au plus tard le 13**) · Nouveau modèle de bail · Le propriétaire ne répond pas · Visale refusée · Louer au chômage · DossierFacile · Arnaque à la location | 5 | 2026-11-19 |
| — | jour du vote (annoncé le 19/11) et jour du terme (23 ou 24/11) | Mises à jour de l'article encadrement (brief 1, « Mises à jour prévues ») | 5 | — |
| 2 | jeudi 2026-11-26 | Trouver un appartement rapidement · Lettre de motivation · Questions à poser en visite · Savoir si son dossier est retenu · Frais d'agence · Filigrane · DPE 2027 (avant le 15/12) | 5 | 2026-12-03 |
| 3 | jeudi 2026-12-10 | Les quatre articles de la vague 5 en attente de décision (voir plus bas), **seulement s'ils sont tranchés** ; sinon remplacés par les n° 19, 12 et 10 du plan vague 6 · plus les n° 5, 20 et 22 du plan vague 6 | 5 et 6 | 2026-12-17 |
| — | pause des fêtes | — | — | — |
| 4 | jeudi 2027-01-07 | Vague 6 : n° 1, 6, 11, 14, 17, 21, 24 | 6 | 2027-01-14 |
| — | vendredi 2027-01-15, 8 h 45 | Révision IRL (chiffre de l'INSEE le jour même) | 5 | avec le lot 5 |
| 5 | jeudi 2027-01-21 | Étude zones tendues (après la vérification du 2027-01-04 sur la liste au 1er janvier) · vague 6 : n° 2, 7, 13, 15, 18, 25 | 5 et 6 | 2027-01-28 |
| 6 | jeudi 2027-02-04 | Vague 6 : n° 3, 4, 8, 16, 23 | 6 | 2027-02-11 |
| 7 | jeudi 2027-02-18 | Vague 6 : n° 9, puis les n° 10, 12, 19 s'ils ne sont pas partis au lot 3, et les articles glissés des lots précédents | 6 | 2027-02-25 |

Règles de composition : chaque lot mêle au moins trois piliers ; jamais deux articles de la série
« peut-on louer quand… » (vague 6, n° 5 à 9) dans le même lot ; un article dont la source officielle
n'a pas été lue glisse au lot suivant au lieu de partir sans elle.

## Vague 5 : quatre articles en attente de décision du chef

Risque de cannibalisation relevé le 2026-11-04 (détail dans le compte rendu au chef). Ils ne partent
pas au lot 1 ni au lot 2.

| Article | Conflit | Proposition |
|---|---|---|
| Âge limite pour se porter garant | Même requête que `/guides/garant-caution`, qui la reçoit déjà (registre, pos. 43) | Recentrer sur « garant retraité : quels documents fournir » (dix suggestions AC au registre), ou verser la réponse dans la FAQ du guide |
| Lettre de préavis | Variante « lettre de préavis logement 1 mois » de la ligne du guide `/guides/preavis-location`, qui a sa section « La lettre de congé » ; le registre prévoit aussi un modèle couplé au simulateur de préavis | Publier comme modèle seulement si le guide réduit sa section à un renvoi ; sinon, intégrer le modèle au guide |
| Mail après visite | Le registre l'attribue à l'outil message (mode « après la visite ») et à une section du guide pilier A ; voisin direct de « Savoir si son dossier est retenu » | Article seulement s'il vise le modèle (« exemple mail après visite appartement »), renvoie à l'outil, et laisse « délai de réponse » à l'article « dossier retenu » |
| Être le premier à répondre | Demande non prouvée (registre, P3) et même intention que « Trouver un appartement rapidement » | Seulement avec une donnée publique réelle (étude) ; sinon fusion dans « Trouver rapidement » |

## Saisonnalité

Toujours **non mesurée** : Search Console trop jeune, Trends non lu, Semrush sans unités. Les dates
du calendrier viennent des textes (`VEILLE.md`) et du rythme de mesure, pas d'un pic supposé. La
revue de février (semaine du 2027-02-01) reprend les sujets saisonniers de la veille (logement
étudiant, mutation) quand `seo-registre` aura lu Google Trends.

## Dépendances

| Qui | Quoi | Pour quand |
|---|---|---|
| Chef | Décision sur les quatre articles en attente | avant le lot 3 (2026-12-10) |
| `blog-veille-juridique` | Suivi du texte sur l'encadrement jusqu'au terme ; vérification de la liste des zones tendues le 2027-01-04 | en continu |
| `seo-registre` | SERP google.fr des 25 requêtes de la vague 6, avant chaque brief ; Trends saisonniers | au fil des lots |
| `seo-analyste` | Porte de mesure une semaine après chaque lot | dates du tableau |
| `blog-redacteur-en-chef` | Briefs de la vague 6, lot par lot (7 briefs par quinzaine) | deux semaines avant chaque lot |
| Hugo | Signature des articles et page « Comment nous écrivons » (`CONFIANCE.md`) | avant le lot 2 si possible |
