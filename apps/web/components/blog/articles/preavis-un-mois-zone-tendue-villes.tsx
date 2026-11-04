import Link from "next/link";
import { GraphiquePreavisGrandesVilles } from "./preavis-un-mois-zone-tendue-villes-graphique";

/**
 * Corps de l'étude « préavis d'un mois et zones tendues ».
 *
 * Tous les chiffres sortent de docs/seo/blog/donnees/zones-tendues/etude.py
 * (resultats/chiffres.json, relevé du 2026-11-04) ; la méthode complète et les
 * empreintes des fichiers sont dans METHODE.md à côté. Rien n'est arrondi ici
 * qui ne le soit déjà dans CHIFFRES.md.
 *
 * Angle : les villes. La requête « préavis 1 mois zone tendue » appartient au
 * guide /guides/preavis-location (registre) ; cet article y renvoie sans la viser.
 *
 * Date de péremption : le décret n° 2026-831 du 25 août 2026 (JORF du 29 août,
 * lu sur Légifrance le 2026-11-04, art. 2 et 3) abroge le décret 2013-392 au
 * 1er janvier 2027 ; sa notice dit qu'il en reprend le périmètre, tel que
 * modifié en décembre 2025. Inconnu au 2026-11-04 : le texte auquel le préavis
 * renverra ensuite. À ce moment-là : relancer l'étude si la liste change,
 * mettre à jour ce corps et ajouter une entrée `misesAJour` à la fiche.
 */
