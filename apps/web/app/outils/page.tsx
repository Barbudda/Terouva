import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Ariane } from "@/components/layout/Ariane";
import { FinDePage } from "@/components/layout/FinDePage";
import { GUIDES, OUTILS } from "@/lib/catalogue";
import { DonneesStructurees, filAriane, pageMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";

const CHEMIN = "/outils";

export const metadata = pageMetadata({
  titre: "Outils gratuits pour votre recherche de logement",
  description:
    "Des outils qui tournent dans votre navigateur, sans compte et sans limite. Rien n'est envoyé à un serveur, rien n'est conservé.",
  chemin: CHEMIN,
});

const ETAPES = [
  { nom: "Accueil", chemin: "/" },
  { nom: "Outils gratuits", chemin: CHEMIN },
];

export default function Outils() {
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}${CHEMIN}#collection`,
    name: "Outils gratuits pour votre recherche de logement",
    inLanguage: "fr-FR",
    hasPart: OUTILS.map((o) => ({
      "@type": "WebApplication",
      name: o.titre,
      description: o.description,
      url: `${siteUrl}${o.chemin}`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Tout navigateur web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      isAccessibleForFree: true,
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
            Des outils gratuits, <span className="text-accent">qui ne gardent rien.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
            Pas de compte à créer, pas de limite d&apos;utilisation, pas d&apos;adresse e-mail à
            laisser. Tout tourne dans votre navigateur : ces pages n&apos;envoient aucune donnée à
            un serveur, et rien n&apos;est conservé quand vous fermez l&apos;onglet.
          </p>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {OUTILS.map((o) => (
              <li key={o.chemin}>
                <Link href={o.chemin} className="card-soft group block h-full p-6 sm:p-7">
                  <h2 className="display text-xl text-ink transition-colors group-hover:text-accent">
                    {o.titre}
                  </h2>
                  <p className="mt-3 leading-relaxed text-ink-2">{o.resume}</p>
                  <p className="mt-4 text-sm font-semibold text-accent">Ouvrir l&apos;outil</p>
                </Link>
              </li>
            ))}
          </ul>

          <section className="mt-16 max-w-[44rem]">
            <h2 className="display text-2xl text-ink">Pourquoi rien n&apos;est envoyé</h2>
            <p className="mt-4 leading-relaxed text-ink-2">
              Ces deux outils demandent des choses qui ne regardent personne : votre situation
              professionnelle, vos revenus, qui se porte garant pour vous. Un formulaire en ligne
              qui réclame ça finit normalement dans une base de données, puis dans une campagne
              d&apos;e-mails.
            </p>
            <p className="mt-4 leading-relaxed text-ink-2">
              Ici, le calcul se fait entièrement dans la page, par le navigateur. Concrètement :
            </p>
            <ul className="mt-5 space-y-3 leading-relaxed text-ink-2">
              <li>
                <strong className="text-ink">Aucune requête ne part</strong> quand vous répondez aux
                questions. Vous pouvez couper votre connexion après le chargement de la page,
                l&apos;outil fonctionne toujours.
              </li>
              <li>
                <strong className="text-ink">Rien n&apos;est enregistré.</strong> Fermez
                l&apos;onglet et vos réponses disparaissent. Il n&apos;y a pas de compte, donc pas
                d&apos;historique à consulter ni à supprimer.
              </li>
              <li>
                <strong className="text-ink">Le résultat est à vous.</strong> Vous le copiez, vous
                le modifiez, vous l&apos;envoyez vous-même depuis votre messagerie habituelle.
              </li>
            </ul>
            <p className="mt-5 leading-relaxed text-ink-2">
              C&apos;est aussi le principe de l&apos;application Terouva, qui travaille en local
              sur votre ordinateur. Le détail est dans la{" "}
              <Link
                href="/confidentialite"
                className="text-accent underline decoration-accent/35 underline-offset-4 transition-colors hover:decoration-accent"
              >
                page de confidentialité
              </Link>
              .
            </p>
          </section>

          <section className="mt-16 max-w-[44rem]">
            <h2 className="display text-2xl text-ink">Ce que ces outils ne font pas</h2>
            <p className="mt-4 leading-relaxed text-ink-2">
              Autant le dire avant que vous cliquiez. Ils ne cherchent pas d&apos;annonces, ne se
              connectent à aucun site de petites annonces et n&apos;envoient aucun message à votre
              place. Ils préparent ce que vous enverrez, et vous gardez la main sur l&apos;envoi.
            </p>
            <p className="mt-4 leading-relaxed text-ink-2">
              La checklist donne les pièces exigibles pour votre situation, pas un avis juridique
              sur un litige en cours. Et le générateur écrit un message à partir de ce que vous lui
              dites : relisez-le, c&apos;est votre candidature, pas la sienne.
            </p>
          </section>

          <section className="mt-16">
            <h2 className="display text-2xl text-ink">À lire aussi</h2>
            <ul className="mt-6 divide-y divide-rule border-t border-rule">
              {GUIDES.map((g) => (
                <li key={g.chemin}>
                  <Link href={g.chemin} className="group block py-5">
                    <h3 className="max-w-3xl font-bold text-ink transition-colors group-hover:text-accent">
                      {g.titre}
                    </h3>
                    <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-ink-2">
                      {g.resume}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
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
