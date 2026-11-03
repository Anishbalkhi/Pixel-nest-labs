import { markPixels, sunPixel } from "@/components/brand/pixels";

/** The pixel mark drawn with plain boxes, for generated images (share card, app icon). */
export function OgMark({ width }: { width: number }) {
  const scale = width / 640;
  return (
    <div style={{ display: "flex", position: "relative", width, height: 480 * scale }}>
      {[...markPixels, sunPixel].map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: (p.x - p.size / 2 + 320) * scale,
            top: (p.y - p.size / 2 + 40) * scale,
            width: p.size * scale,
            height: p.size * scale,
            borderRadius: p.size * 0.17 * scale,
            background: p.color,
          }}
        />
      ))}
    </div>
  );
}
