export const pipelineSteps = [
  { label: 'Generate', title: 'Start with a security goal.', description: 'An LLM drafts a playbook to disable a compromised account. Before it touches production, give it somewhere to be tested.' },
  { label: 'Build', title: 'Build the world it needs.', description: 'Pipeline1 uses connector actions and state relationships to construct a service substitute. Seed data supplies a known starting point.' },
  { label: 'Run', title: 'Keep the real integration path.', description: 'The playbook runs through SOAR and its real connector. The generated service handles the request and updates its test state.' },
  { label: 'Inspect', title: 'Check what actually changed.', description: 'The account is now disabled. Compare observed state with the security goal; a successful call alone is not enough.' },
  { label: 'Rebuild', title: 'Keep the lesson. Replace the world.', description: 'Discard the used runtime and create a fresh one from the seed. Change the starting conditions for the next experiment, without rebuilding the full external service.' },
];

export const missedActionExplanation = 'The playbook queried the account but never disabled it. The account is still active: the goal was missed. Use this feedback to revise the playbook and try again in a fresh environment.';
