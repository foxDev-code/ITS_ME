# Four-round launch verification

Verified locally on 12 October 2026. Plans were shown before each round. Existing implementations passed, so no duplicate features or new dependencies were added. The only authored changes in this audit are this report and corrected counts in SHARE-PREVIEWS.md. Generated output was rebuilt.

**This is not a live-launch approval.** No public URL or real GA4 Measurement ID was supplied. The current output uses http://localhost:4173 in canonical URLs, sitemap and sharing metadata for local preview. Do not publish that build unchanged.

## Round 1 — Google

Plan: rebuild; verify every public page, metadata, incoming internal links, sitemap and robots; request unknown paths over HTTP.

Result: PASS locally. Eleven public pages have distinct titles and descriptions. All 111 checked internal links resolve; every public page has an incoming link. Sitemap follows the public page registry on each build. It excludes thank-you, review artifacts and error pages. Robots allows crawling and points to the sitemap; there is no Disallow: / rule.

Actual requests against an automatically started local server:

```text
GET /this-page-does-not-exist-seo-check -> HTTP 404
GET /missing/deep/page -> HTTP 404
GET /404.html -> HTTP 404
```

HEAD returns 404 too. The custom page offers homepage and main-page links. Legacy project redirects return 301. Local link checks do not certify external websites or all browser-only interactions.

Check again: run `npm run test:seo`. After deployment, request a made-up URL and confirm 404, not a host's SPA fallback with status 200. Review the title/description table in `outputs/satyarth-portfolio/SEO-PAGES.md`.

## Round 2 — Sharing and images

Plan: inspect initial-HTML social tags, fetch image files and inspect dimensions, then verify authored image alternatives and runtime source changes.

Result: PASS locally. Eleven public pages plus thank-you and 404 have Open Graph title, description, type, URL and image; Twitter uses summary_large_image. Three PNG share cards return HTTP 200 at exactly 1200 × 630 pixels. All 1,011 public HTML image instances match the reviewed alternatives; runtime checks cover 96 sources, including decorative empty alternatives. This is not a complete screen-reader or browser accessibility audit.

The default card is deliberately named `work/personalization/assets/share-default-placeholder.png`. Replace it with a 1200 × 630 PNG if desired; update its descriptive alternative in scripts/seo.mjs when image content changes, then rebuild. Agri Sarthi and Suraksha One have project-specific cards. The full image/alt review is in content/IMAGE-ALT-PLAN.md and content/image-alts.json.

Check again: run `npm run test:seo`. After deployment, paste the public homepage and a project URL into an unsent WhatsApp or LinkedIn draft. Check the displayed title and image, then clear the draft. Actual platform previews remain unverified. Cached previews may need a refresh or new image filename.

## Round 3 — Contact, tracking and privacy

Plan: preserve the user's email-only decision; inspect all submission paths, thank-you indexing, consent behaviour and the collection inventory.

Result: PASS for the implemented email-only scope. There is no contact-submission form or endpoint. The artwork viewer uses a local method=dialog form only. POST requests to /, /about and /api/contact return 405 with Allow: GET, HEAD. Honeypot, form-field validation and submission rate limiting are not applicable; they must be implemented before adding a future submission endpoint.

/thank-you returns 200, has noindex in HTML and the supplied server header, and is absent from the sitemap. It explicitly does not claim an email was sent or received. Mailto links cannot confirm successful delivery and therefore do not redirect there.

GA4 is prepared but disabled: G-XXXXXXXXXX is not a real Measurement ID. With a real ID, explicit consent is required worldwide, including EU/UK/Swiss visitors. Isolated runtime tests pass for no tag before acceptance, rejection, acceptance, duplicate prevention, withdrawal, expiry, blocked storage and cross-tab changes. Tests sent no requests to Google; GA4 Realtime is not verified.

The footer links to /privacy, visibly marked as a template requiring owner review. Its inventory covers email contact, consent storage, optional GA4, optional bundled Framer storage, two remote Unsplash images, external links and unconfirmed hosting logs. No form processor, CAPTCHA, newsletter or payment collection is invented.

Check again: run `npm run test:consent` and `npm run test:seo`. Review content/PRIVACY-AND-ANALYTICS.md, especially hosting/email retention and GA4 property settings. To enable analytics, supply your actual GA_MEASUREMENT_ID in the build environment. On the deployed site, inspect network requests before/after accepting, reject and withdraw, and check your own GA4 Realtime report. Do not count /thank-you visits as submitted forms on this email-only site.

## Round 4 — Trust

Plan: scan resource references, inspect FAQ evidence and uncertain claims, and verify that review slots contain placeholders only.

Result: PASS for source/content checks. The audit checked 1,231 resource attributes plus bundled JavaScript, CSS and SVG files; no insecure resource URLs were found. XML namespace identifiers are not resource downloads and remain unchanged. A source scan does not observe third-party redirects or runtime mixed content.

About contains six native FAQ accordions based on existing site content, as previously authorized. Availability, rates and response-time promises remain unpublished pending confirmation. Two review slots are explicitly labeled placeholders; no review text, identity, photo or rating is invented. No FAQ, Review or AggregateRating schema is added.

Live HTTPS, certificate validity and HTTP-to-HTTPS redirects remain PENDING. No host or TLS configuration was changed. The supplied Node server uses local HTTP and needs a TLS-capable host or reverse proxy for public deployment. Browser verification of http://localhost:4176/about failed with net::ERR_CONNECTION_TIMED_OUT, so visual layout, interactions and browser-network warnings remain unverified.

Check after deployment:

```powershell
$env:SITE_URL = 'https://YOUR-ACTUAL-DOMAIN'
# Optional: set GA_MEASUREMENT_ID only to your real ID.
npm run build:production
# Publish outputs/satyarth-portfolio using your chosen host, then:
node scripts/verify-live-https.mjs https://YOUR-ACTUAL-DOMAIN
```

Replace YOUR-ACTUAL-DOMAIN; it is not a usable launch domain. Enable the host's certificate and HTTP redirects. Preserve path/query strings and real missing-page status codes. Open all public pages in a deployed browser and check runtime mixed-content warnings. Review or replace the empty review placeholders before launch; never fill them with fabricated feedback.

## Overall result

`npm run build` passed: 35 JavaScript modules, 1,221 local references, seven project stories, all SEO/share/image checks, FAQ/review checks and consent checks. Website feature code was already present and did not need changes.

Remaining launch gates: actual host/domain, production metadata build, live HTTPS/404 checks, browser interaction/network checks, actual social preview checks, owner-reviewed privacy policy, and a real GA4 ID/Realtime check if analytics is wanted.

Graphify consulted the existing 7,820-node graph with vocabulary `profile projects enhance metadata links server`: 95 nodes found, 12 shown, 83 omitted by the 500-token budget. Source inspection and runnable tests supplied current evidence; graph locations may be stale. Findings were saved without a full reindex. Token usage is unavailable, not zero.
