import { BASE, LESSONS, openPage, stubSpeech, suite, text } from './harness.mjs';

const code = (o) => Buffer.from(JSON.stringify(o)).toString('base64');
const ready = (page) => page.waitForFunction(() => document.querySelector('.today:not(.waiting)'));
const lessonTask = (page) => text(page, '.tasks li:nth-child(2)');

export default async function (browser) {
	const t = suite('home');
	const page = await openPage(browser);
	await stubSpeech(page);
	await page.goto(BASE + '/');
	await page.evaluate(() => localStorage.clear());
	await page.reload();
	await ready(page);

	t.check('first visit: three tasks, none done', (await page.$$('.tasks li')).length === 3 && !(await page.$('.tasks li.done')));
	t.check('first visit: the lesson task is lesson 1', (await lessonTask(page)).startsWith('Lesson 1: Introducing yourself'), await lessonTask(page));
	t.check('first visit: ten new words to review', (await text(page, '.tasks li:first-child .d')) === '0 due, 10 new', await text(page, '.tasks li:first-child .d'));
	t.check("Start today's page goes to the review", (await page.$eval('.today .start', (a) => a.textContent.trim() + ' ' + a.getAttribute('href'))) === "Start today's page /flashcards/?review");
	t.check('an empty week explains the stamps', (await text(page, '.streak')) === 'A stamp goes here for each day you study.');
	t.check('progress for each block of five lessons', (await page.$$('.blocks li')).length === LESSONS / 5 && (await text(page, '.blocks li:first-child .count')).startsWith('0 of '));
	t.check(`all ${LESSONS} chapters listed`, (await page.$$('.chapters a')).length === LESSONS);
	t.check('no voice notice when a voice exists', !(await text(page, 'main')).includes('no Japanese voice'));

	// a returning learner: saved progress shows after a reload
	await page.evaluate(() => {
		localStorage.setItem('nn.lastLesson', '7');
		localStorage.setItem('nn.theme', '"dark"');
	});
	await page.reload();
	t.check('dark theme applies before the page is ready', (await page.evaluate(() => document.documentElement.dataset.theme)) === 'dark');
	await ready(page);
	t.check('returning learner continues with lesson 7', (await lessonTask(page)).includes('Tools, giving and receiving') && (await page.$eval('.tasks li:nth-child(2) a', (a) => a.getAttribute('href'))) === '/lessons/7/?today');

	await page.click('.import summary');
	const good = code({ v: 1, known: ['いきます', 'でんしゃ'], lesson: 3 });
	await page.type('#import-code', good.slice(0, 12) + '\n' + good.slice(12) + '\n');
	await page.click('.import button[type="submit"]');
	t.check('import with line breaks works', (await text(page, '.import .hint')) === 'Imported 2 words.', await text(page, '.import .hint'));
	t.check('imported words are saved', JSON.stringify(await page.evaluate(() => JSON.parse(localStorage.getItem('nn.known')))) === '["いきます","でんしゃ"]');
	t.check("import moves today's lesson to the old one", (await lessonTask(page)).startsWith('Lesson 3:'));
	t.check('imported words count as known', (await text(page, '.blocks li:first-child .count')).startsWith('2 of '));
	await page.type('#import-code', good);
	await page.click('.import button[type="submit"]');
	t.check('importing again adds nothing', (await text(page, '.import .hint')) === 'Imported 0 words.');
	await page.type('#import-code', 'not a code');
	await page.click('.import button[type="submit"]');
	t.check('a bad code is refused', (await text(page, '.import .hint')) === "That code isn't from the old site.");

	const mute = await openPage(browser);
	await stubSpeech(mute, { voices: [] });
	await mute.goto(BASE + '/');
	await mute.waitForFunction(() => document.body.textContent.includes('no Japanese voice'), { timeout: 4000 }).catch(() => {});
	t.check('no-voice notice', (await text(mute, 'main')).includes('This device has no Japanese voice, so the play buttons are hidden.'));

	const locked = await openPage(browser);
	await locked.evaluateOnNewDocument(() => {
		Object.defineProperty(window, 'localStorage', {
			configurable: true,
			get() {
				throw new DOMException('blocked', 'SecurityError');
			}
		});
	});
	await locked.goto(BASE + '/');
	await ready(locked);
	t.check('blocked storage notice', (await text(locked, 'main')).includes("Your browser isn't saving progress (private mode or storage full)."));

	await page.evaluate(() => localStorage.clear());
	const all = [...page.errors, ...mute.errors, ...locked.errors];
	t.check('no page errors', all.length === 0, all.join('; '));
	await page.close();
	await mute.close();
	await locked.close();
	return t.fails;
}
