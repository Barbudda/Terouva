#!/usr/bin/env node
/**
 * Prévient les moteurs qu'une page a changé, via IndexNow.
 *
 * IndexNow est un protocole ouvert accepté par Bing, Yandex, Seznam et Naver.
 * **Google n'y participe pas** : pour Google, il faut la Search Console. Le
 * gain est donc partiel, mais il est gratuit, immédiat, et évite d'attendre le
 * prochain passage du robot sur les pages qu'on vient de publier.
 *
 * Usage : node scripts/indexnow.mjs [url...]
 * Sans argument, soumet toutes les adresses du plan du site.
 */
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = join(fileURLToPath(import.meta.url), "..", "..");
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://terouva.com";
const HOTE = new URL(SITE).host;

/** La clé est le nom du fichier déposé à la racine du site. */
function cle() {
  const fichiers = readdirSync(join(RACINE, "apps", "web", "public"));
  const f = fichiers.find((n) => /^[0-9a-f]{32}\.txt$/.test(n));
  if (!f) throw new Error("Clé IndexNow introuvable dans apps/web/public/.");
  return f.replace(".txt", "");
}

async function adressesDuPlan() {
  const reponse = await fetch(`${SITE}/sitemap.xml`);
  if (!reponse.ok) throw new Error(`Plan du site illisible : HTTP ${reponse.status}`);
  const xml = await reponse.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const urlList = process.argv.slice(2).length
  ? process.argv.slice(2)
  : await adressesDuPlan();

if (urlList.length === 0) {
  console.error("Aucune adresse à soumettre.");
  process.exit(1);
}

const corps = { host: HOTE, key: cle(), keyLocation: `${SITE}/${cle()}.txt`, urlList };

const reponse = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify(corps),
});

// 200 et 202 valent tous deux acceptation ; 403 signale une clé non trouvée.
if (reponse.ok) {
  console.log(`✓ ${urlList.length} adresse(s) soumise(s) à IndexNow (HTTP ${reponse.status}).`);
  for (const u of urlList) console.log("  " + u);
} else {
  console.error(`✗ IndexNow a répondu HTTP ${reponse.status} : ${await reponse.text()}`);
  process.exit(1);
}
