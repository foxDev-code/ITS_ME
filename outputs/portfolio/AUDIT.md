# Portfolio inspection and reproduction audit

Reference: https://jackiezhang.co.za/?ref=killerportfolio and https://jackiezhang.co.za/work

Inspected: 20–21 September 2026. Supplied reference recording: `Desktop 2026.09.20 - 21.51.58.02.mp4`, approximately 134.7 seconds, 1920 × 1080 at 60 fps. Sampled frames across the recording were reviewed alongside live browser inspection. This was not an exhaustive frame-by-frame motion analysis.

## What was actually built

The first hand-built approximation was superseded by a localized copy of the publicly served Framer production output. This retains the actual compiled component variants and animation definitions rather than recreating a few screenshots. All seven discovered public page routes are included; 556 public asset files and 129 responsive image variants are stored locally. The package does not include the owner's private Framer authoring project or source maps that were not publicly available.

## Confirmed implementation stack

| Layer | Evidence in published output |
| --- | --- |
| Site builder | Framer HTML generator metadata and Framer hydration markers; generator build `beb597f` |
| Rendering | React-based compiled components and Framer client router |
| Motion | Framer animation/variant runtime, transforms and scroll effects |
| Smooth scrolling | Embedded Lenis implementation in `LoIW6msUk.Bl9vkhCx.mjs` |
| Artwork | Inline SVG, photographic/raster assets, repeating strips, GIFs and CSS textures |
| Typography | Awesome Serif family variants, Averia Serif Libre, Gochi Hand and Geist Mono among the published font declarations |
| Local serving | Dependency-free Node HTTP server; original browser runtime remains Framer/React |

The root workspace's old Vite/React package dependencies do not describe the reference site's stack and are not needed to run the packaged output.

## Colors and typography

The main homepage red is `rgb(227, 83, 66)` / `#e35342`; some illustrations use the neighboring `rgb(227, 83, 65)`. Main paper color is `rgb(245, 225, 205)` / `#f5e1cd`. Dark text uses near-black tones. The blue/yellow case-study palette and all subsidiary token colors remain in the original styles and artwork rather than being normalized into one replacement palette.

Original font files and exact published declarations are retained. `source-inventory.json` lists every distinct font-family declaration and color literal found in each published HTML page, including fallback and placeholder declarations; not every declaration is necessarily visible on that page.

## Component and behavior inventory

| Area | Behavior retained / observed |
| --- | --- |
| Shared header | Illustrated logo/home link, Work link, About hover doodle with in-progress annotation, Connect hover expansion and social links |
| Homepage hero | Paper/grid composition, book illustration, lettered product-designer title, animated changing adjective, Cape Town timezone label |
| Belief cards | Three distinct illustrations, layered placement, scroll-driven spreading/morphing and accompanying text |
| Decorative strips | Original repeating illustrated/ticker strips and motion |
| Numbered gallery | Original project images, numbering, overlaps, artwork and selected external destinations |
| Portrait | Portrait card and local About-page destination |
| Contact card | Three independently selectable rows, strike-through/illustration changes, card tilt and GIF reveal after selecting all three; original mailto destination |
| Footer | Original decorative content, animated repeating text where shown and existing anchor behavior |
| Work | Company/ticket compositions, four project groups, image-and-description selectors, side quests, original outgoing destinations |
| About | Original paper/resume layout, biography, skills/interests/energy sections and navigation |
| Case studies | Project-specific hero, decorative marks, images, goals, role descriptions, outcome/process sections, screenshot compositions and shared footer |

The generated public HTML exposes 121 distinct `data-framer-name` values on Home, 69 on Work, 34 on About, and 135/71/66/65 on the four case-study pages respectively. These are names in compiled output, not a reliable count of distinct authored components. The complete discovered names are in `source-inventory.json`.

### Work selector states exercised

