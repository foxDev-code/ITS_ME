# Portrait and recent GitHub review

The supplied portrait replaces both original portrait asset mappings in scripts/build-personal.mjs. The existing Polaroid and signature remain. The Fundam robot mask is hidden only inside the portrait frame. The About section is brought above the overlapping collage so the face remains visible. The original photograph is copied unchanged; cropping uses CSS. Build checks pass, including portrait mapping and byte preservation. Browser proof: outputs/portrait-polaroid.jpg. The browser remained narrow despite viewport override requests, so separate desktop/phone breakpoint coverage is not claimed.

## Public repository review

Read the public repository list and the three READMEs on September 28, 2026. This was a documentation review, not execution or an independent code audit. No new projects have been inserted into the portfolio yet.

- https://github.com/foxDev-code/Coffee-Design_2 — React 19, GSAP 3, esbuild and Node.js according to the README. A Blue Tokai-inspired coffee website with seven scroll stages, product browsing and a local cart. Recommended as a design/interaction study, not commissioned brand work. The README image is named blue-tokai-reference.jpg; do not treat that reference image as proof of the implemented site.
- https://github.com/foxDev-code/Coffee-Design_1 — Brewns recreation using React, GSAP and Three.js. README explicitly calls it a recording-based recreation, with local order demonstrations and no payment/backend. Suitable for Side Quests with its recreation status visible.
- https://github.com/foxDev-code/Enterprise-Data-Platform — README describes a 14-module data/AI reference architecture with FastAPI, Streamlit, an executive interface, streaming, ML and agent features. Candidate for a technical case study after checking code and running tests. Do not repeat the README's Fortune 500 / Staff-level language as independently verified quality. Demo credentials are documented; production security was not verified. node_modules is committed in the visible root listing.

Recommended curation: show one coffee study prominently and the enterprise project as engineering depth after verification. Avoid adding both coffee projects as repetitive homepage features. No public deployed demo was listed in the About sections reviewed.

## Analysis limits

Graphify query vocabulary: image, pairs, asset, build, art. The existing graph identified imagePairs at scripts/build-personal.mjs:L40 and buildArt at scripts/personal-art.mjs:L20. Its broad traversal was truncated; direct source and browser DOM inspection established the actual portrait flow and overlay. No full graph rebuild was performed. Token usage for this analysis is unavailable, not zero.
