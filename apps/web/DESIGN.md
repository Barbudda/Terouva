# Terouva : direction artistique

Une seule langue visuelle pour le site et l'application `/app`.

## Idée

Terouva aide des particuliers à trouver une location. Le ton est calme, sérieux et
bienveillant. La référence visuelle est la page de **petites annonces** d'un bon journal :
du papier, de l'encre, une hiérarchie typographique nette, et une seule couleur qui
signale ce qui compte. Pas de look « startup », pas d'effets.

## Palette (tokens `@theme` dans `app/globals.css`)

| Token | Valeur | Usage |
|---|---|---|
| `paper` | `#F5F1E8` | fond de page |
| `paper-2` | `#ECE6D9` | zones en retrait : barre latérale, sections alternées, onglets |
| `card` | `#FBF9F4` | surfaces posées : cartes, champs, menus |
| `ink` | `#1F1D1A` | texte principal (14,9:1 sur `paper`) |
| `ink-2` | `#595448` | texte secondaire (6,7:1) |
| `ink-3` | `#6B6558` | méta, légendes (4,7:1 à 5,5:1 selon le fond) |
| `rule` | `#DCD4C4` | filets et séparateurs |
| `field` | `#978D79` | bordure des champs de saisie (3,1:1 sur `card`) |
| `accent` | `#A9482A` | terracotta : marque, action principale, « à contacter vite » |
| `accent-ink` / `accent-wash` | `#8C3A1F` / `#F2E1D6` | survol, texte sur fond teinté / fond teinté |
| `good` / `good-wash` | `#2D6149` / `#DFEAE2` | vert sapin : bonne note, réponse reçue, extension connectée |
| `warn` / `warn-wash` | `#7A520C` / `#F1E6CC` | ocre : à vérifier, note provisoire, brouillon |
| `bad` / `bad-wash` | `#9C2F2B` / `#F3DEDB` | erreurs et suppression uniquement |

Un seul accent fort (terracotta). Vert, ocre et rouge sont des couleurs d'**état**,
toujours accompagnées d'un libellé, jamais décoratives. Thème clair unique : c'est un
choix de marque (le papier), pas un oubli.

## Typographie

- **Newsreader** (serif éditoriale, `font-serif`) : titres de page, titres de section,
  logotype, notes de score. Poids 500 à 600, interlignage serré.
- **Schibsted Grotesk** (grotesque de presse, `font-sans`) : tout le texte d'interface.
- Chiffres (prix, surfaces, notes) : `tabular-nums`.
- Pas de texte en capitales espacées façon « eyebrow » partout : les petits libellés
  sont en casse normale, `text-ink-3`.

## Formes

- **Un rayon** : `rounded-md` (6 px) pour boutons, champs, cartes. `rounded-full`
  réservé aux pastilles d'état (points).
- **Pas d'ombre**, sauf les fenêtres modales (une ombre douce unique). La profondeur
  vient du contraste `paper` / `card` et d'un filet `rule`.
- Aucun flou, aucun dégradé, aucun halo, aucune trame de fond.

## Icônes

`lucide-react`, gardé délibérément : trait `1.75`, tailles 16 px (interface) ou
18 px (navigation), couleur héritée du texte. Utilisées seulement dans la navigation
et quelques actions. Jamais d'emoji, jamais d'icône « étincelles ».

## Mouvement

Le mouvement sert un état, jamais l'ambiance :
- transitions de couleur au survol (150 ms) ;
- ouverture des questions de la FAQ (élément `details` natif) ;
- point qui respire uniquement quand l'extension est réellement connectée.

Pas d'apparition au défilement, pas de bouton magnétique, pas de compteur animé.
`prefers-reduced-motion` coupe tout.

## Texte

Vouvoiement, mots simples, ton doux. Pas d'emoji, pas de tiret cadratin, pas de
tournure « ce n'est pas X, c'est Y », pas de chiffre marketing inventé. Les exemples
d'annonces sont présentés comme des exemples.

## Signaux « vibecodé » gardés délibérément

- Signal 2 (icônes lucide) : gardé parce que la bibliothèque est déjà là et que trait,
  tailles et usage sont fixés ci-dessus et tenus partout.
