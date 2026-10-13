# Live launch verification — 12 October 2026

Site: https://foxdev-portfolio.vercel.app/
Audited revision: `fac2cb2` on `main`. Brand: foxDev. Personal identity: Satyarth Mishra.

This report supersedes the deployment, account and measurement status in `EXPANDED-LAUNCH-AUDIT.md`. It combines both supplied checklist images and the earlier four-round checklist. Verification only: no website code, analytics settings, verification settings or deployments were changed. No commit or push was made.

**Verdict: most launch basics work, but the checklist is not completely finished.** The mobile About page clips important text, rendered contrast still has failures, and performance needs improvement. Bing is not verified. Google sitemap processing and owner review of legal/privacy settings remain pending.

## Full checklist

| Item | Result | Evidence / remaining work |
|---|---|---|
| Privacy policy | Present; review pending | Live `/privacy` returns 200 and footer links work. It remains explicitly a template. It covers email contact, optional GA4, consent storage, Vercel hosting, remote Unsplash photos and external links. Confirm actual retention, Google property settings, data sharing and applicable obligations before treating it as approved. |
| Terms and conditions | Present; review pending | Live `/terms` returns 200, has metadata and footer links, and is in the sitemap. The owner must review the template. |
| Remove frontend secrets | Pattern scan passes | 808 generated/deployed-output files were scanned; no recognized credential pattern matched. Public GA4 IDs are not credentials. This does not prove the absence of every possible secret and is not a penetration test. |
| HTTPS and HTTP redirects | Live pass | All 12 public pages and `/thank-you` load over HTTPS. HTTP returns 308 to the same HTTPS host, preserving paths; a query-string redirect was also checked. Certificate validation stayed enabled. |
| Mixed content | Source/build checks pass | 1,269 resource attributes plus bundled JS/CSS/SVG scans found no insecure resource URLs. No mixed-content issue was observed in sampled live pages. This is not an exhaustive test of every animation state or third-party destination. |
| Cookie consent | Automated behavior passes | The implementation requires opt-in worldwide, covering EU/UK/Switzerland. Isolated tests pass for no Google tag before consent or after rejection, one tag after acceptance, withdrawal, expiry, blocked storage and cross-tab changes. The live tab already had accepted consent; its Google tag alone is not a fresh pre-consent test. |
| Unique titles and descriptions | Live pass | All 12 public pages have unique production metadata and correct canonical URLs; `/thank-you` has separate metadata. See the page table below. |
| Social preview image and tags | Technical pass; app preview pending | Required Open Graph and Twitter tags are live. Three reachable PNG cards are exactly 1200 × 630. Actual unsent WhatsApp/LinkedIn card rendering and cache refresh were not verified. The default file is intentionally named `personal/assets/share-default-placeholder.png`; replace it at 1200 × 630 if changing the default artwork. |
| Favicon | Live pass | SVG favicon, 48 × 48 PNG and 180 × 180 Apple icon references and dimensions pass. |
| Sitemap | Live file passes; Google processing pending | `/sitemap.xml` returns 200 and contains exactly the 12 public HTTPS URLs. It is generated from the public page registry on build. `/thank-you`, errors and verification files are excluded. The user's submission-success popup confirms submission, not successful processing; the latest supplied sitemap report still said “Couldn't fetch.” |
| robots.txt | Live pass | Allows public crawling and points to the production sitemap. No `Disallow: /` is present. |
| Meaningful and decorative alt text | Automated coverage passes | 1,011 live HTML image instances match the reviewed alt registry; 103 runtime image filenames, including compressed aliases, are covered by local checks. Decorative images use empty alternatives. This is coverage verification, not a new subjective review of every duplicate image. |
| Image compression | Improved; further savings remain | Ten WebP variants total 2,032,474 bytes versus 8,179,071 bytes originally: about 75% smaller in aggregate. Current mobile Lighthouse still reports about 506 KiB of potential image savings. |
| Page-load speed | Measured; needs improvement | Fresh PageSpeed lab scores: mobile performance 64, desktop 83. Mobile LCP 7.2 s, FCP 3.5 s, TBT 20 ms and CLS 0. Desktop LCP 2.7 s, FCP 0.4 s, TBT 10 ms and CLS 0. No field Core Web Vitals or INP data was available. |
| Color contrast | Not fully complete | Targeted text-token ratios pass, but fresh Lighthouse still flags “Light, paper, a little texture.”, “Let's build something”, “Useful AI products” and “Thoughtful design”. Accessibility scores are 96, not proof of full WCAG compliance. |
| Mobile responsiveness / phone test | Fix needed | At an actual 376 CSS-pixel viewport, About-page notebook text visibly extends beyond the screen. The intro measured approximately x=-216 to x=511 and education text x=-217 to x=207. Overflow is hidden, so no horizontal scrollbar does not mean the content fits. Home and Work samples had no broken loaded images. A physical-phone test and comprehensive tablet/desktop review remain pending. |
| Custom 404 | Live pass | GET and HEAD for `/launch-check-missing-page` and `/missing/deep/launch-check` return real HTTP 404, with the site's custom recovery page rather than a 200 catch-all. |
| Internal and broken links | Internal pass; one external result inconclusive | All 12 checked internal destinations return 200. Of 34 external destinations, 33 return 200; LinkedIn returns HEAD 405, which does not establish a broken profile. The prior dead MetroMaarg demo link is absent. All four configured legacy redirects return a permanent redirect. |
| Form validation | Not applicable | The owner chose email-only contact. There is no contact-submission endpoint. A local artwork-viewer dialog is not a submission form. |
| Spam protection / honeypot / rate limiting | Not applicable | Email links do not need form honeypots or CAPTCHA. Server validation and rate limiting must be added if a real submission form is introduced. |
| Thank-you page | Technical pass; no form workflow | `/thank-you` returns 200, is noindex and is outside the sitemap. Its conditional wording does not claim an email was received. Visiting it is not proof of a successful contact submission. |
| Google Analytics | Receipt confirmed; settings review pending | GA4 `G-S475283TKN` is configured. Read-only Realtime inspection showed portfolio homepage and Work page titles with three `page_view` events. The foxDev Portfolio stream reports recent traffic. Audit visits may contribute. Enhanced Measurement is ON (including scroll and outbound-click measurement); review this against intended collection and the privacy template. No property settings were changed, and no form-success key event was verified. |
| Single clear CTA | Present; broader interaction QA pending | Email contact remains the primary action, with descriptive contact/navigation labels. No additional competing submission form was added. This is not a conversion-rate or complete keyboard-flow certification. |
| Remove public noindex | Live pass | Public pages have no noindex in HTML or response headers. The thank-you and error pages remain intentionally non-indexable. Do not remove those exclusions indiscriminately. |
| Search Console setup | Account access evidenced; indexing not guaranteed | The supplied Search Console screenshots show the property and a successful Google live URL-availability test. That confirms fetchability, not inclusion in Google's index. |
| Submit sitemap to Google | Submitted; processing unconfirmed | Submission was accepted in the user's screenshot. Check the sitemap report for a subsequent Success status and discovered pages; do not repeatedly submit to force processing. |
| Request indexing | Pending due to quota | The latest screenshot shows Google's daily request quota was exceeded. Retry an important page when the quota resets; do not request indexing for the sitemap itself. This quota is not evidence that normal crawling is disabled. |
| Bing Webmaster Tools | Not verified | The live account screen says it cannot access `BingSiteAuth.xml`; an independent request to that root URL returns HTTP 404. The verification file or an approved alternate method still needs implementation and verification. |
| Google Business Profile | Not automatically applicable | An online portfolio does not establish eligibility. Do not create a fictional address, opening hours or business listing. Google generally requires in-person customer contact for eligible businesses; see the official guidance below. |
| Site name | Technical pass | foxDev is present in site-name metadata/structured data; Satyarth Mishra remains the personal identity. Search engines choose how to display the name. |
| Old URL redirects | Live pass for configured routes | All four known legacy case-study redirects are permanent and resolve. No claim is made about unknown historic URLs. |
| Allow ChatGPT search bot | Allowed by robots; inclusion unverified | `User-agent: *` with `Allow: /` does not block OAI-SearchBot. Actual crawler-IP/WAF access and search inclusion were not tested. Search crawling and GPTBot training preferences are separate. |
| FAQ | Present | Six native FAQ items are present. No FAQ rich-result schema is added. Answers remain based on portfolio content; owner confirmation of personal/availability details is still appropriate. |
| Reviews/testimonials | Placeholders only | Two empty, clearly marked placeholders are present. No fabricated customer names, quotes, photos, ratings or review-star schema were found by the checks. |

