import { defineCollection, z } from 'astro:content';

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


export const collections = { blog, guides };
