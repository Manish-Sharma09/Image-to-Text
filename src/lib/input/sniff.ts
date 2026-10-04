export type Kind = 'jpeg' | 'png' | 'gif' | 'webp' | 'bmp' | 'tiff' | 'heic' | 'avif' | 'pdf' | 'svg' | 'unknown';

/** Identifies a file from its first bytes; extensions and MIME types lie. */
export async function sniff(blob: Blob): Promise<Kind> {
  const b = new Uint8Array(await blob.slice(0, 64).arrayBuffer());
  const ascii = (from: number, to: number) => String.fromCharCode(...b.slice(from, to));
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'jpeg';
  if (b[0] === 0x89 && ascii(1, 4) === 'PNG') return 'png';
  if (ascii(0, 4) === 'GIF8') return 'gif';
  if (ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP') return 'webp';
  if (ascii(0, 2) === 'BM') return 'bmp';
  if ((b[0] === 0x49 && b[1] === 0x49 && b[2] === 0x2a && b[3] === 0) || (b[0] === 0x4d && b[1] === 0x4d && b[2] === 0 && b[3] === 0x2a)) return 'tiff';
  if (ascii(0, 4) === '%PDF') return 'pdf';
  if (ascii(4, 8) === 'ftyp') {
    const brand = ascii(8, 12);
    if (/^avi[fs]$/.test(brand)) return 'avif';
    if (/^(heic|heix|hevc|hevx|heim|heis|hevm|hevs|mif1|msf1)$/.test(brand)) return 'heic';
  }
  const head = ascii(0, 64).trimStart().toLowerCase();
  if (head.startsWith('<svg') || (head.startsWith('<?xml') && (await blob.slice(0, 1024).text()).includes('<svg'))) return 'svg';
  return 'unknown';
}

export const ACCEPT =
  'image/*,.jpg,.jpeg,.jfif,.png,.gif,.webp,.bmp,.tif,.tiff,.heic,.heif,.avif,.pdf,application/pdf';
