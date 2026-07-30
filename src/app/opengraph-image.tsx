import { ImageResponse } from "next/og";

// Default social-share image for the whole site (Open Graph + Twitter). Next
// applies this to every route that doesn't set its own image, so shared links
// always show a branded preview — no manual upload needed. A page can still
// override it (e.g. blog posts use their cover image).
export const alt = "Unexus AI — Digital Marketing, Web & AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #05070f 0%, #0b1020 55%, #131a33 100%)",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "26px",
              height: "26px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #818cf8, #6366f1)",
            }}
          />
          <div style={{ color: "#c7d2fe", fontSize: "30px", letterSpacing: "6px", fontWeight: 600 }}>
            UNEXUS AI
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#ffffff",
              fontSize: "76px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-2px",
            }}
          >
            <div>Digital Marketing, Web &amp; AI —</div>
            <div>run by one team.</div>
          </div>
          <div style={{ color: "#94a3b8", fontSize: "32px", fontWeight: 400 }}>
            SEO · GEO · Paid Media · AI Automation
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ height: "4px", width: "72px", background: "#6366f1", borderRadius: "2px" }} />
          <div style={{ color: "#64748b", fontSize: "26px" }}>Dubai · India · Middle East</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
