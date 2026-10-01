import { BASE, openPage, stubSpeech, suite, text } from './harness.mjs';

export default async function (browser) {
	const t = suite('kana');
	const page = await openPage(browser);
	await stubSpeech(page);
	await page.goto(BASE + '/kana/');
	await page.waitForSelector('.grid button.k');

	t.check('71 hiragana, starting with あ', (await page.$$('.grid .k:not(.gap)')).length === 71 && (await text(page, '.grid .k [lang="ja"]')) === 'あ');
	t.check('sounds are shown', (await text(page, '.grid .k small')) === 'a');
	await page.click('.grid button.k');
	t.check('tapping a letter reads it aloud', (await page.evaluate(() => window.__said.at(-1))) === 'あ');
	await page.click('.setup input[value="k"]');
	t.check('katakana', (await text(page, '.grid .k [lang="ja"]')) === 'ア');
	await page.click('.setup .check input');
	t.check('hide the sounds', (await page.$$('.grid button.k[aria-pressed="false"]')).length === 71 && (await page.$eval('.grid .k small', (s) => getComputedStyle(s).visibility)) === 'hidden');
	await page.click('.grid button.k');
	t.check('tap shows that sound', (await page.$eval('.grid button.k', (b) => b.getAttribute('aria-pressed'))) === 'true' && (await page.$eval('.grid .k small', (s) => getComputedStyle(s).visibility)) === 'visible');
	await page.click('.grid button.k');
	t.check('tap again hides it', (await page.$eval('.grid button.k', (b) => b.getAttribute('aria-pressed'))) === 'false');

	const mute = await openPage(browser);
	await stubSpeech(mute, { voices: [] });
	await mute.goto(BASE + '/kana/');
	await new Promise((r) => setTimeout(r, 2000));
	t.check('without a voice, letters are not buttons', (await mute.$$('.grid button.k')).length === 0 && (await mute.$$('.grid .k')).length > 70);

	t.check('no page errors', page.errors.length + mute.errors.length === 0, [...page.errors, ...mute.errors].join('; '));
	await page.close();
	await mute.close();
	return t.fails;
}
