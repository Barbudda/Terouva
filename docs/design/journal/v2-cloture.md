# Vague 2, session `cloture` (15 novembre 2026)

**Fait** : `Inscription.tsx` rend deux sections au lieu d'une bande nuit.
- `#questions` sur crème (`monde-papier`, 80/128 px) : `TitreSection` (étiquette « Questions
  fréquentes », titre « Avant de vous inscrire. »), une colonne centrée de 48 rem, questions en
  20 → 26 px graisse 600 (prop `grand` de `Questions`, les guides gardent l'ancien rendu).
- `#inscription` en bande nuit : `TitreSection` (« Terouva ouvre par vagues. » / accent « Prenez
  place dans la prochaine. »), taille portée à 104 px max (`.arrivee .titre-section`), guichet de
  64 px au centre (40 rem), une seule ligne de réassurance.
- Logique et états du formulaire inchangés (saisie, envoi, erreur, billet, déjà inscrit).

**Coupé (pour le pôle Commerce)**
- Le bloc « Prévu pour / Sur ordinateur » : son détail « Dans votre navigateur, sans installation »
  passe en tête de la ligne de réassurance du formulaire (prop `avant`), « Sur ordinateur » disparaît.
- Les numéros 01-06 devant les questions (style nuit) et le filet entre FAQ et clôture.

**Changé** : le bouton du formulaire passe de « Me prévenir » à « Être prévenu », le libellé du
hero et de la navigation (REFERENCE.md, règle 8). Vaut aussi pour `FinDePage`.

**Preuve** : tsc propre ; captures 1440 et 375 en mouvement réduit regardées.
**À la cheffe** : `.arrivee-titre`, `.arrivee-filet` supprimés de `arrivee.css` (plus utilisés) ;
`.questions-numero` reste pour le rendu nuit de `Questions`, que plus rien n'utilise.
