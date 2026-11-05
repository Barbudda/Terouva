# Journal de la session `visuels` (pôle Design, 5 novembre 2026)

## Le geste, posé avant de coder
**Une feuille posée sur l'instrument** : chaque outil et chaque guide reçoit une
vignette SVG où l'objet dont il parle (le dossier, le message, la clé, le plan de
la pièce) est dessiné en papier chaud, posé sur la nuit, au-dessus d'un petit
rideau de bâtons propre à la page. C'est la matière du hero (le graphique en
bâtons) et de la feuille d'annonce, sans photo : DESIGN.md, « Imagerie », exclut
la photographie, et les captures d'outil étaient illisibles en carte.

## Ce qui a changé

- **Outils de l'accueil** : avant, capture illisible sur dégradé, vide tant que
  l'image paresseuse ne chargeait pas ; après, la vignette de l'outil.
- **`CarteGuide`** (accueil, `/outils`, « À lire aussi ») : avant, photo ou zone
  vide ; après, une vignette par guide, jamais vide, en monde nuit ou papier.
- **`/outils`** : pile et grandes cartes passent des captures aux vignettes.
- **En-têtes `/outils/*`** : la vignette à droite du titre descend mordre la bande
  nuit de l'instrument (chevauchement). Masquée sous 768 px : l'outil doit rester
  dans le premier écran du téléphone.
- Survol : seul l'objet monte, la carte ne bouge plus ; éteint en mouvement réduit.

Vu à 375 et 1440 px (accueil, `/outils`, une page outil, un guide papier), sans
débordement ; `tsc` propre ici (l'erreur restante est dans `Problem.tsx`, `recit`).

## La règle, pour le pôle SEO (prochains guides)

Composant : `components/visuels/Vignette.tsx`, couleurs dans `app/styles/visuels.css`.
1. Un nouveau guide n'a **rien à faire** : sa rubrique lui donne un motif
   (avant : dossier, candidature : message, après : clés) et son chemin donne une
   courbe de bâtons unique.
2. Pour mieux faire, ajouter une ligne `chemin: motif` dans `MOTIF_DES_PAGES`,
   en prenant un des douze motifs existants.
3. Un motif nouveau : l'objet dont parle la page, dessiné en `Feuille` papier
   chaud, dans le repère -120..120 × -90..90, **un seul** élément orange, le
   bleu pour l'interface, pas de cercle (le seul cercle du site est le cadran),
   pas de texte hormis un glyphe (le « € » du dépôt).
4. Le blog pourrait la prendre par pilier : à voir avec `lecture` (`app/blog/page.tsx`).

## Ce qui reste, pour la cheffe

- `PHOTOS`, `FACADES` et les captures restent dans `lib/guides-resumes.ts` et
  `public/` : `CadreGuide` (bandeau des guides), `app/guides/page.tsx` et
  `app/blog/page.tsx` s'en servent encore (zone `lecture`). Le JSON-LD de
  `/outils` cite toujours les captures comme `image` : à laisser ou à remplacer
  par les images OG, décision SEO.
- Aucun jeton touché : le papier chaud en nuit est la variable locale `--vg-feuille`.

## Leçon pour BONDS

Une capture réduite en carte ne montre rien : dessiner l'objet que l'outil produit
se lit à 300 px et ne casse jamais au chargement ; une graine tirée du chemin donne
un visuel par page sans fichier image.
