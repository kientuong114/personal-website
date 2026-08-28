# ktruong.dev

Personal academic site. [Astro](https://astro.build), static HTML, **no
JavaScript shipped to the browser**. All content is markdown under
`src/content/`.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
npm run preview  # serve dist/
npm run check    # type-check + validate content frontmatter
npm run format   # prettier
```

## Adding a publication

Create `src/content/publications/<year>-<slug>.md`:

```markdown
---
title: Message Injection Attacks Against Signal
authors: [Kien Tuong Truong, Noemi Terzo, Kenny Paterson]
venue: USENIX Security # venue name, without the year
year: 2026 # shown in the left gutter
date: 2026-08-12 # sort key only; approximate is fine
links:
  - { label: ePrint, url: "https://eprint.iacr.org/2025/558" }
  - { label: paper, url: "https://dl.acm.org/doi/..." }
---

The abstract goes here, as ordinary markdown. It is collapsed behind an
"abstract" toggle on the page. Leave the body empty to omit the toggle.
```

Your own name is bolded automatically — anything matching `SITE.author` in
`src/config.ts`. Don't write `**Kien Tuong Truong**` by hand.

Set `draft: true` to keep an entry out of the build.

## Adding a talk

Create `src/content/talks/<year>-<slug>.md`. One `venues` entry per place the
talk was given; they render joined by `·`.

```markdown
---
title: "Signal Lost (Integrity): The Signal App is More than the Sum of its Protocols"
venues:
  - { name: Real World Crypto, year: 2026 }
date: 2026-03-23
kind: talk # or `workshop` — workshops get their own subsection
links:
  - { label: RWC Recording, url: "https://www.youtube.com/watch?v=..." }
---
```

## Editing the prose

| What                           | Where                                                    |
| ------------------------------ | -------------------------------------------------------- |
| Name, greeting, tagline, bio   | `src/content/pages/home.md`                              |
| "(More) About Me", "Fun Facts" | `src/content/sections/*.md` (`order:` sets the sequence) |
| Contact text and key list      | `src/content/pages/contact.md`                           |
| Nav links, site metadata       | `src/config.ts`                                          |

To add a new home-page section, drop another file in `src/content/sections/`
with a `title` and an `order`. Nothing else needs touching.

## Public keys

Key material lives in `src/content/keys/` as real `.asc` / `.txt` files, listed
in the `keys:` block of `src/content/pages/contact.md`. Each one is both
rendered inline and served at a stable URL, so `gpg --fetch-keys` works:

```sh
gpg --fetch-keys https://ktruong.dev/keys/pgp-personal.asc
```

Rotating a key means replacing the file — no markup changes.

## Structure

```
src/
  config.ts           site metadata, nav, the name to bold in author lists
  content.config.ts   frontmatter schemas (a bad date or URL fails the build)
  content/            all the content, as markdown
  components/         .astro partials
  layouts/Base.astro  <head>, nav, footer
  pages/              index, contact, 404, /keys/<file>
  styles/global.css   the entire design system
  assets/propic.jpg   processed at build into avif/webp
tools/                og.svg + build-og.sh for the social preview image
```

Everything visual is in `src/styles/global.css`: colour tokens at the top
(light, then a `prefers-color-scheme: dark` phosphor-terminal palette, then a
`prefers-contrast: more` pass), then the panel motif, then components.

Regenerate `public/og.png` after editing the tagline in `tools/og.svg`:

```sh
./tools/build-og.sh   # needs rsvg-convert + ImageMagick
```

## Deployment

Pushing to `master` builds and publishes to GitHub Pages via
`.github/workflows/deploy.yml`. `public/CNAME` holds the custom domain.

The old `/publications` and `/talks` routes redirect to the anchors on the home
page — see `redirects` in `astro.config.mjs`.
