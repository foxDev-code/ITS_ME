# foxDev — Satyarth’s portfolio

`google02cefb3da2b660c7.html` is Google's supplied Search Console ownership file. The build copies it unchanged to the deployed root. After deployment, confirm `https://foxdev-portfolio.vercel.app/google02cefb3da2b660c7.html` returns the verification text, then click Verify under HTML file upload in Search Console. Keep this file permanently; it is not a portfolio page and is excluded from the sitemap.

Privacy and optional analytics setup are documented in `PRIVACY-AND-ANALYTICS.md`. Contact remains email-only. `profile.json` now stores the public site URL and real GA4 ID `G-S475283TKN`. The build uses those defaults; `SITE_URL` and `GA_MEASUREMENT_ID` environment variables can override them. An empty GA ID or `G-XXXXXXXXXX` explicitly disables tracking. Review the `/privacy` template before launch. `/thank-you` is noindex and is not an email delivery receipt.

Edit `about-extras.json` for the About FAQ and empty testimonial slot identifiers. See `HTTPS-FAQ-REVIEWS.md` for answer evidence, claims awaiting confirmation and exact-review handling. See `EXPANDED-LAUNCH-AUDIT.md` for the latest local versus deployed verification results and Search Console/Bing instructions. Root `vercel.json` pins the production build/output, legacy redirects and basic response headers. `/terms` remains a clearly marked owner-review template.

`media-variants.json` maps original images to smaller, checked-in WebP copies. Keep both source assets in `work/personalization/assets` and generated assets when committing. `npm run test:launch` checks extra launch safeguards, while `node scripts/verify-launch.mjs --external` reports external link status. Image optimization is an optional authoring step; deployment needs no image-processing dependency.

Edit `profile.json` for the bio, contact links, location, skills and GitHub call-to-action. Edit `projects.json` for the seven case studies. `replacements.json` maps the reference page's text to personalized content.

Run `npm run build` from the workspace to regenerate and validate `outputs/satyarth-portfolio`. Run `npm run dev` and open http://localhost:4173. The generated output is standalone: run `npm start` inside that folder without installing dependencies.

The build requires the preserved `outputs/portfolio` reference snapshot, repository media in `work/personalization/assets`, and the supplied résumé at `content/Satyarth_Mishra_Resume.pdf`. These inputs are bundled for portable rebuilds. The original archive has not been replaced.

The main pages retain the reference's compiled Framer/React layout and motion. Project stories and supplemental sections are authored HTML/CSS/JavaScript; this is not an editable Framer project. Do not present the reference designer's visual design or source assets as original work.

## Content decisions

- GitHub: https://github.com/foxDev-code
- LinkedIn: https://www.linkedin.com/in/satyarth-mishra-ai/ (confirmed by Satyarth)
- X: https://x.com/iamsatyarth_ (confirmed by Satyarth)
- Greater Noida, India; balanced AI engineering, product design and creative positioning.
- Public repository implementations informed the project descriptions. Research is in `work/personalization/github-research.json` and `work/personalization/repo-code`.
- Agri Sarthi is a crop-awareness interface concept, not a connected disease-inference system.
- Suraksha One uses simulated telemetry in its public demo.
- Nexus AI Ops integrations can require configuration and have demonstration fallbacks.
- VEENA is résumé-documented; no public source link or unverified performance numbers are claimed.
- Satyarth confirmed authorship of QA Matrix and the agency reporting agent despite the conflicting QA README credit.
- Generated diagrams are labeled as illustrations, not product screenshots. No invented client projects, awards, employment or impact figures were added.
- The monogram is intentional until a real portrait is supplied. Actual photography and Synapse creative files can replace placeholders or expand the gallery later.

## Balanced content update — 2026-09-27

The homepage features three works: Agri Sarthi, Suraksha One and Nexus AI Ops, each with contribution and current-scope notes. The opening introduction is unchanged. Removed the extra introduction/skills grid, duplicate Work-page card grid, repeated homepage montage, side-project list and repeated GitHub footer prompt. Existing case-study files remain available; no project source was deleted.

The personal section covers photography, type/layout and community using the user's supplied background. The three paper notes now describe specific implementation decisions, explained on About. Framer's paper backgrounds, fonts, palette, primary navigation and card motion remain. Inserted sections explicitly match Framer's responsive flex ordering.

### Visual sources

- `personal/assets/github-profile.png`: screenshot of the user's public [GitHub profile](https://github.com/foxDev-code), captured for this update. Its avatar is an illustration, not a real portrait.
- Botanical photograph: [Annie Spratt / Unsplash](https://unsplash.com/photos/a-bunch-of-flowers-sitting-on-top-of-a-piece-of-paper-qMf_Xdue_M4).
- Staircase photograph: [Aleksandr Zaitsev / Unsplash](https://unsplash.com/photos/shadow-and-sunlight-cast-upon-a-concrete-staircase-xDV6YuFBkAo).
- Both photo pages identify the [Unsplash License](https://unsplash.com/license). Photos are credited on the page and explicitly labeled as external visual references, not Satyarth's photography. They are remote images and need internet access; the GitHub screenshot is bundled locally.
- The reference homepage was visually rechecked for paper, warm texture and scrapbook direction. This remains a reference-derived composition, not a claim of original visual authorship.
- LinkedIn public search corroborated the profile identity and education; full-page retrieval was blocked/rate-limited. No additional unverified achievements were imported.

The downloadable résumé is the user-supplied PDF, unchanged. Its LinkedIn address differs from the corrected website address; update the PDF before public release.

## Curated visual redesign — 2026-09-28 (current)

This supersedes the screenshot-heavy homepage described above. The nine-frame collage now combines four original portfolio graphic studies, three composed project details and two credited reference photographs. The floating frames reuse this visual vocabulary. Studies open a native, keyboard-operable artwork dialog; project frames link to their case studies. Artwork captions distinguish new portfolio studies from completed project work and external photography.

The homepage's large project-summary cards are replaced with a three-row editorial index. Detailed contributions remain on the seven case-study pages. The paper notes now read “Follow curiosity,” “Make room for play” and “Build with care,” with context on About. Repeated decorative side rails are quieted on Home. Original paper masks and desktop choreography remain intact. Mobile uses a two-column cutting-mat gallery because the inherited fixed-size children overlapped their shrinking grid cells.

Edit the gallery entries and native-slot mapping in `src/personal/personal.js`; the seven composed SVG assets are generated by `scripts/personal-art.mjs`. The four graphic studies are new portfolio artwork, not previous client commissions. Project images are embedded in SVG viewports for layout; their original files are unchanged. No new dependency was installed. See `QA.md` for verification scope and remaining release limitations.

### Illustration and Side Quests restoration

The homepage again uses the reference snapshot's varied hand-drawn illustrations and patterned edge rails. The previous generic robot/chip/camera substitutions were removed. The native Side Quests notebook is visible on Work with five personalized entries and corrected destinations. A new transparent fox-coder illustration appears beneath it as original portfolio decoration; it was generated with the built-in image tool and saved at `personal/assets/fox-coder.png`. It represents the foxDev identity and is not presented as client work.
