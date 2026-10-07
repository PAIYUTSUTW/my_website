import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://paiyutsutw.github.io',
  base: '/my_website',
  trailingSlash: 'always',
  output: 'static',
  redirects: Object.fromEntries(Object.entries({
    '/about': '/',
    '/resume': '/cv/',
    '/portfolio/portfolio-1': '/projects/threat-intelligence/',
    '/portfolio/portfolio-2': '/projects/adversary-emulation/',
    '/portfolio/portfolio-3': '/projects/threat-graphs/',
    '/publication/2023-GAN': '/publications/#driving-behavior',
    '/publication/2024-llm-threat': '/publications/#cti-agent',
    '/publication/2024-reinforcement-defense': '/projects/adversary-emulation/',
  }).map(([from, to]) => [from, `/my_website${to}`])),
});
