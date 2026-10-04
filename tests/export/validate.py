#!/usr/bin/env python3
"""Validates the files tests/export/run.ts writes (stdlib only).

python3 tests/export/validate.py [node_modules/.cache/export-out]

- docx/xlsx: every XML part parses, [Content_Types].xml covers every part,
  relationship targets exist, schema-ordered children are in order, styles,
  numbering and shared-string references resolve, sheet names are legal.
- pdf: xref offsets point at "N 0 obj", startxref points at the xref table,
  stream /Length values are exact, page counts match, and the expected text
  can be pulled out of the content streams (WinAnsi literals or UTF-16 hex).
- html/json/csv: parse, tags balance, CSV rows are rectangular per section.
"""

import csv
import io
import json
import os
import posixpath
import re
import subprocess
import sys
import unicodedata
import zipfile
import zlib
from html.parser import HTMLParser
from xml.etree import ElementTree as ET

OUT = sys.argv[1] if len(sys.argv) > 1 else 'node_modules/.cache/export-out'
W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
S = '{http://schemas.openxmlformats.org/spreadsheetml/2006/main}'
CT = '{http://schemas.openxmlformats.org/package/2006/content-types}'
PR = '{http://schemas.openxmlformats.org/package/2006/relationships}'
XML_SPACE = '{http://www.w3.org/XML/1998/namespace}space'

errors = []


def fail(path, msg):
    errors.append(f'{os.path.basename(path)}: {msg}')


def check_order(path, el, order, ns):
    """Children of `el` must follow the schema sequence `order`."""
    names = [c.tag.replace(ns, '') for c in el]
    idx = []
    for n in names:
        if n not in order:
            fail(path, f'unexpected <{n}> in <{el.tag.replace(ns, "")}>')
            return
        idx.append(order.index(n))
    if idx != sorted(idx):
        fail(path, f'bad child order in <{el.tag.replace(ns, "")}>: {names}')


# ------------------------------------------------------------------ OOXML

def check_package(path):
    z = zipfile.ZipFile(path)
    names = z.namelist()
    if names[0] != '[Content_Types].xml':
        fail(path, f'first entry is {names[0]}')
    parts = {}
    for n in names:
        if n.endswith('.xml') or n.endswith('.rels'):
            try:
                parts[n] = ET.fromstring(z.read(n))
            except ET.ParseError as e:
                fail(path, f'{n} does not parse: {e}')
    types = parts['[Content_Types].xml']
    defaults = {d.get('Extension').lower() for d in types.findall(f'{CT}Default')}
    overrides = {o.get('PartName').lstrip('/') for o in types.findall(f'{CT}Override')}
    for n in names:
        if n == '[Content_Types].xml':
            continue
        if n not in overrides and n.rsplit('.', 1)[-1].lower() not in defaults:
            fail(path, f'no content type for {n}')
    for o in overrides:
        if o not in names:
            fail(path, f'override for missing part {o}')
    for n, root in parts.items():
        if not n.endswith('.rels'):
            continue
        base = posixpath.dirname(posixpath.dirname(n))
        for rel in root.findall(f'{PR}Relationship'):
            target = posixpath.normpath(posixpath.join(base, rel.get('Target')))
            if target not in names:
                fail(path, f'{n}: target {target} missing')
    return z, parts


PPR = ['pStyle', 'keepNext', 'keepLines', 'pageBreakBefore', 'framePr', 'widowControl', 'numPr', 'suppressLineNumbers',
       'pBdr', 'shd', 'tabs', 'suppressAutoHyphens', 'kinsoku', 'wordWrap', 'overflowPunct', 'topLinePunct', 'autoSpaceDE',
       'autoSpaceDN', 'bidi', 'adjustRightInd', 'snapToGrid', 'spacing', 'ind', 'contextualSpacing', 'mirrorIndents',
       'suppressOverlap', 'jc', 'textDirection', 'textAlignment', 'textboxTightWrap', 'outlineLvl', 'divId', 'cnfStyle',
       'rPr', 'sectPr', 'pPrChange']
