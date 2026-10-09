export const base = '/my_website';
export const path = (route = '/') => `${base}${route}`;

export const profile = {
  name: 'Pei-Yu Tseng',
  preferredName: 'Jerry',
  title: 'Ph.D. candidate · Penn State',
  email: 'jerry950909@gmail.com',
  location: 'State College, Pennsylvania',
  description: 'Pei-Yu (Jerry) Tseng researches LLM agents, security automation, and the evaluation of agent behavior at Penn State.',
  about: 'I’m a Ph.D. candidate in Informatics at Penn State, advised by Professor Peng Liu. I research LLM-based agents for security operations: how they turn knowledge into action, work with existing tools, and demonstrate that their actions achieve the intended outcome.',
  links: [
    { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=GwHvncIAAAAJ' },
    { label: 'GitHub', url: 'https://github.com/PAIYUTSUTW' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/jerry-peiyu-tseng-34274719b/' },
    { label: 'ORCID', url: 'https://orcid.org/0000-0001-9675-674X' },
  ],
};

export const projects = [
  {
    slug: 'stateful-evaluation', number: '01', featured: true, kind: 'Current research', category: 'Agents & evaluation',
    title: 'AI-built test environments', subtitle: 'Disposable test environments for security automation',
    description: 'Agents that build test versions of external services, so AI-generated security workflows can be tried without connecting to the real service.',
    tags: ['Environment generation', 'Security automation'], visual: 'environment',
    question: 'Where can teams test an AI-generated security workflow before it reaches real systems?',
    body: [
      'A security playbook is an automated workflow that queries services and takes actions such as disabling an account. AI can generate these workflows, but trying them against real systems can change real accounts and data. Setting up separate services in virtual machines adds provisioning and maintenance work.',
      'I am developing agents that read service connector code and documentation, then generate disposable test environments. These environments simulate service responses and data changes while the workflow continues to use the existing security automation platform and connector.',
      'The aim is to make testing less expensive to set up and easier to repeat. Lower cost and faster environment creation remain research goals, not benchmarked results.',
    ],
    approach: ['Read the connector code and documentation to identify required service behavior.', 'Generate a service implementation and starting data that can be reset.', 'Review action results and subsequent state changes through the existing connector.'],
    related: [],
  },
  {
    slug: 'soar-planning', number: '02', featured: true, kind: 'Current research', category: 'Agents & evaluation',
    title: 'Small models for security playbooks', subtitle: 'Benchmarks and reinforcement learning for playbook generation',
    description: 'Building a benchmark for security playbook generation, with the goal of training small language models to write workflows that meet task requirements and policies.',
    tags: ['Benchmark development', 'Small language models', 'Reinforcement learning'], visual: 'benchmark',
    question: 'What does it mean for a model to write a correct playbook?',
    body: [
      'A security playbook is an automated response workflow: it gathers information, makes decisions, and takes actions. The benchmark asks a model to generate that workflow from a short security objective and case facts, using available documentation to find the procedures, tools, and policies it needs.',
      'I am constructing scenarios grounded in existing security playbooks and documentation, together with criteria for judging generated workflows. Each answer specifies the situation, what must happen, and what must not happen. Different workflows can be correct; copying one reference graph is not the goal.',
      'For example, if approval is required before blocking an address, including both actions is not enough. Blocking must depend on approval and remain unreachable when approval is denied. The evaluator must detect missing work, incorrect branches, and bypassed prerequisites—not just valid output formatting.',
      'The current phase is benchmark and evaluator development: reviewing source evidence, checking that tasks are answerable, and finding scoring gaps that let incorrect workflows pass. Evaluation currently covers platform-neutral playbook outlines; running a complete playbook against real service integrations is a separate step. Small-model generation training, including reinforcement learning, is the next research objective.',
    ],
    approach: ['Build source-grounded tasks and behavioral scoring for playbook generation.', 'Compare model baselines and train small models using separate training data.', 'Evaluate generalization on held-out scenario families.'],
    related: [],
  },
  {
    slug: 'workflow-generation', number: '03', featured: false, kind: 'Current research', category: 'Agents & evaluation',
    title: 'Generating security playbooks', subtitle: 'LLM-based security workflow generation',
    description: 'Turning high-level security objectives into SOAR workflows, with retrieval, execution feedback, and behavioral review.',
    tags: ['LLM agents', 'RAG', 'Workflow generation'], visual: 'workflow',
    question: 'Can an agent preserve the intent behind a security workflow?',
    body: [
      'Security automation starts with an objective, but implementation requires a sequence of tool calls, conditions, and dependencies. Generating plausible code is only part of the problem.',
      'I work on LLM-based systems for generating SOAR playbooks from high-level objectives. The work uses retrieval and contextual evidence to support generation, together with testing and iterative refinement.',
      'This systems work connects the generation process with existing security tools and feedback from testing. It complements my research on generated test environments and on benchmarks and small-model training for playbook generation.',
    ],
    approach: ['Ground generation in relevant workflow and tool context.', 'Make dependencies and response requirements explicit.', 'Use test feedback to inspect and refine generated behavior.'],
    related: [],
  },
  {
    slug: 'threat-intelligence', number: '04', featured: true, kind: 'Research · 2024–2026', category: 'Security & intelligence',
    title: 'Turning threat reports into detections', subtitle: 'LLM agents for CTI operationalization',
    description: 'Connecting unstructured threat reports with log evidence and validated detection patterns.',
    tags: ['Threat intelligence', 'LLMs', 'Detection engineering'], visual: 'regex',
    question: 'How can threat intelligence become something a security team can use?',
    body: [
      'Threat reports contain useful evidence, but analysts must translate that evidence into searches and detection logic. My work explores LLM agents that extract indicators from reports and correlate them with enterprise logs.',
      'In IOCRegex-gen, our research turns indicators into regular expressions using group-aware generation, iterative reasoning, and multiple validation stages. The aim is to capture meaningful variations without treating every indicator as an exact string.',
      'The 2026 preprint reports evaluation on more than 3,000 CTI reports and 2,400 ground-truth strings from MITRE ATT&CK Evaluations. Its reported 99.1% average hit rate and 0.8% false-positive rate apply to that evaluation; they are not claims about production detection performance.',
    ],
    approach: ['Extract indicators from unstructured CTI.', 'Generate context-sensitive detection patterns.', 'Validate syntax and matching behavior against evaluation data.'],
    related: ['jove-cti', 'ioc-regex', 'cti-agent'],
  },
  {
    slug: 'human-machine-evaluation', number: '05', featured: true, kind: 'Research · 2026', category: 'Agents & evaluation',
    title: 'Comparing human and AI evaluations', subtitle: 'Human–machine alignment in LLM evaluation',
    description: 'Studying how rubrics and evaluation procedures shape the agreement between human judgments and LLM assessments.',
    tags: ['LLM evaluation', 'Multi-agent systems', 'Human–AI alignment'], visual: 'evaluation',
    question: 'What changes when we ask a machine to judge quality?',
    body: [
      'I have worked on graph-based multi-agent systems for question generation and assessment. This raises a broader evaluation problem: a model’s judgment may not reflect the criteria a human evaluator intends.',
      'Our 2026 study examines pretest-question evaluation through a 2 × 2 design that varies rubric operationalization and evaluation mode. The study finds systematic disagreements between human and machine judgments.',
      'Rubric revision had a larger effect on alignment than rationale-first evaluation, with the two interventions providing complementary benefits. The work informs how we define and test evaluation criteria for LLM-based systems.',
    ],
    approach: ['Make evaluation criteria explicit.', 'Compare human and machine judgments.', 'Investigate rubric design and evaluation mode separately.'],
    related: ['human-machine'],
  },
  {
    slug: 'adversary-emulation', number: '06', featured: false, kind: 'Research background', category: 'Security & intelligence',
    title: 'Learning defensive strategies against APTs', subtitle: 'Reinforcement learning for APT defense',
    description: 'Modeling lateral movement and constructing simulation environments for reinforcement-learning-based defensive strategies.',
    tags: ['Reinforcement learning', 'Adversary emulation', 'POMDP'], visual: 'workflow',
    question: 'How can defenders reason about an attacker they can only partially observe?',
    body: ['My work includes designing lateral-movement simulation environments and constructing datasets for reinforcement-learning-based APT defense.', 'This research models attacker decision-making and partial observability, connecting security-domain knowledge with sequential decision-making.'],
    approach: ['Model lateral movement under partial observability.', 'Construct attack simulations and training datasets.', 'Investigate proactive defensive strategies.'], related: [],
  },
  {
    slug: 'threat-graphs', number: '07', featured: false, kind: 'Research background', category: 'Security & intelligence',
    title: 'Connecting attack evidence with graphs', subtitle: 'Graph-based threat detection and provenance',
    description: 'Linking intelligence, kernel audit logs, and attack behavior to investigate multi-stage threats.',
    tags: ['Graph learning', 'Threat hunting', 'System telemetry'], visual: 'state',
    question: 'How can scattered observations reveal a connected attack?',
    body: ['At Academia Sinica, I worked on threat knowledge bases, graph-based attack correlation, and embedding-based representations of threat intelligence.', 'I also simulated APT campaigns across Linux and Windows, studied kernel-audit-log reduction, and applied BERT-based models to honeypot traffic and packet captures. This experience continues to shape the operational problems I study with AI agents.'],
    approach: ['Combine intelligence with host and network telemetry.', 'Represent relationships using graphs and learned embeddings.', 'Preserve behavioral evidence for attack investigation.'], related: [],
  },
];

export const publications = [
  {
    id: 'jove-cti', year: '2026', venue: 'JoVE', type: 'Journal',
    title: 'A Structured Workflow for Transforming Cyber Threat Intelligence into Computable Detection Patterns',
    authors: 'Pei-Yu Tseng, Peng Liu',
    summary: 'A protocol for converting threat-report indicators into validated detection patterns using LLM extraction and graph-assisted component labeling.',
    url: 'https://www.jove.com/t/71144/a-structured-workflow-for-transforming-cyber-threat-intelligence-into', preprint: '',
  },
  {
    id: 'human-machine', year: '2026', venue: 'AIED 2026 · CCIS 3031', type: 'Conference',
    title: 'Why Machines Misread Pedagogical Quality: Human–Machine Alignment in LLM-Based Pretest Question Evaluation',
    authors: 'Pei-Yu Tseng, Mahir Akgun, Peng Liu',
    summary: 'How rubric design and evaluation mode affect alignment between human and LLM judgments.',
    url: 'https://doi.org/10.1007/978-3-032-29788-4_39', preprint: 'https://arxiv.org/abs/2606.23629',
  },
  {
    id: 'ioc-regex', year: '2026', venue: 'arXiv · 2604.12228', type: 'Preprint',
    title: 'From IOCs to Regex: Automating CTI Operationalization for SOC with LLMs',
    authors: 'Pei-Yu Tseng, Lan Zhang, ZihDwo Yeh, Xiaoyan Sun, Xushu Dai, Peng Liu',
    summary: 'Group-aware generation and multi-stage validation for turning threat indicators into detection patterns.',
    url: 'https://arxiv.org/abs/2604.12228', preprint: '',
  },
  {
    id: 'vulnerability-repair', year: '2025', venue: 'ACM IWSPA 2025', type: 'Conference',
    title: 'Exploring Prompt Patterns for Effective Vulnerability Repair in Real-World Code by Large Language Models',
    authors: 'Yining Luo, Baobao Li, Anoop Singhal, Pei-Yu Tseng, Lan Zhang, Qingtian Zou, Xiaoyan Sun, Peng Liu',
    summary: 'Investigating contextual prompts and repair strategies for vulnerabilities in real-world code.',
    url: 'https://doi.org/10.1145/3716815.3729010', preprint: 'https://www.nist.gov/publications/exploring-prompt-patterns-effective-vulnerability-repair-real-world-code-large-language',
  },
  {
    id: 'cti-agent', year: '2024', venue: 'arXiv · 2407.13093', type: 'Preprint',
    title: 'Using LLMs to Automate Threat Intelligence Analysis Workflows in Security Operation Centers',
    authors: 'PeiYu Tseng, ZihDwo Yeh, Xushu Dai, Peng Liu',
    summary: 'An LLM agent for repetitive threat-report analysis tasks in security operations.',
    url: 'https://arxiv.org/abs/2407.13093', preprint: '',
  },
  {
    id: 'driving-behavior', year: '2023', venue: 'Engineering Applications of Artificial Intelligence · 117, 105571', type: 'Journal',
    title: 'Vehicle theft detection by generative adversarial networks on driving behavior',
    authors: 'Pei-Yu Tseng, Po-Ching Lin, Edy Kristianto',
    summary: 'Learning driving-behavior representations with a convolutional LSTM GAN for vehicle-theft detection.',
    url: 'https://doi.org/10.1016/j.engappai.2022.105571', preprint: '',
  },
];

export const experience = [
  { date: '2023 — Present', institution: 'Penn State University', role: 'Research Assistant', location: 'State College, PA', description: 'LLM agents for threat intelligence, security workflow generation, and stateful evaluation. Research advised by Professor Peng Liu.' },
  { date: '2021 — 2023', institution: 'Academia Sinica', role: 'Research Assistant', location: 'Taipei, Taiwan', description: 'Graph-based APT detection, threat knowledge bases, kernel audit logs, and representation learning for honeypot traffic.' },
  { date: '2020', institution: 'Chiayi County Government', role: 'Penetration Tester', location: 'Taiwan', description: 'Security assessments of government web applications and IoT infrastructure, with remediation guidance.' },
  { date: '2019 — 2020', institution: 'National Chung Cheng University', role: 'Network Administrator', location: 'Taiwan', description: 'Network infrastructure, firewalls, VPN, DNS, and web hosting for the College of Engineering.' },
];

export const education = [
  { degree: 'Ph.D. in Informatics · In progress', school: 'The Pennsylvania State University', date: '2023 — Present' },
  { degree: 'M.S. in Computer Science and Information Engineering', school: 'National Chung Cheng University', date: '2019 — 2021' },
  { degree: 'B.S. in Computer Science', school: 'National Taichung University of Education', date: '2015 — 2019' },
];

export const skills = [
  { category: 'AI & evaluation', items: 'LLM agents, retrieval-augmented generation, multi-agent systems, reinforcement learning, graph learning' },
  { category: 'Security', items: 'SOAR, SIEM, Splunk, ELK, threat intelligence, threat hunting, MITRE ATT&CK, detection engineering' },
  { category: 'Engineering', items: 'Python, PyTorch, TensorFlow, Bash, regular expressions, Linux, Windows, Docker, graph databases' },
];
