import { BASE, LESSONS, openPage, stubSpeech, suite, text } from './harness.mjs';

export default async function (browser) {
	const t = suite('cards');
	const page = await openPage(browser);
	await stubSpeech(page);
	await page.goto(BASE + '/');
	await page.evaluate(() => {
		localStorage.clear();
		localStorage.setItem('nn.lastLesson', '4');
	});
	await page.goto(BASE + '/flashcards/');
	await page.waitForSelector('.card');
	const meta = () => text(page, '.stage .meta');

	t.check('starts with the last lesson opened', JSON.stringify(await page.$$eval('.setup .tick input:checked', (l) => l.map((i) => i.closest('label')?.textContent?.trim()))) === '["Lesson 4"]');
	t.check('counts the cards', (await meta()) === 'Card 1 of 28', await meta());
	await page.click('.card');
	t.check('tap shows the answer', (await text(page, '.card .hint')) === 'Hide the answer' && !!(await page.$('.card .small[lang="ja"]')));
	await page.click('.card');
	t.check('tap again hides it', (await text(page, '.card .hint')) === 'Show the answer');
	const word = await text(page, '.card .big');
	await page.click('.stage .speak');
	t.check('play reads the word', (await page.evaluate(() => window.__said.at(-1))) === word, word);

	await page.click('#got-it');
	t.check('Got it moves on', (await meta()) === 'Card 2 of 28');
	await page.click('#again');
	t.check('Again puts the card back later', (await meta()) === 'Card 3 of 29');
	await page.evaluate(() => document.activeElement?.blur());
	await page.keyboard.press(' ');
	t.check('Space flips', (await text(page, '.card .hint')) === 'Hide the answer');
	await page.keyboard.press('ArrowRight');
	t.check('→ marks it known', (await meta()) === 'Card 4 of 29');

	await page.click('.setup input[value="en"]');
	t.check('English first', !(await page.$('.card .big[lang="ja"]')));
	await page.click('.setup input[value="jp"]');

	for (let i = 0; i < 80 && (await page.$('#got-it')); i++) await page.click('#got-it');
	t.check('round summary', (await text(page, '.stage')).includes('You marked 28 of 28 words as known.'), await text(page, '.stage'));
	await page.click('.stage .btn');
	t.check('Go through again', (await meta()) === 'Card 1 of 28');

	await page.click('.setup .check input');
	t.check('skip known: everything is known', (await text(page, '.stage')).includes('Every word in lesson 4 is marked as known.'));
	await page.click('#include-known');
	t.check('Include known words brings the cards back', !!(await page.$('.card')) && !(await page.$eval('.setup .check input', (i) => i.checked)));
	await page.click('.setup .check input');
	await page.click('#forget');
	t.check('Forget the marks brings them back too', !!(await page.$('.card')));

	await page.click('.setup .tick input:checked');
	t.check('the last ticked lesson stays ticked', (await text(page, '.setup .hint')) === 'Keep at least one lesson ticked.');
	await page.click('.setup .all');
	t.check('All lessons', (await page.$$('.setup .tick input:checked')).length === LESSONS);
	await page.click('.setup .all');
	t.check('Only lesson 4', (await page.$$('.setup .tick input:checked')).length === 1);

	await page.reload();
	await page.waitForSelector('.card');
	t.check('settings survive a reload', (await page.$eval('.setup .check input', (i) => i.checked)) === true);

	t.check('no page errors', page.errors.length === 0, page.errors.join('; '));
	await page.evaluate(() => localStorage.clear());
	await page.close();
	return t.fails;
}
