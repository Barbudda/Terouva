# Journal de la session `lecture` (pôle Design, 5 novembre 2026)

Zone : gabarits de guide et d'article, index `/guides` et `/blog`.

## Avant

Prose à 90 signes par ligne ; `.note` longues (lettres) empilées en marge, loin de leurs sections ;
`blockquote` sans style ; outil lié noyé dans une grille de guides ; `/blog` haut de 17 600 px ;
titres coupés avant les deux-points.

## Gestes (un par section, décidés avant le code)

1. **Colonne de prose** (matière) : 18 px, mesure ramenée à ~68 signes, césure française, `text-wrap: pretty`.
2. **Modèles et citations** (composition) : un encadré long ou un `blockquote` devient une feuille posée
   dans la colonne, à sa place dans le texte ; seuls les encadrés courts partent en marge, et un
   intertitre ne laisse jamais une note de la section précédente déborder sur la sienne.
3. **Passage vers l'outil** (lumière) : sous le texte de l'article, l'outil lié s'ouvre en bande nuit,
   bouton orange. Le papier parle, l'instrument mesure : on change de monde au moment d'agir.
4. **Sommaire qui suit** (mouvement) : filet de progression de lecture en haut d'écran, piloté par le
   défilement en CSS (rien sous `prefers-reduced-motion` ni sans support), et barre d'accent sur l'entrée
   active du sommaire.
5. **Typographie française** : espaces fines insécables avant `: ; ? !` et dans les guillemets, posées
   au rendu (titres, sommaire, corps Markdown). Aucun texte modifié.
6. **Index du blog** (densité) : les huit premiers en lignes illustrées, la suite en table des matières de
   revue sur deux colonnes, sans vignette.

## Après (captures dans `.playwright-mcp/lecture-*.jpeg`)

- Prose : 90 → ~68 signes par ligne à 1440 px (mesuré), 40-47 à 375 px. `lecture-apres-art1-1440`.
- Lettres en feuilles sous leur intertitre (`lecture-z-feuille`, `lecture-m-art2`) ; relais outil en
  nuit (`lecture-z-relais`) ; fil de lecture et trait du sommaire actif visibles.
- `/blog` : 17 600 → 7 800 px à 1440 (`lecture-z-table`). Article Markdown vérifié sur 3031 (`lecture-art3-1440`).
- Guide : trois tuiles « En chiffres » sur trois colonnes, la troisième pleine largeur sur téléphone.

## Ce qui reste

- Les articles en JSX (14) gardent leurs espaces ordinaires avant « : ? ! » dans le corps : la
  typographie au rendu ne couvre que les titres, le sommaire et les 70 articles en Markdown. Corriger
  le contenu revient au pôle SEO (ou un remplacement global par script, à leur demande).
- Les guides n'ont pas de champ « outil lié » : pas de relais nuit sous un guide. Si le pôle SEO ajoute
  `outilLie` au type `Guide`, le relais de `CadreArticle` se reprend tel quel.
- `DESIGN.md` dit 44 rem pour la prose : c'est désormais 34 rem à 18 px (mesuré, ~68 signes).

## Demandes à la cheffe

- Reporter la mesure dans `DESIGN.md`. Le serveur 3030 est tombé en 500 : OneDrive a évincé des fichiers
  de `node_modules` (attribut « O », ex. `next/link.js`) ; à épingler sur l'appareil puis relancer.

## Leçon pour BONDS

Mesurer la longueur de ligne en signes réels (Range par caractère, regroupé par ordonnée) plutôt que se
fier à une mesure en rem : la même valeur donne 70 signes en serif étroite et 90 en grotesque large.
