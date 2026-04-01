// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import icon from "astro-icon";
import remarkDirective from 'remark-directive';
import remarkWideImage from './src/plugins/remark-wide-image';
import remarkGallery from './src/plugins/remark-gallery';
import { remarkCallout } from './src/plugins/remark-callout.mjs';
import { settings } from './src/data/settings';

// https://astro.build/config
export default defineConfig({
  site: settings.site.url,
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Jost',
      cssVariable: '--font-jost',
      weights: [400, 500, 700, 900],
      styles: ['normal'],
    }
  ],
  markdown: {
    remarkPlugins: [remarkDirective, remarkWideImage, remarkGallery, remarkCallout],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      defaultColor: false,
    }
  },
  integrations: [sitemap(), icon(), mdx()],
  vite: {
  },
  build: {
    inlineStylesheets: 'auto',
  },
});