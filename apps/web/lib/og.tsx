import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getSiteUrl } from "@/lib/site";

/**
 * Image de partage, une par page.
 *
 * Quand un guide est partagé dans un message ou sur un réseau, c'est cette
 * image qui est vue avant le lien. Une image générique pour tout le site fait
 * perdre le titre, qui est justement ce qui donne envie de cliquer. Les polices
 * sont lues dans le dépôt : l'image est produite au build, sans appel réseau.
 *
 * **L'adresse en bas de l'image n'est jamais écrite en dur.** Elle était restée
 * sur le sous-domaine de la plateforme après le branchement du domaine, et
 * chaque lien partagé affichait donc une image portant l'ancienne adresse,
 * invisible dans le code, lisible par tout le monde.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Les mêmes valeurs que `globals.css` : l'image de partage est du monde papier. */
export const PAPER = "#F7F3ED";
export const PAPER_2 = "#EFE9E0";
export const INK = "#17181A";
export const INK_2 = "#4E5154";
export const INK_3 = "#64686B";
export const RULE_FORT = "#C6BDB0";
export const ACCENT = "#C92D6A";

/** Le domaine du site, sans protocole ni barre finale. */
export function domaineAffiche(): string {
  return getSiteUrl().replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/**
 * Fraunces pour le titre, Archivo pour le reste, comme le site. Ce sont les
 * fichiers variables du dépôt Google Fonts (licence OFL) ; le moteur d'image
 * rend leur instance par défaut, graisse 400, qui est aussi celle du site.
 */
export function polices() {
  return Promise.all([
    readFile(join(process.cwd(), "assets/og/Fraunces.ttf")),
    readFile(join(process.cwd(), "assets/og/Archivo.ttf")),
  ]);
}

/** La marque, aux couleurs du papier. */
export function Marque({ taille = 48 }: { taille?: number }) {
  return (
    <svg width={taille} height={taille} viewBox="0 0 32 32">
      <rect width="32" height="32" rx="7" fill={ACCENT} />
      <path
        d="M8.5 16.5 16 9.5l7.5 7"
        fill="none"
        stroke={PAPER}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="21.5" r="2.4" fill={PAPER} />
    </svg>
  );
}

export async function imageOG({
  surtitre,
  titre,
  pied,
}: {
  surtitre: string;
  titre: string;
  pied?: string;
}) {
  const [fraunces, archivo] = await polices();
  const adresse = pied ?? domaineAffiche();

  // Un titre long doit rester lisible : on descend la taille par paliers.
  const taille = titre.length > 90 ? 56 : titre.length > 60 ? 66 : 78;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: PAPER,
          color: INK,
          padding: "68px 76px",
          fontFamily: "Archivo",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Marque />
          <div style={{ fontFamily: "Fraunces", fontSize: "36px", letterSpacing: "-0.03em" }}>Terouva</div>
          <div
            style={{
              marginLeft: "18px",
              paddingLeft: "18px",
              borderLeft: `1px solid ${RULE_FORT}`,
              color: INK_3,
              fontSize: "18px",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            {surtitre}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "auto",
            fontFamily: "Fraunces",
            fontSize: `${taille}px`,
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            maxWidth: "1020px",
          }}
        >
          {titre}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "38px",
            paddingTop: "20px",
            borderTop: `1px solid ${RULE_FORT}`,
            fontSize: "22px",
            color: INK_2,
          }}
        >
          {adresse}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 400, style: "normal" },
        { name: "Archivo", data: archivo, weight: 400, style: "normal" },
      ],
    },
  );
}
