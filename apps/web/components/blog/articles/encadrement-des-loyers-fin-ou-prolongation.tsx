import Link from "next/link";

/**
 * Corps de l'article « encadrement des loyers fin novembre 2026 », version 0 :
 * avant le vote de l'Assemblée nationale. Chaque phrase doit rester vraie
 * quelle que soit l'issue ; rien n'est écrit au futur sur le vote.
 *
 * La date du terme n'est pas tranchée par les sources : le Sénat écrit « 23
 * novembre 2026 », la fiche F1314 « jusqu'au 24 novembre 2026 » (relevés le
 * 2026-11-04). L'article cite les deux mot pour mot plutôt que de choisir.
 *
 * Non sourcé au 2026-11-04, donc absent de la page : le sort d'un bail signé
 * pendant l'expérimentation si elle s'arrête, la date d'examen à l'Assemblée
 * (aucun dossier trouvé sur assemblee-nationale.fr), le nombre de voix au
 * Sénat. Les versions A (prolongation adoptée) et B (pas d'adoption avant le
 * terme) sont en bas du fichier, en commentaire.
 */
export default function EncadrementDesLoyersFinOuProlongation() {
  return (
    <>
      <p>
        Deux règles portent le même nom et n&apos;ont pas la même échéance. L&apos;une plafonne le
        loyer à la signature dans neuf territoires, et son expérimentation se termine fin novembre
        2026. L&apos;autre limite la hausse entre deux locataires dans les communes en zone tendue,
        et elle continue jusqu&apos;au 31 juillet 2027. Voici ce qui est acquis, ce qui dépend
        encore du Parlement, et comment vérifier le loyer d&apos;une annonce avant d&apos;y répondre.
      </p>

      <h2 id="terme">Qu&apos;est-ce qui s&apos;arrête fin novembre 2026 ?</h2>
      <p>
        L&apos;encadrement du <strong>niveau</strong> des loyers : dans les territoires concernés, le
        loyer d&apos;un nouveau bail ne peut pas dépasser un loyer de référence majoré, fixé par
        arrêté. Il a été créé à titre expérimental par l&apos;
        <span className="loi">article 140</span> de la loi Elan du 23 novembre 2018, « pour une
        durée de huit ans à compter de la publication de la présente loi », parue au Journal
        officiel du 24 novembre 2018.
      </p>
      <p>
        Les sources officielles n&apos;écrivent pas la même date de fin. Le Sénat indique que
        l&apos;expérimentation « arrive à son terme le 23 novembre 2026 ». La fiche de
        Service-public sur l&apos;encadrement des loyers précise, pour Paris, qu&apos;il
        s&apos;applique « jusqu&apos;au 24 novembre 2026 ».
      </p>

      <h2 id="territoires">Où les loyers sont-ils plafonnés aujourd&apos;hui ?</h2>
      <p>Dans neuf territoires, d&apos;après Service-public (fiche vérifiée le 1er novembre 2026) :</p>
      <ul>
        <li>Paris ;</li>
        <li>Est Ensemble, en Seine-Saint-Denis (Montreuil, Pantin, Bobigny et six autres communes) ;</li>
        <li>Plaine Commune, en Seine-Saint-Denis (Saint-Denis, Aubervilliers, Saint-Ouen-sur-Seine et six autres) ;</li>
        <li>Lille, Hellemmes et Lomme ;</li>
        <li>Lyon et Villeurbanne ;</li>
        <li>Bordeaux ;</li>
        <li>Montpellier ;</li>
        <li>une partie de Grenoble-Alpes Métropole ;</li>
        <li>une partie de la communauté d&apos;agglomération Pays basque.</li>
      </ul>
      <p>
        La liste exacte des communes est sur la{" "}
        <a href="https://www.service-public.gouv.fr/particuliers/vosdroits/F1314" target="_blank" rel="noopener">
          fiche officielle de Service-public
        </a>
        .
      </p>

      <h2 id="vote">Le Parlement va-t-il prolonger l&apos;encadrement ?</h2>
      <p>
        Le Sénat a adopté le 21 octobre 2026, en première lecture, une proposition de loi qui
        prolonge l&apos;expérimentation « de deux années supplémentaires à périmètre constant ».
        Le texte voté permet aussi aux collectivités qui le souhaitent de sortir du dispositif, et
        porte à un an, au lieu de trois mois, le délai pour contester un complément de loyer.
      </p>
      <p>
        Ce texte a été transmis à l&apos;Assemblée nationale. Il n&apos;est pas adopté
        définitivement : tant qu&apos;il ne l&apos;est pas, rien de ce qu&apos;il prévoit ne
        s&apos;applique. Au 4 novembre 2026, nous n&apos;avons trouvé sur le site de
        l&apos;Assemblée ni dossier ni date d&apos;examen. Cet article sera mis à jour le jour du
        vote, à la même adresse.
      </p>

      <h2 id="evolution">La hausse entre deux locataires reste-t-elle limitée ?</h2>
      <p>
        Oui, et c&apos;est la règle que l&apos;actualité fait oublier. Dans les communes en zone
        tendue, un décret du 20 juillet 2026 reconduit l&apos;encadrement de l&apos;
        <strong>évolution</strong> des loyers du 1er août 2026 au 31 juillet 2027, quelle que soit
        l&apos;issue du vote sur le plafond.
      </p>
      <p>
        Quand un logement est reloué, le propriétaire ne peut alors augmenter le loyer que de la
        variation annuelle de l&apos;indice de référence des loyers, et seulement si aucune
        révision n&apos;a eu lieu dans les douze derniers mois. Service-public détaille les
        exceptions : première mise en location, travaux importants, logement resté vide au moins
        dix-huit mois et classé de A à E au diagnostic de performance énergétique. La zone tendue est aussi celle qui ouvre{" "}
        <Link href="/guides/preavis-location#zone-tendue">le préavis d&apos;un mois en zone tendue</Link>,
        une autre règle encore, qui ne dépend pas du vote.
      </p>

      <h2 id="bail">Que change le vote pour un bail signé en novembre ou en décembre ?</h2>
      <p>
        Ce qui est sûr : un bail signé tant que l&apos;encadrement s&apos;applique dans votre ville
        doit respecter le plafond en vigueur à la date de signature. Et dans une commune en zone
        tendue, la limite de hausse entre deux locataires vaut jusqu&apos;au 31 juillet 2027.
      </p>
      <p>
        Ce qui ne l&apos;est pas encore : le sort d&apos;un bail signé après le terme si la
        prolongation n&apos;est pas adoptée à temps, et celui d&apos;un bail déjà signé. Les sources
        officielles que nous avons lues n&apos;en disent rien à ce jour. Nous compléterons cette
        réponse dès qu&apos;elles le feront, plutôt que de la deviner.
      </p>

      <h2 id="verifier">Comment vérifier le loyer d&apos;une annonce avant d&apos;y répondre ?</h2>
      <p>
        Dans une ville encadrée, l&apos;annonce doit afficher le loyer de référence, le loyer de
        référence majoré et, s&apos;il y en a un, le complément de loyer : Service-public précise
        que ces montants « doivent être mentionnés dans le bail et dans l&apos;annonce
        immobilière ». Une annonce qui ne les donne pas mérite une question avant la visite.
      </p>
      <p>
        Pour comparer, chaque territoire a son simulateur officiel, par exemple celui de{" "}
        <a href="https://teleservices.paris.fr/encadrementdesloyers/" target="_blank" rel="noopener">
          la Ville de Paris
        </a>
        . Les autres sont listés sur la fiche de Service-public. Deux minutes suffisent, et elles
        se placent avant le message, pas après la signature. Le guide{" "}
        <Link href="/guides/repondre-a-une-annonce-de-location">
          répondre à une annonce de location
        </Link>{" "}
        explique ce que ce premier message doit dire.
      </p>

      <h2 id="contester">Que faire si le loyer de votre bail dépasse le plafond ?</h2>
      <p>
        Pour un complément de loyer, vous disposez aujourd&apos;hui de trois mois à partir de la
        signature du bail pour le contester devant la commission départementale de conciliation,
        gratuitement. Sans accord, le juge des contentieux de la protection peut être saisi dans
        les trois mois qui suivent la réception de l&apos;avis de la commission. Le délai d&apos;un an voté par le
        Sénat ne s&apos;applique pas tant que le texte n&apos;est pas adopté.
      </p>
      <p>
        Pour un loyer de base au-dessus du loyer de référence majoré, la démarche est décrite sur la
        même fiche de Service-public : suivez-la telle quelle, elle fait foi.
      </p>

      <h2 id="recherche">Ce que ça change pour votre recherche</h2>
      <p>
        Pas le rythme : les bons logements partent toujours vite, encadrement ou non. Répondez aussi
        tôt qu&apos;avant, avec un{" "}
        <Link href="/guides/dossier-de-location">dossier de location</Link> déjà prêt. Ajoutez
        seulement une vérification du loyer avant la visite.
      </p>
      <p>
        Un conseil, enfin : gardez une capture datée de l&apos;annonce. Si vous contestez ensuite un
        complément de loyer, c&apos;est la trace de ce qui était affiché quand vous avez répondu.
      </p>
      <p>
        Terouva vous signale les annonces qui correspondent à votre recherche et prépare votre
        réponse ; il ne vérifie pas les plafonds de loyer.{" "}
        <a href="#prevenu" className="lien">
          Être prévenu du lancement
        </a>
      </p>
    </>
  );
}

