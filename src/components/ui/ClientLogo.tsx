import Image from "next/image";
import type { Client } from "@/lib/constants";

const ACCENTS = ["#6366f1", "#7c3aed", "#06b6d4", "#f59e0b", "#10b981", "#ec4899", "#818cf8", "#67e8f9"];

/** Two-letter monogram from a client name (handles single words + symbols). */
function initials(name: string): string {
  const words = name.replace(/[^a-zA-Z0-9 ]/g, " ").trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

interface Props {
  client: Client;
  index?: number;
  /** Tile size in px. */
  size?: number;
  /** Tile shape. */
  shape?: "rounded" | "circle";
  /** Show the corner country-flag badge. */
  showFlag?: boolean;
  /** Drop the white tile behind logos and show the image directly. */
  transparentLogo?: boolean;
}

/**
 * Renders a client's logo on a light tile, or a gradient monogram tile when no
 * logo file is available — with a small country-flag badge in the corner.
 */
export default function ClientLogo({ client, index = 0, size = 80, shape = "rounded", showFlag = true, transparentLogo = false }: Props) {
  const radius = shape === "circle" ? "50%" : Math.round(size * 0.22);
  const accent = ACCENTS[index % ACCENTS.length];

  const tile = client.logo ? (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: transparentLogo ? "transparent" : "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: transparentLogo ? 0 : Math.round(size * 0.18),
      }}
    >
      <Image
        src={client.logo}
        alt={client.logoAlt || `${client.name} logo`}
        width={size}
        height={size}
        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", width: "auto", height: "auto" }}
      />
    </div>
  ) : (
    <div
      aria-label={client.name}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: `linear-gradient(135deg, ${accent}, var(--color-glow))`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: 800,
        fontSize: Math.round(size * 0.32),
        fontFamily: "var(--font-display)",
        letterSpacing: "-0.02em",
      }}
    >
      {initials(client.name)}
    </div>
  );

  return (
    <div style={{ position: "relative", display: "inline-flex", flexShrink: 0 }}>
      {tile}
      {client.flag && showFlag && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: -3,
            right: -3,
            width: Math.round(size * 0.42),
            height: Math.round(size * 0.3),
            borderRadius: 4,
            overflow: "hidden",
            border: "2px solid var(--color-surface)",
            boxShadow: "0 1px 4px rgba(0,0,0,0.45)",
            background: "var(--color-surface)",
          }}
        >
          <img
            src={`https://flagcdn.com/${client.flag}.svg`}
            alt=""
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </span>
      )}
    </div>
  );
}
