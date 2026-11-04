import { ListeArticles } from "@/components/blog/ListeArticles";
import { articlesLies } from "@/lib/blog";

/**
 * Sous un guide, les articles du blog qui s'y rattachent (il est leur pilier,
 * ou leur guide voisin). Le guide reste la réponse permanente ; l'article dit ce
 * qui vient de changer ou traite un cas plus étroit. Rien ne s'affiche tant
 * qu'aucun article publié ne cite le guide.
 */
export function ArticlesLies({ chemin }: { chemin: string }) {
  const articles = articlesLies(chemin);
  if (articles.length === 0) return null;
  return (
    <section aria-labelledby="articles-lies" className="mt-16 max-w-[48rem]">
      <h2 id="articles-lies" className="titre titre--petit text-[1.75rem] text-ink">
        Articles liés
      </h2>
      <div className="mt-4">
        <ListeArticles articles={articles} />
      </div>
    </section>
  );
}
