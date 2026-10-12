# Portrait and fox seal — September 29, 2026

Created with the built-in image generation tool, not the CLI. Original photograph remains unchanged at work/personalization/assets/satyarth-portrait.png.

Final assets:
- work/personalization/assets/satyarth-cutout.png
- work/personalization/assets/fox-seal.png

## Prompt specifications

Portrait: Background extraction from the supplied photograph. Remove only the room background and reflected hair fragment at the top. Preserve the man's identity, expression, glasses, hair, skin texture, pose, suit, shirt and tie. Natural hair edges, true transparent alpha, no frame, lettering, shadow, halo or extra graphics. Fit the result into a small dark portfolio Polaroid.

Seal: An original vertical vermilion ink seal, inspired by hand-carved rubber stamps rather than a replica. A tall rounded double-line border encloses a seated fox with pointed ears, curled tail, raised paw and a four-point spark. Warm coral-red #e35342, irregular outlines, worn print gaps and linocut texture. Approximate 1:2 proportions, legible at 80px wide, transparent negative space. No writing, Chinese characters, gradients, 3D, laptop or mockup.

## Integration and checks

Both original portrait mappings now use the cutout. The native photo layer is constrained to its window with a dark background and contain sizing, rather than protruding above the Polaroid. The signature is reduced to fit the paper border. The existing robot mask remains hidden so Satyarth's face is visible. The compact fox seal replaces the previous larger fox illustration beneath Side Quests; it is not an additional repeated decoration.

npm run build passes. Browser screenshots: outputs/portrait-cutout-polaroid.jpg and outputs/work-fox-seal.jpg. Visual verification covered the available narrow browser layout. No separate full responsive audit is claimed. The portrait is an AI-edited cutout; it is not claimed to preserve every source pixel.

Graphify's existing imagePairs/buildArt mapping and prior portrait analysis guided the source trace. Direct DOM inspection and browser screenshots verified the actual placement. No repository-wide reindex was necessary. Token usage is unavailable.
