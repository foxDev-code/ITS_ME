# Polaroid interaction restoration

Compared https://jackiezhang.co.za/ with the local portfolio on September 29, 2026. The reference uses two independent Motion drags: the outer Polaroid retains its dragged position without momentum; the Fundam mask returns to its origin with an inertia transition (bounce damping 30, stiffness 400). The outer card also has a hover transform and in-view transition from y=-159, rotation=7 to y=0, rotation=0. Its existing spring parameters are retained.

Source: the Photo of me component and its caller in the localized n3aQpPOIiQ-Bry_zZoNC9Hg-cxP44K3mHfgGkcALR5o.BR2SGY8g.mjs module. Prior graph analysis identified the native compiled Framer layout and imagePairs flow; direct source inspection established these interaction settings.

Removed the personalization CSS that hid the mask, raised the About section over the collage, and replaced the original photo-layer geometry. Kept Satyarth's transparent cutout, signature, and contain sizing. No additional animation library or duplicate controller was added.

Verification: npm run build passes. Browser comparison tested dragging the reference and local card, then dragging and releasing their masks. Both masks returned to transform:none. Local hover tilt and retained card displacement were visually observed. The source regression check protects native mask return, hover and in-view configuration. Full scroll timelines and reduced-motion behavior were not independently audited. Proof: outputs/polaroid-motion-restored.jpg.

This supersedes the earlier decision to hide the mask and raise the card. Token usage for graph-assisted analysis is unavailable; no full graph rebuild was performed.
