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
    /** Distinctions, e.g. "Distinguished Paper Award". Rendered inverted. */
    awards: z.array(z.string()).default([]),
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

/**
 * Community service: programme committees, reviewing, organising.
 *
 * One entry can carry several venues, which covers both shapes this needs —
 * a single named role at one venue, and a role held across a list of them.
 * A venue may carry its own `url` when the venue itself is the thing worth
 * linking to; `links` is for anything else, like an event website.
 */
const service = defineCollection({
  loader: glob({ base: "./src/content/service", pattern: "**/*.md" }),
  schema: z.object({
    /** What you did, e.g. "Reviewer" or "Co-organizer of ...". */
    role: z.string(),
    venues: z
      .array(
        z.object({
          name: z.string(),
          year: z.number().int().min(1990).max(2100),
          url: z.url({ protocol: /^https?$/ }).optional(),
        }),
      )
      .nonempty(),
    /** Sort key. Approximate is fine — only the ordering matters. */
    date: z.coerce.date(),
    links: z.array(link).default([]),
    draft: z.boolean().default(false),
  }),
});

/**
 * Courses taught. `terms` works like service venues: several of them on one
 * entry covers a course taught more than once, and each can carry its own url.
 */
const courses = defineCollection({
  loader: glob({ base: "./src/content/courses", pattern: "**/*.md" }),
  schema: z.object({
    course: z.string(),
    /** e.g. "Teaching Assistant", "Head TA", "Guest lecturer". */
    role: z.string().optional(),
    institution: z.string().optional(),
    terms: z
      .array(
        z.object({
          name: z.string(), // "Autumn", "Spring", "Summer term"
          year: z.number().int().min(1990).max(2100),
          url: z.url({ protocol: /^https?$/ }).optional(),
        }),
      )
      .nonempty(),
    /** Sort key. Approximate is fine — only the ordering matters. */
    date: z.coerce.date(),
    links: z.array(link).default([]),
    draft: z.boolean().default(false),
  }),
});

/** Students supervised, and what they worked on. */
const supervision = defineCollection({
  loader: glob({ base: "./src/content/supervision", pattern: "**/*.md" }),
  schema: z.object({
    student: z.string(),
    project: z.string(),
    /** Link to the thesis; the project title becomes the link. */
    projectUrl: z.url({ protocol: /^https?$/ }).optional(),
    /** e.g. "Master's thesis", "Semester project". */
    kind: z.string().optional(),
    coAdvisors: z.array(z.string()).default([]),
    /** Sort key, and the year shown in the gutter. */
    date: z.coerce.date(),
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

export const collections = {
  publications,
  talks,
  service,
  courses,
  supervision,
  sections,
  pages,
};
