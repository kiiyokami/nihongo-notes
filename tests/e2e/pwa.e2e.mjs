// Uses its own preview server so it can switch the "network" off by stopping it.
import { openPage, startPreview, suite, text } from './harness.mjs';

const PORT = 4174;
const URL = `http://localhost:${PORT}`;

export default async function (browser) {
	const t = suite('pwa');
	let server = await startPreview(PORT);
	const page = await openPage(browser);
	try {
		await page.goto(URL + '/');
		const manifest = await page.evaluate(async () => {
			const href = document.querySelector('link[rel="manifest"]')?.getAttribute('href');
			return href ? (await fetch(href)).json() : null;
		});
		t.check('manifest names the app and has icons', manifest?.name === 'Nihongo Notes' && manifest?.icons?.length >= 2, JSON.stringify(manifest?.name));
		const icon = await page.evaluate(async (src) => (await fetch(src)).ok, manifest?.icons?.[0]?.src ?? '/missing');
		t.check('the icon file exists', icon);

		await page.evaluate(() => navigator.serviceWorker.ready);
		await page.reload();
		await page.waitForFunction(() => navigator.serviceWorker.controller !== null, { timeout: 10000 });
		t.check('a service worker controls the page', true);
		const caches = await page.evaluate(() => caches.keys());
		t.check('exactly one app cache, so an old version never lingers', caches.filter((k) => k.startsWith('app-')).length === 1, caches.join(', '));

		server.kill();
		server = null;
		await new Promise((r) => setTimeout(r, 500));
		await page.reload();
		t.check('offline: home still opens', !!(await page.$('.today')));
		await page.goto(URL + '/lessons/3/');
		t.check('offline: a lesson never opened before still opens (pre-cached)', (await text(page, 'h1')).includes('Here, there, where'));
		await page.goto(URL + '/no-such-page/');
		t.check('offline: an unknown page explains itself', (await text(page, 'body')).includes("You're offline and this page isn't saved yet. It will be after you open it once online."));
	} finally {
		if (server) server.kill();
		await page.close();
	}
	return t.fails;
}
