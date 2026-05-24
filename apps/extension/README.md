# Terouva — Chrome Extension

Capture une annonce Leboncoin et copie un payload JSON Terouva dans le presse-papier.

## Install (dev / non publié)

1. Va sur `chrome://extensions`
2. Active **Mode développeur** (toggle en haut à droite)
3. Clique **Charger l'extension non empaquetée**
4. Sélectionne ce dossier `extension/`

## Usage

1. Ouvre une annonce Leboncoin (URL contenant `/ad/...` ou `/itemId-...`)
2. Clique l'icône Terouva en haut à droite du navigateur
3. Vérifie le titre/prix affichés dans le popup
4. Clique **Copier vers Terouva**
5. Va dans l'app Terouva → **Annonces** → **Importer depuis presse-papier**

## Payload JSON

```json
{
  "app": "terouva",
  "type": "listing-clipboard",
  "version": 1,
  "captured_at": "2026-05-24T15:00:00.000Z",
  "data": {
    "url": "...",
    "external_id": "...",
    "title": "...",
    "price": 1200,
    "city": "Paris",
    "postal_code": "75011",
    "surface": 35,
    "rooms": 2,
    "furnished": true,
    "property_type": "apartment",
    "description": "...",
    "images": ["..."],
    "publisher_name": "...",
    "publisher_type": "...",
    "published_at": "..."
  }
}
```
