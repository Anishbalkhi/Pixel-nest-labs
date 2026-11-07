# Image prompts for the Pixel Nest Labs site

Every picture on the site is a slot that shows built-in artwork until you give it a file. This sheet has a ready-to-use prompt for each slot, the size to make it, and where to put it.

**How to add an image**

1. Save the file in `public/images/...` using the path in the table for that slot.
2. Put the same path (starting with `/images/...`) in the matching field in `src/content/site.ts`.
3. Run `npm run dev`. Empty slots show a small black "photo: …" tag, so you can see which ones are still missing.

**Export settings:** JPG, sRGB, about 80% quality, ideally under 400 KB each. Next.js resizes them for each screen automatically.

---

## 1. Use real photos for people

Use **real photos** for the **founder portraits** and the **team photo** (section 6), not AI images. Visitors will take them as pictures of the actual people behind the studio. A generated face would mislead them, and it goes against the README's rule to keep the site honest.

For the same reason, don't generate images that look like client work, client logos or testimonials. Everything else on this sheet is illustration (objects, desks, devices), and AI images are fine for those.

---

## 2. Shared style (paste at the start of every AI prompt)

> Bright editorial still-life, matte 3D render with a soft clay finish, square-edged geometric objects, a few small floating cubes like pixels. Strict colour palette: cobalt blue #0B57C2, teal #1FB89A, warm yellow #F7A21B, deep ink navy #0A0F2C, warm off-white #F4F4F2. Flat single-colour seamless background, soft diffused studio light from the top left, gentle long shadow, crisp edges, generous empty space around the subject, centred composition. No text, no letters, no numbers, no logos, no watermarks, no people.

**Negative prompt** (if your tool has one):

> text, words, letters, numbers, logo, watermark, signature, brand names, people, faces, hands, clutter, gradients, neon, glow, lens flare, photorealistic skin, rounded bubbly shapes, pastel colours, purple, red

**Tool tips:**

- **Midjourney:** add `--ar 16:10 --style raw --v 7` (change the ratio for each slot) and `--no text, letters, logo, people`.
- **DALL·E / ChatGPT, Ideogram, Firefly:** paste the shared style and the slot prompt as one paragraph, and set the size from the table.
- **Same look across slots:** generate all images in one session, keep the same seed or style reference, and reuse your best result as the style reference for the rest.

---

## 3. Services (5 images)

- **Where:** the big pictures in the "What we do" panels.
- **Size:** 1600 × 1000 px (16:10). Phones crop it a little to 16:9.
- **Framing:** the image is zoomed in by 15% and drifts sideways as you scroll, so keep the subject inside the middle 70% with empty background at the edges.
- **Field:** `services[].image`.

| Service | Save as | Background |
| --- | --- | --- |
| Digital Presence | `/images/services/digital-presence.jpg` | cobalt blue |
| Web & E-commerce | `/images/services/web-commerce.jpg` | deep ink navy |
| CRM & Salesforce | `/images/services/crm-salesforce.jpg` | teal |
| AI / ML & Data Science | `/images/services/ai-data.jpg` | sky blue #0E76A6 |
| Java & Enterprise | `/images/services/java-enterprise.jpg` | deep ink navy |

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

---

## 4. Process steps (5 images)

- **Where:** the square photo in each "How we work" step.
- **Size:** 1200 × 1200 px (1:1).
- **How it shows:** **black and white**, and quite small (about 144 px on desktop, 64–80 px on phones). Use one bold object with strong contrast and no fine detail.
- **Field:** `process[].image`.

| Step | Save as |
| --- | --- |
| Discover | `/images/process/discover.jpg` |
| Design | `/images/process/design.jpg` |
| Build | `/images/process/build.jpg` |
| Launch | `/images/process/launch.jpg` |
| Support | `/images/process/support.jpg` |

Add this to each prompt: *"Single bold object, high contrast, reads clearly in black and white and at thumbnail size, top-down view, plain light background."*

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

---

## 5. Closing section: curved card strip (8 images)

- **Where:** the cards in the curved strip under "Let's build it, pixel by pixel".
- **Size:** 1000 × 1200 px (5:6, portrait).
- **How it shows:** in full colour, about 140–230 px wide. The card's label isn't shown once a photo is set, so the picture itself has to say what it is.
- **Fields:** `ctaGallery[].image`, plus a short `ctaGallery[].alt` (for example "Laptop showing an online store layout").
- **Backgrounds:** keep each card's background colour from the table, so the strip still alternates colours.

| Card | Save as | Background |
| --- | --- | --- |
| Websites | `/images/gallery/websites.jpg` | cobalt blue |
| Shopify stores | `/images/gallery/shopify-stores.jpg` | teal |
| CRMs | `/images/gallery/crms.jpg` | deep ink navy |
| AI tools | `/images/gallery/ai-tools.jpg` | warm yellow |
| Dashboards | `/images/gallery/dashboards.jpg` | sky blue #0E76A6 |
| Catalogues | `/images/gallery/catalogues.jpg` | cobalt blue |
| Instagram grids | `/images/gallery/instagram-grids.jpg` | teal |
| Custom software | `/images/gallery/custom-software.jpg` | deep ink navy |

Prompts (start each with the shared style; portrait 5:6, subject centred and filling about 60% of the height):

