// User-facing errors: every one says what happened and what to try next.
// The text lives in the app dictionary (src/i18n/app), so it follows the UI language.

import en from '../../i18n/app/en';
import { i18n } from '../i18n.svelte';

export type InputErrorCode = 'unsupported' | 'too-large' | 'empty' | 'decode' | 'url' | 'url-blocked' | 'too-many' | 'pdf-locked';

export class InputError extends Error {
  constructor(public code: InputErrorCode, public fileName?: string) {
    // The Error message stays English for logs; the UI uses title and hint.
    super(en.errors[code].title);
    this.name = 'InputError';
  }
  get title() {
    return i18n.t.errors[this.code].title;
  }
  get hint() {
    return i18n.t.errors[this.code].hint;
  }
}

/** Errors shown on a page after a failed or weak read (read at use time, in the UI language). */
export const READ_MESSAGES = {
  get failed() {
    return { ...i18n.t.errors.read.failed };
  },
  get noText() {
    return { ...i18n.t.errors.read.noText };
  },
  get lowQuality() {
    return { ...i18n.t.errors.read.lowQuality };
  },
  get engine() {
    return { ...i18n.t.errors.read.engine };
  },
};
