# Builds slides.pptx from .check/pptx/NN.png (run `node tools/shots.js` first).
# Static image slides, "push up" transition, and a red "Live presentation" link box on slide 1.
import glob, os
from pptx import Presentation
from pptx.util import Emu, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from lxml import etree

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LIVE = "https://abdullamuizfuad.github.io/GEO-Visibility-/"
W, H = Emu(12192000), Emu(6858000)  # 16:9

prs = Presentation()
prs.slide_width, prs.slide_height = W, H
blank = prs.slide_layouts[6]
TRANS = ('<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="med">'
         '<p:push dir="u"/></p:transition>')

for i, f in enumerate(sorted(glob.glob(os.path.join(ROOT, ".check", "pptx", "*.png")))):
    s = prs.slides.add_slide(blank)
    s.shapes.add_picture(f, 0, 0, W, H)
    if i == 0:
        bw, bh = Emu(int(W * 0.185)), Emu(int(H * 0.085))
        box = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Emu(int(W * 0.392)), Emu(int(H * 0.795)), bw, bh)
        box.fill.solid(); box.fill.fore_color.rgb = RGBColor(0xC0, 0x39, 0x2B)
        box.line.fill.background()
        box.click_action.hyperlink.address = LIVE
        tf = box.text_frame; tf.vertical_anchor = MSO_ANCHOR.MIDDLE
        para = tf.paragraphs[0]; para.alignment = PP_ALIGN.CENTER
        r = para.add_run(); r.text = "Live presentation →"
        r.font.bold = True; r.font.size = Pt(18); r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    # transition must sit after <p:clrMapOvr> and before <p:timing>
    el = etree.fromstring(TRANS); sld = s._element
    anchor = sld.find('{http://schemas.openxmlformats.org/presentationml/2006/main}clrMapOvr')
    (anchor.addnext(el) if anchor is not None else sld.append(el))

out = os.path.join(ROOT, "slides.pptx"); prs.save(out)
print(len(prs.slides), "slides ->", out)
