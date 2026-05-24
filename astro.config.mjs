// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://qatari-virtual-landing.pages.dev',
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});