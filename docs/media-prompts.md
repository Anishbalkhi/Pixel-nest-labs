# Image and video prompts for the Pixel Nest Labs site

One place for every picture and video the site needs: which tool to use, the exact size to make each one, where to save it, and a ready-to-paste prompt or shoot brief.

- **Part A:** which tools to use
- **Part B:** images (25 slots; the site already supports them)
- **Part C:** videos (11 clips; see C1 for where each one goes)
- **Part D:** checklist

---

## Part A. Which tools to use

AI tools change fast. These picks were checked in November 2026, so confirm current plans, prices and licences on each tool's site before paying.

### Images

| Pick                      | Tool                                     | Why it suits this site                                                                                                                                                                     |
| ------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Best for this site**    | **Recraft**                              | Lets you lock an exact colour palette (our five hex colours) and a style, then reuse it for every image, so all the illustrations look like one set. Paid plans include commercial rights. |
| Best at following prompts | **ChatGPT image generation (GPT Image)** | Follows long, detailed prompts closely. Generating everything in one chat keeps the set consistent.                                                                                        |
| Most beautiful            | **Midjourney**                           | The strongest look and art direction. Use your best image as a style reference to keep the set consistent. Paid only.                                                                      |
| Free option               | **Google Gemini (Nano Banana)**          | Good quality for free, and good at "same style as this image" edits.                                                                                                                       |
| Safest for commercial use | **Adobe Firefly**                        | Trained on licensed images. Choose it if commercial safety matters most to you.                                                                                                            |

**Recommendation:** make the illustrations in **Recraft**, or in ChatGPT if you already pay for it. Shoot the founder and team photos with a phone or camera, not AI.

### Videos

| Pick             | Tool                                          | Why it suits this site                                                                                                                   |
| ---------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Best overall** | **Google Veo 3.1** (in Gemini or Google Flow) | Follows prompts best and makes clean, realistic motion. It can start and end on images you upload, which is how you make seamless loops. |
| Best control     | **Runway (Gen-4.5)**                          | Strong camera and motion controls and good editing tools. Clips are short (around 10 s), which is fine for loops.                        |
| Best value       | **Kling 3.0**                                 | Low cost, smooth motion, and supports start and end frames.                                                                              |
| Don't use        | Sora                                          | OpenAI has closed the Sora app and is shutting down its API in 2026.                                                                     |

**Recommended workflow:** make the still image first (Part B), then turn it into a video with **image-to-video** in Veo, Runway or Kling, using the same image as both the **first and last frame**. The video then matches the site's illustrations and loops without a jump.

**Editing and compressing:**

- **CapCut** or **DaVinci Resolve** (both free): join shots and add the real logo.
- **HandBrake** (free) or `ffmpeg`: shrink files for the web (see C2).

---

## Part B. Images

Every picture on the site is a slot that shows built-in artwork until you give it a file.

**How to add an image**

1. Save the file in `public/images/...` using the path in the table for that slot.
2. Put the same path (starting with `/images/...`) in the matching field in `src/content/site.ts`.
3. Run `npm run dev`. Empty slots show a small black "photo: …" tag, so you can see which ones are still missing.

**Export settings:** JPG, sRGB, about 80% quality, ideally under 400 KB each. Next.js resizes them for each screen automatically.

### B1. Use real photos for people

Use **real photos** for the **founder portraits** and the **team photo** (B6), not AI images. Visitors will take them as pictures of the actual people behind the studio. A generated face would mislead them, and it goes against the README's rule to keep the site honest.

For the same reason, don't generate anything that looks like client work, client logos or testimonials. Everything else here is illustration (objects, desks, devices), and AI images are fine for those.

### B2. Shared image style (paste at the start of every AI image prompt)

