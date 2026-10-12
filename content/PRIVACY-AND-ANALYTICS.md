# Privacy, email contact and optional analytics

## Inventory presented before website edits

The audit covered authored JavaScript, the generated public HTML, the supplied Node server and bundled JavaScript. Browser execution could not be verified because the in-app browser timed out opening localhost. Source presence alone is not evidence that an optional framework facility executes on every visit.

| Item | Finding before this change | Data or interaction |
|---|---|---|
| Contact-submission forms | None across the ten original public pages or authored runtime | No contact fields, POST handler, form processor, upload or visitor database |
| Artwork dialog form | One runtime `form method="dialog"` in src/personal/personal.js | Closes the local artwork viewer; no fields, server action or data submission |
| Email links | profile.json, personal.js, case-study templates and inherited navigation | Open the visitor’s email app; sending happens outside the website |
| Cookies and analytics | No site-authored cookies, GA4 tag, tracking beacon or CAPTCHA found | No existing analytics implementation was identified |
| Framer storage capabilities | Local bundled framer.B2l6xyRN.mjs references preferredLocale, logLevel, an editor-bar preference and a response cache | Optional localStorage facilities; no active locale selector or remote data-query configuration was identified |
| Unsplash photographs | Two images.unsplash.com URLs in profile.json, used in personal sections and the gallery | Image requests expose normal connection metadata to Unsplash |
| Framer, React and animation libraries | Bundled local JavaScript; includes Motion, GSAP and a FramerUni component attribution | Served locally; attribution, documentation and namespace URLs in source are not themselves tracking requests |
| Fonts and remaining media | Local vendor and personal assets | Served by the portfolio host; no active remote font stylesheet identified |
| External links | GitHub, LinkedIn, X, Unsplash and project demos | Separate websites reached when followed; not embedded social widgets |
| Hosting | Supplied Node HTTP server; deployment provider not chosen | Network requests reach the host; the Node code does not implement access logging or a visitor database. Provider logs remain unknown |

The user chose **Keep email-only contact** after this inventory. No contact form, delivery service or inbox was added.

## Implemented plan

1. Keep email contact. Honeypots, field validation, form rate limiting and Turnstile are not applicable without a submission endpoint. The supplied server now rejects POST and other unsupported methods with HTTP 405 instead of serving a normal page as if it accepted a submission.
2. Add `/thank-you`, excluded from sitemap.xml and marked noindex in HTML and the supplied server response. It explains email follow-up conditionally, without claiming a message was sent or received. Email links do not redirect to this page. It is not evidence of a successful submission.
3. Prepare GA4 behind explicit analytics consent worldwide, covering the EU, UK and Switzerland without a geolocation service. `G-XXXXXXXXXX` is a placeholder and is never used to load Google. Tracking remains off until a real ID is configured.
4. Add `/privacy`, included in the sitemap and linked from every public-page footer, plus the 404 and thank-you footer. The policy is visibly marked **Template — owner review required before launch**. It describes the inventory and the optional analytics integration; it does not invent a hosting provider or retention policy.

## Enable GA4 when ready

Create or choose a GA4 property that you own. Add a web data stream for the real public website URL. Copy its Measurement ID; it begins with `G-`. In the hosting build environment, set `GA_MEASUREMENT_ID` to that actual ID, and set `SITE_URL` to the actual HTTPS origin. Run `npm run build:production` and publish the generated output. The ID is public configuration, not a secret, but it must point to your property. No GA account, property or data stream was created or modified during this task.

Without an ID, the footer’s Cookie settings displays “Analytics is currently off”. With a real ID, new visitors see equal-priority Reject analytics and Accept analytics controls. Rejecting or ignoring the banner loads no Google tag. Accepting loads a single Google tag and sends the page view. The code uses basic consent behavior; it does not send denied-consent pings.

The consent choice is kept in localStorage as `sm-analytics-consent-v1` for up to 180 days. Withdrawing disables measurement, removes accessible `_ga` cookies on this site and reloads to unload the tag. It does not delete historical Google data. Blocked storage requires another explicit choice on the next page. Cross-tab rejection or clearing stored preferences also stops a loaded tag through a reload.

The analytics configuration disables Google signals and advertising-personalisation signals, leaves advertising consent denied, and requests 180-day GA cookies without rolling expiry. Page location omits query strings and fragments; the referrer is reduced to its origin. No form data is sent. Review data retention, data sharing and product links in the actual property. Keep Enhanced measurement off for this minimal page-view setup so unrelated automatic events are not added without a new policy review. The website cannot inspect or enforce settings in your Google account.

## Thank-you page as a future key event

**Do not enable this as a form-submission count for the current email-only site.** Anyone can visit `/thank-you`, and clicking an email link cannot confirm delivery. A page-view key event also counts refreshes and direct visits. Consent rejection and blockers reduce analytics counts.

If a real contact form is added later, first implement server-side validation, honeypot and rate limiting, agreed message delivery, and a redirect only after confirmed success. Add CAPTCHA only if the initial protections prove insufficient. Update this inventory and policy. Then use the following GA4 setup:

1. Open **Admin → Data display → Events → Create event**.
2. Name the event `generate_lead`, select **Create without code**, choose `page_view`, and set the URL to the exact public `/thank-you` URL. If the property shows condition fields instead, use `event_name equals page_view` and `page_location equals` that exact URL.
3. Enable **Mark as key event** and create the event. Do not mark all `page_view` events as key events.
4. Submit the actual form with analytics accepted. Check **Reports → Realtime**, including the event and key-event cards. Allow time for configuration and processing. For a stricter submission count, measure server-confirmed success rather than relying solely on page visits.

Google’s current instructions: [Set up a key event](https://support.google.com/analytics/answer/12966437) and [Mark events as key events](https://support.google.com/analytics/answer/13128484).

## Verification on 12 October 2026

`npm run build` passed. It includes source/asset checks, HTTP SEO checks and `scripts/verify-consent.mjs`.

- All 11 public pages have footer links to `/privacy` and the local consent script. Existing titles, descriptions, share tags, image alternatives and sitemap checks pass.
- `/thank-you` returns HTTP 200, has noindex in HTML and the supplied server header, and does not appear in sitemap.xml.
- POST requests to `/`, `/about` and `/api/contact` return HTTP 405 with `Allow: GET, HEAD`. No messages were accepted or sent.
- Isolated runtime checks cover initial no-consent state, rejection, acceptance, duplicate loading, withdrawal, expiry, invalid/placeholder IDs, blocked localStorage, cross-tab changes and sanitized page/referrer URLs. They sent no requests to Google.
- The in-app browser timed out opening `http://localhost:4175/privacy`. Live visual and browser-network checks remain unverified.
- GA4 Realtime remains unverified: no real Measurement ID, public domain or GA4 property access is available. No fake successful form submission or analytics receipt is claimed.

Before launch, review the policy, confirm hosting and email retention, supply the real domain and optional GA4 ID, then verify consent and Realtime in the deployed browser. Confirm static-host behavior if the supplied Node server is not used.

References used: [Google basic consent mode](https://developers.google.com/tag-platform/security/concepts/consent-mode), [Google tag API](https://developers.google.com/tag-platform/gtagjs/reference), [GA4 cookie usage](https://support.google.com/analytics/answer/11397207), [Google privacy policy](https://policies.google.com/privacy), [Unsplash privacy policy](https://unsplash.com/privacy).

Graphify queried existing vocabulary `profile enhance`: 35 nodes found, 9 displayed and 26 omitted by the budget. Direct source inspection supplies the current evidence. No full reindex was performed; existing graph source locations may be stale. Token usage is unavailable, not zero.
