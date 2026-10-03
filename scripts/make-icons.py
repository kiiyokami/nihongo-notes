# App icons in the study-notebook look: a cream page with ruled lines, a strip of washi tape,
# and に written in Klee One with a red-pen underline. Run from the project root after npm install.
# Needs Pillow; the font comes from @fontsource/klee-one in node_modules.
from PIL import Image, ImageDraw, ImageFont
import os

FONT = os.environ.get("ICON_FONT", "node_modules/@fontsource/klee-one/files/klee-one-japanese-600-normal.woff")
SHEET, INK, RED, LINE = "#fffdf8", "#2b2a28", "#c8372d", "#e3dccd"
TAPE, STRIPE = (243, 208, 214), (255, 255, 255, 70)  # sakura tint, as in app.css


def tape(size, scale):
    # a strip of washi tape with diagonal stripes, laid across the top of the page at a slight angle
    w, h = int(size * 0.62 * scale), max(4, int(size * 0.13 * scale))
    strip = Image.new("RGBA", (w, h), TAPE + (255,))
    d = ImageDraw.Draw(strip)
    step = max(3, h // 3)
    for x in range(-h, w + h, step * 2):
        d.polygon([(x, h), (x + h, 0), (x + h + step * 0.4, 0), (x + step * 0.4, h)], fill=STRIPE)
    return strip.rotate(4, expand=True, resample=Image.BICUBIC)


def icon(size, path, fill=0.62, ruled=True):
    # draw at 4x and scale down, so the curves stay smooth at small sizes
    s = size * 4
    img = Image.new("RGBA", (s, s), SHEET)
    draw = ImageDraw.Draw(img)
    if ruled:
        gap = s // 8
        for y in range(gap, s, gap):
            draw.line([(0, y), (s, y)], fill=LINE, width=max(2, s // 160))
    font = ImageFont.truetype(FONT, int(s * fill))
    box = draw.textbbox((0, 0), "に", font=font)
    w, h = box[2] - box[0], box[3] - box[1]
    x, y = (s - w) / 2 - box[0], (s - h) / 2 - box[1] - s * 0.03
    draw.text((x, y), "に", font=font, fill=INK)
    # the red-pen underline, a little wider than the letter and slightly tilted
    uy = y + box[3] + s * 0.06
    pen = max(4, int(s * 0.035))
    draw.line([((s - w) / 2 - s * 0.04, uy + s * 0.01), ((s + w) / 2 + s * 0.04, uy - s * 0.01)], fill=RED, width=pen)
    if size >= 64:
        strip = tape(s, fill / 0.62)
        img.alpha_composite(strip, (int((s - strip.width) / 2), int(s * 0.05)))
    out = img.convert("RGB").resize((size, size), Image.LANCZOS)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    out.save(path)


icon(32, "static/favicon.png", fill=0.78, ruled=False)
icon(192, "static/icons/icon-192.png")
icon(512, "static/icons/icon-512.png")
# maskable icons get cropped to a circle on some phones: keep the letter inside the middle 60%
icon(512, "static/icons/icon-512-maskable.png", fill=0.42)
print("icons written")
