// Today's page from start to finish: the review, the lesson, the quick quiz, then the stamps and the schedule.
import { BASE, openPage, stubSpeech, suite, text } from './harness.mjs';

const ready = (page) => page.waitForFunction(() => document.querySelector('.today:not(.waiting)'));
const go = async (page, sel) => {
	const href = await page.$eval(sel, (a) => a.getAttribute('href'));
	await page.click(sel);
	await page.waitForFunction((h) => location.pathname + location.search === h, { timeout: 5000 }, href);
	return href;
};
const store = (page, key) => page.evaluate((k) => JSON.parse(localStorage.getItem('nn.' + k)), key);
const dayNow = (page) => page.evaluate(() => Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 86400000));

export default async function (browser) {
	const t = suite('today');
	const page = await openPage(browser);
	await stubSpeech(page);
	await page.goto(BASE + '/');
	await page.evaluate(() => {
		localStorage.clear();
		localStorage.setItem('nn.lastLesson', '2');
	});
	await page.reload();
	await ready(page);
	const today = await dayNow(page);

	// 1. the review: ten new words from lessons 1 and 2
	t.check('starts with the review', (await go(page, '.today .start')) === '/flashcards/?review');
	await page.waitForSelector('.card');
	t.check('review: ten new cards', (await text(page, '.stage .meta')) === 'Card 1 of 10', await text(page, '.stage .meta'));
	t.check('review: the setup says what it is', (await text(page, '.review-note')).includes('0 due, 10 new'));
	t.check('review: a new card says so', (await text(page, '.card .head')).includes('new word'));
	const missed = await text(page, '.card .big');
	await page.click('#again');
	t.check('review: Again brings the card back later', (await text(page, '.stage .meta')) === 'Card 2 of 11');
	for (let i = 0; i < 20 && (await page.$('#got-it')); i++) await page.click('#got-it');
	t.check("review: finished", (await text(page, '.stage')).includes("Today's review finished"), await text(page, '.stage'));
	const srs = await store(page, 'srs');
	t.check('review: every word is scheduled', Object.keys(srs).length === 10, JSON.stringify(srs));
	t.check('review: the missed word is back tomorrow, still in box 1', JSON.stringify(srs[missed]) === JSON.stringify([1, today + 1]), JSON.stringify(srs[missed]));
	const others = Object.entries(srs).filter(([w]) => w !== missed);
	t.check('review: the others wait 3 days in box 2', others.every(([, r]) => r[0] === 2 && r[1] === today + 3), JSON.stringify(others));

	// 2. the lesson
	t.check('review offers the lesson next', (await go(page, '.today-next a')) === '/lessons/2/?today');
	await page.waitForSelector('.today-next a');
	t.check('lesson: offers the quick quiz next', (await page.$eval('.today-next a', (a) => a.getAttribute('href'))) === '/quiz/?today');
	t.check('the day log has the review, the cards and the lesson', JSON.stringify((await store(page, 'days'))[today]?.sort()) === '["cards","lesson","review"]', JSON.stringify(await store(page, 'days')));

	// 3. the quick quiz starts straight away and leaves saved quiz settings alone
	await go(page, '.today-next a');
	await page.waitForSelector('.choice');
	t.check('quiz: ten questions on lessons 1 and 2', (await text(page, '.stage .meta')).startsWith('Question 1 of 10') && (await text(page, '.today-note')).includes('lessons 1 and 2'), await text(page, '.today-note'));
	for (let i = 0; i < 10; i++) {
		await page.click('.choice');
		await page.click('.stage .actions .btn');
	}
	await page.waitForSelector('.today-next');
	t.check('quiz: the page is done', (await text(page, '.today-next')).includes('All done for today.'));
	t.check('quiz: saved settings untouched', (await store(page, 'quiz')) === null);

	// 4. back on today's page
	await go(page, '.today-next a');
	await ready(page);
	t.check('every task is ticked', (await page.$$('.tasks li.done')).length === 3);
	t.check('a はなまる for a finished page', !!(await page.$('.all-done .hanamaru')) && !(await page.$('.today .start')));
	t.check("today's stamp", (await page.$$('.week li.now.done')).length === 1);
	t.check('streak of one day', (await text(page, '.streak')) === '1 day in a row.', await text(page, '.streak'));

	// 5. three days later: the words are due again, and the streak waits for today
	await page.evaluate(() => {
		const shift = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, Array.isArray(v) && v.length === 2 && typeof v[1] === 'number' ? [v[0], v[1] - 3] : v]));
		localStorage.setItem('nn.srs', JSON.stringify(shift(JSON.parse(localStorage.getItem('nn.srs')))));
		const days = JSON.parse(localStorage.getItem('nn.days'));
		localStorage.setItem('nn.days', JSON.stringify(Object.fromEntries(Object.entries(days).map(([k, v]) => [Number(k) - 1, v]))));
	});
	await page.reload();
	await ready(page);
	t.check('later: the words come back due', (await text(page, '.tasks li:first-child .d')) === '10 due, 10 new', await text(page, '.tasks li:first-child .d'));
	t.check('later: nothing ticked yet', (await page.$$('.tasks li.done')).length === 0);
	t.check('later: the streak waits for today', (await text(page, '.streak')) === '1 day in a row so far. Study today to keep it going.', await text(page, '.streak'));
	t.check('later: carry on is not offered before starting', (await text(page, '.today .start')) === "Start today's page");

	// choosing lessons instead leaves the review
	await page.goto(BASE + '/flashcards/?review');
	await page.waitForSelector('.review-note a');
	await go(page, '.review-note a');
	await page.waitForSelector('.setup .tick');
	t.check('Choose lessons instead shows the lesson picker', !(await page.$('.review-note')) && !!(await page.$('.setup .tick')));

	t.check('no page errors', page.errors.length === 0, page.errors.join('; '));
	await page.evaluate(() => localStorage.clear());
	await page.close();
	return t.fails;
}
