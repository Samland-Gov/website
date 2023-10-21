import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';
import gridsome from '@noxify/gridsome-remark-classes'

// https://astro.build/config
export default defineConfig({
	site: 'https://minersonline.uk/samland',
	integrations: [mdx(), sitemap()],
	markdown: {
		remarkPlugins: [[gridsome, {
			'heading[depth=1]': 'govuk-heading-xl',
			'heading[depth=2]': 'govuk-heading-l',
			'heading[depth=3]': 'govuk-heading-m',
			'heading[depth=4]': 'govuk-heading-s',
			// 'heading[depth=5]': 'govuk-caption-s',
			// 'heading[depth=6]': 'govuk-caption-m',
			'paragraph': 'govuk-body',
			'list': 'govuk-body'
		}]]
	}
});
