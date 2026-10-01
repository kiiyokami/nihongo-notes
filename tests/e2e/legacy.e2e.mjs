import { openPage, suite } from './harness.mjs';

const OLD = new URL('../../legacy/index.html', import.meta.url).href;

export default async function (browser) {
	const t = suite('legacy');
	const page = await openPage(browser);
	await page.goto(OLD);
	await page.evaluate(() => {
		localStorage.setItem('jn-known', JSON.stringify(['いきます', 'でんしゃ']));
		localStorage.setItem('jn-lesson', '5');
		localStorage.setItem('jn-view', '"cards"');
	});
	await page.reload();
	await page.click('#c-export');
	const code = await page.$eval('#c-export-code', (e) => e.value).catch(() => '');
	let data = null;
	try {
		data = JSON.parse(Buffer.from(code, 'base64').toString('utf8'));
	} catch {}
	t.check('export shows a code', code.length > 0);
	t.check('code holds version, known words and lesson', JSON.stringify(data) === JSON.stringify({ v: 1, known: ['いきます', 'でんしゃ'], lesson: 5 }), JSON.stringify(data));
	t.check('message tells where to paste it', (await page.$eval('#c-export-msg', (e) => e.textContent)).includes('import box'));
	t.check('no page errors', page.errors.length === 0, page.errors.join('; '));
	await page.close();
	return t.fails;
}
