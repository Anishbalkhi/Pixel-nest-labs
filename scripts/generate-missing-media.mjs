import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { createPPM } from "./renderer.mjs";

const ROOT = process.cwd();

console.log("=== Generating High-Fidelity 3D Clay Still-Life Images ===");

// 1. Service: Java & Enterprise (1600 x 1000) on #0A0F2C
{
  const p = path.join(ROOT, "public/images/services/java-enterprise.jpg");
  if (!fs.existsSync(p)) {
    console.log("Rendering java-enterprise.jpg...");
    const canvas = createPPM(1600, 1000, "#0A0F2C");
    
    // Server stack 1 (main)
    canvas.drawIsoCube(650, 700, 160, 90, "#F4F4F2");
    canvas.drawIsoCube(650, 600, 160, 90, "#EAEAE6");
    canvas.drawIsoCube(650, 500, 160, 90, "#F4F4F2");
    
    // Status lights on server 1
    canvas.drawIsoCube(590, 630, 18, 12, "#1FB89A");
    canvas.drawIsoCube(630, 645, 18, 12, "#F7A21B");
    canvas.drawIsoCube(590, 530, 18, 12, "#1FB89A");

    // Server stack 2 (smaller)
    canvas.drawIsoCube(1000, 760, 110, 70, "#F4F4F2");
    canvas.drawIsoCube(1000, 680, 110, 70, "#EAEAE6");
    canvas.drawIsoCube(960, 715, 14, 10, "#1FB89A");

    // Cobalt connection cables
    canvas.drawIsoCube(800, 780, 25, 15, "#0B57C2");
    canvas.drawIsoCube(850, 790, 25, 15, "#0B57C2");

    // Ceramic coffee cup in yellow
    canvas.drawIsoCube(480, 780, 55, 65, "#F7A21B");

    // Floating pixel cubes
    canvas.drawIsoCube(420, 380, 32, 32, "#1FB89A");
    canvas.drawIsoCube(880, 320, 28, 28, "#F7A21B");
    canvas.drawIsoCube(1150, 480, 36, 36, "#0B57C2");
    canvas.drawIsoCube(680, 280, 24, 24, "#F4F4F2");

    canvas.saveJpg(p);

    // Generate loop video
    const vp = path.join(ROOT, "public/videos/services/java-enterprise.mp4");
    console.log("Generating java-enterprise.mp4 loop...");
    const cmd = `ffmpeg -y -loop 1 -i "${p}" -vf "zoompan=z='1+0.06*0.5*(1-cos(2*PI*on/192))':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)+3*sin(2*PI*on/192)':d=192:s=1280x800:fps=24" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart -t 8 "${vp}"`;
    execSync(cmd, { stdio: "ignore" });
  }
}

// 2. Process: Build (1200 x 1200) on #F4F4F2
{
  const p = path.join(ROOT, "public/images/process/build.jpg");
  if (!fs.existsSync(p)) {
    console.log("Rendering build.jpg...");
    const canvas = createPPM(1200, 1200, "#F4F4F2");
    // Laptop base & screen
    canvas.drawShadow(600, 680, 320, 120, 0.25);
    canvas.drawRect(380, 380, 440, 280, "#0A0F2C");
    canvas.drawRect(400, 400, 400, 240, "#121A38"); // screen
    // Abstract code bars
    canvas.drawRect(420, 430, 180, 14, "#0B57C2");
    canvas.drawRect(420, 460, 260, 14, "#1FB89A");
    canvas.drawRect(450, 490, 140, 14, "#F7A21B");
    canvas.drawRect(450, 520, 200, 14, "#F4F4F2");
    canvas.drawRect(420, 550, 110, 14, "#0B57C2");
    canvas.drawRect(420, 580, 240, 14, "#1FB89A");
    // Yellow coffee cup
    canvas.drawShadow(920, 580, 70, 70, 0.2);
    canvas.drawIsoCube(920, 560, 55, 60, "#F7A21B");
    // Floating pixel cubes
    canvas.drawIsoCube(280, 450, 35, 35, "#0B57C2");
    canvas.drawIsoCube(950, 350, 40, 40, "#1FB89A");
    canvas.drawIsoCube(320, 750, 30, 30, "#F7A21B");
    canvas.saveJpg(p);
  }
}

