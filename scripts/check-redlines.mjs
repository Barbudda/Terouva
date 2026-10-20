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

// ── Règle 1 : une seule route API côté web, et c'est la liste d'attente ───────
// L'application reste 100 % locale (IndexedDB) : aucune donnée de recherche,
// d'annonce ou de candidature ne doit passer par un serveur. La seule exception
// autorisée est le formulaire d'inscription du site vitrine, qui range une
// adresse e-mail dans le magasin Blob du projet. Toute autre route est une
// violation.
// La console privée /liste (qui a réservé) est rendue côté serveur elle aussi,
// mais elle appartient au site vitrine, pas à l'application : elle relit cette
// seule liste d'adresses, et ne touche jamais aux données de recherche de
// l'utilisateur. Son export CSV est construit dans le navigateur, précisément
// pour ne pas ouvrir une seconde porte serveur.
const ALLOWED_API_ROUTES = ["waitlist/route.ts"];
const apiDir = join(ROOT, "apps", "web", "app", "api");
if (existsSync(apiDir)) {
  const found = [];
  const walkApi = (dir) => {
    for (const entry of readdirSync(dir)) {
      const p = join(dir, entry);
      if (statSync(p).isDirectory()) walkApi(p);
      else found.push(relative(apiDir, p).split(sep).join("/"));
    }
  };
  walkApi(apiDir);
  for (const file of found) {
    if (!ALLOWED_API_ROUTES.includes(file)) {
      violations.push(
        `apps/web/app/api/${file} → route serveur non autorisée. L'app est local-first : ` +
          `seule ${ALLOWED_API_ROUTES.join(", ")} (inscription à la liste d'attente) est admise.`,
      );
    }
  }
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
console.log(
  "✓ Lignes rouges OK : aucune route serveur hors liste d'attente, aucune requête vers leboncoin.fr.",
);
