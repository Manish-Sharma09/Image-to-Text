// File names that are safe on Windows, macOS, Linux and inside zip files.

const FALLBACK = 'extracted-text';
const MAX_LENGTH = 100;
// Device names Windows refuses as file names, with or without an extension.
const RESERVED = /^(con|prn|aux|nul|com\d|lpt\d)$/i;

export function safeFilename(name: string): string {
  let s = name
    .normalize('NFC')
    .replace(/[\\/:*?"<>|\u0000-\u001F\u007F]+/g, '-')
    .replace(/\s+/g, ' ')
    .replace(/-{2,}/g, '-')
    .replace(/^[\s.-]+|[\s.-]+$/g, '');
  // Trim by code point so a surrogate pair is never split.
  const chars = Array.from(s);
  if (chars.length > MAX_LENGTH) s = chars.slice(0, MAX_LENGTH).join('').replace(/[\s.]+$/, '');
  if (!s) return FALLBACK;
  return RESERVED.test(s) ? `${s}_` : s;
}

/** Returns `name.ext`, adding " (2)", " (3)"… when the name is already used (case-insensitively). */
export function uniqueFilename(base: string, ext: string, used: Set<string>): string {
  let name = `${base}.${ext}`;
  for (let n = 2; used.has(name.toLowerCase()); n++) name = `${base} (${n}).${ext}`;
  used.add(name.toLowerCase());
  return name;
}
