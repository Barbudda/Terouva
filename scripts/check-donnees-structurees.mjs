#!/usr/bin/env node
/**
 * Contrôle les données structurées de toutes les pages du plan du site.
 *
 * Ce script existe à cause d'une erreur de diagnostic. Une première version
 * exigeait pour `SoftwareApplication` le champ « offers OU aggregateRating OU
 * review », et concluait donc que le balisage était complet. Google en exige
 * **trois à la fois** : `name`, `offers`, et `aggregateRating` ou `review`.
 * Cinq items invalides sont ainsi passés sous le radar pendant toute une
 * session, pendant qu'un audit externe les comptait correctement.
 *
 * Règle tirée de la leçon : un « ou » dans une spécification se vérifie sur la
 * documentation, jamais de mémoire.
 *
 * Usage : node scripts/check-donnees-structurees.mjs [https://domaine]
 * Sans argument, cible le site de production.
 */

const BASE = process.argv[2] || "https://terouva.com";

/**
 * Champs exigés par Google, par type.
 *
 * Un élément de tableau est obligatoire. Un élément contenant « | » signifie
 * « au moins l'un de ceux-ci », et **s'ajoute** aux autres entrées, il ne les
 * remplace pas.
 *
 * Sources : developers.google.com/search/docs/appearance/structured-data,
 * une page par type.
 */
const REQUIS = {
  Article: ["headline", "image"],
  NewsArticle: ["headline", "image"],
  BlogPosting: ["headline", "image"],
  VideoObject: ["name", "description", "thumbnailUrl", "uploadDate"],
  FAQPage: ["mainEntity"],
  BreadcrumbList: ["itemListElement"],
  // Les trois lignes ensemble, pas au choix. C'est l'erreur d'origine.
  SoftwareApplication: ["name", "offers", "aggregateRating|review"],
  WebApplication: ["name", "offers", "aggregateRating|review"],
  MobileApplication: ["name", "offers", "aggregateRating|review"],
  Product: ["name", "offers|aggregateRating|review"],
  Organization: ["name", "url"],
  WebSite: ["name", "url"],
  CollectionPage: ["name"],
};

/** Types dont les entrées imbriquées sont elles aussi validées. */
const IMBRIQUES = ["hasPart", "mainEntity", "itemListElement"];

const defauts = [];
let noeuds = 0;

function valider(n, chemin, source) {
  if (!n || typeof n !== "object") return;
  const type = n["@type"];
  if (typeof type === "string") {
    noeuds += 1;
    for (const champ of REQUIS[type] ?? []) {
      const options = champ.split("|");
      if (!options.some((c) => n[c] !== undefined)) {
        defauts.push(`${source} → ${chemin}${type} : « ${champ} » absent`);
      }
    }
  }
  for (const cle of IMBRIQUES) {
    for (const enfant of [].concat(n[cle] ?? [])) {
      valider(enfant, `${chemin}${type}/${cle}/`, source);
    }
  }
}

const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

// Le plan du site doit annoncer exactement les adresses vers lesquelles le site
// pointe. L'accueil sans barre finale est vu comme une seconde adresse, donc
// comme une page orpheline.
for (const u of urls) {
  if (new URL(u).pathname === "") {
    defauts.push(`${u} → plan du site : l'accueil doit s'écrire avec sa barre finale`);
  }
}

for (const url of urls) {
  const html = await (await fetch(url)).text();
  const chemin = new URL(url).pathname || "/";

  for (const bloc of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let data;
    try {
      data = JSON.parse(bloc[1]);
    } catch (e) {
      defauts.push(`${chemin} → JSON-LD illisible : ${e.message}`);
      continue;
    }
    for (const n of [].concat(data["@graph"] ?? data)) valider(n, "", chemin);
  }

  // Une FAQ balisée doit être lisible sur la page : Google l'exige, et un
  // balisage sans contrepartie visible expose à une action manuelle.
  const texte = html
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;/g, "'")
    .replace(/\s+/g, " ");
  for (const bloc of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let data;
    try {
      data = JSON.parse(bloc[1]);
    } catch {
      continue;
    }
    for (const n of [].concat(data["@graph"] ?? data)) {
      if (n["@type"] !== "FAQPage") continue;
      for (const q of n.mainEntity ?? []) {
        if (!texte.includes(q.name)) {
          defauts.push(`${chemin} → question balisée mais absente de la page : « ${q.name} »`);
        }
      }
    }
  }
}

console.log(`${noeuds} nœuds vérifiés sur ${urls.length} pages.`);
if (defauts.length === 0) {
  console.log("✓ Données structurées OK : aucun champ exigé manquant, aucune FAQ invisible.");
} else {
  console.log(`\n${defauts.length} défaut(s) :`);
  for (const d of defauts) console.log("  • " + d);
  process.exitCode = 1;
}
