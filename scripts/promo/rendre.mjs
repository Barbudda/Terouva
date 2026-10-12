#!/usr/bin/env node
/**
 * Fabrique le fichier vidéo de l'animation de promotion.
 *
 * Le navigateur n'enregistre pas l'écran : il pose une image, on la capture, on
 * avance d'une image. C'est plus lent qu'un enregistrement, mais le résultat ne
 * dépend ni de la vitesse de la machine ni d'une image sautée — à 30 images par
 * seconde, on obtient exactement 30 images par seconde.
 *
 * Les images ne touchent jamais le disque : elles sont envoyées directement
 * dans ffmpeg. Une animation de 24 secondes en 1920×1080 ferait sinon près d'un
 * gigaoctet de PNG intermédiaires.
 *
 * Usage : node scripts/promo/rendre.mjs [--carre] [--fps 30]
 * Sortie : promo/terouva-promo-16x9.mp4 (ou -1x1.mp4)
 */
import { chromium } from "playwright-core";
import { mkdirSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawn } from "node:child_process";
import { once } from "node:events";

const ICI = dirname(fileURLToPath(import.meta.url));
const RACINE = join(ICI, "..", "..");

const args = process.argv.slice(2);
const carre = args.includes("--carre");
const fps = Number(args[args.indexOf("--fps") + 1]) || 30;

const largeur = carre ? 1080 : 1920;
const hauteur = 1080;
const nom = carre ? "terouva-promo-1x1" : "terouva-promo-16x9";

/**
 * Playwright refuse de démarrer si la version exacte du navigateur qu'il attend
 * n'est pas installée. Plutôt que de télécharger 150 Mo, on réutilise le
 * Chromium le plus récent déjà présent sur la machine.
 */
function chromiumLocal() {
  const base = join(
    process.env.LOCALAPPDATA ?? join(process.env.HOME ?? "", ".cache"),
    "ms-playwright",
  );
  if (!existsSync(base)) return undefined;
  const dossiers = readdirSync(base)
    .filter((d) => /^chromium-\d+$/.test(d))
    .sort((a, b) => Number(b.split("-")[1]) - Number(a.split("-")[1]));
  for (const d of dossiers) {
    for (const sous of ["chrome-win64", "chrome-win", "chrome-linux", "chrome-mac"]) {
      for (const exe of ["chrome.exe", "chrome"]) {
        const chemin = join(base, d, sous, exe);
        if (existsSync(chemin)) return chemin;
      }
    }
  }
  return undefined;
}

const sortie = join(RACINE, "promo");
mkdirSync(sortie, { recursive: true });
const fichier = join(sortie, nom + ".mp4");

const page_url =
  pathToFileURL(join(ICI, "promo.html")).href + "?capture" + (carre ? "&carre" : "");

console.log(`Rendu ${largeur}×${hauteur} à ${fps} i/s…`);

const executablePath = chromiumLocal();
if (executablePath) console.log(`  navigateur : ${executablePath}`);

const navigateur = await chromium.launch({ executablePath });
const page = await navigateur.newPage({
  viewport: { width: largeur, height: hauteur },
  deviceScaleFactor: 1,
});

await page.goto(page_url, { waitUntil: "networkidle" });
// Sans cette attente, les premières images sortent dans la police de secours.
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(400);

const duree = await page.evaluate(() => window.DUREE);
const total = Math.round(duree * fps);

const ffmpeg = spawn(
  "ffmpeg",
  [
    "-y",
    "-f", "image2pipe",
    "-framerate", String(fps),
    "-i", "-",
    "-c:v", "libx264",
    // yuv420p : le seul format que lisent tous les téléphones et tous les réseaux.
    "-pix_fmt", "yuv420p",
    "-preset", "slow",
    "-crf", "18",
    "-movflags", "+faststart",
    fichier,
  ],
  { stdio: ["pipe", "ignore", "inherit"] },
);

const scene = page.locator("#scene");
for (let i = 0; i < total; i += 1) {
  await page.evaluate((t) => window.rendre(t), i / fps);
  const image = await scene.screenshot({ type: "png", animations: "disabled" });
  if (!ffmpeg.stdin.write(image)) await once(ffmpeg.stdin, "drain");
  if (i % 60 === 0) {
    process.stdout.write(`\r  image ${i}/${total} (${Math.round((100 * i) / total)} %)`);
  }
}
process.stdout.write(`\r  ${total} images capturées.              \n`);

ffmpeg.stdin.end();
await navigateur.close();

const [code] = await once(ffmpeg, "close");
if (code !== 0 || !existsSync(fichier)) {
  console.error(`✗ ffmpeg a échoué (code ${code}).`);
  process.exit(1);
}

console.log(
  `✓ ${fichier} — ${(statSync(fichier).size / 1e6).toFixed(1)} Mo, ${duree} s, ${fps} i/s`,
);
