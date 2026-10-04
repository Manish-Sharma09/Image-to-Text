// Server-side settings read from the environment. Never import from client code.
const env = (key: string): string | undefined => (import.meta.env[key] as string | undefined) || process.env[key] || undefined;

export const serverConfig = {
  anthropicKey: env('ANTHROPIC_API_KEY'),
  model: env('ENHANCED_OCR_MODEL') ?? 'claude-opus-5-5',
  dailyLimit: Number(env('ENHANCED_OCR_DAILY_LIMIT') ?? 20),
  get enhancedEnabled() {
    return !!this.anthropicKey;
  },
};
