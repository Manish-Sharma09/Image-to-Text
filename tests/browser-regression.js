// Browser regression check. With the dev server running, paste into the
// console on http://localhost:4321/ (dev builds expose window.__copyable),
// or run: agent-browser eval --stdin < tests/browser-regression.js
(async () => {
  const { workspace } = window.__copyable;
  const names = ['receipt', 'table', 'code', 'handwriting', 'document', 'chat', 'mixed-hindi'];
  workspace.clear();
  for (const n of names) await workspace.addSample(n);
  const t0 = Date.now();
  while (workspace.busy && Date.now() - t0 < 120000) await new Promise(r => setTimeout(r, 500));
  return workspace.pages.map(p => `${p.name} | ${p.detection?.label} | conf ${p.result?.conf?.toFixed(0)} | scale ${p.steps?.scale} | ${(p.mode==='table'? p.table.rows.map(r=>r.map(c=>c.text).join(' | ')).join(' // ') : p.mode==='receipt' ? p.receipt.fields.map(f=>f.label+'='+f.value).join('; ') + ' ITEMS ' + p.receipt.items.map(i=>i.qty+'x '+i.description+' '+i.amount).join('; ') : p.text).replace(/\n/g,' ⏎ ').slice(0, 400)}`).join('\n\n');
})()
