import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "La politique de confidentialité de Terouva : vos données restent sur votre ordinateur. Aucun serveur, aucun compte, aucun suivi.",
  alternates: {
    canonical: "/confidentialite",
  },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 border-t border-rule pt-8">
      <h2 className="font-serif text-2xl font-medium tracking-tight text-ink">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-base leading-relaxed text-ink-2">
        {children}
      </div>
    </section>
  );
}

export default function Confidentialite() {
  return (
    <>
      <Nav home={false} />
      <main className="mx-auto max-w-3xl px-4 pt-14 pb-24 sm:px-6 md:pt-20">
        <h1 className="font-serif text-4xl font-medium leading-tight tracking-tight text-ink md:text-5xl">
          Politique de confidentialité
        </h1>
        <p className="mt-3 text-sm text-ink-3">
          Mise à jour en octobre 2026. Elle s'applique au site Terouva, à
          l'application et à l'extension de navigateur.
        </p>

        <p className="mt-8 text-lg leading-relaxed text-ink-2">
          Terouva est conçu pour respecter votre vie privée par construction.
          En résumé : <strong className="text-ink">vos données restent sur votre
          ordinateur</strong>, il n'y a ni compte, ni publicité, ni suivi. La
          seule information qui nous parvient est votre adresse e-mail, et
          uniquement si vous demandez à être prévenu du lancement.
        </p>

        <Section title="L'application ne collecte rien">
          <p>
            L'application et l'extension fonctionnent localement, sur votre
            appareil. Vos recherches, les annonces, votre dossier et vos messages
            de candidature ne sont transmis ni à nous, ni à un tiers.
          </p>
        </Section>

        <Section title="Si vous demandez à être prévenu du lancement">
          <p>
            Dans ce cas précis, et seulement si vous remplissez le formulaire,
            votre <strong className="text-ink">adresse e-mail</strong> nous est
            transmise. Elle sert uniquement à vous envoyer un message le jour où
            Terouva devient téléchargeable. Pas de publicité, pas de revente,
            aucun autre envoi.
          </p>
          <p>
            La liste est conservée chez <strong className="text-ink">Resend</strong>,
            notre prestataire d'envoi d'e-mails, qui agit pour notre compte. Nous
            gardons votre adresse jusqu'au lancement, puis au maximum un an.
          </p>
          <p>
            Vous pouvez à tout moment demander à consulter ou à supprimer votre
            adresse : répondez à l'un de nos e-mails, ou écrivez-nous via la page
            du projet. Chaque message contient aussi un lien de désinscription.
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
            Leboncoin que <strong className="text-ink">vous
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
            critères, le <strong className="text-ink">nom de votre
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
