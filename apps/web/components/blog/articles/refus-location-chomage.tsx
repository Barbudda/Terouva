import Link from "next/link";

/**
 * Corps de l'article « refuser un candidat au chômage ». Il trace une frontière
 * étroite : le propriétaire peut juger le montant des ressources, il ne peut
 * pas fonder sa décision sur la vulnérabilité économique.
 *
 * Prudence de relecture : la décision 2019-001 portait sur une pension
 * d'invalidité, analysée sous l'angle du handicap. Relecture du
 * 2026-11-04 : discrimination retenue au titre du handicap (§ 36), privilégier
 * des revenus d'activité n'étant pas en soi un critère prohibé (§ 28). Elle
 * est citée pour cela seulement, sans prétendre
 * qu'une décision existe sur les allocations chômage : nous n'en avons lu
 * aucune au 2026-11-04. Aucun chiffre de refus, aucun testing, aucun seuil de
 * revenu « suffisant » (la règle des trois fois le loyer n'est pas légale).
 */
export default function RefusLocationChomage() {
  return (
    <>
      <p>
        Perdre son emploi pendant une recherche de logement, ou chercher en étant déjà au chômage,
        pose vite la question : le propriétaire a-t-il le droit de m&apos;écarter pour ça ? La loi
        ne répond ni oui ni non. Elle laisse au propriétaire le droit de juger votre capacité à
        payer, et elle lui interdit certaines raisons de refuser. Voici où passe la frontière, et ce
        qui aide concrètement votre dossier.
      </p>

      <h2 id="interdit">Le chômage est-il un motif de refus interdit ?</h2>
      <p>
        Pas en tant que tel. L&apos;<span className="loi">article 225-1</span> du Code pénal, auquel
        renvoie l&apos;article 1er de la loi du 6 juillet 1989, liste les critères interdits, et le
        chômage n&apos;y figure pas sous ce nom. En revanche, la liste comprend « la particulière
        vulnérabilité résultant de leur situation économique, apparente ou connue de son auteur ».
      </p>
      <p>
        Un refus fondé sur l&apos;un de ces critères est puni de trois ans d&apos;emprisonnement et
        de 45&nbsp;000&nbsp;€ d&apos;amende par l&apos;<span className="loi">article 225-2</span>.
        La liste complète et la façon de prouver un motif interdit sont dans le guide sur le{" "}
        <Link href="/guides/refus-de-dossier">refus de dossier</Link>.
      </p>

      <h2 id="permis">Qu&apos;est-ce qu&apos;un propriétaire a le droit de regarder ?</h2>
      <p>
        Vos ressources et vos garanties. Service-public le dit ainsi : le choix du candidat
        « doit se fonder sur des critères objectifs (par exemple, la situation financière du
        candidat) ». Le propriétaire peut demander les pièces de la liste autorisée sur votre
        identité, votre situation professionnelle et vos ressources, et comparer les dossiers.
      </p>
      <p>
        Un dossier dont les ressources couvrent mal le loyer peut donc être écarté sans que la loi
        ait rien à redire, que vous soyez salarié, indépendant ou au chômage. Ce que le propriétaire
        ne peut pas faire, c&apos;est exiger un document hors liste, comme un relevé de compte : il
        s&apos;expose alors à une amende pouvant atteindre 3&nbsp;000&nbsp;€.
      </p>

      <h2 id="nature">Peut-il préférer un salaire à vos allocations ?</h2>
      <p>
        Aucune source que nous avons lue ne le lui interdit pour des allocations chômage. Le cas
        le plus proche est celui d&apos;un candidat écarté « en raison de la nature de ses
        revenus », une pension d&apos;invalidité. Dans sa décision n°&nbsp;2019-001 du 28 janvier
        2019, le Défenseur des droits a retenu une discrimination fondée sur le handicap, parce que
        cette pratique désavantageait les candidats handicapés.
      </p>
      <p>
        Cette décision portait sur le handicap, pas sur le chômage, et elle précise que privilégier
        des revenus d&apos;activité n&apos;est pas en soi un critère de discrimination interdit. Nous
        n&apos;avons pas lu de décision sur les allocations chômage. Ce qui se discute avec le
        propriétaire, c&apos;est donc le montant de vos ressources, pièces à l&apos;appui. Si un
        refus vous est expliqué par écrit, gardez le message.
      </p>

      <h2 id="pieces">Quelles pièces prouvent des allocations chômage ?</h2>
      <p>
        La liste officielle des justificatifs de ressources prévoit un document fait pour ça : le
        « justificatif de versement des indemnités, retraites, pensions, prestations sociales et
        familiales et allocations perçues lors des 3 derniers mois ou justificatif de
        l&apos;ouverture des droits, établis par l&apos;organisme payeur ».
      </p>
      <p>
        Vous pouvez y joindre votre dernier avis d&apos;imposition, autorisé lui aussi. Si vos droits
        viennent d&apos;être ouverts, le justificatif d&apos;ouverture des droits tient lieu des
        trois mois de versements que vous n&apos;avez pas encore. La liste complète de ce
        qu&apos;on peut vous demander est dans le guide du{" "}
        <Link href="/guides/dossier-de-location">dossier de location</Link>.
      </p>

      <h2 id="garanties">Quelles garanties restent possibles au chômage ?</h2>
      <ul>
        <li>
          <strong>La garantie Visale</strong>, si vous avez 30 ans ou moins : elle ne pose pas de
          condition d&apos;emploi, mais des conditions de loyer et de ressources. À partir de 31
          ans, elle est réservée aux salariés du secteur privé sous conditions, ou aux personnes
          qui ont une promesse d&apos;embauche avec prise de fonction dans les trois mois. Le détail est dans le guide{" "}
          <Link href="/guides/garantie-visale">garantie Visale</Link>.
        </li>
        <li>
          <strong>Un garant physique</strong> : parent, proche ou ami. Il répond à la question que
          le propriétaire se pose, qui paiera si vous ne payez pas.
        </li>
        <li>
          <strong>Un propriétaire déjà assuré</strong> contre les loyers impayés ne peut pas exiger
          de caution, sauf d&apos;un étudiant ou d&apos;un apprenti : la question mérite
          d&apos;être posée.
        </li>
      </ul>

      <h2 id="signaler">Comment savoir si un refus est discriminatoire, et que faire ?</h2>
      <p>
        Un refus sans explication n&apos;est pas une preuve : le propriétaire n&apos;a pas à motiver
        sa décision. Ce qui compte, ce sont les éléments écrits et datés qui laissent supposer un
        motif interdit. Devant le juge civil, c&apos;est ensuite au propriétaire de prouver
        que sa décision repose sur des éléments objectifs.
      </p>
      <p>
        Vous pouvez saisir le Défenseur des droits gratuitement, ou porter plainte dans les six ans
        suivant les faits. Les démarches sont détaillées dans le guide sur le{" "}
        <Link href="/guides/refus-de-dossier#recours">refus de dossier</Link>.
      </p>

      <h2 id="recherche">Ce que ça change pour votre recherche</h2>
      <p>
        Annoncez vos ressources et votre garantie dès le premier message, sans vous justifier : un
        montant net mensuel et une garantie solide répondent aux deux questions que le propriétaire
        se pose. Visez des loyers que vos ressources couvrent, et préparez un dossier complet avec la{" "}
        <Link href="/outils/dossier-de-location">checklist de dossier de location</Link>, qui donne
        la liste des pièces selon votre situation.
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
