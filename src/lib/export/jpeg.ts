// JPEG handling for the searchable PDF: PDF viewers decode JPEG natively
// (DCTDecode), so a JPEG is embedded as-is; anything else is re-encoded.

export interface JpegInfo {
  width: number;
  height: number;
  components: number;
  /** Adobe APP14 marker present (CMYK JPEGs from Adobe tools store inverted values). */
  adobe: boolean;
  /** EXIF orientation, 1 when absent. PDF viewers ignore it. */
  orientation: number;
}

const u16 = (b: Uint8Array, i: number, le = false) => (le ? b[i] | (b[i + 1] << 8) : (b[i] << 8) | b[i + 1]);
const u32 = (b: Uint8Array, i: number, le = false) =>
  le ? (b[i] | (b[i + 1] << 8) | (b[i + 2] << 16) | (b[i + 3] << 24)) >>> 0 : ((b[i] << 24) | (b[i + 1] << 16) | (b[i + 2] << 8) | b[i + 3]) >>> 0;

/** Orientation tag (0x0112) from an APP1 "Exif" segment's TIFF data. */
function exifOrientation(b: Uint8Array, tiff: number, end: number): number {
  if (tiff + 8 > end) return 1;
  const le = b[tiff] === 0x49; // "II" = little-endian
  const ifd = tiff + u32(b, tiff + 4, le);
  if (ifd + 2 > end) return 1;
  const count = u16(b, ifd, le);
  for (let k = 0; k < count; k++) {
    const e = ifd + 2 + k * 12;
    if (e + 12 > end) break;
    if (u16(b, e, le) === 0x0112) return u16(b, e + 8, le) || 1;
  }
  return 1;
}

/** Reads the frame header of a baseline or progressive JPEG; null if the bytes aren't a JPEG. */
export function readJpegInfo(b: Uint8Array): JpegInfo | null {
  if (b.length < 4 || b[0] !== 0xff || b[1] !== 0xd8) return null;
  let adobe = false;
  let orientation = 1;
  let i = 2;
  while (i + 4 <= b.length) {
    if (b[i] !== 0xff) return null;
    const marker = b[i + 1];
    if (marker === 0xff) {
      i++; // fill byte
      continue;
    }
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      i += 2;
      continue;
    }
    const len = u16(b, i + 2);
    const start = i + 4;
    const end = Math.min(b.length, i + 2 + len);
    if (marker === 0xe1 && b[start] === 0x45 && b[start + 1] === 0x78 && b[start + 2] === 0x69 && b[start + 3] === 0x66) {
      orientation = exifOrientation(b, start + 6, end);
    } else if (marker === 0xee && String.fromCharCode(...b.subarray(start, start + 5)) === 'Adobe') {
      adobe = true;
    } else if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      if (start + 6 > b.length) return null;
      return { height: u16(b, start + 1), width: u16(b, start + 3), components: b[start + 5], adobe, orientation };
    } else if (marker === 0xda || marker === 0xd9) {
      return null;
    }
    i += 2 + len;
  }
  return null;
}

/** Draws the image at the given size and encodes it as JPEG (browser only). */
async function reencode(blob: Blob, width: number, height: number): Promise<Uint8Array> {
  // createImageBitmap applies EXIF orientation, so the result is upright.
  const bitmap = await createImageBitmap(blob);
  try {
    if (typeof OffscreenCanvas !== 'undefined') {
      const canvas = new OffscreenCanvas(width, height);
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas 2D is not available');
      ctx.fillStyle = '#fff'; // JPEG has no transparency
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(bitmap, 0, 0, width, height);
      const out = await canvas.convertToBlob({ type: 'image/jpeg', quality: 0.9 });
      return new Uint8Array(await out.arrayBuffer());
    }
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D is not available');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(bitmap, 0, 0, width, height);
    const out = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.9));
    if (!out) throw new Error('Could not encode the page image');
    return new Uint8Array(await out.arrayBuffer());
  } finally {
    bitmap.close();
  }
}

/**
 * JPEG bytes for a page image. An upright JPEG with the expected aspect ratio
 * is used untouched (no quality loss); other images are re-encoded at 0.9.
 */
export async function pageImageJpeg(image: { blob: Blob; width: number; height: number }): Promise<Uint8Array> {
  const bytes = new Uint8Array(await image.blob.arrayBuffer());
  const info = readJpegInfo(bytes);
  const sameShape = info && Math.abs(info.width / info.height - image.width / image.height) < 0.01;
  if (info && sameShape && info.orientation === 1 && [1, 3, 4].includes(info.components)) return bytes;
  return reencode(image.blob, Math.round(image.width), Math.round(image.height));
}
