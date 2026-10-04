// Packaging shared by the Word and Excel exporters (Open Packaging Conventions).

import { strToU8, zipSync, type Zippable } from 'fflate';
import { XML_HEADER, escapeXml } from './xml';

export const REL = {
  officeDocument: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument',
  coreProps: 'http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties',
  appProps: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties',
  styles: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles',
  numbering: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering',
  settings: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings',
  worksheet: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet',
  sharedStrings: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings',
};

export const CORE_TYPE = 'application/vnd.openxmlformats-package.core-properties+xml';
export const APP_TYPE = 'application/vnd.openxmlformats-officedocument.extended-properties+xml';

/** `[Content_Types].xml` with an override for every part except .rels files. */
export function contentTypes(overrides: [part: string, type: string][]): string {
  return (
    XML_HEADER +
    '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
    '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
    '<Default Extension="xml" ContentType="application/xml"/>' +
    overrides.map(([part, type]) => `<Override PartName="/${part}" ContentType="${type}"/>`).join('') +
    '</Types>'
  );
}

export function relationships(rels: [type: string, target: string][]): string {
  return (
    XML_HEADER +
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
    rels.map(([type, target], i) => `<Relationship Id="rId${i + 1}" Type="${type}" Target="${escapeXml(target)}"/>`).join('') +
    '</Relationships>'
  );
}

/** W3CDTF without milliseconds, which some Office versions reject. */
function w3cdtf(d: Date): string {
  return d.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

export function coreProps(title: string, created: Date): string {
  const date = w3cdtf(created);
  return (
    XML_HEADER +
    '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" ' +
    'xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" ' +
    'xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
    `<dc:title>${escapeXml(title)}</dc:title>` +
    '<dc:creator>Image to Text App</dc:creator>' +
    `<dcterms:created xsi:type="dcterms:W3CDTF">${date}</dcterms:created>` +
    `<dcterms:modified xsi:type="dcterms:W3CDTF">${date}</dcterms:modified>` +
    '</cp:coreProperties>'
  );
}

export function appProps(): string {
  return (
    XML_HEADER +
    '<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" ' +
    'xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">' +
    '<Application>Image to Text App</Application>' +
    '</Properties>'
  );
}

/** Zip timestamps are DOS dates, which only cover 1980–2099. */
export function zipDate(d: Date): Date {
  const y = d.getFullYear();
  return Number.isFinite(y) && y >= 1980 && y <= 2099 ? d : new Date();
}

/** Zips the parts in the given order ([Content_Types].xml should come first). */
export function zipParts(parts: [path: string, xml: string][], created: Date): Uint8Array {
  const mtime = zipDate(created);
  const files: Zippable = {};
  for (const [path, xml] of parts) files[path] = [strToU8(xml), { mtime }];
  return zipSync(files, { level: 6 });
}
