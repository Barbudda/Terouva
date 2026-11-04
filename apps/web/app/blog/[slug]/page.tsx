import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CadreArticle } from "@/components/blog/CadreArticle";
import { articlePublie, articlesPublies, cheminArticle } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

/*
 * Une seule route pour tous les articles, générée au build depuis
 * `lib/blog.ts`. Seuls les articles publiés ont une page : une autre adresse,
 * brouillon compris, répond 404 (`dynamicParams = false`).
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return articlesPublies().map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = articlePublie((await params).slug);
  if (!article) return {};
  return pageMetadata({
    titre: article.titreSeo,
    description: article.description,
    chemin: cheminArticle(article),
    type: "article",
    publieLe: article.publieLe,
    modifieLe: article.modifieLe,
    flux: true,
  });
}

export default async function PageArticle({ params }: Props) {
  const article = articlePublie((await params).slug);
  if (!article) notFound();
  const { default: Corps } = await article.corps();
  return (
    <CadreArticle article={article}>
      <Corps />
    </CadreArticle>
  );
}
