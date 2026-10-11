# Terouva : direction artistique

Une seule langue visuelle pour le site d'avant-lancement et l'application.

## Idée

Terouva aide des particuliers à trouver une location. Le site doit donner envie d'essayer
et de laisser son adresse ; l'application doit rester lisible pendant des heures.

Trois références, demandées par Hugo le 11/10/2026 :
- Le thème **Rose Quartz** (shadcn/ui) pour la palette. Hugo l'a choisi sur image : on le
  garde, y compris quand une référence ultérieure propose autre chose.
- **[fanclaw.ai](https://fanclaw.ai/fr)** pour la stratégie : outils gratuits, guides,
  présence hors site. C'est de là que vient la rubrique `/outils`.
- Un **brief dérivé d'un gabarit Framer** pour la composition : blanc dominant, un seul
  accent vif, typographie imposante, grille éditoriale, rectangles arrondis. Le brief parlait
  de rouge ; `#C92D6A` est déjà un rouge profond et tient ce rôle, sans faire ressembler le
  site au gabarit. C'est un seul token si l'arbitrage change.

## Palette (tokens `@theme` dans `app/globals.css`)

| Token | Valeur | Usage |
|---|---|---|
| `paper` | `#FDFDFD` | fond de page |
| `paper-2` | `#FBF7F8` | sections en retrait, panneaux clairs |
| `ash` | `#F6F6F7` | gris neutre des blocs de chiffres clés |
| `card` | `#FFFFFF` | cartes et champs |
| `muted` | `#F5F5F5` | surfaces neutres |
| `ink` | `#1B1D1E` | texte principal (15,8:1 sur `paper`) |
| `ink-2` | `#55595C` | texte secondaire (7,1:1) |
| `ink-3` | `#6E7376` | méta et légendes (5:1) |
| `rule` | `#E7E7EE` | filets et bordures de cartes |
| `field` | `#C9CAD3` | bordure des champs de saisie |
| `accent` | `#C92D6A` | rose de marque : fin des titres, boutons, icônes, liens |
| `accent-ink` / `accent-wash` | `#A52254` / `#FBDAE7` | survol et texte sur teinte / fond teinté |
| `night` / `night-2` | `#1B1D1E` / `#26292B` | bloc sombre de fin de page |
| `night-ink` / `night-ink-2` / `night-rule` | `#F6F6F7` / `#AEB2B5` / `#34383A` | texte et filets sur fond sombre |
| `good` / `warn` / `bad` | `#11785A` / `#8A5A08` / `#C62F33` | états, toujours avec un libellé |

Le rouge du thème (`#E54B4F`) a été assombri en `#C62F33` : il ne donnait que 3,85:1 sur
blanc, sous le minimum lisible. Tous les autres tokens passent AA (vérifiés au calcul).

Un seul accent. Le rose porte la marque ; vert, ocre et rouge ne servent qu'aux états.
Thème clair unique, avec **un seul bloc sombre** par page (l'appel final) pour éviter
l'effet « tout noir ».

## Typographie

**DM Sans** partout (variable, via `next/font`). Pas de serif.

Le brief du 11/10/2026 demandait « DM Sans ou Inter » ; les règles du projet excluent
Inter, Geist et Space Grotesk. DM Sans tient le même rôle — compacte, très lisible en gras
serré — sans le déjà-vu. Elle remplace Montserrat, trop large pour des titres de 80 px.

- `.display` : graisse 800, interlettrage −0,035 em, interligne 0,97. Tous les titres.
- Titre principal : 2,6 rem à **4,9 rem** (78 px). Titres de section : 2 rem à 3 rem.
- `.eyebrow` : 12 px, capitales, interlettrage 0,16 em, en rose. Au-dessus de chaque titre.
- Texte courant : 16 à 18 px, `ink-2`. Chiffres en `tabular`.

## Formes

**Des rectangles légèrement arrondis, pas des pilules.** La pilule partout est la forme par
défaut de toutes les pages de produit ; le rectangle tient mieux à côté d'une typographie
serrée et de grandes surfaces.

- `--radius-sm` 0,5 rem : petits éléments.
- `--radius-md` 0,75 rem : **boutons et champs**.
- `--radius-lg` 1,25 rem : cartes.
- `--radius-xl` 2 rem : grands panneaux et images.
- La pilule reste pour ce qui est vraiment une étiquette : badge « bientôt disponible »,
  pastille à flèche, points d'état.

`.card-soft` : fond blanc, filet `rule`, ombre douce portée vers le bas, jamais plus.
À utiliser avec parcimonie : tout enfermer dans une boîte à ombre alourdit la page.
`.shadow-accent` : ombre rose très douce, **réservée à l'action principale**.
`.night-glow` : halo rose à 22 % au sommet du bloc sombre. C'est le seul dégradé du site.
`.pastille` : commande circulaire à flèche, qui se remplit de rose au survol de sa carte.

## Rythme de la page

Le brief du 11/10/2026 (dérivé d'un gabarit Framer) fixe la composition :

1. **Navigation** blanche et droite : identité à gauche, liens au centre, bouton sombre à droite.
2. **Introduction en deux colonnes** : badge, titre sur plusieurs lignes dont la fin passe en
   rose, description, inscription, lien secondaire à flèche fine, réassurances. À droite, un
   visuel fort — chez nous **le produit en HTML**, jamais une photographie de banque d'images.
3. **Chiffres clés** sur `ash`, en rose, avec légendes grises. Aucun n'est une statistique
   d'usage : le produit n'est pas sorti, deux de nos chiffres valent zéro et c'est l'argument.
4. Alternance de blocs : deux colonnes texte, liste éditoriale à filets, ruban de messages.
5. **Un seul aplat rose** dans toute la page, pour l'appel à l'action le plus important.
   Un deuxième lui ferait perdre son poids. Blanc sur `accent` : 5,16:1, au-dessus du minimum.
6. **Un seul bloc sombre**, l'inscription finale.
7. **Questions** en lignes blanches arrondies, filet gris, chevron rose.
8. **Pied de page** blanc, en colonnes.

### Pas de photographie

Le brief s'appuie beaucoup sur l'image. Terouva n'en a pas, et des photographies
d'appartements en banque d'images sont un marqueur de site généré, en plus d'une question de
licence. Les emplacements « image » sont donc tenus par des surfaces du produit : la scène
d'annonces, les cartes de messages, les tableaux de données. C'est plus convaincant qu'une
photo d'inconnu souriant dans un salon.

### Un piège de mise en page, déjà rencontré

Un élément de grille a `min-width: auto` : il ne descend pas sous la largeur minimale de son
contenu. Le titre d'une carte en `truncate` (donc `nowrap`) imposait 394 px à toute la page,
et le mobile débordait. **Toute colonne de grille contenant une surface produit prend
`min-w-0`.**

## Icônes

`lucide-react`, trait `1.75`, 20 px dans les tuiles, 16 à 18 px dans l'application.
Chaque tuile d'icône est un carré arrondi `accent-wash` avec l'icône en `accent-ink`.
Jamais d'emoji.

## Mouvement

Trois gestes, pas un de plus, et chacun dit quelque chose :

1. **Le bloc qui monte** à son arrivée à l'écran (`.monte`, 18 px et un fondu). Piloté par
   `animation-timeline: view()` : aucun JavaScript, donc pas de bloc coincé invisible si un
   script échoue. Les navigateurs qui ne savent pas faire affichent simplement le bloc.
2. **La scène d'accueil** se remplit une fois : les quatre annonces arrivent décalées de
   150 ms, leur jauge de note se remplit, la meilleure reçoit son sceau. C'est ce que fait
   l'outil, joué plutôt que raconté. Elle ne démarre qu'une fois à l'écran.
3. **Le ruban de messages** défile en continu (55 s par tour), s'arrête au survol, au
   clavier et quand on ne le regarde pas.

Plus les transitions de couleur au survol (150 ms), l'ouverture des questions (`details`
natif) et le point qui respire sur « bientôt disponible ».

Tout passe par `transform` et `opacity`, jamais par une propriété qui provoque un recalcul
de mise en page. `prefers-reduced-motion` éteint les trois : rien ne bouge, rien ne manque,
et le ruban devient un défilement horizontal au doigt.

**Pas de capture d'écran dans le hero.** Une image du produit périme à chaque changement de
l'application ; la scène est du HTML, donc elle suit, elle se lit et elle s'indexe.

## Exemples montrés

Les annonces, les notes et les messages de la page viennent des vrais moteurs
(`scoreListing`, `generateMessage`), recopiés dans `lib/exemples.ts`. **Pas de témoignages
clients** : le produit n'est pas sorti, en inventer tromperait les visiteurs qui laissent
leur adresse (et c'est le signal vibecodé n° 12). Montrer le travail convainc mieux qu'un
compliment fabriqué. Si le moteur change, régénérer ces valeurs.

**Un message ne récite jamais l'annonce** : ni surface, ni prix, ni nombre de pièces, ni
ville, ni code postal. La personne qui le reçoit a écrit l'annonce ; lui réciter sa fiche
ne prouve rien, allonge le message et se reconnaît d'un texte à l'autre. Le message
commence par ce que le propriétaire ne sait pas : qui écrit, quel dossier, quelle
disponibilité. Une seule phrase peut dire ce qui a plu (le balcon, la lumière, le calme) :
c'est une réaction de lecteur, pas une fiche technique. Trois tournures de dossier et six
variantes par ton, pour que deux messages ne se ressemblent pas. Règle tenue par les tests
de `packages/core`.

## Texte

Vouvoiement, mots simples, ton calme. Pas d'emoji, pas de tiret cadratin, pas de
« ce n'est pas X, c'est Y », pas de chiffre inventé. Les titres se coupent en deux : la
première moitié en encre, la seconde en rose.

La référence tutoie et promet fort ; nous gardons le vouvoiement et des promesses
vérifiables : c'est la règle de ton du projet.
