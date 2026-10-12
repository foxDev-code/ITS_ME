# Value-card overlap: diagnosis and repair

## User-reported defect

Three principle cards showed red icons underneath black type. When the animation stacked the cards, all three text layers and icons were visible at once. The result was illegible on the dark page background.

## Verified root cause

`scripts/personal-art.mjs` mapped three structural, opaque paper-background PNGs to transparent `belief-0.svg`, `belief-1.svg` and `belief-2.svg` illustrations. `scripts/build-personal.mjs` consumed those mappings and rewrote both the initial HTML and compiled Framer modules. The original Framer card stacking and text placement still ran, but the paper that masked the lower text layers was gone.

Affected assets:

- `rhT0iPheLHJdGQAZ04lGqNb0I.png`: lined paper
- `m0nSd9OmKrRp1nvRHVH89tLs0mg.png`: clipped note paper
- `0aKOwaR29QHg04I7MHlsi9j1g4.png`: torn graph paper

## Repair — Ponytail approach

Removed the three replacement mappings and their unused generation loop. Preserved the original paper assets, animation and personalized text. No new component, animation library or positioning workaround was added.

Added one regression check to `scripts/verify-personal.mjs`: the generated homepage must retain all three paper assets, and generated HTML/JavaScript must not reference the transparent belief SVGs. `npm run build` runs this check.

## Verification and limits

- The build and regression check passed after the repair.
- Browser inspection confirmed opaque paper in the stacked state, with the top card readable instead of all three text layers showing through.
- Earlier file-existence and syntax checks did not test visual layering. Their passing results were not proof of visual correctness.
- Retained decorative transitions intentionally move and overlap the physical paper cards. The repair restores occlusion; it does not remove that interaction.

## Graphify status

The existing system Graphify installation could not launch. Installed Graphify 0.9.65 in `.graphify-venv` without changing the system installation. The full-project detection found 890 files and approximately 5,177,754 words: 191 code, 39 documents, 1 PDF, 647 images and 12 audio/video files. Nothing was flagged as sensitive by detection.

The user explicitly chose all folders after the size warning. Saved `graphify-out/graph.json`, `graphify-out/graph.html` and `graphify-out/GRAPH_REPORT.md`: 7,820 nodes, 26,557 edges and 800 communities. The HTML uses Graphify's grouped community view because the graph exceeds 5,000 nodes.

Coverage: AST processed 191 code files; two semantic agents analyzed all 39 detected documents plus this repair note. All 890 detected files are inventoried. Images and the PDF are not claimed as comprehensively semantically analyzed. Video transcription was attempted for 12 files but could not run without faster-whisper. See `graphify-out/coverage.json` for exact scope. Agent token counts were unavailable, not zero.

Integrity warning: raw AST diagnostics reported 554 dangling-endpoint edges, 197 self-loops and 1,189 undirected same-endpoint edge collapses, largely in compiled vendor code. Retained raw extraction and `GRAPH_HEALTH.txt`; the graph is a navigation aid, not a verified complete call graph.

Saved the root cause and correction in Graphify's `memory/` folder. Screenshot evidence: `outputs/value-cards-fixed-expanded.png` and `outputs/value-cards-fixed-stacked.png`. The expanded and stacked desktop states were visually checked on 2026-09-26; no browser console errors appeared in that check.
