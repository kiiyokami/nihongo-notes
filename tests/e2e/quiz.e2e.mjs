import { BASE, openPage, stubSpeech, suite, text } from './harness.mjs';

// The test finds right answers the way a learner would: in the pre-rendered lesson pages.
async function lookup(page, kind) {
	return page.evaluate(async (kind) => {
		const n = document.querySelector('.stage .meta').textContent.match(/Lesson (\d+)/)[1];
		const prompt = document.querySelector('.prompt').textContent.replace(/\s+/g, ' ').trim();
		const doc = new DOMParser().parseFromString(await (await fetch(`/lessons/${n}/`)).text(), 'text/html');
		if (kind === 'word') {
			const li = [...doc.querySelectorAll('.words li')].find((l) => l.querySelector('.jp').textContent.trim() === prompt);
			return li?.querySelector('.en').textContent.trim();
		}
		const wrap = [...doc.querySelectorAll('.bubbles .wrap')].find((w) => w.querySelector('.en')?.textContent.trim() === prompt);
		return wrap?.querySelector('.bubble').textContent.replace(/\s+/g, '').replace(/[。？]$/, '');
	}, kind);
}

// the order of tiles that spells the sentence (the two extra particles never fit)
function spell(target, tiles) {
	const go = (rest, left, path) => {
		if (!rest) return path;
		for (const [k, w] of left.entries()) {
			if (rest.startsWith(w)) {
				const r = go(rest.slice(w.length), left.filter((_, j) => j !== k), [...path, w]);
				if (r) return r;
			}
		}
		return null;
	};
	return go(target, tiles, []);
}

async function clickTile(page, word) {
	for (const b of await page.$$('.bank .tile')) {
		if ((await b.evaluate((e) => e.textContent)) === word) return b.click();
	}
}

export default async function (browser) {
	const t = suite('quiz');
	const page = await openPage(browser);
	await stubSpeech(page);
	await page.goto(BASE + '/');
	await page.evaluate(() => localStorage.clear());
	await page.goto(BASE + '/quiz/');
	await page.waitForSelector('.setup .btn');
	const start = () => page.click('.setup .btn');
	const fb = () => text(page, '.feedback');

	t.check('starts on Japanese to English, all lessons', (await text(page, '.setup .btn')) === 'Start 10 questions');
	await start();
	t.check('question 1 of 10', (await text(page, '.stage .meta')).startsWith('Question 1 of 10'));
	t.check('focus moves to the question', (await page.evaluate(() => document.activeElement?.classList.contains('prompt'))) === true);
	const right = await lookup(page, 'word');
	for (const b of await page.$$('.choice')) if ((await b.evaluate((e) => e.querySelector('.text').textContent)) === right) await b.click();
	t.check('the right meaning gets ピンポーン and Right.', (await fb()) === 'Right.' && (await text(page, '.choice.right .sfx')) === 'ピンポーン', right);
	t.check('Next takes focus', (await page.evaluate(() => document.activeElement?.textContent?.trim())) === 'Next question');
	await page.keyboard.press('Enter');
	const right2 = await lookup(page, 'word');
	for (const b of await page.$$('.choice')) if ((await b.evaluate((e) => e.querySelector('.text').textContent)) !== right2) { await b.click(); break; }
	t.check('a wrong pick gets ブブー and the answer', (await fb()).startsWith('Not this one. The answer is') && (await text(page, '.choice.wrong .sfx')) === 'ブブー');
	await page.click('.stage .actions .btn');
	await page.keyboard.press('2');
	t.check('number keys answer', (await fb()).length > 0);
	for (let i = 0; i < 30 && !(await page.$('.score')); i++) {
		if (await page.$('.stage .actions .btn')) await page.click('.stage .actions .btn');
		else await page.click('.choice');
	}
	t.check('round ends with a score and the misses', !!(await page.$('.score')) && (await page.$$('.review li')).length >= 1);
	await page.click('.stage .actions .btn');
	t.check('Another round', (await text(page, '.stage .meta')).startsWith('Question 1 of 10'));

	await page.click('.setup input[value="part"]');
	t.check('particles: no lesson picker, a note instead', !(await page.$('.setup .ticks')) && (await text(page, '.setup')).includes("lesson choice doesn't apply"));
	await start();
	t.check('particle question shows a blank', !!(await page.$('.prompt .slot')));

	await page.click('.setup input[value="sent"]');
	t.check('answer mode shows Word tiles and Typing', (await text(page, '.setup')).includes('Word tiles'));
	await start();
	await page.click('.bank .tile');
	t.check('tap a tile onto the line', (await page.$$('.line .tile')).length === 1);
	await page.click('.line .tile');
	t.check('tap it again to send it back', (await page.$$('.line .tile')).length === 0);
	await page.click('#q-check');
	t.check('Check with an empty line asks for tiles', (await fb()) === 'Put some tiles on the answer line first.');
	const target = await lookup(page, 'sentence');
	const tiles = await page.$$eval('.bank .tile', (l) => l.map((b) => b.textContent));
	for (const w of spell(target, tiles) ?? []) await clickTile(page, w);
	await page.click('#q-check');
	t.check('the right order gets Right.', (await fb()) === 'Right.' && !!(await page.$('.line.right')), target);

	await page.click('.setup input[value="typing"]');
	await start();
	t.check('typing starts in the text box', (await page.evaluate(() => document.activeElement?.id)) === 'q-typed');
	await page.keyboard.press('Enter');
	t.check('Enter on an empty box asks for an answer', (await fb()) === 'Type your answer first.');
	const typedAnswer = await lookup(page, 'sentence');
	await page.type('#q-typed', typedAnswer);
	await page.keyboard.press('Enter');
	t.check('typed answer without spaces is right', (await fb()) === 'Right.', `${typedAnswer} -> ${await fb()}`);

	await page.click('.setup input[value="num"]');
	t.check('numbers call it Choices', (await text(page, '.setup')).includes('Choices'));
	await page.click('.setup input[value="tiles"]');
	await start();
	t.check('numbers: Japanese readings to choose from', (await page.$$('.choice .text[lang="ja"]')).length >= 3);

	await page.click('.setup input[value="qa"]');
	await page.click('.setup .all'); // every lesson is ticked by default, so this narrows to lesson 1
	t.check('answer the question, lesson 1 only', (await text(page, '.setup .btn')) === 'Start 2 questions', await text(page, '.setup .btn'));
	await page.click('.setup input[value="num"]');
	t.check('numbers with lesson 1 only: disabled, with a reason', (await page.$eval('.setup .btn', (b) => b.disabled)) && (await text(page, '.setup')).includes('Numbers are in lessons 3, 4, 5 and 11.'));

	await page.reload();
	await page.waitForSelector('.setup .btn');
	t.check('settings survive a reload', await page.$eval('.setup input[value="num"]', (i) => i.checked));

	t.check('no page errors', page.errors.length === 0, page.errors.join('; '));
	await page.evaluate(() => localStorage.clear());
	await page.close();
	return t.fails;
}