/*
 * VERSION A — prolongation adoptée définitivement (à écrire le jour du vote,
 * avec le numéro et la date de la loi promulguée ; tant qu'elle n'est pas au
 * Journal officiel : « adopté, publication au Journal officiel attendue »).
 *
 * Titre : « Encadrement des loyers prolongé : ce qui change pour votre prochain bail »
 * Chapeau (à recompter, 40 à 60 mots) : L'encadrement du niveau des loyers est
 * prolongé de deux ans dans les mêmes territoires, par une loi adoptée le [date].
 * Les collectivités peuvent désormais en sortir, et le délai pour contester un
 * complément de loyer passe à un an à partir de la signature [à vérifier dans le
 * texte promulgué]. La hausse entre deux locataires reste limitée en zone tendue
 * jusqu'au 31 juillet 2027.
 * Sections à changer : « vote » (l'issue, la date de fin exacte prise dans le
 * texte), « bail » (rien ne change à la signature), « contester » (un an, à
 * partir de quand selon le texte). Encadré de mise à jour daté.
 *
 * VERSION B — pas d'adoption définitive avant le terme.
 *
 * Titre : « Fin de l'encadrement des loyers : ce qui reste, ce qui change »
 * Chapeau (à recompter) : L'expérimentation qui plafonnait le niveau des loyers
 * dans neuf territoires a pris fin le [date, celle que dira la source le jour J].
 * La prolongation votée au Sénat n'a pas été adoptée à temps par l'Assemblée
 * nationale. La hausse de loyer entre deux locataires reste encadrée en zone
 * tendue jusqu'au 31 juillet 2027.
 * Sections à changer : « terme » (au passé), « vote » (où en est le texte),
 * « bail » (seulement ce qu'une source officielle dira du sort des baux en cours),
 * « verifier » (les mentions d'annonce ne valent plus que si la source le dit).
 */