// 3. Process: Launch (1200 x 1200) on #F4F4F2
{
  const p = path.join(ROOT, "public/images/process/launch.jpg");
  if (!fs.existsSync(p)) {
    console.log("Rendering launch.jpg...");
    const canvas = createPPM(1200, 1200, "#F4F4F2");
    // Launchpad box
    canvas.drawIsoCube(600, 880, 240, 90, "#D4C7B5");
    // Smoke puffs made of stacked cubes
    canvas.drawIsoCube(550, 750, 60, 50, "#EAEAE6");
    canvas.drawIsoCube(650, 760, 65, 55, "#FFFFFF");
    canvas.drawIsoCube(600, 700, 50, 45, "#EAEAE6");
    // Toy Rocket made of cubes
    canvas.drawIsoCube(600, 560, 90, 140, "#0B57C2");
    canvas.drawIsoCube(600, 400, 60, 90, "#F7A21B"); // Nose cone cube
    // Fins
    canvas.drawIsoCube(510, 610, 35, 60, "#1FB89A");
    canvas.drawIsoCube(690, 610, 35, 60, "#1FB89A");
    // Floating pixel cubes
    canvas.drawIsoCube(340, 360, 36, 36, "#F7A21B");
    canvas.drawIsoCube(860, 320, 40, 40, "#0B57C2");
    canvas.drawIsoCube(260, 680, 28, 28, "#1FB89A");
    canvas.saveJpg(p);
  }
}

// 4. Process: Support (1200 x 1200) on #F4F4F2
{
  const p = path.join(ROOT, "public/images/process/support.jpg");
  if (!fs.existsSync(p)) {
    console.log("Rendering support.jpg...");
    const canvas = createPPM(1200, 1200, "#F4F4F2");
    // Life ring in yellow and white
    canvas.drawShadow(460, 620, 190, 130, 0.22);
    canvas.drawIsoCube(460, 600, 140, 60, "#F7A21B");
    canvas.drawIsoCube(460, 580, 110, 50, "#FFFFFF");
    canvas.drawIsoCube(460, 560, 80, 40, "#F7A21B");
    // Toolbox
    canvas.drawShadow(820, 620, 180, 120, 0.22);
    canvas.drawIsoCube(820, 640, 160, 90, "#0B57C2");
    // Tools (wrench & screwdriver shapes)
    canvas.drawIsoCube(800, 530, 30, 100, "#0A0F2C");
    canvas.drawIsoCube(850, 520, 22, 110, "#1FB89A");
    // Floating cubes
    canvas.drawIsoCube(320, 380, 36, 36, "#1FB89A");
    canvas.drawIsoCube(920, 380, 38, 38, "#F7A21B");
    canvas.saveJpg(p);
  }
}

// 5. Gallery: Dashboards (1000 x 1200) on #0E76A6
{
  const p = path.join(ROOT, "public/images/gallery/dashboards.jpg");
  if (!fs.existsSync(p)) {
    console.log("Rendering dashboards.jpg...");
    const canvas = createPPM(1000, 1200, "#0E76A6");
    // Tablet standing upright
    canvas.drawShadow(500, 840, 240, 70, 0.35);
    canvas.drawIsoCube(500, 720, 220, 280, "#F4F4F2");
    // Bar chart on screen
    canvas.drawIsoCube(430, 650, 30, 70, "#1FB89A");
    canvas.drawIsoCube(470, 640, 30, 110, "#F7A21B");
    canvas.drawIsoCube(510, 620, 30, 150, "#0B57C2");
    canvas.drawIsoCube(550, 600, 30, 190, "#1FB89A");
    // Floating pixel cubes
    canvas.drawIsoCube(240, 420, 32, 32, "#F7A21B");
    canvas.drawIsoCube(780, 380, 36, 36, "#FFFFFF");
    canvas.drawIsoCube(760, 740, 28, 28, "#1FB89A");
    canvas.saveJpg(p);
  }
}

// 6. Gallery: Catalogues (1000 x 1200) on #0B57C2
{
  const p = path.join(ROOT, "public/images/gallery/catalogues.jpg");
  if (!fs.existsSync(p)) {
    console.log("Rendering catalogues.jpg...");
    const canvas = createPPM(1000, 1200, "#0B57C2");
    // Open catalogue book
    canvas.drawShadow(500, 800, 260, 80, 0.35);
    canvas.drawIsoCube(420, 700, 160, 200, "#F4F4F2");
    canvas.drawIsoCube(580, 700, 160, 200, "#EAEAE6");
    // Colour block products inside
    canvas.drawIsoCube(400, 640, 45, 45, "#1FB89A");
    canvas.drawIsoCube(400, 710, 45, 45, "#F7A21B");
    canvas.drawIsoCube(560, 640, 45, 45, "#0A0F2C");
    canvas.drawIsoCube(560, 710, 45, 45, "#1FB89A");
    // Floating cubes
    canvas.drawIsoCube(260, 440, 32, 32, "#F7A21B");
    canvas.drawIsoCube(760, 400, 36, 36, "#1FB89A");
    canvas.drawIsoCube(740, 780, 28, 28, "#F4F4F2");
    canvas.saveJpg(p);
  }
}

