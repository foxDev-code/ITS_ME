# Local QA — 2026-09-22

## Work-page refinement — 28 September 2026

- Expanded personalized ticket titles to fit their labels; reduced MetroMaarg's oversized type. All four main title destinations now point to the matching local project stories.
- Reused existing Agri Sarthi interface captures and Suraksha concept renders in native project previews, with descriptive alternative text. No new project imagery or claims were invented.
- Kept the spiral Side Quests design, but made its rows stack on phones. At the 375px viewport setting the notebook occupied x24–337 inside a 361px content area, with no horizontal document overflow. Desktop and mobile screenshots were inspected.
- Reduced the decorative fox to 190px and centered the closing GitHub/contact section.
- Clicked Field notebook to inspect the real interface preview, then followed Agri Sarthi to its local case study successfully. Build checks validate all four destination pages and the five replacement preview files.
- Evidence: `outputs/work-refined-desktop.jpg` and `outputs/work-notebook-mobile.jpg`. Other side-project cards still use clearly illustrative covers where authentic media is unavailable. Not a complete accessibility, performance or animation audit.

Preview: http://localhost:4173

## Verified

- Build passed: 35 generated JavaScript modules and inline scripts parsed; 1,112 HTML local references resolved; seven project pages, résumé and GitHub CTA validated.
- All 751 generated output files returned HTTP 200 in a local HEAD-request sweep.
- All 40 generated SVG assets parsed as XML.
- Home, Work, About and all seven project pages opened in the browser. Fresh-tab console error log was empty during these checks.
- Checked loaded images had no failures. This does not claim every lazy image in every animation state was exercised.
- All 13 main Work selectors were exercised during personalization and their project-specific descriptions checked.
- Back-to-work navigation succeeded. GitHub CTA targets foxDev-code. LinkedIn targets the user-confirmed satyarth-mishra-ai address.
- Mobile homepage and Agri Sarthi case study inspected around 375px. Fixed decorative rail overlap with supplemental content. No horizontal document overflow measured there; also checked homepage width at 768px.
- Desktop About and case-study headers inspected; final home preview inspected at the default desktop viewport.
- Corrected SVG monogram, shortened AI Lab label, personalized Work stamp, changed Synapse role to contributor and removed an inherited project year.

## Limits

- Visual regression is INCONCLUSIVE: there is no committed personalized screenshot baseline or pixel-diff test. This is not a claim of exact identity with the reference site.
- No complete accessibility audit, screen-reader pass or Core Web Vitals measurement was performed.
- Mobile keeps the reference's introductory notice and simplified experience; the original elaborate desktop composition is not fully reproduced on a phone.
- No external contact message, production deployment or form submission was performed. External services and live demos can change independently.
- The original résumé is unchanged and needs its LinkedIn address corrected before public release.

Verdict: local preview ready for review; public-release checks remain as listed above.

## User-reported regression — repaired 2026-09-26

The earlier checks missed a visual layering defect in the three principle cards. Opaque paper backgrounds had been replaced with transparent icon SVGs. Restored the paper backgrounds without changing the animation or personalized wording; added a build regression assertion. Both expanded and stacked states were visually verified and saved as screenshots. See VISUAL-FIX.md for the root cause, Ponytail repair rationale and Graphify coverage limitations.

## Balanced content update — 2026-09-27

- Build verifies exactly three featured projects, contribution/scope fields, the unchanged introduction, the X URL, photo-credit data, local GitHub screenshot, and mobile section-order rules, in addition to existing syntax/link checks.
- Homepage inspected at 375, 768 and 1440 requested viewport widths. No horizontal document overflow measured. Fixed an inherited narrow-layout issue where inserted sections with order 0 appeared before the original hero; selected work now uses order 13 and contact order 99.
- Desktop selected-work and personal/moodboard sections inspected. Both remote photo images loaded successfully. Saved `outputs/balanced-personal-desktop.png` and `outputs/balanced-mobile.png` as review evidence.
- Homepage-to-About, About-to-Work, and homepage-to-Agri-Sarthi navigation exercised. Work contains zero supplemental project grids; its redundant side-project list is hidden. Main interactive Work stories remain.
- Confirmed main-page contact destinations include email, corrected LinkedIn and X / @iamsatyarth_. No messages were sent.
- Browser console checks for the tested home/project views returned no errors.
- The old mobile notice is now removed; the actual hero, selected work, personal section and contact remain usable on mobile. This supersedes the earlier notice-related limitation.
- Visual parity with the original, full accessibility compliance, all animation states, external live-service behavior and Core Web Vitals remain unverified. No automated pixel comparison was run. Remote reference photos require internet access.

