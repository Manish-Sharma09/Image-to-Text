import * as UTIF from 'utif';
import { InputError } from '../errors';
import type { DecodedPage } from '../decode';
import { canvasToBlob } from '../decode';
import { fmt, i18n } from '../../i18n.svelte';

/** Every page of a (multi-page) TIFF becomes a PNG page. */
export async function decodeTiff(blob: Blob, name: string, room: number): Promise<DecodedPage[]> {
  const buf = await blob.arrayBuffer();
  let ifds: UTIF.IFD[];
  try {
    ifds = UTIF.decode(buf).filter((ifd) => (ifd.t256 as number[] | undefined)?.[0]);
  } catch (e) {
    console.warn('tiff decode failed', e);
    throw new InputError('decode', name);
  }
  const pages: DecodedPage[] = [];
  for (const [i, ifd] of ifds.slice(0, room).entries()) {
    UTIF.decodeImage(buf, ifd);
    const rgba = UTIF.toRGBA8(ifd);
    const w = ifd.width, h = ifd.height;
    const c = new OffscreenCanvas(w, h);
    c.getContext('2d')!.putImageData(new ImageData(new Uint8ClampedArray(rgba.buffer as ArrayBuffer, rgba.byteOffset, rgba.byteLength), w, h), 0, 0);
    pages.push({
      name: ifds.length > 1 ? fmt(i18n.t.names.filePage, { name, n: i + 1 }) : name,
      kind: 'tiff',
      blob: await canvasToBlob(c),
      width: w,
      height: h,
    });
  }
  if (!pages.length) throw new InputError('decode', name);
  return pages;
}
