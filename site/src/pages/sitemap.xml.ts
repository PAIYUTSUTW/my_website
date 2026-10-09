import { projects, path } from '../data/profile';
export function GET() {
  const routes = ['/', '/portfolio/', '/publications/', '/cv/', ...projects.map(p => `/projects/${p.slug}/`)];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(route => `<url><loc>https://paiyutsutw.github.io${path(route)}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
}
