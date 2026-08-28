#!/usr/bin/env sh
# Regenerate public/og.png. The card is drawn from the site's own geometry
# library and SEED, so it always matches the hero construction.
#
# Needs: node >= 22 (for --experimental-strip-types), rsvg-convert (librsvg),
# magick (ImageMagick), and the Bricolage Grotesque + DM Mono fonts installed
# system-wide.
set -eu
here=$(dirname "$0")

# librsvg only loads images relative to the SVG, so stage one beside it.
magick "$here/../src/assets/propic.jpg" -resize 560x560^ -gravity center \
  -extent 560x560 -strip "$here/og-portrait.jpg"

node --experimental-strip-types "$here/og.mjs" > "$here/og.svg" 2>/dev/null
rsvg-convert -w 1200 -h 630 -o "$here/og.tmp.png" "$here/og.svg"
magick "$here/og.tmp.png" -strip -colors 200 \
  -define png:compression-level=9 PNG8:"$here/../public/og.png"

rm -f "$here/og.tmp.png" "$here/og-portrait.jpg"
echo "public/og.png regenerated ($(stat -c%s "$here/../public/og.png") bytes)"
