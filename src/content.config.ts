import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const modes = ['auto', 'plain', 'document', 'table', 'receipt', 'code', 'handwriting', 'math'] as const;
const exportsList = ['txt', 'md', 'docx', 'pdf', 'searchable-pdf', 'html', 'json', 'csv', 'xlsx'] as const;

/** Landing pages for specific tasks. Each one presets the workspace. */
const tools = defineCollection({
  loader: glob({ base: './src/content/tools', pattern: '**/*.md' }),
  schema: z.object({
    /** <title>, without the brand suffix. Max ~55 characters. */
    title: z.string().max(70),
    /** Meta description, 120–160 characters. */
    description: z.string().min(80).max(170),
    h1: z.string(),
    /** One or two sentences under the H1. */
    intro: z.string().max(260),
    /** Short label used in navigation and related-tool lists. */
    navLabel: z.string().max(32),
    order: z.number(),
    preset: z.object({
      mode: z.enum(modes).default('auto'),
      export: z.enum(exportsList).optional(),
      /** Accept attribute override, e.g. ".jpg,.jpeg" to highlight a format. */
      accept: z.string().optional(),
      /** Which sample image to offer first. */
      sample: z.enum(['receipt', 'table', 'code', 'handwriting', 'document', 'chat', 'mixed-hindi']).optional(),
      /** Make the camera the main action on phones. */
      camera: z.boolean().default(false),
    }),
    steps: z.array(z.string()).min(3).max(5),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).min(3).max(8),
    related: z.array(z.string()).max(4).default([]),
  }),
});

const guides = defineCollection({
  loader: glob({ base: './src/content/guides', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().max(80),
    description: z.string().min(80).max(170),
    /** Short summary shown on the guides index. */
    summary: z.string().max(220),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    /** Slug of the most relevant tool page, linked from the guide. */
    tool: z.string().optional(),
    order: z.number().default(100),
  }),
});

export const collections = { tools, guides };
