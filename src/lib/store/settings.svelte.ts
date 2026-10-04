// Small preferences remembered in this browser. Nothing here leaves the device.

const KEY = 'copyable:settings';

interface Stored {
  languages: { auto: boolean; codes: string[] };
  history: boolean;
  enhancedConsent: boolean;
  autoImprove: boolean;
}

const DEFAULTS: Stored = {
  languages: { auto: true, codes: ['eng'] },
  history: false,
  enhancedConsent: false,
  autoImprove: true,
};

function load(): Stored {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    // Private mode or blocked storage: fall back to defaults.
  }
  return structuredClone(DEFAULTS);
}

class Settings {
  languages = $state(DEFAULTS.languages);
  history = $state(DEFAULTS.history);
  enhancedConsent = $state(DEFAULTS.enhancedConsent);
  autoImprove = $state(DEFAULTS.autoImprove);

  init() {
    const s = load();
    this.languages = s.languages;
    this.history = s.history;
    this.enhancedConsent = s.enhancedConsent;
    this.autoImprove = s.autoImprove;
  }

  save() {
    try {
      const data: Stored = {
        languages: $state.snapshot(this.languages),
        history: this.history,
        enhancedConsent: this.enhancedConsent,
        autoImprove: this.autoImprove,
      };
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch {
      // Ignore: preferences are a convenience.
    }
  }
}

export const settings = new Settings();
