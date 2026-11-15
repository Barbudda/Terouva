# v2-qa : passe qualité de l'accueil refait (15 novembre)
Mobile 412 px, Slow 4G, CPU 4×, cache vide. Avant = terouva.com ; après = build de production
local, même latence (TTFB 564 ms des deux côtés).

| Mesure | Avant | Après | Seuil |
|---|---|---|---|
| LCP | 3,0 / 3,2 s | 2,00 / 1,99 s | < 2,5 s |
| FCP | 2,6 s | 2,1 s | |
| TBT (tâches longues après FCP) | ~180 ms | 8 ms | |
| CLS | 0 | 0 | < 0,1 |
| Accessibilité Lighthouse mobile | 100 | 100 | ≥ 95 |

Échec corrigé, le LCP, trois causes : 130 Ko de polices préchargées prenaient la bande passante de
la CSS bloquante (DM Mono, 27 Ko, n'est plus préchargée, cda3c5f) ; le premier rendu attendait deux
mises en page de toute la page, 295 et 132 ms (sections sous la ligne de flottaison en
`content-visibility: auto`) ; la phrase du hero, élément LCP, partait d'une opacité nulle (elle monte
désormais sans fondu, `.entree--lcp`). Commit 30ef058.

Sans échec : contraste AA (l'orange #d9531f ne porte que des titres de 40 px et plus) ; mouvement
réduit (rien d'invisible, aucune boucle, pas de défilement horizontal) ; mouvement normal (transform
et opacité seulement, 4 images longues sur 760 en défilant à CPU 4×, ancres justes) ; captures
375 / 768 / 1440 sans débordement, coupure ni chevauchement ; titres de section tous à 80 px à 1440.

Reste : remesurer sur terouva.com après le push ; les cinq boucles du hero tournent hors écran
(compositeur seul) ; `apps/web/.next-qa` (build de mesure, non commité) est à supprimer.
