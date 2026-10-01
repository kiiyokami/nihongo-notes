// A new deploy while the browser still holds the old pages in its HTTP cache: the installed app must
// move to the new version's pages, not copy the old ones into the new cache.
// Version B is the same build with a new version number and every page marked, served by a small
// server that, like many hosts, lets browsers keep files for 10 minutes.
import { cpSync, existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { extname, join } from 'node:path';
import { openPage, suite } from './harness.mjs';

const PORT = 4175;
const URL = `http://localhost:${PORT}`;
const MARK = '<!-- build B -->';
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.woff2': 'font/woff2', '.woff': 'font/woff', '.webmanifest': 'application/manifest+json', '.txt': 'text/plain' };

function htmlFiles(dir) {
	return readdirSync(dir).flatMap((f) => {
		const p = join(dir, f);
		return statSync(p).isDirectory() ? htmlFiles(p) : p.endsWith('.html') ? [p] : [];
	});
}

function makeVersionB(from) {
	const dir = mkdtempSync(join(tmpdir(), 'nn-b-'));
	cpSync(from, dir, { recursive: true });
	const swPath = join(dir, 'service-worker.js');
	const sw = readFileSync(swPath, 'utf8');
	const version = sw.match(/`(\d{13})`/)[1];
	writeFileSync(swPath, sw.replaceAll(version, String(Number(version) + 1)));
	for (const f of htmlFiles(dir)) writeFileSync(f, readFileSync(f, 'utf8').replace('</body>', MARK + '</body>'));
	return dir;
}

function serve(getRoot) {
	return createServer((req, res) => {
		const path = decodeURIComponent(new globalThis.URL(req.url, URL).pathname);
		let file = join(getRoot(), path.endsWith('/') ? path + 'index.html' : path);
		const found = existsSync(file) && statSync(file).isFile();
		if (!found) file = join(getRoot(), '404.html');
		res.writeHead(found ? 200 : 404, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream', 'cache-control': 'max-age=600' });
		res.end(readFileSync(file));
	}).listen(PORT);
}

export default async function (browser) {
	const t = suite('update');
	const A = mkdtempSync(join(tmpdir(), 'nn-a-'));
	cpSync('build', A, { recursive: true });
	const B = makeVersionB(A);
	let root = A;
	const server = serve(() => root);
	const page = await openPage(browser);
	try {
		await page.goto(URL + '/');
		await page.evaluate(() => navigator.serviceWorker.ready);
		await page.reload();
		await page.waitForFunction(() => navigator.serviceWorker.controller !== null, { timeout: 10000 });
		const oldKey = (await page.evaluate(() => caches.keys())).find((k) => k.startsWith('app-'));

		root = B;
		await page.evaluate(async () => (await navigator.serviceWorker.getRegistration()).update());
		await page.waitForFunction(
			async (old) => {
				const keys = (await caches.keys()).filter((k) => k.startsWith('app-'));
				return keys.length === 1 && keys[0] !== old;
			},
			{ timeout: 15000, polling: 200 },
			oldKey
		);
		t.check('the new version replaces the old cache', true);

		const pages = await page.evaluate(async (mark) => {
			const key = (await caches.keys()).find((k) => k.startsWith('app-'));
			const cache = await caches.open(key);
			const out = { total: 0, stale: [] };
			for (const req of await cache.keys()) {
				if (!new URL(req.url).pathname.endsWith('/')) continue;
				out.total++;
				if (!(await (await cache.match(req)).text()).includes(mark)) out.stale.push(new URL(req.url).pathname);
			}
			return out;
		}, MARK);
		t.check('every page in the new cache is the new version', pages.total >= 16 && pages.stale.length === 0, `${pages.stale.length} of ${pages.total} old: ${pages.stale.slice(0, 4).join(' ')}`);
		t.check('no page errors', page.errors.length === 0, page.errors.join('; '));
	} finally {
		await page.close();
		server.close();
		rmSync(A, { recursive: true, force: true });
		rmSync(B, { recursive: true, force: true });
	}
	return t.fails;
}
