// Fetches an image from a link for visitors whose browser can't (no CORS on
// the other site). Guarded against server-side request forgery: public
// http(s) addresses only, checked at connection time, redirects re-checked,
// size and time limited. Nothing is stored.

import type { APIRoute } from 'astro';
import { lookup as dnsLookup, type LookupAddress } from 'node:dns';
import { BlockList, isIP, type LookupFunction } from 'node:net';
import { take } from '../../lib/server/ratelimit';
import http from 'node:http';
import https from 'node:https';

export const prerender = false;

const MAX_BYTES = 25 * 1024 * 1024;
const TIMEOUT_MS = 10_000;
const MAX_REDIRECTS = 3;
const DAILY_LIMIT = 300;

// Every non-public range. Separate lists, because BlockList matches IPv4
// queries against IPv6 rules through their mapped form (so "::ffff:0:0/96"
// in a shared list would block all of IPv4). The IPv6 list blocks every form
// that embeds an IPv4 address: mapped, compatible, NAT64, 6to4 and Teredo.
const v4 = new BlockList();
for (const [net, bits] of [
  ['0.0.0.0', 8], ['10.0.0.0', 8], ['100.64.0.0', 10], ['127.0.0.0', 8], ['169.254.0.0', 16], ['172.16.0.0', 12],
  ['192.0.0.0', 24], ['192.0.2.0', 24], ['192.88.99.0', 24], ['192.168.0.0', 16], ['198.18.0.0', 15],
  ['198.51.100.0', 24], ['203.0.113.0', 24], ['224.0.0.0', 4], ['240.0.0.0', 4],
] as const) v4.addSubnet(net, bits, 'ipv4');
const v6 = new BlockList();
for (const [net, bits] of [
  ['::', 96], ['::1', 128], ['::ffff:0:0', 96], ['64:ff9b::', 96], ['64:ff9b:1::', 48], ['100::', 64],
  ['2001::', 32], ['2001:db8::', 32], ['2002::', 16], ['fc00::', 7], ['fe80::', 10], ['fec0::', 10], ['ff00::', 8],
] as const) v6.addSubnet(net, bits, 'ipv6');

function isPrivate(ip: string): boolean {
  const v = isIP(ip);
  if (v === 4) return v4.check(ip, 'ipv4');
  if (v === 6) return v6.check(ip, 'ipv6');
  return true;
}

/** DNS lookup that refuses private addresses, used for the actual connection. */
const safeLookup: LookupFunction = (hostname, options, callback) => {
  dnsLookup(hostname, { ...options, all: true }, (err, addresses) => {
    if (err) return callback(err, '', 4);
    const list = addresses as unknown as LookupAddress[];
    const bad = list.find((a) => isPrivate(a.address));
    if (bad || !list.length) return callback(new Error('blocked address'), '', 4);
    if ((options as { all?: boolean }).all) return (callback as unknown as (e: null, a: LookupAddress[]) => void)(null, list);
    callback(null, list[0].address, list[0].family);
  });
};

interface Fetched {
  status: number;
  type: string;
  body?: Buffer;
  location?: string;
}

function get(url: URL): Promise<Fetched> {
  return new Promise((resolve, reject) => {
    const mod = url.protocol === 'https:' ? https : http;
    const req = mod.get(
      url,
      {
        lookup: safeLookup,
        timeout: TIMEOUT_MS,
        headers: { 'user-agent': 'ImageToTextAppFetcher/1.0 (+https://imagetotextapp.com/privacy)', accept: 'image/*,application/pdf;q=0.9' },
      },
      (res) => {
        const status = res.statusCode ?? 0;
        const type = String(res.headers['content-type'] ?? '').split(';')[0].trim().toLowerCase();
        if (status >= 300 && status < 400 && res.headers.location) {
          res.resume();
          return resolve({ status, type, location: res.headers.location });
        }
        if (Number(res.headers['content-length'] ?? 0) > MAX_BYTES) {
          res.destroy();
          return resolve({ status: 413, type });
        }
        const chunks: Buffer[] = [];
        let size = 0;
        res.on('data', (c: Buffer) => {
          size += c.length;
          if (size > MAX_BYTES) {
            res.destroy();
            resolve({ status: 413, type });
          } else chunks.push(c);
        });
        res.on('end', () => resolve({ status, type, body: Buffer.concat(chunks) }));
        res.on('error', reject);
      },
    );
    // Hard deadline for the whole transfer, not just idle time.
    const deadline = setTimeout(() => req.destroy(new Error('timeout')), TIMEOUT_MS);
    req.on('close', () => clearTimeout(deadline));
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', reject);
  });
}

const fail = (status: number, message: string) =>
  new Response(JSON.stringify({ error: message }), { status, headers: { 'content-type': 'application/json', 'x-copyable': '1' } });

export const GET: APIRoute = async ({ url: self, clientAddress }) => {
  if (!take(clientAddress, DAILY_LIMIT, 'fetch')) return fail(429, 'Too many links today. Save the image and drop it instead.');
  let target: URL;
  try {
    target = new URL(self.searchParams.get('url') ?? '');
  } catch {
    return fail(400, 'Invalid link.');
  }
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    if (!/^https?:$/.test(target.protocol) || target.username || target.password) return fail(400, 'Only public http(s) links are supported.');
    if (target.port && !['80', '443'].includes(target.port)) return fail(400, 'Only standard ports are supported.');
    const host = target.hostname.replace(/^\[|\]$/g, '');
    // Literal IPs skip DNS, so check them here too.
    if (isIP(host) && isPrivate(host)) return fail(400, 'That address is not allowed.');
    if (/^(localhost|.*\.localhost|.*\.local|.*\.internal)$/i.test(host)) return fail(400, 'That address is not allowed.');
    let res: Fetched;
    try {
      res = await get(target);
    } catch {
      return fail(502, "Couldn't load that link.");
    }
    if (res.location) {
      target = new URL(res.location, target);
      continue;
    }
    if (res.status === 413) return fail(413, 'File too large.');
    if (res.status < 200 || res.status >= 300 || !res.body) return fail(502, "Couldn't load that link.");
    if (!res.type.startsWith('image/') && res.type !== 'application/pdf' && res.type !== 'application/octet-stream') return fail(415, "That link doesn't point to an image.");
    return new Response(new Uint8Array(res.body), {
      status: 200,
      headers: { 'content-type': res.type || 'application/octet-stream', 'cache-control': 'no-store', 'x-copyable': '1' },
    });
  }
  return fail(502, 'Too many redirects.');
};
