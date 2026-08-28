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
awards: # optional; rendered as an inverted stamp
  - Distinguished Paper Award Runner-Up
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
  config.ts           site metadata, nav, the author name to bold, SEED
  content.config.ts   frontmatter schemas (a bad date or URL fails the build)
  content/            all the content, as markdown
  lib/geom.ts         the seeded geometry generator
  components/         .astro partials
  layouts/Base.astro  <head>, masthead, field, footer
  pages/              index, contact, 404, /keys/<file>
  styles/global.css   the entire design system
  assets/propic.jpg   processed at build into avif/webp
tools/                og.mjs + build-og.sh for the social card
```

## Design

Two colours, swapped. `--ink` and `--ground` are the whole palette; dark mode
exchanges the same two values, and there is no accent. Emphasis is carried by
**inversion** — a hovered link fills with ink and its type goes to ground.

Everything visual lives in `src/styles/global.css`, in order: the two faces,
the tokens (light, then the `prefers-color-scheme: dark` swap, then a
`prefers-contrast: more` pass), then components.

When picking a colour for type, use `--ink-60` or stronger. The steps are
measured against the light ground: 60% is 4.89:1, 70% is 6.90:1. `--ink-45` is
3.04:1 and fails WCAG AA — it is for hairlines and stroke work only.

### The geometry

The line work is generated at build time by `src/lib/geom.ts`: shapes are
constructed precisely, then every radius, angle and length is knocked out of
true. It is seeded, so the drawing is deterministic and the built HTML is
reproducible. Change `SEED` in `src/config.ts` to re-roll everything at once —
the hero construction, the background field, and each section's margin mark.

Three things use it:

| Component       | What it draws                                                                                            |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| `Plot.astro`    | the hero construction; the portrait is CSS-clipped to the same polygon the SVG outlines                  |
| `Field.astro`   | large arcs and registration marks, masked to the outer margins                                           |
| `Lattice.astro` | a static node scatter with short-range links. Full width, quietened to a third behind the reading column |
| `Mark.astro`    | a small mark per section, seeded from the section id                                                     |

Nothing runs in the browser — it all renders to static SVG.

### Motion

Everything moving is either something being drawn or an instrument turning —
there are no fades or slides. All of it lives inside
`prefers-reduced-motion: no-preference`, and nothing on the page depends on an
animation to become visible.

| When                | What                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Load                | the hero construction draws itself stroke by stroke, staggered per element, via `pathLength="1"` and `stroke-dashoffset` |
| Ambient             | the hero's two rings counter-rotate on 62s and 90s. That is the only thing on the page that moves by itself              |
| Scroll              | section rules draw in from the left, and the masthead hairline fills as a reading-progress dimension line                |
| Hover               | the inversion wipe on tag links                                                                                          |
| Opening an abstract | its left rule is drawn downward and the text settles                                                                     |

The scroll-driven pieces use `animation-timeline: view()` and `scroll()` behind
`@supports`; where those are unavailable the elements are simply in their
finished state.

### Why some animation here is smooth and some was not

The rule that matters: **Chrome never splits an SVG into more than one GPU
layer.** A transform on a `<g>` or a `<path>` therefore cannot be promoted on
its own — the browser re-rasterises the _entire_ `<svg>` every frame. What
costs is the raster area, not the element count.

That is why the hero plot spins smoothly while the background did not. The
plot's SVG is a ~336px box, so re-rastering it 60 times a second is cheap. The
lattice and field are `position: fixed; inset: 0` — full-viewport SVGs. Turning
a group inside one of those re-rasters the whole viewport every frame, and that
is what made it choppy.

So, when adding motion:

- Animate `transform` or `opacity` on an **outer box** — an HTML element, or the
  `<svg>` element itself. Those are ordinary CSS boxes and can be promoted to
  their own layer, after which the GPU just moves an existing texture.
- Never animate something _inside_ a large SVG. `.mark` rotates the `<svg>`
  element; the dashed rules translate a `<span>` inside a clipping div. Both are
  composited.
- Add `will-change: transform` to the handful of elements that animate
  continuously, and only those — each one costs GPU memory.
- Don't translate a hairline pattern slowly. Sub-pixel movement of 1px lines
  snaps between device pixels and reads as jitter however smooth the frame rate
  is; that is why the graph-paper grid is static.

> **Do not switch CSS minification back to Lightning CSS.** It folds
> `animation-timeline` into the `animation` shorthand — `animation: linear both
lift view()`. That property is deliberately not part of the shorthand, so
> browsers drop the whole declaration and every scroll-driven animation dies in
> the build while still working in `astro dev`. `vite.build.cssMinify` is pinned
> to `"esbuild"` in `astro.config.mjs` for this reason.

### The social card

`public/og.png` is drawn from the same geometry library and seed as the site, so
it cannot drift from the hero:

```sh
./tools/build-og.sh
```

Needs node >= 22, `rsvg-convert`, ImageMagick, and Bricolage Grotesque + DM Mono
installed system-wide. `tools/og.svg` is generated output, not a source file.

## Deployment

Pushing to `master` builds and publishes to GitHub Pages via
`.github/workflows/deploy.yml`. `public/CNAME` holds the custom domain.

The old `/publications` and `/talks` routes redirect to the anchors on the home
page — see `redirects` in `astro.config.mjs`.
