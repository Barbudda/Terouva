# Vague 2 du pôle Design : le minimum, en grand

> Brief de la cheffe, 15 novembre 2026. Chaque session lit ce fichier, `docs/design/REFERENCE.md`,
> puis ses propres fichiers. Rien d'autre (les règles communes de `BRIEF.md` restent valables :
> commit par chemins, pas de push, `globals.css` seul et en dernier).

## Ce qu'Hugo a dit

« Le hero, très bien. Tout le reste est trop compliqué : une frise qu'on ne comprend pas. Il faut le
minimum et guider ce que l'utilisateur va regarder, le plus gros possible. Une frise, si tu en fais
une, beaucoup plus claire, sans règles à côté. Recopie vraiment la manière de FanClaw et Rushlot. »
Décision du jour : tout ce qui suit le hero passe sur **crème** (comme FanClaw), avec deux bandes nuit.

## La nouvelle page (le hero et le pied ne bougent pas)

| # | Section | Fond | Modèle | Session |
|---|---|---|---|---|
| 1 | Plateformes : « Partout où vous cherchez » | crème | FanClaw « Grow everywhere » : titre géant centré, grandes icônes | `vitrine` |
| 2 | Le récit produit, 4 étapes (remplace `Parcours` **et** `Fonctions`) | crème | Rushlot « Dans Rushlot » : une grande carte par étape, vraie interface | `etapes` |
| 3 | Le temps gagné (remplace la frise de `Problem`) | **nuit** | Rushlot « 48 h gagnées » : un chiffre géant, deux barres nettes, rien d'autre | `temps` |
| 4 | Les messages | crème | FanClaw fil d'actions : 2 ou 3 lettres, grandes | `vitrine` |
| 5 | Outils gratuits (la rangée « Derniers guides » quitte l'accueil : le pied les liste) | crème | FanClaw « 3 steps » : trois cartes | `vitrine` |
| 6 | Questions | crème | FanClaw « Any question? » : liste centrée | `cloture` |
| 7 | Clôture et inscription | **nuit** | FanClaw « Join them » : titre géant, gros formulaire, une ligne de réassurance | `cloture` |

## Qui fait quoi (fichiers disjoints)

| Session | Possède | Feuille |
|---|---|---|
| `etapes` | nouveau `components/sections/Etapes.tsx` ; peut supprimer `Parcours.tsx`, `Fonctions.tsx` et leurs illustrations devenues inutiles ; **la liste des sections dans `app/page.tsx`** (ordre ci-dessus) | `app/styles/accueil-etapes.css` (à créer et importer dans `globals.css`, dernier commit) |
| `temps` | `components/sections/Problem.tsx` | `app/styles/accueil-recit.css` |
| `vitrine` | `Plateformes.tsx`, `Messages.tsx`, `Outils.tsx` | `styles/plateformes.css`, `accueil-produit.css`, `visuels.css` |
| `cloture` | `Inscription.tsx`, `components/ui/{Questions,WaitlistForm}.tsx` | `app/styles/arrivee.css` |

`Hero.tsx`, `HeroExemples.tsx`, `Footer`, `Nav`, `TitreSection` et les jetons : à la cheffe. Les
visuels du hero (`HeroExemples`) peuvent être **importés** pour montrer l'interface, pas modifiés.

## Texte

On ne rédige pas : on **garde** les titres existants (les ranger dans `TitreSection` : première
ligne, puis la seconde en `accent`) et on **coupe** tout le reste qui dépasse deux lignes. Chaque
ligne coupée va dans le journal (le pôle Commerce relira). Aucun texte nouveau, sauf l'étiquette au-
dessus d'un titre, reprise d'une mention existante.

## Fini quand (make it, rien de plus)

1. `node node_modules/typescript/bin/tsc --noEmit` propre dans `apps/web`.
2. **Une** capture 1440 et **une** 375 de sa section, en mouvement réduit, avec son propre navigateur
   (skill `playwright-cli`, pas le MCP partagé), regardées une fois. Serveur partagé :
   `http://localhost:3031`.
3. Commit de ses chemins, journal `docs/design/journal/v2-<session>.md` en 20 lignes au plus.

Pas de Lighthouse, pas d'audit, pas de sous-agent : deux critiques passeront ensuite sur toute la
page, et leurs corrections vous reviendront en une passe.
