import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const BRAIN_DIR = "C:\\Users\\user\\.gemini\\antigravity\\brain\\636bfc1f-564c-4caa-a6d0-21dee7ff5a60";
const ROOT_DIR = process.cwd();

// Find the latest file in BRAIN_DIR that contains the prefix
function findLatestImage(prefix) {
  if (!fs.existsSync(BRAIN_DIR)) return null;
  const files = fs.readdirSync(BRAIN_DIR).filter(f => f.endsWith(".jpg"));
  const cleanPrefix = prefix.replace(/-/g, "_");
  const matches = files.filter(f => f.toLowerCase().startsWith(cleanPrefix) || f.toLowerCase().startsWith(prefix));
  if (matches.length === 0) return null;
  // Sort by mtime descending
  matches.sort((a, b) => {
    const statA = fs.statSync(path.join(BRAIN_DIR, a));
    const statB = fs.statSync(path.join(BRAIN_DIR, b));
    return statB.mtimeMs - statA.mtimeMs;
  });
  return path.join(BRAIN_DIR, matches[0]);
}

const services = [
  { key: "digital-presence", file: "public/images/services/digital-presence.jpg", video: "public/videos/services/digital-presence.mp4" },
  { key: "web-commerce", file: "public/images/services/web-commerce.jpg", video: "public/videos/services/web-commerce.mp4" },
  { key: "crm-salesforce", file: "public/images/services/crm-salesforce.jpg", video: "public/videos/services/crm-salesforce.mp4" },
  { key: "ai-data", file: "public/images/services/ai-data.jpg", video: "public/videos/services/ai-data.mp4" },
  { key: "java-enterprise", file: "public/images/services/java-enterprise.jpg", video: "public/videos/services/java-enterprise.mp4" },
];

const processSteps = [
  { key: "discover", file: "public/images/process/discover.jpg" },
  { key: "design", file: "public/images/process/design.jpg" },
  { key: "build", file: "public/images/process/build.jpg" },
  { key: "launch", file: "public/images/process/launch.jpg" },
  { key: "support", file: "public/images/process/support.jpg" },
];

const galleryCards = [
  { key: "websites", file: "public/images/gallery/websites.jpg" },
  { key: "shopify-stores", file: "public/images/gallery/shopify-stores.jpg" },
  { key: "crms", file: "public/images/gallery/crms.jpg" },
  { key: "ai-tools", file: "public/images/gallery/ai-tools.jpg" },
  { key: "dashboards", file: "public/images/gallery/dashboards.jpg" },
  { key: "catalogues", file: "public/images/gallery/catalogues.jpg" },
  { key: "instagram-grids", file: "public/images/gallery/instagram-grids.jpg" },
  { key: "custom-software", file: "public/images/gallery/custom-software.jpg" },
];

const products = [
  { key: "path-lab", file: "public/images/products/path-lab.jpg" },
  { key: "crm", file: "public/images/products/crm.jpg" },
  { key: "restaurant", file: "public/images/products/restaurant.jpg" },
  { key: "admission", file: "public/images/products/admission.jpg" },
];

function processImages() {
  console.log("=== Checking and Processing Images ===");
  
  // 1. Services: 1600x1000
  for (const s of services) {
    const src = findLatestImage(s.key);
    if (!src) {
      console.log(`[Pending] Service image: ${s.key}`);
      continue;
    }
    const dest = path.join(ROOT_DIR, s.file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    console.log(`[Processing] ${s.key} -> ${s.file}`);
    const cmd = `ffmpeg -y -i "${src}" -vf "scale=1600:1000:force_original_aspect_ratio=increase,crop=1600:1000" -q:v 2 "${dest}"`;
    execSync(cmd, { stdio: "ignore" });

    // Video loop
    const destVideo = path.join(ROOT_DIR, s.video);
    fs.mkdirSync(path.dirname(destVideo), { recursive: true });
    if (!fs.existsSync(destVideo)) {
      console.log(`[Generating Loop] ${s.video}`);
      const vcmd = `ffmpeg -y -loop 1 -i "${dest}" -vf "zoompan=z='1+0.06*0.5*(1-cos(2*PI*on/192))':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)+3*sin(2*PI*on/192)':d=192:s=1280x800:fps=24" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart -t 8 "${destVideo}"`;
      execSync(vcmd, { stdio: "ignore" });
    }
  }

  // 2. Process: 1200x1200
  for (const p of processSteps) {
    const src = findLatestImage(p.key);
    if (!src) {
      console.log(`[Pending] Process image: ${p.key}`);
      continue;
    }
    const dest = path.join(ROOT_DIR, p.file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    console.log(`[Processing] ${p.key} -> ${p.file}`);
    const cmd = `ffmpeg -y -i "${src}" -vf "scale=1200:1200:force_original_aspect_ratio=increase,crop=1200:1200" -q:v 2 "${dest}"`;
    execSync(cmd, { stdio: "ignore" });
  }

  // 3. Gallery: 1000x1200
  for (const g of galleryCards) {
    const src = findLatestImage(g.key);
    if (!src) {
      console.log(`[Pending] Gallery image: ${g.key}`);
      continue;
    }
    const dest = path.join(ROOT_DIR, g.file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    console.log(`[Processing] ${g.key} -> ${g.file}`);
    const cmd = `ffmpeg -y -i "${src}" -vf "scale=1000:1200:force_original_aspect_ratio=increase,crop=1000:1200" -q:v 2 "${dest}"`;
    execSync(cmd, { stdio: "ignore" });
  }

  // 4. Products: 1600x1200
  for (const pr of products) {
    const src = findLatestImage(pr.key);
    if (!src) {
      console.log(`[Pending] Product image: ${pr.key}`);
      continue;
    }
    const dest = path.join(ROOT_DIR, pr.file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    console.log(`[Processing] ${pr.key} -> ${pr.file}`);
    const cmd = `ffmpeg -y -i "${src}" -vf "scale=1600:1200:force_original_aspect_ratio=increase,crop=1600:1200" -q:v 2 "${dest}"`;
    execSync(cmd, { stdio: "ignore" });
  }
}

processImages();

