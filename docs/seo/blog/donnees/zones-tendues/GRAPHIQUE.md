# Graphique principal : spécification (`seo-visuels`, non codé)

> Pour l'article d'étude sur le préavis en zone tendue. Fidèle à `DESIGN.md` (révision du
> 30 octobre 2026) et aux jetons de `apps/web/app/globals.css`. À coder par l'agent à qui le chef
> attribuera le gabarit d'article ; données : `resultats/grandes-villes.csv`.

## Ce que le graphique doit faire comprendre

**Titre-message** (Fraunces, niveau 2 du monde papier) :
« Dans 17 des 42 plus grandes villes, le préavis d'une location vide reste de trois mois »

Sous-titre (Archivo, `--color-ink-2`) : « Communes de 100 000 habitants ou plus, classées par
population. Un mois en zone tendue, trois mois ailleurs, sauf autre motif prévu par la loi. »

## Forme : un index à filets, la durée en longueur de trait

Pourquoi cette forme : `DESIGN.md` demande « l'index plutôt que la carte », et un diagramme de
population écraserait 39 villes sous Paris. Ici la longueur du trait encode **la seule chose que
le lecteur cherche** : un mois ou trois. L'œil voit tout de suite les traits longs. Ce rythme de
bâtons courts et longs rappelle aussi le rideau de l'accueil, sans le copier.

- **Une ligne par ville** (42 lignes), triées par population décroissante. Filet `--color-rule`
  entre les lignes, numéro de rang dans la marge (`.numero`, Fraunces, `--color-ink-3`).
- **Colonnes** : rang | nom de la ville (Archivo, `--color-ink`) et département entre parenthèses
  (`--color-ink-3`) | trait | mention de durée en toutes lettres, « 1 mois » ou « 3 mois » (Archivo,
  chiffres tabulaires).
- **Trait** : épaisseur 6 px, bouts droits (aucun arrondi au-delà de 4 px). Longueur 1 unité pour
  un mois, 3 unités pour trois mois, sur une échelle commune annoncée par une règle graduée en tête
  (« 1 mois », « 2 », « 3 mois »).
- **Couleur** : un mois en bleu papier `--color-accent-ink` (`#0a6aa8`, 5,22:1 sur `#f7f3ed`) ;
  trois mois à l'encre `--color-ink-2` (`#4e5154`, 7,23:1). Les deux traits dépassent 3:1, le seuil
  des éléments graphiques. **La couleur n'est jamais seule** : la longueur et la mention écrite
  disent la même chose. Pas d'orange : sur papier, l'orange reste au bouton d'action de l'écran.
- **Saint-Denis** apparaît deux fois : écrire « Saint-Denis (La Réunion) » et « Saint-Denis
  (Seine-Saint-Denis) ».

## Monde, polices, mise en page

- **Monde papier** (`.monde-papier`) : un article d'étude se lit longtemps, comme les guides.
  Pas de bande nuit autour du graphique : `DESIGN.md` refuse « une bande sombre posée sur une page
  claire ». Pas de DM Mono (réservée à `.loi` dans le monde papier).
- **375 px** : une colonne, 42 lignes, chaque ligne de 44 px de haut au moins. Le trait de trois
  mois ne dépasse pas 40 % de la largeur ; le nom passe à la ligne plutôt que d'être tronqué.
- **À partir de 1024 px** : deux colonnes de 21 lignes, lecture de haut en bas puis colonne
  suivante, mesure de 44 rem au plus par colonne. Le rang garde l'ordre lisible.
- **Mouvement** : le geste existant `.filet-trace`, une fois, en descendant ; les traits poussent
  depuis la gauche avec 20 ms d'écart, 900 ms au total au plus, `--ease-terouva`. Avec
  `prefers-reduced-motion` et à l'impression, tout est là d'emblée.

## Texte réel et accessibilité

- **HTML et CSS, pas une image** : `<figure>` contenant une `<ol>` (l'ordre a un sens) dont chaque
  `<li>` porte le texte complet (« 27. Tours (37) : 3 mois »). Le trait est décoratif
  (`aria-hidden="true"`). Les moteurs et les assistants lisent ainsi les 42 durées.
- **Légende sous le graphique** (`<figcaption>`, Archivo, `--color-ink-3`) :
  « Source : zonage TLV du ministère de la Transition écologique après le décret n° 2025-1267 du
  22 décembre 2025 (Licence Ouverte) ; populations municipales Insee au 1er janvier 2023. Calcul
  Terouva, relevé le 4 novembre 2026. Location vide seulement. »
- **Résumé pour lecteur d'écran** (la phrase-clé, en tête de `figcaption` ou en `aria-describedby`) :
  « Sur les 42 communes de 100 000 habitants ou plus, 25 sont en zone tendue avec un préavis d'un
  mois en location vide, et 17 restent à trois mois, dont Reims, Saint-Étienne, Le Havre, Dijon,
  Angers, Tours et Rouen. »

## Image de partage de l'article

Elle passe par le gabarit existant `imageOG` (`apps/web/lib/og.tsx`) : surtitre « Étude », titre
« Préavis d'un mois : 17 grandes villes restent à trois mois ». Option à valider par Hugo : une
rangée de 42 bâtons courts et longs (bleu `#0297DE` et `#B4BEC8` sur la nuit) sous le titre, qui
reprend le graphique. Texte alternatif : « Dans 17 des 42 villes de plus de 100 000 habitants, le
préavis d'une location vide reste de trois mois ; étude Terouva sur données publiques,
novembre 2026. »

## Graphique secondaire possible (non demandé)

Une barre unique de 100 % pour la population : 39,0 % en zone tendue, 4,4 % en communes
touristiques et tendues, 56,6 % ailleurs. Mêmes règles : valeurs écrites sur la barre, source
dessous.
