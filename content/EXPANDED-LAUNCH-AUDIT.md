# Expanded launch audit — 12 October 2026

Scope: both supplied checklist images, the deployed portfolio at https://foxdev-portfolio.vercel.app/, and the corrected local production build. Duplicate checklist items are combined below. This is an engineering audit, not legal advice, a penetration test or a full WCAG certification.

**Verdict: targeted improvements are ready locally; redeploy and remeasure before calling every item complete.** Search Console and Bing are not verified: the owner confirmed this during the audit. No account verification, sitemap submission or indexing request has been made on the owner's behalf.

## Checklist coverage

| Checklist item | Status | Evidence and next action |
|---|---|---|
| Privacy policy | Present; owner review pending | `/privacy` documents email contact, optional GA4, consent storage, Vercel, credited Unsplash images and external links. It remains clearly marked as a template. Confirm retention and property settings. |
| Terms and conditions | Added locally | `/terms` uses the site's utility-page design, footer links, unique metadata and sitemap entry. It explains project scope, external services and third-party ownership without inventing a licence or engagement. Owner/legal review is still required. |
| Remove frontend secrets | Pattern scan passes | Deployed text files are scanned for recognizable private keys and AWS, Google, GitHub and provider credentials. No matching credential was found. Environment files and Git internals are excluded. GA4 Measurement IDs are public identifiers, not secret keys. This is not proof against every possible secret or image-embedded credential. |
| Enforce HTTPS | Live pass | Earlier live GET/HEAD and redirect checks passed for the deployed public pages and missing routes. HTTP returns 308, preserving paths and queries. Source scans find no insecure resource URLs. No custom domain or paid plan is necessary for the current Vercel address. |
| Cookie consent | Live behavior and isolated tests pass | Worldwide opt-in, including EU/UK/Switzerland. Live browser: zero Google tags before consent and after rejection, one correct tag after acceptance, zero after withdrawal/reload. Expiry, blocked storage and cross-tab cases also pass isolated tests. The live test may emit an ordinary page view; this does not prove GA4 receipt. No CAPTCHA, CMP service or extra tracking provider was added. |
| Titles and descriptions | Production build passes | Twelve public pages now have distinct titles/descriptions, including the new terms page. foxDev is the site brand; Satyarth Mishra remains the personal identity. |
| Social preview image | Production build passes | OG/Twitter tags and three reachable 1200 × 630 PNG cards. Actual unsent WhatsApp/LinkedIn previews and cache refresh still need owner testing. |
| Favicon | Improved locally | SVG plus 48 × 48 PNG and 180 × 180 Apple icon on all public, thank-you and 404 pages. The earlier custom 404 lacked a favicon. |
| Sitemap and robots | Production build passes | Sitemap follows the public page registry and includes `/terms`. Robots allows crawling and points to the production sitemap. Thank-you/error/review pages remain outside the sitemap. |
| Image alt text | Production build passes | 1,011 HTML image instances and 103 reviewed runtime filenames, including compressed aliases; decorative alternatives stay empty. |
| Image compression | Improved locally | Ten smaller WebP variants total 2,032,474 bytes instead of 8,179,071 bytes: 6,146,597 bytes saved, about 75%. Original media remains intact. Dimensions and meaningful alpha are checked in the authoring script. The portrait cutout falls from 1,592,520 to 149,082 bytes. |
| Page-load speed | Measured; recheck needed | Baseline live Lighthouse: mobile performance 62, desktop 80; mobile LCP 7.7 s, FCP 3.5 s, TBT 30 ms, CLS 0. Local fixes compress media, add `font-display:swap` to missing declarations and eagerly prioritize the measured hero illustration. No post-deployment score is claimed. |
| Color contrast | Targeted fixes; visual retest pending | Original red on cream was 2.96:1; red on charcoal 4.13:1. New text pairs measure 5.38:1 on cream, 5.70:1 on charcoal and 4.77:1 for dark text on vermilion. Artwork colors are preserved. This does not certify all text over photos, opacity or animated states. |
| Mobile responsiveness / phone test | Sampled emulation; physical phone pending | Live homepage, work, about and a project page were sampled at a requested 375px viewport (provider reported 376px); about also at 768 and 1440px. No horizontal document overflow or broken loaded images was observed in these samples. A physical phone and updated local visual check remain pending. |
| Custom 404 | Live and local pass | Made-up paths return a custom page with real GET/HEAD 404 responses and recovery links, not a catch-all 200. |
| Broken links | Fixed one; repeatable check added | MetroMaarg's former demo returned 404 for both HEAD and GET. Its dead button is removed; the working GitHub repository stays. Internal links pass. Of 34 checked external destinations, 33 returned 200; LinkedIn returned 405 initially and 999 on the final automated check. This is inconclusive, not proof the owner-confirmed profile is broken, so its URL is retained. External checks treat 404/410 as failures; method blocks, bot blocks and network failures require manual review. |
| Form validation | Not applicable | Owner chose email-only contact. There is no submission endpoint. The native artwork viewer's `method="dialog"` form is local dismissal UI only. |
| Spam protection | Not applicable | No server-submission form exists. Do not add a honeypot or CAPTCHA to an email link. Add server validation/rate limits before introducing an actual form and delivery service. |
| Analytics setup | Configured; receipt pending | Real ID `G-S475283TKN` is deployed behind consent. GA4 Realtime/dashboard receipt is not certified. Keep Enhanced Measurement off for the documented minimal page-view setup. Thank-you views are not successful email submissions. |
| Single clear CTA | Retained; semantics improved | Email is the main contact action; project-source and social links remain secondary. Connect's existing panel gains Enter/Space keyboard activation, and email links gain descriptive accessible names. No extra competing form CTA was added. |
| Remove noindex | Correct public/private distinction | Public pages remain indexable. Thank-you, error, legacy redirect documents and review artifacts keep noindex intentionally. Never remove every noindex indiscriminately. |
| Google Search Console | Owner action pending | Add the exact HTTPS URL-prefix property, choose HTML tag verification and share the generated public tag for inclusion. Do not attempt to verify the parent `vercel.app` domain. |
| Submit sitemap | Owner action pending | After verification and deployment, submit `sitemap.xml` in the property's Sitemaps report. Hosting the file alone does not prove account submission. |
| Request indexing | Owner action pending | Use URL Inspection, Test Live URL and Request Indexing for the homepage and important pages after verification. Indexing and rankings are not guaranteed. |
| Bing Webmaster Tools | Owner action pending | Import the verified Google Search Console property, or provide Bing's HTML verification tag. Check its sitemap report afterward. |
| Google Business Profile | Not added | No eligible in-person customer business has been established. Online-only businesses generally are not eligible; do not invent a public address, hours or customers for a personal portfolio. |
| Set site name | Added locally | Homepage WebSite JSON-LD identifies foxDev, with Satyarth Mishra as an alternative name; OG site-name tags are included. This signals preference, not guaranteed Google display. |
| Redirect old URLs | Improved locally | Four known legacy case-study routes now have permanent Vercel redirects matching the supplied local server. Previously the static host only had meta-refresh documents. Post-deploy checks verify actual HTTP redirects. |
| Allow ChatGPT search bot | Already allowed | `User-agent: *` with `Allow: /` allows OAI-SearchBot. Search crawling and GPTBot training settings are separate. No new training preference, account access or firewall policy was inferred. Inclusion in ChatGPT results is not guaranteed. |
| Reviews / FAQ | Retained | Six evidence-based native FAQ items and two explicitly empty review slots. No fabricated quotes, names, photos, ratings or FAQ/review-star schema. |

