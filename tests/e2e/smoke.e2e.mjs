import { BASE, openPage, suite } from './harness.mjs';

export default async function (browser) {
	const t = suite('smoke');
	const page = await openPage(browser);
	const res = await page.goto(BASE + '/');
	// a revisit in the same browser can come back 304 Not Modified, which is fine
	t.check('home responds', !!res && res.status() < 400, String(res?.status()));
	t.check('title is Nihongo Notes', (await page.title()).includes('Nihongo Notes'), await page.title());
	t.check('no page errors', page.errors.length === 0, page.errors.join('; '));
	await page.close();
	return t.fails;
}
