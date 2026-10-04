// Dev harness: OCR the sample images in Node and print what each formatter
// and the detector produce. Run with: node scripts/dev-samples.mjs
import { createWorker } from 'tesseract.js';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { normalizeTesseract } from '../src/lib/ocr/normalize';
import { format, detect, MODES } from '../src/lib/layout/index';

const names = process.argv.slice(2);
const langsFor: Record<string, string[]> = { 'mixed-hindi': ['eng', 'hin'] };
mkdirSync('tests/fixtures', { recursive: true });

for (const name of names) {
  const langs = langsFor[name] ?? ['eng'];
  const worker = await createWorker(langs, 1, { cachePath: 'node_modules/.cache/tessdata' });
  await worker.setParameters({ tessedit_pageseg_mode: (process.env.PSM ?? '3') as never, user_defined_dpi: '300' });
  const buf = readFileSync(`public/samples/${name}.png`);
  const t0 = Date.now();
  const { data } = await worker.recognize(buf, {}, { blocks: true, text: true });
  await worker.terminate();
  const w = buf.readUInt32BE(16), h = buf.readUInt32BE(20);
  const page = normalizeTesseract(data as never, { scale: 1, width: w, height: h, languages: langs, durationMs: Date.now() - t0 });
  writeFileSync(`tests/fixtures/${name}.json`, JSON.stringify(page));
  const det = detect(page, null);
  console.log(`\n================ ${name} (${page.durationMs} ms, conf ${page.conf.toFixed(1)}) → ${det.label} [${det.mode}]`);
  console.log('scores', JSON.stringify(Object.fromEntries(Object.entries(det.scores).map(([k, v]) => [k, +(v as number).toFixed(2)]))));
  const show = process.env.ALL ? MODES.map((m) => m.id) : [det.mode];
  for (const mode of show) {
    const f = format(page, mode);
    console.log(`--- ${mode}`);
    console.log(f.text);
    if (f.table) console.log('table header:', f.table.header, 'cols:', f.table.rows[0]?.length);
    if (f.receipt) console.log(JSON.stringify({ ...f.receipt, fields: f.receipt.fields.map((x) => `${x.label}=${x.value}`), items: f.receipt.items.map((i) => `${i.qty}|${i.description}|${i.unitPrice}|${i.amount}`) }, null, 1));
    if (f.code) console.log('lang:', f.code.language);
    if (f.notes.length) console.log('notes:', f.notes);
  }
}
