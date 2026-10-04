// Bundles tests/run-samples.ts with esbuild and runs it in Node.
import { build } from 'esbuild';
import { spawnSync } from 'node:child_process';
await build({
  entryPoints: ['tests/run-samples.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: 'node_modules/.cache/run-samples.mjs',
  external: ['tesseract.js'],
  logLevel: 'warning',
});
const args = process.argv.slice(2);
const r = spawnSync('node', ['node_modules/.cache/run-samples.mjs', ...(args.length ? args : ['receipt', 'table', 'code', 'handwriting', 'document', 'chat', 'mixed-hindi'])], { stdio: 'inherit' });
process.exit(r.status ?? 1);
