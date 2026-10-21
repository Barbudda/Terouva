import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { X } from "lucide-react";
import { COOKIE_NAME, sameToken, tokenFor, usablePassword } from "@/lib/admin";
import { inscritsRecents, lireInscrits, versCsv, type Inscrit } from "@/lib/inscriptions";
import { CopierEmails } from "@/components/liste/CopierEmails";
import { TelechargerCsv } from "@/components/liste/TelechargerCsv";
import { Logo } from "@/components/ui/Logo";
import { connexion, deconnexion, retirer } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Liste d'attente",
  robots: { index: false, follow: false },
};

const MESSAGES: Record<string, string> = {
  refus: "Mot de passe incorrect.",
  trop: "Trop d'essais. Réessayez dans dix minutes.",
  config: "Le mot de passe d'accès n'est pas encore défini.",
};

const dateCourte = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  year: "numeric",
});
const heure = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" });

export default async function ListePage({
  searchParams,
}: {
  searchParams: Promise<{ erreur?: string }>;
}) {
  const { erreur } = await searchParams;
  const motDePasse = process.env.ADMIN_PASSWORD;
  const jar = await cookies();
  const connecte =
    usablePassword(motDePasse) && sameToken(jar.get(COOKIE_NAME)?.value, tokenFor(motDePasse));

  return (
    <main className="min-h-screen bg-paper-2 px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="inline-flex">
          <Logo />
        </Link>

        {connecte ? <Tableau /> : <Porte erreur={erreur} />}
      </div>
    </main>
  );
}

/** Écran fermé : un champ, rien d'autre. */
function Porte({ erreur }: { erreur?: string }) {
  return (
    <div className="card-soft mt-8 p-6 sm:p-8">
      <h1 className="display text-[2rem] text-ink">
        Qui a réservé&#8239;?
      </h1>
      <p className="mt-3 text-ink-2">Cette page est privée. Entrez le mot de passe pour la voir.</p>

      <form action={connexion} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <label className="flex-1">
          <span className="sr-only">Mot de passe</span>
          <input
            type="password"
            name="motdepasse"
            required
            autoComplete="current-password"
            placeholder="Mot de passe"
            className="h-12 w-full rounded-full border border-field bg-card px-5 text-base text-ink outline-none placeholder:text-ink-3 focus-visible:border-accent"
          />
        </label>
        <button
          type="submit"
          className="h-12 shrink-0 rounded-full bg-accent px-6 font-semibold text-white transition-colors hover:bg-accent-ink"
        >
          Entrer
        </button>
      </form>

      {erreur && (
        <p role="alert" className="mt-4 text-[15px] text-bad">
          {MESSAGES[erreur] ?? "Accès impossible."}
        </p>
      )}

      {erreur === "config" && (
        <p className="mt-2 text-sm leading-relaxed text-ink-3">
          Ajoutez une variable <span className="font-semibold text-ink-2">ADMIN_PASSWORD</span> dans
          les réglages Vercel du projet, puis relancez un déploiement.
        </p>
      )}
    </div>
  );
}

