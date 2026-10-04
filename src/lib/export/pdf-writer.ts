// Minimal PDF 1.4 file writer: numbered objects, streams, and a
// cross-reference table with exact byte offsets.

import { zlibSync } from 'fflate';

/** Bytes for a string of ASCII/Latin-1 characters (PDF syntax is byte-oriented). */
export function latin1(s: string): Uint8Array {
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i) & 0xff;
  return out;
}

/** A number for content streams: at most 3 decimals and never exponent notation. */
export function num(x: number): string {
  const r = Math.round(x * 1000) / 1000;
  return Object.is(r, -0) ? '0' : String(r);
}

/** A literal string of single-byte codes, e.g. WinAnsi text. */
export function pdfLiteral(codes: Iterable<number>): string {
  let s = '(';
  for (const c of codes) {
    if (c === 0x28 || c === 0x29 || c === 0x5c) s += '\\' + String.fromCharCode(c);
    else if (c < 0x20 || c > 0x7e) s += '\\' + c.toString(8).padStart(3, '0');
    else s += String.fromCharCode(c);
  }
  return s + ')';
}

function utf16beHex(s: string): string {
  let hex = '';
  for (let i = 0; i < s.length; i++) hex += s.charCodeAt(i).toString(16).padStart(4, '0').toUpperCase();
  return hex;
}

/** A text string for metadata: plain ASCII when possible, else UTF-16BE with a BOM. */
export function pdfTextString(s: string): string {
  if (/^[\x20-\x7e]*$/.test(s)) return pdfLiteral(Array.from(s, (c) => c.charCodeAt(0)));
  return `<FEFF${utf16beHex(s)}>`;
}

/** UTF-16BE code units as a hex string, for Identity-H text. */
export function pdfHexUtf16(s: string): string {
  return `<${utf16beHex(s)}>`;
}

export function pdfDate(d: Date): string {
  const t = Number.isFinite(d.getTime()) ? d : new Date();
  const p = (n: number, w = 2) => String(n).padStart(w, '0');
  return `(D:${p(t.getUTCFullYear(), 4)}${p(t.getUTCMonth() + 1)}${p(t.getUTCDate())}${p(t.getUTCHours())}${p(t.getUTCMinutes())}${p(t.getUTCSeconds())}Z)`;
}

export class PdfWriter {
  private chunks: Uint8Array[] = [];
  private size = 0;
  private offsets: number[] = [];
  private nextId = 1;

  constructor() {
    // The comment with high bytes marks the file as binary for transfer tools.
    this.write('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');
  }

  /** Reserves an object number so objects can reference each other before being written. */
  ref(): number {
    return this.nextId++;
  }

  obj(id: number, body: string): void {
    this.offsets[id] = this.size;
    this.write(`${id} 0 obj\n${body}\nendobj\n`);
  }

  /** Writes a stream object; `dict` holds the entries other than /Length and /Filter. */
  stream(id: number, dict: string, data: Uint8Array, compress = true): void {
    const body = compress ? zlibSync(data, { level: 6 }) : data;
    const filter = compress ? ' /Filter /FlateDecode' : '';
    this.offsets[id] = this.size;
    this.write(`${id} 0 obj\n<< ${dict}${dict ? ' ' : ''}/Length ${body.length}${filter} >>\nstream\n`);
    this.push(body);
    this.write('\nendstream\nendobj\n');
  }

  finish(root: number, info: number): Uint8Array {
    const count = this.nextId;
    for (let id = 1; id < count; id++) {
      if (this.offsets[id] === undefined) throw new Error(`PDF object ${id} was reserved but never written`);
    }
    const xref = this.size;
    let table = `xref\n0 ${count}\n0000000000 65535 f \n`;
    for (let id = 1; id < count; id++) table += `${String(this.offsets[id]).padStart(10, '0')} 00000 n \n`;
    const fileId = Array.from({ length: 16 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('');
    table += `trailer\n<< /Size ${count} /Root ${root} 0 R /Info ${info} 0 R /ID [<${fileId}> <${fileId}>] >>\nstartxref\n${xref}\n%%EOF\n`;
    this.write(table);

    const out = new Uint8Array(this.size);
    let at = 0;
    for (const c of this.chunks) {
      out.set(c, at);
      at += c.length;
    }
    return out;
  }

  private write(s: string): void {
    this.push(latin1(s));
  }

  private push(bytes: Uint8Array): void {
    this.chunks.push(bytes);
    this.size += bytes.length;
  }
}
