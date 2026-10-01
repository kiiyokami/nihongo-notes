import { describe, it, expect } from 'vitest';
import { parse, speechText, hasJapanese } from './markup';

describe('parse', () => {
	it('splits particles and Japanese text', () => {
		expect(parse('でんしゃ[で] いきます。')).toEqual([
			{ kind: 'text', text: 'でんしゃ', ja: true },
			{ kind: 'particle', text: 'で', ja: true },
			{ kind: 'text', text: ' ', ja: false },
			{ kind: 'text', text: 'いきます。', ja: true }
		]);
	});
	it('reads slots as English labels', () => {
		expect(parse('わたしは{Noun}です。')).toEqual([
			{ kind: 'text', text: 'わたしは', ja: true },
			{ kind: 'slot', text: 'Noun', ja: false },
			{ kind: 'text', text: 'です。', ja: true }
		]);
	});
	it('tags Japanese inside English', () => {
		expect(parse('Doing things (を)')).toEqual([
			{ kind: 'text', text: 'Doing things (', ja: false },
			{ kind: 'text', text: 'を', ja: true },
			{ kind: 'text', text: ')', ja: false }
		]);
	});
	it('keeps an unclosed bracket as plain text', () => {
		expect(parse('a [b')).toEqual([{ kind: 'text', text: 'a [b', ja: false }]);
	});
	it('returns nothing for an empty string', () => {
		expect(parse('')).toEqual([]);
	});
});

describe('speechText', () => {
	it('unwraps particles', () => {
		expect(speechText('でんしゃ[で] かいしゃ[へ] いきます。')).toBe('でんしゃで かいしゃへ いきます。');
	});
	it('drops slots and collapses the spaces they leave', () => {
		expect(speechText('{Vehicle}で  いきます。')).toBe('で いきます。');
	});
});

describe('hasJapanese', () => {
	it('spots kana and kanji', () => {
		expect(hasJapanese('Going places')).toBe(false);
		expect(hasJapanese('第5課')).toBe(true);
		expect(hasJapanese('flat ～まい')).toBe(true);
	});
});
