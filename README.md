# foxDev — Satyarth Mishra’s portfolio

foxDev is Satyarth Mishra’s interactive portfolio exploring AI engineering, thoughtful digital products and visual storytelling. Built around paper textures, editorial typography, a Polaroid portrait and playful motion.

## Watch the portfolio film

**Click the preview to open the 20-second cinematic teaser.**

[![Watch Satyarth's portfolio film — portrait, paper cards and AI/design/code motion](work/portfolio-teaser/preview.jpg)](https://github.com/foxDev-code/ITS_ME/blob/main/work/portfolio-teaser/satyarth-portfolio-cinematic-teaser.mp4)

[Watch video](https://github.com/foxDev-code/ITS_ME/blob/main/work/portfolio-teaser/satyarth-portfolio-cinematic-teaser.mp4) · [Download MP4](https://github.com/foxDev-code/ITS_ME/raw/refs/heads/main/work/portfolio-teaser/satyarth-portfolio-cinematic-teaser.mp4)

1080 × 1920 · 20 seconds · 24 fps · H.264/AAC · 5.7 MB. This is an editorial graphic teaser, not a website screen recording. GitHub does not autoplay videos in repository READMEs.

## Explore the portfolio

- Home: curated work, visual studies and a personal introduction.
- Work: an interactive gallery, graphic experiments and Side Quests notebook.
- About: background, interests, approach and frequently asked questions.
- Seven project stories: implementation context, contributions and honest scope notes.
- Privacy, custom 404 and noindex thank-you pages.

Featured work includes Agri Sarthi, Suraksha One and Nexus AI Ops. More projects: [foxDev-code on GitHub](https://github.com/foxDev-code).

## Run locally

Requires Node.js 22 or newer. The checked-in website runs without installing dependencies:

```sh
cd outputs/satyarth-portfolio
npm start
```

Open http://localhost:4173. From the repository root, `npm run dev` starts the same server.

## Rebuild and verify

```sh
npm run build
```

The build validates JavaScript modules, local references, project pages, SEO metadata, sitemap, image alt text and analytics consent behavior. Build inputs, artwork and the supplied résumé are bundled; no personal Downloads folder is required.

Production defaults in `content/profile.json` are `https://foxdev-portfolio.vercel.app` and GA4 `G-S475283TKN`. Environment variables `SITE_URL` and `GA_MEASUREMENT_ID` override those defaults; remove stale overrides in Vercel. The root `vercel.json` runs `npm run build:production` and deploys `outputs/satyarth-portfolio` as a static website. Unknown paths must serve `404.html` with HTTP 404, not a catch-all 200 rewrite.

Analytics loads only after explicit consent worldwide, including EU, UK and Swiss visitors. An empty or placeholder `GA_MEASUREMENT_ID` disables it. Keep GA4 Enhanced Measurement off for the documented minimal page-view setup. Contact is email-only; no submission form is deployed. Review the privacy template before launch. See the [launch checklist](content/LAUNCH-CHECKLIST.md) for test results and remaining live checks.

After redeploying, run the read-only deployment checks from the repository root:

```sh
node scripts/verify-live-seo.mjs
node scripts/verify-live-https.mjs https://foxdev-portfolio.vercel.app
```

These checks do not prove GA4 receipt or an actual messaging-app preview. Accept analytics on the live website and inspect GA4 Realtime; paste the URL into an unsent WhatsApp or LinkedIn draft to inspect its share card.

## Repository layout

```text
content/                      Editable profile, projects, SEO content and résumé
src/personal/                 Custom styling, interactions and consent logic
scripts/                      Build pipeline, local server and verification
outputs/portfolio/            Preserved reference snapshot required by the build
outputs/satyarth-portfolio/   Generated, deployable website
work/personalization/assets/  Portrait, artwork and project media
work/portfolio-teaser/        Cinematic video and composition source
```

## Design and asset credits

The main-page composition retains a third-party Framer/React reference. Custom project stories, portfolio graphic studies and the cinematic teaser are additions. Third-party design, runtime and source assets are not claimed as original work and retain their respective ownership and terms; no blanket license is granted for them. Review reuse permissions before public release.

Photography references by Annie Spratt and Aleksandr Zaitsev are credited in the site and [content notes](content/README.md). They are not presented as Satyarth's photography. Project descriptions distinguish prototypes, simulated telemetry and résumé-documented work from production claims. No testimonials are invented.

## Connect

[GitHub](https://github.com/foxDev-code) · [LinkedIn](https://www.linkedin.com/in/satyarth-mishra-ai/) · [X](https://x.com/iamsatyarth_) · [Email](mailto:mishrasatyarth61@gmail.com)
