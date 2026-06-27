import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "La politique de confidentialité de Terouva : vos données restent sur votre ordinateur. Aucun serveur, aucun compte, aucun suivi.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight text-[var(--color-text)]">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-[var(--color-text-muted)] leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function Confidentialite() {
  return (
    <>
      <Nav />
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--color-text)]">
          Politique de confidentialité
        </h1>
        <p className="mt-3 text-sm text-[var(--color-text-faint)]">
          En vigueur en juin 2026. Elle s'applique au site Terouva, à l'application
          web et à l'extension de navigateur.
        </p>

        <p className="mt-8 text-[var(--color-text-muted)] leading-relaxed">
          Terouva est conçu pour respecter votre vie privée par construction.
          En résumé : <strong className="text-[var(--color-text)]">vos données
          restent sur votre ordinateur</strong>, il n'y a ni compte, ni serveur,
          ni publicité, ni suivi.
        </p>

        <Section title="Aucune collecte de données">
          <p>
            Nous ne collectons aucune donnée vous concernant. L'application et
            l'extension fonctionnent localement, dans votre navigateur. Aucune de
            vos informations n'est transmise à un serveur Terouva ni à un tiers.
          </p>
        </Section>

        <Section title="Où vivent vos données">
          <p>
            Votre profil, vos recherches, les annonces détectées et les messages
            de candidature sont enregistrés uniquement dans le stockage local de
            votre navigateur, sur votre appareil. Vous pouvez à tout moment les
            exporter dans un fichier ou les effacer (depuis les Réglages, ou en
            vidant les données du site dans votre navigateur).
          </p>
        </Section>

        <Section title="L'extension de navigateur">
          <p>
            L'extension lit le contenu des pages de recherche et d'annonces
            Leboncoin que <strong className="text-[var(--color-text)]">vous
            ouvrez vous-même</strong>, afin de repérer les nouvelles annonces et
            de les transmettre à votre application Terouva, sur votre appareil.
          </p>
          <p>
            Elle n'effectue aucune requête automatique vers Leboncoin, n'envoie
            rien à un serveur, et n'agit jamais à votre place : elle se contente
            d'observer ce que vous consultez déjà. L'envoi d'un message de
            candidature reste toujours une action que vous réalisez vous-même.
          </p>
        </Section>

        <Section title="Presse-papiers">
          <p>
            Sur une page d'annonce, si vous cliquez sur « Remplir mon message »,
            l'extension lit le message que vous venez de copier depuis Terouva,
            uniquement pour le coller dans le formulaire de contact. Cette lecture
            n'a lieu qu'à ce moment précis, sur votre action.
          </p>
        </Section>

        <Section title="La seule connexion sortante">
          <p>
            Pour construire un lien de recherche Leboncoin à partir de vos
            critères, le <strong className="text-[var(--color-text)]">nom de votre
            ville</strong> est envoyé à l'annuaire d'adresses public de l'État
            français (api-adresse.data.gouv.fr), afin d'obtenir des coordonnées.
            Aucune autre information n'est transmise, et cet appel ne contient rien
            qui permette de vous identifier.
          </p>
        </Section>

        <Section title="Ni compte, ni suivi, ni publicité">
          <p>
            Terouva ne demande pas de compte. Il n'utilise pas de cookie de suivi,
            pas d'outil d'analyse d'audience tiers, et n'affiche aucune publicité.
            Les notifications servent uniquement à vous prévenir des annonces qui
            correspondent à vos propres critères de recherche.
          </p>
        </Section>

        <Section title="Vos données vous appartiennent">
          <p>
            Comme tout est stocké chez vous, vous en gardez le contrôle complet :
            vous pouvez les consulter, les exporter et les supprimer quand vous le
            souhaitez, sans nous le demander.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Pour toute question relative à cette politique ou à vos données, vous
            pouvez contacter le développeur via la fiche de l'extension sur le
            Chrome Web Store, ou via la page du projet.
          </p>
        </Section>
      </main>
      <Footer />
    </>
  );
}
