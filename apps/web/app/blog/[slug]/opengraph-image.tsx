import { PILIERS, articlePublie, articlesPublies } from "@/lib/blog";
import { imageOG } from "@/lib/og";

export { size, contentType } from "@/lib/og";
export const alt = "Article du blog Terouva";

/* Une image par article, de la même famille que celles des guides. Comme la page de
   l'article, une adresse hors de la liste publiée répond 404 : sans `dynamicParams = false`,
   elle était rendue à la demande et le rendu échouait en 500 sur Vercel. */
export const dynamicParams = false;

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
