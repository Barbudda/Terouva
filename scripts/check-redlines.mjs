#!/usr/bin/env node
/**
 * Garde-fous « lignes rouges » Terouva — exécuté en CI et en local (`npm run check:redlines`).
 *
 * Fait échouer le build si l'une des invariantes du produit local-first est violée :
 *
 *  1. AUCUNE route API côté web (`apps/web/app/api/**`). Sinon les promesses
 *     publiques « POST /sync · 404 » et « auth.required = false » deviennent fausses :
 *     l'app doit rester 100 % statique/CDN, sans serveur Terouva.
 *
 *  2. AUCUNE requête réseau (fetch/XMLHttpRequest/axios) vers leboncoin.fr depuis
 *     NOTRE code — ni la page web, ni l'extension (y compris son service worker,
 *     seul contexte où un fetch LBC contournerait le CORS via host_permissions).
 *     Ligne rouge : « on observe, on ne pilote pas ». L'extension LIT le DOM des
 *     pages que l'utilisateur ouvre lui-même ; elle ne requête jamais LBC.
 *     `window.open(...leboncoin.fr...)` (action explicite de l'utilisateur) est
 *     autorisé.
 *
 * Volontairement sans dépendance (Node pur) pour tourner partout.
 */
import { readdirSync, statSync, readFileSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");
const violations = [];

// ── Règle 1 : pas de route API côté web ──────────────────────────────────────
const apiDir = join(ROOT, "apps", "web", "app", "api");
if (existsSync(apiDir)) {
  violations.push(
    `apps/web/app/api existe → une route serveur casse la promesse « zéro serveur ». ` +
      `Supprime-la : l'app est 100 % local-first (IndexedDB), aucune API Terouva.`,
  );
}

// ── Règle 2 : aucun fetch/XHR vers leboncoin.fr dans notre code ───────────────
const SCAN_DIRS = [
  join(ROOT, "apps", "web"),
  join(ROOT, "apps", "extension"),
  join(ROOT, "packages"),
];
const CODE_EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);
const SKIP_DIRS = new Set(["node_modules", ".next", "dist", "out", ".git", "gen"]);

// fetch(...) / xhr.open(...) / axios(...) dont l'argument mentionne leboncoin.fr.
const NET_LBC =
  /\b(?:fetch|XMLHttpRequest|axios|\.open|\.ajax|got|request)\b[^;\n]{0,120}leboncoin\.fr/i;
// window.open vers LBC = action utilisateur, autorisée → on l'exclut.
const ALLOWED_OPEN = /\b(?:window\.)?open\s*\(/i;

function walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const name of entries) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      walk(full);
    } else if (CODE_EXT.has(full.slice(full.lastIndexOf(".")))) {
      scanFile(full);
    }
  }
}

function scanFile(file) {
  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, i) => {
    if (NET_LBC.test(line) && !ALLOWED_OPEN.test(line)) {
      violations.push(
        `${relative(ROOT, file).split(sep).join("/")}:${i + 1} → requête réseau vers ` +
          `leboncoin.fr interdite (ligne rouge). L'extension lit le DOM, ne requête jamais LBC.\n    > ${line.trim()}`,
      );
    }
  });
}

for (const d of SCAN_DIRS) walk(d);

if (violations.length > 0) {
  console.error("✗ Lignes rouges Terouva violées :\n");
  for (const v of violations) console.error("  • " + v + "\n");
  process.exit(1);
}
console.log("✓ Lignes rouges OK : aucun app/api/*, aucune requête vers leboncoin.fr.");
