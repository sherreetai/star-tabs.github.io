import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Every case study is one .mdx file in src/content/work/.
// The fields below are the settings at the top of each file (between the --- lines).
const work = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/work' }),
  schema: z.object({
    title: z.string(), // big heading on the case study page
    cardTitle: z.string().optional(), // shorter title for the Home/Work card (falls back to title)
    tag: z.string(), // small label on the card, e.g. "Product Design"
    order: z.number(), // position in the grid and the "Next project" sequence
    logo: z.string(), // small logo used in the "Next project" link
    coverImage: z.string(), // image shown on the Home/Work card
    coverPosition: z.string().optional(), // focal point used when the card cover is cropped
    heroImage: z.string(), // lead image on the case study page
    scope: z.array(z.string()),
    challengeHeading: z.string(),
    challenge: z.string(),
    outcome: z.string(),
  }),
});

export const collections = { work };
