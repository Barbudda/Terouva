import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { pageMetadata } from "@/lib/seo";
import { EDITEUR } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  titre: "Mentions légales",
  description:
    "Qui édite le site Terouva et qui l'héberge : Blue Lake Dev, entreprise individuelle de Hugo Moëne, et Vercel Inc.",
  chemin: "/mentions-legales",
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 border-t border-rule pt-8">
      <h2 className="display text-2xl font-medium tracking-tight text-ink">{title}</h2>
      <div className="mt-3 space-y-3 text-base leading-relaxed text-ink-2">{children}</div>
    </section>
  );
}

/** Une ligne de fiche : l'intitulé à gauche, la valeur à droite ; empilés sur téléphone. */
function Ligne({ champ, children }: { champ: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-x-6 gap-y-0.5 border-b border-rule py-3 sm:grid-cols-[13rem_1fr]">
      <dt className="text-sm text-ink-3">{champ}</dt>
      <dd className="text-ink">{children}</dd>
    </div>
  );
}

/**
 * Les mentions légales, exigées par l'article 6-III de la LCEN pour tout site
 * édité en France. Les informations de l'éditeur viennent de la synthèse du
 * guichet unique (formalité validée le 28 octobre 2026) et vivent dans
 * `EDITEUR`, pour que le pied de page et cette page ne divergent jamais.
 *
 * Volontairement absent : tout ce que la loi ne demande pas (date de
 * naissance, numéro de sécurité sociale). Une entreprise individuelle en
 * activité libérale non réglementée n'est inscrite ni au RCS ni au
 * répertoire des métiers : le SIREN suffit.
 */
export default function MentionsLegales() {
  const e = EDITEUR;
  return (
    <div className="monde-papier min-h-screen">
      <Nav home={false} />
      <main className="mx-auto max-w-3xl px-4 pt-14 pb-24 sm:px-6 md:pt-20">
        <h1 className="display text-4xl font-medium leading-tight tracking-tight text-ink md:text-5xl">
          Mentions légales
        </h1>
        <p className="mt-3 text-sm text-ink-3">Mise à jour le 2 novembre 2026.</p>

        <Section title="Éditeur du site">
          <p>
            Le site terouva.com est édité par <strong className="text-ink">{e.marque}</strong>,
            l&apos;entreprise individuelle de {e.nom}.
          </p>
          <dl className="border-t border-rule">
            <Ligne champ="Entrepreneur">{e.nom} EI</Ligne>
            <Ligne champ="Statut">
              Entrepreneur individuel, micro-entreprise, activité libérale non réglementée
            </Ligne>
            <Ligne champ="SIREN">{e.siren}</Ligne>
            <Ligne champ="SIRET">{e.siret}</Ligne>
            <Ligne champ="Code APE">6201Z, programmation informatique</Ligne>
            <Ligne champ="Adresse">
              {e.adresse[0]}
              <br />
              {e.adresse[1]}
            </Ligne>
            <Ligne champ="Téléphone">
              <a href={`tel:${e.telephoneLien}`} className="lien">
                {e.telephone}
              </a>
            </Ligne>
            <Ligne champ="E-mail">
              <a href={`mailto:${e.email}`} className="lien">
                {e.email}
              </a>
            </Ligne>
            <Ligne champ="TVA">TVA non applicable, article 293 B du CGI</Ligne>
          </dl>
          <p>
            Directeur de la publication : {e.nom}. Pour toute question sur le site ou sur vos
            données, écrivez à l&apos;adresse ci-dessus.
          </p>
        </Section>

        <Section title="Hébergeur">
          <dl className="border-t border-rule">
            <Ligne champ="Société">Vercel Inc.</Ligne>
            <Ligne champ="Adresse">
              440 N Barranca Avenue #4133
              <br />
              Covina, CA 91723, États-Unis
            </Ligne>
            <Ligne champ="Site">
              <a href="https://vercel.com" className="lien" rel="noopener">
                vercel.com
              </a>
            </Ligne>
          </dl>
        </Section>

        <Section title="Vos données">
          <p>
            L&apos;application garde tout sur votre appareil. Seule votre adresse e-mail nous
            parvient, et seulement si vous demandez à être prévenu de l&apos;ouverture. Le détail est
            dans la{" "}
            <Link href="/confidentialite" className="lien">
              politique de confidentialité
            </Link>
            .
          </p>
        </Section>

        <Section title="Propriété intellectuelle et responsabilité">
          <p>
            Les textes, les guides, le nom et les éléments graphiques du site appartiennent à
            l&apos;éditeur. Ce que vous pouvez en faire, et ce que nous ne pouvons pas garantir,
            est décrit dans les{" "}
            <Link href="/cgu" className="lien">
              conditions d&apos;utilisation
            </Link>
            .
          </p>
          <p>
            Terouva n&apos;a aucun lien avec Leboncoin. Les marques citées appartiennent à leurs
            titulaires et ne servent qu&apos;à décrire ce que fait le produit.
          </p>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
