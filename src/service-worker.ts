/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
// Precaches the app and every pre-rendered page, so it works offline after the first visit.
// Fonts are several MB, so they are cached the first time a page asks for them instead.
import { build, files, prerendered, version } from '$service-worker';

const sw = self as unknown as ServiceWorkerGlobalScope;
const APP = `app-${version}`;
const FONTS = 'fonts-v1';
const isFont = (path: string) => /\.woff2?$/.test(path);
const PRECACHE = [...build, ...files, ...prerendered].filter((p) => !isFont(p));

const OFFLINE = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Offline · Nihongo Notes</title>
<style>body{margin:0;padding:32px 16px;font:1rem/1.6 system-ui,sans-serif;background:#fff;color:#111}@media (prefers-color-scheme:dark){body{background:#000;color:#fff}}a{color:inherit;display:inline-block;min-height:44px;padding:10px 0}</style></head>
<body><h1>Offline</h1><p>You're offline and this page isn't saved yet. It will be after you open it once online.</p><a href="/">Go to the home page</a></body></html>`;

sw.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(APP)
			.then((cache) => cache.addAll(PRECACHE))
			.then(() => sw.skipWaiting())
	);
});

// a new deploy replaces the old app cache; the font cache is kept
sw.addEventListener('activate', (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) => Promise.all(keys.filter((k) => k !== APP && k !== FONTS).map((k) => caches.delete(k))))
			.then(() => sw.clients.claim())
	);
});

sw.addEventListener('fetch', (event) => {
	const req = event.request;
	if (req.method !== 'GET') return;
	const url = new URL(req.url);
	if (url.origin !== location.origin) return;

	if (isFont(url.pathname)) {
		event.respondWith(
			caches.open(FONTS).then(async (cache) => {
				const hit = await cache.match(req);
				if (hit) return hit;
				const res = await fetch(req);
				if (res.ok) cache.put(req, res.clone());
				return res;
			})
		);
		return;
	}

	event.respondWith(
		(async () => {
			const cache = await caches.open(APP);
			const hit = await cache.match(req, { ignoreSearch: req.mode === 'navigate' });
			if (hit) return hit;
			try {
				const res = await fetch(req);
				if (res.ok && req.mode === 'navigate') cache.put(req, res.clone());
				return res;
			} catch {
				if (req.mode === 'navigate') return new Response(OFFLINE, { headers: { 'content-type': 'text/html; charset=utf-8' } });
				return Response.error();
			}
		})()
	);
});
