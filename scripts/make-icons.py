# Placeholder app icons: the にほんご wordmark, white on black. Replace the PNGs with real art any time.
# Needs Pillow and a Japanese font; Noto Sans CJK is the default on most Linux systems.
from PIL import Image, ImageDraw, ImageFont
import os

FONT = os.environ.get("ICON_FONT", "/usr/share/fonts/google-noto-sans-cjk-vf-fonts/NotoSansCJK-VF.ttc")


def icon(size, path, fill=0.78):
    img = Image.new("RGB", (size, size), "black")
    draw = ImageDraw.Draw(img)
    text = "にほんご"
    font_size = size
    while True:
        font = ImageFont.truetype(FONT, font_size, index=0)
        try:
            font.set_variation_by_name("Bold")
        except Exception:
            pass
        box = draw.textbbox((0, 0), text, font=font)
        if box[2] - box[0] <= size * fill:
            break
        font_size -= 2
    w, h = box[2] - box[0], box[3] - box[1]
    draw.text(((size - w) / 2 - box[0], (size - h) / 2 - box[1]), text, font=font, fill="white")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path)


icon(32, "static/favicon.png", fill=0.95)
icon(192, "static/icons/icon-192.png")
icon(512, "static/icons/icon-512.png")
# maskable icons get cropped to a circle on some phones: keep the text inside the middle 60%
icon(512, "static/icons/icon-512-maskable.png", fill=0.6)
print("icons written")
