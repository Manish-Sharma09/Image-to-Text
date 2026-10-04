import type { APIRoute } from 'astro';

export const prerender = false;

// Reached only if the app was shared to before its service worker installed;
// the worker normally handles this. Send the visitor to the tool.
export const POST: APIRoute = () => new Response(null, { status: 303, headers: { location: '/' } });
