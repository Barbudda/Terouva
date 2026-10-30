import { ImageResponse } from "next/og";
import { ACCENT, INK, INK_2, INK_3, Marque, PAPER, PAPER_2, RULE_FORT, domaineAffiche, polices } from "@/lib/og";

export const alt = "Terouva · Trouvez votre logement sans y passer vos journées";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * L'image de partage de l'accueil : le monde papier, et un carré nuit qui
 * porte la note, comme la vignette du panneau d'accueil. Les polices sont
 * lues depuis le dépôt : l'image est générée au build, sans appel réseau.
 */
export default async function OG() {
  const [fraunces, archivo] = await polices();

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
          fontFamily: "Archivo",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <Marque taille={56} />
          <div style={{ fontFamily: "Fraunces", fontSize: "42px", letterSpacing: "-0.03em" }}>Terouva</div>
          <div
            style={{
              marginLeft: "20px",
              paddingLeft: "20px",
              borderLeft: `1px solid ${RULE_FORT}`,
              color: INK_3,
              fontSize: "19px",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            Bientôt disponible
          </div>
        </div>

        <div style={{ display: "flex", marginTop: "auto", alignItems: "flex-end", gap: "48px" }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div
              style={{
                fontFamily: "Fraunces",
                fontSize: "80px",
                lineHeight: 0.98,
                letterSpacing: "-0.025em",
                maxWidth: "860px",
                display: "flex",
              }}
            >
              Trouvez votre logement sans y passer vos journées.
            </div>
            <div
              style={{
                fontSize: "27px",
                color: INK_2,
                marginTop: "26px",
                maxWidth: "820px",
                lineHeight: 1.35,
              }}
            >
              Les annonces qui vous correspondent, notées sur 100, avec un message prêt à envoyer.
              Tout reste sur votre ordinateur.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "168px",
              height: "168px",
              background: INK,
              color: PAPER,
              padding: "18px",
            }}
          >
            <div style={{ fontSize: "16px", letterSpacing: "0.04em", color: "#9EA3A6" }}>NOTE</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
              <div style={{ fontSize: "72px", lineHeight: 1 }}>97</div>
              <div style={{ fontSize: "18px", color: "#9EA3A6" }}>/100</div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "40px",
            paddingTop: "22px",
            borderTop: `1px solid ${RULE_FORT}`,
            fontSize: "24px",
            color: INK_2,
          }}
        >
          <div>{domaineAffiche()}</div>
          <div style={{ color: ACCENT, background: PAPER_2, padding: "0 10px" }}>Gratuit pendant l&apos;essai</div>
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
