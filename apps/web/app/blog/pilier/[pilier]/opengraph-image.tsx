import { PAGES_PILIERS, PILIERS, piliersAvecPage, pilierParSlug } from "@/lib/blog";
import { imageOG } from "@/lib/og";

export { size, contentType } from "@/lib/og";
export const alt = "Les articles d'un thème du blog Terouva";

/* Comme la page du pilier : une adresse hors liste répond 404, jamais un rendu à la demande. */
export const dynamicParams = false;

export function generateStaticParams() {
  return piliersAvecPage().map((p) => ({ pilier: PAGES_PILIERS[p].slug }));
}

export default async function Image({ params }: { params: Promise<{ pilier: string }> }) {
  const p = pilierParSlug((await params).pilier);
  return imageOG({
    surtitre: "Blog",
    titre: p ? PILIERS[p] : "Blog Terouva",
  });
}
