import { BASE, openPage, stubSpeech, suite, text } from './harness.mjs';

export default async function (browser) {
	const t = suite('lesson');
	const page = await openPage(browser);
	await stubSpeech(page);
	await page.goto(BASE + '/lessons/5/');
	await page.evaluate(() => localStorage.clear());
	await page.reload();
	await page.waitForFunction(() => document.querySelector('.speak'));

	t.check('chapter heading', (await text(page, 'h1')).includes('05') && (await text(page, 'h1')).includes('Going places'), await text(page, 'h1'));
	t.check('kicker names the textbook chapter', (await text(page, '.chapter .kicker')).includes('第5課'));
	const panels = (await page.$$('.panels > li')).length;
	t.check('every pattern is a panel, matching the count in the heading', panels === 8 && (await text(page, 'h2 .count')) === '8', String(panels));
	t.check('particles are marked', (await page.$$('.panels mark.p')).length > 5);
	t.check('examples are written out, each with a play button', (await page.$$('.panels .ex')).length > 10 && (await page.$$('.panels .ex .speak')).length > 10);
	t.check('each pattern has a washi tag with its number', (await page.$$eval('.panels > li > .tape', (l) => l.map((e) => e.textContent.trim().split(' ')[0]).join())) === '1,2,3,4,5,6,7,8');
	t.check('the time-words, months and dates tables are there', (await page.$$('.panels table')).length === 3);
	t.check('current lesson is marked in the index tabs', (await text(page, '.index-tabs a[aria-current="page"]')) === 'Lesson 5: Going places', await text(page, '.index-tabs a[aria-current="page"]'));
	t.check('the contents list every pattern and the words', (await page.$$eval('.contents a', (l) => l.map((a) => a.getAttribute('href')).join())) === '#p1,#p2,#p3,#p4,#p5,#p6,#p7,#p8,#words');

	const total = await page.$$eval('.words li', (l) => l.length);
	await page.type('input[type="search"]', 'train');
	t.check('filter by English', (await page.$$eval('.words li', (l) => l.length)) === 1 && (await text(page, 'h2#words .count')) === `1 of ${total}`);
	await page.$eval('input[type="search"]', (e) => (e.value = ''));
	await page.type('input[type="search"]', 'zzz');
	t.check('no match shows a message and a way out', (await text(page, '.words-empty')).includes('No words in lesson 5 match'));
	await page.click('.words-empty button');
	t.check('clear brings every word back', (await page.$$eval('.words li', (l) => l.length)) === total);

	const said = await page.$eval('.panels .ex .jp', (b) => b.textContent.replace(/\s+/g, ' ').trim());
	await page.click('.panels .speak');
	t.check('play reads the first example', (await page.evaluate(() => window.__said.at(-1))) === said, said);
	await page.click('.pager a[rel="next"]');
	await page.waitForFunction(() => location.pathname === '/lessons/6/');
	t.check('leaving the page stops the voice', (await page.evaluate(() => window.__said.at(-1))) === '<cancel>');
	t.check('last lesson is saved', (await page.evaluate(() => localStorage.getItem('nn.lastLesson'))) === '6');

	await page.click('.word-tools .btn');
	await page.waitForFunction(() => location.pathname === '/flashcards/');
	t.check('study button opens flashcards for this lesson', (await page.evaluate(() => JSON.parse(localStorage.getItem('nn.cards')).lessons.join())) === '6');

	await page.goto(BASE + '/lessons/99/');
	t.check('a lesson that does not exist shows Page not found', (await text(page, 'h1')) === 'Page not found');

	const mute = await openPage(browser);
	await stubSpeech(mute, { voices: [] });
	await mute.goto(BASE + '/lessons/1/');
	await new Promise((r) => setTimeout(r, 2000));
	t.check('no Japanese voice, no play buttons', (await mute.$$('.speak')).length === 0);

	t.check('no page errors', page.errors.length + mute.errors.length === 0, [...page.errors, ...mute.errors].join('; '));
	await page.close();
	await mute.close();
	return t.fails;
}
