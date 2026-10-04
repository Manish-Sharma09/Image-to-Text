// Bundles tests/*.test.ts with esbuild and runs them with node --test.
import { build } from 'esbuild';
import { readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const entries = readdirSync('tests').filter((f) => f.endsWith('.test.ts')).map((f) => `tests/${f}`);
await build({
  entryPoints: entries,
  bundle: true,
  platform: 'node',
  format: 'esm',
  outdir: '.cache/tests',
  outExtension: { '.js': '.mjs' },
  logLevel: 'warning',
});
const files = entries.map((e) => `.cache/tests/${e.replace(/^tests\//, '').replace(/\.ts$/, '.mjs')}`);
const r = spawnSync('node', ['--test', ...files], { stdio: 'inherit' });
process.exit(r.status ?? 1);
