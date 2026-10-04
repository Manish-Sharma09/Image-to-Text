// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

const site = process.env.SITE_URL || 'https://imagetotextapp.com';

// https://astro.build/config
export default defineConfig({
  site,
  // Keep classic whitespace collapsing; Astro 7's 'jsx' default strips spaces
  // between inline elements written on separate lines.
  compressHTML: true,
  trailingSlash: 'never',
  // Common guesses at the legal and company pages.
  redirects: {
    '/privacy-policy': '/privacy',
    '/terms-and-conditions': '/terms',
    '/terms-of-service': '/terms',
    '/about-us': '/about',
    '/contact-us': '/contact',
  },
  integrations: [
    svelte(),
    sitemap({
      filter: (page) => !page.includes('/share'),
      // Adds <xhtml:link rel="alternate" hreflang> for every translated URL.
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', es: 'es', ja: 'ja', fr: 'fr', de: 'de', pt: 'pt', ko: 'ko', it: 'it' },
      },
    }),
  ],
  // Pages are prerendered; only /api/* routes run on the server.
  // 12 MB covers the largest Enhanced upload (8 MB image + form overhead).
  adapter: node({ mode: 'standalone', bodySizeLimit: 12 * 1024 * 1024 }),
  prefetch: { defaultStrategy: 'hover' },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Geist',
      cssVariable: '--font-sans',
      weights: ['400', '500', '600'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Arial', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Geist Mono',
      cssVariable: '--font-mono',
      weights: ['400', '500'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],
  vite: {
    worker: { format: 'es' },
    // Lazily imported libraries, pre-bundled so the dev server doesn't
    // re-optimise (and break in-flight imports) the first time they load.
    optimizeDeps: {
      include: [
        'tesseract.js',
        'pdfjs-dist',
        'utif',
        'fflate',
        '@codemirror/state',
        '@codemirror/view',
        '@codemirror/commands',
        '@codemirror/search',
        'three',
        'gsap',
        'gsap/ScrollTrigger',
        'gsap/SplitText',
      ],
    },
  },
});
