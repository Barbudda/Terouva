import Link from "next/link";

/**
 * Corps de l'article « âge limite pour se porter garant ». Réponse courte et
 * fondée : aucun âge maximum, deux limites de capacité (art. 1145 et 1146 du
 * Code civil), puis ce qui compte pour un garant retraité.
 *
 * Non sourcé au 2026-11-04, donc absent : une décision qui qualifierait de
 * discriminatoire le refus d'une caution à cause de son âge. L'article cite
 * l'âge parmi les critères de l'article 225-1 et s'arrête là.
 */
export default function AgeLimiteGarant() {
  return (
    <>
      <p>
        La question revient souvent quand le garant envisagé est un parent à la retraite, ou un
        grand-parent : est-il trop âgé pour se porter caution ? La réponse tient dans deux articles
        du Code civil. Le reste dépend de ses ressources et de la façon dont l&apos;acte est rédigé.
      </p>

      <h2 id="maximum">Y a-t-il un âge maximum pour se porter garant ?</h2>
      <p>
        Non. L&apos;<span className="loi">article 1145</span> du Code civil pose que « toute
        personne physique peut contracter sauf en cas d&apos;incapacité prévue par la loi », et
        aucun texte sur la location ne fixe d&apos;âge maximum pour la caution. L&apos;
        <span className="loi">article 22-1</span> de la loi du 6 juillet 1989, qui encadre le
        cautionnement d&apos;un locataire, parle du contenu de l&apos;acte et de la durée de
        l&apos;engagement, jamais de l&apos;âge de la personne qui signe.
      </p>

      <h2 id="minimum">Et un âge minimum ?</h2>
      <p>
        Oui, en pratique. L&apos;<span className="loi">article 1146</span> range parmi les
        personnes incapables de contracter « les mineurs non émancipés » et « les majeurs protégés
        au sens de l&apos;article 425 ». Un mineur non émancipé ne peut donc pas être caution.
        Une personne sous tutelle ou sous curatelle relève de règles propres à sa mesure de
        protection : avant de lui faire signer un acte de cautionnement, renseignez-vous auprès de
        la personne chargée de la mesure.
      </p>

      <h2 id="refus">Un propriétaire peut-il refuser un garant parce qu&apos;il est âgé ?</h2>
      <p>
        Le propriétaire choisit son locataire et apprécie les garanties qu&apos;on lui présente. Il
        peut écarter une caution dont les ressources ne couvrent pas le loyer, quel que soit son
        âge. L&apos;âge figure en revanche parmi les critères de discrimination de l&apos;
        <span className="loi">article 225-1</span> du Code pénal.
      </p>
      <p>
        Les textes que nous avons lus ne disent pas comment ce critère s&apos;applique quand c&apos;est
        l&apos;âge du garant, et non celui du candidat, qui motive un refus. La loi de 1989 est
        explicite sur un seul cas : le propriétaire qui exige une caution ne peut pas la refuser
        parce qu&apos;elle n&apos;a pas la nationalité française ou qu&apos;elle ne réside pas en
        métropole. En cas de doute sur un refus, le Défenseur des droits peut être saisi
        gratuitement ; les démarches sont dans le guide sur le{" "}
        <Link href="/guides/refus-de-dossier">refus de dossier</Link>.
      </p>

      <h2 id="retraite">Quelles pièces doit fournir un garant retraité ?</h2>
      <p>
        Les mêmes catégories que tout garant : identité, domicile, situation professionnelle et
        ressources, dans la liste limitative du décret du 5 novembre 2015. Pour les ressources, la
        liste prévoit le justificatif de versement des retraites et pensions des trois derniers
        mois, ou le dernier avis d&apos;imposition. Le propriétaire ne peut rien exiger d&apos;autre,
        et surtout pas un relevé de compte.
      </p>
      <p>
        Le reste se joue dans l&apos;acte. La caution écrit elle-même le montant maximal de son
        engagement, en lettres et en chiffres, et l&apos;acte dit s&apos;il est à durée déterminée
        ou non. Un engagement sans durée peut être résilié à tout moment, avec effet à la fin du
        bail en cours. Le guide{" "}
        <Link href="/guides/garant-caution">garant de location</Link> détaille ce que l&apos;acte
        doit contenir.
      </p>

      <h2 id="deces">Que devient l&apos;engagement si le garant décède ?</h2>
      <p>
        Si l&apos;acte ne prévoit rien, il passe aux héritiers, mais seulement pour les dettes
        locatives déjà nées au jour du décès, selon Service-public. Les loyers impayés qui
        surviendraient ensuite ne leur sont pas transmis. C&apos;est un point à expliquer à un
        garant âgé et à sa famille avant la signature, pas après.
      </p>

      <h2 id="recherche">Ce que ça change pour votre recherche</h2>
      <p>
        Si votre garant est retraité, présentez-le comme tout autre : son revenu net mensuel et des
        pièces prêtes, réunies en même temps que les vôtres. La{" "}
        <Link href="/outils/dossier-de-location">checklist de dossier de location</Link> donne la
        liste de ses pièces avec les vôtres. Et si aucun proche ne peut s&apos;engager, les autres
        voies sont dans le guide{" "}
        <Link href="/guides/louer-sans-garant">louer sans garant</Link>, à commencer par la{" "}
        <Link href="/guides/garantie-visale">garantie Visale</Link> pour les 30 ans et moins.
      </p>
      <p>
        Terouva vous signale les annonces qui correspondent à votre recherche et prépare votre
        réponse ; c&apos;est vous qui l&apos;envoyez.{" "}
        <a href="#prevenu" className="lien">
          Être prévenu du lancement
        </a>
      </p>
    </>
  );
}
