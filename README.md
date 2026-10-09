# Pei-Yu (Jerry) Tseng — Research Portfolio

An Astro portfolio for research in LLM agents, security automation, and agent
behavior evaluation. The modern site lives in **`site/`** and targets
<https://paiyutsutw.github.io/my_website/>.

## Develop and preview

Use Node.js 24 (minimum 22.12):

```bash
cd site
npm ci
npm run dev
```

Open <http://localhost:4321/my_website/>. To preview production output:

```bash
npm run check
npm run build
npm run preview
```

## Edit content

- `site/src/data/profile.ts`: biography, experience, education, research projects,
  publication metadata, and profile links.
- `site/src/pages/`: homepage, research index, publication list, printable CV,
  and generated project pages.
- `site/src/styles/global.css`: colors, typography, responsive and print styles.
- `site/src/styles/tech.css`: dark technology theme, typography, and restrained light accents.
- `site/src/components/ResearchFocus.astro`: the two current research questions on the homepage.
- `site/src/components/ResearchSpotlight.astro`: the two prominent current-project
  cards at the top of the Research index, above the other five projects.
- `site/src/components/PlaybookLearningRoadmap.astro`: current benchmark development
  and planned small-model training and held-out evaluation.
- `site/src/components/TestEnvironmentStudy.astro`: complete research story, from
  the problem and approach to contribution, status, and optional technical detail.
- `site/src/components/ServiceComparison.astro`: illustrated service-replacement
  diagram and optional 12-second narrated animation.
- `site/src/components/ResearchIcon.astro`: local SVG illustrations for the workflow,
  service, environment, documents, and agent.
- `site/public/pipeline1-concept.svg`: downloadable, standalone concept diagram.
- `site/src/assets/profile.png`: portrait, optimized to WebP at build time.
- `docs/CONTENT_SOURCES.md`: sources, factual qualifications, and outstanding
  publication metadata to confirm.
- `docs/DESIGN_REFERENCES.md`: visual references and reader-first information architecture.

Publication venues and statuses are explicit. Ongoing projects are described as
research rather than production deployments. The CV page has a **Print / Save
PDF** button and shares its content with the rest of the site.

To export an offline, self-contained research story after building:

```bash
cd site
node scripts/export-pipeline-demo.mjs
```

Open `.preview/Test-environments.html` from the repository root in a browser.
It includes the full problem, method, comparison, research status, fonts, and
downloadable SVG. The static story needs no server, network, or JavaScript. The optional
explanation animation and theme control use embedded scripts, so they also work
offline. Reduced-motion preferences retain the complete static diagram. An optional first argument selects the output path.

## Validate

```bash
cd site
npx playwright install --with-deps chromium
npm run check
npm run build
npm test
```

Browser checks exercise desktop/mobile layouts, asset loading, research filters,
theme persistence, the conceptual visualization, navigation, legacy redirects,
and reading without JavaScript. Motion is disabled for reduced-motion users;
fonts are hosted locally, and there are no tracking scripts or third-party APIs.

## Publish on GitHub Pages

1. Set repository **Settings → Pages → Source** to **GitHub Actions**.
2. Merge the reviewed website branch into `master`.
3. The `Build and publish portfolio` workflow checks and builds the website,
   runs the browser checks, and deploys `site/dist/` to GitHub Pages.

Pull requests run checks and do **not** deploy. No hosting subscription is needed
for this public repository. `site/astro.config.mjs` preserves the `/my_website`
base path and maps the old primary publication and portfolio URLs to their new
locations. If changing the domain or base path, update the Astro configuration,
`src/data/profile.ts`, the sitemap, robots.txt, and the legacy `about.html` redirect.

The old Jekyll source remains in the repository for historical reference and
rollback, but is not included in the Astro build. The original template README
is preserved at [docs/LEGACY_JEKYLL_README.md](docs/LEGACY_JEKYLL_README.md).