RPR = ['rStyle', 'rFonts', 'b', 'bCs', 'i', 'iCs', 'caps', 'smallCaps', 'strike', 'dstrike', 'outline', 'shadow', 'emboss',
       'imprint', 'noProof', 'snapToGrid', 'vanish', 'webHidden', 'color', 'spacing', 'w', 'kern', 'position', 'sz', 'szCs',
       'highlight', 'u', 'effect', 'bdr', 'shd', 'fitText', 'vertAlign', 'rtl', 'cs', 'em', 'lang', 'eastAsianLayout',
       'specVanish', 'oMath']
TBLPR = ['tblStyle', 'tblpPr', 'tblOverlap', 'bidiVisual', 'tblStyleRowBandSize', 'tblStyleColBandSize', 'tblW', 'jc',
         'tblCellSpacing', 'tblInd', 'tblBorders', 'shd', 'tblLayout', 'tblCellMar', 'tblLook']
TCPR = ['cnfStyle', 'tcW', 'gridSpan', 'hMerge', 'vMerge', 'tcBorders', 'shd', 'noWrap', 'tcMar', 'textDirection',
        'tcFitText', 'vAlign', 'hideMark']
BORDERS = ['top', 'left', 'start', 'bottom', 'right', 'end', 'insideH', 'insideV']
STYLE = ['name', 'aliases', 'basedOn', 'next', 'link', 'autoRedefine', 'hidden', 'uiPriority', 'semiHidden',
         'unhideWhenUsed', 'qFormat', 'locked', 'personal', 'personalCompose', 'personalReply', 'rsid', 'pPr', 'rPr',
         'tblPr', 'trPr', 'tcPr', 'tblStylePr']
LVL = ['start', 'numFmt', 'lvlRestart', 'pStyle', 'isLgl', 'suff', 'lvlText', 'lvlPicBulletId', 'legacy', 'lvlJc', 'pPr', 'rPr']


def check_docx(path):
    z, parts = check_package(path)
    doc = parts['word/document.xml']
    styles = parts['word/styles.xml']
    numbering = parts['word/numbering.xml']
    style_ids = {s.get(f'{W}styleId') for s in styles.iter(f'{W}style')}
    for s in styles.iter(f'{W}style'):
        check_order(path, s, STYLE, W)
    for tag, order in (('pPr', PPR), ('rPr', RPR), ('tblPr', TBLPR), ('tcPr', TCPR), ('tblBorders', BORDERS)):
        for root in (doc, styles, numbering):
            for el in root.iter(f'{W}{tag}'):
                check_order(path, el, order, W)
    for lvl in numbering.iter(f'{W}lvl'):
        check_order(path, lvl, LVL, W)
    kinds = [c.tag.replace(W, '') for c in numbering]
    if kinds != sorted(kinds, key=lambda k: 0 if k == 'abstractNum' else 1):
        fail(path, 'w:num before w:abstractNum')
    abstract_ids = {a.get(f'{W}abstractNumId') for a in numbering.iter(f'{W}abstractNum')}
    num_ids = set()
    for n in numbering.iter(f'{W}num'):
        num_ids.add(n.get(f'{W}numId'))
        if n.find(f'{W}abstractNumId').get(f'{W}val') not in abstract_ids:
            fail(path, 'w:num points at a missing abstractNum')
    for ps in doc.iter(f'{W}pStyle'):
        if ps.get(f'{W}val') not in style_ids:
            fail(path, f'unknown style {ps.get(f"{W}val")}')
    for ts in doc.iter(f'{W}tblStyle'):
        if ts.get(f'{W}val') not in style_ids:
            fail(path, f'unknown table style {ts.get(f"{W}val")}')
    for ni in doc.iter(f'{W}numId'):
        if ni.get(f'{W}val') not in num_ids:
            fail(path, f'unknown numId {ni.get(f"{W}val")}')
    body = doc.find(f'{W}body')
    if body[-1].tag != f'{W}sectPr':
        fail(path, 'body does not end with sectPr')
    for tbl in doc.iter(f'{W}tbl'):
        kids = [c.tag.replace(W, '') for c in tbl]
        if kids[:2] != ['tblPr', 'tblGrid'] or set(kids[2:]) != {'tr'}:
            fail(path, f'bad table structure {kids[:4]}')
        cols = len(tbl.find(f'{W}tblGrid'))
        for tr in tbl.iter(f'{W}tr'):
            tcs = tr.findall(f'{W}tc')
            if len(tcs) != cols:
                fail(path, f'row has {len(tcs)} cells, grid has {cols}')
            for tc in tcs:
                if tc[-1].tag != f'{W}p':
                    fail(path, 'table cell does not end with a paragraph')
    for p in doc.iter(f'{W}p'):
        kids = [c.tag.replace(W, '') for c in p]
        if 'pPr' in kids and kids.index('pPr') != 0:
            fail(path, 'pPr is not the first child of w:p')
    for t in doc.iter(f'{W}t'):
        if t.text and t.text != t.text.strip() and t.get(XML_SPACE) != 'preserve':
            fail(path, 'w:t with edge whitespace lacks xml:space="preserve"')
    return doc


