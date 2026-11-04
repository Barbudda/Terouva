import Link from "next/link";
import { CadreGuide } from "@/components/guides/CadreGuide";
import { guide } from "@/lib/catalogue";
import { pageMetadata } from "@/lib/seo";

const GUIDE = guide("/guides/depot-de-garantie");

export const metadata = pageMetadata({
  titre: GUIDE.titreSeo,
  description: GUIDE.description,
  chemin: GUIDE.chemin,
  type: "article",
  publieLe: GUIDE.publieLe,
});

export default function GuideDepotDeGarantie() {
  return (
    <CadreGuide guide={GUIDE}>
      <p>
        Le dépôt de garantie est la somme que vous avancez à la signature et qui vous revient à la
        fin, moins ce que le propriétaire est en droit de retenir. Trois choses sont encadrées par
        la loi : <strong>son montant</strong>, <strong>ce qui peut en être déduit</strong> et{" "}
        <strong>le délai pour vous le rendre</strong>. Le reste se négocie, ou se conteste.
      </p>

      <h2 id="montant">Quel est le montant maximum d&apos;un dépôt de garantie ?</h2>
      <p>Un mois de loyer hors charges au maximum pour un logement vide, deux mois pour un meublé. Aucun dépôt ne peut être exigé si le loyer est payé par trimestre d&apos;avance, ni pour un bail mobilité. Le plafond se calcule sur le loyer seul : les charges n&apos;entrent pas dans le calcul.</p>
      <p>Le détail, selon le type de location :</p>
      <ul>
        <li>
          <strong>Logement vide</strong> : un mois de loyer hors charges, au maximum.
        </li>
        <li>
          <strong>Logement meublé</strong> : deux mois de loyer hors charges, au maximum.
        </li>
        <li>
          <strong>Bail mobilité</strong> : aucun dépôt de garantie ne peut être demandé.
        </li>
      </ul>
      <p>
        « Hors charges » compte : sur un loyer de 750&nbsp;€ dont 60&nbsp;€ de charges, le plafond
        d&apos;un logement vide est 690&nbsp;€, pas 750&nbsp;€. Et si le bail prévoit un loyer payé
        par trimestre d&apos;avance, le propriétaire ne peut pas demander de dépôt du tout.
      </p>
      <div className="note">
        <p>
          Le dépôt de garantie n&apos;est pas la caution. La caution est une <em>personne</em> qui
          s&apos;engage à payer si vous ne payez pas : c&apos;est le{" "}
          <Link href="/guides/garant-caution">garant</Link>. Le dépôt est parfois appelé
          « caution » par erreur, ce qui entretient la confusion.
        </p>
      </div>

      <h2 id="versement">Quand faut-il payer le dépôt de garantie ?</h2>
      <p>À la signature du bail, et son montant doit y figurer. Un propriétaire qui le réclame avant la signature, pour « réserver » le logement, sort du cadre : à ce stade, rien ne vous engage et rien ne l&apos;engage. Le dépôt ne fait pas partie des pièces du dossier.</p>
      <p>
        À la signature du bail, et son montant doit être écrit dans le bail. Un propriétaire qui
        réclame le dépôt avant la signature, pour « réserver » le logement, sort du cadre : à ce
        stade, rien ne vous engage et rien ne l&apos;engage.
      </p>
      <p>
        Une fois le bail signé, le versement n&apos;est pas facultatif. Depuis le 1er octobre 2026,
        les modèles de bail prévoient sa résiliation si le dépôt n&apos;est pas versé, après un
        commandement de payer resté sans effet pendant six semaines.
      </p>
      <p>
        Le dépôt ne fait pas partie des pièces du dossier. Il n&apos;a pas à être évoqué avant que
        votre candidature soit retenue, et il ne remplace pas les justificatifs de la{" "}
        <Link href="/guides/dossier-de-location">liste autorisée</Link>.
      </p>

      <h2 id="retenues">Que peut retenir le propriétaire sur le dépôt de garantie ?</h2>
      <p>Trois choses, et chacune doit être justifiée par une pièce : les loyers, les charges et les sommes payées à votre place restés impayés, les dégradations constatées par rapport à l&apos;état des lieux d&apos;entrée, et les réparations locatives non faites. Une retenue annoncée sans devis, facture ni photo n&apos;a pas à être acceptée.</p>
      <p>À la fin du bail, le propriétaire peut déduire du dépôt :</p>
      <ul>
        <li>
          les loyers et les charges restés impayés, et les sommes que le propriétaire a dû payer à
          votre place ;
        </li>
        <li>
          les dégradations constatées, par comparaison avec l&apos;état des lieux d&apos;entrée ;
        </li>
        <li>les réparations locatives qui vous incombaient et que vous n&apos;avez pas faites.</li>
      </ul>
      <p>
        Chaque retenue doit être <strong>justifiée par une pièce</strong> : un devis, une facture,
        une photo. Une retenue annoncée sans justificatif, ou une somme forfaitaire « pour remise en
        état », n&apos;a pas à être acceptée.
      </p>
      <p>
        Une exception existe dans un immeuble collectif : le propriétaire peut conserver une provision
        n&apos;excédant pas 20&nbsp;% du dépôt, le temps que les comptes annuels de l&apos;immeuble
        soient approuvés. Le solde est alors dû dans le mois qui suit cette approbation.
      </p>
      <div className="note">
        <p>
          C&apos;est l&apos;état des lieux d&apos;entrée qui protège le dépôt. S&apos;il n&apos;a
          pas été fait, le locataire est présumé avoir reçu le logement en bon état, et la
          comparaison de sortie se fait contre cette présomption. Elle ne joue pas contre vous si
          c&apos;est le propriétaire qui a refusé de l&apos;établir malgré votre mise en demeure :
          le guide de l&apos;<Link href="/guides/etat-des-lieux">état des lieux</Link> détaille
          ce cas. Notez les défauts le jour de l&apos;entrée : c&apos;est cette description
          qui sert de comparaison à la sortie.
        </p>
      </div>

      <h2 id="restitution">Dans quel délai le dépôt de garantie doit-il être rendu ?</h2>
      <p>Un mois après la remise des clés si l&apos;état des lieux de sortie est conforme à celui d&apos;entrée, deux mois s&apos;il ne l&apos;est pas. Le délai court à partir de la remise des clés, en main propre ou par lettre recommandée, et non de votre départ effectif.</p>
      <p>
        Le délai court à partir de la remise des clés, en main propre ou par lettre recommandée :
      </p>
      <ul>
        <li>
          <strong>Un mois</strong> si l&apos;état des lieux de sortie est conforme à celui
          d&apos;entrée ;
        </li>
        <li>
          <strong>Deux mois</strong> s&apos;il ne l&apos;est pas.
        </li>
      </ul>
      <p>
        Pensez à laisser votre nouvelle adresse par écrit le jour de la remise des clés. Sans elle,
        le propriétaire ne peut pas vous envoyer la somme, et la majoration de retard ci-dessous ne
        s&apos;applique pas.
      </p>
      <p>
        Dernier point : le dépôt ne peut pas servir à payer le
        dernier mois de loyer. Ce loyer est dû normalement, et le dépôt vous revient après
        l&apos;état des lieux.
      </p>

      <h2 id="retard">Que se passe-t-il si le propriétaire rend le dépôt en retard ?</h2>
      <p>La somme due augmente de 10 % du loyer mensuel hors charges par mois de retard commencé : un seul jour de dépassement compte pour un mois entier. Cette majoration ne s&apos;applique pas si vous n&apos;avez pas communiqué votre nouvelle adresse au moment de rendre les clés.</p>
      <p>
        La somme due augmente de{" "}
        <strong>10&nbsp;% du loyer mensuel hors charges par mois de retard commencé</strong>.
        « Commencé » veut dire qu&apos;un jour de dépassement compte pour un mois entier.
      </p>
      <p>
        Sur un loyer de 800&nbsp;€ hors charges et un dépôt de 800&nbsp;€ rendu avec trois mois de
        retard : 10&nbsp;% de 800&nbsp;€ font 80&nbsp;€, multipliés par trois mois, soit 240&nbsp;€
        de majoration. Le propriétaire doit donc 1&nbsp;040&nbsp;€.
      </p>

      <h2 id="recuperer">Comment récupérer un dépôt de garantie non rendu ?</h2>
      <p>D&apos;abord une lettre recommandée avec accusé de réception qui réclame la somme et calcule la majoration. Jusqu&apos;à 5 000 € inclus, une tentative de règlement amiable est ensuite obligatoire, et gratuite : conciliateur de justice ou commission départementale de conciliation. Le tribunal vient en dernier.</p>
      <p>Dans l&apos;ordre, et sans sauter d&apos;étape :</p>
      <ol>
        <li>
          Une lettre recommandée avec accusé de réception qui réclame la somme, rappelle la date de
          remise des clés et calcule la majoration.
        </li>
        <li>
          Jusqu&apos;à 5&nbsp;000&nbsp;€ inclus, une tentative de règlement amiable est{" "}
          <strong>obligatoire</strong> avant le tribunal : conciliateur de justice ou commission
          départementale de conciliation, qui sont gratuits, ou médiateur, qui est payant.
        </li>
        <li>
          Puis le tribunal, saisi directement au-delà de 5&nbsp;000&nbsp;€. Vous avez trois ans à
          compter du jour où le dépôt aurait dû vous être rendu.
        </li>
      </ol>

      <h2 id="et-apres">Comment éviter un litige sur le dépôt de garantie ?</h2>
      <p>En soignant l&apos;état des lieux d&apos;entrée, le document auquel celui de sortie sera comparé, et en vérifiant que le bail mentionne le montant exact du dépôt. Tout ce qui se règle à la sortie se prépare à l&apos;entrée.</p>
      <p>
        Tout ce qui précède se joue à la sortie, mais se prépare à l&apos;entrée : un état des
        lieux détaillé, un bail qui mentionne le montant exact, et un dossier qui tient debout pour
        obtenir le logement sans avoir à céder sur le reste. La{" "}
        <Link href="/outils/dossier-de-location">checklist de dossier</Link> donne les pièces de
        votre situation, et le{" "}
        <Link href="/outils/message-de-candidature">générateur de message</Link> écrit la
        candidature qui les accompagne.
      </p>
    </CadreGuide>
  );
}
