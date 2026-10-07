# Design references and information architecture

The portfolio keeps Jerry's selected dark technology palette, large type, and
restrained light accents. The October 7 refactor prioritizes a new reader's
understanding of the research.

## Reader journey

- Homepage: who Jerry is, his research field, and the two current research questions.
- Environment project: why testing needs an environment → how an agent builds it →
  which service dependency changes → intended value → contribution and research status.
- Technical detail: a native expandable section defines the internal project name
  and retains implementation details for readers who want them.

Project titles describe the work directly. "AI-built test environments" is the
public description of the environment-generation research. The comparison uses
"generated test environment" and explains its purpose before displaying the flow.

The rotating sphere, abstract research-loop labels, ornamental moving beams,
before/after switches, playback controls, and simulated rebuild counter were
removed. Their scripts and unused styles were also removed. The comparison keeps
both paths visible and requires no interaction or JavaScript. The offline export
includes the complete story, not just the figure.

## Visual references

- [Void, Framer Marketplace](https://www.framer.com/marketplace/templates/void/): dark portfolio framing and strong typography.
- [Aceternity UI — Glowing Effect](https://ui.aceternity.com/components/glowing-effect): restrained light around card edges.
- [Magic UI — Animated Beam](https://magicui.design/docs/components/animated-beam): a reference for the previous animated version; those beams were removed in this refactor.

These were visual references, not installed templates. Layouts and graphics are
original Astro, CSS, and SVG. No template source, paid assets, animation framework,
or remote service is included.
