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