SHEET = ['sheetPr', 'dimension', 'sheetViews', 'sheetFormatPr', 'cols', 'sheetData', 'sheetCalcPr', 'sheetProtection',
         'protectedRanges', 'scenarios', 'autoFilter', 'sortState', 'dataConsolidate', 'customSheetViews', 'mergeCells',
         'phoneticPr', 'conditionalFormatting', 'dataValidations', 'hyperlinks', 'printOptions', 'pageMargins']
STYLESHEET = ['numFmts', 'fonts', 'fills', 'borders', 'cellStyleXfs', 'cellXfs', 'cellStyles', 'dxfs', 'tableStyles',
              'colors', 'extLst']


def col_index(ref):
    letters = re.match(r'[A-Z]+', ref).group(0)
    n = 0
    for ch in letters:
        n = n * 26 + ord(ch) - 64
    return n


def check_xlsx(path):
    z, parts = check_package(path)
    wb = parts['xl/workbook.xml']
    styles = parts['xl/styles.xml']
    sst = parts['xl/sharedStrings.xml']
    check_order(path, styles, STYLESHEET, S)
    strings = [''.join(t.text or '' for t in si.iter(f'{S}t')) for si in sst.findall(f'{S}si')]
    if int(sst.get('uniqueCount')) != len(strings):
        fail(path, 'sharedStrings uniqueCount mismatch')
    xfs = styles.find(f'{S}cellXfs').findall(f'{S}xf')
    if int(styles.find(f'{S}cellXfs').get('count')) != len(xfs):
        fail(path, 'cellXfs count mismatch')
    formats = {nf.get('numFmtId'): nf.get('formatCode') for nf in styles.iter(f'{S}numFmt')}
    for xf in xfs:
        fid = int(xf.get('numFmtId'))
        if fid >= 164 and str(fid) not in formats:
            fail(path, f'numFmtId {fid} undefined')
    seen = set()
    sheets = {}
    for sh in wb.iter(f'{S}sheet'):
        name = sh.get('name')
        if len(name) > 31 or re.search(r'[\[\]:*?/\\]', name) or name.lower() in seen or name.startswith("'"):
            fail(path, f'bad sheet name {name!r}')
        seen.add(name.lower())
    for n, root in parts.items():
        if not n.startswith('xl/worksheets/'):
            continue
        check_order(path, root, SHEET, S)
        rows = []
        last_r = 0
        for row in root.iter(f'{S}row'):
            r = int(row.get('r'))
            if r <= last_r:
                fail(path, f'{n}: rows out of order')
            last_r = r
            last_c = 0
            values = {}
            for c in row.findall(f'{S}c'):
                ref = c.get('r')
                if int(re.search(r'\d+', ref).group(0)) != r:
                    fail(path, f'{n}: cell {ref} in row {r}')
                ci = col_index(ref)
                if ci <= last_c:
                    fail(path, f'{n}: cells out of order in row {r}')
                last_c = ci
                if int(c.get('s', '0')) >= len(xfs):
                    fail(path, f'{n}: style index out of range')
                v = c.find(f'{S}v').text
                if c.get('t') == 's':
                    if int(v) >= len(strings):
                        fail(path, f'{n}: shared string index out of range')
                    values[ci] = strings[int(v)]
                else:
                    xf = xfs[int(c.get('s', '0'))]
                    fid = xf.get('numFmtId')
                    values[ci] = (float(v), formats.get(fid, f'builtin {fid}'))
            rows.append((r, values))
        sheets[n] = rows
    return sheets


