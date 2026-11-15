# Vague 2 — session `etapes` (15 novembre 2026)

- `components/sections/Etapes.tsx` remplace `Parcours.tsx` et `Fonctions.tsx` (supprimés) : quatre
  grandes cartes l'une sous l'autre, titre + une phrase à gauche, vraie interface à droite.
- L'interface : les quatre panneaux de `HeroExemples` importés tels quels, agrandis par `zoom`
  (1,45 sur ordinateur, 1,1 sur téléphone). Ils suivent l'annonce choisie avec les flèches du hero.
- Scènes : lavis bleu pour les étapes 1-2, orange pour 3-4 (un mélange oklch bleu→orange virait au violet).
- Bouton « Être prévenu » une fois, à la fin du récit (règle 8).
- La section garde l'ancre `#fonctions` : le lien « Ce que fait Terouva » de la nav continue de marcher.
- Feuille `app/styles/accueil-etapes.css`, importée en dernière ligne des imports de `globals.css`.
- `app/page.tsx` : ordre Hero, Plateformes, Etapes, Problem, Messages, Outils, Inscription.

## Texte coupé (pour le pôle Commerce)
- Étape 4, seconde phrase : « Ensuite, vous notez la réponse dans Terouva. »
- Toute la plaque des fonctions : titre « Moins de recherche, plus de visites. », les cinq cartes
  `FEATURES` (titres, textes, mentions d'état), le fil, le cadran, les tons, le suivi, « Sur votre
  ordinateur / Aucun compte / Aucune publicité ». `FEATURES` reste dans `lib/content.ts`, inutilisé ici.
- Les flèches et le compteur « 1 / 6 » au-dessus du parcours.

## À nettoyer (hors de mes fichiers)
- Styles morts : `.recit-*`/`.filet-trace` (accueil-recit.css), `.instrument*`, `.fil*`, `.cadran-arc`,
  `.suivi-barre` (accueil-produit.css ou globals) ; `.rail` dans globals.css.

## Retour des critiques (même jour)
- Écrans redessinés dans `Etapes.tsx` (plus les panneaux du hero) : 56 % de la carte à 1440, 96 px entre cartes, liseré et fond teintés.
- Un élément par écran : l'histogramme sous le « 97 » et la barre Envoyée / Réponse / Visite sont retirés, comme toutes les capitales mono dans les cartes.
- À 375 px : vignette réduite, anneau et coche au-dessus du texte, prix et « / mois » visibles ; les écrans ne suivent plus les flèches du hero.

## Retour d'Hugo (même soir) : onglets et une seule scène
- Quatre onglets côte à côte (numéro, titre, phrase), barre orange de 5 s qui fait avancer ; pause au survol, au focus et hors écran, arrêt au clic, rien ne bouge en mouvement réduit ; tablist/tab, flèches, Début, Fin.
- Une scène crème de 26,5 rem qui montre l'écran choisi avec son détail (annonce entière, note et ses six règles de `DECOMPOSITION`, message complet, envoi avec l'annonce) : section 896 px à 1440.
- Bouton « Être prévenu » de fin de récit retiré pour tenir dans l'écran (il reste dans la nav et la barre de pouce) ; à 375, les onglets défilent en rangée.
