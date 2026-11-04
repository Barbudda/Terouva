import Link from "next/link";
import { CadreGuide } from "@/components/guides/CadreGuide";
import { guide } from "@/lib/catalogue";
import { pageMetadata } from "@/lib/seo";

const GUIDE = guide("/guides/louer-sans-garant");

export const metadata = pageMetadata({
  titre: GUIDE.titreSeo,
  description: GUIDE.description,
  chemin: GUIDE.chemin,
  type: "article",
  publieLe: GUIDE.publieLe,
  modifieLe: GUIDE.modifieLe,
});

/*
 * Chaque question porte sa réponse autonome, de 40 à 60 mots, dans le premier
 * paragraphe. Le développement qui suit apporte le détail, la façon de le dire
 * et les liens, sans reprendre la réponse : la relecture a refusé un guide où
 * l'ancien paragraphe redisait la même chose juste en dessous.
 */
export default function GuideLouerSansGarant() {
  return (
    <CadreGuide guide={GUIDE}>
      <p>
        « Il me faut un garant » est la phrase qui arrête le plus de candidatures, souvent avant la
        visite. Elle est présentée comme une règle, alors qu&apos;
        <strong>aucun texte n&apos;oblige un locataire à présenter une caution</strong>. Le
        propriétaire est libre de l&apos;exiger, et trois dispositifs permettent d&apos;y répondre
        sans mobiliser un proche.
      </p>

      <h2 id="pas-obligatoire">Un garant est-il obligatoire pour louer ?</h2>
      <p>
        Non. Aucun texte n&apos;impose à un locataire de présenter une caution : c&apos;est le
        propriétaire qui décide d&apos;en exiger une, et il reste libre de choisir son locataire.
        Deux limites s&apos;imposent à lui, selon qu&apos;il est déjà assuré contre les impayés ou
        qu&apos;il s&apos;agit d&apos;une personne morale.
      </p>
      <p>
        La loi encadre surtout ce qu&apos;un propriétaire peut <em>demander</em> comme
        justificatifs. Sur les garanties, elle ne pose que ces deux limites :
      </p>
      <ul>
        <li>
          S&apos;il a déjà souscrit une assurance contre les loyers impayés, il{" "}
          <strong>ne peut plus exiger de caution</strong>, sauf d&apos;un étudiant ou d&apos;un
          apprenti.
        </li>
        <li>
          S&apos;il est une personne morale (hors société civile familiale), il ne peut demander
          une caution que si elle vient d&apos;un organisme dont la liste est fixée par décret, ou
          si vous êtes étudiant sans bourse de l&apos;enseignement supérieur.
        </li>
      </ul>
      <p>
        Le reste du temps, la question se contourne plutôt qu&apos;elle ne se conteste. Les trois
        voies suivent, dans l&apos;ordre de ce qui aboutit.
      </p>

      <h2 id="visale">La garantie Visale remplace-t-elle un garant ?</h2>
      <p>
        Oui. Visale est une caution portée par Action Logement, gratuite, qui se substitue à un
        garant personnel auprès du propriétaire. C&apos;est la seule qui se demande{" "}
        <strong>avant</strong> d&apos;avoir trouvé le logement : vous obtenez un visa en ligne, que
        vous présentez avec votre dossier.
      </p>
      <p>
        La question du garant est alors réglée avant d&apos;être posée, ce qui change l&apos;ordre
        de la conversation en visite. Les conditions dépendent de l&apos;âge, du statut et du
        loyer. Elles couvrent largement les locataires de 30 ans et moins, les salariés récemment
        embauchés ou mutés, et les travailleurs saisonniers. Le détail, les plafonds de loyer et la
        marche à suivre sont dans le guide de la{" "}
        <Link href="/guides/garantie-visale">garantie Visale</Link>.
      </p>
      <div className="note">
        <p>
          Visale règle la question du garant ; le dossier reste à faire. Le propriétaire regarde
          toujours vos ressources et la cohérence de l&apos;ensemble. Si votre{" "}
          <Link href="/guides/dossier-de-location">dossier</Link> est incomplet, le visa ne le
          compensera pas.
        </p>
      </div>

      <h2 id="assurance">Un propriétaire assuré peut-il exiger un garant ?</h2>
      <p>
        Non, sauf si le locataire est étudiant ou apprenti. Un propriétaire particulier qui a
        souscrit une assurance contre les risques locatifs n&apos;a plus le droit de demander une
        caution. Beaucoup réclament les deux par habitude, sans savoir que ce cumul leur est
        interdit.
      </p>
      <p>
        C&apos;est la voie que presque personne ne mentionne, et elle ne coûte rien. La façon de le
        dire compte : posez une question plutôt que d&apos;invoquer la loi. « Êtes-vous assuré
        contre les loyers impayés ? Si oui, mon dossier tient sans garant. » Vous lui laissez la
        sortie, et vous vous épargnez un refus de principe.
      </p>

      <h2 id="societes">Combien coûte une société de cautionnement ?</h2>
      <p>
        Chaque société fixe son propre tarif, et nous n&apos;avons pas de grille officielle à vous
        donner. Demandez le coût total sur la durée du bail, pas un tarif au mois, qui donne une
        idée fausse de la dépense. Vérifiez aussi que le propriétaire accepte l&apos;organisme
        avant de payer.
      </p>
      <p>
        Ces sociétés privées se portent garant à votre place, contre rémunération. C&apos;est la
        solution de dernier recours : elle fonctionne quand les deux précédentes ne
        s&apos;appliquent pas, et vous payez tant que la garantie court. Un prix présenté « à
        partir de quelques euros par mois » se chiffre tout autrement sur trois ans, et certains
        propriétaires refusent les cautions privées : vous auriez payé pour rien.
      </p>

      <h2 id="etudiant">Un étudiant peut-il louer sans garant ?</h2>
      <p>
        Oui, et c&apos;est la situation la mieux couverte. Visale est ouverte aux locataires de 30
        ans et moins. Un bailleur personne morale ne peut demander à un étudiant boursier
        qu&apos;une caution venue d&apos;un organisme dont la liste est fixée par décret. Et
        l&apos;avance Loca-Pass prête jusqu&apos;à 1&nbsp;200&nbsp;€ sans intérêts pour le dépôt de
        garantie.
      </p>
      <p>
        Chacun de ces dispositifs a ses limites : Visale reste soumise à des conditions de loyer,
        le dossier et le dépôt de garantie restent dus, et l&apos;avance Loca-Pass d&apos;Action
        Logement se rembourse sur 25 mois au maximum.
      </p>
      <p>
        Trois dispositifs à demander dans cet ordre : Visale pour le garant, Loca-Pass pour le
        dépôt, et les aides au logement une fois installé. Chacun a ses propres conditions :
        vérifiez-les auprès d&apos;Action Logement et de la Caf avant de compter sur les trois.
      </p>

      <h2 id="dire">Que répondre quand on vous demande un garant ?</h2>
      <p>
        Trois phrases, dans cet ordre. D&apos;abord le fait, sans justification ni récit de
        famille. Ensuite ce qui remplace le garant, concrètement : un visa Visale déjà obtenu vaut
        mieux qu&apos;une intention. Enfin le reste du dossier, métier, contrat et revenu, qui
        décide une fois la question du garant écartée.
      </p>
      <p>Ce que cela donne, phrase par phrase :</p>
      <ol>
        <li>« Je n&apos;ai pas de garant personnel. »</li>
        <li>
          « J&apos;ai la garantie Visale, visa obtenu, que je peux vous transmettre tout de
          suite. »
        </li>
        <li>Votre métier, votre type de contrat, votre revenu net, et un dossier complet.</li>
      </ol>
      <p>
        Le{" "}
        <Link href="/outils/message-de-candidature">générateur de message de candidature</Link>{" "}
        place ces éléments dans cet ordre, et le guide{" "}
        <Link href="/guides/garant-caution">garant et acte de cautionnement</Link> détaille ce
        qu&apos;un garant signe vraiment, si vous finissez par en trouver un.
      </p>

      <h2 id="refus">Peut-on refuser mon dossier à cause de mon garant ?</h2>
      <p>
        Pas pour n&apos;importe quelle raison. Un propriétaire qui exige une caution{" "}
        <strong>ne peut pas refuser la vôtre</strong> parce qu&apos;elle n&apos;a pas la
        nationalité française ou qu&apos;elle habite hors de la métropole, en outre-mer comme à
        l&apos;étranger : l&apos;article 22-1 de la loi du 6 juillet 1989 l&apos;interdit.
      </p>
      <p>
        Ce qui est permis, ce qui ne l&apos;est pas et comment le prouver sont dans le guide sur le{" "}
        <Link href="/guides/refus-de-dossier">refus de dossier</Link>.
      </p>
    </CadreGuide>
  );
}
