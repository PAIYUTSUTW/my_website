export const pipelineStages = [
  { id: 'before', description: 'Before: the playbook calls a real service through SOAR and its connector. Testing depends on access to that service or on deploying and maintaining a separate instance.' },
  { id: 'generate', description: 'Our Pipeline1 agent reads the connector source and documentation, then generates a software mock that models the service’s responses and state.' },
  { id: 'after', description: 'With Pipeline1: the same playbook and connector call the generated software mock. Use it for testing, discard it, and recreate it when needed.' },
];
