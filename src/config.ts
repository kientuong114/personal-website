/**
 * Site-wide constants. Everything that is prose lives in `src/content/`;
 * this file holds only the handful of values the templates need.
 */
export const SITE = {
  name: "Kien Tuong Truong",
  /** Author name to render in bold wherever it appears in an author list. */
  author: "Kien Tuong Truong",
  title: "Kien Tuong Truong",
  description:
    "PhD student in the Applied Cryptography Group at ETH Zurich, working on attacks against real-world deployments of cryptography.",
  url: "https://ktruong.dev",
  blog: "https://blog.ktruong.dev",
  locale: "en",
} as const;

/**
 * Seed for the generated line work (see src/lib/geom.ts). The drawing is
 * deterministic, so builds are reproducible; change this number to re-roll
 * the whole composition — the hero construction and the background field.
 */
export const SEED = 20260828;

export type NavItem = {
  label: string;
  href: string;
  /** Renders an outward arrow after the label. */
  external?: boolean;
};

/** In-page anchors plus the two real routes. */
export const NAV: NavItem[] = [
  { label: "publications", href: "/#publications" },
  { label: "talks", href: "/#talks" },
  { label: "about", href: "/#about" },
  { label: "teaching", href: "/teaching" },
  { label: "contact", href: "/contact" },
  { label: "blog", href: SITE.blog, external: true },
];
