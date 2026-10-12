# Share previews and image accessibility

Updated 12 October 2026. The full proposed image list was shown before website changes in IMAGE-ALT-PLAN.md. The source of truth for image alternatives is image-alts.json.

All 11 public pages, the noindex thank-you page and the custom 404 contain Open Graph title, description, type, URL and image tags, plus image type, width, height and alternative text. Twitter cards use summary_large_image with a title, description, image and image alternative. Tags are in the initial HTML, so a crawler does not need JavaScript. The three interactive main pages also restore the tags and reviewed image alternatives after inherited React components update.

## Replace the default share image

Replace this source file with a PNG at exactly **1200 × 630 pixels**:

`work/personalization/assets/share-default-placeholder.png`

Then run `npm run build`. The deployed copy is `/personal/assets/share-default-placeholder.png`. Its current design is the cream portfolio identity card with Satyarth Mishra’s name and vermilion chip drawing. The descriptive image alternative is defined in scripts/seo.mjs; update it if the image content changes. Do not edit only the generated output because the next build replaces it.

Agri Sarthi and Suraksha One use these project-specific source cards, also 1200 × 630 PNG:

- `work/personalization/assets/share-agri-sarthi.png`
- `work/personalization/assets/share-suraksha-one.png`

Other public pages share the default image but retain distinct page titles, descriptions and URLs. Normal builds copy these source PNG files. The optional scripts/render-share-cards.mjs rasterizes the code-authored layouts using an already-installed sharp package; running that maintenance script overwrites the three source cards. It is not required for normal builds.

## Verified locally

`npm run build` passed on 12 October 2026:

- Complete, nonduplicate share tags on 11 public pages, the thank-you page and the custom 404.
- Three share assets returned HTTP 200 with image/png content type and valid PNG dimensions of 1200 × 630. Each is under 5 MB.
- All 1,011 image instances in public-page HTML matched the reviewed alternatives. Decorative instances have explicit empty alt attributes.
- Runtime checks covered all 96 reviewed image sources and a source change, including the gallery and project-preview additions.
- The previous checks still pass: 111 internal link requests, sitemap, robots.txt, unique page titles and descriptions, real 404 GET/HEAD responses and legacy redirects.

This is source and HTTP verification. The in-app browser timed out opening the local server; visual inspection of the live hydrated pages remains unverified. The share PNG files themselves were visually inspected. This is not a complete accessibility certification.

## After deployment

There is no public website URL yet. Local builds use http://localhost:4173 for preview only. Set SITE_URL to the actual public HTTPS origin and run `npm run build:production` before publishing. No domain was invented or purchased.

WhatsApp and LinkedIn cannot fetch the local preview, so their actual preview cards have not been tested. Once deployed, paste the public link into an unsent message draft and check its title and image, then clear the draft. Do not send it. Repeat for a project URL. Confirm the image URL is publicly accessible without login.

Apps cache preview data. LinkedIn’s Post Inspector can request a refresh: https://www.linkedin.com/post-inspector/. After changing an image, a new filename is a reliable way to identify a new asset; update its entry in scripts/seo.mjs and rebuild. A refreshed page still depends on each app’s cache behavior. Do not claim a cached card has updated until the app visibly shows it.

Metadata reference: https://ogp.me/ (including the image alternative, dimensions and MIME-type properties).
