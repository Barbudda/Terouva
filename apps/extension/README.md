# Terouva — Chrome Extension v0.2

Deux modes :

1. **Surveillance live** — `content/watch.js` est injecté automatiquement sur les pages de résultats Leboncoin (`/recherche*`, `/locations*`, `/c/locations*`, `/colocations*`). Il installe un `MutationObserver` sur le DOM. À chaque nouvelle annonce qui apparaît (refresh manuel, scroll, re-fetch interne LBC), elle est envoyée à l'app Terouva en local via `POST http://127.0.0.1:8765/ingest/listing`.
2. **Capture URL one-shot** — sur la page de détail d'une annonce (`/ad/...`), un clic sur l'icône ouvre le popup qui extrait `__NEXT_DATA__` + meta OG, et soit envoie à l'app, soit copie un JSON dans le presse-papier.

## Install (dev / non publié)

1. `chrome://extensions`
2. Active **Mode développeur** (toggle en haut à droite)
3. Clique **Charger l'extension non empaquetée**
4. Sélectionne ce dossier `apps/extension/`

## Configuration

Ouvre le popup de l'extension → onglet **Réglages** :
- **URL de l'app Terouva** : par défaut `http://127.0.0.1:8765` (laisse tel quel si tu n'as pas changé le port)
- **Token de jumelage** : copie le token depuis l'app Terouva → page **Surveillance** → "Token de jumelage"
- **Surveillance active** : toggle

Clique **Enregistrer**. La pastille en haut à droite du popup passe verte (ON) quand l'app répond et accepte le token.

## Usage

- **Pour la surveillance** : ouvre n'importe quelle page de recherche LBC (ex: `https://www.leboncoin.fr/recherche?category=10&locations=Paris`). Tu verras un petit overlay en bas à droite "Terouva : 3 annonces envoyées" qui s'incrémente à mesure que de nouvelles annonces sortent dans le DOM. Double-clique l'overlay pour le cacher.
- **Pour la capture** : ouvre une annonce LBC, clique l'icône Terouva → **Capture URL** → **Envoyer à l'app** (ou **Copier JSON** si tu préfères passer par le presse-papier).

## Payload JSON envoyé à Terouva

```json
{
  "app": "terouva",
  "type": "listing-watch",
  "version": 1,
  "captured_at": "2026-05-25T10:23:45.000Z",
  "data": {
    "url": "https://www.leboncoin.fr/ad/...",
    "external_id": "2812345678",
    "title": "Studio 28m² Paris 11e",
    "price": 1240,
    "city": "Paris",
    "surface": 28,
    "rooms": 1,
    "images": ["..."]
  }
}
```

L'app dédoublonne par URL, score selon tes recherches actives, et déclenche une notif desktop si le score franchit ton seuil.

## Pas de bot, pas d'évasion

L'extension n'automatise pas le navigateur. Elle **lit** ce que le navigateur affiche déjà (DOM observable normalement par n'importe quelle extension), et n'effectue **aucune** requête supplémentaire vers Leboncoin. Côté LBC, ton activité reste indistinguable d'un user normal.
