import Link from "next/link";

/**
 * Corps de l'article « DPE recalculé : lire l'étiquette d'une annonce ». Brief :
 * docs/seo/blog/briefs/dpe-recalcule-lire-l-etiquette-d-une-annonce.md.
 *
 * Faits relevés le 2026-11-04 : Service-public A18446 (publiée le
 * 2026-09-01), F16096 (vérifiée le 2026-01-01), F13723 (vérifiée le
 * 2026-10-15), outil R67366 (vérifié le 2026-02-23) ; Code de la construction,
 * art. R126-21 à R126-24 ; loi du 6 juillet 1989, art. 17-1 (Légifrance).
 *
 * Écarté faute de source sur le point précis : ce que deviennent les annonces
 * déjà publiées au 1er janvier 2027, et la nouvelle classe « A0 » (hors sujet
 * pour un locataire, selon F16096 elle vise « certains bâtiments »).
 */
export default function DpeRecalculeEtiquetteAnnonce() {
  return (
    <>
      <p>
        L&apos;étiquette énergétique d&apos;une annonce est l&apos;une des rares informations
        chiffrées que vous lisez avant la visite. Elle dit combien coûtera le chauffage, et elle a
        des conséquences juridiques sur le loyer. Au 1er janvier 2027, son calcul change pour les
        logements chauffés à l&apos;électricité. Voici comment la lire, et ce que ce changement
        modifie pour vous.
      </p>

      <h2 id="annonce">Que doit afficher une annonce de location sur l&apos;énergie ?</h2>
      <p>
        Le Code de la construction impose trois informations dans toute annonce de location
        d&apos;un logement soumis au diagnostic de performance énergétique (DPE) :
      </p>
      <ul>
        <li>
          la <strong>classe énergie</strong>, de A à G, qui mesure la consommation ;
        </li>
        <li>
          la <strong>classe climat</strong>, de A à G, qui mesure les émissions de gaz à effet de
          serre ;
        </li>
        <li>
          le « <strong>montant estimé des dépenses annuelles d&apos;énergie pour un usage
          standard</strong> », avec l&apos;année de référence des prix utilisés.
        </li>
      </ul>
      <p>
        Sur une annonce en ligne, les deux classes doivent apparaître de façon lisible et en
        couleur. Et quand le logement ne respecte pas le seuil de consommation fixé par la loi,
        l&apos;annonce doit porter la mention « Logement à consommation énergétique excessive ».
      </p>

      <h2 id="lettre">Que change la lettre du DPE pour un locataire ?</h2>
      <p>Trois choses, et la troisième est la plus méconnue :</p>
      <ul>
        <li>
          <strong>Classe G</strong> : depuis le 1er janvier 2025, en France métropolitaine, un
          logement classé G ne peut plus être proposé à la location. Les logements classés F
          suivront le 1er janvier 2028, et les logements classés E le 1er janvier 2034.
        </li>
        <li>
          <strong>Les dépenses</strong> : le montant estimé donne un ordre de grandeur pour un usage
          standard. Votre facture réelle dépendra de votre façon de vivre, mais deux annonces se
          comparent sur ce chiffre.
        </li>
        <li>
          <strong>Classes F et G : le loyer ne peut pas être révisé</strong>. Pour un bail signé,
          renouvelé ou reconduit depuis le 24 août 2022 en métropole, la révision annuelle et la
          majoration pour travaux sont interdites dans un logement classé F ou G.
        </li>
      </ul>

      <h2 id="nouveau-calcul">Qu&apos;est-ce qui change au 1er janvier 2027 ?</h2>
      <p>
        Le DPE convertit l&apos;électricité consommée en énergie « primaire », celle qu&apos;il a
        fallu produire pour la fournir, à l&apos;aide d&apos;un coefficient. Ce coefficient est
        passé de 2,3 à 1,9 le 1er janvier 2026. Un arrêté du 19 août 2026 le ramène à{" "}
        <strong>1,7 au 1er janvier 2027</strong>.
      </p>
      <p>
        Conséquence selon Service-public : l&apos;étiquette d&apos;un logement qui utilise beaucoup
        l&apos;électricité (chauffage, eau chaude, climatisation) peut s&apos;améliorer d&apos;une
        classe, et de deux dans de rares cas (de petits logements). Certains
        logements sortiront ainsi du statut de « passoire énergétique » (classes F et G). Aucune
        étiquette ne se dégrade du fait de ce changement.
      </p>

      <h2 id="annonces-janvier">Une annonce peut-elle afficher une étiquette dépassée ?</h2>
      <p>
        Un DPE reste valable dix ans. Les DPE réalisés avant le 1er janvier 2027 ne sont donc pas
        refaits d&apos;office : ils restent valables avec l&apos;ancien calcul. Si le nouveau calcul
        améliore le classement, le propriétaire peut mettre son DPE à jour gratuitement, sans
        nouvelle visite du diagnostiqueur, sur le service de l&apos;Ademe.
      </p>
      <p>
        Pour vous, cela veut dire qu&apos;une annonce de début 2027 peut afficher une lettre
        calculée avant le changement. Un logement chauffé à l&apos;électricité affiché F ou G peut
        avoir droit à une meilleure étiquette que son propriétaire n&apos;a pas encore demandée.
        L&apos;inverse ne peut pas arriver.
      </p>

      <h2 id="verifier">Comment vérifier le DPE d&apos;un logement ?</h2>
      <p>
        Le propriétaire doit vous remettre le DPE avec le bail, et ce DPE doit dater de moins de
        dix ans à la signature. Chaque DPE porte un numéro attribué par l&apos;Ademe : sans lui, le
        diagnostic n&apos;est pas valable. Avec ce numéro, l&apos;outil{" "}
        <a
          href="https://www.service-public.gouv.fr/particuliers/vosdroits/R67366"
          target="_blank"
          rel="noopener"
        >
          « Vérifier son DPE »
        </a>{" "}
        signalé par Service-public permet de le retrouver.
      </p>
      <p>
        Deux cas particuliers à connaître : les DPE réalisés entre le 1er janvier 2018 et le
        30 juin 2021 ne sont plus valables depuis le 1er janvier 2025, et les seuils ont été adaptés
        depuis le 1er juillet 2024 pour les logements de 40 m² ou moins.
      </p>

      <h2 id="repondre">Faut-il répondre à une annonce classée F ou G ?</h2>
      <p>
        Une annonce classée G en métropole appelle une question avant la visite : depuis le
        1er janvier 2025, un tel logement ne peut plus être proposé à la location. Une
        annonce classée F reste louable jusqu&apos;au 1er janvier 2028, avec un loyer qui ne peut
        pas être révisé, mais des dépenses d&apos;énergie à regarder de près.
      </p>
      <p>
        Dans tous les cas, la lettre ne remplace pas la réponse rapide : les bons logements partent
        vite. Lisez l&apos;étiquette en même temps que le loyer, puis écrivez. Le guide pour{" "}
        <Link href="/guides/repondre-a-une-annonce-de-location">
          répondre à une annonce de location
        </Link>{" "}
        dit quoi mettre dans le premier message, et le{" "}
        <Link href="/outils/message-de-candidature">générateur de message de candidature</Link>{" "}
        l&apos;écrit avec vous. Gardez votre{" "}
        <Link href="/guides/dossier-de-location">dossier de location</Link> prêt pour la suite.
      </p>
    </>
  );
}
