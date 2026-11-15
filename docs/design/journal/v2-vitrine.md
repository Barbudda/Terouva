# Vague 2, session vitrine (15 novembre 2026)

Trois sections passent sur crème (`monde-papier`), titre `TitreSection` centré, un seul visuel, 80 px / 128 px de rythme.

- **Plateformes** : titre géant, huit icônes en grand (4 × 2 sur téléphone, 8 d'un trait dès 1024 px), rien d'autre. Composant serveur, plus d'onglets.
- **Messages** : trois lettres entières (tons direct, chaleureux, professionnel), cartes de 24 px ; sur ordinateur celle du milieu devant, les deux autres inclinées de 2° ; sur téléphone, rangée qui glisse au doigt. Plus de ruban défilant ni de panneau de lecture.
- **Outils** : trois cartes à vignette (variante papier déjà dans `visuels.css`), nom et phrase ; lien « Tous les outils » centré dessous.
- **Derniers guides** : retirés de l'accueil (le pied et /guides les listent).

## Texte coupé (pour le pôle Commerce)
- Plateformes : « Choisissez un site pour voir ce que Terouva y change. » et les deux gains par site, le nom de domaine affiché (`PLATEFORMES.aide` et `liste[].gains`/`domaine` dans `lib/content.ts` ne sont plus lus sur l'accueil).
- Messages : la note sur 100 et « Pour « annonce » » sous chaque lettre.
- Outils : « Ouvrir l'outil » et sa flèche ; le titre « Les derniers guides » et « Les N guides ».

## Restes pour la cheffe
- `accueil-produit.css` garde les règles `.instrument`/`.fil-*` de `Fonctions.tsx` : à supprimer quand la session `etapes` aura retiré ce composant.
- `components/layout/coquilles/Mosaique.tsx` n'est plus utilisé par l'accueil.

Vérifié : `tsc --noEmit` propre ; captures 1440 et 375 en mouvement réduit regardées.

## Passe des critiques (15 novembre)
- Plateformes : le nom sous chaque icône ; les onglets reviennent, et une grande carte sous la rangée montre les deux gains du site choisi (textes `gains` repris de `lib/content.ts`).
- Messages : une pile, la lettre de Camille devant, Yanis et Awa derrière, inclinées et en partie cachées ; à 375 px, la lettre du dessus seule.
- Outils : plus de bâtons sous les vignettes de l'accueil (masqués en CSS, `Vignette.tsx` intact), objet agrandi de 16 %.
