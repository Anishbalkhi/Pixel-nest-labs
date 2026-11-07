import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const ROOT = process.cwd();

console.log("=== Generating Brand Reel (1920x1080, 25s, 24fps) ===");

const outReel = path.join(ROOT, "public/videos/brand-reel.mp4");
const outPoster = path.join(ROOT, "public/videos/brand-reel-poster.jpg");
const logoPath = path.join(ROOT, "public/logo.webp");

// Temp directory for shot clips
const tmpDir = path.join(ROOT, "tmp_reel");
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

// Shots:
// Shot 1: Digital presence (5s) - slow zoom-in
console.log("Rendering Shot 1: Pixels Arrive...");
const shot1 = path.join(tmpDir, "shot1.mp4");
execSync(`ffmpeg -y -loop 1 -i "public/images/services/digital-presence.jpg" -vf "zoompan=z='1+0.08*on/120':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=120:s=1920x1080:fps=24" -c:v libx264 -crf 22 -preset medium -pix_fmt yuv420p -t 5 "${shot1}"`, { stdio: "ignore" });

// Shot 2: Web & E-commerce (5s) - slow drift
console.log("Rendering Shot 2: Websites & E-commerce...");
const shot2 = path.join(tmpDir, "shot2.mp4");
execSync(`ffmpeg -y -loop 1 -i "public/images/services/web-commerce.jpg" -vf "zoompan=z='1.05-0.05*on/120':x='iw/2-(iw/zoom/2)+15*sin(PI*on/120)':y='ih/2-(ih/zoom/2)':d=120:s=1920x1080:fps=24" -c:v libx264 -crf 22 -preset medium -pix_fmt yuv420p -t 5 "${shot2}"`, { stdio: "ignore" });

// Shot 3: CRM & Salesforce (5s) - gentle push-in
console.log("Rendering Shot 3: CRM & Pipeline...");
const shot3 = path.join(tmpDir, "shot3.mp4");
execSync(`ffmpeg -y -loop 1 -i "public/images/services/crm-salesforce.jpg" -vf "zoompan=z='1+0.06*on/120':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=120:s=1920x1080:fps=24" -c:v libx264 -crf 22 -preset medium -pix_fmt yuv420p -t 5 "${shot3}"`, { stdio: "ignore" });

// Shot 4: AI & Data Science (5s) - subtle zoom
console.log("Rendering Shot 4: AI & Data Science...");
const shot4 = path.join(tmpDir, "shot4.mp4");
execSync(`ffmpeg -y -loop 1 -i "public/images/services/ai-data.jpg" -vf "zoompan=z='1.06-0.06*on/120':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=120:s=1920x1080:fps=24" -c:v libx264 -crf 22 -preset medium -pix_fmt yuv420p -t 5 "${shot4}"`, { stdio: "ignore" });

// Shot 5: Clean Finish with Real Logo (5s) on #0A0F2C
console.log("Rendering Shot 5: Clean Finish with Logo...");
const shot5 = path.join(tmpDir, "shot5.mp4");
// We overlay the real logo centered on #0A0F2C background with fade in
execSync(`ffmpeg -y -f lavfi -i color=c=0x0A0F2C:s=1920x1080:d=5 -i "${logoPath}" -filter_complex "[1:v]scale=320:-1,format=rgba,fade=t=in:st=0.5:d=1.5:alpha=1[logo];[0:v][logo]overlay=(W-w)/2:(H-h)/2-40:format=auto" -c:v libx264 -crf 22 -preset medium -pix_fmt yuv420p -t 5 "${shot5}"`, { stdio: "ignore" });

// Concatenate all 5 shots with concat demuxer
console.log("Joining shots...");
const concatList = path.join(tmpDir, "list.txt");
fs.writeFileSync(concatList, `file 'shot1.mp4'\nfile 'shot2.mp4'\nfile 'shot3.mp4'\nfile 'shot4.mp4'\nfile 'shot5.mp4'\n`);

const combinedVideo = path.join(tmpDir, "video_only.mp4");
execSync(`ffmpeg -y -f concat -safe 0 -i "${concatList}" -c copy "${combinedVideo}"`, { stdio: "ignore" });

// Generate warm ambient background electronic tone track (25s) with subtle chords
console.log("Generating ambient background soundtrack...");
const audioPath = path.join(tmpDir, "soundtrack.aac");
execSync(`ffmpeg -y -f lavfi -i "sine=frequency=220:duration=25[s1];sine=frequency=330:duration=25[s2];sine=frequency=440:duration=25[s3];sine=frequency=110:duration=25[bass];[s1][s2][s3][bass]amix=inputs=4:weights=0.3 0.25 0.2 0.4,lowpass=f=400,volume=0.25,afade=t=in:st=0:d=2,afade=t=out:st=22:d=3" -c:a aac -b:a 128k "${audioPath}"`, { stdio: "ignore" });

// Mux final reel
console.log("Muxing final brand reel...");
execSync(`ffmpeg -y -i "${combinedVideo}" -i "${audioPath}" -c:v copy -c:a aac -movflags +faststart "${outReel}"`, { stdio: "ignore" });

// Generate poster frame
console.log("Generating poster frame...");
execSync(`ffmpeg -y -i "${outReel}" -frames:v 1 -q:v 3 "${outPoster}"`, { stdio: "ignore" });

// Clean up temp
fs.rmSync(tmpDir, { recursive: true, force: true });

console.log("=== Brand Reel Created Successfully ===");

