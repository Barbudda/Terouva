import Link from "next/link";

/**
 * Corps de l'article « frais d'agence en location ». Les plafonds sont ceux de
 * 2026 (Service-public F375, vérifiée le 2026-01-12) ; beaucoup de pages
 * donnent encore ceux de 2014, d'où l'insistance sur l'année.
 *
 * Les calculs sont les nôtres, faits avec les règles de la fiche : 30 m² en
 * zone très tendue, 800 € facturés ; état des lieux à 150 €. La liste des
 * communes de chaque zone n'est pas recopiée : elle dépend de textes révisés,
 * et le simulateur de Service-public la tient à jour.
 */
export default function FraisAgenceLocation() {
  return (
    <>
      <p>
        Quand un logement est loué par une agence, une partie de ses honoraires vous revient. Pas
        n&apos;importe laquelle, et pas n&apos;importe quel montant : la loi fixe ce qui se
        partage, ce que le propriétaire paie seul, et un plafond au mètre carré qui change chaque
        année. Voici les montants de 2026, un calcul complet, et ce qu&apos;il faut vérifier avant
        de signer.
      </p>

      <h2 id="maximum">Quel est le montant maximum des frais d&apos;agence pour un locataire ?</h2>
      <p>
        Deux limites s&apos;appliquent ensemble, et la plus basse l&apos;emporte. Votre part ne
        peut pas dépasser la moitié de ce que l&apos;agence facture pour la visite, le dossier et la
        rédaction du bail. Et elle ne peut pas dépasser un plafond par mètre carré de surface
        habitable, fixé selon la zone du logement :
      </p>
      <ul>
        <li>
          <strong>Zone très tendue</strong> : 12,10&nbsp;€ TTC le m².
        </li>
        <li>
          <strong>Zone tendue</strong> : 10,09&nbsp;€ TTC le m².
        </li>
        <li>
          <strong>Reste du territoire</strong> : 8,07&nbsp;€ TTC le m².
        </li>
      </ul>
      <p>
        Ce sont les montants de 2026 publiés par Service-public. L&apos;
        <span className="loi">article 5</span> de la loi du 6 juillet 1989 prévoit que ces
        plafonds sont révisables chaque année : une page qui donne encore 12, 10 ou 8&nbsp;€
        recopie les montants d&apos;origine. Pour savoir dans quelle zone se trouve une commune, le
        simulateur de Service-public, lié depuis la{" "}
        <a
          href="https://www.service-public.gouv.fr/particuliers/vosdroits/F375"
          target="_blank"
          rel="noopener"
        >
          fiche sur les frais d&apos;agence
        </a>
        , fait le calcul pour vous.
      </p>

      <h2 id="qui-paie">Qui paie quoi entre le locataire et le propriétaire ?</h2>
      <p>
        Quatre prestations se partagent : la visite, la constitution du dossier, la rédaction du
        bail et l&apos;état des lieux d&apos;entrée. La loi pose que la part du locataire ne peut
        pas dépasser celle du propriétaire. Tout le reste est payé par le propriétaire seul :
        rédaction et diffusion de l&apos;annonce, et frais de gestion locative si l&apos;agence
        gère ensuite le logement.
      </p>
      <p>
        L&apos;agence fixe librement ses tarifs, mais elle doit afficher le prix maximum de chaque
        prestation, toutes taxes comprises, et dire qui le paie : dans ses locaux, sur sa vitrine et
        sur les sites d&apos;annonces. Sans agence, quand vous louez directement à un particulier,
        il n&apos;y a pas d&apos;honoraires d&apos;agence à partager.
      </p>

      <h2 id="exemple">Combien paie-t-on pour un studio de 30 m² ?</h2>
      <p>
        Prenons un studio de 30&nbsp;m² en zone très tendue, pour lequel l&apos;agence facture
        800&nbsp;€ TTC de visite, de dossier et de bail.
      </p>
      <ol>
        <li>La moitié de la facture : 800&nbsp;€ ÷ 2 = 400&nbsp;€.</li>
        <li>Le plafond au mètre carré : 30 × 12,10&nbsp;€ = 363&nbsp;€.</li>
        <li>
          La plus basse des deux s&apos;applique : vous payez <strong>363&nbsp;€</strong>, et le
          propriétaire les 437&nbsp;€ restants.
        </li>
      </ol>
      <p>
        Avec une facture de 600&nbsp;€, la moitié tombe à 300&nbsp;€, sous le plafond de
        363&nbsp;€ : vous payez alors 300&nbsp;€, autant que le propriétaire.
      </p>

      <h2 id="etat-des-lieux">Combien coûte l&apos;état des lieux d&apos;entrée ?</h2>
      <p>
        S&apos;il est fait par l&apos;agence, en votre présence, votre part est limitée de la même
        façon : la moitié de la facture, et au plus 3,03&nbsp;€ TTC par mètre carré, quelle que soit
        la zone. Pour le même studio et un état des lieux facturé 150&nbsp;€, la moitié fait
        75&nbsp;€ et le plafond 90,90&nbsp;€ : vous payez 75&nbsp;€.
      </p>
      <p>
        L&apos;état des lieux de sortie ne vous coûte rien quand il est fait à l&apos;amiable avec
        l&apos;agence. Si aucun état des lieux amiable n&apos;est possible, un commissaire de
        justice le dresse, et ses frais sont partagés par moitié. Ce que le document doit contenir
        est dans le guide de l&apos;
        <Link href="/guides/etat-des-lieux">état des lieux</Link>.
      </p>

      <h2 id="quand">Quand faut-il payer les frais d&apos;agence ?</h2>
      <p>
        L&apos;article 5 est précis : les honoraires de visite, de dossier et de bail « sont dus à
        la signature du bail », ceux de l&apos;état des lieux « à compter de la réalisation de la
        prestation ». Avant la signature, aucune somme ne peut vous être demandée, ni frais de
        dossier, ni chèque de réservation. Une agence qui réclame de l&apos;argent pour étudier
        votre candidature sort du cadre.
      </p>
      <p>
        À la signature, les frais d&apos;agence s&apos;ajoutent au premier loyer et au{" "}
        <Link href="/guides/depot-de-garantie">dépôt de garantie</Link> : prévoyez les trois
        ensemble dans votre budget de départ.
      </p>

      <h2 id="verifier">Que vérifier dans le bail, et que faire si le montant dépasse ?</h2>
      <p>
        Quand le bail est signé avec une agence, il doit reproduire les règles de partage et les
        montants des plafonds, à peine de nullité. Relisez cette clause, puis refaites le calcul
        avec la surface habitable inscrite au bail et la zone de la commune.
      </p>
      <p>
        Si votre part dépasse la moitié de la facture ou le plafond, demandez par écrit le détail
        du calcul en citant l&apos;article 5 de la loi du 6 juillet 1989. L&apos;ADIL de votre
        département, que Service-public indique comme interlocuteur sur ce sujet, peut vous aider à
        la formuler.
      </p>

      <h2 id="recherche">Ce que ça change pour votre recherche</h2>
      <p>
        Les frais d&apos;agence ne changent pas votre dossier, mais votre budget : dans notre exemple,
        363&nbsp;€ pour un studio, plus l&apos;état des lieux. Faites le calcul dès l&apos;annonce,
        puisque l&apos;agence doit afficher ses tarifs, et gardez votre rapidité pour la réponse. Le
        guide{" "}
        <Link href="/guides/repondre-a-une-annonce-de-location">
          répondre à une annonce de location
        </Link>{" "}
        dit ce que le premier message doit contenir.
      </p>
      <p>
        Terouva vous signale les annonces qui correspondent à votre recherche et prépare votre
        réponse ; il ne calcule pas les frais d&apos;agence.{" "}
        <a href="#prevenu" className="lien">
          Être prévenu du lancement
        </a>
      </p>
    </>
  );
}
