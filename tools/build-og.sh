#!/usr/bin/env sh
# Regenerate public/og.png from tools/og.svg after editing the tagline.
# Needs rsvg-convert (librsvg) and magick (ImageMagick), plus the
# JetBrains Mono and Signika Negative fonts installed system-wide.
set -eu
here=$(dirname "$0")
rsvg-convert -w 1200 -h 630 -o "$here/../public/og.tmp.png" "$here/og.svg"
magick "$here/../public/og.tmp.png" -strip -colors 128 \
  -define png:compression-level=9 PNG8:"$here/../public/og.png"
rm -f "$here/../public/og.tmp.png"
echo "public/og.png regenerated"
