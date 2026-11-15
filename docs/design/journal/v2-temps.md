# Vague 2, session `temps` (15 novembre 2026)

Section : le temps gagné (`components/sections/Problem.tsx`, feuille `app/styles/accueil-recit.css`).

**Fait.** La frise (règle graduée, quatre étapes, deux pistes, trait pointillé, étiquettes « Vous
arrivez ici ») est retirée. Bande nuit à la manière du « 48 h gagnées » de Rushlot : étiquette, un
chiffre géant « 2 sur 3 » (masqué aux lecteurs d'écran), le titre existant en `h2` dessous, deux
barres nettes « Sans / Avec Terouva » (80 % grise, 7 % orange, longueur = moment où vous arrivez),
la source telle quelle. Barres tracées au révélateur, rien sous mouvement réduit.

**Coupé (pour relecture du pôle Commerce), les champs restent dans `lib/content.ts` :**
- `PROBLEM.texte` : « Et selon les professionnels interrogés, sur dix candidatures reçues, moins de
  quatre sont complètes. »
- `PROBLEM.vie.etapes` : « Publiée », « Premiers messages », « Visites complètes », « Retirée ».
- `sans.texte` : « Les premiers messages sont partis. Les visites sont déjà pleines. »
- `avec.texte` : « Votre message et votre dossier sont prêts : vous écrivez dans l'heure. »
- L'étiquette « Vous arrivez ici ».

**Seul ajout de texte :** le chiffre « 2 sur 3 », reprise en chiffres du titre sourcé.

**À la cheffe / aux critiques :** la barre orange (7 %) est presque un point ; tenue à 3,5 rem au
moins. Les règles `.recit-rail*` de la feuille servent `Parcours.tsx` : à supprimer si `etapes`
retire Parcours. tsc propre ; captures 1440 et 375 regardées une fois.

**Passe critiques.** Barres retirées : sans durée sourcée, aucune échelle honnête ; à leur place, le gain en orange 900 de 100 px, juste sous « 2 sur 3 », précédé de « Sans Terouva, vous la découvrez le soir. » en gris.
Une seule grotesque (plus de Fraunces, plus de serif droit, plus de capitales mono hormis l'étiquette) ; titre sourcé ramené à une phrase de 28 px, source agrandie à 15 px.
Aucun chiffre nouveau, aucun mot nouveau : les phrases « sans / avec » sont les champs existants de `PROBLEM.vie`, jointes par une virgule.

**Page plus courte.** Section ramenée de 1 106 à 800 px à 1440 et à 637 px à 375 : marges 96 / 64 px, écarts internes resserrés, chiffre plafonné à 192 px et gain à 84 px sur deux lignes.
