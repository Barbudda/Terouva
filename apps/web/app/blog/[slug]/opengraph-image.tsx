import { PILIERS, articlePublie, articlesPublies } from "@/lib/blog";
import { imageOG } from "@/lib/og";

export { size, contentType } from "@/lib/og";
export const alt = "Article du blog Terouva";

/* Une image par article, de la même famille que celles des guides. */
export function generateStaticParams() {
  return articlesPublies().map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const article = articlePublie((await params).slug);
  return imageOG({
    surtitre: article ? `Blog · ${PILIERS[article.pilier]}` : "Blog",
    titre: article?.titre ?? "Blog Terouva",
  });
}