## Additional issues discovered

1. `/`, `/work` and `/about` each rendered with zero H1 elements. Add one meaningful primary heading per main page without changing the visual design unnecessarily.
2. The live browser logged five recoverable React #418 warnings and one #422 warning. No hard crash was observed, but hydration/rendering mismatches still need root-cause investigation.
3. Lighthouse reports approximately 99 KiB of unused JavaScript and 10 KiB of unused CSS. Prefer reducing existing assets/runtime work rather than adding more animation libraries.

Recommended order: mobile About clipping → contrast and heading structure → rendering warnings and speed → Bing verification → Google processing and owner privacy/legal review.

## Page metadata verified live

| Page | Title | Description |
|---|---|---|
| `/` | AI, Design & Code \| foxDev | Explore Satyarth Mishra’s work across AI engineering, digital products and visual design, with selected projects and creative experiments. |
| `/work` | Projects & Experiments \| foxDev | Explore projects in crop awareness, safety interfaces, mobility and AI workflows, alongside smaller technical and creative experiments. |
| `/about` | About Me \| foxDev | Meet Satyarth Mishra, a Computer Science and AI student in Greater Noida exploring engineering, visual design and creative collaboration. |
| `/privacy` | Privacy Policy \| foxDev | How Satyarth Mishra’s portfolio handles email contact, optional analytics, browser storage and external services. A privacy template for owner review. |
| `/terms` | Website Terms \| foxDev | Notes on using foxDev, project scope, third-party credits and contacting Satyarth Mishra. A terms template for owner review. |
| `/projects/agri-sarthi/` | Agri Sarthi \| foxDev | An interactive crop-awareness experience that helps make early observation and field scouting easier to understand. |
| `/projects/suraksha-one/` | Suraksha One \| foxDev | A smart-helmet concept and supervisor interface exploring clearer safety signals, worker status and emergency response. |
| `/projects/metromaarg/` | MetroMaarg \| foxDev | A metro travel prototype bringing route planning, ticket journeys and operational dashboards into one experience. |
| `/projects/nexus-ai-ops/` | Nexus AI Ops \| foxDev | An agency operations prototype connecting content, briefs, campaign review and reporting with AI-assisted workflows. |
| `/projects/resume-intelligence/` | Resume Intelligence \| foxDev | A document-analysis prototype combining PDF extraction, semantic retrieval and structured résumé-to-role comparisons. |
| `/projects/qa-matrix/` | QA Matrix \| foxDev | An AI-assisted quality workflow exploring test planning, automation generation and failure analysis from requirements. |
| `/projects/veena-rover/` | VEENA Rover \| foxDev | A disaster-response rover project exploring person detection, environmental sensing and operator communication. |
| `/thank-you` (noindex) | Thank You \| foxDev | Email follow-up information and links back to Satyarth Mishra’s portfolio. |

