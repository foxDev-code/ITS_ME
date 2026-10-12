# Local portfolio reproduction

A localized snapshot of the public production website at https://jackiezhang.co.za/, inspected on 20–21 September 2026, including its public HTML, compiled components, styling, fonts, illustrations, photographs and animation runtime.

## Run

Install Node.js 20 or newer, open a terminal in this folder, and run:

```sh
npm start
```

Open http://localhost:4173/. No npm install is needed; the server has no package dependencies. To use another port, run `node serve.mjs 4174`.

Do not open index.html directly using file://. The site requires HTTP for module imports and routing. Use the included server because it also serves the original responsive image variants selected by query strings. The server only listens on this computer (127.0.0.1); it does not publish the site.

## Included

- Home, Work and About.
- Heygo Creator, Pulse Event, Balwin Fibre and Resqued case-study pages.
- 556 downloaded public assets plus 129 responsive image variants.
- Original client-side animations, hover variants, illustrations, project selectors, contact-card states, typography and responsive breakpoints.
- Original external destinations, including social profiles and the original owner's email link. External sites still require internet access.

See `AUDIT.md` for verified behaviors and limitations, `source-inventory.json` for published HTML component names, font declarations, colors and links, and `asset-manifest.json` for the source-to-local asset mapping. The inventory describes public generated output, not private authoring-layer names.

## Important distinction

This is the site's publicly served **compiled production output**, localized for fidelity. It is not the owner's private Framer project, an editable Figma file, or a newly authored clean React component library. Generated component modules are under `vendor/framerusercontent.com/sites/`. The original authoring source is not publicly available from browser inspection.

The owner's identity, project work, photos, original copy, outbound destinations and fonts have been retained as requested. This does not grant rights to publish them as your own. Obtain appropriate permission and font/content licenses before public reuse. Nothing has been deployed or published.

## Local adaptations

Public asset hosts and internal routes are localized. Framer's remote editor toolbar and analytics loader are disabled. Older literal `new URL()` image references are resolved locally. The smooth-scroll component's animation-frame cleanup is guarded on unmount. Visuals and interaction definitions are otherwise retained from the public snapshot.

The surrounding development workspace also contains the retrieval/build scripts and an earlier hand-built approximation. That approximation is not used by this package or the current preview.