/** Écran ouvert : le compte, puis la liste. */
async function Tableau() {
  const liste = await lireInscrits();

  if (liste.kind === "config") {
    return (
      <Avertissement titre="La liste n'a pas encore d'endroit où vivre">
        <>
          Dans le tableau de bord Vercel du projet, onglet{" "}
          <span className="font-semibold text-ink-2">Storage</span>, créez un magasin{" "}
          <span className="font-semibold text-ink-2">Blob</span> et reliez-le à ce projet. Son jeton
          d&apos;accès est posé tout seul : il n&apos;y a rien à recopier. Relancez ensuite un
          déploiement.
          <br />
          <br />
          <strong className="text-ink">
            Tant que ce magasin n&apos;existe pas, les adresses laissées sur le site ne sont pas
            enregistrées.
          </strong>
        </>
      </Avertissement>
    );
  }

  if (liste.kind === "erreur") {
    return (
      <Avertissement titre="La liste n'a pas pu être lue">{liste.message}</Avertissement>
    );
  }

  const actifs = liste.inscrits;
  const semaine = inscritsRecents(liste.inscrits, 7);
  const jour = inscritsRecents(liste.inscrits, 1);

  return (
    <>
      <header className="mt-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Liste d&apos;attente</p>
          <h1 className="display mt-2 text-[2rem] text-ink">
            {actifs.length} {actifs.length > 1 ? "personnes attendent" : "personne attend"}
          </h1>
          <p className="mt-2 text-ink-2">
            {semaine > 0
              ? `${semaine} ${semaine > 1 ? "inscriptions" : "inscription"} ces sept derniers jours, dont ${jour} aujourd'hui.`
              : "Aucune inscription ces sept derniers jours."}
          </p>
        </div>

        <form action={deconnexion}>
          <button
            type="submit"
            className="h-11 rounded-full px-4 text-[15px] font-semibold text-ink-2 transition-colors hover:text-ink"
          >
            Verrouiller la page
          </button>
        </form>
      </header>

      {actifs.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          <CopierEmails emails={actifs.map((i) => i.email)} />
          <TelechargerCsv csv={versCsv(actifs)} nombre={actifs.length} />
        </div>
      )}

      {liste.inscrits.length === 0 ? (
        <div className="card-soft mt-6 p-8 text-center">
          <p className="font-semibold text-ink">Personne pour l&apos;instant.</p>
          <p className="mx-auto mt-2 max-w-sm text-ink-2">
            Les adresses laissées sur la page d&apos;accueil apparaîtront ici, de la plus récente à
            la plus ancienne.
          </p>
        </div>
      ) : (
        <ul className="card-soft mt-6 divide-y divide-rule overflow-hidden">
          {liste.inscrits.map((inscrit) => (
            <Ligne key={inscrit.clef} inscrit={inscrit} />
          ))}
        </ul>
      )}

      {liste.tronquee && (
        <p className="mt-4 text-sm text-ink-3">
          Seules les 10 000 premières adresses sont affichées.
        </p>
      )}

      <p className="mt-8 text-sm leading-relaxed text-ink-3">
        Ces adresses sont gardées dans le magasin Blob du projet, en accès privé, et nulle part
        ailleurs. Le CSV sert à les reprendre dans l&apos;outil d&apos;envoi de votre choix le jour
        du lancement. Terouva lui-même n&apos;a pas de serveur : tout ce qu&apos;une personne
        cherche, voit ou écrit dans l&apos;application reste sur son ordinateur.
      </p>
    </>
  );
}

function Ligne({ inscrit }: { inscrit: Inscrit }) {
  const quand = new Date(inscrit.date);
  const valide = !Number.isNaN(quand.getTime());

  return (
    <li className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-4">
      <span className="min-w-0 flex-1 truncate font-medium text-ink">{inscrit.email}</span>
      {valide && (
        <time dateTime={inscrit.date} className="tabular shrink-0 text-sm text-ink-3">
          {dateCourte.format(quand)} à {heure.format(quand)}
        </time>
      )}
      {/* Pour honorer une demande de retrait : c'est la seule façon de sortir
          de la liste, puisqu'il n'y a pas encore d'envoi, donc pas de lien de
          désinscription. */}
      <form action={retirer} className="shrink-0">
        <input type="hidden" name="clef" value={inscrit.clef} />
        <button
          type="submit"
          aria-label={`Retirer ${inscrit.email} de la liste`}
          className="grid size-11 place-items-center rounded-full text-ink-3 transition-colors hover:bg-muted hover:text-bad"
        >
          <X aria-hidden className="size-4" strokeWidth={1.75} />
        </button>
      </form>
    </li>
  );
}

function Avertissement({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div className="card-soft mt-8 p-6 sm:p-8">
      <h1 className="display text-[1.6rem] text-ink">{titre}</h1>
      <p className="mt-3 leading-relaxed text-ink-2">{children}</p>
    </div>
  );
}