> Bright editorial still-life, matte 3D render with a soft clay finish, square-edged geometric objects, a few small floating cubes like pixels. Strict colour palette: cobalt blue #0B57C2, teal #1FB89A, warm yellow #F7A21B, deep ink navy #0A0F2C, warm off-white #F4F4F2. Flat single-colour seamless background, soft diffused studio light from the top left, gentle long shadow, crisp edges, generous empty space around the subject, centred composition. No text, no letters, no numbers, no logos, no watermarks, no people.

**Negative prompt** (if your tool has one):

> text, words, letters, numbers, logo, watermark, signature, brand names, people, faces, hands, clutter, gradients, neon, glow, lens flare, photorealistic skin, rounded bubbly shapes, pastel colours, purple, red

**Tool tips:**

- **Recraft:** create a custom style with the five hex colours above, then generate every slot with that style.
- **ChatGPT (GPT Image):** paste the shared style and the slot prompt as one message and ask for the size in the table. Make the rest in the same chat and add "same style as the previous image".
- **Midjourney:** add `--ar 16:10 --style raw` (change the ratio for each slot) and `--no text, letters, logo, people`. Use your best image as a style reference (`--sref`) for the rest.
- **Gemini (Nano Banana):** upload your best image and ask for "the same style" for each new slot.

### B3. Services (5 images)

- **Where:** the big pictures in the "What we do" panels.
- **Size:** 1600 × 1000 px (16:10). Phones crop it a little to 16:9.
- **Framing:** the image is zoomed in by 15% and drifts sideways as you scroll, so keep the subject inside the middle 70% with empty background at the edges.
- **Field:** `services[].image`.

| Service                | Save as                                 | Background       |
| ---------------------- | --------------------------------------- | ---------------- |
| Digital Presence       | `/images/services/digital-presence.jpg` | cobalt blue      |
| Web & E-commerce       | `/images/services/web-commerce.jpg`     | deep ink navy    |
| CRM & Salesforce       | `/images/services/crm-salesforce.jpg`   | teal             |
| AI / ML & Data Science | `/images/services/ai-data.jpg`          | sky blue #0E76A6 |
| Java & Enterprise      | `/images/services/java-enterprise.jpg`  | deep ink navy    |

**Digital Presence**

> [shared style] On a flat cobalt blue background: an upright smartphone whose screen shows a 3×3 grid of plain colour squares (teal, yellow, ink, off-white); next to it an open printed product catalogue with blank colour-block pages, and a small square paper shop sign on a tiny easel. Three small yellow and teal cubes float above, like loose pixels. 16:10.

**Web & E-commerce**

> [shared style] On a flat deep ink navy background: an open laptop whose screen shows a simple online-store layout made only of colour blocks (a large blue banner block, a row of four product squares), beside it a square kraft shopping bag and a small cardboard parcel box with teal tape. A few cobalt and yellow cubes float above the laptop. 16:10.

**CRM & Salesforce**

> [shared style] On a flat teal background: a tidy board with three columns of square paper cards (blue, yellow, off-white) pinned in neat rows, like a sales pipeline; in front, a smartphone showing one round notification dot; above, a small cloud shape built from stacked white cubes. 16:10.

**AI / ML & Data Science**

