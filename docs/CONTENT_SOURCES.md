# Portfolio content review — 2026-10-07

## Confirmed

- The user supplied `resume__full_.pdf` as the current CV and the LinkedIn URL
  `https://www.linkedin.com/in/jerry-peiyu-tseng-34274719b/`.
- The CV supports Ph.D. **candidate** in Informatics at Penn State, advised by
  Peng Liu; Research Assistant roles at Penn State (August 2023–present) and
  Academia Sinica (September 2021–June 2023); penetration testing at Chiayi County
  Government; and network administration at National Chung Cheng University.
- The CV supports CTI agents, regex and SOAR generation, state-aware evaluation,
  RL attack simulations, threat graphs, and multi-agent question generation.
- Current Pipeline1 and SOAR Playbook Graph project documentation supports the
  ongoing environment-building and workflow-evaluation research descriptions.
  Public descriptions omit internal operational details and run evidence.
  - Pipeline1: `17_P3_BACKEND_ADAPTER_PASSING_STANDARD_V1.md` and
    `17_P3_ACCEPTANCE_FIRST_SESSION_HANDOFF_ARCHITECTURE.md` support the action
    and state-dependency analysis, provider/seed separation, resettable runtime,
    real SOAR/connector execution path, and independent behavioral review.
    The current knowledge-retrieval experiment supports an ongoing investigation,
    not a claim of improved retrieval or fewer engineering retries.
    The user clarified the commercial motivation: the cost of VM-based service
    environments, the need to try LLM-generated playbooks away from production,
    and low-cost environments that can be quickly discarded and rebuilt.
    Public copy presents lower cost and faster rebuilds as design goals;
    no comparative cost or provisioning-time measurements were supplied.
    The disposable component is the generated external-service environment;
    the description retains real SOAR and connector execution and does not
    imply that the entire SOAR platform is replaced or that isolation is certified.
  - Current SOAR planning/RL direction: `minimal_information_50_brief_20260928.md`,
    `information_richness_protocol_v1.md`,
    `shared_dictionary_draft_report_20260927.md`, and
    `minimal_information_50_progress_20261006.md` support source-grounded task
    construction, four information axes, and situation/required/prohibited
    behavior evaluation. The task collection and vocabulary are in development.
    `training/README.md` distinguishes earlier SFT from RL; current public copy
    describes foundations for post-training, not completed RL training or gains.
- The old website supplies the portrait, email, Scholar ID, GitHub, and ORCID.
- Publication metadata was checked against primary sources:
  - [JoVE protocol article](https://www.jove.com/t/71144/a-structured-workflow-for-transforming-cyber-threat-intelligence-into).
    Title and authors were available in the official search result; the user
    explicitly confirmed on 2026-10-06 that it is formally published and asked
    for it to be included. Detailed issue/page metadata is omitted.
  - [AIED 2026 institutional record](https://pure.psu.edu/en/publications/why-machines-misread-pedagogical-quality-humanmachine-alignment-i/)
    and [preprint](https://arxiv.org/abs/2606.23629).
  - [IOCRegex-gen, 2026 preprint](https://arxiv.org/abs/2604.12228).
  - [IWSPA 2025, NIST record](https://www.nist.gov/publications/exploring-prompt-patterns-effective-vulnerability-repair-real-world-code-large-language).
  - [CTI-agent 2024 preprint](https://arxiv.org/abs/2407.13093).
  - [GAN paper](https://doi.org/10.1016/j.engappai.2022.105571), with author names,
    volume, and article number verified through Crossref. The final author's
    given name is **Edy**, correcting the shortened CV's spelling.

## Needs confirmation

- LinkedIn's full current contents were inaccessible. The supplied CV takes
  precedence over the earlier LinkedIn draft, which itself contains unresolved
  claims. The website uses the user's supplied current LinkedIn URL.
- The older draft flagged the CV's approximate 30% analyst-triage improvement as
  needing measurement confirmation. The new public copy omits that number.
- The lateral-movement paper is listed as submitted in the CV. It is described
  as research with an unverified subsequent publication decision, not as an
  accepted paper.

## Editorial decisions

- Audience: research collaboration and industry opportunities, as selected by
  the user. English site content preserves the existing site's language.
- No invented production deployment, leadership, impact, or training claims.
- Pipeline1 and current SOAR planning/RL work lead the featured research.
  Workflow generation remains a distinct project; earlier RL work on APT
  lateral movement remains labeled as research background.
- IOCRegex-gen's numerical results appear only with their evaluation context
  and a link to the paper, not as personal productivity or production metrics.
- The homepage now names the research field and describes two concrete questions:
  where to test generated workflows, and how models plan valid workflows.
  The abstract research sphere, research-loop controls, and repeated slogan strip
  were removed because they did not explain the work.
- The environment project is presented publicly as **AI-built test environments**.
  The first paragraph defines a security playbook; the page then explains the
  testing problem, agent-driven generation, service replacement, intended value,
  Jerry's contribution, and current research status, in that order.
- `Pipeline1` appears only inside optional technical detail, where it is explicitly
  defined as the internal name of the environment-generation workflow. Public
  copy uses "generated test environment" rather than "software mock".
- The comparison retains the workflow, existing security automation platform,
  and service connector while replacing the external service for testing. The
  agent reads connector code and documentation to generate service behavior and
  starting data. It does not replace the whole security platform.
- The earlier animated demo and simulated instance counter were removed. The
  comparison is now readable without controls or JavaScript, and the portable
  HTML includes the full research story rather than an isolated diagram. A later
  user request adds illustrated icons and an optional, captioned 12-second
  explanation of service access, agent generation, and redirection for testing.
  It changes no research claims and contains no simulated run results.
- The October 8 testing comparison uses a clearly labeled hypothetical wrong-IP
  example, not a measured experimental outcome. Its baseline is explicitly fixed
  action responses that ignore the target argument, not all conventional tests.
  The generated environment records the action's effects; independent requirements
  and assertions determine correctness. The site acknowledges that existing
  end-to-end tests can catch the same bug with suitable environments and checks.
  Relevant primary references checked during the discussion:
  - [Cortex XSOAR test playbooks](https://xsoar.pan.dev/docs/integrations/test-playbooks)
    support end-to-end command testing and result assertions.
  - [WireMock stateful behavior](https://wiremock.org/docs/stateful-behaviour/)
    supports stateful scenarios and reset; neither capability alone is presented
    as a unique research contribution.
  - [From Legacy to Standard](https://arxiv.org/html/2508.03342v1)
    evaluates transformation with syntax and similarity metrics. This supports
    distinguishing structural evaluation from execution, not a claim that all
    playbook research or all commercial tools use only static checks.
- The printable CV is generated from the same content as the website. The
  supplied PDF remains a source document rather than an automatically published
  download. Its phone number is not included in website content.
