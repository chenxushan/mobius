import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    videoEmbed: z.string().optional(),
    image: image().optional(),
    externalLink: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    videoEmbed: z.string().optional(),
    image: image().optional(),
  })
});

const photoAlbums = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/photos' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    location: z.string(),
    date: z.string(),
    cover: z.string().optional(),
    images: z.array(z.object({
      src: z.string(),
      alt: z.string(),
    })).default([]),
    draft: z.boolean().default(false),
  }),
});

const videos = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/videos' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    location: z.string(),
    date: z.string(),
    cover: z.string().optional(),
    videoUrl: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts, pages, photoAlbums, videos };