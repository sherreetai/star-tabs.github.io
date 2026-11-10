import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://star-tabs.github.io',
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