Ponytail kept the change in the existing content/build/enhancement pipeline. Graphify's existing graph identified the build inputs and artwork dependency; saved work memory records this update without claiming a complete graph rebuild.

## Screenshot composition restoration — 2026-09-27 (superseded by the curated redesign below)

- Compared the live original and local homepage at 1280 × 720 and matching scroll coordinates. Restored the native Screenies cutting mat, red backing, nine image slots and About tab. Retained the original rounded white frames and animation; no replacement animation library was added.
- Replaced generic artwork in 22 home-only image placements with actual Agri Sarthi browser captures and Suraksha repository concept renders. Nine distinct image files fill the nine collage slots. Work-page project imagery is unchanged by this scoped mapping.
- Six browser captures were saved under `work/personalization/assets/screen-*.png`. Agri views include the landing page, field companion, field workspace, scouting checklist and blank observation form. Suraksha's capture is its prototype landing page. No forms were submitted. Helmet renders remain labeled as concept renders.
- All nine collage images loaded. Clicked the Suraksha collage card and verified its case-study heading, then returned home. The checked browser console contained no errors. Desktop document had no horizontal overflow.
- A 375px-wide embedded responsive preview had a 360px document area after its scrollbar, with no document overflow. Hero precedes supplemental content. Reduced mobile hero text sizes after observing the longest rotating word clip inside the notebook. This is a responsive browser check, not a real-device or full accessibility audit.
- Build regression assertions cover visible collage, nine distinct assets, asset existence, footer order and mobile type sizes, alongside the prior paper-opacity and three-featured-project checks.
- Saved `outputs/satyarth-portfolio/review/index.html` with side-by-side screenshots and a live mobile preview. The comparison records particular scroll states; it is not an exhaustive pixel comparison or every-hover-state certification.
- MetroMaarg's public demo returned Vercel 404 during capture. No Metro screenshot was invented. Suraksha's dashboard link returned its landing page; no separate dashboard capture is claimed.
- Graphify's existing graph located `buildArt()` (scripts/personal-art.mjs L20), `imagePairs` and `assetMap` in the shared build. Direct DOM/source inspection identified the hidden Screenies rule and home image substitutions. Graph traversal was capped at 1800 tokens (56/57 nodes); historical graph-health limitations remain. No full reindex or paid extraction was run; tool token cost is unavailable.

## Curated visual redesign — 2026-09-28

