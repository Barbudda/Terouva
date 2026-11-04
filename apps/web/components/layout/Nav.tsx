import { NavClient } from "@/components/layout/NavClient";
import { lienBlog } from "@/lib/blog";

/**
 * Le masthead. Ce fichier reste côté serveur pour une seule raison : savoir si
 * le blog est ouvert demande de lire la liste des articles (`lib/blog`), et la
 * lire dans un composant client enverrait les fiches de tous les articles dans
 * le JavaScript de chaque page. Le serveur calcule le lien, le client ne reçoit
 * qu'un booléen déguisé en lien. Tout le reste vit dans `NavClient`.
 *
 * Le blog entre dans le menu (colonne « Les guides ») dès son premier article,
 * comme dans le pied de page. La barre de bureau garde ses quatre destinations :
 * sa place y relève du pôle Design.
 */
export function Nav({ home = true }: { home?: boolean }) {
  return <NavClient home={home} blog={lienBlog()} />;
}
