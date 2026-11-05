# Journal : session qa-finale (mouvement, performance, accessibilité, contrôle visuel)

5 novembre 2026. Build de production `NEXT_DIST_DIR=.next-dev-qa`, `next start -p 3040`.
Lighthouse 12 en CLI (mobile, débit simulé), Chromium Playwright 1248 ; le Playwright MCP
partagé était verrouillé, captures par script `playwright-core` à part.

## Lighthouse mobile, avant / après (perf · a11y · LCP · CLS · TBT)

| Page | Avant | Après |
|---|---|---|
| `/` | 84 · 100 · 3,3 s · 0,029 · 200 ms | 92 · 100 · 2,9 s · 0,029 · 130 ms |
| `/guides/depot-de-garantie` | 76 · 100 · 3,6 s · **0,206** · 170 ms | 90 · 100 · 3,3 s · **0** · 70 ms |
| `/outils` | 84 · 100 · 3,0 s · **0,162** · 140 ms | 93 · 100 · 2,9 s · **0** · 70 ms |
| `/blog` | 80 · 100 · 4,4 s · 0 · 190 ms | 88 · 100 · 3,5 s · 0 · 110 ms |

- Accessibilité 100 partout ; l'accueil avait un échec `label-content-name-mismatch` (lettres du ruban), corrigé.
- CLS sous 0,1 partout. INP : non mesurable en labo, TBT ≤ 130 ms.
- **LCP encore au-dessus de 2,5 s en simulation.** Le FCP plafonne à 2,0 s sur toutes les pages
  (réseau simulé : 560 ms de latence par requête). Une trace DevTools réelle (CPU ×4) donne un LCP de
  1,07 s sur le guide. `experimental.inlineCss` a été essayé : aucun gain mesurable, retiré.
  La machine était chargée (six serveurs Next) : à re-mesurer avec PageSpeed Insights sur la
  prévisualisation Vercel après le push.

## Ce qui a été corrigé (commits 35a313c à ef4e451, plus le correctif suivant)

- Mouvement réduit : la règle globale gardait les délais, d'où des éléments à opacité 0 jusqu'à 1,4 s.
  Délais d'animation et de transition à zéro ; la lueur du rideau disparaît au lieu de rester figée.
- Rideau du hero : ses 6 rem de débord sur Parcours se fondent (second masque), plus de coupe à 1440 px.
- Survol des images de rubrique : 700 ms ramenés à 500 ms, comme les autres.
- Ruban : `inert` sur le second jeu de la coquille `Mosaique`, pis-aller de Messages retiré.
- Polices : secours « Fraunces Secours » calé sur les titres, Courier New pour DM Mono, axe SOFT
  retiré (fichier Fraunces de 119 à 67 Ko).
- `fetchPriority="high"` sur l'image d'en-tête des guides et la grande carte de rubrique.

Audit du mouvement : durées de 150 à 900 ms, sauf les tracés lents du récit (1,1 et 1,4 s,
voulus : « c'est l'attente »). Une seule courbe, `--ease-terouva`. Le `linear` est réservé au
défilé du ruban et au fil de lecture lié au défilement, où il est juste. Rien d'invisible en
mouvement réduit sur les cinq pages auditées. `emil-review-animations` ne peut pas être lancé par
l'agent (`disable-model-invocation`) : à lancer à la main si on veut ce second regard.

## Contrôle visuel 375 / 768 / 1440 (neuf gabarits)

Aucun débordement horizontal, aucun texte coupé, aucun bloc resté invisible en défilement normal.
Titres h2 alignés à gauche partout, sauf l'inscription de l'accueil, centrée à dessein.

## Ce qui reste

- Les commits 35a313c, 5a32cb4, f868c08 et ef4e451 ont un `globals.css` mal formé : l'indexation
  partielle a posé des blocs 14 lignes trop bas. Le commit correctif qui suit les répare. Ne pas
  pousser l'un d'eux seul.
- LCP mobile simulé de 2,9 à 3,5 s : à confirmer sur la prévisualisation (PageSpeed Insights).
- Fil d'Ariane d'un article à 375 px : il passe à la ligne avec un « / » orphelin en tête (zone navigation).
- Un défilement par sauts très rapides peut sauter un bloc du révélateur ; il apparaît dès qu'on y
  revient (limite de l'IntersectionObserver).
- `/liste` est la page privée à mot de passe : sobre et propre, hors parcours visiteur.

## Leçons transférables

- Le secours d'une police variable se calcule sur son instance par défaut. Si les titres la règlent
  autrement (opsz, WONK, largeur), il faut mesurer la largeur réelle et poser un `size-adjust` à part,
  sinon le CLS vient des titres et non des images.
- Une police monospace se remplace sans décalage par une autre police monospace de même chasse
  (DM Mono et Courier New : 0,6 em). Un secours Arial calculé ne tient pas sur des capitales.
- `priority` de next/image (Next 15.5) précharge l'image sans `fetchpriority=high` : l'ajouter à la main.
- Un repli `prefers-reduced-motion` qui ne remet pas `animation-delay` à zéro laisse les éléments en
  `both` invisibles pendant leur délai.
- Indexation partielle : ne jamais appliquer un diff `-U0` dont on a retiré un bloc plus haut,
  car les numéros de ligne des blocs suivants deviennent faux. Indexer le fichier entier, ou committer
  dans l'ordre des blocs.
