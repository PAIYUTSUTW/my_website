# Portfolio design and project-page writing

Jerry's selected direction is a dark technology portfolio for research collaboration
and industry opportunities. The environment project has one central message:
**agents generate disposable service environments for testing security playbooks**.
Lower cost and easier repetition are goals, not reported benchmark results.

## Project-page references

Reviewed on October 8, 2026, in response to Jerry's request to learn from how other
projects explain their work:

- [E2B](https://e2b.dev/): a concrete headline and short introduction establish what
  the system provides and where it fits before listing capabilities. Applied here:
  name the output and intended use in the headline, with the value in the lead.
- [OSWorld project page](https://osworld-v1.xlang.ai/): defines the environment and
  illustrates its purpose before expanding into infrastructure, comparison, and
  results. Applied here: one primary environment diagram before implementation
  details. This is a writing reference; its measured results are not ours.
- [Sierra's tau-bench introduction](https://sierra.ai/blog/benchmarking-ai-agents):
  states the evaluation gap and contribution before explaining the setup and
  examples. Applied here: a short, explicit comparison of testing approaches,
  followed by the research contribution and its limits.

These are editorial observations, not technical equivalence or affiliation claims.
No template source, branding, figures, or product claims were copied.

## Reader journey

1. **What:** AI-built test environments for security playbooks. Define a playbook
   and state the purpose in the opening screen.
2. **How:** one diagram shows the unchanged playbook, SOAR platform, and connector;
   an agent generates the external-service environment used for testing.
3. **Why:** review, fixed responses, and real-service execution each cover part of
   testing. The remaining work is a controllable environment with suitable data.
4. **Contribution and status:** Jerry's agent workflow generates and reviews the
   environment. Cost and rebuild improvements remain unquantified research goals.
5. **Optional technical depth:** define the internal name Pipeline1, action/state
   analysis, seed and runtime separation, and behavioral acceptance boundaries.

The wrong-IP story and its second animation were removed. They had become a long
lesson about test assertions and distracted from environment generation. The page
now uses a compact testing-method comparison and explicitly recognizes existing
end-to-end tests. Generated environments expose effects; independent requirements
and assertions still establish whether a playbook did the right thing.

## Visual treatment and interaction

Retain one optional 12-second animation: normal service call → agent builds the
substitute environment → the same playbook calls it. The static diagram already
communicates the complete idea. Playback is manual, has pause/replay, stops when
hidden or offscreen, and respects reduced motion. The complete story works offline
and without JavaScript. The table becomes labeled rows on narrow screens.

The homepage still explains Jerry's research field and two current questions.
Project names remain descriptive; implementation detail stays on project pages.

Earlier visual references remain:

- [Void, Framer Marketplace](https://www.framer.com/marketplace/templates/void/): dark framing and strong typography.
- [Aceternity UI — Glowing Effect](https://ui.aceternity.com/components/glowing-effect): restrained light around boundaries.
- [Magic UI — Animated Beam](https://magicui.design/docs/components/animated-beam): motion along the actual service and generation paths.

Implementation is original Astro, CSS, and inline SVG. No animation framework,
remote dependency, simulated benchmark, or production result was introduced.
