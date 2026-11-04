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
