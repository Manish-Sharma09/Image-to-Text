import { InputError } from '../errors';
import { canvasToBlob } from '../decode';

// libheif is LGPL and ~1.4 MB, so it is loaded from a pinned CDN build only
// when a HEIC photo arrives in a browser that can't decode it natively. Only
// the decoder code is downloaded; the photo itself never leaves the device.
const LIBHEIF = 'https://cdn.jsdelivr.net/npm/libheif-js@1.23.2/libheif-wasm/libheif-bundle.mjs';

interface HeifImage {
  get_width(): number;
  get_height(): number;
  display(img: ImageData, cb: (d: ImageData | null) => void): void;
}

export async function decodeHeicFile(blob: Blob): Promise<{ blob: Blob; width: number; height: number }> {
  let lib: { HeifDecoder: new () => { decode(buf: Uint8Array): HeifImage[] } };
  try {
    const mod = await import(/* @vite-ignore */ LIBHEIF);
    lib = (mod.default ?? mod) as typeof lib;
    if (typeof (lib as unknown as () => unknown) === 'function') lib = (lib as unknown as () => typeof lib)();
  } catch {
    throw new InputError('decode');
  }
  const images = new lib.HeifDecoder().decode(new Uint8Array(await blob.arrayBuffer()));
  const image = images[0];
  if (!image) throw new InputError('decode');
  const w = image.get_width(), h = image.get_height();
  const c = new OffscreenCanvas(w, h);
  const ctx = c.getContext('2d')!;
  const data = ctx.createImageData(w, h);
  await new Promise<void>((resolve, reject) =>
    image.display(data, (d) => (d ? resolve() : reject(new InputError('decode')))),
  );
  ctx.putImageData(data, 0, 0);
  return { blob: await canvasToBlob(c, 'image/jpeg', 0.92), width: w, height: h };
}
