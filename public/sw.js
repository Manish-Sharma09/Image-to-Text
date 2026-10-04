// Image to Text App service worker: keeps the app and the OCR engine available
// offline, and receives images shared from the phone's share sheet.
const VERSION = 'v4';
const RUNTIME = `copyable-${VERSION}`;
const SHARE = 'copyable-share';
const SHELL = ['/', '/site.webmanifest', '/favicon.ico', '/favicon-32x32.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(RUNTIME).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('copyable-') && k !== RUNTIME && k !== SHARE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

async function receiveShare(request) {
  const form = await request.formData();
  const cache = await caches.open(SHARE);
  let i = 0;
  for (const file of form.getAll('images')) {
    if (typeof file === 'string') continue;
    await cache.put(`/shared/${Date.now()}-${i++}`, new Response(file, { headers: { 'content-type': file.type, 'x-name': encodeURIComponent(file.name || 'Shared image') } }));
  }
  return Response.redirect('/?shared=1', 303);
}

const immutable = (url) =>
  url.origin === location.origin && (url.pathname.startsWith('/_astro/') || url.pathname.startsWith('/vendor/') || url.pathname.startsWith('/samples/') || /^\/(favicon|apple-touch-icon|android-chrome)[\w.-]*\.(png|ico|svg)$/.test(url.pathname));

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method === 'POST' && url.pathname === '/share-target') {
    event.respondWith(receiveShare(request));
    return;
  }
  if (request.method !== 'GET' || url.pathname.startsWith('/api/')) return;

  // Hashed assets, the OCR engine and samples never change: cache first.
  if (immutable(url) || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.match(request).then(
        (hit) =>
          hit ||
          fetch(request).then((res) => {
            // Clone now: the page will consume the original body.
            if (res.ok) {
              const copy = res.clone();
              caches.open(RUNTIME).then((c) => c.put(request, copy));
            }
            return res;
          }),
      ),
    );
    return;
  }

  // Pages: network first so content stays fresh, cache as the offline fallback.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(RUNTIME).then((c) => c.put(request, copy));
          }
          return res;
        })
        .catch(() => caches.match(request).then((hit) => hit || caches.match('/'))),
    );
  }
});
