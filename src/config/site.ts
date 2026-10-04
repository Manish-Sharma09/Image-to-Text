// Brand and site-wide settings. Change the name here to rebrand everything.
export const SITE = {
  name: 'Image to Text App',
  tagline: 'Turn any image into text you can copy',
  url: (import.meta.env.SITE_URL as string | undefined) ?? 'https://imagetotextapp.com',
  description:
    'Free image to text converter that runs in your browser. Extract editable text from JPG, PNG, screenshots, PDFs, tables, receipts and handwriting — no sign-up, and your images stay on your device.',
  /** Where people reach us: shown on Contact, Privacy and Terms, and in structured data. */
  email: (import.meta.env.CONTACT_EMAIL as string | undefined) ?? 'hello@imagetotextapp.com',
  /** Legal name of the person or company running the site (Privacy and Terms). */
  operator: (import.meta.env.LEGAL_NAME as string | undefined) ?? 'Image to Text App',
  /** When the Privacy policy and Terms last changed (YYYY-MM-DD). */
  legalUpdated: '2026-10-04',
  /** Files larger than this are refused before decoding. */
  maxFileMB: 25,
  /** Pages per workspace. */
  maxPages: 50,
};

export const NAV = [
  { href: '/tools', label: 'Tools' },
  { href: '/guides', label: 'Guides' },
  { href: '/privacy', label: 'Privacy' },
];
