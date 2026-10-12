# HTTPS, FAQ and testimonial placeholders

## Current live verification — 12 October 2026

The site is now deployed at `https://foxdev-portfolio.vercel.app` on Vercel. `verify-live-https.mjs` passed TLS certificate validation for all 11 public pages, `/thank-you` and an unknown URL. HTTP returns 308 to HTTPS, preserving paths and queries. Unknown GET/HEAD requests return a real custom HTTP 404. All six FAQ accordions opened in the live browser; reviews remain visibly empty placeholders. Source scans found no insecure resource references. The browser reported recoverable React hydration warnings; this is not a clean-console or complete accessibility/performance approval. Local browser navigation timed out, although local HTTP checks passed. The new production metadata/GA4 configuration must still be deployed. This current section supersedes the historical pending-deployment status below. See `LAUNCH-CHECKLIST.md` for remaining gates.

Updated 12 October 2026. The plan and six proposed questions with draft answers were shown before website edits. The user authorized proposing questions from the existing site and confirmed that the portfolio is not deployed yet.

## HTTPS status

**Live HTTPS and HTTP-to-HTTPS redirects are pending deployment.** No public URL, hosting provider or certificate is available to inspect. The local Node server uses HTTP on loopback for development; it is not a TLS server. Do not expose it directly as a public HTTPS endpoint without a TLS-capable host or reverse proxy.

The production build already requires an HTTPS SITE_URL and rejects a missing URL and known local/placeholder origins. Public resource references are root-relative or HTTPS. The current check scans resource attributes in public HTML and bundled JavaScript, CSS and SVG files for insecure HTTP/WebSocket URLs. Known XML namespace identifiers are excluded because they are identifiers, not resource downloads. Local preview metadata and sitemap URLs remain HTTP localhost until the actual production origin is configured.

The scan passed with no insecure resource URLs. This is a source check, not proof that a deployed browser has no mixed-content warnings or that a certificate and redirect are configured.

After choosing a host:

1. Configure the real domain and enable the host’s HTTPS certificate and HTTP-to-HTTPS redirect. The host must redirect HTTP requests to HTTPS while preserving paths and query strings. No host configuration was invented for an unknown provider.
2. Set SITE_URL to the actual HTTPS origin and run `npm run build:production`. Publish `outputs/satyarth-portfolio` and retain the real 404 behavior. The supplied Node server is intended to sit behind TLS if you choose to run it in production; static hosts use their own HTTPS settings.
3. Run `node scripts/verify-live-https.mjs https://YOUR-ACTUAL-DOMAIN` from the workspace. It checks all public pages, the thank-you page and a made-up route using normal TLS certificate validation. It checks HTTP redirects separately and verifies path/query preservation. It has not been run against a live site because none exists yet.
4. Open the deployed site in a browser. Visit each page, expand the FAQ, open the artwork viewer and check the console/network panel for mixed-content warnings, including dynamically loaded resources. Check credited remote photos and consented GA4 separately. The source scan cannot observe redirects or requests made by third-party scripts at runtime.

No certificate was created, hosting setting changed, domain purchased or deployment performed.

## FAQ

Six native details/summary accordions appear near the bottom of About, before the closing site footer. They work without JavaScript and remain outside the inherited React hydration root, so hydration does not remove them. Styling uses the existing cream, charcoal and vermilion palette, visible keyboard focus and reduced-motion support.

Edit `content/about-extras.json`, then rebuild. Each answer includes evidence references in that source file. Drafts with needsConfirmation set to true are omitted from the published page. Availability for roles, rates and response-time promises are recorded under pendingConfirmation and are not published as claims.

| Question | Answer |
|---|---|
| What kind of work do you do? | I explore AI engineering, digital products and visual design, including computer vision, edge AI, interfaces and graphic studies. |
| Where are you based? | Greater Noida, India. I’m studying Computer Science and Artificial Intelligence at GLA University. |
| Where can I see your code? | Most project stories link to public GitHub repositories. VEENA Rover’s source is not publicly available here. |
| Are these production-ready products? | The portfolio includes prototypes and concept demos. Each project story explains its implementation, limitations and current scope. |
| Can I try the projects? | Project stories link to live demos where available, and source repositories where public. |
| How can I contact you? | Use the email link to open your email app, or connect through LinkedIn or X. |

No FAQPage schema is added. Google’s current changelog states that FAQ rich results no longer appear, with removal announced for 7 May 2026: https://developers.google.com/search/updates.

## Testimonials

About contains two plainly labeled empty review placeholders. Their only content is a placeholder identifier, “[Exact review text to be supplied]” and “[Approved name and role to be supplied]”. A visible note says no reviews have been published there.

No review, reviewer identity, rating, photo, client relationship or business result was invented or reworded. No review or aggregate-rating schema is added. The section does not collect submissions or introduce a third-party tool.

When the owner supplies real reviews, preserve each review verbatim. Confirm permission to publish the text and attribution, and separately confirm permission for any photo. Do not imply a customer relationship when feedback came from a teammate or collaborator. Update the privacy inventory if external review widgets or remote reviewer images are introduced. The empty placeholders are visibly unfinished; replace or remove them before launch if genuine feedback is not ready.

## Verification and limitations

`npm run build` includes repeatable checks for mixed-resource references, FAQ text/structure, clearly empty testimonial slots and absence of FAQ/review-star schema, along with existing SEO, link, image and consent checks. The standalone live HTTPS checker is syntax-checked but cannot test a deployment that does not exist.

The local browser timed out opening `http://127.0.0.1:4175/about`. Live visual inspection and browser interaction testing remain unverified. Source and local HTTP checks pass; these are not substitutes for deployed HTTPS and mixed-content checks.

Graphify consulted vocabulary `profile projects enhance`: 35 nodes found, 10 displayed and 25 omitted by the budget. Direct source and content inspection supplied current evidence. Findings were saved without a full reindex. Existing graph locations may be stale. Token usage is unavailable, not zero.
