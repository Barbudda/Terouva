import Link from "next/link";

/**
 * Corps de l'article « révision du loyer et IRL », format rendez-vous : la même
 * adresse est mise à jour à chaque publication trimestrielle de l'Insee (la
 * prochaine le 2027-01-15 à 8 h 45). Brief :
 * docs/seo/blog/briefs/revision-du-loyer-irl.md.
 *
 * Faits relevés le 2026-11-04 : Insee, Informations rapides n° 246 (parue le
 * 2026-10-15) ; Service-public F13723 (vérifiée le 2026-10-15) et A16807 ;
 * loi du 6 juillet 1989, art. 17-1 et art. 22 (Légifrance). Les exemples
 * chiffrés sont calculés avec la formule de F13723, arrondis au centime.
 */
export default function RevisionDuLoyerIrl() {
  return (
    <>
      <p>
        Une fois par an, votre propriétaire peut augmenter le loyer en cours de bail, mais pas
        comme il veut : la hausse suit un indice publié par l&apos;Insee chaque trimestre,
        l&apos;indice de référence des loyers (IRL). Le dernier, celui du 3e trimestre 2026, est
        paru le 15 octobre 2026. Voici les valeurs, le calcul, et les cas où le loyer ne peut pas
        bouger du tout.
      </p>

      <h2 id="valeurs">Quelles sont les dernières valeurs de l&apos;IRL ?</h2>
      <p>En France métropolitaine, d&apos;après l&apos;Insee et Service-public :</p>
      <ul>
        <li>
          <strong>3e trimestre 2026 : 148,06</strong>, soit + 1,57 % sur un an (publié le
          15 octobre 2026) ;
        </li>
        <li>2e trimestre 2026 : 148,37, soit + 1,15 % ;</li>
        <li>1er trimestre 2026 : 146,60, soit + 0,78 % ;</li>
        <li>4e trimestre 2025 : 145,78, soit + 0,79 %.</li>
      </ul>
      <p>
        La Corse et les départements d&apos;outre-mer ont leurs propres valeurs (143,80 et 145,21
        au 3e trimestre 2026), avec la même hausse annuelle. Le prochain indice, celui du
        4e trimestre 2026, paraîtra le 15 janvier 2027 : cet article sera mis à jour ce jour-là.
      </p>

      <h2 id="conditions">Quand le loyer peut-il être révisé ?</h2>
      <p>Il faut trois conditions, toutes dans la loi du 6 juillet 1989 :</p>
      <ul>
        <li>
          une <strong>clause de révision</strong> dans le bail : sans elle, le loyer ne bouge pas en
          cours de bail ;
        </li>
        <li>
          <strong>une fois par an</strong>, à la date prévue au bail ou, à défaut, à chaque
          anniversaire du contrat ;
        </li>
        <li>
          une hausse qui ne dépasse pas la <strong>variation annuelle de l&apos;IRL</strong> du
          trimestre de référence.
        </li>
      </ul>
      <p>
        Le trimestre de référence est celui que le bail indique. S&apos;il n&apos;en indique aucun,
        c&apos;est le dernier IRL publié à la date de signature. Regardez votre bail : c&apos;est
        lui qui dit quel chiffre de la liste vous concerne.
      </p>

      <h2 id="calcul">Comment calculer votre nouveau loyer ?</h2>
      <p>La formule de Service-public tient en une ligne :</p>
      <p>
        <strong>
          nouveau loyer = loyer actuel × IRL du trimestre de référence de cette année ÷ IRL du même
          trimestre de l&apos;année précédente
        </strong>
        , arrondi au centime.
      </p>
      <p>
        Exemple : un loyer de 700 € dont le bail retient le 3e trimestre. 700 × 148,06 ÷ 145,77
        = <strong>711,00 €</strong>, soit 11 € de plus par mois. Avec le 2e trimestre, le même loyer
        passerait à 708,07 €. Si un complément de loyer s&apos;applique, il s&apos;ajoute au loyer
        de base avant le calcul.
      </p>
      <p>
        Le dépôt de garantie, lui, ne suit pas : la loi interdit de le réviser pendant le bail,
        même renouvelé. Le guide du{" "}
        <Link href="/guides/depot-de-garantie">dépôt de garantie</Link> en donne les autres règles.
      </p>

      <h2 id="delai">Le propriétaire peut-il réclamer une révision oubliée ?</h2>
      <p>
        Pas indéfiniment, et jamais en arrière. Il a un an à partir de la date de révision pour
        manifester sa volonté de l&apos;appliquer. Passé ce délai, il est réputé y avoir renoncé
        pour l&apos;année écoulée. Et s&apos;il la demande dans l&apos;année, la hausse prend effet
        à compter de sa demande : il ne peut pas vous réclamer les mois passés.
      </p>

      <h2 id="interdit">Dans quels cas le loyer ne peut-il pas être révisé ?</h2>
      <ul>
        <li>
          <strong>Logement classé F ou G</strong> au diagnostic de performance énergétique : la
          révision est interdite pour un bail signé, renouvelé ou reconduit depuis le 24 août 2022
          en métropole, depuis le 1er juillet 2024 en Guadeloupe, Guyane, Martinique, à La Réunion
          et à Mayotte.
        </li>
        <li>
          <strong>Bail mobilité</strong> : le loyer ne peut pas être révisé en cours de bail.
        </li>
        <li>
          <strong>Pas de clause</strong> de révision dans le bail.
        </li>
      </ul>

      <h2 id="locataire">Ce que ça change pour vous</h2>
      <p>
        Une révision de 1,57 % représente 11 € par mois sur un loyer de 700 €. Vérifiez le calcul
        avec les deux indices du trimestre que fixe votre bail. Côté aides, les APL ont été
        revalorisées de 1,15 % au 1er octobre 2026, sur l&apos;IRL du 2e trimestre.
      </p>
      <p>
        Si la hausse vous fait envisager un déménagement, commencez par le calendrier : le{" "}
        <Link href="/guides/preavis-location">préavis de location</Link> fixe la date à partir de
        laquelle vous pouvez partir, et la recherche du logement suivant se prépare pendant ce
        temps, avec un <Link href="/guides/dossier-de-location">dossier de location</Link> prêt à
        envoyer.
      </p>
    </>
  );
}
