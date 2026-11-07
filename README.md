# Pixel Nest Labs website

A two-page marketing site for Pixel Nest Labs, built with Next.js (App Router), TypeScript, Tailwind CSS, Motion, GSAP ScrollTrigger and Lenis.

- **`/` Home**: hero (pixels fly in and form the logo, then move away from the cursor), services (pinned horizontal scroll), why us, process timeline, tech marquee, products preview, Lab demo projects, about/founders, FAQ, CTA.
- **`/products`**: the four management tools (in development), subscription plans (pricing coming soon), waitlist form and a custom-tool CTA.
- **Contact form** on every page, one click away: a sticky **"Let's talk"** tab on the right edge (a pill at the bottom-right on phones) opens the form in a drawer that slides in from the right (or up from the bottom on phones). Any link to `#contact` opens it too.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
npm run format     # Prettier
```

## Edit the content

Almost all text lives in **`src/content/site.ts`**. Edit it there; you don't need to touch the components.

| What                                           | Where in `site.ts`                                        |
| ---------------------------------------------- | --------------------------------------------------------- |
| Email, phone, location, booking link, socials  | `site`                                                    |
| Menu links                                     | `nav`                                                     |
| Hero headline and buttons                      | `hero`                                                    |
| The five services                              | `services`                                                |
| "Why choose us" points                         | `whyUs`                                                   |
| Process steps                                  | `process`                                                 |
| Tech marquee                                   | `techStack`                                               |
| Products and subscription plans                | `products`, `plans`                                       |
| Lab projects (always labelled Demo or Concept) | `labProjects`; add `liveUrl` / `githubUrl` when ready     |
| Story, founders, experience strip              | `about`                                                   |
| FAQ                                            | `faqs`                                                    |
| Contact form dropdowns                         | `contactServiceOptions`, `budgetOptions`, `businessTypes` |

Anything in `[square brackets]` is a placeholder. Please keep the copy honest: only real numbers in the experience strip, and no testimonials or client logos until you have real ones.

## Add your photos

Every picture on the site is a slot that shows built-in artwork until you give it a photo. Put the files in `public/images/` and set the path (for example `"/images/about/team.jpg"`) in `src/content/site.ts`. In `npm run dev` each empty slot shows a small black "photo: …" tag so you can see which one is which; the tag never appears on the live site.

| Slot                                       | Field in `site.ts`              | Notes                                                                 |
| ------------------------------------------ | ------------------------------- | --------------------------------------------------------------------- |
| Service panels                             | `services[].image`              | Wide (16:10).                                                         |
| Process circles                            | `process[].image`               | Square; shown in black and white.                                     |
| Curved strip in "Let's build it"           | `ctaGallery[].image` and `.alt` | Portrait (5:6). Without a photo the card shows `label`.               |
| About: team tile                           | `about.teamImage`               | Tall; shown in black and white.                                       |
| About: founder portraits                   | `about.founders[].image`        | 16:10; black and white with a colour block on top.                    |
| Products (home carousel and products page) | `products[].image`              | Screenshots work well; shown in black and white on the products page. |

Other places:

- Brand colours and fonts: `src/app/globals.css` (`@theme`) and `src/app/layout.tsx`.
- Logo: `public/logo.webp` (original) and `src/components/brand/pixels.ts` (the animated pixel version).
- Mission and vision lines: `About` in `src/components/sections/HomeSections.tsx`.

## Where form submissions go

Both forms are checked in `src/app/actions.ts` and then sent by `src/lib/leads.ts` to a small **Google Apps Script** (`google-apps-script/Code.gs`). The script:

- adds each contact enquiry to a **Contact** tab and each waitlist sign-up to a **Waitlist** tab of [the Google Sheet](https://docs.google.com/spreadsheets/d/1-9-JcoeFq5jigVnCHOdNf4SlBEraNCaBFY95d9lZ8jo/edit) (it creates the tabs and header rows the first time),
- saves any attached spreadsheet to a Google Drive folder called "Pixel Nest Labs - contact uploads" and links it in the row,
- emails **anishbalkhi1@gmail.com** with the details and the file. Replying to that email goes to the visitor.

Until `GOOGLE_SCRIPT_URL` is set, submissions are only printed in the terminal, which is fine for local development. If the script can't be reached, the visitor sees "Sorry, that didn't go through" instead of a false success.

### Google Sheet + email setup (one time, about 5 minutes)

1. Open the Google Sheet and choose **Extensions → Apps Script**.
2. Delete the sample code and paste in everything from `google-apps-script/Code.gs`. Save.
3. Click **Project Settings** (gear icon) → **Script properties** → **Add script property**. Name: `SECRET`. Value: the `GOOGLE_SCRIPT_SECRET` from your `.env.local` (one was generated for you). Save.
4. Back in the editor, pick the `testSetup` function and click **Run**. Google asks you to allow access to Sheets, Drive and sending email as you; review and allow. The log should say "OK".
5. Click **Deploy → New deployment** → type **Web app**. Execute as: **Me**. Who has access: **Anyone**. Deploy and copy the **Web app URL** (ends in `/exec`).
6. Paste that URL into `.env.local` as `GOOGLE_SCRIPT_URL=...` and restart `npm run dev`.
7. On Vercel, add both `GOOGLE_SCRIPT_URL` and `GOOGLE_SCRIPT_SECRET` under **Settings → Environment Variables**, then redeploy.

"Anyone" only means the URL can be called without a Google login. The script ignores any request that doesn't carry the secret, and the URL is only used by your server, never shown in the browser.

If you change `Code.gs` later, use **Deploy → Manage deployments → Edit → New version** so the same URL picks up the change. Free Gmail accounts can send about 100 emails a day from Apps Script.

### Spreadsheet attachment on the contact form

Visitors can attach one Excel (`.xlsx`, `.xls`) or CSV file, by dragging it onto the box or browsing. It's optional.

- The rules (allowed types, 4 MB limit) live in `src/lib/attachments.ts`, shared by the browser and the server.
- The browser rejects other file types and files that are too large before uploading.
- The server checks again, including that the file's contents match its extension (so a renamed file of another type is refused).
- `next.config.ts` raises the Server Action upload limit to 5 MB. Keep the file limit at 4 MB or less if you host on Vercel, which caps requests at 4.5 MB. For bigger files, upload straight to storage (e.g. Vercel Blob or S3) instead.
- Files are saved to the Google Drive folder and attached to the notification email (see above).

## Before you go live (things only you can do)

The site builds and deploys as it is, but these need your own details or accounts.

**Content (`src/content/site.ts`)**

- [ ] Email, phone and location in `site`. Until they're filled in they are simply hidden, so the site never shows `[placeholder]` links.
- [ ] Booking link (`bookingUrl`, e.g. Cal.com or Calendly). Until then, "Book a call" opens the contact form.
- [ ] Social links (Instagram, LinkedIn, GitHub) and, optionally, a WhatsApp number.
- [ ] About section: your story, both founders' names, roles, bios, skills and LinkedIn links.
- [ ] Mission and vision lines (`About` in `src/components/sections/HomeSections.tsx`).
- [ ] The experience strip: replace `[X]+ years combined experience` with your real number (or remove it).
- [ ] Lab projects: add `liveUrl` / `githubUrl` once each demo is online. Keep the Demo/Concept labels.
- [ ] Optional: founder photos, real screenshots for Lab projects, and your own budget ranges in `budgetOptions` (currently in ₹).

**Accounts and settings**

- [ ] Google Sheet + email: follow "Google Sheet + email setup" above, then put `GOOGLE_SCRIPT_URL` in `.env.local`.
- [ ] A domain name (e.g. from GoDaddy, Namecheap or Cloudflare).
- [ ] A GitHub account and repository for the code, and a Vercel account.
- [ ] Optional: a privacy policy page if you'll run ads or collect more than contact details.
- [ ] Optional: stronger spam protection (Vercel Firewall rate limiting or Cloudflare Turnstile). A basic per-visitor limit is already built in.

## Deploy to Vercel

1. Make sure it builds: `npm run build`.
2. Commit and push this folder to a new GitHub repository (it is already its own git repository):
   ```bash
   git add -A
   git commit -m "Pixel Nest Labs website"
   git remote add origin https://github.com/<you>/pixel-nest-labs.git
   git push -u origin main
   ```
   `.env.local` (with your secret) is git-ignored and won't be uploaded.
3. On [vercel.com](https://vercel.com), choose **Add New → Project** and import the repository. Vercel detects Next.js automatically; keep the default settings.
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SITE_URL`: your final address, e.g. `https://www.pixelnestlabs.com` (used for SEO tags, the sitemap and share previews; without it Vercel's own `.vercel.app` address is used),
   - `GOOGLE_SCRIPT_URL` and `GOOGLE_SCRIPT_SECRET`: the same values as in `.env.local`.
5. Click **Deploy**. Then add your domain under **Settings → Domains** and follow Vercel's DNS instructions.
6. After it's live: submit a test enquiry (with a small CSV) and check it appears in the Sheet and your inbox; share the link in WhatsApp to see the preview card; add the site to [Google Search Console](https://search.google.com/search-console) and submit `/sitemap.xml`.

Every push to the main branch redeploys the site automatically.

### What's already in place for production

- Sitemap (`/sitemap.xml`), `robots.txt`, canonical URLs and page titles/descriptions.
- A generated share image (`/opengraph-image`) and app icons (`/icon.svg`, `/apple-icon`), plus a web manifest.
- A custom 404 page ("This page flew the nest") and an error page with a retry button.
- Security headers (no MIME sniffing, no framing by other sites, strict referrer, camera/mic/location off).
- Form checks on the server: allowed values only, length limits, attachment type/size/content checks, a hidden spam trap and a per-visitor rate limit.
- Lighthouse on a production build: Performance 98 (mobile) / 100 (desktop), and 100 for Accessibility, Best Practices and SEO.

## Animations

| Where       | What                                                                                                                                                                         | Built with                      |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| Hero        | Pixels fly in and form the logo, then move away from the cursor; headline words rise in; "We make …" word rotates; cursor spotlight; mark and text drift apart as you scroll | Motion, CSS                     |
| Whole site  | Lenis smooth scrolling; scroll progress bar under the navbar; navbar hides on scroll down and returns on scroll up                                                           | Lenis, Motion                   |
| Page change | Pixel-grid wipe and fade-in when moving between Home and Products                                                                                                            | Motion (`src/app/template.tsx`) |
| Headings    | Words slide up one by one when they come into view                                                                                                                           | Motion (`WordReveal`)           |
| Services    | Section pins and the cards scroll sideways; cards tilt in 3D under the cursor                                                                                                | GSAP ScrollTrigger, Motion      |
| Process     | Timeline line fills as you scroll; steps light up                                                                                                                            | GSAP ScrollTrigger              |
| Text bands  | Big "Design · Build · Launch · Grow" rows slide in opposite directions with scroll                                                                                           | GSAP ScrollTrigger              |
| Cards       | Pixel-dissolve hover; 3D tilt on Lab and product cards                                                                                                                       | CSS, Motion                     |
| Buttons     | Main call-to-action buttons pull towards the cursor (magnetic)                                                                                                               | Motion                          |
| Contact     | "Let's talk" tab nudges every few seconds; drawer slides in with a pixel strip                                                                                               | Motion, CSS                     |

Reusable helpers live in `src/components/motion/` (`effects.tsx` has `Magnetic`, `Tilt`, `WordReveal`).

## Motion and accessibility

- With `prefers-reduced-motion`, smooth scrolling, the pinned scroll, the fly-in, parallax, tilt, magnetic buttons, the page wipe and the scroll reveals are turned off. Everything is still visible and usable.
- Page content is rendered on the server; animations are layered on top once JavaScript loads.
