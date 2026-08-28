import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { satteri } from "@astrojs/markdown-satteri";

export default defineConfig({
  site: "https://ktruong.dev",
  trailingSlash: "ignore",
  compressHTML: true,

  // One page, one stylesheet: inline it so the page needs no CSS request.
  build: { inlineStylesheets: "always" },

  vite: {
    build: {
      // Lightning CSS folds `animation-timeline` into the `animation`
      // shorthand (`animation: linear both lift view()`). That property is
      // deliberately NOT part of the shorthand, so browsers drop the whole
      // declaration and every scroll-driven animation silently dies in the
      // build while still working in dev. esbuild leaves them alone.
      cssMinify: "esbuild",
    },
  },

  integrations: [sitemap()],

  // The old Next.js routes are linked from elsewhere; keep them working.
  redirects: {
    "/publications": "/#publications",
    "/talks": "/#talks",
  },

  markdown: {
    processor: satteri({
      // Abstracts are copied from papers and contain LaTeX-style `---` and
      // straight quotes; render them as real em dashes and curly quotes.
      smartPunctuation: true,
    }),
    // No code blocks anywhere in the content — skip syntax highlighting.
    syntaxHighlight: false,
  },
});
