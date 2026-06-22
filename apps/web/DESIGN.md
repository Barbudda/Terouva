# Terouva — Direction artistique unifiée

> Une seule marque, sublime de bout en bout. Landing **et** `/app` parlent la même
> langue visuelle, autour de la signature du produit : **« arriver à temps »** →
> univers **live / radar / signal**. (Mission LOOK — TASK-004, présentation only.)

## Signature
Terouva est un **radar de confiance** : il veille, il capte le signal, il vous prévient
à temps. Le vocabulaire visuel est donc *calme au repos, vivant quand ça compte* : des
surfaces sombres et nettes, un accent **signal** (teal) qui ne sert que pour ce qui est
vivant/positif/actionnable, et un **urgent** (ambre) réservé à ce qui presse. Sobre et
crédible (outil sérieux), pas une démo d'effets.

## Palette (source unique = tokens de la landing)
- **Surfaces** : `--color-bg` `#0a0a0b` · `--color-bg-2` · `--color-panel` · `--color-panel-2`.
- **Bordures** : `--color-border` · `--color-border-2`.
- **Texte** : `--color-text` / `--color-text-muted` / `--color-text-faint` (hiérarchie à 3 niveaux).
- **Signal** (teal `#7ee8c8`) : marque, états live/positifs, score élevé, focus, liens actifs.
  `--color-signal-soft` pour les fonds discrets, `--color-signal-strong` pour les dégradés.
- **Urgent** (ambre `#ffb84d`) : « à contacter vite », score moyen, alertes — **avec parcimonie**.
- **Danger** (`#ff6f6f`) : erreurs/destructif uniquement.
- ❌ **Bannis** : violet (`accent`), emerald, zinc/slate en dur. Plus aucun ton hors tokens.

## Typographie
- Famille **Geist** (sans + mono), partagée landing/app. `tabular` (chiffres tabulaires)
  pour tous les compteurs/scores/montants.
- Échelle : `text-2xl/3xl` titres de page, `text-base` corps dense, `text-sm` secondaire,
  `text-[10px]–text-xs` labels uppercase `tracking-wider` (réservés aux méta/états).
- Poids : 600 pour les titres et chiffres-clés, 400–500 pour le corps. Tracking `-tight` sur les titres.

## Rythme & espacement
Grille de 4px. Respirations généreuses : `p-6` pour les zones de contenu, `gap-4`/`gap-6`
entre cartes, `px-2.5 py-1.5` dans les contrôles. Densité maîtrisée dans les listes
d'annonces (lisibles, jamais tassées).

## Élévation (système cohérent)
1. **Fond** : `--color-bg`.
2. **Panneau** : `--color-panel` + `1px --color-border` (cartes, header, sidebar).
3. **Panneau actif/hover** : `--color-panel-2` + `--color-border-2`.
4. **Signal** : halo `glow-signal` réservé aux éléments vivants (Watch ON, score élevé, CTA).
Pas d'ombres portées génériques : la profondeur vient des surfaces + 1px de bordure + halo signal.

## État « live » (le fil rouge identitaire)
Le live est un **atout**, pas un gadget : `WatchStatusBadge` (Watch ON) pulse en **signal**
quand actif (`animate-pulse-dot`), passe en `text-faint` au repos. Les compteurs (LiveCounter),
le ticker d'annonces et le ScoreBadge partagent ce langage : signal = ça vit, ça capte.
**Respect strict de `prefers-reduced-motion`** (déjà câblé) — toute animation a un repli statique.

## Accessibilité
Contraste AA minimum (signal/urgent sur fonds sombres = OK ; vérifier les `text-faint` sur
panel). Focus visibles (`:focus-visible` outline signal). Navigation clavier préservée.
