import { defineCollection } from "astro:content";
import { z } from "zod";
import { glob } from "astro/loaders";

/**
 * A labelled outbound link, e.g. `{ label: ePrint, url: "https://..." }`.
 *
 * The protocol is pinned to http(s): a bare `z.url()` accepts anything
 * `new URL()` can parse, so a typo like `htp:/eprint.iacr.org` would pass.
 */
const link = z.object({
  label: z.string(),
  url: z.url({ protocol: /^https?$/ }),
});

const publications = defineCollection({
  loader: glob({ base: "./src/content/publications", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    /** Plain list — the template bolds whichever entry matches SITE.author. */
    authors: z.array(z.string()).nonempty(),
    /** Venue without the year, e.g. "USENIX Security". */
    venue: z.string(),
    /** Year as published/presented; this is what renders in the gutter. */
    year: z.number().int().min(1990).max(2100),
    /** Sort key. Approximate is fine — only the ordering matters. */
    date: z.coerce.date(),
    links: z.array(link).default([]),
    draft: z.boolean().default(false),
  }),
});

const talks = defineCollection({
  loader: glob({ base: "./src/content/talks", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    /** One entry per place the talk was given; rendered joined by "·". */
    venues: z
      .array(
        z.object({
          name: z.string(),
          year: z.number().int().min(1990).max(2100),
        }),
      )
      .nonempty(),
    date: z.coerce.date(),
    kind: z.enum(["talk", "workshop"]).default("talk"),
    links: z.array(link).default([]),
    draft: z.boolean().default(false),
  }),
});

/** Prose blocks appended to the home page, in `order`. */
const sections = defineCollection({
  loader: glob({ base: "./src/content/sections", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    /** Anchor id; defaults to the filename slug. */
    anchor: z.string().optional(),
    order: z.number().int(),
  }),
});

/** Standalone pages: the hero (`home.md`) and `/contact`. */
const pages = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    /** Hero only. */
    greeting: z.string().optional(),
    tagline: z.array(z.string()).default([]),
    /** Short aside under the name, e.g. which part is the family name. */
    nameNote: z.string().optional(),
    photoCredit: z.string().optional(),
    /** Contact only: which key files to render, and their fingerprints. */
    keys: z
      .array(
        z.object({
          title: z.string(),
          /** Filename inside src/content/keys/ */
          file: z.string(),
          fingerprint: z.string().optional(),
        }),
      )
      .default([]),
  }),
});

export const collections = { publications, talks, sections, pages };
