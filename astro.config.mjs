import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import gridsome from '@noxify/gridsome-remark-classes';
import callouts from 'remark-callouts';

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: 'https://samland.minersonline.uk',
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [[gridsome, {
      // 'heading[depth=1]': 'title is-1',
      // 'heading[depth=2]': 'title is-2',
      // 'heading[depth=3]': 'title is-3',
      // 'heading[depth=4]': 'title is-4',
      // 'heading[depth=5]': 'title is-5',
      // 'heading[depth=6]': 'title is-6',
      'table': 'table is-bordered is-striped is-narrow is-hoverable is-fullwidth'
    }], callouts]
  },
  vite: {
    resolve: {
      preserveSymlinks: true
    }
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop',
    },
  },
  output: 'server',
  adapter: cloudflare(),
});