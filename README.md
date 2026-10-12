# Satyarth Mishra — ITS_ME

An interactive portfolio exploring AI engineering, thoughtful digital products and visual storytelling. Built around paper textures, editorial typography, a Polaroid portrait and playful motion.

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

For production, set `SITE_URL` to your actual HTTPS domain, then run `npm run build:production`. Deploy `outputs/satyarth-portfolio` as the static website. Unknown paths must serve `404.html` with HTTP 404, not a catch-all 200 rewrite. Verify HTTPS, redirects and social previews on the actual deployed URL.

Analytics is disabled without a real `GA_MEASUREMENT_ID`; `G-XXXXXXXXXX` is not a valid launch ID. With a real ID, analytics remains behind explicit consent. Contact is email-only. Review the privacy template before launch. See [launch checklist](content/LAUNCH-CHECKLIST.md).

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

The main-page composition and compiled Framer/React motion originate from [Jackie Zhang's portfolio](https://jackiezhang.co.za/). This project personalizes that reference; it does not claim the reference design, runtime or source assets as original work. Custom project stories, portfolio graphic studies and the cinematic teaser are additions. Third-party assets retain their respective ownership and terms; no blanket license is granted for them. Review reuse permissions before public release.

Photography references by Annie Spratt and Aleksandr Zaitsev are credited in the site and [content notes](content/README.md). They are not presented as Satyarth's photography. Project descriptions distinguish prototypes, simulated telemetry and résumé-documented work from production claims. No testimonials are invented.

## Connect

[GitHub](https://github.com/foxDev-code) · [LinkedIn](https://www.linkedin.com/in/satyarth-mishra-ai/) · [X](https://x.com/iamsatyarth_) · [Email](mailto:mishrasatyarth61@gmail.com)
