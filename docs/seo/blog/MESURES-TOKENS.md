# Consommation par vague

> Tenu par le chef du pôle. Source : `get_usage` (forfait Max, fenêtres de 5 heures et de la
> semaine, contexte par session). Les pourcentages du forfait sont ceux du compte entier : ils
> incluent tout ce qui tourne en même temps (autres pôles compris). On compare donc des ordres de
> grandeur, pas des décimales.

## Vague 6 (méthode série) — départ le 2026-11-04 vers 17 h 25

| Mesure | Départ | Arrivée | Écart |
|---|---|---|---|
| Forfait, fenêtre de 5 h | 3 % (remise à zéro à 23 h 20) | 21 % après l'écriture | **+18 points pour 25 articles** (≈ 0,7 par article, tout le compte) |
| Forfait, semaine | 17 % | 19 % après l'écriture | +2 points |
| Contexte de la session Rédaction | 485 556 tokens (messages : 383 378) | 535 657 après 4 articles | +50 000 (≈ 12 500 par article, historique compris) |

Travail : 25 articles, 6 rédacteurs, consigne de 3 lignes chacun.

Point de comparaison, la vague 5 (ancienne méthode) : 19 articles par 6 rédacteurs, puis trois
relectures complètes, sept allers-retours de correction et trois contre-relectures. Non mesurée au
moment (pas de relevé de départ) : seule la durée et le nombre de tours sont comparables.

### Écriture : constats
- Les 25 articles sont rendus **verts du premier coup** au vérificateur : aucun aller-retour mécanique,
  contre sept corrections et trois contre-relectures en vague 5.
- Comptes rendus d'une ligne par article : la lecture des six retours par le chef a tenu en quelques
  centaines de tokens.
- Coût résiduel principal : l'historique des sessions conservées (485 000 tokens pour la seule
  Rédaction), renvoyé à chaque tour.
- Les citations de visale.fr et Légifrance ne passent jamais le script (403 aux robots) : elles
  coûtent une lecture humaine à chaque vague.

### Relecture et publication : mesures
| Mesure | Après l'écriture | Fin de vague | Écart |
|---|---|---|---|
| Forfait, fenêtre de 5 h | 21 % | 29 % | +8 points (relecture du lot entier, corrections, publication) |
| Forfait, semaine | 19 % | 20 % | +1 point |
| Contexte de la session Relecture | | 631 984 tokens | la plus lourde des sessions |

**Bilan de la vague 6** : 25 articles écrits, relus, publiés et en ligne pour **≈ 26 points de la
fenêtre de 5 h et 3 points de la semaine**, soit ≈ 1 point de fenêtre par article de bout en bout. Zéro
aller-retour auteur-relecteur ; deux corrections appliquées par le chef ; 125 citations sur 140
prouvées par le script.

### Ce qui a coûté, et l'optimisation pour la vague 7
1. **Les mêmes erreurs reviennent** (âge Visale déjà corrigé dans les guides en vague 2, mention
   « manuscrite », « Hexagone »). Un article tiré au sort est tombé pour l'une d'elles, et **tout le lot
   a été relu** : c'est le plus gros poste de la relecture. → Chaque défaut récurrent devient une règle
   du vérificateur (trois ajoutées) et une ligne de « Pièges connus » dans la méthode.
2. **Les corrections du relecteur dépassaient les limites** (chapeau à 66 mots) : le chef a dû les
   resserrer. → Le relecteur applique lui-même une correction exacte et passe le vérificateur avant de
   rendre ; il ne laisse « À CORRIGER » que ce qui demande l'auteur.
3. **15 citations sur 140 en relecture humaine** (visale.fr, Légifrance en 403). → Quand une fiche
   service-public dit la même règle, la citer de préférence : elle est lisible par le script.
4. **Chaque rédacteur refait la recherche des mêmes règles** (Visale, caution, préavis). → Réutiliser
   d'abord un fait déjà validé d'un article publié (même source, même citation) avant d'en chercher un.
5. **L'historique des sessions conservées** (530 000 à 630 000 tokens) repart à chaque tour : c'est le
   coût fixe le plus lourd. → Moins de tours : 3 rédacteurs à 8 articles plutôt que 6 à 4. Et, si Hugo
   l'accepte, des sessions de série neuves, dédiées à l'écriture, à côté des douze conservées.

## Vague 7 (sessions neuves) — départ le 2026-11-04 vers 19 h 05

| Mesure | Départ | Arrivée | Écart |
|---|---|---|---|
| Forfait, fenêtre de 5 h | 37 % (avant écriture ; plan et refonte de /blog : 31 → 37) | 45 % après écriture, 49 % en ligne | **+12 points pour 22 articles** |
| Forfait, semaine | 21 % | 23 % | +2 points |

Travail : 22 articles, 3 rédacteurs neufs (8, 8, 6), consigne de 3 lignes ; plan fait par une
session neuve. Session du chef : 877 000 tokens (88 %), à relayer par une session neuve après la vague.

**Bilan de la vague 7** : ≈ 0,36 point par article à l'écriture (0,72 en vague 6) et ≈ 0,55 de bout
en bout (1,04 en vague 6) : **coût divisé par deux**. Une session neuve finit à 230 000 à 250 000
tokens de contexte, contre 535 000 à 632 000 pour une session conservée. Le relecteur a appliqué
lui-même ses dix corrections : zéro intervention du chef sur les articles. 98 citations sur 99
prouvées par le script.

### Optimisations pour la vague 8
1. Garder des **sessions neuves** pour écrire et relire ; vider le contexte d'une session avant de la
   réutiliser (autorisé par Hugo).
2. Deux consignes de rédaction ajoutées à la méthode : **chapeau écrit en dernier** (trois chapeaux
   contredisaient leur corps), **exception de la source nommée** avant toute règle absolue.
3. Une règle proposée par le relecteur ne s'adopte qu'après avoir tourné sur tout le corpus : celle
   sur la « mention » de la caution a levé quatre faux positifs et a été abandonnée.
4. Le chef lui-même pèse 880 000 tokens : relayer le pilotage par une session neuve
   (`docs/seo/RELAIS-CHEF.md`).
