/**
 * Emits the social card as SVG on stdout, using the site's own geometry
 * library and seed so the card is the same construction as the hero plot.
 *
 *   node --experimental-strip-types tools/og.mjs > tools/og.svg
 *
 * See tools/build-og.sh, which also rasterises it.
 */
import {
  rng,
  irregularPolygon,
  pointsAttr,
  brokenRing,
  tickRing,
  leaders,
} from "../src/lib/geom.ts";
import { SEED, SITE } from "../src/config.ts";

// librsvg refuses absolute file:// references, so build-og.sh drops a resized
// copy beside the SVG and we point at it relatively.
const portrait = "og-portrait.jpg";

const W = 1200;
const H = 630;

// Ink on ground, dark orientation — the card sits on other people's white
// timelines, so the inverted side reads more strongly.
const INK = "#e8e9eb";
const GROUND = "#0a0b0d";

const r = rng(SEED);

const cx = 950;
const cy = H / 2;
const R = 132;

const plate = irregularPolygon(r, cx, cy, R, 7, 0.075);
const ring = brokenRing(r, cx, cy, R * 1.23, 5);
const ticks = tickRing(r, cx, cy, R * 1.46, 44, 7, 6);
const rays = leaders(r, cx, cy, plate, R * 1.4, 3);

const hair = (extra = "") =>
  `fill="none" stroke="${INK}" stroke-width="1" stroke-opacity="0.45" ${extra}`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <pattern id="grid" width="96" height="96" patternUnits="userSpaceOnUse">
      <path d="M 96 0 L 0 0 0 96" fill="none" stroke="${INK}" stroke-opacity="0.07" stroke-width="1"/>
    </pattern>
    <clipPath id="plate">
      <polygon points="${pointsAttr(plate)}"/>
    </clipPath>
    <filter id="grey" color-interpolation-filters="sRGB">
      <feColorMatrix type="saturate" values="0"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="${GROUND}"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>

  <g>
    ${ticks.map((t) => `<line x1="${t.x1}" y1="${t.y1}" x2="${t.x2}" y2="${t.y2}" ${hair()}/>`).join("\n    ")}
    ${ring.map((d) => `<path d="${d}" ${hair()}/>`).join("\n    ")}
    ${rays.map((l) => `<line x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}" ${hair()}/>`).join("\n    ")}
  </g>

  <g clip-path="url(#plate)" filter="url(#grey)">
    <image xlink:href="${portrait}"
           x="${(cx - R * 1.06).toFixed(1)}" y="${(cy - R * 1.06).toFixed(1)}"
           width="${(R * 2.12).toFixed(1)}" height="${(R * 2.12).toFixed(1)}"
           preserveAspectRatio="xMidYMid slice"/>
  </g>
  <polygon points="${pointsAttr(plate)}" fill="none" stroke="${INK}" stroke-width="1.5"/>
  ${plate.map((p) => `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="2.4" fill="${INK}"/>`).join("\n  ")}

  <text x="80" y="86" font-family="DM Mono" font-size="19" fill="${INK}" fill-opacity="0.6" letter-spacing="2.6">KTRUONG.DEV</text>

  <text font-family="Bricolage Grotesque" font-weight="500" font-size="88" fill="${INK}" letter-spacing="-3">
    <tspan x="78" y="290">Kien Tuong</tspan>
    <tspan x="78" y="374">Truong</tspan>
  </text>

  <line x1="80" y1="440" x2="600" y2="440" stroke="${INK}" stroke-opacity="0.2" stroke-width="1"/>

  <g font-family="DM Mono" font-size="18" fill="${INK}" fill-opacity="0.6" letter-spacing="2.2">
    <text x="80" y="480">PHD STUDENT, APPLIED CRYPTOGRAPHY GROUP</text>
    <text x="80" y="512">ETH ZURICH</text>
  </g>
</svg>
`;

process.stdout.write(svg);
// Keep the import used, so the card's wording cannot drift from the site.
if (!SITE.name) throw new Error("SITE.name missing");
