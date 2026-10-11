import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * Image de partage, une par page.
 *
 * Quand un guide est partagé dans un message ou sur un réseau, c'est cette
 * image qui est vue avant le lien. Une image générique pour tout le site fait
 * perdre le titre, qui est justement ce qui donne envie de cliquer. Les polices
 * sont lues dans le dépôt : l'image est produite au build, sans appel réseau.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#FDFDFD";
const INK = "#1B1D1E";
const INK_2 = "#55595C";
const ACCENT = "#C92D6A";
const WASH = "#FBDAE7";

export async function imageOG({
  surtitre,
  titre,
  pied = "terouva.vercel.app",
}: {
  surtitre: string;
  titre: string;
  pied?: string;
}) {
  const [bold, regular] = await Promise.all([
    readFile(join(process.cwd(), "assets/og/montserrat-800.woff")),
    readFile(join(process.cwd(), "assets/og/montserrat-400.woff")),
  ]);

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
          fontFamily: "Montserrat",
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
          <div style={{ fontSize: "34px", fontWeight: 800, letterSpacing: "-0.02em" }}>Terouva</div>
          <div
            style={{
              marginLeft: "10px",
              background: WASH,
              color: "#A52254",
              borderRadius: "999px",
              padding: "7px 16px",
              fontSize: "17px",
              fontWeight: 800,
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
            fontWeight: 800,
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
          {pied}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Montserrat", data: bold, weight: 800, style: "normal" },
        { name: "Montserrat", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
