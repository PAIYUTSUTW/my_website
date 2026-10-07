# Portfolio content review — 2026-10-06

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
- The interactive research loop is explicitly conceptual, not a live system.
- Following the user's clarification, the Pipeline1 visual centers on service
  replacement: the same playbook/SOAR/connector calls a real service before,
  and an agent-generated software-defined mock for testing after. Connector
  source and documentation feed Pipeline1's agent, which generates the mock.
  Both paths remain visible without interaction. Animation and mock instance
  rebuilding are conceptual, not live executions or measured performance.
  The visual no longer uses a playbook success/failure scenario as its main story.
- The printable CV is generated from the same content as the website. The
  supplied PDF remains a source document rather than an automatically published
  download. Its phone number is not included in website content.
