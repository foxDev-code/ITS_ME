# Focused performance fixes — 13 October 2026

Scope: the owner's approved follow-up to the supplied PageSpeed report, preserving the portfolio design, artwork, personal identity and interactive animations. No analytics preferences, contact workflow or account settings change.

## Baseline

Report: https://pagespeed.web.dev/analysis/https-foxdev-portfolio-vercel-app/tg4s4ysg8k

The report captured October 13, 2026 at 11:15 PM IST shows mobile performance 65, desktop 81, Accessibility 98, Best Practices 100 and SEO 100. Mobile LCP is 6.3 seconds; desktop LCP is 2.6 seconds. CLS is zero on both. There is no real-user dataset. These are lab observations, not a field Core Web Vitals verdict.

## Implemented

- Native responsive assets now have real static filenames. The previous scale-down-to query URLs returned full-resolution files on Vercel even though the mirrored smaller files already existed. One shared transformation updates HTML and compiled client image props without a resizing service or new runtime dependency.
- The hero uses the existing origin-authored transparent PNG derivatives. PNG was smaller than tested WebP conversions for this line art. The 512px file is 27,911 bytes; the 1024px file is 80,698 bytes, versus 178,166 bytes for the full original. The original and its fallback remain intact.
- The leather texture has matching WebP variants at 512, 1024, 2048 and 3367 pixels wide. Its full-size transfer falls from 1,666,478 to 846,752 bytes; the 2048px derivative is 395,696 bytes. Existing texture dimensions, tiling, opacity and blend behavior are not changed.
- The homepage preloads the same responsive hero candidates used by its initial image markup. Sizes reflect the native breakpoint widths rather than an oversized cross-breakpoint maximum. The visible hero remains eager after hydration too, rather than reverting to Framer's computed scroll-based loading choice.
- The two credited Unsplash reference photos retain their existing sources and descriptions. Native srcset candidates at 320, 640 and 900 pixels, quality 75, let the browser request smaller versions for the collage and moodboard. The artwork viewer retains its original larger source.
- Location metadata, Greater Noida · IST +5:30, is a paragraph rather than an h3 that skips a heading level. Both HTML and client props change together to avoid a new hydration mismatch. Its visual styles remain attached.
- New decorative derivatives inherit empty alternative text. The leather texture was added to the reviewed decorative registry; no meaningful photo descriptions or credits were removed.

## Hero delay and preserved behavior

The mobile report flags a 1,750ms element-render delay. The native hero is a static image wrapper inside the existing notebook layout, not an independently delayed appear animation. Its compiled background overrides use calculated scroll/loading positions. The change addresses asset selection, early discovery and loading consistency; it does not claim those changes explain or eliminate every millisecond of the render delay.

The existing notebook scroll transforms, hover tilts, mask dragging/spring return, gallery links, modal focus behavior, consent gates and native FAQ are retained. No animation library was added, no Motion controller was removed, and no recoverable rendering error was suppressed. Runtime JavaScript/CSS removal was not attempted without a specific safe dependency trace.

## Verification

Production generation and the existing JavaScript/assets, SEO/HTTP, consent and expanded launch checks pass. New guards cover real derivative paths, PNG dimensions, generated asset byte counts, unknown scale fallback, matching hero preload/sizes, eager client backgrounds, server/client location semantics and responsive photo widths. Existing native-mask and motion guards remain active.

Authoring validates actual output dimensions, aspect ratios and meaningful alpha with the already installed Sharp runtime. Original photo and source artwork are preserved. The generated variants are checked in, so Vercel does not need Sharp or an image-generation service.

The owner selected visual verification after deployment. Therefore new visual results, hydration behavior, LCP, performance scores and Accessibility scores remain pending deployment/retest. The baseline is not represented as an after-change score. No 90+ score, full WCAG certification or complete visual-regression pass is claimed.

## Analysis coverage

Ponytail guided reuse of the existing optimizer and shared build transformation. Accessibility guided native paragraph semantics and preservation of image alternatives. Browser QA defines the pending rendered checks. Graphify reused the existing 7,820-node map with exact vocabulary image, optimize, build, enhance, hero: 146 candidates, 18 shown and 128 omitted at budget 900. The map predates the newest launch fixes; direct source traces and runnable tests are authoritative. No full graph rebuild was performed. Token usage is unavailable, not zero.

## After deployment

1. Confirm the live CSS/HTML/client module and derivative files match this build.
2. Load Home at mobile, tablet and desktop widths. Confirm selected hero/photo assets, heading order, no broken images or hydration warnings, and unchanged notebook/mask/gallery behavior.
3. Check artwork click, Escape dismissal and focus restoration; recheck the About notebook and Work navigation.
4. Run PageSpeed Mobile and Desktop again and compare metrics and failed audits, without treating normal lab-score variation as proof of a regression or guaranteed improvement.
