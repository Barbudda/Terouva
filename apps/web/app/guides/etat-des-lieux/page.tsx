import Link from "next/link";
import { CadreGuide } from "@/components/guides/CadreGuide";
import { guide } from "@/lib/catalogue";
import { pageMetadata } from "@/lib/seo";

const GUIDE = guide("/guides/etat-des-lieux");

export const metadata = pageMetadata({
  titre: GUIDE.titreSeo,
  description: GUIDE.description,
  chemin: GUIDE.chemin,
  type: "article",
  publieLe: GUIDE.publieLe,
});

export default function GuideEtatDesLieux() {
  return (
    <CadreGuide guide={GUIDE}>
      <p>
        L&apos;état des lieux est le document le plus expédié de toute la location, et le seul qui
        protège votre <Link href="/guides/depot-de-garantie">dépôt de garantie</Link>. Tout ce qui
        n&apos;est pas noté le jour de l&apos;entrée sera réputé en bon état le jour de la sortie.
        La demi-heure que vous y passez se compte en centaines d&apos;euros, dans un sens ou dans
        l&apos;autre.
      </p>

      <h2 id="pourquoi">Ce qui se joue</h2>
      <p>
        À la fin du bail, le propriétaire compare les deux états des lieux. L&apos;écart entre les
        deux détermine ce qu&apos;il peut retenir sur votre dépôt. Un état des lieux
        d&apos;entrée vague ne décrit rien, donc ne prouve rien, et l&apos;écart se lit contre
        vous.
      </p>
      <p>
        C&apos;est aussi pour ça qu&apos;il n&apos;existe pas de « petit » état des lieux. Une
        rayure sur un parquet, une trace sur un mur, un joint noirci : notés à l&apos;entrée, ce
        sont des faits acquis. Oubliés, ce sont vos dégradations.
      </p>

      <h2 id="entree">L&apos;état des lieux d&apos;entrée</h2>
      <p>
        Il se fait <strong>à deux</strong>, propriétaire et locataire présents, au moment de la
        remise des clés et en pleine lumière. Trois formes sont possibles : entre vous deux, avec
        un professionnel qui représente le propriétaire, ou par un commissaire de justice si
        l&apos;une des parties refuse de venir ou de signer. Dans ce dernier cas, il doit prévenir
        par lettre recommandée au moins sept jours à l&apos;avance.
      </p>
      <p>
        Quelques réflexes qui ne coûtent rien et changent tout :
      </p>
      <ul>
        <li>
          <strong>Venir de jour.</strong> Un état des lieux fait le soir, à la lampe du téléphone,
          ne montre ni les taches ni les fissures.
        </li>
        <li>
          <strong>Ouvrir et tester.</strong> Robinets, chasse d&apos;eau, volets, radiateurs,
          prises, plaques. Un équipement en panne noté à l&apos;entrée est une réparation du
          propriétaire, découvert plus tard c&apos;est une discussion.
        </li>
        <li>
          <strong>Photographier.</strong> Les photos datées sont autorisées et peuvent être
          annexées. Elles tranchent un désaccord mieux que l&apos;adjectif « bon état », qui ne
          veut rien dire deux ans plus tard.
        </li>
        <li>
          <strong>Relever les compteurs soi-même.</strong> Eau, gaz, électricité, et les comparer à
          ce qui est écrit.
        </li>
      </ul>

      <h2 id="contenu">Ce qu&apos;il doit contenir</h2>
      <p>
        Le contenu minimum est fixé par décret. Un document qui n&apos;en fait pas le tour est
        contestable :
      </p>
      <ul>
        <li>le type d&apos;état des lieux et sa date ;</li>
        <li>l&apos;adresse du logement ;</li>
        <li>le nom des parties, et le domicile ou le siège du bailleur ;</li>
        <li>le nom et l&apos;adresse du mandataire, s&apos;il y en a un ;</li>
        <li>le relevé des compteurs individuels, quand les charges ne sont pas au forfait ;</li>
        <li>les clés et autres moyens d&apos;accès remis ;</li>
        <li>
          la description précise, <strong>pièce par pièce</strong>, des sols, murs, plafonds,
          équipements et meubles, avec les observations et photos éventuelles ;
        </li>
        <li>les signatures des deux parties.</li>
      </ul>
      <p>
        Il doit être écrit, sur papier ou sous forme électronique, et remis à chacun à la
        signature. Deux présentations sont admises : un document unique avec une colonne
        « entrée » et une colonne « sortie » par pièce, ou deux documents de présentation
        similaire, pour que la comparaison reste possible.
      </p>
      <p>
        En meublé, un <strong>inventaire détaillé du mobilier</strong> s&apos;ajoute, signé par les
        deux parties et annexé au bail.
      </p>

      <h2 id="cout">Qui paie</h2>
      <ul>
        <li>
          <strong>Fait entre vous deux</strong> : gratuit, à l&apos;entrée comme à la sortie.
        </li>
        <li>
          <strong>À l&apos;entrée, avec un professionnel</strong> : le locataire en paie une part,
          plafonnée à la fois à la moitié des honoraires de l&apos;agence et à{" "}
          <strong>3,03 € TTC par mètre carré habitable</strong>. Sur 25 m² avec 170 € d&apos;honoraires,
          le plafond est de 75,75 €, pas 85 €.
        </li>
        <li>
          <strong>À la sortie</strong> : le locataire ne paie <strong>rien</strong> pour les
          honoraires de l&apos;agence. Une clause du bail qui le prévoirait est réputée non
          écrite.
        </li>
        <li>
          <strong>Par commissaire de justice</strong> : les tarifs sont réglementés et dépendent de
          la surface, et le total est partagé par moitié entre le locataire et le propriétaire. Le
          secrétariat du tribunal compétent les vérifie gratuitement.
        </li>
      </ul>

      <h2 id="corriger">Les dix jours pour corriger</h2>
      <p>
        Signer ne ferme pas le dossier. Le locataire dispose de{" "}
        <strong>dix jours à compter de la date de l&apos;état des lieux</strong> pour en demander
        la modification. Pour les équipements de chauffage, la demande reste possible pendant le
        premier mois de la saison de chauffe, puisqu&apos;un radiateur ne se teste pas en juillet.
      </p>
      <p>
        Si le propriétaire refuse la modification, la commission départementale de conciliation
        peut être saisie, gratuitement. C&apos;est la soupape à retenir quand on a signé trop vite,
        le jour du déménagement, entre deux cartons.
      </p>

      <h2 id="sortie">L&apos;état des lieux de sortie</h2>
      <p>
        Il se fait au moment où vous quittez définitivement le logement, ou très peu de temps
        après, dans la même forme que celui d&apos;entrée. Fixez la date par écrit, de préférence
        par lettre recommandée : c&apos;est ce qui vous protège si le propriétaire ne vient pas.
      </p>
      <p>
        Il reprend les mêmes mentions, plus trois qui comptent : <strong>votre nouvelle
        adresse</strong>, la date de l&apos;état des lieux d&apos;entrée, et les évolutions
        constatées depuis. Laissez bien la nouvelle adresse : sans elle, le propriétaire ne peut
        pas vous envoyer le dépôt, et la majoration de retard ne s&apos;applique pas.
      </p>
      <p>
        <strong>Si le propriétaire ne se présente pas</strong>, restituez les clés par lettre
        recommandée avec accusé de réception. En l&apos;absence d&apos;état des lieux de sortie,
        vous êtes considéré comme ayant rendu le logement en bon état, et le délai de restitution
        du dépôt court à partir de la remise des clés.
      </p>

      <h2 id="vetuste">La vétusté n&apos;est pas une dégradation</h2>
      <p>
        L&apos;usure normale, due au temps et à un usage normal, <strong>ne peut donner lieu à
        aucune retenue</strong> sur le dépôt de garantie. Une moquette fatiguée après huit ans, une
        peinture ternie, un joint de silicone à refaire relèvent de la vétusté, pas de votre
        responsabilité.
      </p>
      <p>
        Pour éviter la discussion au départ, le bail peut prévoir une <strong>grille de
        vétusté</strong> : elle fixe à l&apos;avance la durée de vie des équipements et la part qui
        reste à la charge de chacun selon l&apos;ancienneté. Si le bail en contient une, lisez-la à
        l&apos;entrée, pas à la sortie.
      </p>

      <h2 id="absence">S&apos;il n&apos;y a pas d&apos;état des lieux d&apos;entrée</h2>
      <p>La règle dépend de qui l&apos;a empêché, et elle est tranchée :</p>
      <ul>
        <li>
          <strong>Le propriétaire a refusé</strong>, malgré une mise en demeure restée sans
          réponse : c&apos;est à lui de prouver qu&apos;il vous a remis un logement en bon état
          pour pouvoir retenir quoi que ce soit.
        </li>
        <li>
          <strong>Vous avez refusé</strong>, ou les deux parties ont négligé de le faire : vous
          êtes présumé avoir reçu le logement en bon état de réparations locatives, et devoir le
          rendre ainsi. La preuve contraire reste possible, par exemple avec des photos réalisées
          par un commissaire de justice.
        </li>
      </ul>
      <p>
        Autrement dit : l&apos;absence d&apos;état des lieux profite presque toujours au
        propriétaire. S&apos;il ne le propose pas, demandez-le par écrit.
      </p>

      <h2 id="litige">En cas de désaccord</h2>
      <p>
        En dessous de <strong>5 000 €</strong>, une tentative de règlement amiable est obligatoire
        avant le tribunal, et elle est gratuite : commission départementale de conciliation ou
        conciliateur de justice. Au-delà, le juge des contentieux de la protection peut être saisi
        directement. Dans tous les cas, vous avez <strong>trois ans</strong> à compter du jour où
        le litige est né.
      </p>
      <p>
        Les montants, les délais de restitution et le calcul de la majoration de retard sont
        détaillés dans le guide du{" "}
        <Link href="/guides/depot-de-garantie">dépôt de garantie</Link>. Et si vous préparez votre
        départ, le guide du{" "}
        <Link href="/guides/preavis-location">préavis de location</Link> donne le calendrier à
        tenir.
      </p>
    </CadreGuide>
  );
}
