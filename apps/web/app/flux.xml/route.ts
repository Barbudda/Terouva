import { GUIDES } from "@/lib/catalogue";
import { getSiteUrl } from "@/lib/site";

/**
 * Flux RSS des guides. Généré au build (`force-static`) : c'est un fichier,
 * pas un service. Il sert aux lecteurs de flux et aux agrégateurs, qui restent
 * une des rares façons d'être repris ailleurs sans rien payer.
 */
export const dynamic = "force-static";

function echappe(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function GET() {
  const base = getSiteUrl();
  const recents = [...GUIDES].sort((a, b) =>
    (b.modifieLe ?? b.publieLe).localeCompare(a.modifieLe ?? a.publieLe),
  );
  const dernier = recents[0]?.modifieLe ?? recents[0]?.publieLe;

  const items = recents
    .map(
      (g) => `    <item>
      <title>${echappe(g.titre)}</title>
      <link>${base}${g.chemin}</link>
      <guid isPermaLink="true">${base}${g.chemin}</guid>
      <description>${echappe(g.description)}</description>
      <pubDate>${new Date(g.publieLe).toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Terouva · Guides pour trouver une location</title>
    <link>${base}/guides</link>
    <description>Le dossier, le garant, le message de candidature : ce qu'il faut savoir pour chercher un logement sans perdre de temps.</description>
    <language>fr-FR</language>
    <atom:link href="${base}/flux.xml" rel="self" type="application/rss+xml" />
${dernier ? `    <lastBuildDate>${new Date(dernier).toUTCString()}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
