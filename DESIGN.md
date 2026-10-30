# Direction artistique de Terouva

> Écrit le 21 octobre 2026, réécrit le 30 octobre 2026 après la seconde refonte
> graphique. La première version corrigeait des défauts ; celle-ci pose un parti
> pris. Un site d'où l'on a retiré tout ce qui dépasse est propre et
> interchangeable : la direction ne naît pas de la suppression des erreurs.

## Le parti pris, en une phrase

**Terouva est un dossier de presse immobilier dans lequel est encastré un
instrument de mesure.** Deux mondes, visuellement opposés, et le passage de
l'un à l'autre correspond à un changement de nature du contenu : le papier
parle, l'instrument mesure.

| | Monde papier | Monde nuit |
|---|---|---|
| Ce qu'il porte | les guides, les droits, le discours, la confiance | l'outil, le score, la donnée, la démonstration |
| Fond | papier chaud `#f7f3ed` | encre `#17181a` |
| Voix | Fraunces à fort contraste, grandes tailles, beaucoup de vide | Archivo et DM Mono, petites tailles, densité |
| Rythme | lent, aéré, asymétrique (`--spacing-pas`) | serré, aligné, tabulaire (`--spacing-pas-nuit`) |
| Preuve | filets, numéros dans la marge, références d'articles de loi | chiffres, jauges, horodatages |

Trois gestes tiennent la différence entre « correct » et « on s'arrête de
défiler » : **le chevauchement** (le panneau d'accueil mord le visuel, le cadran
dépasse de sa bande, le logotype est coupé par le bord bas), **la typographie
comme matière** (le logotype du pied remplit la largeur), **l'index plutôt que
la carte** (toute liste est une suite de lignes à filets, numéro à gauche,
mention à droite).

## Typographie : trois voix, une par fonction

| Voix | Police | Où, exclusivement |
|---|---|---|
| Titre | **Fraunces** (variable, axes SOFT 0, WONK 1, opsz) | niveaux 1 et 2 du monde papier, chiffres clés, mentions italiques, logotype, numéros dans la marge |
| Texte et interface | **Archivo** | corps, navigation, boutons, libellés, niveaux 3 et au-delà, **tous les titres du monde nuit** |
| Instrument | **DM Mono** | monde nuit : champs (`.champ`), scores, horodatages ; et les références d'articles de loi (`.loi`) dans les guides |

Interdits : graisse au-dessus de 500 sur Fraunces ; capitales espacées sur un
titre ; `text-transform: uppercase` sur Fraunces. Les capitales sont réservées
à `.champ`, en monospace. La serif n'entre pas dans le monde nuit, la monospace
n'entre pas dans le monde papier hors `.loi`.

Classes : `.titre` / `.titre--petit`, `.mention`, `.enonce` (38 rem), `.marge`,
`.champ`, `.loi`, `.numero`. Échelles dans `@theme` (`--text-titre-1` …
`--text-nuit-champ`), fluides entre 390 et 1440 px.

## Couleur : deux bases par monde, un accent par monde

Le fait qui décide de tout : `#c92d6a` sur `#17181a` donne 3,58:1. Le magenta
de marque ne porte donc jamais de texte sur fond sombre. Le monde nuit reçoit
`--color-night-accent: #e85a8f` (5,32:1), et le texte d'un bouton nuit est à
l'encre (4,8:1), jamais en blanc (3,75:1).

**L'accent, quatre emplois et pas un cinquième** : le bouton d'action principal
d'un écran (un seul), les liens dans le corps, l'état actif ou le focus, le
remplissage de la jauge de score. Chevrons, puces, coches, filets, icônes : à
l'encre. **Le vert a disparu des scores** : un score se dit par sa valeur et sa
jauge.

Tokens dans `apps/web/app/globals.css`, tous les rapports de contraste calculés
en commentaire. Aucune couleur en dur dans les composants ; `lib/og.tsx` reprend
les valeurs pour les images de partage.

## Grille et rythme

Douze colonnes (`.grille`), 88 rem au plus. **Deux sections consécutives ne
démarrent jamais à la même colonne.** Mesure de lecture : 38 rem pour l'énoncé,
44 rem pour la prose des guides. Aucun arrondi au-delà de 4 px.

## Six coquilles, pas une de plus

`apps/web/components/layout/coquilles/`. Les sections les consomment, elles ne
les réinventent pas. Chacune apparaît au plus deux fois sur l'accueil, jamais
deux fois de suite.

| | Coquille | Sur l'accueil |
|---|---|---|
| A | `PleinCadre` : visuel bord à bord, panneau chevauchant, ligne de base | l'accueil (annonce composée en HTML, pas de photographie) |
| B | `PapierLarge` : énoncé en colonne 2 ou 3, seconde voix plus bas à droite | le problème, la confidentialité |
| C | `IndexFilets` : lignes numérotées à filets, mention à droite | ce que fait l'outil, guides et outils |
| D | `BandeNuit` : fond encre, densité, un élément qui dépasse | l'instrument (cadran, décomposition, annonces, vidéo), questions et inscription |
| E | `Mosaique` : tuiles de tailles inégales, défilantes | les messages |
| F | `PiedLogotype` : colonnes intitulées, logotype coupé par le bord bas | le pied |

Le masthead est un en-tête de publication : logotype grand, trois colonnes
intitulées, non collant ; une barre compacte revient après 70 vh. Sur petit
écran, un panneau plein écran qui piège le focus et se ferme à Échap.

## Mouvement

Une courbe, `--ease-terouva: cubic-bezier(0.22, 0.75, 0.3, 1)`. Trois gestes :
le filet se trace (`.filet-trace`, lié au défilement), le bloc monte (`.monte`,
cinq frères au plus), le cadran se remplit (une fois, 900 ms, décomposition à
80 ms d'écart). Au survol, une seule chose bouge par élément. `@media print`
révèle tout et rend le monde nuit clair ; `prefers-reduced-motion` éteint tout.

## Imagerie

Pas de photographie, ni de stock, ni d'image générée. Le visuel plein cadre est
fait de la matière du produit : une annonce, un écran. Un seul cercle sur tout
le site, le cadran.

## Ce qu'on ne fait pas

Une bande sombre posée sur une page claire banale ; des cartes arrondies
remplacées par des cartes carrées (la réponse est de retirer un niveau de
contenant) ; la serif dans le monde nuit ; animer tout ce qui est survolable ;
toucher aux textes des guides ou au balisage pour des raisons de mise en page.

## D'où vient cette direction

Trois sources du 30 octobre 2026, dont on prend la structure, jamais l'effet :
une maquette d'architecture d'intérieur (masthead à plan du site, panneau
chevauchant, index à filets, logotype géant), une maquette de complément
alimentaire (bande instrumentée, module circulaire, monospace ; refusés : le halo
violet et les panneaux vitrés), un reel sur la couleur (deux bases sages, un
accent inattendu sur petite surface).
