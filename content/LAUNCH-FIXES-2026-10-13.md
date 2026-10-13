# Launch fixes — 13 October 2026

Scope: targeted follow-up to `LAUNCH-VERIFICATION-2026-10-12.md`. Brand foxDev and Satyarth Mishra's personal identity remain intact. This is not legal approval, a full security/accessibility certification or an indexing guarantee.

## Implemented

- Mobile About notebook: replace fixed-width text positioning with a narrow-screen column layout, retaining the portrait, roles and illustrated cards. Desktop styles remain unchanged.
- Contrast: apply the paper text tone to the shared cream contact card and the dark-surface tone to the margin note. Text-token ratios are 5.38:1 on cream and 5.70:1 on charcoal; artwork colors are unchanged.
- Headings: one accessible H1 for Home, Work and About, outside the React hydration container, without altering the visual artwork.
- Rendering: defer personalization until a React effect signals the committed render. Both event-order paths have an isolated runnable check. Recoverable errors are not suppressed.
- Bing: copy the supplied public `BingSiteAuth.xml` to the output root; test GET/HEAD HTTP 200, XML content and sitemap exclusion.
- Privacy: keep Enhanced Measurement enabled as requested. Disclose scrolls, outbound clicks, file-download clicks, possible automatic URL collection and the difference between a local dialog interaction and an enquiry. Consent still gates Google Analytics worldwide.
- Images: right-size the portrait cutout and two fox illustrations while preserving aspect ratio and meaningful alpha. The ten optimized assets now total 885,212 bytes, down from 2,032,474 bytes in the previous build (56.4% smaller). The original photograph and PNG inputs remain intact.

## Local checks

The production build and all five verification stages pass: JavaScript/assets, SEO/HTTP, consent and expanded launch checks. Results include 12 indexable public pages, 132 internal-link checks, 1,011 image instances, 103 reviewed runtime filenames and three 1200 × 630 share cards. A made-up URL returns real HTTP 404; Google and Bing verification files return HTTP 200. No recognized credential pattern or insecure resource URL was found.

The browser cannot reach the sandboxed localhost preview. A successful HTTP test is not proof of rendered layout or warning-free hydration. These require checking the approved deployment; no new Lighthouse score is claimed yet.

## Live verification after the owner pushed `ed42f0a`

Vercel serves the new Bing XML, heading markup, privacy wording and optimized assets. Live scripts pass for 13 routes including thank-you, 12 internal destinations, 1,011 image instances, three share cards, real GET/HEAD 404s and HTTP 308 redirects to HTTPS with paths/queries preserved.

At a requested 375px viewport (actual 376px), the About intro and education fit between x≈40 and x≈321, instead of extending beyond the screen. The illustrated-card text also fits. At 768px these text blocks fit between x≈48 and x≈704; at 1440px they remain within the screen. The mobile screenshot is saved under `work/launch-check/about-mobile-ed42f0a.png`. Desktop screenshots are limited by the physical browser panel's capture width. There is no committed visual baseline, so a full visual-regression verdict remains inconclusive. Native FAQ expansion works with Enter. The four previously flagged Home text elements now use the intended high-contrast tones.

Live testing still finds recoverable React warnings: Home has five #418 and one #422; the first About load has two #418 and one #422; Work has two #425, three #418 and one #422. No hard crash was observed. The earlier root-level commit signal is not sufficient to certify deferred-page hydration.

A follow-up local fix aligns Work-card roles, dates and initial project details in HTML with the client copy across all SSR breakpoints. It moves the ready effect inside each actual page component, below Framer's Suspense boundary, without suppressing errors. Additional contrast rules cover the mobile Home notebook and About role headings. Production checks pass, including new HTML/client-content guards. **This follow-up still needs a push and a fresh live rendering check; warning-free rendering is not yet claimed.**

## Still outside a code-only fix

- Bing's verification file is now live. Account verification still needs a successful Verify result.
- Search Console submission was accepted, but successful sitemap processing/indexing remains unconfirmed. Do not repeatedly resubmit or request indexing for the sitemap itself. The daily manual-indexing quota does not disable normal crawling.
- The owner must review privacy/terms templates, actual retention, Google data-sharing and linked-product settings.
- Contact stays email-only. No submission endpoint means honeypot, CAPTCHA, form validation and a form-success key event are not applicable.
- A physical-phone test, actual unsent social-app previews and real-user Core Web Vitals remain separate checks.

## Analysis coverage

Ponytail guided shared root-cause fixes and reuse of the existing optimizer/checks. Accessibility and browser-QA guided contrast, content fit and verification limits. Graphify reused the existing map with vocabulary `enhance build about mobile hydration image`: 132 candidates, 33 shown and 99 omitted at budget 1400. The deployment follow-up queried `enhance build about mobile hydration`: 108 candidates, 12 shown and 96 omitted at budget 600. The map predates launch changes; direct source traces, live observations and runnable checks are authoritative. No full-project reindex was performed. Token usage is unavailable, not zero.
