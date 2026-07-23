#!/usr/bin/env bash
# Optimize images and videos for faster page loads.
# Prefer originals in backups/images-original-backup if present.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

optimize_still() {
  local src="$1"
  local max_w="$2"
  local q="$3"
  local dest="$4"
  ffmpeg -y -i "$src" -vf "scale=min(${max_w}\,iw):-2" -q:v "$q" "$dest" 2>/dev/null
}

HERO_SRC=public/images/gallery/IMG_3728.png
if [ ! -f "$HERO_SRC" ] && [ -f backups/images-original-backup/IMG_3728.png ]; then
  HERO_SRC=backups/images-original-backup/IMG_3728.png
fi

ESTRO_SRC=public/images/services/tours-porvenir/entrada_estromatolitos.png
if [ ! -f "$ESTRO_SRC" ] && [ -f backups/images-original-backup/entrada_estromatolitos.png ]; then
  ESTRO_SRC=backups/images-original-backup/entrada_estromatolitos.png
fi

echo "==> Hero → JPEG"
optimize_still "$HERO_SRC" 1920 4 public/images/gallery/IMG_3728.jpg

echo "==> Logo → PNG pequeño"
sips -Z 240 public/images/logo/tanu.png --out /tmp/tanu-opt.png >/dev/null
ffmpeg -y -i /tmp/tanu-opt.png -compression_level 9 public/images/logo/tanu.png 2>/dev/null

echo "==> Poster estromatolitos → JPEG"
optimize_still "$ESTRO_SRC" 1280 4 public/images/services/tours-porvenir/entrada_estromatolitos.jpg

echo "==> Gallery thumbs"
THUMBS=public/images/gallery/momentos-inolvidables/thumbs
mkdir -p "$THUMBS"
shopt -s nullglob
for f in public/images/gallery/momentos-inolvidables/*.{jpg,jpeg,JPG,JPEG}; do
  name="$(basename "${f%.*}")"
  optimize_still "$f" 480 5 "$THUMBS/${name}.jpg"
done

echo "==> Compress gallery fulls >400KB"
for f in public/images/gallery/momentos-inolvidables/*.{jpg,jpeg}; do
  [ -f "$f" ] || continue
  size=$(stat -f%z "$f" 2>/dev/null || stat -c%s "$f")
  if [ "$size" -gt 400000 ]; then
    tmp="/tmp/opt-gal-$(basename "$f")"
    optimize_still "$f" 1600 5 "$tmp"
    mv "$tmp" "$f"
  fi
done

echo "==> Compress service images >350KB"
find public/images/services -type f \( -iname '*.jpg' -o -iname '*.jpeg' \) -print0 |
while IFS= read -r -d '' f; do
  size=$(stat -f%z "$f" 2>/dev/null || stat -c%s "$f")
  if [ "$size" -gt 350000 ]; then
    tmp="/tmp/opt-svc-$(basename "$f")"
    optimize_still "$f" 1400 5 "$tmp"
    mv "$tmp" "$f"
  fi
done

echo "==> Videos → 720p H.264 +faststart"
mkdir -p backups/videos-original-backup
for f in public/videos/*.mp4; do
  [ -f "$f" ] || continue
  name="$(basename "$f")"
  # Prefer recompressing from original backup when available
  src="$f"
  if [ -f "backups/videos-original-backup/$name" ]; then
    src="backups/videos-original-backup/$name"
  else
    cp "$f" "backups/videos-original-backup/$name"
  fi
  out="/tmp/vid-$name"
  echo "    compressing $name ..."
  ffmpeg -y -i "$src" \
    -vf "scale=min(1280\,iw):-2" \
    -c:v libx264 -crf 28 -preset medium -pix_fmt yuv420p \
    -c:a aac -b:a 96k -ac 2 \
    -movflags +faststart \
    "$out" 2>/dev/null
  mv "$out" "$f"
done

echo "==> Done"
du -sh public/images public/videos
