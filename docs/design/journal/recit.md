# Journal de la session `recit` (pôle Design, 5 novembre 2026)

## Gestes choisis (écrits avant de coder)

- **Parcours, la lumière** : la section sort de sa scène bleu nuit ; le rail
  devient une ligne de lumière qui se trace du bleu à l'orange quand on arrive,
  allume les pastilles une à une et file jusqu'au bord de l'écran après l'envoi.
  Pourquoi : c'est le seul élément qui dit « voilà comment ça se passe » d'un
  coup d'œil ; il doit porter la section, pas une boîte autour.
- **Problem, l'instrument** : les deux cartes « sans / avec » deviennent une
  seule règle graduée, sans carte ; les deux arrivées s'y posent l'une sous
  l'autre et l'intervalle entre elles est hachuré d'orange. Pourquoi : deux
  cartes côte à côte demandaient de comparer deux frises ; sur une seule
  échelle, l'écart de temps se voit avant de se lire.

## Avant / après

- Parcours avant : scène bleu nuit arrondie, la matière du bas de page.
- Problem avant : deux cartes bleu nuit, deux frises à comparer de l'œil.
- Parcours après : plus de scène ; un rail lumineux qui se trace tronçon par
  tronçon (220 ms d'écart), pastilles qui s'allument, fuite orange jusqu'au
  bord après l'envoi, lueur d'horizon masquée sur ses bords.
- Problem après : une règle graduée sans carte, deux pistes sur la même
  échelle, l'intervalle gagné hachuré d'orange et relié par un pointillé à
  l'arrivée sans Terouva ; les deux phrases passent sous la règle.

Captures (`.playwright-mcp/`) : `recit-avant-*`, `recit-apres-{parcours,gains}-{375,768,1440}.jpeg`,
`recit-defile-parcours-*` (défilement réel), `recit-jointure-1440.jpeg`.

## Vérifications

- `tsc` propre sur mes fichiers ; aucun débordement horizontal (375, 1440).
- Contrastes : ink-3 sur nuit 6,2:1 ; ink-2 10:1 ; action-ink sur action
  7,42:1 ; ink-2 sur paper-2 environ 9:1. La règle est `aria-hidden`, les
  noms « Sans / Avec Terouva » restent lus devant chaque phrase (`sr-only`).
- `prefers-reduced-motion` : tout est visible d'emblée.

## Pour la cheffe

- **Hero** : à 1440 px, `.rideau-lueur` déborde de 96 px et se coupe net sur
  Parcours. J'ai aéré le haut de Parcours (`lg:pt` + 4rem) ; la coupe reste
  à traiter dans le hero.
- Le panneau 3 (`PanneauMessage`, `HeroExemples.tsx`) est sombre quand les
  trois autres sont crème : rupture visible sur le rail. Pas à moi.

## Leçon pour BONDS

Une comparaison « avant / après » dans le temps se lit mieux sur une seule
échelle partagée que dans deux cartes côte à côte : l'écart devient une
surface qu'on voit, au lieu de deux positions qu'on compare.
