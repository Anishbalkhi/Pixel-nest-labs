import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { OgMark } from "@/lib/og-mark";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The card shown when the site is shared on WhatsApp, LinkedIn, X, Slack and so on. */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 80px",
        background: "#0a1445",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 620 }}>
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#1fb89a", letterSpacing: 2 }}>
          PIXEL NEST LABS
        </div>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 800, lineHeight: 1.05, marginTop: 24 }}>
          {site.tagline}
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "rgba(255,255,255,0.7)", marginTop: 28 }}>
          Websites · Shopify · CRM & Salesforce · AI · Custom tools
        </div>
      </div>
      <OgMark width={380} />
    </div>,
    size,
  );
}
