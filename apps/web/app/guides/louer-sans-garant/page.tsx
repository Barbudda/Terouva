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
});

export default function GuideLouerSansGarant() {
  return (
    <CadreGuide guide={GUIDE}>
      <p>
        « Il me faut un garant » est la phrase qui arrête le plus de candidatures, souvent avant la
        visite. Elle est présentée comme une règle. Ce n&apos;en est pas une :{" "}
        <strong>aucun texte n&apos;oblige un locataire à présenter une caution</strong>. C&apos;est
        une exigence du propriétaire, qu&apos;il est libre de poser, et à laquelle trois dispositifs
        permettent de répondre sans mobiliser un proche.
      </p>

      <h2 id="pas-obligatoire">Ce n&apos;est pas une obligation légale</h2>
      <p>
        La loi encadre ce qu&apos;un propriétaire peut <em>demander</em> comme justificatifs, pas
        ce qu&apos;il peut <em>exiger</em> comme garanties. Il choisit librement son locataire et
        n&apos;a pas à motiver un refus. Deux limites s&apos;imposent quand même à lui :
      </p>
      <ul>
        <li>
          S&apos;il a déjà souscrit une assurance contre les loyers impayés, il{" "}
          <strong>ne peut plus exiger de caution</strong>, sauf d&apos;un étudiant ou d&apos;un
          apprenti.
        </li>
        <li>
          S&apos;il est une personne morale, il ne peut pas demander de caution à un étudiant
          boursier de l&apos;enseignement supérieur.
        </li>
      </ul>
      <p>
        Le reste du temps, la question se contourne plutôt qu&apos;elle ne se conteste. Dans
        l&apos;ordre de ce qui aboutit.
      </p>

      <h2 id="visale">Visale, à demander avant de visiter</h2>
      <p>
        La garantie Visale est une caution portée par Action Logement.{" "}
        <strong>Elle est gratuite</strong>, et c&apos;est la seule qui se demande{" "}
        <strong>avant</strong> d&apos;avoir trouvé le logement : vous obtenez un visa en ligne, que
        vous présentez avec votre dossier. La question du garant est alors réglée avant
        d&apos;être posée, ce qui change l&apos;ordre de la conversation en visite.
      </p>
      <p>
        Les conditions dépendent de l&apos;âge, du statut et du loyer. Elles couvrent largement les
        moins de 30 ans, les salariés récemment embauchés ou mutés, et les travailleurs
        saisonniers. Le détail, les plafonds de loyer et la marche à suivre sont dans le guide de la{" "}
        <Link href="/guides/garantie-visale">garantie Visale</Link>.
      </p>
      <div className="note">
        <p>
          Visale remplace le garant, pas le dossier. Le propriétaire regarde toujours vos
          ressources et la cohérence de l&apos;ensemble. Si votre{" "}
          <Link href="/guides/dossier-de-location">dossier</Link> est incomplet, le visa ne le
          compensera pas.
        </p>
      </div>

      <h2 id="assurance">Le propriétaire déjà assuré</h2>
      <p>
        C&apos;est la voie que presque personne ne mentionne, et elle ne coûte rien. Un
        propriétaire particulier qui a souscrit une assurance contre les risques locatifs{" "}
        <strong>n&apos;a plus le droit d&apos;exiger une caution</strong>, sauf si le locataire est
        étudiant ou apprenti. Beaucoup demandent les deux par habitude, sans savoir que le cumul
        leur est interdit.
      </p>
      <p>
        La façon de le dire compte. Pas « vous n&apos;avez pas le droit », mais une question :
        « êtes-vous assuré contre les loyers impayés ? Si oui, mon dossier tient sans garant. »
        Vous lui laissez la sortie, et vous vous épargnez un refus de principe.
      </p>

      <h2 id="societes">Les sociétés de cautionnement</h2>
      <p>
        Des sociétés privées se portent garant à votre place, contre un pourcentage du loyer
        annuel, prélevé chaque année du bail. C&apos;est la solution de dernier recours : elle
        fonctionne quand les deux précédentes ne s&apos;appliquent pas, mais elle est payante et le
        coût court sur toute la durée de la location.
      </p>
      <p>
        Un réflexe avant de signer : demandez le <strong>coût total sur la durée du bail</strong>,
        pas le tarif mensuel. Un pourcentage annuel présenté « à partir de quelques euros par
        mois » se chiffre tout autrement sur trois ans. Vérifiez aussi que le propriétaire accepte
        l&apos;organisme : certains refusent les cautions privées, et vous auriez payé pour rien.
      </p>

      <h2 id="etudiant">Le cas des étudiants</h2>
      <p>
        C&apos;est la situation la mieux couverte, ce qui surprend souvent. Visale s&apos;adresse
        en priorité aux moins de 30 ans. Un bailleur personne morale ne peut rien exiger d&apos;un
        boursier de l&apos;enseignement supérieur. Et pour le dépôt de garantie, l&apos;avance
        Loca-Pass d&apos;Action Logement prête jusqu&apos;à 1 200 €, sans intérêts, remboursables
        sur 25 mois au maximum.
      </p>
      <p>
        Trois dispositifs publics, cumulables, à demander dans cet ordre : Visale pour le garant,
        Loca-Pass pour le dépôt, et les aides au logement une fois installé.
      </p>

      <h2 id="dire">Quoi répondre quand on vous demande un garant</h2>
      <p>
        Le message compte autant que la solution. Trois phrases suffisent, dans cet ordre :
      </p>
      <ol>
        <li>
          <strong>Le fait, pas l&apos;excuse.</strong> « Je n&apos;ai pas de garant personnel. »
          Pas de justification, pas de récit de famille.
        </li>
        <li>
          <strong>Ce qui le remplace, concrètement.</strong> « J&apos;ai la garantie Visale, visa
          obtenu, que je peux vous transmettre tout de suite. » Un visa déjà en main vaut mieux
          qu&apos;une intention.
        </li>
        <li>
          <strong>Le reste du dossier.</strong> Métier, type de contrat, revenu net, dossier
          complet. C&apos;est ce qui décide une fois la question du garant écartée.
        </li>
      </ol>
      <p>
        Le{" "}
        <Link href="/outils/message-de-candidature">générateur de message de candidature</Link>{" "}
        place ces éléments dans cet ordre, et le guide{" "}
        <Link href="/guides/garant-caution">garant et acte de cautionnement</Link> détaille ce
        qu&apos;un garant signe vraiment, si vous finissez par en trouver un.
      </p>

      <h2 id="refus">Si le refus porte sur le garant lui-même</h2>
      <p>
        Dernier point, rarement connu : le <strong>lieu de résidence du garant est un critère
        protégé</strong>. Écarter une candidature parce que la caution habite une autre région, un
        département d&apos;outre-mer ou une commune jugée indésirable est une discrimination, pas
        une exigence de gestion. Ce qui est permis, ce qui ne l&apos;est pas et comment le prouver
        sont dans le guide sur le{" "}
        <Link href="/guides/refus-de-dossier">refus de dossier</Link>.
      </p>
    </CadreGuide>
  );
}
