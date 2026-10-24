#!/usr/bin/env node
/**
 * Vérifie tous les liens externes du site en production.
 *
 * Ce script existe parce que j'ai publié quatre adresses Légifrance que
 * j'avais fabriquées de mémoire, au lieu de les ouvrir. Elles renvoyaient un
 * 404 depuis le premier jour, dans trois guides dont la crédibilité repose
 * précisément sur le fait de citer ses sources. Personne ne s'en est aperçu
 * avant qu'un audit externe le signale.
 *
 * La difficulté, et c'est pour ça qu'un simple `curl` ne suffit pas : certains
 * sites publics (Légifrance, PAP) refusent les robots avec un 403 ou un 418.
 * Un lien parfaitement valable y ressemble alors à un lien mort. Le script
 * sépare donc les deux cas :
 *
 * - **404, 410, ou erreur réseau** : le lien est cassé, il faut le corriger ;
 * - **403, 418, 429** : l'hôte refuse les robots, à ouvrir soi-même dans un
 *   navigateur. Signalé, mais jamais compté comme un échec.
 *
 * Usage : node scripts/check-liens.mjs [https://domaine]
 */

const BASE = process.argv[2] || "https://terouva.com";

/** Un en-tête de navigateur réel : sans lui, bien plus d'hôtes referment la porte. */
const ENTETES = {
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  "accept-language": "fr-FR,fr;q=0.9",
  accept: "text/html,application/xhtml+xml",
};

/** Refus d'un robot, pas une page morte. */
const BLOCAGES = new Set([401, 402, 403, 418, 429]);

const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const pages = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

/** Adresse externe → pages qui la citent. */
const liens = new Map();
for (const page of pages) {
  const html = await (await fetch(page)).text();
  for (const m of html.matchAll(/href="(https?:\/\/[^"]+)"/g)) {
    const url = m[1];
    if (url.startsWith(BASE)) continue;
    if (!liens.has(url)) liens.set(url, new Set());
    liens.get(url).add(new URL(page).pathname || "/");
  }
}

const casses = [];
const bloques = [];
let bons = 0;

for (const [url, sur] of liens) {
  let statut;
  try {
    const r = await fetch(url, { redirect: "follow", headers: ENTETES });
    statut = r.status;
    // Une redirection vers une page de maintenance est un lien mort déguisé.
    if (r.ok && /maintenance|erreur|not-found/i.test(new URL(r.url).pathname)) {
      casses.push({ url, statut: `${statut} → ${r.url}`, sur: [...sur] });
      continue;
    }
  } catch (e) {
    casses.push({ url, statut: `injoignable (${e.message})`, sur: [...sur] });
    continue;
  }

  if (statut >= 200 && statut < 400) bons += 1;
  else if (BLOCAGES.has(statut)) bloques.push({ url, statut, sur: [...sur] });
  else casses.push({ url, statut, sur: [...sur] });
}

console.log(`${liens.size} liens externes sur ${pages.length} pages : ${bons} bons.`);

if (bloques.length > 0) {
  console.log(`\n${bloques.length} hôte(s) refusent les robots (à ouvrir à la main) :`);
  for (const b of bloques) console.log(`  · ${b.statut}  ${b.url}\n      cité sur ${b.sur.join(", ")}`);
}

if (casses.length === 0) {
  console.log("\n✓ Aucun lien cassé.");
} else {
  console.log(`\n${casses.length} lien(s) CASSÉ(S) :`);
  for (const c of casses) console.log(`  • ${c.statut}  ${c.url}\n      cité sur ${c.sur.join(", ")}`);
  process.exitCode = 1;
}
