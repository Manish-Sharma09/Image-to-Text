// Language registry. To add a language, append an entry: `code` is the
// Tesseract traineddata name, `bcp47` lists browser locale prefixes that map to it.

export interface Language {
  code: string;
  name: string;
  native: string;
  script: Script;
  bcp47: string[];
  popular?: boolean;
  rtl?: boolean;
}

export type Script =
  | 'Latin'
  | 'Cyrillic'
  | 'Arabic'
  | 'Devanagari'
  | 'Bengali'
  | 'Tamil'
  | 'Telugu'
  | 'Gujarati'
  | 'Gurmukhi'
  | 'Kannada'
  | 'Malayalam'
  | 'Han'
  | 'Japanese'
  | 'Hangul'
  | 'Thai'
  | 'Greek'
  | 'Hebrew';

export const LANGUAGES: Language[] = [
  { code: 'eng', name: 'English', native: 'English', script: 'Latin', bcp47: ['en'], popular: true },
  { code: 'hin', name: 'Hindi', native: 'हिन्दी', script: 'Devanagari', bcp47: ['hi'], popular: true },
  { code: 'spa', name: 'Spanish', native: 'Español', script: 'Latin', bcp47: ['es'], popular: true },
  { code: 'fra', name: 'French', native: 'Français', script: 'Latin', bcp47: ['fr'], popular: true },
  { code: 'deu', name: 'German', native: 'Deutsch', script: 'Latin', bcp47: ['de'], popular: true },
  { code: 'por', name: 'Portuguese', native: 'Português', script: 'Latin', bcp47: ['pt'], popular: true },
  { code: 'ita', name: 'Italian', native: 'Italiano', script: 'Latin', bcp47: ['it'], popular: true },
  { code: 'nld', name: 'Dutch', native: 'Nederlands', script: 'Latin', bcp47: ['nl'], popular: true },
  { code: 'rus', name: 'Russian', native: 'Русский', script: 'Cyrillic', bcp47: ['ru'], popular: true },
  { code: 'ara', name: 'Arabic', native: 'العربية', script: 'Arabic', bcp47: ['ar'], popular: true, rtl: true },
  { code: 'chi_sim', name: 'Chinese (Simplified)', native: '简体中文', script: 'Han', bcp47: ['zh-cn', 'zh-sg', 'zh-hans', 'zh'], popular: true },
  { code: 'chi_tra', name: 'Chinese (Traditional)', native: '繁體中文', script: 'Han', bcp47: ['zh-tw', 'zh-hk', 'zh-hant'] },
  { code: 'jpn', name: 'Japanese', native: '日本語', script: 'Japanese', bcp47: ['ja'], popular: true },
  { code: 'kor', name: 'Korean', native: '한국어', script: 'Hangul', bcp47: ['ko'], popular: true },
  { code: 'tur', name: 'Turkish', native: 'Türkçe', script: 'Latin', bcp47: ['tr'], popular: true },
  { code: 'vie', name: 'Vietnamese', native: 'Tiếng Việt', script: 'Latin', bcp47: ['vi'], popular: true },
  { code: 'ind', name: 'Indonesian', native: 'Bahasa Indonesia', script: 'Latin', bcp47: ['id', 'in'], popular: true },
  { code: 'pol', name: 'Polish', native: 'Polski', script: 'Latin', bcp47: ['pl'], popular: true },
  { code: 'ron', name: 'Romanian', native: 'Română', script: 'Latin', bcp47: ['ro'], popular: true },
  { code: 'tha', name: 'Thai', native: 'ไทย', script: 'Thai', bcp47: ['th'], popular: true },
  { code: 'ben', name: 'Bengali', native: 'বাংলা', script: 'Bengali', bcp47: ['bn'] },
  { code: 'mar', name: 'Marathi', native: 'मराठी', script: 'Devanagari', bcp47: ['mr'] },
  { code: 'nep', name: 'Nepali', native: 'नेपाली', script: 'Devanagari', bcp47: ['ne'] },
  { code: 'tam', name: 'Tamil', native: 'தமிழ்', script: 'Tamil', bcp47: ['ta'] },
  { code: 'tel', name: 'Telugu', native: 'తెలుగు', script: 'Telugu', bcp47: ['te'] },
  { code: 'guj', name: 'Gujarati', native: 'ગુજરાતી', script: 'Gujarati', bcp47: ['gu'] },
  { code: 'pan', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', script: 'Gurmukhi', bcp47: ['pa'] },
  { code: 'kan', name: 'Kannada', native: 'ಕನ್ನಡ', script: 'Kannada', bcp47: ['kn'] },
  { code: 'mal', name: 'Malayalam', native: 'മലയാളം', script: 'Malayalam', bcp47: ['ml'] },
  { code: 'urd', name: 'Urdu', native: 'اردو', script: 'Arabic', bcp47: ['ur'], rtl: true },
  { code: 'fas', name: 'Persian', native: 'فارسی', script: 'Arabic', bcp47: ['fa'], rtl: true },
  { code: 'heb', name: 'Hebrew', native: 'עברית', script: 'Hebrew', bcp47: ['he', 'iw'], rtl: true },
  { code: 'ukr', name: 'Ukrainian', native: 'Українська', script: 'Cyrillic', bcp47: ['uk'] },
  { code: 'bul', name: 'Bulgarian', native: 'Български', script: 'Cyrillic', bcp47: ['bg'] },
  { code: 'ell', name: 'Greek', native: 'Ελληνικά', script: 'Greek', bcp47: ['el'] },
  { code: 'ces', name: 'Czech', native: 'Čeština', script: 'Latin', bcp47: ['cs'] },
  { code: 'slk', name: 'Slovak', native: 'Slovenčina', script: 'Latin', bcp47: ['sk'] },
  { code: 'hun', name: 'Hungarian', native: 'Magyar', script: 'Latin', bcp47: ['hu'] },
  { code: 'swe', name: 'Swedish', native: 'Svenska', script: 'Latin', bcp47: ['sv'] },
  { code: 'dan', name: 'Danish', native: 'Dansk', script: 'Latin', bcp47: ['da'] },
  { code: 'nor', name: 'Norwegian', native: 'Norsk', script: 'Latin', bcp47: ['no', 'nb', 'nn'] },
  { code: 'fin', name: 'Finnish', native: 'Suomi', script: 'Latin', bcp47: ['fi'] },
  { code: 'cat', name: 'Catalan', native: 'Català', script: 'Latin', bcp47: ['ca'] },
  { code: 'hrv', name: 'Croatian', native: 'Hrvatski', script: 'Latin', bcp47: ['hr'] },
  { code: 'msa', name: 'Malay', native: 'Bahasa Melayu', script: 'Latin', bcp47: ['ms'] },
  { code: 'tgl', name: 'Filipino', native: 'Filipino', script: 'Latin', bcp47: ['fil', 'tl'] },
  { code: 'swa', name: 'Swahili', native: 'Kiswahili', script: 'Latin', bcp47: ['sw'] },
];

const byCode = new Map(LANGUAGES.map((l) => [l.code, l]));

export function getLanguage(code: string): Language | undefined {
  return byCode.get(code);
}

export function languageName(code: string): string {
  return byCode.get(code)?.name ?? code;
}

/** Tesseract code for a browser locale such as "pt-BR" or "zh-Hant-TW". */
export function fromLocale(locale: string): string | undefined {
  const lc = locale.toLowerCase();
  let best: { code: string; len: number } | undefined;
  for (const l of LANGUAGES) {
    for (const tag of l.bcp47) {
      if ((lc === tag || lc.startsWith(tag + '-')) && (!best || tag.length > best.len)) {
        best = { code: l.code, len: tag.length };
      }
    }
  }
  return best?.code;
}

/**
 * The languages "Auto" starts with: English plus the visitor's browser
 * languages. Non-Latin scripts the image turns out to contain are added later
 * by script detection.
 */
export function autoLanguages(locales: readonly string[] = []): string[] {
  const set = new Set<string>(['eng']);
  for (const loc of locales) {
    const code = fromLocale(loc);
    if (code) set.add(code);
    if (set.size >= 3) break;
  }
  return [...set];
}

/** Default language to pair with a detected script. */
export const SCRIPT_DEFAULT: Partial<Record<string, string>> = {
  Latin: 'eng',
  Cyrillic: 'rus',
  Arabic: 'ara',
  Devanagari: 'hin',
  Bengali: 'ben',
  Tamil: 'tam',
  Telugu: 'tel',
  Gujarati: 'guj',
  Gurmukhi: 'pan',
  Kannada: 'kan',
  Malayalam: 'mal',
  Han: 'chi_sim',
  HanS: 'chi_sim',
  HanT: 'chi_tra',
  Japanese: 'jpn',
  Katakana: 'jpn',
  Hiragana: 'jpn',
  Hangul: 'kor',
  Thai: 'tha',
  Greek: 'ell',
  Hebrew: 'heb',
};

/** Pick a language for a detected script, preferring ones the visitor already uses. */
export function languageForScript(script: string, preferred: string[]): string | undefined {
  const pref = preferred.find((c) => byCode.get(c)?.script === script);
  return pref ?? SCRIPT_DEFAULT[script];
}

const SCRIPT_RANGES: [Script, RegExp][] = [
  ['Devanagari', /[ऀ-ॿ]/g],
  ['Bengali', /[ঀ-৿]/g],
  ['Gurmukhi', /[਀-੿]/g],
  ['Gujarati', /[઀-૿]/g],
  ['Tamil', /[஀-௿]/g],
  ['Telugu', /[ఀ-౿]/g],
  ['Kannada', /[ಀ-೿]/g],
  ['Malayalam', /[ഀ-ൿ]/g],
  ['Thai', /[฀-๿]/g],
  ['Arabic', /[؀-ۿݐ-ݿ]/g],
  ['Hebrew', /[֐-׿]/g],
  ['Cyrillic', /[Ѐ-ӿ]/g],
  ['Greek', /[Ͱ-Ͽ]/g],
  ['Hangul', /[가-힯ᄀ-ᇿ]/g],
  ['Japanese', /[぀-ヿ]/g],
  ['Han', /[一-鿿]/g],
  ['Latin', /[A-Za-zÀ-ɏ]/g],
];

/** Counts characters per script in a string — used to label results. */
export function scriptsInText(text: string): Partial<Record<Script, number>> {
  const out: Partial<Record<Script, number>> = {};
  for (const [script, re] of SCRIPT_RANGES) {
    const n = text.match(re)?.length ?? 0;
    if (n) out[script] = n;
  }
  return out;
}
