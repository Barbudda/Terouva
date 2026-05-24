# Terouva — web

Landing page Next.js 15 (App Router) pour [Terouva](../../README.md). 100 % statique, deploy sur Vercel.

## Stack

Next.js 15 · React 19 · TypeScript · Tailwind v4 · Motion · Geist · Lucide.

## Dev local

```bash
npm install
npm run dev      # http://localhost:3030
```

## Build

```bash
npm run build    # output dans .next/
```

Build statique (SSG complet) + une route Edge (`/opengraph-image`) qui génère dynamiquement l'image OG 1200×630.

## Deploy sur Vercel

1. Import le repo `Barbudda/Terouva` sur Vercel.
2. **Root Directory = `apps/web`** (impératif — sinon Vercel essaie de build le Tauri).
3. Framework auto-détecté : Next.js.
4. Aucune variable d'environnement requise pour la v0.1.
5. Optionnel : si tu wires un domaine custom (ex: `terouva.app`), set `NEXT_PUBLIC_SITE_URL=https://terouva.app` dans les Project Settings → Environment Variables (sinon les liens `og:url`, `sitemap.xml` et `robots.txt` pointent automatiquement sur `*.vercel.app`).

Le `vercel.json` à côté de ce README handle :
- `framework: "nextjs"` explicite
- `ignoreCommand` : skip le rebuild si seul `apps/desktop/` ou `apps/extension/` ont changé

## Structure

```
app/
├── layout.tsx              metadata + fonts Geist
├── page.tsx                compose 8 sections
├── globals.css             theme tokens + utilities
├── icon.svg                favicon
├── opengraph-image.tsx     PNG dynamique 1200×630 (Edge)
├── robots.ts               sitemap-aware
└── sitemap.ts              auto-base via env
components/
├── layout/                 Nav, Footer
├── sections/               Hero, Problem, HowItWorks, Features, Privacy, Stack, FAQ, CTA
└── ui/                     Reveal, MagneticButton, LiveCounter, ScoreBadge, ListingTicker, DashboardMockup, SectionHeader
lib/
├── content.ts              tout le copywriting + données features/FAQ centralisés
├── site.ts                 helper getSiteUrl() env-aware
└── utils.ts                cn()
```
