import type { APIRoute } from 'astro';
import Anthropic from '@anthropic-ai/sdk';
import { serverConfig } from '../../lib/server/config';
import { readImage, isMode, RefusedError } from '../../lib/server/enhanced';
import { take, refund, remaining } from '../../lib/server/ratelimit';

export const prerender = false;

const MAX_BYTES = 8 * 1024 * 1024;
const TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store', 'x-copyable': '1' } });

export const GET: APIRoute = ({ clientAddress }) => {
  if (!serverConfig.enhancedEnabled) return json({ enabled: false });
  return json({ enabled: true, limit: serverConfig.dailyLimit, remaining: remaining(clientAddress, serverConfig.dailyLimit) });
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!serverConfig.enhancedEnabled) return json({ error: 'Enhanced reading is not enabled on this server.' }, 404);
  const length = Number(request.headers.get('content-length') ?? 0);
  if (length > MAX_BYTES + 64 * 1024) return json({ error: 'Image too large.' }, 413);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ error: 'Expected a form upload.' }, 400);
  }
  const image = form.get('image');
  const mode = String(form.get('mode') ?? 'plain');
  const languages = String(form.get('languages') ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter((s) => /^[a-z_]{3,8}$/.test(s))
    .slice(0, 4);
  if (!(image instanceof File) || !image.size) return json({ error: 'No image.' }, 400);
  if (image.size > MAX_BYTES) return json({ error: 'Image too large.' }, 413);
  const type = TYPES.find((t) => t === image.type);
  if (!type) return json({ error: 'Unsupported image type.' }, 415);
  if (!isMode(mode)) return json({ error: 'Unknown mode.' }, 400);

  if (!take(clientAddress, serverConfig.dailyLimit)) return json({ error: 'Daily limit reached.', remaining: 0 }, 429);

  try {
    const data = Buffer.from(await image.arrayBuffer()).toString('base64');
    const result = await readImage({ data, mediaType: type }, mode, languages);
    // Nothing is logged or stored: the image and text only pass through.
    return json({ ...result, remaining: remaining(clientAddress, serverConfig.dailyLimit) });
  } catch (e) {
    refund(clientAddress);
    if (e instanceof RefusedError) return json({ error: 'This image could not be read with Enhanced reading.' }, 422);
    if (e instanceof Anthropic.RateLimitError || e instanceof Anthropic.InternalServerError) return json({ error: 'Enhanced reading is busy. Try again in a minute.' }, 503);
    if (e instanceof Anthropic.APIError) {
      console.error('enhanced ocr api error', e.status);
      return json({ error: 'Enhanced reading failed.' }, 502);
    }
    console.error('enhanced ocr error', (e as Error).message);
    return json({ error: 'Enhanced reading failed.' }, 500);
  }
};
