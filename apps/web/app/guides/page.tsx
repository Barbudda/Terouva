import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Ariane } from "@/components/layout/Ariane";
import { FinDePage } from "@/components/layout/FinDePage";
import { GUIDES, OUTILS } from "@/lib/catalogue";
import { DonneesStructurees, filAriane, pageMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";

const CHEMIN = "/guides";

export const metadata = pageMetadata({
  titre: "Guides pour trouver une location",
  description:
    "Le dossier, le garant, le message : ce qu'il faut savoir pour chercher un logement. Des pages courtes, vérifiées, avec leurs sources.",
  chemin: CHEMIN,
});

const ETAPES = [
  { nom: "Accueil", chemin: "/" },
  { nom: "Guides", chemin: CHEMIN },
];

export default function Guides() {
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}${CHEMIN}#collection`,
    name: "Guides pour trouver une location",
    inLanguage: "fr-FR",
    hasPart: GUIDES.map((g) => ({
      "@type": "Article",
      headline: g.titre,
      description: g.description,
      url: `${siteUrl}${g.chemin}`,
      datePublished: g.publieLe,
    })),
  };

  return (
    <>
      <DonneesStructurees data={jsonLd} />
      <DonneesStructurees data={filAriane(ETAPES)} />
      <Nav home={false} />

      <main className="px-4 pt-10 pb-16 sm:px-6 md:pt-14">
        <div className="mx-auto max-w-5xl">
          <Ariane etapes={ETAPES} />

          <h1 className="display mt-5 max-w-3xl text-[2.1rem] text-ink sm:text-5xl">
            Chercher un logement,{" "}
            <span className="text-accent">sans y perdre son temps ni ses droits.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
            Des pages courtes sur ce qui bloque vraiment une recherche : le dossier, le garant, le
            premier message. Chacune indique sa date de vérification et ses sources, parce que ce
            sujet est plein de textes recopiés et périmés.
          </p>

          <ul className="mt-12 divide-y divide-rule border-t border-rule">
            {GUIDES.map((g) => (
              <li key={g.chemin}>
                <Link href={g.chemin} className="group block py-7">
                  <h2 className="display max-w-3xl text-xl text-ink transition-colors group-hover:text-accent sm:text-2xl">
                    {g.titre}
                  </h2>
                  <p className="mt-2.5 max-w-2xl leading-relaxed text-ink-2">{g.resume}</p>
                  <p className="mt-3 text-sm text-ink-3">{g.lecture} min de lecture</p>
                </Link>
              </li>
            ))}
          </ul>

          <section className="mt-16 max-w-[44rem]">
            <h2 className="display text-2xl text-ink">Par où commencer</h2>
            <p className="mt-4 leading-relaxed text-ink-2">
              Une recherche de logement se bloque presque toujours au même endroit, et dans le même
              ordre. Si vous démarrez, voici le chemin qui évite de découvrir un problème au moment
              où il coûte le plus cher.
            </p>
            <ol className="mt-6 space-y-5">
              <li className="flex gap-4">
                <span className="pastille shrink-0 font-bold">1</span>
                <p className="leading-relaxed text-ink-2">
                  <strong className="text-ink">Réunir le dossier.</strong> La liste des pièces
                  qu&apos;un propriétaire peut réclamer est fixée par décret et elle est
                  limitative. Savoir ce qui n&apos;y figure pas vous évite de fournir un document
                  que personne n&apos;a le droit de vous demander.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="pastille shrink-0 font-bold">2</span>
                <p className="leading-relaxed text-ink-2">
                  <strong className="text-ink">Régler la question du garant.</strong> C&apos;est
                  elle qui élimine le plus de candidatures, et elle se traite avant de visiter, pas
                  pendant. Visale se demande à l&apos;avance et ne coûte rien.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="pastille shrink-0 font-bold">3</span>
                <p className="leading-relaxed text-ink-2">
                  <strong className="text-ink">Écrire le premier message.</strong> Sur une annonce
                  de particulier en zone tendue, les premières réponses sont lues avec attention et
                  les suivantes en diagonale. Avoir un message prêt change le délai de réponse.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="pastille shrink-0 font-bold">4</span>
                <p className="leading-relaxed text-ink-2">
                  <strong className="text-ink">Savoir ce qui se passe ensuite.</strong> Un refus,
                  un dépôt de garantie mal rendu, un engagement de garant qui court après le
                  départ : ce sont les trois sujets sur lesquels on se renseigne trop tard.
                </p>
              </li>
            </ol>
          </section>

          <section className="mt-16">
            <h2 className="display text-2xl text-ink">Et des outils, gratuits</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {OUTILS.map((o) => (
                <li key={o.chemin}>
                  <Link href={o.chemin} className="card-soft group block h-full p-6">
                    <h3 className="font-bold text-ink transition-colors group-hover:text-accent">
                      {o.titre}
                    </h3>
                    <p className="mt-2 leading-relaxed text-ink-2">{o.resume}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16 max-w-[44rem]">
            <h2 className="display text-2xl text-ink">Comment ces guides sont écrits</h2>
            <p className="mt-4 leading-relaxed text-ink-2">
              Le sujet de la location est plein de pages recopiées les unes sur les autres, dont
              certaines citent des montants ou des délais abrogés depuis des années. Trois règles
              évitent d&apos;y ajouter une page de plus.
            </p>
            <ul className="mt-6 space-y-4 leading-relaxed text-ink-2">
              <li>
                <strong className="text-ink">Chaque affirmation vient d&apos;une source
                officielle</strong>, service-public.gouv.fr ou Légifrance, listée en bas de la page
                avec son lien. Quand une règle relève de l&apos;usage et non du droit, c&apos;est
                écrit.
              </li>
              <li>
                <strong className="text-ink">La date de vérification est affichée</strong> en haut
                de chaque guide. Elle dit quand le texte a été relu contre sa source, ce qui est
                plus utile qu&apos;une date de publication.
              </li>
              <li>
                <strong className="text-ink">Les chiffres sont donnés avec leur condition</strong> :
                un plafond sans sa zone, un délai sans son point de départ, un montant sans la
                mention « hors charges » valent moins que rien.
              </li>
            </ul>
            <p className="mt-6 leading-relaxed text-ink-2">
              Ces pages renseignent, elles ne remplacent pas un conseil juridique. Pour une
              situation personnelle, l&apos;ADIL de votre département renseigne gratuitement.
            </p>
          </section>

          <div className="max-w-[44rem]">
            <FinDePage />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
