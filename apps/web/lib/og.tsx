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
 * chaque lien partagé affichait donc une image portant l'ancienne adresse —
 * invisible dans le code, lisible par tout le monde.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#FDFDFD";
const INK = "#1B1D1E";
const INK_2 = "#55595C";
const ACCENT = "#C92D6A";
const WASH = "#FBDAE7";

/** Le domaine du site, sans protocole ni barre finale. */
export function domaineAffiche(): string {
  return getSiteUrl().replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/** DM Sans, comme le site. Une image de partage dans une autre police ne
 *  ressemble pas à la page qu'elle annonce. */
export function polices() {
  return Promise.all([
    readFile(join(process.cwd(), "assets/og/dm-sans-700.woff")),
    readFile(join(process.cwd(), "assets/og/dm-sans-400.woff")),
  ]);
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
  const [bold, regular] = await polices();
  const adresse = pied ?? domaineAffiche();

  // Un titre long doit rester lisible : on descend la taille par paliers.
  const taille = titre.length > 90 ? 58 : titre.length > 60 ? 68 : 80;

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
          fontFamily: "DM Sans",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <svg width="48" height="48" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="9" fill={ACCENT} />
            <path
              d="M8.5 16.5 16 9.5l7.5 7"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="16" cy="21.5" r="2.4" fill="#FFFFFF" />
          </svg>
          <div style={{ fontSize: "34px", fontWeight: 700, letterSpacing: "-0.02em" }}>Terouva</div>
          <div
            style={{
              marginLeft: "10px",
              background: WASH,
              color: "#A52254",
              borderRadius: "999px",
              padding: "7px 16px",
              fontSize: "17px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              display: "flex",
              textTransform: "uppercase",
            }}
          >
            {surtitre}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "auto",
            fontSize: `${taille}px`,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
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
            borderTop: `2px solid ${WASH}`,
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
        { name: "DM Sans", data: bold, weight: 700, style: "normal" },
        { name: "DM Sans", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
