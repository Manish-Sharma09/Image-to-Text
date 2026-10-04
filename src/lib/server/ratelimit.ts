// A small in-memory daily counter per visitor. IPs are hashed with a salt
// that changes every day, so nothing identifying is kept beyond a day.
import { createHash, randomBytes } from 'node:crypto';

let day = '';
let salt = '';
const counts = new Map<string, number>();

function rotate() {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== day) {
    day = today;
    salt = randomBytes(16).toString('hex');
    counts.clear();
  }
}

function key(ip: string, bucket: string): string {
  rotate();
  return bucket + ':' + createHash('sha256').update(salt + ip).digest('hex').slice(0, 32);
}

export function remaining(ip: string, limit: number, bucket = 'ocr'): number {
  return Math.max(0, limit - (counts.get(key(ip, bucket)) ?? 0));
}

/** Records one use; returns false when the visitor is over the limit. */
export function take(ip: string, limit: number, bucket = 'ocr'): boolean {
  const k = key(ip, bucket);
  const used = counts.get(k) ?? 0;
  if (used >= limit) return false;
  counts.set(k, used + 1);
  return true;
}

export function refund(ip: string, bucket = 'ocr'): void {
  const k = key(ip, bucket);
  const used = counts.get(k) ?? 0;
  if (used > 0) counts.set(k, used - 1);
}