export default function PreavisUnMoisZoneTendueVilles() {
  return (
    <>
      <p>
        Quand on quitte un logement loué vide, le préavis est en principe de trois mois. Il tombe à
        un mois si la commune figure sur la liste des zones tendues. Nous avons croisé cette liste
        officielle avec les populations de l&apos;Insee pour savoir qui en profite vraiment, et la
        réponse surprend : plusieurs grandes villes n&apos;y sont pas.
      </p>

      <h2 id="chiffres">Les chiffres clés</h2>
      <ul>
        <li>
          Depuis le décret du 22 décembre 2025, <strong>1 430 communes sur 34 875</strong> (4,1 %)
          sont en zone tendue au sens du préavis : le locataire d&apos;un logement vide peut y donner
          un préavis d&apos;un mois au lieu de trois.
        </li>
        <li>
          Ces communes réunissent <strong>26,5 millions d&apos;habitants</strong>, soit 39,0 % de la
          population de la France hors Mayotte (populations de l&apos;Insee au 1er janvier 2023).
        </li>
        <li>
          Sur les 42 communes de 100 000 habitants ou plus, <strong>17 ne sont pas en zone
          tendue</strong>, dont Reims, Saint-Étienne, Dijon, Angers, Tours, Rouen et Nancy.
        </li>
        <li>
          Dans <strong>61 départements sur 100</strong> (hors Mayotte), aucune commune ne donne droit
          au préavis d&apos;un mois pour cause de zone tendue. À l&apos;inverse, Paris, les
          Hauts-de-Seine, la Seine-Saint-Denis et le Val-de-Marne sont classés en entier.
        </li>
        <li>
          Les <strong>2 259 communes « touristiques et tendues »</strong> ajoutées en 2023
          (3,0 millions d&apos;habitants) ne figurent pas dans la partie de la liste qui ouvre le
          préavis réduit.
        </li>
      </ul>
      <p className="note">
        Chiffres relevés le 4 novembre 2026. La liste doit changer au 1er janvier 2027 : voir plus
        bas.
      </p>

      <h2 id="villes">Quelles grandes villes sont en zone tendue ?</h2>
      <p>
        Vingt-cinq des quarante-deux communes de plus de 100 000 habitants sont en zone tendue :
        Paris, Marseille, Lyon, Toulouse, Nice, Nantes, Montpellier, Strasbourg, Bordeaux, Lille,
        Rennes, mais aussi Caen, Orléans, Annecy ou Nîmes. Les dix-sept autres restent au préavis de
        trois mois pour un logement vide.
      </p>
      <GraphiquePreavisGrandesVilles />

      <h2 id="pourquoi">Pourquoi Rouen ou Dijon n&apos;y sont pas ?</h2>
      <p>
        La liste ne classe pas les villes par taille. Elle retient les communes des agglomérations de
        plus de 50 000 habitants où l&apos;écart entre l&apos;offre et la demande de logements rend
        l&apos;accès au logement difficile, selon la définition du ministère de la Transition
        écologique. Une grande ville peut donc rester hors liste si son marché locatif n&apos;est pas
        jugé assez tendu, et une petite commune y entrer parce qu&apos;elle fait partie d&apos;une
        agglomération qui l&apos;est.
      </p>
      <p>
        C&apos;est pourquoi la liste compte 1 430 communes, souvent des communes de banlieue : 102 dans
        le Rhône, 86 dans les Yvelines, 81 dans l&apos;Essonne. La seule façon de savoir est de
        vérifier sa commune.
      </p>

      <h2 id="verifier">Comment savoir si votre commune est en zone tendue ?</h2>
      <p>
        Le plus simple est le{" "}
        <a href="https://www.service-public.gouv.fr/simulateur/calcul/zones-tendues" target="_blank" rel="noopener">
          simulateur officiel de Service-public
        </a>
        : vous tapez le nom de la commune ou son code postal, il répond oui ou non. La liste qui
        compte est celle en vigueur à la date où votre bail a été signé, reconduit ou renouvelé.
      </p>
      <p>
        Si votre commune est en zone tendue, le préavis d&apos;un mois ne s&apos;applique pas tout
        seul. Votre lettre de congé doit indiquer l&apos;adresse du logement et le fait que vous
        bénéficiez d&apos;un préavis réduit à un mois, en citant l&apos;
        <span className="loi">article 15 de la loi du 6 juillet 1989</span>. Sans cette mention, le
        délai de trois mois s&apos;applique. Le{" "}
        <Link href="/guides/preavis-location">guide du préavis de location</Link> détaille les délais
        et les modes d&apos;envoi, et sa partie sur{" "}
        <Link href="/guides/preavis-location#lettre">la lettre de congé</Link> dit ce qu&apos;elle doit
        contenir.
      </p>

      <h2 id="touristiques">Les communes « touristiques et tendues » donnent-elles un préavis d&apos;un mois ?</h2>
      <p>
        Non. Depuis 2023, la liste a deux parties. La première regroupe les communes des grandes
        agglomérations tendues ; la seconde, 2 259 communes « touristiques et tendues », créée pour
        les territoires où les résidences secondaires prennent la place des résidences principales.
        Selon Service-public, seule la première partie ouvre le préavis d&apos;un mois. Habiter une
        commune de la seconde ne suffit donc pas.
      </p>

      <h2 id="autres-motifs">Hors zone tendue, le préavis est-il toujours de trois mois ?</h2>
      <p>
        Pas toujours. D&apos;autres situations ouvrent le préavis d&apos;un mois partout en France,
        quelle que soit la commune, par exemple la mutation d&apos;un salarié : la fiche
        Service-public sur le congé du locataire les détaille. Et en meublé, les règles sont
        différentes : cette étude ne concerne que la location vide.
      </p>

      <h2 id="2027">Que change le 1er janvier 2027 ?</h2>
      <p>
        Un décret du 25 août 2026, publié au Journal officiel du 29 août, fixe la liste des
        communes en zone tendue pour la nouvelle taxe sur la vacance des logements, qui
        s&apos;applique à partir de 2027. Il abroge au 1er janvier 2027 le décret du 10 mai 2013 qui
        porte la liste utilisée aujourd&apos;hui pour le préavis. Sa notice précise qu&apos;il en
        reprend le périmètre, tel que modifié en décembre 2025 : les communes restent donc les
        mêmes. Ce qui n&apos;est pas encore connu au 4 novembre 2026, c&apos;est le texte auquel le
        préavis réduit renverra ensuite.
      </p>
      <p>
        Si votre bail a été signé, reconduit ou renouvelé avant le 1er janvier 2027, les chiffres
        de cette page valent. Pour un bail signé ou reconduit ensuite, vérifiez votre commune sur le
        simulateur au moment d&apos;écrire votre lettre. Nous mettrons cette page à jour dès que la
        règle sera précisée, à la même adresse.
      </p>

      <h2 id="methode">Méthode</h2>
      <p>
        Nous avons repris la liste officielle des communes en zone tendue publiée par le ministère de
        la Transition écologique le 30 décembre 2025, après le décret du 22 décembre 2025, et
        l&apos;avons croisée avec les populations légales de l&apos;Insee au 1er janvier 2023, dans
        les limites communales de 2025. Seules comptent les communes du premier tableau de
        l&apos;annexe du décret du 10 mai 2013, celles où le locataire d&apos;un logement vide peut
        donner un préavis d&apos;un mois.
      </p>
      <p>
        Paris, Lyon et Marseille sont comptées comme une seule commune chacune. Mayotte n&apos;est pas
        couverte par les populations de l&apos;Insee. Les chiffres comptent des habitants, pas des
        locataires. Les deux fichiers sont publiés sous Licence Ouverte ; le calcul est fait par un
        script qui vérifie l&apos;empreinte de chaque fichier avant de compter. Données relevées le
        4 novembre 2026.
      </p>
      <p>
        Avant de déménager, deux lectures utiles : l&apos;
        <Link href="/guides/etat-des-lieux">état des lieux de sortie</Link> et le{" "}
        <Link href="/guides/depot-de-garantie">délai de restitution du dépôt de garantie</Link>.
      </p>
    </>
  );
}
