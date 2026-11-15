# La manière FanClaw et Rushlot, en règles mesurables

> Relevé par la cheffe du pôle Design le 15 novembre 2026, sur fanclaw.ai et rushlot.com à 1440 px
> (captures : `.playwright-mcp/ref-fanclaw-1440.jpg`, `.playwright-mcp/ref-rushlot-1440.jpg`).
> Hugo : « recopie vraiment la manière de faire de design de fanclaw.ai et rushlot.com ». On copie
> la manière, pas leurs textes, leurs marques ni leurs images. Lu par chaque session de la vague 2
> et par l'agent `critique-reference`.

## Ce qu'ils font, mesuré

- **Titres de section** : 56 à 80 px, graisse 900, grotesque, **centrés**, deux lignes au plus, la
  seconde ligne (ou un mot) en couleur d'accent. Une petite étiquette en capitales espacées au-dessus.
- **Texte courant** : 0 à 2 lignes sous le titre. Les sections « produit » de FanClaw n'ont aucun
  paragraphe : le visuel parle.
- **Un visuel par section**, très grand (60 à 90 % de la largeur) : une vraie interface du produit
  dans une carte claire à grands coins arrondis et ombre douce, ou un **chiffre géant** (« 48 h
  gagnées », « €3,683,353 », « 0 € »). Jamais de schéma à graduations, jamais de légende.
- **Fond** : crème (`#f8f2e8` chez FanClaw) par défaut, coupé par une ou deux bandes sombres
  (`#0f172a`) : le mur de preuves au milieu, la clôture à la fin.
- **Vide** : 120 à 160 px au-dessus et au-dessous de chaque section ; une section = un écran.
- **Récit produit (Rushlot)** : quatre étapes, **une grande carte par étape** l'une sous l'autre ;
  dans chaque carte, un titre de 3 à 4 mots à gauche, une phrase, et une vraie capture à droite.
- **Un seul bouton** sur toute la page, le même libellé, répété 3 à 4 fois aux moments de décision.
- **Clôture** : bande sombre, chiffre ou titre géant, gros bouton, trois réassurances en une ligne.
  Pied de page avec le logotype en très grand (Terouva l'a déjà).

## Les règles de la vague 2 (chaque session, chaque section)

1. Titre : le composant `TitreSection` (`components/ui/TitreSection.tsx`), centré par défaut.
2. Au plus **2 lignes** de texte courant sous le titre (environ 30 mots). On coupe, on n'ajoute pas.
3. **Un** visuel, grand, compréhensible sans lire : interface du produit, chiffre géant, ou objet.
   Interdits : graduations, règles, légendes, petits chiffres en série, plus de trois éléments.
4. Fond : section crème (`monde-papier`) sauf « le temps gagné » et la clôture, en nuit.
5. Cartes sur crème : fond `--color-card`, coins 24 px, une ombre douce d'une seule direction.
6. Rythme : 128 px au-dessus et au-dessous sur ordinateur, 80 px sur téléphone.
7. Mobile : titres à 40 px environ, une colonne, le visuel en pleine largeur sous le titre.
8. Le seul bouton est « Être prévenu » (pilule orange, texte minuit) ; il revient à la fin du récit
   produit et à la clôture, pas ailleurs.
