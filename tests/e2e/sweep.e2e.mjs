// Every page, at five widths, in both themes: no sideways scrolling, every control at least 44px.
import { BASE, openPage, stubSpeech, suite } from './harness.mjs';

const PAGES = ['/', '/lessons/1/', '/lessons/11/', '/lessons/25/', '/flashcards/', '/quiz/', '/kana/', '/no-such-page/'];
const WIDTHS = [360, 390, 768, 1024, 1280];

export default async function (browser) {
	const t = suite('sweep');
	for (const theme of ['light', 'dark']) {
		for (const width of WIDTHS) {
			const page = await openPage(browser, { width, height: width < 700 ? 780 : 900 });
			await stubSpeech(page);
			await page.goto(BASE + '/');
			await page.evaluate((th) => {
				localStorage.clear();
				localStorage.setItem('nn.theme', JSON.stringify(th));
				localStorage.setItem('nn.quiz', JSON.stringify({ type: 'sent', input: 'tiles', lessons: [] }));
			}, theme);
			for (const path of PAGES) {
				await page.goto(BASE + path);
				await new Promise((r) => setTimeout(r, 300));
				if (path === '/quiz/') {
					await page.waitForSelector('.setup .btn');
					await page.click('.setup .btn');
				}
				const over = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
				const small = await page.evaluate(() =>
					[...document.querySelectorAll('a, button, summary, input:not([type=checkbox]):not([type=radio]), textarea, .tick > span, label.check')]
						.filter((e) => {
							const r = e.getBoundingClientRect();
							if (!r.width || !r.height || getComputedStyle(e).visibility === 'hidden' || e.closest('.sr, .skip')) return false;
							return r.width < 44 || r.height < 44;
						})
						.map((e) => `${e.tagName.toLowerCase()}.${e.className}:${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)}`)
				);
				t.check(`${theme} ${width}px ${path}`, over <= 0 && small.length === 0, over > 0 ? `${over}px sideways scroll` : small.slice(0, 4).join(' '));
			}
			t.check(`${theme} ${width}px no page errors`, page.errors.length === 0, page.errors.join('; '));
			await page.close();
		}
	}
	return t.fails;
}