> [shared style] On a flat sky blue background (#0E76A6): a 3D bar chart made of stacked cubes rising from left to right in teal and yellow, the last bars drawn as see-through wireframe cubes to suggest a forecast, with a dotted line continuing upward; a small square speech bubble block floats beside it. 16:10.

**Java & Enterprise**

> [shared style] On a flat deep ink navy background: a neat stack of square server modules in off-white with small teal and yellow status lights, connected by tidy cobalt cables to a second smaller stack; a plain ceramic coffee cup in yellow sits in front. Calm, solid, orderly. 16:10.

### B4. Process steps (5 images)

- **Where:** the square photo in each "How we work" step.
- **Size:** 1200 × 1200 px (1:1).
- **How it shows:** in **black and white**, and quite small (about 144 px on desktop, 64–80 px on phones). Use one bold object with strong contrast and no fine detail.
- **Field:** `process[].image`.

| Step     | Save as                        |
| -------- | ------------------------------ |
| Discover | `/images/process/discover.jpg` |
| Design   | `/images/process/design.jpg`   |
| Build    | `/images/process/build.jpg`    |
| Launch   | `/images/process/launch.jpg`   |
| Support  | `/images/process/support.jpg`  |

**Discover**

> [shared style] Top-down view on a plain off-white surface: a smartphone on speaker call lying next to an open square notebook with a few hand-drawn boxes and a pencil; one yellow sticky note. Single bold composition, high contrast, reads in black and white at thumbnail size. 1:1.

**Design**

> [shared style] Top-down view on a plain off-white surface: a sheet of paper with a hand-drawn website wireframe made of boxes and lines (no words), a steel ruler and a black marker laid beside it, one teal sticky note. High contrast, reads in black and white at thumbnail size. 1:1.

**Build**

> [shared style] Top-down view on a plain off-white surface: an open laptop showing abstract code as rows of coloured bars (no readable text), a coffee cup and a small stack of cubes. High contrast, reads in black and white at thumbnail size. 1:1.

**Launch**

> [shared style] Three-quarter view on a plain off-white background: a small square-edged toy rocket made of cubes, lifting off a cardboard box with a short puff of cube-shaped smoke. Bold silhouette, high contrast, reads in black and white at thumbnail size. 1:1.

**Support**

> [shared style] Top-down view on a plain off-white surface: a life ring in yellow and white lying next to an open toolbox with a single wrench and screwdriver laid neatly. Bold shapes, high contrast, reads in black and white at thumbnail size. 1:1.

### B5. Closing section: curved card strip (8 images)

- **Where:** the cards in the curved strip under "Let's build it, pixel by pixel".
- **Size:** 1000 × 1200 px (5:6, portrait).
- **How it shows:** in full colour, about 140–230 px wide. The card's label isn't shown once a photo is set, so the picture itself has to say what it is.
- **Fields:** `ctaGallery[].image`, plus a short `ctaGallery[].alt` (for example "Laptop showing an online store layout").
- **Backgrounds:** keep each card's background colour from the table, so the strip still alternates colours.

| Card            | Save as                               | Background       |
| --------------- | ------------------------------------- | ---------------- |
| Websites        | `/images/gallery/websites.jpg`        | cobalt blue      |
| Shopify stores  | `/images/gallery/shopify-stores.jpg`  | teal             |
| CRMs            | `/images/gallery/crms.jpg`            | deep ink navy    |
| AI tools        | `/images/gallery/ai-tools.jpg`        | warm yellow      |
| Dashboards      | `/images/gallery/dashboards.jpg`      | sky blue #0E76A6 |
| Catalogues      | `/images/gallery/catalogues.jpg`      | cobalt blue      |
| Instagram grids | `/images/gallery/instagram-grids.jpg` | teal             |
| Custom software | `/images/gallery/custom-software.jpg` | deep ink navy    |

Prompts (start each with the shared style; portrait 5:6, subject centred and filling about 60% of the height):

- **Websites:** _A desktop monitor on a slim stand showing a clean landing-page layout made of colour blocks, on a flat cobalt blue background._
- **Shopify stores:** _A square shopping bag and a small stack of parcel boxes with a phone showing a product grid of colour squares, on a flat teal background._
- **CRMs:** _A card-file box with neat colour-tabbed index cards standing upright, one card lifted out, on a flat deep ink navy background._
- **AI tools:** _A friendly square speech bubble block made of cubes, with three small dots inside, floating above a laptop, on a flat warm yellow background._
- **Dashboards:** _A tablet standing upright showing simple bar and line charts made of colour blocks, on a flat sky blue background._
- **Catalogues:** _A printed product catalogue standing open like a book, pages showing blank colour-block product photos, on a flat cobalt blue background._
- **Instagram grids:** _A smartphone standing upright showing a 3×3 grid of colour squares, with three loose square photo prints floating around it, on a flat teal background._
- **Custom software:** _A small stack of square app windows layered at an angle like cards, each showing simple colour-block interfaces, on a flat deep ink navy background._

### B6. About: team photo and founder portraits (real photos)

These should be **real photos of you**. Below is a short brief for a phone or camera shoot that matches the site.

#### Team photo (`about.teamImage`)

- **Save as:** `/images/about/team.jpg`
- **Size:** 1200 × 1600 px (3:4, portrait).
- **How it shows:** in **black and white**. The tile is tall on desktop but wide and short (about 260 px) on phones, so keep both of you in the **middle third** of the frame.

**Shot brief:** Both founders side by side at a shared desk or standing at a whiteboard, in plain dark or white tops. Use bright, even window light from one side and a plain light wall behind. Shoot at eye level or slightly above, and leave lots of empty space above and below you. A few sticky notes or a laptop is fine; avoid logos, brand names and busy backgrounds. Shoot in colour and let the site turn it black and white; good contrast between your clothes and the wall helps.

#### Founder portraits (`about.founders[].image`)

- **Save as:** `/images/about/founder-1.jpg` and `/images/about/founder-2.jpg`
- **Size:** 1600 × 1000 px (16:10, landscape).
- **How it shows:** in **black and white with extra contrast**, with a solid colour block printed over part of it:
  - **Founder 1:** a teal block covers the **right-centre** (from about 54% to 88% across, 18% to 76% down). Place the **face in the left third**.
  - **Founder 2:** a yellow block covers the **lower left** (from about 10% to 50% across, 40% to 86% down). Place the **face in the right half, upper part**.

**Shot brief:** Head and shoulders against a plain light-grey or white wall, with soft side light from a window. Look at the camera with a relaxed expression, in a plain top with no logos. Keep the same distance and background for both people so the pair matches, and leave space on the side where the colour block sits.

### B7. Products (4 images)

- **Where:**
  - the home "Our products" switcher, at 4:3 in colour with an ink border and hard shadow
  - the Products page spreads, filling half the spread in **black and white**: almost square on desktop, wide and short (about 220 px tall) on phones
- **Size:** 1600 × 1200 px (4:3). Keep the main interface in the **centre**, since the Products page crops the sides and the top and bottom.
- **Field:** `products[].image`.

| Product            | Save as                           |
| ------------------ | --------------------------------- |
| Path Lab Manager   | `/images/products/path-lab.jpg`   |
| Simple CRM         | `/images/products/crm.jpg`        |
| Restaurant Manager | `/images/products/restaurant.jpg` |
| Admission Manager  | `/images/products/admission.jpg`  |

**Best option:** use real screenshots of the products once they exist. Until then, the home page already shows a built-in mock-up of each product, so you can leave these empty. AI tools still draw garbled text on screens, so for a concept image it's usually better to mock up the screen in Figma.

If you do want a concept render, use this pattern (it asks for bars instead of words to avoid fake text):

> [shared style] A laptop at a slight three-quarter angle on a flat off-white background, the screen showing a clean square-cornered app interface for **[PRODUCT]**: **[SCREEN]**. All words are replaced by simple grey bars; only colour blocks, icons and shapes. Palette cobalt blue, teal, yellow and ink navy on white. 4:3, interface centred.

| Product            | [PRODUCT]          | [SCREEN]                                                                                                  |
| ------------------ | ------------------ | --------------------------------------------------------------------------------------------------------- |
| Path Lab Manager   | a pathology lab    | a list of patient samples, each with a barcode, a name bar and a coloured status tag (teal, yellow, blue) |
| Simple CRM         | a small sales team | a pipeline board with three columns of cards (New, Follow-up, Won) and a small reminders panel            |
| Restaurant Manager | a restaurant       | a floor plan of six square tables (some filled blue, one yellow) and a column of kitchen order tickets    |
| Admission Manager  | a school           | a four-step progress bar at the top, a short form with three fields and a "document uploaded" tick        |

---

## Part C. Videos

### C1. Where videos go on the site

The site has a slot for every video below. Save the file in `public/videos/...` and put its path in the field shown in `src/content/site.ts`.

- **Loops (V2–V11):** each sits on top of an image slot. The image shows first and stays as the fallback, and the video fades in once it can play. Loops are **silent, play only while on screen**, and are skipped on phones (under 768 px wide), with reduced motion, or with the browser's data saver on. Those visitors see the still image instead.
- **Brand reel (V1):** a "Watch the reel" button appears in the hero's bottom bar as soon as `hero.reel` is set. It opens the reel in a full-screen player with sound and controls, and the video only downloads when someone opens it.

| #      | Video                    | Where it shows                                           | Field in `site.ts`                | Size / length             | Make it with         |
| ------ | ------------------------ | -------------------------------------------------------- | --------------------------------- | ------------------------- | -------------------- |
| V1     | Brand reel               | "Watch the reel" button in the hero → full-screen player | `hero.reel` (+ `hero.reelPoster`) | 1920 × 1080, 20–30 s      | AI shots + editor    |
| V2–V6  | Service loops (5)        | Over the picture in each "What we do" panel              | `services[].video`                | 1280 × 800, 6–8 s loop    | Image-to-video       |
| V7     | About loop               | Over the tall team tile in About (black and white)       | `about.teamVideo`                 | 1080 × 1440, 6–10 s loop  | **Real footage**     |
| V8–V11 | Product walkthroughs (4) | The home products switcher, in place of the mock-up      | `products[].video`                | 1600 × 1200, 10–15 s loop | **Screen recording** |

### C2. Video file settings

- **Format:** MP4 (H.264). Keep the matching image from Part B set as well: it's the poster while the video loads and what phones see. For the brand reel, set `hero.reelPoster` to a JPG of its first frame.
- **No sound:** loops play muted, so leave the audio out. Only the brand reel (V1) can have music, because it opens in a player with controls.
- **File size:** loops under about **3 MB**, the brand reel under about **12 MB**.
- **Frame rate:** 24 fps, with no fast cuts or flashes, so it's safe for people sensitive to flashing.
- **Where to save:** `public/videos/...` (paths below).

Shrink a video for the web with `ffmpeg` (or HandBrake's "Web" preset). For the brand reel with music, drop `-an` so the sound is kept, and use `scale=1920:-2`:

```bash
ffmpeg -i input.mp4 -an -vf "scale=1280:-2,fps=24" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart output.mp4
```

Save the first frame as the poster:

```bash
ffmpeg -i output.mp4 -frames:v 1 -q:v 3 output-poster.jpg
```

### C3. Shared video style (paste at the start of every AI video prompt)

> Matte 3D clay still-life in a bright editorial style, square-edged geometric objects and small floating cubes like pixels. Strict colour palette: cobalt blue #0B57C2, teal #1FB89A, warm yellow #F7A21B, deep ink navy #0A0F2C, warm off-white #F4F4F2, flat single-colour background. Soft diffused studio light. Slow, smooth, gentle motion; locked-off camera or a very slow push-in; no cuts, no camera shake, no flashing. Seamless loop: the last frame matches the first. No text, no letters, no logos, no people, no sound.

**Negative prompt:**

> text, words, letters, logo, watermark, people, faces, hands, fast motion, flicker, flashing lights, camera shake, cuts, morphing objects, melting, extra objects appearing, colour shift

**Making a loop that doesn't jump:**

1. Upload the matching still from Part B as the **first frame** and, if the tool allows it, the **same image as the last frame**. Veo 3.1 and Kling support start and end frames; in Runway, use keyframes.
2. Ask for 6–8 seconds.
3. If the end still jumps, play the clip forward then backward in your editor ("boomerang"). Slow, gentle motion hides the turn.

### C4. V1: brand reel (`/videos/brand-reel.mp4`)

- **Size:** 1920 × 1080 (16:9), 20–30 s total. Music is optional.
- **How to make it:** AI tools make 8–10 s clips, so generate the **five shots below separately** (5–6 s each) and join them in CapCut or DaVinci Resolve.
- **The logo:** add the **real Pixel Nest Labs logo** in the editor. AI tools can't reproduce a logo exactly, and a near-miss looks off-brand.
- **Ending:** the last 3 seconds show the real logo and the line "pixel by pixel".

**Shot 1: pixels arrive (6 s)**

> [shared video style] On a flat off-white background, dozens of small cobalt, teal and yellow cubes drift in from all sides and click together into a neat grid shape in the centre, one by one, with a soft settling bounce. Slow push-in. 16:9, 6 seconds.

**Shot 2: websites (5 s)**

> [shared video style] On a flat cobalt blue background, an open laptop; on its screen, colour blocks slide into place to build a simple website layout (a wide banner block, then a row of four squares). Two small yellow cubes float up past the screen. Very slow orbit to the right. 16:9, 5 seconds.

**Shot 3: shops and catalogues (5 s)**

> [shared video style] On a flat teal background, a smartphone shows a 3×3 grid of colour squares that light up one after another; beside it a printed catalogue's page turns slowly and a small parcel box closes its lid. Locked-off camera. 16:9, 5 seconds.

**Shot 4: data and AI (5 s)**

> [shared video style] On a flat sky blue background (#0E76A6), cubes stack upward into a bar chart from left to right; the last two bars build as see-through wireframe cubes that then fill in with yellow, like a forecast coming true. Slow push-in. 16:9, 5 seconds.

**Shot 5: clean finish (6 s)**

> [shared video style] On a flat deep ink navy background, all the cubes gather into one tidy square in the centre and settle, leaving lots of empty space around it for a logo to be added later. The camera holds still for the last 3 seconds. 16:9, 6 seconds.

**Music (optional):** a light, warm, minimal electronic track at about 100–110 BPM, with no vocals. Use your editor's licensed library or a royalty-free music site.

### C5. V2–V6: service loops

- **Size:** 1280 × 800 (16:10), **6–8 s seamless loop**, no sound.
- **First and last frame:** the matching service still from B3.
- **Framing:** as with the stills, keep all the motion in the **middle 70%**, because the panel zooms in a little and drifts sideways as you scroll.

| Service                | Save as                                 | Start/end frame        |
| ---------------------- | --------------------------------------- | ---------------------- |
| Digital Presence       | `/videos/services/digital-presence.mp4` | `digital-presence.jpg` |
| Web & E-commerce       | `/videos/services/web-commerce.mp4`     | `web-commerce.jpg`     |
| CRM & Salesforce       | `/videos/services/crm-salesforce.mp4`   | `crm-salesforce.jpg`   |
| AI / ML & Data Science | `/videos/services/ai-data.mp4`          | `ai-data.jpg`          |
| Java & Enterprise      | `/videos/services/java-enterprise.mp4`  | `java-enterprise.jpg`  |

**Digital Presence**

> [shared video style] Animate this image: on the phone screen, the colour squares of the 3×3 grid swap places one at a time like a sliding puzzle; the catalogue's top page lifts slightly and settles; the small floating cubes bob gently up and down. Locked-off camera. Seamless 8-second loop, last frame identical to the first.

**Web & E-commerce**

> [shared video style] Animate this image: on the laptop screen, the four product squares slide in one by one from the right and then out to the left; the parcel box's lid opens a little and closes; the floating cubes drift slowly. Locked-off camera. Seamless 8-second loop, last frame identical to the first.

**CRM & Salesforce**

> [shared video style] Animate this image: one paper card slides from the first column to the second and another from the second column to the third, like deals moving forward; the phone's notification dot pulses once softly; the cube cloud turns very slowly. Locked-off camera. Seamless 8-second loop, last frame identical to the first.

**AI / ML & Data Science**

> [shared video style] Animate this image: the cube bars grow upward one after another, the wireframe forecast cubes fill in with yellow, then everything gently returns to the starting heights; the dotted line draws itself upward; the speech bubble block bobs softly. Locked-off camera. Seamless 8-second loop, last frame identical to the first.

**Java & Enterprise**

> [shared video style] Animate this image: the small teal and yellow status lights on the server modules blink slowly in a calm rhythm; a soft pulse of light travels along the cobalt cable from one stack to the other; a thin wisp of steam rises from the coffee cup. Locked-off camera. Seamless 8-second loop, last frame identical to the first.

### C6. V7: About loop, real footage (`/videos/about/team.mp4`)

- **Size:** 1080 × 1440 (3:4, portrait), 6–10 s, no sound.
- **How it shows:** in **black and white**, like the team photo, and falls back to `about.teamImage`.

**Shoot brief:** Use a phone on a tripod, or propped so it can't move, in the same spot and light as the team photo. Film 10–15 seconds of the two of you working together: pointing at a laptop, moving sticky notes on a whiteboard, laughing. Keep the camera completely still. Keep both of you in the middle third, because phones show this tile as a short, wide strip. Make sure no client names, screens with client data, or logos are visible. Trim it to a calm 6–10 s with no cuts.

### C7. V8–V11: product walkthroughs (screen recordings)

- **Size:** 1600 × 1200 (4:3), 10–15 s loop, no sound.
- **Where:** the home products switcher, in place of the built-in mock-up. The ink frame and hard shadow stay around it.
- **When:** make these from the real products once they run. Don't use AI for them: generated screens show garbled text, and these are meant to show the real thing. Until then, the built-in mock-ups are the better stand-in.

| Product            | Save as                           | What to show (10–15 s)                                                                  |
| ------------------ | --------------------------------- | --------------------------------------------------------------------------------------- |
| Path Lab Manager   | `/videos/products/path-lab.mp4`   | Register a patient → scan a sample barcode → status turns "Ready" → report PDF opens    |
| Simple CRM         | `/videos/products/crm.mp4`        | Add a lead → drag its card from "New" to "Follow-up" → reminder appears                 |
| Restaurant Manager | `/videos/products/restaurant.mp4` | Tap a table → add two dishes → kitchen ticket appears → table turns "Bill"              |
| Admission Manager  | `/videos/products/admission.mp4`  | Fill the enquiry form → upload a document (tick appears) → progress bar moves to "Fees" |

**Recording tips:**

- Use **demo data only**: made-up names such as "R. Sharma", never real patients, students or customers.
- Set the browser window to 1600 × 1200 and hide bookmarks and extensions.
- Move the cursor slowly and pause for half a second after each click.
- Record with **OBS Studio** (free), or on Windows with the built-in Xbox Game Bar recorder (Win + Alt + R).
- Trim so the last frame matches the first, then compress with the commands in C2.

---

## Part D. Checklist

### Images

- [ ] 5 service images (16:10)
- [ ] 5 process images (1:1, test them in black and white)
- [ ] 8 closing-section cards (5:6) with alt text
- [ ] 1 team photo (3:4, real)
- [ ] 2 founder portraits (16:10, real, faces on the side away from the colour block)
- [ ] 4 product images (4:3), ideally real screenshots
- [ ] Every path added in `src/content/site.ts`, then checked with `npm run dev` to confirm no "photo: …" tags are left

### Videos

- [ ] Every video path added in `src/content/site.ts` (fields in C1)
- [ ] V1 brand reel: 5 AI shots joined, real logo at the end, under about 12 MB
- [ ] V2–V6 service loops: image-to-video from the stills, seamless, under about 3 MB each
- [ ] V7 About loop: real footage, held still, 6–10 s
- [ ] V8–V11 product walkthroughs: screen recordings with demo data, once the products run
- [ ] Every video compressed (C2), with a poster JPG next to it