// 7. Gallery: Instagram Grids (1000 x 1200) on #1FB89A
{
  const p = path.join(ROOT, "public/images/gallery/instagram-grids.jpg");
  if (!fs.existsSync(p)) {
    console.log("Rendering instagram-grids.jpg...");
    const canvas = createPPM(1000, 1200, "#1FB89A");
    // Smartphone standing upright
    canvas.drawShadow(500, 820, 180, 60, 0.35);
    canvas.drawIsoCube(500, 700, 140, 280, "#0A0F2C");
    // 3x3 colour grid on screen
    const colors = ["#0B57C2", "#F7A21B", "#F4F4F2", "#1FB89A", "#0B57C2", "#F7A21B", "#F4F4F2", "#1FB89A", "#0B57C2"];
    let k = 0;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        canvas.drawIsoCube(460 + (c - 1) * 32, 580 + (r - 1) * 45, 20, 20, colors[k++]);
      }
    }
    // Floating photo prints
    canvas.drawIsoCube(280, 520, 40, 40, "#F4F4F2");
    canvas.drawIsoCube(720, 480, 42, 42, "#F7A21B");
    canvas.drawIsoCube(740, 740, 35, 35, "#0B57C2");
    canvas.saveJpg(p);
  }
}

// 8. Gallery: Custom Software (1000 x 1200) on #0A0F2C
{
  const p = path.join(ROOT, "public/images/gallery/custom-software.jpg");
  if (!fs.existsSync(p)) {
    console.log("Rendering custom-software.jpg...");
    const canvas = createPPM(1000, 1200, "#0A0F2C");
    // Layered app windows
    canvas.drawShadow(500, 800, 240, 70, 0.35);
    canvas.drawIsoCube(450, 740, 180, 120, "#1A234A");
    canvas.drawIsoCube(500, 680, 180, 120, "#233066");
    canvas.drawIsoCube(550, 620, 180, 120, "#F4F4F2");
    // App interface content on top window
    canvas.drawIsoCube(520, 560, 30, 15, "#0B57C2");
    canvas.drawIsoCube(560, 575, 30, 15, "#1FB89A");
    canvas.drawIsoCube(600, 590, 30, 15, "#F7A21B");
    // Floating pixel cubes
    canvas.drawIsoCube(260, 420, 32, 32, "#1FB89A");
    canvas.drawIsoCube(760, 380, 36, 36, "#F7A21B");
    canvas.drawIsoCube(320, 760, 28, 28, "#0B57C2");
    canvas.saveJpg(p);
  }
}

// 9. Products: Restaurant Manager (1600 x 1200) on #F4F4F2
{
  const p = path.join(ROOT, "public/images/products/restaurant.jpg");
  if (!fs.existsSync(p)) {
    console.log("Rendering restaurant.jpg...");
    const canvas = createPPM(1600, 1200, "#F4F4F2");
    canvas.drawShadow(800, 800, 400, 140, 0.22);
    // Laptop screen
    canvas.drawIsoCube(800, 680, 340, 240, "#0A0F2C");
    // Floor plan tables on screen
    canvas.drawIsoCube(700, 590, 40, 25, "#0B57C2");
    canvas.drawIsoCube(770, 610, 40, 25, "#1FB89A");
    canvas.drawIsoCube(840, 630, 40, 25, "#F7A21B");
    // Kitchen order tickets
    canvas.drawIsoCube(920, 610, 30, 70, "#FFFFFF");
    // Floating cubes
    canvas.drawIsoCube(450, 450, 40, 40, "#F7A21B");
    canvas.drawIsoCube(1150, 480, 45, 45, "#0B57C2");
    canvas.saveJpg(p);
  }
}

// 10. Products: Admission Manager (1600 x 1200) on #F4F4F2
{
  const p = path.join(ROOT, "public/images/products/admission.jpg");
  if (!fs.existsSync(p)) {
    console.log("Rendering admission.jpg...");
    const canvas = createPPM(1600, 1200, "#F4F4F2");
    canvas.drawShadow(800, 800, 400, 140, 0.22);
    // Laptop screen
    canvas.drawIsoCube(800, 680, 340, 240, "#0A0F2C");
    // Progress bar
    canvas.drawIsoCube(720, 540, 60, 15, "#1FB89A");
    canvas.drawIsoCube(780, 555, 60, 15, "#1FB89A");
    canvas.drawIsoCube(840, 570, 60, 15, "#F7A21B");
    canvas.drawIsoCube(900, 585, 60, 15, "#FFFFFF");
    // Form fields
    canvas.drawIsoCube(750, 620, 140, 20, "#FFFFFF");
    canvas.drawIsoCube(790, 660, 140, 20, "#FFFFFF");
    // Floating cubes
    canvas.drawIsoCube(420, 440, 40, 40, "#1FB89A");
    canvas.drawIsoCube(1180, 460, 45, 45, "#F7A21B");
    canvas.saveJpg(p);
  }
}

console.log("=== All Images Rendered Successfully ===");

