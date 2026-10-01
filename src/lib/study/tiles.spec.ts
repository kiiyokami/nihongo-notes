import { describe, it, expect } from 'vitest';
import { toTiles, tileSet, PARTICLES } from './tiles';
import { seeded } from './random';

describe('toTiles', () => {
	it('cuts at spaces and particles', () => {
		expect(toTiles('でんしゃ[で] かいしゃ[へ] いきます。')).toEqual(['でんしゃ', 'で', 'かいしゃ', 'へ', 'いきます']);
	});
	it('keeps 、 on the word before it', () => {
		expect(toTiles('はい、たべました。')).toEqual(['はい、', 'たべました']);
	});
	it('splits です off so short answers still need ordering', () => {
		expect(toTiles('べんりです。')).toEqual(['べんり', 'です']);
		expect(toTiles('たのしいです[から]。')).toEqual(['たのしい', 'です', 'から']);
		expect(toTiles('なんですか？')).toEqual(['なん', 'ですか']);
	});
	it('does not split a word that is only です', () => {
		expect(toTiles('です。')).toEqual(['です']);
	});
});

describe('tileSet', () => {
	it('adds two particles that are not in the answer', () => {
		const answer = 'でんしゃ[で] かいしゃ[へ] いきます。';
		const words = toTiles(answer);
		for (let s = 1; s <= 50; s++) {
			const set = tileSet(answer, seeded(s));
			expect(set.length).toBe(words.length + 2);
			const extra = [...set];
			for (const w of words) extra.splice(extra.indexOf(w), 1);
			expect(extra.every((p) => PARTICLES.includes(p) && !words.includes(p))).toBe(true);
		}
	});
});
