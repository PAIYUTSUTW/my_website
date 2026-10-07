# Design references

The October 2026 visual update follows Jerry's preference for dark surfaces, large typography, light, and flowing animation. The Pipeline1 explanation keeps both service paths visible: the same playbook and real connector can call an agent-generated, disposable software mock in place of a real service.

Visual references:

- [Void, Framer Marketplace](https://www.framer.com/marketplace/templates/void/): dark portfolio framing, strong typography, and small technical labels.
- [Magic UI — Animated Beam](https://magicui.design/docs/components/animated-beam): light traveling along connections to explain relationships between systems.
- [Aceternity UI — Glowing Effect](https://ui.aceternity.com/components/glowing-effect): restrained light around card edges.

These are visual references, not installed templates. All layouts, animation code, and graphics in this update are implemented locally with Astro, CSS, SVG, and canvas. No template source, paid assets, React dependency, or remote animation service is included.

## Interaction and fallback

- The homepage research sphere and its orbit lights have a pause control.
- Pipeline1 uses measured SVG paths to connect service nodes and the generation agent to the actual mock node, including on mobile.
- Light effects can pause independently from the three-step explanatory sequence. The replacement sequence runs only when requested.
- Animation pauses outside the viewport and when the document is hidden. Reduced-motion preferences retain the comparison and mock-rebuild controls without continuous animation.
- Both service paths and the agent explanation remain readable without JavaScript.
- The standalone HTML export embeds the built CSS, fonts, component script, and downloadable SVG for offline viewing.
