# Terouva

> Le copilote local-first qui te fait répondre en premier sur Leboncoin.

Trois surfaces, un seul repo, une seule vision : compresser le délai entre la publication d'une annonce et l'envoi de ta candidature. Pas d'évasion anti-bot, pas d'envoi automatisé — un assistant qui prépare, l'humain qui valide.

## Structure du monorepo

```
apps/
├── desktop/      Tauri 2 + React 19 + SQLite — cockpit local, profil, scoring, messages
├── web/          Next.js 15 + Tailwind v4 — landing marketing (déploie sur Vercel)
└── extension/    Chrome MV3 — capture une annonce LBC et la copie en JSON Terouva
```

À la racine, uniquement les fichiers transversaux :
- `.mcp.json` / `mcp.config.json` — config MCP pour Claude Code
- `.env.example` — template des variables d'environnement
- `.gitignore` — couvre les 3 apps
- `CLAUDE.md` — guide Claude Code pour ce projet
- `data/` — base SQLite locale du MCP `sqlite` (Claude Code)

## Lancer une app

### Desktop (Tauri)

Prérequis : Node ≥ 20, Rust stable, Visual Studio Build Tools (workload "Desktop development with C++").

```bash
cd apps/desktop
npm install
npm run tauri:dev          # fenêtre Terouva s'ouvre
```

Si tu travailles depuis un dossier synchronisé (OneDrive, Dropbox, iCloud) : copier `apps/desktop/.cargo/config.toml.example` vers `apps/desktop/.cargo/config.toml` pour rediriger le target Cargo hors du sync — sinon `autocfg` fait planter le build.

### Web (Next.js)

```bash
cd apps/web
npm install
npm run dev                # http://localhost:3030
```

Build prod : `npm run build`. Déploiement Vercel : connecter le repo, **Root Directory = `apps/web`**, le `vercel.json` s'occupe du reste (framework auto-détecté, ignored build step pour ne pas redéployer si seul `apps/desktop` ou `apps/extension` a changé).

### Extension (Chrome)

```bash
# Pas de build — manifest V3 vanilla.
# 1. chrome://extensions
# 2. activer "Mode développeur"
# 3. "Charger l'extension non empaquetée" → apps/extension/
```

L'extension parse `__NEXT_DATA__` sur les pages LBC ouvertes par l'utilisateur, et copie un payload JSON dans le presse-papier. Côté desktop, **Annonces → 📋 Depuis presse-papier** pour ingérer.

## Principes non négociables

- **100 % local.** Aucun serveur Terouva. La DB vit dans le data dir Tauri sur ton disque.
- **L'humain valide.** Pas d'envoi automatisé. Le copilote prépare le message, tu copies/colles.
- **Aucun contournement anti-bot.** Pas de Patchright, pas de Scrapling stealth. Le parsing tourne soit en local côté Rust (avec un UA standard), soit dans le navigateur de l'utilisateur via l'extension.

## Stack

| Surface | Stack |
|---|---|
| Desktop | Tauri 2 · Rust · React 19 · TypeScript · Vite · Tailwind v4 · Zustand · SQLite |
| Web | Next.js 15 (App Router) · React 19 · TypeScript · Tailwind v4 · Motion · Geist · Lucide |
| Extension | Manifest V3 · vanilla JS · 0 dépendance |

## Roadmap court

- v0.2 — Serveur HTTP local Tauri (axum) sur `127.0.0.1` → extension POST direct, plus de clipboard
- v0.3 — Branchement Claude API pour message gen affinée (toujours optionnel, jamais requis)
- v0.4 — Builds Mac & Linux + releases GitHub signées
- v0.5 — Parsing des emails d'alerte Leboncoin (IMAP local)

Pas de Patchright. Pas de scraping serveur. Pas de honeypot sur LBC.

---

Pas affilié à Leboncoin.
