# Terouva : direction artistique

Une seule langue visuelle pour le site d'avant-lancement et l'application.

## Idée

Terouva aide des particuliers à trouver une location. Le site doit donner envie d'essayer
et de laisser son adresse ; l'application doit rester lisible pendant des heures.

Deux références, demandées par Hugo le 11/10/2026 :
- **[fanclaw.ai](https://fanclaw.ai/fr)** pour le rythme de la page : fond clair, grands
  panneaux très arrondis, sur-titre en capitales, titre très gras dont la fin passe en
  couleur, grilles de cartes à tuile d'icône, bloc sombre pour l'appel final.
- Le thème **Rose Quartz** (shadcn/ui) pour la palette, la typographie et les rayons.

## Palette (tokens `@theme` dans `app/globals.css`)

| Token | Valeur | Usage |
|---|---|---|
| `paper` | `#FDFDFD` | fond de page |
| `paper-2` | `#FBF7F8` | sections en retrait, panneaux clairs |
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

**Montserrat** partout (variable, via `next/font`). Pas de serif.

- `.display` : graisse 800, interlettrage −0,03 em, interligne 0,98. Tous les titres.
- Titre principal : 2,6 rem à 4,6 rem. Titres de section : 2 rem à 3 rem.
- `.eyebrow` : 12 px, capitales, interlettrage 0,16 em, en rose. Au-dessus de chaque titre.
- Texte courant : 16 à 18 px, `ink-2`. Chiffres en `tabular`.

## Formes

Rayon du thème : **1,4 rem**.
- `--radius-md` 0,7 rem : champs et petits éléments de l'application.
- `--radius-lg` 1,4 rem : cartes, tuiles d'icône.
- `--radius-xl` 2 rem : grands panneaux de section.
- **Boutons et champs du site : pilule** (rayon plein).

`.card-soft` : fond blanc, filet `rule`, ombre douce portée vers le bas, jamais plus.
`.night-glow` : halo rose à 22 % au sommet du bloc sombre. C'est le seul dégradé du site.

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

## Texte

Vouvoiement, mots simples, ton calme. Pas d'emoji, pas de tiret cadratin, pas de
« ce n'est pas X, c'est Y », pas de chiffre inventé. Les titres se coupent en deux : la
première moitié en encre, la seconde en rose.

La référence tutoie et promet fort ; nous gardons le vouvoiement et des promesses
vérifiables : c'est la règle de ton du projet.
