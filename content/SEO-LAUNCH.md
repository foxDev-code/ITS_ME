# Search preparation and launch

The current build uses http://localhost:4173 for local sitemap and canonical tests. It is not ready to submit to Google until a public origin is configured. No domain has been purchased or assumed.

Set SITE_URL to the actual HTTPS origin in the hosting build environment, then run `npm run build:production`. That command rejects a missing URL, localhost and example.com. Publish `outputs/satyarth-portfolio`. Do not deploy the unconfigured local output. Rebuild after adding, changing or removing public pages: the build regenerates metadata, robots.txt and sitemap.xml from the main-page registry in scripts/seo.mjs and content/projects.json. Add new non-project pages to that registry.

Use `npm run test:seo` for repeatable local HTTP checks. It starts and stops its own server on an available port. It checks public page metadata, incoming links, internal anchor destinations, sitemap membership, robots directives, real 404 responses and legacy redirects. It does not certify external services or all JavaScript interactions.

The supplied Node server returns the styled 404 HTML with HTTP 404, including nested unknown routes. It does not rewrite unknown URLs to the homepage. Static hosting must be configured to serve 404.html with status 404; do not add an SPA catch-all returning 200. Hosting has not been chosen, so verify a made-up URL again after deployment. Four legacy project paths redirect on the Node server and have fallback redirect HTML on static hosts; they are excluded from the sitemap.

Existing review pages are marked noindex and excluded from the sitemap. The 404 page is noindex. Public pages are crawlable; robots.txt contains Allow: / and the sitemap URL. The sitemap and robots files alone do not guarantee indexing or ranking. After launch, verify the real site in Google Search Console and submit its sitemap.

Scope: this work preserves the visual design. The previously reported mobile clipping, Connect keyboard semantics and React hydration issues are separate remaining launch risks, not silently fixed by metadata changes.

## Verification — 12 October 2026

`npm run build` passed: 35 modules, 1159 local references, seven project stories and the SEO checks. The HTTP checker passed 10 public pages and 82 internal link requests with no orphan public pages. Three made-up/direct error URLs returned HTTP 404 for GET and HEAD; the legacy route returned 301. Sitemap and robots.txt returned 200. Routing-handler regression checks passed for an ordinary project click, Ctrl-click and an external link. This is not a full browser interaction test.

The in-app browser could not reach the long-running localhost preview (connection timed out on ports 4173 and 4174). Visual verification of the new 404 and live router click behavior remain unverified. The separate ephemeral HTTP server used by the automated tests was reachable and its tests passed. No deployed host has been tested.

Graphify was consulted with existing vocabulary `profile projects enhance`: 35 nodes found, 10 shown and 25 omitted by the query budget. Direct source inspection supplied the implementation evidence. Existing graph health limitations remain; no full reindex was performed. Token usage is unavailable, not zero.

Google references: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap and https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors.
# Share previews

See `SHARE-PREVIEWS.md` for verified share metadata, default-image replacement instructions, image alternatives and the pending public-platform check.