# ------------------------------------------------------------------ PDF

def pdf_streams(path, data):
    """Checks the file structure; returns {obj number: (dict text, decoded stream bytes or None)}."""
    if not data.startswith(b'%PDF-1.'):
        fail(path, 'missing %PDF header')
    m = re.search(rb'startxref\s+(\d+)\s+%%EOF\s*$', data)
    if not m:
        fail(path, 'no startxref/%%EOF at end')
        return {}
    xref = int(m.group(1))
    if not data[xref:].startswith(b'xref'):
        fail(path, f'startxref {xref} does not point at xref')
        return {}
    lines = data[xref:].split(b'\n')
    first, count = map(int, lines[1].split())
    entries = data[xref + len(lines[0]) + len(lines[1]) + 2:]
    objs = {}
    for i in range(count):
        entry = entries[i * 20:(i + 1) * 20]
        if len(entry) != 20 or not entry.endswith(b' \n'):
            fail(path, f'xref entry {i} is not 20 bytes')
        off, gen, kind = entry[:10], entry[11:16], entry[17:18]
        n = first + i
        if kind == b'f':
            continue
        off = int(off)
        if not data[off:].startswith(f'{n} 0 obj'.encode()):
            fail(path, f'xref offset for object {n} points at {data[off:off + 12]!r}')
            continue
        end = data.index(b'endobj', off)
        body = data[off:end]
        s = body.find(b'stream\n')
        if s < 0:
            objs[n] = (body.decode('latin-1'), None)
            continue
        head = body[:s].decode('latin-1')
        length = int(re.search(r'/Length (\d+)', head).group(1))
        start = off + s + len(b'stream\n')
        raw = data[start:start + length]
        if data[start + length:start + length + 10] != b'\nendstream':
            fail(path, f'object {n}: /Length {length} does not end at endstream')
        if '/FlateDecode' in head:
            raw = zlib.decompress(raw)
        objs[n] = (head, raw)
    trailer = data[xref:].decode('latin-1')
    size = int(re.search(r'/Size (\d+)', trailer).group(1))
    if size != count:
        fail(path, f'/Size {size} but xref has {count} entries')
    pages = [n for n, (head, _) in objs.items() if re.search(r'/Type /Page\b(?!s)', head)]
    kids_count = [int(re.search(r'/Count (\d+)', head).group(1)) for head, _ in objs.values() if '/Type /Pages' in head]
    if kids_count and kids_count[0] != len(pages):
        fail(path, f'/Count {kids_count[0]} but {len(pages)} page objects')
    return objs


def unescape_literal(s):
    out = bytearray()
    i = 0
    while i < len(s):
        c = s[i]
        if c == '\\':
            nxt = s[i + 1]
            if nxt in '01234567':
                j = i + 1
                while j < len(s) and j < i + 4 and s[j] in '01234567':
                    j += 1
                out.append(int(s[i + 1:j], 8))
                i = j
                continue
            out.append(ord({'n': '\n', 'r': '\r', 't': '\t'}.get(nxt, nxt)))
            i += 2
            continue
        out.append(ord(c))
        i += 1
    return out.decode('cp1252')


