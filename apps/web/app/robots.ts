import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /app est l'application local-first (zone privée, non indexable).
        disallow: "/app",
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
