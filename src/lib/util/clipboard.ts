/** Copies plain text, plus HTML when given, so pasting into Docs/Sheets keeps structure. */
export async function copyRich(text: string, html?: string): Promise<boolean> {
  try {
    if (html && 'ClipboardItem' in window && navigator.clipboard?.write) {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/plain': new Blob([text], { type: 'text/plain' }),
          'text/html': new Blob([html], { type: 'text/html' }),
        }),
      ]);
      return true;
    }
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for browsers without async clipboard permission.
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}

/** Reads images from the clipboard (needs a user gesture in most browsers). */
export async function readClipboardImages(): Promise<Blob[]> {
  if (!navigator.clipboard?.read) return [];
  const items = await navigator.clipboard.read();
  const out: Blob[] = [];
  for (const item of items) {
    const type = item.types.find((t) => t.startsWith('image/'));
    if (type) out.push(await item.getType(type));
  }
  return out;
}

/** Image files from a paste or drop event. */
export function imagesFromTransfer(dt: DataTransfer | null): File[] {
  if (!dt) return [];
  const files: File[] = [];
  for (const item of dt.items ?? []) {
    if (item.kind === 'file') {
      const f = item.getAsFile();
      if (f) files.push(f);
    }
  }
  if (!files.length && dt.files?.length) files.push(...dt.files);
  return files;
}
