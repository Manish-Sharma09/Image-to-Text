// "Copy link" packs the text into the URL fragment (after #). Fragments are
// never sent to servers, so sharing uploads nothing.
// fflate is loaded on demand so the main bundle stays small.

import { localizePath } from '../../i18n/config';
import { i18n } from '../i18n.svelte';

export const MAX_SHARE_CHARS = 60_000;

function toBase64Url(bytes: Uint8Array): string {
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(s: string): Uint8Array {
  const b = atob(s.replace(/-/g, '+').replace(/_/g, '/'));
  const out = new Uint8Array(b.length);
  for (let i = 0; i < b.length; i++) out[i] = b.charCodeAt(i);
  return out;
}

export interface SharedText {
  title: string;
  text: string;
  mode: string;
}

export async function encodeShare(data: SharedText): Promise<string | null> {
  const { deflateSync, strToU8 } = await import('fflate');
  const packed = toBase64Url(deflateSync(strToU8(JSON.stringify(data)), { level: 9 }));
  if (packed.length > MAX_SHARE_CHARS) return null;
  // The share page opens in the language of the page the link was made on.
  return `${location.origin}${localizePath('/share', i18n.lang)}#v1.${packed}`;
}

export async function decodeShare(hash: string): Promise<SharedText | null> {
  const m = hash.match(/^#?v1\.([A-Za-z0-9_-]+)$/);
  if (!m) return null;
  try {
    const { inflateSync, strFromU8 } = await import('fflate');
    const data = JSON.parse(strFromU8(inflateSync(fromBase64Url(m[1]))));
    if (typeof data?.text !== 'string') return null;
    return { title: String(data.title ?? ''), text: data.text, mode: String(data.mode ?? 'plain') };
  } catch {
    return null;
  }
}
