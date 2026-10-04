// Optional history, stored only in this browser's IndexedDB. Off by default.

import type { Adjustments } from '../image/types';
import type { OcrPage, ProviderId, ReadMode } from '../ocr/types';
import type { FormatOptions, ReceiptData, TableData } from '../layout/types';
import type { Detection } from '../layout/classify';

export interface SavedPage {
  name: string;
  blob: Blob;
  kind: string;
  width: number;
  height: number;
  adjust: Adjustments;
  result: OcrPage | null;
  resultKey: string;
  detection: Detection | null;
  mode: ReadMode;
  modeLocked: boolean;
  options: FormatOptions;
  provider: ProviderId;
  text: string;
  edited: boolean;
  table: TableData | null;
  receipt: ReceiptData | null;
}

export interface SavedDoc {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  pages: SavedPage[];
  /** Small JPEG of the first page for the list. */
  thumb: Blob | null;
  words: number;
  modes: ReadMode[];
  languages: string[];
}

export type DocSummary = Omit<SavedDoc, 'pages'> & { pageCount: number };

const DB = 'copyable';
const STORE = 'docs';

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: 'id' }).createIndex('updatedAt', 'updatedAt');
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function tx<T>(mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await open();
  return new Promise((resolve, reject) => {
    const t = db.transaction(STORE, mode);
    const req = fn(t.objectStore(STORE));
    t.oncomplete = () => {
      resolve(req.result);
      db.close();
    };
    t.onerror = () => {
      reject(t.error);
      db.close();
    };
  });
}

export const history = {
  async list(): Promise<DocSummary[]> {
    const all = await tx<SavedDoc[]>('readonly', (s) => s.getAll() as IDBRequest<SavedDoc[]>);
    return all
      .map(({ pages, ...rest }) => ({ ...rest, pageCount: pages.length }))
      .sort((a, b) => b.updatedAt - a.updatedAt);
  },
  get: (id: string) => tx<SavedDoc | undefined>('readonly', (s) => s.get(id) as IDBRequest<SavedDoc | undefined>),
  put: (doc: SavedDoc) => tx('readwrite', (s) => s.put(doc)),
  async rename(id: string, title: string) {
    const doc = await history.get(id);
    if (doc) await history.put({ ...doc, title, updatedAt: Date.now() });
  },
  remove: (id: string) => tx('readwrite', (s) => s.delete(id)),
  clear: () => tx('readwrite', (s) => s.clear()),
};

export async function thumbnail(blob: Blob): Promise<Blob | null> {
  try {
    const bmp = await createImageBitmap(blob);
    const s = Math.min(1, 240 / Math.max(bmp.width, bmp.height));
    const c = new OffscreenCanvas(Math.round(bmp.width * s), Math.round(bmp.height * s));
    c.getContext('2d')!.drawImage(bmp, 0, 0, c.width, c.height);
    bmp.close();
    return await c.convertToBlob({ type: 'image/jpeg', quality: 0.7 });
  } catch {
    return null;
  }
}
