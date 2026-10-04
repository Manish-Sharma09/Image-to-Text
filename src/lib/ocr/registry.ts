// Provider registry. Swapping or adding an OCR engine means implementing
// OcrProvider and registering it here; nothing else in the app changes.

import type { OcrProvider, ProviderId } from './types';
import { LocalProvider } from './local';
import { EnhancedProvider } from './enhanced';

let local: LocalProvider | null = null;
let enhanced: EnhancedProvider | null = null;

export function localProvider(): LocalProvider {
  return (local ??= new LocalProvider());
}

export function getProvider(id: ProviderId): OcrProvider {
  if (id === 'enhanced') return (enhanced ??= new EnhancedProvider());
  return localProvider();
}
