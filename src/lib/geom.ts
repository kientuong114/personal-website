/**
 * A small deterministic geometry generator, run at build time.
 *
 * The drawings on this site are machine-constructed and then knocked slightly
 * out of true — every radius, angle and length is perturbed. Everything is
 * driven by a seeded PRNG, so a given seed always produces the same drawing
 * and the built HTML is reproducible; changing `SEED` in src/config.ts
 * re-rolls the whole composition.
 *
 * Output is plain SVG geometry. Nothing here runs in the browser.
 */

/** mulberry32 — small, fast, good enough for drawing. */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Rand = () => number;
export type Point = { x: number; y: number };

/** Uniform in [min, max). */
export const between = (r: Rand, min: number, max: number) =>
  min + r() * (max - min);

/** Signed jitter in [-amount, amount). */
export const jitter = (r: Rand, amount: number) => between(r, -amount, amount);

const TAU = Math.PI * 2;

const polar = (
  cx: number,
  cy: number,
  radius: number,
  angle: number,
): Point => ({
  x: cx + Math.cos(angle) * radius,
  y: cy + Math.sin(angle) * radius,
});

const round = (n: number) => Math.round(n * 100) / 100;

/**
 * A regular polygon with each vertex nudged off its ideal position, in both
 * radius and angle. `wobble` is a fraction of the radius.
 */
export function irregularPolygon(
  r: Rand,
  cx: number,
  cy: number,
  radius: number,
  sides: number,
  wobble = 0.08,
): Point[] {
  const step = TAU / sides;
  // Start from a random rotation so successive shapes don't share an axis.
  const phase = r() * TAU;
  return Array.from({ length: sides }, (_, i) => {
    const angle = phase + i * step + jitter(r, step * wobble * 1.6);
    return polar(cx, cy, radius * (1 + jitter(r, wobble)), angle);
  });
}

export const pointsAttr = (points: Point[]) =>
  points.map((p) => `${round(p.x)},${round(p.y)}`).join(" ");

/** SVG arc path from one angle to another, the long way round if needed. */
function arcPath(
  cx: number,
  cy: number,
  radius: number,
  from: number,
  to: number,
): string {
  const a = polar(cx, cy, radius, from);
  const b = polar(cx, cy, radius, to);
  const large = to - from > Math.PI ? 1 : 0;
  return `M ${round(a.x)} ${round(a.y)} A ${round(radius)} ${round(radius)} 0 ${large} 1 ${round(b.x)} ${round(b.y)}`;
}

/**
 * A circle broken into arcs with gaps — a ring drawn by a pen that lifts.
 * Returns one path per arc so each can be drawn on independently.
 */
export function brokenRing(
  r: Rand,
  cx: number,
  cy: number,
  radius: number,
  arcs: number,
): string[] {
  const slice = TAU / arcs;
  const phase = r() * TAU;
  const paths: string[] = [];
  for (let i = 0; i < arcs; i++) {
    // Each arc fills most of its slice, leaving an uneven gap.
    const start = phase + i * slice + between(r, 0.02, 0.16) * slice;
    const end = phase + (i + 1) * slice - between(r, 0.08, 0.4) * slice;
    if (end <= start) continue;
    paths.push(arcPath(cx, cy, radius * (1 + jitter(r, 0.012)), start, end));
  }
  return paths;
}

export type Tick = { x1: number; y1: number; x2: number; y2: number };

/**
 * Radial tick marks around a circle, with uneven lengths — the graduations on
 * an instrument dial. Every `emphasisEvery`-th tick is drawn longer.
 */
export function tickRing(
  r: Rand,
  cx: number,
  cy: number,
  radius: number,
  count: number,
  length: number,
  emphasisEvery = 6,
): Tick[] {
  const step = TAU / count;
  const phase = r() * TAU;
  return Array.from({ length: count }, (_, i) => {
    const angle = phase + i * step + jitter(r, step * 0.08);
    const len =
      length *
      (i % emphasisEvery === 0 ? between(r, 1.9, 2.6) : between(r, 0.6, 1.15));
    const a = polar(cx, cy, radius, angle);
    const b = polar(cx, cy, radius + len, angle);
    return { x1: round(a.x), y1: round(a.y), x2: round(b.x), y2: round(b.y) };
  });
}

export type Chord = { x1: number; y1: number; x2: number; y2: number };

/**
 * Construction lines: from a few polygon vertices outward past `radius`,
 * the way a draughtsman extends an edge to meet a dimension line.
 */
export function leaders(
  r: Rand,
  cx: number,
  cy: number,
  vertices: Point[],
  radius: number,
  count: number,
): Chord[] {
  const picked = shuffle(
    r,
    vertices.map((_, i) => i),
  ).slice(0, count);
  return picked.map((i) => {
    const v = vertices[i]!;
    const angle = Math.atan2(v.y - cy, v.x - cx);
    const out = polar(cx, cy, radius * between(r, 0.98, 1.14), angle);
    return {
      x1: round(v.x),
      y1: round(v.y),
      x2: round(out.x),
      y2: round(out.y),
    };
  });
}

function shuffle<T>(r: Rand, items: T[]): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

/**
 * Large arcs that run off the edge of the viewport — the ambient field behind
 * the page. Radii are big relative to the box so only a shallow curve shows.
 */
export function fieldArcs(
  r: Rand,
  width: number,
  height: number,
  count: number,
): string[] {
  return Array.from({ length: count }, () => {
    const cx = between(r, -0.3, 1.3) * width;
    const cy = between(r, -0.3, 1.3) * height;
    const radius = between(r, 0.45, 1.5) * Math.max(width, height);
    const from = r() * TAU;
    return arcPath(cx, cy, radius, from, from + between(r, 0.5, 2.4));
  });
}

export type Link = { x1: number; y1: number; x2: number; y2: number };

/**
 * A node scatter with short-range connections — the graph a generative system
 * builds while it runs. Links are the `maxLinks` shortest pairs under
 * `maxDist`, so the result reads as a neighbourhood rather than a mesh.
 */
export function lattice(
  r: Rand,
  width: number,
  height: number,
  nodeCount: number,
  maxDist: number,
  maxLinks: number,
): { nodes: Point[]; links: Link[] } {
  // Whole units: this is a background scatter drawn at well under 1:1, so
  // sub-pixel precision only costs bytes in the inlined SVG.
  const nodes: Point[] = Array.from({ length: nodeCount }, () => ({
    x: Math.round(between(r, 0.015, 0.985) * width),
    y: Math.round(between(r, 0.02, 0.98) * height),
  }));

  const candidates: (Link & { d: number })[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i]!;
      const b = nodes[j]!;
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d <= maxDist) {
        candidates.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, d });
      }
    }
  }
  candidates.sort((p, q) => p.d - q.d);

  return {
    nodes,
    links: candidates.slice(0, maxLinks).map(({ x1, y1, x2, y2 }) => ({
      x1,
      y1,
      x2,
      y2,
    })),
  };
}