- Replaced the nine-screenshot selection with four new graphic studies, three project compositions and two credited reference photos. All nine images loaded in the tested desktop and responsive views. The mapping remains Home-only; the Work gallery keeps its project-specific images.
- Replaced large Home project cards with three concise linked rows. All seven generated case-study pages remain. Featured case studies now explicitly display the contribution and scope text formerly shown on Home.
- `npm run build` passes: 35 module parses, inline-script syntax, local HTML references, seven case studies, résumé, social links, paper-mask regressions, gallery mix/uniqueness, study disclosure, photo credits and mobile sizing guards. Local-reference totals vary with the saved review pages. All seven new SVG files passed XML parsing.
- Actual browser testing: desktop at 1280 × 720 and responsive iframes requested at 375, 768 and 1440px. Their usable document widths were 360, 753 and 1425px after scrollbars. No horizontal document overflow was measured. The longest mobile hero word, “empowering,” was visibly contained.
- Found and fixed the inherited mobile collage defect: grid cells shrank while absolute inner card wrappers retained desktop dimensions. Two columns now size their children to the cells. At 375px, measured card bounds are within the 360px document and do not overlap horizontally. Desktop keeps its staggered arrangement.
- Artwork viewer opens by click and keyboard Enter, focuses Close, closes with Escape or Close and restores focus to its invoking frame. Tested the mobile photo viewer with its visible author/source credit. Modifier-click behavior is preserved. Native dialog semantics handle focus containment; no full screen-reader audit was run.
- Fixed a hover-caption collision with Framer's border pseudo-element. Captions now use a separate pseudo-element and do not darken the entire image. Graphic studies use `object-fit: contain` so lettering is not cropped.
- Navigated from the desktop Suraksha gallery frame to its case study, verified “What I built,” and returned Home. Checked console errors returned an empty list for that journey. This is not a complete network, every-link, every-hover or every-animation-state audit.
- Evidence: `outputs/redesign-gallery-desktop.jpg`, `outputs/redesign-floating-desktop.jpg`, `outputs/redesign-mobile-hero.jpg`, `outputs/redesign-mobile-gallery.jpg`, `outputs/redesign-tablet-index.jpg`, `outputs/redesign-wide-personal.jpg`. These are observed browser states, not pixel-difference results. The wide iframe screenshot only shows the portion fitting the host preview window; the width/overflow measurements cover its full document.
- Graphify refreshed existing lessons and queried existing vocabulary: personal, build, art, cover, flow, projects, image, assets. The 1800-token BFS returned 25 of 1205 matched/neighbor nodes. It confirmed the existing artwork/build entry points, not the correctness of new browser behavior. Direct source and DOM inspection supplied runtime evidence. Saved focused findings instead of rebuilding the full graph. Historical coverage/integrity limitations still apply. Tool token cost is unavailable; no paid extraction was performed.
- Remaining: Core Web Vitals, automated pixel comparison, complete accessibility/screen-reader audit and production deployment were not performed. External photos need internet. The original résumé still needs its LinkedIn address corrected. Reference-derived Framer layout and assets remain; do not represent the entire design as newly authored.

Verdict: local implementation and targeted functional checks pass; visual regression verdict is INCONCLUSIVE without an approved redesigned baseline. Ready for the user's visual review, not a claim of objective superiority to another portfolio.

## Illustration and Side Quests restoration — 2026-09-28

- Removed the generated doodle and rail substitutions from the shared asset map. The native hand-drawn homepage illustrations and original patterned left/right rails now render again. The structural paper-mask assets remain untouched.
- Restored the native Work-page Side Quests notebook instead of rebuilding it. Personalized entries are VEENA Rover, Linear Algebra, Synapse Club, QA Matrix and MCQ Lab. Browser inspection verified their local/GitHub destinations.
- Added `fox-coder.png` beneath the notebook. Built-in image generation prompt requested an original transparent coral-ink fox using a laptop on sketchbooks, with no text, logo or watermark. The final generated file is bundled locally.
- `npm run build` passes after the change. Regression checks require the notebook and rails to remain visible, the fox file to exist and QA Matrix to link to its case page.
- Desktop browser inspection confirmed the homepage illustration, both patterned rails, notebook heading/content and fox decoration. No horizontal overflow measured. A 375 × 812 responsive check also measured no document overflow; native rails remain clipped outside reading content at the narrow breakpoint.
- Evidence: `outputs/restored-home-illustration.jpg` and `outputs/restored-side-quests.jpg`. Core Web Vitals, full accessibility, real-device behavior and every animation state remain outside this targeted check.
# Curated gallery refinement — 28 September 2026

- The homepage floating gallery now shows nine distinct compositions instead of thirteen frames with repeated artwork. The nine-image cutting mat remains available as a compact index.
- Frames use the artwork's aspect ratio, capped at 300px before rotation. Warm off-white borders and consistent shadows unify the existing media without generating or replacing image files.
- Desktop chapters are 820px tall; narrow layouts follow their content height. Existing paper notes, native motion, project destinations and credited photography are preserved.
- Verified nine visible frames at 1280px, 820px and 375px viewport settings. All phone frames stayed within the 361px content viewport, with no document horizontal overflow. Opened and closed an artwork dialog by keyboard/button. Build checks passed.
- Evidence: `outputs/curated-gallery-desktop.jpg` and `outputs/curated-gallery-mobile.jpg`. This was a homepage gallery refinement, not a new full-site accessibility or Work-page audit.