- Bash: BashPay, Internal Packing Tool, Kiosk, Point of Sale.
- Pulse: Stream uploader, Home feed, Race platform, Event timeline.
- Heygo: Streaming UI, Strream creator (the original spelling).
- Dotslash: Dekra, Balwin Fibre, Junk Mail.

All 13 were clicked in both the reference and replica. Rendered main-content text matched for the corresponding states during this comparison. Original content inconsistencies and spelling were retained, not silently corrected.

## Routes

1. `/`
2. `/work`
3. `/about`
4. `/case-studies/heygo-creator`
5. `/case-studies/pulse-event`
6. `/case-studies/balwin-fibre`
7. `/case-studies/resqued`

These case-study routes are bundled even where the current Work interface primarily uses inline project selectors.

## Outgoing destinations preserved

- Connect: https://www.linkedin.com/in/jackie-zhang-designer/, https://x.com/jackie_zhang_ls, https://github.com/jackielszhang.
- Contact: `mailto:lapsun.j.zhang@gmail.com`.
- Companies: https://bash.com/, https://www.linkedin.com/company/pulseliveco/, https://www.linkedin.com/company/virtualtrips/, https://dotslash.co.za/.
- Side projects: https://tf2048.io/, https://whosspeaking.framer.website/, https://tripletime.ai/en-US, https://www.resqued.org/.
- Gallery video: https://x.com/jackie_zhang_ls/status/1953203804113125820/video/1.
- Heygo article: https://jackiezhangdesign.medium.com/designs-with-context-better-collaboration-e8bac4fd860c.

Destinations were read from the public links/component definitions. This does not certify the availability or safety of those third-party sites. No email was sent, no social interaction performed, and no third-party form submitted. Items such as Drift that have no link in the original were not assigned invented destinations.

## Local-only changes

1. Asset origins changed to `/vendor/{original-host}/…`; internal routing remains on the local origin.
2. Framer's remote editor toolbar and analytics loader disabled.
3. Literal legacy `new URL(relativeAsset, absoluteModuleURL).href` expressions resolved before localization; three dependent image files added.
4. Lenis requestAnimationFrame cleanup guarded and cancelled on component unmount to prevent local client-navigation errors.
5. Original CDN scaled-image responses stored as `.scale-{width}` files and selected by the included server using the original `scale-down-to` query parameter.

## QA results and limits

- Build verification: seven route documents and all 685 asset files exist and are nonempty; download manifests report zero unresolved failures.
- Standalone-package HTTP smoke test: all 692 requests (seven routes plus 685 asset/variant URLs) returned HTTP 200. The packaged homepage also rendered in a fresh browser tab. This caught and corrected a Windows path-normalization issue before delivery.
- Homepage: desktop visual comparison, navigation hover doodles, animated hero, belief/gallery/portrait sections and all-selected contact state reviewed against the reference and recording.
- Work: all 13 selector states exercised; desktop and 390 × 844 mobile views compared. The original mobile layout's limitations were preserved for fidelity.
- About: page rendered, content compared and image loading checked.
- Case studies: all four render after the legacy URL fix; no broken loaded images found in the final route smoke test and no error-level console messages in that test. Heygo and Resqued full rendered text matched at equal 1280px viewports. Balwin/Pulse comparisons were affected by animated/repeating footer text and changing browser-pane widths; their layouts/content were inspected, but no pixel-exact assertion is made.
- Local Home → Work → Home links clicked successfully; no error-level console messages after navigation with the smooth-scroll cleanup fix.
- Motion timing naturally differs between independently opened pages. Screenshots taken at different animation phases are not pixel-equivalent baselines.
- No exhaustive enumeration of every possible hover/scroll/input combination, full accessibility conformance audit, three-breakpoint regression suite or measured Core Web Vitals certification was performed. The original compiled runtime is retained, but that is not a claim that every possible state was manually tested.

Verdict: **SHIP WITH LIMITATIONS for local reference use**. Production publication and clean editable component-source delivery are outside what this public snapshot provides. Ensure rights to the original branding, project content and fonts before public reuse.
