"""Prepare a photo for the Misc page.

Usage: python3 bin/prep_photo.py INPUT OUTPUT.jpg
       (HEIC: convert first with `sips -s format jpeg IN.HEIC --out IN.jpg`)

- applies the EXIF orientation, then drops all metadata (EXIF, GPS, camera info)
- center-crops to 4:3 landscape so every gallery photo has the same shape
- resizes to at most 1800x1350 and saves a progressive JPEG at quality 82
"""
import sys

from PIL import Image, ImageOps

RATIO = 4 / 3

src, dst = sys.argv[1], sys.argv[2]
with Image.open(src) as im:
    im = ImageOps.exif_transpose(im).convert("RGB")
    w, h = im.size
    if w / h > RATIO:  # too wide: trim the sides
        new_w = round(h * RATIO)
        left = (w - new_w) // 2
        im = im.crop((left, 0, left + new_w, h))
    else:  # too tall: trim top and bottom
        new_h = round(w / RATIO)
        top = (h - new_h) // 2
        im = im.crop((0, top, w, top + new_h))
    im.thumbnail((1800, 1350), Image.LANCZOS)
    # Re-create the image from raw pixels so no metadata can ride along.
    clean = Image.new("RGB", im.size)
    clean.putdata(list(im.getdata()))
    clean.save(dst, "JPEG", quality=82, optimize=True, progressive=True)
    print(f"{dst}: {clean.size[0]}x{clean.size[1]}")
