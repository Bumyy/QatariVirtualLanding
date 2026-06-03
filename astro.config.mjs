// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://qatari-virtual-landing.pages.dev',
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});