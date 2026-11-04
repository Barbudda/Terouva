import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  titre: "Conditions générales d'utilisation",
  description:
    "Les conditions d'utilisation du site Terouva, de ses outils gratuits et de sa liste d'attente. Ce que le service fait, ce qu'il ne fait pas, et ce qu'il n'engage pas.",
  chemin: "/cgu",
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 border-t border-rule pt-8">
      <h2 className="display text-2xl font-medium tracking-tight text-ink">{title}</h2>
      <div className="mt-3 space-y-3 text-base leading-relaxed text-ink-2">{children}</div>
    </section>
  );
}

export default function Cgu() {
  return (
    <div className="monde-papier min-h-screen">
      <Nav home={false} />
      <main className="mx-auto max-w-3xl px-4 pt-14 pb-24 sm:px-6 md:pt-20">
        <h1 className="display text-4xl font-medium leading-tight tracking-tight text-ink md:text-5xl">
          Conditions générales d&apos;utilisation
        </h1>
        <p className="mt-3 text-sm text-ink-3">
          Mise à jour le 30 octobre 2026. Elles s&apos;appliquent au site terouva.com, à ses outils
          gratuits et à sa liste d&apos;attente.
        </p>

        {/* L'inventaire du site redisait la ligne de date juste au-dessus (et comptait
            deux outils sur trois) : reste ce qu'elle ne dit pas. */}
        <p className="mt-8 text-lg leading-relaxed text-ink-2">
          Terouva n&apos;est pas encore sorti. Ces conditions décrivent ce qui existe à cette date,
          pas ce qui est annoncé.
        </p>

        <Section title="Utiliser le site vaut acceptation">
          <p>
            Consulter ce site, se servir de ses outils ou s&apos;inscrire à la liste d&apos;attente
            vaut acceptation de ces conditions. Si l&apos;une d&apos;elles ne vous convient pas,
            n&apos;utilisez pas le service.
          </p>
          <p>
            Le site s&apos;adresse à des personnes majeures cherchant un logement à louer en
            France.
          </p>
        </Section>

        <Section title="Les outils gratuits">
          <p>
            La checklist de dossier et le générateur de message sont gratuits, sans compte et sans
            limite d&apos;utilisation. Ils fonctionnent entièrement dans votre navigateur :
            aucune des informations saisies n&apos;est envoyée ni conservée.
          </p>
          <p>
            Ils produisent une aide, pas une garantie. Un dossier conforme n&apos;oblige aucun
            propriétaire à vous retenir, et un message généré reste{" "}
            <strong className="text-ink">le vôtre</strong> : vous le relisez, vous le modifiez, et
            vous l&apos;envoyez vous-même.
          </p>
        </Section>

        <Section title="Les guides informent, ils ne conseillent pas">
          <p>
            Les guides citent leurs sources, service-public.gouv.fr et Légifrance, et portent leur
            date de vérification. Ils décrivent l&apos;état du droit à cette date, pour un cas
            général.
          </p>
          <p>
            <strong className="text-ink">
              Ce ne sont ni un conseil juridique, ni un avis personnalisé.
            </strong>{" "}
            Le droit du logement change, et une situation particulière peut relever d&apos;une
            autre règle. Pour un litige ou une décision importante, adressez-vous à l&apos;ADIL de
            votre département, qui renseigne gratuitement.
          </p>
        </Section>

        <Section title="Ce que Terouva ne fait pas">
          <p>
            C&apos;est une limite assumée du produit, et elle vous protège autant qu&apos;elle
            nous engage :
          </p>
          <ul className="ml-5 list-disc space-y-2">
            <li>
              Terouva <strong className="text-ink">n&apos;envoie aucun message à votre place</strong>.
              Vous relisez et vous envoyez vous-même, depuis votre propre messagerie.
            </li>
            <li>
              Terouva <strong className="text-ink">ne crée aucun compte</strong> sur un site
              d&apos;annonces et n&apos;utilise jamais vos identifiants.
            </li>
            <li>
              Terouva <strong className="text-ink">ne publie aucune annonce</strong> et ne modifie
              rien sur un site tiers.
            </li>
            <li>
              Terouva ne met en œuvre <strong className="text-ink">aucun contournement</strong> des
              protections d&apos;un site tiers.
            </li>
          </ul>
          <p>
            Il vous revient de respecter les conditions d&apos;utilisation des sites que vous
            consultez par ailleurs.
          </p>
        </Section>

        <Section title="Aucun lien avec Leboncoin">
          <p>
            Terouva est un projet indépendant.{" "}
            <strong className="text-ink">
              Il n&apos;est ni affilié, ni partenaire, ni autorisé par Leboncoin
            </strong>{" "}
            ou par un autre site d&apos;annonces. Les marques citées appartiennent à leurs
            titulaires et ne sont mentionnées que pour décrire ce que fait le produit.
          </p>
        </Section>

        <Section title="La liste d'attente">
          <p>
            S&apos;inscrire revient à nous confier une adresse e-mail pour être prévenu quand
            votre accès ouvre, et rien d&apos;autre. Aucune publicité, aucune revente, aucun autre envoi.
          </p>
          <p>
            Vous pouvez demander son retrait à tout moment : il est immédiat et définitif. Le
            détail du traitement figure dans la{" "}
            <Link
              href="/confidentialite"
              className="lien"
            >
              politique de confidentialité
            </Link>
            .
          </p>
        </Section>

        <Section title="L'application à venir">
          <p>
            L&apos;application n&apos;est pas encore ouverte au public à la date de ces
            conditions. Le modèle annoncé, une base gratuite et des options payantes, est une
            indication : les prix, les modalités de paiement et les conditions de
            vente seront publiés avant tout paiement et feront l&apos;objet de conditions distinctes.
          </p>
          <p>
            Aucune inscription à la liste d&apos;attente n&apos;emporte commande, réservation ni
            engagement de payer.
          </p>
        </Section>

        <Section title="Disponibilité">
          <p>
            Le site est fourni en l&apos;état. Nous faisons de notre mieux pour qu&apos;il reste
            accessible, sans garantir une disponibilité continue : une interruption peut survenir
            pour maintenance, mise à jour, ou du fait de notre hébergeur.
          </p>
        </Section>

        <Section title="Propriété intellectuelle">
          <p>
            Les textes, les guides, le nom et les éléments graphiques de ce site sont protégés.
            Vous pouvez les consulter, les imprimer et les citer en indiquant la source et un lien.
            Toute reproduction intégrale ou massive, notamment pour republier les guides ailleurs,
            demande notre accord écrit.
          </p>
          <p>
            Ce que vous produisez avec les outils, notamment votre message de candidature, vous
            appartient entièrement.
          </p>
        </Section>

        <Section title="Responsabilité">
          <p>
            Nous mettons un soin réel à vérifier chaque information publiée, et chaque guide porte
            ses sources et sa date. Nous ne pouvons toutefois pas être tenus responsables
            d&apos;une décision prise sur la seule base de ces pages, d&apos;un logement non
            obtenu, ni d&apos;une erreur dans un document que vous auriez transmis.
          </p>
          <p>
            Les liens vers des sites tiers sont donnés pour votre information ; nous ne maîtrisons
            ni leur contenu ni leur disponibilité.
          </p>
        </Section>

        <Section title="Modification de ces conditions">
          <p>
            Ces conditions peuvent évoluer, en particulier à l&apos;ouverture de l&apos;application. La
            date de mise à jour figure en haut de cette page, et la version applicable est celle
            publiée au moment où vous utilisez le service.
          </p>
        </Section>

        <Section title="Droit applicable">
          <p>
            Ces conditions sont régies par le droit français. En cas de différend, nous vous
            invitons à nous écrire d&apos;abord : l&apos;adresse figure dans les{" "}
            <Link
              href="/mentions-legales"
              className="lien"
            >
              mentions légales
            </Link>
            .
          </p>
          <p>
            Un consommateur peut recourir gratuitement à un médiateur de la consommation, ou saisir
            la plateforme de règlement en ligne des litiges de la Commission européenne. À défaut
            d&apos;accord, les tribunaux français sont compétents.
          </p>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
