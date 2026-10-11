import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Zones privées : l'application local-first et la liste d'attente.
        disallow: ["/app", "/liste"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