def pdf_text(objs):
    """Text drawn with Tj: WinAnsi literal strings and UTF-16BE hex strings."""
    texts = []
    for head, raw in objs.values():
        if raw is None or b'Tj' not in raw:
            continue
        content = raw.decode('latin-1')
        for lit in re.findall(r'\(((?:\\.|[^\\)])*)\) Tj', content):
            texts.append(unescape_literal(lit))
        for hx in re.findall(r'<([0-9A-Fa-f]*)> Tj', content):
            texts.append(bytes.fromhex(hx).decode('utf-16-be'))
    return texts


def check_text_pdf(path, expected):
    data = open(path, 'rb').read()
    objs = pdf_streams(path, data)
    text = ' '.join(pdf_text(objs))
    for phrase in expected:
        if phrase not in text:
            fail(path, f'text {phrase!r} not found')
    return objs, text


def check_searchable_pdf(path, words):
    data = open(path, 'rb').read()
    objs = pdf_streams(path, data)
    images = [(h, raw) for h, raw in objs.values() if '/Subtype /Image' in h]
    if not images:
        fail(path, 'no image XObject')
    for h, raw in images:
        if '/DCTDecode' not in h or not raw.startswith(b'\xff\xd8') or not raw.rstrip(b'\x00').endswith(b'\xff\xd9'):
            fail(path, 'image is not an embedded JPEG')
    fonts = [raw for h, raw in objs.values() if '/Length1' in h]
    if not fonts or len(fonts[0]) != 573:
        fail(path, 'glyphless font program missing')
    if not any(raw and b'beginbfrange' in raw for _, raw in objs.values()):
        fail(path, 'ToUnicode CMap missing')
    if not any(raw and b'3 Tr' in raw for _, raw in objs.values()):
        fail(path, 'no invisible text (3 Tr)')
    found = set(t.strip() for t in pdf_text(objs))
    missing = [w for w in words if unicodedata.normalize('NFC', w).strip() and unicodedata.normalize('NFC', w).strip() not in found]
    if missing:
        fail(path, f'{len(missing)} words missing from text layer, e.g. {missing[:5]}')
    return found


# ------------------------------------------------------------------ HTML / CSV / JSON

class Balance(HTMLParser):
    VOID = {'meta', 'br', 'link', 'img', 'hr', 'input'}

    def __init__(self):
        super().__init__()
        self.stack = []
        self.bad = []

    def handle_starttag(self, tag, attrs):
        if tag not in self.VOID:
            self.stack.append(tag)

    def handle_endtag(self, tag):
        if not self.stack or self.stack[-1] != tag:
            self.bad.append(tag)
        else:
            self.stack.pop()


def check_html(path):
    p = Balance()
    p.feed(open(path, encoding='utf-8').read())
    if p.bad or p.stack:
        fail(path, f'unbalanced tags: {p.bad[:3]} open={p.stack[:3]}')


def check_csv(path):
    raw = open(path, 'rb').read()
    if not raw.startswith(b'\xef\xbb\xbf'):
        fail(path, 'no UTF-8 BOM')
    body = raw[3:]
    if body and (b'\n' in body.replace(b'\r\n', b'') and b'"' not in body):
        fail(path, 'bare LF line ending')
    return list(csv.reader(io.StringIO(body.decode('utf-8'), newline='')))


# ------------------------------------------------------------------ run

