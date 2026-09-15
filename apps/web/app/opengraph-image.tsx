import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Terouva · Trouvez votre logement sans y passer vos journées";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Palette et polices du site (DESIGN.md). Les polices sont lues depuis le dépôt :
// l'image est générée au build, sans appel réseau.
const PAPER = "#F5F1E8";
const INK = "#1F1D1A";
const INK_2 = "#595448";
const ACCENT = "#A9482A";
const RULE = "#DCD4C4";

export default async function OG() {
  const [serif, sans] = await Promise.all([
    readFile(join(process.cwd(), "assets/og/newsreader-500.woff")),
    readFile(join(process.cwd(), "assets/og/schibsted-grotesk-400.woff")),
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
          fontFamily: "Schibsted",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <svg width="56" height="56" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="6" fill={ACCENT} />
            <path
              d="M8.5 16.5 16 9.5l7.5 7"
              fill="none"
              stroke="#FBF9F4"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="16" cy="21.5" r="2.4" fill="#FBF9F4" />
          </svg>
          <div style={{ fontFamily: "Newsreader", fontSize: "44px", letterSpacing: "-0.01em" }}>
            Terouva
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
          <div
            style={{
              fontFamily: "Newsreader",
              fontSize: "96px",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            Trouvez, sans chercher.
          </div>
          <div
            style={{
              fontSize: "32px",
              color: INK_2,
              marginTop: "28px",
              maxWidth: "960px",
              lineHeight: 1.35,
            }}
          >
            Terouva surveille Leboncoin pour vous et prépare votre message de candidature.
            Vos données restent sur votre ordinateur.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "44px",
            paddingTop: "22px",
            borderTop: `2px solid ${RULE}`,
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
        { name: "Newsreader", data: serif, weight: 500, style: "normal" },
        { name: "Schibsted", data: sans, weight: 400, style: "normal" },
      ],
    },
  );
}