## Baseline performance evidence

[Google PageSpeed report](https://pagespeed.web.dev/analysis/https-foxdev-portfolio-vercel-app/pkcmwrhrzq?form_factor=mobile), captured 12 October 2026 at 21:04 IST, Lighthouse 13.5.0.

| Metric | Mobile | Desktop |
|---|---|---|
| Performance | 62 | 80 |
| Accessibility | 83 | 83 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| First Contentful Paint | 3.5 s | 0.4 s |
| Largest Contentful Paint | 7.7 s | 2.8 s |
| Total Blocking Time | 30 ms | 160 ms |
| Cumulative Layout Shift | 0 | 0 |

These are lab results for the previous deployment, not field Core Web Vitals or results for the new build. The report had no real-user dataset. The direct PageSpeed API returned 429; the public UI report succeeded. New local fixes address font loading, hero discovery, image weight, missing main landmark, unnamed home-logo links, a label on a generic element and a ticker list's inappropriate group role. The inherited React runtime still emits recoverable hydration warnings. A new Lighthouse and keyboard/visual pass is required after deployment; no 90+ score or complete accessibility claim is made.

## Finish Google and Bing setup

1. Open [Google Search Console](https://search.google.com/search-console/), select Add property and choose **URL prefix**.
2. Enter `https://foxdev-portfolio.vercel.app/` exactly. Choose **HTML tag** under verification methods.
3. Copy the complete public `<meta name="google-site-verification" content="…">` tag and give it to the developer to add to the homepage. Do not share passwords, account cookies or session tokens. Deployment is required before clicking Verify. Keep the verification tag afterward.
4. Once verified, open **Sitemaps**, enter `sitemap.xml`, submit and check the result.
5. Inspect the homepage, `/work`, `/about` and selected project URLs. Use Test Live URL, then Request Indexing where appropriate. Do not submit thank-you or error pages.
6. Open [Bing Webmaster Tools](https://www.bing.com/webmasters/), choose **Import from Google Search Console**, review the permissions and select this verified property. Check the imported sitemap. Alternatively send Bing's generated HTML tag for a separate build.

Verification, actual sitemap submission, indexing requests and analytics receipt remain incomplete until account evidence confirms them.

## Repeatable checks

```powershell
npm run build:production
node scripts/verify-launch.mjs --external
# After publishing this build:
node scripts/verify-live-seo.mjs
node scripts/verify-live-https.mjs https://foxdev-portfolio.vercel.app
```

Production builds run the extra launch safeguards automatically. The optional `scripts/optimize-media.mjs` authoring command needs the already available sharp runtime, but Vercel builds use the checked-in assets and need no new dependency. Save both `work/personalization/assets` and generated output when committing changes.

Final local production checks passed: 35 JavaScript modules, 1,277 local references, 132 internal link checks, 12 public pages, three share cards and the consent scenarios. The deployed-check script also passed against a fresh local child server with production metadata: 13 pages including thank-you, 12 internal destinations, favicon dimensions, response headers, four legacy redirects and made-up GET/HEAD 404s. Its alt checks reuse the generated reviewed registry so compressed aliases are not incorrectly flagged.

Evidence is saved locally under `work/launch-check`: media-compression.json, expanded-checks.json and local/live SEO observations. Image alternatives are in content/image-alts.json and the generated personal/image-alts.json. Titles and descriptions are in outputs/satyarth-portfolio/SEO-PAGES.md.

## Coverage limits

The in-app browser could reach the live website, but localhost:4191 timed out despite a running server. Child-process HTTP tests verify the new build; they do not replace a rendered visual regression or screen-reader test. A mobile screenshot was inspected during the live test; export of the Lighthouse screenshot timed out. No after-change screenshot is offered as proof. No source redesign, original-photo overwrite, invented review, new form, paid service or account mutation was performed.

Graphify reused its 7,820-node map. Query vocabulary: profile, build, image, favicon. It found 84 nodes, showed 25 and omitted 59 at budget 1000. The map predates SEO/consent, so direct source traces and runnable tests provide current evidence. No full reindex was run. Token usage is unavailable, not zero.

## Primary references

- [Google ownership verification](https://support.google.com/webmasters/answer/9008080)
- [Google indexing requests](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
- [Google site names](https://developers.google.com/search/docs/appearance/site-names)
- [Google Business Profile eligibility](https://support.google.com/business/answer/13763036)
- [Bing site verification and import](https://www2.bing.com/webmasters/help/add-and-verify-site-12184f8b)
- [OpenAI crawlers](https://developers.openai.com/api/docs/bots)
- [ICO cookie guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/)
- [Vercel configuration](https://vercel.com/docs/project-configuration/vercel-json)
