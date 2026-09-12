import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const hexColor = z.string().regex(
  /^#(?:[\da-fA-F]{3}|[\da-fA-F]{4}|[\da-fA-F]{6}|[\da-fA-F]{8})$/,
  'Theme colors must use hexadecimal CSS notation, for example #173f39.',
);

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    videoEmbed: z.string().optional(),
    image: z.union([image(), z.string()]).optional(),
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
      description: z.string().optional(),
      width: z.number().positive().optional(),
      height: z.number().positive().optional(),
    })).default([]),
    presentation: z.enum(['grid', 'flipbook', 'flipbook-3d', 'wall', 'editorial-wall', 'mosaic-wall', 'slideshow', 'gallery']).default('grid'),
    transition: z.enum(['fade', 'vertical-slide', 'horizontal-reveal', 'horizontal-slide', 'horizontal-scroll', 'grid-slide']).default('horizontal-slide'),
    theme: z.object({
      paper: hexColor.optional(),
      cover: hexColor.optional(),
      ink: hexColor.optional(),
      muted: hexColor.optional(),
    }).optional(),
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
