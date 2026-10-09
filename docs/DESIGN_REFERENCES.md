# Design references and information architecture

The portfolio keeps Jerry's selected dark technology palette, large type, and
restrained light accents. The October 7 refactor prioritizes a new reader's
understanding of the research.

## Reader journey

- Homepage: who Jerry is, his research field, and the two current research questions.
- Environment project: why a test can miss incorrect behavior → a concrete comparison → how an agent builds the environment →
  which service dependency changes → intended value → contribution and research status.
- Technical detail: a native expandable section defines the internal project name
  and retains implementation details for readers who want them.

Project titles describe the work directly. "AI-built test environments" is the
public description of the environment-generation research. The comparison uses
"generated test environment" and explains its purpose before displaying the flow.

The abstract research sphere, decorative loops, before/after switches, and
simulated rebuild counter remain removed. At Jerry's request, the service
comparison now has a single optional explanation animation:

1. The existing workflow calls a real service.
2. An agent reads connector code and documentation and builds a test environment.
3. The same workflow calls the generated environment for testing.

The diagram shows one unchanged workflow, two service destinations, and a separate
agent-generation path. Local SVG icons distinguish the workflow, server, generated
environment, source documents, and agent. Captions explain each phase. Playback
starts only on request, runs once in 12 seconds, and supports pause and replay.
It pauses when hidden or offscreen. Reduced-motion mode keeps a readable static
illustration. No simulated run metrics or success outcomes are shown.

An October 8 addition places a separate **illustrative playbook test** before the
environment-generation diagram. The requirement is to block malicious IP A and
leave allowlisted IP B alone; the same buggy workflow blocks B in both lanes.
Fixed responses report the expected outcome, while an action-dependent environment
records B's changed state. Independent requirement checks then expose the mismatch.
Matching A/B rows keep the comparison readable on desktop and mobile. An optional
12-second animation follows goal, execution, and checking; direct step buttons also
work with reduced motion. The default and no-JavaScript view show the complete
comparison. This is an authored example, not evidence from a research run or a claim
that every existing testing tool misses the bug. Existing end-to-end tests can
detect it with suitable environments and checks. Environment generation remains
distinct from defining the requirements and deciding playbook correctness.

The whole diagram remains readable without JavaScript. Its layout adapts on
mobile, and the offline export embeds each explanation script exactly once.
The full research story remains available above and below the visual.

## Visual references

- [Void, Framer Marketplace](https://www.framer.com/marketplace/templates/void/): dark portfolio framing and strong typography.
- [Aceternity UI — Glowing Effect](https://ui.aceternity.com/components/glowing-effect): restrained light around card edges.
- [Magic UI — Animated Beam](https://magicui.design/docs/components/animated-beam): a visual reference for light traveling along the actual service and generation paths.

These were visual references, not installed templates. Layouts and graphics are
original Astro, CSS, and SVG. No template source, paid assets, animation framework,
or remote service is included.