- **Websites:** *A desktop monitor on a slim stand showing a clean landing-page layout made of colour blocks, on a flat cobalt blue background.*
- **Shopify stores:** *A square shopping bag and a small stack of parcel boxes with a phone showing a product grid of colour squares, on a flat teal background.*
- **CRMs:** *A card-file box with neat colour-tabbed index cards standing upright, one card lifted out, on a flat deep ink navy background.*
- **AI tools:** *A friendly square speech bubble block made of cubes, with three small dots inside, floating above a laptop, on a flat warm yellow background.*
- **Dashboards:** *A tablet standing upright showing simple bar and line charts made of colour blocks, on a flat sky blue background.*
- **Catalogues:** *A printed product catalogue standing open like a book, pages showing blank colour-block product photos, on a flat cobalt blue background.*
- **Instagram grids:** *A smartphone standing upright showing a 3×3 grid of colour squares, with three loose square photo prints floating around it, on a flat teal background.*
- **Custom software:** *A small stack of square app windows layered at an angle like cards, each showing simple colour-block interfaces, on a flat deep ink navy background.*

---

## 6. About: team photo and founder portraits (real photos)

These should be **real photos of you**. Here is a short brief for a phone or camera shoot that matches the site.

### Team photo (`about.teamImage`)

- **Save as:** `/images/about/team.jpg`
- **Size:** 1200 × 1600 px (3:4, portrait).
- **How it shows:** in **black and white**. The tile is tall on desktop but wide and short (about 260 px) on phones, so keep both of you in the **middle third** of the frame.

**Shot brief:** Both founders side by side at a shared desk or standing at a whiteboard, in plain dark or white tops. Use bright, even window light from one side and a plain light wall behind. Shoot at eye level or slightly above. Leave lots of empty space above and below you. A few sticky notes or a laptop is fine; avoid logos, brand names and busy backgrounds. Shoot in colour and let the site turn it black and white; good contrast between your clothes and the wall helps.

### Founder portraits (`about.founders[].image`)

- **Save as:** `/images/about/founder-1.jpg` and `/images/about/founder-2.jpg`
- **Size:** 1600 × 1000 px (16:10, landscape).
- **How it shows:** in **black and white with extra contrast**, with a solid colour block printed over part of it:
  - **Founder 1:** a teal block covers the **right-centre** (from about 54% to 88% across, 18% to 76% down). Place the **face in the left third**.
  - **Founder 2:** a yellow block covers the **lower left** (from about 10% to 50% across, 40% to 86% down). Place the **face in the right half, upper part**.

**Shot brief:** Head and shoulders against a plain light-grey or white wall. Use soft side light from a window, look at the camera, relaxed expression, plain top with no logos. Keep the same distance and background for both people so the pair matches. Leave space on the side where the colour block sits.

---

## 7. Products (4 images)

- **Where:**
  - the home "Our products" switcher, at 4:3 in colour with an ink border and hard shadow
  - the Products page spreads, filling half the spread in **black and white**: almost square on desktop, wide and short (about 220 px tall) on phones
- **Size:** 1600 × 1200 px (4:3). Keep the main interface in the **centre**, since the Products page crops the sides and the top and bottom.
- **Field:** `products[].image`.

| Product | Save as |
| --- | --- |
| Path Lab Manager | `/images/products/path-lab.jpg` |
| Simple CRM | `/images/products/crm.jpg` |
| Restaurant Manager | `/images/products/restaurant.jpg` |
| Admission Manager | `/images/products/admission.jpg` |

**Best option:** use real screenshots of the products once they exist. Until then, the home page already shows a built-in mock-up of each product, so you can leave these empty. AI tools still draw garbled text on screens, so for a concept image it's usually better to mock the screen up in Figma and photograph or export it.

If you do want a concept render, use this pattern (it asks for bars instead of words to avoid fake text):

> [shared style] A laptop at a slight three-quarter angle on a flat off-white background, the screen showing a clean square-cornered app interface for **[PRODUCT]**: **[SCREEN]**. All words are replaced by simple grey bars; only colour blocks, icons and shapes. Palette cobalt blue, teal, yellow and ink navy on white. 4:3, interface centred.

| Product | [PRODUCT] | [SCREEN] |
| --- | --- | --- |
| Path Lab Manager | a pathology lab | a list of patient samples, each with a barcode, a name bar and a coloured status tag (teal, yellow, blue) |
| Simple CRM | a small sales team | a pipeline board with three columns of cards (New, Follow-up, Won) and a small reminders panel |
| Restaurant Manager | a restaurant | a floor plan of six square tables (some filled blue, one yellow) and a column of kitchen order tickets |
| Admission Manager | a school | a four-step progress bar at the top, a short form with three fields and a "document uploaded" tick |

---

## 8. Checklist

- [ ] 5 service images (16:10)
- [ ] 5 process images (1:1, test them in black and white)
- [ ] 8 gallery cards (5:6) with alt text
- [ ] 1 team photo (3:4, real)
- [ ] 2 founder portraits (16:10, real, faces on the side away from the colour block)
- [ ] 4 product images (4:3), ideally real screenshots
- [ ] Every path added in `src/content/site.ts`, then checked with `npm run dev` to confirm no "photo: …" tags are left
