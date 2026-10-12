# Portfolio audit — 30 September 2026

Verdict: DO NOT SHIP as a finished responsive portfolio until navigation and phone clipping are corrected. No implementation changes were made during this review.

## Confirmed findings

1. High: Work's AI Lab link advertises `/projects/nexus-ai-ops/`, but a normal click navigates to `/`. Reproduced twice. The homepage selected-work Nexus link correctly opens the case study. `src/personal/personal.js:70` changes anchor hrefs after render; this does not prove that the compiled Framer router's click destination changes. Trace the router destination rather than repeating the DOM href patch.
2. High: Work at a requested 375px viewport (reported innerWidth 376px) clips the Agri Sarthi title, project card and detail controls after both resize and fresh reload. `scrollWidth > innerWidth` is false, so that check alone misses clipped content. Evidence: `outputs/audit-work-phone.png`. The phone intro also asks visitors to use a bigger screen. Tablet 768px and desktop 1440px views were inspected; they do not establish every section passes.
3. Medium: Homepage load produced six React #418 hydration warnings and one #422 warning. Root cause not conclusively isolated. The build-time replacement and runtime DOM enhancement flow deserves investigation. Work initially showed Metro copy under AI Lab; later settled to correct PDF/retrieval copy. Treat this as transient rendering evidence, not permanently incorrect content.
4. Medium: Connect opens social links with a mouse, but its text and five inspected ancestors have no button role or tabindex. The trigger needs native keyboard semantics, focus and expanded-state handling.
5. Medium: Homepage has no h1. Add a meaningful main heading without changing the visual composition.

## Passed checks

- Existing npm build/verification passed: 35 modules, 1117 local references, seven project pages, resume and GitHub CTA.
- No horizontal document overflow at inspected desktop homepage width 1280px; no completed broken image elements at that snapshot. Lazy/offscreen images are not comprehensively covered.
- Gallery opened via Enter; Escape closed it and focus returned to the original artwork link.
- Homepage Nexus link opened the correct case study, with a meaningful h1, contribution, source links and scope disclosures.
- Connect mouse activation revealed the supplied LinkedIn, X and GitHub destinations.

## Design judgment

Desktop aesthetics approximately 8/10; overall experience approximately 7/10 because phone clipping and navigation failures materially reduce usability. These are subjective ratings, not performance metrics.

Keep the paper, ink, notebook and portrait direction. Improve text readability and spacing before adding decoration. Make mobile a deliberate stacked composition. Add at most one signature interactive demonstration and a restrained card-to-case transition, with keyboard/touch support and reduced-motion alternatives. Avoid adding cursor trails, forced loaders and continuous motion to every section. Distinctive personal work will improve identity more than additional reference-site motifs.

## Coverage and limitations

Used Ponytail flow tracing, the existing Graphify map and browser QA. Graphify query `enhance profile projects` returned 35 matching nodes, with 14 displayed and 21 omitted by budget. Source reads corroborated runtime href replacement. No full graph reindex; existing map has known health warnings and stale line positions. Inventory is not semantic verification. Token usage is unavailable, not zero.

This is a scoped audit, not certification that every component works. Not completed: exhaustive external link checks, all routes at all breakpoints, Safari/Firefox and physical-device testing, automated accessibility scan, measured contrast, Core Web Vitals, full reduced-motion testing and pixel-regression baseline comparison. Existing custom CSS includes reduced-motion rules, but that does not prove all inherited Framer motion respects the preference.

Reference guidance consulted: https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API and https://web.dev/articles/prefers-reduced-motion.
