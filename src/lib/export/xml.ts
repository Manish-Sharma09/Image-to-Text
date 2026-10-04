// Escaping shared by the XML (docx/xlsx) and HTML exporters.

// Characters XML 1.0 forbids (C0 controls other than tab/LF/CR, lone
// surrogates, U+FFFE/U+FFFF) plus C1 controls, which OCR never produces on
// purpose and Word renders as boxes. Valid surrogate pairs match first and
// are kept.
const ILLEGAL = /[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\uD800-\uDFFF￾￿]/g;

const ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/** Normalises line endings and removes characters that are illegal in XML. */
export function cleanText(s: string): string {
  return s.replace(/\r\n?/g, '\n').replace(ILLEGAL, (m) => (m.length === 2 ? m : ''));
}

/** Escapes text for XML or HTML element content and attribute values. */
export function escapeXml(s: string): string {
  return cleanText(s).replace(/[&<>"']/g, (c) => ENTITIES[c]);
}

export const XML_HEADER = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n';