def main():
    expect = json.load(open(os.path.join(OUT, 'expect.json')))
    files = sorted(os.listdir(OUT))
    summary = []
    for f in files:
        path = os.path.join(OUT, f)
        if f.endswith('.docx'):
            check_docx(path)
        elif f.endswith('.xlsx'):
            check_xlsx(path)
        elif f.endswith('.html'):
            check_html(path)
        elif f.endswith('.json') and f != 'expect.json':
            json.load(open(path, encoding='utf-8'))
        elif f.endswith('.csv'):
            check_csv(path)
        elif f.endswith('.zip'):
            z = zipfile.ZipFile(path)
            if z.testzip() is not None:
                fail(path, 'corrupt zip')
            summary.append(f'{f}: {z.namelist()}')
            for n in z.namelist():
                if n.endswith('.docx'):
                    tmp = os.path.join(OUT, '_inner.docx')
                    open(tmp, 'wb').write(z.read(n))
                    check_docx(tmp)
                    os.remove(tmp)
        elif f.endswith('.pdf'):
            if f in expect['words']:
                found = check_searchable_pdf(path, expect['words'][f])
                summary.append(f'{f}: {len(found)} words in invisible layer')
            else:
                objs, text = check_text_pdf(path, [])
                pages = sum(1 for h, _ in objs.values() if re.search(r'/Type /Page\b(?!s)', h))
                summary.append(f'{f}: {pages} page(s), {len(text)} chars of text')

    # Content checks on specific outputs.
    check_text_pdf(os.path.join(OUT, 'document.pdf.pdf'), [
        'Project kickoff & next steps', 'Café', '“smart quotes”', '€42', '(parentheses)', 'back\\slashes', '3.', 'b)',
        'Page 1 of 1'])
    check_text_pdf(os.path.join(OUT, 'table.pdf.pdf'), ['Regional orders, Q1 2026', '$96,300', '¥1,234,567', 'Multi-line'])
    check_text_pdf(os.path.join(OUT, 'code.pdf.pdf'), ['        if line.startswith("#"):', '        out.append(line)'])
    check_text_pdf(os.path.join(OUT, 'receipt.pdf.pdf'), ['Harbor Light Café', 'Unit price', '$40.39'])
    for name in expect['printFallback']:
        if not os.path.exists(os.path.join(OUT, name.replace('.pdf', '.pdf.print.html'))):
            fail(name, 'expected print fallback')

    sheets = check_xlsx(os.path.join(OUT, 'table.xlsx.xlsx'))
    rows = dict(next(iter(sheets.values())))
    expect_cells = {
        (3, 2): (96300.0, '"$"#,##0'), (3, 3): (1284.0, 'builtin 3'), (3, 4): (0.124, '0.0%'),
        (4, 2): (1050.0, '"€"#,##0.00'), (4, 4): (-0.03, 'builtin 9'), (6, 3): (-1118.0, '#,##0;(#,##0)'),
    }
    for (r, c), want in expect_cells.items():
        got = rows[r].get(c)
        if got != want:
            fail('table.xlsx.xlsx', f'cell r{r}c{c}: {got!r} != {want!r}')
    if rows[4][5] != 'EU format 1.234,56 stays text' or rows[1][1] != 'Regional orders, Q1 2026':
        fail('table.xlsx.xlsx', 'text cells changed')

    rows = check_csv(os.path.join(OUT, 'receipt.csv.csv'))
    if rows[0] != ['Description', 'Qty', 'Unit price', 'Amount'] or rows[4] != [] or rows[5] != ['Field', 'Value']:
        fail('receipt.csv.csv', f'unexpected layout {rows[:6]}')

    # macOS converters as an independent reader of the .docx files.
    for f in ('document.docx.docx', 'hindi.docx.docx', 'multi.docx.docx'):
        try:
            txt = subprocess.run(['textutil', '-convert', 'txt', '-stdout', os.path.join(OUT, f)],
                                 capture_output=True, text=True, check=True).stdout
        except (OSError, subprocess.CalledProcessError) as e:
            summary.append(f'textutil unavailable: {e}')
            break
        summary.append(f'textutil {f}: {len(txt)} chars')
        for phrase in {'document.docx.docx': ['Project kickoff & next steps', 'continued on a second line', 'Celebrate'],
                       'hindi.docx.docx': ['सामुदायिक पुस्तकालय में आपका स्वागत है', 'Opening hours'],
                       'multi.docx.docx': ['Regional orders, Q1 2026', '$96,300', 'def parse', 'Harbor Light Café']}[f]:
            if phrase not in txt:
                fail(f, f'textutil output lacks {phrase!r}')

    print('\n'.join(summary))
    if errors:
        print(f'\n{len(errors)} problem(s):')
        print('\n'.join(errors))
        sys.exit(1)
    print(f'\nAll {len(files)} outputs valid.')


main()
