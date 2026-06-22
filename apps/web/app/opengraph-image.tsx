import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Terouva — trouvez votre logement sans y passer vos journées";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0A0A0B",
          color: "#EDEDEE",
          padding: "80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* radial halo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(126,232,200,0.18), transparent 70%)",
            display: "flex",
          }}
        />
        {/* grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            display: "flex",
          }}
        />

        {/* Top row : logo + version pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #7EE8C8, #5FD4B1)",
              color: "#0A0A0B",
              fontSize: "32px",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            T
          </div>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Terouva
          </div>
          <div
            style={{
              marginLeft: "12px",
              fontSize: "16px",
              padding: "6px 12px",
              borderRadius: "6px",
              border: "1px solid #2c2c33",
              color: "#a3a3aa",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              display: "flex",
            }}
          >
            essai gratuit
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            zIndex: 2,
          }}
        >
          <div
            style={{
              fontSize: "78px",
              fontWeight: 600,
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
              maxWidth: "1000px",
            }}
          >
            Trouvez votre logement
          </div>
          <div
            style={{
              fontSize: "78px",
              fontWeight: 600,
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
              marginTop: "6px",
              background:
                "linear-gradient(90deg, #7EE8C8, #d2f8e8, #FFB84D)",
              backgroundClip: "text",
              color: "transparent",
              maxWidth: "1000px",
            }}
          >
            sans y passer vos journées.
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#a3a3aa",
              marginTop: "32px",
              maxWidth: "900px",
              lineHeight: 1.3,
            }}
          >
            Terouva surveille Leboncoin pour vous et prépare votre message. Vous êtes prévenu dès qu'une annonce vous correspond.
          </div>
        </div>

        {/* Bottom row : signal dot + url */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "80px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "5px",
              background: "#7EE8C8",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: "18px",
              color: "#a3a3aa",
              fontFamily: "monospace",
            }}
          >
            terouva.app
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
