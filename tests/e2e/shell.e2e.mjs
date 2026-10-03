import { BASE, openPage, suite, text } from './harness.mjs';

export default async function (browser) {
	const t = suite('shell');
	const page = await openPage(browser);
	await page.goto(BASE + '/');
	await page.evaluate(() => localStorage.clear());
	await page.reload();

	const nav = await page.$$eval('nav[aria-label="Study modes"] a', (as) => as.map((a) => [a.innerText.trim(), a.getAttribute('href')]));
	t.check('nav has the five modes', JSON.stringify(nav.map((n) => n[0])) === JSON.stringify(['Today', 'Lessons', 'Flashcards', 'Quiz', 'Kana']), JSON.stringify(nav));
	for (const [label, href] of nav) {
		// SvelteKit changes pages without a full load, so wait for the address, not a navigation event
		await page.click(`nav[aria-label="Study modes"] a[href="${href}"]`);
		await page.waitForFunction((h) => location.pathname === h, { timeout: 5000 }, href);
		const current = await page.$$eval('nav[aria-label="Study modes"] a[aria-current="page"]', (as) => as.map((a) => a.innerText.trim()).join(','));
		t.check(`${label} opens and is marked current`, current === label, current);
	}

	const before = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
	await page.click('button.theme');
	const after = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
	t.check('theme toggle inverts the page', before !== after, `${before} -> ${after}`);
	await page.reload();
	t.check('theme survives a reload', (await page.evaluate(() => getComputedStyle(document.body).backgroundColor)) === after);
	await page.click('button.theme');

	await page.goto(BASE + '/');
	await page.keyboard.press('Tab');
	t.check('first Tab lands on the skip link', (await page.evaluate(() => document.activeElement?.textContent)) === 'Skip to content');

	await page.goto(BASE + '/no-such-page/');
	t.check('unknown address shows Page not found', (await text(page, 'h1')) === 'Page not found', await text(page, 'h1'));
	t.check('…with a way home', !!(await page.$('main a[href="/"]')));

	const phone = await openPage(browser, { width: 360, height: 740 });
	await phone.goto(BASE + '/');
	const navBox = await phone.$eval('nav[aria-label="Study modes"]', (n) => {
		const r = n.getBoundingClientRect();
		return { bottom: Math.round(r.bottom), h: innerHeight };
	});
	t.check('on phones the modes sit in a bottom bar', navBox.bottom === navBox.h, JSON.stringify(navBox));
	const short = await phone.$$eval('nav[aria-label="Study modes"] a', (as) => as.map((a) => a.innerText.trim()));
	t.check('on phones Flashcards is shortened to Cards', JSON.stringify(short) === JSON.stringify(['Today', 'Lessons', 'Cards', 'Quiz', 'Kana']), JSON.stringify(short));

	t.check('no page errors', page.errors.length + phone.errors.length === 0, [...page.errors, ...phone.errors].join('; '));
	await page.close();
	await phone.close();
	return t.fails;
}