## Evidence and repeatable checks

Run these from the repository root, not `C:\Users\Satyarth`:

```powershell
node scripts/verify-live-seo.mjs https://foxdev-portfolio.vercel.app
node scripts/verify-live-https.mjs https://foxdev-portfolio.vercel.app
node scripts/verify-launch.mjs --external
node scripts/verify-consent.mjs
node scripts/verify-seo.mjs
```

All five completed successfully during this audit. Automated passes do not override the mobile visual failure, contrast findings or unfinished external-account steps. Local scripts test the existing generated build; no rebuild was performed during this verification-only request.

- Machine reports: `work/launch-check/live-seo.json` and `work/launch-check/expanded-checks.json`. The live-SEO script's generic limitation about GA dashboard access applies to that script; the separate read-only dashboard inspection above confirmed receipt.
- [Fresh mobile PageSpeed report](https://pagespeed.web.dev/analysis/https-foxdev-portfolio-vercel-app/1i5gux3a09?form_factor=mobile) and [desktop result](https://pagespeed.web.dev/analysis/https-foxdev-portfolio-vercel-app/1i5gux3a09?form_factor=desktop), generated around 23:47 IST on 12 October 2026. These are lab measurements, not real-user Core Web Vitals.
- [Google sitemap reporting guidance](https://support.google.com/webmasters/answer/7451001) distinguishes submission and processing.
- [Google recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl) explains request limits and the lack of indexing guarantees.
- [Google Business Profile eligibility](https://support.google.com/business/answer/13763036) covers in-person contact and ineligible online-only businesses.
- [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots) separates OAI-SearchBot from GPTBot and describes crawler access requirements.

## Analysis coverage and limits

Graphify's existing map was consulted with expanded tokens `profile build image favicon verify` (80 candidate nodes, 28 shown within the query budget). The graph predates some launch files, so current direct source reads, HTTP checks and rendered observations take precedence. No full-project reindex was performed. Findings are saved with this coverage limitation; tool/model token usage was unavailable, not zero.

This is not a full security audit, legal approval, exhaustive accessibility certification, physical-device test, social-app preview test or guarantee of search-engine indexing. No accounts, passwords or credentials were requested or changed.
