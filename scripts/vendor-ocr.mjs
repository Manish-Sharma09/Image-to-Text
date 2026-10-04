// Copies the Tesseract.js worker and WASM cores into public/ so OCR code is
// served from our own origin instead of a third-party CDN.
import { cpSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public', 'vendor', 'tesseract');
const coreDir = join(root, 'node_modules', 'tesseract.js-core');
const worker = join(root, 'node_modules', 'tesseract.js', 'dist', 'worker.min.js');

mkdirSync(out, { recursive: true });
cpSync(worker, join(out, 'worker.min.js'));
for (const file of readdirSync(coreDir)) {
  if (file.endsWith('.wasm.js')) cpSync(join(coreDir, file), join(out, file));
}
if (!existsSync(join(out, 'tesseract-core-simd-lstm.wasm.js'))) {
  console.error('vendor-ocr: tesseract cores missing — is tesseract.js installed?');
  process.exit(1);
}
console.log('vendor-ocr: copied Tesseract worker and cores to public/vendor/tesseract');
