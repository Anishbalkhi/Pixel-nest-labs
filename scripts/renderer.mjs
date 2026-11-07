import fs from "node:fs";
import { execSync } from "node:child_process";

// Helper to write a PPM image and convert to JPG via ffmpeg
export function createPPM(width, height, bgHex) {
  const bg = parseHex(bgHex);
  const data = Buffer.alloc(width * height * 3);
  for (let i = 0; i < width * height; i++) {
    data[i * 3] = bg.r;
    data[i * 3 + 1] = bg.g;
    data[i * 3 + 2] = bg.b;
  }
  return {
    width,
    height,
    data,
    setPixel(x, y, r, g, b, a = 1.0) {
      x = Math.round(x);
      y = Math.round(y);
      if (x < 0 || x >= width || y < 0 || y >= height) return;
      const idx = (y * width + x) * 3;
      if (a >= 1.0) {
        data[idx] = r;
        data[idx + 1] = g;
        data[idx + 2] = b;
      } else {
        data[idx] = Math.round(data[idx] * (1 - a) + r * a);
        data[idx + 1] = Math.round(data[idx + 1] * (1 - a) + g * a);
        data[idx + 2] = Math.round(data[idx + 2] * (1 - a) + b * a);
      }
    },
    drawRect(x, y, w, h, hex, a = 1.0) {
      const c = parseHex(hex);
      for (let py = Math.max(0, Math.floor(y)); py < Math.min(height, Math.ceil(y + h)); py++) {
        for (let px = Math.max(0, Math.floor(x)); px < Math.min(width, Math.ceil(x + w)); px++) {
          this.setPixel(px, py, c.r, c.g, c.b, a);
        }
      }
    },
    drawShadow(cx, cy, rx, ry, a = 0.25) {
      for (let py = Math.max(0, Math.floor(cy - ry * 2)); py < Math.min(height, Math.ceil(cy + ry * 2)); py++) {
        for (let px = Math.max(0, Math.floor(cx - rx * 2)); px < Math.min(width, Math.ceil(cx + rx * 2)); px++) {
          const dx = (px - cx) / rx;
          const dy = (py - cy) / ry;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 2.0) {
            const alpha = a * Math.max(0, (1.0 - dist / 2.0) ** 1.8);
            this.setPixel(px, py, 10, 15, 44, alpha);
          }
        }
      }
    },
    // Draw an isometric / 3D clay box
    drawIsoCube(x, y, s, h, hex) {
      const c = parseHex(hex);
      const topC = shade(c, 1.08);
      const leftC = shade(c, 0.72);
      const rightC = shade(c, 0.88);
      
      // Shadow under the cube
      this.drawShadow(x, y + h * 0.4, s * 1.2, s * 0.5, 0.35);

      // We draw the 3 faces: Top, Left, Right
      // Isometric projection:
      // dx = (u - v) * cos(30), dy = (u + v) * sin(30) - z
      const cos30 = 0.866;
      const sin30 = 0.5;

      const project = (u, v, z) => ({
        px: x + (u - v) * s * cos30,
        py: y + (u + v) * s * sin30 - z * h
      });

      // Top face: z = 1, u in [0,1], v in [0,1]
      fillPoly(this, [
        project(0, 0, 1),
        project(1, 0, 1),
        project(1, 1, 1),
        project(0, 1, 1)
      ], topC);

      // Left face: v = 1, u in [0,1], z in [0,1]
      fillPoly(this, [
        project(0, 1, 0),
        project(1, 1, 0),
        project(1, 1, 1),
        project(0, 1, 1)
      ], leftC);

      // Right face: u = 1, v in [0,1], z in [0,1]
      fillPoly(this, [
        project(1, 0, 0),
        project(1, 1, 0),
        project(1, 1, 1),
        project(1, 0, 1)
      ], rightC);
    },
    saveJpg(outJpgPath) {
      const header = Buffer.from(`P6\n${width} ${height}\n255\n`);
      const ppmPath = outJpgPath.replace(/\.jpg$/, ".ppm");
      fs.writeFileSync(ppmPath, Buffer.concat([header, data]));
      execSync(`ffmpeg -y -i "${ppmPath}" -q:v 2 "${outJpgPath}"`, { stdio: "ignore" });
      if (fs.existsSync(ppmPath)) fs.unlinkSync(ppmPath);
    }
  };
}

function parseHex(hex) {
  hex = hex.replace("#", "");
  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16),
  };
}

function shade(c, factor) {
  return {
    r: Math.min(255, Math.max(0, Math.round(c.r * factor))),
    g: Math.min(255, Math.max(0, Math.round(c.g * factor))),
    b: Math.min(255, Math.max(0, Math.round(c.b * factor))),
  };
}

function fillPoly(canvas, pts, color) {
  // Scanline polygon fill
  let minY = Math.floor(Math.min(...pts.map(p => p.py)));
  let maxY = Math.ceil(Math.max(...pts.map(p => p.py)));
  minY = Math.max(0, minY);
  maxY = Math.min(canvas.height - 1, maxY);

  for (let y = minY; y <= maxY; y++) {
    const nodes = [];
    for (let i = 0; i < pts.length; i++) {
      const p1 = pts[i];
      const p2 = pts[(i + 1) % pts.length];
      if ((p1.py < y && p2.py >= y) || (p2.py < y && p1.py >= y)) {
        nodes.push(p1.px + (y - p1.py) / (p2.py - p1.py) * (p2.px - p1.px));
      }
    }
    nodes.sort((a, b) => a - b);
    for (let i = 0; i < nodes.length; i += 2) {
      if (nodes[i + 1] === undefined) break;
      const x1 = Math.max(0, Math.floor(nodes[i]));
      const x2 = Math.min(canvas.width - 1, Math.ceil(nodes[i + 1]));
      for (let x = x1; x <= x2; x++) {
        canvas.setPixel(x, y, color.r, color.g, color.b);
      }
    }
  }
}

