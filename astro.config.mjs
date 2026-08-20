import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Full public URL of the live site. Update this after you connect your
// Netlify domain (see README) so the sitemap and SEO tags are correct.
const SITE_URL = 'https://sensational-salamander-a5f064.netlify.app';

export default defineConfig({
  site: SITE_URL,
  integrations: [tailwind({ applyBaseStyles: false }), sitemap()],
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en', 'it', 'es'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  // This is a static site (no server), so the "/" -> "/fr/" redirect is
  // generated as a static HTML page at build time rather than handled
  // by server logic.
  redirects: {
    '/': '/fr/',
  },
});
