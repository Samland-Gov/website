import { defineCollection, reference, z } from 'astro:content';

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const guides = defineCollection({
	schema: z.object({
		title: z.string(),
		breadcrumbs: z.array(z.object({
			text: z.string(),
			href: z.string().optional(),
		})),
		links: z.array(z.object({
			text: z.string(),
			href: z.string().optional(),
		})).optional(),
	}),
});

const legislation = defineCollection({
	schema: z.object({
		title: z.string(),
		type: z.string(),
		number: z.number(),
		jurisdiction: z.string(),
		date_published: z.coerce.date(),
		date_assented: z.coerce.date().optional(),
		repelled_by: reference('legislation').optional(),
		date_repelled: z.coerce.date().optional(),
		amended_by: reference('legislation').optional(),
		date_amended: z.coerce.date().optional(),
	}),
});

export const collections = { blog, guides, legislation };
