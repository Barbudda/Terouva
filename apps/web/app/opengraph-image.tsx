import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Terouva · Trouvez votre logement sans y passer vos journées";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Palette et polices du site (DESIGN.md). Les polices sont lues depuis le dépôt :
// l'image est générée au build, sans appel réseau.
const PAPER = "#FDFDFD";
const INK = "#1B1D1E";
const INK_2 = "#55595C";
const ACCENT = "#C92D6A";
const WASH = "#FBDAE7";

export default async function OG() {
  const [bold, regular] = await Promise.all([
    readFile(join(process.cwd(), "assets/og/montserrat-800.woff")),
    readFile(join(process.cwd(), "assets/og/montserrat-400.woff")),
  ]);

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
          padding: "72px 80px",
          fontFamily: "Montserrat",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <svg width="56" height="56" viewBox="0 0 32 32">
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
          <div style={{ fontSize: "40px", fontWeight: 800, letterSpacing: "-0.02em" }}>Terouva</div>
          <div
            style={{
              marginLeft: "12px",
              background: WASH,
              color: "#A52254",
              borderRadius: "999px",
              padding: "8px 18px",
              fontSize: "20px",
              fontWeight: 800,
              letterSpacing: "0.12em",
              display: "flex",
            }}
          >
            BIENTÔT DISPONIBLE
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
          <div
            style={{
              fontSize: "82px",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              maxWidth: "1000px",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <span>Trouvez votre logement&nbsp;</span>
            <span style={{ color: ACCENT }}>sans y passer vos journées.</span>
          </div>
          <div
            style={{
              fontSize: "30px",
              color: INK_2,
              marginTop: "28px",
              maxWidth: "940px",
              lineHeight: 1.35,
            }}
          >
            Les annonces qui vous correspondent, classées, avec un message prêt à envoyer. Tout
            reste sur votre ordinateur.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "44px",
            paddingTop: "22px",
            borderTop: `2px solid ${WASH}`,
            fontSize: "24px",
            color: INK_2,
          }}
        >
          terouva.vercel.app
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
